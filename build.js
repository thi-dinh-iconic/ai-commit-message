#!/usr/bin/env node

import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildBinary() {
  console.log('📦 Bundling with esbuild...');
  
  // First, bundle the application
  await build({
    entryPoints: ['bin/cli.js'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: 'dist/bundled-cli.js',
    format: 'cjs',
    external: []
  });
  
  // Read the bundled file and add shebang
  const bundledContent = readFileSync('dist/bundled-cli.js', 'utf-8');
  const cleanedContent = bundledContent.replace(/^#!.*\n/, ''); // Remove existing shebang
  writeFileSync('dist/bundled-cli.js', `#!/usr/bin/env node\n${cleanedContent}`);

  console.log('✅ Bundle created successfully!');
  console.log('🔨 Now you can create binaries with:');
  console.log('   npx pkg dist/bundled-cli.js --targets node18-macos-x64 --output dist/ai-commit-macos');
  console.log('   npx pkg dist/bundled-cli.js --targets node18-linux-x64 --output dist/ai-commit-linux');
  console.log('   npx pkg dist/bundled-cli.js --targets node18-win-x64 --output dist/ai-commit-win.exe');
}

buildBinary().catch(console.error);