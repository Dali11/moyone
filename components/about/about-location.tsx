import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MalawiLocator } from "@/components/home/where-we-work";

export function AboutLocation() {
  return (
    <section className="border-t border-slate-200 bg-[#fbfcfa] py-9 sm:py-12">
      <div className="container-moyone grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="grid gap-5 sm:grid-cols-[.6fr_1fr] sm:items-center">
          <MalawiLocator />
          <div>
            <p className="section-label">Where we work</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Rooted in Mangochi</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">We are based in Mangochi, Malawi, and work with local communities and young people to support lasting change.</p>
            <Link href="/projects" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)] hover:underline">Explore our work <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="relative min-h-[260px] overflow-hidden rounded-2xl">
          <Image src="/images/lake-malawi-shore.png" alt="Illustrative view of Lake Malawi near Mangochi" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#043c29]/40 to-transparent" aria-hidden="true" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[var(--moyone-green-dark)]">Mangochi, Malawi</span>
        </div>
      </div>
    </section>
  );
}
