import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other config options here...

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
