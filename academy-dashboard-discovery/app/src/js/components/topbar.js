/* Topbar — breadcrumb/title, centered global search, organized utility cluster
 * (notifications, theme, language, profile). Wiring lives in enhance.js. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { getStoredTheme } from '../theme.js';
import { PROFILE } from '../fixtures/profile.js';
import { avatar } from './ui.js';

const THEME_ICON = { light: 'sun', dark: 'moon', system: 'monitor' };

export function topbar({ titleKey, crumbKey }) {
  const themeIcon = THEME_ICON[getStoredTheme()] || 'monitor';
  return `<header class="topbar">
    <button type="button" class="icon-btn menu-toggle" data-action="open-drawer" aria-label="${esc(t('topbar.openMenu'))}">
      ${icon('menu', 'ico')}
    </button>
    <button type="button" class="icon-btn hidden md:grid" data-action="toggle-rail" aria-label="${esc(t('topbar.openMenu'))}">
      ${icon('menu', 'ico')}
    </button>
    <div class="hidden md:block leading-tight">
      <div class="crumb">${t('topbar.crumb.home')} · ${t(crumbKey)}</div>
      <div class="topbar-title">${t(titleKey)}</div>
    </div>

    <div class="topbar-search">
      <div class="input-wrap w-full">
        ${icon('search', 'lead-ico')}
        <input class="input" type="search" placeholder="${esc(t('topbar.searchPlaceholder'))}" aria-label="${esc(t('topbar.searchPlaceholder'))}" data-action="search" />
      </div>
    </div>

    <div class="util-cluster">
      <button type="button" class="icon-btn" data-action="notifications" aria-label="${esc(t('topbar.notifications'))}" aria-haspopup="menu">
        ${icon('bell', 'ico')}<span class="dot"></span>
      </button>
      <button type="button" class="icon-btn" data-action="theme-menu" aria-label="${esc(t('topbar.toggleTheme'))}" aria-haspopup="menu">
        ${icon(themeIcon, 'ico')}
      </button>
      <button type="button" class="icon-btn" data-action="lang-menu" aria-label="${esc(t('topbar.toggleLang'))}" aria-haspopup="menu">
        ${icon('globe', 'ico')}
      </button>
      <div class="w-px h-6 mx-1" style="background:var(--c-line)"></div>
      <button type="button" class="profile-chip" data-action="profile-menu" aria-label="${esc(t('topbar.profileMenu'))}" aria-haspopup="menu">
        ${avatar({ text: PROFILE.avatarText, accent: PROFILE.avatarAccent, size: 'sm' })}
        <span class="hidden sm:block text-start">
          <span class="profile-name block">${t(PROFILE.nameKey)}</span>
          <span class="profile-role block">${t(PROFILE.roleKey)}</span>
        </span>
        ${icon('chevron-down', 'ico ico-sm')}
      </button>
    </div>
  </header>`;
}
