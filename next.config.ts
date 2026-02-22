import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // for Docker deployment
  images: {
    domains: ["7vina7cvpq.ufs.sh"],
  },
};

export default nextConfig;
