/* Theme engine — light / dark / system.
 * - explicit light/dark → <html data-theme="...">
 * - system            → no data-theme attr; CSS @media(prefers-color-scheme) decides
 * Persisted in localStorage. Apply early (see inline snippet in pages) to avoid flash.
 */
const KEY = 'academy.theme';
export const THEMES = ['light', 'dark', 'system'];

export function getStoredTheme() {
  if (typeof localStorage === 'undefined') return 'system'; // Node (SSG)
  const v = localStorage.getItem(KEY);
  return THEMES.includes(v) ? v : 'system';
}

export function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
  else root.removeAttribute('data-theme');
}

export function setTheme(mode) {
  if (!THEMES.includes(mode)) mode = 'system';
  localStorage.setItem(KEY, mode);
  applyTheme(mode);
  window.dispatchEvent(new CustomEvent('themechange', { detail: { mode } }));
}

/** the theme actually shown right now (resolves "system") */
export function resolvedTheme() {
  const m = getStoredTheme();
  if (m !== 'system') return m;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initTheme() {
  applyTheme(getStoredTheme());
  // keep "system" live if the OS preference changes mid-session
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getStoredTheme() === 'system') window.dispatchEvent(new CustomEvent('themechange', { detail: { mode: 'system' } }));
  });
}
