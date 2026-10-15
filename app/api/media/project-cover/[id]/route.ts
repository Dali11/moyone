import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sql } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let client: S3Client | undefined;

  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return new Response("Not found.", { status: 404 });
    }

    const rows = await sql`
      SELECT image_object_key
      FROM projects
      WHERE id = ${id}
        AND status = 'published'
      LIMIT 1
    `;

    const key = rows[0]?.image_object_key;

    if (
      typeof key !== "string" ||
      !key.startsWith(`projects/covers/${id}/`) ||
      key.includes("..") ||
      key.includes("\\")
    ) {
      return new Response("Cover not found.", { status: 404 });
    }

    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
      return new Response("Storage unavailable.", { status: 500 });
    }

    client = new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    });

    const object = await client.send(
      new GetObjectCommand({
        Bucket: "moyone",
        Key: key,
      }),
    );

    if (!object.Body) {
      return new Response("Image not found.", { status: 404 });
    }

    const contentType = object.ContentType || "";

    if (!["image/jpeg", "image/png", "image/webp"].includes(contentType)) {
      return new Response("Unsupported image.", { status: 415 });
    }

    const bytes = await object.Body.transformToByteArray();

    return new Response(Buffer.from(bytes), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "Project cover retrieval failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return new Response("Unable to load cover.", { status: 500 });
  } finally {
    client?.destroy();
  }
}
