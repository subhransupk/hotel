/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:3002', 'vercel.app']
    }
  },
  transpilePackages: ['@tremor/react', 'recharts'],
  images: {
    domains: ['dummyimage.com', 'placehold.co', 'vercel.app'],
    unoptimized: process.env.NODE_ENV === 'production',
  }
};

export default nextConfig; 