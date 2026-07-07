# Research — Spec 025 Teacher Internal Pages

**Date**: 2026-07-07. Baseline: branch `feature/012-role-portal-foundation`, HEAD `32c78c8` (Spec 024 committed); 77 public HTML; build idempotent + baseline tests green at this HEAD (024 was committed after a full green suite). D1–D25 resolved (Decision / Rationale / Alternatives).

## D1 — Visual grounding sufficiency (all 7 pages)

**Decision**: Sufficient. Every page maps to a captured legacy T-capability (`teacher-legacy-coverage.md`): schedule=T14, students=T8, outcomes=T22/T3, tasks=T11/T16, reports=T9+T20/T21, profile=T23, library=T15. Pay surfaces T2/T17/T18/T19 excluded-by-law; live-room T7 future-backend; chat T13 future (no teacher page/nav). **Rationale**: Spec 015's capture-verified field lists + retained `TEACHER_PREVIEW` fixtures fully determine each page. **Alternatives**: re-crawl live-room — out of scope (B-04 records future-backend).

## D2 — Page architecture

**Decision**: Seven portal-shell page modules (`teacher-*.js`), each exporting `renderTeacher<Page>()` returning a `#page-body` string, composed from `portal-page.js` primitives. Schedule/outcomes lead with living rail/flow; students/tasks/reports/profile/library lead with a lighter `pageHead` + `secHead` + cards/`storyRow` (avoid hero-fatigue). **Rationale**: mirrors the family/student internal pattern exactly (portal shell + activeId); consistent living language without hero on every page. **Alternatives**: full idHero on every page — rejected (density/monotony, per design register D-15 lesson).

## D3 — build-html registration (7 only)

**Decision**: Add 7 imports + 7 PAGES entries mirroring the family-internal shape (line 108): `{ base: 'teacher-<page>', shell: 'portal', role: 'teacher', personaKey: 'data.t.sara', activeId: '<navId>', titleKey: 'prt.title.tch<Page>', render: renderTeacher<Page> }`. NO other PAGES change; `package.json` untouched. **Rationale**: the exact established internal-page registration; the build engine is not refactored. **Alternatives**: none.

## D4 — Teacher nav conversion

**Decision**: In `fixtures/portal.js` `ROLE_NAV.teacher` (lines 161–166), flip `schedule/students/outcomes/tasks/reports/library/profile` from `status: 'planned'` → `'implemented'` (page ids already correct: teacher-schedule/students/outcomes/tasks/reports/library/profile). Home stays implemented. Result: 8 implemented self-links; `plannedNavAnchors===0`; `navListAnchors===8`; no chat/finance nav. **Rationale**: the pages now exist, so planned→implemented is honest; the portal-shell renders implemented items as real `<a>` with `aria-current`. **Alternatives**: none.

## D5 — Performance anchor repoint

**Decision**: In `teacher-portal.js:70`, change `perfHref` from `teacher-performance(.en).html` → `teacher-reports(.en).html`. The teacher-home body still contributes EXACTLY ONE anchor (now → teacher-reports, a teacher-owned pay-free page). Update the smoke assert (line ~1124) target regex `teacher-performance` → `teacher-reports`, and the shell-anchor set stays {self×2, hub×3}=5. Update the Spec 024 B-07 exemption note: the tension is CLOSED (teacher home no longer routes into the admin shell); the admin board remains an admin-only surface reached from admin nav. **Rationale**: FR-009 — closes the pay-free-adjacency risk at the source. **Alternatives**: keep the admin board link + a second reports link — rejected (two performance destinations; the teacher-owned one is correct).

## D6 — Fixture / data extension

**Decision**: Extend `TEACHER_PREVIEW` with static authored rows per page (schedule sessions, roster entries, outcome states, tasks, report summaries, profile fields, library resources), reusing real outcome refs (out1/out4/out11/out15) where they exist and authoring the rest. NO pay data, no fake live/chat/notification/upload state, no computed scores. **Rationale**: the retained slices are the grounded base; authored static rows are the standing pattern (every number authored). **Alternatives**: a new fixtures file — rejected (portal.js is the portal fixtures home).

## D7 — Locale keys (AR/EN mirrored)

**Decision**: Titles use the existing camelCase convention `prt.title.tchSchedule/tchStudents/tchOutcomes/tchTasks/tchReports/tchProfile/tchLibrary` (mirroring `prt.title.famSchedule`), NOT the dotted `prt.title.tch.schedule`. Page content keys nest under `prt.tch.<page>.*`. Every key mirrored ar+en; no raw keys; no pay/finance/chat-send/live-join wording; no student-primary/family-payment drift. **Rationale**: matches the build's `titleKey` convention (verified in build-html). **Alternatives**: the dotted title form — rejected (inconsistent with the codebase).

## D8 — Shared composition using existing primitives

