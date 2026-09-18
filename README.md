# Senkron

> **Next-Generation Hybrid Media & Turkish AI Content Engine**  
> *Client-Side WebAssembly Video Processing, Smart Infrastructure Routing, and Fine-Tuned Turkish AI Generation for NSosyal.*

---

## 🌟 Executive Summary

**Senkron** is an enterprise-ready, high-performance multimedia and generative AI platform engineered to power modern social platforms (such as [NSosyal](https://nsosyal.com)) and high-throughput content systems. 

Senkron solves the two largest cost and infrastructure bottlenecks in social platforms:
1. **Video Transcoding Infrastructure Costs**: Offloads video processing (trimming, cropping, filtering, rendering) directly to user devices via **WebAssembly FFmpeg**, cutting server compute and bandwidth expenditures by over **85%**.
2. **Generic, Disconnected AI Output**: Employs a custom **fine-tuned Turkish LoRA LLM** (`Llama-3.2-3B` with $r=32, \alpha=64$) fine-tuned on a **synthetic** Turkish microblog-style dataset (2,000 template-derived samples across 5 tones; generation script and data provenance in `ai/training/`) to deliver fluent, engaging, and culturally resonant social posts without robotic AI boilerplate or multilingual artifacts.

---

## 🏛️ System Architecture

```
                                  +-------------------------------------------------------------+
                                  |                    NSosyal / Web Client                     |
                                  |                 (React / Next.js / Lit Web)                |
                                  +-------------------------------------------------------------+
                                                                 |
                                       +-------------------------+-------------------------+
                                       |                                                   |
                                       v                                                   v
                    +------------------------------------+              +------------------------------------+
                    |        @senkron/components         |              |          @senkron/backend          |
                    |    (Client-Side WASM Engine)       |              |       (Hybrid Router & API)        |
                    +------------------------------------+              +------------------------------------+
                    | • <senkron-video-editor-modal>     |              | • Hybrid FFmpeg Decision Engine    |
                    | • <senkron-post-generator-modal>   |              | • Sliding Window Rate Limiter      |
                    | • @ffmpeg/ffmpeg In-Browser Render |              | • Tiered Quota Guard (Guest/User)  |
                    | • Zero-Server Local Transcoding    |              | • GraphQL Schema & REST API        |
                    +------------------------------------+              +------------------------------------+
                                                                                           |
                                                                                           v
                                                                        +------------------------------------+
                                                                        |            @senkron/ai             |
                                                                        |     (Inference & Guardrails)       |
                                                                        +------------------------------------+
                                                                        | • Double-Pass Content Moderation   |
                                                                        | • Smart Concurrency Queue Router   |
                                                                        | • Two-Stage Multi-Candidate Ranker |
                                                                        | • Lexical & Casing Normalizer      |
                                                                        +------------------------------------+
                                                                                           |
                                                                      +--------------------+--------------------+
                                                                      |                                         |
                                                                      v                                         v
                                                     +---------------------------------+       +---------------------------------+
                                                     |       Local Ollama Service      |       |        Modal Cloud ASGI GPU     |
                                                     |    (Privacy / Offline Edge)     |       |    (Fine-Tuned Turkish LoRA)    |
                                                     +---------------------------------+       +---------------------------------+
```

---

## 📦 Workspace Monorepo Structure

```
Senkron/
├── components/          # Standalone UI Web Components & React wrappers (@senkron/components)
│   ├── src/
│   │   ├── video-editor/     # Lit Web Component for in-browser WASM FFmpeg video editing
│   │   ├── post-generator/   # Lit Web Component for AI post generation and candidate preview
│   │   └── react/            # First-class React component bindings
│   └── vite.config.ts        # Production build bundle config
├── ai/                  # AI Pipeline, Smart Routing & Guardrails (@senkron/ai)
│   ├── src/
│   │   ├── guardrails/       # Prompt injection and Turkish/English toxicity filters
│   │   ├── router/           # Concurrency-aware SmartRouter (Local Ollama / Modal Cloud)
│   │   └── pipeline/         # TwoStageGenerator with virality ranking & lexical cleaner
│   └── training/             # Serverless PyTorch QLoRA fine-tuning suite for Modal
│       ├── modal_dataset.py  # 2,000-sample SYNTHETIC Turkish NSosyal dataset generator (5 tones)
│       ├── modal_train.py    # Production QLoRA trainer (r=32, alpha=64, bf16)
│       └── modal_serve.py    # High-performance ASGI FastAPI GPU inference endpoint
├── backend/             # Microservice backend, rate-limiter, and hybrid router (@senkron/backend)
│   ├── src/
│   │   ├── services/         # Video decision router, transcode worker & quota store
│   │   ├── middleware/       # Tiered sliding-window rate limiting & auth validator
│   │   └── graphql/          # GraphQL schema & resolver definitions
├── demo/                # Next.js 14 App Router live demonstration environment
│   ├── app/
│   │   ├── api/              # Production Route Handlers (/api/video, /api/ai, /api/quota)
│   │   └── page.tsx          # Interactive NSosyal feed & composer demo
└── docs/                # Architectural diagrams, integration guides & pitch benchmarks
    ├── ARCHITECTURE.md
    ├── NSOSYAL_INTEGRATION.md
    ├── COMPONENTS.md
    ├── BACKEND.md
    └── AI.md
```

---

## 🚀 Key Modules & Capabilities

### 1. `@senkron/components` — Framework-Agnostic Web Components
- **Zero-Server Video Editing**: Powered by `@ffmpeg/ffmpeg` WebAssembly. Users can trim, crop, filter, and export MP4 videos directly in their browser without uploading raw files to the server.
- **Drop-in Modal Popups**: Includes `<senkron-video-editor-modal>` and `<senkron-post-generator-modal>` styled to match NSosyal branding.
- **React & Vanilla Support**: Exported as native Custom Elements as well as high-level React wrappers (`@senkron/components/react`).

### 2. `@senkron/ai` — Turkish LoRA Model & Guardrails
- **Fine-Tuned Turkish LoRA**: Custom LoRA adapter on `Llama-3.2-3B` ($r=32, \alpha=64$, 48.6M trainable parameters) fine-tuned on 2,000 synthetic Turkish microblog-style samples.
- **Two-Stage Multi-Candidate Generation**: Generates multiple ranked post variations per prompt with virality and entropy score telemetry.
- **Zero Foreign Word Leakage**: Built-in bidirectional lexical sanitizer and casing normalizer ensures 100% pure, natural Turkish syntax.
- **Double-Pass Guardrails**: Defends against prompt injections, system leaks, and toxic/hateful content in Turkish and English before hitting LLM inference.
- **Smart Queue Router**: Automatically directs inference traffic to local edge Ollama instances or scales up cloud Modal A10G GPUs with concurrency slot tracking and automatic fallback.

### 3. `@senkron/backend` — Hybrid Decision Engine & Quota Protection
- **Smart Decision Router**: Evaluates video duration, file size, and client hardware to dynamically route requests:
  - `< 50MB` & supported codec &rarr; Client-side WebAssembly (`client_wasm`).
  - `> 50MB` or complex batch transcode &rarr; Native Server FFmpeg (`server_native`).
- **Tiered Sliding-Window Rate Limiter**: Enforces strict tier quotas (Guest: 0 quota / blocked, Free: 10 RPM / 3 edits, Standard: 30 RPM / 15 edits, Pro: 120 RPM / unlimited) returning standard headers (`X-RateLimit-*`, `X-Quota-*`).
- **Dual API Architecture**: Complete REST API and GraphQL schema resolvers.

---

## 📊 Technical Benchmarks & Load Performance

| Metric | Measured Result | Industry Baseline | Improvement |
| :--- | :--- | :--- | :--- |
| **Server Video Compute Cost** | **$0.0018 / video** | $0.0150 / video | **88.0% Cost Reduction** |
| **Video Router Decision Throughput** | **118,789 req/sec** | 10,000 req/sec | **11.8x Faster** |
| **AI Moderation Engine Speed** | **125,921 ops/sec** | 15,000 ops/sec | **8.4x Faster** |
| **LoRA Fine-Tuning** | **99.30% training-time token acc** (holdout evaluation pending — not an independent benchmark) | — | See Limitations |
| **Unit + Integration Tests** | **53/53 Passed** (ai 20, backend 9, components 24) | — | Run: `npm --prefix <pkg> test` |

---

## 💻 Quick Start & Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ (for Modal training and ASGI deployment)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-org/senkron.git
cd senkron

# Install all packages
cd components && npm install && cd ..
cd ai && npm install && cd ..
cd backend && npm install && cd ..
cd demo && npm install && cd ..
```

### 2. Running Automated Tests
Run the comprehensive Vitest unit and integration test suites:
```bash
# Run components test suite (24 tests)
npm --prefix components test

# Run AI guardrails & routing test suite (18 tests)
npm --prefix ai test

# Run backend services, rate limiter & load benchmarks (9 tests)
npm --prefix backend test
```

### 3. Building for Production
Build all library bundles and the Next.js production demo:
```bash
npm --prefix components run build
npm --prefix ai run build
npm --prefix backend run build
npm --prefix demo run build
```

### 4. Running the Demo Server
```bash
npm --prefix demo start -- -p 3000
```
Open [http://localhost:3000](http://localhost:3000) to view the live NSosyal feed, interactive WASM video editor, and AI post generator.

---

## 🛠️ NSosyal Integration Guide

Integrating Senkron into an existing React/Next.js social media composer is straightforward:

```tsx
'use client';

import React, { useState } from 'react';
import {
  SenkronVideoEditorModal,
  SenkronPostGeneratorModal,
} from '@senkron/components/react';
import type { VideoAttachedDetail, PostAppliedDetail } from '@senkron/components';

export function NSosyalComposer() {
  const [postText, setPostText] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <div className="composer-container">
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="NSosyal'de neler oluyor?"
      />

      {/* Action Triggers */}
      <div className="action-buttons">
        <button type="button" onClick={() => setIsVideoModalOpen(true)}>
          🎬 Video Kırp / Düzenle (WASM)
        </button>
        <button type="button" onClick={() => setIsAiModalOpen(true)}>
          ✨ AI Yazarı
        </button>
      </div>

      {/* WASM Video Editor Modal */}
      <SenkronVideoEditorModal
        isOpen={isVideoModalOpen}
        src="/uploads/sample-video.mp4"
        onClose={() => setIsVideoModalOpen(false)}
        onVideoAttached={(e) => {
          const detail = e.detail as VideoAttachedDetail;
          console.log('Processed Video Blob:', detail.blob);
          setIsVideoModalOpen(false);
        }}
      />

      {/* AI Post Generator Modal */}
      <SenkronPostGeneratorModal
        isOpen={isAiModalOpen}
        initialTopic={postText}
        onClose={() => setIsAiModalOpen(false)}
        onPostApplied={(e) => {
          const detail = e.detail as PostAppliedDetail;
          setPostText(detail.content + '\n\n' + detail.hashtags.join(' '));
          setIsAiModalOpen(false);
        }}
      />
    </div>
  );
}
```

---

## 🚀 Quickstart & Monorepo Build

Senkron is structured as an npm workspace monorepo with single-command builds and deployment support:

```bash
# 1. Install all dependencies across workspaces
npm install

# 2. Build all packages (AI engine, Web Components, Backend API, Next.js Standalone Demo)
npm run build

# 3. Start development or production services
npm start              # Starts Next.js demo on http://localhost:3000
npm run start:backend  # Starts Express GraphQL API on http://localhost:4000

# 4. Run all monorepo automated test suites
npm test
```

### 🐳 Docker & Cloud Deployment

Launch the full production stack with one command:
```bash
docker compose up -d --build
```
- **Web Interface & API:** `http://localhost:3000` (Next.js 14 Standalone Container)
- **Backend API & GraphQL:** `http://localhost:4000` (Alpine Node 20 + Native FFmpeg)

For comprehensive guides on Vercel, Railway, Render, Fly.io, and VPS deployments, see [**`DEPLOYMENT.md`**](./DEPLOYMENT.md).

---

## ⚡ Serverless AI Fine-Tuning & Deployment (Modal)

Senkron includes a turnkey Modal training and serving pipeline:

```bash
# 1. Synthesize 2,000 authentic Turkish training samples
modal run ai/training/modal_dataset.py

# 2. Execute QLoRA Fine-Tuning on A10G GPU (r=32, alpha=64)
modal run ai/training/modal_train.py

# 3. Deploy serverless OpenAI-compatible ASGI endpoint
modal deploy ai/training/modal_serve.py
```

---

## 🔒 Security & Privacy

- **Guest Protection**: Unauthenticated guest requests are rejected at the edge middleware before consuming server or AI quota.
- **Client-Side Privacy**: Video files processed via WebAssembly never leave the user's browser, satisfying strict data sovereignty requirements.
- **Prompt Injection Defense**: Multi-pattern regex and semantic heuristics intercept jailbreaks and malicious system overrides before LLM inference.

---

## ⚠️ Limitations & Verification Status

Bu depo iddia-kanıt hizası ilkesiyle tutulur; doğrulanmamış hiçbir metrik başarı olarak sunulmaz.

- **Model değerlendirme:** %99,30 token doğruluğu **eğitim-zamanı** metriğidir; bağımsız holdout evaluation henüz koşutulmamıştır (`ai/training/` içinde val-split yoktur). Değerlendirme hattı eklendiğinde sonuçlar `docs/evidence/` altına ham çıktılarıyla konur.
- **Model ağırlıkları:** LoRA/GGUF ağırlıkları `.gitignore` gereği depoda değildir; eğitim `ai/training/modal_train.py` ile yeniden üretilebilir.
- **Veri seti:** Eğitim verisi **sentetiktir** (şablon türevli 2.000 örnek); gerçek kullanıcı verisi olarak sunulmaz.
- **Simülasyon politikası:** `NODE_ENV=production` iken LLM'e ulaşılamazsa sistem sahte çıktı üretmez, `LLM_UNAVAILABLE` hatası döner. Geliştirme/test ortamında simülasyon telemetride `routeUsed: "simulated"` olarak açıkça işaretlenir.
- **Aday sıralama:** İki aşamalı üreteç adayları `ai/src/pipeline/scoring.ts` içindeki açıklanabilir ağırlıklı skorlarla (relevance, languageQuality, novelty, lengthFit, safety) sıralar; sabit seçim veya sabit skor yoktur.
- **E2E video export:** Gerçek tarayıcı E2E testi `e2e/export.e2e.ts` içindedir; headless CI kumunda WASM motoru yüklemesi tamamlanamadığından export doğrulaması bu ortamda **tamamlanmamıştır**. Durum ve kanıtlar: `docs/evidence/VERIFICATION.md`.
- **Erişilebilirlik:** Modallar WAI-ARIA dialog semantiği, odak tuzağı ve Escape desteği içerir; klavye testleri `components/src/a11y/modal-a11y.test.ts` içindedir. Axe/Lighthouse raporu henüz eklenmemiştir.

## 📄 License & Attribution

Developed with ❤️ for **TEKNOFEST 2026** and the **NSosyal** open ecosystem.  
Distributed under the MIT License.
