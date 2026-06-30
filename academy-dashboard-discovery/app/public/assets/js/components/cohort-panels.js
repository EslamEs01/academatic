/* Shared cohort tab panels (Spec 006) — the Timetable and Sessions&Outcomes tabs reused
 * by BOTH the course profile and the group profile. Timetable REUSES the Spec 003
 * scheduleAgenda + appointmentTemplate drawer + a schedule.html#view=timetable deep-link;
 * Outcomes REUSES the Spec 005 outcomeRow + the canonical outcomeTemplate drawer + an
 * attendance.html deep-link. NO new timetable/outcome builder is introduced (SC-009).
 * Resolution is display-only (block/outcome id lists → existing fixtures). */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { familyOf } from '../fixtures/families.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { scheduleAgenda } from './schedule-agenda.js';
import { appointmentTemplate } from './appointment-details.js';
import { outcomeRow } from './outcome-row.js';
import { outcomeTemplate } from './outcome-details.js';

const BLOCK_BY_ID = {};
SCHEDULE_WEEK.forEach((d) => d.blocks.forEach((b) => { BLOCK_BY_ID[b.id] = { ...b, dayNameKey: d.nameKey }; }));

const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');
const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');
const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');
const attHref = () => (getLang() === 'en' ? 'attendance.en.html' : 'attendance.html');

export function blocksOf(blockIds) {
  return [...new Set(blockIds || [])].map((id) => BLOCK_BY_ID[id]).filter(Boolean);
}
function apptItem(b) {
  return {
    id: b.id, titleKey: b.titleKey, statusId: b.statusId, start: b.start, end: b.end,
    trainer: b.trainer, students: b.students, subjectKey: `data.subj.${b.subject}`,
    levelKey: b.levelKey, roomKey: b.roomKey, roomLinkKey: b.roomLinkKey, attention: b.attention, dateKey: b.dayNameKey,
  };
}
function enrichOutcome(o) {
  const st = STUDENT_BY_ID[o.studentId];
  const fam = familyOf(o.familyId);
  return {
    ...o,
    studentNameKey: st ? st.nameKey : null, studentAccent: st ? st.accent : 'violet', studentHref: studentHref(),
    familyKey: fam ? fam.guardian.nameKey : null, familyHref: familyHref(),
  };
}
export function outcomesOf(outcomeIds) {
  return [...new Set(outcomeIds || [])].map((id) => OUTCOME_BY_ID[id]).filter(Boolean).map(enrichOutcome);
}

/** Timetable tab body — reuses Spec 003 scheduleAgenda + the schedule deep-link */
export function cohortTimetablePanel(blocks, { titleKey = 'grp.tab.timetable' } = {}) {
  const link = `<a href="${schedHref()}" class="link-more">${t('grp.viewInSchedule')} ${icon('arrow-left', 'ico ico-sm')}</a>`;
  const body = blocks.length ? scheduleAgenda(blocks) : `<div class="empty-row">${t('grp.none.sessions')}</div>`;
  return `<div class="flex items-center justify-between gap-3 mb-3"><h2 class="section-title">${t(titleKey)}</h2>${link}</div>${body}`;
}
/** Outcomes/Sessions tab body — reuses Spec 005 outcomeRow + the canonical drawer */
export function cohortOutcomesPanel(items, { titleKey = 'grp.tab.sessions' } = {}) {
  const link = `<a href="${attHref()}" class="link-more">${t('grp.viewAttendance')} ${icon('arrow-left', 'ico ico-sm')}</a>`;
  const body = items.length ? items.map(outcomeRow).join('') : `<div class="empty-row">${t('grp.none.sessions')}</div>`;
  return `<div class="flex items-center justify-between gap-3 mb-3"><h2 class="section-title">${t(titleKey)}</h2>${link}</div>${body}`;
}
/** the baked <template> drawers both panels reference (appointment + canonical outcome) */
export function cohortTemplates(blocks, items) {
  return blocks.map((b) => appointmentTemplate(apptItem(b))).join('') + (items || []).map(outcomeTemplate).join('');
}
