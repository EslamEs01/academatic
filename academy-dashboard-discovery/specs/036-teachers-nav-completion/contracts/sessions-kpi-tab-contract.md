# Contract — sessionsKpi Tab

**Decision:** a display-only tab on `teacher-performance.html` → `#view=sessions-kpi`. Count 0.

## Mechanism
- Add `tabs({ group:'perf', items:[{id:'overview',…},{id:'sessions-kpi',…},{id:'monthly',…}], panels:{…} })` to `renderTeacherPerformance()`.
- The **current board** (KPI tiles + comparison list + follow-up queue) becomes the **overview** panel (first → default).
- The `sessions-kpi` panel is new (this contract). `#view=sessions-kpi` opens it (enhance.js honors the hash on load).

## Must render (display-only)
- A sessions-KPI board: per-teacher card/row = teacher name + status chip + authored session **counts** (completed / teacher-absent / student-absent / cancelled via `teacherCounts`) + a **categorical** quality/attendance chip (icon+text).
- Optional `filterBar` (teacher/subject) over the board + optional read-only detail drawer.

## Must NOT
- ❌ computed score / rank / rating / **percentage** / percentile (the legacy `Percentage` is NOT reproduced).
- ❌ `<canvas>` / chart / graph / sparkline-as-metric.
- ❌ salary / rate / hour-rate / fine / payout / currency figure.
- ❌ fake export/PDF; fake save; row/status mutation; backend/API/external request.

## Acceptance (smoke)
- `teacher-performance.html#view=sessions-kpi` (+ `.en`) opens the sessions-KPI tab (fresh load); board renders authored rows; **0** computed-score/rank/percentage token; **0** `<canvas>`; **0** pay token; any final = gate; nav `sessionsKpi` = implemented anchor to that hash route.
