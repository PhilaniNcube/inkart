/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [

      {
        protocol: "https",
        hostname: "images-api.printify.com",

      },
      {
        protocol: "https",
        hostname: "hdhqxisqffmoqhpzmhet.supabase.co",

      },
      {
        protocol: "https",
        hostname: "images.printify.com",

      },
    ],
  }
};

module.exports = nextConfig
