import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    unoptimized: true,
    qualities: [5,10,15,20,25,30,75],
    domains: [
      "shared.fastly.steamstatic.com",
      "shared.akamai.steamstatic.com",
      "cdn.cludfare.steamstatic.com",
      "epic-backend-3dto.onrender.com",
      "127.0.0.1:8000"
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
