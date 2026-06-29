/* Enhancement-only runtime. The page DOM is already in the static HTML (baked by
 * the generator) — this file ONLY attaches behavior: theme switching, language
 * switching (navigates between the pre-rendered pages), sidebar rail/drawer,
 * dropdowns, modal, filter/table demo feedback, and the no-dead-button catch-all.
 * No page DOM is created here. */
import { initTheme, setTheme, getStoredTheme, THEMES } from './theme.js';
import { applyLang, t, getLang } from './i18n.js';
import { openPopover, closeMenu } from './components/dropdown.js';
import { toast } from './components/toast.js';
import { icon } from './icons.js';
import { esc } from './dom.js';

const RAIL_KEY = 'academy.rail';
const THEME_ICONS = { light: 'sun', dark: 'moon', system: 'monitor' };

// adopt the page's baked language for transient widgets (menus/toasts)
applyLang(document.documentElement.getAttribute('lang') || 'ar');
initTheme();

const check = () => `<span style="margin-inline-start:auto">${icon('check', 'ico ico-sm')}</span>`;

function themeMenu() {
  const cur = getStoredTheme();
  return `<div>${THEMES.map((m) =>
    `<button class="menu-item ${m === cur ? 'is-active' : ''}" role="menuitem" data-set-theme="${m}">
       ${icon(THEME_ICONS[m], 'ico')}<span>${t('theme.' + m)}</span>${m === cur ? check() : ''}</button>`).join('')}</div>`;
}
function langMenu() {
  const cur = getLang();
  return `<div>${['ar', 'en'].map((l) =>
    `<button class="menu-item ${l === cur ? 'is-active' : ''}" role="menuitem" data-set-lang="${l}">
       ${icon('globe', 'ico')}<span>${t('lang.' + l)}</span>${l === cur ? check() : ''}</button>`).join('')}</div>`;
}
function profileMenu() {
  return `<div>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('user', 'ico')}<span>${t('menu.account')}</span></button>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('settings', 'ico')}<span>${t('menu.settings')}</span></button>
    <div class="menu-sep"></div>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('log-out', 'ico')}<span>${t('menu.logout')}</span></button>
  </div>`;
}
function notificationsMenu() {
  const item = (k) => `<button class="menu-item" role="menuitem" data-action="noop" style="align-items:flex-start">
      <span class="medallion m-soft tone-primary" style="width:30px;height:30px">${icon('bell', 'ico ico-sm')}</span>
      <span class="text-start font-bold text-[12.5px]">${t(k)}</span></button>`;
  return `<div style="min-width:248px">
    <div class="px-2.5 py-1.5 text-[12px] font-bold" style="color:var(--c-ink-3)">${t('topbar.notifications')}</div>
    ${item('sessions.title')}${item('section.reports')}</div>`;
}
function rowMenu() {
  return `<div>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('search', 'ico')}<span>${t('sessions.action.view')}</span></button>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('settings', 'ico')}<span>${t('sessions.action.edit')}</span></button>
    <div class="menu-sep"></div>
    <button class="menu-item" role="menuitem" data-action="noop" style="color:var(--c-coral)">${icon('x-circle', 'ico')}<span>${t('sessions.action.cancel')}</span></button>
  </div>`;
}
function acknowledge(el) {
  const label = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 36);
  return getLang() === 'en' ? `“${label}” — preview action` : `«${label}» — إجراء تجريبي`;
}

/* ---- theme icon + rail ---- */
function updateThemeIcon() {
  const u = document.querySelector('[data-action="theme-menu"] use');
  if (u) u.setAttribute('href', '#i-' + (THEME_ICONS[getStoredTheme()] || 'monitor'));
}
function applyRail() {
  const s = document.getElementById('shell');
  if (s) s.setAttribute('data-rail', localStorage.getItem(RAIL_KEY) === '1' ? 'true' : 'false');
}
updateThemeIcon();
applyRail();
window.addEventListener('themechange', updateThemeIcon);

/* ---- language navigation (pre-rendered per-language pages) ---- */
function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
}

