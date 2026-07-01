# Feature Specification: Academic Reports and Operations Analytics Shell

**Feature Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit; Spec 008 lives beside 001–007)
**Created**: 2026-06-30
**Status**: Draft
**Input**: User description: "Academic Reports and Operations Analytics Shell — a calm, premium, fixture-only admin reports experience that organizes and links the academy's academic operations (students/families/teachers/courses/groups/schedule/sessions/attendance-outcomes/follow-up) into one shell, summarizing existing fixture data and drilling down to the implemented Spec 001–007 pages; frontend-only, fixture-only, NOT a BI/analytics/finance system."

---

## Context & Grounding *(why this spec is shaped the way it is)*

Two grounding passes informed this spec: the current implemented app (`academy-dashboard-discovery/app/`, read file-by-file across this build) and the analyzed legacy academy system (`output/combined/*-inventory.md`, `frontend-planning-deep/*`). Five findings drive every decision below:

1. **`reports.html` already exists and is implemented.** The `reports` nav item is `implemented` (`route:'reports.html'`, in the `cat.reports` category), registered in `build-html.mjs` (`activeId:'reports'`), and rendered by `pages/reports.js` — today it shows **4 placeholder `reportCard`s** (`trainers` [permission-locked demo], `revenue` [a FINANCE placeholder], `studentPerf`, `attendanceMonthly`) each with a dead `route:'#'`. **So Spec 008 ENRICHES the existing `reports.html` into the Academic Reports & Operations shell** — the proven enrich-an-existing-page pattern (Spec 006 enriched `courses.html`, Spec 007 enriched `teachers.html`). **No new page is added, no nav item is promoted** (reports is already a real nav link); the placeholder cards become real, honest category cards + fixture-backed summaries + drill-down links + demo export actions.

2. **The legacy "reports" were scattered, weak, and finance-mixed.** The legacy had `Sessions Analysis` (a system-wide KPI-card aggregate with date/`teacher_id` filters but no per-teacher drill-down), `Teacher Feedback`/"Monthly Performance" (a single % + a note), `Class Feedback`/"Classes KPI" (a % + session count, sorted "leaderboard-style" but never a computed score), `Teachers Details` (Cancel/Absent/Attend counts), plus planned `Monthly Reports`/`Data Analysis`, and **finance reports** (`Salaries`, `Staff Salaries`, `Salary-Class-Report`, `Accounting`). The legacy v2 IA explicitly recommends **"Reports centralised under Overview (was scattered: KPIs, Classes KPI, Monthly Performance, Data Analysis, monthly reports)."** **Spec 008 realizes that recommendation as a calm, honest, fixture-only shell — never a BI/chart/score/finance system.**

3. **Every report summary is already derivable from existing fixtures — no new metric is fabricated.** The implemented specs expose display-only roll-ups Spec 008 reuses verbatim: `OUTCOME_SUMMARY` (Spec 005: attended/studentAbsent/teacherAbsent/cancelledOrRescheduled/needsFollowUp), `GROUP_SUMMARY` (Spec 006: total/active/trial/full/needsAttention), `TEACHERS_NEEDING_FOLLOWUP` + `teacherCounts` (Spec 007), `STATUS_SUMMARY`/`SESSIONS` (Spec 001/003 session statuses), and the Spec 004 families/students attention signals. **Spec 008 adds only a thin `report-summary` resolver that ROLLS UP these existing counts (display-only) — it computes no score, rank, percentile, or new analytic.**

4. **Finance is out of scope (again).** The legacy reports module was half finance; the current reports fixture even carries a `revenue` placeholder card. **Spec 008 removes/replaces all finance** — no salary/payroll/invoice/payment/accounting/revenue report card, figure, or widget; the `revenue` placeholder is dropped (or shown once as a disabled "finance reporting — out of current scope" planned card). A future finance spec owns it.

