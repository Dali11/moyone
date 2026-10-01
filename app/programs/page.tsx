import type { Metadata } from "next";
import { ProgramList } from "@/components/programs/program-list";

export const metadata: Metadata = {
  title: "Programs | MOYONE",
  description: "Explore MOYONE's key program areas supporting Malawi's youth and communities.",
};

export default function ProgramsPage() {
  return <ProgramList />;
}
