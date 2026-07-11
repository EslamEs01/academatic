/* Spec 035 — Schedule Search (بحث الجدول, Families/Students nav completion).
 *
 * A DISPLAY-ONLY availability finder grounded in the legacy `management/search-schedule`
 * tool (search for an available time across teachers' timetables). It renders a KPI
 * summary, a real teacher/subject/day/window/availability filter bar, and a scannable
 * board of authored candidate slots + a per-slot read-only detail drawer.
 *
 * Everything is authored fixture data — KPI values are authored literals (NOT computed),
 * availability is an authored label (NOT a computed overlap), there is NO plotting/canvas,
 * NO money/pay/rate figure, and NO persistence. Filtering is the existing client-side
 * data-filter/facet mechanism over authored rows (no backend, no network). Every write
 * path (Book slot · Assign to group) is an honest backendRequired gate: a clickable
 * aria-disabled control that only surfaces its reason — it never books, never mutates a
 * row, never fakes a success. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { chip, button } from '../components/ui.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';
import {
  SS_KPIS, SS_CANDIDATES, SS_TEACHERS, SS_TEACHER_ORDER, SS_CATEGORIES,
  SS_DAYS, SS_DAY_ORDER, SS_SLOTS, SS_SLOT_ORDER, SS_AVAILABILITY, SS_AVAIL_ORDER,
} from '../fixtures/schedule-search.js';

/* the one honest write gate — a clickable aria-disabled control that only shows its
 * reason (never a real book/assign, never a fake success, never a mutation) */
const gate = (labelKey, ic, variant = 'secondary') =>
  `<button type="button" class="btn btn-${variant} btn-sm" data-disabled-reason data-reason-key="ssr.reason.backend" aria-disabled="true" title="${esc(t('ssr.reason.backend'))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

const availChip = (id) => {
  const a = SS_AVAILABILITY[id] || SS_AVAILABILITY.available;
  return chip({ labelKey: a.labelKey, tone: a.tone, icon: a.icon });
};

const teacherName = (id) => t((SS_TEACHERS[id] || {}).labelKey || '');
const subjName = (s) => t('data.subj.' + s);

/* one display-only candidate slot card + a details trigger + the Book gate */
function resultRow(c) {
  const meta = [
    `${icon('curricula', 'ico ico-sm')}<span>${esc(subjName(c.subject))}</span>`,
    `${icon('calendar', 'ico ico-sm')}<span>${esc(t(SS_DAYS[c.dayId].labelKey))}</span>`,
    `${icon('clock', 'ico ico-sm')}<span>${esc(t(SS_SLOTS[c.slotId].labelKey))} · <span dir="ltr" class="tabular">${esc(t(c.timeKey))}</span></span>`,
    `${icon('map-pin', 'ico ico-sm')}<span>${esc(t(c.roomKey))}</span>`,
  ].map((m) => `<span class="inline-flex items-center gap-1">${m}</span>`).join('');
  return `<article class="card p-4 flex flex-wrap items-center gap-3" ${facetAttrs({ search: `${teacherName(c.teacherId)} ${subjName(c.subject)}`, teacher: c.teacherId, category: c.subject, day: c.dayId, slot: c.slotId, availability: c.availabilityId })}>
    <div class="flex-1" style="min-width:220px">
      <div class="flex items-center gap-2 mb-1.5 flex-wrap">
        <span class="font-bold text-ink text-[14px]">${esc(teacherName(c.teacherId))}</span>
        ${availChip(c.availabilityId)}
      </div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px]" style="color:var(--c-ink-3)">${meta}</div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      ${button({ labelKey: 'common.view', variant: 'secondary', size: 'sm', icon: 'search', attrs: `data-drawer="ss-${esc(c.id)}"` })}
      ${gate('ssr.act.book', 'check-circle', 'primary')}
    </div>
  </article>`;
}

/* per-slot read-only detail drawer (facts + Book/Assign gates; no mutation) */
function detailDrawer(c) {
  const body = `<div class="sheet-rows">
      ${sheetRow(t('ssr.res.teacher'), esc(teacherName(c.teacherId)))}
      ${sheetRow(t('ssr.res.subject'), esc(subjName(c.subject)))}
      ${sheetRow(t('ssr.res.day'), esc(t(SS_DAYS[c.dayId].labelKey)))}
      ${sheetRow(t('ssr.res.time'), `${esc(t(SS_SLOTS[c.slotId].labelKey))} · <span dir="ltr" class="tabular">${esc(t(c.timeKey))}</span>`)}
      ${sheetRow(t('ssr.res.room'), esc(t(c.roomKey)))}
      ${sheetRow(t('ssr.f.availability'), availChip(c.availabilityId))}
    </div>
    <div class="flex flex-wrap items-center gap-2 mt-5">
      ${gate('ssr.act.book', 'check-circle', 'primary')}
      ${gate('ssr.act.assign', 'students', 'secondary')}
    </div>`;
  return previewTemplate(`ss-${c.id}`, { titleKey: 'ssr.res.title', headIcon: 'schedule', tone: 'primary', bodyHTML: body });
}

export function renderScheduleSearch() {
  const opt = (all, arr) => [{ value: 'all', labelKey: 'filter.all' }, ...arr];
  const filters = filterBar({
    targetId: 'ss-results', searchKey: 'ssr.searchPh',
    selects: [
      { name: 'teacher', labelKey: 'ssr.f.teacher', options: opt(1, SS_TEACHER_ORDER.map((id) => ({ value: id, labelKey: SS_TEACHERS[id].labelKey }))) },
      { name: 'category', labelKey: 'ssr.f.category', options: opt(1, SS_CATEGORIES.map((s) => ({ value: s, labelKey: 'data.subj.' + s }))) },
      { name: 'day', labelKey: 'ssr.f.day', options: opt(1, SS_DAY_ORDER.map((id) => ({ value: id, labelKey: SS_DAYS[id].labelKey }))) },
      { name: 'slot', labelKey: 'ssr.f.slot', options: opt(1, SS_SLOT_ORDER.map((id) => ({ value: id, labelKey: SS_SLOTS[id].labelKey }))) },
      { name: 'availability', labelKey: 'ssr.f.availability', options: opt(1, SS_AVAIL_ORDER.map((id) => ({ value: id, labelKey: SS_AVAILABILITY[id].labelKey }))) },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'ssr.title', subKey: 'ssr.sub', summaryHTML: summaryCards(SS_KPIS) })}
    ${filters}
    <p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${esc(t('ssr.hint'))}</p>
    <div class="mb-2"><h2 class="section-title">${esc(t('ssr.res.title'))}</h2></div>
    <div id="ss-results" class="grid gap-3">${SS_CANDIDATES.map(resultRow).join('')}</div>
    ${noResults()}
    ${SS_CANDIDATES.map(detailDrawer).join('')}
  `;
}
