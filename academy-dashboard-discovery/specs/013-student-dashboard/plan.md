# Implementation Plan: Student Dashboard (Spec 013)

**Branch**: `feature/012-role-portal-foundation` (plan authored here; feature branching is user-controlled) | **Date**: 2026-07-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/013-student-dashboard/spec.md`

## Summary

Spec 013 upgrades the Spec-012 student foundation (`student-portal.html` / `student-portal.en.html`, persona **st1**) into the full one-page **student learning home**: an upgraded hero, deepened today/next sections, a **week-at-a-glance agenda** (F5), graduated **homework** and **materials** display-only sections (their Spec-012 planned cards transform into in-section backendRequired submit/download mini-cards), a deepened **progress + attendance + achievements** band, a **celebration recognition** section (the honest, unordered leaderboard resolution), a **recent-sessions feedback** section carrying the F6 record shape (anchored on st1's real `out1` outcome row), a **profile slice** card, and a **friendly empty-state pattern** truthfully demonstrated by the fixture week's session-free Friday. Everything is fixture-bound or authored display-only; zero tables; zero new links out of the page (course/material cards are display-only by policy — the only existing course surfaces are admin pages, and a child persona must never land in admin chrome). **46 of the 49 built files stay byte-identical** (40 admin + family/teacher/hub pairs); only the student pair changes (+ tests/docs).

## Technical Context

**Language/Version**: native ES-module JavaScript + Node ≥20 SSG — unchanged
**Primary Dependencies**: none new; dev-only Playwright/axe — **no additions**
**Storage**: none; st1 + existing fixtures (`SCHEDULE_WEEK`, `SESSION_OUTCOMES.out1`, `COURSES`) + extended display-only literals in `fixtures/portal.js` (`STUDENT_PREVIEW.*`)
**Testing**: `tests/smoke/run.cjs` portal block amended for the student page only (planned-card semantics, empty-state, section floor, 390px overflow probe); a11y/screenshot matrices extended additively
**Target Platform**: static HTML on GitHub Pages; AR RTL default + EN LTR; light/dark/system; mobile-first
**Project Type**: static multi-page frontend; the portal shell from Spec 012 is reused untouched
**Performance Goals**: n/a (static)
**Constraints**: closed hook set (zero new hooks; the page keeps zero interactive JS beyond the shell's theme/lang menus), fixture-only honesty, Django-ready, **byte-identity for all non-student built files**, shared `prt.shell.*`/`prt.portal.*`/`prt.fam.*`/`prt.tch.*`/`prt.hub.*` keys frozen, `enhance.js`/`package.json` untouched, Specs 008–012 guards green
**Scale/Scope**: 1 page pair deepened (8 → ~13 sections) · ~5 `STUDENT_PREVIEW` register extensions · ~45 new `prt.stu.*`/`data.prtStu*` key pairs · ~6 new namespaced CSS blocks (`.pt-empty`, `.pt-day`, celebration/profile bits) · 12+ screenshot frames

## Constitution Check

*GATE: `.specify/memory/constitution.md` remains the unfilled template — the effective constitution is the CLAUDE.md hard-constraints block + Specs 001–012 binding contracts:*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; no `#app`/SPA/runtime construction; closed hooks | **PASS** | Same generator, same portal shell; content-only page module growth; zero new hooks |
| Fixture-only; no engines; four honest action classes | **PASS** | All numbers authored/fixture literals; no join/upload/submit/chat/ranking; planned/backendRequired mini-cards labeled |
| No computed score/rank/leaderboard/chart | **PASS** | Progress = authored literals; celebration section is unordered authored recognition, never ranking (research D3) |
| Admin console + reports/finance protected | **PASS** | Zero admin-file edits; acceptance = 40-file hash identity + prior guards |
| Portal separation (Spec 012 amendment) | **PASS** | Family/teacher/hub byte-identical; shared keys frozen; no admin links from the student page (D7) |
| No pay figures/vocabulary | **PASS** | Student surface has no pay adjacency; teacher pay-grep re-run green |
| Screenshot-based visual acceptance | **PASS** | 12+ frame matrix incl. four area captures + four unchanged proofs |

**Post-Phase-1 re-check**: contracts/data-model introduce no violation; no structural additions at all this spec (content + tests only). **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/013-student-dashboard/
├── plan.md · research.md (D1–D12) · data-model.md · quickstart.md
├── checklists/requirements.md
└── contracts/  (14)
    student-dashboard-contract.md · student-dashboard-honesty-contract.md ·
    student-progress-achievements-contract.md · student-homework-materials-contract.md ·
    student-history-feedback-contract.md · student-mobile-accessibility-contract.md ·
    legacy-student-capability-coverage-contract.md · admin-impact-contract.md ·
    family-teacher-impact-contract.md · static-html-django-ready-contract.md ·
    source-links-contract.md · planned-backendrequired-contract.md ·
    screenshot-acceptance.md · scope-guard.md
```

### Source Code (repository root: `academy-dashboard-discovery/app/`)

```text
src/js/pages/student-portal.js        # UPGRADED — the full 13-section composition (this spec's core)
src/js/fixtures/portal.js             # student block ONLY: STUDENT_PREVIEW extensions (homework/materials/
                                      #   history/attendance-trio/celebration) + PORTAL_PLANNED.student
                                      #   re-registered (submit/download/full-history mini-cards);
                                      #   FAMILY_PREVIEW + family/teacher planned registers UNTOUCHED
src/locales/ar.prt.js · en.prt.js     # prt.stu.* + data.prtStu* additions ONLY; all shared keys frozen
src/styles/app.css                    # additive .portal-shell-namespaced blocks (.pt-empty, .pt-day, …)
tests/smoke/run.cjs                   # student-page asserts amended per research D9 (admin asserts untouched)
tests/a11y/run.cjs · tests/screenshots/capture.cjs   # additive entries (D11)
README.md · screenshots/REVIEW.md · CLAUDE.md        # docs
../specs/012-…/legacy-role-capability-coverage.md    # delivery notes on F5/F6/F12 + §4 items ONLY
public/student-portal.html · .en.html # the only built files that change
```

**Structure Decision**: zero new source files by default (a `portal-student-cards.js` helper module is sanctioned ONLY if the page module exceeds readable size); zero shared-file behavior edits; `enhance.js`, `package.json`, `build-html.mjs`, `nav.config.js`, `portal-shell.js`, all admin modules untouched.

## Impact Reviews (binding summaries — full text in contracts/)

- **Admin console**: zero change; acceptance = hash identity of all 40 admin built files vs HEAD + prior guards + unchanged-proof frame.
- **Family/teacher/hub**: byte-identical built pairs, enforced by the shared-key freeze + fixture-block discipline; each has an unchanged-proof frame.
- **Smoke**: the ONLY amendments are inside the student branch of the Spec-012 portal block (D9); all admin-scoped and family/teacher/hub assertions stay verbatim.

## MVP & Sequencing (research D12)

**MVP = baseline gate → fixtures/locales → Band A (hero · today · next · week + Friday empty state) → smoke re-scope green**: proves the deepened composition, the F5 delivery, and the empty-state pattern with tests green. Then Band B (courses · homework · materials + backendRequired mini-cards) → Band C (progress · attendance trio · achievements · celebration) → Band D (history/F6 · profile · closing note) → byte-identity audit → a11y/screenshots/review → coverage delivery notes → docs.

## Complexity Tracking

*No constitution-gate violations to justify.* This spec adds no structure — it is a content deepening of one page inside the architecture Spec 012 built for exactly this purpose.
