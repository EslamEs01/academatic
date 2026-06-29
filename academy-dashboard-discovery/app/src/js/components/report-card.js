/* Report entry card — medallion + title + description + chevron.
 * Disabled-with-reason variant (permission-locked) is non-clickable. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { medallion } from './ui.js';
import { esc } from '../dom.js';

export function reportCard(r, { hasPermission = true } = {}) {
  const disabled = !!(r.requiresPermission && !hasPermission);
  const med = medallion({ icon: r.icon, tone: r.tone || 'primary', variant: 'soft' });
  const chevron = disabled ? '' : `<span class="report-chevron">${icon('chevronEnd', 'ico')}</span>`;
  const desc = disabled ? t(r.disabledReasonKey) : t(r.descKey);
  const badge = disabled
    ? `<span class="badge mt-1" style="background:var(--c-amber-weak);color:var(--c-amber-ink)">${t('report.permissionBadge')}</span>`
    : '';
  const inner = `
    <div class="flex items-start justify-between">
      ${med}
      ${chevron}
    </div>
    <div>
      <h3 class="text-[14.5px] font-bold text-ink mb-1">${t(r.titleKey)}</h3>
      <p class="text-[12.5px] leading-relaxed" style="color:var(--c-ink-3)">${esc(desc)}</p>
    </div>
    ${badge}`;
  if (disabled) {
    return `<div class="report-card is-disabled" aria-disabled="true" title="${esc(t(r.disabledReasonKey))}">${inner}</div>`;
  }
  return `<a href="${esc(r.route || '#')}" class="report-card" data-report="${esc(r.id)}">${inner}</a>`;
}
