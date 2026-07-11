# Scope — `salaries` nav item

## Current state (grounded)
- `app/src/js/nav.config.js:87` — `item({ id: 'salaries', labelKey: 'nav.salaries', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' })`, inside the Reports category's Finance sub-section (`cat.finance`).
- `app/tests/smoke/run.cjs:1586` — `lockedFin = ['invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'classSalaryReport', 'banks']`; `salaries` is asserted `disabled` + `data-reason-key="nav.reason.finance"` + lock icon.
- The DESTINATION content already exists and ships today: `app/src/js/pages/finance.js` `salariesSection()` (lines 226-240), rendered as the `salaries` tab panel of the Spec-030 `tabs({ group: 'finance' })` hub in `renderFinance()` (line 289-292). It renders `salaryBoard('teacher', 'fin.sal.teacher')` + `salaryBoard('staff', 'fin.sal.staff')` over `SALARIES` from `app/src/js/fixtures/finance.js:109-116` (6 rows: 4 `role:'teacher'`, 2 `role:'staff'`; each `{ nameKey, statusId, periodKey }` — **no amount field exists on the row shape**).

## Decision
**Unlock.** `salaries` flips `disabled → implemented` and deep-links to the tab that already exists. No new UI is built — this item is a pure fold-anchor, matching the Spec-036 `addTeacher`/`teacherCategories` precedent (nav flip → existing drawer/tab, body byte-identical).

## Route
`finance.html#view=salaries` (and the mirrored `finance.en.html#view=salaries`). Uses the existing `tabs()` `#view=` deep-link convention already proven by `finance.html#view=salaries`/`#view=banks` (Spec 030) and `teacher-performance.html#view=sessions-kpi` (Spec 036).

## Display sections (unchanged — already shipped)
1. Tab header: `fin.sal.title` / `fin.sal.sub`.
2. Action row (4 gates): Generate, Approve, Mark-paid, Export.
3. Teacher board (`fin.sal.teacher`): `cardGrid` of 4 rows — name + `fin.sal.lblPeriod`: period + `salaryStatusChip`.
4. Staff board (`fin.sal.staff`): `cardGrid` of 2 rows — same shape.

## Allowed authored data
- `SALARIES` rows: `id`, `role` (`teacher`|`staff`), `nameKey`, `statusId` (`pending`/`approved`/`paid`/`onhold` — `SALARY_STATUS_ORDER`), `periodKey`. Nothing else.
- Status chip tone/icon map (`SALARY_STATUS`) — categorical only.

## Forbidden (standing law — no change permitted here)
- Any salary/rate/hour_rate/fine/payout/payroll/compensation figure or currency amount, on this board or anywhere reachable from it.
- Any computed total, sum, average, or per-teacher/per-staff pay value.
- Any real Generate/Approve/Mark-paid/Export mutation, PDF, CSV, or download.
- Loosening the teacher pay-free GLOBAL law (this board is the one sanctioned exempt status-only display; it must stay figure-free, not become the exception that leaks a figure).

## Gated finals
Generate / Approve / Mark-paid / Export stay `data-disabled-reason` (`fin.sal.generateReason` / `fin.sal.approveReason` / `fin.sal.markReason` / `fin.sal.exportReason`) — clickable, keyboard-reachable, no persistence. No new gate is introduced; existing four are reused as-is.

## Smoke / a11y scope
- Amend the `nav010` `lockedFin` array (`run.cjs:1586`) to remove `'salaries'` (sanctioned amendment, Spec-030 nav-flip precedent) and add a nav anchor assertion (`salaries` → `finance.html#view=salaries`, resolves + opens the Salaries tab on fresh load, same pattern as the Spec-036 `#view=sessions-kpi` deep-link check).
- Re-assert `salFigureFree` (existing `run.cjs:1100`-style check) still passes with the nav item now a live anchor.
- a11y: no new surface (existing salaries-tab a11y rows already cover light/dark/mobile-390; only the nav anchor state changes from disabled to enabled — re-verify focus/keyboard reachability of the anchor itself).

## Acceptance
- `finance.html`/`.en` `#page-body` byte-identical (fold-anchor only; nav-config + smoke change).
- Admin menu 50 items unchanged; count 115 unchanged (0 new pages).
- 0 pay/salary/rate/payout figure anywhere in the reachable subtree.
