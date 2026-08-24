# NSosyal Frontend Integration Guide

This guide describes how to integrate **Senkron Web Components** directly into **[nsosyal.com](https://nsosyal.com)**.

---

## 1. Package Installation

```bash
npm install @senkron/components
```

---

## 2. Drop-in React Modal Components

In your post composer or feed component (e.g. `CreateToot.tsx` / `PostEditor.tsx`):

```tsx
'use client';

import React, { useState } from 'react';
import {
  SenkronVideoEditorModal,
  SenkronPostGeneratorModal,
} from '@senkron/components/react';
import type { VideoAttachedDetail, PostAppliedDetail } from '@senkron/components';

export function NSosyalPostEditor() {
  const [postText, setPostText] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [attachedVideo, setAttachedVideo] = useState<VideoAttachedDetail | null>(null);

  return (
    <div className="post-composer">
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Aklında ne var?"
      />

      {/* Action Bar */}
      <div className="flex gap-2">
        {/* Trigger Video Editor Modal */}
        <button type="button" onClick={() => setIsVideoModalOpen(true)}>
          🎬 Video Düzenle
        </button>

        {/* Trigger AI Assistant Modal */}
        <button type="button" onClick={() => setIsAiModalOpen(true)}>
          ✨ AI Yazarı
        </button>
      </div>

      {/* Video Editor Modal Component */}
      <SenkronVideoEditorModal
        isOpen={isVideoModalOpen}
        src="/path-to-uploaded-video.mp4"
        onClose={() => setIsVideoModalOpen(false)}
        onVideoAttached={(detail) => {
          setAttachedVideo(detail);
          setIsVideoModalOpen(false);
        }}
      />

      {/* AI Post Generator Modal Component */}
      <SenkronPostGeneratorModal
        isOpen={isAiModalOpen}
        defaultPlatform="nsosyal"
        defaultTone="viral"
        topic={postText}
        onClose={() => setIsAiModalOpen(false)}
        onPostApplied={(detail) => {
          setPostText(detail.fullText);
          setIsAiModalOpen(false);
        }}
      />
    </div>
  );
}
```

---

## 3. Vanilla Web Component Integration

For non-React frameworks or raw HTML/Web Components:

```html
<script type="module">
  import '@senkron/components/video-editor';
  import '@senkron/components/post-generator';
</script>

<!-- Open via attribute or JavaScript: el.openModal() -->
<senkron-video-editor-modal id="videoModal" src="video.mp4"></senkron-video-editor-modal>
<senkron-post-generator-modal id="aiModal" default-platform="nsosyal"></senkron-post-generator-modal>

<script>
  const videoModal = document.getElementById('videoModal');
  videoModal.addEventListener('senkron:video-attached', (e) => {
    console.log('Attached Video URL:', e.detail.videoUrl);
  });

  const aiModal = document.getElementById('aiModal');
  aiModal.addEventListener('senkron:post-applied', (e) => {
    console.log('Applied Text:', e.detail.fullText);
  });
</script>
```

---

## 4. Design & Token Matching
- **Gradient Accents**: `linear-gradient(90deg, #07d0e0 0%, #324bff 100%)`
- **Backdrop Blur**: `backdrop-filter: blur(12px)`
- **Theme**: Automatic dark theme aligned with NSosyal `#080c14` / `#0e1524`.
