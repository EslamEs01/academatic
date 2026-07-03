# Implementation Plan: Teacher Dashboard (Spec 015)

**Branch**: `feature/012-role-portal-foundation` (plan authored here; feature branching is user-controlled) | **Date**: 2026-07-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/015-teacher-dashboard/spec.md`

## Summary

Spec 015 upgrades the Spec-012 teacher foundation (`teacher-portal.html` / `teacher-portal.en.html`, persona **sara**) into the full one-page **teacher daily cockpit**: an organized pay-free hero, today's schedule with authored student counts, a rich next-class card (prepare hint + backendRequired live note), a **student follow-up board grounded in real outcome rows** (out15 st11 absence-follow-up · out4 st7 teacherAbsent/make-up, gentle labeled chips + reassurance), the my-students roster (grp1: st1/st6/st11/st13), the **deepened 5-step session-outcome workflow preview** (attendance · remark · summary · homework · files — the capture-verified `classes-end` fields, display-only + backendRequired save gate), graduated **tasks** and **materials** sections, a **timetable/availability agenda** (SAT/MON/TUE day groups + the truthful free-days empty state + backendRequired availability edit), the **monthly-report rubric preview** (5 dimensions, display-only + gated submit), a **certificate-request preview** (gated), the account slice, and a closing honest note. The labeled admin **teacher-performance** link stays the ONE sanctioned page-body link. Everything fixture-bound or authored display-only; zero tables; zero form controls; **zero pay vocabulary/figures (copy + comments — the hard rule)**; **47/49 built files stay byte-identical** — only the teacher pair changes (+ tests/docs).

## Technical Context

**Language/Version**: native ES-module JavaScript + Node ≥20 SSG — unchanged
**Primary Dependencies**: none new; dev-only Playwright/axe — **no additions**
**Storage**: none; sara + the `teacher-links.js` graph (`scheduleOfTeacher`/`studentsOfTeacher`/`outcomesOfTeacher`) + existing session/outcome/schedule fixtures + a NEW display-only `TEACHER_PREVIEW` block in `fixtures/portal.js` (+ `PORTAL_PLANNED.teacher` re-registered)
**Testing**: `tests/smoke/run.cjs` **teacher branch** amended per research D13 (planned semantics 2→4, section/empty floors, `bodyAnchors === 1` — the sanctioned performance link, formControls 0, the EXISTING pay-token assert kept verbatim, tables+390px probe generalized); a11y/capture matrices extended additively; **student/family branches + admin/hub asserts byte-verbatim**
**Target Platform**: static HTML on GitHub Pages; AR RTL default + EN LTR; light/dark/system; mobile-first
**Project Type**: static multi-page frontend; the Spec-012 portal shell reused untouched; Specs-013/014 CSS primitives (`.pt-empty`, `.pt-tag`, `.pt-stat`, `.pt-prof-row`, `.pt-lines`, `.pt-line`, `.pt-day`, `.pt-week`, `.pt-card-chip`) reused read-only
**Performance Goals**: n/a (static)
**Constraints**: closed hook set (zero new hooks), fixture-only honesty, Django-ready, **byte-identity for all non-teacher built files**, shared `prt.shell/portal/role/hub` + sibling `prt.stu.*`/`prt.fam.*` + `data.prtStu*`/`data.prtFam*`/`data.prtNote*` keys frozen, **ZERO pay tokens in copy AND comments** (the fixture's `rating`/`util` numerics display-suppressed — labeled signals only), `enhance.js`/`package.json`/`build-html.mjs`/`portal-shell.js`/`nav.config.js` untouched, Specs 008–014 guards green
**Scale/Scope**: 1 page pair deepened (8 → 14 sections, research D1 + amendment A1) · 1 new `TEACHER_PREVIEW` register + re-registered teacher planned set · ~55 new `prt.tch.*`/`data.prtTch*` key pairs · ~2 small namespaced CSS additions (stepper polish; 013/014 primitives reused) · 14+ screenshot frames

## Constitution Check

*GATE: `.specify/memory/constitution.md` remains the unfilled template — the effective constitution is the CLAUDE.md hard-constraints block + Specs 001–014 binding contracts:*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; no `#app`/SPA/runtime construction; closed hooks | **PASS** | Same generator/shell; content-only page-module growth; zero new hooks; zero form controls |
| Fixture-only; no engines; four honest action classes | **PASS** | All numbers authored/fixture; no live-join/end-class/attendance-write/upload/chat/certificate engines; every gate a labeled planned/backendRequired control |
| **Zero pay figures/vocabulary** (the project spine + the Spec-015 hard rule) | **PASS** | The legacy salary hero + all pay pages stay backendRequired, never rendered; the standing word-bounded EN+AR grep covers sources (incl. comments) + built files; the Spec-012 smoke pay-token assert stays verbatim |
| No computed score/rank/rating | **PASS** | The fixture's `rating`/`util` numerics never render; follow-up = real outcome rows as labeled chips; rubric preview = display-only question lines, no rating-scale visual |
| Admin console + reports/finance protected | **PASS** | Zero admin-file edits; acceptance = 40-file hash identity + prior guards |
| Portal separation + sibling protection (Specs 012–014) | **PASS** | Student/family/hub pairs byte-identical; shared + sibling locale namespaces frozen; the one page-body link targets the sanctioned pay-free admin performance page |
| Screenshot-based visual acceptance | **PASS** | 14+ frame matrix incl. six area captures + four unchanged proofs |

