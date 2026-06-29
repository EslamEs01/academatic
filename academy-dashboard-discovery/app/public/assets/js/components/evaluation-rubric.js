/* Student Evaluation surface (Spec 004, R27 / student-evaluation-contract) —
 * the FIXTURE-ONLY Monthly Progress Report rubric: criteria rows (learningProgress
 * / focus / homework / punctuality) each with a calm rating pill (icon + label,
 * NEVER color-only) + achievements narrative + next-month objectives + Approve
 * DEMO action. NO scoring engine, NO approval workflow, NO persistence.
 * A DISTINCT rating vocabulary (separate from the lifecycle + session maps). */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { chip, button } from './ui.js';

/* ratingId → { tone, icon, labelKey } — icon + label always, tone never the only signal */
const RATING = {
  excellent: { tone: 'excellent', icon: 'sparkles',       labelKey: 'eval.rating.excellent' },
  good:      { tone: 'good',      icon: 'check-circle',    labelKey: 'eval.rating.good' },
  sometimes: { tone: 'sometimes', icon: 'clock',          labelKey: 'eval.rating.sometimes' },
  rarely:    { tone: 'rarely',    icon: 'alert-triangle', labelKey: 'eval.rating.rarely' },
};

function ratingPill(id) {
  const r = RATING[id] || RATING.good;
  return `<span class="rating-pill tone-${r.tone}">${icon(r.icon, 'ico')}<span>${t(r.labelKey)}</span></span>`;
}

export function evaluationRubric(ev) {
  if (!ev) return `<div class="empty-row">${t('eval.note')}</div>`;
  const approvedChip = ev.approved
    ? chip({ labelKey: 'eval.approved', tone: 'completed', icon: 'check-circle' })
    : chip({ labelKey: 'eval.pending', tone: 'amber', icon: 'clock' });

  const rows = ev.criteria.map((c) => `<div class="rubric-row">
    <span class="rubric-k">${t('eval.criteria.' + c.key)}</span>
    ${ratingPill(c.ratingId)}
  </div>`).join('');

  return `
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <div class="font-bold text-ink text-[15px]">${t('eval.title')}</div>
        <p class="text-[12.5px]" style="color:var(--c-ink-3)">${t(ev.monthKey)} · ${t('eval.subtitle')}</p>
      </div>
      ${approvedChip}
    </div>

    <div class="info-card mb-4">
      <div class="rubric">${rows}</div>
    </div>

    <div class="info-card mb-4">
      <div class="ic-title">${icon('sparkles', 'ico')}<span>${t('eval.achievements')}</span></div>
      <p class="narrative">${t(ev.achievementsKey)}</p>
    </div>

    <div class="info-card">
      <div class="ic-title">${icon('target', 'ico')}<span>${t('eval.objectives')}</span></div>
      <p class="narrative">${t(ev.objectivesKey)}</p>
    </div>

    <div class="flex flex-wrap items-center gap-2 mt-4">
      ${button({ labelKey: 'eval.approve', variant: 'primary', size: 'sm', icon: 'check-circle', attrs: `data-demo-action data-toast="${esc(t('eval.approveToast'))}"` })}
      <span class="text-[12px]" style="color:var(--c-ink-3)">${t('eval.note')}</span>
    </div>
  `;
}
