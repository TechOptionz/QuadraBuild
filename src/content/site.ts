/**
 * Company information.
 *
 * Values set to `null` are NOT yet confirmed. Anywhere they are used, the site
 * renders nothing — or a clearly marked placeholder when `showPlaceholders` is
 * on. Fill these in once verified.
 */

/**
 * Show "to be confirmed" placeholders and internal draft labels.
 * Off by default so the public site never shows internal notes; set
 * `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` for a team review build.
 */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

/** True when a value is confirmed, or when placeholders should be shown in its place. */
export const shouldRender = (value: string | null | undefined) => Boolean(value) || showPlaceholders;

export const site = {
  name: "Quadra Build",
  parentBrand: "Quadra Build Group",
  tagline: "Building Better Spaces. Creating Better Futures.",
  city: "Brisbane",
  state: "Queensland",
  region: "Brisbane and South East Queensland",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com.au").replace(/\/$/, ""),

  contact: {
    phone: null as string | null, // e.g. "07 0000 0000"
    email: null as string | null, // e.g. "hello@quadrabuild.com.au"
    address: null as string | null, // office / postal address
    hours: null as string | null, // e.g. "Mon–Fri, 7am–5pm"
  },

  legal: {
    abn: null as string | null,
    qbccLicence: null as string | null, // QBCC licence number(s) and class
  },

  /**
   * Suburbs are only listed once confirmed by the business.
   * Add names here (e.g. ["Paddington", "Bulimba"]) and the
   * Service Areas page will display them automatically.
   */
  confirmedSuburbs: [] as string[],

  social: [] as { label: string; href: string }[],
};

export const placeholderText = {
  phone: "Phone number to be confirmed",
  email: "Email address to be confirmed",
  address: "Office address to be confirmed",
  hours: "Business hours to be confirmed",
  abn: "ABN to be confirmed",
  qbccLicence: "QBCC licence details to be confirmed",
} as const;