5. **Reuse, don't rebuild.** Spec 008 composes existing components only — `pageHeader`/`summaryCards`/`cardGrid`/`reportCard`/`directoryCard`/`statMini`/`filterBar`/`states`/`button`/`confirmAction`/`toast`, the labeled status chips (`outcome-status`, `group-status`, the Spec 007 teacher signals), and the canonical drill-down links to `attendance.html`/`sessions.html`/`schedule.html#view=timetable`/`courses.html`/`groups.html`/`teacher-performance.html`/`teacher.html`/`students.html`/`student.html`/`families.html`/`family.html`. New work is intentionally thin: one `report-summary` fixture/resolver, two small labeled maps (report-signal + report-availability), a `reportActions()` honest-action cluster, and a locale overlay (`ar.rep.js`/`en.rep.js`). **No chart/table/form/calendar library, no export/analytics engine, no new runtime hook.**

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin opens the Reports shell (Priority: P1) 🏗️ MVP

An admin opens **Reports** and sees a calm landing of **report-category cards** (Attendance & Outcomes · Sessions & Timetable · Courses & Groups · Teachers · Students & Families — plus honestly-labeled "planned/backend-required" advanced reports) each with a one-line description, a labeled availability chip, fixture-backed summary chips, and a real **"Open report area"** drill-down to the implemented source page.

**Why this priority**: The shell is the entry point and the whole point of the spec — it turns the scattered placeholder reports page into an organized, honest academic-operations hub; it is the smallest demoable increment.

**Independent Test**: Open `reports.html`; read each category card's title + description + availability chip + summary chip(s) + a working drill-down link; confirm no chart, no finance card, no dead `#` link, and that "planned/backend-required" advanced reports are clearly labeled (not pretending to work).

**Acceptance Scenarios**:

1. **Given** the Reports page, **When** it loads, **Then** it shows report-category cards (each with a labeled availability chip — icon+text — + a fixture summary + a real drill-down `<a>` to an implemented page), and any advanced/backend report is shown as a labeled `planned`/`backendRequired` card with no dead link.
2. **Given** the Reports page, **When** the admin reads it, **Then** there is **no** chart/graph, **no** finance/revenue/salary card, and **no** computed score/rank/leaderboard.

---

### User Story 2 - Admin reviews the academic-operations overview (Priority: P1)

The admin sees one **Academic Operations** overview — a band of fixture-backed summary sections (sessions/outcomes, courses/groups, teacher follow-up, student/family follow-up) with counts + labeled report-signal chips (healthy / needsFollowUp / attentionRisk) — answering "what needs follow-up today?" at a glance, each linking to its source page.

**Why this priority**: This is the "complete operations platform" payoff — one calm place to scan academy health, all from existing fixture roll-ups.

**Independent Test**: On `reports.html`, read the overview sections; confirm each shows fixture counts + a labeled signal chip + a source link; confirm no fabricated metric (every number traces to an existing fixture summary).

**Acceptance Scenarios**:

1. **Given** the overview, **When** rendered, **Then** each summary section shows fixture-backed counts (from `OUTCOME_SUMMARY`/`GROUP_SUMMARY`/`TEACHERS_NEEDING_FOLLOWUP`/session statuses/family-student attention) + a labeled report-signal chip + a real source link.

---

### User Story 3 - Admin reviews attendance/outcome report signals (Priority: P2)

The admin sees the **Attendance & Outcomes** report section — completed, **teacher absences**, **student absences (in teacher sessions)**, cancelled/rescheduled, and needs-follow-up — reusing the Spec 005 outcome-status vocabulary (teacherAbsent vs studentAbsent unmistakably distinct) with a deep-link to `attendance.html`.

**Why this priority**: Attendance/outcomes is the heaviest "needs review" area; it reuses Spec 005 entirely.

**Independent Test**: On the Attendance & Outcomes section, confirm teacherAbsent and studentAbsent appear as two distinct labeled facts (never one "absences" number) + a `attendance.html` link.

**Acceptance Scenarios**:

