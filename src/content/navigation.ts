import { divisions } from "./divisions";

export const divisionHref = (slug: string) => `/services/${slug}`;

export const serviceLinks = divisions.map((d) => ({
  slug: d.slug,
  href: divisionHref(d.slug),
  label: d.name,
  number: d.number,
  summary: d.headline,
}));

export const mainNav = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/insights", label: "Insights" },
];
