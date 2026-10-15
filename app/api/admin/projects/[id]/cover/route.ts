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

const types: Record<string, { ext: string }> = {
  "image/jpeg": { ext: "jpg" },
  "image/png": { ext: "png" },
  "image/webp": { ext: "webp" },
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
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const role = session?.user?.role;

  if (
    !session?.user ||
    (role !== "super_admin" && role !== "editor")
  ) {
    return NextResponse.json(
      { error: "Not authorised." },
      { status: 403 },
    );
  }

  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid project ID." },
      { status: 400 },
    );
  }

  let client: S3Client | undefined;
  let uploadedKey: string | undefined;

  try {
    const form = await request.formData();
    const file = form.get("file");
    const altText = String(form.get("altText") || "")
      .trim()
      .slice(0, 250);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Choose an image first." },
        { status: 400 },
      );
    }

    if (!types[file.type] || file.size === 0 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Use JPEG, PNG or WebP images up to 8 MB." },
        { status: 415 },
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const valid =
      (
        file.type === "image/jpeg" &&
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[bytes.length - 2] === 0xff &&
        bytes[bytes.length - 1] === 0xd9
      ) ||
      (
        file.type === "image/png" &&
        bytes.subarray(0, 8).equals(
          Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        )
      ) ||
      (
        file.type === "image/webp" &&
        bytes.toString("ascii", 0, 4) === "RIFF" &&
        bytes.toString("ascii", 8, 12) === "WEBP"
      );

    if (!valid) {
      return NextResponse.json(
        { error: "The file is not a valid supported image." },
        { status: 415 },
      );
    }

    const projects = await sql`
      SELECT id, image_object_key
      FROM projects
      WHERE id = ${id}
      LIMIT 1
    `;

    if (!projects.length) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    const key = `projects/covers/${id}/${randomUUID()}.${types[file.type].ext}`;

    client = storageClient();

    await client.send(
      new PutObjectCommand({
        Bucket: "moyone",
        Key: key,
        Body: bytes,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    uploadedKey = key;

    const imageUrl = `/api/media/project-cover/${id}`;

    await sql`
      UPDATE projects
      SET image_object_key = ${key},
          image_url = ${imageUrl},
          image_alt = ${altText || "MOYONE project cover photograph"},
          updated_at = NOW()
      WHERE id = ${id}
    `;

    // Remove the previous uploaded cover only after the database update succeeds.
    const oldKey = projects[0].image_object_key;

    if (
      typeof oldKey === "string" &&
      oldKey.startsWith(`projects/covers/${id}/`) &&
      !oldKey.includes("..") &&
      !oldKey.includes("\\") &&
      oldKey !== key
    ) {
      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: "moyone",
            Key: oldKey,
          }),
        );
      } catch {
        console.error("Previous project cover cleanup failed.");
      }
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      alt: altText || "MOYONE project cover photograph",
    });
  } catch (error) {
    if (uploadedKey && client) {
      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: "moyone",
            Key: uploadedKey,
          }),
        );
      } catch {
        console.error("Project cover upload cleanup failed.");
      }
    }

    console.error(
      "Project cover upload failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      { error: "Could not upload the project cover." },
      { status: 500 },
    );
  } finally {
    client?.destroy();
  }
}
