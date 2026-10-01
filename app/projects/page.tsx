import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/project-list";

export const metadata: Metadata = {
  title: "Projects | MOYONE",
  description: "Explore MOYONE projects supporting young people and communities across Malawi.",
};

export default function ProjectsPage() {
  return <ProjectList />;
}
