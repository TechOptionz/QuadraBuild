import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ImageSlot } from "@/components/ImageSlot";
import { PageHero } from "@/components/PageHero";
import { Confirmed } from "@/components/Placeholder";
import { imageSlots } from "@/content/imageSlots";
import { placeholderText, shouldRender, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Discuss your renovation, new home, granny flat, commercial fit-out or development approval project with Quadra Build in Brisbane.",
  alternates: { canonical: "/contact" },
};

const prepare = [
  "Property address or suburb",
  "What you'd like to achieve",
  "Photos of the existing space",
  "Any plans, surveys or reports",
  "An approximate budget range",
  "Your preferred timing",
];

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk About Your Project."
        intro={
          <p>
            Whether you&apos;re planning a renovation, a new home, a commercial fit-out or exploring a development
            opportunity, start with a conversation. Share a few details and we&apos;ll help you understand the next steps.
          </p>
        }
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section section--bordered" style={{ paddingTop: "3rem" }}>
        <div className="container contact-layout">
          <aside className="contact-aside" aria-label="Contact information">
            <dl>
              {shouldRender(contact.phone) && (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    {contact.phone ? (
                      <a className="text-link" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                        {contact.phone}
                      </a>
                    ) : (
                      <Confirmed value={null} fallback={placeholderText.phone} />
                    )}
                  </dd>
                </div>
              )}
              {shouldRender(contact.email) && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    {contact.email ? (
                      <a className="text-link" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    ) : (
                      <Confirmed value={null} fallback={placeholderText.email} />
                    )}
                  </dd>
                </div>
              )}
              {shouldRender(contact.address) && (
                <div>
                  <dt>Office</dt>
                  <dd>
                    <Confirmed value={contact.address} fallback={placeholderText.address} />
                  </dd>
                </div>
              )}
              {shouldRender(contact.hours) && (
                <div>
                  <dt>Hours</dt>
                  <dd>
                    <Confirmed value={contact.hours} fallback={placeholderText.hours} />
                  </dd>
                </div>
              )}
              <div>
                <dt>Service area</dt>
                <dd>
                  {site.region}.{" "}
                  <Link href="/service-areas" className="text-link">
                    View service areas
                  </Link>
                </dd>
              </div>
            </dl>

            <ImageSlot slot={imageSlots.contactOffice} ratio="4 / 3" sizes="(max-width: 860px) 100vw, 30vw" />

            <div className="placeholder-panel" style={{ borderStyle: "solid" }}>
              <h2 className="h-sm">Preparing for your consultation</h2>
              <p className="muted" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                It helps to have the following on hand — but don&apos;t worry if you don&apos;t have it all yet.
              </p>
              <ul style={{ marginTop: "1rem", paddingLeft: "1.1rem", display: "grid", gap: "0.35rem", fontSize: "0.95rem" }}>
                {prepare.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </aside>

          <Suspense fallback={<div className="form" aria-busy="true" style={{ minHeight: "40rem" }} />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
