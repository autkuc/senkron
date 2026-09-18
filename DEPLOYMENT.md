# 🚀 Senkron Deployment & Build Guide

This document explains how to build, containerize, and deploy the Senkron platform across various environments.

---

## 🏗️ Architecture Overview

The Senkron repository is an **npm workspace monorepo** consisting of:

| Package | Path | Role | Tech Stack |
| :--- | :--- | :--- | :--- |
| **`senkron-demo`** | [`demo/`](./demo) | Fullstack Web App, Feed, Video Editor, AI Composer | Next.js 14 (Standalone Mode), TailwindCSS |
| **`@senkron/backend`** | [`backend/`](./backend) | High-throughput API, Quota Guard, Server FFmpeg | Express, GraphQL (`graphql-http`), fluent-ffmpeg |
| **`@senkron/components`**| [`components/`](./components) | Drop-in WASM Video Editor & AI Modals | Lit (Web Components), `@ffmpeg/ffmpeg` WASM |
| **`@senkron/ai`** | [`ai/`](./ai) | Turkish Social LLM pipeline, SmartRouter, Moderation | TypeScript, Modal ASGI / Ollama client |

---

## ⚡ Option 1: 1-Command Local Build & Run

### 1. Build Everything
From the repository root, install dependencies and build all packages in topological order:

```bash
# Using npm workspaces
npm install
npm run build

# Or use the helper script
./scripts/build.sh
```

### 2. Start Services
- **Start Web Demo (Port 3000):**
  ```bash
  npm start
  ```
- **Start Backend API (Port 4000):**
  ```bash
  npm run start:backend
  ```
- **Run all automated tests:**
  ```bash
  npm test
  ```

---

## 🐳 Option 2: Docker & Docker Compose (Recommended for Production)

Senkron includes multi-stage, production-hardened Dockerfiles with **Next.js Standalone** bundling and non-root execution.

### Single-Command Stack Deployment:
```bash
docker compose up -d --build
```

This starts:
- **`senkron-web`** at `http://localhost:3000` (Next.js 14 standalone container, ~120MB image size)
- **`senkron-backend`** at `http://localhost:4000` (Express + GraphQL + native Alpine `ffmpeg`)

To stop:
```bash
docker compose down
```

### Building & Running Standalone Docker Container:
```bash
# Build Web Image
docker build -t senkron-web:latest -f Dockerfile .

# Run Web Image
docker run -p 3000:3000 -e NODE_ENV=production senkron-web:latest
```

---

## ▲ Option 3: Vercel (1-Click Deployment)

The repository includes [`vercel.json`](./vercel.json) pre-configured with root monorepo build commands.

1. Connect your GitHub repository to Vercel.
2. Ensure the Framework Preset is set to **Next.js**.
3. Vercel will automatically read `vercel.json`:
   - **Build Command:** `npm run build`
   - **Output Directory:** `demo/.next`
4. Configure environment variables (e.g. `MODAL_LLM_ENDPOINT`) in the Vercel Dashboard under **Project Settings > Environment Variables**.

---

## ☁️ Option 4: Cloud PaaS (Railway, Render, Fly.io, Cloud Run)

All standard cloud platforms can deploy Senkron directly using the root [`Dockerfile`](./Dockerfile):

- **Railway / Render:**
  - Create a new Web Service pointing to your repository.
  - Set Build Type to **Dockerfile**.
  - Railway / Render automatically detects the root multi-stage Dockerfile and exposes Port 3000.
- **Fly.io:**
  ```bash
  fly launch --dockerfile Dockerfile
  fly deploy
  ```
- **Google Cloud Run:**
  ```bash
  gcloud builds submit --tag gcr.io/[PROJECT-ID]/senkron-web
  gcloud run deploy senkron-web --image gcr.io/[PROJECT-ID]/senkron-web --port 3000 --allow-unauthenticated
  ```

---

## 🖥️ Option 5: Self-Hosted Linux VPS (Ubuntu / Debian with PM2)

For hosting on a bare-metal VPS or Cloud VM:

### 1. Setup Node.js & PM2:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs ffmpeg
sudo npm install -g pm2
```

### 2. Clone & Build:
```bash
git clone <your-repo-url> /opt/senkron
cd /opt/senkron
npm install
npm run build
```

### 3. Start with PM2:
```bash
# Start Next.js Web App
pm2 start "npm start" --name "senkron-web"

# Start Backend Service
pm2 start "npm run start:backend" --name "senkron-backend"

# Save PM2 process list across reboots
pm2 save
pm2 startup
```

### 4. Nginx Reverse Proxy Configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /graphql {
        proxy_pass http://localhost:4000/graphql;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## ⚙️ Environment Variables Reference

Copy `.env.example` to `.env.local` or provide these variables in your deployment platform:

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port for the Next.js Web application |
| `BACKEND_PORT` | `4000` | Port for the Express backend service |
| `BACKEND_URL` | `http://localhost:4000` | Backend API URL reachable by the web server |
| `MODAL_LLM_ENDPOINT` | `""` | Modal Serverless GPU ASGI endpoint for Llama-3.2-3B |
| `LOCAL_LLM_ENDPOINT` | `http://localhost:11434/v1/chat/completions` | Local Ollama/vLLM fallback endpoint |
