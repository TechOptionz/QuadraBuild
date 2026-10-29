"use client";

import { useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";
import { cssVar } from "@/lib/style";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectCategory;

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [animKey, setAnimKey] = useState(0);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All projects", count: projects.length },
    ...projectCategories.map((c) => ({
      value: c.value,
      label: c.label,
      count: projects.filter((p) => p.category === c.value).length,
    })),
  ];

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter projects by category">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className="filter-btn"
            aria-pressed={filter === o.value}
            onClick={() => {
              setFilter(o.value);
              setAnimKey((k) => k + 1);
            }}
          >
            {o.label}
            <span className="count">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div key={animKey} className="project-grid" data-animating={animKey > 0}>
        {visible.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            reveal={animKey === 0}
            style={cssVar("--i", i)}
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        ))}
      </div>
    </>
  );
}
