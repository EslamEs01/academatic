/* Shared atoms: button, medallion, avatar, badge, trend pill, section header. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

export function button({ label, labelKey, variant = 'primary', size = '', icon: ic, iconEnd, href, disabled = false, reasonKey, attrs = '' } = {}) {
  const text = labelKey ? t(labelKey) : (label ?? '');
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''}`.trim();
  const lead = ic ? icon(ic, 'ico ico-sm') : '';
  const end = iconEnd ? icon(iconEnd, 'ico ico-sm') : '';
  const title = disabled && reasonKey ? `title="${esc(t(reasonKey))}" aria-disabled="true"` : '';
  if (href && !disabled) return `<a href="${esc(href)}" class="${cls}" ${attrs}>${lead}<span>${esc(text)}</span>${end}</a>`;
  return `<button type="button" class="${cls}" ${disabled ? 'disabled' : ''} ${title} ${attrs}>${lead}<span>${esc(text)}</span>${end}</button>`;
}

export function medallion({ icon: ic, tone = 'primary', variant = 'soft', size = '' } = {}) {
  const sz = size === 'sm' ? 'medallion-sm' : size === 'lg' ? 'medallion-lg' : '';
  return `<span class="medallion m-${variant} tone-${tone} ${sz}">${icon(ic, 'ico')}</span>`;
}

export function avatarInitial(nameKey) {
  const name = t(nameKey).trim();
  return [...name][0] || '•';
}

export function avatar({ text, nameKey, accent = 'violet', size = '', image = null } = {}) {
  const sz = size === 'sm' ? 'avatar-sm' : '';
  const label = text || (nameKey ? avatarInitial(nameKey) : '•');
  if (image) return `<img class="avatar ${sz}" src="${esc(image)}" alt="" />`;
  return `<span class="avatar ${sz} av-${accent}" aria-hidden="true">${esc(label)}</span>`;
}

export function badgeCount(n) {
  return `<span class="badge badge-count tabular">${n}</span>`;
}

export function trendPill({ dir = 'up', pct = 0 } = {}) {
  const arrow = dir === 'down' ? '↓' : dir === 'flat' ? '→' : '↑';
  const cls = dir === 'down' ? 'trend-down' : dir === 'flat' ? 'trend-flat' : 'trend-up';
  return `<span class="trend-pill ${cls} tabular">${pct}% ${arrow}</span>`;
}

export function sectionHeader({ titleKey, linkKey, linkHref = '#' } = {}) {
  const link = linkKey
    ? `<a href="${esc(linkHref)}" class="link-more">${esc(t(linkKey))} ${icon('arrow-left', 'ico ico-sm')}</a>`
    : '';
  return `<div class="flex items-center justify-between mb-3.5">
    <h2 class="section-title">${esc(t(titleKey))}</h2>${link}</div>`;
}
