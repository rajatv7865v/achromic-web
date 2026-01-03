import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com", 
      "source.unsplash.com",
      "localhost",
      "127.0.0.1",
      "api.test.sharkwaveinfo.com",
      "*.sharkwaveinfo.com",
      "achromicpoint.com",
      "res.cloudinary.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
      },
      {
        protocol: 'https',
        hostname: 'api.test.sharkwaveinfo.com',
      },
      {
        protocol: 'https',
        hostname: '*.sharkwaveinfo.com',
      },
      {
        protocol: 'https',
        hostname: 'achromicpoint.com',
      },
    ],
  },
};

export default nextConfig;
