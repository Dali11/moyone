"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectCoverUpload } from "@/components/admin/projects/project-cover-upload";
import type { FormHTMLAttributes } from "react";

type ProjectData = {
  id?: string | number;
  title?: string;
  slug?: string;
  location?: string;
  program?: string;
  summary?: string;
  image_url?: string | null;
  image_alt?: string | null;
  overview?: string[] | null;
  activities?: string[] | null;
  intended_participants?: string | null;
  status?: string;
};

type ProjectFormProps = {
  project?: ProjectData;
  action: (formData: FormData) => void | Promise<void>;
  mode: "create" | "edit";
};

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";

const labelClass = "block text-sm font-semibold text-slate-700";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

export function ProjectForm({
  project,
  action,
  mode,
}: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  function handleTitleChange(nextTitle: string) {
    setTitle(nextTitle);

    if (!slugTouched) {
      setSlug(slugify(nextTitle));
    }
  }

  const overview = project?.overview ?? [];
  const activities = project?.activities ?? [];

  return (
    <form action={action} className="mx-auto max-w-5xl space-y-6">
      {mode === "edit" && (
        <input type="hidden" name="id" value={String(project?.id ?? "")} />
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-900">
          Project information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Basic details displayed on the public website.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Project title *
            <input
              name="title"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              required
              maxLength={180}
              className={inputClass}
              placeholder="e.g. Youth Leadership & Empowerment"
            />
          </label>

          <label className={labelClass}>
            URL slug *
            <input
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(slugify(event.target.value));
              }}
              required
              maxLength={180}
              className={inputClass}
              placeholder="youth-leadership"
            />
            <span className="mt-1 block text-xs font-normal text-slate-500">
              Public URL: /projects/{slug || "project-name"}
            </span>
          </label>

          <label className={labelClass}>
            Program *
            <input
              name="program"
              defaultValue={project?.program ?? ""}
              required
              maxLength={120}
              className={inputClass}
              placeholder="e.g. Education"
            />
          </label>

          <label className={labelClass}>
            Location
            <input
              name="location"
              defaultValue={project?.location ?? "Mangochi, Malawi"}
              maxLength={180}
              className={inputClass}
              placeholder="Mangochi, Malawi"
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Summary *
            <textarea
              name="summary"
              defaultValue={project?.summary ?? ""}
              required
              maxLength={1500}
              rows={4}
              className={inputClass}
              placeholder="Briefly explain the project and its purpose."
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-900">
          Project cover image
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload a cover photograph or replace the current image. Your changes are uploaded securely to Object Storage.
        </p>

        {mode === "edit" && project?.id ? (
          <div className="mt-5">
            <ProjectCoverUpload
              projectId={String(project.id)}
              initialImageUrl={project.image_url}
              initialAlt={project.image_alt}
            />
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Save this project first. You can then upload its cover image from the edit page.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-900">
          Overview and activities
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Put each paragraph or activity on a separate line.
        </p>

        <div className="mt-5 space-y-5">
          <label className={labelClass}>
            Overview paragraphs
            <textarea
              name="overview"
              defaultValue={overview.join("\n\n")}
              rows={7}
              className={inputClass}
              placeholder={"Describe the project.\n\nExplain why it matters."}
            />
          </label>

          <label className={labelClass}>
            Activities
            <textarea
              name="activities"
              defaultValue={activities.join("\n")}
              rows={6}
              className={inputClass}
              placeholder={"Community workshops\nMentorship sessions\nTraining"}
            />
          </label>

          <label className={labelClass}>
            Intended participants
            <textarea
              name="intended_participants"
              defaultValue={project?.intended_participants ?? ""}
              maxLength={1500}
              rows={3}
              className={inputClass}
              placeholder="Who is this project intended to support?"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-900">
          Publication
        </h2>

        <label className={`${labelClass} mt-5 block max-w-sm`}>
          Project status
          <select
            name="status"
            defaultValue={project?.status ?? "draft"}
            className={inputClass}
          >
            <option value="draft">Draft — not published</option>
            <option value="published">Published — visible to visitors</option>
            <option value="archived">Archived — no longer active</option>
          </select>
        </label>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/admin/projects"
          className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-900"
        >
          {mode === "create" ? "Create project" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
