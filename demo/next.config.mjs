import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '..');

const isStandalone = process.env.BUILD_STANDALONE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable costly & brittle file tracing for standard/Deno deployments;
  // only trace when explicitly doing a standalone Docker build.
  outputFileTracing: isStandalone,
  ...(isStandalone ? { output: 'standalone' } : {}),
  transpilePackages: ['@senkron/components'],
  experimental: {
    outputFileTracingRoot: monorepoRoot,
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
