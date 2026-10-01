import { FeaturedProject } from "@/components/home/featured-project";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";
import { HeroSection } from "@/components/home/hero-section";
import { ImpactStrip } from "@/components/home/impact-strip";
import { PartnersSection } from "@/components/home/partners-section";
import { ProgramsSection } from "@/components/home/programs-section";
import { StoriesSection } from "@/components/home/stories-section";
import { WhereWeWork } from "@/components/home/where-we-work";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <HeroSection />
      <ImpactStrip />
      <ProgramsSection />
      <FeaturedProject />
      <WhereWeWork />
      <StoriesSection />
      <PartnersSection />
      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
