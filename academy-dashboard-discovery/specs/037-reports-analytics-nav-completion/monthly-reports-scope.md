# Monthly Reports — Scope (Spec 037)

## Tab decision
- Route: `reports.html#view=monthly` (and the EN mirror `reports.en.html#view=monthly`).
- Page-count impact: **0 new pages**. `monthlyReports` folds into the existing `reports.html` as a
  new tab, exactly like the Spec 035/036 fold-anchor precedent (`family-categories` →
  `families.html`, `sessionsKpi`/`monthlyPerf` → `teacher-performance.html`).
- Mechanism: wrap the CURRENT `renderReports()` body (`operationsOverview` + `categorySection` +
  `detailSections` + `feedbackSection` + `formsSection`) as the **overview** tab, and add a
  sibling **monthly** tab, both driven by the shared `tabs({ group: 'reports', items, panels })`
  widget (`components/tabs.js`) already proven in `teacher-performance.js`. `enhance.js`'s existing
  `#view=` deep-link opener (proven by Specs 035/036) activates the Monthly tab on fresh load with
  no new hook.
- Nav flip: `nav.config.js` — `monthlyReports` item (`nav.monthlyReports`, icon `reports`)
  `status: 'planned'` → `implemented`, `route: 'reports.html#view=monthly'`. Drop the
  `FUTURE_ROUTES.monthlyReports: 'monthly-reports.html'` entry (stale — no such page is ever built).

## Display sections (all authored, display-only)
1. **Tab header** — reuse the existing `pageHeader`-style section title/sub pattern already used
   inside `reports.js` (`section-title` + muted `<p>` sub line), scoped to the monthly panel; no
   duplicate top-level `pageHeader()` call (the page already has one for `reportsPage.title`).
2. **Month filter** — a `filterBar()` select, `targetId` pointed at the monthly rows grid, single
   `month` facet with an authored, closed month list (e.g. `mar`/`apr`/`may` — 3 authored fixture
   months only, no live calendar/date-math). Reuse `facetAttrs()` for row filtering, matching the
   existing `area`/`availability` filter pattern in `categorySection()`.
3. **Summary cards** — `summaryCards([...])` tiles per month: authored COUNT literals only —
   sessions-completed, attendance/outcome-follow-up count, cancelled/rescheduled count. Same tile
   shape as `operationsOverview()`'s `summaryCards` call (icon + tone + `num(value)` + labelKey).
4. **Report rows grid** — `cardGrid()` of authored rows, one per (month × area), each carrying:
   month label, area/category label, an authored COUNT literal, and one categorical status chip
   (reuse `chip()` / `reportSignalChip()` — e.g. `healthy` / `needsFollowUp`, the same signal
   vocabulary as `signalFor()`). `noResults()` for the empty-filter state (existing primitive,
   single global `[data-no-results]` contract — untouched).
5. **Optional detail drawer** — ONLY if grounded in an existing row shape; a read-only
   `previewTemplate()`/`data-drawer` sheet showing the row's month/area/count/chip/note, no new
   fields invented. If no grounding surfaces, omit — do not invent one to fill a slot.

## Allowed authored data
- `month` (closed 3-value authored list), `area`/`category` label, `count` (integer literal),
  categorical status chip (from the existing signal/status/outcome chip vocabulary — no new tone),
  a short authored `note` string.
- Explicitly **forbidden as data**: any money/finance/salary/payout figure, any computed
  percentage/score/rank/average/aggregate/trend-math, any chart/canvas/table-plotting artifact.

## Forbidden behavior
- No real report generation, rendering, or compilation of any kind.
- No fake Export/PDF/Download/Print success (no `toast('saved')`-style fake confirmation).
- No fake email/Send confirmation.
- No computed finance figure anywhere in the tab.
- No backend/API/websocket call of any kind.
- No row/status mutation (no persisted edit, no optimistic UI change).
- No `<canvas>`, no chart library, no client-side plotting.

## Final gated actions
- Any Export / PDF / Send / "Generate report" control in this tab is a `data-disabled-reason`
  `backendRequired` gate — identical honesty class to the existing reports Print/CSV/Share gates
  (`reportActions()` in `reports.js`) and the R-G Print re-pin from Spec 029. No exceptions.

## Fixture plan
- New authored rows added to (or alongside) `fixtures/reports.js` — e.g. a `MONTHLY_REPORTS` array
  of `{ id, month, area, count, signal, note }` objects, 3 months × the existing 5 report areas
  (attendance/sessions/coursesGroups/teachers/studentsFamilies) at most — no PII, no pay/salary
  token, no invented entity.
- Locale: mirrored AR/EN keys under `rep.monthly.*` in the existing `ar/en.rep.js` locale pair
  (reuse the established `rep.*` namespace already used by `report-feedback.js`'s `rep.fb.*`/
  `rep.form.*`) — 0 divergence between AR and EN key sets.

## Smoke / a11y / screenshot scope
- Smoke: `reports.html#view=monthly` and `reports.en.html#view=monthly` deep-links open the Monthly
  tab on fresh load (no click needed); the monthly board renders with the month filter, summary
  cards, and row grid; 0 computed-metric / 0 chart / 0 `<canvas>` / 0 finance-figure token in the
  tab; 0 fake-success toast on any Export/Send control (`data-disabled-reason` present instead).
  Re-pin all existing reports/payHit/finance/child-view/Spec 026-036 asserts byte-verbatim.
- a11y: critical=0 serious=0 on the Monthly tab, light + dark + mobile-390, tab-panel
  keyboard/focus behavior consistent with the existing `tabs()` widget (already a11y-audited in
  Spec 036).
- Screenshots: Monthly tab AR, EN, dark, mobile-390 — 0 console errors.
