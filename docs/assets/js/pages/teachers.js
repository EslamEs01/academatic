/* Teachers page — admin directory (card grid), ENRICHED for Spec 007 with academic context:
 * a labeled teacher-status chip, courses/groups/active-students counts, an upcoming-sessions
 * hint, a workload hint, a conditional follow-up flag, and a real "View profile" link to
 * teacher.html. NOT a teacher dashboard/portal; no pay figures, no computed rating. */
import { TEACHERS, TEACHER_AVAIL } from '../fixtures/teachers.js';
import { teacherCounts } from '../fixtures/teacher-links.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { directoryCard, statMini } from '../components/directory-card.js';
import { avatar, button } from '../components/ui.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { TEACHER_CATEGORIES } from '../fixtures/teacher-management.js';
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
    menuId: tr.id, menuKind: 'teacher',
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

/* Spec 028 — teacher-categories (M-K): a display-only category list + a Create-category modal +
 * an assign-members backendRequired gate, in a baked <template data-preview="trn-categories">
 * drawer reached from the header. The teacherCategories nav item stays planned — no page. */
function categoriesDrawer() {
  const rows = TEACHER_CATEGORIES.map((c) => sheetRow(t(c.nameKey), t('trn.cat.members', { n: num(c.count) }))).join('');
  const body = `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('trn.cat.hint')}</p>
    ${rows}
    <div class="flex flex-wrap gap-2 mt-4">
      ${button({ labelKey: 'trn.cat.createTitle', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-modal-trigger data-modal-title-key="trn.cat.createTitle" data-modal-note-key="common.backendRequiredNote"' })}
      <button type="button" class="btn btn-primary btn-sm" data-disabled-reason data-reason-key="trn.cat.assignReason" aria-disabled="true" title="${esc(t('trn.cat.assignReason'))}">${icon('user-check', 'ico ico-sm')}<span>${t('trn.cat.assign')}</span></button>
    </div>`;
  return previewTemplate('trn-categories', { titleKey: 'trn.cat.title', headIcon: 'filter', tone: 'primary', bodyHTML: body });
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
    ${pageHeader({ titleKey: 'trn.title', subKey: 'trn.sub', secondary: button({ labelKey: 'trn.cat.manage', variant: 'secondary', size: 'sm', icon: 'filter', attrs: 'data-drawer="trn-categories"' }), primary: addTeacherAction(), summaryHTML: summary })}
    ${filters}
    ${cardGrid(rows.map(card), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'teachers-grid' })}
    ${noResults()}
    ${rows.map(preview).join('')}
    ${categoriesDrawer()}
  `;
}
