import Link from "next/link";
import { divisions } from "@/content/divisions";
import { divisionHref, mainNav } from "@/content/navigation";
import { placeholderText, shouldRender, site } from "@/content/site";
import { cssVar } from "@/lib/style";
import { Arrow } from "./Icons";
import { FooterHouse } from "./FooterHouse";
import { Logo } from "./Logo";
import { Confirmed } from "./Placeholder";

/**
 * Footer: the logo house as division navigation (opened by a four-panel
 * split, a bookend to the intro), a title-block of ruled cells, then the
 * QUADRA wordmark standing on a ground line. As it scrolls into view each
 * letter fills from the ground up.
 */
export function Footer() {
  const { contact, legal } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <FooterHouse
        items={divisions.map((d) => ({
          slug: d.slug,
          number: d.number,
          name: d.shortName,
          summary: d.cardSummary,
          href: divisionHref(d.slug),
        }))}
      />

      <div className="container">
        <div className="footer-block">
          <div className="footer-cell footer-cell--brand">
            <Logo />
            <p className="footer-tagline">{site.tagline}</p>
            <p>Renovations, new homes, commercial fit-outs and approvals support across {site.region}.</p>
          </div>

          <div className="footer-cell">
            <h2 className="footer-label">01 — Company</h2>
            <ul className="footer-links">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-cell footer-cell--start">
            <h2 className="footer-label">02 — Start a project</h2>
            <Link href="/contact" className="footer-start">
              <span>Start an enquiry</span>
              <Arrow />
            </Link>
            <ul className="footer-links">
              {shouldRender(contact.phone) && (
                <li>
                  {contact.phone ? (
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                  ) : (
                    <Confirmed value={null} fallback={placeholderText.phone} />
                  )}
                </li>
              )}
              {shouldRender(contact.email) && (
                <li>
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  ) : (
                    <Confirmed value={null} fallback={placeholderText.email} />
                  )}
                </li>
              )}
              {shouldRender(contact.address) && (
                <li>
                  <Confirmed value={contact.address} fallback={placeholderText.address} />
                </li>
              )}
              <li className="footer-region">
                {site.city}, {site.state}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container" aria-hidden="true">
        <div className="footer-ground" data-reveal="fade">
          <div className="footer-sign">
            <span className="footer-word">
              {"QUADRA".split("").map((letter, i) => (
                <span key={i} style={cssVar("--i", i)}>
                  {letter}
                </span>
              ))}
            </span>
          </div>
          <div className="footer-dim">
            <span>
              {site.name} — {site.city}, QLD
            </span>
            <span>Building better spaces</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <p>
            © {year} {site.name}.
            {shouldRender(legal.abn) && (
              <>
                {" "}ABN: <Confirmed value={legal.abn} fallback={placeholderText.abn} />
              </>
            )}
            {shouldRender(legal.qbccLicence) && (
              <>
                {" · "}QBCC: <Confirmed value={legal.qbccLicence} fallback={placeholderText.qbccLicence} />
              </>
            )}
          </p>
          <ul>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>Imagery is illustrative (Unsplash) unless labelled as a completed project.</li>
            <li>
              <a href="#" className="footer-top-link">
                Back to top <span aria-hidden="true">↑</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
