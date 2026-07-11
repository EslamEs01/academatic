/* Teacher Performance board (Spec 007 + Spec 036) — the promoted `teacherKpi` page
 * (activeId:'teacherKpi'), now a THREE-TAB display surface via the shared tabs() widget
 * (#view=): Overview (the original KPI/follow-up board) · Sessions KPI · Monthly
 * performance. Every tab is DISPLAY-ONLY — every number is a fixture count / resolved
 * list length; there is NO computed rating/score/rank/percentage, NO graph/canvas, and
 * NO pay/finance figure (teacher pay-free GLOBAL). Spec 036 folds the sessionsKpi +
 * monthlyPerf nav items here as tabs (no new page); the legacy "Classes KPI" / "Monthly
 * Performance" computed `Percentage` is deliberately NOT reproduced — authored counts +
 * categorical labels only. Overview keeps the existing client-side facet filter (the ONE
 * filterBar/noResults on the page); the two new tabs are static display boards (no filter)
 * to honor enhance.js's single global [data-no-results] contract without touching it. */
import { TEACHERS, TEACHERS_NEEDING_FOLLOWUP } from '../fixtures/teachers.js';
import { GROUP_SUMMARY } from '../fixtures/groups.js';
import { teacherCounts } from '../fixtures/teacher-links.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { statMini } from '../components/directory-card.js';
import { avatar, chip } from '../components/ui.js';
import { noResults } from '../components/states.js';
import { tabs } from '../components/tabs.js';
import { teacherStatusChip } from '../components/teacher-status.js';
import { workloadChip, signalChip, needsFollowUp, WORKLOAD_ORDER, SIGNAL_ORDER } from '../components/teacher-signals.js';
import {
  SESSIONS_KPI_LABELS, KPI_QUALITY, MONTHLY_ROWS, PERF_MONTHS, PERF_MONTH_ORDER, PERF_TRENDS,
} from '../fixtures/teacher-performance.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const teacherHref = () => (getLang() === 'en' ? 'teacher.en.html' : 'teacher.html');
const T_BY_ID = {};
TEACHERS.rows.forEach((tr) => { T_BY_ID[tr.id] = tr; });

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

/* ---- Overview tab = the original Spec-007 board (tiles + comparison + follow-up queue) ---- */
function overviewPanel() {
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
    ${tiles}
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

/* ---- Sessions KPI tab (Spec 036, display-only) — per-teacher authored session COUNTS +
 * a categorical quality label. NO computed percentage/score/rank, NO chart, NO pay. ---- */
const qualityChip = (id) => { const q = KPI_QUALITY[id] || KPI_QUALITY.onTrack; return chip({ labelKey: q.labelKey, tone: q.tone, icon: q.icon }); };
function kpiRow(tr) {
  const c = teacherCounts(tr.id);
  const qid = SESSIONS_KPI_LABELS[tr.id] || 'onTrack';
  const stats = statMini(num(c.completed), 'trn.board.row.completed')
    + statMini(num(c.teacherAbsent), 'trn.board.row.teacherAbsent')
    + statMini(num(c.studentAbsent), 'trn.board.row.studentAbsent')
    + statMini(num(c.groups), 'trn.board.row.groups');
  return `<div class="dir-card">
    <div class="flex items-start gap-3">
      ${avatar({ nameKey: tr.nameKey, accent: tr.accent })}
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2"><h3 class="font-bold text-ink text-[14px] truncate">${t(tr.nameKey)}</h3>${teacherStatusChip(tr.statusId)}</div>
        <p class="text-[12px] truncate" style="color:var(--c-ink-3)">${tr.subjectsKeys.map((k) => t(k)).join(' · ')}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-1.5">${qualityChip(qid)}</div>
    <div class="grid grid-cols-4 gap-2">${stats}</div>
    <a href="${teacherHref()}" class="btn btn-secondary btn-sm w-full">${icon('user', 'ico ico-sm')}<span>${t('trn.viewProfile')}</span></a>
  </div>`;
}
function sessionsKpiPanel() {
  return `
    <p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${esc(t('trn.sessKpi.sub'))}</p>
    <h2 class="section-title mb-3">${t('trn.sessKpi.title')}</h2>
    ${cardGrid(TEACHERS.rows.map(kpiRow), { cols: 'sm:grid-cols-2 xl:grid-cols-3' })}
  `;
}

/* ---- Monthly Performance tab (Spec 036, display-only, grouped by month) — authored month +
 * categorical trend + note. NO computed percentage/score/total, NO chart, NO pay. ---- */
const trendChip = (id) => { const tr = PERF_TRENDS[id] || PERF_TRENDS.steady; return chip({ labelKey: tr.labelKey, tone: tr.tone, icon: tr.icon }); };
function monthlyRow(r) {
  const tr = T_BY_ID[r.teacherId];
  if (!tr) return '';
  return `<div class="people-row">
    ${avatar({ nameKey: tr.nameKey, accent: tr.accent, size: 'sm' })}
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2"><span class="font-bold text-[13.5px] text-ink truncate">${t(tr.nameKey)}</span>${teacherStatusChip(tr.statusId)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${esc(t(r.noteKey))}</div>
    </div>
    ${trendChip(r.trendId)}
    <a href="${teacherHref()}" class="link-chip">${icon('user', 'ico')}<span>${t('trn.viewProfile')}</span></a>
  </div>`;
}
function monthlyPanel() {
  const sections = PERF_MONTH_ORDER.map((mid) => {
    const rows = MONTHLY_ROWS.filter((r) => r.monthId === mid);
    if (!rows.length) return '';
    return `<section class="mt-6 first:mt-0">
      <h3 class="section-title mb-3">${esc(t(PERF_MONTHS[mid].labelKey))}</h3>
      <div class="card p-2">${rows.map(monthlyRow).join('')}</div>
    </section>`;
  }).join('');
  return `
    <p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${esc(t('trn.monthly.sub'))}</p>
    ${sections}
  `;
}

export function renderTeacherPerformance() {
  const views = tabs({
    group: 'perf', ariaKey: 'trn.board.title',
    items: [
      { id: 'overview', labelKey: 'trn.board.tab.overview', icon: 'trending-up' },
      { id: 'sessions-kpi', labelKey: 'trn.board.tab.sessionsKpi', icon: 'clipboard-check' },
      { id: 'monthly', labelKey: 'trn.board.tab.monthly', icon: 'reports' },
    ],
    panels: {
      overview: overviewPanel(),
      'sessions-kpi': sessionsKpiPanel(),
      monthly: monthlyPanel(),
    },
  });
  return `
    ${pageHeader({ titleKey: 'trn.board.title', subKey: 'trn.board.sub' })}
    ${views}
  `;
}
