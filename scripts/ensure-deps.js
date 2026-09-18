#!/usr/bin/env node
/**
 * scripts/ensure-deps.js
 * Ensures that @senkron/ai, @senkron/components, and @senkron/backend
 * build artifacts exist before building Next.js.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

const deps = [
  { name: '@senkron/ai', dir: path.join(rootDir, 'ai'), dist: path.join(rootDir, 'ai/dist/index.js') },
  { name: '@senkron/components', dir: path.join(rootDir, 'components'), dist: path.join(rootDir, 'components/dist/index.js') },
  { name: '@senkron/backend', dir: path.join(rootDir, 'backend'), dist: path.join(rootDir, 'backend/dist/services/quota.service.js') }
];

console.log('[Senkron Dependency Check] Checking workspace build artifacts...');

for (const dep of deps) {
  if (!fs.existsSync(dep.dist)) {
    console.log(`[Senkron Dependency Check] Building missing artifact for ${dep.name}...`);
    try {
      execSync('npm run build', { cwd: dep.dir, stdio: 'inherit' });
      console.log(`[Senkron Dependency Check] ✓ Built ${dep.name}`);
    } catch (err) {
      console.error(`[Senkron Dependency Check] ❌ Failed to build ${dep.name}:`, err.message);
      process.exit(1);
    }
  } else {
    console.log(`[Senkron Dependency Check] ✓ Found ${dep.name} dist artifact`);
  }
}

console.log('[Senkron Dependency Check] All workspace dependencies ready.');
