/* Copy the built static site (public/) to a deploy directory for GitHub Pages
 * or any static host. Usage:
 *   npm run build
 *   npm run deploy:pages -- --out=../../docs     # publish from repo /docs
 *   npm run deploy:pages -- --out=./gh-pages      # then push to a gh-pages branch
 * Default out: ./gh-pages
 * The copied folder is self-contained with relative paths + .nojekyll. */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const PUBLIC = resolve(ROOT, 'public');

const outArg = process.argv.find((a) => a.startsWith('--out='));
const out = resolve(ROOT, outArg ? outArg.slice('--out='.length) : 'gh-pages');

if (!existsSync(resolve(PUBLIC, 'dashboard.html'))) {
  console.error('public/ not built. Run `npm run build` first.');
  process.exit(1);
}
mkdirSync(out, { recursive: true });
cpSync(PUBLIC, out, { recursive: true });
console.log(`[deploy:pages] copied public/ → ${out}`);
console.log('Next: commit/push that folder to your Pages source (e.g. /docs or a gh-pages branch).');
console.log('Relative paths + .nojekyll mean it works at a project URL (user.github.io/repo/).');
