# Data Analysis — Scope (Spec 037)

## Tab decision
- Route: `reports.html#view=analysis` (and the EN mirror `reports.en.html#view=analysis`).
- Page-count impact: **0 new pages**. `dataAnalysis` folds into `reports.html` as a second new tab
  alongside `monthly` (see `monthly-reports-scope.md`), using the same `tabs({ group: 'reports' })`
  widget and `#view=` deep-link mechanism — no new hook, no new storage key, no dependency.
- Nav flip: `nav.config.js` — `dataAnalysis` item (`nav.dataAnalysis`, icon `trending-up`)
  `status: 'planned'` → `implemented`, `route: 'reports.html#view=analysis'`.
- **Supersession**: the current `FUTURE_ROUTES.dataAnalysis: 'analytics.html'` entry (nav.config.js
  line ~145) is STALE — no `analytics.html` page exists or will be built. Repoint/remove this entry
  as part of the nav flip (drop the `FUTURE_ROUTES.dataAnalysis` key entirely, matching how Spec 035
  trimmed `FUTURE_ROUTES` for `studentResult`/`studentEvaluation` and Spec 036 trimmed
  `teacherCategories`).

## Grounding
- Legacy templates `management/analysis-course` and `management/analysis-student` are the
  justification: both are finance-free, student/course-centric analysis views (no salary/payout
  figure, no BI engine) — they ground an **honest authored categorical insight board**, not a real
  analytics/prediction engine. This mirrors the existing `reports.js` `operationsOverview()`
  pattern: authored roll-up counts + a categorical signal chip, never a computed metric.

## Display sections (all authored, display-only)
1. **Tab header** — section title/sub inside the analysis panel, same shape as the Monthly tab
   header (no duplicate top-level `pageHeader()`).
2. **Filters** — `filterBar()` scoped to the analysis rows grid; facets limited to what is
   grounded: `area`/`subject` (reuse the existing area vocabulary — attendance/sessions/
   coursesGroups/teachers/studentsFamilies — or course/subject labels already used elsewhere) and,
   only if grounded in fixtures, a `period` facet using the SAME closed authored month list as the
   Monthly tab (no new time dimension invented).
3. **Insight cards** — `summaryCards()` or `cardGrid()` tiles: authored COUNT literals per
   area/subject (e.g. "N groups reviewed", "N students flagged"), each paired with ONE categorical
   trend/status chip drawn from a closed, authored LABEL set: `improving` / `steady` / `declining`
   (reuse `chip()`/`reportSignalChip()`-style rendering — these are hand-assigned labels on fixture
   rows, never derived by comparison/math/date-diff in code).
4. **Insight list/table** — a read-only `cardGrid()` (or list) of authored insight rows: `area`/
   `subject`, `count`, trend/status chip, short authored `note`. `noResults()` for the empty-filter
   state (existing global contract).
5. **Optional detail** — a read-only drawer only if grounded in an existing row shape (same rule as
   Monthly); omit rather than invent.

## Allowed authored data
- `area`/`subject` label, `count` (integer literal), ONE categorical trend/status chip from the
  closed `improving`/`steady`/`declining` (or equivalent existing signal) vocabulary — assigned as
  static fixture data, NOT computed in code — and a short authored `note`.
- Explicitly **forbidden as data**: any computed metric/percentage/rank/prediction/forecast, any
  score/leaderboard, any money/finance/salary/payout figure, any derived trend arithmetic (e.g. no
  "+12% vs last month" — that is a computed claim, not a label).

## Forbidden behavior
- No real analytics/BI engine of any kind; no client-side computation that produces a number not
  already present verbatim in the fixture.
- No fake calculation, prediction, or forecasting logic.
- No fake Export/PDF success.
- No computed finance figure anywhere in the tab.
- No backend/API/websocket call.
- **No `<canvas>`, no chart library, no plotting of any kind** — a chart would visually imply a
  computed/derived analysis, which is explicitly forbidden by the standing law even when every
  underlying number is an authored literal. Chips/cards/lists only.

## Honesty caveat (binding)
- Per the Spec-033 roadmap, `dataAnalysis` "carries NO canvas/computed analytics; stays a documented
  gate if no honest display [is available]." This scope resolves that conditionally: an **authored
  categorical insight board is judged an honest display**, on the same footing as
  `operationsOverview()`'s roll-up tiles — because every rendered number and chip is a static fixture
  literal, not a computation, and the chips are labels, not scores.
- **Fallback rule**: if, during implementation, no sufficiently grounded authored insight rows can
  be produced (i.e., the only way to populate the tab would be to invent metrics not traceable to
  any existing fixture/legacy evidence), the tab MUST fall back to a documented `backendRequired`
  analysis gate — a header + explanatory note + one clickable `data-disabled-reason` gate — inside
  the `analysis` tab panel, rather than fabricate insight data. This decision must be recorded in
  `implementation-status.md` at implementation time.

## Final gated actions
- Any Export / "Run analysis" / Refresh-analysis control is a `data-disabled-reason`
  `backendRequired` gate, identical honesty class to the Monthly tab's Export/Send gates and the
  existing reports Print/CSV/Share gates.

## Fixture / locale / smoke / a11y / screenshot plan
- Fixtures: new authored rows (e.g. `DATA_ANALYSIS` array of `{ id, area, count, trend, note }`)
  added alongside `fixtures/reports.js`, or the documented-gate fallback with no data array — no
  PII, no pay/salary token, no invented entity beyond what course/student analysis legacy grounds.
- Locale: mirrored AR/EN keys under `rep.analysis.*` in the existing `ar/en.rep.js` pair, 0
  divergence (same namespace convention as `rep.monthly.*`).
- Smoke: `reports.html#view=analysis` / `reports.en.html#view=analysis` deep-links open the
  Analysis tab on fresh load; 0 computed-metric / 0 chart / 0 `<canvas>` / 0 finance-figure token;
  0 fake-success toast on Export/Run-analysis (gate present instead); if the fallback-gate path is
  used, assert the gate renders and is the ONLY content. Re-pin all existing reports/payHit/
  finance/child-view/Spec 026-036 asserts byte-verbatim.
- a11y: critical=0 serious=0 on the Analysis tab, light + dark + mobile-390.
- Screenshots: Analysis tab AR, EN, dark, mobile-390 — 0 console errors.
