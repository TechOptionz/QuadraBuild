"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteImage } from "@/content/images";
import { Arrow } from "./Icons";

type HeroDivision = { slug: string; number: string; name: string; href: string; image: SiteImage };

const SLIDE_MS = 6000;

/**
 * Home hero. The background is a slideshow of house photos that cross-fade
 * every few seconds; visitors can pause it or jump to a photo with the
 * controls at the bottom right. It does not auto-advance for visitors who
 * prefer reduced motion.
 *
 * While the cursor (or keyboard focus) is on a division in the bar at the
 * bottom, that division's own photo fades in over the slideshow and the
 * slideshow waits. Only the first slide loads up front: each later slide is
 * requested one step ahead and the slideshow holds until it has downloaded.
 * Division photos are requested after the first interaction.
 */
export function HomeHero({
  slides,
  divisions,
  children,
}: {
  slides: SiteImage[];
  divisions: HeroDivision[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [armed, setArmed] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /** Highest slide index rendered so far (the current one plus the next). */
  const [reach, setReach] = useState(0);
  /** Slides whose photo has finished downloading. */
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(new Set());

  const show = (slug: string) => {
    setArmed(true);
    setActive(slug);
  };

  const goTo = (i: number) => {
    setIndex(i);
    setReach((r) => Math.max(r, i + 1));
  };

  // Preload the second slide once the page is interactive.
  useEffect(() => {
    setReach((r) => Math.max(r, 1));
  }, []);

  const holding = paused || active !== null;
  const next = (index + 1) % slides.length;
  // Never fade to a photo that is still downloading: wait on the current one.
  const nextReady = loaded.has(next);
  useEffect(() => {
    if (holding || !nextReady || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setIndex(next);
      setReach((r) => Math.max(r, next + 1));
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [holding, nextReady, next, slides.length]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        {slides.map((slide, i) =>
          i <= reach ? (
            <div className="hero-slide" key={i} data-active={i === index} aria-hidden={i !== index}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                placeholder="blur"
                quality={70}
                sizes="100vw"
                onLoad={() => setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))}
              />
            </div>
          ) : null,
        )}
        {armed &&
          divisions.map((d) => (
            <div className="hero-alt" key={d.slug} data-active={active === d.slug}>
              <Image src={d.image.src} alt="" fill sizes="100vw" />
            </div>
          ))}
      </div>

      {children}

      {slides.length > 1 && (
        <div className="container hero-slide-nav">
          <button
            type="button"
            className="hero-slide-toggle"
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setPaused((p) => !p)}
          >
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" fill="currentColor">
              {paused ? <path d="M2.5 1l8 5-8 5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
            </svg>
          </button>
          {slides.map((_, i) => (
            <button
              type="button"
              key={i}
              className="hero-slide-dot"
              aria-label={`Show photo ${i + 1} of ${slides.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      <nav className="hero-divisions" aria-label="Divisions" onMouseLeave={() => setActive(null)}>
        <div className="container">
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href={d.href}
              data-active={active === d.slug}
              onMouseEnter={() => show(d.slug)}
              onFocus={() => show(d.slug)}
              onBlur={() => setActive(null)}
            >
              <span className="num">{d.number}</span>
              <span className="name">{d.name}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
