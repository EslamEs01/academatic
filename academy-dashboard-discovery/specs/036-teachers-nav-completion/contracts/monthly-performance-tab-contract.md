# Contract — monthlyPerf Tab

**Decision:** a display-only tab on `teacher-performance.html` → `#view=monthly`. Count 0.

## Mechanism
- The third tab on the `perf` group added by the sessionsKpi fold. `#view=monthly` opens it.

## Must render (display-only)
- A monthly-performance board: per-teacher row/card = teacher name + status chip + month label + a **categorical** trend/status chip (icon+text; improving / steady / declining) + an authored note/recommendation.
- A month filter (+ optional teacher facet) via `filterBar`; optional read-only detail drawer.

## Must NOT
- ❌ computed score / rank / rating / **percentage** / rubric-total (legacy `Percentage` NOT reproduced).
- ❌ `<canvas>` / chart / graph.
- ❌ salary / rate / fine / payout / currency figure.
- ❌ duplicate the Spec-029 feedback engine (no working add-feedback/add-category workflow — any surfaced write = gate).
- ❌ fake export/PDF; fake save/publish; row/status mutation; backend/API/external request.

## Acceptance (smoke)
- `teacher-performance.html#view=monthly` (+ `.en`) opens the monthly tab; authored rows render; a month/teacher facet narrows rows; **0** computed-percentage/score token; **0** `<canvas>`; **0** pay token; nav `monthlyPerf` = implemented anchor to that hash route.
