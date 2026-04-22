import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const root = resolve(new URL('..', import.meta.url).pathname);
const tempDir = mkdtempSync(join(tmpdir(), 'klf-health-build-'));
const entryPath = join(tempDir, 'app.entry.jsx');
const outputPath = join(root, 'app.bundle.js');

const sourceFiles = [
  'theme.jsx',
  'data.jsx',
  'radar.jsx',
  'panelA-desktop.jsx',
  'panelB-desktop.jsx',
  'panelA-mobile.jsx',
  'panelB-mobile.jsx',
  'app-shell.jsx',
];

const source = [
  '/** @jsxRuntime classic */',
  ...sourceFiles.map((file) => readFileSync(join(root, file), 'utf8')),
].join('\n\n');

writeFileSync(entryPath, source, 'utf8');

const result = spawnSync('deno', [
  'bundle',
  '--format',
  'iife',
  '--no-check',
  entryPath,
  '-o',
  outputPath,
], {
  cwd: root,
  encoding: 'utf8',
});

rmSync(tempDir, { recursive: true, force: true });

if (result.status !== 0) {
  process.stderr.write(result.stderr || 'Build failed.\n');
  process.exit(result.status || 1);
}

process.stdout.write(result.stdout || '');
