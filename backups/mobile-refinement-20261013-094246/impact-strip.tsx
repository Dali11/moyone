import { BriefcaseBusiness, GraduationCap, HeartHandshake, Users } from "lucide-react";

const impact = [
  { number: "1,500+", label: "Youth empowered", note: "Through leadership and vocational training", icon: Users },
  { number: "800+", label: "Learners supported", note: "Through our Back to School initiative", icon: GraduationCap },
  { number: "2,000+", label: "Households reached", note: "Through health and sanitation campaigns", icon: HeartHandshake },
  { number: "300+", label: "Youth trained", note: "In entrepreneurship and agribusiness", icon: BriefcaseBusiness },
];

export function ImpactStrip() {
  return (
    <section id="impact" className="border-b border-slate-200 bg-[#fbfcfa] py-5 sm:py-6">
      <div className="container-moyone grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-0">
        {impact.map(({ number, label, note, icon: Icon }, index) => (
          <article key={label} className={`flex items-start gap-3 px-2 sm:px-4 lg:px-5 ${index > 0 ? "sm:border-l sm:border-slate-200" : ""}`}>
            <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-[var(--moyone-green)] shadow-sm ring-1 ring-slate-100 sm:grid"><Icon size={27} fill="currentColor" fillOpacity={.12} /></div>
            <div>
              <div className="text-2xl font-black leading-none tracking-tight text-[var(--moyone-green-dark)] sm:text-[27px]">{number}</div>
              <div className="mt-1 text-[13px] font-semibold leading-tight text-slate-900">{label}</div>
              <p className="mt-1 hidden text-[11px] leading-snug text-slate-500 sm:block">{note}</p>
              <p className="mt-1 text-[10px] text-slate-400">Our impact · 2021–2025</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
