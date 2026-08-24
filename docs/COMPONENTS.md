# Web Components API Reference

## 1. Video Editor (`<senkron-video-editor>`)

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `""` | Video URL or object URL. |
| `aspect-ratio` | `"16:9" \| "9:16" \| "1:1" \| "4:5"` | `"16:9"` | Aspect ratio for preview and export. |
| `theme` | `"dark" \| "light"` | `"dark"` | Visual theme. |

### Events
| Event | Detail | Description |
| :--- | :--- | :--- |
| `senkron:ready` | `{ duration: number }` | Video metadata loaded. |
| `senkron:timeupdate` | `{ currentTime: number }` | Playhead position changed. |
| `senkron:export-progress` | `{ percentage: number, stage: string }` | Transcoding progress. |
| `senkron:export-complete` | `{ outputBlobUrl: string, duration: number }` | Render completed. |
| `senkron:error` | `{ message: string }` | Execution failure. |

---

## 2. Post Generator (`<senkron-post-generator>`)

### Properties
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `topic` | `string` | `""` | Initial prompt text. |
| `default-tone` | `"viral" \| "professional" \| "educational" \| "casual" \| "witty"` | `"viral"` | Initial tone selection. |
| `api-url` | `string` | `"/api/ai/generate"` | Inference backend endpoint. |

### Events
| Event | Detail | Description |
| :--- | :--- | :--- |
| `senkron:post-generated` | `{ content: string, hashtags: string[] }` | Candidates received from backend. |
| `senkron:post-applied` | `{ content: string, hashtags: string[] }` | User selected draft to apply. |
| `senkron:post-error` | `{ message: string }` | Generation failed. |

---

## 3. Modal Wrappers

- `<senkron-video-editor-modal>`: Drop-in modal container with backdrop, header, and attach actions.
- `<senkron-post-generator-modal>`: Drop-in modal container for NSosyal post drafting.
- React bindings available under `@senkron/components/react`.
