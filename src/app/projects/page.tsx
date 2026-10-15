import type { Metadata } from "next";
import ProjectsView from "@/components/ProjectsView";

export const metadata: Metadata = {
  title: "Projects | Quadra Build Brisbane",
  description: "Explore verified Quadra Build projects spanning residential renovations, new homes and commercial environments in Brisbane.",
  robots: { index: false }, // sample records only — remove once verified projects are published
};

export default function Page() {
  return <ProjectsView />;
}
