# 🚀 Senkron Production Deployment Guide

This guide explains how to build and deploy Senkron on a standard Linux VPS or server using pure **Node.js, npm workspaces, and process managers (PM2 / systemd)**.

---

## 🏗️ Architecture Overview

Senkron is a pure **npm workspace monorepo** consisting of:

| Package | Path | Role | Tech Stack |
| :--- | :--- | :--- | :--- |
| **`senkron-demo`** | [`demo/`](./demo) | Fullstack Web App, Feed, Video Editor, AI Composer | Next.js 14 (Standalone Mode), TailwindCSS |
| **`@senkron/backend`** | [`backend/`](./backend) | High-throughput API, Quota Guard, Server FFmpeg | Express, GraphQL (`graphql-http`), fluent-ffmpeg |
| **`@senkron/components`**| [`components/`](./components) | Drop-in WASM Video Editor & AI Modals | Lit (Web Components), `@ffmpeg/ffmpeg` WASM |
| **`@senkron/ai`** | [`ai/`](./ai) | Turkish Social LLM pipeline, SmartRouter, Moderation | TypeScript, Modal ASGI / Ollama client |

---

## ⚡ Local Development & Build

### 1. Install & Build
From the repository root:

```bash
# Install all workspace dependencies
npm install

# Build all packages in topological order (@senkron/ai -> @senkron/components -> @senkron/backend -> senkron-demo)
npm run build

# Or use the helper script:
./scripts/build.sh
```

### 2. Start Local Services
- **Start Web Demo (Port 3000):**
  ```bash
  npm start
  ```
- **Start Backend API (Port 4000):**
  ```bash
  npm run start:backend
  ```
- **Run automated test suites:**
  ```bash
  npm test
  ```

---

## 🖥️ Production VPS Deployment (Ubuntu / Debian)

### 1. Prerequisites on VPS
Install Node.js 20+, FFmpeg (for optional server-side fallback rendering), and PM2:

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs ffmpeg git

# Verify installation
node -v # v20.x.x
npm -v  # 10.x.x

# Install PM2 globally
sudo npm install -g pm2
```

### 2. Clone & Build
```bash
# Clone repository
git clone <your-repo-url> /opt/senkron
cd /opt/senkron

# Configure environment variables
cp .env.example .env.local

# Install dependencies and build
npm install
npm run build
```

### 3. Process Management with PM2
Run both the Web application and Backend API with automatic restarts and zero-downtime reloads:

```bash
# Start Next.js Web App (Port 3000)
pm2 start "npm start" --name "senkron-web"

# Start Backend API (Port 4000)
pm2 start "npm run start:backend" --name "senkron-backend"

# Persist processes across server reboots
pm2 save
pm2 startup
```

Useful PM2 commands:
```bash
pm2 status          # View status of running services
pm2 logs            # View live logs
pm2 restart all     # Restart all services
```

---

## 🌐 Alternative: systemd Service Configuration

If you prefer Linux `systemd` over PM2:

### 1. Create Web Service (`/etc/systemd/system/senkron-web.service`):
```ini
[Unit]
Description=Senkron Next.js Web Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/senkron
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

### 2. Create Backend Service (`/etc/systemd/system/senkron-backend.service`):
```ini
[Unit]
Description=Senkron Express & GraphQL Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/senkron
ExecStart=/usr/bin/npm run start:backend
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=4000

[Install]
WantedBy=multi-user.target
```

### 3. Enable & Start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now senkron-web
sudo systemctl enable --now senkron-backend
```

---

## 🔒 Nginx Reverse Proxy & SSL

Configure Nginx as a reverse proxy in front of Next.js and the Backend:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Next.js Web App & WebAssembly COOP/COEP headers
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Express / GraphQL Backend
    location /graphql {
        proxy_pass http://localhost:4000/graphql;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable SSL via Certbot:
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## ⚙️ Environment Variables Reference

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port for the Next.js Web application |
| `BACKEND_PORT` | `4000` | Port for the Express backend service |
| `BACKEND_URL` | `http://localhost:4000` | Backend API URL reachable by the web server |
| `MODAL_LLM_ENDPOINT` | `""` | Modal Serverless GPU ASGI endpoint for Llama-3.2-3B |
| `LOCAL_LLM_ENDPOINT` | `http://localhost:11434/v1/chat/completions` | Local Ollama/vLLM fallback endpoint |
