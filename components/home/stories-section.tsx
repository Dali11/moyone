import Image from "next/image";
import Link from "next/link";
import { stories } from "@/lib/stories";

export function StoriesSection() {
  return (
    <section id="stories" className="border-y border-slate-200 bg-[#fbfcfa] py-12 sm:py-14">
      <div className="container-moyone">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">Program updates</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-[32px]">Our work in the community</h2>
          </div>
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--moyone-green)] underline decoration-emerald-200 underline-offset-4">
            View All Stories <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {stories.slice(0, 3).map(({ title, text, image, alt, slug, subject }) => (
            <article key={title} className="flex min-h-[132px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative w-[38%] shrink-0">
                <Image src={image} alt={alt} fill sizes="(max-width: 767px) 100vw, 13vw" className="object-cover" />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{subject}</p>
                <Link href={`/stories/${slug}`} className="mt-1 block text-sm font-extrabold leading-tight hover:text-[var(--moyone-green)]">{title}</Link>
                <p className="mt-1.5 text-[11px] leading-[1.4] text-slate-600">{text}</p>
                <p className="mt-1 text-[9px] text-slate-400">Illustrative image</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
