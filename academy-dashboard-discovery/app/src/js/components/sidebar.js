/* Dark premium sidebar (right in RTL): brand block, grouped nav, violet active
 * pill, help card. Data-driven from nav.config. See sidebar-shell-contract. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { BRAND, NAV_GROUPS, HELP_CARD } from '../nav.config.js';

function navItem(item, activeId) {
  const active = item.id === activeId ? ' is-active' : '';
  const badge = item.badge != null ? `<span class="badge nav-badge tabular">${item.badge}</span>` : '';
  const current = active ? 'aria-current="page"' : '';
  return `<a href="${esc(item.route)}" class="nav-item${active}" data-nav="${esc(item.id)}" ${current}>
    ${icon(item.icon, 'ico')}<span class="label">${t(item.labelKey)}</span>${badge}
  </a>`;
}

function group(g, activeId) {
  return `<div class="nav-group">
    <div class="nav-group-label">${t(g.labelKey)}</div>
    <div class="space-y-1">${g.items.map((i) => navItem(i, activeId)).join('')}</div>
  </div>`;
}

export function sidebar(activeId) {
  return `<aside class="sidebar" aria-label="${esc(t('topbar.profileMenu'))}">
    <div class="brand">
      <span class="medallion m-grad tone-primary medallion-sm">${icon(BRAND.icon, 'ico')}</span>
      <div class="brand-text">
        <div class="brand-name">${t(BRAND.nameKey)}</div>
        <div class="brand-plan">${t(BRAND.planKey)}</div>
      </div>
    </div>
    <nav aria-label="${esc(t('nav.group.general'))}" class="flex flex-col">
      ${NAV_GROUPS.map((g) => group(g, activeId)).join('')}
    </nav>
    <div class="sb-help">
      <span class="medallion medallion-sm">${icon(HELP_CARD.icon, 'ico')}</span>
      <div class="sb-help-text">
        <div class="sb-help-title">${t(HELP_CARD.titleKey)}</div>
        <div class="sb-help-sub">${t(HELP_CARD.subtitleKey)}</div>
      </div>
    </div>
  </aside>`;
}
