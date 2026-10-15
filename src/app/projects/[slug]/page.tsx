import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "@/components/ProjectView";
import { PROJECTS, getProject } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return { title: "Project | Quadra Build" };
  return { title: `${p.title} | Quadra Build`, description: p.caption, robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return <ProjectView project={p} />;
}
