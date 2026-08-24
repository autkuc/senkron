# Web Components Specification (`components/`)

## Overview

Senkron exports custom Web Components (Custom Elements) that can be imported and rendered inside Next.js / React applications or any standard web environment.

---

## 1. WASM FFmpeg Video Editor (`<senkron-video-editor>`)

### Tag Name
`<senkron-video-editor>` or React wrapper `<SenkronVideoEditor />`

### Attributes & Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `""` | Source URL or Blob URL of the video file to edit. |
| `aspect-ratio` | `"16:9" \| "9:16" \| "1:1" \| "4:5"` | `"16:9"` | Aspect ratio of the canvas preview & export. |
| `theme` | `"dark" \| "light"` | `"dark"` | UI theme. |
| `autoplay` | `boolean` | `false` | Autoplay preview on load. |

### Events

| Event Name | Detail Payload | Description |
| :--- | :--- | :--- |
| `senkron:ready` | `{ duration: number }` | Emitted when metadata and video stream are initialized. |
| `senkron:timeupdate` | `{ currentTime: number }` | Emitted during video playback / scrubbing. |
| `senkron:export-progress` | `{ percentage: number, stage: string, message?: string }` | Emitted during client WASM rendering. |
| `senkron:export-complete` | `{ outputBlobUrl: string, duration: number }` | Emitted upon successful MP4 / WebM generation. |
| `senkron:error` | `{ message: string, error?: unknown }` | Emitted on playback or rendering failures. |

---

## 2. Social Media Post Generator (`<senkron-post-generator>`)

### Tag Name
`<senkron-post-generator>` or React wrapper `<SenkronPostGenerator />`

### Attributes & Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `topic` | `string` | `""` | Content prompt or source keynotes for post generation. |
| `default-platform` | `"twitter" \| "linkedin" \| "instagram" \| "threads"` | `"twitter"` | Initial active social platform tab. |
| `default-tone` | `"viral" \| "professional" \| "educational" \| "casual" \| "witty"` | `"viral"` | Writing tone / style. |
| `api-url` | `string` | `""` | Backend REST endpoint for AI inference (optional). |
| `graphql-url` | `string` | `""` | Backend GraphQL endpoint (optional). |

### Events

| Event Name | Detail Payload | Description |
| :--- | :--- | :--- |
| `senkron:post-generated` | `{ platform: SocialPlatform, draft: PostDraft }` | Emitted when a new AI draft is generated. |
| `senkron:post-copied` | `{ platform: SocialPlatform, text: string }` | Emitted when a user copies the draft to clipboard. |
| `senkron:post-error` | `{ message: string }` | Emitted on generation failure. |
