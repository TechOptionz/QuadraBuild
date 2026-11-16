import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server keeps its own output folder so running `next build` while
  // `next dev` is open can't overwrite the dev server's script chunks.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    // WebP only: AVIF encodes several times slower on first request, which made
    // below-the-fold photos appear late.
    formats: ["image/webp"],
    // 75 is the default for photos; 95 keeps the logos crisp; 70 is used by
    // the dev-mode blur placeholders.
    qualities: [70, 75, 95],
    // Keep resized photos for 31 days instead of the 60-second default, so
    // they are not re-encoded over and over. A changed photo gets a new URL.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
