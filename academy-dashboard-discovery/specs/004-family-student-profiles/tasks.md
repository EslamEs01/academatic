---
description: "Task list for Spec 004 — Families and Student Academic Profiles"
---

# Tasks: Families and Student Academic Profiles

**Input**: Design documents from `academy-dashboard-discovery/specs/004-family-student-profiles/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (all present)

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, tabs/wizard/family-card asserts, keyboard) **and** screenshot-based visual acceptance.

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 004 **extends the implemented Spec 001/002/003 app in place** — same static HTML-first SSG, same pipeline, **no new dependencies**. Existing files are unchanged unless a task says EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US11 (story phases only)

## Story sequencing rationale (read first)

This is the largest spec yet (5 surfaces + a new Family entity + a wizard + a rubric), so it is sequenced **MVP-first by dependency**:

- **Setup + Foundational** build the page-agnostic blocks (the family/student **status map**, CSS, the new **components** — family-card, profile-banner, wizard, form-field, result-summary, evaluation-rubric — the **fixtures** (`families.js` + extended `students.js`), and the tiny **wizard stepper** in `enhance.js`).
- **US1 (Families page, P1)** is the MVP entry: the family-as-hero directory.
- **US2 (Family profile, P1)** then **US4 (Students enriched, P1)** → **US5 (Student profile, P1)** complete the family↔student spine.
- **US3 (Add-Family wizard, P2)**, **US6 (Results)**, **US7 (Evaluation)**, **US8 (Timetable linkage)**, **US9 (Dashboard impact)** are independent increments composing the proven pieces.
- **US10 (static/Django, P1)** and **US11 (visual + screenshots, P1)** are cross-cutting verification/acceptance stories sequenced last (they require all surfaces to exist) — same rationale as the prior specs.

Earliest demo = **US1** (Families directory). Full family/student MVP = through **US5** (Families + family profile + enriched students + student academic profile).

---

## Phase 1: Setup

**Purpose**: Guard the baseline, add i18n namespaces, the lifecycle status map, and CSS scaffolding.

- [x] T001 Verify the Spec 001/002/003 baseline is green before extending: run `npm run build && npm test && npm run screenshots` in `academy-dashboard-discovery/app/` and confirm clean (no regressions to protect)
- [x] T002 [P] Add Spec 004 i18n keys to `src/locales/ar.extra.js` + `src/locales/en.extra.js`: `fam.*` (families/family/wizard), `res.*` (results/certificates), `eval.*` (rubric criteria + ratings + objectives), `famStatus.*` (active/trial/suspended/stopped/inactive labels), and page `topbar.title/crumb.{families,addFamily,family,student}` — keep all prior keys; Arabic RTL default + English
- [x] T003 [P] Implement `src/js/components/family-status.js` — the family/student **lifecycle** status map (`active/trial/suspended/stopped/inactive` → `{tone, icon, labelKey}`) rendered via the generic `chip`; **never numeric/color-only** (per research R25)
- [x] T004 [P] EXTEND `src/styles/app.css` scaffolding: `.family-card` (+ child-chip group/overflow), `.profile-banner`, `.wizard`/`.wiz-step`/`.wiz-dots`/`.wiz-nav`, `.rubric`/`.rating-pill`, `.result-*`, the profile layout, and mobile reflow

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The new fixtures + shared components + the wizard stepper that the page stories reuse.

**⚠️ CRITICAL**: No page story begins until this phase is complete.

- [x] T005 [P] Implement `src/js/fixtures/families.js` — `FAMILIES` (≥8: guardian{nameKey,accent,contact}, statusId, categoryId, `studentIds[]`, activeCoursesCount, location, joinedDateKey, plan stub, attention?, notesKey) + `FAMILY_CATEGORIES`, per data-model
- [x] T006 [P] EXTEND `src/js/fixtures/students.js` — add a real `familyId` (replace the bare `guardian` string), `enrollments[]`, `groupIds?`, `upcomingSessionIds[]`, `results` (StudentResultSummary), `evaluation` (StudentEvaluationSummary), `notesKey`; keep existing fields + facets, add `data-family`
- [x] T007 [P] Implement `src/js/components/family-card.js` — the family-as-hero card (guardian + **grouped child avatars/chips** + "+N" overflow + student/active-course counts + lifecycle status chip + attention hint + `data-drawer` peek + "view profile" → `family.html` + kebab), with `facetAttrs({status,category,family,search})`, per families-page-contract
- [x] T008 [P] Implement `src/js/components/profile-banner.js` — the shared profile banner (avatar + name + lifecycle status + KPIs + actions slot) reused by `family.html` + `student.html`
- [x] T009 [P] Implement `src/js/components/form-field.js` — labeled field helpers (`field({labelKey,name,type:'text'|'select'|'textarea'|'toggle',options})`) over `.field-label`/`.input`/`.select-input`/`.toggle`; every field labeled
- [x] T010 [P] Implement `src/js/components/wizard.js` — the baked stepper builder (`wizard({group, steps:[{id,labelKey,bodyHTML}]})` → a step indicator + baked `data-tabpanel`-style step panels + a `.wiz-nav` with `data-step-prev`/`data-step-next`/save), per family-form-contract
- [x] T011 [P] Implement `src/js/components/result-summary.js` — results (per-course progress via hand-rolled bars/ring + certificates list + level/term summary), per student-result-contract (fixture-only, no gradebook)
- [x] T012 [P] Implement `src/js/components/evaluation-rubric.js` — the Monthly Progress Report rubric (criteria rows learningProgress/focus/homework/punctuality + calm `.rating-pill`s icon+label + achievements narrative + objectives + Approve demo), per student-evaluation-contract
- [x] T013 EXTEND `src/js/enhance.js` — the **wizard stepper**: delegated `[data-step-next]`/`[data-step-prev]` find the active step in the `[data-wizard]`/tablist group and advance/retreat it via the EXISTING `selectTab` logic (no new engine); the profile tabs reuse the Spec 003 tab engine unchanged; Save = the existing `data-demo-action`

**Checkpoint**: Status map + fixtures + components + wizard stepper ready; build still green (no page wired yet).

---

## Phase 3: User Story 1 - Admin views families (Priority: P1) 🏗️ MVP

**Goal**: A premium Families directory of family cards that group each family's children, with search/status/category filters.

**Independent Test**: Open Families; read the family cards (guardian + grouped children + counts + status); filter by status/category + search with feedback + a no-results state; "view profile" → family profile.

- [x] T014 [US1] Implement `src/js/pages/families.js` — `renderFamilies()`: `pageHeader` + summary tiles + `filterBar` (search + status + category facets, `targetId: 'families-grid'`) + `cardGrid` of `family-card`s + `noResults()`; per families-page-contract
- [x] T015 [US1] CHANGE `src/js/nav.config.js` (promote `families`: `status:'implemented'` + `route:'families.html'`) + EXTEND `scripts/build-html.mjs` (register `{base:'families', activeId:'families', titleKey, crumbKey, render: renderFamilies}` ar+en) — the build-time guard must pass
- [x] T016 [US1] Build + verify `public/families.html` (+ `.en`): the family cards group children, filters narrow cards with chips + no-results, the nav `families` item is a real `<a>` (active pill), no dead controls

**Checkpoint** 🎯: Families directory is live — the MVP entry.

---

## Phase 4: User Story 2 - Admin opens a family profile (Priority: P1)

**Goal**: A calm tabbed family profile hub linking its children to student profiles.

**Independent Test**: Open a family profile; review Overview/Students/Schedule/Plan&Billing/Notes tabs; the children link to `student.html`; actions demo/disabled.

- [x] T017 [US2] Implement `src/js/pages/family.js` — `renderFamily()`: `profile-banner` (guardian + status + KPIs + actions) + `tabs({group:'family', items:[overview,students,schedule,billing,notes]})` with baked panels; Students tab lists the children (linking to `student.html` + an "add child" demo); Schedule tab = `scheduleAgenda` (the family's upcoming sessions) + a "View in schedule" deep-link; Plan&Billing = a calm disabled-with-reason/fixture stub; Notes
- [x] T018 [US2] EXTEND `scripts/build-html.mjs` — register `{base:'family', activeId:'families', titleKey, crumbKey, render: renderFamily}` (ar+en); `family.html` is reached via the families list "view profile" link (not a nav item)
- [x] T019 [US2] Wire family-profile actions (edit/suspend/stop = demo-toast / confirm-modal / disabled-with-reason; add-child = demo) in `src/js/pages/family.js`; build + verify the tabs (one visible), children→student links, and no dead controls

**Checkpoint**: The family hub makes the family↔children link the hero.

---

## Phase 5: User Story 4 - Admin views students (enriched) (Priority: P1)

**Goal**: The students directory gains the family relationship + a "view profile" link to the academic profile.

**Independent Test**: Open Students; filter by family/status/subject; each row shows its family + "view profile" → `student.html`; the quick-peek drawer still works.

- [x] T020 [US4] CHANGE `src/js/pages/students.js` — add the **family** link (a family chip/column resolving `familyId` → `Family.guardian`), a **family** filter facet (`data-family`), and a "view profile" link to `student.html` per row; keep the existing preview drawer + table
- [x] T021 [US4] Build + verify `public/students.html` (+ `.en`): family shown per row, family facet narrows rows, "view profile" navigates, drawer intact, no dead links

**Checkpoint**: Students are linked to families and to their profiles.

---

## Phase 6: User Story 5 - Admin opens a student academic profile (Priority: P1)

**Goal**: A calm tabbed student academic profile (the "real academy platform" centerpiece).

**Independent Test**: Open a student profile; review Overview/Courses/Timetable/Results/Evaluation/Family/Notes tabs; the Timetable reuses the scheduling visual + a deep-link; Family links back.

- [x] T022 [US5] Implement `src/js/pages/student.js` — `renderStudent()`: `profile-banner` (student + **family link** + status + level + progress) + `tabs({group:'student', items:[overview,courses,timetable,results,evaluation,family,notes]})` with baked panels; Courses = `enrollments`; Timetable = `scheduleAgenda` (the student's upcoming sessions) + "View in schedule" deep-link; Family = the family link/back; Results/Evaluation panels stub the `result-summary`/`evaluation-rubric` slots (filled in US6/US7)
- [x] T023 [US5] EXTEND `scripts/build-html.mjs` — register `{base:'student', activeId:'students', titleKey, crumbKey, render: renderStudent}` (ar+en); reached via the students list "view profile" link
- [x] T024 [US5] Build + verify `public/student.html` (+ `.en`): banner + tabs (one visible), family link works, timetable agenda + deep-link, no dead controls; reads as a calm academic profile (not a 99-button spreadsheet)

**Checkpoint** 🎯: The family↔student spine + the student academic profile are complete (full MVP).

---

## Phase 7: User Story 3 - Admin uses the add/edit family wizard (Priority: P2)

**Goal**: A guided, baked multi-step Add-Family wizard with demo save.

**Independent Test**: Open Add Family; step through Identity → Contact&Location → Children → Plan&Billing → Review with Next/Back; Save → demo toast; every field labeled; nothing persists.

- [x] T025 [US3] Implement `src/js/pages/add-family.js` — `renderAddFamily()`: `pageHeader` + `wizard({group:'addFamily', steps})` where each step's body uses `form-field` (a curated labeled subset — NOT the legacy ~30 fields); Review step has a Save button (`data-demo-action`, demo toast); all steps baked
- [x] T026 [US3] CHANGE `src/js/nav.config.js` (promote `addFamily`: add `add-family.html` to `FUTURE_ROUTES`, set `status:'implemented'` + `route:'add-family.html'`) + EXTEND `scripts/build-html.mjs` (register `{base:'add-family', activeId:'addFamily'|'families', titleKey, crumbKey, render: renderAddFamily}` ar+en); guard must pass
- [x] T027 [US3] Build + verify `public/add-family.html` (+ `.en`): Next/Back shows only the active step (baked panels, JS toggle), Save toasts (no persistence), every field labeled, mobile one-step-per-screen

**Checkpoint**: The create-family journey is a calm wizard, not a giant form.

---

## Phase 8: User Story 6 - Admin previews a student result (Priority: P2)

**Goal**: The student profile Results tab shows fixture-only progress + certificates + summary.

**Independent Test**: On a student profile, open the Results tab; confirm per-course progress + certificates + level/term summary; no gradebook.

- [x] T028 [US6] CHANGE `src/js/pages/student.js` — fill the **Results** tab panel with `result-summary` (per-course progress + certificates + summary from the student fixture); export/print = demo/disabled-with-reason; build + verify (fixture-only, reads as not a live grade system)

**Checkpoint**: Results read as a calm fixture progress/certificates surface.

---

## Phase 9: User Story 7 - Admin previews a student evaluation (Priority: P2)

**Goal**: The student profile Evaluation tab shows the fixture-only monthly progress-report rubric.

**Independent Test**: On a student profile, open the Evaluation tab; confirm criteria + rating pills + narrative + objectives + Approve demo.

- [x] T029 [US7] CHANGE `src/js/pages/student.js` — fill the **Evaluation** tab panel with `evaluation-rubric` (criteria + calm rating pills never-color-only + achievements + objectives + Approve `data-demo-action`); build + verify (fixture-only, no workflow)

**Checkpoint**: Evaluation reads as a calm rubric, not a meeting/CRM form.

---

## Phase 10: User Story 8 - Timetable linkage (Priority: P2)

**Goal**: Family/student profiles connect to the Spec 003 timetable without dead links or duplication.

**Independent Test**: From a family/student Schedule/Timetable tab, open a session (shared drawer) and use "View in schedule" → `schedule.html#view=timetable`.

