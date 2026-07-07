/* Spec 025 — TEACHER OUTCOMES (sara). The after-session record surface, reborn as an
 * HONEST read-only view: the outcome WORKFLOW as a prepare → attend → record → review
 * flow strip (the record step is the gate) · the legacy classes-end capture shown as a
 * five-field DISPLAY checklist (attendance · remark · summary · homework note · files
 * note — never an editable form) · two REAL recorded examples (out1/out11 via
 * OUTCOME_BY_ID + STUDENT_BY_ID + outcomeChip) with their honest review status. Every
 * write path — recording, saving, submitting an outcome — is a labeled backendRequired
 * gate, never a live control. Display-only; NO computed score/rank, NO engine, and — the
 * standing teacher hard rule — ZERO figure-bearing or flagged vocabulary anywhere (copy
 * AND comments). The page body contributes ZERO anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from '../components/ui.js';
import { outcomeChip } from '../components/outcome-status.js';
import { pageHead, secHead, gateNote, guidePanel, flowStrip } from '../components/portal-page.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { TEACHER_PREVIEW, PORTAL_PLANNED } from '../fixtures/portal.js';

const planned = (id) => PORTAL_PLANNED.teacher.find((p) => p.id === id);

/* the outcome workflow: prepare → attend → record → review (the record step gated) */
const flowSteps = () => [
  { icon: 'file-text',       titleKey: 'prt.tch.pg.outcomes.step1t', subKey: 'prt.tch.pg.outcomes.step1d' },
  { icon: 'check-circle',    titleKey: 'prt.tch.pg.outcomes.step2t', subKey: 'prt.tch.pg.outcomes.step2d' },
  { icon: 'clipboard-check', titleKey: 'prt.tch.pg.outcomes.step3t', subKey: 'prt.tch.pg.outcomes.step3d', gated: true },
  { icon: 'trending-up',     titleKey: 'prt.tch.pg.outcomes.step4t', subKey: 'prt.tch.pg.outcomes.step4d' },
];

/* the five legacy capture fields, shown as a read-only checklist (icon + label + line) */
const fields = () => [
  { icon: 'check-circle',   labelKey: 'prt.tch.pg.outcomes.fAttend',   subKey: 'prt.tch.pg.outcomes.fAttendD' },
  { icon: 'message-circle', labelKey: 'prt.tch.pg.outcomes.fRemark',   subKey: 'prt.tch.pg.outcomes.fRemarkD' },
  { icon: 'file-text',      labelKey: 'prt.tch.pg.outcomes.fSummary',  subKey: 'prt.tch.pg.outcomes.fSummaryD' },
  { icon: 'tasks',          labelKey: 'prt.tch.pg.outcomes.fHomework', subKey: 'prt.tch.pg.outcomes.fHomeworkD' },
  { icon: 'materials',      labelKey: 'prt.tch.pg.outcomes.fFiles',    subKey: 'prt.tch.pg.outcomes.fFilesD' },
];

function fieldCard(f) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${icon(f.icon, 'ico')}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(f.labelKey))}</div>
        <div class="pt-card-sub">${esc(t(f.subKey))}</div>
      </div>
    </div>
  </div>`;
}

/* a REAL recorded example: the resolved student + session + its review-status chip */
function recentCard(h) {
  const o = OUTCOME_BY_ID[h.outcomeId];
  const s = STUDENT_BY_ID[o.studentId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(o.titleKey))} · ${esc(t(o.roomKey))}</div>
      </div>
      ${outcomeChip(o.outcomeId)}
    </div>
    <div class="pt-tags">
      <span class="pt-tag">${icon('tasks', 'ico ico-sm')}${esc(t(h.homeworkKey))}</span>
    </div>
    ${o.feedbackKey ? `<p class="pt-card-sub">${esc(t(o.feedbackKey))}</p>` : ''}
  </div>`;
}

export function renderTeacherOutcomes() {
  return `
    ${pageHead('prt.tch.pg.outcomes.title', 'prt.tch.pg.outcomes.sub')}

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.tch.pg.outcomes.flowTitle', 'prt.tch.pg.outcomes.flowHint')}
      ${flowStrip(flowSteps())}
    </section>

    <section class="pt-section">
      ${secHead('tasks', 'prt.tch.pg.outcomes.checkTitle', 'prt.tch.pg.outcomes.checkHint')}
      <div class="pt-cards">${fields().map(fieldCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('trending-up', 'prt.tch.pg.outcomes.recentTitle', 'prt.tch.pg.outcomes.recentHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.history.map(recentCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('help', 'prt.tch.pg.outcomes.saveTitle', 'prt.tch.pg.outcomes.saveHint')}
      <div class="pt-cards">${guidePanel(planned('outcomeSave'))}</div>
      ${gateNote('prt.tch.pg.outcomes.saveGate')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
