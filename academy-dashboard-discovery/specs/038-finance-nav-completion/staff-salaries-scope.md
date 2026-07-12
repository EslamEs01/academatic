# Scope — `staffSalaries` nav item

## Current state (grounded)
- `app/src/js/nav.config.js:88` — `item({ id: 'staffSalaries', labelKey: 'nav.staffSalaries', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' })`, Finance sub-section, immediately after `salaries`.
- `app/tests/smoke/run.cjs:1586` — `staffSalaries` is a member of `lockedFin`, asserted disabled+reason+lock alongside `salaries`.
- The staff board already exists as a SECTION inside the same Salaries tab: `salaryBoard('staff', 'fin.sal.staff')` in `app/src/js/pages/finance.js:239`, rendered under the teacher board within `salariesSection()`. It reads `SALARIES.filter((s) => s.role === 'staff')` — 2 rows (`sal5` owner, `sal6` coord) from `app/src/js/fixtures/finance.js:114-115`. Same figure-free shape as teacher rows: `{ nameKey, statusId, periodKey }`, no amount.

## Open decision (record — do not resolve here)
Two honest options, both zero-new-page:

**(a) Recommended — deep-link to the existing shared tab: `finance.html#view=salaries`.**
The staff board is already a distinct, labeled section (`fin.sal.staff` heading) inside that one tab. `staffSalaries` becomes a second nav anchor pointing at the same `#view=salaries` URL the `salaries` item already targets — both items resolve to one panel that shows both boards. Simplest; zero new markup, zero new fixture rows, zero new locale keys beyond what Spec 030 already shipped. Consistent with the Spec-036 precedent where `addTeacher`/`teacherCategories` both fold into `teachers.html` reusing existing drawers.

**(b) A dedicated `finance.html#view=staff-salaries` tab (or sub-view).**
Would require: a 4th `tabs()` item (`{ id: 'staff-salaries', labelKey: ..., icon: 'staff' }`), splitting `salaryBoard('staff', ...)` out of `salariesSection()` into its own panel function, and either duplicating the 4 action gates or sharing them. Adds tab-count surface area and a locale-key delta for no functional gain (the content does not change, only its container).

**Recommendation: (a)**, unless `/speckit.plan` decides the finance category should carry one tab per distinct nav item for IA clarity (in which case a smaller alternative to (b) is a same-panel in-page `#staff` anchor/scroll target rather than a full extra tab). Two nav items resolving to the same `#view=` is already the established pattern for teacher deep-links (`sessionsKpi` and `monthlyPerf` are two separate tabs, but `addTeacher`/`teacherCategories` are two separate items folding to the SAME page via drawers, not tabs — the closer precedent for (a) is "two nav ids, one destination").

## Route
- (a): `finance.html#view=salaries` (shared with `salaries`).
- (b), if chosen: `finance.html#view=staff-salaries` (new tab id; would need `tabs()` items/panels updated and the coherence guard in `finance.js` extended by one panel).

## Display sections (unchanged either way — already shipped)
Staff board only: `fin.sal.staff` heading + `cardGrid` of 2 rows (owner, coordinator) — name + period + status chip. If (b), the 4 action gates (Generate/Approve/Mark-paid/Export) would need to be duplicated or scoped to "staff" copy variants — an added complexity that favors (a).

## Allowed authored data
Same `SALARIES` fixture rows filtered to `role: 'staff'` — `nameKey`, `statusId`, `periodKey`. No new fixture rows required for either option.

## Forbidden
Identical to `salaries-scope.md`: no pay/rate/payout/compensation figure, no computed total, no real mutation on Generate/Approve/Mark-paid/Export, no weakening the teacher-pay-free / figure-free law (this board covers staff, not teachers, but the same figure-free contract applies to ALL salary boards per the canonical law).

## Gated finals
Same 4 existing gates, reused as-is under option (a). Under option (b) the same reasons keys (`fin.sal.generateReason` etc.) would still apply — no new gate semantics either way.

## Smoke / a11y scope
- Amend `lockedFin` (`run.cjs:1586`) to remove `'staffSalaries'`.
- Add a nav-anchor resolution assert for `staffSalaries` → its chosen route (must load, must land on a panel showing the staff board within scroll/view).
- If (b): add a 4th tab-id assertion to the existing `f30.tabIds` check (`run.cjs:1096`) and re-verify `salFigureFree`/`salGates` scoped per-panel.
- a11y: no new interactive surface under (a); a new tab-switch row under (b).

## Acceptance
- Count 115 unchanged; admin-menu 50 unchanged.
- Under (a): `finance.html`/`.en` `#page-body` byte-identical (nav-only fold-anchor).
- Under (b): `finance.html`/`.en` bodies change (new tab panel) — must stay isolated to finance.html, no other page touched.
- 0 pay figure anywhere; `SALARIES` fixture shape untouched (or additive-only if (b) needs a filter refinement, never a new field).
