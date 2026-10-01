import { ArrowRight, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-bg relative isolate overflow-hidden text-white">
      <div className="hero-photo absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-moyone relative flex min-h-[460px] items-center py-12 sm:min-h-[500px] lg:min-h-[min(520px,32vw)] lg:py-10">
        <div className="max-w-[570px]">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[.08em] text-white/90 sm:text-xs">Mobile Youth Network Organization (MOYONE)</p>
          <h1 className="max-w-[540px] text-[clamp(2.5rem,4.4vw,4.5rem)] font-extrabold leading-[.91] tracking-[-.045em]">Empowering<br />Malawi’s Next<br /><span className="text-[var(--moyone-lime)]">Generation</span></h1>
          <p className="mt-4 max-w-[370px] text-[15px] leading-[1.4] text-white/95 sm:text-base">Building resilient communities through education, skills development, health, environmental action and youth-led innovation.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500">Our Work <ArrowRight size={17}/></a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/80 bg-black/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15">Partner With Us</a>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden items-center gap-3 rounded-tl-2xl bg-black/45 px-5 py-3 backdrop-blur-sm sm:flex">
          <MapPin size={20} className="fill-white text-white" />
          <div><p className="text-xs font-bold">Mangochi, Malawi</p><p className="mt-1 text-[10px] text-white/75">Youth · Communities · Sustainable Futures</p></div>
        </div>
      </div>
    </section>
  );
}
