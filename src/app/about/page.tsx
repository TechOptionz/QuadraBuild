import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { DivisionCard } from "@/components/DivisionCard";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHead } from "@/components/SectionHead";
import { Showcase } from "@/components/Showcase";
import { divisions } from "@/content/divisions";
import { processNote, processSteps } from "@/content/home";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Quadra Build is a Brisbane construction brand bringing renovations, new homes, commercial fit-outs and approvals support together under one coordinated team.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Clarity",
    image: images.valueClarity,
    text: "Plain-spoken advice, clear scopes and regular updates, so you always know where your project stands.",
  },
  {
    title: "Craft",
    image: images.valueCraft,
    text: "Care and attention to detail in the work itself — from set-out and structure to the final finishes.",
  },
  {
    title: "Coordination",
    image: images.valueCoordination,
    text: "Design, consultants, approvals and trades brought together in the right sequence.",
  },
  {
    title: "Accountability",
    image: images.valueAccountability,
    text: "Doing what we say we'll do, and raising issues early when circumstances change.",
  },
];

const commitments = [
  {
    title: "Commitment to quality",
    image: images.commitQuality,
    text: "Quality starts long before construction. It comes from understanding the brief, documenting the scope properly, choosing suitable materials and coordinating capable trades. We pay attention to the details that affect how a space works and how well it lasts.",
  },
  {
    title: "Communication you can rely on",
    image: images.commitCommunication,
    text: "Building and renovating involves many decisions. We aim to make them manageable — explaining options, confirming what's agreed and keeping you updated as the project progresses.",
  },
  {
    title: "Practical project delivery",
    image: images.commitDelivery,
    text: "Good delivery is about planning and sequence: approvals in place, selections confirmed, trades scheduled and site conditions understood. We focus on keeping projects organised from start to finish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${site.name}`}
        title="Building Better Spaces. Creating Better Futures."
        intro={
          <p>
            {site.name} is a {site.city}-based construction brand offering renovations, new homes, commercial fit-outs and
            development approvals support under one unified team.
          </p>
        }
        image={images.aboutHero}
        variant="cover"
        crumbs={[{ label: "About Us" }]}
      />

      <section className="section" aria-labelledby="who-title">
        <div className="container statement">
          <p className="eyebrow eyebrow--accent" data-reveal>
            Who we are
          </p>
          <h2 id="who-title" className="statement-title" data-reveal style={delay(80)}>
            One brand. Four specialist divisions. <span className="accent-text">A single standard.</span>
          </h2>
          <div className="statement-cols" data-reveal style={delay(140)}>
            <p>
              Projects rarely fit neatly into one box. A renovation may need approvals; a new home may involve
              landscaping and outdoor living; a commercial fit-out depends on careful coordination with landlords and
              consultants. {site.name} was structured around that reality.
            </p>
            <p>
              Our four divisions — Renovations, Homes, Commercial and Approvals — share the same approach to
              communication, planning and workmanship, so clients get consistent service no matter where their project
              begins.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="wide-frame" data-reveal="clip" data-parallax>
            <Image src={images.aboutStory.src} alt={images.aboutStory.alt} fill placeholder="blur" sizes="100vw" />
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="structure-title">
        <div className="container">
          <SectionHead eyebrow="Structure" title="How Quadra Is Organised" id="structure-title" align="center">
            Four divisions working under one brand, each focused on a different kind of project.
          </SectionHead>
          <div className="division-grid">
            {divisions.map((d, i) => (
              <DivisionCard key={d.slug} division={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Our values" title="What Guides the Work" id="values-title">
            Four principles sit behind every decision we make on a project.
          </SectionHead>
          <Showcase items={values} trigger="hover" flip numbered />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="A Structured Process, Adapted to Your Project" id="approach-title">
            The same five stages guide every project, scaled to suit its size and type.
          </SectionHead>
          <ProcessSteps steps={processSteps} note={processNote} />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="commit-title">
        <div className="container">
          <SectionHead eyebrow="Our commitment" title="Quality, Communication, Delivery." id="commit-title" align="center" />
          <Showcase items={commitments} numbered />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
