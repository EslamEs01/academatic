# Contract — No Computed Rank / Chart / Score

Binding on the two new teacher-performance tabs (and any touched teacher surface).

## Forbidden (must be absent from new/changed bodies)
- Computed **score / rank / rating / percentage / percentile / total / average-as-metric**.
- `<canvas>`, any charting/plotting/graph/sparkline-as-metric element.
- Any arithmetic that derives a displayed performance number from other data.

## Allowed
- **Authored literal** counts (session completed/absent/cancelled via `teacherCounts`) — display, not derived.
- **Categorical** chips (on-track/watch/needs-attention; improving/steady/declining) — labels, never numbers.
- Authored notes/recommendations.

## Evidence basis
- Legacy "Classes KPI" and "Monthly Performance" each rendered a **computed `Percentage`** column — Spec 036 deliberately does NOT reproduce it (Spec 028 performance-metric-scope + the standing law). Neither legacy page had a chart/canvas.
- The existing teacher-performance board already follows the count-and-categorical-chip pattern (teacher-performance.js) with no computed rating — the new tabs mirror it.

## Acceptance
- Smoke/grep: 0 `<canvas>` in the new tab bodies; no new score/rank/percentage/rating token introduced by Spec 036; the existing no-computed-score guards stay byte-verbatim.
