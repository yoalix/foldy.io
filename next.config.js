/** @type {import('next').NextConfig} */

const withSerwist = require("@serwist/next").default({
  // Your Serwist configuration
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  cacheOnFrontEndNav: true,
  // aggressiveFrontendCaching: true,
  reloadOnOnline: true,
  disable: false,
});

const nextConfig = {
  // pwa: {
  //   runtimeCaching: runtimeCaching.concat([
  //     {
  //       urlPattern: /\/_next\/image?url=.*$/i,
  //       handler: "StaleWhileRevalidate",
  //       options: {
  //         cacheName: "next-image",
  //         expiration: {
  //           maxEntries: 32,
  //           maxAgeSeconds: 24 * 60 * 60, // 24 hours
  //         },
  //       },
  //     },
  //   ]),
  // },
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

// module.exports = withSerwist(nextConfig);
module.exports = nextConfig;
