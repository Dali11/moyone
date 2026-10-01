import { AboutHero } from "@/components/about/about-hero";
import { AboutHighlights } from "@/components/about/about-highlights";
import { AboutJourney } from "@/components/about/about-journey";
import { AboutLocation } from "@/components/about/about-location";
import { AboutMission } from "@/components/about/about-mission";
import { AboutStory } from "@/components/about/about-story";
import { AboutTeam } from "@/components/about/about-team";
import { GetInvolvedSection, SiteFooter } from "@/components/home/get-involved-section";
import { SiteHeader } from "@/components/site-header";

export function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <AboutHero />
      <AboutHighlights />
      <AboutStory />
      <AboutMission />
      <AboutJourney />
      <AboutTeam />
      <AboutLocation />
      <GetInvolvedSection />
      <SiteFooter />
    </main>
  );
}
