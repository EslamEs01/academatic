---
description: "Task list for Spec 008 — Academic Reports and Operations Analytics Shell"
---

# Tasks: Academic Reports and Operations Analytics Shell

**Input**: Design documents from `academy-dashboard-discovery/specs/008-academic-reports-analytics/`
**Prerequisites**: plan.md, spec.md (US1–US10), research.md (D1–D10), data-model.md (13 shapes + 2 maps), contracts/ (14) — all present.

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, category-cards/source-links/filter/action asserts, teacherAbsent≠studentAbsent, **no-finance / no-chart / no-score-rank**, numbers-match-source) **and** screenshot-based visual acceptance (the final gate).

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 008 **enriches the implemented Spec 001–007 app in place** — it **rewrites the existing `reports.html`** (already registered, `activeId:'reports'`) into the Academic Reports shell. **No new public page, no `build-html.mjs`/`nav.config.js`/`dashboard.js` change, no new dependency, no new runtime hook.** Existing files are unchanged unless a task says REWRITE/EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US10 (story phases only)

## Story sequencing rationale (read first)

This is a single-page enrichment spec (one `reports.html` page) sequenced **MVP-first by dependency** (plan §Phasing):

- **Setup + Foundational** build the page-agnostic blocks: the i18n overlay + CSS, the **two labeled maps** (`report-status.js`), the **`reportActions()`** cluster, the **rewritten `fixtures/reports.js`** (the `report-summary` ROLL-UP resolver + honest `REPORTS` category list, **finance removed**), and the lightly-extended `report-card.js` — that every section composes.
- **US1 (Reports shell, P1)** rewrites `pages/reports.js` into the shell (header + actions + overview + category cards + filter + planned cards), with the per-area sections as labelled **stubs**; **US2 (Academic Operations overview, P1)** fills the overview band — together the demoable MVP.
- **US3–US7 (P2)** each FILL one per-area summary section in `reports.js` (Attendance/Sessions/Courses-Groups/Teacher/Student-Family — reusing Spec 005/003/006/007/004). **US8 (P2)** wires the filters + honest actions.
- **US9 (static/Django, P1)** + **US10 (visual + screenshots, P1)** are the cross-cutting acceptance gates.

**The `reports.js` page file is built up across US1→US2→US3→…→US8 (serialize on that file).** Earliest demo = US1; MVP = **US1 + US2**.

---

## Phase 1: Setup

**Purpose**: Guard the baseline; add the i18n namespace, CSS scaffolding, and confirm icons.

- [X] T001 Verify the Spec 001–007 baseline is green before enriching: run `npm run build && npm run test:smoke && npm run test:a11y && npm run screenshots` in `academy-dashboard-discovery/app/` and confirm clean (no regressions to protect)
- [X] T002 [P] Add Spec 008 i18n keys: NEW `src/locales/ar.rep.js` + `src/locales/en.rep.js` (`rep.signal.*` healthy/needsFollowUp/attentionRisk; `rep.avail.*` available/demoOnly/planned/backendRequired; `rep.cat.*` category titles/descs; `rep.sec.*` per-area section titles + count labels; `rep.act.*` print/schedule toasts+confirm; `rep.reason.export`/`rep.reason.share`; `rep.ops.*` overview tile labels; `rep.planned.*` advanced-report cards; updated `reportsPage.title`/`subtitle`) and wire both into `src/js/i18n.js` (two imports + two `deepMerge` lines, exactly like `ar.crs.js`/`ar.trn.js`) — Arabic «التقارير»/«تقارير العمليات الأكاديمية» first + English; mirror every key; **drop the removed finance `report.revenue.*` keys**
- [X] T003 [P] EXTEND `src/styles/app.css` (Spec 008 `@layer`): the report category-card availability chip + summary row; the per-area summary section band; the academic-operations overview tiles — reuse the EXISTING `.report-card`/`.grid-reports`/`.card`/`.chip`/`.medallion` tones (NO new tone CSS, **NO chart/canvas CSS**)
- [X] T004 [P] Confirm icons used by the two maps + sections exist in `src/icons/sprite.svg` (`check-circle`/`alert-triangle`/`x-circle`/`check`/`sparkles`/`clock`/`lock`/`reports`/`clipboard-check`/`students`/`trainers`/`families`/`schedule`/`arrow-left`); vendor any missing via `scripts/vendor-assets.cjs` (reuse existing; build must report `0 missing`; NO chart icon)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The labeled maps + actions cluster + the rewritten reports fixture (roll-up) + the extended card — every section composes these.

