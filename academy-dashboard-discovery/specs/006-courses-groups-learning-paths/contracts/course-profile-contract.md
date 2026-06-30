# Contract: Course Profile Page

**Status**: Binding · `public/course.html` (+ `.en`). The course profile hub — a profile **banner** + **baked tabs** (Overview / Groups / Students / Teachers / Timetable / Outcomes / Learning Path / Notes) over the shared `tabs` widget. A registered SSG page reached via "View course" links; **NOT** a nav item. Active nav: `courses`.

References: FR-004 / FR-005 / FR-006 / FR-007 / FR-008 / FR-016 / FR-019 / FR-025 / FR-026 / FR-027 / FR-028; data-model §6 (CourseProfile), §3 (CourseTeacherLink), §4 (CourseStudentLink), §5 (CourseGroupLink), §13 (LearningPath), §14 (LearningPathLevel), §15 (CourseAction).

---

## 1. Purpose & reuse

- Give the admin a calm, relationship-visible hub for one **subject offering** — the banner orienting the admin to the course's status, counts, and teacher roster, and the tabs distributing the full academic graph (cohorts, students, schedule, outcomes, progression) into progressive disclosure. It MUST read as the same product as Specs 001–005 (warm canvas, violet `--g-violet`, Tajawal) and MUST replace the legacy behavior (a course = a per-student enrollment row with no profile, no cohort view, no outcome aggregation) with a calm, academically complete hub.
- It MUST compose **existing** components only — `profileBanner`, the shared `tabs` widget, `chip`, `medallion`, `button`, `statMini`, `scheduleAgenda` (Spec 003), `appointmentTemplate` / `outcomeRow` / `outcomeTemplate` (Spec 005 canonical drawer), `states`, `ui` atoms, and `sheetRow`. **No new tab engine, no new outcome drawer, no new timetable grid, no curriculum engine.** Behaviour is `enhance.js` over baked markup via `data-*` hooks only (FR-007 / FR-025 / FR-027 / SC-009).

## 2. Page registration & active state (D2/D3/R22 — NOT a nav item)

- `course.html` is a **registered SSG page** (`PAGES` entry `{ base:'course', activeId:'courses', titleKey:'crs.profile.title', crumbKey:'crs.profile.crumb', render }`) rendering **one representative `Course` fixture** (e.g. `c1` Math) as the baked template. It is **NOT** added to `NAV_CATEGORIES`.
- Its `activeId:'courses'` MUST keep the **`courses`** nav item active (violet pill + `aria-current="page"`) and open the `courses` category panel — the same pattern as `family.html` → `activeId:'families'` and `student.html` → `activeId:'students'`.
- It is reached only via a **"View course"** real `<a href="./course.html">` from a course card (`courses.html`) or a course chip-link (`group.html`) — language-aware (`course.en.html`). Django later maps the one template to `course/<id>` (per-id); the static site bakes **one** representative file.
- The page MUST NOT render any student/parent/teacher **portal or dashboard** (those stay `future-role`, never rendered).

## 3. Profile banner (`profileBanner`)

The banner MUST present, in a calm header band (NOT a stat wall), using the existing `profileBanner` component:

- **Identity** — a `medallion` in the course `icon`/`accent` (soft variant) + the course `titleKey` resolved as `<h1 class="pb-name">` + the **CourseStatus chip** (§10 of courses-page-contract.md; icon + label, **never numeric/color-only**) + a breadcrumb `<a href="./courses.html">` back to `الدورات`/`Courses`.
- **Meta row** — subject chip + level chip (e.g. «الرياضيات» · «المستوى الثاني»), display-only; icon `curricula`/`graduation-cap`.
- **KPIs** — at most four `statMini` facts: **active students** (`crs.kpi.students`), **groups** (`crs.kpi.groups`), **teachers** (`crs.kpi.teachers`), **upcoming sessions** (`crs.kpi.upcoming`). All from fixture counts; **display-only**, never finance.
- **Actions row** (§13) — edit / add group / view attendance / archive — each honest under IP8 (demo / link / confirm→demo / disabled-with-reason); defer full action catalogue to `course-group-actions-contract.md`.

