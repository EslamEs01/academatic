# Contract: Screenshot Acceptance (Spec 006 — Courses, Groups & Learning Paths)

**Status**: Binding · Automated tests are required but NOT sufficient. **Final acceptance is a human screenshot review** of the courses/groups/learning-path surfaces against the Spec 001/002/003/004/005 approved direction. "Passes tests but looks like a generic course catalogue / a generic class spreadsheet / drifts from Spec 001 / hides the course↔group↔students↔teacher↔schedule↔outcomes relationship / claims real enrollment persistence" = **fail**. Self-contained for Spec 006. References **FR-028** (project gates), **SC-007** (a11y + responsive), **SC-008** (visual acceptance, no failure condition), and **SC-009** (the Spec 003 agenda + Spec 005 outcome drawer reused unchanged).

## A0. Targets are built static pages

Acceptance runs against the built static site in `app/public/`. Targets are the pre-rendered per-language files: `public/groups.html` / `.en.html`, `public/group.html` / `.en.html`, `public/course.html` / `.en.html`, plus the regenerated `public/courses.html`, `public/student.html`, `public/family.html`, `public/dashboard.html` (each + `.en.html`). `npm run build` produces them; the harness serves `public/` and loads these files. **Content (shell, summary cards/tiles, filter bar, every course `.course-card`, every `.group-row`, every profile tab panel — Overview/Groups/Students/Teachers/Timetable/Outcomes/Learning-Path/Notes on `course.html` and Overview/Students/Timetable/Sessions&Outcomes/Teacher/Course/Notes on `group.html` — the level ladder, and every `<template data-preview>` drawer) renders WITHOUT JS**; JS is used only to reach a **state** (switch a profile tab, open the canonical outcome drawer, apply a filter). Course/group profiles are **baked template instances** (one representative course, one representative group; Django later → `course/<id>`, `group/<id>`), each highlighting its parent nav category (Courses / Groups) and **never** appearing as its own nav item.

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright / **Chromium**): per scenario, set the **theme via `localStorage`** (`academy.theme`), load the per-language file at the viewport, drive the minimal state, then capture a full-page PNG to `app/screenshots/`. Viewports: **desktop 1440×900, tablet 834×1112, mobile 390×844**. Deterministic fixtures + a **fixed clock** (stable "today" for the timetable/outcomes slices); non-essential **animation disabled**.

State-driving (no page DOM is built — only existing hooks are exercised):

- **Profile tab** (Learning Path / Sessions & Outcomes / Timetable / Courses) — load with the `#view=<token>` hash (e.g. `course.html#view=learning-path`, `group.html#view=outcomes`, `group.html#view=timetable`, `student.html#view=courses`) **or** click `[data-tab="<id>"]`; capture after the panel becomes visible. Exactly one tabpanel is visible.
- **Canonical outcome drawer** (optional add, not in the minimum) — on the group/course **Outcomes** panel click a row's `[data-row-menu]` → `.popover [data-drawer]` opening the **same** Spec 005 `outcomeTemplate` drawer; capture the overlay; named `__drawer`.
- **Directory cards / filter** — `courses.html` and `groups.html` render their baked cards/rows on load; no state needed for the directory frames. A `[data-filter-set]` tile or a `select[data-filter]` MAY be exercised to evidence narrowing.
- **Profile / dashboard hint sections** — `student.html` (Courses tab), `family.html` (Overview), `dashboard.html` (people-signal card): the fixture course/group hint + deep-link renders on load (the Courses tab via `#view=courses`).

## A2. Required matrix (15 frames) — exact file names

File naming: `{page}__{lang}__{theme}__{viewport}[__{variant}].png` (variants used here: `learning-path`, `outcomes`, `timetable`, `courses`, `courses-hint`, `groups-attention`; optional adds may use `drawer`).

