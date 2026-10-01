import Image from "next/image";

const teamProfiles = [
  { name: "Alick Shabban Sinoya", role: "Executive Director", image: "/images/team/alick-sinoya.jpeg" },
  { name: "Triceea Mandala", role: "Communications Manager and Volunteers", image: "/images/team/triceea-mandala.jpeg" },
  { name: "Jack Ibrah", role: "Finance Manager", image: "/images/team/jack-ibrah.jpg" },
  { name: "William Cassim Allie", role: "Programs Manager", image: "/images/team/william-cassim-allie.jpeg" },
  { name: "Yusuf Bwanali", role: "Graphic Designer & IT Technician", image: "/images/team/yusuf-bwanali.jpg" },
];

export function AboutTeam() {
  return (
    <section id="team" className="scroll-mt-24 py-10 sm:py-14">
      <div className="container-moyone">
        <div className="grid gap-6 lg:grid-cols-[.8fr_2.2fr] lg:items-center">
          <div>
            <p className="section-label">Our team</p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight">Young leaders.<br />Stronger communities.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Our team brings together young people with diverse skills and a shared commitment to creating opportunities for youth in Malawi.</p>
            <a href="/contact#inquiry" className="mt-4 inline-flex items-center rounded-full bg-[var(--moyone-green)] px-5 py-3 text-xs font-bold text-white transition hover:bg-[var(--moyone-green-dark)]">Contact the team</a>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {teamProfiles.map(({ name, role, image }) => (
              <article key={name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[1.18] bg-slate-100">
                  <Image src={image} alt={`Portrait of ${name}`} fill sizes="(max-width: 640px) 50vw, 18vw" className="object-cover object-top" />
                </div>
                <div className="p-3"><h3 className="text-xs font-extrabold leading-4 text-slate-900">{name}</h3><p className="mt-1 text-[10px] leading-4 text-slate-600">{role}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
