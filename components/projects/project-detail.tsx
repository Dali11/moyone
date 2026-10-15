import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MapPin,
  Users,
  HandHeart,
  CheckCircle2,
} from "lucide-react";
import type { Project } from "@/lib/projects";
import { SiteHeader } from "@/components/site-header";
import {
  GetInvolvedSection,
  SiteFooter,
} from "@/components/home/get-involved-section";

export function ProjectDetail({
  project,
  projects,
}: {
  project: Project;
  projects: Project[];
}) {
  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const usesNeonImage = project.image.startsWith("/api/media/");

  return (
    <main>
      <SiteHeader />

      <article>
        <div className="container-moyone py-5">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--moyone-green)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to projects
          </Link>
        </div>

        <header className="container-moyone grid gap-8 pb-12 pt-4 sm:pb-16 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-12">
          <div>
            <p className="section-label">Our work in Mangochi</p>

            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-[var(--moyone-ink)] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <MapPin
                  size={17}
                  className="text-[var(--moyone-green)]"
                  aria-hidden="true"
                />
                {project.location}
              </span>

              <span className="inline-flex items-center gap-2">
                <BookOpen
                  size={17}
                  className="text-[var(--moyone-green)]"
                  aria-hidden="true"
                />
                {project.program}
              </span>
            </div>

            <a
              href="#project-activities"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--moyone-green)] px-5 py-3 text-sm font-bold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moyone-green)]"
            >
              Discover our activities
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="relative aspect-[1.25] overflow-hidden rounded-2xl bg-emerald-50 shadow-sm sm:aspect-[1.4]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
            />

            {!usesNeonImage && (
              <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold text-white">
                Illustrative concept image
              </span>
            )}
          </div>
        </header>

        <section className="border-y border-slate-200 bg-[#fbfcfa] py-12 sm:py-16">
          <div className="container-moyone grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.8fr)] lg:gap-16">
            <div>
              <p className="section-label">About this project</p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-[var(--moyone-ink)] sm:text-4xl">
                Why this work matters
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div id="project-activities" className="mt-10 scroll-mt-24">
                <p className="section-label">Our approach</p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-[var(--moyone-ink)] sm:text-3xl">
                  What this work includes
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  Activities are shaped around the needs of young people and
                  communities. This initiative focuses on the following areas:
                </p>

                <ul className="mt-5 space-y-3">
                  {project.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[var(--moyone-green)]"
                        aria-hidden="true"
                      />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-extrabold text-[var(--moyone-ink)]">
                Project at a glance
              </h2>

              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-slate-800">
                    {project.location}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Focus area
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-slate-800">
                    {project.program}
                  </dd>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <dt className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Users
                      size={17}
                      className="text-[var(--moyone-green)]"
                      aria-hidden="true"
                    />
                    Who this work is for
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    {project.intendedParticipants}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <a
                  href="https://moyone.org/images/MOYONE%20PROFILE%20FINAL.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-[var(--moyone-green)] underline underline-offset-4"
                >
                  Read the MOYONE organizational profile
                </a>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                <HandHeart
                  size={22}
                  className="text-[var(--moyone-green)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3 text-sm font-extrabold text-slate-900">
                  Work with MOYONE
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Interested in supporting this area of work? Get in touch to
                  discuss potential collaboration.
                </p>
                <Link
                  href="/#contact"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)] hover:gap-3"
                >
                  Contact us
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-moyone">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="section-label">Discover more</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[var(--moyone-ink)] sm:text-4xl">
                  Related projects
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Explore other areas of MOYONE&apos;s community work.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex w-fit items-center gap-2 py-2 text-sm font-bold text-[var(--moyone-green)] hover:gap-3"
              >
                All projects
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((related) => (
                <Link
                  key={related.slug}
                  href={`/projects/${related.slug}`}
                  className="group rounded-xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--moyone-green)]"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--moyone-green)]">
                    {related.program}
                  </p>
                  <h3 className="mt-2 text-lg font-extrabold leading-snug text-slate-900">
                    {related.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)]">
                    Explore project
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
