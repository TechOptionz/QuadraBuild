"use client";

import { useEffect, useRef, useState } from "react";
import { QH_EDGES, QH_FACES } from "@/components/Logo";

/**
 * The Process section's signature: as the five steps scroll past, a large
 * Q-House mark is set out, measured and built block by block beside them.
 *
 * Progress is driven by where each step sits relative to a line across the
 * viewport, so scrolling back un-builds the house. Nothing is pinned or
 * scroll-jacked: the stage is a sticky column next to normally flowing steps.
 *
 * Every animated value is a CSS custom property that defaults to its finished
 * state, so without JavaScript or with reduced motion the house is complete.
 */

type Step = { title: string; text: string };

const VIEWBOX = "0 0 310 335";

/** Set-out rectangle around the walls, with a peg at each corner. */
const SET_OUT = { x1: 48, y1: 132, x2: 258, y2: 286 };
const PEGS = [
  [SET_OUT.x1, SET_OUT.y2],
  [SET_OUT.x2, SET_OUT.y2],
  [SET_OUT.x2, SET_OUT.y1],
  [SET_OUT.x1, SET_OUT.y1],
] as const;

/** Blocks in paint order, with polygon indexes into QH_EDGES / QH_FACES. */
const BLOCKS = [
  { key: "roof", polys: [0, 1] },
  { key: "win", polys: [5] },
  { key: "left", polys: [2] },
  { key: "base", polys: [4] },
  { key: "right", polys: [3] },
  { key: "tail", polys: [6] },
] as const;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeBack = (t: number) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;

/** Maps each step's local progress (0–1) to the stage's animation values. */
function frame(t: number[]): Record<string, number> {
  const [discover, assess, plan, build, complete] = t;
  const colour = easeOut(seg(complete, 0.3, 0.65));
  return {
    setout: easeOut(seg(discover, 0.05, 0.55)),
    peg0: easeBack(seg(discover, 0.35, 0.6)),
    peg1: easeBack(seg(discover, 0.42, 0.67)),
    peg2: easeBack(seg(discover, 0.49, 0.74)),
    peg3: easeBack(seg(discover, 0.56, 0.81)),
    dims: easeOut(seg(assess, 0, 0.5)),
    ghost: easeOut(seg(assess, 0.2, 0.8)),
    base: easeOut(seg(plan, 0.1, 0.6)),
    left: easeOut(seg(build, 0, 0.35)),
    right: easeOut(seg(build, 0.15, 0.5)),
    roof: easeOut(seg(build, 0.35, 0.75)),
    tail: easeBack(seg(complete, 0, 0.3)),
    win: easeBack(seg(complete, 0.1, 0.35)),
    colour,
  };
}

export function BuildSequence({ steps, note }: { steps: Step[]; note?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(steps.length - 1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".build-step"));
    let raf = 0;

    const update = () => {
      raf = 0;
      // The "reading line": lower on narrow screens, where the stage sits on top.
      const line = window.innerHeight * (window.innerWidth <= 960 ? 0.95 : 0.6);
      const t = items.map((el) => {
        const r = el.getBoundingClientRect();
        return clamp01((line - r.top) / r.height);
      });
      for (const [name, value] of Object.entries(frame(t))) {
        root.style.setProperty(`--${name}`, value.toFixed(4));
      }
      const done = t.reduce((sum, v) => sum + v, 0) / t.length;
      root.style.setProperty("--p", done.toFixed(4));
      const current = t.findLastIndex((v) => v > 0);
      setActive(Math.max(0, current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="build" ref={rootRef}>
      <div className="build-stage" aria-hidden="true">
        <div className="build-art">
          {/* Linework: set-out, pegs, dimensions and the ghost outline. */}
          <svg className="build-lines" viewBox={VIEWBOX}>
            <rect
              className="bl-setout"
              x={SET_OUT.x1}
              y={SET_OUT.y1}
              width={SET_OUT.x2 - SET_OUT.x1}
              height={SET_OUT.y2 - SET_OUT.y1}
              pathLength={1}
            />
            {PEGS.map(([x, y], i) => (
              <g key={i} className="bl-peg" style={{ ["--t" as string]: `var(--peg${i})` }}>
                <g transform={`translate(${x} ${y})`}>
                  <circle r="5" />
                  <path d="M-8 0H8M0 -8V8" />
                </g>
              </g>
            ))}
            <g className="bl-dims">
              <path d={`M${SET_OUT.x1} 292V312M${SET_OUT.x2} 292V312`} />
              <path d={`M${SET_OUT.x1} 306H${SET_OUT.x2}`} />
              <path d={`M${SET_OUT.x1 - 4} 310l8 -8M${SET_OUT.x2 - 4} 310l8 -8`} />
              <text x={(SET_OUT.x1 + SET_OUT.x2) / 2} y="326" textAnchor="middle">
                SET-OUT
              </text>
              <path d="M10 24H40M10 286H40" />
              <path d="M22 24V286" />
              <path d="M18 28l8 -8M18 290l8 -8" />
              <text x="16" y="155" textAnchor="middle" transform="rotate(-90 16 155)">
                HEIGHT
              </text>
            </g>
            <g className="bl-ghost">
              {QH_FACES.map((f, i) => (
                <polygon key={i} points={f.points} pathLength={1} />
              ))}
            </g>
          </svg>

          {/* The blocks, which warm from grey to full colour on completion. */}
          <svg className="qh build-blocks" viewBox={VIEWBOX}>
            {BLOCKS.map((b) => (
              <g key={b.key} className={`bb bb--${b.key}`}>
                {b.polys.map((i) => (
                  <polygon key={`e${i}`} className={QH_EDGES[i].cls} points={QH_EDGES[i].points} />
                ))}
                {b.polys.map((i) => (
                  <polygon key={`f${i}`} className={QH_FACES[i].cls} points={QH_FACES[i].points} />
                ))}
              </g>
            ))}
          </svg>
        </div>

        <p className="build-caption">
          <span>
            {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </span>
          <span>{steps[active]?.title}</span>
          <span className="build-progress" />
        </p>
      </div>

      <ol className="build-steps">
        {steps.map((s, i) => (
          <li key={s.title} className="build-step" data-state={i < active ? "done" : i === active ? "active" : "next"}>
            <span className="step-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="h-md">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>

      {note && <p className="process-note build-note">{note}</p>}
    </div>
  );
}
