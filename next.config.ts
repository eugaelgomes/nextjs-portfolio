import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  domain: "https://gaelgomes.dev",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  //experimental: {
  //  appDir: true,
  //  optimizeCss: true,
  //  optimizeFonts: true,
  //},
  //typescript: {
  //  ignoreBuildErrors: true,
  //},
};

export default nextConfig;
