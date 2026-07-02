/* A single weekly-timetable block, placed by BUILD-TIME grid custom properties
 * (--col / --r1 / --r2 / --cols / --colidx). Runtime JS never lays this out.
 * Clicking it opens the shared appointment drawer (data-drawer → <template>). */
import { t } from '../i18n.js';
import { esc, facetAttrs } from '../dom.js';
import { statusOf } from './status-map.js';
import { attentionFlag } from './attention-flag.js';

export function timeBlock(b, place = {}) {
  const tone = statusOf(b.statusId).tone;
  const teacher = (b.trainer && b.trainer.id) || b.teacher || '';
  const name = b.trainer ? t(b.trainer.nameKey) : '';
  const search = `${t(b.titleKey)} ${name} ${b.roomKey ? t(b.roomKey) : ''}`;
  const style = `--col:${place.col};--r1:${place.r1};--r2:${place.r2};--cols:${place.cols || 1};--colidx:${place.colidx || 0}`;
  const aria = `${t(b.titleKey)} · ${esc(b.start)}–${esc(b.end)}${name ? ' · ' + name : ''}`;
  // 3 tidy lines: time · title · (attention flag OR teacher·room) — keeps blocks compact + readable
  const secondary = b.attention
    ? attentionFlag(b.attention)
    : `<span class="tt-meta">${name}${b.roomKey ? ' · ' + t(b.roomKey) : ''}</span>`;
  return `<button type="button" class="tt-block tone-${tone}" style="${style}" data-block="${esc(b.id)}" data-drawer="${esc(b.id)}" ${facetAttrs({ status: b.statusId, subject: b.subject, teacher, search })} aria-label="${esc(aria)}">
    <span class="tt-time"><span dir="ltr">${esc(b.start)}–${esc(b.end)}</span></span>
    <span class="tt-title">${t(b.titleKey)}</span>
    ${secondary}
  </button>`;
}
