import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/lib/programs";

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="border-y border-slate-100 bg-white py-9 sm:py-14"
    >
      <div className="container-moyone">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">Our programs</p>

            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-[var(--moyone-ink)] sm:text-4xl">
              Key Areas of Our Work
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Discover the areas where MOYONE works with young people and
              communities to support opportunity, wellbeing and sustainable
              development.
            </p>
          </div>

          <Link
            href="/programs"
            className="inline-flex w-fit items-center gap-2 rounded-md py-2 text-sm font-bold text-[var(--moyone-green)] transition hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moyone-green)]"
          >
            Explore All Programs
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 sm:gap-4">
          {programs.map(
            ({ slug, title, text, image, alt }) => (
              <article
                key={slug}
                className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <Link
                  href={`/programs/${slug}`}
                  className="flex h-full flex-col rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--moyone-green)]"
                  aria-label={`${title}: learn more about this program`}
                >
                  <div className="relative aspect-[2.05/1] overflow-hidden bg-emerald-50 sm:aspect-[1.75/1]">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    

                    <h3 className="text-sm font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-[var(--moyone-green)]">
                      {title}
                    </h3>

                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                      {text}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--moyone-green)] sm:mt-4">
                      Learn more
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
