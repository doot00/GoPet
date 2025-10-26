import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['dyqqilhexbdksxumpfpu.supabase.co'],
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
