import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  env: {
    SITE_URL: "https://gaelgomes.dev",
  },
  // Configurações de SEO e performance
  generateEtags: false,
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
