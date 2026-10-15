import Link from "next/link";
import { sql } from "@/lib/db/client";
import { auth } from "@/auth";
import { changeProjectStatus } from "@/lib/admin/project-actions";
import {
  FolderKanban,
  Plus,
  Search,
  ExternalLink,
  Pencil,
} from "lucide-react";

export const dynamic = "force-dynamic";

type ProjectRow = {
  id: number | string;
  slug: string;
  title: string;
  location: string;
  program: string;
  summary: string;
  status: string;
  updated_at: string | Date | null;
};

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    deleted?: string;
    missing?: string;
  }>;
}) {
  const session = await auth();
  const canEdit =
    session?.user?.role === "super_admin" ||
    session?.user?.role === "editor";

  const filters = await searchParams;
  const q = (filters.q ?? "").trim().slice(0, 100);
  const status = ["draft", "published", "archived"].includes(
    filters.status ?? "",
  )
    ? filters.status!
    : "";

  const rows = (await sql`
    SELECT id, slug, title, location, program, summary, status, updated_at
    FROM projects
    WHERE (${q} = '' OR title ILIKE ${"%" + q + "%"}
      OR slug ILIKE ${"%" + q + "%"}
      OR location ILIKE ${"%" + q + "%"})
      AND (${status} = '' OR status = ${status})
    ORDER BY updated_at DESC NULLS LAST, created_at DESC
  `) as ProjectRow[];

  const countRows = await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'published')::int AS published,
      COUNT(*) FILTER (WHERE status = 'draft')::int AS drafts,
      COUNT(*) FILTER (WHERE status = 'archived')::int AS archived
    FROM projects
  `;

  const counts = countRows[0] as {
    total: number;
    published: number;
    drafts: number;
    archived: number;
  };

  const stats = [
    { label: "Total projects", value: counts.total },
    { label: "Published", value: counts.published },
    { label: "Drafts", value: counts.drafts },
    { label: "Archived", value: counts.archived },
  ];

  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-800">
            Content management
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Projects
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage project descriptions, activities, locations and publication status.
          </p>
        </div>

        {canEdit && (
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white hover:bg-brand-900"
          >
            <Plus size={18} />
            New project
          </Link>
        )}
      </div>

      {filters.deleted === "1" && (
        <p className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          Project deleted successfully.
        </p>
      )}

      {filters.missing === "1" && (
        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          That project could not be found.
        </p>
      )}

      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">
              {stat.value}
            </p>
          </article>
        ))}
      </div>

      <form className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_180px_auto]">
        <label className="relative block">
          <span className="sr-only">Search projects</span>
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search projects, slugs or locations..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-brand-700"
          />
        </label>

        <label>
          <span className="sr-only">Filter by status</span>
          <select
            name="status"
            defaultValue={status}
            className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <button className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
          Filter projects
        </button>
      </form>

      <div className="mt-5 grid gap-4 md:hidden">
        {rows.map((project) => (
          <article
            key={String(project.id)}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="break-words font-bold text-slate-900">
                  {project.title}
                </h2>
                <p className="mt-1 break-all text-xs text-slate-400">
                  {project.slug}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                  project.status === "published"
                    ? "bg-brand-50 text-brand-800"
                    : project.status === "draft"
                      ? "bg-amber-50 text-amber-800"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {project.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {project.summary}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-lg bg-slate-100 px-2.5 py-1.5">
                {project.program}
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1.5">
                {project.location}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-slate-100 pt-3 text-sm">
              {canEdit && (
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="inline-flex items-center gap-1 font-semibold text-brand-800"
                >
                  <Pencil size={14} /> Edit
                </Link>
              )}

              {project.status === "published" && (
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 font-semibold text-slate-600"
                >
                  View <ExternalLink size={14} />
                </Link>
              )}

              {canEdit && project.status !== "archived" && (
                <form action={changeProjectStatus}>
                  <input type="hidden" name="id" value={String(project.id)} />
                  <input type="hidden" name="status" value="archived" />
                  <button className="font-semibold text-rose-700">
                    Archive
                  </button>
                </form>
              )}
            </div>
          </article>
        ))}

        {rows.length === 0 && (
          <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No projects match these filters.
          </p>
        )}
      </div>

      <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Project</th>
                <th className="px-5 py-4">Program / location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((project) => (
                <tr key={String(project.id)} className="align-top hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{project.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{project.slug}</p>
                    <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                      {project.summary}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-700">{project.program}</p>
                    <p className="mt-1 text-xs text-slate-500">{project.location}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        project.status === "published"
                          ? "bg-brand-50 text-brand-800"
                          : project.status === "draft"
                            ? "bg-amber-50 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {project.updated_at
                      ? new Date(project.updated_at).toLocaleDateString("en-GB")
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {canEdit && (
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="font-semibold text-brand-800 hover:underline"
                        >
                          Edit
                        </Link>
                      )}
                      {project.status === "published" && (
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="font-semibold text-slate-600 hover:underline"
                        >
                          View ↗
                        </Link>
                      )}
                      {canEdit && project.status !== "archived" && (
                        <form action={changeProjectStatus}>
                          <input type="hidden" name="id" value={String(project.id)} />
                          <input type="hidden" name="status" value="archived" />
                          <button className="font-semibold text-rose-700 hover:underline">
                            Archive
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                    No projects match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <FolderKanban size={14} />
        Showing {rows.length} matching project{rows.length === 1 ? "" : "s"}.
      </p>
    </section>
  );
}
