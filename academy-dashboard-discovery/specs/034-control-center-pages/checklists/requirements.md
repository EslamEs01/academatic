# Specification Quality Checklist: Control Center Pages (Spec 034)

**Purpose**: Validate specification completeness and quality before `/speckit-plan`
**Created**: 2026-07-10
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details leak beyond page/route/field decisions (this is a spec; scope names surfaces, not code)
- [x] Focused on user value (admins get real Control pages; QA gets a verifiable no-fake guarantee)
- [x] Written for stakeholders (per-page scope + registers are readable)
- [x] All mandatory sections completed (user scenarios, requirements, success criteria, assumptions)

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous (each FR → a page/register + a check)
- [x] Success criteria are measurable (count 113, 0 «قريبًا», 0 fake, 0 type=file, correct conversion)
- [x] Success criteria are technology-agnostic where it matters (counts, coverage, honesty)
- [x] All acceptance scenarios are defined (per user story)
- [x] Edge cases identified (timeConverter interactivity vs no-new-hook; computed totals; file uploads; WhatsApp; notification-settings boundary; tasks evidence gap)
- [x] Scope is clearly bounded (5 pages; no backend/engine/dependency; no plan/tasks/commit)
- [x] Dependencies and assumptions identified (legacy evidence; existing primitives; native Intl; settings ownership)

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover the 5 pages + nav removal + no-fake + role-law
- [x] Feature meets measurable outcomes in Success Criteria
- [x] No implementation performed

## Spec-034-specific verification

- [x] Targeted visual grounding complete (`visual-grounding.md`; 6 legacy pages deep-read + inventories + current app + Spec-033; verdict PROCEED)
- [x] messages/leads/tasks/announcements/timeConverter evidence inspected (management-chat / new-requests(+create) / tickets / public-advertisement(+settings-notification) / time-convertor)
- [x] 5 new page pairs specified; count policy 103 → 113 defined (`count-and-route-contract.md`)
- [x] All five nav items get a final implemented route (`control-nav-completion-register.md`); 0 «قريبًا» left in Control
- [x] No fake send/persist/publish/assignment allowed (`no-fake-control-actions-register.md`)
- [x] timeConverter defined as a real client-side tool (native Intl; no gate; no dependency) (`time-converter-scope.md`)
- [x] File uploads (chat image, ad media) = gates; no `type=file`
- [x] Computed totals (lead KPIs, task counts/Average, ad quotas) = authored display-only literals
- [x] Notification *settings* boundary respected (stay in settings.html; not duplicated)
- [x] role-law/no-fake carryover included (`role-law-and-no-fake-carryover.md`)
- [x] Smoke/a11y/screenshot scope defined (`control-page-scope.md` per page)
- [x] Future-owner register present (`future-owner-register.md`)
- [x] No implementation; no plan; no tasks; no commit/push (HEAD unchanged at `a438ac2`)

## Notes

- The one genuine design tension — timeConverter needs runtime interactivity but the standing law is "no new global `data-*` hook" — is resolved by a **page-scoped init** (precedent: `initTabs`/`initWizard`) using native `Intl`; recorded in `time-converter-scope.md` with a static-board fallback. This is the main item to confirm in `/speckit-plan`.
- `tasks` has the weakest legacy evidence (board/create JS-driven, not captured); fields are authored as safe demo fields grounded in the captured KPI/per-staff columns; recorded as an evidence gap.
- Ready for `/speckit-plan` (Spec 034 IS an implementation spec, unlike Spec 033).