**Decision**: Reuse `idHero · dayRail · storyRow · flowStrip · guidePanel · kpiRow/kpiCard · plannedCard · gateNote · secHead · pageHead`. Gates use `gateNote`/`guidePanel`/`plannedCard` (backendRequired). No new primitive; if a page needs a new card shape, add an additive CSS class only. **Rationale**: the living design system is already complete; reuse keeps consistency + zero new hooks. **Alternatives**: new primitives — rejected (scope creep).

## D9 — teacher-schedule design + gates

**Decision**: `pageHead` + today `dayRail` (time·course/group·room·authored student count·status chip·prep) + week day-grouped agenda cards (Sat–Fri, truthful rest days, no grid clone) + next-class card with prep hint. Gates: enter/live-room + availability-edit = `gateNote` backendRequired. **Rationale**: T14 agenda-not-grid (Spec 015 FR-009). **Alternatives**: 7×24 grid — rejected (no-clone law).

## D10 — teacher-students design + gates

**Decision**: `pageHead` + roster cards (st1/st6/st11/st13: name·course/group·calm learning signal from out15/out4·next-session/latest-outcome) + a follow-up `storyRow`. View-only; contact/message (if surfaced) = backendRequired gate. **Rationale**: T8; no computed risk score. **Alternatives**: a data table — rejected (no-table portal law).

## D11 — teacher-outcomes design + gates

**Decision**: `pageHead` + `flowStrip` prepare→attend→record→review (4 steps) + the five-field checklist display-only (attendance·remark·summary·homework note·files note) + example states (out1/out11) + honest review status. Save/submit = `guidePanel` backendRequired. **Rationale**: T22/T3 classes-end fields (Spec 015 FR-006). **Alternatives**: an editable form — rejected (no fake write; no form controls).

## D12 — teacher-tasks design + gates

**Decision**: `pageHead` + task/follow-up board from `TEACHER_PREVIEW.tasks` (tk1/tk2 + static: title·priority/status tag·due/next-class) + a monthly-plan preview row. Complete/assign = backendRequired gate. **Rationale**: T11/T16; the empty tickets shell + pie/Average excluded. **Alternatives**: fake toggle completion — rejected.

## D13 — teacher-reports design + pay-free enforcement

**Decision**: `pageHead` + session-completion & attendance/outcome-quality summary (authored counts, NO charts) + student-progress summaries + monthly rubric dimension lines display-only (achievements·learning-progress·focus·homework·punctuality + rescheduled/support/objectives — NO answer scales/computed score). Export/download = backendRequired gate. **This is the highest pay-free risk page**: the three-layer scan is mandatory here; the word set is scrubbed; it is the anchor-repoint target. **Rationale**: T9+T20/T21 academic-only (Spec 015 FR-010). **Alternatives**: a KPI/chart dashboard — rejected (no chart/score engine; pay-adjacency).

## D14 — teacher-profile design + gates

**Decision**: `pageHead` (or light `idHero`) + identity summary · subjects/specializations · availability windows (from/to day+time display-only) · teaching preferences (lang/theme/contact). Exactly three backendRequired write gates (photo·profile save·password), mirroring the family/student profile pattern. NO financial/pay info. **Rationale**: T23 (Spec 015 FR-012); /profile 500 excluded. **Alternatives**: editable fields — rejected (no fake save).

## D15 — teacher-library design + gates

**Decision**: `pageHead` + resource cards from `TEACHER_PREVIEW.materials` (tm1/tm2/tm3 + static: name·type chip·status·linked course/group). Static filter/search ONLY if it actually filters the rendered cards (no fake filter). Upload/download = backendRequired gates. **Rationale**: T15 (Spec 015 FR-008); B-05 honest gate. **Alternatives**: fake upload/download — rejected.

## D16 — Live-room future-backend gate

**Decision**: Any enter/join/room affordance renders as a `gateNote` backendRequired label; no `href="#"`, no fake join/start/end/attendance-write/camera/mic/meeting engine. Recorded future-backend (B-04). **Rationale**: no capture exists; honest gate only. **Alternatives**: none.

## D17 — Chat exclusion/future record

**Decision**: NO teacher chat page, NO teacher chat nav item. Record (in `teacher-legacy-coverage.md` + correction docs) that teacher chat is future/backendRequired, owned by Spec 026 (admin preview); send-form UNCONFIRMED. If ever surfaced, an honest planned/backendRequired gate only. **Rationale**: B-06. **Alternatives**: a planned chat nav item — rejected (asserts an unevidenced teacher surface).

## D18 — No-fake-actions enforcement

**Decision**: Every unavailable action (live-room, save/submit, upload/download, task-complete, export, contact, availability-edit, password) is a labeled `gateNote`/`guidePanel`/`plannedCard` backendRequired control (non-anchor or a real link only to a real page). Smoke asserts zero `href="#"`, zero dead buttons, zero unexplained disabled controls (the existing dead-nav/dead-button sweep covers the new pages). **Rationale**: no-fake-actions law. **Alternatives**: none.

## D19 — Teacher pay-free three-layer enforcement

