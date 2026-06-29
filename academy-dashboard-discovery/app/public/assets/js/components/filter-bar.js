/* Shared filter/search bar. Generalized from the Spec 001 sessions toolbar.
 * Enhances pre-rendered rows client-side via data-* hooks (see enhance.js):
 *   - search input  → data-filter="search"  (matches row data-search)
 *   - selects       → data-filter="<facet>"  (matches row data-<facet>)
 *   - apply / reset  → data-filter-apply / data-filter-reset
 * Rows live in `targetId`; each carries data-row + facet attributes. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { button } from './ui.js';

function select(s) {
  return `<span class="select-wrap">
    <select class="select-input" data-filter="${esc(s.name)}" aria-label="${esc(t(s.labelKey))}">
      ${s.options.map((o) => `<option value="${esc(o.value)}">${o.labelKey ? t(o.labelKey) : esc(o.label)}</option>`).join('')}
    </select>${icon('chevron-down', 'sel-chev ico')}</span>`;
}

export function filterBar({ targetId, searchKey, selects = [], applyKey = 'filter.apply', resetKey = 'filter.reset' } = {}) {
  return `<form class="filterbar" data-filter-form data-target="#${esc(targetId)}">
    <div class="input-wrap" style="flex:1 1 220px;min-width:180px">
      ${icon('search', 'lead-ico')}
      <input class="input" type="search" data-filter="search" placeholder="${esc(t(searchKey))}" aria-label="${esc(t(searchKey))}" />
    </div>
    ${selects.map(select).join('')}
    <div class="flex items-center gap-2 ms-auto">
      ${button({ labelKey: resetKey, variant: 'ghost', size: 'sm', attrs: 'data-filter-reset' })}
      ${button({ labelKey: applyKey, variant: 'dark', size: 'sm', icon: 'filter', attrs: 'data-filter-apply' })}
    </div>
    <span class="w-full text-[12px]" style="color:var(--c-ink-3)" data-filter-count></span>
  </form>`;
}
