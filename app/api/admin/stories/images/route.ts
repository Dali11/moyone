import { randomUUID } from "node:crypto";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 8 * 1024 * 1024;

const imageTypes = {
  "image/jpeg": { extension: "jpg", signature: [0xff, 0xd8, 0xff] },
  "image/png": {
    extension: "png",
    signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  },
  "image/webp": {
    extension: "webp",
    signature: [0x52, 0x49, 0x46, 0x46],
  },
} as const;

function createStorageClient() {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("Object storage is not configured.");
  }

  return new S3Client({
    region,
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  }

  if (
    session.user.role !== "super_admin" &&
    session.user.role !== "editor"
  ) {
    return NextResponse.json({ error: "Permission denied." }, { status: 403 });
  }

  let client: S3Client | undefined;
  let uploadedKey: string | undefined;

  try {
    const form = await request.formData();
    const storyId = String(form.get("storyId") ?? "");
    const file = form.get("file");

    if (!/^\d+$/.test(storyId) || !file || typeof file === "string") {
      return NextResponse.json(
        { error: "A valid story and image are required." },
        { status: 400 }
      );
    }

    if (file.size < 1 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Images must be smaller than 8 MB." },
        { status: 400 }
      );
    }

    const type = imageTypes[file.type as keyof typeof imageTypes];

    if (!type) {
      return NextResponse.json(
        { error: "Use a JPEG, PNG, or WebP image." },
        { status: 415 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const signature = type.signature;

    const validSignature = signature.every(
      (byte, index) => bytes[index] === byte
    );

    if (!validSignature) {
      return NextResponse.json(
        { error: "The file contents do not match its image type." },
        { status: 415 }
      );
    }

    if (
      file.type === "image/webp" &&
      bytes.toString("ascii", 8, 12) !== "WEBP"
    ) {
      return NextResponse.json(
        { error: "Invalid WebP image." },
        { status: 415 }
      );
    }

    const stories = await sql`
      SELECT id FROM stories WHERE id = ${storyId} LIMIT 1
    `;

    if (!stories.length) {
      return NextResponse.json({ error: "Story not found." }, { status: 404 });
    }

    const altText = String(form.get("altText") ?? "")
      .trim()
      .slice(0, 250);

    const caption = String(form.get("caption") ?? "")
      .trim()
      .slice(0, 500);

    const orderRows = await sql`
      SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order
      FROM story_images
      WHERE story_id = ${storyId}
    `;

    const sortOrder = Number(orderRows[0].next_order);
    const objectKey =
      `stories/gallery/${storyId}/${randomUUID()}.${type.extension}`;

    client = createStorageClient();

    await client.send(
      new PutObjectCommand({
        Bucket: "moyone",
        Key: objectKey,
        Body: bytes,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    uploadedKey = objectKey;

    const rows = await sql`
      INSERT INTO story_images (
        story_id, object_key, alt_text, caption, sort_order
      )
      VALUES (
        ${storyId}, ${objectKey}, ${altText}, ${caption}, ${sortOrder}
      )
      RETURNING id, object_key, alt_text, caption, sort_order
    `;

    return NextResponse.json({ image: rows[0] }, { status: 201 });
  } catch (error) {
    if (uploadedKey && client) {
      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: "moyone",
            Key: uploadedKey,
          })
        );
      } catch {
        console.error("Could not clean up an incomplete image upload.");
      }
    }

    console.error(
      "Story image upload failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 500 }
    );
  } finally {
    client?.destroy();
  }
}
