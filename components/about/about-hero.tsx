import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ChevronRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Image src="/images/hero.png" alt="Illustrative image of young people learning together in Malawi" fill priority sizes="100vw" className="-z-20 object-cover object-[58%_42%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#022e21]/95 via-[#023b2a]/80 to-[#022e21]/15" aria-hidden="true" />
      <div className="container-moyone grid min-h-[420px] items-center gap-8 py-12 sm:min-h-[470px] lg:grid-cols-[1fr_.52fr] lg:py-16">
        <div className="max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs font-medium text-emerald-200">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={14} /><span aria-current="page">About</span>
          </nav>
          <h1 className="text-5xl font-black leading-none tracking-[-.045em] sm:text-6xl">About <span className="text-[var(--moyone-lime)]">MOYONE</span></h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
            A youth-led organization in Mangochi, Malawi, working with communities to create opportunities through education, skills, entrepreneurship and community development.
          </p>
          <a href="#our-story" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--moyone-lime)] px-6 py-3 text-sm font-extrabold text-[#063b27] transition hover:bg-white">
            Our Story <ArrowDown size={16} />
          </a>
        </div>
        <blockquote className="hidden max-w-xs justify-self-end font-serif text-2xl italic leading-snug text-white drop-shadow-md lg:block">
          “Young people building stronger communities today for a brighter Malawi tomorrow.”
          <span className="mt-4 block h-1 w-24 rounded bg-[var(--moyone-lime)]" />
        </blockquote>
      </div>
    </section>
  );
}
