/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  api: {
    bodyParser: {
      sizeLimit: '200mb',
    },
  },
};

module.exports = nextConfig;
