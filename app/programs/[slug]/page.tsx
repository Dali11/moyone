import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramDetail } from "@/components/programs/program-detail";
import { programs } from "@/lib/programs";

export function generateStaticParams() {
  return programs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);

  return program
    ? { title: `${program.title} | MOYONE Programs`, description: program.text }
    : { title: "Program not found | MOYONE" };
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);

  if (!program) notFound();

  return <ProgramDetail program={program} />;
}