**⚠️ CRITICAL**: No story begins until this phase is complete.

- [X] T005 [P] Implement `src/js/components/report-status.js` — TWO NEW labeled maps: **report-signal** (`healthy/needsFollowUp/attentionRisk`) `{id,tone,icon,labelKey}` + `REPORT_SIGNAL_ORDER` + `reportSignalOf(id)` + `reportSignalChip(id)`, and **report-availability** (`available/demoOnly/planned/backendRequired`) + `AVAILABILITY_ORDER` + `availabilityOf(id)` + `availabilityChip(id)`; icon+text, never numeric/color-only; distinct from the existing maps (per report-status-contract / data-model §4/§5)
- [X] T006 [P] Implement `src/js/components/report-actions.js` — `reportActions()` the honest cluster: `print` = `data-demo-action`+`data-toast`; `exportCsv`/`exportPdf` = `data-disabled-reason`+`data-reason-key="rep.reason.export"`; `share` = `data-disabled-reason`+`data-reason-key="rep.reason.share"`; `schedule` = `data-confirm`(+`-title/-msg/-cta/-toast`)→demo toast — reusing the EXISTING hooks; **NO real export/PDF/CSV/send/scheduled-job/persistence, NO new hook** (per report-actions-contract / data-model §12)
- [X] T007 REWRITE `src/js/fixtures/reports.js` — export **`REPORT_SUMMARY`** (the display-only ROLL-UP resolver: imports `OUTCOME_SUMMARY` from attendance.js, `STATUS_SUMMARY` from status-summary.js, `SESSIONS` from sessions.js, `GROUP_SUMMARY` from groups.js, `COURSES` from courses.js [active = `filter(c=>c.statusId==='active')`], `TEACHERS_NEEDING_FOLLOWUP` from teachers.js, `FAMILIES` from families.js + the `dashboard.js` students computation [`statusId∈{suspended,stopped}` OR family `attention`]) + **`REPORTS`** (the honest category list: attendance/sessions/courses-groups/teachers/students-families with real `route` + `availability:'available'` + `summaryKeys`; plus planned `monthlyReports`/`dataAnalysis` with `availability:'planned'|'backendRequired'` + `disabledReasonKey`, **no route**) — **REMOVE the finance `revenue` card and the perm-locked placeholder route:'#' cards; NO finance/score/chart field, every number from an existing export** (per data-model §1/§2/§13). **Keep the `REPORTS` export name so `dashboard.js` keeps working unchanged** (its Reports section now shows the honest category cards)
- [X] T008 EXTEND `src/js/components/report-card.js` — backward-compatible: accept an optional **availability chip** (`availabilityChip(r.availability)`) + an optional **fixture summary slot** (`r.summaryHTML`); keep the existing disabled-with-reason variant for `planned`/`backendRequired` (a non-`<a>` `aria-disabled` block, no dead `href="#"`); existing 1-arg callers (the dashboard) keep working (per reports-page-contract §4)

**Checkpoint**: maps + actions + rewritten reports fixture (roll-up) + extended card ready; build still green; the G8a grep audit (no finance/score/chart token) clean.

---

## Phase 3: User Story 1 — Admin opens the Reports shell (Priority: P1) 🏗️ MVP start

**Goal**: The Reports shell — header + actions + category cards + filter + planned cards (per-area sections + overview as stubs filled by US2–US7).

**Independent Test**: Open `reports.html`; read the category cards (each with an availability chip + a fixture summary + a real drill-down, or a disabled-with-reason planned card); apply the area/availability filter; confirm no chart, no finance card, no dead `#` link.

- [X] T009 [US1] REWRITE `src/js/pages/reports.js` `renderReports()` — `pageHeader` («التقارير» + academic-ops subtitle) + the `reportActions()` cluster + an **academic-operations overview** placeholder (filled US2) + `filterBar` (`targetId:'reports-grid'`, facets area/availability/search) + a `cardGrid(id:'reports-grid')` of the extended `reportCard`s over `REPORTS` (each `available` → a real `<a>` to its source page via `facetAttrs`; planned → disabled-with-reason) + a **planned/backendRequired** cards row + `noResults` + labelled **stub** sections for Attendance/Sessions/Courses-Groups/Teacher/Student-Family (filled US3–US7); language-aware source hrefs
- [X] T010 [US1] Build + verify `public/reports.html` (+ `.en`): baked category cards (each available one a real `<a>` to an implemented page; planned ones disabled-with-reason, NOT dead `#`); the area/availability filter narrows the cards with a count + a no-results/reset; the action cluster present; `reports` nav item active; no finance card; no `id="app"`; no chart token