1. **Given** the Attendance & Outcomes section, **When** rendered, **Then** teacherAbsent and studentAbsent are two distinct labeled chips (Spec 005 `outcome-status`), cancelled/rescheduled + needs-follow-up are shown as fixture counts, and a "View attendance" link opens `attendance.html`.

---

### User Story 4 - Admin reviews sessions/timetable report signals (Priority: P2)

The admin sees the **Sessions & Timetable** report section — a session-status summary (live/upcoming/completed/cancelled) — reusing the Spec 001/003 session status map, with deep-links to `sessions.html` and `schedule.html#view=timetable`.

**Why this priority**: Sessions/timetable is the operational backbone; it reuses Spec 003 with no new scheduling logic.

**Independent Test**: On the Sessions & Timetable section, confirm a labeled session-status summary + links to `sessions.html` and `schedule.html#view=timetable`.

**Acceptance Scenarios**:

1. **Given** the Sessions & Timetable section, **When** rendered, **Then** a labeled session-status summary appears + real links to `sessions.html` and `schedule.html#view=timetable`; no new scheduling engine.

---

### User Story 5 - Admin reviews course/group report signals (Priority: P2)

The admin sees the **Courses & Groups** report section — active courses, groups, **groups needing attention** — reusing Spec 006 `GROUP_SUMMARY` + the group-status vocabulary, with deep-links to `courses.html`/`groups.html` (and the profiles).

**Why this priority**: Cohort health is a core academic signal; it reuses Spec 006.

**Independent Test**: On the Courses & Groups section, confirm course/group counts + a groups-needing-attention signal + links to `courses.html`/`groups.html`.

**Acceptance Scenarios**:

1. **Given** the Courses & Groups section, **When** rendered, **Then** active-courses/groups counts + a "groups needing attention" labeled signal appear + real links to `courses.html`/`groups.html`; no course/group engine.

---

### User Story 6 - Admin reviews teacher report signals (Priority: P2)

The admin sees the **Teachers** report section — teachers needing follow-up, teacher absences, student absences in teacher sessions — reusing Spec 007 (`TEACHERS_NEEDING_FOLLOWUP`, the follow-up signals, the outcome breakdown), with deep-links to `teacher-performance.html` and `teacher.html`. **No score, no ranking.**

**Why this priority**: Teacher follow-up is the newest operational signal (Spec 007); the report surfaces it without re-introducing scoring/ranking.

**Independent Test**: On the Teachers section, confirm teacher follow-up + teacherAbsent/studentAbsent counts + links to `teacher-performance.html`/`teacher.html`; confirm no score/rank.

**Acceptance Scenarios**:

1. **Given** the Teachers section, **When** rendered, **Then** teachers-needing-follow-up + teacher-absence + student-absence-in-teacher-sessions counts appear (labeled, fixture-backed) + links to `teacher-performance.html`/`teacher.html`; **no** computed score/rank/leaderboard.

---

### User Story 7 - Admin reviews student/family follow-up signals (Priority: P2)

The admin sees the **Students & Families** report section — students needing follow-up + families with attention hints — reusing Spec 004 attention signals, with deep-links to `students.html`/`student.html` and `families.html`/`family.html`. No portal.

**Why this priority**: Closes the academic graph (people side) and reuses Spec 004.

**Independent Test**: On the Students & Families section, confirm fixture follow-up counts + links to `students.html`/`student.html`/`families.html`/`family.html`; no portal.

**Acceptance Scenarios**:

1. **Given** the Students & Families section, **When** rendered, **Then** student/family follow-up counts appear (labeled, fixture-backed) + real links to the student/family directories/profiles; no portal, no enrollment engine.

---

### User Story 8 - Admin uses filters and report actions honestly (Priority: P2)

The admin can filter the baked report category cards/rows (e.g. by area or availability/signal) and trigger report actions — **Print report, Export CSV, Export PDF, Share report, Schedule report** — always receiving honest feedback: a demo toast, a confirm modal → demo toast, or a disabled-with-reason. Nothing generates a real file, sends, or persists.

