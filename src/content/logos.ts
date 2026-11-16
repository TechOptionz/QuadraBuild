import type { StaticImageData } from "next/image";
import logoEmblem from "@/assets/brand/logo-emblem.png";
import logoEmblemDark from "@/assets/brand/logo-emblem-dark.png";
import logoHouses from "@/assets/brand/logo-houses.png";
import logoHousesNavy from "@/assets/brand/logo-houses-navy.png";
import logoQb from "@/assets/brand/logo-qb.png";
import logoWordmark from "@/assets/brand/logo-wordmark.png";

/**
 * The supplied Quadra Build logos (PNGs in src/assets/brand).
 * They sit with no plate behind them. The four-houses file has white "QUADRA"
 * lettering, so `src` is a copy with that lettering in navy for light
 * backgrounds and `srcOnDark` is the file as supplied, used in the navy footer.
 * The house emblem was supplied as a transparent PNG with navy lettering, so
 * `src` is that file (trimmed) and `srcOnDark` is a copy with the navy parts in
 * white for the navy footer. Earlier emblem files are kept in brand/.
 * The choice made in the header dropdown is kept in localStorage.
 */
export type LogoId = "wordmark" | "qb" | "houses" | "emblem";

export const logos: { id: LogoId; label: string; note: string; src: StaticImageData; srcOnDark?: StaticImageData }[] = [
  { id: "wordmark", label: "Wordmark", note: "Quadra wordmark with roof accents", src: logoWordmark },
  { id: "qb", label: "QB monogram", note: "Stacked QB mark and name", src: logoQb },
  { id: "houses", label: "Four houses", note: "One house per division", src: logoHousesNavy, srcOnDark: logoHouses },
  { id: "emblem", label: "House emblem", note: "Four houses with the full name", src: logoEmblem, srcOnDark: logoEmblemDark },
];

export const DEFAULT_LOGO: LogoId = "wordmark";
export const LOGO_STORAGE_KEY = "qb-logo";

/** Runs in <head> before first paint so the chosen logo never flashes. */
export const LOGO_HEAD_SCRIPT = `try{var l=localStorage.getItem("${LOGO_STORAGE_KEY}");if(l==="wordmark"||l==="qb"||l==="houses"||l==="emblem")document.documentElement.dataset.logo=l}catch(e){}`;
