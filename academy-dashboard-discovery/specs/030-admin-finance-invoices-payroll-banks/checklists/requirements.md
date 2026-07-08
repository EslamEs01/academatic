# Specification Quality Checklist: Admin Finance / Invoices / Payroll / Banks Deep Management

**Purpose**: Validate specification completeness and quality before `/speckit.plan`
**Created**: 2026-07-08
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs) — behavior/entities only; hook names appear only in evidence artifacts, not as prescribed code
- [x] Focused on user value and business needs (honest finance surfaces; no forgotten finance page; no fake money)
- [x] Written for non-technical stakeholders (user stories in plain language)
- [x] All mandatory sections completed (User Scenarios, Requirements, Success Criteria)

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous (FR-001…FR-030)
- [x] Success criteria are measurable (SC-001…SC-010 — counts, 0-thresholds, byte-identity)
- [x] Success criteria are technology-agnostic (outcomes, not implementation)
- [x] All acceptance scenarios are defined (each user story has Given/When/Then)
- [x] Edge cases are identified (salary/payout figures, computed aggregates, charts, downlaod, money-movement actions, payout-provider secrets, finance.html modification, confirm-on-write)
- [x] Scope is clearly bounded (Out of Scope + future-owner + no-fake-money registers)
- [x] Dependencies and assumptions identified (Assumptions section)

## 030-Specific Grounding & Law Gates

- [x] Targeted visual grounding complete (3-agent read-only audit; `visual-grounding.md` cites exact paths)
- [x] Legacy finance/accounting evidence inspected (accounting hub + transaction ledgers)
- [x] Legacy invoice/payment evidence inspected (invoices + create-parent-invoice + New-Transaction + downlaod + monthly-invoices)
- [x] Legacy salary/payroll evidence inspected (salaries + staff-salaries + salary-class-report + analysis-expenses)
- [x] Legacy bank/payout evidence inspected (banks + banks/create + payouts + payout-providers)
- [x] Legacy finance analytics evidence inspected (analysis-expenses/invoices + accounting charts)
- [x] Finance menu coverage inventory required + complete (`finance-menu-coverage-inventory.md`, 0 unclassified)
- [x] Current finance action inventory required + complete (`current-finance-action-inventory.md`, every row resolved)
- [x] Missing-action register required + complete (`missing-action-register.md`, F-A…F-V, no unresolved row)
- [x] Finance entity scope defined (`finance-entity-scope.md`)
- [x] Amount/calculation scope defined (`amount-and-calculation-scope.md` — two figure classes, no aggregation)
- [x] No-fake-money register created (`no-fake-money-register.md`)
- [x] Future owner register created (`future-owner-register.md` — future-backend/031/032/excluded)
- [x] No fake money movement required/allowed (FR-010, FR-011, FR-016, FR-028)
- [x] No fake mark-paid (FR-010, FR-028)
- [x] No fake salary generation (FR-013)
- [x] No fake payout (FR-016)
- [x] No fake bank import (FR-012)
- [x] No fake reconciliation (FR-011, FR-012)
- [x] No fake export/download (FR-017)
- [x] No computed money aggregate / P&L / salary total (FR-006, FR-007, FR-008)
- [x] No salary/payout/compensation figure anywhere (FR-007, SC-004)
- [x] No chart engine / canvas (FR-009)
- [x] No dead UI / no `href="#"` / no raw keys / no dead buttons (FR-027, SC-002, SC-003)
- [x] No backend/API/auth/database/gateway/payroll engine (FR-025)
- [x] Payout-provider secrets / credentials never rendered (FR-015, SC-010)
- [x] Spec-009 finance invariant supersession declared, permanent guarantees kept (FR-019)
- [x] Teacher portal pay-free preserved (FR-021, SC-009)
- [x] Family zero-pay preserved (FR-021, SC-009)
- [x] Student child-view preserved (FR-021, SC-009)
- [x] Spec 026/027/028/029 protections preserved (FR-022, US11, SC-008/009)
- [x] Count policy defined (FR-023; default fold-into-finance.html; `modal-and-page-scope.md`)
- [x] Smoke/a11y/screenshot scope defined (FR-030; spec §User Story 10)

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria (FR ↔ SC ↔ user-story scenarios)
- [x] User scenarios cover primary flows (US1–US11)
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Process Gates (specify-only)

- [x] No implementation performed
- [x] No plan generated
- [x] No tasks generated
- [x] No commit / no push

## Notes

- Baseline: Spec 029 is the effective baseline (implemented in the working tree, awaiting the watcher commit;
  HEAD `4be3e87`); public HTML = 97 (re-verified). If the count is not 97 at plan/implement time, STOP.
- The two big open decisions for `/speckit.plan`: (1) the EXACT count (fold everything into a tabbed
  `finance.html` = 97, vs a few legacy-justified standalone pages like invoices/salaries/banks), and (2) the
  precise Spec-009 supersession amendment (which finance smoke counts/assertions are lifted vs kept
  byte-verbatim).
- Highest-risk guardrails carried into planning: (1) salary/payout/compensation figures NEVER appear (status-
  first figure-free boards); (2) no computed money aggregate / P&L / chart; (3) no payout-provider secret or
  fake gateway/bank integration; (4) the Spec-009 supersession must be declared, not silent; (5) confirm-on-
  write must mutate nothing.