- [x] T030 [US8] Verify + finalize the Schedule/Timetable sections in `src/js/pages/family.js` + `src/js/pages/student.js`: `scheduleAgenda` blocks open the **shared appointment drawer** (showing family context), and the language-aware "View in schedule" deep-links to `schedule.html#view=timetable` / `schedule.en.html#view=timetable` — no duplicated timetable engine, no dead links

**Checkpoint**: The scheduling surfaces are connected, reusing Spec 003.

---

## Phase 11: User Story 9 - Dashboard impact (Priority: P2)

**Goal**: A minimal, fixture-backed family/student dashboard signal.

**Independent Test**: On the dashboard, a deep-link to Families + (if added) one fixture "students needing attention" count chip; no new stat wall.

- [x] T031 [US9] CHANGE `src/js/pages/dashboard.js` — add a deep-link to `families.html` from an existing affordance + ONE fixture-backed "students needing attention" count chip (from existing `attention` flags) linking to the filtered Students/Families surface; build + verify (no new stat wall, no fake/unbacked widget)

**Checkpoint**: The dashboard connects to Families/Students minimally.

---

## Phase 12: User Story 10 - Static / Django-ready (Priority: P1)

**Goal**: Every new surface is complete baked HTML; no runtime page DOM.

**Independent Test**: Build; View Source on the new pages — full shell + cards + profile tabs + all wizard steps + drawer templates baked, no `#app`, relative paths; no external requests.

