/** @type {import('next').NextConfig} */

const withSerwist = require("@serwist/next").default({
  // Your Serwist configuration
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  cacheOnFrontEndNav: true,
  // aggressiveFrontendCaching: true,
  reloadOnOnline: true,
  disable: false,
  // swcMinify: true,
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zglcjoxblestgaflcibi.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = withSerwist(nextConfig);
