import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { RevealObserver } from "@/components/RevealObserver";
import { divisions } from "@/content/divisions";
import { site } from "@/content/site";
import { INTRO_HEAD_SCRIPT } from "@/lib/intro";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const defaultDescription =
  "Quadra Build delivers home renovations, extensions, new homes, granny flats, commercial fit-outs and development approval support across Brisbane and South East Queensland.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Renovations, New Homes, Commercial & Approvals — Brisbane`,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: defaultDescription,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1d1e1b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  description: defaultDescription,
  areaServed: [
    { "@type": "City", name: "Brisbane" },
    { "@type": "State", name: "Queensland" },
  ],
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "QLD", addressCountry: "AU" },
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(site.contact.email ? { email: site.contact.email } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: divisions.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.name } })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is available. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Decides before first paint whether the logo intro plays (first visit per session). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_HEAD_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Intro />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
