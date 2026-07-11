# Contract — studentResult Board (students.html#view=results)

**Decision:** fold the plural `studentResult` nav item into a cross-student Results board tab on
`students.html`, replacing the single-student (`st1`) deep-link as the primary target (flagged
post-035 as UX-weak — a plural label landing on one profile). Count 0. No new page.

## Mechanism
- Add `tabs({ group:'students', items:[{id:'directory',…},{id:'results',…},{id:'evaluation',…}],
  panels:{…} })` to `renderStudents()` (`src/js/pages/students.js`) — Spec 036 fold precedent.
- The **current body** (summary cards + family/status/subject `filterBar` + `dataTable` + per-row
  preview drawers + `stu-add`/`stu-edit` drawers) becomes the **directory** panel (first → default),
  unchanged.
- The **results** panel is new (this contract); **evaluation** is its sibling
  (`student-evaluation-board-contract.md`) added in the same tabs-wrap.
- `nav.config.js`: `studentResult` route refined `'student.html#view=results'` →
  `'students.html#view=results'` (stays `implemented`).
- Each board row's deep-link targets the **existing, unchanged** single-student drill-down
  `student.html#view=results` (`resultSummary(st.results)` tab, `src/js/pages/student.js` +
  `src/js/components/result-summary.js`) — Spec 035's mechanism, reused verbatim, not duplicated.

## Must render (Results tab, display-only)
- One row per `STUDENTS.rows` entry (`fixtures/students.js`): avatar + name, family chip (existing
  `familyOf`/chip pattern from `students.js`), level label (`levelKey`), an authored certificate-count
  literal (`results.certificates.length`), ONE categorical result-status chip (e.g. on-track/completed
  — authored per row, never derived), and a per-student deep-link to `student.html#view=results`.
- `noResults()` empty state for the filtered-to-zero case.
- Optional client-side filter (family/status/level) reusing `filterBar`/`facetAttrs` — no new facet
  vocabulary beyond what `students.js` already uses.

## Must NOT
- Compute or display a score, GPA, percentage, rank, average, or any cross-student
  aggregation/sort-by-score.
- Show `results.overallProgress` as a grade/score on the board (the progress-bar-as-value display
  stays confined to the single-student drill-down, unchanged).
- Render `<canvas>`/chart of any kind.
- Show a fake publish/export/PDF/save action — any Export/Print control is `data-disabled-reason`.
- Mutate any row/result value on click; call backend/API/network.
- Touch `result-summary.js` — must stay byte-identical to its Spec 035 baseline.
- Change the **directory** panel's content — pre-existing table/filters/drawers render byte-identical
  inside it.

## Acceptance (smoke)
- `students.html#view=results` (+ `.en`) opens the Results tab on fresh load; board row count ===
  `STUDENTS.rows.length`.
- Each row shows name/family/level/certificate-count/result-status-chip/deep-link; the deep-link
  resolves to `student.html#view=results` (+ EN mirror via the Spec 035 hash-aware `langRoute()`).
- Grep: 0 computed score/GPA/`%`/rank token in the board fixture or markup.
- DOM snapshot of rows unchanged before/after clicking every gate on the tab.
- `result-summary.js` diff-clean against its pre-Spec-037 baseline.
- Students-directory smoke asserts (summary cards / table / filters / stu-add/stu-edit drawers /
  famPay child-view asserts) re-pin unchanged inside the directory panel.
- Nav: `studentResult` anchor resolves to the new hash route; admin-menu-50 freeze byte-verbatim.
