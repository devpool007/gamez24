import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.igdb.com",
        pathname: "/igdb/image/upload/t_cover_big/**",
      },
      {
        protocol: "https",
        hostname: "cdn1.epicgames.com",
        pathname: "/spt-assets/**"
      }
    ],
  },
};

export default nextConfig;
