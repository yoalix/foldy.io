/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