| # | Scenario | File |
|---|----------|------|
| 1 | **Courses** catalogue (enriched) — AR RTL · Light · Desktop | `courses__ar__light__desktop.png` |
| 2 | **Courses** catalogue — AR RTL · **Dark** · Desktop | `courses__ar__dark__desktop.png` |
| 3 | **Courses** catalogue — **EN LTR** · Light · Desktop | `courses__en__light__desktop.png` |
| 4 | **Course profile** hub — AR RTL · Light · Desktop | `course__ar__light__desktop.png` |
| 5 | Course **Learning Path** tab — AR RTL · Light · Desktop | `course__ar__light__desktop__learning-path.png` |
| 6 | **Groups** directory — AR RTL · Light · Desktop | `groups__ar__light__desktop.png` |
| 7 | **Groups** directory — AR RTL · **Dark** · Desktop | `groups__ar__dark__desktop.png` |
| 8 | **Group profile** hub — AR RTL · Light · Desktop | `group__ar__light__desktop.png` |
| 9 | Group **Sessions & Outcomes** tab (attendance linkage) — AR RTL · Light · Desktop | `group__ar__light__desktop__outcomes.png` |
| 10 | Group **Timetable** tab (schedule linkage) — AR RTL · Light · Desktop | `group__ar__light__desktop__timetable.png` |
| 11 | **Student** Courses tab (course/group links) — AR RTL · Light · Desktop | `student__ar__light__desktop__courses.png` |
| 12 | **Family** profile course/group hint — AR RTL · Light · Desktop | `family__ar__light__desktop__courses-hint.png` |
| 13 | **Dashboard** groups-attention signal — AR RTL · Light · Desktop | `dashboard__ar__light__desktop__groups-attention.png` |
| 14 | **Mobile** Groups directory — AR RTL · Light · Mobile | `groups__ar__light__mobile.png` |
| 15 | **Mobile** Group profile — AR RTL · Light · Mobile | `group__ar__light__mobile.png` |

(Additional dark/EN/state captures — e.g. an EN course profile, a group Outcomes `__drawer`, a course Groups-tab, a tablet directory — MAY be added; the fifteen rows above are the minimum gate.)

## A2a. `capture.cjs` MATRIX + variant additions

Append this block to the `MATRIX` array in `tests/screenshots/capture.cjs`. It reuses the existing `view`/`variant` mechanism (`hash = s.step ? '#step=' + s.step : (s.view ? '#view=' + s.view : '')`); **no new variant code is required** — the `#view=<token>` profile-tab driving and the `{variant}` filename suffix already exist (Spec 003/004). Frames 12–13 render their fixture hint on load, so they carry only a `variant` label.

```js
// Spec 006 — Courses, Groups & Learning Paths (acceptance matrix, 15 frames)
{ page: 'courses', lang: 'ar', theme: 'light', vp: 'desktop' },                                              // 1 (re-captured, enriched)
{ page: 'courses', lang: 'ar', theme: 'dark',  vp: 'desktop' },                                              // 2
{ page: 'courses', lang: 'en', theme: 'light', vp: 'desktop' },                                              // 3
{ page: 'course',  lang: 'ar', theme: 'light', vp: 'desktop' },                                              // 4
{ page: 'course',  lang: 'ar', theme: 'light', vp: 'desktop', view: 'learning-path', variant: 'learning-path' }, // 5
{ page: 'groups',  lang: 'ar', theme: 'light', vp: 'desktop' },                                              // 6
{ page: 'groups',  lang: 'ar', theme: 'dark',  vp: 'desktop' },                                              // 7
{ page: 'group',   lang: 'ar', theme: 'light', vp: 'desktop' },                                              // 8
{ page: 'group',   lang: 'ar', theme: 'light', vp: 'desktop', view: 'outcomes',  variant: 'outcomes' },      // 9
{ page: 'group',   lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', variant: 'timetable' },     // 10
{ page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'courses',   variant: 'courses' },       // 11
{ page: 'family',  lang: 'ar', theme: 'light', vp: 'desktop', variant: 'courses-hint' },                     // 12
{ page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'groups-attention' },               // 13
{ page: 'groups',  lang: 'ar', theme: 'light', vp: 'mobile' },                                               // 14
{ page: 'group',   lang: 'ar', theme: 'light', vp: 'mobile' },                                               // 15
```

An **optional** group-outcomes drawer add reuses the existing Spec 005 trigger seated inside the `.page-scroll` container (`[data-row-menu]` → `.popover [data-drawer]`), scoped to the group `Outcomes` panel, captured non-fullPage as `group__ar__light__desktop__drawer.png` — it is the **same canonical `outcomeTemplate`**, never a bespoke per-page drawer (SC-009). No new state-driving branch beyond the Spec 005 `outcomeDrawer` flag is introduced.

