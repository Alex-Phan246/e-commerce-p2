/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'your-backend-url.vercel.app',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'your-backend-url.vercel.app',
        pathname: '/assets/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;