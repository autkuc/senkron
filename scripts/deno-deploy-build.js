#!/usr/bin/env node
/**
 * scripts/deno-deploy-build.js
 * Builds Senkron for Deno Deploy with the Next.js preset.
 * Handles monorepo compilation, dependency ordering, and
 * root artifact synchronization for jsr:@deno/nextjs-start.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const demoDir = path.join(rootDir, 'demo');

console.log('==============================================');
console.log('   Senkron Deno Deploy Build Pipeline         ');
console.log('==============================================');

// 1. Ensure all upstream workspace dependencies are built
console.log('--> [1/4] Ensuring workspace packages are built...');
require('./ensure-deps.js');

// 2. Build Next.js
console.log('--> [2/4] Compiling Next.js application...');
try {
  // Use npx next build inside demoDir
  execSync('npx next build', {
    cwd: demoDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_TELEMETRY_DISABLED: '1'
    }
  });
} catch (err) {
  console.error('❌ Failed to compile Next.js application:', err.message);
  process.exit(1);
}

// 3. Synchronize .next and public to repository root for jsr:@deno/nextjs-start
console.log('--> [3/4] Synchronizing build artifacts to root for Deno Deploy...');
const demoNextDir = path.join(demoDir, '.next');
const rootNextDir = path.join(rootDir, '.next');
const demoPublicDir = path.join(demoDir, 'public');
const rootPublicDir = path.join(rootDir, 'public');

if (fs.existsSync(demoNextDir)) {
  if (fs.existsSync(rootNextDir)) {
    fs.rmSync(rootNextDir, { recursive: true, force: true });
  }
  fs.cpSync(demoNextDir, rootNextDir, { recursive: true });
  console.log('✓ Synchronized .next directory to root');
}

if (fs.existsSync(demoPublicDir)) {
  if (fs.existsSync(rootPublicDir)) {
    fs.rmSync(rootPublicDir, { recursive: true, force: true });
  }
  fs.cpSync(demoPublicDir, rootPublicDir, { recursive: true });
  console.log('✓ Synchronized public directory to root');
}

// 4. Clean up any invalid standalone package.json that breaks Deno Deploy parser
const badStandalonePkg = path.join(rootNextDir, 'standalone', '.next', 'package.json');
if (fs.existsSync(badStandalonePkg)) {
  try {
    fs.unlinkSync(badStandalonePkg);
    console.log('✓ Removed invalid standalone package.json for Deno compatibility');
  } catch (_) {}
}

const buildIdFile = path.join(rootNextDir, 'BUILD_ID');
if (fs.existsSync(buildIdFile)) {
  const buildId = fs.readFileSync(buildIdFile, 'utf8').trim();
  console.log(`✓ Verified Next.js BUILD_ID: ${buildId}`);
} else {
  console.warn('⚠️ Warning: BUILD_ID not found in root .next');
}

console.log('==============================================');
console.log('✓ Senkron build ready for Deno Deploy!');
console.log('==============================================');
