/* Course profile (Spec 006, US3/US5/US7/US8) — a baked, tabbed PAGE (NOT a portal, NOT a
 * nav item; activeId:'courses', Django → course/<id>). Banner (subject + level + labeled
 * course-status + counts + honest actions) over baked tabs: Overview / Groups / Students /
 * Teachers / Timetable / Outcomes / Learning Path / Notes. Groups → group.html, Students →
 * student.html; Timetable reuses scheduleAgenda + the schedule deep-link; Outcomes reuse
 * the canonical outcome drawer + the attendance deep-link; Learning Path is display-only.
 * One representative course (c1) is baked. NO curriculum builder, NO enrolment engine. */
import { COURSE_BY_ID, COURSES } from '../fixtures/courses.js';
import { groupsOfCourse } from '../fixtures/groups.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar, chip, medallion } from '../components/ui.js';
import { profileBanner } from '../components/profile-banner.js';
import { tabs } from '../components/tabs.js';
import { sheetRow } from '../components/preview-drawer.js';
import { courseStatusChip } from '../components/course-status.js';
import { groupStatusChip } from '../components/group-status.js';
import { familyStatusChip } from '../components/family-status.js';
import { attentionFlag } from '../components/attention-flag.js';
import { learningPath } from '../components/learning-path.js';
import { courseActions } from '../components/course-group-actions.js';
import { blocksOf, outcomesOf, cohortTimetablePanel, cohortOutcomesPanel, cohortTemplates } from '../components/cohort-panels.js';

const TEACHER_BY_ID = Object.fromEntries(TEACHERS.rows.map((x) => [x.id, x]));
const groupHref = () => (getLang() === 'en' ? 'group.en.html' : 'group.html');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');
const teachersHref = () => (getLang() === 'en' ? 'teachers.en.html' : 'teachers.html');
const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');
const attHref = () => (getLang() === 'en' ? 'attendance.en.html' : 'attendance.html');

function groupMiniRow(g) {
  const tt = TEACHER_BY_ID[g.teacherId];
  return `<a href="${groupHref()}" class="people-row">
    ${avatar({ nameKey: tt ? tt.nameKey : g.nameKey, accent: g.accent, size: 'sm' })}
    <div class="min-w-0 flex-1">
      <div class="font-bold text-[13.5px] text-ink truncate">${t(g.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${tt ? t(tt.nameKey) : ''} · ${t(g.levelKey)} · <span class="tabular">${num(g.enrolledCount)}/${num(g.capacity)}</span></div>
    </div>
    ${groupStatusChip(g.statusId)}${icon('chevronEnd', 'ico')}
  </a>`;
}
function studentMiniRow(st) {
  return `<a href="${studentHref()}" class="people-row">
    ${avatar({ nameKey: st.nameKey, accent: st.accent, size: 'sm' })}
    <div class="min-w-0 flex-1"><div class="font-bold text-[13.5px] text-ink truncate">${t(st.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(st.levelKey)}</div></div>
    ${familyStatusChip(st.statusId)}${icon('chevronEnd', 'ico')}
  </a>`;
}
function teacherMiniRow(tt) {
  return `<a href="${teachersHref()}" class="people-row">
    ${avatar({ nameKey: tt.nameKey, accent: tt.accent, size: 'sm' })}
    <div class="min-w-0 flex-1"><div class="font-bold text-[13.5px] text-ink truncate">${t(tt.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(tt.subjectsKeys[0])}</div></div>
    ${icon('chevronEnd', 'ico')}
  </a>`;
}
const list = (html, emptyKey) => (html || `<div class="empty-row">${t(emptyKey)}</div>`);

