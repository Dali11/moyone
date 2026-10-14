import Link from "next/link";
import { sql } from "@/lib/db/client";
import { BookOpen, FolderKanban, Sprout, Images, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [storyCounts] = await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'published')::int AS published,
      COUNT(*) FILTER (WHERE status = 'draft')::int AS drafts,
      COUNT(*) FILTER (WHERE status = 'archived')::int AS archived
    FROM stories
  `;

  const stats = [
    { label: "Total stories", value: storyCounts.total, icon: BookOpen },
    { label: "Published", value: storyCounts.published, icon: ArrowUpRight },
    { label: "Drafts", value: storyCounts.drafts, icon: FolderKanban },
    { label: "Archived", value: storyCounts.archived, icon: Sprout },
  ];

  const modules = [
    { title: "Stories", description: "Create, edit and publish community updates.", href: "/admin/stories", icon: BookOpen },
    { title: "Projects", description: "Manage projects, activities and locations.", href: "/admin/projects", icon: FolderKanban },
    { title: "Programs", description: "Maintain MOYONE's program areas.", href: "/admin/programs", icon: Sprout },
    { title: "Media library", description: "Organize photographs and other media.", href: "/admin/media", icon: Images },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Overview</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-500">Manage MOYONE's website and organizational content.</p>
        </div>
        <Link href="/admin/stories" className="inline-flex items-center justify-center rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-900">
          Manage stories
        </Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <Icon size={19} className="text-emerald-800" />
              </div>
              <p className="mt-4 text-3xl font-black text-slate-900">{stat.value}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-extrabold text-slate-900">Content management</h2>
        <p className="mt-1 text-sm text-slate-500">Choose an area to manage.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.title} href={module.href} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{module.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-800">
                  Open module <ArrowUpRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
