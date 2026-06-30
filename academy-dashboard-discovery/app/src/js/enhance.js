/* Enhancement-only runtime. The page DOM is already in the static HTML (baked by
 * the generator) — this file ONLY attaches behavior over existing markup:
 * theme/language switching, sidebar rail/drawer, dropdowns, client-side filters,
 * preview sheets (from <template>), confirmation modals, demo actions, toggles,
 * and the no-dead-button catch-all. It creates NO page content. */
import { initTheme, setTheme, getStoredTheme, THEMES } from './theme.js';
import { applyLang, t, num, getLang } from './i18n.js';
import { openPopover, closeMenu } from './components/dropdown.js';
import { toast } from './components/toast.js';
import { icon } from './icons.js';
import { esc } from './dom.js';

const RAIL_KEY = 'academy.rail';
const CAT_KEY = 'academy.navCategory';
const THEME_ICONS = { light: 'sun', dark: 'moon', system: 'monitor' };

applyLang(document.documentElement.getAttribute('lang') || 'ar');
initTheme();

const check = () => `<span style="margin-inline-start:auto">${icon('check', 'ico ico-sm')}</span>`;

/* ---- topbar menus (Spec 001) ---- */
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
  const settingsHref = getLang() === 'en' ? 'settings.en.html' : 'settings.html';
  const lc = 'menu.logoutConfirm';
  return `<div>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('user', 'ico')}<span>${t('menu.account')}</span></button>
    <a class="menu-item" role="menuitem" href="${settingsHref}">${icon('settings', 'ico')}<span>${t('menu.settings')}</span></a>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('help', 'ico')}<span>${t('menu.help')}</span></button>
    <div class="menu-sep"></div>
    <button class="menu-item" role="menuitem" data-confirm data-confirm-title="${esc(t(lc + '.title'))}" data-confirm-msg="${esc(t(lc + '.msg'))}" data-confirm-cta="${esc(t(lc + '.cta'))}" data-confirm-toast="${esc(t(lc + '.toast'))}">${icon('log-out', 'ico')}<span>${t('menu.logout')}</span></button>
  </div>`;
}
/* topbar "+" quick-actions: create shortcuts (demo) + a planned/disabled one */
function quickActionsMenu() {
  const demo = (ic, k) => `<button class="menu-item" role="menuitem" data-demo-action data-toast="${esc(t('topbar.qaToast'))}">${icon(ic, 'ico')}<span>${t(k)}</span></button>`;
  return `<div style="min-width:224px">
    <div class="px-2.5 py-1.5 text-[12px] font-bold" style="color:var(--c-ink-3)">${t('topbar.quickActions')}</div>
    ${demo('calendar-plus', 'topbar.qa.newSession')}${demo('user-check', 'topbar.qa.addStudent')}${demo('trainers', 'topbar.qa.addTeacher')}
    <div class="menu-sep"></div>
    <button class="menu-item is-soon" role="menuitem" aria-disabled="true" data-disabled-reason data-reason-key="topbar.announceReason" title="${esc(t('topbar.announceReason'))}" aria-label="${esc(t('topbar.qa.announce') + ' — ' + t('topbar.announceReason'))}">${icon('megaphone', 'ico')}<span>${t('topbar.qa.announce')}</span><span class="badge-soon">${t('nav.soon')}</span></button>
  </div>`;
}
/* global-search command popover: recent searches (demo) + add-shortcut (fixtures only) */
function commandMenu() {
  const recent = (label) => `<button class="menu-item" role="menuitem" data-action="noop">${icon('search', 'ico')}<span>${esc(label)}</span></button>`;
  return `<div style="min-width:300px">
    <div class="px-2.5 py-1.5 text-[12px] font-bold" style="color:var(--c-ink-3)">${t('topbar.cmd.recent')}</div>
    ${recent(t('data.t.sara'))}${recent(t('sessions.title'))}${recent(t('reportsPage.title'))}
    <div class="menu-sep"></div>
    <button class="menu-item" role="menuitem" data-action="noop">${icon('plus', 'ico')}<span>${t('topbar.cmd.shortcut')}</span></button>
  </div>`;
}
/* topbar apps grid — a quick launcher to the implemented pages */
function appsMenu() {
  const lang = getLang();
  const href = (r) => (lang === 'en' ? r.replace('.html', '.en.html') : r);
  const apps = [
    ['dashboard.html', 'home', 'nav.home'], ['sessions.html', 'sessions', 'nav.sessions'],
    ['schedule.html', 'schedule', 'nav.schedule'], ['students.html', 'students', 'nav.students'],
    ['teachers.html', 'trainers', 'nav.teachers'], ['courses.html', 'curricula', 'nav.courses'],
    ['reports.html', 'reports', 'nav.reports'], ['settings.html', 'settings', 'nav.settings'],
  ];
  const cell = (a) => `<a class="apps-cell" role="menuitem" href="${href(a[0])}">${icon(a[1], 'ico')}<span>${t(a[2])}</span></a>`;
  return `<div style="min-width:268px">
    <div class="px-2.5 py-1.5 text-[12px] font-bold" style="color:var(--c-ink-3)">${t('topbar.apps')}</div>
    <div class="apps-cells">${apps.map(cell).join('')}</div>
  </div>`;
}
function notificationsMenu() {
  const item = (k) => `<button class="menu-item" role="menuitem" data-action="noop" style="align-items:flex-start">
      <span class="medallion m-soft tone-primary" style="width:30px;height:30px">${icon('bell', 'ico ico-sm')}</span>
      <span class="text-start font-bold text-[12.5px]">${t(k)}</span></button>`;
  return `<div style="min-width:248px">
    <div class="px-2.5 py-1.5 text-[12px] font-bold" style="color:var(--c-ink-3)">${t('topbar.notifications')}</div>
    ${item('sessions.title')}${item('section.reports')}
    <div class="menu-sep"></div>
    <button class="menu-item is-soon" role="menuitem" aria-disabled="true" data-disabled-reason data-reason-key="topbar.notifViewAllReason" title="${esc(t('topbar.notifViewAllReason'))}" aria-label="${esc(t('topbar.notifViewAll') + ' — ' + t('topbar.notifViewAllReason'))}">${icon('inbox', 'ico')}<span>${t('topbar.notifViewAll')}</span><span class="badge-soon">${t('nav.soon')}</span></button>
  </div>`;
}
/* row action menu — "view" carries data-drawer to open the entity preview */
function rowMenu(id) {
  return `<div>
    <button class="menu-item" role="menuitem" data-drawer="${esc(id)}">${icon('search', 'ico')}<span>${t('sessions.action.view')}</span></button>
    <button class="menu-item" role="menuitem" data-demo-action>${icon('settings', 'ico')}<span>${t('sessions.action.edit')}</span></button>
    <div class="menu-sep"></div>
    <button class="menu-item" role="menuitem" data-demo-action style="color:var(--c-coral)">${icon('x-circle', 'ico')}<span>${t('sessions.action.cancel')}</span></button>
  </div>`;
}
/* family-card kebab — "view profile" navigates; edit demos; suspend/stop confirm (Spec 004) */
function familyMenu(id) {
  const href = getLang() === 'en' ? 'family.en.html' : 'family.html';
  return `<div>
    <a class="menu-item" role="menuitem" href="${href}">${icon('user', 'ico')}<span>${t('fam.card.viewProfile')}</span></a>
    <button class="menu-item" role="menuitem" data-demo-action data-toast="${esc(t('fam.act.editToast'))}">${icon('edit', 'ico')}<span>${t('fam.act.edit')}</span></button>
    <div class="menu-sep"></div>
    <button class="menu-item" role="menuitem" data-confirm data-confirm-title="${esc(t('fam.act.suspendTitle'))}" data-confirm-msg="${esc(t('fam.act.suspendMsg'))}" data-confirm-cta="${esc(t('fam.act.suspendCta'))}" data-confirm-toast="${esc(t('fam.act.suspendToast'))}">${icon('pause-circle', 'ico')}<span>${t('fam.act.suspend')}</span></button>
    <button class="menu-item" role="menuitem" data-confirm data-confirm-danger data-confirm-title="${esc(t('fam.act.stopTitle'))}" data-confirm-msg="${esc(t('fam.act.stopMsg'))}" data-confirm-cta="${esc(t('fam.act.stopCta'))}" data-confirm-toast="${esc(t('fam.act.stopToast'))}" style="color:var(--c-coral)">${icon('x-circle', 'ico')}<span>${t('fam.act.stop')}</span></button>
  </div>`;
}
function acknowledge(el) {
  const label = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 36);
  return getLang() === 'en' ? `“${label}” — preview action` : `«${label}» — إجراء تجريبي`;
}

