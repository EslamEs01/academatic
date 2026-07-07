# Visual Grounding — Spec 025 Teacher Internal Pages

**Date**: 2026-07-07
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `32c78c8` (Spec 024 committed); 77 public HTML (→ 91 planned).

The Targeted Visual Grounding Gate for a teacher-internal-pages spec: confirm each of the 7 pages traces to a captured legacy teacher capability and to the current teacher portal decisions — no invented SaaS.

## Legacy teacher evidence inspected

- `output/roles/teacher/pages/*.md` — the ~26 captured teacher pages (home, timetable, students/studentslist, update-result, course-history(+class), teacher-history, monthly-plans(+mq-show), library, chat, tickets, profile(+edit), salary, salary-class-report, session-class-room). Re-read via the Spec 023 `agent-findings/07-teacher-coverage.md` (which read all 26 in this repo) + Spec 015 spec §"Capture-verified grounding".
- `output/roles/teacher/screenshots/` — 67 shots; the four pay surfaces (home salary band 997.00 EGP, /salary 13-col ledger, /salary-class-report, /update-result 23-col matrix), the timetable grid, the tickets pie+Average, opened in Spec 023 (07 evidence list) and Spec 015.
- `output/combined/` (page-inventory, form-inventory, modal/table/interaction inventories) + `frontend-planning-deep/08-role-page-inventory-v2.md` — teacher route templates (22) + field lists.
- `design-references/` — the approved visual language.

## Current teacher app evidence inspected

- `app/src/js/pages/teacher-portal.js` — the living cockpit (idHero/dayRail/follow-ups/flowStrip); the performance anchor (→ repoint target).
- `app/src/js/fixtures/portal.js` — `ROLE_NAV.teacher` (8 items: home implemented + 7 planned incl. the `book-open` library) + `TEACHER_PREVIEW` (followUps out15/out4 · recentSessions out1/out11 · tasks tk1/tk2 · materials tm1/tm2/tm3 · rubric dims · certificate lines).
- `app/src/js/components/portal-page.js` — living primitives: idHero · dayRail · storyRow · flowStrip · guidePanel · kpiRow/kpiCard · plannedCard · gateNote · secHead · pageHead.
- `app/src/js/components/portal-shell.js` — the role shell (topbar + sidenav + mobile drawer; the Spec-024 notifications gate).
- `app/src/locales/ar.prt.js` / `en.prt.js` — the `prt.nav.tch.*`, `prt.tch.*`, `prt.kpi.tch.*` keys.
- `app/src/styles/app.css` — the additive living layer + reduced-motion block.
- `app/public/teacher-portal.html` — the built home (nav renders 8 items; 7 «قريبًا»).
- `app/tests/smoke/run.cjs` — teacher asserts (payHit, nav count 8, plannedNavAnchors===0, shellAnchors===5, flowSteps===4, bodyAnchors===1).
- `app/screenshots/REVIEW.md` — the Spec-024 section.

## Binding specs + Spec 024 gates inspected

- `specs/015-teacher-dashboard/spec.md` — the T1–T27 capability map with capture-verified legacy field lists (the primary grounding source for each page).
- `specs/016-…/contracts/teacher-pay-free-global-contract.md` — the three-layer pay-free contract + the Spec-024 B-07 exemption (to be superseded by FR-009 repoint).
- `specs/021-…` (role model) · `specs/022-…` (living primitives + contracts) · `specs/023-…/{coverage-matrix.md teacher rows, missing-capabilities-register.md M-02/M-03/M-05/M-09/M-11}` · `specs/024-…/{correction-scope.md, contracts/b04/b05/b06/b07}`.

## Grounding table (page → legacy capability → current source)

| Page | Legacy capability (T#) | Legacy evidence | Current source basis | Gate(s) | Pay-free note |
|---|---|---|---|---|---|
| teacher-schedule | T14 timetable + availability | `output/roles/teacher/pages/teacher-timetable.md`; `teacher-timetable-full.png` | dayRail + sessions (teacher-portal.js railStops) | live-room = backendRequired | no pay |
| teacher-students | T8 my-students roster | `teacher-studentslist.md` lines 180–237 | TEACHER_PREVIEW roster/followUps; roster st1/st6/st11/st13 | contact = backendRequired | no pay |
| teacher-outcomes | T22/T3 outcome workflow | `teacher-home.md` forms 4–5 (classes-end fields); `teacher-update-result` matrix (pay part excluded) | flowStrip + recentSessions (out1/out11) | save/submit = backendRequired | update-result PAY part EXCLUDED |
| teacher-tasks | T11/T16 monthly plans + tasks | `teacher-monthly-plans.md`; `teacher-tickets.md` (empty shell) | TEACHER_PREVIEW.tasks (tk1/tk2) | complete = backendRequired | tickets pie+Average EXCLUDED |
| teacher-reports | T9 rubric + T20/T21 history | `teacher-students.md`/`teacher-monthly-plans.md` (rubric dims); `teacher-course-history-1.md` | TEACHER_PREVIEW.rubric + recentSessions | export = backendRequired | salary/update-result EXCLUDED; academic-only |
| teacher-profile | T23 account/profile-edit | `teacher-profile-edit.md`; `teacher-profile.md` (500) | account slice (contact/subjects/availability) | photo/save/password = backendRequired | no pay; /profile 500 excluded |
| teacher-library | T15 materials library | `teacher-library.md`; `teacher-library-full.png` | TEACHER_PREVIEW.materials (tm1/tm2/tm3) | upload/download = backendRequired | no pay |

## Excluded (never rendered) — pinned for the pay-free law

| T# | Legacy surface | Evidence | Disposition |
|---|---|---|---|
| T2 | home salary hero (997.00 EGP + Estimated/Fines/Bonus) | `teacher-home.md` lines 47–48/60 | intentionally-excluded-by-law |
| T17 | /teacher/salary 13-col ledger | `teacher-salary.md`; `teacher-salary-full.png` | intentionally-excluded-by-law |
| T18 | /teacher/salary-class-report | `teacher-salary-class-report.md` | intentionally-excluded-by-law |
| T19 | /teacher/update-result 23-col pay matrix | `teacher-update-result-…-filter-student.md` | intentionally-excluded-by-law (outcome concept kept, pay columns excluded) |
| T7 | live class room | `teacher-session-class-room-mq-2.md` (redirected home) | future-backend (Spec 024 B-04); honest gate only |
| T13 | chat/messaging | `teacher-chat.md` | future/backendRequired (Spec 024 B-06); admin preview → 026; NO teacher page/nav |
| T6 | fake "live room" (re-rendered home) | Spec 015 §exclusions | intentionally-excluded |
| tickets chart | pie + computed "Average" | `teacher-tickets-full.png` | intentionally-excluded (no chart/computed-score) |

## Evidence gaps (declared)

1. **Live-room (T7)** never captured (redirected home copy) → future-backend; schedule shows a gate only.
2. **Chat send-form (T13)** never captured → UNCONFIRMED → no teacher chat surface; admin 026 owns the preview.
3. **Legacy teacher tables captured mostly empty** (zero-course fixture account) → no pixel-clone; agenda/card treatments over the captured field lists.
4. **Availability editing (T14)** and **certificate submit (T10)** are genuine backend workflows → backendRequired gates.

## Were all 7 pages grounded?

Yes — each of the 7 pages maps to a captured T-capability with an evidence path (table above); the four pay surfaces + live-room + chat + tickets-chart are explicitly excluded/gated with evidence. No page is invented.
