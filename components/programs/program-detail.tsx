import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Program } from "@/lib/programs";
import { SiteHeader } from "@/components/site-header";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";

export function ProgramDetail({ program }: { program: Program }) {
  return (
    <main>
      <SiteHeader />
      <article>
        <div className="container-moyone py-5">
          <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--moyone-green)] hover:underline">
            <ArrowLeft size={16} /> All programs
          </Link>
        </div>

        <header className="container-moyone grid gap-7 pb-10 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-12 lg:pb-14">
          <div>
            <p className="section-label">Our programs</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{program.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{program.text}</p>
            <a href="/#contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--moyone-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--moyone-green-dark)]">
              Partner with us <ArrowRight size={16} />
            </a>
          </div>
          <div className="relative aspect-[1.45] overflow-hidden rounded-2xl bg-slate-100">
            <Image src={program.image} alt={program.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white">Illustrative concept image</span>
          </div>
        </header>

        <section className="border-y border-slate-200 bg-[#fbfcfa] py-10 sm:py-14">
          <div className="container-moyone grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)] lg:gap-16">
            <div>
              <p className="section-label">Program overview</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Supporting lasting community change</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{program.text} These activities are part of our integrated, community-driven work in Mangochi and beyond.</p>
              <h3 className="mt-6 text-sm font-extrabold text-slate-900">Activities include</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {program.activities.map((activity) => <li key={activity} className="flex gap-2"><span className="font-bold text-[var(--moyone-green)]" aria-hidden="true">✓</span>{activity}</li>)}
              </ul>
              <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">Learn more about our work in our <a className="underline" href="https://moyone.org/about.html">About page</a> and <a className="underline" href="https://moyone.org/images/MOYONE%20PROFILE%20FINAL.pdf">organizational profile</a>.</p>
            </div>
            <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-extrabold text-slate-900">Explore other programs</h2>
              <ul className="mt-3 space-y-2">
                <li><Link href="/programs" className="text-sm font-semibold text-[var(--moyone-green)] hover:underline">View all program areas <ArrowRight className="ml-1 inline" size={14} /></Link></li>
                <li><Link href="/projects" className="text-sm font-semibold text-[var(--moyone-green)] hover:underline">Explore our projects <ArrowRight className="ml-1 inline" size={14} /></Link></li>
              </ul>
            </aside>
          </div>
        </section>
      </article>
      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
