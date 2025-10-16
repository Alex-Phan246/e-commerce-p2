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
        hostname: 'your-backend-url.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'your-backend-url.com',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;