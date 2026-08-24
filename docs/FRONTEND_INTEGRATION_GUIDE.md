# Senkron Frontend Integration Guide

This guide details how to install, import, and integrate **Senkron Web Components** in Next.js (App Router / Pages Router) and pure React applications.

---

## 1. Installation

```bash
npm install @senkron/components
```

---

## 2. Next.js (App Router) Integration

### React Wrappers (Recommended)

Import the SSR-safe React wrappers from `@senkron/components/react`:

```tsx
'use client';

import { SenkronVideoEditor, SenkronPostGenerator } from '@senkron/components/react';

export default function VideoStudio() {
  return (
    <main className="min-h-screen p-8 bg-slate-950">
      <h1 className="text-2xl font-bold text-white mb-6">Video Studio</h1>

      <SenkronVideoEditor
        src="/assets/sample-video.mp4"
        aspectRatio="16:9"
        onExportComplete={(e) => {
          console.log('Exported Video URL:', e.detail.outputBlobUrl);
        }}
      />

      <div className="mt-8">
        <SenkronPostGenerator
          defaultPlatform="twitter"
          defaultTone="viral"
          onPostCopied={(e) => {
            alert(`Copied ${e.detail.platform} post!`);
          }}
        />
      </div>
    </main>
  );
}
```

---

## 3. WASM Header Configuration (`next.config.mjs`)

To enable multi-threaded WebAssembly performance for `@ffmpeg/ffmpeg`, add `SharedArrayBuffer` headers to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
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
```

---

## 4. Vanilla Custom Elements Integration

You can also import and use the custom elements directly without React:

```html
<script type="module">
  import '@senkron/components/video-editor';
  import '@senkron/components/post-generator';
</script>

<senkron-video-editor src="video.mp4" aspect-ratio="16:9"></senkron-video-editor>
<senkron-post-generator default-platform="linkedin"></senkron-post-generator>
```
