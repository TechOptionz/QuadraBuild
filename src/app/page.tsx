import Image from "next/image";
import Link from "next/link";
import { AreaMap } from "@/components/AreaMap";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { DivisionCard } from "@/components/DivisionCard";
import { FaqList } from "@/components/FaqList";
import { HomeHero } from "@/components/HomeHero";
import { LineIcon, type LineIconName } from "@/components/Icons";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { Showcase } from "@/components/Showcase";
import { divisions } from "@/content/divisions";
import { homeFaqs, processNote, processSteps, reasons } from "@/content/home";
import { images } from "@/content/images";
import { divisionHref } from "@/content/navigation";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { cssVar, delay } from "@/lib/style";

const heroLines = ["We Build.", "We Renovate.", "We Transform."];

/** Icons and photos for the "Why Quadra Build" points, in the order they appear in content/home.ts. */
const reasonIcons: LineIconName[] = ["communication", "tailored", "coordinated", "detail", "local"];
const reasonImages = [
  images.whyCommunication,
  images.whyTailored,
  images.whyCoordinated,
  images.homeCraft,
  images.whyLocal,
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <HomeHero
        image={images.homeHero}
        divisions={divisions.map((d) => ({
          slug: d.slug,
          number: d.number,
          name: d.shortName,
          href: divisionHref(d.slug),
          image: d.heroImage,
        }))}
      >
        <div className="container hero-content">
          <p className="hero-eyebrow">
            {site.city} &amp; South East Queensland
          </p>
          <h1 id="hero-title" className="display hero-title">
            {heroLines.map((line, i) => (
              <span className="line" key={line}>
                <span style={cssVar("--i", i)} className={i === 2 ? "accent-text" : undefined}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-text">
            From home renovations and extensions to new homes, granny flats, commercial fit-outs and development
            approval support, Quadra Build helps bring your vision to life across Brisbane and South East Queensland.
          </p>
          <div className="btn-row hero-actions">
            <ButtonLink href="/contact" variant="primary">
              Discuss Your Project
            </ButtonLink>
            <ButtonLink href="#services" variant="outline-light" arrow={false}>
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </HomeHero>

      {/* ---------- About ---------- */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <div className="intro-media">
            <div className="frame" data-reveal="clip">
              <Image src={images.homeIntroFacade.src} alt={images.homeIntroFacade.alt} fill placeholder="blur" sizes="(max-width: 900px) 90vw, 40vw" />
            </div>
            <div className="frame frame--small" data-reveal="clip" style={delay(200)}>
              <Image src={images.homeIntroLiving.src} alt={images.homeIntroLiving.alt} fill placeholder="blur" sizes="(max-width: 900px) 45vw, 20vw" />
            </div>
          </div>
          <div className="intro-copy">
            <p className="eyebrow eyebrow--accent" data-reveal>
              About {site.name}
            </p>
            <h2 id="intro-title" className="h-xl" data-reveal style={delay(80)}>
              One Team. Multiple Ways to Build Better.
            </h2>
            <div className="prose" data-reveal style={delay(160)}>
              <p className="lead">
                Quadra Build brings residential construction, renovations, commercial projects and development support
                together under one brand. Instead of piecing together separate providers for each stage, you work with a
                coordinated team that understands how planning, design and construction connect.
              </p>
              <p>
                Whether you&apos;re updating a kitchen, building a new home, fitting out a shopfront or exploring what
                your site could become, we focus on clear communication, careful planning and quality workmanship — from
                the first conversation to the finished space.
              </p>
            </div>
            <ul className="intro-divisions" role="list" data-reveal style={delay(220)}>
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link href={divisionHref(d.slug)}>
                    <span className="num" aria-hidden="true">
                      {d.number}
                    </span>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div data-reveal style={delay(260)}>
              <ArrowLink href="/about">More about our approach</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Divisions ---------- */}
      <section id="services" className="section section--alt" aria-labelledby="services-title">
        <div className="container">
          <SectionHead eyebrow="Our Services" title="Four Specialist Divisions." id="services-title">
            Each division focuses on a different type of project, backed by the same standards of communication,
            coordination and workmanship.
          </SectionHead>
          <div className="division-grid">
            {divisions.map((d, i) => (
              <DivisionCard key={d.slug} division={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Featured projects ---------- */}
      <section className="section" aria-labelledby="projects-title">
        <div className="container">
          <SectionHead eyebrow="Featured Projects" title="Built Around Your Vision." id="projects-title" align="center">
            <p>A selection of the project types we deliver across Brisbane and South East Queensland.</p>
          </SectionHead>
          <div className="project-feature-grid">
            {featuredProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                style={delay((i % 2) * 120)}
                sizes={i % 4 === 0 || i % 4 === 3 ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, 42vw"}
              />
            ))}
          </div>
          <div className="mt-lg center">
            <ButtonLink href="/projects" variant="outline">
              View All Projects
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section section--alt" aria-labelledby="process-title">
        <div className="container">
          <SectionHead eyebrow="Our Approach" title="A Clear Path From Idea to Handover." id="process-title">
            Every project follows a structured process, so you understand what&apos;s happening at each stage and what
            decisions are needed next.
          </SectionHead>
          <ProcessSteps steps={processSteps} note={processNote} />
        </div>
      </section>

      {/* ---------- Why Quadra ---------- */}
      <section className="section" aria-labelledby="why-title">
        <div className="container">
          <SectionHead eyebrow={`Why ${site.name}`} title="Built on Clarity and Care." id="why-title" align="center">
            What you can expect when you work with us.
          </SectionHead>
          <Showcase
            items={reasons.map((r, i) => ({
              title: r.title,
              text: r.text,
              image: reasonImages[i],
              icon: <LineIcon name={reasonIcons[i]} />,
            }))}
          />
        </div>
      </section>

      {/* ---------- Service areas ---------- */}
      <section className="section section--dark" aria-labelledby="areas-title">
        <div className="container areas-band">
          <div className="copy">
            <p className="eyebrow" data-reveal>
              Service Areas
            </p>
            <h2 id="areas-title" className="h-xl" data-reveal style={delay(80)}>
              Brisbane <span>&amp; South East Queensland.</span>
            </h2>
            <p className="lead" data-reveal style={delay(140)}>
              We work with homeowners, businesses and property owners across Brisbane and the wider South East
              Queensland region. Not sure if we cover your location? Ask us — we&apos;ll let you know.
            </p>
            <div className="btn-row" data-reveal style={delay(200)}>
              <ButtonLink href="/service-areas" variant="primary">
                View Service Areas
              </ButtonLink>
            </div>
          </div>
          <div data-reveal="fade" style={delay(160)}>
            <AreaMap />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow eyebrow--accent" data-reveal>
              FAQs
            </p>
            <h2 id="faq-title" className="h-lg" data-reveal style={delay(80)}>
              Questions We&apos;re Often Asked.
            </h2>
            <p className="muted" data-reveal style={delay(160)}>
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="text-link">
                Send us your question
              </Link>
              .
            </p>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
