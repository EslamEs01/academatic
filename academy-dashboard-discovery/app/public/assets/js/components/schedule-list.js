/* Day-grouped schedule overview — NO calendar library. RTL-friendly, responsive.
 * `days`: [{ nameKey, dateText, blocks:[ScheduleBlock] }]. Blocks are filterable. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { avatar } from './ui.js';
import { statusChip } from './status-chip.js';
import { statusOf } from './status-map.js';
import { attentionFlag } from './attention-flag.js';

function block(b) {
  const tone = statusOf(b.statusId).tone;
  const search = `${t(b.titleKey)} ${t(b.trainer.nameKey)} ${t(b.roomKey)}`;
  // data-block lets the schedule dedupe filter counts across the List + Timetable panels
  const attrs = facetAttrs({ status: b.statusId, subject: b.subject, teacher: (b.trainer && b.trainer.id) || '', search });
  return `<div class="sched-block tone-${tone}" data-block="${esc(b.id)}" ${attrs}>
    <div class="sched-time"><div class="t1">${b.start}</div><div class="t2 tabular">${b.end}</div></div>
    <div class="flex-1 min-w-0">
      <div class="font-bold text-ink text-[13.5px] truncate">${t(b.titleKey)}</div>
      <div class="text-[12px] truncate" style="color:var(--c-ink-3)">${t(b.levelKey)} · ${t(b.roomKey)}</div>
      ${b.attention ? `<div class="mt-1">${attentionFlag(b.attention)}</div>` : ''}
    </div>
    <div class="flex items-center gap-2.5 shrink-0">
      ${avatar({ nameKey: b.trainer.nameKey, accent: b.trainer.accent, size: 'sm' })}
      ${statusChip(b.statusId)}
      <button type="button" class="icon-btn" data-drawer="${esc(b.id)}" aria-label="${esc(t('sch.blockPreview'))}">${icon('chevronEnd', 'ico')}</button>
    </div>
  </div>`;
}

export function scheduleList(days) {
  return `<div data-table>${days.map((d) => `
    <div class="day-group">
      <div class="day-head">
        <span class="day-name">${t(d.nameKey)}</span>
        <span class="day-date">${d.dateText}</span>
        <span class="day-count tabular">${num(d.blocks.length)}</span>
      </div>
      ${d.blocks.map(block).join('')}
    </div>`).join('')}</div>`;
}
