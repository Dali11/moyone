import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | MOYONE",
  description: "Connect with MOYONE to partner, volunteer or support our youth-led community work in Mangochi, Malawi.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
