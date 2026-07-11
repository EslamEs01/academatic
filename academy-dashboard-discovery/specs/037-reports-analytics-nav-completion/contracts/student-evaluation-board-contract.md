# Contract — studentEvaluation Board (students.html#view=evaluation)

**Decision:** fold the plural `studentEvaluation` nav item into a cross-student Evaluation board tab
on `students.html`, sharing the same `tabs()` group introduced for Results (flagged post-035 as
UX-weak — a plural label landing on one profile's rubric). Count 0. No new page.

## Mechanism
- Third panel in the shared `tabs({ group:'students', items:[{id:'directory',…},{id:'results',…},
  {id:'evaluation',…}], panels:{…} })` wrap added to `renderStudents()`
  (see `student-results-board-contract.md` for the **directory**/**results** panels).
- `#view=evaluation` opens this panel on fresh load (existing hash-open path, no new hook).
- `nav.config.js`: `studentEvaluation` route refined `'student.html#view=evaluation'` →
  `'students.html#view=evaluation'` (stays `implemented`).
- Each board row's deep-link targets the **existing, unchanged** single-student drill-down
  `student.html#view=evaluation` (`evaluationRubric(st.evaluation)` tab, `src/js/pages/student.js` +
  `src/js/components/evaluation-rubric.js`) — Spec 035's mechanism, reused verbatim.

## Must render (Evaluation tab, display-only)
- One row per `STUDENTS.rows` entry: avatar + name, level label, an authored month label
  (`evaluation.monthKey`), ONE categorical evaluation-status chip derived only from the existing
  authored `evaluation.approved` boolean (approved/pending — reuse the exact chip vocabulary already
  defined in `evaluation-rubric.js`'s `eval.approved`/`eval.pending`, no new tone), and a per-student
  deep-link to `student.html#view=evaluation`.
- `noResults()` empty state for the filtered-to-zero case.
- Optional client-side filter (family/status/month) reusing `filterBar`/`facetAttrs` — no new facet
  vocabulary.

## Must NOT
- Compute a rubric total, dimension average, composite rating, or any numeric score/rank from
  `evaluation.criteria`.
- Surface the four individual `criteria` rating pills on the cross-student board — that detail stays
  on the single-student drill-down only; the board shows the ONE categorical approved/pending chip.
- Render `<canvas>`/chart of any kind.
- Show a fake publish/export/PDF/save/Approve-on-board action — any Export control is
  `data-disabled-reason`; if Approve is surfaced on the board at all, it must gate identically to the
  existing single-student `confirmAction` pattern and must not flip `approved` in the DOM.
- Mutate any row/evaluation value on click; call backend/API/network.
- Touch `evaluation-rubric.js` — must stay byte-identical to its Spec 035 baseline.
- Change the **directory** or **results** panels introduced alongside it — both render byte-identical
  to their own contracts.

## Acceptance (smoke)
- `students.html#view=evaluation` (+ `.en`) opens the Evaluation tab on fresh load; board row count ===
  `STUDENTS.rows.length`.
- Each row shows name/level/month/evaluation-status-chip/deep-link; the deep-link resolves to
  `student.html#view=evaluation` (+ EN mirror).
- Grep: 0 computed total/average/numeric-rubric token in the board fixture or markup.
- DOM snapshot of rows unchanged before/after clicking every gate on the tab (including any surfaced
  Approve control).
- `evaluation-rubric.js` diff-clean against its pre-Spec-037 baseline.
- Students-directory + Results-tab smoke asserts re-pin unchanged.
- Nav: `studentEvaluation` anchor resolves to the new hash route; admin-menu-50 freeze byte-verbatim.
