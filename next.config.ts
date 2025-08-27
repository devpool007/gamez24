import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "shared.fastly.steamstatic.com",
      "shared.akamai.steamstatic.com",
      "cdn.cludfare.steamstatic.com"
      // add any other domains you need
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.igdb.com",
        pathname: "/igdb/image/upload/t_cover_big/**",
      },
      {
        protocol: "https",
        hostname: "cdn1.epicgames.com",
        pathname: "/**",
      },
      {
             
        protocol: 'https',
        hostname: '*.gog-statics.com',
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
