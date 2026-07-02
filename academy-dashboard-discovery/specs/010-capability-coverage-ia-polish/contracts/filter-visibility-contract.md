# Contract: Filter Visibility (Spec 010)

**Status**: Binding · The app-wide `[hidden]` defect fix and its proof. References FR-012/FR-013; US5; SC-004; research D7.

## 1. The defect (confirmed, inherited)

The runtime filter mechanism sets the `hidden` attribute on `[data-row]` elements, but a component's own display rule can win the CSS specificity tie, leaving "hidden" rows visually rendered. Confirmed broken on `attendance.html` (10 attr-hidden / 15 visible — Spec 009 REVIEW flagged for follow-up); fixed for finance only (`.fin-row[hidden]`); unaudited on the other filterable pages.

## 2. The fix (one shared rule + no blind trust)

- `src/styles/app.css` gains ONE rule, placed after all component blocks: `[data-row][hidden] { display: none !important; }` — scoped to the exact closed-hook attribute the filter sets; `!important` is the standard hidden-reset pattern and is documented in research D7 (the only `!important` this spec permits).
- Existing narrow rules (`.fin-row[hidden]`, `.tt-block[hidden]`, `.tabpanel[hidden]`, `.cat-panel[hidden]`, `.wiz-step[hidden]`) stay — zero-risk redundancy.
- Components that manage visibility WITHOUT `data-row` (tabs, panels, wizard steps, drawers, menus) are intentionally outside the rule's reach and MUST be regression-checked by the existing smoke behaviors (tab switching, drawer open/close, category panels).

## 3. Per-page empirical verification (the "no blind CSS patch" clause)

`tests/smoke/run.cjs` gains a computed-visibility assertion for EVERY page with `[data-filter-form]` or `[data-filter-set]` — at minimum: attendance, sessions, schedule (list view), students, teachers, courses, groups, families, teacher-performance, finance (existing Spec 009 check stays). Pattern (the Spec 009 (j) precedent): apply a narrowing filter → `visible rows (getComputedStyle(r).display !== 'none')` MUST equal the rows matching the facet. The attendance case MUST reproduce the historical numbers' fix (a filter that previously left 15 visible now shows only the matching set). Zero-match case: apply an impossible filter combination where the page's filter form allows it → empty state visible, zero visible rows.

## 4. Boundaries

No JS change to the filter mechanism (`enhance.js` untouched); no per-page CSS forks; no new hook; no change to which rows carry `data-row`.

**Acceptance (binding):**
1. **Given** attendance with a status tile applied, **When** rows are counted by computed display, **Then** visible == matching (and a screenshot frame proves it visually).
2. **Given** every filterable page, **When** the smoke computed-visibility block runs, **Then** all pass in both languages.
3. **Given** tabs/drawers/panels/wizard, **When** existing smoke behaviors run, **Then** all still pass (no over-hiding regression).
4. **Given** `app.css`, **When** greped, **Then** exactly one new `[data-row][hidden]` rule exists and no other `!important` was added.
