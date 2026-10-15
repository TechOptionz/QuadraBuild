import type { Metadata } from "next";
import { EB_Garamond, Albert_Sans } from "next/font/google";
import Shell from "@/components/Shell";
import "./globals.css";

const serif = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--serif", display: "swap" });
const sans = Albert_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Quadra Build | Renovations, Homes & Commercial in Brisbane", template: "%s" },
  description: "Explore residential renovations, new homes, granny flats, commercial fit-outs and development approval support with Quadra Build in Brisbane, Queensland.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { siteName: "Quadra Build", locale: "en_AU", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div data-qb style={{ position: "relative", background: "#211A19", color: "#F9F4EE", minHeight: "100vh" }}>
          <Shell />
          {children}
        </div>
      </body>
    </html>
  );
}
