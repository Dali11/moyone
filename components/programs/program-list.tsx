import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";
import { programs } from "@/lib/programs";

export function ProgramList() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-[#fbfcfa] py-12 sm:py-16">
        <div className="container-moyone">
          <p className="section-label">Our programs</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Key Areas of Our Work</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            We work alongside young people and communities across education, health, livelihoods, leadership and environmental action.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(({ slug, title, text, icon: Icon, image, alt, badge }) => (
              <article key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image src={image} alt={alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                  <div className={`absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-white text-white shadow ${badge}`}>
                    <Icon size={20} strokeWidth={2.3} />
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-extrabold text-slate-900"><Link href={`/programs/${slug}`} className="hover:text-[var(--moyone-green)]">{title}</Link></h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  <Link href={`/programs/${slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)] hover:underline">
                    Learn about this program <ArrowRight size={16} />
                  </Link>
                </div>
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
