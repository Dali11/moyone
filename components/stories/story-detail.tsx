import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";
import type { CommunityStory } from "@/lib/stories";

export function StoryDetail({ story }: { story: CommunityStory }) {
  return (
    <main>
      <SiteHeader />
      <article>
        <div className="container-moyone py-5">
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--moyone-green)] hover:underline">
            <ArrowLeft size={16} /> Back to stories
          </Link>
        </div>
        <header className="container-moyone grid gap-7 pb-10 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-12 lg:pb-14">
          <div>
            <p className="section-label">{story.subject} · Our work</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{story.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{story.text}</p>
          </div>
          <div className="relative aspect-[1.45] overflow-hidden rounded-2xl bg-slate-100">
            <Image src={story.image} alt={story.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white">Illustrative concept image</span>
          </div>
        </header>
        <section className="border-y border-slate-200 bg-[#fbfcfa] py-10 sm:py-14">
          <div className="container-moyone max-w-3xl">
            <h2 className="mt-8 text-2xl font-black tracking-tight">{story.title}</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              {story.details.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
            <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">Our impact figures cover 2021–2025. <a className="font-semibold text-[var(--moyone-green)] underline" href="https://moyone.org/images/MOYONE%20PROFILE%20FINAL.pdf">Read our organizational profile</a>.</p>
          </div>
        </section>
      </article>
      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
