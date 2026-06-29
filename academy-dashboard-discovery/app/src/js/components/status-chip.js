/* Status chip — resolves tone/icon/label from the single status map. */
import { statusOf } from './status-map.js';
import { t } from '../i18n.js';
import { icon } from '../icons.js';

export function statusChip(statusId) {
  const s = statusOf(statusId);
  const lead = s.tone === 'live' ? '<span class="live-dot"></span>' : icon(s.icon, 'ico');
  return `<span class="chip tone-${s.tone}">${lead}<span>${t(s.labelKey)}</span></span>`;
}
