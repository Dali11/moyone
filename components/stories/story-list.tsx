import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";
import { stories } from "@/lib/stories";

export function StoryList() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-[#fbfcfa] py-12 sm:py-16">
        <div className="container-moyone">
          <p className="section-label">Program updates</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Our work in the community</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Stories from our work in education, health, livelihoods and inclusion, and the communities working alongside us.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {stories.map((story) => (
              <article key={story.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[1.8] bg-slate-100">
                  <Image src={story.image} alt={story.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="section-label">{story.subject}</p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-900">{story.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{story.text}</p>
                  <p className="mt-2 text-[10px] text-slate-400">Illustrative image</p>
                  <Link href={`/stories/${story.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)] hover:underline">
                    Read update <ArrowRight size={16} />
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
