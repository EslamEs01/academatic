# Contract — `classSalaryReport` Honest Lock

**Decision:** **STAY LOCKED** — option (b) from `class-salary-report-scope.md`. NOT unlocked in
Spec 038. Count 0. No body edit, no new tab, no new fixture.

## Why (grounded)
A "class salary report" is, by its own legacy name, a computed **per-class teacher pay** artifact
(sessions taught × rate, or an equivalent summed payout). That computation is forbidden two ways at
once:
1. It requires a rate/hour_rate figure per teacher or per class — forbidden under the teacher pay-free
   GLOBAL law and the salary-figure-never-shown law.
2. It requires an arithmetic combination (count × rate, or a summed total) — forbidden under the
   no-fake-money / no-computed-anything law.

There is no honest version of a "salary report" that contains a salary number. Even a thin categorical
board (status-only, no amount) risks a reader inferring pay if a session/class COUNT ever sits next to
a status chip — the reviewer-burden and scope-creep risk (`class-salary-report-scope.md` §Recommendation)
outweighs the value of unlocking a route-less UI that a locked nav item + existing planned card already
communicate honestly.

## State (unchanged)
- `nav.config.js:90` — `item({ id:'classSalaryReport', labelKey:'nav.classSalaryReport', icon:'wallet', status:'disabled', reasonKey:'nav.reason.finance' })` stays exactly as-is.
- `fixtures/finance.js:99` — the `classSalaryReport` `PLANNED_FINANCE` card (`availability:'backendRequired'`, `fin.planned.classSalaryReport.title/desc`) stays unchanged, still one of the 9 planned cards rendered by `plannedSection()`.

## Owner
Future backend billing/accounting spec — a real class-salary report requires the payroll engine to
compute per-class pay; it cannot be honestly fabricated on the frontend.

## Must NOT
- ❌ No new nav route, `#view=` hash, tab, or panel for `classSalaryReport`.
- ❌ No new fixture rows shaped like a per-class pay record (no `amount`/`rate`/`hourRate`/
  `sessionsCount` field on any `classSalaryReport`-adjacent data, now or via a "categorical" workaround).
- ❌ No per-class or per-teacher pay/rate/hour_rate/fine/payout figure anywhere reachable.
- ❌ No reduction of `PLANNED_FINANCE` below 9 cards.

## Smoke / a11y
- `nav010` `lockedFin` (`run.cjs:1586`) **KEEPS** `'classSalaryReport'` — no amendment to this member;
  it stays asserted `disabled` + `data-reason-key="nav.reason.finance"` + lock icon (`#i-lock`).
- `plannedN === 9` re-asserted byte-verbatim (the card is untouched).
- No new a11y surface (no new UI exists to test).

## Acceptance
- Count 115 unchanged; admin-menu 50 unchanged.
- `classSalaryReport` nav item: `status:'disabled'`, `reasonKey:'nav.reason.finance'`, no `route` —
  identical to pre-038.
- `finance.html`/`.en` bodies byte-identical for this item's representation (the existing planned card).
- 0 per-class pay/rate/payout figure anywhere, both languages — grep-verified.
