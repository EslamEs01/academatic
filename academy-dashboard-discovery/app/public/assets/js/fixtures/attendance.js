/* Session-outcome fixture (Spec 005). Each row = one past/today session + its
 * admin-review OUTCOME. Reuses the session shape and resolves to the real Spec 004
 * Student (`studentId`) + Family (`familyId`) so follow-up lands on the right
 * profiles. `statusId` = scheduling state (Spec 001/003 map); `outcomeId` = review
 * outcome (outcome-status map) — separate fields, no double-encoding (R34).
 * Display-only; NO attendance/outcome/finance engine, NO numeric statuses. */

const T = {
  sara:     { id: 'sara',     nameKey: 'data.t.sara',     accent: 'violet' },
  mohammed: { id: 'mohammed', nameKey: 'data.t.mohammed', accent: 'amber' },
  layan:    { id: 'layan',    nameKey: 'data.t.layan',    accent: 'teal' },
  abdullah: { id: 'abdullah', nameKey: 'data.t.abdullah', accent: 'success' },
  reem:     { id: 'reem',     nameKey: 'data.t.reem',     accent: 'sky' },
  nora:     { id: 'nora',     nameKey: 'data.t.nora',     accent: 'coral' },
  khalid:   { id: 'khalid',   nameKey: 'data.t.khalid',   accent: 'sky' },
};
const ATTR = {
  studentAbsent: { absentBy: 'student', labelKey: 'att.attribution.studentAbsent' },
  teacherAbsent: { absentBy: 'teacher', labelKey: 'att.attribution.teacherAbsent' },
  cancelTeacher: { cancelBy: 'teacher', labelKey: 'att.attribution.cancelTeacher' },
  cancelStudent: { cancelBy: 'student', labelKey: 'att.attribution.cancelStudent' },
  cancelAdmin:   { cancelBy: 'admin',   labelKey: 'att.attribution.cancelAdmin' },
};
const MK = {
  credit:     { kind: 'credit',     labelKey: 'att.makeup.credit' },
  auto:       { kind: 'auto',       labelKey: 'att.makeup.auto' },
  reschedule: { kind: 'reschedule', labelKey: 'att.makeup.reschedule' },
};
const FU = {
  absence:    { kind: 'absence',    labelKey: 'att.followUp.absence' },
  cancel:     { kind: 'cancel',     labelKey: 'att.followUp.cancel' },
  reschedule: { kind: 'reschedule', labelKey: 'att.followUp.reschedule' },
  feedback:   { kind: 'feedback',   labelKey: 'att.followUp.feedback' },
};

/* o({ id, s, subject, trainer, room, time, dur, dayId, statusId, outcomeId,
 *     studentId, familyId, present, capacity, attribution?, makeup?, followUp?,
 *     rescheduleHint?, feedbackKey? }) */
const o = (r) => ({
  ...r,
  titleKey: `data.${r.s}.title`, levelKey: `data.${r.s}.level`,
  subjectKey: `data.subj.${r.subject}`, roomKey: `data.room.${r.room}`,
  dateKey: `sch.day.${r.dayId}`, durationMin: r.dur,
  notesKey: `data.att.note.${r.outcomeId}`,
});