**Post-Phase-1 re-check**: contracts/data-model introduce no violation; no structural additions (content + tests only). **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/015-teacher-dashboard/
├── plan.md · research.md (D1–D16) · data-model.md · quickstart.md
├── checklists/requirements.md
└── contracts/  (17)
    teacher-dashboard-contract.md · teacher-dashboard-honesty-contract.md ·
    teacher-schedule-next-class-contract.md · teacher-student-follow-up-contract.md ·
    teacher-session-outcome-contract.md · teacher-materials-tasks-contract.md ·
    teacher-reports-availability-contract.md · teacher-mobile-accessibility-contract.md ·
    teacher-pay-free-contract.md · legacy-teacher-capability-coverage-contract.md ·
    admin-impact-contract.md · student-family-impact-contract.md ·
    static-html-django-ready-contract.md · source-links-contract.md ·
    planned-backendrequired-contract.md · screenshot-acceptance.md · scope-guard.md
```

### Source Code (repository root: `academy-dashboard-discovery/app/`)

```text
src/js/pages/teacher-portal.js        # UPGRADED — the full 14-section cockpit (this spec's core)
src/js/fixtures/portal.js             # teacher block ONLY: NEW TEACHER_PREVIEW register (today student
                                      #   counts refs, follow-up outcome refs, tasks, materials, rubric/
                                      #   certificate concept keys, profile refs) + PORTAL_PLANNED.teacher
                                      #   re-registered {outcomeSave, matUpload, availabilityEdit:
                                      #   backendRequired · taskManage: planned}; PORTAL_PERSONAS +
                                      #   STUDENT_PREVIEW + FAMILY_PREVIEW + student/family registers UNTOUCHED
src/locales/ar.prt.js · en.prt.js     # prt.tch.* rewrite + data.prtTch* additions ONLY; shared + prt.stu/fam frozen
src/styles/app.css                    # tiny additive .portal-shell-namespaced bits (stepper/roster polish);
                                      #   013/014 primitives REUSED read-only
tests/smoke/run.cjs                   # teacher-branch asserts amended per research D13 (all else verbatim;
                                      #   the pay-token assert KEPT)
tests/a11y/run.cjs · tests/screenshots/capture.cjs   # additive entries (D15; area mechanism exists)
README.md · screenshots/REVIEW.md · CLAUDE.md        # docs
../specs/012-…/legacy-role-capability-coverage.md    # §9 Spec-015 delivery notes ONLY
public/teacher-portal.html · .en.html # the only built files that change
```

**Structure Decision**: zero new source files by default; zero shared-file behavior edits; all frozen files listed in the scope guard.

## Impact Reviews (binding summaries — full text in contracts/)

- **Admin console**: zero change; acceptance = hash identity of all 40 admin files + prior guards + unchanged-proof frame. The teacher-performance link target (`teacher-performance(.en).html`) already exists and is pay-free by Spec 007/010 construction.
- **Student/family/hub**: byte-identical built pairs; the Spec-013 student and Spec-014 family smoke branches re-run unchanged.
- **Smoke**: the ONLY amendments live inside the teacher branch of the portal block (D13); the teacher pay-token assertion is untouched and must stay green on the deepened page.

## MVP & Sequencing (research D16)

**MVP = baseline gate → fixtures/locales/CSS → Band A (hero · today · next class · follow-up board) → teacher smoke re-scope green**: proves the cockpit composition, the real-outcome follow-up honesty, and the pay-free hero with tests green. Then Band B (my-students · outcome workflow · tasks · materials) → Band C (timetable/availability incl. the truthful free-days empty state · rubric · certificates · profile · closing note) → byte-identity audit + the dedicated pay-free audit + prior guards → a11y/screenshots/review → coverage §9 delivery notes → docs.

## Complexity Tracking

*No constitution-gate violations to justify.* No structural additions — the fourth and final role-dashboard deepening inside the proven portal architecture (013 student → 014 family → 015 teacher).
