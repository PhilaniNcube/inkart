/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images-api.printify.com",
      "hdhqxisqffmoqhpzmhet.supabase.co",
      "images.printify.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
