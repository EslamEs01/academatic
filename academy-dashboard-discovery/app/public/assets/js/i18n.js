/* Native i18n — Arabic (default) + English. JSON dictionaries, dotted keys.
 * Sets <html lang/dir>, persists choice, and exposes t(). A missing key is
 * loudly flagged (⟦key⟧) so the no-raw-i18n-key smoke test catches it. */
import ar from '../locales/ar.js';
import en from '../locales/en.js';
import arX from '../locales/ar.extra.js';
import enX from '../locales/en.extra.js';

function deepMerge(target, src) {
  for (const k in src) {
    if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k])) {
      target[k] = target[k] || {};
      deepMerge(target[k], src[k]);
    } else target[k] = src[k];
  }
  return target;
}
// Spec 002 keys live in *.extra.js and merge into the Spec 001 dictionaries
deepMerge(ar, arX);
deepMerge(en, enX);

const DICTS = { ar, en };
const KEY = 'academy.lang';
export const LANGS = { ar: { dir: 'rtl', label: 'العربية' }, en: { dir: 'ltr', label: 'English' } };
const FALLBACK = 'ar';

let current = 'ar';

export function getStoredLang() {
  const v = localStorage.getItem(KEY);
  return LANGS[v] ? v : 'ar';
}
export function getLang() { return current; }
export function getDir() { return LANGS[current].dir; }

function resolve(dict, key) {
  return key.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), dict);
}

/** t('kpi.revenue', {n: 5}) — interpolates {tokens}; falls back ar; flags misses */
export function t(key, vars) {
  let v = resolve(DICTS[current], key);
  if (v == null) v = resolve(DICTS[FALLBACK], key);
  if (v == null) { console.warn('[i18n] missing key:', key); return `⟦${key}⟧`; }
  if (vars) v = v.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  return v;
}

/** localized digits — Arabic-Indic for ar, Latin for en. Never mirrors. */
export function num(n, opts) {
  const locale = current === 'ar' ? 'ar-EG' : 'en-US';
  try { return new Intl.NumberFormat(locale, opts).format(n); }
  catch { return String(n); }
}

export function applyLang(lang) {
  current = LANGS[lang] ? lang : 'ar';
  // DOM-guarded so the render functions can run under Node (static-site generation)
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('lang', current);
    root.setAttribute('dir', LANGS[current].dir);
  }
}

export function setLang(lang) {
  if (!LANGS[lang]) lang = 'ar';
  localStorage.setItem(KEY, lang);
  applyLang(lang);
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/** bind any static [data-i18n] / [data-i18n-attr] nodes (pages are mostly JS-rendered) */
export function applyI18nDom(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.getAttribute('data-i18n')); });
  root.querySelectorAll('[data-i18n-attr]').forEach((n) => {
    n.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) n.setAttribute(attr, t(key));
    });
  });
}

export function initI18n() { applyLang(getStoredLang()); }
