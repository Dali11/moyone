import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOYONE | Mobile Youth Network Organization",
  description: "We are a youth-led, non-profit organization based in Mangochi, Malawi, creating opportunities for young people and communities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
