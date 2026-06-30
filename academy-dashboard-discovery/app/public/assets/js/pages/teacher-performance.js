/* Teacher Performance board (Spec 007) — the promoted `teacherKpi` page (activeId:'teacherKpi').
 * An academy-wide, fixture-backed KPI/follow-up board: summary KPI TILES (raw counts) + a
 * per-teacher COMPARISON list (counts + labeled workload/follow-up signals, each → teacher.html)
 * + a FOLLOW-UP queue. Display-only — every number is a fixture count / resolved list length;
 * there is no computed rating, no ordering of teachers, no graph, and no pay/finance figure.
 * Filtering is the existing client-side facet mechanism only (no analytics engine). */
import { TEACHERS, TEACHERS_NEEDING_FOLLOWUP } from '../fixtures/teachers.js';
import { GROUP_SUMMARY } from '../fixtures/groups.js';
import { teacherCounts } from '../fixtures/teacher-links.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { statMini } from '../components/directory-card.js';
import { avatar } from '../components/ui.js';
import { noResults } from '../components/states.js';
import { teacherStatusChip } from '../components/teacher-status.js';
import { workloadChip, signalChip, needsFollowUp, WORKLOAD_ORDER, SIGNAL_ORDER } from '../components/teacher-signals.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const teacherHref = () => (getLang() === 'en' ? 'teacher.en.html' : 'teacher.html');

/* a per-teacher comparison card — raw COUNTS + labeled signals + a profile link. No score/rank. */
function perfRow(tr, c) {
  const search = `${t(tr.nameKey)} ${tr.subjectsKeys.map((k) => t(k)).join(' ')}`;
  const stats = statMini(num(c.completed), 'trn.board.row.completed')
    + statMini(num(c.teacherAbsent), 'trn.board.row.teacherAbsent')
    + statMini(num(c.studentAbsent), 'trn.board.row.studentAbsent')
    + statMini(num(c.groups), 'trn.board.row.groups');
  return `<div class="dir-card is-hoverable" ${facetAttrs({ subject: tr.primary, workload: tr.workload, signal: tr.followUp, status: tr.statusId, search })}>
    <div class="flex items-start gap-3">
      ${avatar({ nameKey: tr.nameKey, accent: tr.accent })}
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2"><h3 class="font-bold text-ink text-[14px] truncate">${t(tr.nameKey)}</h3>${teacherStatusChip(tr.statusId)}</div>
        <p class="text-[12px] truncate" style="color:var(--c-ink-3)">${tr.subjectsKeys.map((k) => t(k)).join(' · ')}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-1.5">${workloadChip(tr.workload)}${signalChip(tr.followUp)}</div>
    <div class="grid grid-cols-4 gap-2">${stats}</div>
    <a href="${teacherHref()}" class="btn btn-secondary btn-sm w-full">${icon('user', 'ico ico-sm')}<span>${t('trn.viewProfile')}</span></a>
  </div>`;
}

/* a follow-up queue row — a teacher needing follow-up, with context + a profile link */
function queueRow(tr, c) {
  return `<div class="people-row">
    ${avatar({ nameKey: tr.nameKey, accent: tr.accent, size: 'sm' })}
    <a href="${teacherHref()}" class="min-w-0 flex-1" style="text-decoration:none">
      <div class="font-bold text-[13.5px] text-ink truncate">${t(tr.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(tr.subjectsKeys[0])} · <span class="tabular">${num(c.teacherAbsent + c.studentAbsent)}</span> ${t('trn.ov.absence')}</div>
    </a>
    ${signalChip(tr.followUp)}
    <a href="${teacherHref()}" class="link-chip">${icon('user', 'ico')}<span>${t('trn.viewProfile')}</span></a>
  </div>`;
}

export function renderTeacherPerformance() {
  const data = TEACHERS.rows.map((tr) => ({ tr, c: teacherCounts(tr.id) }));
  const sum = (sel) => data.reduce((a, d) => a + sel(d.c), 0);
  const activeTeachers = TEACHERS.rows.filter((r) => r.statusId === 'active').length;

  const tiles = summaryCards([
    { icon: 'trainers', tone: 'primary', value: num(activeTeachers), labelKey: 'trn.board.tile.activeTeachers' },
    { icon: 'check-circle', tone: 'success', value: num(sum((c) => c.completed)), labelKey: 'trn.board.tile.completed' },
    { icon: 'user-x', tone: 'amber', value: num(sum((c) => c.teacherAbsent)), labelKey: 'trn.board.tile.teacherAbsent' },
    { icon: 'user-x', tone: 'coral', value: num(sum((c) => c.studentAbsent)), labelKey: 'trn.board.tile.studentAbsent' },
    { icon: 'x-circle', tone: 'sky', value: num(sum((c) => c.cancelled)), labelKey: 'trn.board.tile.cancelled' },
    { icon: 'students', tone: 'amber', value: num(GROUP_SUMMARY.needsAttention), labelKey: 'trn.board.tile.groupsAttention' },
    { icon: 'alert-triangle', tone: 'coral', value: num(TEACHERS_NEEDING_FOLLOWUP), labelKey: 'trn.board.tile.followup' },
  ], { cols: 'grid-cols-2 lg:grid-cols-4' });

  const filters = filterBar({
    targetId: 'perf-list', searchKey: 'trn.board.searchPh',
    selects: [
      { name: 'subject', labelKey: 'trn.ov.subjects', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
      { name: 'workload', labelKey: 'trn.fWorkload', options: [{ value: 'all', labelKey: 'filter.all' }, ...WORKLOAD_ORDER.map((v) => ({ value: v, labelKey: 'trn.workload.' + v }))] },
      { name: 'signal', labelKey: 'trn.fSignal', options: [{ value: 'all', labelKey: 'filter.all' }, ...SIGNAL_ORDER.map((v) => ({ value: v, labelKey: 'trn.signal.' + v }))] },
    ],
  });

  const queue = data.filter((d) => needsFollowUp(d.tr.followUp));
  const queueBody = queue.length
    ? queue.map((d) => queueRow(d.tr, d.c)).join('')
    : `<div class="empty-row">${t('trn.board.queueNone')}</div>`;

  return `
    ${pageHeader({ titleKey: 'trn.board.title', subKey: 'trn.board.sub', summaryHTML: tiles })}
    ${filters}
    <h2 class="section-title mb-3">${t('trn.board.compareTitle')}</h2>
    ${cardGrid(data.map((d) => perfRow(d.tr, d.c)), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'perf-list' })}
    ${noResults()}
    <section class="mt-8">
      <h2 class="section-title mb-3">${t('trn.board.queueTitle')}</h2>
      <div class="card p-2">${queueBody}</div>
    </section>
  `;
}
