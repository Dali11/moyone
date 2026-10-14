import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let client: S3Client | undefined;

  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return new Response("Invalid image ID.", { status: 400 });
    }

    const rows = await sql`
      SELECT si.object_key
      FROM story_images si
      INNER JOIN stories s ON s.id = si.story_id
      WHERE si.id = ${id}
        AND s.status = 'published'
      LIMIT 1
    `;

    const objectKey = rows[0]?.object_key;

    if (
      typeof objectKey !== "string" ||
      !objectKey.startsWith("stories/gallery/") ||
      objectKey.includes("..") ||
      objectKey.includes("\\")
    ) {
      return new Response("Gallery image not found.", { status: 404 });
    }

    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
      console.error("Object Storage configuration is incomplete.");
      return new Response("Image storage is not configured.", { status: 500 });
    }

    client = new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    });

    const object = await client.send(
      new GetObjectCommand({ Bucket: "moyone", Key: objectKey })
    );

    if (!object.Body) {
      return new Response("Image is empty.", { status: 404 });
    }

    const bytes = await object.Body.transformToByteArray();
    const contentType = object.ContentType || "application/octet-stream";

    if (!["image/jpeg", "image/png", "image/webp"].includes(contentType)) {
      return new Response("Unsupported image type.", { status: 415 });
    }

    return new Response(Buffer.from(bytes), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "Gallery image error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Unable to load gallery image." },
      { status: 500 }
    );
  } finally {
    client?.destroy();
  }
}
