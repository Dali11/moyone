"use client";

import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["Home", "/#top"],
  ["About", "/about"],
  ["Programs", "/programs"],
  ["Projects", "/projects"],
  ["Impact", "/#impact"],
  ["Stories", "/stories"],
  ["Contact", "/#contact"],
];

function isActiveNavItem(label: string, pathname: string) {
  if (label === "Home") return pathname === "/";
  if (label === "About") return pathname.startsWith("/about");
  if (label === "Programs") return pathname.startsWith("/programs");
  if (label === "Projects") return pathname.startsWith("/projects");
  if (label === "Stories") return pathname.startsWith("/stories");
  return false;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white">
      <div className="container-moyone flex h-[68px] items-center justify-between lg:h-[72px]">
        <a href="/#top" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/images/moyone-logo.png" alt="MOYONE" width={48} height={48} priority className="h-10 w-10 object-contain sm:h-11 sm:w-11" />
          <div className="leading-none">
            <div className="text-[25px] font-black tracking-[-.045em] text-[var(--moyone-green-dark)] sm:text-[28px]">MOYONE</div>
            <div className="mt-1 text-[8px] font-bold tracking-tight text-slate-600">Mobile Youth Network Organization</div>
          </div>
        </a>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {links.map(([label, href]) => {
            const active = isActiveNavItem(label, pathname);
            return (
              <a
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-[12px] font-semibold transition hover:text-[var(--moyone-green)] ${active ? "text-[var(--moyone-green)] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[var(--moyone-green)]" : "text-slate-800"}`}
              >
                {label}
              </a>
            );
          })}
          <a href="/#contact" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--moyone-green-dark)] px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-[var(--moyone-green)]">Partner With Us <ArrowRight size={15} /></a>
        </nav>

        <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 lg:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <nav className="border-t border-black/5 bg-white px-4 py-4 shadow-lg lg:hidden">
        <div className="container-moyone flex flex-col gap-1">
          {links.map(([label, href]) => {
            const active = isActiveNavItem(label, pathname);
            return (
              <a
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 font-semibold hover:bg-slate-50 ${active ? "bg-emerald-50 text-[var(--moyone-green)]" : "text-slate-800"}`}
              >
                {label}
              </a>
            );
          })}
          <a href="/#contact" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-[var(--moyone-green)] px-4 py-3 text-center font-bold text-white">Partner With Us</a>
        </div>
      </nav>}
    </header>
  );
}
