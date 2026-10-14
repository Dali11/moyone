import Link from "next/link";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db/client";
import { updateStory } from "@/lib/admin/story-actions";
import { StoryForm } from "../../story-form";
import { StoryImageUploader } from "@/components/admin/stories/story-image-uploader";

export const dynamic = "force-dynamic";

export default async function EditStoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;

  if (!/^\d+$/.test(id)) notFound();

  const rows = await sql`
    SELECT id, slug, title, excerpt, content, category, location,
           image_url, image_alt, status
    FROM stories
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!rows.length) notFound();

  const story = rows[0] as {
    id: number | string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    location: string | null;
    image_url: string | null;
    image_alt: string | null;
    status: string;
  };

  return (
    <section className="mx-auto max-w-4xl">
      <Link href="/admin/stories" className="text-sm font-semibold text-emerald-800 hover:underline">
        ← Back to stories
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Edit story
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            {story.title}
          </h1>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold capitalize text-slate-600">
          {story.status}
        </span>
      </div>

      {query.saved === "1" && (
        <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          Story saved successfully.
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <StoryForm action={updateStory} story={story} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <StoryImageUploader storyId={story.id} />
      </div>

      {story.status === "published" && (
        <p className="mt-4 text-sm">
          <Link
            href={`/stories/${story.slug}`}
            target="_blank"
            className="font-semibold text-emerald-800 hover:underline"
          >
            View published story ↗
          </Link>
        </p>
      )}
    </section>
  );
}
