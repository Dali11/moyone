import Link from "next/link";
import { ReplaceCoverImage } from "@/components/admin/stories/replace-cover-image";

type StoryFormProps = {
  action: (form: FormData) => void | Promise<void>;
  story?: {
    id: number | string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    location: string | null;
    image_url: string | null;
    image_alt: string | null;
    status: string;
  };
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";

export function StoryForm({ action, story }: StoryFormProps) {
  return (
    <form action={action} className="space-y-6">
      {story && <input type="hidden" name="id" value={story.id} />}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Story title *
          <input
            className={inputClass}
            name="title"
            defaultValue={story?.title}
            maxLength={180}
            required
            placeholder="Give the story a clear title"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          URL slug *
          <input
            className={inputClass}
            name="slug"
            defaultValue={story?.slug}
            maxLength={180}
            placeholder="Generated from the title if left blank"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Category *
          <input
            className={inputClass}
            name="category"
            defaultValue={story?.category}
            maxLength={100}
            required
            placeholder="e.g. Education"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Location
          <input
            className={inputClass}
            name="location"
            defaultValue={story?.location ?? ""}
            maxLength={180}
            placeholder="e.g. Mangochi, Malawi"
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Short excerpt *
        <textarea
          className={inputClass}
          name="excerpt"
          defaultValue={story?.excerpt}
          maxLength={500}
          rows={3}
          required
          placeholder="A short introduction shown on story cards"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Story content *
        <textarea
          className={inputClass}
          name="content"
          defaultValue={story?.content}
          maxLength={30000}
          rows={12}
          required
          placeholder="Write the story. Separate paragraphs with a blank line."
        />
        <span className="mt-1 block text-xs font-normal text-slate-500">
          Separate paragraphs with a blank line.
        </span>
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Cover image — shown at the top of the public story
          <input
            className={inputClass}
            name="image_url"
            type="text"
            defaultValue={story?.image_url ?? ""}
            maxLength={1000}
            placeholder="/images/projects/example.png"
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            This is the main cover photograph, not a gallery image.
          </span>
          {story?.image_url && (
            <span className="mt-3 block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-emerald-800">
                Current cover preview
              </span>
              <img
                src={story.image_url}
                alt={story.image_alt || "Current story cover"}
                className="h-36 w-full rounded-xl border border-slate-200 object-cover"
              />
            </span>
          )}
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Image alternative text
          <input
            className={inputClass}
            name="image_alt"
            defaultValue={story?.image_alt ?? ""}
            maxLength={250}
            placeholder="Describe what the image shows"
          />
        </label>
      </div>

      {story && (
        <ReplaceCoverImage
          storyId={story.id}
          currentImage={story.image_url ?? ""}
          currentAlt={story.image_alt ?? ""}
        />
      )}

      <label className="block max-w-sm text-sm font-semibold text-slate-700">
        Publication status
        <select
          className={inputClass}
          name="status"
          defaultValue={story?.status ?? "draft"}
        >
          <option value="draft">Draft — not public</option>
          <option value="published">Published — visible on website</option>
          <option value="archived">Archived — hidden from website</option>
        </select>
      </label>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
        <button
          type="submit"
          className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-900"
        >
          {story ? "Save changes" : "Create story"}
        </button>
        <Link
          href="/admin/stories"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
