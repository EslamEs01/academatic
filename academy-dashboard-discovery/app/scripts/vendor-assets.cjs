/* Vendor fonts + icons locally (NO CDN at runtime).
 * - Copies Tajawal woff2 (arabic+latin, 400/500/700) from @fontsource into src/fonts/.
 * - Builds src/icons/sprite.svg of <symbol> nodes under STABLE ids from lucide-static,
 *   so components reference ids that don't change when lucide renames files.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FONTS_OUT = path.join(ROOT, 'src/fonts');
const ICONS_OUT = path.join(ROOT, 'src/icons');
const FS_DIR = path.join(ROOT, 'node_modules/@fontsource/tajawal/files');
const LU_DIR = path.join(ROOT, 'node_modules/lucide-static/icons');

fs.mkdirSync(FONTS_OUT, { recursive: true });
fs.mkdirSync(ICONS_OUT, { recursive: true });

/* ---- fonts ---- */
let fontCount = 0;
for (const subset of ['arabic', 'latin']) {
  for (const weight of [400, 500, 700]) {
    const src = path.join(FS_DIR, `tajawal-${subset}-${weight}-normal.woff2`);
    const dest = path.join(FONTS_OUT, `tajawal-${subset}-${weight}.woff2`);
    if (fs.existsSync(src)) { fs.copyFileSync(src, dest); fontCount++; }
    else console.warn(`[vendor] missing font ${path.basename(src)}`);
  }
}

/* ---- icons: stable id -> candidate lucide filenames (first match wins) ---- */
const ICONS = {
  'graduation-cap': ['graduation-cap'],
  home: ['house', 'home'],
  sessions: ['calendar-days', 'calendar-range', 'calendar'],
  schedule: ['calendar-clock', 'clock'],
  students: ['users', 'users-round'],
  trainers: ['user-round', 'contact-round', 'user'],
  curricula: ['book-open', 'book'],
  reports: ['chart-column', 'bar-chart-3', 'chart-no-axes-column'],
  settings: ['settings'],
  help: ['life-buoy', 'lifebuoy'],
  search: ['search'],
  bell: ['bell'],
  moon: ['moon'],
  sun: ['sun'],
  monitor: ['monitor'],
  globe: ['globe'],
  menu: ['menu', 'align-justify'],
  user: ['user-round', 'user'],
  'log-out': ['log-out'],
  chevronStart: ['chevron-right'],
  chevronEnd: ['chevron-left'],
  'chevron-down': ['chevron-down'],
  plus: ['plus'],
  wallet: ['wallet', 'wallet-minimal'],
  'check-circle': ['circle-check', 'check-circle-2', 'check-circle'],
  'trending-up': ['trending-up'],
  'user-check': ['user-round-check', 'user-check'],
  calendar: ['calendar-days', 'calendar'],
  clock: ['clock'],
  play: ['circle-play', 'play'],
  check: ['check'],
  'x-circle': ['circle-x', 'x-circle'],
  x: ['x'],
  ellipsis: ['ellipsis', 'more-horizontal'],
  filter: ['sliders-horizontal', 'filter'],
  lock: ['lock'],
  'alert-triangle': ['triangle-alert', 'alert-triangle'],
  retry: ['refresh-cw', 'rotate-cw'],
  'calendar-plus': ['calendar-plus'],
  inbox: ['inbox'],
  sparkles: ['sparkles'],
  'arrow-left': ['arrow-left'],
  /* Navigation IA — planned/future admin areas (sidebar items + quick actions) */
  tasks: ['list-checks', 'square-check-big', 'clipboard-check'],
  messages: ['message-square', 'message-circle'],
  families: ['contact-round', 'users-round'],
  materials: ['library', 'book-marked'],
  certificates: ['award', 'badge-check'],
  staff: ['shield-check', 'shield'],
  megaphone: ['megaphone', 'volume-2'],
  /* category-rail icons + apps launcher */
  layers: ['layers', 'layers-3'],
  grid: ['layout-grid', 'grid-3x3', 'grid'],
  'user-plus': ['user-round-plus', 'user-plus'],
  /* Spec 004 — families & student academic profiles (contacts, notes, profile actions) */
  phone: ['phone'],
  mail: ['mail'],
  'map-pin': ['map-pin', 'pin'],
  'message-circle': ['message-circle', 'message-square'],
  'pause-circle': ['circle-pause', 'pause-circle'],
  'file-text': ['file-text', 'letter-text', 'file-lines'],
  edit: ['square-pen', 'pen-square', 'pencil'],
  target: ['target'],
  award: ['award', 'badge-check'],
  'book-open': ['book-open', 'book'],
};

function innerSvg(name) {
  const file = path.join(LU_DIR, `${name}.svg`);
  if (!fs.existsSync(file)) return null;
  let s = fs.readFileSync(file, 'utf8');
  const open = s.indexOf('>', s.indexOf('<svg'));
  const close = s.lastIndexOf('</svg>');
  if (open < 0 || close < 0) return null;
  return s.slice(open + 1, close).trim();
}

const symbols = [];
const available = [];
const missing = [];
for (const [id, candidates] of Object.entries(ICONS)) {
  let inner = null;
  for (const c of candidates) { inner = innerSvg(c); if (inner) break; }
  if (!inner) { missing.push(id); continue; }
  symbols.push(`<symbol id="i-${id}" viewBox="0 0 24 24" fill="none">${inner}</symbol>`);
  available.push(id);
}

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">\n${symbols.join('\n')}\n</svg>\n`;
fs.writeFileSync(path.join(ICONS_OUT, 'sprite.svg'), sprite);
fs.writeFileSync(path.join(ICONS_OUT, 'icons.json'), JSON.stringify(available, null, 2));

console.log(`[vendor] fonts copied: ${fontCount}/6 · icons: ${available.length} ok, ${missing.length} missing${missing.length ? ' (' + missing.join(',') + ')' : ''}`);
if (missing.length) process.exitCode = 0; // non-fatal; components fall back gracefully
