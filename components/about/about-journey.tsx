import { ArrowRight, CalendarDays, GraduationCap, Sprout, UsersRound, Accessibility, House } from "lucide-react";
import Link from "next/link";

const milestones = [
  { year: "2022", detail: "We were established in Mangochi.", icon: CalendarDays },
  { year: "2023", detail: "Youth empowerment programs were launched.", icon: UsersRound },
  { year: "2024", detail: "Community development projects expanded and Moyone Farm was established.", icon: Sprout },
];

const outcomes = [
  { value: "1,500+", detail: "youth empowered through leadership and vocational training", icon: UsersRound },
  { value: "800+", detail: "learners supported through the Back to School initiative", icon: GraduationCap },
  { value: "300+", detail: "youth trained in entrepreneurship and agribusiness", icon: Sprout },
  { value: "2,000+", detail: "households reached through health and sanitation campaigns", icon: House },
  { value: "15", detail: "people with disabilities supported with mobility aids and health referrals", icon: Accessibility },
  { value: "1,000+", detail: "youth engaged through sports-based awareness campaigns", icon: UsersRound },
];

export function AboutJourney() {
  return (
    <>
      <section className="border-y border-slate-200 bg-[#fbfcfa] py-10 sm:py-14">
        <div className="container-moyone grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <div>
            <p className="section-label">Our journey</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Growing with our community</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">Since our founding in Mangochi, we have grown our youth-led work through education, leadership and community development.</p>
            <Link href="/programs" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--moyone-green)] hover:underline">Explore our programs <ArrowRight size={16} /></Link>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {milestones.map(({ year, detail, icon: Icon }) => (
              <li key={year} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <Icon size={23} className="text-[var(--moyone-green)]" aria-hidden="true" />
                <p className="mt-3 text-xl font-black text-[var(--moyone-green-dark)]">{year}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-moyone">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><p className="section-label">Reported impact</p><h2 className="mt-2 text-3xl font-black tracking-tight">Progress in communities</h2></div>
            <p className="max-w-md text-xs leading-5 text-slate-500">Our <a className="underline" href="https://moyone.org/images/MOYONE%20PROFILE%20FINAL.pdf">organizational profile</a> shares these figures for 2021–2025. Our <a className="underline" href="https://moyone.org/about.html">About page</a> lists 2022 as our founding year; the impact figures cover an earlier period as well.</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {outcomes.map(({ value, detail, icon: Icon }) => (
              <article key={detail} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <Icon size={22} className="text-[var(--moyone-green)]" aria-hidden="true" />
                <p className="mt-3 text-2xl font-black tracking-tight text-[var(--moyone-green-dark)]">{value}</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
