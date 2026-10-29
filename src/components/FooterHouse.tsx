"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { DivisionSlug } from "@/content/divisions";
import { divisionKeyStyle } from "./DivisionKey";
import { Arrow } from "./Icons";
import { QH_EDGES, QH_FACES, QH_VIEWBOX } from "./Logo";

export type HouseDivision = {
  slug: DivisionSlug;
  number: string;
  name: string;
  summary: string;
  href: string;
};

/**
 * Each logo block is one division (they share colours). Listed in paint
 * order, with polygon indexes into QH_EDGES / QH_FACES and the direction the
 * block lifts out when active.
 */
const BLOCKS: { slug: DivisionSlug; polys: number[]; lift: [number, number] }[] = [
  { slug: "renovations", polys: [0, 1, 5], lift: [0, -18] },
  { slug: "commercial", polys: [2], lift: [-18, 0] },
  { slug: "approvals", polys: [4], lift: [0, 18] },
  { slug: "homes", polys: [3, 6], lift: [18, 4] },
];

const CYCLE_MS = 2400;

/**
 * The footer's opening: four colour panels split apart like the intro to
 * reveal the logo house, whose blocks double as division navigation.
 * Hovering a block or a row lifts that block; clicking either opens the
 * division. Until someone interacts, it gently cycles through the four.
 */
export function FooterHouse({ items }: { items: HouseDivision[] }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<DivisionSlug | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.intersectionRatio >= 0.45) setOpen(true);
      },
      { threshold: [0, 0.45] },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // Once the blocks have assembled, drop the stagger so hover lifts are instant.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setReady(true), 1800);
    return () => window.clearTimeout(t);
  }, [open]);

  // Idle cycle, so the idea is visible without hovering.
  useEffect(() => {
    if (!open || !inView || touched || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const tick = () => {
      setActive(items[i % items.length].slug);
      i += 1;
    };
    const first = window.setTimeout(tick, 900);
    const timer = window.setInterval(tick, CYCLE_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [open, inView, touched, items]);

  const pick = (slug: DivisionSlug | null) => {
    setTouched(true);
    setActive(slug);
  };
  const current = items.find((d) => d.slug === active);

  return (
    <div className="fh" ref={rootRef} data-open={open} data-ready={ready}>
      <div className="fh-cover" aria-hidden="true">
        <span className="fh-panel fh-panel--top" />
        <span className="fh-panel fh-panel--right" />
        <span className="fh-panel fh-panel--bottom" />
        <span className="fh-panel fh-panel--left" />
      </div>

      <div className="container fh-grid">
        <div className="fh-art" onMouseLeave={() => pick(null)}>
          <svg className="qh fh-house" viewBox={QH_VIEWBOX} aria-hidden="true" data-active={active ?? ""}>
            {BLOCKS.map((b) => {
              const item = items.find((d) => d.slug === b.slug);
              return (
                <g
                  key={b.slug}
                  className="fh-block"
                  data-on={active === b.slug}
                  style={{ ["--lx" as string]: `${b.lift[0]}px`, ["--ly" as string]: `${b.lift[1]}px` }}
                  onMouseEnter={() => pick(b.slug)}
                  onClick={() => {
                    // First tap on touch screens lifts the block; the next one opens it.
                    if (active === b.slug || matchMedia("(hover: hover)").matches) {
                      if (item) router.push(item.href);
                    } else {
                      pick(b.slug);
                    }
                  }}
                >
                  {b.polys.map((i) => (
                    <polygon key={`e${i}`} className={QH_EDGES[i].cls} points={QH_EDGES[i].points} />
                  ))}
                  {b.polys.map((i) => (
                    <polygon key={`f${i}`} className={QH_FACES[i].cls} points={QH_FACES[i].points} />
                  ))}
                </g>
              );
            })}
          </svg>
          <p className="fh-caption" aria-hidden="true">
            {current ? `${current.number} — ${current.name}` : "Pick a block"}
          </p>
        </div>

        <div className="fh-copy">
          <p className="footer-label">04 blocks — 04 divisions</p>
          <h2 className="h-lg fh-title">One house. Four ways to build.</h2>
          <ul className="fh-list">
            {items.map((d) => (
              <li key={d.slug}>
                <Link
                  href={d.href}
                  className="fh-row"
                  data-on={active === d.slug}
                  style={divisionKeyStyle(d.slug)}
                  onMouseEnter={() => pick(d.slug)}
                  onFocus={() => pick(d.slug)}
                >
                  <span className="num">{d.number}</span>
                  <span className="name">{d.name}</span>
                  <Arrow />
                  <span className="summary">
                    <span>{d.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
