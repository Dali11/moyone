import {
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Users,
} from "lucide-react";

const impact = [
  {
    number: "1,500+",
    label: "Youth empowered",
    note: "Through leadership and vocational training",
    icon: Users,
  },
  {
    number: "800+",
    label: "Learners supported",
    note: "Through our Back to School initiative",
    icon: GraduationCap,
  },
  {
    number: "2,000+",
    label: "Households reached",
    note: "Through health and sanitation campaigns",
    icon: HeartHandshake,
  },
  {
    number: "300+",
    label: "Youth trained",
    note: "In entrepreneurship and agribusiness",
    icon: BriefcaseBusiness,
  },
];

export function ImpactStrip() {
  return (
    <section
      id="impact"
      className="border-b border-slate-200 bg-[#f8fafc] py-7 sm:py-8"
    >
      <div className="container-moyone grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-0">
        {impact.map(({ number, label, note, icon: Icon }, index) => (
          <article
            key={label}
            className={`min-w-0 px-1 sm:px-4 lg:px-5 ${
              index > 0 ? "sm:border-l sm:border-slate-200" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[var(--moyone-primary)] shadow-sm ring-1 ring-slate-100 sm:grid">
                <Icon size={24} />
              </div>

              <div className="min-w-0">
                <div className="text-[26px] font-black leading-none tracking-tight text-[var(--moyone-primary-dark)] sm:text-[27px]">
                  {number}
                </div>

                <div className="mt-2 text-[13px] font-bold leading-snug text-slate-900 sm:text-sm">
                  {label}
                </div>

                <p className="mt-1 hidden text-xs leading-relaxed text-slate-500 sm:block">
                  {note}
                </p>

                <p className="mt-2 text-[10px] leading-relaxed text-slate-400 sm:text-[11px]">
                  Our impact · 2021–2025
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
