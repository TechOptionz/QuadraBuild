"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SiteImage } from "@/content/images";

const ADVANCE_MS = 5500;

/**
 * Photo switcher for division heroes: one large photo with thumbnails.
 * Hovering, focusing or tapping a thumbnail shows that photo; otherwise it
 * advances on its own (paused while the pointer is over it, and switched off
 * for visitors who prefer reduced motion).
 */
export function HeroGallery({ images }: { images: SiteImage[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % images.length), ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, images.length]);

  return (
    <div
      className="hero-gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-gallery-stage">
        {images.map((img, i) => (
          <div className="hero-gallery-slide" key={i} data-active={i === active} aria-hidden={i !== active}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              placeholder="blur"
              sizes="(max-width: 860px) 100vw, 52vw"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="hero-gallery-thumbs" role="group" aria-label="Choose photo">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={i === active}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <Image src={img.src} alt="" fill sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
