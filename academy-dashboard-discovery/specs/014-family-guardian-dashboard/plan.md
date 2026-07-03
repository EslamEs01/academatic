# Implementation Plan: Family / Guardian Dashboard (Spec 014)

**Branch**: `feature/012-role-portal-foundation` (plan authored here; feature branching is user-controlled) | **Date**: 2026-07-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/014-family-guardian-dashboard/spec.md`

## Summary

Spec 014 upgrades the Spec-012 family foundation (`family-portal.html` / `family-portal.en.html`, persona **fam1**) into the full one-page **guardian control center**: a calm hero, a deepened five-children overview (everyone-inline — no switcher, honest by construction), today's sessions with child association, an **attendance-signals band grounded in real outcome rows** (st11 absence-follow-up · st13 trial-cancel, rendered as gentle labeled chips with a reassurance line), deepened teacher notes, the **guardian history mirror of F6** (real `out1` + real `out15` + one authored record), a **subscriptions preview** (plan labels, zero amounts) and a **billing status preview** (settled/attention status, ZERO currency figures, no pay-now, backendRequired gate), a **requests & communication hub** (four honest preview cards: cancel/reschedule with the no-replacement caution · feedback-about-teacher rubric · meetings — the truthful empty-state site · request-trial/add-child), a family materials preview (download gated), a profile/account slice, and a closing honest note. Everything fixture-bound or authored display-only; zero tables; **zero body anchors**; **47/49 built files stay byte-identical** — only the family pair changes (+ tests/docs).

## Technical Context

**Language/Version**: native ES-module JavaScript + Node ≥20 SSG — unchanged
**Primary Dependencies**: none new; dev-only Playwright/axe — **no additions**
**Storage**: none; fam1 + children + existing session/outcome/course fixtures + extended display-only literals in `fixtures/portal.js` (`FAMILY_PREVIEW.*`, `PORTAL_PLANNED.family` re-registered)
**Testing**: `tests/smoke/run.cjs` **family branch** amended per research D11 (planned semantics 3→4, five-children assert, zero-pay/currency regex, `.pt-empty` ≥ 1, section floor, body-anchors 0, 390px probe); a11y/capture matrices extended additively; **student branch + admin/teacher/hub asserts byte-verbatim**
**Target Platform**: static HTML on GitHub Pages; AR RTL default + EN LTR; light/dark/system; mobile-first
**Project Type**: static multi-page frontend; the Spec-012 portal shell reused untouched; Spec-013 CSS primitives (`.pt-empty`, `.pt-tag`, `.pt-stat`, `.pt-prof-row`, `.pt-attach`) reused read-only
**Performance Goals**: n/a (static)
**Constraints**: closed hook set (zero new hooks; zero page-body interactivity), fixture-only honesty, Django-ready, **byte-identity for all non-family built files**, shared `prt.shell/portal/role/hub` + sibling `prt.stu.*`/`prt.tch.*` + `data.prtStu*`/`data.prtNote*` keys frozen, **ZERO pay/currency figures on the family page** (the fixture's `hourRate`/`fam.plan.perHour` are display-suppressed), `enhance.js`/`package.json`/`build-html.mjs`/`portal-shell.js`/`nav.config.js` untouched, Specs 008–013 guards green
**Scale/Scope**: 1 page pair deepened (7 → ~12 sections) · ~6 `FAMILY_PREVIEW` register extensions · ~55 new `prt.fam.*`/`data.prtFam*` key pairs · ~3 small namespaced CSS additions (requests-hub bits; 013 primitives reused) · 14+ screenshot frames

## Constitution Check

*GATE: `.specify/memory/constitution.md` remains the unfilled template — the effective constitution is the CLAUDE.md hard-constraints block + Specs 001–013 binding contracts:*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; no `#app`/SPA/runtime construction; closed hooks | **PASS** | Same generator/shell; content-only page-module growth; zero new hooks; zero body interactivity |
| Fixture-only; no engines; four honest action classes | **PASS** | All numbers authored/fixture; no payment/cancel/upload/voice/feedback/chat/live engines; every gate a labeled planned/backendRequired control |
| **Zero pay figures** (project spine + the Spec-014 hard line) | **PASS** | Billing/subscriptions are status/label-only; `hourRate`/`plan.perHour` («ريال/ساعة») never referenced; smoke currency-regex assert on the family body (D11) |
| No computed score/rank/percentile | **PASS** | Progress = authored literals; signals = real outcome rows as labeled chips; rubric preview is display-only questions, no scoring |
| Admin console + reports/finance protected | **PASS** | Zero admin-file edits; acceptance = 40-file hash identity + prior guards |
| Portal separation + sibling protection (Specs 012/013) | **PASS** | Student/teacher/hub pairs byte-identical; shared + sibling locale namespaces frozen; no admin links from the family page |
| Screenshot-based visual acceptance | **PASS** | 14+ frame matrix incl. six area captures + four unchanged proofs |

