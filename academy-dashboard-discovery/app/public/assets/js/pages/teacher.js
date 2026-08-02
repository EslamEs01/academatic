/* Teacher profile (Spec 007) — a baked, tabbed admin PAGE (NOT a portal, NOT a nav item;
 * activeId:'teachers', Django → teacher/<id>). Banner (status + availability + workload +
 * academic KPIs + honest actions) over baked tabs: Overview / Courses / Groups / Timetable /
 * Sessions & Outcomes / Students / Follow-up / Notes. Courses → course.html, Groups →
 * group.html, Students → student.html (+ family chip → family.html); Timetable REUSES the
 * Spec 003 scheduleAgenda + the schedule deep-link; Sessions & Outcomes REUSE the Spec 005
 * canonical outcome drawer + the attendance deep-link (teacherAbsent vs studentAbsent stay
 * DISTINCT). One representative teacher (sara) is baked. Display-only — NO teacher/assignment/
 * attendance engine, no computed rating, none of the excluded legacy fieldset (see
 * must-omit contract). */
import { TEACHER_BY_ID, TEACHERS, TEACHER_AVAIL } from '../fixtures/teachers.js';
import { COURSE_BY_ID } from '../fixtures/courses.js';
import { familyOf } from '../fixtures/families.js';
import { coursesOfTeacher, groupsOfTeacher, studentsOfTeacher, scheduleOfTeacher, teacherCounts, outcomesOfTeacher } from '../fixtures/teacher-links.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar, chip, medallion, button } from '../components/ui.js';
import { profileBanner } from '../components/profile-banner.js';
import { tabs } from '../components/tabs.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { ASSIGN_COURSES, ASSIGN_GROUPS, AVAILABILITY_WINDOWS, TEACHER_CAPABILITY_POLICY } from '../fixtures/teacher-management.js';
import { teacherStatusChip } from '../components/teacher-status.js';
import { workloadChip, signalChip, needsFollowUp } from '../components/teacher-signals.js';
import { teacherActions, teacherEditDrawer, teacherNoteDrawer } from '../components/teacher-actions.js';
import { courseStatusChip } from '../components/course-status.js';
import { groupStatusChip } from '../components/group-status.js';
import { outcomeChip } from '../components/outcome-status.js';
import { blocksOf, outcomesOf, cohortTimetablePanel, cohortOutcomesPanel, cohortTemplates } from '../components/cohort-panels.js';

const AVAIL_ICON = { available: 'user-check', busy: 'calendar-clock', off: 'moon' };
const courseHref = () => (getLang() === 'en' ? 'course.en.html' : 'course.html');
const groupHref = () => (getLang() === 'en' ? 'group.en.html' : 'group.html');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');
const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');
const teachersHref = () => (getLang() === 'en' ? 'teachers.en.html' : 'teachers.html');
const attHref = () => (getLang() === 'en' ? 'attendance.en.html' : 'attendance.html');
const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');

const list = (html, emptyKey) => (html || `<div class="empty-row">${t(emptyKey)}</div>`);

