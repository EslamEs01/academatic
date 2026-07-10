/* Spec 034 — New Requests / Leads (Control Center).
 *
 * A calm, DISPLAY-ONLY lead pipeline grounded in the legacy `management/new-requests`
 * (+ `/create`) surfaces. It renders a KPI summary, a real status/source filter bar, a
 * scannable list of authored requests, a per-request detail drawer (parent + students +
 * notes log + inline Add-note / Change-status mini forms) and a full New-request create
 * drawer with every grounded field.
 *
 * Everything is authored fixture data — the KPI values are authored literals (NOT computed),
 * there is NO plotting element, NO money/pay/coupon-value figure, and NO persistence. Every
 * write path (Add note · Change status · Convert · Assign · Submit request) is an honest
 * backendRequired gate: a clickable aria-disabled control that only surfaces its reason —
 * it never mutates a row, never fakes a success, never opens a file picker. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { chip, button } from '../components/ui.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { previewTemplate, sheetRow, formDrawer } from '../components/preview-drawer.js';
import { field, optsFrom } from '../components/form-field.js';
import { noResults } from '../components/states.js';
import {
  LEAD_KPIS, LEADS, LEAD_STATUSES, LEAD_STATUS_ORDER, LEAD_SOURCES, LEAD_GENDERS, LEAD_LANGS,
} from '../fixtures/control-center.js';

/* authored status/source → labeled chip (icon + text) */
const statusChip = (id) => {
  const s = LEAD_STATUSES[id] || LEAD_STATUSES.pending;
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
};
const sourceChip = (id) => {
  const s = LEAD_SOURCES[id] || LEAD_SOURCES.website;
  return chip({ labelKey: s.labelKey, tone: 'neutral', icon: s.icon });
};

/* the one honest write gate — a clickable aria-disabled control that only shows its
 * reason (never a real submit, never a fake success, never a mutation) */