**Decision**: (1) source grep (incl. comments) over the 7 modules + teacher fixture slices + `prt.title.tch*`/`prt.tch.*` keys → 0 hits; (2) built grep over teacher-portal + 7 pages ×2 langs → 0 hits; (3) smoke `payHit` over the rendered `#page-body` of all 8 teacher-portal-family pages (both langs) → false, BYTE-VERBATIM. Forbidden set per `pay-free-risk-register.md`. Any hit = STOP. **Rationale**: the binding contract; reports is the sharpest surface. **Alternatives**: none.

## D20 — Smoke update plan

**Decision**: Add per-page assertions in `run.cjs`: extend the PORTAL_PAGES set with the 7 new pages; assert each loads, is a teacher portal page (role teacher, sidebar), body has no `href="#"`/dead button/raw key, and `payHit` false. Update the teacher nav block: `navWant['teacher-portal']` stays 8, but the 7 internals now assert `navListAnchors===8` + `plannedNavAnchors===0` + `aria-current` self. Re-pin the teacher-portal anchor assert target `teacher-performance` → `teacher-reports` (bodyAnchors stays 1). Add page-specific gate asserts (schedule live-room backendRequired; outcomes save backendRequired; library upload/download backendRequired; profile 3 write gates; reports export backendRequired + no chart/score + finance-free). Bump the load count to the new total. `payHit`/`famPay`/admin asserts BYTE-VERBATIM. **Rationale**: real, non-vacuous coverage for the new surface. **Alternatives**: none.

## D21 — a11y update plan

**Decision**: Add the 7 pages to the a11y sweep (`run.cjs`): AR+EN + at least one dark + one mobile-390 sample; critical=0 serious=0; honest gates aria-safe (`aria-disabled`/labeled). **Rationale**: the a11y bar is standing. **Alternatives**: none.

## D22 — Screenshot capture plan

**Decision**: Add the 7 pages to `capture.cjs`: all 7 AR desktop, ≥1 EN, teacher-portal post-conversion, teacher-reports + teacher-library proofs, a mobile-390 sample, a dark sample. Update `REVIEW.md` with a Spec 025 section. **Rationale**: visual-acceptance law. **Alternatives**: none.

## D23 — Count / identity protection

**Decision**: `find public -maxdepth 1 -name '*.html' | wc -l` MUST be **91** after build (77 + 14). The 40 admin + index + family + student pages stay byte-identical; teacher-portal(.en) changes ONLY from the nav flip + anchor repoint; shared assets (locales/CSS/js bundle) rebake. Verify byte-identity of a sampled admin page + a family page pre/post. **Rationale**: FR-019/SC-001. **Alternatives**: none.

## D24 — Allowed / forbidden files

**Decision**: **Allowed**: the 7 `teacher-*.js`, `teacher-portal.js` (anchor only), `fixtures/portal.js`, `ar/en.prt.js`, `app.css`, `build-html.mjs` (7 registrations only), `tests/{smoke,a11y,screenshots}`, `REVIEW.md`, `README.md`, `CLAUDE.md`, specs 016/023/024/025. **Generated**: the 14 `teacher-*(.en).html` + teacher-portal rebake. **Forbidden**: `package.json`, external deps, admin/family/student modules, teacher-chat/finance/salary/pay/live-room pages, backend/API/auth. **Rationale**: mirrors the plan Project Structure. **Alternatives**: none.

## D25 — Risks / stop conditions

**Decision**: Stop if — HTML ≠ 91 · any teacher pay token · reports needs finance wording · anchor still → teacher-performance · fake live-room/chat/upload/download/save · teacher chat/finance/pay nav · package.json change · admin/family/student module change · new backend/dep/chart engine · a11y critical/serious · mobile-390 overflow. Residual risks: (r1) reports pay-adjacency → mandatory 3-layer scan + word scrub; (r2) anchor repoint must update both the source AND the smoke assert together (or smoke reds); (r3) nav flip to 8 implemented changes `navListAnchors` 1→8 for teacher — the smoke teacher block must update from `navListAnchors===1` to `===8` (this is the biggest smoke change). **Rationale**: pre-planned tripwires with fallbacks. **Alternatives**: none.

## Summary of key decisions

| Area | Decision |
|---|---|
| Architecture | 7 portal-shell modules from existing primitives; hero only where it fits |
| Build | 7 imports + 7 PAGES entries (family-internal shape); package.json untouched |
| Nav | flip 7 planned→implemented; navListAnchors 1→8; plannedNavAnchors===0 |
| Anchor | teacher-portal.js:70 perfHref → teacher-reports; smoke target re-pin; B-07 tension closed |
| Reports | academic-only; no chart/score; highest pay-free risk; 3-layer mandatory |
| Live-room/Chat | backendRequired gate / no teacher page+nav (→026) |
| Count | 77 → 91; admin+index+family+student byte-identical |

Zero NEEDS CLARIFICATION. Ready for Phase 1 contracts.
