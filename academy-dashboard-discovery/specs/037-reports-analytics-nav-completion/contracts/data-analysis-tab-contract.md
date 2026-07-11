# Contract — dataAnalysis Tab

**Decision:** a display-only tab on `reports.html` → `#view=analysis`. Count impact **0**. Grounded
in legacy `management/analysis-course` + `management/analysis-student` (both finance-free).

## Mechanism
- Third panel in the `tabs({group:'reports'})` wrap; `#view=analysis` opens it on fresh load, AR+EN.
- Nav: `nav.config.js` `dataAnalysis` item `status:'planned'` → `implemented`,
  `route:'reports.html#view=analysis'`; **supersede** the stale
  `FUTURE_ROUTES.dataAnalysis:'analytics.html'` entry — drop it entirely (no `analytics.html` page
  exists or will be built), matching how Spec 035 trimmed `studentResult`/`studentEvaluation` and
  Spec 036 trimmed `teacherCategories`.
- New fixture: `DATA_INSIGHTS` in `fixtures/reports.js` — authored array of `{ id, areaKey, count,
  trendId, statusId, noteKey }`; `trendId` is a closed categorical LABEL set (`improving` /
  `steady` / `declining`), hand-assigned per row — never derived by comparison/math/date-diff in
  code.
- Locale: new `rep.analysis.*` keys mirrored in `ar/en.rep.js`, 0 divergence (same namespace
  convention as `rep.monthly.*`).

## Must render (display-only)
- In-panel section title + muted sub line (no duplicate top-level `pageHeader()`).
- **Filters** (`filterBar()`) scoped to the analysis rows grid: an `area`/`subject` facet (reuse the
  existing area vocabulary — attendance/sessions/coursesGroups/teachers/studentsFamilies), plus a
  `period` facet ONLY if grounded, using the SAME closed authored month list as the Monthly tab — no
  new time dimension invented.
- **Insight cards** (`summaryCards()`/`cardGrid()`): authored COUNT literals per area/subject, each
  paired with ONE categorical trend/status chip from the closed `improving`/`steady`/`declining` set
  (reuse `chip()`/`reportSignalChip()`-style rendering).
- **Insight list**: a read-only `cardGrid()`, id `#da-grid`, cards classed `.da-*` (never
  `.report-card`) of `DATA_INSIGHTS` rows — area/subject, count, trend/status chip, short authored
  note. `noResults()` for the empty-filter state.
- Optional read-only detail drawer ONLY if grounded in the row shape above — omit rather than
  invent.

## Must NOT
- Any real analytics/BI engine; any client-side computation producing a number not already present
  verbatim in the fixture.
- Any computed metric/percentage/rank/prediction/forecast/derived trend arithmetic (e.g. no "+12%
  vs last month" — a computed claim, not a label).
- Score/leaderboard; any money/finance/salary/payout figure.
- `<canvas>`, chart library, or ANY plotting — forbidden even when every underlying number is an
  authored literal, because a chart visually implies a computed/derived analysis.
- Fake Export/PDF success; backend/API/websocket call.
- Reuse of `#reports-grid` / `.report-card`.

## Fallback rule (documented gate)
- If, at implementation time, no sufficiently grounded authored insight rows can be produced
  without inventing metrics not traceable to any existing fixture/legacy evidence, the panel MUST
  fall back to a documented `backendRequired` analysis gate: a header + explanatory note + ONE
  clickable `data-disabled-reason` control — instead of fabricating insight data. Record this
  decision in `implementation-status.md`. If the fallback is used, it must be the ONLY content in
  the panel (no partial/invented board alongside the gate).

## Final gated actions
- Any Export / "Run analysis" / Refresh-analysis control = `data-disabled-reason` `backendRequired`
  gate — identical honesty class to the Monthly tab's Export/Send gates and the existing
  `reportActions()` Print/CSV/Share gates.

## Acceptance (smoke)
- `reports.html#view=analysis` / `.en` opens the Analysis tab on fresh load; the board (or fallback
  gate) renders.
- 0 computed-metric / 0 `<canvas>` / 0 finance-figure token in the panel; 0 fake-success toast on
  Export/Run-analysis (gate present instead).
- If the fallback-gate path is used: assert the gate renders and is the ONLY content in the panel.
- a11y critical=0 serious=0 on the panel (light/dark/mobile-390); existing
  reports/payHit/finance/child-view/Spec 026-036 asserts stay byte-verbatim.