Long course titles MUST truncate/wrap gracefully in AR-RTL and EN-LTR.

## 4. Tabbed sections (shared `tabs` widget — baked, JS toggles visibility only)

- The profile sections MUST use the shared `tabs` widget (`tabs.js`): a container `data-tabs="course-profile"`, a `role="tablist"` of `role="tab"` controls (each `data-tab="<id>"`, `aria-controls`, `aria-selected`, `data-view` token), and a baked `role="tabpanel"` (`data-tabpanel="<id>"`, `aria-labelledby`, `tabindex="0"`) **per** tab — inactive panels carry `hidden`. Tabs, in order: **Overview · Groups · Students · Teachers · Timetable · Outcomes · Learning Path · Notes** (8 tabs total, FR-005).
- **All eight panels MUST be pre-rendered complete static HTML.** `enhance.js` MUST only toggle visibility (set/remove `hidden`, flip `aria-selected`, move roving tabindex) — it MUST NOT render, build, or fetch panel content. Selection persists in `localStorage['academy.schedView.course']` + URL hash `#view=<tab>` (hash wins on load, else storage, else **Overview** default). Roving-tabindex keyboard navigation per the widget. With JS off, all panels remain reachable as anchored sections.
- **Exactly one panel** MUST be visible at page load (the Overview panel, i.e. `i === 0` in the `tabs()` call). Smoke MUST assert exactly one visible panel.

## 5. Overview tab (`data-tabpanel="overview"`)

- **Course description** — resolved `notesKey` as a calm prose block; empty → "no description yet" hint (never a blank region).
- **Quick-facts** — a `sheetRow` list: subject · level · status chip · teacher count · group count · created/updated date placeholder. Display-only, tabular numerals.
- **Attention hint** (conditional) — when `attention` is present: icon `alert-triangle` (amber) + resolved `attention.labelKey`. Icon+label, never color-only.
- **Cross-links** — a calm row of links: «عرض الجدول الزمني» → `schedule.html#view=timetable`, «عرض الحضور» → `attendance.html`. Real `<a href>`, not demo buttons; they navigate to existing pages filtered by context (fixture-level, not a real filter engine).

## 6. Groups tab (`data-tabpanel="groups"`)

- Lists the cohorts delivering this course, resolved from `Course.groupIds[]` → `GROUPS`, presented as **group cards** (the same `.dir-card` anatomy used in the Groups directory page), each showing: group name + level chip + teacher label + schedule-summary (`scheduleSummary.daysKey · time`) + students count (`enrolledCount / capacity`) + labeled GroupStatus chip (icon+text, never color-only) + conditional attention flag.
- Each group card MUST carry a **"View group"** real `<a href="./group.html">` (language-aware `./group.en.html`) — never a `data-drawer` on this tab. (FR-006 / SC-003.)
- **Empty state** — when `groupIds` is empty (e.g. a `draft` course): a calm "no groups yet" warm empty state with the "+ add group" demo CTA. MUST NOT be a blank region or a blank table.
- Counts `groupsCount` in the banner KPI MUST match the resolved list. No group-management engine.

## 7. Students tab (`data-tabpanel="students"`)

- Lists enrolled students resolved via `CourseStudentLink` (data-model §4): the union of Spec 004 `Student.enrollments[]` whose course matches + members of the course's groups, deduplicated. Presented as calm student rows/cards — each showing: student avatar (`accent`) + name + **EnrollmentStatus chip** (`active|paused|completed`, from `enrollment-status.js` — distinct from `CourseStatus`; icon+label, never color-only) + level mini + group chip-link (→ `group.html`) when an enrollment has a `groupId`.
- Each student row MUST carry a real `<a href="./student.html">` (language-aware `./student.en.html`) as the primary CTA. (FR-006 / SC-003.)
- **Empty state** — "no students enrolled" warm empty state. Never a blank region.
- No enrollment/assignment engine; `addStudents` action is disabled-with-reason (§13).