**Checkpoint** 🎯: the Reports shell is the entry point.

---

## Phase 4: User Story 2 — Admin reviews the academic-operations overview (Priority: P1) 🏗️ MVP payoff

**Goal**: The fixture-backed operations overview band (counts + labeled report-signal chips).

**Independent Test**: On `reports.html`, the overview shows fixture count tiles (completed · teacher absences · student absences · cancelled/rescheduled · groups-attention · teachers-follow-up · students/families-follow-up) + labeled report-signals; every number matches its source export + the dashboard chips; teacher vs student absences are two distinct tiles.

- [X] T011 [US2] CHANGE `src/js/pages/reports.js` — FILL the academic-operations overview with a `summaryCards`-style band over `REPORT_SUMMARY` (completed/teacherAbsent/studentAbsent/cancelledOrRescheduled/groupsAttention/teachersFollowUp/students-families-followup), each a fixture **count** tile + a labeled `reportSignalChip` per area; **teacherAbsent and studentAbsent as two DISTINCT tiles**; NO `trendPill`/chart/score
- [X] T012 [US2] Build + verify: every overview number equals its source export (matches the dashboard chip counts); teacher/student absence tiles distinct; no chart/canvas/trend/score token; all-clear (zero) renders `healthy`

**Checkpoint** 🎯: MVP — the Reports shell + the operations overview.

---

## Phase 5: User Story 3 — Attendance & Outcomes section (Priority: P2)

**Goal**: Fill the Attendance & Outcomes section (reuse Spec 005; teacherAbsent ≠ studentAbsent).

**Independent Test**: The section shows completed + teacherAbsent (amber) + studentAbsent (red) distinct + cancelled/rescheduled + needs-follow-up (matching `OUTCOME_SUMMARY`) + a `attendance.html` link.

- [X] T013 [US3] CHANGE `src/js/pages/reports.js` — FILL the Attendance & Outcomes section from `OUTCOME_SUMMARY` using the reused `outcomeChip('teacherAbsent')`/`outcomeChip('studentAbsent')` (two distinct labeled facts) + completed/cancelled/needs-follow-up counts + a labeled report-signal + a real `<a href="attendance.html">` deep-link; build + verify (counts match `OUTCOME_SUMMARY`; teacherAbsent ≠ studentAbsent; no mutation/chart)

**Checkpoint**: attendance health is reviewable.

---

## Phase 6: User Story 4 — Sessions & Timetable section (Priority: P2)

**Goal**: Fill the Sessions & Timetable section (reuse Spec 001/003).

**Independent Test**: The section shows a labeled session-status summary (matching `STATUS_SUMMARY`) + links to `sessions.html` and `schedule.html#view=timetable`.

- [X] T014 [US4] CHANGE `src/js/pages/reports.js` — FILL the Sessions & Timetable section from `STATUS_SUMMARY` + `SESSIONS.total` using the reused session `statusTile`/`statusChip` + a labeled report-signal + real `<a href>`s to `sessions.html` and `schedule.html#view=timetable`; build + verify (matches `STATUS_SUMMARY`; no scheduling engine/calendar/chart)

**Checkpoint**: sessions/timetable health is reviewable.

---

## Phase 7: User Story 5 — Courses & Groups section (Priority: P2)

**Goal**: Fill the Courses & Groups section (reuse Spec 006).

**Independent Test**: The section shows active-courses + group totals + a groups-needing-attention signal (matching `GROUP_SUMMARY`) + links to `courses.html`/`groups.html`.

- [X] T015 [US5] CHANGE `src/js/pages/reports.js` — FILL the Courses & Groups section from `GROUP_SUMMARY` + active-courses (`COURSES.rows.filter(c=>c.statusId==='active').length`) using the reused `groupStatusChip`/attention vocabulary + a labeled report-signal + real `<a href>`s to `courses.html`/`groups.html`; build + verify (matches `GROUP_SUMMARY.needsAttention`; no course/group engine/chart)

