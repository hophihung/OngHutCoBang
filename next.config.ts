import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Chấp nhận mọi tên miền HTTPS
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
