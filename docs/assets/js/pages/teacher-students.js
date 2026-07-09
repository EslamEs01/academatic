/* Spec 025 — TEACHER STUDENTS (sara's roster). A view-only class list: one calm
 * roster card per student sara teaches (st1/st6/st11/st13) carrying the child's
 * name, a course/group label, an authored learning-signal line, and a calm subject
 * tag — followed by a follow-up story row built from REAL outcome rows (out15 st11
 * absence · out4 st7 make-up). Display-only throughout: no data table, no messaging
 * composer, no edit/save, no private guardian contact, no computed risk value, and —
 * the standing hard rule — ZERO figure-bearing or flagged vocabulary anywhere (copy
 * AND comments). The page body contributes ZERO anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from '../components/ui.js';
import { pageHead, secHead, storyRow } from '../components/portal-page.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { TEACHER_PREVIEW } from '../fixtures/portal.js';

/* sara's roster order — the four students carrying authored learning notes */
const ROSTER = ['st1', 'st6', 'st11', 'st13'];

/* one calm, view-only roster card (avatar + name + course/group + signal + subject tag) */
function rosterCard(id) {
  const st = STUDENT_BY_ID[id];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: st.nameKey, accent: st.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(st.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(`prt.tch.pg.students.${id}Cg`))}</div>
      </div>
      <span class="pt-tag">${icon('sparkles', 'ico ico-sm')}${esc(t(st.subjectKey))}</span>
    </div>
    <p class="pt-card-sub">${esc(t(TEACHER_PREVIEW.studentNotes[id]))}</p>
  </div>`;
}

/* follow-up story rows — REAL outcome refs, gentle framing (student name → framing line) */
function followStories() {
  const iconFor = { out15: 'alert-triangle', out4: 'users' };
  return TEACHER_PREVIEW.followUps.map((f) => {
    const o = OUTCOME_BY_ID[f.outcomeId];
    return { icon: iconFor[f.outcomeId] || 'alert-triangle', tone: 'amber', titleKey: STUDENT_BY_ID[o.studentId].nameKey, subKey: f.framingKey };
  });
}

export function renderTeacherStudents() {
  return `
    ${pageHead('prt.tch.pg.students.title', 'prt.tch.pg.students.sub')}

    <section class="pt-section">
      ${secHead('students', 'prt.tch.pg.students.title', 'prt.tch.pg.students.rosterHint')}
      <div class="pt-cards">${ROSTER.map(rosterCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('alert-triangle', 'prt.tch.pg.students.followTitle', 'prt.tch.pg.students.followHint')}
      ${storyRow(followStories())}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
