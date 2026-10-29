"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.is-visible` to `[data-reveal]` elements (and `.process` lists) as they
 * scroll into view. Elements stay visible without JavaScript because the hidden
 * state only applies under `html.js`. Reduced-motion users see content
 * immediately (handled in CSS).
 */
const REVEAL_AT = 0.12;

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal at ~12% visibility; very tall elements (that can never reach
          // 12% of themselves) reveal once they fill 12% of the viewport.
          const enough =
            entry.intersectionRatio >= REVEAL_AT || entry.intersectionRect.height >= window.innerHeight * REVEAL_AT;
          if (entry.isIntersecting && enough) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      // On phones, start reveals just before elements scroll in so fast scrolling
      // never shows an empty frame.
      { threshold: [0, 0.05, REVEAL_AT], rootMargin: matchMedia("(max-width: 860px)").matches ? "0px 0px 20% 0px" : "0px" },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    };
    observe(document);

    // Pick up elements rendered later (e.g. filtered project lists).
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches("[data-reveal]")) io.observe(n);
            observe(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
