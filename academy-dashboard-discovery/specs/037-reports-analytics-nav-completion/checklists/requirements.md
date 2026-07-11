# Specification Quality Checklist: Spec 037 — Reports/Analytics Nav Completion + Admin Missing-Pages Audit

**Purpose**: Validate specification completeness and quality before `/speckit-plan`
**Created**: 2026-07-11
**Feature**: [spec.md](../spec.md)

## Content Quality

- [X] Implementation detail kept to the necessary nav/route/fold identifiers (surface/behavior level)
- [X] Focused on admin/QA value + honesty + role-law carryover (teacher pay-free, family zero-pay, student child-view, finance invariant)
- [X] Written so a non-technical stakeholder can follow the eight user scenarios (US1–US8)
- [X] All mandatory sections completed (Why, Grounding verdict, Recommended decisions, Scenarios, Functional Requirements, Key Entities, Non-goals, Assumptions, Dependencies, Success Criteria)

## Requirement Completeness

- [X] No [NEEDS CLARIFICATION] markers remain
- [X] Requirements are testable and unambiguous (FR-001…FR-015)
- [X] Success criteria are measurable (0-markers, count 115, admin-menu 50, byte-verbatim asserts — SC-001…SC-006)
- [X] All acceptance scenarios defined (US1–US8, each with an explicit Acceptance line)
- [X] Edge cases identified (fresh-load deep-link on `#view=monthly`/`#view=analysis`, EN twin, empty-filter `noResults`, single-student drill-down vs cross-student board)
- [X] Scope bounded (2 Reports items + 3 flagged-035 correctives; 0 count delta; non-goals explicit)
- [X] Dependencies/assumptions identified (uncommitted Specs 035/036 baseline, `tabs()`/`#view=` mechanism proven, finance-analysis exclusion)

## Audit Completeness

- [X] Targeted Visual Grounding complete (current `reports.js`/`families.js`/`students.js`/`student.js` + legacy crawl + Spec 033/035/036 precedents) — `spec.md` "Grounding verdict"
- [X] `monthlyReports` covered (scope, mechanism, fixtures, gates, smoke/a11y/screenshot plan) — `monthly-reports-scope.md`
- [X] `dataAnalysis` covered (recommended surface, finance-exclusion boundary, non-goals) — `spec.md` US2 + Recommended decisions + FR-003
- [X] Full Admin missing-pages audit complete — all 50 sidebar items classified, 0 missing-target, 0 ownerless — `admin-missing-pages-audit.md`
- [X] `familyCategories` deep-audit complete (six-lens review + corrective + risk + acceptance check) — `flagged-035-items-audit.md` §1
- [X] `studentResult` deep-audit complete (six-lens review + corrective + risk + acceptance check) — `flagged-035-items-audit.md` §2
- [X] `studentEvaluation` deep-audit complete (six-lens review + corrective + risk + acceptance check) — `flagged-035-items-audit.md` §3
- [X] Count target defined (115→115, 0 new page bases; standalone alternatives quantified at +2 each) — `spec.md` "Recommended decisions", `flagged-035-items-audit.md` Summary
- [X] Route contract defined (`reports.html#view=monthly`, `reports.html#view=analysis`, `families.html#view=categories`, `students.html#view=results`, `students.html#view=evaluation`; admin menu held at 50) — `spec.md` "Recommended decisions" table, `admin-missing-pages-audit.md` Correction column
- [X] Corrective surfaces recorded for all three flagged-035 items, including the conditional-deferral case — `flagged-035-items-audit.md`, `future-owner-register.md`

## Feature Readiness

- [X] No fake report/analytics generation, export, PDF, send, or publish — every such final is a `backendRequired` gate (recorded in `monthly-reports-scope.md` "Final gated actions" and `spec.md` FR-010)
- [X] No fake student-result/evaluation calculation or family-category persistence — correctives are display-only boards over authored fixtures + existing gated drawers (`flagged-035-items-audit.md`, `spec.md` FR-010)
- [X] No computed score/rank/GPA/percentage/rubric-total/chart/canvas anywhere in the new surfaces (`spec.md` FR-011, `monthly-reports-scope.md` "Allowed authored data" / "Forbidden behavior", `flagged-035-items-audit.md` Medium-risk call-outs)
- [X] No backend/API/auth/database/websocket/external request; no `type=file`/`type=password`/secret; no `href="#"`; no raw keys; no dead buttons; no `package.json` change (`spec.md` FR-012)
- [X] Role-law/no-fake carryover included and mapped to protected smoke asserts — `role-law-and-no-fake-carryover.md`
- [X] No implementation performed
- [X] No `plan.md` created
- [X] No `tasks.md` created
- [X] No commit / no push
- [X] Only app-source touch (when this specify step lands) is `.specify/feature.json` → 037; all other output confined to this spec folder

## Notes

- Specs 035 and 036 are **IMPLEMENTED and green but uncommitted** in the working tree (HEAD is still the Spec 034 commit, `1eb4d9a`). This Spec 037 artifact set is a **documentation-only** `/speckit.specify` step; implementation is gated on maintainer approval to continue building on the uncommitted-but-green tree (recommended order: watcher commits 035, then 036, then 037 proceeds to `/speckit.plan`).
- The recommended disposition folds every item (2 Reports «قريبًا» + 3 flagged-035 correctives) into existing pages as new `tabs()`/`#view=` boards — 0 new page bases, count held at 115, admin menu held at 50 — mirroring the Spec 035/036 fold-anchor precedent exactly.
- Finance-flavoured analysis (`analysis-expenses`/`analysis-invoices`/`monthly-invoices`) is deliberately excluded from `reports.html#view=analysis` to keep the reports body finance-free forever (Spec-009 invariant); it is owned by Spec 038, not Spec 037.
