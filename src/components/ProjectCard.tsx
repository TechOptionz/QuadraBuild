import Image from "next/image";
import { categoryLabel, type Project } from "@/content/projects";
import { Ph } from "./Placeholder";

export function ProjectCard({
  project,
  sizes = "(max-width: 760px) 100vw, 50vw",
  style,
  reveal = true,
}: {
  project: Project;
  sizes?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
}) {
  return (
    <article className="project-card" data-reveal={reveal ? "" : undefined} style={style}>
      <div className="media">
        {project.isSample && <span className="badge">Illustrative image</span>}
        <Image src={project.image.src} alt={project.image.alt} fill placeholder="blur" sizes={sizes} />
      </div>
      <div className="meta">
        <span className="cat">{categoryLabel(project.category)}</span>
        <span>{project.location ?? <Ph>Suburb to be confirmed</Ph>}</span>
      </div>
      <h3 className="h-md">{project.title}</h3>
      <p>{project.description}</p>
    </article>
  );
}
