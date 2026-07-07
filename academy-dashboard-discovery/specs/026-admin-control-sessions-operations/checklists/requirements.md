# Specification Quality Checklist: Admin Control / Sessions / Operations + Global Action Completion Pass

**Purpose**: Validate Spec 026 completeness and quality before `/speckit-plan`
**Created**: 2026-07-07
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details leak into the WHAT/WHY (patterns are named as reuse constraints, not code)
- [x] Focused on user/product-owner value (no dead mockups) and honest behavior
- [x] Written for stakeholders (admin, product owner, QA, developer personas)
- [x] All mandatory sections completed (User Scenarios, Requirements, Success Criteria, Assumptions)

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous (FR-001…FR-029)
- [x] Success criteria are measurable (SC-001…SC-009, counts/percentages/zeros)
- [x] Success criteria are technology-agnostic (page counts, action outcomes, law-green — not framework internals)
- [x] All acceptance scenarios are defined (7 user stories, Given/When/Then)
- [x] Edge cases identified (preview-toast honesty, clickable-looking display-only, out-of-scope page, unexplained disabled, count drift, thin legacy evidence)
- [x] Scope is clearly bounded (Layer A admin ops = sessions/timetable/attendance/outcomes/daily-ops only; Layer B = classify+make-honest, not build-everything)
- [x] Dependencies and assumptions identified (Spec 025 baseline, existing action infra, legacy-as-coverage, finance boundary, static-first)

## Spec 026 domain gates

- [x] Targeted visual grounding required (FR-001; legacy admin ops evidence paths named)
- [x] Legacy admin ops evidence inspection required (FR-001)
- [x] Current 91-page action inventory required and bounded (FR-002; grouping method allowed but no page omitted)
- [x] Dead UI register required with mandatory resolution (FR-005; no unresolved rows)
- [x] Every action classification taxonomy defined (FR-003) + forbidden taxonomy defined (FR-004)
- [x] Admin ops scope bounded to grounded pages/modals (FR-014, FR-015)
- [x] Missing pages/modals policy defined (FR-016; in-scope build vs out-of-scope gate+owner)
- [x] Future owner register required (FR-028; owners 027–032 / future-backend / excluded)
- [x] Button-behavior completion contract defined (FR-006…FR-013 Create/Edit/Delete/View/Export/Upload/Save/Join)
- [x] No fake actions law preserved (FR-017); no `href="#"` / dead links / raw keys (FR-018)
- [x] Teacher pay-free preserved (FR-019)
- [x] Family zero-pay preserved (FR-020)
- [x] Student child-view preserved (FR-021)
- [x] Admin finance boundary preserved (FR-022; Spec 009 invariant, no salary/payroll figures)
- [x] Count policy defined + verify-before-proceed (FR-023); impact protection (FR-024)
- [x] Smoke/a11y/screenshot action-completion scope defined (FR-025…FR-027)
- [x] No backend/API/auth (FR-017, FR-024, Assumptions)
- [x] No implementation this phase (FR-029)
- [x] No plan/tasks generated in specify
- [x] No commit/push in specify

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria (via the 7 user stories + SC set)
- [x] User scenarios cover primary flows (admin ops + product-owner audit + QA + developer + role protection)
- [x] Feature meets measurable outcomes (SC-001…SC-009)
- [x] No implementation details leak into the specification

## Notes

- The action inventory and dead-UI register are seeded during specify from a three-agent read-only audit (legacy admin ops · current admin-page actions · current role/hub actions), each citing exact evidence; their synthesized rows populate `current-action-inventory.md`, `dead-ui-register.md`, `legacy-admin-ops-coverage.md`, `admin-ops-page-scope.md`, and `visual-grounding.md`.
- Key grounded finding: the app already enforces no-dead-buttons (0 `href="#"`, catch-all toast, coming-soon/disabled-reason/confirm handlers, smoke asserts). The substantive Layer-B work is reclassifying admin `data-demo-action` «preview action» toasts on persistence-implying actions into honest `backendRequired` finals — alignment, not new features.
- All items pass. Spec 026 is ready for `/speckit-plan`.
