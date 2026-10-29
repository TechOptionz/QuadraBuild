import Link from "next/link";
import { site } from "@/content/site";

/**
 * "Q-House" mark geometry (viewBox units): a pitched-roof house outline that
 * reads as a Q, with a path-like tail. Each part has a front face and an
 * extruded edge, coloured by class (see `.qh` rules in globals.css):
 * b = brick roof, g = sage wall, s = slate wall and tail, d = sandstone base and window.
 */
export const QH_VIEWBOX = "12 19 284 284";

export const QH_EDGES: { cls: string; points: string }[] = [
  { cls: "be", points: "26,144 146,24 160,38 160,82 84,158 40,158" },
  { cls: "be", points: "146,24 280,158 236,158 146,68" },
  { cls: "ge", points: "60,144 100,144 114,158 114,274 74,274 60,260" },
  { cls: "se", points: "192,144 232,144 246,158 246,274 206,274 192,260" },
  { cls: "de", points: "100,224 192,224 206,238 206,274 114,274 100,260" },
  { cls: "de", points: "132,100 160,100 174,114 174,142 146,142 132,128" },
  { cls: "se", points: "195,229 213,211 269,267 283,281 265,299 251,285" },
];

export const QH_FACES: { cls: string; points: string }[] = [
  { cls: "b", points: "146,24 146,68 70,144 26,144" },
  { cls: "b", points: "146,24 266,144 222,144 146,68" },
  { cls: "g", points: "60,144 100,144 100,260 60,260" },
  { cls: "s", points: "192,144 232,144 232,260 192,260" },
  { cls: "d", points: "100,224 192,224 192,260 100,260" },
  { cls: "d", points: "132,100 160,100 160,128 132,128" },
  { cls: "s", points: "213,211 269,267 251,285 195,229" },
];

/** The brand mark. Colours come from CSS so it can lighten on dark backgrounds. */
export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  return (
    <svg className={`qh ${className}`} viewBox={QH_VIEWBOX} aria-hidden="true">
      {QH_EDGES.map((p, i) => (
        <polygon key={`e${i}`} className={p.cls} points={p.points} />
      ))}
      {QH_FACES.map((p, i) => (
        <polygon key={`f${i}`} className={p.cls} points={p.points} />
      ))}
    </svg>
  );
}

const [brandFirst, ...brandRest] = site.name.split(" ");

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" aria-label={`${site.name} — home`} onClick={onClick}>
      <LogoMark />
      <span>
        {brandFirst} <span className="logo-sub">{brandRest.join(" ")}</span>
      </span>
    </Link>
  );
}
