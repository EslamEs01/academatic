# Contract — studentEvaluation Deep-link

**Decision:** deep-link `student.html#view=evaluation`. Count 0. No new page, no body edit.

## Must
- `nav.config.js`: `studentEvaluation` → `implemented`, `route:'student.html#view=evaluation'`; drop `FUTURE_ROUTES.studentEvaluation`.
- The existing Evaluation tab (student.js:234/243 → `evaluationRubric(st.evaluation)`) opens on load via `#view=`.
- The Evaluation surface stays display-only: categorical rating pills (excellent/good/sometimes/rarely) + achievements + objectives narratives.
- Approve stays `backendRequired` (`common.backendRequiredNote`, evaluation-rubric.js:60).

## Must NOT
- No standalone `student-evaluation.html`.
- No computed rubric total / score / rank / percentage / chart / `<canvas>`.
- No fake save / fake approve success / mutation.
- No edit to `evaluation-rubric.js` or the `student.html` `#page-body` (byte-identical).

## Rationale for deep-link (not a page)
Legacy evaluation was purely qualitative (narrative report + categorical remark); no dedicated page, no computed figure. Deep-link to the display tab is honest; a board would invent totals.

## Acceptance (smoke)
- `student.html#view=evaluation` (+ `.en`) opens the Evaluation tab; ratings categorical (no number/total); Approve = gate; `evaluation-rubric.js` byte-identical; hash-route resolves to an existing file.
