import type { DivisionSlug } from "@/content/divisions";
import { cssVar } from "@/lib/style";

/** Inline style setting `--key` to a division's colour (one of the four logo houses). */
export const divisionKeyStyle = (slug: DivisionSlug) => cssVar("--key", `var(--div-${slug})`);

/** Small square colour key identifying a division. */
export function DivisionKey({ slug }: { slug: DivisionSlug }) {
  return <span className="div-key" style={divisionKeyStyle(slug)} aria-hidden="true" />;
}
