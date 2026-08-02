'use strict';

const fs = require('node:fs');
const path = require('node:path');

const APP_ROOT = path.resolve(__dirname, '../..');
const STYLE_FILE = path.join(APP_ROOT, 'src/styles/app.css');
const CONTROLLER_FILE = path.join(APP_ROOT, 'src/js/components/interaction-system.js');

const failures = [];
const requireFile = (file, guard) => {
  if (!fs.existsSync(file)) {
    failures.push(`${guard}: missing ${path.relative(APP_ROOT, file)}`);
    return '';
  }
  const source = fs.readFileSync(file, 'utf8');
  if (!source.trim()) failures.push(`${guard}: empty ${path.relative(APP_ROOT, file)}`);
  return source;
};
const requirePattern = (source, pattern, guard, description) => {
  if (!pattern.test(source)) failures.push(`${guard}: missing ${description}`);
};

const css = requireFile(STYLE_FILE, 'layout.styles-source');
const controller = requireFile(CONTROLLER_FILE, 'layout.shared-controller');

requirePattern(css, /\.interaction-overlay\b/, 'layout.one-overlay', '.interaction-overlay host rule');
requirePattern(css, /\.interaction-surface\b/, 'layout.surface', '.interaction-surface rule');
requirePattern(css, /\.interaction-header\b/, 'layout.stable-header', '.interaction-header region');
requirePattern(css, /\.interaction-content\b[\s\S]*?overflow-y\s*:\s*auto/, 'layout.independent-scroll', 'independently scrollable .interaction-content');
requirePattern(css, /\.interaction-footer\b/, 'layout.stable-action-footer', '.interaction-footer action region');
requirePattern(css, /grid-template-rows\s*:\s*auto\s+minmax\(0\s*,\s*1fr\)\s+auto/, 'layout.stable-action-footer', 'header/content/footer grid rows');
requirePattern(css, /\.interaction-lock\b|body\[data-interaction-locked\]/, 'layout.scroll-lock', 'body scroll-lock selector');
requirePattern(css, /--interaction-scrollbar-compensation/, 'layout.scroll-compensation', 'scrollbar compensation custom property');
requirePattern(css, /100dvh/, 'layout.mobile-390-fullscreen', 'dynamic viewport height');
requirePattern(css, /100vh/, 'layout.mobile-390-fullscreen', '100vh fallback');
requirePattern(css, /safe-area-inset-bottom/, 'layout.mobile-safe-area', 'bottom safe-area inset');
requirePattern(css, /safe-area-inset-top/, 'layout.mobile-safe-area', 'top safe-area inset');
requirePattern(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.interaction-surface[\s\S]*?width\s*:\s*100(?:vw|%)/, 'layout.mobile-390-fullscreen', 'full-width mobile interaction rule at the existing breakpoint');
requirePattern(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'layout.reduced-motion', 'reduced-motion interaction rule');
requirePattern(css, /overflow-x\s*:\s*hidden/, 'layout.horizontal-overflow', 'surface horizontal-overflow protection');

requirePattern(controller, /export\s+(?:function|const)\s+openInteraction\b/, 'layout.shared-controller', 'openInteraction export');
requirePattern(controller, /export\s+(?:function|const)\s+closeInteraction\b/, 'layout.shared-controller', 'closeInteraction export');
requirePattern(controller, /data-interaction-(?:overlay|surface)/, 'layout.one-overlay', 'shared host selectors');
requirePattern(controller, /visualViewport|100dvh|resize/, 'layout.keyboard-viewport', 'keyboard/dynamic viewport handling');
requirePattern(controller, /scrollY|pageYOffset/, 'layout.scroll-restoration', 'previous scroll-position capture');
requirePattern(controller, /scrollTo\s*\(/, 'layout.scroll-restoration', 'scroll-position restoration');

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  console.error(`Spec 044 layout guard: ${failures.length} failure(s)`);
  process.exitCode = 1;
} else {
  console.log('Spec 044 layout guard: PASS');
}
