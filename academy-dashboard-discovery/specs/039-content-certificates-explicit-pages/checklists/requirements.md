# Specification Quality Checklist: Admin Content & Certificates Explicit Pages (Spec 039)

**Purpose**: Validate specification completeness and quality before `/speckit.plan`
**Created**: 2026-07-11
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details beyond what the honest frontend contract requires (nav routing/gates are the feature)
- [x] Focused on admin user value (reachable content/certificate surfaces) and honesty
- [x] Written so a non-technical admin/maintainer can follow the intent
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain (2 open questions carry recommended safe defaults; neither blocks)
- [x] Requirements are testable and unambiguous (FR-001…FR-018)
- [x] Success criteria are measurable (SC-001…SC-008)
- [x] Success criteria are technology-agnostic where applicable (count, reachability, 0-fake, a11y)
- [x] All acceptance scenarios are defined (6 user stories)
- [x] Edge cases identified (fresh-load deep-link, EN routing, admin 0-planned probe, empty queues)
- [x] Scope is clearly bounded (in/out scope; Option B recommended; A/C rejected with reasons)
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover the primary flows (reach Materials, review Requests, distinguish content, handoff, gates, guards)
- [x] Feature meets measurable outcomes in Success Criteria
- [x] No fake behavior leaks into the specification

## Spec 039 — Targeted Grounding & Evidence

- [x] Targeted Visual Grounding gate COMPLETE — 16 PNGs opened and described (`targeted-visual-grounding.md`)
- [x] Baseline verified: HEAD `4cbcb31` (Spec 038 committed), tree clean, 115 pages, admin menu 50
- [x] Current-app inventory complete (`current-app-content-certificate-inventory.md`)
- [x] Legacy coverage complete (`legacy-content-certificate-coverage.md`)
- [x] Every proposed requirement cites ≥1 current-app source and ≥1 discovery source

## Spec 039 — Scope Decisions

- [x] Materials scope decided: DEEP-LINK `library.html#view=materials` (`materials-scope.md`)
- [x] Certificate Requests scope decided: DEEP-LINK `certificates.html#view=requests` (`certificate-requests-scope.md`)
- [x] Library/content decided: reused; optional `books` refinement (`library-scope.md`)
- [x] Certificate templates/designer decided: reused (static preview) + editor/PDF deferred (`certificate-template-designer-scope.md`)
- [x] Teacher→admin handoff documented, no portal redesign (`teacher-admin-certificate-handoff.md`)
- [x] Page-vs-fold register with Options A/B/C quantified (`page-vs-fold-decision-register.md`)
- [x] Nav-completion register complete (`content-certificate-nav-completion-register.md`)

## Spec 039 — Count / Route / Test / Impact

- [x] Count target defined: 115 (0 delta); admin menu 50; 0 new page bases (`count-and-route-contract.md`)
- [x] Exact routes defined (materials/certificateRequests [+ optional books])
- [x] Protected-test amendments declared narrowly (1 behavioral repoint + 1 message/additive); all others byte-verbatim
- [x] Impact-protection boundary defined (only shared sidebar changes; bodies byte-identical)

## Spec 039 — No-Fake / Role Law

- [x] No fake persistence/upload/delete/approval/PDF/issuance/delivery (`role-law-and-no-fake-carryover.md`)
- [x] No `type=file` / `type=password` / `<canvas>` / `.pdf` / `window.open` / drag-designer
- [x] No backend/API/auth/DB/network; `package.json` 0-diff
- [x] Role law preserved (admin manage; teacher/family read-only; no permission widening; portals untouched)
- [x] Future-owner register complete (real editor/PDF/upload/delivery → future-backend; 040/041 noted)

## Spec 039 — Process Guards

- [x] No plan.md generated
- [x] No tasks.md generated
- [x] No implementation / app-source change (only `.specify/feature.json` pointer + spec artifacts)
- [x] No test / generated-HTML change
- [x] No commit / no push / no branch cut

## Notes

- The two open questions (books refinement; extra a11y/screenshot rows) have recommended safe defaults and do not
  affect count (115), admin-menu (50), the two required flips, or any no-fake/role law. They are for `/speckit.plan`.
- Legacy planning tagged these surfaces S004/S006; the rebuilt app's Spec 031 fold is authoritative (documented,
  non-blocking).
