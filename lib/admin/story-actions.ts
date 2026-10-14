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