export const SESSION_OUTCOMES = {
  rows: [
    o({ id: 'out1',  s: 's1',  subject: 'math',        trainer: T.sara,     room: 'a',    time: '09:00', dur: 60, dayId: 'sun', statusId: 'completed', outcomeId: 'attended',      studentId: 'st1',  familyId: 'fam1', present: 18, capacity: 20, feedbackKey: 'data.att.fb.good' }),
    o({ id: 'out2',  s: 's2',  subject: 'arabic',      trainer: T.mohammed, room: 'c',    time: '10:30', dur: 45, dayId: 'sun', statusId: 'completed', outcomeId: 'attended',      studentId: 'st2',  familyId: 'fam2', present: 22, capacity: 25 }),
    o({ id: 'out3',  s: 's3',  subject: 'programming', trainer: T.layan,    room: 'lab1', time: '08:00', dur: 60, dayId: 'sun', statusId: 'completed', outcomeId: 'studentAbsent', studentId: 'st3',  familyId: 'fam3', present: 13, capacity: 16, attribution: ATTR.studentAbsent, makeup: MK.credit, followUp: FU.absence, feedbackKey: 'data.att.fb.support' }),
    o({ id: 'out4',  s: 's8',  subject: 'math',        trainer: T.sara,     room: 'c',    time: '11:00', dur: 50, dayId: 'sun', statusId: 'completed', outcomeId: 'teacherAbsent', studentId: 'st7',  familyId: 'fam2', present: 0,  capacity: 20, attribution: ATTR.teacherAbsent, makeup: MK.auto, followUp: FU.absence }),
    o({ id: 'out5',  s: 's4',  subject: 'physics',     trainer: T.abdullah, room: 'b',    time: '11:45', dur: 30, dayId: 'sun', statusId: 'cancelled', outcomeId: 'cancelled',     studentId: 'st4',  familyId: 'fam4', present: 0,  capacity: 12, attribution: ATTR.cancelTeacher, makeup: MK.reschedule, followUp: FU.cancel }),
    o({ id: 'out6',  s: 's5',  subject: 'arabic',      trainer: T.reem,     room: 'd',    time: '13:15', dur: 50, dayId: 'sun', statusId: 'completed', outcomeId: 'attended',      studentId: 'st8',  familyId: 'fam3', present: 9,  capacity: 20 }),
    o({ id: 'out7',  s: 's6',  subject: 'english',     trainer: T.nora,     room: 'e',    time: '12:30', dur: 45, dayId: 'mon', statusId: 'live',      outcomeId: 'live',          studentId: 'st5',  familyId: 'fam5', present: 16, capacity: 16 }),
    o({ id: 'out8',  s: 's7',  subject: 'science',     trainer: T.khalid,   room: 'lab2', time: '14:00', dur: 60, dayId: 'mon', statusId: 'upcoming',  outcomeId: 'upcoming',      studentId: 'st6',  familyId: 'fam1', present: 0,  capacity: 13 }),
    o({ id: 'out9',  s: 's3',  subject: 'programming', trainer: T.layan,    room: 'lab1', time: '09:30', dur: 50, dayId: 'mon', statusId: 'completed', outcomeId: 'studentAbsent', studentId: 'st9',  familyId: 'fam6', present: 13, capacity: 14, attribution: ATTR.studentAbsent, makeup: MK.credit, followUp: FU.absence }),
    o({ id: 'out10', s: 's1',  subject: 'math',        trainer: T.sara,     room: 'a',    time: '12:00', dur: 60, dayId: 'mon', statusId: 'cancelled', outcomeId: 'rescheduled',   studentId: 'st10', familyId: 'fam7', present: 0,  capacity: 18, attribution: ATTR.cancelStudent, makeup: MK.reschedule, followUp: FU.reschedule, rescheduleHint: 'data.att.reschedHint' }),
    o({ id: 'out11', s: 's8',  subject: 'math',        trainer: T.sara,     room: 'c',    time: '15:00', dur: 50, dayId: 'mon', statusId: 'completed', outcomeId: 'attended',      studentId: 'st11', familyId: 'fam1', present: 16, capacity: 16, feedbackKey: 'data.att.fb.good' }),
    o({ id: 'out12', s: 's6',  subject: 'english',     trainer: T.nora,     room: 'e',    time: '10:00', dur: 45, dayId: 'tue', statusId: 'cancelled', outcomeId: 'cancelled',     studentId: 'st13', familyId: 'fam1', present: 0,  capacity: 15, attribution: ATTR.cancelAdmin, followUp: FU.cancel }),
    o({ id: 'out13', s: 's3',  subject: 'programming', trainer: T.layan,    room: 'lab1', time: '11:30', dur: 60, dayId: 'tue', statusId: 'completed', outcomeId: 'attended',      studentId: 'st14', familyId: 'fam2', present: 14, capacity: 18 }),
    o({ id: 'out14', s: 's7',  subject: 'science',     trainer: T.khalid,   room: 'lab2', time: '13:00', dur: 60, dayId: 'tue', statusId: 'upcoming',  outcomeId: 'upcoming',      studentId: 'st12', familyId: 'fam1', present: 0,  capacity: 13 }),
  ],
};

/* derived summary counts (display-only — drives the tiles + the dashboard signal) */
const rows = SESSION_OUTCOMES.rows;
const countOutcome = (id) => rows.filter((r) => r.outcomeId === id).length;
export const OUTCOME_SUMMARY = {
  total: rows.length,
  attended: countOutcome('attended'),
  studentAbsent: countOutcome('studentAbsent'),
  teacherAbsent: countOutcome('teacherAbsent'),
  cancelledOrRescheduled: countOutcome('cancelled') + countOutcome('rescheduled'),
  needsFollowUp: rows.filter((r) => r.followUp).length,
};

export const OUTCOME_BY_ID = Object.fromEntries(rows.map((r) => [r.id, r]));
export const outcomesOfStudent = (studentId) => rows.filter((r) => r.studentId === studentId);
export const outcomesOfFamily = (familyId) => rows.filter((r) => r.familyId === familyId);