/* ---- theme icon + rail + settings appearance active states ---- */
function updateThemeIcon() {
  const u = document.querySelector('[data-action="theme-menu"] use');
  if (u) u.setAttribute('href', '#i-' + (THEME_ICONS[getStoredTheme()] || 'monitor'));
  document.querySelectorAll('[data-theme-opt]').forEach((b) =>
    b.classList.toggle('is-active', b.getAttribute('data-theme-opt') === getStoredTheme()));
  document.querySelectorAll('[data-lang-opt]').forEach((b) =>
    b.classList.toggle('is-active', b.getAttribute('data-lang-opt') === getLang()));
}
function applyRail() {
  const s = document.getElementById('shell');
  if (!s) return;
  const collapsed = localStorage.getItem(RAIL_KEY) === '1';
  s.setAttribute('data-rail', collapsed ? 'true' : 'false');
  s.querySelectorAll('.rail-toggle').forEach((b) => b.setAttribute('aria-expanded', String(!collapsed)));
}

/* category rail: show ONLY the selected category's panel; update the rail tabs.
 * Operates via data-* so it works in both the shell and the cloned mobile drawer. */
function selectCategory(catId, root) {
  const scope = root || document;
  scope.querySelectorAll('[data-nav-panel]').forEach((p) => { p.hidden = p.getAttribute('data-nav-panel') !== catId; });
  scope.querySelectorAll('[data-nav-category]').forEach((b) => {
    const on = b.getAttribute('data-nav-category') === catId;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-selected', String(on));
    b.setAttribute('tabindex', on ? '0' : '-1');
  });
}
updateThemeIcon();
applyRail();
window.addEventListener('themechange', updateThemeIcon);

