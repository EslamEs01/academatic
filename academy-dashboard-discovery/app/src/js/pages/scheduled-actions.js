/* Spec 026 — Scheduled Actions (admin ops).
 *
 * A calm, fixture-only admin page that DISPLAYS the queue of future lifecycle
 * actions (suspend / activate / cancel-classes) with their scheduled date and
 * optional auto-return date. Everything here is display-only: authored fixture
 * rows + a plain roll-up of counts. There is NO scheduler engine, NO backend,
 * NO fake mutation, NO computed score/rank/chart, and display-only authored counts (no monetary values).
 *
 * The single write on the page — "Create scheduled action" in the header — is an
 * honest `backendRequired` gate (a disabled-with-reason button, never a link,
 * never a fake submit): the automation engine is future-backend. Grounded in
 * `management-scheduled-actions.md` (+create). */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { cardGrid } from '../components/card-grid.js';
import { button, chip } from '../components/ui.js';
import { SCHEDULED_ACTIONS, SCHEDULED_ACTIONS_SUMMARY } from '../fixtures/scheduled-actions.js';

/* per action-type presentation (medallion icon + tone) — display only */
const TYPE_META = {
  stopFamily:      { icon: 'pause-circle', tone: 'coral' },
  stopStudent:     { icon: 'pause-circle', tone: 'coral' },
  cancelClasses:   { icon: 'x-circle',     tone: 'amber' },
  activateFamily:  { icon: 'user-check',   tone: 'success' },
  activateStudent: { icon: 'user-check',   tone: 'success' },
};

/* per status presentation (chip tone + icon) — authored queue state, not computed */
const STATUS_META = {
  queued:    { tone: 'amber', icon: 'clock' },
  upcoming:  { tone: 'upcoming', icon: 'calendar-clock' },
  cancelled: { tone: 'cancelled', icon: 'x-circle' },
};

/* a small "label over value" field cell (both are resolved i18n keys) */
const field = (labelKey, valueKey) =>
  `<div>
    <dt class="text-[11px]" style="color:var(--c-ink-3)">${esc(t(labelKey))}</dt>
    <dd class="text-[13px] font-semibold text-ink mt-0.5">${esc(t(valueKey))}</dd>
  </div>`;

/* one queued action rendered as a display-only card row (no per-row write) */
function actionCard(r) {
  const tm = TYPE_META[r.typeKey] || { icon: 'calendar', tone: 'muted' };
  const sm = STATUS_META[r.statusKey] || { tone: 'neutral', icon: 'clock' };
  const status = chip({ labelKey: `sca.status.${r.statusKey}`, tone: sm.tone, icon: sm.icon });
  return `<div class="card p-4">
    <div class="flex items-start justify-between gap-2 mb-3">
      <div class="flex items-center gap-3 min-w-0">
        <span class="medallion m-soft tone-${tm.tone}">${icon(tm.icon, 'ico')}</span>
        <div class="min-w-0">
          <div class="section-title truncate">${esc(t(`sca.type.${r.typeKey}`))}</div>
          <div class="text-[12.5px] truncate" style="color:var(--c-ink-3)">${esc(t(r.targetLabel))}</div>
        </div>
      </div>
      ${status}
    </div>
    <dl class="grid grid-cols-2 gap-3">
      ${field('sca.field.scheduled', r.scheduledDateLabel)}
      ${field('sca.field.return', r.returnedAtLabel)}
    </dl>
  </div>`;
}

function actionsList() {
  const cards = SCHEDULED_ACTIONS.map(actionCard);
  return `<section class="mt-6">
    <div class="mb-3">
      <h2 class="section-title">${esc(t('sca.listTitle'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('sca.listSub'))}</p>
    </div>
    ${cardGrid(cards, { cols: 'sm:grid-cols-2 lg:grid-cols-3', id: 'sca-grid' })}
  </section>`;
}

export function renderScheduledActions() {
  const s = SCHEDULED_ACTIONS_SUMMARY;
  const summaryHTML = summaryCards([
    { icon: 'tasks',          tone: 'primary', value: num(s.total),      labelKey: 'sca.sum.total' },
    { icon: 'clock',          tone: 'amber',   value: num(s.queued),     labelKey: 'sca.sum.queued' },
    { icon: 'calendar-clock', tone: 'sky',     value: num(s.upcoming),   labelKey: 'sca.sum.upcoming' },
    { icon: 'rotate-cw',      tone: 'teal',    value: num(s.autoReturn), labelKey: 'sca.sum.autoReturn' },
  ]);
  /* the ONE header write = honest backendRequired gate (automation engine is future-backend) */
  const createGate = button({
    labelKey: 'sca.action.create', icon: 'plus', variant: 'primary',
    disabled: true, reasonKey: 'sca.reason.backend',
  });
  return `
    ${pageHeader({ titleKey: 'sca.title', subKey: 'sca.sub', primary: createGate, summaryHTML })}
    ${actionsList()}
  `;
}
