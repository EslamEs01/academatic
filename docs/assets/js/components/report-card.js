/* Report category card — medallion + title + description, plus (Spec 008) an optional
 * labeled availability chip and an optional fixture-summary slot. Backward-compatible:
 * existing 1-arg callers (the dashboard) keep working.
 *   - `available` (has a real `route`) → a clickable `<a>` drill-down to an implemented page.
 *   - `planned`/`backendRequired` (no route) → a non-clickable `aria-disabled` block with an
 *     inline reason — NEVER a dead `<a href="#">`.
 *   - legacy permission-locked variant (requiresPermission) still supported. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { medallion } from './ui.js';
import { availabilityChip } from './report-status.js';
import { esc } from '../dom.js';

export function reportCard(r, { hasPermission = true, summaryHTML = '', rowAttrs = '' } = {}) {
  const planned = r.availability === 'planned' || r.availability === 'backendRequired';
  const permLocked = !!(r.requiresPermission && !hasPermission);
  const disabled = planned || permLocked || !r.route;

  const med = medallion({ icon: r.icon, tone: r.tone || 'primary', variant: 'soft' });
  const availChip = r.availability ? availabilityChip(r.availability) : '';
  const topRight = availChip
    || (disabled ? '' : `<span class="report-chevron">${icon('chevronEnd', 'ico')}</span>`);

  const summary = summaryHTML || r.summaryHTML || '';
  const reasonText = r.disabledReasonKey ? t(r.disabledReasonKey) : '';

  const inner = `
    <div class="flex items-start justify-between gap-2">
      ${med}
      ${topRight}
    </div>
    <div>
      <h3 class="text-[14.5px] font-bold text-ink mb-1">${t(r.titleKey)}</h3>
      <p class="text-[12.5px] leading-relaxed" style="color:var(--c-ink-3)">${esc(t(r.descKey))}</p>
    </div>
    ${summary ? `<div class="report-summary-slot flex flex-wrap items-center gap-1.5 mt-0.5">${summary}</div>` : ''}
    ${disabled && reasonText ? `<p class="report-reason text-[11.5px] mt-1" style="color:var(--c-ink-3)">${esc(reasonText)}</p>` : ''}`;

  if (disabled) {
    return `<div class="report-card is-disabled" aria-disabled="true" data-report="${esc(r.id)}"${reasonText ? ` title="${esc(reasonText)}"` : ''} ${rowAttrs}>${inner}</div>`;
  }
  return `<a href="${esc(r.route)}" class="report-card" data-report="${esc(r.id)}" ${rowAttrs}>${inner}</a>`;
}