/* ⌘K / Ctrl+K opens the global command popover (recent searches + add shortcut) */
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
    const input = document.querySelector('[data-action="command-palette"]');
    if (input) { e.preventDefault(); input.focus(); openPopover(input, commandMenu()); }
  }
});

/* category rail tablist: arrow keys move between category tabs (roving tabindex) */
document.addEventListener('keydown', (e) => {
  const cat = e.target.closest && e.target.closest('[data-nav-category]');
  const rail = cat && cat.closest('[data-nav-rail]');
  if (!rail) return;
  const tabs = Array.from(rail.querySelectorAll('[data-nav-category]'));
  const i = tabs.indexOf(cat);
  let j = -1;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % tabs.length;
  else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') j = 0;
  else if (e.key === 'End') j = tabs.length - 1;
  if (j < 0) return;
  e.preventDefault();
  const target = tabs[j];
  selectCategory(target.getAttribute('data-nav-category'), cat.closest('.sidebar') || document);
  target.focus();
  try { localStorage.setItem(CAT_KEY, target.getAttribute('data-nav-category')); } catch (err) { /* ignore */ }
});

function langUrl(lang) {
  const file = (location.pathname.split('/').pop() || 'dashboard.html');
  const base = file.replace('.en.html', '').replace('.html', '') || 'dashboard';
  return lang === 'en' ? `${base}.en.html` : `${base}.html`;
}

