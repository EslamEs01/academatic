# Contract — `salaries` Nav Unlock

**Decision:** unlock (fold-anchor) to the EXISTING figure-free Salaries tab. Count 0. No body edit
beyond the tab already shipped by Spec 030.

## Current → target
- `nav.config.js:87` — `item({ id:'salaries', labelKey:'nav.salaries', icon:'wallet', status:'disabled', reasonKey:'nav.reason.finance' })` (Finance sub-section, `cat.finance`).
- Target: `status:'implemented'`, `route:'finance.html#view=salaries'` (`finance.en.html#view=salaries` mirrored). `reasonKey` removed (implemented items carry no reason).

## Mechanism
- The destination ALREADY EXISTS: `pages/finance.js` `salariesSection()` (lines 226-240), the `salaries`
  panel of the Spec-030 `tabs({ group:'finance' })` hub in `renderFinance()`. Reads `SALARIES` from
  `fixtures/finance.js:109-116` (6 rows: 4 `role:'teacher'` + 2 `role:'staff'`).
- `#view=salaries` opens the tab on fresh load via the existing `tabs()` hash mechanism (the Spec-036
  `#view=sessions-kpi` precedent). No new tab, panel, fixture row, or locale key is required.

## Must render (unchanged, already shipped)
- Tab header (`fin.sal.title`/`fin.sal.sub`) + 4 action gates (Generate/Approve/Mark-paid/Export).
- Teacher board (`fin.sal.teacher`, 4 rows) + staff board (`fin.sal.staff`, 2 rows) — each row =
  name + `fin.sal.lblPeriod` + `salaryStatusChip(statusId)` **only**.

## Must NOT
- ❌ Any salary / rate / hour_rate / fine / payout / payroll / compensation figure or currency amount
  on the board or anywhere reachable from it (the teacher pay-free GLOBAL + salary-figure-never-shown
  law; this board is the ONE sanctioned figure-free exempt display — it must stay that way, not become
  a leak).
- ❌ Any computed total, sum, average, or per-teacher/per-staff pay value.
- ❌ Any real Generate/Approve/Mark-paid/Export mutation, PDF, CSV, or download.
- ❌ A new fixture row, a new tab, or any edit to `finance.js`/`finance.js` fixture beyond what Spec 030
  already shipped.

## Gated finals
Generate / Approve / Mark-paid / Export stay the existing `data-disabled-reason` gates
(`fin.sal.generateReason`/`fin.sal.approveReason`/`fin.sal.markReason`/`fin.sal.exportReason`) —
clickable, keyboard-reachable, no persistence. Reused as-is; no new gate.

## Smoke / a11y
- `nav010` `lockedFin` (`run.cjs:1586`) amended to remove `'salaries'` (the ONE declared supersession).
- New nav-anchor assert: `salaries` → `finance.html#view=salaries` resolves + opens the Salaries tab on
  fresh load, AR + EN.
- Re-assert `salFigureFree` (existing figure-free check) stays green now that the item is a live anchor.
- a11y: no new surface; only the nav anchor's disabled→enabled state changes — re-verify keyboard focus
  reachability.

## Acceptance
- `finance.html`/`.en` `#page-body` byte-identical to pre-038 (fold-anchor only; only `nav.config.js` +
  smoke change).
- Admin menu 50 items unchanged; count 115 unchanged (0 new pages).
- 0 pay/salary/rate/payout figure anywhere in the reachable subtree, both languages.
