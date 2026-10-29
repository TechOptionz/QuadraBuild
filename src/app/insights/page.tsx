import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/content/insights";
import { showPlaceholders } from "@/content/site";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Insights & Guides",
  description:
    "Practical guides on renovating, building, planning and commercial fit-outs in Brisbane and South East Queensland from Quadra Build.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero
        eyebrow="Insights & Guides"
        title="Practical Guidance for Better Projects."
        intro={
          <p>
            Guides for homeowners, businesses and property owners on renovating, building and planning — written to help
            you ask the right questions before you start.
          </p>
        }
        crumbs={[{ label: "Insights & Guides" }]}
      >
        {showPlaceholders && (
          <p className="ph" style={{ fontSize: "0.9rem", justifySelf: "start" }}>
            Articles below are draft outlines (sample content) — final guides to be written and reviewed before
            publishing.
          </p>
        )}
      </PageHero>

      <section className="section section--bordered" aria-label="Articles" style={{ paddingTop: "3rem" }}>
        <div className="container article-grid">
          <article className="article-card article-card--lead" data-reveal>
            <div className="media">
              {showPlaceholders && lead.isSample && <span className="badge">Draft outline</span>}
              <Image src={lead.image.src} alt="" fill priority sizes="(max-width: 600px) 100vw, 58vw" />
            </div>
            <div className="text">
              <p className="meta">{lead.category}</p>
              <h2 className="h-lg">
                <Link href={`/insights/${lead.slug}`}>{lead.title}</Link>
              </h2>
              <p>{lead.excerpt}</p>
            </div>
          </article>
          {rest.map((a, i) => (
            <article key={a.slug} className="article-card" data-reveal style={delay((i % 3) * 80)}>
              <div className="media">
                {showPlaceholders && a.isSample && <span className="badge">Draft outline</span>}
                <Image src={a.image.src} alt="" fill placeholder="blur" sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" />
              </div>
              <p className="meta">{a.category}</p>
              <h2 className="h-md">
                <Link href={`/insights/${a.slug}`}>{a.title}</Link>
              </h2>
              <p>{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
