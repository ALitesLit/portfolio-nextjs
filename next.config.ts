import type { NextConfig } from 'next';
import path from 'path';


const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  sassOptions: {
    prependData: `@import "@/shared/colors.scss";`
  },
  devIndicators: false,
};

export default nextConfig;
