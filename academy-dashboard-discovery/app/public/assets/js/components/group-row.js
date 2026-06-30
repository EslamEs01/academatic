/* Groups directory list/card-hybrid row (Spec 006). One airy `.group-row` per cohort:
 * teacher avatar · group name (→ group.html) · teacher · level · schedule summary ·
 * the labeled GROUP-status chip (PRIMARY here) · a course link-chip (→ course.html) ·
 * a needs-attention flag · enrolled/capacity count. Filterable via facetAttrs; reflows
 * to a card on mobile (CSS). Presentational — the page passes an item enriched with the
 * resolved course/teacher (titleKey/href/nameKey/accent). NOT a table; NOT a spreadsheet. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { avatar } from './ui.js';
import { groupStatusChip } from './group-status.js';
import { attentionFlag } from './attention-flag.js';

export function groupRow(i) {
  const lvl = i.levelKey.split('.').pop();
  const search = `${t(i.nameKey)} ${i.courseTitleKey ? t(i.courseTitleKey) : ''} ${t(i.teacherNameKey)}`;
  const facets = facetAttrs({ course: i.courseId, teacher: i.teacherId, level: lvl, day: i.schedule.dayId, status: i.statusId, attention: i.needsAttention ? '1' : '', search });
  const courseChip = (i.courseHref && i.courseTitleKey)
    ? `<a href="${esc(i.courseHref)}" class="link-chip">${icon('curricula', 'ico')}<span>${t(i.courseTitleKey)}</span></a>` : '';
  const follow = i.needsAttention ? attentionFlag({ kind: 'attention', labelKey: 'group.status.needsAttention' }) : '';
  const sched = `${t('sch.day.' + i.schedule.dayId)} · <span class="tabular" dir="ltr">${esc(i.schedule.time)}</span>`;
  return `<div class="group-row is-hoverable" ${facets}>
    ${avatar({ nameKey: i.teacherNameKey, accent: i.teacherAccent, size: 'sm' })}
    <div class="gr-body">
      <a href="${esc(i.groupHref)}" class="gr-title">${t(i.nameKey)}</a>
      <div class="gr-sub">${t(i.teacherNameKey)} · ${t(i.levelKey)} · ${sched}</div>
      <div class="gr-meta">${groupStatusChip(i.statusId)}${courseChip}${follow}</div>
    </div>
    <div class="gr-end">
      <div class="gr-count"><b class="text-ink tabular">${num(i.enrolledCount)}</b><span style="color:var(--c-ink-3)"> / ${num(i.capacity)}</span></div>
      <div class="gr-count-l">${t('grp.students')}</div>
    </div>
  </div>`;
}
