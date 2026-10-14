import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sql } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedStories = new Set([
  "disability-inclusion",
  "youth-civic-participation",
]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  let client: S3Client | undefined;

  try {
    const { slug } = await params;

    if (!allowedStories.has(slug)) {
      return new Response("Story image not found.", { status: 404 });
    }

    const settingsKey = `story_${slug.replaceAll("-", "_")}_object_key`;

    const settings = await sql`
      SELECT value
      FROM site_settings
      WHERE key = ${settingsKey}
      LIMIT 1
    `;

    const objectKey = settings[0]?.value;

    if (
      typeof objectKey !== "string" ||
      !objectKey.startsWith("stories/") ||
      objectKey.includes("..") ||
      objectKey.startsWith("/") ||
      objectKey.includes("\\")
    ) {
      return new Response("Story image is not configured.", {
        status: 404,
      });
    }

    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
      console.error("Neon Object Storage configuration is incomplete.");
      return new Response("Image storage is not configured.", {
        status: 500,
      });
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
        Key: objectKey,
      })
    );

    if (!object.Body) {
      return new Response("Story image is empty.", { status: 404 });
    }

    const image = await object.Body.transformToByteArray();
    const contentType = object.ContentType || "application/octet-stream";

    if (!contentType.startsWith("image/")) {
      return new Response("Stored object is not an image.", {
        status: 415,
      });
    }

    return new Response(Buffer.from(image), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "Unable to retrieve story image:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return new Response("Unable to load story image.", { status: 500 });
  } finally {
    client?.destroy();
  }
}
