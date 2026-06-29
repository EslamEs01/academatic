/* Single-day agenda — reuses .sched-block visual and the data-drawer/template
 * mechanism already wired in enhance.js. Time-ordered; one block per row.
 * Used by the Sessions page "Timetable/agenda (today)" tab. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs, esc } from '../dom.js';
import { avatar } from './ui.js';
import { statusChip } from './status-chip.js';
import { statusOf } from './status-map.js';
import { attentionFlag } from './attention-flag.js';

function sortKey(b) {
  return b.start || b.time || '';
}

function agendaBlock(b) {
  const tone = statusOf(b.statusId).tone;
  const teacherId = (b.trainer && b.trainer.id) || b.teacher;
  const searchStr = `${t(b.titleKey)} ${t(b.trainer.nameKey)} ${t(b.roomKey)}`;
  const attrs = facetAttrs({ status: b.statusId, subject: b.subject, teacher: teacherId, search: searchStr });
  const levelPart = b.levelKey ? `${t(b.levelKey)} · ` : '';
  const attentionPart = b.attention ? `<div class="mt-1">${attentionFlag(b.attention)}</div>` : '';
  return `<div class="sched-block tone-${tone}" data-block="${esc(b.id)}" ${attrs}>
    <div class="sched-time"><div class="t1">${b.start || b.time}</div><div class="t2 tabular">${b.end || ''}</div></div>
    <div class="flex-1 min-w-0">
      <div class="font-bold text-ink text-[13.5px] truncate">${t(b.titleKey)}</div>
      <div class="text-[12px] truncate" style="color:var(--c-ink-3)">${levelPart}${t(b.roomKey)}</div>
      ${attentionPart}
    </div>
    <div class="flex items-center gap-2.5 shrink-0">
      ${avatar({ nameKey: b.trainer.nameKey, accent: b.trainer.accent, size: 'sm' })}
      ${statusChip(b.statusId)}
      <button type="button" class="icon-btn" data-drawer="${esc(b.id)}" aria-label="${esc(t('sch.blockPreview'))}">${icon('chevronEnd', 'ico')}</button>
    </div>
  </div>`;
}

export function scheduleAgenda(blocks, { emptyKey = 'sess.agendaEmpty' } = {}) {
  if (!blocks || blocks.length === 0) {
    return `<div class="agenda" data-agenda><p class="empty-state">${esc(t(emptyKey))}</p></div>`;
  }
  const sorted = [...blocks].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
  return `<div class="agenda" data-agenda>${sorted.map(agendaBlock).join('')}</div>`;
}
