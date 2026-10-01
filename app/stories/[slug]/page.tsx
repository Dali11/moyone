import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryDetail } from "@/components/stories/story-detail";
import { stories } from "@/lib/stories";

export function generateStaticParams() {
  return stories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);

  return story ? { title: `${story.title} | MOYONE`, description: story.text } : { title: "Story not found | MOYONE" };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);

  if (!story) notFound();

  return <StoryDetail story={story} />;
}
