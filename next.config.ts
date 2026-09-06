import type { NextConfig } from "next";

const pagesBasePath = process.env.PAGES_BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "";
const isPages = process.env.GITHUB_PAGES === "true";

const redirects = [
  { source: "/shop/koi-pond", destination: "/shop/koi-fish-serenity", permanent: true },
  { source: "/shop/starry-night-totoro", destination: "/shop/whimsical-starry-night", permanent: true },
  { source: "/shop/star-catcher", destination: "/shop/reach-for-the-stars", permanent: true },
  { source: "/shop/goose-in-the-grass", destination: "/shop/graceful-goose", permanent: true },
  { source: "/shop/canvas", destination: "/shop", permanent: false },
];

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: pagesBasePath || undefined,
        images: {
          loader: "custom" as const,
          loaderFile: "./lib/image-loader.ts",
        },
      }
    : {
        async redirects() {
          return redirects;
        },
      }),
};

export default nextConfig;
