import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { images } from "@/content/images";
import { projects } from "@/content/projects";
import { showPlaceholders } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Renovations, new homes, granny flats, commercial fit-outs and outdoor projects by Quadra Build across Brisbane and South East Queensland.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const hasSamples = showPlaceholders && projects.some((p) => p.isSample);
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Built Around Your Vision."
        intro={
          <p>
            Explore the types of projects we deliver across renovations, new homes, granny flats, commercial spaces and
            outdoor living.
          </p>
        }
        crumbs={[{ label: "Projects" }]}
      >
        {hasSamples && (
          <p className="ph" style={{ fontSize: "0.9rem", justifySelf: "start" }}>
            Project gallery in preparation — entries marked &ldquo;Sample project&rdquo; use illustrative stock imagery and
            are not completed Quadra Build projects.
          </p>
        )}
      </PageHero>

      <section className="section section--bordered" aria-labelledby="gallery-title" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <h2 id="gallery-title" className="sr-only">
            Project gallery
          </h2>
          <ProjectGallery projects={projects} />
        </div>
      </section>

      <CtaBand
        title="Your Project Could Be Next."
        text="Tell us about your renovation, new home, fit-out or development idea and we'll talk through the possibilities."
        image={images.newHomeDusk}
      />
    </>
  );
}
