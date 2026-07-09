/* Spec 026 — Public Holiday (admin ops).
 *
 * A calm, fixture-only admin page that DISPLAYS the academy's authored holiday
 * windows (from→to, scope, status) grounded in the legacy `management-public-holiday`
 * surface. Everything is display-only: the counts are honest tallies of authored
 * rows, the status chips are authored labels (NOT computed state), and there is NO
 * scheduler, NO bulk-cancel engine, NO chart, and display-only authored counts (no monetary values).
 *
 * The two legacy write paths — «Submit Public holiday» (set a window) and the implied
 * bulk cancel/absent for the scoped teachers — are the ONLY actions, and both are
 * honest `backendRequired` gates (disabled-with-reason buttons in the header). They
 * never persist, never mutate a session, never fake a success. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { cardGrid } from '../components/card-grid.js';
import { button, chip } from '../components/ui.js';
import { PUBLIC_HOLIDAYS, HOLIDAY_STATUS } from '../fixtures/public-holiday.js';

/* count of authored rows carrying a given status — a display tally, NOT a metric */
const countBy = (status) => PUBLIC_HOLIDAYS.filter((w) => w.statusKey === status).length;

/* authored status → labeled chip (icon + text), resolved from the status map */
function holidayStatusChip(statusKey) {
  const s = HOLIDAY_STATUS[statusKey] || HOLIDAY_STATUS.scheduled;
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

/* the two honest write gates (Set holiday · Bulk absence) — disabled-with-reason */
const setHolidayGate = () =>
  button({ labelKey: 'ph.act.set', variant: 'secondary', size: 'sm', icon: 'calendar-plus', disabled: true, reasonKey: 'ph.reason.backend' });
const bulkAbsenceGate = () =>
  button({ labelKey: 'ph.act.bulk', variant: 'secondary', size: 'sm', icon: 'user-x', disabled: true, reasonKey: 'ph.reason.backend' });

/* summary tiles — honest tallies of authored windows */
function summary() {
  return summaryCards([
    { icon: 'calendar', tone: 'primary', value: num(PUBLIC_HOLIDAYS.length), labelKey: 'ph.sum.windows' },
    { icon: 'sun', tone: 'success', value: num(countBy('active')), labelKey: 'ph.sum.active' },
    { icon: 'calendar-clock', tone: 'upcoming', value: num(countBy('scheduled')), labelKey: 'ph.sum.scheduled' },
    { icon: 'check', tone: 'muted', value: num(countBy('ended')), labelKey: 'ph.sum.ended' },
  ]);
}

/* one authored holiday-window card: title + status chip, from→to range, scope line */
function windowCard(w) {
  return `<article class="card p-4">
    <div class="flex items-center justify-between gap-2 mb-3">
      <h3 class="section-title">${esc(t(w.titleKey))}</h3>
      ${holidayStatusChip(w.statusKey)}
    </div>
    <div class="flex flex-wrap items-center gap-2 text-[13px] text-ink" aria-label="${esc(t('ph.card.period'))}">
      <span class="inline-flex items-center gap-1.5">${icon('calendar', 'ico ico-sm')}<span class="tabular">${esc(t(w.fromLabel))}</span></span>
      <span aria-hidden="true" style="color:var(--c-ink-3)">${icon('arrow-left', 'ico ico-sm')}</span>
      <span class="inline-flex items-center gap-1.5">${icon('calendar-clock', 'ico ico-sm')}<span class="tabular">${esc(t(w.toLabel))}</span></span>
    </div>
    <div class="mt-2.5 flex items-center gap-1.5 text-[12.5px]" style="color:var(--c-ink-3)">
      ${icon('user', 'ico ico-sm')}
      <span><span class="font-medium">${esc(t('ph.card.scope'))}:</span> ${esc(t(w.scopeLabel))}</span>
    </div>
  </article>`;
}

/* the authored window list (current + upcoming first, ended last per fixture order) */
function windowList() {
  return `<section class="mt-8">
    <div class="mb-3">
      <h2 class="section-title">${esc(t('ph.list.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('ph.list.sub'))}</p>
      <p class="text-[12.5px] mt-1.5 inline-flex items-center gap-1.5" style="color:var(--c-ink-3)">
        ${icon('calendar-clock', 'ico ico-sm')}<span>${esc(t('ph.list.next'))}</span></p>
    </div>
    ${cardGrid(PUBLIC_HOLIDAYS.map(windowCard), { cols: 'sm:grid-cols-2 xl:grid-cols-3' })}
  </section>`;
}

export function renderPublicHoliday() {
  return `
    ${pageHeader({
      titleKey: 'ph.title',
      subKey: 'ph.sub',
      secondary: bulkAbsenceGate(),
      primary: setHolidayGate(),
      summaryHTML: summary(),
    })}
    ${windowList()}
  `;
}
