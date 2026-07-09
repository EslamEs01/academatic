# Contract: teacher-reports (T9 + T20/T21) — HIGHEST pay-free risk

**Module**: `teacher-reports.js` → `renderTeacherReports()`. Nav `reports`. Persona sara. **The teacher-home performance anchor's repoint target.**

## Must include
- `pageHead` («تقاريري»/"My Reports") — ACADEMIC-ONLY.
- Session-completion + attendance/outcome-quality summary (authored counts, NOT charts).
- Student-progress summaries.
- Monthly rubric dimension lines display-only: achievements · learning-progress · focus · homework · punctuality (+ rescheduled · additional-support · learning-objectives) — dimension lines only, NO answer scales.

## Gates (backendRequired)
- Export/download = backendRequired.

## Forbidden (ABSOLUTE)
- ANY pay/finance/salary vocabulary (the full forbidden token set).
- Computed score/rank/percentile/rating; chart engine/series; the salary-class-report/update-result adjacency.

## Repoint
- `teacher-portal.js:70` `perfHref` → `teacher-reports(.en).html`; smoke anchor target re-pinned; the Spec 024 B-07 exemption note updated (tension CLOSED — teacher home no longer routes into the admin shell).

## Acceptance
- Three-layer pay-free scan zero-hit ON THIS PAGE; no chart/computed-score token; export backendRequired; teacher home → teacher-reports (not teacher-performance).

**Stop**: any pay/finance token or computed-score/chart on this page → STOP.