/* ---- Courses tab rows ---- */
function courseRow(c) {
  return `<a href="${courseHref()}" class="people-row" style="padding:14px;text-decoration:none">
    ${medallion({ icon: c.icon, tone: c.accent, variant: 'soft' })}
    <div class="min-w-0 flex-1"><div class="font-bold text-[14px] text-ink truncate">${t(c.titleKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(c.subjectKey)} · ${t(c.levelKey)}</div></div>
    ${courseStatusChip(c.statusId)}${icon('chevronEnd', 'ico')}
  </a>`;
}
/* ---- Groups tab cards ---- */
function groupRow(g) {
  const course = COURSE_BY_ID[g.courseId];
  return `<a href="${groupHref()}" class="people-row" style="padding:14px;text-decoration:none">
    ${medallion({ icon: 'students', tone: g.accent, variant: 'soft' })}
    <div class="min-w-0 flex-1"><div class="font-bold text-[14px] text-ink truncate">${t(g.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${course ? t(course.titleKey) + ' · ' : ''}${t(g.levelKey)} · <span class="tabular">${num(g.enrolledCount)}/${num(g.capacity)}</span></div></div>
    ${groupStatusChip(g.statusId)}${icon('chevronEnd', 'ico')}
  </a>`;
}
/* ---- Students tab rows ---- */
function studentRow(st) {
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

/* ---- Overview tab ---- */
function overviewPanel(teacher, counts) {
  const av = TEACHER_AVAIL[teacher.avail];
  const snapshot = `<div class="info-card">
    <div class="ic-title">${icon('trainers', 'ico')}<span>${t('trn.ov.title')}</span></div>
    ${sheetRow(t('trn.ov.subjects'), teacher.subjectsKeys.map((k) => t(k)).join(' · '))}
    ${sheetRow(t('trn.ov.status'), teacherStatusChip(teacher.statusId))}
    ${sheetRow(t('trn.ov.availability'), chip({ labelKey: av.labelKey, tone: av.tone, icon: AVAIL_ICON[teacher.avail] }))}
    ${sheetRow(t('trn.ov.workload'), workloadChip(teacher.workload))}
    ${sheetRow(t('trn.ov.courses'), `<span class="tabular">${num(counts.courses)}</span>`)}
    ${sheetRow(t('trn.ov.groups'), `<span class="tabular">${num(counts.groups)}</span>`)}
    ${sheetRow(t('trn.ov.students'), `<span class="tabular">${num(counts.students)}</span>`)}
  </div>`;
  // absence summary — teacherAbsent and studentAbsent are TWO DISTINCT labeled facts, never one "absences"
  const absence = `<div class="info-card">
    <div class="ic-title">${icon('clipboard-check', 'ico')}<span>${t('trn.ov.absence')}</span></div>
    ${sheetRow(t('trn.ov.completed'), `<span class="tabular">${num(counts.completed)}</span>`)}
    ${sheetRow(outcomeChip('teacherAbsent'), `<span class="tabular">${num(counts.teacherAbsent)}</span>`)}
    ${sheetRow(outcomeChip('studentAbsent'), `<span class="tabular">${num(counts.studentAbsent)}</span>`)}
    ${sheetRow(t('trn.ov.cancelled'), `<span class="tabular">${num(counts.cancelled)}</span>`)}
    ${needsFollowUp(teacher.followUp) ? `<div class="mt-2">${signalChip(teacher.followUp)}</div>` : ''}
    <div class="flex flex-wrap gap-3 mt-3">
      <a href="${schedHref()}" class="link-more">${t('trn.act.openTimetable')} ${icon('arrow-left', 'ico ico-sm')}</a>
      <a href="${attHref()}" class="link-more">${t('trn.act.viewAttendance')} ${icon('arrow-left', 'ico ico-sm')}</a>
    </div>
  </div>`;
  return `<div class="grid gap-4 sm:grid-cols-2">${snapshot}${absence}</div>
    <div class="flex flex-wrap gap-2 mt-4">${button({ labelKey: 'trn.policy.open', variant: 'secondary', size: 'sm', icon: 'lock', attrs: 'data-drawer="trn-policy"' })}</div>`;
}

/* ---- Follow-up tab ---- */
function followupRow(o) {
  const fam = familyOf(o.familyId);
  return `<div class="people-row">
    ${medallion({ icon: 'alert-triangle', tone: 'amber', variant: 'soft' })}
    <div class="min-w-0 flex-1">
      <div class="font-bold text-[13.5px] text-ink truncate">${t(o.titleKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(o.dateKey)} · <span class="tabular" dir="ltr">${esc(o.time)}</span></div>
    </div>
    ${outcomeChip(o.outcomeId)}
    <a href="${studentHref()}" class="link-chip">${icon('user', 'ico')}<span>${t('trn.viewStudent')}</span></a>
    ${fam ? `<a href="${familyHref()}" class="link-chip">${icon('families', 'ico')}<span>${t(fam.guardian.nameKey)}</span></a>` : ''}
  </div>`;
}

/* Spec 028 — assign-course / assign-group picker (M-F/M-G from the teacher profile): a
 * display-only candidate list in a baked <template data-preview> drawer + a backendRequired
 * final gate. No assignment, no roster/schedule mutation, no rate figure. */
function pickerDrawer(id, { titleKey, hintKey, candidates, ctaKey, reasonKey, headIcon }) {
  const items = candidates.map((c) => sheetRow(t(c.nameKey), t(c.metaKey))).join('');
  const body = `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t(hintKey)}</p>
    ${items}
    <button type="button" class="btn btn-primary btn-sm w-full" style="margin-top:14px" data-disabled-reason data-reason-key="${reasonKey}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon('check', 'ico ico-sm')}<span>${t(ctaKey)}</span></button>`;
  return previewTemplate(id, { titleKey, headIcon, tone: 'primary', bodyHTML: body });
}
/* Spec 028 — availability-window editor (M-J): display-only weekly day/time windows + an
 * Add/Update/Delete backendRequired gate. NO invented recurrence, NO fake schedule mutation. */
function availabilityDrawer() {
  const rows = AVAILABILITY_WINDOWS.map((w) => sheetRow(`${t(w.dayFromKey)}–${t(w.dayToKey)}`, `<span class="tabular" dir="ltr">${esc(w.timeFrom)}–${esc(w.timeTo)}</span>`)).join('');
  const body = `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('trn.availEdit.hint')}</p>
    ${rows}
    <button type="button" class="btn btn-primary btn-sm w-full" style="margin-top:14px" data-disabled-reason data-reason-key="trn.availEdit.reason" aria-disabled="true" title="${esc(t('trn.availEdit.reason'))}">${icon('plus', 'ico ico-sm')}<span>${t('trn.availEdit.add')}</span></button>`;
  return previewTemplate('trn-availability', { titleKey: 'trn.availEdit.title', headIcon: 'schedule', tone: 'primary', bodyHTML: body });
}
/* Spec 043 — teacher capability/notification POLICY preview (C02-04/C02-05): a structure-only drawer
 * mirroring availabilityDrawer(). Academic capabilities + non-pay notification channels, display-only
 * (no toggle, no value slot, no enforcement/delivery claim). The legacy salary_* row is EXCLUDED
 * (teacher pay-free); no guardian/student contact, no locality. Real capability authorization and
 * channel delivery stay FUTURE_BACKEND. */
function capabilityPolicyDrawer() {
  const cap = TEACHER_CAPABILITY_POLICY.academic.map((c) => {
    const on = c.status === 'on';
    return sheetRow(t('trn.policy.cap.' + c.k), `<span class="perm-item">${icon(on ? 'check-circle' : 'x-circle', 'ico ico-sm')}<span>${t(on ? 'trn.policy.granted' : 'trn.policy.notGranted')}</span></span>`);
  }).join('');
  const comm = TEACHER_CAPABILITY_POLICY.comm.map((e) => sheetRow(t('trn.policy.ev.' + e.k), e.channels.map((ch) => t('trn.policy.ch.' + ch)).join(' · '))).join('');
  const body = `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('trn.policy.note')}</p>
    <div class="ic-title" style="margin-top:4px">${icon('trainers', 'ico')}<span>${t('trn.policy.academicTitle')}</span></div>
    ${cap}
    <div class="ic-title" style="margin-top:12px">${icon('bell', 'ico')}<span>${t('trn.policy.commTitle')}</span></div>
    ${comm}
    <button type="button" class="btn btn-primary btn-sm w-full" style="margin-top:14px" data-disabled-reason data-reason-key="trn.policy.reason" aria-disabled="true" title="${esc(t('trn.policy.reason'))}">${icon('lock', 'ico ico-sm')}<span>${t('trn.policy.edit')}</span></button>`;
  return previewTemplate('trn-policy', { titleKey: 'trn.policy.title', headIcon: 'lock', tone: 'violet', bodyHTML: body });
}

export function renderTeacher() {
  const teacher = TEACHER_BY_ID.sara || TEACHERS.rows[0];
  const counts = teacherCounts(teacher.id);
  const av = TEACHER_AVAIL[teacher.avail];
  const courses = coursesOfTeacher(teacher.id);
  const groups = groupsOfTeacher(teacher.id);
  const students = studentsOfTeacher(teacher.id);
  const blocks = blocksOf(scheduleOfTeacher(teacher.id).map((b) => b.id));
  const outs = outcomesOfTeacher(teacher.id);
  const outcomes = outcomesOf(outs.map((o) => o.id));
  const followups = outs.filter((o) => o.followUp);

  const subjectChips = teacher.subjectsKeys.map((k) => chip({ label: t(k), tone: 'neutral', icon: 'graduation-cap' })).join('');

  const banner = profileBanner({
    avatarHTML: medallion({ icon: 'trainers', tone: teacher.accent, variant: 'soft', size: 'lg' }),
    name: t(teacher.nameKey),
    statusHTML: teacherStatusChip(teacher.statusId),
    metaHTML: subjectChips
      + chip({ labelKey: av.labelKey, tone: av.tone, icon: AVAIL_ICON[teacher.avail] })
      + workloadChip(teacher.workload),
    kpis: [
      { value: num(counts.courses), labelKey: 'trn.kpi.courses' },
      { value: num(counts.groups), labelKey: 'trn.kpi.groups' },
      { value: num(counts.students), labelKey: 'trn.kpi.students' },
      { value: num(counts.upcoming), labelKey: 'trn.kpi.upcoming' },
    ],
    actionsHTML: teacherActions(teacher, { schedHref: schedHref(), attHref: attHref() }),
  });

  const views = tabs({
    group: 'teacher', ariaKey: 'trn.tab.overview',
    items: [
      { id: 'overview', labelKey: 'trn.tab.overview', icon: 'trainers' },
      { id: 'courses', labelKey: 'trn.tab.courses', icon: 'curricula' },
      { id: 'groups', labelKey: 'trn.tab.groups', icon: 'students' },
      { id: 'timetable', labelKey: 'trn.tab.timetable', icon: 'schedule' },
      { id: 'sessions-outcomes', labelKey: 'trn.tab.sessions', icon: 'clipboard-check' },
      { id: 'students', labelKey: 'trn.tab.students', icon: 'user' },
      { id: 'follow-up', labelKey: 'trn.tab.followup', icon: 'alert-triangle' },
      { id: 'notes', labelKey: 'trn.tab.notes', icon: 'file-text' },
    ],
    panels: {
      overview: overviewPanel(teacher, counts),
      courses: list(courses.map(courseRow).join(''), 'trn.none.courses'),
      groups: list(groups.map(groupRow).join(''), 'trn.none.groups'),
      timetable: cohortTimetablePanel(blocks, { titleKey: 'trn.tab.timetable' }) + `<div class="flex flex-wrap gap-2 mt-4">${button({ labelKey: 'trn.availEdit.open', variant: 'secondary', size: 'sm', icon: 'schedule', attrs: 'data-drawer="trn-availability"' })}</div>`,
      'sessions-outcomes': cohortOutcomesPanel(outcomes, { titleKey: 'trn.tab.sessions' }),
      students: list(students.map(studentRow).join(''), 'trn.none.students'),
      'follow-up': list(followups.map(followupRow).join(''), 'trn.none.followup'),
      notes: `<div class="info-card"><div class="ic-title">${icon('file-text', 'ico')}<span>${t('trn.tab.notes')}</span></div><p class="narrative">${t(teacher.notesKey)}</p></div>`,
    },
  });

  const pickers =
    pickerDrawer('trn-assign-course', { titleKey: 'trn.assignC.title', hintKey: 'trn.assignC.hint', candidates: ASSIGN_COURSES, ctaKey: 'trn.assignC.cta', reasonKey: 'trn.reason.assign', headIcon: 'curricula' })
    + pickerDrawer('trn-assign-group', { titleKey: 'trn.assignG.title', hintKey: 'trn.assignG.hint', candidates: ASSIGN_GROUPS, ctaKey: 'trn.assignG.cta', reasonKey: 'trn.reason.assign', headIcon: 'students' })
    + availabilityDrawer()
    + capabilityPolicyDrawer();

  /* Spec 032 — form drawers for the banner Edit/Add-note triggers (baked once per page) */
  const forms = teacherEditDrawer() + teacherNoteDrawer();

  return `${banner}${views}${cohortTemplates(blocks, outcomes)}${pickers}${forms}`;
}
