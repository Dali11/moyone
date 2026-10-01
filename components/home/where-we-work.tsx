import Image from "next/image";
import { MapPin } from "lucide-react";

export function MalawiLocator() {
  return (
    <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden rounded-2xl bg-[#f3f8f1] sm:min-h-[300px] lg:rounded-none lg:bg-transparent">
      <div className="absolute -left-8 -top-8 h-56 w-56 rounded-full border-[25px] border-emerald-100/60" aria-hidden="true" />
      <svg viewBox="-4 -4 176 268" role="img" aria-label="Full outline of Malawi with Mangochi marked in the south" className="relative h-[230px] w-[150px] drop-shadow-sm sm:h-[270px] sm:w-[170px]">
        {/* Simplified complete country outline, traced from Natural Earth Admin-0 data. */}
        <path d="M27 149 24 147 22 147 16 150 10 143 5 141 0 136 0 134 7 133 12 130 15 125 15 119 16 116 15 112 14 110 29 103 38 99 42 95 35 94 32 81 31 75 28 69 28 65 34 60 37 45 50 39 48 35 43 32 43 27 36 24 32 21 33 18 34 15 32 13 29 12 27 9 22 7 20 6 16 6 15 5 13 2 13 1 15 0 23 3 38 7 51 7 64 9 82 11 91 18 95 27 96 31 95 34 97 39 100 42 99 48 97 54 98 58 104 62 108 70 100 71 97 74 94 81 90 84 84 91 87 101 93 114 95 129 100 133 109 134 117 138 128 146 136 152 151 164 161 178 159 182 157 189 158 194 158 202 156 211 154 215 147 218 135 219 133 221 129 226 126 234 131 240 131 249 127 252 123 250 121 249 119 248 117 239 113 237 104 231 97 227 93 224 89 222 88 221 86 220 86 217 87 215 85 213 81 211 79 209 79 207 81 205 85 202 87 198 88 195 94 190 94 185 94 181 93 172 92 168 85 162 83 161 77 162 72 163 69 164 65 164 54 166 51 167 49 168 42 163 36 158 28 150Z" fill="#0b6840" stroke="#075331" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="133" cy="165" r="5.5" fill="#70d98b" stroke="white" strokeWidth="3" />
        <path d="M136 162 153 150" stroke="#0b6840" strokeWidth="1.5" />
      </svg>
      <span className="absolute bottom-[35%] left-[62%] inline-flex items-center gap-1.5 rounded-md bg-[var(--moyone-green)] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-md"><MapPin size={13} fill="currentColor" /> Mangochi</span>
    </div>
  );
}

export function WhereWeWork() {
  return (
    <section id="where-we-work" className="relative overflow-hidden py-10 sm:py-12">
      <div className="container-moyone grid gap-4 lg:grid-cols-[.42fr_1.58fr] lg:items-stretch">
        <MalawiLocator />
        <div className="relative isolate flex min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-7 lg:min-h-[330px] lg:rounded-none lg:p-8">
          <Image src="/images/lake-malawi-shore.png" alt="Illustrative lakeshore landscape representing the Mangochi area" fill sizes="(max-width: 1024px) 100vw, 75vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/82 to-white/35 lg:from-white/90 lg:via-white/65 lg:to-white/10" aria-hidden="true" />
          <div>
            <p className="section-label">Where we work</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-[32px]">Rooted in Communities</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-700">We are based in Mangochi, Malawi, where we work with local communities, schools and partners to support lasting change.</p>
            <a href="#impact" className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--moyone-green)] bg-white/70 px-5 py-2.5 text-sm font-bold text-[var(--moyone-green-dark)] transition hover:bg-white">Our Impact <span aria-hidden="true">→</span></a>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-200/90 rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur-sm sm:max-w-[510px] sm:p-4">
            <div className="px-3 first:pl-0"><strong className="block text-2xl font-black text-[var(--moyone-green-dark)]">1,500+</strong><span className="text-xs font-semibold">Youth empowered</span><span className="mt-0.5 block text-[10px] text-slate-500">Leadership & vocational training</span></div>
            <div className="px-3"><strong className="block text-2xl font-black text-[var(--moyone-green-dark)]">2,000+</strong><span className="text-xs font-semibold">Households</span><span className="mt-0.5 block text-[10px] text-slate-500">Health & sanitation campaigns</span></div>
            <div className="px-3 last:pr-0"><strong className="block text-2xl font-black text-[var(--moyone-green-dark)]">300+</strong><span className="text-xs font-semibold">Youth trained</span><span className="mt-0.5 block text-[10px] text-slate-500">Entrepreneurship & agribusiness</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
