#!/usr/bin/env node
/**
 * scripts/deno-deploy-build.js
 * Builds Senkron for Deno Deploy with the Next.js preset.
 * Guarantees .next/standalone/package.json, server.js, and static assets
 * are fully populated in both root and demo directories.
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

// 3. Synchronize .next and public to repository root for Deno Deploy
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

// 4. Ensure .next/standalone/package.json and server.js exist in both locations
console.log('--> [4/4] Validating standalone files for Deno Deploy...');

function setupStandalone(standaloneDir, pkgSourceDir) {
  if (!fs.existsSync(standaloneDir)) {
    fs.mkdirSync(standaloneDir, { recursive: true });
  }

  // 4a. Ensure package.json exists in standalone root
  const standalonePkg = path.join(standaloneDir, 'package.json');
  if (!fs.existsSync(standalonePkg)) {
    const srcPkg = path.join(pkgSourceDir, 'package.json');
    if (fs.existsSync(srcPkg)) {
      fs.copyFileSync(srcPkg, standalonePkg);
      console.log(`✓ Created standalone package.json at ${standalonePkg}`);
    }
  }

  // 4b. Ensure server.js exists in standalone root
  const standaloneServer = path.join(standaloneDir, 'server.js');
  const nestedServer = path.join(standaloneDir, 'demo', 'server.js');
  if (!fs.existsSync(standaloneServer) && fs.existsSync(nestedServer)) {
    fs.copyFileSync(nestedServer, standaloneServer);
    console.log(`✓ Copied server.js to standalone root: ${standaloneServer}`);
  }

  // 4c. Create server.cjs alias for Deno CommonJS loader
  const standaloneServerCjs = path.join(standaloneDir, 'server.cjs');
  if (fs.existsSync(standaloneServer) && !fs.existsSync(standaloneServerCjs)) {
    fs.copyFileSync(standaloneServer, standaloneServerCjs);
    console.log(`✓ Created server.cjs alias for Deno`);
  }

  // 4d. Copy public static assets into standalone
  const standalonePublic = path.join(standaloneDir, 'public');
  if (fs.existsSync(demoPublicDir) && !fs.existsSync(standalonePublic)) {
    fs.cpSync(demoPublicDir, standalonePublic, { recursive: true });
    console.log(`✓ Copied public assets into standalone`);
  }

  // 4e. Copy static chunks into standalone/.next/static
  const standaloneStatic = path.join(standaloneDir, '.next', 'static');
  const demoStatic = path.join(demoNextDir, 'static');
  if (fs.existsSync(demoStatic) && !fs.existsSync(standaloneStatic)) {
    fs.mkdirSync(path.dirname(standaloneStatic), { recursive: true });
    fs.cpSync(demoStatic, standaloneStatic, { recursive: true });
    console.log(`✓ Copied static chunks into standalone/.next/static`);
  }
}

// Setup standalone in root .next
setupStandalone(path.join(rootNextDir, 'standalone'), rootDir);

// Setup standalone in demo .next
setupStandalone(path.join(demoNextDir, 'standalone'), demoDir);

// Verify critical files
const rootStandalonePkg = path.join(rootNextDir, 'standalone', 'package.json');
if (fs.existsSync(rootStandalonePkg)) {
  console.log('✓ Verified: .next/standalone/package.json exists!');
} else {
  console.error('❌ Error: .next/standalone/package.json is missing!');
  process.exit(1);
}

const buildIdFile = path.join(rootNextDir, 'BUILD_ID');
if (fs.existsSync(buildIdFile)) {
  const buildId = fs.readFileSync(buildIdFile, 'utf8').trim();
  console.log(`✓ Verified Next.js BUILD_ID: ${buildId}`);
}

console.log('==============================================');
console.log('✓ Senkron build ready for Deno Deploy!');
console.log('==============================================');
