"use server";

import { auth } from "@/auth";
import { sql } from "@/lib/db/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireEditor() {
  const session = await auth();

  if (!session?.user) redirect("/admin/login");

  const role = session.user.role;

  if (role !== "super_admin" && role !== "editor") {
    throw new Error("You do not have permission to manage stories.");
  }
}

function value(form: FormData, key: string, max = 10000) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

function slugify(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function validate(form: FormData) {
  const title = value(form, "title", 180);
  const excerpt = value(form, "excerpt", 500);
  const category = value(form, "category", 100);
  const content = value(form, "content", 30000);
  const location = value(form, "location", 180);
  const imageUrl = value(form, "image_url", 1000);
  const imageAlt = value(form, "image_alt", 250);
  const requestedSlug = slugify(value(form, "slug", 180) || title);
  const status = value(form, "status", 20);

  if (!title || !excerpt || !category || !content || !requestedSlug) {
    throw new Error("Complete the title, slug, excerpt, category and content.");
  }

  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid story status.");
  }

  if (
    imageUrl &&
    !imageUrl.startsWith("/") &&
    !/^https:\/\/[^ ]+$/i.test(imageUrl)
  ) {
    throw new Error("Use a local image path or an HTTPS image URL.");
  }

  return {
    title,
    slug: requestedSlug,
    excerpt,
    category,
    content,
    location: location || null,
    image_url: imageUrl || null,
    image_alt: imageAlt || title,
    status,
  };
}

export async function createStory(form: FormData) {
  await requireEditor();
  const story = validate(form);

  const result = await sql`
    INSERT INTO stories (
      slug, title, excerpt, content, category, location,
      image_url, image_alt, status, published_at
    )
    VALUES (
      ${story.slug}, ${story.title}, ${story.excerpt},
      ${story.content}, ${story.category}, ${story.location},
      ${story.image_url}, ${story.image_alt}, ${story.status},
      CASE WHEN ${story.status} = 'published' THEN NOW() ELSE NULL END
    )
    RETURNING id
  `;

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/admin");
  revalidatePath("/admin/stories");

  redirect(`/admin/stories/${result[0].id}/edit?saved=1`);
}

export async function updateStory(form: FormData) {
  await requireEditor();

  const id = value(form, "id", 30);
  if (!/^\d+$/.test(id)) throw new Error("Invalid story ID.");

  const story = validate(form);

  await sql`
    UPDATE stories SET
      slug = ${story.slug},
      title = ${story.title},
      excerpt = ${story.excerpt},
      content = ${story.content},
      category = ${story.category},
      location = ${story.location},
      image_url = ${story.image_url},
      image_alt = ${story.image_alt},
      status = ${story.status},
      published_at = CASE
        WHEN ${story.status} = 'published'
          THEN COALESCE(published_at, NOW())
        ELSE NULL
      END,
      updated_at = NOW()
    WHERE id = ${id}
  `;

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/admin");
  revalidatePath("/admin/stories");

  redirect(`/admin/stories/${id}/edit?saved=1`);
}

export async function changeStoryStatus(form: FormData) {
  await requireEditor();

  const id = value(form, "id", 30);
  const status = value(form, "status", 20);

  if (!/^\d+$/.test(id)) throw new Error("Invalid story ID.");
  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid story status.");
  }

  await sql`
    UPDATE stories SET
      status = ${status},
      published_at = CASE
        WHEN ${status} = 'published'
          THEN COALESCE(published_at, NOW())
        ELSE NULL
      END,
      updated_at = NOW()
    WHERE id = ${id}
  `;

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/admin");
  revalidatePath("/admin/stories");
}

export async function deleteStory(form: FormData) {
  const session = await auth();

  if (!session?.user) redirect("/admin/login");
  if (session.user.role !== "super_admin") {
    throw new Error("Only a super administrator can permanently delete stories.");
  }

  const id = value(form, "id", 30);
  if (!/^\d+$/.test(id)) throw new Error("Invalid story ID.");

  const found = await sql`
    SELECT id, slug, image_object_key
    FROM stories
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!found.length) redirect("/admin/stories?deleted=missing");

  const story = found[0] as {
    id: number | string;
    slug: string;
    image_object_key: string | null;
  };

  const gallery = await sql`
    SELECT object_key
    FROM story_images
    WHERE story_id = ${id}
  `;

  const settingsKey = `story_${story.slug.replaceAll("-", "_")}_object_key`;
  const settings = await sql`
    SELECT value FROM site_settings WHERE key = ${settingsKey} LIMIT 1
  `;

  const keys = new Set<string>();
  if (story.image_object_key) keys.add(story.image_object_key);
  for (const row of gallery) {
    if (typeof row.object_key === "string") keys.add(row.object_key);
  }
  if (typeof settings[0]?.value === "string") keys.add(settings[0].value);

  // Only delete objects from the story/gallery folders in our bucket.
  for (const key of keys) {
    if (
      !key.startsWith("stories/") ||
      key.includes("..") ||
      key.startsWith("/") ||
      key.includes("\\")
    ) {
      throw new Error("Unsafe storage key detected. Story was not deleted.");
    }
  }

  // Delete database records first. Gallery rows are removed by ON DELETE CASCADE.
  await sql`DELETE FROM stories WHERE id = ${id}`;

  // Remove any legacy setting that pointed to this story's image.
  await sql`DELETE FROM site_settings WHERE key = ${settingsKey}`;

  let cleanupFailed = false;

  if (keys.size > 0) {
    let client: import("@aws-sdk/client-s3").S3Client | undefined;

    try {
      const endpoint = process.env.AWS_ENDPOINT_URL_S3;
      const region = process.env.AWS_REGION;
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

      if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
        throw new Error("Object Storage is not configured.");
      }

      const { S3Client, DeleteObjectCommand } = await import("@aws-sdk/client-s3");
      client = new S3Client({
        region,
        endpoint,
        forcePathStyle: true,
        credentials: { accessKeyId, secretAccessKey },
      });

      for (const key of keys) {
        try {
          await client.send(new DeleteObjectCommand({
            Bucket: "moyone",
            Key: key,
          }));
        } catch (error) {
          cleanupFailed = true;
          console.error("Could not remove story image:", key, error);
        }
      }
    } catch (error) {
      cleanupFailed = true;
      console.error("Story image cleanup failed:", error);
    } finally {
      client?.destroy();
    }
  }

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/admin");
  revalidatePath("/admin/stories");

  redirect(
    cleanupFailed
      ? "/admin/stories?deleted=1&cleanup=failed"
      : "/admin/stories?deleted=1"
  );
}
