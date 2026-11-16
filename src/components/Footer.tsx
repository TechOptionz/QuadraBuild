import Link from "next/link";
import { divisions } from "@/content/divisions";
import { divisionHref, mainNav } from "@/content/navigation";
import { placeholderText, shouldRender, site } from "@/content/site";
import { Arrow } from "./Icons";
import { Logo } from "./Logo";
import { Confirmed } from "./Placeholder";

export function Footer() {
  const { contact, legal } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo onDark />
            <p className="footer-tagline">{site.tagline}</p>
            <p>
              Renovations, new homes, commercial fit-outs and approvals support, delivered by one coordinated team
              across {site.region}.
            </p>
          </div>

          <nav className="footer-col" aria-labelledby="footer-company">
            <h2 id="footer-company" className="footer-label">
              Company
            </h2>
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
          </nav>

          <nav className="footer-col" aria-labelledby="footer-divisions">
            <h2 id="footer-divisions" className="footer-label">
              Divisions
            </h2>
            <ul className="footer-links">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link href={divisionHref(d.slug)}>
                    <span className="num" aria-hidden="true">
                      {d.number}
                    </span>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-label">Contact</h2>
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
              <li>
                Servicing {site.region}.{" "}
                <Link href="/service-areas" className="footer-inline-link">
                  Service areas
                </Link>
              </li>
            </ul>
            <Link href="/contact" className="footer-start">
              <span>Start an enquiry</span>
              <Arrow />
            </Link>
          </div>
        </div>

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
