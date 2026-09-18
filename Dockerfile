# syntax=docker/dockerfile:1

# Stage 1: Base image
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json ./
COPY ai/package.json ./ai/
COPY components/package.json ./components/
COPY backend/package.json ./backend/
COPY demo/package.json ./demo/
COPY e2e/package.json ./e2e/

# Install workspace dependencies
RUN npm install

# Stage 3: Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/ai/node_modules ./ai/node_modules
COPY --from=deps /app/components/node_modules ./components/node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/demo/node_modules ./demo/node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Coordinated build in topological dependency order
RUN npm run build

# Stage 4: Production runner (minimal footprint)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/demo/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/demo/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/demo/public ./public

USER nextjs

EXPOSE 3000

# Next.js standalone entrypoint (handles both root & subpath outputs)
CMD ["sh", "-c", "if [ -f server.js ]; then node server.js; elif [ -f demo/server.js ]; then node demo/server.js; else npm run start -w senkron-demo; fi"]
