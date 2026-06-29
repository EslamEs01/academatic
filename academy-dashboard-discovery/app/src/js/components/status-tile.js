/* Status summary tile — colored (never gray). Count + icon + label from status map. */
import { statusOf } from './status-map.js';
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';

export function statusTile({ statusId, count }) {
  const s = statusOf(statusId);
  return `<div class="tile tone-${s.tone}">
    <div>
      <div class="count">${num(count)}</div>
      <div class="tile-label">${t(s.labelKey)}</div>
    </div>
    <span class="tile-ico">${icon(s.icon, 'ico')}</span>
  </div>`;
}
