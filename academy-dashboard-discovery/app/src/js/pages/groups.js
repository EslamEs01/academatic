/* Groups directory page (Spec 006, US2) — the cohort layer. A page header + an "Add
 * group" demo + summary tiles that double as filters (reusing the Spec 005 data-filter-set
 * hook) + a six-facet filter bar (course/teacher/level/day/status/attention) + an airy
 * `.group-row` list, each linking to the baked group profile (group.html). NOT a
 * spreadsheet, NO group-management engine. */
import { GROUPS, GROUP_SUMMARY } from '../fixtures/groups.js';
import { COURSE_BY_ID } from '../fixtures/courses.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { GROUP_STATUS, GROUP_STATUS_ORDER } from '../components/group-status.js';
import { t, num, getLang } from '../i18n.js';
import { esc } from '../dom.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { groupRow } from '../components/group-row.js';
import { medallion, button } from '../components/ui.js';
import { noResults } from '../components/states.js';

const LEVELS = ['foundation', 'l1', 'l2', 'l3', 'advanced'];
const TEACHER_BY_ID = Object.fromEntries(TEACHERS.rows.map((x) => [x.id, x]));
const courseHref = () => (getLang() === 'en' ? 'course.en.html' : 'course.html');
const groupHref = () => (getLang() === 'en' ? 'group.en.html' : 'group.html');

/* resolve courseId → Course + teacherId → Teacher (build-time) for the row */
function enrich(g) {
  const c = COURSE_BY_ID[g.courseId];
  const teacher = TEACHER_BY_ID[g.teacherId];
  return {
    ...g,
    courseTitleKey: c ? c.titleKey : null, courseHref: courseHref(), groupHref: groupHref(),
    teacherNameKey: teacher ? teacher.nameKey : '', teacherAccent: teacher ? teacher.accent : 'violet',
  };
}

const TILES = [
  { key: 'active', icon: 'check-circle', tone: 'success', count: GROUP_SUMMARY.active, set: 'status:active' },
  { key: 'trial', icon: 'sparkles', tone: 'sky', count: GROUP_SUMMARY.trial, set: 'status:trial' },
  { key: 'attention', icon: 'alert-triangle', tone: 'amber', count: GROUP_SUMMARY.needsAttention, set: 'attention:1' },
];
function tile(x) {
  return `<button type="button" class="outcome-tile" data-filter-set="${x.set}" data-target="#groups-list">
    ${medallion({ icon: x.icon, tone: x.tone, variant: 'soft' })}
    <div class="min-w-0"><div class="ot-v">${num(x.count)}</div><div class="ot-l">${t('grp.tile.' + x.key)}</div></div>
  </button>`;
}

export function renderGroups() {
  const rows = GROUPS.rows;
  const items = rows.map(enrich);

  const teachers = []; const seenT = new Set();
  rows.forEach((g) => { if (!seenT.has(g.teacherId)) { seenT.add(g.teacherId); const tt = TEACHER_BY_ID[g.teacherId]; if (tt) teachers.push({ value: g.teacherId, labelKey: tt.nameKey }); } });
  const courses = []; const seenC = new Set();
  rows.forEach((g) => { if (!seenC.has(g.courseId)) { seenC.add(g.courseId); const c = COURSE_BY_ID[g.courseId]; if (c) courses.push({ value: g.courseId, labelKey: c.titleKey }); } });
  const days = [...new Set(rows.map((g) => g.schedule.dayId))];

  const filters = filterBar({
    targetId: 'groups-list', searchKey: 'grp.searchPh',
    selects: [
      { name: 'course', labelKey: 'grp.fCourse', options: [{ value: 'all', labelKey: 'grp.allCourses' }, ...courses] },
      { name: 'teacher', labelKey: 'grp.fTeacher', options: [{ value: 'all', labelKey: 'grp.allTeachers' }, ...teachers] },
      { name: 'level', labelKey: 'grp.fLevel', options: [{ value: 'all', labelKey: 'grp.allLevels' }, ...LEVELS.map((v) => ({ value: v, labelKey: 'data.crs.lvl.' + v }))] },
      { name: 'day', labelKey: 'grp.fDay', options: [{ value: 'all', labelKey: 'grp.allDays' }, ...days.map((d) => ({ value: d, labelKey: 'sch.day.' + d }))] },
      { name: 'status', labelKey: 'grp.fStatus', options: [{ value: 'all', labelKey: 'grp.allStatuses' }, ...GROUP_STATUS_ORDER.map((v) => ({ value: v, labelKey: GROUP_STATUS[v].labelKey }))] },
      { name: 'attention', labelKey: 'grp.fAttention', options: [{ value: 'all', labelKey: 'filter.all' }, { value: '1', labelKey: 'grp.needsAttentionOpt' }] },
    ],
  });

  return `
    ${pageHeader({ titleKey: 'grp.title', subKey: 'grp.sub', primary: button({ labelKey: 'grp.act.add', variant: 'primary', icon: 'plus', attrs: `data-demo-action data-toast="${esc(t('grp.act.addToast'))}"` }) })}
    <div class="outcome-tiles">${TILES.map(tile).join('')}</div>
    ${filters}
    <div id="groups-list">${items.map(groupRow).join('')}</div>
    ${noResults()}
  `;
}
