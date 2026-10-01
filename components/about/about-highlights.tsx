import { Heart, Sprout, UsersRound, HandHeart } from "lucide-react";

const highlights = [
  { title: "Youth-Led", detail: "Driven by young people, for young people", icon: UsersRound },
  { title: "Community Focus", detail: "Working hand in hand with local communities", icon: Heart },
  { title: "Sustainable Change", detail: "Skills, opportunities and resilient communities", icon: Sprout },
  { title: "Inclusive", detail: "Leaving no one behind", icon: HandHeart },
];

export function AboutHighlights() {
  return (
    <section aria-label="Our approach" className="border-b border-slate-200 bg-white py-5">
      <div className="container-moyone grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
        {highlights.map(({ title, detail, icon: Icon }, index) => (
          <div key={title} className={`flex items-center gap-3 sm:px-5 ${index > 0 ? "sm:border-l sm:border-slate-200" : "sm:pl-0"}`}>
            <Icon size={30} strokeWidth={2.2} className="shrink-0 text-[var(--moyone-green)]" aria-hidden="true" />
            <div><h2 className="text-xs font-extrabold text-slate-900 sm:text-sm">{title}</h2><p className="mt-1 text-[10px] leading-4 text-slate-600 sm:text-xs">{detail}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
