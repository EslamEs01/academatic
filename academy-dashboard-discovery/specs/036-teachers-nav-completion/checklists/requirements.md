# Specification Quality Checklist: Spec 036 — Teachers Nav Completion

**Purpose**: Validate specification completeness and quality before `/speckit-plan`
**Created**: 2026-07-10
**Feature**: [spec.md](../spec.md)

## Content Quality
- [x] Implementation detail kept to the necessary nav/route/fold identifiers (surface/behavior level)
- [x] Focused on admin/QA value + honesty + teacher pay-free law
- [x] Written so a non-technical stakeholder can follow the four outcomes
- [x] All mandatory sections completed

## Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable (0-markers, count 115, byte-verbatim asserts)
- [x] All acceptance scenarios defined
- [x] Edge cases identified (no-match, hash fallback, EN twin, active-pill)
- [x] Scope bounded (4 items; 0 count; non-goals explicit)
- [x] Dependencies/assumptions identified (uncommitted Spec-035 baseline, branch, tabs-added-to-teacher-performance)

## Spec-036 specific verification
- [x] Targeted Visual Grounding complete (current app + legacy crawl + prior specs) — `visual-grounding.md`
- [x] All four Teachers items covered — `teachers-nav-completion-register.md`
- [x] addTeacher fold owner recorded (teachers.html; `trn-add`; no pay/password) — `add-teacher-fold-register.md`
- [x] teacherCategories fold owner recorded (teachers.html; `trn-categories`) — `teacher-categories-fold-register.md`
- [x] sessionsKpi tab/board boundary recorded (display-only; NO computed %) — `sessions-kpi-scope.md`
- [x] monthlyPerf tab/board boundary recorded (display-only; NO computed %) — `monthly-performance-scope.md`
- [x] page-vs-fold decision recorded for each — `page-vs-fold-decision-register.md`
- [x] teacher-pay-free register complete — `teacher-pay-free-register.md`
- [x] no-fake teacher actions register complete — `no-fake-teacher-actions-register.md`
- [x] no-computed-score/rank/chart boundary recorded (both tabs) — scope files + legacy-coverage
- [x] count-and-route contract complete (115→115, 0 new pages, 4 nav flips) — `count-and-route-contract.md`
- [x] role-law/no-fake carryover included — `role-law-and-no-fake-carryover.md`
- [x] future-owner register complete (pay fieldset/password/persistence/computed-% exclusions) — `future-owner-register.md`
- [x] legacy coverage map complete — `legacy-teachers-coverage.md`
- [x] no backend/API asserted

## Process constraints (specify-only)
- [x] No implementation performed
- [x] No `plan.md` created
- [x] No `tasks.md` created
- [x] No commit / no push
- [x] Only app-source touch = `.specify/feature.json` → 036

## Notes
- All artifacts grounded first-hand. Key boundary: the legacy Classes-KPI and Monthly-Performance reports each carried a computed `Percentage`; Spec 036 deliberately does NOT reproduce it — the display tabs render authored counts + categorical labels, honoring the no-computed-score/rank/chart law. The legacy Add-Teacher Salary/Payout/password sections are excluded forever under the teacher pay-free + no-credential laws.
