/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy /api/* to the Express backend — eliminates CORS completely
  // The browser calls /api/jobs → Next.js forwards to http://localhost:5005/api/jobs server-side
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5005/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
