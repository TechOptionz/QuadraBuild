import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF encodes several times slower on first request, which made
    // below-the-fold photos appear late.
    formats: ["image/webp"],
  },
};

export default nextConfig;
