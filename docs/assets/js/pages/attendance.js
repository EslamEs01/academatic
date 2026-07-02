/* Attendance & Session Outcomes page (Spec 005, US1/US2/US3) — the daily
 * session-outcomes board: outcome summary tiles that double as filters + a
 * persistent filter bar + an airy outcome-row list/card hybrid + the baked
 * canonical outcome drawer per row. Admin review only — NOT a portal, NOT a
 * spreadsheet, NO numeric statuses, NO engine. */
import { SESSION_OUTCOMES, OUTCOME_SUMMARY } from '../fixtures/attendance.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { familyOf } from '../fixtures/families.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { medallion } from '../components/ui.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { outcomeRow } from '../components/outcome-row.js';
import { outcomeTemplate } from '../components/outcome-details.js';
import { OUTCOME_ORDER } from '../components/outcome-status.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');
const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');

/* resolve studentId → Student + familyId → Family (build-time) for the row + drawer */
function enrich(r) {
  const st = STUDENT_BY_ID[r.studentId];
  const fam = familyOf(r.familyId);
  return {
    ...r,
    studentNameKey: st ? st.nameKey : null, studentAccent: st ? st.accent : 'violet', studentHref: studentHref(),
    familyKey: fam ? fam.guardian.nameKey : null, familyHref: familyHref(),
  };
}

/* the outcome summary tiles — each doubles as a filter via data-filter-set */
const TILES = [
  { key: 'attended', icon: 'check-circle', tone: 'success', count: OUTCOME_SUMMARY.attended, set: 'outcome:attended' },
  { key: 'studentAbsent', icon: 'user-x', tone: 'coral', count: OUTCOME_SUMMARY.studentAbsent, set: 'outcome:studentAbsent' },
  { key: 'teacherAbsent', icon: 'user-x', tone: 'amber', count: OUTCOME_SUMMARY.teacherAbsent, set: 'outcome:teacherAbsent' },
  { key: 'cancelledRescheduled', icon: 'x-circle', tone: 'muted', count: OUTCOME_SUMMARY.cancelledOrRescheduled, set: 'outcome:cancelled+rescheduled' },
  { key: 'needsFollowUp', icon: 'alert-triangle', tone: 'amber', count: OUTCOME_SUMMARY.needsFollowUp, set: 'attention:1' },
];

function tile(x) {
  return `<button type="button" class="outcome-tile" data-filter-set="${x.set}" data-target="#attendance-list">
    ${medallion({ icon: x.icon, tone: x.tone, variant: 'soft' })}
    <div class="min-w-0"><div class="ot-v">${num(x.count)}</div><div class="ot-l">${t('att.tile.' + x.key)}</div></div>
  </button>`;
}

export function renderAttendance() {
  const rows = SESSION_OUTCOMES.rows;
  const items = rows.map(enrich);

  const days = [...new Set(rows.map((r) => r.dayId))];
  const teachers = []; const seenT = new Set();
  rows.forEach((r) => { if (!seenT.has(r.trainer.id)) { seenT.add(r.trainer.id); teachers.push({ value: r.trainer.id, labelKey: r.trainer.nameKey }); } });
  const fams = []; const seenF = new Set();
  rows.forEach((r) => { const f = familyOf(r.familyId); if (f && !seenF.has(f.id)) { seenF.add(f.id); fams.push({ value: f.id, labelKey: f.guardian.nameKey }); } });

  const filters = filterBar({
    targetId: 'attendance-list', searchKey: 'att.searchPh',
    selects: [
      { name: 'day', labelKey: 'att.fDay', options: [{ value: 'all', labelKey: 'att.allDays' }, ...days.map((d) => ({ value: d, labelKey: 'sch.day.' + d }))] },
      { name: 'outcome', labelKey: 'att.fOutcome', options: [{ value: 'all', labelKey: 'att.allOutcomes' }, ...OUTCOME_ORDER.map((o) => ({ value: o, labelKey: 'outcome.' + o })), { value: 'cancelled+rescheduled', labelKey: 'att.fCancelledResched' }] },
      { name: 'teacher', labelKey: 'att.fTeacher', options: [{ value: 'all', labelKey: 'att.allTeachers' }, ...teachers] },
      { name: 'family', labelKey: 'att.fFamily', options: [{ value: 'all', labelKey: 'att.allFamilies' }, ...fams] },
      { name: 'subject', labelKey: 'att.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((s) => ({ value: s, labelKey: 'data.subj.' + s }))] },
      { name: 'attention', labelKey: 'att.fAttention', options: [{ value: 'all', labelKey: 'filter.all' }, { value: '1', labelKey: 'att.needsFollowUpOpt' }] },
    ],
  });

  const templates = items.map(outcomeTemplate).join('');

  return `
    ${pageHeader({ titleKey: 'att.title', subKey: 'att.sub' })}
    <div class="outcome-tiles">${TILES.map(tile).join('')}</div>
    ${filters}
    <div id="attendance-list">${items.map(outcomeRow).join('')}</div>
    ${noResults()}
    ${templates}
  `;
}