**Why this priority**: Action/export honesty is mandatory; the legacy had print/export buttons that Spec 008 must not fake.

**Independent Test**: Trigger each export/print/share/schedule action; confirm demo toast / confirm→toast / disabled-with-reason; confirm no file/CSV/PDF is generated and nothing is sent or saved; apply a filter and confirm baked cards/rows narrow with a count + a no-results/reset state.

**Acceptance Scenarios**:

1. **Given** Print/Export-CSV/Export-PDF/Share/Schedule, **When** clicked, **Then** each is a demo toast / confirm→demo-toast / disabled-with-reason ("requires the backend export module — out of current scope") — never a real export/send/persist.
2. **Given** the report filters, **When** applied, **Then** the pre-rendered cards/rows narrow with a visible count + a no-results/reset state.

---

### User Story 9 - Experience stays static / Django-ready (Priority: P1)

All report category cards, summary sections, signal chips, rows, drawers/modals, demo actions, and planned/backend states are complete baked HTML at build time; runtime JS only filters pre-rendered cards/rows, switches sections, opens modals, and shows demo/disabled feedback. The page deploys to GitHub Pages and maps cleanly to Django templates.

**Why this priority**: A hard architectural constraint inherited from Specs 001–007; a violation breaks the project.

**Independent Test**: Build; View Source on `reports.html` (+ `.en`) — full shell + all category cards + all summary sections + all drawer/modal templates baked, no `#app`, relative paths, no external requests.

**Acceptance Scenarios**:

1. **Given** the enriched Reports page, **When** viewing source, **Then** every card/section/row/template is baked, with no whole-page `#app` mount and relative asset paths.

---

### User Story 10 - Visual / reference alignment (Priority: P1)

The Reports shell looks premium, calm, academy-specific, and visually consistent with Specs 001–007 in Arabic-RTL (default), English-LTR, and Light/Dark/System — better and cleaner than the scattered legacy reports, never a generic BI dashboard, statistics wall, chart suite, or finance report.

**Why this priority**: Screenshot-based visual acceptance is the project's final gate.

**Independent Test**: Capture the screenshot matrix and review each frame against the approved Spec 001–007 direction + the legacy report/statistics screens (product reference only); confirm no failure condition.

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed, **Then** Reports reads as a calm academy academic-operations shell (category cards + fixture summaries + drill-down links + honest demo actions, **no charts/score/rank/finance**) in AR light/dark + EN, with correct RTL/LTR and strong dark mode.

---

### Edge Cases

- **A report area with zero fixture signals** (e.g. nothing needs follow-up) → the section shows a calm "all clear / nothing needs follow-up" state with a healthy signal, never a broken/empty widget.
- **Advanced reports that genuinely need a backend** (monthly reports, data analysis, exports) → shown as labeled `planned`/`backendRequired` cards with a disabled-with-reason, **never** a dead link or a fake working report.
- **The existing finance "revenue" placeholder** → removed; if a finance affordance is unavoidable it is a single disabled "finance reporting — out of current scope" card. **No finance figure anywhere.**
- **teacherAbsent vs studentAbsent** in the attendance/teacher sections → both rendered, each labeled and distinct, never conflated into one "absences" number.
- **Filtering to an empty result** → a no-results panel + reset, distinct from a zero-signal (all-clear) section.
- **The existing permission-locked report card** (`trainers`, gated by fixture `PROFILE.permissions`) → re-cast as an honest Teacher-reports category card linking to `teacher-performance.html` (no fake permission system surfaced as real).

---

## Requirements *(mandatory)*

### Functional Requirements — Reports shell & route (US1, US2, US9)

