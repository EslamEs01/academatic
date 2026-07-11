# Contract — monthlyReports Tab

**Decision:** a display-only tab on `reports.html` → `#view=monthly`. Count impact **0**
(fold-anchor, mirrors the Spec 036 `monthlyPerf`/`sessionsKpi` precedent).

## Mechanism
- Second panel in the `tabs({group:'reports'})` wrap (see `reports-tabs-contract.md`);
  `#view=monthly` opens it on fresh load, AR+EN.
- Nav: `nav.config.js` `monthlyReports` item `status:'planned'` → `implemented`,
  `route:'reports.html#view=monthly'`; drop the stale `FUTURE_ROUTES.monthlyReports:
  'monthly-reports.html'` entry (no such page is ever built).
- New fixture: `MONTHLY_REPORTS` in `fixtures/reports.js` — authored array of `{ id, monthKey,
  areaKey, count, statusId, noteKey }` (3 authored months × the existing 5 report areas at most —
  attendance/sessions/coursesGroups/teachers/studentsFamilies). No PII, no pay/salary token, no
  invented entity.
- Locale: new `rep.monthly.*` keys (+ `rep.tab.*` for the 3 tab labels) mirrored in `ar/en.rep.js`,
  0 divergence.

## Must render (display-only)
- In-panel section title + muted sub line (reuse the `section-title` pattern already used by
  `operationsOverview()`/`categorySection()` — no duplicate top-level `pageHeader()`).
- A **month filter** (`filterBar()`, `targetId` → the monthly rows grid, single `month` facet over
  the 3 authored months, `facetAttrs()` row-tagging — same pattern as `categorySection()`'s
  `area`/`availability` filters).
- **Summary cards** (`summaryCards()`): authored COUNT literals only (e.g. sessions-completed /
  outcomes-follow-up / cancelled-rescheduled), same tile shape as `operationsOverview()`.
- **Report rows grid**: `cardGrid()` of `MONTHLY_REPORTS`, id `#mr-grid`, cards classed `.mr-*`
  (never `.report-card`) — each row shows month label, area label, an authored COUNT literal, and
  ONE categorical status chip (reuse `chip()`/`reportSignalChip()`; `healthy`/`needsFollowUp`
  vocabulary). `noResults()` for the empty-filter state (existing global `[data-no-results]`
  contract).
- Optional read-only detail drawer (`data-drawer`/`previewTemplate()`) ONLY if grounded in the row
  shape above — omit rather than invent.

## Must NOT
- Any money/finance/salary/payout figure.
- Any computed percentage/score/rank/average/aggregate/trend-math — `count` is an authored literal,
  never derived.
- `<canvas>`, chart library, or client-side plotting of any kind.
- Real report generation/compilation of any kind.
- Fake Export/PDF/Download/Print/Send success (no `toast('saved')`-style confirmation).
- Any row/status mutation, or backend/API/websocket call.
- Reuse of `#reports-grid` / `.report-card` (see `reports-tabs-contract.md`).

## Final gated actions
- Any Export / PDF / Send / "Generate report" control in this tab = `data-disabled-reason`
  `backendRequired` gate — identical honesty class to the existing `reportActions()` Print/CSV/Share
  gates (Spec 029 R-G).

## Acceptance (smoke)
- `reports.html#view=monthly` / `.en` opens the Monthly tab on fresh load; the month filter narrows
  `#mr-grid` rows; summary cards + row grid render with authored counts + status chips.
- 0 computed-metric / 0 `<canvas>` / 0 finance-figure token in the panel; 0 fake-success toast on any
  Export/Send control (`data-disabled-reason` present instead).
- a11y critical=0 serious=0 on the panel (light/dark/mobile-390); existing
  reports/payHit/finance/child-view/Spec 026-036 asserts stay byte-verbatim.
