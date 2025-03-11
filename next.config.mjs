/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:3002']
    }
  },
  transpilePackages: ['@tremor/react', 'recharts'],
  images: {
    domains: ['dummyimage.com', 'placehold.co'],
  }
};

export default nextConfig; 