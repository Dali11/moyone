import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/project-detail";
import {
  getPublishedProjectBySlug,
  getPublishedProjects,
} from "@/lib/projects-db";

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found | MOYONE" };
  }

  return {
    title: `${project.title} | MOYONE`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getPublishedProjectBySlug(slug),
    getPublishedProjects(),
  ]);

  if (!project) notFound();

  return <ProjectDetail project={project} projects={allProjects} />;
}
