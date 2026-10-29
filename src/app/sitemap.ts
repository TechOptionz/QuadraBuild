import type { MetadataRoute } from "next";
import { divisions } from "@/content/divisions";
import { articles } from "@/content/insights";
import { divisionHref } from "@/content/navigation";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    ...divisions.map((d) => divisionHref(d.slug)),
    "/projects",
    "/service-areas",
    "/insights",
    "/contact",
    // Draft outlines are excluded until published.
    ...articles.filter((a) => !a.isSample).map((a) => `/insights/${a.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, lastModified: new Date() }));
}
