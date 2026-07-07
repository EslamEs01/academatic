/* Spec 026 — Sessions Analysis (admin ops).
 *
 * A calm, DISPLAY-ONLY session-outcome KPI board grounded in the legacy
 * `management/sessions_analysis` surface. It shows a Helpers strip + a Regular-class
 * outcome set + a smaller Trial-class set, each row a "label + authored count + authored
 * total-time" stat. EVERYTHING is baked static HTML from authored fixtures — there is NO
 * chart engine, NO computed average/score/rank/percentile, and display-only authored
 * counts (no monetary values). The only unavailable action (Export) is an honest
 * `backendRequired` disabled-with-reason gate — never a dead link, never a fake toast. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { cardGrid } from '../components/card-grid.js';
import { button } from '../components/ui.js';
import { SA_HELPERS, SA_REGULAR, SA_TRIAL } from '../fixtures/sessions-analysis.js';

/* the ONE honest gate — Export has no backend, so it is disabled-with-reason */
const exportGate = () => button({
  labelKey: 'sa.act.export', icon: 'download',
  variant: 'secondary', size: 'sm', disabled: true, reasonKey: 'sa.reason.backend',
});

/* Helpers strip — the current live picture, as small summary cards. */
function helpersSection() {
  const tiles = summaryCards(
    SA_HELPERS.map((h) => ({ icon: h.icon, tone: h.tone, value: num(h.value), labelKey: h.labelKey })),
  );
  return `<section class="mt-6">
    <div class="mb-3">
      <h2 class="section-title">${esc(t('sa.helpers.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('sa.helpers.sub'))}</p>
    </div>
    ${tiles}
  </section>`;
}

/* one outcome stat card: authored label + authored count + authored total-time. */
function statCard(row) {
  const dur = row.durationLabel
    ? `<span class="text-[12.5px] tabular" style="color:var(--c-ink-3)" title="${esc(t('sa.duration'))}">${esc(row.durationLabel)}</span>`
    : '';
  return `<div class="card p-4">
    <div class="text-[12px]" style="color:var(--c-ink-3)">${esc(t(row.labelKey))}</div>
    <div class="flex items-baseline gap-2 mt-1">
      <span class="text-[22px] font-bold tabular text-ink" style="line-height:1">${num(row.count)}</span>
      ${dur}
    </div>
  </div>`;
}

/* a titled outcome grid (Regular or Trial). */
function outcomeSection(titleKey, subKey, rows, id) {
  return `<section class="mt-8">
    <div class="mb-3">
      <h2 class="section-title">${esc(t(titleKey))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t(subKey))}</p>
    </div>
    ${cardGrid(rows.map(statCard), { cols: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', id })}
  </section>`;
}

/* honest static note — restates the display-only, no-scoring nature. */
function noteBlock() {
  return `<div class="card p-4 mt-6 flex items-start gap-2.5">
    <span class="medallion m-soft tone-muted">${icon('help', 'ico')}</span>
    <p class="text-[12.5px]" style="color:var(--c-ink-3)">${esc(t('sa.note'))}</p>
  </div>`;
}

export function renderSessionsAnalysis() {
  return `
    ${pageHeader({ titleKey: 'sa.title', subKey: 'sa.sub', secondary: exportGate() })}
    ${helpersSection()}
    ${outcomeSection('sa.reg.title', 'sa.reg.sub', SA_REGULAR, 'sa-regular')}
    ${outcomeSection('sa.trial.title', 'sa.trial.sub', SA_TRIAL, 'sa-trial')}
    ${noteBlock()}
  `;
}
