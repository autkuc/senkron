/** @type {import('next').NextConfig} */
const isStandalone = process.env.BUILD_STANDALONE === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isStandalone ? { output: 'standalone' } : {}),
  transpilePackages: ['@senkron/components'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
