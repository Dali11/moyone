import Link from "next/link";
import { createStory } from "@/lib/admin/story-actions";
import { StoryForm } from "../story-form";

export const dynamic = "force-dynamic";

export default function NewStoryPage() {
  return (
    <section className="mx-auto max-w-4xl">
      <Link href="/admin/stories" className="text-sm font-semibold text-brand-800 hover:underline">
        ← Back to stories
      </Link>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
        Create a story
      </h1>
      <p className="mt-2 mb-7 text-sm text-slate-500">
        Add a community update for MOYONE’s website.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <StoryForm action={createStory} />
      </div>
    </section>
  );
}
