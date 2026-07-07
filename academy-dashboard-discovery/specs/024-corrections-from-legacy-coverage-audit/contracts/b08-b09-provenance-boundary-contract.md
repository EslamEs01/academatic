# Contract: B-08 / B-09 — Exclusion + finance-boundary provenance (Should fix)

**Problem**: intentional exclusions are correct but not durably recorded (032 would flag them); the admin-invoice-amount vs pay-figure boundary is unstated (a future pass could break either direction).

## Allowed edits (documentation only)

- Append-only "recorded in 024" status to `specs/023-…/missing-capabilities-register.md` for M-10…M-16 (teacher pay surfaces, family Amount, chart/score engines, fake-action engines, finance/payroll boundary, notifications/shortcuts, admin payroll figures).
- Add a concise provenance block to `app/README.md` and the CLAUDE.md hard-constraints area.

## The finance-boundary sentence (B-09/B-15, verbatim intent)

> Authored admin invoice-amount literals on admin finance pages are Spec-009-sanctioned (zero aggregate, zero runtime math, admin-only); salary/payroll/compensation/payout **figures** are NEVER allowed anywhere; family and teacher surfaces stay figure-free.

## Forbidden

- Any code/UI change (records only).
- Restoring a law-excluded surface or copying amounts onto family/teacher surfaces.

## Acceptance

- Each exclusion appears in a record with its governing law cited.
- The one-sentence finance boundary exists in README/CLAUDE + the 023 register.
- `finance.html` invoice literals unchanged; family/teacher figure-free.

**Owner**: 024-correction (Should fix). Finance-boundary note also carried toward the 030 contract.
