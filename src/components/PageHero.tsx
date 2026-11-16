import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/content/images";
import { cssVar } from "@/lib/style";
import { HeroGallery } from "./HeroGallery";

/**
 * Inner-page hero. Each page type uses a different composition so the site
 * doesn't open every page the same way:
 *
 * - `cover`    full-bleed photo with the copy over a navy scrim (About)
 * - `panel`    wide photo with the copy on a card that overlaps it (Service Areas)
 * - `gallery`  navy split with a photo switcher (division pages) — pass `images`
 * - `wall`     copy beside drifting columns of photos (Projects) — pass `images`
 * - `collage`  copy beside three overlapping photos (Insights) — pass `images`
 * - `split`    copy beside one photo (Contact, articles)
 * - `simple`   copy only (legal pages)
 */
export type HeroVariant = "cover" | "panel" | "gallery" | "wall" | "collage" | "split" | "simple";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  images = [],
  variant,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: SiteImage;
  images?: SiteImage[];
  variant?: HeroVariant;
  crumbs: { href?: string; label: string }[];
  children?: React.ReactNode;
}) {
  const v: HeroVariant = variant ?? (image ? "split" : "simple");

  const text = (
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
  );

  if (v === "cover" && image) {
    return (
      <section className="page-hero page-hero--cover">
        <div className="page-hero-bg" data-parallax>
          <Image src={image.src} alt={image.alt} fill priority placeholder="blur" sizes="100vw" />
        </div>
        <div className="container">{text}</div>
      </section>
    );
  }

  if (v === "panel" && image) {
    return (
      <section className="page-hero page-hero--panel">
        <div className="page-hero-bg" data-parallax>
          <Image src={image.src} alt={image.alt} fill priority placeholder="blur" sizes="100vw" />
        </div>
        <div className="container">{text}</div>
      </section>
    );
  }

  let media: React.ReactNode = null;
  if (v === "gallery" && images.length > 0) {
    media = <HeroGallery images={images} />;
  } else if (v === "wall" && images.length > 0) {
    // Three columns drifting in alternate directions; each list is doubled so the loop is seamless.
    const cols = [0, 1, 2].map((c) => images.filter((_, i) => i % 3 === c));
    media = (
      <div className="hero-wall">
        {cols.map((col, c) => (
          <div className="hero-wall-col" key={c} style={cssVar("--dur", `${38 + c * 9}s`)}>
            <div className="hero-wall-track">
              {[...col, ...col].map((img, i) => (
                <div className="hero-wall-item" key={i} aria-hidden={i >= col.length || undefined}>
                  <Image
                    src={img.src}
                    alt={i >= col.length ? "" : img.alt}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 860px) 34vw, 17vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (v === "collage" && images.length > 0) {
    media = (
      <div className="hero-collage">
        {images.slice(0, 3).map((img, i) => (
          <div className="hero-collage-item" key={i} data-parallax={i === 1 ? "slow" : undefined}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              placeholder="blur"
              sizes="(max-width: 860px) 60vw, 30vw"
            />
          </div>
        ))}
      </div>
    );
  } else if (image) {
    media = (
      <div className="page-hero-media">
        <Image src={image.src} alt={image.alt} fill priority placeholder="blur" sizes="(max-width: 860px) 100vw, 48vw" />
      </div>
    );
  }

  return (
    <section className={`page-hero page-hero--${media ? v : "simple"}`}>
      <div className="container">
        <div className="page-hero-grid">
          {text}
          {media}
        </div>
      </div>
    </section>
  );
}
