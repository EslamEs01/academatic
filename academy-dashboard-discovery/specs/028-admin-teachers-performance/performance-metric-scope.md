# Performance-Metric Scope — Spec 028

The `teacher-performance.html` board is **already Spec-007/024-B-07 compliant and display-only**. 028 preserves it and adds **no** computed metric.

## Allowed (authored display-only signals)
- Summary tiles: Active teachers, Completed sessions, Teacher absences, Student absences, Cancelled/rescheduled, Groups needing attention, Teachers needing follow-up — all raw fixture counts / resolved list lengths / simple display sums.
- Per-teacher comparison card: completed / teacherAbsent / studentAbsent / groups counts + labeled workload chip + labeled follow-up signal chip + status chip + a `View profile` link.
- Follow-up queue: teachers with `followUp ∈ {needsFollowUp, attentionRisk}` + an "n absences" context count.
- Filters: subject / workload / follow-up-signal (client-side facet only, no analytics engine).
- Teacher-list util summary tile (`avgUtil`) and per-teacher sessions/hours counts — pre-existing Spec-007 display aggregates (no currency, not a pay figure).

## Forbidden (never introduce in 028)
- Computed **score / rank / leaderboard / percentile** (no sort-by-performance; teachers keep fixed fixture order).
- Any **chart / graph / `<canvas>` / sparkline-as-metric**.
- **Salary / payroll / earnings / compensation / payout / fine** FIGURES anywhere.
- A computed teacher **rating** (the unused `rating` fixture field stays unsurfaced).
- Legacy Teacher-Feedback / Class-Feedback **percentages** (those are computed evaluation → 029, and even there must be authored/display-only, never derived).

## Classification
- **Display-only metrics**: all board tiles, comparison-card counts, queue counts, workload/signal/status/availability chips.
- **Real static filters/tabs**: the board's subject/workload/signal facet selects; the teacher-detail 9 tabs; the teachers-list filters.
- **Owner-029 gates**: export/print of the board or any feedback/analytics/report-builder surface.
- **Owner-030 gates**: any salary/payroll/compensation/payout figure or board (Compensations/Salary tabs, Accounting, Salaries, Payouts).

## Guard
Smoke asserts the board `#page-body` carries no `score|rank|percentile|leaderboard|<canvas>|chart` and no pay token; `teacher-performance.html` remains the sanctioned admin exempt board (it may carry the pre-existing pay-adjacent nav tokens as today — the pay-free grep targets the 16 teacher-**portal** files, not this admin board).
