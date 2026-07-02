/* Component / style preview — proves the design system across the current
 * direction + theme. Every control acts (no dead buttons / no raw keys). */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { button, medallion, avatar, badgeCount, trendPill } from '../components/ui.js';
import { statusChip } from '../components/status-chip.js';
import { statusTile } from '../components/status-tile.js';
import { kpiCard } from '../components/kpi-card.js';
import { reportCard } from '../components/report-card.js';
import { loadingSkeleton, errorState, emptyState } from '../components/states.js';
import { KPIS } from '../fixtures/kpis.js';
import { REPORTS } from '../fixtures/reports.js';
import { STATUS_SUMMARY } from '../fixtures/status-summary.js';
import { STATUS_ORDER } from '../components/status-map.js';

function sec(titleKey, body, span = '') {
  return `<section class="card p-5 ${span}">
    <div class="eyebrow mb-4">${t(titleKey)}</div>
    ${body}
  </section>`;
}

export function renderGallery() {
  const buttons = `<div class="flex flex-wrap items-center gap-3">
    ${button({ labelKey: 'welcome.action.newSession', variant: 'primary', icon: 'plus' })}
    ${button({ labelKey: 'sessions.apply', variant: 'secondary' })}
    ${button({ labelKey: 'menu.settings', variant: 'ghost', icon: 'settings' })}
    ${button({ labelKey: 'sessions.action.cancel', variant: 'danger' })}
    ${button({ labelKey: 'state.error.retry', variant: 'dark', icon: 'retry' })}
    ${button({ labelKey: 'nav.reports', variant: 'secondary', disabled: true, reasonKey: 'report.trainers.reason' })}
  </div>`;

  const chips = `<div class="flex flex-wrap gap-2.5">${STATUS_ORDER.map(statusChip).join('')}</div>`;
  const tiles = `<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${STATUS_SUMMARY.map((s) => statusTile(s)).join('')}</div>`;
  const kpis = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${KPIS.slice(0, 2).map(kpiCard).join('')}</div>`;
  const meds = `<div class="flex flex-wrap items-center gap-3">
    ${['primary', 'amber', 'success', 'teal', 'sky', 'coral'].map((tone) => medallion({ icon: 'sparkles', tone, variant: 'soft' })).join('')}
    ${medallion({ icon: 'graduation-cap', tone: 'primary', variant: 'grad' })}
  </div>`;
  const fields = `<div class="grid sm:grid-cols-2 gap-4">
    <div><label class="field-label">${t('topbar.searchPlaceholder')}</label>
      <div class="input-wrap">${icon('search', 'lead-ico')}<input class="input" placeholder="${t('sessions.searchPlaceholder')}"></div></div>
    <div><label class="field-label">${t('sessions.col.status')}</label>
      <button class="select-btn w-full"><span>${t('sessions.subjectLabel')}</span>${icon('chevron-down', 'chev')}</button></div>
  </div>`;
  const avatars = `<div class="flex items-center gap-3">
    ${['violet', 'teal', 'amber', 'sky', 'success'].map((a) => avatar({ text: 'م', accent: a })).join('')}
    ${avatar({ nameKey: 'data.profile.name', accent: 'violet', size: 'sm' })}
  </div>`;
  const badges = `<div class="flex items-center gap-3">${badgeCount(24)} ${trendPill({ dir: 'up', pct: 8 })} ${trendPill({ dir: 'down', pct: 3 })}
    <span class="badge" style="background:var(--c-amber-weak);color:var(--c-amber-ink)">${t('report.permissionBadge')}</span></div>`;
  const reports = `<div class="grid sm:grid-cols-2 gap-4">${REPORTS.slice(0, 2).map((r) => reportCard(r, { hasPermission: r.id !== 'trainers' })).join('')}</div>`;
  const states = `<div class="grid gap-4">${emptyState()}${errorState()}</div>`;
  const menus = `<div class="flex flex-wrap gap-3 items-start">
    <div class="menu" style="position:static;min-width:200px">
      <button class="menu-item is-active"><span>${t('theme.light')}</span></button>
      <button class="menu-item"><span>${t('theme.dark')}</span></button>
      <div class="menu-sep"></div>
      <button class="menu-item" style="color:var(--c-coral)">${icon('x-circle', 'ico')}<span>${t('menu.logout')}</span></button>
    </div>
    <div class="tabs"><span class="tab is-active">${t('theme.light')}</span><span class="tab">${t('theme.dark')}</span><span class="tab">${t('theme.system')}</span></div>
  </div>`;
  const toasts = `${button({ labelKey: 'gallery.showToast', variant: 'secondary', icon: 'check-circle', attrs: 'data-action="toast-demo"' })}
    ${button({ label: 'Modal', variant: 'secondary', attrs: 'data-action="open-modal"' })}`;

  return `
    <div class="mb-6">
      <h1 class="section-title" style="font-size:22px">${t('gallery.title')}</h1>
      <p class="text-[13.5px] mt-1" style="color:var(--c-ink-3)">${t('gallery.subtitle')}</p>
    </div>
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
      ${sec('gallery.sec.buttons', buttons, 'lg:col-span-2')}
      ${sec('gallery.sec.kpi', kpis)}
      ${sec('gallery.sec.tiles', tiles)}
      ${sec('gallery.sec.chips', chips)}
      ${sec('gallery.sec.medallions', meds)}
      ${sec('gallery.sec.fields', fields, 'lg:col-span-2')}
      ${sec('gallery.sec.avatars', avatars)}
      ${sec('gallery.sec.badges', badges)}
      ${sec('gallery.sec.report', reports, 'lg:col-span-2')}
      ${sec('gallery.sec.menu', menus)}
      ${sec('gallery.sec.toast', toasts)}
      ${sec('gallery.sec.states', states, 'lg:col-span-2')}
    </div>
  `;
}
// Interactivity (toast-demo / open-modal buttons) is handled by enhance.js.
