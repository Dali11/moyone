import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/home/get-involved-section";
import { ContactInquiryForm } from "@/components/contact/contact-inquiry-form";

const contactMethods = [
  {
    label: "Email",
    value: "mobileyouthnetwork@gmail.com",
    href: "mailto:mobileyouthnetwork@gmail.com",
    detail: "Send us a message anytime",
    icon: Mail,
  },
  {
    label: "Call",
    value: "+265 992 72 22 55",
    href: "tel:+265992722255",
    detail: "Speak with our team",
    icon: Phone,
  },
  {
    label: "Our home",
    value: "Mangochi, Malawi",
    href: "https://maps.google.com/?q=Mangochi,Malawi",
    detail: "Rooted in our local community",
    icon: MapPin,
  },
];

export function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate overflow-hidden bg-[#053f2d] py-14 text-white sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_30%,rgba(76,222,142,.24),transparent_38%),linear-gradient(120deg,#032e21,#07553a)]" />
        <div className="container-moyone">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-emerald-300">We’d love to hear from you</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Let’s create more opportunities together.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Whether you want to partner with us, volunteer, support our work or learn more about what we do, our team in Mangochi is ready to connect.
          </p>
        </div>
      </section>

      <section className="bg-[#fbfcfa] py-10 sm:py-14">
        <div className="container-moyone">
          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map(({ label, value, href, detail, icon: Icon }) => (
              <a key={label} href={href} target={label === "Our home" ? "_blank" : undefined} rel={label === "Our home" ? "noreferrer" : undefined} className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-[var(--moyone-green)]"><Icon size={21} /></span>
                <span className="mt-4 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
                <span className="mt-1 block break-words text-lg font-extrabold text-slate-900 group-hover:text-[var(--moyone-green)]">{value}</span>
                <span className="mt-1 block text-sm text-slate-500">{detail}</span>
              </a>
            ))}
          </div>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)] lg:items-start">
            <ContactInquiryForm />
            <aside className="rounded-2xl bg-emerald-50 p-6 sm:p-7">
              <p className="section-label">Get involved</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">There’s a place for you in our work.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">We work with young people, community members, organizations and supporters to strengthen opportunities in Mangochi and beyond.</p>
              <ul className="mt-5 space-y-3 text-sm font-medium text-slate-800">
                <li className="flex gap-2"><span className="font-bold text-emerald-700">✓</span> Partner with us on a shared goal</li>
                <li className="flex gap-2"><span className="font-bold text-emerald-700">✓</span> Volunteer your time and skills</li>
                <li className="flex gap-2"><span className="font-bold text-emerald-700">✓</span> Support youth-led community action</li>
              </ul>
              <a href="https://www.facebook.com/profile.php?id=100090741587762" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-white px-4 py-2.5 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100">
                <Facebook size={16} /> Follow us on Facebook
              </a>
            </aside>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
