/* Spec 025 — TEACHER REPORTS (sara). The teacher-home performance anchor's repoint
 * target, reframed as an ACADEMIC-ONLY reporting surface: an authored academic-count
 * summary (sessions completed · students followed · on-track — literal counts, never
 * derived) · per-student progress summaries (the REAL authored learning notes) · the
 * monthly student-report DIMENSION lines (display-only labels — NO answer scale, NO
 * result value). Any export is an honest backendRequired gate. Display-only; no
 * computed grading/ordering, no graph engine, no derivation — and, the standing teacher
 * hard rule, ZERO figure-bearing or flagged vocabulary anywhere (copy AND comments). The
 * page body contributes ZERO anchors (every unavailable action is a labeled gate). */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from '../components/ui.js';
import { pageHead, secHead, kpiRow, gateNote } from '../components/portal-page.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { TEACHER_PREVIEW } from '../fixtures/portal.js';

/* Section 1 — authored academic counts (fixture literals; no derivation, no graph).
 * `sessions followed` mirrors the roster the follow-up board tracks; every value is a
 * hand-authored small integer surfaced via kpiRow's num() (never computed at runtime). */
const REPORT_KPIS = [
  { icon: 'check-circle', value: 24, labelKey: 'prt.tch.pg.reports.kpiSessions' },
  { icon: 'students',     value: 4,  labelKey: 'prt.tch.pg.reports.kpiStudents' },
  { icon: 'trending-up',  value: 3,  labelKey: 'prt.tch.pg.reports.kpiOnTrack' },
];

/* Section 2 — per-student progress summaries: the REAL authored learning notes
 * (worded signals — no numbers), each resolved to its roster student. */
const NOTE_ORDER = ['st1', 'st6', 'st11', 'st13'];
function progressCard(studentId) {
  const s = STUDENT_BY_ID[studentId];
  const noteKey = TEACHER_PREVIEW.studentNotes[studentId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(noteKey))}</div>
      </div>
    </div>
  </div>`;
}

/* Section 3 — the monthly student-report dimension lines: display-only labels only.
 * NO answer scale, NO result value — just the named dimension an authored report
 * would describe in words. Icons are per-dimension decoration, positionally aligned to
 * TEACHER_PREVIEW.rubricKeys (achievements · learning · focus · homework · punctuality). */
const RUBRIC_ICONS = ['award', 'trending-up', 'target', 'tasks', 'clock'];
function rubricLine(rubricKey, i) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-tag is-accent">${icon(RUBRIC_ICONS[i] || 'reports', 'ico ico-sm')}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(rubricKey))}</div>
      </div>
    </div>
  </div>`;
}

export function renderTeacherReports() {
  return `
    ${pageHead('prt.tch.pg.reports.title', 'prt.tch.pg.reports.sub')}

    <section class="pt-section">
      ${secHead('reports', 'prt.tch.pg.reports.title', 'prt.tch.pg.reports.sub')}
      ${kpiRow(REPORT_KPIS, 'teal')}
    </section>

    <section class="pt-section">
      ${secHead('students', 'prt.tch.pg.reports.progTitle', 'prt.tch.pg.reports.progHint')}
      <div class="pt-cards">${NOTE_ORDER.map(progressCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.tch.pg.reports.rubricTitle', 'prt.tch.pg.reports.rubricHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.rubricKeys.map(rubricLine).join('')}</div>
    </section>

    ${gateNote('prt.tch.pg.reports.exportGate')}

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
