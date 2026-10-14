import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db/client";
import { StoryDetail } from "@/components/stories/story-detail";
import {
  getPublishedStoryBySlug,
  getPublishedStories,
} from "@/lib/stories";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPublishedStoryBySlug(slug);

  return story
    ? {
        title: `${story.title} | MOYONE`,
        description: story.text,
      }
    : {
        title: "Story not found | MOYONE",
      };
}

export default async function StoryPage({
  params,
}: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = await getPublishedStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const galleryRows = await sql`
    SELECT id, alt_text, caption
    FROM story_images
    WHERE story_id = (
      SELECT id FROM stories
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    )
    ORDER BY sort_order ASC, id ASC
  `;

  const gallery = galleryRows.map((row) => ({
    id: String(row.id),
    alt: String(row.alt_text || ""),
    caption: String(row.caption || ""),
  }));

  return <StoryDetail story={story} gallery={gallery} />;
}
