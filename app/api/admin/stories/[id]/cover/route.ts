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

const MAX_SIZE = 8 * 1024 * 1024;
const types: Record<string, { ext: string; signature: string }> = {
  "image/jpeg": { ext: "jpg", signature: "jpeg" },
  "image/png": { ext: "png", signature: "png" },
  "image/webp": { ext: "webp", signature: "webp" },
};

function storageClient() {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("Object Storage is not configured.");
  }

  return new S3Client({
    region,
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session?.user || !["super_admin", "editor"].includes(role || "")) {
    return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  }

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid story ID." }, { status: 400 });
  }

  let client: S3Client | undefined;
  let uploadedKey: string | undefined;

  try {
    const form = await request.formData();
    const file = form.get("file");
    const altText = String(form.get("altText") || "").trim().slice(0, 250);

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image first." }, { status: 400 });
    }
    if (!types[file.type] || file.size === 0 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Use JPEG, PNG or WebP images up to 8 MB." },
        { status: 415 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const valid =
      (file.type === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8) ||
      (file.type === "image/png" && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) ||
      (file.type === "image/webp" && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP");

    if (!valid) {
      return NextResponse.json({ error: "The file is not a valid image." }, { status: 415 });
    }

    const stories = await sql`SELECT id FROM stories WHERE id = ${id} LIMIT 1`;
    if (!stories.length) {
      return NextResponse.json({ error: "Story not found." }, { status: 404 });
    }

    const key = `stories/covers/${id}/${randomUUID()}.${types[file.type].ext}`;
    client = storageClient();

    await client.send(new PutObjectCommand({
      Bucket: "moyone",
      Key: key,
      Body: bytes,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    }));
    uploadedKey = key;

    await sql`
      UPDATE stories
      SET image_object_key = ${key},
          image_url = ${`/api/media/story-cover/${id}`},
          image_alt = ${altText || "Story cover photograph"},
          updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      imageUrl: `/api/media/story-cover/${id}`,
      alt: altText || "Story cover photograph",
    });
  } catch (error) {
    if (uploadedKey && client) {
      try {
        await client.send(new DeleteObjectCommand({
          Bucket: "moyone",
          Key: uploadedKey,
        }));
      } catch {
        console.error("Cover upload cleanup failed.");
      }
    }

    console.error("Cover upload failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Could not replace the cover image." }, { status: 500 });
  } finally {
    client?.destroy();
  }
}