- **FR-001**: The system MUST **enrich the existing implemented `reports.html`** (+ `reports.en.html`) into the Academic Reports & Operations shell — keeping the `reports` nav item / `activeId:'reports'` / topbar breadcrumb unchanged; **no new page is added and no nav item is promoted**. The legacy placeholder `reportCard`s (incl. the finance `revenue` card and the dead `route:'#'`s) MUST be replaced.
- **FR-002**: The shell MUST present **report-category cards** (Attendance & Outcomes · Sessions & Timetable · Courses & Groups · Teachers · Students & Families, plus labeled advanced/planned cards), each with a title, one-line description, a labeled **availability** chip, fixture summary chip(s), and a real **drill-down `<a>`** to the implemented source page — reusing the existing `reportCard`/`cardGrid`/`summaryCards` pattern (no new table/chart library).
- **FR-003**: The shell MUST present an **Academic Operations overview** of fixture-backed summary sections rolled up from existing fixtures (`OUTCOME_SUMMARY`, `GROUP_SUMMARY`, `TEACHERS_NEEDING_FOLLOWUP`/`teacherCounts`, session-status summary, family/student attention) — counts + labeled report-signal chips + source links; **every number MUST trace to an existing fixture summary (no fabricated metric)**.

### Functional Requirements — Report sections (US3, US4, US5, US6, US7)

- **FR-004**: The **Attendance & Outcomes** section MUST reuse the Spec 005 `outcome-status` vocabulary, show **teacherAbsent and studentAbsent as two DISTINCT labeled facts** (+ cancelled/rescheduled + needs-follow-up counts), and deep-link to `attendance.html` — no new attendance engine, no attendance mutation.
- **FR-005**: The **Sessions & Timetable** section MUST reuse the Spec 001/003 session-status map (live/upcoming/completed/cancelled) as a labeled summary and deep-link to `sessions.html` and `schedule.html#view=timetable` — no new scheduling engine.
- **FR-006**: The **Courses & Groups** section MUST reuse Spec 006 `GROUP_SUMMARY` + the group-status vocabulary (active courses/groups + groups-needing-attention) and deep-link to `courses.html`/`groups.html` — no course/group engine.
- **FR-007**: The **Teachers** section MUST reuse Spec 007 (`TEACHERS_NEEDING_FOLLOWUP`, the follow-up signal, the teacher-absence/student-absence breakdown) and deep-link to `teacher-performance.html`/`teacher.html` — **NO computed score, ranking, leaderboard, or percentile**.
- **FR-008**: The **Students & Families** section MUST reuse Spec 004 attention signals (students needing follow-up + families with attention hints) and deep-link to `students.html`/`student.html`/`families.html`/`family.html` — no portal, no enrollment engine.

### Functional Requirements — Vocabulary, actions, filters (US1, US8)

- **FR-009**: The system MUST define a labeled **report-signal** map (`healthy / needsFollowUp / attentionRisk`) and a labeled **report-availability** map (`available / demoOnly / planned / backendRequired`) — icon + text, never numeric/color-only, Arabic/English localized, distinct from the existing status maps and **never** a computed score/rank/grade.
- **FR-010**: Every report action (Print report, Export CSV, Export PDF, Share report, Schedule report) MUST be honest: a **demo toast**, a **confirm modal → demo toast**, or **disabled-with-reason** ("requires the backend export module — out of current scope") — reusing the existing `data-demo-action`/`data-confirm`/`data-disabled-reason`/`data-toast` hooks; **no real file generation, export, send, scheduled job, or persistence**; no dead controls.
- **FR-011**: The shell MUST support filtering the pre-rendered report cards/rows (e.g. by area or availability/signal) via the existing client-side `filterBar`/`data-filter` mechanism, with a visible result count + a no-results/reset state — no analytics query, no new filter engine.

### Functional Requirements — Integrations, data, architecture, i18n (US9, US10)

