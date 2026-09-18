import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deno Deploy and Docker require standalone output mode
  output: 'standalone',
  transpilePackages: ['@senkron/components'],
  experimental: {
    // Bound monorepo root to project root
    outputFileTracingRoot: monorepoRoot,
    // Exclude heavy binary assets & non-code files from trace analysis
    outputFileTracingExcludes: {
      '*': [
        '**/@ffmpeg/core/**',
        '**/@ffmpeg/core-mt/**',
        '**/.git/**',
        '**/.venv/**',
        '**/docs/**',
        '**/*.docx',
        '**/*.pdf',
      ],
    },
  },
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
