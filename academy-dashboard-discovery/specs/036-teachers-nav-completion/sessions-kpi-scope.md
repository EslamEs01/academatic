# Sessions KPI — Scope (Spec 036)

**Item:** `sessionsKpi` / مؤشر أداء الحصص
**Decision:** **Fold as a display-only TAB** on `teacher-performance.html` → `teacher-performance.html#view=sessions-kpi`. **Count 0.** No existing surface (built fresh, display-only).

## Tab vs page decision
- Spec 033 (matrix row 43 / CS-12 / page-vs-deeplink row 19): **Fold (tab) recommended**, count 0. `teacher-performance.html` is the natural home (the teacherKpi board). Standalone `+2` is the rejected fallback.
- `teacher-performance.html` currently has **no tabs widget** → this fold adds the `tabs()` widget (existing board becomes the default/overview tab; sessionsKpi + monthlyPerf become two new tabs). Body change is expected (still count-0).

## Legacy grounding (and the critical boundary)
- Legacy "Classes KPI" (`/management/class-feedback`, `management-class-feedback.md:122-129`): a read-only report — filter (teachers[]/date_range) → one table "List of Teachers" with columns **#, Teacher Name, Percentage, session count**.
- **CRITICAL:** legacy showed a **computed `Percentage`**. Under the standing no-computed-score/rank/chart law, Spec 036 **MUST NOT reproduce a computed percentage**. The honest fold renders **authored session COUNTS + categorical attendance/quality LABELS** only.

## Display sections (all authored, display-only)
- Section heading + a short "display only" note.
- Optional filters (grounded in legacy): teacher + date-range/period as `filterBar` select facets over authored rows.
- A **per-teacher sessions-KPI board** (cards or table rows): teacher name + status chip + authored session counts (completed / teacher-absent / student-absent / cancelled — same `teacherCounts`-style literals already used on the board) + a **categorical** quality/attendance label chip (icon+text; e.g. on-track / needs-attention). Optional read-only detail drawer.
- Reuses `summaryCards`/`cardGrid`/`statMini`/`filterBar`/`facetAttrs`/`chip` — no new component.

## Allowed authored data
- Reuse the existing teacher fixtures + `teacher-links.js` counts (authored), or a small additive authored fixture for the categorical labels. No PII, no pay, no computed value.

## Forbidden (hard)
- ❌ computed score / rank / rating / **percentage** / percentile
- ❌ `<canvas>` / chart / graph / sparkline-as-metric
- ❌ salary / rate / hour-rate / fine / payout / any pay figure (teacher pay-free)
- ❌ fake export / PDF / `window.open` / `blob:`
- ❌ fake save; row/status mutation; backend/API/external request

## Teacher pay-free guard
- The board shows counts + labels only; a pay-token grep on the tab body must return 0 (see `teacher-pay-free-register.md`).

## Final gated actions (if any)
- Display-only — ideally no write. If an Export/Approve is surfaced, it is a `data-disabled-reason` backendRequired gate (no fake).

## Smoke / a11y / screenshot scope
- **Smoke:** `teacher-performance.html#view=sessions-kpi` opens the sessions-KPI tab (fresh load, `#view=` honored); the board renders authored rows; **0** computed-percentage/score/rank/`<canvas>` token; **0** pay token; any final is a gate; nav `sessionsKpi` = implemented anchor to that hash route.
- **A11y:** `teacher-performance` `#view=sessions-kpi` AR/EN light/dark + mobile-390 → 0/0.
- **Screenshots:** AR + EN frames of the sessions-KPI tab.