- **FR-012**: The shell MUST drill down only to **implemented** in-scope pages (`attendance`/`sessions`/`schedule#view=timetable`/`courses`/`course`/`groups`/`group`/`teacher-performance`/`teacher`/`students`/`student`/`families`/`family`); advanced/backend reports stay labeled `planned`/`backendRequired` with a disabled-with-reason — **no dead links**.
- **FR-013**: The system MUST add only a thin **`report-summary`** fixture/resolver that rolls up existing fixture counts (display-only) + a `reportActions()` cluster + the two labeled maps + a locale overlay (`ar.rep.js`/`en.rep.js`); **NO finance field/figure/card** is added or surfaced.
- **FR-014**: All report cards, summary sections, signal chips, rows, drawers/modals, demo actions, empty/planned/backend states MUST be **baked static HTML** at build; runtime JS MUST only filter pre-rendered cards/rows, switch sections, open modals, and show demo/disabled feedback — it MUST construct no page DOM, introduce **no new `data-*` hook**, and there MUST be no `#app` mount.
- **FR-015**: The page MUST be GitHub-Pages compatible (relative/local paths, no CDN), per-language pre-rendered (`reports.html` AR + `reports.en.html`), RTL/LTR correct, Light/Dark/System, and Django-template-ready (`{% for category %}`/`{% for section %}`, signal/availability maps → template tags, the action cluster → static markup).
- **FR-016**: No new dependency; NO chart/table/form/calendar/SPA library, no TypeScript, no CDN, no backend/API/auth/CRUD/persistence; **no reporting/analytics/aggregation/export/PDF/CSV/scheduled-report/BI engine, no performance-scoring/ranking, no finance/salary/payroll/invoice/accounting report**; no portals/role dashboards; no legacy copied assets/classes/palette/wording/numeric-statuses.
- **FR-017**: The **dashboard impact MUST be minimal** — the existing dashboard already links to `reports.html` (the Reports section header) and already carries the Spec 004–007 attention chips; Spec 008 adds **no new dashboard card/chip/stat-wall** (at most the existing Reports link is confirmed/repointed, no new chrome).
- **FR-018**: The surface MUST pass the project gates: build clean (no raw i18n keys), smoke (baked category cards/sections, real drill-down `<a>` links, teacherAbsent≠studentAbsent, honest export actions, no dead controls, no `#app`, no finance/score/chart token), axe critical=0, and the screenshot matrix reviewed against the approved direction.

### Key Entities *(fixture-only; no persistence)*

- **Report category**: id, titleKey, descKey, icon, a labeled `availability` (available/demoOnly/planned/backendRequired), a fixture summary, and a drill-down route to an implemented page (or disabled-with-reason for planned/backend).
- **Report summary (rolled-up)**: display-only counts resolved from `OUTCOME_SUMMARY` / `GROUP_SUMMARY` / `TEACHERS_NEEDING_FOLLOWUP`+`teacherCounts` / session-status summary / family-student attention — plus a labeled `report-signal` (healthy/needsFollowUp/attentionRisk). *No score/rank/finance.*
- **Report-signal / report-availability maps**: labeled vocabularies (icon+text), distinct from the session/outcome/course/group/teacher maps; display-only.
- **Report action**: Print/Export-CSV/Export-PDF/Share/Schedule — demo toast / confirm→toast / disabled-with-reason; never a real export/send/persist.
- **Links (reused)**: to `attendance`/`sessions`/`schedule#view=timetable`/`courses`/`course`/`groups`/`group`/`teacher-performance`/`teacher`/`students`/`student`/`families`/`family`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From Reports, an admin can reach any source area (attendance, sessions, schedule, courses, groups, teacher performance, students, families) in **1 click**; **100%** of category cards expose a real drill-down link or a labeled planned/backend state.
- **SC-002**: **100%** of report signals/availability are shown as labeled chips (icon + text); **zero** numeric-only or color-only indicators, and **zero** computed scores/ranks/percentiles/charts anywhere.
- **SC-003**: **100%** of report drill-down links resolve to a real implemented baked page — **zero** dead links or dead controls (advanced/backend reports are labeled planned/backendRequired, not dead).
- **SC-004**: **Every** report action produces honest feedback (demo toast / confirm→toast / disabled-with-reason); **zero** actions generate a real file/export/send or persist; **zero** finance/salary/revenue figures appear.
- **SC-005**: The enriched Reports page is **fully baked** static HTML — viewing source shows all category cards, all summary sections, and all drawer/modal templates with **no** `#app` mount and **only** relative asset paths; it renders correctly opened directly from the filesystem / GitHub Pages.
- **SC-006**: Report filters narrow the cards/rows with a visible count + a distinct no-results vs zero-signal (all-clear) state in **100%** of filter combinations tested.
- **SC-007**: Accessibility: axe reports **critical = 0** across the enriched page in AR (light + dark) and EN; RTL and LTR both render without overflow on desktop, tablet, and mobile.
- **SC-008**: Visual acceptance: **every** screenshot-matrix frame is reviewed and passes against the Spec 001–007 approved direction with **no** failure condition (generic BI dashboard / statistics wall / chart-heavy analytics / fake score-rank / finance widget / missing teacherAbsent-vs-studentAbsent / missing source links / dead actions / poor dark mode / broken RTL/LTR / copied legacy visuals / raw i18n keys / claims real reporting/export persistence).
- **SC-009**: Every report summary number traces to an existing fixture roll-up (`OUTCOME_SUMMARY`/`GROUP_SUMMARY`/`TEACHERS_NEEDING_FOLLOWUP`/session-status/family-student attention) — **zero** fabricated metrics; the Spec 003/005/006/007 surfaces are **reused unchanged** (no new report/analytics/export builder).

