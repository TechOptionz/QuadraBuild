import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
    formats: ["image/avif", "image/webp"],
    // Cap background photos at 2048px: the 3840 default roughly doubles bytes on 2x screens for no visible gain under the gradient overlays.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    qualities: [60, 75],
    minimumCacheTTL: 31 * 24 * 60 * 60,
  },
};

export default nextConfig;
