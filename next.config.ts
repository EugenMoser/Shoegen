import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // for Docker deployment
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "7vina7cvpq.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
