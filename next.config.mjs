/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/i, use: ['@svgr/webpack'] });
    return config;
  },
  reactStrictMode: false,
  rewrites: async ()  => ({
    beforeFiles: [{
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API}/:path*`,
    }],
  })
};

export default nextConfig;
