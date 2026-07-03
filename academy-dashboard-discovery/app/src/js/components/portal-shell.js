/* Spec 012 — the shared ROLE PORTAL shell (Node + browser safe, baked by the SSG).
 * Spec 017 upgrades it to SHELL V2 for the three ROLE pages: the role topbar +
 * a persistent desktop sidebar (identity block · ROLE_NAV registry items · hub
 * exit) + a NATIVE mobile <details> nav disclosure (freeze amendment A1 — the
 * admin clone-drawer is #shell-bound and untouchable; role apps use the zero-JS
 * native pattern). The hub keeps the header-only shell. A warm, rail-less layout,
 * structurally distinct from the admin `.app-shell` by construction (no
 * .nav-rail / .nav-panel / admin topbar). ALL navigation renders OUTSIDE
 * #page-body, so page-body content and its standing guarantees stay
 * byte-identical. Registry `planned` entries render as labeled non-anchor
 * buttons (the honest state) — never links, never dead targets. The header
 * reuses the EXISTING enhance.js hooks (theme-menu / lang-menu) and carries the
 * labeled demo role-switch link back to the portal hub. */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from './ui.js';
import { ROLE_NAV } from '../fixtures/portal.js';

const ROLE_ICONS = { hub: 'grid', student: 'students', family: 'families', teacher: 'trainers' };
const ROLE_AVATAR_ACCENT = { student: 'sky', family: 'violet', teacher: 'teal' };

function navItem(entry, activeId, en) {
  const label = esc(t(entry.labelKey));
  if (entry.status === 'implemented') {
    const href = `${entry.page}${en ? '.en' : ''}.html`;
    const active = entry.id === activeId;
    return `<a class="pt-nav-item${active ? ' is-active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${icon(entry.icon, 'ico ico-sm')}<span>${label}</span></a>`;
  }
  return `<button type="button" class="pt-nav-item is-planned">${icon(entry.icon, 'ico ico-sm')}<span>${label}</span><span class="pt-nav-soon">${esc(t('prt.nav.soon'))}</span></button>`;
}

function navList(role, activeId, en) {
  return `<nav class="pt-nav" aria-label="${esc(t('prt.nav.navAria'))}">${ROLE_NAV[role].map((e) => navItem(e, activeId, en)).join('')}</nav>`;
}

export function portalShellMarkup({ role, personaKey = '', bodyHTML, activeId = 'home' }) {
  const en = getLang() === 'en';
  const hubHref = en ? 'portals.en.html' : 'portals.html';
  const greet = personaKey
    ? `<span class="pt-greet">${t('prt.shell.greet')} <strong>${esc(t(personaKey))}</strong></span>`
    : '';
  const switchLink = role === 'hub' ? '' : `
      <a class="pt-switch" href="${hubHref}">${icon('grid', 'ico ico-sm')}<span>${esc(t('prt.shell.switchRole'))}</span></a>`;
  const header = `<header class="pt-header">
      <div class="pt-brand">
        <span class="medallion m-grad tone-violet-teal medallion-sm">${icon('graduation-cap', 'ico')}</span>
        <div class="pt-brand-text">
          <div class="pt-brand-name">${esc(t('brand.name'))}</div>
          <div class="pt-portal-name">${esc(t('prt.portal.' + role))}</div>
        </div>
      </div>
      <div class="pt-head-end">
        ${greet}
        <span class="pt-role-chip">${icon(ROLE_ICONS[role] || 'grid', 'ico ico-sm')}<span>${esc(t('prt.role.' + role))}</span></span>
        <button type="button" class="icon-btn" data-action="theme-menu" aria-label="${esc(t('topbar.toggleTheme'))}" aria-haspopup="menu">
          ${icon('sun', 'ico')}
        </button>
        <button type="button" class="icon-btn" data-action="lang-menu" aria-label="${esc(t('topbar.toggleLang'))}" aria-haspopup="menu">
          ${icon('globe', 'ico')}
        </button>${switchLink}
      </div>
    </header>`;
  const isRoleApp = role === 'student' || role === 'family' || role === 'teacher';
  if (!isRoleApp) {
    return `<div class="portal-shell" data-role="${esc(role)}">
    ${header}
    <main class="pt-main" id="page" tabindex="-1">
      <div class="pt-body" id="page-body">${bodyHTML}</div>
    </main>
    <footer class="pt-foot">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.shell.demoNote'))}</span></footer>
  </div>`;
  }
  const hubEntry = `<a class="pt-nav-item pt-nav-hub" href="${hubHref}">${icon('grid', 'ico ico-sm')}<span>${esc(t('prt.nav.hub'))}</span></a>`;
  const identity = personaKey ? `<div class="pt-ident">
        ${avatar({ nameKey: personaKey, accent: ROLE_AVATAR_ACCENT[role], size: 'sm' })}
        <div class="pt-ident-text">
          <div class="pt-ident-name">${esc(t(personaKey))}</div>
          <span class="pt-role-chip" style="font-size:11px">${icon(ROLE_ICONS[role], 'ico ico-sm')}<span>${esc(t('prt.role.' + role))}</span></span>
        </div>
      </div>` : '';
  return `<div class="portal-shell" data-role="${esc(role)}">
    ${header}
    <details class="pt-nav-drawer">
      <summary>${icon('menu', 'ico ico-sm')}<span>${esc(t('prt.nav.menu'))}</span></summary>
      ${navList(role, activeId, en)}
      <div class="pt-nav-exit">${hubEntry}</div>
    </details>
    <div class="pt-layout">
      <aside class="pt-sidenav">
        ${identity}
        ${navList(role, activeId, en)}
        ${hubEntry}
      </aside>
    <main class="pt-main" id="page" tabindex="-1">
      <div class="pt-body" id="page-body">${bodyHTML}</div>
    </main>
    </div>
    <footer class="pt-foot">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.shell.demoNote'))}</span></footer>
  </div>`;
}
