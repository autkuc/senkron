# Senkron System Architecture

## High-Level Diagram

```
+-------------------------------------------------------------------+
|                        Next.js Demo Web App                       |
|                             (`demo/`)                             |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                  Web Components Package                   |   |
|   |                       (`components/`)                     |   |
|   |                                                           |   |
|   |  +---------------------------+ +-----------------------+  |   |
|   |  | Video Editor Web Comp     | | Post Generator Comp   |  |   |
|   |  | (CapCut-like, WASM FFmpeg)| | (LLM-driven UI)       |  |   |
|   |  +---------------------------+ +-----------------------+  |   |
|   +-----------------------------------------------------------+   |
+---------------------------------|---------------------------------+
                                  | REST / GraphQL
                                  v
+-------------------------------------------------------------------+
|                           Backend Engine                          |
|                             (`backend/`)                          |
|                                                                   |
|  +-----------------------+ +--------------------+ +------------+  |
|  | Routers & Controllers | | Rate Limiting      | | REST & GQL |  |
|  +-----------------------+ +--------------------+ +------------+  |
+---------------------------------|---------------------------------+
                                  | Internal Service Bus
                                  v
+-------------------------------------------------------------------+
|                             AI Engine                             |
|                               (`ai/`)                             |
|                                                                   |
|  +---------------------+ +------------------+ +----------------+  |
|  | LLM Provider Adapt. | | Prompt Templates | | Post Pipeline  |  |
|  +---------------------+ +------------------+ +----------------+  |
+-------------------------------------------------------------------+
```

## System Modules

1. **Frontend Web Components (`components/`)**:
   - Packaged as standalone Web Components for easy drop-in integration into any Next.js / React application.
   - Client-side video rendering powered by `@ffmpeg/ffmpeg` WebAssembly.
   - Interactive UI components for generating social media posts.

2. **Demo Application (`demo/`)**:
   - Isolated Next.js environment for showcasing component usage, reactivity, and performance testing.

3. **Backend Service (`backend/`)**:
   - Implements API routes, rate limiting, request validation, and dual REST + GraphQL API handlers.

4. **AI Core (`ai/`)**:
   - Contains model integrations, prompt templates, context orchestrators, and social media post generators.
