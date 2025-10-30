/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e-commerce-p2.vercel.app',
        pathname: '/images/**',
      },
      {
        protocol: 'https', 
        hostname: 'e-commerce-p2.vercel.app',
        pathname: '/assets/**',
      },
      // Giữ localhost cho development
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
    ],
  },
};

export default nextConfig;
