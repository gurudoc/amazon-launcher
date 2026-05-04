import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/amazon-launcher",
};

export default nextConfig;
