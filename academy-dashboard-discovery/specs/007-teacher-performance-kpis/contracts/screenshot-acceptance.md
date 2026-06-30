# Contract: Screenshot Acceptance (Spec 007 — Teacher Performance and Academic KPIs)

**Status**: Binding · Automated tests are required but NOT sufficient. **Final acceptance is a human screenshot review** of the teacher surfaces against the Spec 001/002/003/004/005/006 approved direction. "Passes tests but looks like a generic HR dashboard / a generic employee table / a fake analytics suite / drifts from Spec 001 / hides the teacher↔course/group/students↔schedule↔outcomes relationship / shows a fake score-rank / shows a salary widget / claims real performance persistence" = **fail**. Self-contained for Spec 007. References **FR-022** (project gates), **SC-007** (a11y + responsive), **SC-008** (visual acceptance, no failure condition), **SC-009** (the Spec 003 agenda + Spec 005 outcome drawer reused unchanged).

## A0. Targets are built static pages

Acceptance runs against the built static site in `app/public/`. Targets are the pre-rendered per-language files: `public/teacher.html` / `.en.html`, `public/teacher-performance.html` / `.en.html`, plus the regenerated `public/teachers.html` / `.en.html` and `public/dashboard.html` / `.en.html`. `npm run build` produces them; the harness serves `public/` and loads these files. **Content (shell, summary cards/tiles, filter bar, every teacher `.dir-card`, every KPI tile, every per-teacher comparison row, the follow-up queue, every profile tab panel — Overview/Courses/Groups/Timetable/Sessions&Outcomes/Students/Follow-up/Notes — and every `<template data-preview>` drawer) renders WITHOUT JS**; JS is used only to reach a **state** (switch a profile tab, open the canonical outcome drawer, apply a filter, open a confirm modal). `teacher.html` is a **baked template instance** (one representative teacher — `sara`; Django later → `teacher/<id>`), highlighting the **Teachers** nav category and **never** appearing as its own nav item.

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright / **Chromium**): per scenario, set the **theme via `localStorage`** (`academy.theme`), load the per-language file at the viewport, drive the minimal state, then capture a full-page PNG to `app/screenshots/`. Viewports: **desktop 1440×900, tablet 834×1112, mobile 390×844**. Deterministic fixtures + a **fixed clock** (stable "today" for the timetable/outcomes slices); non-essential **animation disabled**.

State-driving (no page DOM is built — only existing hooks are exercised):

- **Profile tab** (Timetable / Sessions & Outcomes / Students) — load with the `#view=<token>` hash (e.g. `teacher.html#view=timetable`, `teacher.html#view=sessions-outcomes`, `teacher.html#view=students`) **or** click `[data-tab="<id>"]`; capture after the panel becomes visible. Exactly one tabpanel is visible.
- **Canonical outcome drawer** — on the profile **Sessions & Outcomes** panel click a row's `[data-row-menu]` → `.popover [data-drawer]` (or the row's `[data-drawer]`) opening the **same** Spec 005 `outcomeTemplate` drawer; capture the overlay; named `__drawer` (optional add).
- **Confirm modal** — on the profile/board click the **Notify family** action (`[data-confirm]`) to open the confirm modal; capture the overlay; named `__confirm`.
- **Directory cards / filter / board** — `teachers.html` and `teacher-performance.html` render their baked cards/tiles/rows on load; no state needed for those frames. A `select[data-filter]` MAY be exercised to evidence narrowing.
- **Dashboard hint** — `dashboard.html`: the fixture "teachers needing follow-up" chip + deep-link renders on load.

## A2. Required matrix (12 frames) — exact file names

File naming: `{page}__{lang}__{theme}__{viewport}[__{variant}].png` (variants used here: `timetable`, `outcomes`, `students`, `confirm`, `teachers-followup`; optional adds may use `drawer`).