function overviewPanel(c, groups) {
  const facts = `<div class="info-card">
    <div class="ic-title">${icon('curricula', 'ico')}<span>${t('crs.ov.title')}</span></div>
    ${sheetRow(t('crs.ov.subject'), t(c.subjectKey))}
    ${sheetRow(t('crs.ov.level'), t(c.levelKey))}
    ${sheetRow(t('crs.ov.status'), courseStatusChip(c.statusId))}
    ${sheetRow(t('crs.ov.upcoming'), `<span class="tabular">${num(c.upcoming)}</span>`)}
  </div>`;
  const counts = `<div class="info-card">
    <div class="ic-title">${icon('students', 'ico')}<span>${t('crs.counts.students')}</span></div>
    ${sheetRow(t('crs.ov.students'), `<span class="tabular">${num(c.studentsCount)}</span>`)}
    ${sheetRow(t('crs.ov.groups'), `<span class="tabular">${num(c.groupsCount)}</span>`)}
    ${sheetRow(t('crs.ov.teachers'), `<span class="tabular">${num(c.teachersCount)}</span>`)}
  </div>`;
  const attn = c.attention ? `<div class="info-card" style="margin-top:16px"><div class="ic-title">${icon('alert-triangle', 'ico')}<span>${t('crs.ov.students')}</span></div>${attentionFlag(c.attention)}</div>` : '';
  return `<div class="grid gap-4 sm:grid-cols-2">${facts}${counts}</div>${attn}`;
}

export function renderCourse() {
  const c = COURSE_BY_ID.c1 || COURSES.rows[0];
  const groups = groupsOfCourse(c.id);
  const studentIds = [...new Set(groups.flatMap((g) => g.studentIds))];
  const students = studentIds.map((id) => STUDENT_BY_ID[id]).filter(Boolean);
  const teachers = c.teacherIds.map((id) => TEACHER_BY_ID[id]).filter(Boolean);
  const blocks = blocksOf(groups.flatMap((g) => g.scheduleBlockIds));
  const outcomes = outcomesOf(groups.flatMap((g) => g.outcomeIds));

  const banner = profileBanner({
    avatarHTML: medallion({ icon: c.icon, tone: c.accent, variant: 'soft', size: 'lg' }),
    name: t(c.titleKey),
    statusHTML: courseStatusChip(c.statusId),
    metaHTML: chip({ label: t(c.subjectKey), tone: 'neutral', icon: 'curricula' }) + chip({ label: t(c.levelKey), tone: 'neutral', icon: 'graduation-cap' }),
    kpis: [
      { value: num(c.studentsCount), labelKey: 'crs.counts.students' },
      { value: num(c.groupsCount), labelKey: 'crs.counts.groups' },
      { value: num(c.teachersCount), labelKey: 'crs.counts.teachers' },
      { value: num(c.sessions), labelKey: 'fam.kpi.sessions' },
    ],
    actionsHTML: courseActions(c, { schedHref: schedHref(), attHref: attHref() }),
  });

  const views = tabs({
    group: 'course', ariaKey: 'crs.tab.overview',
    items: [
      { id: 'overview', labelKey: 'crs.tab.overview', icon: 'curricula' },
      { id: 'groups', labelKey: 'crs.tab.groups', icon: 'students' },
      { id: 'students', labelKey: 'crs.tab.students', icon: 'user' },
      { id: 'teachers', labelKey: 'crs.tab.teachers', icon: 'trainers' },
      { id: 'timetable', labelKey: 'crs.tab.timetable', icon: 'schedule' },
      { id: 'outcomes', labelKey: 'crs.tab.outcomes', icon: 'clipboard-check' },
      { id: 'learningPath', labelKey: 'crs.tab.learningPath', icon: 'graduation-cap' },
      { id: 'notes', labelKey: 'crs.tab.notes', icon: 'file-text' },
    ],
    panels: {
      overview: overviewPanel(c, groups),
      groups: list(groups.map(groupMiniRow).join(''), 'crs.none.groups'),
      students: list(students.map(studentMiniRow).join(''), 'crs.none.students'),
      teachers: list(teachers.map(teacherMiniRow).join(''), 'crs.none.teachers'),
      timetable: cohortTimetablePanel(blocks, { titleKey: 'crs.tab.timetable' }),
      outcomes: cohortOutcomesPanel(outcomes, { titleKey: 'crs.tab.outcomes' }),
      learningPath: learningPath(c),
      notes: `<div class="info-card"><div class="ic-title">${icon('file-text', 'ico')}<span>${t('crs.tab.notes')}</span></div><p class="narrative">${t(c.notesKey)}</p></div>`,
    },
  });

  return `${banner}${views}${cohortTemplates(blocks, outcomes)}`;
}
