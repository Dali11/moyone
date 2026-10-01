import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About MOYONE | Mobile Youth Network Organization",
  description: "Learn about MOYONE, its youth-led work, mission and community roots in Mangochi, Malawi.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
