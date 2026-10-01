import Image from "next/image";

const partners = [
  {
    name: "Government of Malawi",
    image: "/images/partners/coat-of-arms-malawi.svg",
    width: 104,
    height: 118,
  },
  {
    name: "Malawi 2063",
    image: "/images/partners/malawi-2063.png",
    width: 248,
    height: 92,
  },
];

export function PartnersSection() {
  return (
    <section aria-labelledby="partners-heading" className="bg-white py-9 sm:py-11">
      <div className="container-moyone text-center">
        <h2 id="partners-heading" className="section-label">Our Partners &amp; Supporters</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">We proudly collaborate with organizations that support our mission.</p>
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 items-center gap-6 sm:gap-12">
          {partners.map((partner) => (
            <figure key={partner.name} className="flex min-h-[126px] flex-col items-center justify-center gap-2">
              <Image
                src={partner.image}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-[82px] w-full max-w-[190px] object-contain sm:h-[96px]"
              />
              <figcaption className="text-xs font-semibold text-slate-600">{partner.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 text-[9px] text-slate-400">
          Coat of arms artwork by <a className="underline" href="https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_Malawi.svg">Sodacan</a>, licensed under CC BY-SA 3.0. Malawi 2063 mark from the <a className="underline" href="https://npc.mw/">National Planning Commission</a>.
        </p>
      </div>
    </section>
  );
}