---

## Assumptions

- **Enrich the existing `reports.html`** (already implemented) rather than add a page or promote a planned item — the proven enrich pattern. The `reports` nav item, `activeId:'reports'`, and topbar breadcrumb stay as-is. `monthlyReports`/`dataAnalysis`/`sessionsAnalysis`/`monthlyPerf` stay **planned** (shown on the shell as labeled `planned`/`backendRequired` cards, no dead links). Arabic label «التقارير» / "Reports" (the academic-operations framing in the subtitle).
- **Reports = a display shell, never analytics.** It organizes + links + summarizes existing fixture counts; it computes no score, rank, percentile, chart, or new metric. The legacy "leaderboard-style" Classes-KPI framing is deliberately NOT reproduced.
- **Finance is entirely out of scope.** No salary/payroll/invoice/payment/accounting/revenue report; the existing `revenue` placeholder card is removed.
- **Reuse over rebuild.** `reportCard`/`cardGrid`/`summaryCards`/`pageHeader`/`filterBar`/`states`/`button`/`confirmAction`/`toast` + the labeled status chips (`outcome-status`/`group-status`/teacher signals) + the canonical drill-down links. New: a `report-summary` roll-up resolver, a `report-signal` + `report-availability` map, a `reportActions()` cluster, and the `ar.rep.js`/`en.rep.js` overlay.
- **Dashboard impact is minimal.** The dashboard already links to `reports.html` and already carries the Spec 004–007 attention chips; Spec 008 adds no new dashboard chrome.
- **Layout** is a calm landing of category cards + a stacked academic-operations summary band (the plan MAY use the shared `tabs` widget to section it, but stacked baked sections are the default — no new layout engine). Mobile reflows to a single column.
- **Fixtures only.** Summaries roll up the existing teachers/courses/groups/schedule/attendance/students/families fixtures; nothing is fabricated; no persistence.
- **No commit/push and no implementation in this phase** — this command produces the spec only. The single-branch convention is preserved (the `before_specify` git branch/commit hook is intentionally not triggered).
- **Scope is sequenced MVP-first**: US1 (Reports shell) + US2 (Academic Operations overview) form the demoable MVP; US3–US7 (the per-area sections) reuse Specs 003–007; US8 (filters/actions), US9/US10 (static/Django + visual) are the cross-cutting increments + acceptance gates.
