/* Courses page (Spec 002 + Spec 006 enrich) — the subject-offering catalogue as a card
 * grid. Each card now carries the labeled course-status chip + academic counts (active
 * students · groups · teachers) + an upcoming-sessions hint + an optional attention hint
 * + a real "View course" link to the baked course profile (course.html). No course
 * builder, no CRUD, no enrolment engine. */
import { COURSES } from '../fixtures/courses.js';
import { COURSE_STATUS, courseStatusChip } from '../components/course-status.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { medallion, button } from '../components/ui.js';
import { attentionFlag } from '../components/attention-flag.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const LEVELS = ['foundation', 'l1', 'l2', 'l3', 'advanced'];
const courseHref = () => (getLang() === 'en' ? 'course.en.html' : 'course.html');

function card(c) {
  const lvl = c.levelKey.split('.').pop();
  return `<div class="dir-card is-hoverable" ${facetAttrs({ subject: c.subject, level: lvl, status: c.statusId, search: t(c.titleKey) })}>
    <div class="flex items-start justify-between gap-2">${medallion({ icon: c.icon, tone: c.accent, variant: 'soft' })}${courseStatusChip(c.statusId)}</div>
    <div><h3 class="font-bold text-ink text-[14.5px]">${t(c.titleKey)}</h3>
      <p class="text-[12.5px]" style="color:var(--c-ink-3)">${t(c.subjectKey)} · ${t(c.levelKey)}</p></div>
    <div class="crs-counts">
      <span><b>${num(c.studentsCount)}</b> ${t('crs.counts.students')}</span>
      <span><b>${num(c.groupsCount)}</b> ${t('crs.counts.groups')}</span>
      <span><b>${num(c.teachersCount)}</b> ${t('crs.counts.teachers')}</span>
    </div>
    ${c.upcoming ? `<div class="text-[12px] flex items-center gap-1.5" style="color:var(--c-ink-3)">${icon('calendar-clock', 'ico ico-sm')}<span>${t('crs.upcomingHint', { n: num(c.upcoming) })}</span></div>` : ''}
    ${c.attention ? attentionFlag(c.attention) : ''}
    <a href="${courseHref()}" class="btn btn-secondary btn-sm w-full" style="text-decoration:none">${icon('curricula', 'ico ico-sm')}<span>${t('crs.viewCourse')}</span></a>
  </div>`;
}

export function renderCourses() {
  const rows = COURSES.rows;
  const active = rows.filter((r) => r.statusId === 'active').length;
  const summary = summaryCards([
    { icon: 'curricula', tone: 'primary', value: num(rows.length), labelKey: 'cur.sum.total' },
    { icon: 'check-circle', tone: 'success', value: num(active), labelKey: 'cur.sum.active' },
    { icon: 'graduation-cap', tone: 'sky', value: num(LEVELS.length), labelKey: 'cur.sum.levels' },
  ], { cols: 'grid-cols-1 sm:grid-cols-3' });
  const filters = filterBar({
    targetId: 'courses-grid', searchKey: 'cur.searchPh',
    selects: [
      { name: 'subject', labelKey: 'cur.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
      { name: 'level', labelKey: 'cur.fLevel', options: [{ value: 'all', labelKey: 'filter.all' }, ...LEVELS.map((v) => ({ value: v, labelKey: 'data.crs.lvl.' + v }))] },
      { name: 'status', labelKey: 'cur.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(COURSE_STATUS).map((v) => ({ value: v, labelKey: COURSE_STATUS[v].labelKey }))] },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'cur.title', subKey: 'cur.sub', primary: button({ labelKey: 'crs.act.add', variant: 'primary', icon: 'plus', attrs: `data-demo-action data-toast="${t('crs.act.addToast')}"` }), summaryHTML: summary })}
    ${filters}
    ${cardGrid(rows.map(card), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'courses-grid' })}
    ${noResults()}
  `;
}