- [x] T032 [US10] EXTEND `tests/smoke/run.cjs` — add `families`/`add-family`/`family`/`student` to PAGES and assert: family cards group children (`.family-card` with child chips), profile tabs present + exactly ONE visible tabpanel, the wizard advances on `data-step-next`/`data-step-prev` + Save toasts, the promoted nav items are real `<a>` with routes (rest stay Soon), portal ids absent, no `#app`, relative paths
- [x] T033 [US10] Update `app/README.md` + `quickstart.md` with the Django mapping for the new surfaces (`{% for family/student/child %}`, profile tabs + wizard steps → static sections / `{% if %}`, fixtures → context, `data-*` hooks)

**Checkpoint**: Static/Django integrity verified for the new surfaces.

---

## Phase 13: User Story 11 - Visual / reference alignment + screenshots (Priority: P1)

**Goal**: The families/students surfaces match the approved direction and improve on the reference; the screenshot matrix passes.

**Independent Test**: Capture the matrix; review each vs Spec 001/002/003 + the old family/student screenshots (product reference only); axe clean; responsive correct.

- [x] T034 [P] [US11] EXTEND `tests/screenshots/capture.cjs` MATRIX + variant support with the Spec 004 frames (Families AR light/dark + EN; family profile; add-family `wizard-step`; Students AR light/dark; student profile; `results`/`evaluation` tab variants; dashboard impact; mobile families; mobile student profile), per screenshot-acceptance
- [x] T035 [P] [US11] EXTEND `tests/a11y/run.cjs` coverage for the new pages (+ a tab-open + wizard-step state via `#view`/click; AR light + a dark + an EN sample); fix any critical violations
- [x] T036 [US11] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001/002/003 direction + the sidebar reference + the old family/student screenshots (product reference only); fix any failure condition (generic-CRM / spreadsheet-only / missing-relationship / missing-profile / missing-wizard / dead-actions / poor-dark / broken-RTL); record verdicts in `app/screenshots/REVIEW.md`
- [x] T037 [US11] Responsive pass: verify + fix mobile (families cards single-column; student profile tabs stack; wizard one step per screen) and tablet — no overflow