**Checkpoint**: cohort health is reviewable.

---

## Phase 8: User Story 6 — Teacher section (Priority: P2)

**Goal**: Fill the Teachers section (reuse Spec 007; no score/rank).

**Independent Test**: The section shows teachers-needing-follow-up + teacherAbsent/studentAbsent counts (distinct) + links to `teacher-performance.html`/`teacher.html`; no score/rank.

- [X] T016 [US6] CHANGE `src/js/pages/reports.js` — FILL the Teachers section from `TEACHERS_NEEDING_FOLLOWUP` + `OUTCOME_SUMMARY.teacherAbsent`/`studentAbsent` (two distinct labeled facts) + a labeled report-signal + real `<a href>`s to `teacher-performance.html`/`teacher.html`; build + verify (**NO computed score/rank/leaderboard/percentile token**; no chart/salary)

**Checkpoint**: teacher follow-up is reviewable.

---

## Phase 9: User Story 7 — Students & Families section (Priority: P2)

**Goal**: Fill the Students & Families section (reuse Spec 004; no portal).

**Independent Test**: The section shows students/families follow-up counts (matching the dashboard computation) + links to `students.html`/`families.html` (+ `student.html`/`family.html`).

- [X] T017 [US7] CHANGE `src/js/pages/reports.js` — FILL the Students & Families section from the `dashboard.js` students computation + `FAMILIES.rows.filter(f=>f.attention).length` + a labeled report-signal + real `<a href>`s to `students.html`/`families.html` (+ a representative `student.html`/`family.html`); build + verify (matches the dashboard counts; no portal; no chart)

**Checkpoint**: the full academic-operations graph is summarized + linked.

---

## Phase 10: User Story 8 — Filters + honest report actions (Priority: P2)

**Goal**: The category-card filters narrow; the report actions are honest.

**Independent Test**: A facet narrows the category cards with a count + no-results/reset; Print → demo toast; Export CSV/PDF/Share → disabled-with-reason; Schedule → confirm → demo toast; nothing exports/sends/schedules/persists.

- [X] T018 [US8] Verify the `filterBar` + `facetAttrs` on the category cards narrow via `data-filter` (area/availability/search) with a result count + a no-results/reset state; CHANGE only if a facet is missing; build + verify
- [X] T019 [US8] Verify the `reportActions()` cluster on the page: Print → demo toast; Export CSV/PDF/Share → disabled-with-reason ("requires the backend — out of current scope"); Schedule → confirm modal → demo toast ("no backend job created"); build + verify **no real export/send/schedule/persist, no dead control**

**Checkpoint**: honest filters + actions, no engine.

---

## Phase 11: User Story 9 — Static / Django-ready (Priority: P1)

**Goal**: The enriched page is complete baked HTML; no runtime page DOM; the dashboard still renders cleanly.

**Independent Test**: Build; View Source on `reports.html` — full shell + category cards + overview + per-area sections + planned cards baked, no `#app`, relative paths.

- [X] T020 [US9] EXTEND `tests/smoke/run.cjs` — add `reports`-specific asserts: baked category cards (each `available` one a real `<a>` to an implemented page; planned ones disabled-with-reason, NOT a dead `<a href="#">`); the area/availability filter narrows the cards; the academic-operations overview tiles are baked with fixture counts; **teacherAbsent and studentAbsent render as two textually-distinct chips** in the attendance + teacher sections; source links to attendance/sessions/schedule#view=timetable/courses/groups/teacher-performance/teacher/students/families present; **no `salary|payroll|invoice|revenue|accounting` text and no `chart|canvas|graph|leaderboard|percentile` token** in the reports page-body; honest actions (demo/confirm/disabled, no real export); no `#app`; no dead `#` link in the reports body
- [X] T021 [US9] Verify the **dashboard** still renders cleanly after the `fixtures/reports.js` rewrite (it imports `REPORTS`): the dashboard Reports section now shows the honest category cards with **real source links (no `route:'#'` dead links)** and **no finance `revenue` card**; `dashboard.js` is **unchanged**; update `app/README.md` + `quickstart.md` Django mapping for the reports shell (`{% for category in report_categories %}`, signal/availability maps → template tags, the roll-up → a fixture context dict)

