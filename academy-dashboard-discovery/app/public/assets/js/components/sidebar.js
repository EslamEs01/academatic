/* Category-based nav shell (right in RTL): a slim icon RAIL of CATEGORY tabs +
 * an expanded LIGHT panel that shows ONLY the selected category's links. Each
 * category bakes its own panel (all in the static HTML); the route's category is
 * visible on load, the rest are `hidden`; enhance.js swaps them on rail click.
 * Items carry a status — implemented = <a href> (+ violet active pill); planned/
 * disabled = <button> (no dead link). See sidebar-shell + navigation-ia contracts. */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from './ui.js';
import { PROFILE } from '../fixtures/profile.js';
import { BRAND, NAV_CATEGORIES, categoryOf } from '../nav.config.js';

/* relative + language-aware: from an English page, link to the `.en.html` variant */
function langRoute(route) {
  if (getLang() === 'en' && route.endsWith('.html') && !route.endsWith('.en.html')) {
    return route.replace(/\.html$/, '.en.html');
  }
  return route;
}

/* panel row — status-aware. implemented = <a>; planned/disabled = <button> (never a dead href) */
function navItem(it, activeId) {
  const label = t(it.labelKey);
  if (it.status === 'planned') {
    return `<button type="button" class="nav-item is-planned" data-nav="${esc(it.id)}" data-nav-status="planned" data-coming-soon data-soon-key="nav.comingSoon">
      ${icon(it.icon, 'ico')}<span class="label">${label}</span><span class="nav-soon">${t('nav.soon')}</span>
    </button>`;
  }
  if (it.status === 'disabled') {
    const reason = t(it.reasonKey);
    return `<button type="button" class="nav-item is-disabled" data-nav="${esc(it.id)}" data-nav-status="disabled" aria-disabled="true" data-disabled-reason data-reason-key="${esc(it.reasonKey)}" title="${esc(reason)}" aria-label="${esc(label + ' — ' + reason)}">
      ${icon(it.icon, 'ico')}<span class="label">${label}</span>${icon('lock', 'ico ico-sm nav-lock')}
    </button>`;
  }
  const active = it.id === activeId ? ' is-active' : '';
  const badge = it.badge != null ? `<span class="badge nav-badge tabular">${it.badge}</span>` : '';
  const current = active ? ' aria-current="page"' : '';
  return `<a href="${esc(langRoute(it.route))}" class="nav-item${active}" data-nav="${esc(it.id)}" data-nav-status="implemented"${current}>
    ${icon(it.icon, 'ico')}<span class="label">${label}</span>${badge}
  </a>`;
}

/* one expanded panel per category (only the active one is shown) */
function catPanel(cat, activeId, activeCat) {
  const hidden = cat.id === activeCat ? '' : ' hidden';
  const items = cat.items.map((i) => navItem(i, activeId)).join('');
  const sections = (cat.sections || []).map((s) => `
    <div class="nav-subsection">
      <div class="nav-subsection-label">${t(s.titleKey)}</div>
      <div class="space-y-1">${s.items.map((i) => navItem(i, activeId)).join('')}</div>
    </div>`).join('');
  return `<div class="cat-panel" id="catpanel-${esc(cat.id)}" role="tabpanel" tabindex="-1" aria-labelledby="railcat-${esc(cat.id)}" data-nav-panel="${esc(cat.id)}"${hidden}>
    <div class="cat-title">${t(cat.labelKey)}</div>
    <nav class="panel-nav" aria-label="${esc(t(cat.labelKey))}">
      <div class="space-y-1">${items}</div>
      ${sections}
    </nav>
  </div>`;
}

/* rail category tab (roving tabindex: only the active tab is in the tab order) */
function railCat(cat, activeCat) {
  const active = cat.id === activeCat;
  return `<button type="button" class="rail-cat${active ? ' is-active' : ''}" role="tab" id="railcat-${esc(cat.id)}" aria-controls="catpanel-${esc(cat.id)}" aria-selected="${active}" data-nav-category="${esc(cat.id)}" aria-label="${esc(t(cat.labelKey))}" title="${esc(t(cat.labelKey))}" tabindex="${active ? '0' : '-1'}">
    ${icon(cat.icon, 'ico')}
  </button>`;
}

export function sidebar(activeId) {
  const activeCat = categoryOf(activeId);
  return `<aside class="sidebar" aria-label="${esc(t('nav.landmark'))}">
    <div class="nav-rail">
      <button type="button" class="rail-toggle" data-action="toggle-rail" aria-controls="nav-panel" aria-expanded="true" aria-label="${esc(t('nav.collapse'))}">
        ${icon('menu', 'ico')}
      </button>
      <div class="rail-cats" role="tablist" aria-orientation="vertical" aria-label="${esc(t('nav.categories'))}" data-nav-rail>
        ${NAV_CATEGORIES.map((c) => railCat(c, activeCat)).join('')}
      </div>
      <button type="button" class="rail-foot" data-action="profile-menu" aria-haspopup="menu" aria-label="${esc(t('topbar.profileMenu'))}">
        ${avatar({ nameKey: PROFILE.nameKey, accent: PROFILE.avatarAccent, size: 'sm' })}
      </button>
    </div>
    <div class="nav-panel" id="nav-panel">
      <div class="brand">
        <span class="medallion m-grad tone-violet-teal medallion-sm">${icon(BRAND.icon, 'ico')}</span>
        <div class="brand-text"><div class="brand-name">${t(BRAND.nameKey)}</div></div>
      </div>
      ${NAV_CATEGORIES.map((c) => catPanel(c, activeId, activeCat)).join('')}
    </div>
  </aside>`;
}
