/* Spec 012 — the shared ROLE PORTAL shell (Node + browser safe, baked by the SSG).
 * A warm, rail-less, header-based layout — structurally distinct from the admin
 * `.app-shell` by construction (no .nav-rail / .nav-panel / admin topbar).
 * The header reuses the EXISTING enhance.js hooks (theme-menu / lang-menu) and
 * carries a labeled demo role-switch link back to the portal hub. */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

const ROLE_ICONS = { hub: 'grid', student: 'students', family: 'families', teacher: 'trainers' };

export function portalShellMarkup({ role, personaKey = '', bodyHTML }) {
  const en = getLang() === 'en';
  const hubHref = en ? 'portals.en.html' : 'portals.html';
  const greet = personaKey
    ? `<span class="pt-greet">${t('prt.shell.greet')} <strong>${esc(t(personaKey))}</strong></span>`
    : '';
  const switchLink = role === 'hub' ? '' : `
      <a class="pt-switch" href="${hubHref}">${icon('grid', 'ico ico-sm')}<span>${esc(t('prt.shell.switchRole'))}</span></a>`;
  return `<div class="portal-shell" data-role="${esc(role)}">
    <header class="pt-header">
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
    </header>
    <main class="pt-main" id="page" tabindex="-1">
      <div class="pt-body" id="page-body">${bodyHTML}</div>
    </main>
    <footer class="pt-foot">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.shell.demoNote'))}</span></footer>
  </div>`;
}
