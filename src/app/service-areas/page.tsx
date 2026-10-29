import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Placeholder";
import { SectionHead } from "@/components/SectionHead";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { showPlaceholders, site } from "@/content/site";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Quadra Build works across Brisbane and South East Queensland on renovations, new homes, commercial fit-outs and approvals support.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const suburbs = site.confirmedSuburbs;
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Brisbane & South East Queensland."
        intro={
          <p>
            {site.name} works with homeowners, businesses and property owners across Brisbane and the wider South East
            Queensland region.
          </p>
        }
        image={images.outdoorPool}
        crumbs={[{ label: "Service Areas" }]}
      />

      <section className="section section--bordered" aria-labelledby="where-title">
        <div className="container">
          <SectionHead eyebrow="Where we work" title="Local Knowledge, Regional Reach" id="where-title">
            Local context matters — from climate and site conditions to the council requirements that apply to your
            property. We plan every project with that context in mind.
          </SectionHead>
          <div className="area-cards">
            <article className="area-card" data-reveal>
              <span className="badge badge--dark tag">Primary area</span>
              <h3 className="h-lg">Brisbane</h3>
              <p className="muted">
                Renovations, new homes, granny flats, commercial fit-outs and approvals coordination across the Brisbane
                area.
              </p>
            </article>
            <article className="area-card" data-reveal style={delay(100)}>
              <span className="badge badge--dark tag">Wider region</span>
              <h3 className="h-lg">South East Queensland</h3>
              <p className="muted">
                Projects in the wider South East Queensland region are considered depending on project type, scope and
                location. Ask us about your site.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section tone-clay" aria-labelledby="suburbs-title">
        <div className="container split">
          <div className="copy">
            <p className="eyebrow eyebrow--accent" data-reveal>
              Suburbs
            </p>
            <h2 id="suburbs-title" className="h-lg" data-reveal style={delay(80)}>
              Suburbs We Service
            </h2>
            {suburbs.length > 0 ? (
              <ul className="suburb-list" data-reveal style={delay(140)}>
                {suburbs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <div data-reveal style={delay(140)} className="stack-sm">
                {showPlaceholders && (
                  <p>
                    <Ph>Confirmed suburb list to be added</Ph>
                  </p>
                )}
                <p className="muted">
                  Individual suburbs will be listed here once confirmed. In the meantime, include your suburb when you
                  enquire and we&apos;ll confirm whether we can help.
                </p>
              </div>
            )}
            <div className="btn-row" data-reveal style={delay(200)}>
              <ButtonLink href="/contact" variant="primary">
                Check Your Location
              </ButtonLink>
            </div>
          </div>
          <div className="map-graphic" data-reveal="clip" aria-hidden="true">
            <svg viewBox="0 0 400 400" fill="none">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v${i}`} x1={40 * (i + 1)} y1="0" x2={40 * (i + 1)} y2="400" stroke="rgba(243,240,233,.08)" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={40 * (i + 1)} x2="400" y2={40 * (i + 1)} stroke="rgba(243,240,233,.08)" />
              ))}
              <circle cx="200" cy="200" r="150" stroke="rgba(243,240,233,.18)" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="90" stroke="rgba(243,240,233,.28)" />
              <circle cx="200" cy="200" r="34" fill="rgba(180,83,42,.25)" />
              <rect x="192" y="192" width="16" height="16" fill="#b4532a" />
              <text x="222" y="196" fill="#f3f0e9" fontSize="14" fontFamily="sans-serif" fontWeight="600">
                Brisbane
              </text>
              <text x="222" y="214" fill="rgba(243,240,233,.6)" fontSize="10" fontFamily="sans-serif" letterSpacing="2">
                QLD
              </text>
              <text x="200" y="370" fill="rgba(243,240,233,.5)" fontSize="10" fontFamily="sans-serif" letterSpacing="3" textAnchor="middle">
                SOUTH EAST QUEENSLAND
              </text>
            </svg>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-areas-title">
        <div className="container">
          <SectionHead eyebrow="Across the region" title="Services Available" id="services-areas-title">
            Availability can vary with project type and location. We&apos;ll confirm during your initial conversation.
          </SectionHead>
          <ul className="values">
            {divisions.map((d, i) => (
              <li key={d.slug} data-reveal style={delay(i * 80)}>
                <h3 className="h-md">{d.name}</h3>
                <p>{d.cardSummary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not Sure If We Cover Your Area?"
        text="Send us your suburb and a few details about your project, and we'll let you know how we can help."
      />
    </>
  );
}
