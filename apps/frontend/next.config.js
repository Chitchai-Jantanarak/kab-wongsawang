/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
