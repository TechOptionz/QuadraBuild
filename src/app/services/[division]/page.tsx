import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { DivisionKey } from "@/components/DivisionKey";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { Showcase } from "@/components/Showcase";
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

export default async function DivisionPage({ params }: Props) {
  const division = getDivision((await params).division);
  if (!division) notFound();

  const related = projects.filter((p) => relatedCategories[division.slug].includes(p.category)).slice(0, 3);
  const others = divisions.filter((d) => d.slug !== division.slug);
  const enquiryHref = `/contact?type=${division.slug}`;

  return (
    <>
      <PageHero
        eyebrow={`${division.number} — ${division.name}`}
        title={division.headline}
        intro={<p>{division.intro[0]}</p>}
        variant="gallery"
        images={[division.heroImage, ...division.supportImages]}
        crumbs={[{ href: "/#services", label: "Services" }, { label: division.name }]}
      >
        <div className="btn-row">
          <ButtonLink href={enquiryHref} variant="primary">
            Discuss Your Project
          </ButtonLink>
          <ButtonLink href="#services-list" variant="outline-light" arrow={false}>
            What We Do
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container">
          <SectionHead eyebrow="Overview" title={`How ${division.name} Helps`} id="overview-title">
            {division.intro.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </SectionHead>
          <Showcase
            trigger="hover"
            numbered
            items={division.focus.map((f, i) => ({ ...f, image: division.focusImages[i] }))}
          />
        </div>
      </section>

      {/* Services */}
      <section id="services-list" className="section section--alt" aria-labelledby="services-title">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Services" id="services-title" titleClass="h-xl">
            {division.name} covers the following services. Not sure where your project fits? Get in touch and
            we&apos;ll point you in the right direction.
          </SectionHead>
          <ul className="service-list">
            {division.services.map((s, i) => (
              <li key={s.title} data-reveal style={delay((i % 3) * 80)}>
                <h3 className="h-sm">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="section section--dark" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead eyebrow="Process" title={division.journeyTitle} id="journey-title" />
          <ProcessSteps steps={division.journey} />
        </div>
      </section>

      {/* Notice */}
      {division.notice && (
        <section className="section section--tight" aria-labelledby="notice-title">
          <div className="container notice-wrap">
            <div className="notice" data-reveal>
              <span className="icon" aria-hidden="true">
                i
              </span>
              <div className="body">
                <p className="eyebrow eyebrow--accent">Good to know</p>
                <h2 id="notice-title" className="h-md">
                  {division.notice.title}
                </h2>
                {division.notice.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
                {division.slug !== "approvals" && (
                  <p className="muted">
                    Need help with planning or approvals?{" "}
                    <Link href={divisionHref("approvals")} className="text-link">
                      Explore Quadra Approvals
                    </Link>
                    .
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related sample projects */}
      {related.length > 0 && (
        <section className="section section--alt" aria-labelledby="related-title">
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
          <nav className="division-nav division-nav--photo" aria-labelledby="other-title">
            {others.map((d) => (
              <Link key={d.slug} href={divisionHref(d.slug)}>
                <span className="thumb">
                  <Image src={d.heroImage.src} alt="" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 33vw" />
                </span>
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

      <CtaBand title={division.cta.title} text={division.cta.text} href={enquiryHref} image={division.ctaImage} />
    </>
  );
}
