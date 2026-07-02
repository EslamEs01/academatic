/* Shared admin page header — title + subtitle + actions + optional summary row.
 * Breadcrumb lives in the topbar (set per page via crumbKey). */
import { t } from '../i18n.js';
import { icon } from '../icons.js';

/** a row of small summary cards: [{ icon, tone, value, labelKey }] */
export function summaryCards(items, { cols = 'grid-cols-2 lg:grid-cols-4' } = {}) {
  return `<div class="grid gap-4 ${cols}">${items.map((it) => `
    <div class="card p-4 flex items-center gap-3">
      <span class="medallion m-soft tone-${it.tone}">${icon(it.icon, 'ico')}</span>
      <div><div class="text-[22px] font-bold tabular text-ink" style="line-height:1">${it.value}</div>
        <div class="text-[12px] mt-1" style="color:var(--c-ink-3)">${t(it.labelKey)}</div></div>
    </div>`).join('')}</div>`;
}

export function pageHeader({ titleKey, subKey, primary = '', secondary = '', summaryHTML = '' } = {}) {
  const actions = (primary || secondary)
    ? `<div class="flex items-center gap-2.5 shrink-0">${secondary}${primary}</div>` : '';
  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">${t(titleKey)}</h1>
        ${subKey ? `<p class="page-sub">${t(subKey)}</p>` : ''}
      </div>
      ${actions}
    </div>
    ${summaryHTML ? `<div class="mb-6">${summaryHTML}</div>` : ''}`;
}
