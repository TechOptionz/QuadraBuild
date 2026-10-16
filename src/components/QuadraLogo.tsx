import type { CSSProperties } from "react";
import { LOGO_PATHS, LOGO_VIEWBOX } from "./logo-paths";

/** Flat colour set for the lockup: four roof structures (house first) plus the two wordmark colours. */
export type LogoColors = { house: string; roof2: string; roof3: string; roof4: string; quadra: string; build: string };

/**
 * Quadra Build lockup as a flat vector with configurable fills.
 * Geometry is traced once from the classic asset, so every palette shares identical shapes, spacing and proportions.
 */
export default function QuadraLogo({ colors, style, title = "Quadra Build" }: { colors: LogoColors; style?: CSSProperties; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={title} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d={LOGO_PATHS.house} fill={colors.house} />
      <path d={LOGO_PATHS.roof2} fill={colors.roof2} />
      <path d={LOGO_PATHS.roof3} fill={colors.roof3} />
      <path d={LOGO_PATHS.roof4} fill={colors.roof4} />
      <path d={LOGO_PATHS.quadra} fill={colors.quadra} fillRule="evenodd" />
      <path d={LOGO_PATHS.build} fill={colors.build} fillRule="evenodd" />
    </svg>
  );
}
