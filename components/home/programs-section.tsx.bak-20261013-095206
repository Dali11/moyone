import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { programs } from "@/lib/programs";

export function ProgramsSection() {
  return (
    <section id="programs" className="py-10 sm:py-12">
      <div className="container-moyone">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">Our programs</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-[32px]">Key Areas of Our Work</h2>
          </div>
          <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--moyone-green)] underline decoration-emerald-200 underline-offset-4">
            Explore All Programs <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {programs.map(({ slug, title, text, icon: Icon, image, alt, badge }) => (
            <article key={title} className="group rounded-xl border border-slate-200/90 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[92px] rounded-t-xl">
                <div className="absolute inset-0 overflow-hidden rounded-t-xl">
                  <Image src={image} alt={alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
                </div>
                <div className={`absolute -bottom-4 left-3 grid h-9 w-9 place-items-center rounded-full border-[3px] border-white text-white shadow-sm ${badge}`}>
                  <Icon size={17} strokeWidth={2.5} />
                </div>
              </div>
              <div className="min-h-[89px] p-3 pt-6">
                <h3 className="text-[13px] font-extrabold leading-tight text-slate-900"><Link href={`/programs/${slug}`} className="hover:text-[var(--moyone-green)]">{title}</Link></h3>
                <p className="mt-1.5 text-[11px] leading-[1.35] text-slate-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
