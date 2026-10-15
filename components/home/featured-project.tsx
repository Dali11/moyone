import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";

export function FeaturedProject() {
  return (
    <section
      aria-labelledby="featured-project-title"
      className="border-y border-slate-200 bg-[#f8fafc] py-12 sm:py-16 lg:py-20"
    >
      <div className="container-moyone">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Our work in action</p>
            <span className="accent-rule mt-2" aria-hidden="true" />
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--moyone-ink)] sm:text-3xl">
              Projects making a difference
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 py-2 text-sm font-bold text-[var(--moyone-primary)] transition hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moyone-primary)]"
          >
            Explore our projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="relative min-h-[250px] overflow-hidden bg-brand-50 sm:min-h-[360px] lg:min-h-[420px]">
            <Image
              src="/api/media/program/education"
              alt="Illustrative concept of a volunteer distributing school materials to learners"
              fill
              priority={false}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white">
              Illustrative concept image
            </span>
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10 xl:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--moyone-primary)]">
              Project spotlight
            </p>

            <h3
              id="featured-project-title"
              className="mt-3 max-w-lg text-3xl font-black leading-tight tracking-tight text-[var(--moyone-ink)] sm:text-4xl"
            >
              Back to School Initiative
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-slate-700">
                <MapPin
                  size={15}
                  className="text-[var(--moyone-primary)]"
                  aria-hidden="true"
                />
                Mangochi, Malawi
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-slate-700">
                <BookOpen
                  size={15}
                  className="text-[var(--moyone-primary)]"
                  aria-hidden="true"
                />
                Education
              </span>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Every child deserves an opportunity to learn. Through back-to-school
              activities, school-material support and career guidance, MOYONE
              works to encourage school attendance and help learners stay
              engaged in their education.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              From 2021 to 2025, MOYONE reported supporting more than 800 learners
              through its Back to School activities.
            </p>

            <div className="mt-7">
              <Link
                href="/projects/back-to-school-initiative"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--moyone-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--moyone-primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moyone-primary)] sm:w-fit"
              >
                Explore this project
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
