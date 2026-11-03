import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: false,
  // partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  serverExternalPackages: ["better-sqlite3"],
  outputFileTracingIncludes: {
    "/api/*": ["./data/**/*"],
    "/ifsc/*": ["./data/**/*"],
    "/bank/*": ["./data/**/*"],
    "/search/*": ["./data/**/*"],
    "/state/*": ["./data/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/ifsc/:code",
        has: [{ type: "query", key: "code" }],
        destination: "/ifsc/:code",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
