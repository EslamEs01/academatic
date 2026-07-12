# Spec Quality Checklist — Spec 038 (Finance Nav Completion)

**Purpose**: Verify the Spec 038 grounding artifacts (`legacy-finance-coverage.md`,
`role-law-and-no-fake-carryover.md`, `future-owner-register.md`) are complete, honest, and free of
ambiguity before `plan.md`/`tasks.md` are authored. Audit-and-grounding checklist only — no
implementation/plan/tasks/commit/push performed as part of this checklist.

## Content Quality

- [X] No `[NEEDS CLARIFICATION]` marker anywhere in the three grounding documents
- [X] Targeted grounding is complete: `page-inventory.md` grepped for invoice/payment/salary/bank/
      analysis/monthly/expense; `management-analysis-expenses.md`, `management-analysis-invoices.md`,
      `management-monthly-invoices.md`, `management-salary-class-report.md` read in full
- [X] Current-state grounding is complete: `nav.config.js` `cat.finance` sub-section read (exact 7
      `lockedFin` ids confirmed), `finance.js`/`fixtures/finance.js` read (Overview/Salaries/Banks
      tab structure + `FINANCE_SUMMARY`/`PLANNED_FINANCE`/`SALARIES`/`BANKS` fixtures confirmed),
      `run.cjs` finance-body + `lockedFin` asserts read in full
- [X] Every claim in `legacy-finance-coverage.md` cites an evidence path (page-inventory line range
      or a specific admin-pages `.md` capture)
- [X] Language is spec-appropriate (WHAT/WHY grounding, not HOW-to-code; no source edits made)

## Requirement Completeness

- [X] `invoices` covered (row in `legacy-finance-coverage.md`, disposition = unlock to
      `finance.html#view=invoices`)
- [X] `payments` covered (disposition = unlock to `finance.html#view=payments`)
- [X] `monthlyInvoices` covered (disposition = unlock to `finance.html#view=monthly-invoices`,
      deep-links to the existing planned card — no new board fabricated from an empty legacy grid)
- [X] `salaries` covered (disposition = unlock to `finance.html#view=salaries`, figure-free)
- [X] `staffSalaries` covered (disposition = unlock to `finance.html#view=salaries` /
      `#view=staff-salaries`, figure-free)
- [X] `classSalaryReport` covered (disposition explicitly recorded as OPEN — board vs. honest-lock
      — with both branches documented and both branches given an owner in
      `future-owner-register.md`)
- [X] `banks` covered (disposition = unlock to `finance.html#view=banks`, name+status only)
- [X] `finance-analysis` (analysis-expenses + analysis-invoices) ownership recorded: explicitly
      NOT unlocked in Spec 038; both rows present in `legacy-finance-coverage.md` with the
      computed-money evidence quoted (Net Profit/Revenue/Salaries totals; Discount/Paid/UnPaid/
      Overdue totals); both rows also present in `future-owner-register.md` with owner = future
      backend billing/accounting spec (post-041)
- [X] Count target defined: 0 new pages, page total held at 115 (all 7 unlocks resolve to
      `finance.html#view=…` deep-links, no new `build-html.mjs` entry)
- [X] Route contract defined per item: `invoices→#view=invoices`, `payments→#view=payments`,
      `monthlyInvoices→#view=monthly-invoices`, `salaries→#view=salaries`,
      `staffSalaries→#view=salaries` (or `#view=staff-salaries`), `banks→#view=banks`,
      `classSalaryReport→#view=class-salary-report` (locked-branch) or a new board anchor
      (open-branch) — final selection deferred to `plan.md`, both options recorded
- [X] No-fake-money register complete: authored per-row literals (invoices/payments/monthly, SAR)
      vs. `FINANCE_SUMMARY` row-count-only vs. figure-free salaries/staff/class vs. name+status
      banks vs. permanently-forbidden computed total/balance/profit/loss/revenue/VAT/tax — all
      five buckets enumerated in `role-law-and-no-fake-carryover.md` §1
- [X] Finance locks/gates register complete: every write action (Create/CSV/PDF/Print/
      Record-payment/Generate/Approve/Mark-paid/Export/Add-bank/Import/Reconcile) confirmed to stay
      a `backendRequired` gate post-038; 0 new write action introduced by this spec

## Finance Honesty

- [X] No computed total/balance/profit/loss/revenue/VAT/tax figure proposed anywhere in the three
      documents (analysis-expenses/analysis-invoices explicitly deferred, not approximated)
- [X] No fake mark-paid/settle/refund/reconcile/generate/PDF/export/send/receipt proposed
- [X] No payment-gateway credential/webhook/API-key surface proposed
- [X] Teacher pay-free GLOBAL carryover documented (salary boards stay figure-free; `teacher-*`
      family untouched)
- [X] Family zero-pay carryover documented (family-portal untouched; the admin invoice literals
      correctly distinguished as the pre-existing Spec-009-sanctioned admin-only demo, not a
      family-portal surface)
- [X] Student child-view carryover documented (no student/student-portal file in scope)
- [X] No computed metric/score/chart/canvas carryover documented, including the open
      `classSalaryReport` board branch (must stay categorical, never a computed pay score)

## Feature Readiness

- [X] Role-law carryover is enumerated per standing law (finance no-fake-money, teacher pay-free,
      family zero-pay, student child-view, no computed metric, no fake success wording, closed
      hook set, admin-menu-50/route-freeze, reports finance-free) with the specific protected
      smoke assert(s) named for each
- [X] The ONE sanctioned amendment is isolated and named precisely: the `lockedFin`/`lockedOk`
      assert at `app/tests/smoke/run.cjs:1586-1604`, scoped to only the items actually promoted
      (still-locked items must keep asserting `disabled`+reason)
- [X] No `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` change proposed (0 new pages; any
      new label copy reuses the existing `fin.*` locale namespace already registered for
      `finance.html`)
- [X] No implementation performed (no source edited, no app run) — this checklist and its sibling
      documents are grounding-only artifacts for `plan.md`/`tasks.md`
- [X] No commit / no push performed as part of producing these artifacts

## Notes

Baseline is committed and clean: HEAD `56bc418` bundles Specs 035/036/037; branch
`feature/012-role-portal-foundation`; `feature.json` points at 038; page count 115. No
green-tree caveat applies — the baseline-commit gate is satisfied outright. These four documents
are audit/grounding artifacts only; `plan.md`/`tasks.md`/contracts are a separate, later step.
