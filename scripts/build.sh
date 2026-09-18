#!/usr/bin/env bash
set -e

echo "=========================================="
echo "   Senkron Production Build Pipeline      "
echo "=========================================="

# Check Node.js
NODE_VERSION=$(node -v 2>/dev/null || true)
if [ -z "$NODE_VERSION" ]; then
  echo "❌ Error: Node.js is not installed."
  exit 1
fi
echo "✓ Node.js version: $NODE_VERSION"

# Check workspace dependencies
if [ ! -d "demo/node_modules" ] || [ ! -d "ai/node_modules" ] || [ ! -d "components/node_modules" ]; then
  echo "--> Installing dependencies via npm workspaces..."
  npm install --prefer-offline --no-audit --no-fund
else
  echo "✓ Workspace dependencies already present, proceeding directly to build."
fi

# 1. Build AI engine
echo "--> [1/4] Building @senkron/ai..."
npm run build:ai

# 2. Build Web Components
echo "--> [2/4] Building @senkron/components..."
npm run build:components

# 3. Build Backend API
echo "--> [3/4] Building @senkron/backend..."
npm run build:backend

# 4. Build Demo Web Application (Next.js Standalone)
echo "--> [4/4] Building senkron-demo..."
npm run build:demo

echo ""
echo "=========================================="
echo "   Build completed successfully!          "
echo "=========================================="
echo "• Start Web:     npm start"
echo "• Start Backend: npm run start:backend"
echo "• Production:    pm2 start \"npm start\" --name senkron-web"
echo "=========================================="
