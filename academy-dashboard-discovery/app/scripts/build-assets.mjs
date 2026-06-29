/* Copy runtime assets into public/assets/ with the relative layout the static
 * pages expect: ./assets/app.css · ./assets/js/** · ./assets/locales/** ·
 * ./assets/fonts/*.woff2. CSS is emitted straight to public/assets/app.css by
 * the Tailwind build step. */
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const ASSETS = resolve(ROOT, 'public/assets');
mkdirSync(ASSETS, { recursive: true });

const copies = [
  ['src/js', 'js'],          // enhancement modules (browser loads enhance.js + its imports)
  ['src/locales', 'locales'], // ar.js / en.js (used by transient widgets at runtime)
  ['src/fonts', 'fonts'],     // self-hosted Tajawal woff2
  ['src/icons', 'icons'],     // sprite (also inlined into pages; kept for reference)
];

for (const [from, to] of copies) {
  const src = resolve(ROOT, from);
  if (existsSync(src)) cpSync(src, resolve(ASSETS, to), { recursive: true });
}
console.log('[build:assets] copied js · locales · fonts · icons → public/assets/');
