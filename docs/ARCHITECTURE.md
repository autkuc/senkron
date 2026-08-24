# System Architecture

## Component Overview

```
+-------------------------------------------------------------------+
|                        Client Application                         |
|                   (React / Next.js / Lit Web)                     |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                  @senkron/components                      |   |
|   |                                                           |   |
|   |  +---------------------------+ +-----------------------+  |   |
|   |  | <senkron-video-editor>    | | <senkron-post-gen>    |  |   |
|   |  | (Client WASM FFmpeg)      | | (NSosyal Post Modal)  |  |   |
|   |  +---------------------------+ +-----------------------+  |   |
|   +-----------------------------------------------------------+   |
+---------------------------------|---------------------------------+
                                  | REST / GraphQL
                                  v
+-------------------------------------------------------------------+
|                         @senkron/backend                          |
|                                                                   |
|  +-----------------------+ +--------------------+ +------------+  |
|  | Decision Router       | | Tiered Rate Limit  | | Transcoder |  |
|  +-----------------------+ +--------------------+ +------------+  |
+---------------------------------|---------------------------------+
                                  | Internal Service Bus
                                  v
+-------------------------------------------------------------------+
|                           @senkron/ai                             |
|                                                                   |
|  +---------------------+ +------------------+ +----------------+  |
|  | Smart Concurrency Q | | Moderation Guard | | Post Pipeline  |  |
|  +---------------------+ +------------------+ +----------------+  |
+-------------------------------------------------------------------+
```

## Subsystems

### 1. Client Layer (`@senkron/components`)
- Independent Custom Elements built with Lit.
- In-browser video decoding, frame trimming, aspect ratio cropping, and H.264 export using `@ffmpeg/ffmpeg` WebAssembly.
- Emits standard DOM events (`senkron:ready`, `senkron:export-progress`, `senkron:export-complete`, `senkron:error`).

### 2. Backend Orchestrator (`@senkron/backend`)
- Evaluates file size and hardware heuristics to assign video workloads:
  - `< 50MB`: Assigned to `client_wasm` execution.
  - `> 50MB`: Dispatched to server native FFmpeg transcode queue (`server_native`).
- Enforces sliding-window rate limiting per IP / user token with tiered quotas.
- Rejects unauthenticated guest traffic at the middleware boundary.

### 3. Inference & Guardrail Engine (`@senkron/ai`)
- Double-pass input filtering (regex injection signatures + token classification for Turkish/English content).
- Multi-candidate post generator with entropy and virality ranking.
- Concurrency-aware router dispatching to local Ollama endpoints or cloud Modal GPU instances with automatic fallback.
