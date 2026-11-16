import type { Metadata } from "next";
import Image from "next/image";
import { AreaMap } from "@/components/AreaMap";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { DivisionCard } from "@/components/DivisionCard";
import { PageHero } from "@/components/PageHero";
import { PhotoMarquee } from "@/components/PhotoMarquee";
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

const areas = [
  {
    tag: "Primary area",
    title: "Brisbane",
    text: "Renovations, new homes, granny flats, commercial fit-outs and approvals coordination across the Brisbane area.",
    image: images.areaBrisbane,
  },
  {
    tag: "Wider region",
    title: "South East Queensland",
    text: "Projects in the wider South East Queensland region are considered depending on project type, scope and location. Ask us about your site.",
    image: images.areaSeq,
  },
];

/** Photos of the region — scenery only; they don't imply a list of serviced suburbs. */
const region = [
  { image: images.regionRiver, caption: "CAPTION_RIVER" },
  { image: images.regionQueenslander, caption: "CAPTION_QLDER" },
  { image: images.regionGoldCoast, caption: "CAPTION_GC" },
  { image: images.regionSuburbs, caption: "CAPTION_SUBURBS" },
  { image: images.regionSunshineCoast, caption: "CAPTION_SC" },
];

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
        image={images.serviceAreasHero}
        variant="panel"
        crumbs={[{ label: "Service Areas" }]}
      />

      <section className="section section--bordered" aria-labelledby="where-title">
        <div className="container">
          <SectionHead eyebrow="Where we work" title="Local Knowledge, Regional Reach" id="where-title">
            Local context matters — from climate and site conditions to the council requirements that apply to your
            property. We plan every project with that context in mind.
          </SectionHead>
          <div className="area-cards">
            {areas.map((a, i) => (
              <article className="area-card" key={a.title} data-reveal style={delay(i * 100)}>
                <div className="media">
                  <Image src={a.image.src} alt={a.image.alt} fill placeholder="blur" sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <div className="body">
                  <span className="badge tag">{a.tag}</span>
                  <h3 className="h-lg">{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight region-strip" aria-labelledby="region-title">
        <div className="container">
          <SectionHead eyebrow="The region" title="From the River City to the Coast" id="region-title" align="center" titleClass="h-lg" />
        </div>
        <PhotoMarquee label="Photos of South East Queensland" items={region} />
      </section>

      <section className="section section--alt" aria-labelledby="suburbs-title">
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
          <div className="map-graphic" data-reveal="clip">
            <AreaMap />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-areas-title">
        <div className="container">
          <SectionHead eyebrow="Across the region" title="Services Available" id="services-areas-title">
            Availability can vary with project type and location. We&apos;ll confirm during your initial conversation.
          </SectionHead>
          <div className="division-grid">
            {divisions.map((d, i) => (
              <DivisionCard key={d.slug} division={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not Sure If We Cover Your Area?"
        text="Send us your suburb and a few details about your project, and we'll let you know how we can help."
        image={images.serviceAreasCta}
      />
    </>
  );
}
