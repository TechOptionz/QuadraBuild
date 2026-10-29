import type { CSSProperties } from "react";

/** Sets a CSS custom property inline, e.g. `cssVar("--i", 2)`. */
export const cssVar = (name: `--${string}`, value: string | number) => ({ [name]: value }) as CSSProperties;

/** Reveal delay in milliseconds for `[data-reveal]` elements. */
export const delay = (ms: number) => cssVar("--d", ms);
