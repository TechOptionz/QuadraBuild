"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SiteImage } from "@/content/images";
import { Arrow } from "./Icons";

type HeroDivision = { slug: string; number: string; name: string; href: string; image: SiteImage };

/**
 * Home hero. The background photo cross-fades to a division's own photo while
 * the cursor (or keyboard focus) is on that division in the bar at the bottom,
 * and returns to the main photo when it leaves. The division photos are only
 * requested after the first interaction, so they cost nothing up front.
 */
export function HomeHero({
  image,
  divisions,
  children,
}: {
  image: SiteImage;
  divisions: HeroDivision[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [armed, setArmed] = useState(false);

  const show = (slug: string) => {
    setArmed(true);
    setActive(slug);
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <Image src={image.src} alt={image.alt} fill priority placeholder="blur" sizes="100vw" />
        {armed &&
          divisions.map((d) => (
            <div className="hero-alt" key={d.slug} data-active={active === d.slug}>
              <Image src={d.image.src} alt="" fill sizes="100vw" />
            </div>
          ))}
      </div>

      {children}

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
