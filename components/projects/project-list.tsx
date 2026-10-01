import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "@/lib/projects";
import { SiteHeader } from "@/components/site-header";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";

export function ProjectList() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-[#fbfcfa] py-12 sm:py-16">
        <div className="container-moyone">
          <p className="section-label">Our work</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Projects</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            We work alongside young people and communities in Mangochi to create opportunities, build skills and make lasting change. Explore the initiatives that bring our mission to life.
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500">
            The images below are illustrative concepts created to show the activities each project focuses on. We will replace them with photographs of our work when those images are available.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[1.8] overflow-hidden bg-slate-100">
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white">Illustrative concept</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="section-label">{project.program}</p>
                    <h2 className="mt-2 text-xl font-extrabold text-slate-900">{project.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{project.location}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)]">
                      Explore this work <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
