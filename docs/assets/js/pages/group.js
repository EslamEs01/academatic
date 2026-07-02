/* Group profile (Spec 006, US4/US6/US7/US8) — a baked, tabbed PAGE (NOT a portal, NOT a
 * nav item; activeId:'groups', Django → group/<id>). Banner (group name + a course
 * chip-link + teacher + level + labeled group-status + students count + honest actions)
 * over baked tabs: Overview / Students / Timetable / Sessions & Outcomes / Teacher /
 * Course / Notes. Roster → student.html (+ family chip → family.html); Course → course.html;
 * Timetable reuses scheduleAgenda + the schedule deep-link; Sessions & Outcomes reuse the
 * canonical outcome drawer + the attendance deep-link. One representative group (grp1) is
 * baked. NO group/assignment/enrolment engine, NO attendance mutation. */
import { GROUP_BY_ID, GROUPS } from '../fixtures/groups.js';
import { COURSE_BY_ID } from '../fixtures/courses.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { familyOf } from '../fixtures/families.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar, chip, medallion } from '../components/ui.js';
import { profileBanner } from '../components/profile-banner.js';
import { tabs } from '../components/tabs.js';
import { sheetRow } from '../components/preview-drawer.js';
import { groupStatusChip } from '../components/group-status.js';
import { groupActions } from '../components/course-group-actions.js';
import { blocksOf, outcomesOf, cohortTimetablePanel, cohortOutcomesPanel, cohortTemplates } from '../components/cohort-panels.js';

const TEACHER_BY_ID = Object.fromEntries(TEACHERS.rows.map((x) => [x.id, x]));
const courseHref = () => (getLang() === 'en' ? 'course.en.html' : 'course.html');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');
const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');
const teachersHref = () => (getLang() === 'en' ? 'teachers.en.html' : 'teachers.html');
const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');
const attHref = () => (getLang() === 'en' ? 'attendance.en.html' : 'attendance.html');

function rosterRow(st) {
  const fam = familyOf(st.familyId);
  return `<div class="people-row">
    ${avatar({ nameKey: st.nameKey, accent: st.accent, size: 'sm' })}
    <a href="${studentHref()}" class="min-w-0 flex-1" style="text-decoration:none">
      <div class="font-bold text-[13.5px] text-ink truncate">${t(st.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(st.levelKey)}</div>
    </a>
    ${fam ? `<a href="${familyHref()}" class="link-chip">${icon('families', 'ico')}<span>${t(fam.guardian.nameKey)}</span></a>` : ''}
    ${icon('chevronEnd', 'ico')}
  </div>`;
}
const list = (html, emptyKey) => (html || `<div class="empty-row">${t(emptyKey)}</div>`);

function overviewPanel(g, course, teacher) {
  const facts = `<div class="info-card">
    <div class="ic-title">${icon('students', 'ico')}<span>${t('grp.ov.title')}</span></div>
    ${sheetRow(t('grp.ov.course'), course ? `<a href="${courseHref()}" class="link-more">${t(course.titleKey)}</a>` : '—')}
    ${sheetRow(t('grp.ov.teacher'), teacher ? t(teacher.nameKey) : '—')}
    ${sheetRow(t('grp.ov.level'), t(g.levelKey))}
    ${sheetRow(t('grp.ov.status'), groupStatusChip(g.statusId))}
  </div>`;
  const meta = `<div class="info-card">
    <div class="ic-title">${icon('schedule', 'ico')}<span>${t('grp.ov.schedule')}</span></div>
    ${sheetRow(t('grp.ov.students'), `<span class="tabular">${num(g.enrolledCount)}</span>`)}
    ${sheetRow(t('grp.ov.capacity'), `<span class="tabular">${num(g.capacity)}</span>`)}
    ${sheetRow(t('grp.ov.schedule'), `${t('sch.day.' + g.schedule.dayId)} · <span class="tabular" dir="ltr">${esc(g.schedule.time)}</span>`)}
  </div>`;
  return `<div class="grid gap-4 sm:grid-cols-2">${facts}${meta}</div>`;
}
function teacherPanel(teacher) {
  if (!teacher) return `<div class="empty-row">—</div>`;
  return `<a href="${teachersHref()}" class="people-row" style="padding:14px">
    ${avatar({ nameKey: teacher.nameKey, accent: teacher.accent })}
    <div class="min-w-0 flex-1"><div class="font-bold text-[14px] text-ink truncate">${t(teacher.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(teacher.subjectsKeys[0])}</div></div>
    ${chip({ labelKey: 'trn.avail.' + teacher.avail, tone: teacher.avail === 'available' ? 'completed' : teacher.avail === 'busy' ? 'amber' : 'neutral' })}${icon('chevronEnd', 'ico')}
  </a>`;
}
function coursePanel(course) {
  if (!course) return `<div class="empty-row">—</div>`;
  return `<a href="${courseHref()}" class="people-row" style="padding:14px">
    ${medallion({ icon: course.icon, tone: course.accent, variant: 'soft' })}
    <div class="min-w-0 flex-1"><div class="font-bold text-[14px] text-ink truncate">${t(course.titleKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(course.subjectKey)} · ${t(course.levelKey)}</div></div>
    ${icon('chevronEnd', 'ico')}
  </a>`;
}

