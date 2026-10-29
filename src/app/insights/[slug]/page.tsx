import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { articles, getArticle } from "@/content/insights";
import { showPlaceholders } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    // Draft outlines should not be indexed until the final article is published.
    robots: article.isSample ? { index: false, follow: true } : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="page-hero page-hero--simple">
          <div className="container">
            <div className="page-hero-text article-body" style={{ marginInline: "auto" }}>
              <nav aria-label="Breadcrumb">
                <ol className="breadcrumb">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/insights">Insights &amp; Guides</Link>
                  </li>
                  <li>
                    <span aria-current="page">{article.category}</span>
                  </li>
                </ol>
              </nav>
              <p className="eyebrow eyebrow--accent">{article.category}</p>
              <h1 className="h-lg">{article.title}</h1>
              <p className="lead">{article.excerpt}</p>
              {showPlaceholders && article.isSample && (
                <p className="ph" style={{ fontSize: "0.9rem", justifySelf: "start" }}>
                  Draft outline — full article to be written and reviewed before publishing.
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="container">
          <div className="article-hero-img">
            <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(max-width: 1400px) 100vw, 1400px" />
          </div>
          <div className="article-body" style={{ paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
            {article.outline.map((s) => (
              <section key={s.heading}>
                <h2 className="h-md">{s.heading}</h2>
                <p>{s.body}</p>
              </section>
            ))}
            <p className="muted" style={{ marginTop: "3rem", fontSize: "0.95rem" }}>
              This guide provides general information only and is not a substitute for advice about your specific
              property or project. Requirements can vary by site and council — confirm details with the relevant
              authority and appropriately qualified professionals.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <ArrowLink href="/insights">Back to all guides</ArrowLink>
            </div>
          </div>
        </div>
      </article>

      <section className="section tone-sand" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="h-lg" style={{ marginBottom: "2.5rem" }}>
            More Guides
          </h2>
          <div className="article-grid">
            {more.map((a) => (
              <article key={a.slug} className="article-card" data-reveal>
                <div className="media">
                  {showPlaceholders && a.isSample && <span className="badge">Draft outline</span>}
                  <Image src={a.image.src} alt="" fill placeholder="blur" sizes="(max-width: 600px) 100vw, 33vw" />
                </div>
                <p className="meta">{a.category}</p>
                <h3 className="h-md">
                  <Link href={`/insights/${a.slug}`}>{a.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
