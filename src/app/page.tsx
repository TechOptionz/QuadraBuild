import Image from "next/image";
import Link from "next/link";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { divisionKeyStyle } from "@/components/DivisionKey";
import { DivisionCard } from "@/components/DivisionCard";
import { FaqList } from "@/components/FaqList";
import { Arrow } from "@/components/Icons";
import { BuildSequence } from "@/components/BuildSequence";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { divisions } from "@/content/divisions";
import { homeFaqs, processNote, processSteps, reasons } from "@/content/home";
import { images } from "@/content/images";
import { divisionHref } from "@/content/navigation";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { cssVar, delay } from "@/lib/style";

const heroLines = ["We Build.", "We Renovate.", "We Transform."];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <Image src={images.heroHome.src} alt={images.heroHome.alt} fill priority placeholder="blur" sizes="100vw" />
        </div>

        {/* Set-out linework: corner pegs and a dimension rail, drawn over the photo. */}
        <div className="hero-setout" aria-hidden="true">
          <span className="hero-peg hero-peg--tl" />
          <span className="hero-peg hero-peg--tr" />
          <span className="hero-peg hero-peg--bl" />
          <span className="hero-peg hero-peg--br" />
          <span className="hero-rail">
            <span>South East Queensland</span>
          </span>
        </div>

        <div className="container hero-content">
          <p className="hero-brand">
            {site.name} — {site.city}, QLD
          </p>
          <h1 id="hero-title" className="display hero-title">
            {heroLines.map((line, i) => (
              <span className="line" key={line}>
                <span style={cssVar("--i", i)} className={i === 2 ? "accent-text hero-underline" : undefined}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero-lower">
            <p>
              From home renovations and extensions to new homes, granny flats, commercial fit-outs and development
              approval support, Quadra Build helps bring your vision to life across Brisbane and South East Queensland.
            </p>
            <div className="btn-row">
              <ButtonLink href="/contact" variant="primary">
                Discuss Your Project
              </ButtonLink>
              <ButtonLink href="#services" variant="outline-light">
                Explore Our Services
              </ButtonLink>
            </div>
          </div>
          <nav className="hero-divisions" aria-label="Divisions">
            {divisions.map((d, i) => (
              <Link
                key={d.slug}
                href={divisionHref(d.slug)}
                style={{ ...divisionKeyStyle(d.slug), ...cssVar("--i", i) }}
              >
                <span className="num">{d.number}</span>
                <span className="name">{d.shortName}</span>
                <Arrow />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------- Introduction ---------- */}
      <section className="section tone-sand" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <div className="intro-media">
            <div className="frame" data-reveal="clip">
              <Image src={images.newHomeFacade.src} alt={images.newHomeFacade.alt} fill placeholder="blur" sizes="(max-width: 860px) 90vw, 40vw" />
            </div>
            <div className="frame frame--small" data-reveal="clip" style={delay(200)}>
              <Image src={images.livingWarm.src} alt={images.livingWarm.alt} fill placeholder="blur" sizes="(max-width: 860px) 45vw, 20vw" />
            </div>
          </div>
          <div className="intro-copy">
            <p className="eyebrow eyebrow--accent" data-reveal>
              About {site.name}
            </p>
            <h2 id="intro-title" className="h-xl" data-reveal style={delay(80)}>
              One Team. Multiple Ways to Build Better.
            </h2>
            <div className="prose lead" data-reveal style={delay(160)}>
              <p>
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
            <div data-reveal style={delay(220)}>
              <ArrowLink href="/about">More about our approach</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Divisions ---------- */}
      <section id="services" className="section tone-sage" aria-labelledby="services-title">
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
      {/* Pinned while the cards travel sideways (scroll-driven); a native swipe row where unsupported. */}
      <section className="showcase" aria-labelledby="projects-title">
        <div className="showcase-pin">
          <div className="showcase-sticky">
            <div className="container showcase-head">
              <div>
                <p className="eyebrow" data-reveal>
                  Featured Projects
                </p>
                <h2 className="h-xl" id="projects-title" data-reveal style={delay(80)}>
                  Built Around Your Vision.
                </h2>
              </div>
              <div className="showcase-aside" data-reveal style={delay(160)}>
                <p className="lead">A selection of the project types we deliver across Brisbane and South East Queensland.</p>
                <div className="showcase-progress" aria-hidden="true">
                  <span className="showcase-count">
                    {String(featuredProjects.length).padStart(2, "0")} projects
                  </span>
                  <span className="showcase-bar">
                    <span />
                  </span>
                  <span className="showcase-hint">Scroll</span>
                </div>
              </div>
            </div>
            <ul className="showcase-track">
              {featuredProjects.map((p) => (
                <li key={p.id}>
                  <ProjectCard project={p} reveal={false} sizes="(max-width: 760px) 85vw, 36vw" />
                </li>
              ))}
              <li className="showcase-end">
                <Link href="/projects" className="showcase-end-link">
                  <span className="eyebrow">Project gallery</span>
                  <span className="h-lg">View All Projects</span>
                  <Arrow />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section section--dark tone-slate-deep" aria-labelledby="process-title">
        <div className="container">
          <SectionHead eyebrow="Our Approach" title="A Clear Path From Idea to Handover." id="process-title">
            Every project follows a structured process, so you understand what&apos;s happening at each stage and what
            decisions are needed next.
          </SectionHead>
          <BuildSequence steps={processSteps} note={processNote} />
        </div>
      </section>

      {/* ---------- Why Quadra ---------- */}
      <section className="section tone-clay" aria-labelledby="why-title">
        <div className="container reasons-grid">
          <div className="reasons-aside">
            <p className="eyebrow eyebrow--accent" data-reveal>
              Why {site.name}
            </p>
            <h2 id="why-title" className="h-xl" data-reveal style={delay(80)}>
              Built on Clarity and Care.
            </h2>
            <p className="lead" data-reveal style={delay(160)}>
              What you can expect when you work with us.
            </p>
            <div className="frame" data-reveal="clip" style={delay(200)}>
              <Image src={images.newHomeDusk.src} alt={images.newHomeDusk.alt} fill placeholder="blur" sizes="(max-width: 860px) 100vw, 40vw" />
            </div>
          </div>
          <ol className="reason-list">
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal style={delay(i * 60)}>
                <span className="idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-md">{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Service areas ---------- */}
      <section className="section section--dark grid-lines tone-brick-deep areas-section" aria-labelledby="areas-title">
        <div className="container areas-band">
          <h2 id="areas-title" className="big" data-reveal>
            Brisbane
            <span>&amp; South East Queensland.</span>
          </h2>
          <div className="copy" data-reveal style={delay(140)}>
            <p className="eyebrow">Service Areas</p>
            <p className="lead">
              We work with homeowners, businesses and property owners across Brisbane and the wider South East
              Queensland region. Not sure if we cover your location? Ask us — we&apos;ll let you know.
            </p>
            <div className="btn-row">
              <ButtonLink href="/service-areas" variant="light">
                View Service Areas
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section tone-slate" aria-labelledby="faq-title">
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