/* ---- content tabs (List / Timetable) — toggles baked panels only ---- */
const SCHED_VIEW_KEY = 'academy.schedView.';
function selectTab(group, id, { persist = true, focus = false } = {}) {
  const wrap = document.querySelector(`[data-tabs="${CSS.escape(group)}"]`);
  if (!wrap || !wrap.querySelector(`[data-tab="${CSS.escape(id)}"]`)) return;
  wrap.querySelectorAll('[data-tab]').forEach((tb) => {
    const on = tb.getAttribute('data-tab') === id;
    tb.classList.toggle('is-active', on);
    tb.setAttribute('aria-selected', String(on));
    tb.setAttribute('tabindex', on ? '0' : '-1');
    if (on && focus) tb.focus();
  });
  wrap.querySelectorAll('[data-tabpanel]').forEach((p) => { p.hidden = p.getAttribute('data-tabpanel') !== id; });
  if (persist) {
    try { localStorage.setItem(SCHED_VIEW_KEY + group, id); } catch (e) { /* ignore */ }
    if (history.replaceState) { try { history.replaceState(null, '', '#view=' + id); } catch (e) { /* ignore */ } }
  }
}
/* on load: URL hash (#view=) wins, else the stored view, else the baked default */
(function initTabs() {
  const wraps = document.querySelectorAll('[data-tabs]');
  if (!wraps.length) return;
  const hashView = (location.hash.match(/view=([a-z0-9-]+)/i) || [])[1];
  wraps.forEach((wrap) => {
    const group = wrap.getAttribute('data-tabs');
    const has = (id) => id && wrap.querySelector(`[data-tab="${CSS.escape(id)}"]`);
    let want = hashView && has(hashView) ? hashView : null;
    if (!want) { try { const stored = localStorage.getItem(SCHED_VIEW_KEY + group); if (has(stored)) want = stored; } catch (e) { /* storage blocked */ } }
    if (want) selectTab(group, want, { persist: false });
  });
})();
/* roving-tabindex keyboard nav for the tablist */
document.addEventListener('keydown', (e) => {
  const tab = e.target.closest && e.target.closest('[data-tab]');
  const list = tab && tab.closest('[role="tablist"]');
  if (!list) return;
  const tabs = Array.from(list.querySelectorAll('[data-tab]'));
  const i = tabs.indexOf(tab);
  let j = -1;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') j = 0;
  else if (e.key === 'End') j = tabs.length - 1;
  else return;
  e.preventDefault();
  const wrap = list.closest('[data-tabs]');
  if (wrap) selectTab(wrap.getAttribute('data-tabs'), tabs[j].getAttribute('data-tab'), { focus: true });
});

/* ---- add-family wizard stepper — toggles baked [data-step] panels only.
 * Reuses the tab-visibility pattern; the step is TRANSIENT (URL hash only, never
 * persisted). The ONLY new Spec 004 hooks: data-step-next/prev/go. ---- */
const wizSteps = (wrap) => Array.from(wrap.querySelectorAll('[data-step]'));
function selectStep(wrap, id, { focus = false } = {}) {
  const steps = wizSteps(wrap);
  if (!steps.some((s) => s.getAttribute('data-step') === id)) return;
  steps.forEach((s) => { s.hidden = s.getAttribute('data-step') !== id; });
  wrap.querySelectorAll('[data-step-go]').forEach((d) => {
    const on = d.getAttribute('data-step-go') === id;
    d.classList.toggle('is-active', on);
    d.setAttribute('aria-selected', String(on));
    d.setAttribute('aria-current', on ? 'step' : 'false');
    d.setAttribute('tabindex', on ? '0' : '-1');
    if (on && focus) d.focus();
  });
  if (history.replaceState) { try { history.replaceState(null, '', '#step=' + id); } catch (e) { /* ignore */ } }
}
function stepNeighbor(wrap, dir) {
  const steps = wizSteps(wrap);
  const cur = steps.findIndex((s) => !s.hidden);
  const t2 = steps[Math.min(steps.length - 1, Math.max(0, (cur < 0 ? 0 : cur) + dir))];
  return t2 && t2.getAttribute('data-step');
}
(function initWizard() {
  const wrap = document.querySelector('[data-wizard]');
  if (!wrap) return;
  const want = (location.hash.match(/step=([a-z0-9-]+)/i) || [])[1];
  if (want) selectStep(wrap, want);
})();
/* roving-tabindex keyboard for the wizard step indicator */
document.addEventListener('keydown', (e) => {
  const dot = e.target.closest && e.target.closest('[data-step-go]');
  const wrap = dot && dot.closest('[data-wizard]');
  if (!wrap) return;
  const dots = Array.from(wrap.querySelectorAll('[data-step-go]'));
  const i = dots.indexOf(dot);
  let j = -1;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % dots.length;
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + dots.length) % dots.length;
  else if (e.key === 'Home') j = 0;
  else if (e.key === 'End') j = dots.length - 1;
  else return;
  e.preventDefault();
  selectStep(wrap, dots[j].getAttribute('data-step-go'), { focus: true });
});