| # | Scenario | File |
|---|----------|------|
| 1 | **Teachers** directory (enriched) — AR RTL · Light · Desktop | `teachers__ar__light__desktop.png` |
| 2 | **Teachers** directory — AR RTL · **Dark** · Desktop | `teachers__ar__dark__desktop.png` |
| 3 | **Teachers** directory — **EN LTR** · Light · Desktop | `teachers__en__light__desktop.png` |
| 4 | **Teacher profile** hub — AR RTL · Light · Desktop | `teacher__ar__light__desktop.png` |
| 5 | **Teacher Performance** board — AR RTL · Light · Desktop | `teacher-performance__ar__light__desktop.png` |
| 6 | Teacher profile **Timetable** tab (schedule linkage) — AR RTL · Light · Desktop | `teacher__ar__light__desktop__timetable.png` |
| 7 | Teacher profile **Sessions & Outcomes** tab (attendance linkage) — AR RTL · Light · Desktop | `teacher__ar__light__desktop__outcomes.png` |
| 8 | Teacher **action confirm** modal (Notify family) — AR RTL · Light · Desktop | `teacher__ar__light__desktop__confirm.png` |
| 9 | Teacher profile **Students** tab (student/family/course/group links) — AR RTL · Light · Desktop | `teacher__ar__light__desktop__students.png` |
| 10 | **Dashboard** teachers-needing-follow-up signal — AR RTL · Light · Desktop | `dashboard__ar__light__desktop__teachers-followup.png` |
| 11 | **Mobile** Teachers directory — AR RTL · Light · Mobile | `teachers__ar__light__mobile.png` |
| 12 | **Mobile** Teacher profile — AR RTL · Light · Mobile | `teacher__ar__light__mobile.png` |

(Additional dark/EN/state captures — e.g. an EN teacher profile, a `teacher-performance__ar__dark__desktop`, a `__drawer` overlay — MAY be added; the twelve rows above are the minimum gate.)

## A2a. `capture.cjs` MATRIX additions

Append to the `MATRIX` array in `tests/screenshots/capture.cjs`. It reuses the existing `view`/`variant` mechanism (`hash = s.view ? '#view=' + s.view : ''`) + the `{variant}` filename suffix (Spec 003/004/006) — **no new variant code is required**; frames 8 (`__confirm`) and 10 (`teachers-followup`) carry only a `variant` label and a small click step where noted.

```js
// Spec 007 — Teacher Performance & Academic KPIs (acceptance matrix, 12 frames)
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop' },                                            // 1 (re-captured, enriched)
{ page: 'teachers', lang: 'ar', theme: 'dark',  vp: 'desktop' },                                            // 2
{ page: 'teachers', lang: 'en', theme: 'light', vp: 'desktop' },                                            // 3
{ page: 'teacher',  lang: 'ar', theme: 'light', vp: 'desktop' },                                            // 4
{ page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'desktop' },                                 // 5
{ page: 'teacher',  lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable',        variant: 'timetable' }, // 6
{ page: 'teacher',  lang: 'ar', theme: 'light', vp: 'desktop', view: 'sessions-outcomes', variant: 'outcomes' }, // 7
{ page: 'teacher',  lang: 'ar', theme: 'light', vp: 'desktop', view: 'overview', click: 'confirm', variant: 'confirm' }, // 8
{ page: 'teacher',  lang: 'ar', theme: 'light', vp: 'desktop', view: 'students',         variant: 'students' },  // 9
{ page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'teachers-followup' },             // 10
{ page: 'teachers', lang: 'ar', theme: 'light', vp: 'mobile' },                                             // 11
{ page: 'teacher',  lang: 'ar', theme: 'light', vp: 'mobile' },                                             // 12
```