**Checkpoint**: Screenshot matrix accepted; no drift; family↔student relationship + profiles + wizard present.

---

## Phase 14: Polish & Cross-Cutting Concerns

- [x] T038 [P] Verify the scope guard end-to-end per `contracts/scope-guard.md` — `grep` confirms no chart/table/form library; no backend/API/auth/permission-enforcement/CRUD/persistence; no enrollment/grade/evaluation/attendance/finance engine; no portals/role dashboards (smoke: portal ids absent); no full groups/categories module; no legacy assets/classes/logo/palette/wording; no `#app`
- [x] T039 [P] Run the `quickstart.md` flow (install → build → preview → review families/profiles/wizard → verify static-first → verify no-persistence → verify no-library → test → screenshots) and fix any gaps
- [x] T040 Final consistency + cleanup: fixture coherence (every `Student.familyId` resolves to a `Family`; every `Family.studentIds[]` resolves; attention counts match the dashboard chip), no console missing-key warnings, remove dead code, update `app/screenshots/REVIEW.md` + the project memory note

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T004)**: start immediately. T002/T003/T004 are `[P]` (different files).
- **Foundational (T005–T013)**: after Setup; **blocks all stories**. T005–T012 are parallel (different files); **T013 edits `enhance.js`** (single).
- **US1 (T014–T016)**: after Foundational → the MVP entry. T015 edits `nav.config.js` + `build-html.mjs`.
- **US2 (T017–T019)**: after US1 (family.js + register family.html; activeId=families).
- **US4 (T020–T021)**: after Foundational (students.js enrich) — independent of US2; before US5 (students link to student profiles).
- **US5 (T022–T024)**: after US4 (student.js + register student.html).
- **US3 (T025–T027)**: after Foundational (add-family.js + promote addFamily). T026 edits `nav.config.js` + `build-html.mjs` (serialize vs T015/T018/T023).
- **US6 (T028)** / **US7 (T029)**: after US5 — both **edit `student.js`** (serialize after T022, and after each other).
- **US8 (T030)**: after US2 + US5 (family.js + student.js schedule sections).
- **US9 (T031)**: after US1 (dashboard deep-link target exists).
- **US10 (T032–T033)** / **US11 (T034–T037)**: after the page stories exist — the final acceptance gates.
- **Polish (T038–T040)**: last.

