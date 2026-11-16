"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteImage } from "@/content/images";

export type ShowcaseItem = {
  title: string;
  text: string;
  image: SiteImage;
  /** Optional icon shown beside the title (rendered on the server and passed in). */
  icon?: React.ReactNode;
};

/**
 * A list of points paired with a photo that changes with the active point.
 *
 * - `trigger="scroll"`: the photo stays pinned while the list scrolls past, and
 *   switches to whichever point is crossing the middle of the screen.
 * - `trigger="hover"`: the photo switches as the cursor moves over the points
 *   (or when one is tapped).
 *
 * On small screens the scroll version shows each photo inline with its point.
 * All copy is always visible, so nothing depends on the interaction.
 */
export function Showcase({
  items,
  trigger = "scroll",
  flip = false,
  numbered = false,
}: {
  items: ShowcaseItem[];
  trigger?: "scroll" | "hover";
  flip?: boolean;
  numbered?: boolean;
}) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (trigger !== "scroll" || !listRef.current) return;
    const steps = Array.from(listRef.current.children);
    // A thin band across the middle of the viewport: the step inside it is active.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(steps.indexOf(e.target));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [trigger]);

  const cls = ["showcase", `showcase--${trigger}`, flip && "showcase--flip"].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <div className="showcase-media" data-reveal="fade">
        <div className="showcase-stage">
          {items.map((it, i) => (
            <div className="showcase-img" key={it.title} data-active={i === active} aria-hidden={i !== active}>
              <Image src={it.image.src} alt={it.image.alt} fill placeholder="blur" sizes="(max-width: 900px) 100vw, 48vw" />
            </div>
          ))}
          <p className="showcase-count" aria-hidden="true">
            <span>{String(active + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </div>
      <ol className="showcase-list" ref={listRef} role="list">
        {items.map((it, i) => (
          <li
            key={it.title}
            data-active={i === active}
            onMouseEnter={trigger === "hover" ? () => setActive(i) : undefined}
            onClick={trigger === "hover" ? () => setActive(i) : undefined}
          >
            {trigger === "scroll" && (
              <div className="showcase-inline">
                <Image src={it.image.src} alt="" fill sizes="(max-width: 900px) 100vw, 1px" />
              </div>
            )}
            <span className="showcase-mark" aria-hidden="true">
              {it.icon ?? (numbered ? String(i + 1).padStart(2, "0") : null)}
            </span>
            <h3 className="h-md">{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
