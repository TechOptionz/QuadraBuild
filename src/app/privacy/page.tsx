import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles personal information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Information"
        intro={
          <p>How we handle the details you share with us when you make an enquiry.</p>
        }
        crumbs={[{ label: "Privacy" }]}
      />
      <section className="section section--bordered" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div className="prose stack">
            <p>
              When you submit an enquiry through this website, we collect the details you provide — such as your name,
              email address, phone number, project location and project description — so we can respond to your
              enquiry.
            </p>
            <p>
              A complete privacy policy covering how {site.name} collects, uses, stores and discloses personal
              information, and how to request access or correction, will be published here. It should be reviewed
              against the business&apos;s obligations before the website goes live.
            </p>
            <p>
              For privacy enquiries, please get in touch through our{" "}
              <Link href="/contact" className="text-link">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