**Checkpoint**: static/Django integrity verified; the dashboard improved-for-free.

---

## Phase 12: User Story 10 — Visual / reference alignment + screenshots (Priority: P1)

**Goal**: The Reports shell matches the approved direction; the matrix passes.

**Independent Test**: Capture the matrix; review each vs Spec 001–007 + the legacy report screens (product reference only); axe clean; responsive correct; no failure condition.

- [X] T022 [P] [US10] EXTEND `tests/screenshots/capture.cjs` MATRIX with the Spec 008 frames (reports AR light/dark + EN + mobile; a Schedule confirm-demo modal frame [`reportAction`]; a filter-narrowed frame [`reportFilter`]) reusing the existing `variant`/click mechanism — per screenshot-acceptance §A2a
- [X] T023 [P] [US10] EXTEND `tests/a11y/run.cjs` — add `reports` dark + EN (+ a filter/action state); fix any critical; confirm signal/availability/outcome chips never color-only
- [X] T024 [US10] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001–007 direction + the sidebar reference + the legacy report/statistics screens (product reference only); fix any failure condition (generic-BI-dashboard / statistics-wall / chart / fake-score-rank / finance-widget / missing-teacherAbsent-vs-studentAbsent / missing-source-links / dead-links / real-export / copied-legacy / raw-keys / fabricated-metric); record verdicts in `app/screenshots/REVIEW.md` (the FINAL gate)
- [X] T025 [US10] Responsive pass: verify + fix mobile Reports (category cards → single column; overview tiles wrap; sections stack; action cluster wraps) — no horizontal overflow in RTL or LTR

**Checkpoint**: screenshot matrix accepted; no drift; no charts/score/finance.

---

## Phase 13: Polish & Cross-Cutting Concerns

- [X] T026 [P] Verify the scope guard end-to-end per `contracts/scope-guard.md` — run the **G8a grep AUDIT** (each prints nothing: no `salary|payroll|payout|invoice|revenue|accounting|compensation|currency` in the reports src/locales; no `chart|canvas|graph|leaderboard|percentile` in reports.js/report-*.js; no `http(s)`/CDN; no raw `⟦`; no `id="app"`); confirm no reporting/analytics/aggregation/export/BI engine, no portals, no legacy copy; **every number on `reports.html` equals an existing fixture export**
- [X] T027 [P] Run the `quickstart.md` flow end-to-end (build → preview → review reports/overview/attendance/sessions/courses-groups/teacher/student-family/actions → verify source links → verify no-finance → verify no-charts/scores → verify static-first → verify no-real-export → test → screenshots) and fix any gap
- [X] T028 Fixture coherence: each report number equals its source roll-up AND **matches the corresponding dashboard chip** (outcome-follow-up/groups-attention/teachers-follow-up/students-attention); teacherAbsent ≠ studentAbsent everywhere; **NO finance field in `fixtures/reports.js`**; no console missing-key warnings
- [X] T029 Final consistency + cleanup: run a clean-code-guard review on the production-code diff + a test-guard review on the changed tests; fix blocking issues (weak/fake tests, unscoped assertions, dead-import); re-run `build`/`test:smoke`/`test:a11y`/`screenshots`; remove dead code (orphan finance i18n keys); mark this `tasks.md` accurately; update `app/screenshots/REVIEW.md` + the project memory note

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T004)**: start immediately. T002/T003/T004 are `[P]` (different files).
- **Foundational (T005–T008)**: after Setup; **blocks all stories**. T005/T006 are `[P]` (different files); **T007** (rewrite fixtures/reports.js) and **T008** (extend report-card.js) are independent files but both feed US1.
- **US1 (T009–T010)**: after Foundational → the shell. Consumes T005/T006/T007/T008.
- **US2 (T011–T012)**: after US1 — fills the overview in `reports.js`.
- **US3 (T013)** / **US4 (T014)** / **US5 (T015)** / **US6 (T016)** / **US7 (T017)**: after US1 — each FILLS a stub section in `reports.js` (serialize on that file).
- **US8 (T018–T019)**: after US1 (verifies filters + actions on the page).
- **US9 (T020–T021)** / **US10 (T022–T025)**: after the page stories exist — the acceptance gates.
- **Polish (T026–T029)**: last.

### Same-file serialization (never run these in parallel)

