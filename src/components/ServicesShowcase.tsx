"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Division } from "@/content/divisions";
import { delay } from "@/lib/style";

/**
 * Division services list with a sticky photo beside it that swaps to the
 * service currently hovered or tapped.
 */
export function ServicesShowcase({ services, children }: { services: Division["services"]; children: ReactNode }) {
  const [active, setActive] = useState(0);

  return (
    <div className="container services-layout">
      <div className="services-aside">
        {children}
        <div className="image-frame services-photo" style={{ aspectRatio: "4 / 5" }} data-reveal="clip">
          {services.map((s, i) => (
            <Image
              key={s.title}
              src={s.image.src}
              alt={s.image.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 960px) 100vw, 38vw"
              className="services-photo-img"
              data-active={i === active}
              aria-hidden={i !== active}
            />
          ))}
        </div>
      </div>
      <ol className="service-list">
        {services.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            data-active={i === active}
            style={delay((i % 3) * 60)}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="service-idx" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="h-sm">{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