## 8. Teachers tab (`data-tabpanel="teachers"`)

- Lists assigned teachers resolved from `Course.teacherIds[]` → `TEACHERS` (Spec 002 fixture). Presented as calm teacher rows: avatar (`accent`) + name + subject/level specialty mini + availability note (fixture-only, no real schedule engine). No teacher-profile page exists in scope; links to a teacher preview or label only.
- **Empty state** — "no teachers assigned yet" hint; the `assignTeacher` action is disabled-with-reason (§13). Never a blank region.
- Display-only. No assignment engine (data-model §3).

## 9. Timetable tab (`data-tabpanel="timetable"`)

- Renders this course's **upcoming sessions** by reusing the Spec 003 **`scheduleAgenda`** component — a `data-agenda` block of baked session rows (resolved from `Course.groupIds[]` → `Group.scheduleBlockIds[]` → `SCHEDULE_WEEK`), **NOT** a new weekly grid builder. Each row shows the session day/time, group name, teacher, and subject — using the same agenda markup Spec 003 established.
- Each session row opens the **shared `appointmentTemplate`** drawer (`appointment-details-contract.md` of Spec 003) via `data-drawer="<blockId>"` over a baked `<template data-preview="<blockId>">`. **No new drawer is introduced here** (SC-009).
- A language-aware **"View in schedule"** deep-link MUST navigate to `schedule.html#view=timetable` (`schedule.en.html#view=timetable` on EN) — a real `<a href>`, never a dead link. (FR-007 / US7.)
- **Empty state** — "no upcoming sessions" calm hint. Never a blank region.
- MUST NOT duplicate the Spec 003 timetable grid builder or introduce a new scheduling engine.

## 10. Outcomes tab (`data-tabpanel="outcomes"`)

- Renders recent session outcomes for this course's groups by reusing the Spec 005 **`outcomeRow`** component — a list of baked `<div class="outcome-row">` rows (resolved from `Group.outcomeIds[]` → `SESSION_OUTCOMES`) carrying the session date/time, group name, outcome-status chip (icon+text, from `outcome-status.js`, never color-only), and attribution.
- Each row opens the **same canonical `outcomeTemplate` drawer** from Spec 005 (`outcome-details.js`) via `data-drawer="<outcomeId>"` over a baked `<template data-preview="<outcomeId>">`. The drawer MUST be the **identical** Spec 005 outcomeTemplate (status + outcome chip + who-absent/who-cancelled + present/capacity + make-up/credit hint + follow-up + gated demo action cluster) — **no bespoke outcome drawer is introduced on this page** (FR-007 / SC-009).
- A language-aware **"View attendance"** deep-link MUST navigate to `attendance.html` (`attendance.en.html` on EN) — a real `<a href>`, never dead. (FR-007 / US8.)
- **Empty state** — "no recorded outcomes yet" calm hint. Never a blank region.
- MUST NOT duplicate the Spec 005 outcome drawer or introduce a new outcome/attendance engine.

## 11. Learning Path tab (`data-tabpanel="learning-path"`) — DISPLAY-ONLY

