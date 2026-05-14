/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the frontend to call the local Express backend during dev
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
