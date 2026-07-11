# Contract — `staffSalaries` Nav Unlock

**Decision:** unlock (fold-anchor) to the SAME Salaries tab `salaries` targets — option (a) from
`staff-salaries-scope.md`. Count 0. No new tab, no new panel, no body edit beyond Spec 030.

## Current → target
- `nav.config.js:88` — `item({ id:'staffSalaries', labelKey:'nav.staffSalaries', icon:'wallet', status:'disabled', reasonKey:'nav.reason.finance' })` (Finance sub-section, immediately after `salaries`).
- Target: `status:'implemented'`, `route:'finance.html#view=salaries'` (`finance.en.html#view=salaries`
  mirrored) — **the identical hash route `salaries` uses**. `reasonKey` removed.

## Mechanism
- The staff board already exists as a labeled SECTION inside the one Salaries tab:
  `salaryBoard('staff', 'fin.sal.staff')` (`pages/finance.js:239`), reading
  `SALARIES.filter((s) => s.role === 'staff')` — 2 rows (`sal5` owner, `sal6` coord) from
  `fixtures/finance.js:114-115`. Same figure-free shape as teacher rows: `{ nameKey, statusId, periodKey }`.
- Two nav ids resolving to one destination is an established pattern (Spec 036 `addTeacher`/
  `teacherCategories` → `teachers.html`); here both ids resolve to the SAME `#view=salaries` panel, which
  already shows both the teacher board and the staff board together.
- **No 4th tab.** A dedicated `#view=staff-salaries` sub-panel was considered (`staff-salaries-scope.md`
  option b) and rejected — it would duplicate/split the 4 action gates for zero functional gain.

## Must render (unchanged, already shipped)
- Staff board only, as the second board on the existing Salaries panel: `fin.sal.staff` heading +
  `cardGrid` of 2 rows (owner, coordinator) — name + period + status chip.

## Must NOT
- ❌ Any pay/rate/hour_rate/fine/payout/payroll/compensation figure — identical standing law to
  `salaries-unlock-contract.md`; this covers staff, not teachers, but the same figure-free contract
  binds every salary board.
- ❌ A new tab, a new fixture row, a new locale key, or a role-scoped variant of the 4 action gates.
- ❌ Splitting `salaryBoard('staff', …)` out of `salariesSection()` into its own panel.
- ❌ Any real Generate/Approve/Mark-paid/Export mutation.

## Gated finals
Same 4 existing gates (`fin.sal.generateReason`/`approveReason`/`markReason`/`exportReason`) reused
as-is — no new gate semantics, no per-role gate variant.

## Smoke / a11y
- `nav010` `lockedFin` (`run.cjs:1586`) amended to remove `'staffSalaries'`.
- New nav-anchor assert: `staffSalaries` → `finance.html#view=salaries` resolves, opens the Salaries
  tab, and the staff board (`fin.sal.staff` section, 2 rows) is present in view, AR + EN.
- No new interactive surface (option a) — no new a11y row required beyond the anchor's enabled state.

## Acceptance
- `finance.html`/`.en` `#page-body` byte-identical to pre-038 (nav-only fold-anchor; both `salaries` and
  `staffSalaries` land on the same rendered panel).
- Count 115 unchanged; admin-menu 50 unchanged.
- `SALARIES` fixture shape untouched — no new field, no new row.
- 0 pay/salary/rate/payout figure anywhere in the reachable subtree, both languages.