/* ---- mobile drawer: clone the static sidebar ---- */
let drawer, scrim, lastFocus, keyHandler;
function openDrawer(trigger) {
  if (drawer) return;
  const side = document.querySelector('#shell > .sidebar');
  if (!side) return;
  lastFocus = trigger || document.activeElement;
  scrim = document.createElement('div'); scrim.className = 'scrim'; scrim.addEventListener('click', closeDrawer);
  drawer = document.createElement('div'); drawer.className = 'drawer';
  drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true');
  drawer.appendChild(side.cloneNode(true));
  document.body.append(scrim, drawer);
  requestAnimationFrame(() => { scrim.classList.add('is-open'); drawer.classList.add('is-open'); });
  const f = () => Array.from(drawer.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])'));
  keyHandler = (e) => {
    if (e.key === 'Escape') return closeDrawer();
    if (e.key === 'Tab') {
      const els = f(); if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener('keydown', keyHandler);
  const els = f(); if (els[0]) els[0].focus();
}
function closeDrawer() {
  if (!drawer) return;
  document.removeEventListener('keydown', keyHandler);
  drawer.classList.remove('is-open'); scrim.classList.remove('is-open');
  const d = drawer, s = scrim; setTimeout(() => { d.remove(); s.remove(); }, 260);
  drawer = null; scrim = null;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* ---- modal (gallery demo) ---- */
function openModal() {
  const scrimEl = document.createElement('div');
  scrimEl.className = 'modal-scrim';
  scrimEl.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(t('gallery.title'))}">
    <div class="flex items-center gap-3 mb-3"><span class="medallion m-soft tone-primary">${icon('sparkles', 'ico')}</span>
      <h3 class="text-[16px] font-bold text-ink">${t('gallery.title')}</h3></div>
    <p class="text-[13px] mb-5" style="color:var(--c-ink-3)">${t('gallery.subtitle')}</p>
    <div class="flex justify-end gap-2.5">
      <button class="btn btn-secondary btn-sm" data-close="1"><span>${t('theme.system')}</span></button>
      <button class="btn btn-primary btn-sm" data-close="1"><span>${t('sessions.apply')}</span></button>
    </div></div>`;
  const close = () => { scrimEl.remove(); document.removeEventListener('keydown', esc2); };
  const esc2 = (e) => { if (e.key === 'Escape') close(); };
  scrimEl.addEventListener('click', (e) => { if (e.target === scrimEl || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', esc2);
  document.body.appendChild(scrimEl);
  scrimEl.querySelector('button').focus();
}

/* ---- single delegated listener over the static page ---- */
document.addEventListener('click', (e) => {
  // popover item selections (popovers live on <body>, outside the shell)
  const th = e.target.closest('[data-set-theme]');
  if (th) { setTheme(th.getAttribute('data-set-theme')); updateThemeIcon(); return closeMenu(); }
  const lg = e.target.closest('[data-set-lang]');
  if (lg) { const l = lg.getAttribute('data-set-lang'); closeMenu(); if (l !== getLang()) location.href = langUrl(l); return; }
  const noop = e.target.closest('.popover [data-action="noop"]');
  if (noop) { const m = acknowledge(noop); closeMenu(); return toast(m); }

  const trg = e.target.closest('[data-action],[data-row-menu],a[href="#"]');
  if (!trg) {
    const btn = e.target.closest('button:not(:disabled)');
    if (btn && !btn.closest('.popover,.modal,.drawer')) toast(acknowledge(btn));
    return;
  }
  if (trg.matches('a[href="#"]')) e.preventDefault();
  if (trg.hasAttribute('data-row-menu')) return void openPopover(trg, rowMenu());
  switch (trg.getAttribute('data-action')) {
    case 'theme-menu': return void openPopover(trg, themeMenu());
    case 'lang-menu': return void openPopover(trg, langMenu());
    case 'profile-menu': return void openPopover(trg, profileMenu());
    case 'notifications': return void openPopover(trg, notificationsMenu());
    case 'open-drawer': return openDrawer(trg);
    case 'toggle-rail': {
      const s = document.getElementById('shell');
      localStorage.setItem(RAIL_KEY, s.getAttribute('data-rail') === 'true' ? '0' : '1');
      return applyRail();
    }
    case 'open-modal': return openModal();
    case 'toast-demo': return toast(t('gallery.demoToast'));
    case 'search': return;
    default:
      if (trg.tagName !== 'INPUT') toast(acknowledge(trg));
  }
});
