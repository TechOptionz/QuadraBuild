import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { DivisionKey } from "@/components/DivisionKey";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHead } from "@/components/SectionHead";
import { divisions } from "@/content/divisions";
import { processNote, processSteps } from "@/content/home";
import { images } from "@/content/images";
import { divisionHref } from "@/content/navigation";
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
    text: "Plain-spoken advice, clear scopes and regular updates, so you always know where your project stands.",
  },
  {
    title: "Craft",
    text: "Care and attention to detail in the work itself — from set-out and structure to the final finishes.",
  },
  {
    title: "Coordination",
    text: "Design, consultants, approvals and trades brought together in the right sequence.",
  },
  {
    title: "Accountability",
    text: "Doing what we say we'll do, and raising issues early when circumstances change.",
  },
];

const commitments = [
  {
    title: "Commitment to quality",
    text: "Quality starts long before construction. It comes from understanding the brief, documenting the scope properly, choosing suitable materials and coordinating capable trades. We pay attention to the details that affect how a space works and how well it lasts.",
  },
  {
    title: "Communication you can rely on",
    text: "Building and renovating involves many decisions. We aim to make them manageable — explaining options, confirming what's agreed and keeping you updated as the project progresses.",
  },
  {
    title: "Practical project delivery",
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
        image={images.interiorWorks}
        crumbs={[{ label: "About Us" }]}
      />

      <section className="section section--bordered" aria-labelledby="who-title">
        <div className="container split">
          <div className="copy">
            <p className="eyebrow eyebrow--accent" data-reveal>
              Who we are
            </p>
            <h2 id="who-title" className="h-lg" data-reveal style={delay(80)}>
              One brand. Four specialist divisions. A single standard.
            </h2>
            <div className="prose" data-reveal style={delay(140)}>
              <p>
                Projects rarely fit neatly into one box. A renovation may need approvals; a new home may involve
                landscaping and outdoor living; a commercial fit-out depends on careful coordination with landlords and
                consultants. {site.name} was structured around that reality.
              </p>
              <p>
                Our four divisions — Renovations, Homes, Commercial and Approvals — share the same approach to communication, planning and workmanship, so clients get
                consistent service no matter where their project begins.
              </p>
            </div>
          </div>
          <div className="frame" data-reveal="clip">
            <Image src={images.livingLounge.src} alt={images.livingLounge.alt} fill placeholder="blur" sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section tone-sage" aria-labelledby="structure-title">
        <div className="container">
          <SectionHead eyebrow="Structure" title="How Quadra Is Organised" id="structure-title">
            Four divisions working under one brand, each focused on a different kind of project.
          </SectionHead>
          <div className="structure" data-reveal>
            <div className="parent">
              <strong className="h-md">{site.name}</strong>
            </div>
            <div className="children">
              {divisions.map((d) => (
                <Link key={d.slug} href={divisionHref(d.slug)}>
                  <span className="num">
                  <DivisionKey slug={d.slug} />
                  {d.number}
                </span>
                  <strong className="h-sm">{d.name}</strong>
                  <span className="muted">{d.headline}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="Our values" title="What Guides the Work" id="values-title" />
          <ul className="values">
            {values.map((v, i) => (
              <li key={v.title} data-reveal style={delay(i * 80)}>
                <h3 className="h-md">{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark tone-slate-deep" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="A Structured Process, Adapted to Your Project" id="approach-title">
            The same five stages guide every project, scaled to suit its size and type.
          </SectionHead>
          <ProcessSteps steps={processSteps} note={processNote} />
        </div>
      </section>

      <section className="section tone-sand" aria-labelledby="commit-title">
        <div className="container reasons-grid">
          <div className="reasons-aside">
            <p className="eyebrow eyebrow--accent" data-reveal>
              Our commitment
            </p>
            <h2 id="commit-title" className="h-lg" data-reveal style={delay(80)}>
              Quality, Communication, Delivery.
            </h2>
          </div>
          <ol className="reason-list">
            {commitments.map((c, i) => (
              <li key={c.title} data-reveal style={delay(i * 60)}>
                <span className="idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-md">{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
