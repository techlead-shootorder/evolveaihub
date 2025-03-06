import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