### Same-file serialization (never run these in parallel)

- `scripts/build-html.mjs`: T015 / T018 / T023 / T026 (register each page).
- `src/js/nav.config.js`: T015 / T026 (promotions).
- `src/js/pages/student.js`: T022 / T028 / T029 (then read by T030).
- `src/js/pages/family.js`: T017 / T019 (then T030).
- `src/styles/app.css`: T004 (then any visual fix in T036/T037).
- `enhance.js`: T013 only.

### Parallel opportunities

- Setup T002/T003/T004 (different files).
- Foundational T005–T012 in parallel (8 different files); then T013 on `enhance.js`.
- US10/US11 harness extensions T032 (smoke) ‖ T034 (capture) ‖ T035 (a11y) are different files.
- After the spine (US1/US2/US4/US5), the increment stories US3 / US9 are largely independent (different page files), while US6/US7/US8 serialize on `student.js`/`family.js`.

---

## Parallel Example: Foundational components + fixtures

```bash
# After Setup, build the shared pieces together (different files):
Task: "T005 fixtures/families.js"      Task: "T006 fixtures/students.js EXTEND"
Task: "T007 components/family-card.js" Task: "T008 components/profile-banner.js"
Task: "T009 components/form-field.js"  Task: "T010 components/wizard.js"
Task: "T011 components/result-summary.js"  Task: "T012 components/evaluation-rubric.js"
# then T013 extends enhance.js (wizard stepper)
```

