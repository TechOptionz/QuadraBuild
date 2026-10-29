import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/content/images";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: SiteImage;
  crumbs: { href?: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero ${image ? "" : "page-hero--simple"}`}>
      <div className="container">
        <div className="page-hero-grid">
          <div className="page-hero-text">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li>
                  <Link href="/">Home</Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label}>
                    {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="eyebrow eyebrow--accent">{eyebrow}</p>
            <h1 className="h-xl">{title}</h1>
            {intro && <div className="lead">{intro}</div>}
            {children}
          </div>
          {image && (
            <div className="page-hero-media">
              <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 860px) 100vw, 48vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
