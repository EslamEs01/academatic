# Specification Quality Checklist: Spec 028 — Admin Teachers / Performance Deep Management

**Purpose**: Validate specification completeness and quality before `/speckit.plan`
**Created**: 2026-07-08
**Feature**: [spec.md](../spec.md)

## Content Quality
- [x] No implementation details leak into WHAT/WHY (mechanisms named as scope boundaries, not code)
- [x] Focused on admin user value + honesty/role-law constraints
- [x] Written for stakeholders (registers + scopes readable without the code)
- [x] All mandatory sections completed

## Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain (the one open choice — all-teachers-timetable fold-vs-page — is an explicit **plan decision**, not a spec ambiguity)
- [x] Requirements testable + unambiguous (FR-001…FR-023)
- [x] Success criteria measurable (count 97, payHit=0, no score/chart, a11y 0/0, byte-identical portal)
- [x] Success criteria technology-agnostic where user-facing
- [x] Acceptance scenarios defined (US1–US9, each with an independent test)
- [x] Edge cases identified (sanctioned Hour-Rate literal; exempt teacher-performance board; unused `rating` field; availability without recurrence)
- [x] Scope bounded (Layer A deepen / Layer B action-completion; explicit out-of-scope owner routing)
- [x] Dependencies + assumptions identified

## Targeted Visual Grounding (standing law)
- [x] Targeted visual grounding complete (6-agent read-only audit, exact paths)
- [x] Legacy teacher directory/details evidence inspected (`management-teachers*.md`)
- [x] Legacy teacher performance/workload/timetable evidence inspected
- [x] Legacy teacher categories evidence inspected (CRUD + assign-members — grounded)
- [x] Legacy teacher pay/finance/salary evidence inspected + dispositioned (030/029/future/excluded)
- [x] Current teacher pages/modules inspected (source, not memory)
- [x] Teacher portal protection sampled (16 files byte-identical; payHit/tchPay identified)

## Required Artifacts
- [x] spec.md · visual-grounding.md · legacy-teacher-performance-coverage.md · current-teacher-action-inventory.md · missing-action-register.md · teacher-entity-scope.md · performance-metric-scope.md · modal-and-page-scope.md · future-owner-register.md · pay-finance-exclusion-register.md · checklists/requirements.md

## Feature Readiness
- [x] Every action classified; every missing-action row (T-A…T-W) resolved (028-owned or owner-routed)
- [x] Teacher entity scope + performance-metric scope + pay-finance exclusion register defined
- [x] Create/Edit/Status/Assign behavior defined (modal/drawer/confirm/gate)
- [x] Future-owner register maps every out-of-scope action
- [x] Count policy defined (default 97; all-teachers-timetable = plan decision)
- [x] Smoke/a11y/screenshot scope defined

## Law Preservation
- [x] No fake actions · no dead UI · no `href="#"` · no backend
- [x] No salary/payroll/finance leakage on admin teacher surfaces; no computed score/rank/chart
- [x] Teacher portal pay-free preserved (16 files byte-identical; payHit/tchPay byte-verbatim)
- [x] Family zero-pay · student child-view · admin finance Spec-009 invariant preserved
- [x] Spec 026 + Spec 027 protections preserved
- [x] Closed `data-*` hook set only — no new hook/storage key/engine

## Process
- [x] No implementation performed
- [x] No plan/tasks generated
- [x] No commit/push

## Notes
- The single deferred decision (all-teachers-timetable: fold into `schedule.html` vs a legacy-justified new page) is intentionally left to `/speckit.plan`, where the exact public-HTML count is fixed and build-verified — consistent with the Spec-016 new-page-requires-justification law and the Spec-026 fold precedent.