## Parallel Example: US11 acceptance harness

```bash
Task: "T032 smoke/run.cjs (new pages + tabs/wizard/family-card asserts)"
Task: "T034 capture.cjs MATRIX (Spec 004 frames)"
Task: "T035 a11y/run.cjs coverage"
# then T036 review + T037 responsive
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. **US1** (Families page) → 4. **US2** (Family profile) → 5. **US4** (Students enriched) → 6. **US5** (Student profile).
   **Stop & validate** at the US5 checkpoint: the Families directory + the family hub (grouping its children) + the enriched students list + the student academic profile prove the "real academy platform" feel and the family↔student spine. This is the demoable MVP.

### Incremental delivery

- After **US1**: Families directory (cards grouping children).
- After **US2 + US4 + US5**: the family↔student spine + both profile pages.
- After **US3**: the Add-Family wizard.
- After **US6 / US7 / US8 / US9**: results, evaluation, timetable linkage, dashboard impact — each independently testable.
- After **US10 / US11**: static/Django integrity verified + the screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (smoke tabs/wizard/cards, axe, no-`#app`) are necessary but the **manual screenshot review against Spec 001/002/003 + the reference is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. **Serialize all edits to the same file** (`build-html.mjs`, `nav.config.js`, `student.js`, `family.js`, `app.css`, `enhance.js`).
- Honor `contracts/scope-guard.md` throughout: fixtures only; static HTML-first (no `#app`, baked tabs + **all wizard steps**); **no chart/table/form library**; **no enrollment/grade/evaluation/attendance/finance engine**; **no portals/role dashboards**; no full groups/categories module; no legacy copy.
- Profile pages (`family.html`/`student.html`) are **registered templates reached via "view profile" links** (`activeId` keeps families/students active) — not nav items; Django later → `family/<id>`/`student/<id>`.
- Results = fixture progress/certificates/summary (no gradebook); Evaluation = the fixture monthly progress-report rubric (no workflow) — both live as student-profile tabs; the `studentResult`/`studentEvaluation` nav items stay planned.