The confirm frame (#8) reuses the existing `[data-confirm]` → confirm-modal engine (the Notify-family action), captured non-fullPage; no new state-driving branch beyond a click step is introduced.

## A2b. Per-frame acceptance criteria (what each frame must show)

- **Teachers directory (#1–3)**: a page header + the existing `summaryCards` (total / available / avg-util) over a calm grid of **teacher cards** — each leading with name + subject chip(s) + a **labeled teacher-status chip** (icon+text: active/paused/inactive) + the academic counts **courses · groups · active students** + an upcoming-sessions hint + a **workload** hint + a **follow-up flag where flagged**, with a **"View profile"** link to `teacher.html`. It reads as **academy teacher operations with real academic relationships**, **NOT a generic HR/employee table**. Dark (#2) is true-dark with correct AA contrast; EN (#3) is fully mirrored to LTR with Latin digits and English labels (Teachers / Available / Courses / Groups / Students / View profile). Filters (subject · status · workload) narrow with a visible count + a distinct no-results/reset state.
- **Teacher profile (#4, #12)**: a banner (medallion + name + **labeled teacher-status chip** + meta [subjects · availability · **workload**] + ≤4 KPIs [courses/groups/students/upcoming] + demo actions) over a baked **tablist** — Overview · **Courses** (→ `course.html`) · **Groups** (→ `group.html`) · **Timetable** · **Sessions & Outcomes** · **Students** (→ `student.html`) · **Follow-up** · Notes — **exactly one** panel visible, all baked. Reads as the academic hub where the teacher's scattered footprint unifies — **NOT a 56-button legacy profile, NOT a portal** (no "my classes"/login/salary). Mobile (#12) stacks banner + tablist with no horizontal overflow. **No salary/compensation tab.**
- **Teacher Performance board (#5)**: a page header + **KPI tiles** showing fixture **counts** (active teachers · completed sessions · teacher absences · student absences in teacher sessions · cancelled/rescheduled · groups needing attention · teachers needing follow-up) + a **per-teacher comparison list** (each teacher's identity + **workload** chip + **follow-up** chip + raw counts + a "View profile" link to `teacher.html`) + a **follow-up queue**. It reads as a calm **review/follow-up board** — **NO computed score, NO rank/position/percentile, NO chart/graph, NO salary/finance widget**. Filters narrow via the existing facet mechanism (no analytics engine).
- **Teacher Timetable tab (#6)** — *the schedule linkage*: reuses the **Spec 003 `scheduleAgenda`** rendering the teacher's weekly sessions (resolved by `trainer.id`), plus a **"View in schedule"** deep-link to `schedule.html#view=timetable`. No new timetable grid (SC-009). Zero blocks → calm "no recent sessions".
- **Teacher Sessions & Outcomes tab (#7)** — *the attendance linkage*: reuses the **Spec 005 `outcomeRow`** rows with **labeled outcome chips** (icon+text) where **teacherAbsent and studentAbsent are visibly distinct**, and opening a row opens the **canonical `outcomeTemplate` drawer** (no bespoke drawer), plus a **"View attendance"** deep-link to `attendance.html`. Shows the teacher's recent outcomes, not a fabricated metric.
- **Teacher action confirm (#8)**: clicking **Notify family** opens the shared confirm modal (title + message + cancel + confirm CTA) → on confirm a **demo toast** (no real notification). Honest demo behavior is visible; no real send.
- **Teacher Students tab (#9)** — *the cross-links*: roster rows each with a **"View student"** link to `student.html` and a **family chip** to `family.html`; the Courses/Groups tabs' items link to `course.html`/`group.html`. An item with no group shows **no dead link**. **No portal, no new tab engine.**
- **Dashboard teachers-follow-up (#10)**: **one** fixture-backed "teachers needing follow-up" count chip folded into the existing people-signal card (beside the Spec 004 students-attention + Spec 005 follow-up + Spec 006 groups-attention chips) + a deep-link to `teacher-performance.html`. **No new stat wall, no fabricated analytics/finance widget.**
- **Mobile Teachers (#11)**: cards reflow to single-column (name → subject chips → status + workload → counts → follow-up flag → "View profile"); tiles wrap; no horizontal overflow.
- **Across all**: recognizably the same product as Spec 001 (tokens, calm cards, **labeled** status/workload/follow-up chips never numeric/color-only); the **teacher↔course↔group↔students↔family↔schedule↔outcomes** graph is visible and navigable; **>1 nav category panel visible at once = shell regression = fail**; `teacher-performance` is now a real `<a>` in the teachers category while `teacher` highlights the Teachers category without being a nav item, and every other planned item (`addTeacher`/`teacherCategories`/`sessionsKpi`/`monthlyPerf`) stays «قريبًا/Soon»; no `future-role` portal chrome.

## A3. Review process & comparison references (baselines)

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with: the **Spec 001 approved dashboard** (`design-references/approved-dashboard/academy-dashboard.png`) — the visual target; the approved **sidebar reference** (`design-references/approved-dashboard/sidebar-reference.png`) — the shell/IA target; the **existing Spec 001–006 screenshots** (`app/screenshots/*.png`) — continuity; the **legacy teacher screens** (the 10-col Teachers list, the 56-button profile, Teacher/Class Feedback %, Sessions Analysis KPI cards, the Salaries ledger) — **product/UX reference ONLY, never a visual copy** (Spec 007 must out-build the cluttered, finance-mixed legacy, not replicate it).
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts in `app/screenshots/REVIEW.md` (A6) — **the manual review there is the FINAL gate**; the automated checks (A5) accompany it, they do **not** replace it.

## A4. Failure conditions (any one = FAIL)

- Looks like a **generic HR/employee dashboard** or a **generic employee table** (no academic relationships/links).
- Looks like a **fake analytics suite** (a computed score, a rank/leaderboard, a percentile, a chart/graph/sparkline for "performance").
- A **salary / payroll / compensation / payout / fine / hour-rate** figure, card, tab, or widget appears (finance leaked in).
- Missing the **teacher ↔ course / group relationship** (no course/group links from the teacher).
- Missing the **teacher ↔ schedule / outcomes relationship** (no timetable agenda, no outcome rows).
- Missing the **teacherAbsent vs studentAbsent** distinction (collapsed into one "absences").
- Missing the **teacher profile (detail) experience** (no banner + baked tabs) or it reads as a **portal** ("my classes"/login/role-switcher).
- Missing honest **demo / disabled action** behavior.
- **Dead links / dead actions** (any control not navigating, opening an overlay, switching a tab, filtering, demoing with a toast, or disabled-with-reason).
- **Copied legacy visuals / assets / colors / classes / logo / icons / wording / numeric statuses** (e.g. `status=0..5`, the 11-state lifecycle, legacy salary columns).
- **Raw i18n keys** visible (`trn.*` shown literally).
- **Poor dark mode.** · **Broken RTL or LTR** (mirrored numbers/dates/times/counts, or a broken chip/tab/drawer/agenda in either direction).
- Page is **JS-rendered whole page** instead of static HTML-first (a card/row/tile/tab/drawer built at runtime, or a whole-page `#app` mount).
- **Claims real teacher / assignment / performance / attendance persistence** (a real save/create/assign/notify/mark) instead of honest demo/fixture.
- **Cannot deploy** to GitHub Pages (absolute paths / external requests).
- **Hard to convert** to a Django template (`{% for teacher %}`, tabs → `{% if %}`, the drawer → one shared partial, status/signal maps → template tags).
- A **second/bespoke outcome drawer or a new timetable grid** is introduced instead of reusing the Spec 005 drawer / Spec 003 agenda (SC-009).
- The **Dashboard adds a new stat wall / fabricated analytics** instead of one fixture-backed signal.
- **More than one nav category panel** shown at once (shell regression).
- Does **not visibly reflect** the inspected reference idea (a calm, academically-complete teacher operations experience, cleaner/calmer/more premium than the cluttered, finance-mixed legacy).

## A5. Automated checks that accompany (not replace) the review

- **a11y** (SC-007): axe **critical = 0** (and serious = 0) on each Spec 007 page (`teachers`/`teacher`/`teacher-performance`) in AR light + ≥1 dark + ≥1 EN sampled (incl. a `#view=timetable|sessions-outcomes|students` tab state); teacher-status + workload + follow-up + outcome chips **never color-only**; RTL and LTR render without overflow on desktop, tablet, and mobile.
- **no-dead-button / no-raw-i18n-key / no-external-request**: smoke over `teachers`/`teacher`/`teacher-performance`/`dashboard` (no-external-request also proves no chart/table/form/calendar library loads).
- **HTML-structure** (SC-005): static shell + baked **teacher cards** (counts + `teacher.html` link) + baked **KPI tiles** + baked **per-teacher comparison rows** (`teacher.html` link) + a profile `role="tablist"` with **exactly one** visible `tabpanel` on `teacher.html` (8 tabs) + reused baked `<template data-preview>` drawers (the **same** `outcomeTemplate`, no new template) + **no `id="app"`**; relative asset paths.
- **no-computed-metric / no-finance**: the G8a grep audit (scope-guard) is clean — no `salary`/`payroll`/`score`/`rank`/`chart` token; every number traces to a fixture count.
- **nav**: `teacher-performance` is a real `<a>` with a route + exactly one `is-active[aria-current]` per page (`teachers.html`/`teacher.html` → teachers, `teacher-performance.html` → teacherKpi); every other planned teacher item stays a «قريبًا/Soon» button; `teacher` is **not** a nav item; no portal in the DOM; no dead nav link.
- **filter / tab / drawer / confirm smoke**: a teacher filter narrows cards with a result count + a no-results/reset state; a profile tab switch (click + keyboard) shows only the target panel and persists across `#view`; the Sessions & Outcomes panel opens the **canonical** outcome drawer with teacherAbsent ≠ studentAbsent; backend-bound actions (assign course/group, export) are disabled-with-reason; Notify-family routes through a confirm → demo toast.
- **keyboard**: scripted tab-through reaches the cards/rows, the filter controls, the profile tabs, and the drawer/confirm actions with visible focus.

## A6. REVIEW.md verdict format

Append a **dated section** to `app/screenshots/REVIEW.md`:

```
## Spec 007 — Teacher Performance & Academic KPIs — <YYYY-MM-DD>

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Teachers directory (AR/light/desktop) | teachers__ar__light__desktop.png | ✅ PASS — <reason> |
| … | … | … | … |

Failure conditions: none triggered.
Automated (accompanying): build clean · smoke PASS · axe critical=0/serious=0 · grep-audit clean · 0 console errors.
```

Every row uses `✅ PASS — <reason>`; any FAIL names the triggered A4 condition and **blocks acceptance** until re-captured. The dated REVIEW.md section is the **final gate** (FR-022, SC-008) — automated green is necessary but not sufficient.

## A7. Output & naming

`app/screenshots/{page}__{lang}__{theme}__{viewport}[__{variant}].png` (e.g. `teacher__ar__light__desktop__timetable.png`, `teacher-performance__ar__light__desktop.png`, `dashboard__ar__light__desktop__teachers-followup.png`), with verdicts appended to `app/screenshots/REVIEW.md` per A6.

## A8. Determinism & shell-invariant cross-check

- **Deterministic** — fixtures are fixed and a **fixed clock** pins "today" so the teacher's timetable/outcomes slices are stable across runs; non-essential animation is disabled so the tab/drawer/confirm frames are crisp.
- **Shell cross-check** — every Spec 007 frame MUST also satisfy the carried shell rules: exactly one visible nav category panel, exactly one `is-active[aria-current]` (the category that owns the page), the category rail tabs intact, no `future-role` portal chrome. A frame violating any triggers the "shell regression" / ">1 nav category panel" FAIL even if the page content is otherwise correct.
- **No legacy bleed-through** — reviewers compare against the old teacher screens only to confirm the *product idea* (a teacher with courses/groups/schedule/outcomes/absence/follow-up); any copied numeric status, palette, class, icon set, salary column, or private wording in a frame is an automatic FAIL (A4).
