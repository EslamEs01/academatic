# Implementation Plan: Teacher Internal Pages

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-07 | **Spec**: [spec.md](./spec.md)
**Input**: `academy-dashboard-discovery/specs/025-teacher-internal-pages/spec.md`
**Companions**: [visual-grounding.md](./visual-grounding.md) · [teacher-legacy-coverage.md](./teacher-legacy-coverage.md) · [teacher-page-scope.md](./teacher-page-scope.md) · [pay-free-risk-register.md](./pay-free-risk-register.md) · [research.md](./research.md) · [data-model.md](./data-model.md) · [quickstart.md](./quickstart.md) · [contracts/](./contracts/)

## Summary

Build the seven teacher internal pages (teacher-schedule · teacher-students · teacher-outcomes · teacher-tasks · teacher-reports · teacher-profile · teacher-library), each AR+EN, so the teacher portal is a full role app. Technical approach: seven new portal-shell page modules composed from the existing living primitives (`portal-page.js`), rendering the retained `TEACHER_PREVIEW` fixtures (extended with static authored rows, zero pay data); flip the seven planned `ROLE_NAV.teacher` items → implemented; register the 7 pages in `build-html.mjs` (imports + 7 PAGES entries mirroring the family-internal shape); repoint the teacher-home performance anchor from `teacher-performance.html` → `teacher-reports.html`; mirrored AR/EN locale keys; additive living-layer CSS only. Every unavailable action is a labeled backendRequired/planned gate. Pay-free enforced at three layers. **77 → 91** public HTML.

## Technical Context

**Language/Version**: native ES modules (browser JS); Node for build/test; no framework.
**Primary Dependencies**: none added — static build (`build-html.mjs`), closed `data-*` hook set, `portal-page.js` primitives, `portal-shell.js`, `ar/en.prt.js`, additive `app.css`. NO CDN/SPA/chart/animation lib.
**Storage**: none (fixtures only; zero storage keys).
**Testing**: `tests/smoke/run.cjs` (Playwright, structural + pay/finance scans + anchor/nav registries), `tests/a11y/run.cjs` (axe), `tests/screenshots/capture.cjs`.
**Target Platform**: GitHub-Pages static; AR RTL default + EN LTR; light/dark/system; mobile 390.
**Project Type**: static multi-page role app.
**Constraints**: 91 HTML exactly; teacher pay-free GLOBAL; no fake actions; no `href="#"`; no new hook/storage key; live-room future-backend; no teacher chat page/nav; no computed score/chart; motion in one reduced-motion block.
**Scale/Scope**: 7 new page modules + fixtures/locale/CSS extensions + build registration + nav flip + anchor repoint + test updates. No new deps.

## Constitution Check

*`.specify/memory/constitution.md` is an unfilled placeholder; binding "constitution" = CLAUDE.md hard constraints + Spec 016 freeze + Spec 022 contracts + the teacher pay-free GLOBAL contract. Gates:*

| Gate | Status | Note |
|---|---|---|
| Static HTML-first, no SPA/CDN/chart lib | PASS | 7 pre-rendered page pairs; primitives reused |
| Closed hook set, no new hook/storage key | PASS | reuse `data-*` gate/nav hooks; no new keys |
| Teacher pay-free GLOBAL | PASS | 3-layer enforcement; pay surfaces excluded; anchor repoint closes the B-07 admin-shell tension |
| No fake actions; honest gates; zero `href="#"` | PASS | live-room/save/submit/upload/download/complete/export = backendRequired gates |
| No computed score/rank/chart | PASS | reports = dimension lines + counts only |
| Student demoted / family owns child / roles primary | PASS | teacher-only scope; no cross-role drift |
| Live-room future-backend; chat future (no teacher page/nav) | PASS | B-04/B-06 honored |
| 91 HTML; 40 admin + index + family/student byte-identical (except teacher-portal nav/anchor) | PASS | additive-only |
| Reduced-motion honored | PASS | motion stays in the one block |

**Result**: no violations. Proceed.

## Project Structure

### Documentation (this feature)

```text
specs/025-teacher-internal-pages/
├── spec.md · visual-grounding.md · teacher-legacy-coverage.md · teacher-page-scope.md · pay-free-risk-register.md   (done)
├── plan.md · research.md · data-model.md · quickstart.md   (this phase)
├── contracts/ (18)   (this phase)
└── checklists/requirements.md   (done)
# tasks.md — NOT created here (Phase 2, /speckit-tasks)
```

### Source Code — files implementation MAY touch

```text
app/src/js/pages/teacher-{schedule,students,outcomes,tasks,reports,profile,library}.js   # 7 NEW modules
app/src/js/pages/teacher-portal.js                                                        # performance anchor repoint ONLY
app/src/js/fixtures/portal.js                                                             # ROLE_NAV.teacher flips + static TEACHER_PREVIEW rows
app/src/locales/ar.prt.js, en.prt.js                                                      # mirrored prt.title.tch* + prt.tch.<page>.* keys
app/src/styles/app.css                                                                     # additive living-layer rules if needed
app/scripts/build-html.mjs                                                                 # 7 imports + 7 PAGES entries ONLY
app/tests/{smoke/run.cjs, a11y/run.cjs, screenshots/capture.cjs}                          # coverage + re-pins
app/screenshots/REVIEW.md, app/README.md, CLAUDE.md                                        # docs
public/teacher-{schedule,students,outcomes,tasks,reports,profile,library}(.en).html       # 14 rebake outputs
public/teacher-portal(.en).html                                                            # nav flip + anchor repoint rebake
```

**Forbidden**: `package.json`; external deps; admin/family/student page modules; backend/API/auth; teacher-chat/finance/salary/pay/live-room pages. `build-html.mjs` only registers the 7 pages.

## Phase 0: Research

See [research.md](./research.md) — D1–D25 resolved (grounding sufficiency, page architecture, build registration, nav conversion, anchor repoint, fixtures, locales, composition, per-page designs+gates, live-room/chat, no-fake enforcement, pay-free 3-layer, smoke/a11y/screenshots, count/identity protection, allowed/forbidden, risks/stops). Zero NEEDS CLARIFICATION.

## Phase 1: Design & Contracts

- **[data-model.md](./data-model.md)** — the page/fixture/gate/nav entities + the "not modeled" boundary.
- **[contracts/](./contracts/)** — 18 contracts: grounding, count, nav-conversion, 7 per-page, live-room, chat, no-fake, pay-free-enforcement, smoke-rescope, mobile-a11y-screenshot, impact-protection, scope-guard.
- **[quickstart.md](./quickstart.md)** — build/verify runbook + gates.
- **Agent context**: CLAUDE.md pointer to this plan (narrative preserved).

### Post-design Constitution re-check

All Phase-1 artifacts hold the gates: no new hook/page/engine; pay-free strengthened (anchor repoint); build touched only for the 7 registrations. **PASS.**

## Complexity Tracking

No violations. The only cross-cutting mechanic is the smoke anchor re-pin (teacher-portal `bodyAnchors===1` target `teacher-performance` → `teacher-reports`) — a factual update, not a new pattern.

## Stop conditions (carried into implementation)

Public HTML ≠ 91 · any teacher pay token · reports needs finance wording · anchor still → teacher-performance · fake live-room/chat/upload/download/save · teacher chat/finance/pay nav · package.json change · admin/family/student module change · new backend/dep/chart engine · a11y critical/serious · mobile-390 overflow.

## Phase 2

NOT started. `/speckit-tasks` generates `tasks.md` on request. No tasks, no implementation, no commit here.
