/** @type {import('next').NextConfig} */
const nextConfig  = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-api.printify.com",
        port: "",
        pathname: "/v1/**",
      },
      {
        protocol: "https",
        hostname: "hdhqxisqffmoqhpzmhet.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images/**",
      },
      {
        protocol: "https",
        hostname: "images.printify.com",
        port: "",
        pathname: "/v1/**",
      },
    ],
  } 
};

module.exports = nextConfig