/* ---- generic right-side panel (focus trap, scrim, Esc, return focus) ---- */
let panel, scrim, lastFocus, keyHandler;
function openPanel(node, { wide = false } = {}, trigger) {
  if (panel) closePanel();
  lastFocus = trigger || document.activeElement;
  scrim = document.createElement('div'); scrim.className = 'scrim'; scrim.addEventListener('click', closePanel);
  panel = document.createElement('div'); panel.className = 'drawer' + (wide ? ' sheet' : '');
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true');
  panel.appendChild(node);
  document.body.append(scrim, panel);
  requestAnimationFrame(() => { scrim.classList.add('is-open'); panel.classList.add('is-open'); });
  const f = () => Array.from(panel.querySelectorAll('a,button,select,input,[tabindex]:not([tabindex="-1"])')).filter((e) => !e.disabled);
  keyHandler = (e) => {
    if (e.key === 'Escape') return closePanel();
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
function closePanel() {
  if (!panel) return;
  document.removeEventListener('keydown', keyHandler);
  panel.classList.remove('is-open'); scrim.classList.remove('is-open');
  const p = panel, s = scrim; setTimeout(() => { p.remove(); s.remove(); }, 260);
  panel = null; scrim = null;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* sidebar drawer (mobile) clones the static sidebar */
function openDrawer(trigger) {
  const side = document.querySelector('#shell > .sidebar');
  if (!side) return;
  const clone = side.cloneNode(true);
  // avoid duplicate ids + dangling aria refs once the sidebar is cloned into the drawer
  clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  clone.querySelectorAll('[aria-controls],[aria-labelledby]').forEach((n) => { n.removeAttribute('aria-controls'); n.removeAttribute('aria-labelledby'); });
  openPanel(clone, { wide: false }, trigger);
}
/* entity preview sheet clones the matching <template data-preview="id"> */
function openSheet(id, trigger) {
  const tpl = document.querySelector(`template[data-preview="${CSS.escape(id)}"]`);
  if (!tpl) { toast(acknowledge(trigger)); return; }
  openPanel(tpl.content.cloneNode(true), { wide: true }, trigger);
}

/* ---- confirmation modal (built from data-confirm-* attrs; demo only) ---- */
function openConfirm(el) {
  const title = el.getAttribute('data-confirm-title') || '';
  const msg = el.getAttribute('data-confirm-msg') || '';
  const cta = el.getAttribute('data-confirm-cta') || t('common.confirm');
  const toastMsg = el.getAttribute('data-confirm-toast') || '';
  const danger = el.hasAttribute('data-confirm-danger');
  const scrimEl = document.createElement('div');
  scrimEl.className = 'modal-scrim';
  scrimEl.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <div class="flex items-center gap-3 mb-3">
      <span class="medallion m-soft ${danger ? 'tone-coral' : 'tone-primary'}">${icon(danger ? 'alert-triangle' : 'check-circle', 'ico')}</span>
      <h3 class="text-[16px] font-bold text-ink">${esc(title)}</h3></div>
    <p class="text-[13px] mb-5" style="color:var(--c-ink-3)">${esc(msg)}</p>
    <div class="flex justify-end gap-2.5">
      <button class="btn btn-secondary btn-sm" data-close="1"><span>${esc(t('common.cancel'))}</span></button>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} btn-sm" data-confirm-go="1"><span>${esc(cta)}</span></button>
    </div></div>`;
  const close = () => { scrimEl.remove(); document.removeEventListener('keydown', onKey); if (lastFocus2) lastFocus2.focus(); };
  const lastFocus2 = document.activeElement;
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  scrimEl.addEventListener('click', (e) => {
    if (e.target === scrimEl || e.target.closest('[data-close]')) return close();
    if (e.target.closest('[data-confirm-go]')) { close(); if (toastMsg) toast(toastMsg); }
  });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(scrimEl);
  scrimEl.querySelector('[data-confirm-go]').focus();
}

/* generic demo modal (gallery + data-modal-trigger) */
function openModal() {
  const scrimEl = document.createElement('div');
  scrimEl.className = 'modal-scrim';
  scrimEl.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(t('gallery.title'))}">
    <div class="flex items-center gap-3 mb-3"><span class="medallion m-soft tone-primary">${icon('sparkles', 'ico')}</span>
      <h3 class="text-[16px] font-bold text-ink">${t('gallery.title')}</h3></div>
    <p class="text-[13px] mb-5" style="color:var(--c-ink-3)">${t('gallery.subtitle')}</p>
    <div class="flex justify-end gap-2.5"><button class="btn btn-primary btn-sm" data-close="1"><span>${t('common.close')}</span></button></div></div>`;
  const close = () => { scrimEl.remove(); document.removeEventListener('keydown', esc2); };
  const esc2 = (e) => { if (e.key === 'Escape') close(); };
  scrimEl.addEventListener('click', (e) => { if (e.target === scrimEl || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', esc2);
  document.body.appendChild(scrimEl);
  scrimEl.querySelector('button').focus();
}

/* ---- client-side filtering of pre-rendered rows ---- */
function rowsOf(form) {
  const target = document.querySelector(form.getAttribute('data-target'));
  return { target, rows: target ? Array.from(target.querySelectorAll('[data-row]')) : [] };
}
function applyFilter(form) {
  const search = (form.querySelector('[data-filter="search"]')?.value || '').trim().toLowerCase();
  const selects = Array.from(form.querySelectorAll('select[data-filter]'));
  const { target, rows } = rowsOf(form);
  let shown = 0;
  rows.forEach((r) => {
    let ok = true;
    if (search) {
      const hay = ((r.getAttribute('data-search') || '') + ' ' + r.textContent).toLowerCase();
      if (!hay.includes(search)) ok = false;
    }
    for (const s of selects) {
      const v = (s.value || '').toLowerCase();
      if (ok && v && v !== 'all') {
        const rowVal = (r.getAttribute('data-' + s.getAttribute('data-filter')) || '').toLowerCase();
        // a "+"-joined value (e.g. cancelled+rescheduled) matches any of its members (OR)
        const accept = v.includes('+') ? v.split('+').includes(rowVal) : rowVal === v;
        if (!accept) ok = false;
      }
    }
    r.hidden = !ok;
    if (ok) shown++;
  });
  // hide day-groups (schedule) that have no visible blocks
  if (target) target.querySelectorAll('.day-group').forEach((g) => {
    g.hidden = !g.querySelector('[data-row]:not([hidden])');
  });
  // count unique items (the schedule renders each block in BOTH the list and
  // timetable panels with a shared data-block id, so dedupe before reporting)
  const key = (r) => r.getAttribute('data-block') || r;
  const totalN = new Set(rows.map(key)).size;
  const shownN = new Set(rows.filter((r) => !r.hidden).map(key)).size;
  const cnt = form.querySelector('[data-filter-count]');
  if (cnt) cnt.textContent = shownN === totalN ? '' : t('filter.count', { shown: num(shownN), total: num(totalN) });
  const nr = document.querySelector('[data-no-results]');
  if (nr) nr.classList.toggle('hidden', shown !== 0);
  if (target) target.classList.toggle('hidden', shown === 0);
}
function resetFilter(form) {
  form.querySelectorAll('[data-filter]').forEach((c) => { if (c.tagName === 'SELECT') c.selectedIndex = 0; else c.value = ''; });
  applyFilter(form);
}
// initialise counts on load + live filtering
document.querySelectorAll('[data-filter-form]').forEach((form) => {
  applyFilter(form);
  form.addEventListener('input', () => applyFilter(form));
  form.addEventListener('change', () => applyFilter(form));
  form.addEventListener('submit', (e) => { e.preventDefault(); applyFilter(form); });
});

/* ---- single delegated click listener ---- */
document.addEventListener('click', (e) => {
  // popover/menu selections (live on <body>, outside the shell)
  const th = e.target.closest('[data-set-theme]');
  if (th) { setTheme(th.getAttribute('data-set-theme')); updateThemeIcon(); return closeMenu(); }
  const lg = e.target.closest('[data-set-lang]');
  if (lg) { const l = lg.getAttribute('data-set-lang'); closeMenu(); if (l !== getLang()) location.href = langUrl(l); return; }

  // content / profile tabs — switch the visible baked panel
  const tabBtn = e.target.closest('[data-tab]');
  if (tabBtn) { const wrap = tabBtn.closest('[data-tabs]'); if (wrap) { selectTab(wrap.getAttribute('data-tabs'), tabBtn.getAttribute('data-tab')); return; } }

  // add-family wizard — step indicator / Next / Back (baked panels, JS toggles visibility)
  const stepGo = e.target.closest('[data-step-go]');
  if (stepGo) { const w = stepGo.closest('[data-wizard]'); if (w) { selectStep(w, stepGo.getAttribute('data-step-go')); return; } }
  const stepNext = e.target.closest('[data-step-next]');
  if (stepNext) { const w = stepNext.closest('[data-wizard]'); if (w) { const id = stepNeighbor(w, 1); if (id) selectStep(w, id, { focus: true }); return; } }
  const stepPrev = e.target.closest('[data-step-prev]:not([disabled])');
  if (stepPrev) { const w = stepPrev.closest('[data-wizard]'); if (w) { const id = stepNeighbor(w, -1); if (id) selectStep(w, id, { focus: true }); return; } }

  // category rail: swap the expanded panel to the clicked category (no navigation)
  const ncat = e.target.closest('[data-nav-category]');
  if (ncat) {
    const root = ncat.closest('.sidebar') || document;
    const catId = ncat.getAttribute('data-nav-category');
    const sh = document.getElementById('shell');
    if (sh && sh.getAttribute('data-rail') === 'true') { localStorage.setItem(RAIL_KEY, '0'); applyRail(); }
    selectCategory(catId, root);
    try { localStorage.setItem(CAT_KEY, catId); } catch (err) { /* ignore */ }
    return closeMenu();
  }

  // entity preview / overlays
  const drw = e.target.closest('[data-drawer]');
  if (drw) { closeMenu(); return openSheet(drw.getAttribute('data-drawer'), drw); }
  if (e.target.closest('[data-sheet-close]')) return closePanel();
  const cf = e.target.closest('[data-confirm]');
  if (cf) { closeMenu(); return openConfirm(cf); }

  // full-IA nav: planned items → "قريبًا" toast; disabled items → their reason (never dead)
  const cs = e.target.closest('[data-coming-soon]');
  if (cs) { closeMenu(); return toast(t(cs.getAttribute('data-soon-key') || 'nav.comingSoon')); }
  const dr = e.target.closest('[data-disabled-reason]');
  if (dr) { closeMenu(); return toast(t(dr.getAttribute('data-reason-key'))); }

  // demo actions (toggles, buttons) — visible feedback, no persistence
  const tg = e.target.closest('[data-toggle]:not(:disabled)');
  if (tg) { const on = tg.classList.toggle('is-on'); tg.setAttribute('aria-checked', String(on)); const m = tg.getAttribute('data-toast'); if (m) toast(m); return; }
  const dm = e.target.closest('[data-demo-action]');
  if (dm) { closeMenu(); return toast(dm.getAttribute('data-toast') || acknowledge(dm)); }

  // filter apply/reset
  const fa = e.target.closest('[data-filter-apply]');
  if (fa) { const form = fa.closest('[data-filter-form]'); if (form) applyFilter(form); return; }
  const fr = e.target.closest('[data-filter-reset]');
  if (fr) { const form = fr.closest('[data-filter-form]'); if (form) resetFilter(form); return; }

  // summary tile → set a filter facet + re-apply (Spec 005 — the only new hook)
  const fset = e.target.closest('[data-filter-set]');
  if (fset) {
    const parts = (fset.getAttribute('data-filter-set') || '').split(':');
    const facet = parts[0], value = parts[1];
    const form = document.querySelector('[data-filter-form]');
    if (form && facet && value != null) {
      const sel = form.querySelector(`select[data-filter="${CSS.escape(facet)}"]`);
      if (sel) { sel.value = value; applyFilter(form); }
    }
    return;
  }

  const noop = e.target.closest('.popover [data-action="noop"]');
  if (noop) { const m = acknowledge(noop); closeMenu(); return toast(m); }

  const trg = e.target.closest('[data-action],[data-row-menu],[data-modal-trigger],a[href="#"]');
  if (!trg) {
    const btn = e.target.closest('button:not(:disabled)');
    if (btn && !btn.closest('.popover,.modal,.drawer')) toast(acknowledge(btn));
    return;
  }
  if (trg.matches('a[href="#"]')) e.preventDefault();
  if (trg.hasAttribute('data-row-menu')) { const rid = trg.getAttribute('data-row-menu'); return void openPopover(trg, trg.getAttribute('data-row-menu-kind') === 'family' ? familyMenu(rid) : rowMenu(rid)); }
  if (trg.hasAttribute('data-modal-trigger')) return openModal();
  switch (trg.getAttribute('data-action')) {
    case 'theme-menu': return void openPopover(trg, themeMenu());
    case 'lang-menu': return void openPopover(trg, langMenu());
    case 'profile-menu': return void openPopover(trg, profileMenu());
    case 'notifications': return void openPopover(trg, notificationsMenu());
    case 'apps-grid': return void openPopover(trg, appsMenu());
    case 'quick-actions': return void openPopover(trg, quickActionsMenu());
    case 'command-palette': return void openPopover(trg, commandMenu());
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
