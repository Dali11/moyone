import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sql } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await sql`
      SELECT value
      FROM site_settings
      WHERE key = 'homepage_hero_object_key'
      LIMIT 1
    `;

    const objectKey = settings[0]?.value;

    if (
      typeof objectKey !== "string" ||
      !objectKey.startsWith("hero-section/") ||
      objectKey.includes("..")
    ) {
      return new Response("Hero image is not configured.", {
        status: 404,
      });
    }

    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    const bucket = "moyone";
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (
      !endpoint ||
      !region ||
      !accessKeyId ||
      !secretAccessKey
    ) {
      console.error("Neon Object Storage configuration is incomplete.");

      return new Response("Image storage is not configured.", {
        status: 500,
      });
    }

    const client = new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    try {
      const object = await client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: objectKey,
        })
      );

      if (!object.Body) {
        return new Response("Hero image is empty.", {
          status: 404,
        });
      }

      const image = await object.Body.transformToByteArray();

      return new Response(Buffer.from(image), {
        status: 200,
        headers: {
          "Content-Type": object.ContentType || "image/png",
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } finally {
      client.destroy();
    }
  } catch (error) {
    console.error(
      "Unable to retrieve the homepage hero image:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return new Response("Unable to load hero image.", {
      status: 500,
    });
  }
}
