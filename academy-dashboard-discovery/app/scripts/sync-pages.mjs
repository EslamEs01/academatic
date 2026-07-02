/* Mirror the complete built site (app/public/) into the repo-level GitHub Pages
 * folder (<repo>/docs) so Pages can serve it via "Deploy from branch → /docs".
 *
 * - Cleans docs/ first (removed pages/assets never linger stale).
 * - Copies EVERYTHING (all .html + .en.html pages, assets/, .nojekyll, index.html).
 * - The site is self-contained with relative paths, so a wholesale mirror keeps
 *   every link/asset working unchanged at user.github.io/repo/.
 * - app/public/ remains the untouched canonical build output.
 *
 * Usage:  npm run deploy:pages     (build + sync, from academy-dashboard-discovery/app)
 *    or:  node scripts/sync-pages.mjs   (sync an existing build)
 */
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));   // …/academy-dashboard-discovery/app/scripts
const APP = resolve(HERE, '..');                        // …/academy-dashboard-discovery/app
const REPO = resolve(APP, '..', '..');                  // repo root
const PUBLIC = resolve(APP, 'public');
const DOCS = resolve(REPO, 'docs');

// fail loudly if the build output is missing or incomplete
if (!existsSync(resolve(PUBLIC, 'index.html'))) {
  console.error('[sync-pages] FAIL: public/index.html not found — run `npm run build` first (from academy-dashboard-discovery/app).');
  process.exit(1);
}
if (!existsSync(resolve(PUBLIC, '.nojekyll'))) {
  console.error('[sync-pages] FAIL: public/.nojekyll not found — the build should create it; run `npm run build`.');
  process.exit(1);
}

// clean → recreate → mirror (cpSync copies dotfiles, so .nojekyll rides along)
rmSync(DOCS, { recursive: true, force: true });
mkdirSync(DOCS, { recursive: true });
cpSync(PUBLIC, DOCS, { recursive: true });

// count copied files (recursive) + sanity-check the essentials landed
function countFiles(dir) {
  let n = 0;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    n += statSync(p).isDirectory() ? countFiles(p) : 1;
  }
  return n;
}
const copied = countFiles(DOCS);
for (const must of ['index.html', '.nojekyll', 'dashboard.html', 'assets']) {
  if (!existsSync(resolve(DOCS, must))) {
    console.error(`[sync-pages] FAIL: docs/${must} missing after copy.`);
    process.exit(1);
  }
}
console.log(`[sync-pages] mirrored public/ → ${DOCS} (${copied} files, .nojekyll preserved)`);
console.log('[sync-pages] Pages setting: Deploy from branch → your branch → /docs');
