# Contract — studentResult Deep-link

**Decision:** deep-link `student.html#view=results`. Count 0. No new page, no body edit.

## Must
- `nav.config.js`: `studentResult` → `implemented`, `route:'student.html#view=results'`; drop `FUTURE_ROUTES.studentResult`.
- The existing Results tab (student.js:233/242 → `resultSummary(st.results)`) opens on load via the `#view=` hash (tabs.js:4, enhance.js:261-269).
- The Results surface stays display-only: authored per-course progress bars + certificates + level/term.

## Must NOT
- No standalone `student-results.html`.
- No computed score / rank / GPA / percentage / rubric rollup / chart / `<canvas>`.
- No fake publish / export / PDF / `window.open` / `blob:`.
- No edit to `result-summary.js` or the `student.html` `#page-body` (byte-identical).

## Rationale for deep-link (not a page)
Legacy had **no** dedicated results page and **zero** computed academic figures; an aggregate board would invent data. The per-student display tab is the honest surface.

## Acceptance (smoke)
- `student.html#view=results` (+ `.en`) opens the Results tab; no new computed-score/chart token; `result-summary.js` byte-identical; hash-route resolves to an existing file.