- Renders the academy level ladder for this course: `foundation → l1 → l2 → l3 → advanced` as an **ordered, labeled `.level-ladder` strip** of `.level-step` items (data-model §13 / §14), resolved from `Course.levels[]` (enriched with per-level `studentsCount` and `isCurrent?` flags). (FR-008 / US5 / R47.)
- Each `.level-step` MUST show: icon (e.g. `graduation-cap` or level-specific icon) + label (resolved `labelKey`, never an index number) + fixture student count (`<N> crs.lp.students`) + a calm `is-current` indicator when `isCurrent === true`. Ordered left-to-right (LTR) / right-to-left (RTL) per language direction.
- **Certificates hint** — below the ladder: icon `award` + `<count> crs.lp.certificatesHint` (e.g. «٢ شهادة مكتملة»); when `count === 0`: calm "لا توجد شهادات بعد" / "No certificates yet" hint. Never a blank region.
- The Learning Path section is **display-only**: MUST NOT render any editing control, progression engine, unit/module editor, or milestone automation. Any "manage curriculum" affordance MUST be absent or disabled-with-reason (`crs.reason.curriculum`) — no real persistence implied (FR-008 / SC guard: no curriculum engine). The section MUST carry a calm displayed note (e.g. «للعرض فقط — إدارة المناهج تتطلب الوحدة الكاملة» / "Display only — curriculum management requires the full module") as a `data-disabled-reason` or a labeled `<p class="hint">`, not as a heading.
- MUST NOT: claim a curriculum builder, a progression engine, or any level-milestone automation.

## 12. Notes tab (`data-tabpanel="notes"`)

- A calm free-text display of the course's `notesKey` fixture content, plus a timestamp placeholder. Display-only.
- **Empty state** — "no notes yet" hint + a demo "+ add note" button (`data-demo-action` → toast). Never a blank region.

## 13. Profile actions (demo / link / confirm / disabled — IP8/IP9)

All actions MUST be honest (FR-019 / FR-020); no action persists or mutates data. Full action catalogue deferred to `course-group-actions-contract.md`; the following MUST appear:

- **Edit** — `data-demo-action` → demo toast (`crs.action.edit.toast`). `<button type="button" data-demo-action data-toast="crs.action.edit.toast">`.
- **Add group** — `data-demo-action` → demo toast (`crs.action.addGroup.toast`). Not a real group-creation form.
- **Assign teacher** — `data-disabled-reason` + `data-reason-key="crs.reason.assign"` ("Requires the teacher-assignment module"). Visibly disabled with reason; MUST NOT be a dead control.
- **Add students** — `data-disabled-reason` + `data-reason-key="crs.reason.enroll"` ("Requires the enrollment engine"). Visibly disabled with reason.
- **View attendance** — a real `<a href="./attendance.html">` (language-aware), styled as `.btn .btn-secondary`. Never `data-demo-action`.
- **Open timetable** — a real `<a href="./schedule.html#view=timetable">` (language-aware), styled as `.btn .btn-ghost`.
- **Archive** — destructive: `data-confirm` + `data-confirm-title="crs.action.archive.title"` + `data-confirm-msg="crs.action.archive.msg"` + `data-confirm-cta="crs.action.archive.cta"` + `data-confirm-toast="crs.action.archive.toast"` + `data-confirm-danger` → demo toast on confirm. No real archiving.
- **Print / export summary** — `data-disabled-reason` + `data-reason-key="crs.reason.export"` ("Requires the backend export module"). Disabled with reason.

Every button MUST satisfy IP8; no raw i18n key may appear as visible text; no dead controls.

## 14. States & responsive

- Each tab MUST show its **own** calm empty state (no groups / no students / no teachers / no sessions / no outcomes / no notes) — never a blank region. Page-level **loading** skeleton + **error + retry** reuse the Spec 001 `states` patterns.
- **Responsive**: the banner stacks at mobile breakpoint; the tablist scrolls horizontally or stacks (no overflow); all group/student/teacher/session/outcome lists stack to a single column; the shared drawers (Spec 003 appointment + Spec 005 outcome) are full-height on mobile. No new responsive layout primitives needed beyond existing CSS.

## 15. `data-*` hooks (exact, reuse only — no new hook invented)

