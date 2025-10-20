import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // 동적 라우팅을 위해 제거
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;