- `src/js/pages/reports.js`: T009 → T011 → T013 → T014 → T015 → T016 → T017 (→ any visual fix in T024/T025). **All `reports.js` edits serialize.**
- `src/js/fixtures/reports.js`: T007 only. `src/js/components/report-card.js`: T008 only.
- `src/js/components/report-status.js`: T005 only. `src/js/components/report-actions.js`: T006 only.
- `src/js/i18n.js` + `src/locales/{ar,en}.rep.js`: T002 only.
- `src/styles/app.css`: T003 (then any visual fix in T024/T025).
- `tests/smoke/run.cjs`: T020; `tests/screenshots/capture.cjs`: T022; `tests/a11y/run.cjs`: T023 (different files → `[P]`).

### Parallel opportunities

- Setup T002/T003/T004 (different files).
- Foundational T005 ‖ T006 (different files); T007 ‖ T008 (different files).
- US9/US10 harness extensions T020 (smoke) ‖ T022 (capture) ‖ T023 (a11y) are different files.
- Polish T026 ‖ T027 (read-only audits over different concerns).

---

## Parallel Example: Foundational blocks

```bash
# After Setup, build the shared pieces (different files):
Task: "T005 components/report-status.js (signal + availability maps)"
Task: "T006 components/report-actions.js (honest cluster)"
# then (different files, both feed US1):
Task: "T007 fixtures/reports.js REWRITE (report-summary roll-up + REPORTS categories, finance removed)"
Task: "T008 components/report-card.js EXTEND (availability chip + summary slot)"
```

## Parallel Example: US9/US10 acceptance harness

```bash
Task: "T020 smoke/run.cjs (reports category cards + source links + no finance/chart/score + teacherAbsent≠studentAbsent)"
Task: "T022 capture.cjs MATRIX (reports frames)"
Task: "T023 a11y/run.cjs coverage (reports dark + EN)"
# → then T024 review + T025 responsive
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. **US1** (Reports shell) → 4. **US2** (Academic Operations overview).
   **Stop & validate** at the US2 checkpoint: the enriched Reports page (category cards + real drill-downs + the fixture-backed operations overview) proves the "organized academic operations shell" feel. This is the demoable MVP (spec MVP = US1 + US2).

### Incremental delivery

- After **US1–US2**: the shell + the overview.
- After **US3–US7**: the five per-area summary sections (attendance/sessions/courses-groups/teacher/student-family — all reused).
- After **US8**: honest filters + actions.
- After **US9 / US10**: static/Django integrity (+ the dashboard improved-for-free) + the screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (category-card/source-link/filter/action smoke, teacherAbsent≠studentAbsent, no-finance/no-chart/no-score, numbers-match-source/dashboard, axe, no-`#app`) are necessary but the **manual screenshot review against Spec 001–007 + the legacy reference is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. **Serialize all edits to `reports.js`** (built up across US1→US8).
- **No fake BI**: every number on Reports is a baked fixture **count** rolled up from an existing summary (matches the dashboard chips) — **NO** chart/graph/canvas, computed score, ranking, leaderboard, percentile, or trend (scope-guard G1; screenshot A4).
- **No finance**: no salary/payroll/invoice/revenue/accounting report card, figure, or widget; **the legacy `revenue` card is removed** and no finance field is added to `fixtures/reports.js` (scope-guard G1).
- **No real export**: Print = demo toast; Export CSV/PDF/Share = disabled-with-reason; Schedule = confirm→demo-toast — never a real file/send/scheduled-job/persistence.
- **Reuse required**: the Spec 005 `outcome-status` chips (teacherAbsent≠studentAbsent), the Spec 001/003 session status-map, the Spec 006 `group-status`, the Spec 007 teacher signals; `pageHeader`/`summaryCards`/`cardGrid`/`filterBar`/`states`/`confirmAction`/`reportCard`. **NO new page, NO `build-html.mjs`/`nav.config.js`/`dashboard.js` change, NO new `data-*` hook, NO chart/table/form/calendar/analytics library.**
- Routes: `reports.html` is the **enriched existing implemented page** (`activeId:'reports'`); advanced reports (`monthlyReports`/`dataAnalysis`/`sessionsAnalysis`) stay **planned**, surfaced as honest planned/backendRequired cards (no dead links); Django later → `templates/admin/reports.html`.
