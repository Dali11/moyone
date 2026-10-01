import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function GetInvolvedSection() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#03452d] py-12 text-white sm:py-14">
      <Image src="/images/community-cta.webp" alt="Illustrative group of young people walking together on a rural path" fill sizes="100vw" className="-z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#023d2a]/95 via-[#023d2a]/75 to-[#023d2a]/35" aria-hidden="true" />
      <div className="container-moyone relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[var(--moyone-lime)]">Get involved</p><h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">Join us in creating more opportunities for Malawi’s youth.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Partner, volunteer or support our work to help build stronger, healthier and more resilient communities.</p></div>
        <div className="flex flex-wrap gap-2.5"><a href="/contact#inquiry" className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400">Partner With Us <ArrowRight size={16}/></a><a href="/contact#inquiry" className="rounded-md border border-white/55 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Volunteer</a><a href="/contact#inquiry" className="rounded-md border border-white/55 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Support Our Work</a></div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#032218] text-white/70">
      <div className="container-moyone grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-12">
        <div>
          <a href="/#top" className="inline-flex text-xl font-black tracking-[-.04em] text-white">
            MOYONE
          </a>
          <p className="mt-1 text-[10px] font-semibold text-white/55">Mobile Youth Network Organization</p>
          <p className="mt-4 max-w-sm text-sm leading-6">
            We are a youth-led, non-political and non-profit organization in Mangochi, creating opportunities for young people and communities through inclusive development.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-extrabold uppercase tracking-[.14em] text-white">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a className="transition hover:text-white" href="/about">About</a></li>
            <li><a className="transition hover:text-white" href="/programs">Our Programs</a></li>
            <li><a className="transition hover:text-white" href="/#projects">Projects</a></li>
            <li><a className="transition hover:text-white" href="/stories">Stories</a></li>
            <li><a className="transition hover:text-white" href="/contact">Contact</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.14em] text-white">Get in touch</h2>
          <p className="mt-4 text-sm">Mangochi, Malawi</p>
          <a className="mt-2 inline-block text-sm transition hover:text-white" href="/contact">Contact us</a>
          <a className="mt-2 inline-block text-sm transition hover:text-white" href="mailto:mobileyouthnetwork@gmail.com">mobileyouthnetwork@gmail.com</a>
          <a className="mt-2 block text-sm transition hover:text-white" href="tel:+265992722255">+265 992 72 22 55</a>
          <a className="mt-3 inline-block text-sm font-semibold text-white transition hover:text-[var(--moyone-lime)]" href="https://www.facebook.com/profile.php?id=100090741587762" target="_blank" rel="noreferrer">Follow MOYONE on Facebook ↗</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-moyone flex flex-col justify-between gap-2 py-4 text-xs sm:flex-row">
          <span>© {new Date().getFullYear()} MOYONE. All rights reserved.</span>
          <span>Mobile Youth Network Organization · Mangochi, Malawi</span>
        </div>
      </div>
    </footer>
  );
}
