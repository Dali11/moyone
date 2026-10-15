import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { sql } from "@/lib/db/client";
import { updateProject } from "@/lib/admin/project-actions";
import { ProjectForm } from "../../project-form";

export const dynamic = "force-dynamic";

type ProjectRow = {
  id: number | string;
  slug: string;
  title: string;
  location: string;
  program: string;
  summary: string;
  image_url: string | null;
  image_alt: string | null;
  overview: string[] | string | null;
  activities: string[] | string | null;
  intended_participants: string | null;
  status: string;
};

function parseJsonList(value: string[] | string | null): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await auth();

  const canEdit =
    session?.user?.role === "super_admin" ||
    session?.user?.role === "editor";

  if (!canEdit) {
    notFound();
  }

  const { id } = await params;
  const filters = await searchParams;

  if (!/^\d+$/.test(id)) notFound();

  const rows = (await sql`
    SELECT
      id, slug, title, location, program, summary,
      image_url, image_alt, overview, activities,
      intended_participants, status
    FROM projects
    WHERE id = ${id}
    LIMIT 1
  `) as ProjectRow[];

  if (!rows.length) notFound();

  const row = rows[0];

  const project = {
    ...row,
    overview: parseJsonList(row.overview),
    activities: parseJsonList(row.activities),
  };

  return (
    <section className="mx-auto max-w-7xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-800"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <div className="mb-7 mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
          Content management
        </p>
        <h1 className="mt-2 break-words text-3xl font-black tracking-tight text-slate-900">
          Edit project
        </h1>
        <p className="mt-2 break-all text-sm text-slate-500">
          {row.title} · {row.slug}
        </p>
      </div>

      {filters.saved === "1" && (
        <p className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          Project changes saved successfully.
        </p>
      )}

      <ProjectForm
        project={project}
        action={updateProject}
        mode="edit"
      />
    </section>
  );
}
