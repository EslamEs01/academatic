/* Timetable / Schedule page (الجدول الدراسي / Timetable).
 * Two baked tabs over the SAME fixture week: a calm day-grouped List/Agenda and a
 * hand-rolled weekly Timetable grid (NO calendar library). Filters (teacher /
 * subject / status / search) narrow BOTH panels; an admin teacher lens lives in
 * the teacher filter. Clicking any block opens the shared appointment drawer. */
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { t, getLang } from '../i18n.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { tabs } from '../components/tabs.js';
import { scheduleList } from '../components/schedule-list.js';
import { timetableGrid } from '../components/timetable-grid.js';
import { appointmentTemplate } from '../components/appointment-details.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const STATUSES = ['live', 'upcoming', 'completed', 'cancelled'];

function dateText(iso) {
  const locale = getLang() === 'ar' ? 'ar-EG' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(new Date(iso));
}

/* unique teachers across the week → the admin teacher-lens options */
function weekTeachers() {
  const seen = new Set(); const list = [];
  SCHEDULE_WEEK.forEach((d) => d.blocks.forEach((b) => {
    const id = b.trainer && b.trainer.id;
    if (id && !seen.has(id)) { seen.add(id); list.push({ id, nameKey: b.trainer.nameKey }); }
  }));
  return list;
}

/* normalize a schedule block → the shared appointment-drawer shape */
function apptItem(b, day) {
  return {
    id: b.id, titleKey: b.titleKey, statusId: b.statusId, start: b.start, end: b.end,
    trainer: b.trainer, students: b.students, familyKey: b.familyKey,
    subjectKey: `data.subj.${b.subject}`, levelKey: b.levelKey, roomKey: b.roomKey,
    roomLinkKey: b.roomLinkKey, attention: b.attention, dateKey: day.nameKey,
  };
}

export function renderSchedule() {
  const days = SCHEDULE_WEEK.map((d) => ({ ...d, dateText: dateText(d.dateISO) }));
  const teachers = weekTeachers();

  const filters = filterBar({
    targetId: 'schedule-views', searchKey: 'sch.searchPh',
    selects: [
      { name: 'teacher', labelKey: 'tt.teacherLabel', options: [{ value: 'all', labelKey: 'tt.allTeachers' }, ...teachers.map((x) => ({ value: x.id, labelKey: x.nameKey }))] },
      { name: 'subject', labelKey: 'sess.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
      { name: 'status', labelKey: 'sess.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...STATUSES.map((v) => ({ value: v, labelKey: 'status.' + v }))] },
    ],
  });

  const views = tabs({
    group: 'schedule', ariaKey: 'sch.tablistAria',
    items: [{ id: 'list', labelKey: 'tab.list' }, { id: 'timetable', labelKey: 'tab.timetable' }],
    panels: {
      list: scheduleList(days),
      timetable: timetableGrid(days),
    },
  });

  const templates = SCHEDULE_WEEK.flatMap((d) => d.blocks.map((b) => appointmentTemplate(apptItem(b, d)))).join('');

  return `
    ${pageHeader({ titleKey: 'sch.title', subKey: 'sch.sub' })}
    ${filters}
    <div id="schedule-views">${views}</div>
    ${noResults()}
    ${templates}
  `;
}