`data-tabs="course-profile"`, `data-tab="overview|groups|students|teachers|timetable|outcomes|learning-path|notes"`, `data-tabpanel="<same>"`, `data-view` (hash/persistence token); `data-agenda`, per session row `data-row` + `data-attention`; `data-drawer="<id>"`, `data-preview="<id>"`, `data-sheet-close`; per outcome row `data-drawer="<outcomeId>"`, `data-preview="<outcomeId>"`; actions via `data-demo-action`, `data-toast`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`. "View group" (→ `group.html`), "View student" (→ `student.html`), "View in schedule" (→ `schedule.html#view=timetable`), "View attendance" (→ `attendance.html`), and the breadcrumb (→ `courses.html`) are real `<a href>` (not hooks). **No JS-generated ids or classes. No new `data-*` hook beyond this list.**

## 16. Static-HTML-first & Django mapping

- `course.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + banner + **all eight** baked tab panels (Overview/Groups/Students/Teachers/Timetable/Outcomes/Learning-Path/Notes) + every schedule-row + every `<template data-preview>` for both appointment and outcome drawers, as real baked markup. **No `<div id="app">`,** no JS-built page DOM. Relative `./assets/` paths; per-language pages (`course.html` ar/rtl + `course.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form/calendar library (FR-025 / FR-026 / FR-027).
- **Django**: `public/course.html` → `templates/admin/course.html` mapped to `course/<id>`; the shell → `{% include %}` partials; tabs → static sections (`{% if view == 'groups' %}` etc., default Overview); the Groups tab → `{% for g in course.groups %}`; the Students tab → `{% for s in course.students %}`; the Teachers tab → `{% for t in course.teachers %}`; the Timetable agenda → the Spec 003 `{% for block in course.schedule %}` + the shared `_appointment_details.html` include; the Outcomes list → `{% for o in course.outcomes %}` + the shared Spec 005 `_outcome_details.html` include; the Learning Path → `{% for level in course.learning_path %}` + the certificates hint; the status map → `{{ course.status|course_status_chip }}` template tag. No whole-page `#app` mount.

## 17. Enforcement & cross-references

- **Smoke** (`tests/smoke/run.cjs`): `course` is in `PAGES` with `activeId:'courses'`; the profile tablist has **8 tabs** with **exactly one** visible panel; the Groups tab cards link to `group.html`; the Students tab rows link to `student.html`; the Timetable tab has `data-agenda` + a real `<a href>` to `schedule.html#view=timetable`; the Outcomes tab has `.outcome-row` elements + `data-drawer` links + a real `<a href>` to `attendance.html`; the Learning Path tab has `.level-ladder` with `.level-step` elements carrying icon+text (never raw index numbers); the banner shows a CourseStatus chip (icon+text, never color-only); **no curriculum-builder, no enrollment-engine, no portal markup** is present; no dead actions; no `data-demo-action` on navigation links; no `id="app"`; relative assets; axe critical = 0.
- **Screenshots** (screenshot-acceptance, R56): Course profile AR-RTL light desktop (Overview tab), Course profile AR-RTL light (Learning Path tab) — verdicts appended to `app/screenshots/REVIEW.md`.
- Binds to `courses-page-contract.md` (the "View course" origin), `group-profile-contract.md` (the Groups tab target), `student-profile-contract.md` (the Students tab target + the reciprocal Courses tab), Spec 003 `appointment-details-contract.md` (shared Timetable drawer), Spec 005 `outcome-details-contract.md` (the canonical Outcomes drawer), Spec 003 `static-html-django-ready-contract.md` (SD1/SD2/SD4–SD9), and Spec 002 `interaction-patterns-contract.md` (IP5/IP6/IP8/IP9) + `navigation-ia-contract.md` (course.html registered but not a nav item).
- MUST NOT: introduce a curriculum builder, an enrollment engine, an assignment engine, a course portal, or any bespoke outcome drawer or timetable builder; render a numeric-only or color-only status chip; claim any metric not backed by a fixture field; introduce any `data-*` hook not listed in §15; dead-link to any page not baked in the SSG.
