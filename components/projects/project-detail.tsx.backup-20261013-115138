import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, MapPin } from "lucide-react";
import type { Project } from "@/lib/projects";
import { SiteHeader } from "@/components/site-header";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main>
      <SiteHeader />
      <article>
        <div className="container-moyone py-5">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--moyone-green)] hover:underline">
            <ArrowLeft size={16} /> Back to projects
          </Link>
        </div>

        <header className="container-moyone grid gap-7 pb-9 lg:grid-cols-[1fr_.85fr] lg:items-center lg:gap-12 lg:pb-12">
          <div>
            <p className="section-label">Our work</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[var(--moyone-green)]" />{project.location}</span>
              <span className="inline-flex items-center gap-2"><BookOpen size={16} className="text-[var(--moyone-green)]" />{project.program}</span>
            </div>
          </div>
          <div className="relative aspect-[1.45] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white">Illustrative concept image</span>
          </div>
        </header>

        <section className="border-y border-slate-200 bg-[#fbfcfa] py-10 sm:py-14">
          <div className="container-moyone grid gap-9 lg:grid-cols-[minmax(0,2fr)_minmax(230px,1fr)] lg:gap-16">
            <div>
              <p className="section-label">About this project</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">How we make a difference</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-extrabold text-slate-900">Project at a glance</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Location</dt><dd className="mt-1 font-semibold text-slate-800">{project.location}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Focus area</dt><dd className="mt-1 font-semibold text-slate-800">{project.program}</dd></div>
              </dl>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">Our organizational profile shares more about our work and impact. <a className="font-semibold text-[var(--moyone-green)] underline" href="https://moyone.org/images/MOYONE%20PROFILE%20FINAL.pdf">Read our profile</a>.</p>
            </aside>
          </div>
        </section>

        <div className="container-moyone py-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)] hover:underline">
            Explore more of our work <ArrowRight size={16} />
          </Link>
        </div>
      </article>
      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
