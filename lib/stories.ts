import { sql } from "@/lib/db/client";

export type CommunityStory = {
  slug: string;
  title: string;
  text: string;
  details: string[];
  image: string;
  alt: string;
  subject: string;
  location?: string | null;
};

type StoryRow = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  location: string | null;
  image_object_key: string | null;
  image_url: string | null;
  image_alt: string | null;
};

function mapStory(row: StoryRow): CommunityStory {
  let image = row.image_url || "";

  if (row.image_object_key) {
    const filename = row.image_object_key.split("/").pop() || "";
    const imageName = filename.replace(/\.[^.]+$/, "");

    image = `/api/media/story/${imageName}`;
  }

  return {
    slug: row.slug,
    title: row.title,
    text: row.excerpt,
    details: row.content
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    image,
    alt: row.image_alt || row.title,
    subject: row.category,
    location: row.location,
  };
}

export async function getPublishedStories(): Promise<CommunityStory[]> {
  const rows = await sql`
    SELECT
      slug,
      title,
      excerpt,
      content,
      category,
      location,
      image_object_key,
      image_url,
      image_alt
    FROM stories
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST, created_at DESC
  `;

  return (rows as StoryRow[]).map(mapStory);
}

export async function getPublishedStoryBySlug(
  slug: string,
): Promise<CommunityStory | null> {
  const rows = await sql`
    SELECT
      slug,
      title,
      excerpt,
      content,
      category,
      location,
      image_object_key,
      image_url,
      image_alt
    FROM stories
    WHERE slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `;

  const row = (rows as StoryRow[])[0];

  return row ? mapStory(row) : null;
}
