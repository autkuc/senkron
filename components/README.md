# Senkron Web Components (`components/`)

This directory contains standalone, reusable Web Components designed for easy integration into existing Next.js / React applications.

## Packages

- **`video-editor/`**: CapCut-like lightweight WASM FFmpeg video editor component (`<senkron-video-editor>`).
- **`post-generator/`**: Social media post generator component connected to AI endpoints (`<senkron-post-generator>`).

## Integration in Next.js

```tsx
import { useEffect } from 'react';

export default function EditorPage() {
  useEffect(() => {
    import('@senkron/components/video-editor');
  }, []);

  return <senkron-video-editor src="/sample.mp4" />;
}
```
