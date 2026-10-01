import type { Metadata } from "next";
import { StoryList } from "@/components/stories/story-list";

export const metadata: Metadata = {
  title: "Program Updates | MOYONE",
  description: "Updates on MOYONE's education, health, livelihoods and inclusion work in Malawi.",
};

export default function StoriesPage() {
  return <StoryList />;
}
