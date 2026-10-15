import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProject } from "@/lib/admin/project-actions";
import { ProjectForm } from "../project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
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
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          New project
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Add a project to MOYONE&apos;s project catalogue.
        </p>
      </div>

      <ProjectForm action={createProject} mode="create" />
    </section>
  );
}