export function renderGroup() {
  const g = GROUP_BY_ID.grp1 || GROUPS.rows[0];
  const course = COURSE_BY_ID[g.courseId];
  const teacher = TEACHER_BY_ID[g.teacherId];
  const students = g.studentIds.map((id) => STUDENT_BY_ID[id]).filter(Boolean);
  const blocks = blocksOf(g.scheduleBlockIds);
  const outcomes = outcomesOf(g.outcomeIds);

  const courseChip = course
    ? `<a href="${courseHref()}" class="chip tone-neutral" style="text-decoration:none">${icon('curricula', 'ico')}<span>${esc(t(course.titleKey))}</span></a>` : '';

  const banner = profileBanner({
    avatarHTML: medallion({ icon: 'students', tone: g.accent, variant: 'soft', size: 'lg' }),
    name: t(g.nameKey),
    statusHTML: groupStatusChip(g.statusId),
    metaHTML: courseChip + chip({ label: teacher ? t(teacher.nameKey) : '', tone: 'neutral', icon: 'trainers' }) + chip({ label: t(g.levelKey), tone: 'neutral', icon: 'graduation-cap' }),
    kpis: [
      { value: `${num(g.enrolledCount)}/${num(g.capacity)}`, labelKey: 'grp.ov.students' },
      { value: course ? t(course.subjectKey) : '—', labelKey: 'grp.ov.course' },
      { value: teacher ? t(teacher.nameKey) : '—', labelKey: 'grp.ov.teacher' },
      { value: num(blocks.length), labelKey: 'fam.kpi.sessions' },
    ],
    actionsHTML: groupActions(g, { schedHref: schedHref(), attHref: attHref() }),
  });

  const views = tabs({
    group: 'group', ariaKey: 'grp.tab.overview',
    items: [
      { id: 'overview', labelKey: 'grp.tab.overview', icon: 'students' },
      { id: 'students', labelKey: 'grp.tab.students', icon: 'user' },
      { id: 'timetable', labelKey: 'grp.tab.timetable', icon: 'schedule' },
      { id: 'sessions', labelKey: 'grp.tab.sessions', icon: 'clipboard-check' },
      { id: 'teacher', labelKey: 'grp.tab.teacher', icon: 'trainers' },
      { id: 'course', labelKey: 'grp.tab.course', icon: 'curricula' },
      { id: 'notes', labelKey: 'grp.tab.notes', icon: 'file-text' },
    ],
    panels: {
      overview: overviewPanel(g, course, teacher),
      students: list(students.map(rosterRow).join(''), 'grp.none.students'),
      timetable: cohortTimetablePanel(blocks, { titleKey: 'grp.tab.timetable' }),
      sessions: cohortOutcomesPanel(outcomes, { titleKey: 'grp.tab.sessions' }),
      teacher: teacherPanel(teacher),
      course: coursePanel(course),
      notes: `<div class="info-card"><div class="ic-title">${icon('file-text', 'ico')}<span>${t('grp.tab.notes')}</span></div><p class="narrative">${t(g.notesKey)}</p></div>`,
    },
  });

  return `${banner}${views}${cohortTemplates(blocks, outcomes)}`;
}
