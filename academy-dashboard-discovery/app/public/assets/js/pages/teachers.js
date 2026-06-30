/* Teachers page — admin directory (card grid), ENRICHED for Spec 007 with academic context:
 * a labeled teacher-status chip, courses/groups/active-students counts, an upcoming-sessions
 * hint, a workload hint, a conditional follow-up flag, and a real "View profile" link to
 * teacher.html. NOT a teacher dashboard/portal; no pay figures, no computed rating. */
import { TEACHERS, TEACHER_AVAIL } from '../fixtures/teachers.js';
import { teacherCounts } from '../fixtures/teacher-links.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { directoryCard, statMini } from '../components/directory-card.js';
import { avatar } from '../components/ui.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';
import { teacherStatusChip, TEACHER_STATUS_ORDER } from '../components/teacher-status.js';
import { workloadChip, signalChip, needsFollowUp, WORKLOAD_ORDER } from '../components/teacher-signals.js';
import { addTeacherAction } from '../components/teacher-actions.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const teacherHref = () => (getLang() === 'en' ? 'teacher.en.html' : 'teacher.html');

function card(tr) {
  const c = teacherCounts(tr.id);
  const subj = tr.subjectsKeys.map((k) => `<span class="chip tone-neutral">${t(k)}</span>`).join('');
  const flag = needsFollowUp(tr.followUp) ? signalChip(tr.followUp) : '';
  const upcoming = c.upcoming > 0
    ? `<span class="chip tone-upcoming">${icon('schedule', 'ico')}<span>${t('trn.upcomingHint', { n: num(c.upcoming) })}</span></span>`
    : `<span class="chip tone-neutral">${icon('clock', 'ico')}<span>${t('trn.noSessions')}</span></span>`;
  const tags = subj + workloadChip(tr.workload) + flag + upcoming;
  const stats = statMini(num(c.courses), 'trn.counts.courses') + statMini(num(c.groups), 'trn.counts.groups') + statMini(num(c.students), 'trn.counts.students');
  const search = `${t(tr.nameKey)} ${tr.subjectsKeys.map((k) => t(k)).join(' ')}`;
  return directoryCard({
    rootAttrs: facetAttrs({ availability: tr.avail, subject: tr.primary, status: tr.statusId, workload: tr.workload, search }),
    avatarHTML: avatar({ nameKey: tr.nameKey, accent: tr.accent }),
    name: t(tr.nameKey), subtitle: tr.subjectsKeys.map((k) => t(k)).join(' · '),
    statusHTML: teacherStatusChip(tr.statusId),
    tagsHTML: tags, statsHTML: stats, drawerId: tr.id,
    ctaHref: teacherHref(), ctaKey: 'trn.viewProfile', ctaIcon: 'user',
  });
}

function preview(tr) {
  const av = TEACHER_AVAIL[tr.avail];
  const c = teacherCounts(tr.id);
  const body = `
    <div class="flex items-center gap-3 mb-4">${avatar({ nameKey: tr.nameKey, accent: tr.accent })}
      <div><div class="font-bold text-ink">${t(tr.nameKey)}</div>${teacherStatusChip(tr.statusId)}</div></div>
    <p class="text-[13px] mb-4" style="color:var(--c-ink-2)">${t(tr.bioKey)}</p>
    ${sheetRow(t('trn.ov.workload'), workloadChip(tr.workload))}
    ${sheetRow(t('trn.subjects'), tr.subjectsKeys.map((k) => t(k)).join(' · '))}
    ${sheetRow(t('trn.counts.courses'), `<span class="tabular">${num(c.courses)}</span>`)}
    ${sheetRow(t('trn.counts.groups'), `<span class="tabular">${num(c.groups)}</span>`)}
    ${sheetRow(t('trn.counts.students'), `<span class="tabular">${num(c.students)}</span>`)}
    ${sheetRow(t('trn.perf.sessions'), `<span class="tabular">${num(tr.sessions)}</span>`)}
    ${sheetRow(t('trn.perf.hours'), `<span class="tabular">${num(tr.hours)}</span>`)}`;
  return previewTemplate(tr.id, { title: t('trn.detailsTitle'), headIcon: 'trainers', tone: 'primary', bodyHTML: body });
}

export function renderTeachers() {
  const rows = TEACHERS.rows;
  const available = rows.filter((r) => r.avail === 'available').length;
  const avgUtil = Math.round(rows.reduce((a, r) => a + r.util, 0) / rows.length);
  const summary = summaryCards([
    { icon: 'trainers', tone: 'primary', value: num(rows.length), labelKey: 'trn.sum.total' },
    { icon: 'check-circle', tone: 'success', value: num(available), labelKey: 'trn.sum.available' },
    { icon: 'trending-up', tone: 'teal', value: `${num(avgUtil)}%`, labelKey: 'trn.sum.util' },
  ], { cols: 'grid-cols-1 sm:grid-cols-3' });
  const filters = filterBar({
    targetId: 'teachers-grid', searchKey: 'trn.searchPh',
    selects: [
      { name: 'subject', labelKey: 'trn.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
      { name: 'status', labelKey: 'trn.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...TEACHER_STATUS_ORDER.map((v) => ({ value: v, labelKey: 'trn.status.' + v }))] },
      { name: 'workload', labelKey: 'trn.fWorkload', options: [{ value: 'all', labelKey: 'filter.all' }, ...WORKLOAD_ORDER.map((v) => ({ value: v, labelKey: 'trn.workload.' + v }))] },
      { name: 'availability', labelKey: 'trn.fAvail', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(TEACHER_AVAIL).map((v) => ({ value: v, labelKey: TEACHER_AVAIL[v].labelKey }))] },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'trn.title', subKey: 'trn.sub', primary: addTeacherAction(), summaryHTML: summary })}
    ${filters}
    ${cardGrid(rows.map(card), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'teachers-grid' })}
    ${noResults()}
    ${rows.map(preview).join('')}
  `;
}
