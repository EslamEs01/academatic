# Contract — Reports Tabs Wrap (overview / monthly / analysis)

**Decision:** wrap the existing `renderReports()` body as the **overview** tab (first/default) on
`reports.html`, and add two sibling display-only tabs — **monthly** (`#view=monthly`) and
**analysis** (`#view=analysis`) — via the shared `tabs({group:'reports', items, panels})` widget
(`components/tabs.js`), the same mechanism proven by Spec 036 on `teacher-performance.html`. Count
impact: **0** (fold, no new page; route-freeze stays 115).

## Mechanism
- `tabs({ group: 'reports', items: [{id:'overview',...}, {id:'monthly',...}, {id:'analysis',...}], panels })`.
- `panels.overview` = the CURRENT `renderReports()` body verbatim: `reportActions()` +
  `operationsOverview()` + `categorySection()` + `detailSections()` + `feedbackSection()` +
  `formsSection()` — byte-identical markup, only re-parented under the `overview` tabpanel.
- `panels.monthly` / `panels.analysis` = new authored panels (see their own contracts).
- `enhance.js`'s existing `#view=` hash deep-link opener (already wired since Specs 035/036)
  activates the matching tab on fresh load — 0 new code, 0 new hook, 0 new storage key (reuses the
  existing `academy.schedView.reports` localStorage convention the `tabs()` widget already uses for
  other groups).
- `overview` is index 0 → the default/active tab when no hash (or an unrecognized hash) is present.

## Must preserve (byte-verbatim)
- `#reports-grid` and its exactly 7 `.report-card` elements (5 available + 2 planned/`backendRequired`)
  — the existing `tests/smoke/run.cjs` asserts scoped to `#reports-grid` (approx. lines 823-826,
  886-890: `cards===7`, `availableCards===5`, `plannedCards===2`, the area-filter narrowing check)
  must stay green untouched, because the whole pre-existing body moves into `overview` unchanged.
- `feedbackSection()` / `formsSection()` and all existing Spec 026-036 reports asserts.
- `reportActions()`'s 4 disabled-with-reason export gates + the Schedule confirm.

## Must NOT (new tab panels)
- Reuse the id `#reports-grid` or the class `.report-card` on any monthly/analysis markup — monthly
  uses `#mr-grid` / `.mr-*`, analysis uses `#da-grid` / `.da-*` (new, non-colliding hooks so the
  existing grid-scoped smoke queries can never accidentally match new content).
- Introduce any new `data-*` hook, storage key, or dependency beyond the existing `tabs()`/`#view=`
  mechanism.
- Add a duplicate top-level `pageHeader()` call inside monthly/analysis (the page already has one for
  `reportsPage.title`); each new panel gets only its own in-panel section title.

## Acceptance checks
- `reports.html` (+ `.en`) with no hash (or `#view=overview`) shows the overview tab active,
  `#reports-grid` visible with 7 cards (5 available / 2 planned) exactly as before.
- `reports.html#view=monthly` / `.en` opens the Monthly tab on fresh load (no click required);
  `reports.html#view=analysis` / `.en` opens the Analysis tab on fresh load.
- Tab buttons: exactly 3, `role="tab"`, one `aria-selected="true"` at a time, roving-tabindex
  keyboard cycling (arrows/Home/End) — same behavior already a11y-audited for the
  `teacher-performance` 3-tab widget.
- Diff on `reports.js`: additive only (the tabs wrap + two new panel-builder functions);
  `enhance.js` / `build-html.mjs` / `i18n.js` 0-diff.
- Nav: `monthlyReports` and `dataAnalysis` in `nav.config.js` flip `planned` to `implemented`, routed
  at `reports.html#view=monthly` / `reports.html#view=analysis`; admin-menu count stays 50;
  route-freeze stays 115 (0 new page).
