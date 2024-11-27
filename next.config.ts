import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        API_URL: 'https://todo-spring-api-production.up.railway.app/api',
    }
};

export default nextConfig;