## A2b. Per-frame acceptance criteria (what each frame must show)

- **Courses catalogue (#1–3)**: a page header + the existing `summaryCards` (total / active / levels) over a calm grid of **course cards** — each leading with the subject + level + a **labeled course-status chip** (icon+text: active/draft/paused/archived) and the academic counts **active students · groups · assigned teachers** + an upcoming-sessions hint + a fixture attention hint where flagged, with a **"View course"** link to `course.html`. It reads as a **subject-offering catalogue with real academic relationships and links**, **not a generic course catalogue of bare titles**. Dark (#2) is true-dark with correct AA contrast; EN (#3) is fully mirrored to LTR with Latin digits and English labels (Courses / Active students / Groups / Teachers / View course). Filters (subject · level · status) narrow with a visible count + a distinct no-results/reset state.
- **Course profile (#4)**: a banner (subject + level + **labeled course-status chip** + counts students/groups/teachers/sessions + demo actions) over a baked **tablist** — Overview · **Groups** (cohort cards → `group.html`) · **Students** (rows → `student.html`) · **Teachers** · **Timetable** · **Outcomes** · **Learning Path** · Notes — with **exactly one** panel visible and all panels baked. Reads as the academic hub where the scattered relationships unify, not a flat enrollment list.
- **Course Learning Path tab (#5)**: a **display-only** labeled, ordered **level ladder** (`foundation → l1 → l2 → l3 → advanced`) as `.level-step` chips (icon+text, **never numeric/color-only**), per-level fixture cohort/student counts, and a **certificates hint** (or a calm "no certificates yet" state). Carries an explicit **"display-only / not a curriculum engine"** framing; any "manage curriculum" affordance is **disabled-with-reason or absent**.
- **Groups directory (#6–7)**: a page header + (optional) summary tiles (active / trial / needs-attention, doubling as `data-filter-set` filters) + a filter bar (course · teacher · level · day · status · attention) over an airy **list/card hybrid** of `.group-row`s — each showing the group name, a **course** link, the **teacher**, the **level**, a **schedule summary** (days · time), a **students count** (e.g. "8 / 10"), a **labeled group-status chip** (active/trial/full/paused/completed, icon+text), and a fixture attention/outcome hint where flagged, with a link to `group.html`. The **Groups** nav item is a real `<a href="groups.html">` (promoted) with the correct active category. It reads as a calm cohort directory, **not a generic class spreadsheet**. Dark (#7) is true-dark with correct contrast; the group-status chip + the needs-attention flag stay legible.
- **Group profile (#8, #15)**: a banner (group name + **course chip-link** + teacher + level + **labeled group-status** + students count + demo actions) over a baked **tablist** — Overview · **Students** (roster rows → `student.html`, family chip → `family.html`) · **Timetable** · **Sessions & Outcomes** · **Teacher** · **Course** (→ `course.html`) · Notes — **exactly one** panel visible, all baked. Mobile (#15) stacks the banner + tablist with no horizontal overflow.
- **Group Sessions & Outcomes tab (#9)** — *the attendance linkage*: reuses the **Spec 005 `outcomeRow`** rows with **labeled outcome chips** (icon+text) and the **canonical `outcomeTemplate` drawer** (no bespoke drawer), plus a **"View attendance"** deep-link to `attendance.html`. Shows the cohort's recent outcomes, not a fabricated metric.
- **Group Timetable tab (#10)** — *the schedule linkage*: reuses the **Spec 003 `scheduleAgenda`** rendering the group's weekly sessions, plus a **"View in schedule"** deep-link to `schedule.html#view=timetable`. No new timetable grid is built (SC-009).
- **Student Courses tab (#11)**: each enrollment card's title links to `course.html` and its **group chip** (when present) links to `group.html`; an enrollment with **no group** (the 1:1 legacy default) shows **no dead group link**. The enrollment status uses its own labeled `enrollment-status` chip (active/paused/completed), distinct from the catalogue course-status. **No new tab, no portal.**
- **Family profile course/group hint (#12)**: **one** calm fixture "children's courses & groups" hint card in Overview (counts + a deep-link to filtered `courses.html`/`groups.html`), beside the Spec 005 attendance hint. **No finance/enrollment-engine claim, no portal.**
- **Dashboard groups-attention (#13)**: **one** fixture-backed "groups needing attention" count chip folded into the existing people-signal card (beside the Spec 004 students-attention + Spec 005 follow-up chips) + a deep-link to `groups.html`. **No new stat wall, no fabricated analytics/finance widget.**
- **Mobile Groups (#14)**: rows reflow to single-column cards (name → course/teacher → level → schedule summary → students count → labeled status + attention flag → link); tiles wrap; no horizontal overflow.
- **Across all**: recognizably the same product as Spec 001 (tokens, calm cards, **labeled** status chips never numeric/color-only); the **course↔group↔students↔teacher↔schedule↔outcomes** graph is visible and navigable; **>1 nav category panel visible at once = shell regression = fail**; `groups` is now a real `<a>` in its category while `course`/`group` highlight their parent category (Courses/Groups) without being nav items, and every other planned item stays «قريبًا/Soon»; no `future-role` portal chrome.

## A3. Review process & comparison references (baselines)

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with:
   - the **Spec 001 approved dashboard** (`design-references/approved-dashboard/academy-dashboard.png`) — the visual target;
   - the approved **sidebar reference** (`design-references/approved-dashboard/sidebar-reference.png`) — the shell/IA target;
   - the **existing Spec 001/002/003/004/005 screenshots** (`app/screenshots/*.png`) — continuity of direction;
   - the **legacy academy course / group screens** (the flat "Courses" enrollment list, the skeletal Groups routes, the level/material/curriculum fields, the certificate request) — **product/UX reference ONLY, never a visual copy** (the legacy Group dead-ended with zero rows / no detail page; Spec 006 must out-build it, not replicate it).
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts in `app/screenshots/REVIEW.md` (A6) — **the manual review there is the FINAL gate**; the automated checks (A5) accompany it, they do **not** replace it.

## A4. Failure conditions (any one = FAIL)

- Looks like a **generic course catalogue** (bare titles, no academic counts/links).
- Looks like a **generic class spreadsheet** (a dense grid, no cohort identity).
- Missing the **course ↔ group relationship** (no reverse link from course to its cohorts / from group to its course).
- Missing the **group ↔ students / teacher / schedule relationship** (no roster, no teacher, no schedule summary/timetable).
- Missing the **course/group profile (detail) experience** (no banner + baked tabs).
- Missing honest **demo / disabled action** behavior.
- **Dead links / dead actions** (any control not navigating, opening an overlay, switching a tab, filtering, demoing with a toast, or disabled-with-reason).
- **Copied legacy visuals / assets / colors / classes / logo / icons / wording / numeric statuses** (e.g. `status=0..5`).
- **Raw i18n keys** visible (`crs.*` / `grp.*` / `group.status.*` shown literally).
- **Poor dark mode.**
- **Broken RTL or LTR** (mirrored numbers/dates/times/`students-count`/`days · time`, or a broken chip/ladder/tab/drawer in either direction).
- Page is **JS-rendered whole page** instead of static HTML-first (a card/row/tab/ladder/drawer built at runtime, or a whole-page `#app` mount).
- **Claims real enrollment / course / group / curriculum / certificate persistence** (a real save/create/enroll/assign/remove/schedule) instead of honest demo/fixture.
- **Cannot deploy** to GitHub Pages (absolute paths / external requests).
- **Hard to convert** to a Django template (`{% for course/group/student %}`, tabs → `{% if %}`, the drawer → one shared partial, status maps → template tags).
- The **Learning Path implies a curriculum engine** (editable units/modules/milestones) instead of a display-only level ladder.
- A **second/bespoke outcome drawer or a new timetable grid** is introduced instead of reusing the Spec 005 drawer / Spec 003 agenda (SC-009).
- The **Dashboard adds a new stat wall / fabricated analytics** instead of one fixture-backed signal.
- **More than one nav category panel** shown at once (shell regression).
- Does **not visibly reflect** the inspected reference idea (an academically-complete course/cohort experience, cleaner/calmer/more premium than the dead-ended legacy).

## A5. Automated checks that accompany (not replace) the review

- **a11y** (SC-007): axe **critical = 0** (and serious = 0) on each Spec 006 page (`courses`/`course`/`groups`/`group`) in AR light + ≥1 dark + ≥1 EN sampled (incl. a `#view=learning-path|outcomes|timetable` tab state); course/group status + attention + level steps **never color-only**; RTL and LTR render without overflow on desktop, tablet, and mobile.
- **no-dead-button / no-raw-i18n-key / no-external-request**: smoke over `courses`/`course`/`groups`/`group`/`student`/`family`/`dashboard` (no-external-request also proves no chart/table/form/calendar library loads).
- **HTML-structure** (SC-005): static shell + baked **course cards** (counts + `course.html` link) + baked **`.group-row`s** (labeled group-status chip + facet attrs + `group.html` link) + a profile `role="tablist"` with **exactly one** visible `tabpanel` on `course.html` (8 tabs) and `group.html` (7 tabs) + the baked **`.level-ladder`** + reused baked `<template data-preview>` drawers (the **same** `appointmentTemplate`/`outcomeTemplate`, no new template) + **no `id="app"`**; relative asset paths.
- **nav (NI12)**: `groups` is a real `<a>` with a route + exactly one `is-active[aria-current]` per page (`groups.html`→groups, `group.html`→groups, `course.html`→courses, `courses.html`→courses); every other planned item (`familyCategories`/`scheduleSearch`/`studentResult`/`studentEvaluation`/`sessionsAnalysis`/…) stays a «قريبًا/Soon» button; `course`/`group` are **not** nav items; no portal in the DOM; no dead nav link.
- **filter / tab / drawer smoke**: a course/group filter (or a `data-filter-set` tile) narrows rows with a result count + a no-results/reset state; a profile tab switch (click + keyboard) shows only the target panel and persists across `#view`; the group/course Outcomes panel opens the **canonical** outcome drawer; backend-bound actions (assign teacher / add students / export) are disabled-with-reason; destructive ones (remove student / archive) route through a confirm → demo toast.
- **keyboard**: scripted tab-through reaches the cards/rows, the filter controls, the profile tabs, and the drawer actions with visible focus.

## A6. REVIEW.md verdict format

Append a **dated section** to `app/screenshots/REVIEW.md` with a verdict table, then the two trailer lines:

```
## Spec 006 — Courses, Groups & Learning Paths — <YYYY-MM-DD>

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Courses catalogue (AR/light/desktop) | courses__ar__light__desktop.png | ✅ PASS — <reason> |
| … | … | … | … |

Failure conditions: none triggered.
Automated (accompanying): build clean · smoke PASS · axe critical=0/serious=0 · 0 console errors.
```

Every row uses `✅ PASS — <reason>`; any FAIL names the triggered A4 condition and **blocks acceptance** until re-captured. The dated REVIEW.md section is the **final gate** (FR-028, SC-008) — automated green is necessary but not sufficient.

## A7. Output & naming

`app/screenshots/{page}__{lang}__{theme}__{viewport}[__{variant}].png` (e.g. `course__ar__light__desktop__learning-path.png`, `group__ar__light__desktop__outcomes.png`, `dashboard__ar__light__desktop__groups-attention.png`), with verdicts appended to `app/screenshots/REVIEW.md` per A6.

## A8. Determinism & shell-invariant cross-check

- **Deterministic** — fixtures are fixed and a **fixed clock** pins "today" so the timetable/outcomes slices (which sessions are upcoming/live vs completed/absent on the course/group tabs) are stable across runs; non-essential animation is disabled so the tab/drawer frames are crisp.
- **Shell cross-check** — every Spec 006 frame MUST also satisfy the carried shell rules: exactly one visible nav category panel, exactly one `is-active[aria-current]` (the category that owns the page), the category rail tabs intact, and no `future-role` portal chrome. A frame violating any of these triggers the "shell regression" / ">1 nav category panel" FAIL even if the page content is otherwise correct.
- **No legacy bleed-through** — reviewers compare against the old course/group screens only to confirm the *product idea* (a subject offering, a cohort with a teacher + roster + schedule + outcomes); any copied numeric status (`status=0..5`), palette, class, icon set, or private wording in a frame is an automatic FAIL (A4).