**Post-Phase-1 re-check**: contracts/data-model introduce no violation; no structural additions (content + tests only). **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/014-family-guardian-dashboard/
├── plan.md · research.md (D1–D14) · data-model.md · quickstart.md
├── checklists/requirements.md
└── contracts/  (16)
    family-dashboard-contract.md · family-dashboard-honesty-contract.md ·
    family-children-overview-contract.md · family-sessions-progress-contract.md ·
    family-billing-subscriptions-contract.md · family-requests-feedback-contract.md ·
    family-history-materials-contract.md · family-mobile-accessibility-contract.md ·
    legacy-family-capability-coverage-contract.md · admin-impact-contract.md ·
    student-teacher-impact-contract.md · static-html-django-ready-contract.md ·
    source-links-contract.md · planned-backendrequired-contract.md ·
    screenshot-acceptance.md · scope-guard.md
```

### Source Code (repository root: `academy-dashboard-discovery/app/`)

```text
src/js/pages/family-portal.js         # UPGRADED — the full 12-section composition (this spec's core)
src/js/fixtures/portal.js             # family block ONLY: FAMILY_PREVIEW extensions (signals refs/
                                      #   history/subscriptions/requests/materials/profile) +
                                      #   PORTAL_PLANNED.family re-registered {billingGate, matDownload,
                                      #   fullHistory, meetingRequest}; STUDENT_PREVIEW + student/teacher
                                      #   registers + PORTAL_PERSONAS UNTOUCHED
src/locales/ar.prt.js · en.prt.js     # prt.fam.* + data.prtFam* additions ONLY; shared + prt.stu/tch frozen
src/styles/app.css                    # small additive .portal-shell-namespaced bits (requests-hub grid);
                                      #   Spec-013 primitives (.pt-empty/.pt-tag/.pt-stat/.pt-prof-row/.pt-attach) REUSED
tests/smoke/run.cjs                   # family-branch asserts amended per research D11 (all else verbatim)
tests/a11y/run.cjs · tests/screenshots/capture.cjs   # additive entries (D13; area-capture mechanism exists)
README.md · screenshots/REVIEW.md · CLAUDE.md        # docs
../specs/012-…/legacy-role-capability-coverage.md    # §8 Spec-014 delivery notes ONLY
public/family-portal.html · .en.html  # the only built files that change
```

**Structure Decision**: zero new source files by default (a family-only helper module is sanctioned ONLY if the page module outgrows readability); zero shared-file behavior edits; all frozen files listed in the scope guard.

## Impact Reviews (binding summaries — full text in contracts/)

- **Admin console**: zero change; acceptance = hash identity of all 40 admin files + prior guards + unchanged-proof frame.
- **Student/teacher/hub**: byte-identical built pairs (the Spec-013 `student-teacher-impact` pattern, now protecting the student dashboard too); the Spec-013 student smoke branch re-runs unchanged.
- **Smoke**: the ONLY amendments live inside the family branch of the Spec-012 portal block (D11); admin-scoped, student, teacher, and hub assertions stay byte-verbatim.

## MVP & Sequencing (research D14)

**MVP = baseline gate → fixtures/locales/CSS → Band A (hero · children · today · signals band) → family smoke re-scope green**: proves the deepened composition, the real-outcome signal honesty, and re-greens the harness. Then Band B (teacher notes · history mirror · subscriptions · billing status) → Band C (requests hub incl. the meetings truthful empty state · materials · profile · closing note) → byte-identity audit + prior guards → a11y/screenshots/review → coverage §8 delivery notes → docs.

## Complexity Tracking

*No constitution-gate violations to justify.* No structural additions — a content deepening of one page inside the portal architecture, mirroring the proven Spec-013 shape.
