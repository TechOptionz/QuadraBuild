import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { divisions } from "@/content/divisions";
import { DEFAULT_LOGO, LOGO_HEAD_SCRIPT } from "@/content/logos";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  themeColor: "#061b49",
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
    <html lang="en-AU" className={`${manrope.variable} ${inter.variable}`} data-logo={DEFAULT_LOGO} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is available. If the
            app's scripts never start (failed chunk, blocked script), the class is
            dropped again so content is never left hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');setTimeout(function(){if(!window.__revealReady)d.classList.remove('js')},3000)})(document.documentElement)",
          }}
        />
        {/* Applies the logo chosen in the header dropdown before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: LOGO_HEAD_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
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
