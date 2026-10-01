import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, MapPin, UsersRound } from "lucide-react";

const organizationFacts = [
  { title: "Founded", detail: "2022", icon: CalendarDays },
  { title: "Registered with", detail: "National Youth Council of Malawi (NYCOM)", icon: FileText },
  { title: "Based in", detail: "Mangochi, Malawi", icon: MapPin },
  { title: "Legal status", detail: "Youth-led, non-political and non-profit organization", icon: UsersRound },
];

export function AboutStory() {
  return (
    <section id="our-story" className="scroll-mt-24 py-10 sm:py-14">
      <div className="container-moyone">
        <div className="grid gap-7 lg:grid-cols-[1.05fr_.95fr_.6fr] lg:items-center lg:gap-6">
          <div>
            <p className="section-label">Our story</p>
            <h2 className="mt-2 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">From a local idea to a <span className="text-[var(--moyone-green)]">growing movement</span></h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">We are a youth-led, non-political, non-profit organization founded in 2022 and registered with the National Youth Council of Malawi. We are based in Mangochi District.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">We work with young people, women and children in our communities to address challenges including school dropouts, early marriage, gender-based violence, unemployment, environmental degradation and limited civic participation. Our work spans education, health, agriculture, the environment, civic engagement and sports.</p>
            <Link href="/programs" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--moyone-green)] px-5 py-3 text-xs font-bold text-white transition hover:bg-[var(--moyone-green-dark)]">
              Explore Our Programs <ArrowRight size={15} />
            </Link>
          </div>

          <figure className="relative aspect-[1.34] overflow-hidden rounded-xl bg-slate-100 shadow-sm">
            <Image src="/images/projects/back-to-school-concept.png" alt="Illustrative concept: a volunteer gives schoolbooks to learners" fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 text-xs font-semibold text-white">Illustrative image · community learning</figcaption>
          </figure>

          <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {organizationFacts.map(({ title, detail, icon: Icon }) => (
              <div key={title} className="flex min-h-[68px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Icon size={23} className="shrink-0 text-[var(--moyone-green)]" aria-hidden="true" />
                <div><dt className="text-[11px] font-extrabold text-slate-900">{title}</dt><dd className="mt-0.5 text-xs leading-4 text-slate-600">{detail}</dd></div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
