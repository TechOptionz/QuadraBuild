"use client";

import { useCallback, useEffect, useState } from "react";
import { QH_EDGES, QH_FACES, QH_VIEWBOX } from "@/components/Logo";
import { site } from "@/content/site";

/**
 * First-visit intro: the four blocks of the Q-House mark fly together, then
 * break apart towards the four sides of the screen, splitting the cover into
 * four panels that reveal the page.
 *
 * The overlay is server-rendered so it covers the page from the first paint.
 * An inline script in <head> (see lib/intro.ts) adds `html.intro-skip`
 * on repeat visits within a session and for reduced-motion users, which hides
 * it with CSS before anything paints.
 */

/** Polygon indexes in QH_EDGES / QH_FACES for each block, painted bottom to top. */
const PIECES = [
  { key: "roof", edges: [0, 1, 5], faces: [0, 1, 5] },
  { key: "left", edges: [2], faces: [2] },
  { key: "base", edges: [4], faces: [4] },
  { key: "right", edges: [3, 6], faces: [3, 6] },
] as const;

const HOLD_MS = 1650; // assembled logo on screen before the break
const BREAK_MS = 1150; // break-apart and panel reveal

type Phase = "build" | "break" | "done";

export function Intro() {
  const [phase, setPhase] = useState<Phase>("build");

  const finish = useCallback(() => {
    document.documentElement.classList.remove("intro-playing", "intro-revealing");
    setPhase("done");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-skip") || !root.classList.contains("intro-playing")) {
      setPhase("done");
      return;
    }
    const t = window.setTimeout(() => setPhase("break"), HOLD_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "break") return;
    document.documentElement.classList.add("intro-revealing");
    const t = window.setTimeout(finish, BREAK_MS);
    return () => window.clearTimeout(t);
  }, [phase, finish]);

  // Any key, click or tap skips straight to the break.
  useEffect(() => {
    if (phase !== "build") return;
    const skip = () => setPhase("break");
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [phase]);

  if (phase === "done") return null;

  const [first, ...rest] = site.name.split(" ");

  return (
    <div className="intro" data-phase={phase} aria-hidden="true" onClick={() => setPhase("break")}>
      <div className="intro-panel intro-panel--top" />
      <div className="intro-panel intro-panel--right" />
      <div className="intro-panel intro-panel--bottom" />
      <div className="intro-panel intro-panel--left" />

      <div className="intro-stage">
        <div className="intro-mark">
          {PIECES.map((piece) => (
            <svg key={piece.key} className={`qh intro-piece intro-piece--${piece.key}`} viewBox={QH_VIEWBOX}>
              {piece.edges.map((i) => (
                <polygon key={`e${i}`} className={QH_EDGES[i].cls} points={QH_EDGES[i].points} />
              ))}
              {piece.faces.map((i) => (
                <polygon key={`f${i}`} className={QH_FACES[i].cls} points={QH_FACES[i].points} />
              ))}
            </svg>
          ))}
        </div>
        <p className="intro-word">
          {first} <span className="logo-sub">{rest.join(" ")}</span>
        </p>
      </div>
    </div>
  );
}
