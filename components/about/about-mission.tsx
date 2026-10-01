import Image from "next/image";
import { Eye, Heart, Target } from "lucide-react";

const values = [
  { name: "Innovation & creativity", detail: "Practical solutions to community challenges." },
  { name: "Transparency & accountability", detail: "Openness and responsible leadership." },
  { name: "Integrity & confidentiality", detail: "Honesty and protection of community trust." },
  { name: "Volunteerism & commitment", detail: "Youth volunteers driving change with dedication." },
  { name: "Inclusion & equity", detail: "Including marginalized young people in development." },
  { name: "Sustainability & growth", detail: "Long-term programs that can expand across Malawi." },
];

export function AboutMission() {
  return (
    <section className="relative isolate overflow-hidden bg-[#043c29] py-9 text-white sm:py-11">
      <Image src="/images/lake-malawi-shore.png" alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[#012d20]/90" aria-hidden="true" />
      <div className="container-moyone grid gap-7 md:grid-cols-3 md:gap-0">
        <article className="flex gap-4 md:pr-7">
          <Target size={35} strokeWidth={1.8} className="shrink-0 text-[var(--moyone-lime)]" aria-hidden="true" />
          <div><h2 className="text-base font-extrabold">Our Mission</h2><p className="mt-2 text-sm leading-5 text-white/80">To educate, empower and engage communities through innovative programs that build leadership, skills and resilience for social, economic and environmental transformation.</p></div>
        </article>
        <article className="flex gap-4 md:border-l md:border-white/25 md:px-7">
          <Eye size={35} strokeWidth={1.8} className="shrink-0 text-[var(--moyone-lime)]" aria-hidden="true" />
          <div><h2 className="text-base font-extrabold">Our Vision</h2><p className="mt-2 text-sm leading-5 text-white/80">To cultivate empowered youth, women and children who drive sustainable, equitable and innovative transformation in Malawi’s rural communities.</p></div>
        </article>
        <article className="flex gap-4 md:border-l md:border-white/25 md:pl-7">
          <Heart size={35} strokeWidth={1.8} className="shrink-0 text-[var(--moyone-lime)]" aria-hidden="true" />
          <div><h2 className="text-base font-extrabold">Our Core Values</h2><ul className="mt-2 space-y-2 text-[11px] leading-4 text-white/85">{values.map(({ name, detail }) => <li key={name}><span className="font-bold text-white">✓ {name}</span><span className="block pl-4 text-white/65">{detail}</span></li>)}</ul></div>
        </article>
      </div>
    </section>
  );
}
