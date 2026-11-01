"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SiteImage } from "@/content/images";

/** How long each photo holds (and slowly zooms) before the next fades in. */
const SLIDE_MS = 3000;

/**
 * Crossfading hero photos with a slow zoom on each. The incoming slide fades in
 * over the outgoing one, which keeps its zoom running until it is covered.
 * Holds on the first photo for visitors who prefer reduced motion.
 */
export function HeroSlideshow({ slides }: { slides: SiteImage[] }) {
  const [{ current, previous }, setShown] = useState<{ current: number; previous: number | null }>({
    current: 0,
    previous: null,
  });

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setShown((s) => ({ current: (s.current + 1) % slides.length, previous: s.current }));
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-media">
      {slides.map((slide, i) => {
        const state = i === current ? "active" : i === previous ? "prev" : undefined;
        return (
          <div className="hero-slide" data-state={state} aria-hidden={i !== current} key={slide.src.src}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              placeholder="blur"
              sizes="100vw"
            />
          </div>
        );
      })}
    </div>
  );
}
