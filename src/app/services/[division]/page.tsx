import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { DivisionKey } from "@/components/DivisionKey";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { divisions, getDivision, type DivisionSlug } from "@/content/divisions";
import { divisionHref } from "@/content/navigation";
import { projects, type ProjectCategory } from "@/content/projects";
import { delay } from "@/lib/style";

type Props = { params: Promise<{ division: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const division = getDivision((await params).division);
  if (!division) return {};
  return {
    title: `${division.name} — ${division.headline.replace(/\.$/, "")}`,
    description: division.metaDescription,
    alternates: { canonical: divisionHref(division.slug) },
    openGraph: { title: division.name, description: division.metaDescription, images: [division.heroImage.src.src] },
  };
}

const relatedCategories: Record<DivisionSlug, ProjectCategory[]> = {
  renovations: ["renovations", "outdoor"],
  homes: ["new-homes", "granny-flats"],
  commercial: ["commercial"],
  approvals: [],
};

/** Each division's pages are tinted with its own logo block colour (light, deep). */
const TONES: Record<DivisionSlug, [string, string]> = {
  renovations: ["tone-clay", "tone-brick-deep"],
  homes: ["tone-slate", "tone-slate-deep"],
  commercial: ["tone-sage", "tone-sage-deep"],
  approvals: ["tone-sand", "tone-sand-deep"],
};

export default async function DivisionPage({ params }: Props) {
  const division = getDivision((await params).division);
  if (!division) notFound();
  const [light, deep] = TONES[division.slug];

  const related = projects.filter((p) => relatedCategories[division.slug].includes(p.category)).slice(0, 3);
  const others = divisions.filter((d) => d.slug !== division.slug);
  const enquiryHref = `/contact?type=${division.slug}`;

  return (
    <>
      <PageHero
        eyebrow={`${division.number} — ${division.name}`}
        title={division.headline}
        intro={<p>{division.intro[0]}</p>}
        image={division.heroImage}
        crumbs={[{ href: "/#services", label: "Services" }, { label: division.name }]}
      >
        <div className="btn-row">
          <ButtonLink href={enquiryHref} variant="primary">
            Discuss Your Project
          </ButtonLink>
          <ButtonLink href="#services-list" variant="outline">
            What We Do
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="section section--bordered" aria-labelledby="overview-title">
        <div className="container split">
          <div className="frame" data-reveal="clip">
            <Image
              src={division.supportImages[0].src}
              alt={division.supportImages[0].alt}
              fill
              placeholder="blur"
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className="copy">
            <p className="eyebrow eyebrow--accent" data-reveal>
              Overview
            </p>
            <h2 id="overview-title" className="h-lg" data-reveal style={delay(80)}>
              How {division.name} Helps
            </h2>
            <div className="prose" data-reveal style={delay(140)}>
              {division.intro.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="focus-grid" data-reveal style={delay(200)}>
              {division.focus.map((f) => (
                <div key={f.title}>
                  <h3 className="h-sm">{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services-list" className={`section ${light}`} aria-labelledby="services-title">
        <ServicesShowcase services={division.services}>
          <p className="eyebrow eyebrow--accent" data-reveal>
            What we do
          </p>
          <h2 id="services-title" className="h-xl" data-reveal style={delay(80)}>
            Services
          </h2>
          <p className="lead" data-reveal style={delay(140)}>
            {division.name} covers the following services. Not sure where your project fits? Get in touch and
            we&apos;ll point you in the right direction.
          </p>
          <div data-reveal style={delay(200)}>
            <ArrowLink href={enquiryHref}>Ask about your project</ArrowLink>
          </div>
        </ServicesShowcase>
      </section>

      {/* Journey */}
      <section className={`section section--dark ${deep}`} aria-labelledby="journey-title">
        <div className="container">
          <SectionHead eyebrow="Process" title={division.journeyTitle} id="journey-title" />
          <ProcessSteps steps={division.journey} />
        </div>
      </section>

      {/* Notice + secondary image */}
      {division.notice && (
        <section className="section" aria-labelledby="notice-title">
          <div className="container split split--reverse">
            <div className="frame" data-reveal="clip">
              <Image
                src={division.supportImages[1].src}
                alt={division.supportImages[1].alt}
                fill
                placeholder="blur"
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div className="copy">
              <p className="eyebrow eyebrow--accent" data-reveal>
                Good to know
              </p>
              <div className="notice" data-reveal style={delay(100)}>
                <span className="icon" aria-hidden="true">
                  i
                </span>
                <div className="body">
                  <h2 id="notice-title" className="h-md">
                    {division.notice.title}
                  </h2>
                  {division.notice.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>
              {division.slug !== "approvals" && (
                <p className="muted" data-reveal style={delay(160)}>
                  Need help with planning or approvals?{" "}
                  <Link href={divisionHref("approvals")} className="text-link">
                    Explore Quadra Approvals
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related sample projects */}
      {related.length > 0 && (
        <section className={`section ${light}`} aria-labelledby="related-title">
          <div className="container">
            <SectionHead eyebrow="Projects" title="Related Work" id="related-title">
              Sample placeholders shown — to be replaced with completed {division.name} projects.
            </SectionHead>
            <div className="project-grid project-grid--even">
              {related.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  style={delay(i * 80)}
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section" aria-labelledby="dfaq-title">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow eyebrow--accent" data-reveal>
              FAQs
            </p>
            <h2 id="dfaq-title" className="h-lg" data-reveal style={delay(80)}>
              {division.shortName} Questions
            </h2>
          </div>
          <FaqList items={division.faqs} />
        </div>
      </section>

      {/* Other divisions */}
      <section className="section section--tight section--bordered" aria-labelledby="other-title">
        <div className="container">
          <h2 id="other-title" className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            Other divisions
          </h2>
          <nav className="division-nav" aria-labelledby="other-title">
            {others.map((d) => (
              <Link key={d.slug} href={divisionHref(d.slug)}>
                <span className="num">
                  <DivisionKey slug={d.slug} />
                  {d.number}
                </span>
                <strong className="h-sm">{d.name}</strong>
                <span className="muted">{d.headline}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <CtaBand title={division.cta.title} text={division.cta.text} href={enquiryHref} image={division.heroImage} />
    </>
  );
}
