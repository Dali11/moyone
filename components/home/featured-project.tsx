import Image from "next/image";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";

export function FeaturedProject() {
  return (
    <section id="projects" className="border-y border-slate-200 bg-[#fbfcfa] py-8 sm:py-10">
      <div className="container-moyone grid gap-6 lg:grid-cols-[.98fr_1.02fr] lg:items-center lg:gap-8">
        <div className="group relative aspect-[1.55] overflow-hidden rounded-xl bg-slate-200 shadow-sm">
          <Image
            src="/images/projects/back-to-school-concept.png"
            alt="Illustrative concept: a volunteer gives schoolbooks to learners"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white">Illustrative concept image</span>
        </div>

        <div className="relative">
          <p className="section-label">Featured project</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-[32px]">Back to School Initiative</h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5"><MapPin size={15} className="text-[var(--moyone-green)]" /> Mangochi</span>
            <span className="inline-flex items-center gap-1.5"><BookOpen size={15} className="text-[var(--moyone-green)]" /> Education</span>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">We encourage children to attend school and help learners stay engaged through education campaigns, school materials and career guidance. From 2021 to 2025, we supported more than 800 learners through our Back to School activities.</p>
          <a href="/projects/back-to-school-initiative" className="mt-5 inline-flex items-center gap-2 rounded-md bg-[var(--moyone-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--moyone-green-dark)]">Read the Full Story <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  );
}