const gate = (labelKey, ic, variant = 'secondary', reasonKey = 'lead.reason.backend') =>
  `<button type="button" class="btn btn-${variant} btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

/* ---------------- List row ---------------- */
function leadRow(l) {
  return `<article class="card p-4 flex flex-wrap items-center gap-3" ${facetAttrs({ search: t(l.parentKey), status: l.statusId, source: l.sourceId })}>
    <div class="flex-1" style="min-width:200px">
      <div class="flex items-center gap-2 mb-1 flex-wrap">
        <span class="font-bold text-ink text-[14px]">${esc(t(l.parentKey))}</span>
        <span class="inline-flex items-center gap-1 text-[12px] tabular" style="color:var(--c-ink-3)">${icon('calendar', 'ico ico-sm')}${esc(t(l.dateKey))}</span>
      </div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px]" style="color:var(--c-ink-3)">
        <span>${esc(l.email)}</span>
        <span dir="ltr" class="inline-flex items-center gap-1 tabular">${icon('phone', 'ico ico-sm')}${esc(l.phone)}</span>
      </div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      ${statusChip(l.statusId)}
      ${sourceChip(l.sourceId)}
      ${button({ labelKey: 'lead.act.view', variant: 'secondary', size: 'sm', icon: 'search', attrs: `data-drawer="lead-${esc(l.id)}"` })}
    </div>
  </article>`;
}

/* ---------------- Detail drawer (one per request) ---------------- */
/* students the request came in for — authored name + age (no computed value) */
function studentsBlock(l) {
  const rows = l.students.map((s) => `<div class="flex items-center justify-between py-1">
      <span class="text-[13px] text-ink">${esc(t(s.nameKey))}</span>
      <span class="text-[12px]" style="color:var(--c-ink-3)">${esc(t('lead.detail.age'))}: <span class="tabular">${num(s.age)}</span></span>
    </div>`).join('');
  return `<h3 class="text-[12.5px] font-bold text-ink mt-4 mb-1 flex items-center gap-1.5">${icon('user', 'ico ico-sm')}<span>${t('lead.detail.students')}</span></h3>
    <div>${rows}</div>`;
}

/* the authored notes log (or an honest empty line) */
function notesBlock(l) {
  const body = l.notes.length
    ? l.notes.map((n) => `<div class="mb-2">
        <div class="text-[13px] text-ink">${esc(t(n.textKey))}</div>
        <div class="text-[12px]" style="color:var(--c-ink-3)">${esc(t(n.byKey))} · ${esc(t(n.dateKey))}</div>
      </div>`).join('')
    : `<p class="text-[12.5px]" style="color:var(--c-ink-3)">${esc(t('lead.detail.noNotes'))}</p>`;
  return `<h3 class="text-[12.5px] font-bold text-ink mt-4 mb-1 flex items-center gap-1.5">${icon('edit', 'ico ico-sm')}<span>${t('lead.detail.notesLog')}</span></h3>
    <div>${body}</div>`;
}

/* one inert mini form (heading + control + a single backendRequired final) */
function miniForm(titleKey, controlHTML, gateHTML) {
  return `<div class="mt-4">
    <div class="text-[12.5px] font-bold text-ink mb-1.5">${t(titleKey)}</div>
    <div class="wiz-grid">${controlHTML}</div>
    <div class="flex items-center justify-end mt-2.5">${gateHTML}</div>
  </div>`;
}

function detailDrawer(l) {
  const head = `<div class="sheet-rows">
      ${sheetRow(t('lead.col.parent'), esc(t(l.parentKey)))}
      ${sheetRow(t('lead.col.email'), esc(l.email))}
      ${sheetRow(t('lead.col.phone'), `<span dir="ltr" class="tabular">${esc(l.phone)}</span>`)}
      ${sheetRow(t('lead.col.status'), statusChip(l.statusId))}
    </div>`;

  const noteForm = miniForm(
    'lead.note.title',
    field({ labelKey: 'lead.note.field', name: `lead-${l.id}-note`, type: 'textarea', placeholderKey: 'lead.note.ph', full: true }),
    gate('lead.note.save', 'check', 'primary'),
  );
  const statusOpts = LEAD_STATUS_ORDER.map((id) => ({ value: id, labelKey: LEAD_STATUSES[id].labelKey, selected: id === l.statusId }));
  const statusForm = miniForm(
    'lead.statusForm.title',
    field({ labelKey: 'lead.statusForm.field', name: `lead-${l.id}-status`, type: 'select', options: statusOpts, full: true }),
    gate('lead.statusForm.save', 'check-circle', 'primary'),
  );
  const routeGates = `<div class="flex flex-wrap items-center gap-2 mt-5">
      ${gate('lead.act.convert', 'user-plus', 'secondary')}
      ${gate('lead.act.assign', 'user', 'secondary')}
    </div>`;

  return previewTemplate(`lead-${l.id}`, {
    titleKey: 'lead.detail.title', headIcon: 'inbox', tone: 'primary',
    bodyHTML: `${head}${studentsBlock(l)}${notesBlock(l)}${noteForm}${statusForm}${routeGates}`,
  });
}

/* ---------------- Create-request drawer (grounded field set, no money field) ---------------- */
function createDrawer() {
  const txt = (labelKey, name, opts = {}) => field({ labelKey, name, type: opts.type || 'text', full: opts.full });
  const fields = [
    txt('lead.create.firstName', 'lead-firstName'),
    txt('lead.create.lastName', 'lead-lastName'),
    txt('lead.create.email', 'lead-email'),
    txt('lead.create.phone', 'lead-phone'),
    txt('lead.create.friends', 'lead-friends', { type: 'number' }),
    txt('lead.create.duration', 'lead-duration', { type: 'number' }),
    txt('lead.create.hearFrom', 'lead-hearFrom'),
    txt('lead.create.classes', 'lead-classes', { type: 'number' }),
    field({ labelKey: 'lead.create.gender', name: 'lead-gender', type: 'select', options: optsFrom(LEAD_GENDERS, 'fopt.gender') }),
    txt('lead.create.age', 'lead-age', { type: 'number' }),
    txt('lead.create.parentAge', 'lead-parentAge', { type: 'number' }),
    field({ labelKey: 'lead.create.language', name: 'lead-language', type: 'select', options: optsFrom(LEAD_LANGS, 'lang') }),
    txt('lead.create.timezone', 'lead-timezone'),
    txt('lead.create.trialDate', 'lead-trialDate'),
    txt('lead.create.trialTime', 'lead-trialTime'),
    txt('lead.create.coupon', 'lead-coupon'),
    txt('lead.create.country', 'lead-country'),
    txt('lead.create.course', 'lead-course'),
    field({ labelKey: 'lead.create.note', name: 'lead-note', type: 'textarea', full: true }),
  ].join('');
  return formDrawer('lead-new', {
    titleKey: 'lead.create.title', headIcon: 'user-plus', tone: 'primary',
    fields, ctaKey: 'lead.create.save', reasonKey: 'lead.reason.backend',
  });
}

export function renderLeads() {
  const newBtn = button({ labelKey: 'lead.add', variant: 'primary', size: 'sm', icon: 'user-plus', attrs: 'data-drawer="lead-new"' });
  const filters = filterBar({
    targetId: 'leads-table', searchKey: 'lead.searchPh',
    selects: [
      { name: 'status', labelKey: 'lead.filterStatus', options: [
        { value: 'all', labelKey: 'cc.common.filterAll' },
        ...LEAD_STATUS_ORDER.map((id) => ({ value: id, labelKey: LEAD_STATUSES[id].labelKey })),
      ] },
      { name: 'source', labelKey: 'lead.filterSource', options: [
        { value: 'all', labelKey: 'cc.common.filterAll' },
        ...Object.keys(LEAD_SOURCES).map((id) => ({ value: id, labelKey: LEAD_SOURCES[id].labelKey })),
      ] },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'lead.title', subKey: 'lead.sub', primary: newBtn, summaryHTML: summaryCards(LEAD_KPIS) })}
    ${filters}
    <div id="leads-table" class="grid gap-3">${LEADS.map(leadRow).join('')}</div>
    ${noResults()}
    ${LEADS.map(detailDrawer).join('')}
    ${createDrawer()}
  `;
}
