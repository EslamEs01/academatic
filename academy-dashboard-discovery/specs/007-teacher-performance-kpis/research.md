# Research: Teacher Performance and Academic KPIs (Spec 007)

Phase 0 decisions. Each is **Decision / Rationale / Alternatives considered**. Two grounding passes fed these: the analyzed legacy academy system (`output/combined/*-inventory.md`, `frontend-planning-deep/*`) and the current implemented app (`academy-dashboard-discovery/app/`, grounded file-by-file). No `NEEDS CLARIFICATION` remained after `/speckit.specify`.

---

## D1 — Teacher "performance" is a DISPLAY of fixture raw counts + labeled signals, never a computed score/rank/analytics engine

**Decision**: The Teacher Performance surfaces show only fixture-authored **counts** (completed sessions, teacher absences, student absences in the teacher's sessions, cancelled/rescheduled, groups needing follow-up) and **labeled signals** (workload, follow-up). No score, no ranking, no leaderboard, no percentile, no chart/graph, no predictive risk, no computed-analytics engine. The per-teacher comparison list is sortable/filterable only via the existing client-side facet mechanism.

**Rationale**: The legacy system **never** had a computed teacher score or ranking. "Performance" was scattered raw counts — `Teachers Details` (per-teacher Cancel/Absent/Attend), `Teacher Feedback` (one ratio %), `Class Feedback` (% + session count), and a system-wide `Sessions Analysis` aggregate with a `teacher_id` filter but no per-teacher drill-down. A `View KPIs` permission existed but **no KPI page was ever built**. Faithful-but-better means unifying those scattered counts into one calm board — not inventing an evaluation engine the reference never had (and which fixtures cannot honestly back).

**Alternatives considered**: (a) A computed "delivery score" 0–100 — rejected: fabricated metric, no reference backing, violates the fixture-only / no-engine constraint, and reads as fake analytics (a hard screenshot-failure condition). (b) A ranking/leaderboard of teachers — rejected: same fabrication + creates a false competitive signal the academy never modeled. (c) Charts/sparklines of session trends — rejected: no time-series fixture data and the no-chart-library constraint; counts + labeled chips communicate the same review signal more calmly.

---

## D2 — Finance (salary / payroll / compensation / payout) is entirely out of scope

**Decision**: Build the **academic** side of the teacher only. No salary card, payout card, payroll tab, compensation workflow, finance math, or pay figure anywhere. Where the legacy showed pay, the Spec 007 surfaces show only academic counts. If a pay affordance is unavoidable in a menu, it is **disabled-with-reason** ("finance is out of current scope"). No finance fields are added to the teacher fixture.

**Rationale**: The legacy teacher profile crammed academic data (Students, Schedule, Monthly Classes) together with finance (Compensations, Salary, Payouts) on a single 56-button page, and the legacy v2 IA itself recommends **isolating finance**. Academic operations and finance are architecturally separable; finance belongs to a future dedicated spec with its own engine, permissions, and accuracy bar. Mixing a fake salary widget into a fixture-only academic board would be dishonest and is an explicit screenshot-failure condition.

**Alternatives considered**: (a) A disabled "Salary" tab on the profile for completeness — rejected: even disabled it implies the academy treats pay as a teacher-profile concern here; better to omit and let the future finance spec own it. (b) A read-only "earnings (demo)" stat — rejected: fabricated finance figure, forbidden.

---

## D3 — Three surfaces: enrich `teachers.html` + add `teacher.html` profile template + promote `teacherKpi` → `teacher-performance.html`

**Decision**: (1) **Enrich** the existing `teachers.html` card grid with academic counts + workload + follow-up flag + a profile link. (2) Add **`teacher.html`** (+ `.en`) as a baked **profile template** — `activeId:'teachers'`, NOT its own nav item, one representative teacher baked, Django later → `teacher/<id>`. (3) **Promote** the already-planned `teacherKpi` nav item to a real page **`teacher-performance.html`** (+ `.en`) — the academy-wide KPI/follow-up board. `sessionsKpi`, `monthlyPerf`, `addTeacher`, `teacherCategories` stay planned.

**Rationale**: Mirrors the proven Spec 006 shape exactly (enrich `courses.html` + add `course.html` profile template + promote a planned nav item). The current `teachers.js` is a card-grid directory with no profile page (grounded), and the nav already declares a `cat.teachersPerf` section with a planned `teacherKpi` whose `FUTURE_ROUTES` entry is **already** `teacher-performance.html` (grounded `nav.config.js:127`) — promotion is a one-item, low-risk, no-dead-link change. The profile-template pattern (`activeId` → parent nav item) is established by `course.html`/`group.html`/`student.html`/`family.html` in `build-html.mjs` (grounded).

**Alternatives considered**: (a) Performance as a tab inside the teacher profile only — rejected: the brief + legacy intent call for an **academy-wide** comparison/follow-up board across all teachers, which a single-teacher profile tab cannot provide. (b) A brand-new nav item instead of promoting `teacherKpi` — rejected: `teacherKpi` is already reserved for exactly this route; inventing a parallel item would orphan the planned one. (c) Adding `addTeacher`/`teacherCategories` too — rejected: out of this spec's scope; they stay planned (no dead links).

---

## D4 — Reuse, don't rebuild: agenda, canonical drawer, cohort-panels, banner/tabs, directory/filter

**Decision**: Teacher Timetable tabs reuse the Spec 003 **`scheduleAgenda`** (the teacher's blocks, resolved by `trainer.id`) + a `schedule.html#view=timetable` deep-link, via the Spec 006 **`cohortTimetablePanel`** + **`cohortTemplates`**. Teacher Sessions & Outcomes tabs reuse the Spec 005 **`outcomeRow`** + the **canonical** outcome drawer **`outcomeTemplate`** (in `outcome-details.js`), via **`cohortOutcomesPanel`** + **`cohortTemplates`**. The profile reuses **`profileBanner`** + **`tabs`**. Teachers/performance reuse **`cardGrid`/`directoryCard`/`statMini`/`filterBar`/`summaryCards`/`noResults`/`kpiCard`/`status-tile`**. Course/group/student/family links reuse Specs 004/006 pages.

**Rationale**: SC-009 mandates zero new bespoke outcome-drawer/timetable/analytics builders. Every needed builder already exists and is grounded: `cohort-panels.js` exposes `blocksOf`/`outcomesOf`/`cohortTimetablePanel`/`cohortOutcomesPanel`/`cohortTemplates`; `outcomeRow` + `outcomeTemplate` are the canonical drawer; `scheduleAgenda` renders the agenda. `group.js:82-130` is the exact composition precedent (banner + tabs + cohort panels + baked templates). Reuse guarantees the teacherAbsent-vs-studentAbsent distinction and present/capacity display come for free and stay consistent.

**Alternatives considered**: (a) A teacher-specific outcome row/drawer — rejected: duplicates Spec 005, risks divergence, violates SC-009. (b) A new teacher timetable grid — rejected: `scheduleAgenda` already filters by `trainer.id`. (c) A new comparison-table component — rejected: the existing `directoryCard`/`statMini`/`status-tile`/`kpiCard` + facet filter cover the per-teacher comparison list without a table library.

---

## D5 — Three NEW labeled maps (teacher-status, workload, follow-up) + reuse availability; all distinct from the existing six maps

**Decision**: Add `teacher-status.js` — **teacher-status** `active / paused / inactive` (collapsing the legacy active/inactive/incomplete/unconfirmed/deleted). Add `teacher-signals.js` — **workload** `light / balanced / high` and **follow-up** `strongDelivery / stable / needsFollowUp / attentionRisk`. All are icon+text labeled chips (never numeric/color-only), Arabic+English. **Reuse** the existing `TEACHER_AVAIL` (`available/busy/off`) as the schedule-availability chip. Tones/icons are chosen distinct from the existing six maps (session/outcome/course/group/enrollment/family) so chips never visually shadow.

**Rationale**: FR-012/FR-013 require these labeled vocabularies, and the project's hard constraint is "labeled chips, never numeric/color-only," distinct per domain. The follow-up signal's `needsFollowUp` key coincidentally matches an `outcome-status` key — but they live in separate maps/namespaces (`trn.signal.*` vs the outcome map) and must be given distinct tone+icon so an admin never confuses a per-teacher follow-up signal with a per-session outcome. Workload/follow-up are **authored fixture flags**, not formula outputs (reinforces D1).

**Alternatives considered**: (a) Reuse an existing status map for teachers — rejected: teacher lifecycle differs from session/course/group/family lifecycles; conflating them muddies the chip vocabulary. (b) A combined single "teacher health" chip — rejected: collapses three orthogonal signals (status vs workload vs follow-up) the admin needs to read separately; the spec mandates them distinct. (c) Color-only severity dots — rejected: violates the labeled-chip constraint.

---

## D6 — Add `outcomesOfTeacher(id)`; resolve every other teacher link by existing id-joins

**Decision**: Add one resolver — `outcomesOfTeacher(teacherId)` = `SESSION_OUTCOMES.rows.filter(r => r.trainer.id === teacherId)` (in `fixtures/attendance.js`, beside `outcomesOfStudent`/`outcomesOfFamily`). Every other linkage already resolves: groups via `groupsOfTeacher(id)` (grounded `groups.js:29`); courses via `COURSES.rows.filter(c => c.teacherIds.includes(id))`; schedule via `SCHEDULE_WEEK` blocks where `trainer.id === id`; students/families via the teacher's groups' rosters (`group.studentIds[]` → `STUDENT_BY_ID` → `familyOf`).

**Rationale**: Grounding confirmed `outcomesOfTeacher` is the **only** missing resolver (`groupsOfTeacher` exists; `COURSES.teacherIds`, `SCHEDULE_WEEK.trainer.id`, `SESSION_OUTCOMES.rows[].trainer.id` are all present). Adding one small filter mirrors the existing `outcomesOfStudent`/`outcomesOfFamily` pattern and keeps the teacher surfaces fixture-derived (no fabricated metrics). The teacher fixture is extended with `statusId`, `workload`, `followUp`, and convenience counts so the cards/board need no inline derivation.

**Alternatives considered**: (a) Precompute all counts into the teacher fixture only — rejected: the outcome/schedule/group data must stay single-sourced; resolvers keep counts honest and avoid drift. (b) A generic `byTeacher()` mega-resolver — rejected: over-engineered; the specific id-joins are clearer and match house style.

---

## D7 — Zero-data teachers render calm empty states; bake the richest teacher; optionally seed a few fixture sessions

**Decision**: The surfaces handle sparse teachers gracefully — `abdullah` (physics, **no group**) → Groups tab "no groups yet" (no dead link); `huda` (math, **zero schedule blocks + zero outcomes**) → Timetable/Outcomes tabs "no recent sessions / no outcomes yet" with zeroed counts. Bake **`sara`** as the representative `teacher.html` (richest: grp1, course c1, schedule blocks b14/b4/b6, outcomes out1/out4/out10/out11). The plan **may** add a couple of fixture sessions/outcomes for a sparse teacher so the comparison board reads representatively — but zero-data must still render cleanly without fabricated metrics.

**Rationale**: Edge cases in the spec require distinct zero-data (sparse teacher) vs no-results (empty filter) states. `sara` gives the baked profile real Timetable + Outcomes content reusing the cohort panels. Optional seeding stays honest (real fixture rows, not computed values).

**Alternatives considered**: (a) Bake a sparse teacher to prove empty states — rejected: the baked profile should showcase the full experience; empty states are still proven via the live filter + the sparse teachers' cards/rows. (b) Heavily backfill every teacher's sessions — rejected: unnecessary fixture churn; a couple of targeted rows suffice.

---

## D8 — Navigation promotion mechanics: exactly one item promoted, no dead links

**Decision**: In `nav.config.js`, change the `teacherKpi` item from `status:'planned'` (no route) to implemented with `route:'teacher-performance.html'`. Leave `sessionsKpi`, `monthlyPerf`, `addTeacher`, `teacherCategories` planned. Register `teacher.html` (activeId `teachers`) and `teacher-performance.html` (activeId `teacherKpi`) in `build-html.mjs`.

**Rationale**: The build-time nav guard (grounded `nav.config.js:134-139`) throws if an implemented item lacks `route` or a non-implemented item has one — so promotion must flip status AND add route together. `teacherKpi`'s intended filename is already `teacher-performance.html` in `FUTURE_ROUTES`. `teacher.html` is a profile template (no nav item) highlighting the Teachers category, exactly like `course`/`group`.

**Alternatives considered**: (a) Promote `sessionsKpi`/`monthlyPerf` too — rejected: out of scope, and they have no `FUTURE_ROUTES` filename; would create dead links. (b) Give `teacher.html` its own nav item — rejected: it's one baked representative record, not a destination in its own right (Django later resolves `teacher/<id>`).

---

## D9 — Dashboard impact stays minimal: one fixture follow-up chip

**Decision**: Add at most **one** fixture-backed teacher chip ("teachers needing follow-up", or "teacher absences today") folded into an **existing** dashboard card (the people/attention signal card), deep-linking to `teacher-performance.html`. No new stat wall, no ranking, no salary widget, no chart.

**Rationale**: Mirrors the minimal-impact precedent of Specs 003–006 (e.g. Spec 006's single "groups needing attention" chip folded into the people-signal card). Keeps the dashboard connected without inflating it or implying fake metrics.

**Alternatives considered**: (a) A dedicated teacher KPI band on the dashboard — rejected: that's what `teacher-performance.html` is for; duplicating it inflates the dashboard. (b) "Teacher absences today" + "overloaded teachers" + "needs follow-up" trio — rejected: too many chips; one suffices and the board holds the rest.

---

## D10 — i18n via a new `ar.trn.js` / `en.trn.js` overlay; Django-ready throughout

**Decision**: Add `src/locales/ar.trn.js` + `en.trn.js`, imported and deep-merged in `i18n.js` alongside the existing `.extra/.fam/.att/.crs` overlays (the established pattern, grounded `i18n.js:4-34`). All teacher/performance keys (`trn.*` namespace) live there. Every new list/card/tab/tile/row/drawer is baked static HTML, Django-template-ready (`{% for teacher %}`, tabs → `{% if %}`, the canonical drawer → one shared partial, status/signal maps → template tags).

**Rationale**: The overlay pattern keeps Spec 007 strings isolated and merge-safe (deepMerge extends, never clobbers); missing keys render `⟦key⟧` which the smoke test catches. Static-first + Django-ready is a hard inherited constraint (US9/FR-019/FR-020).

**Alternatives considered**: (a) Append into `ar.js`/`en.js` directly — rejected: breaks the per-spec overlay isolation the project uses. (b) A runtime-fetched JSON dictionary — rejected: violates static-first + no-fetch.

---

## Summary of new/edited artifacts (informs data-model + tasks)

- **New components**: `teacher-status.js` (status map), `teacher-signals.js` (workload + follow-up maps), `teacher-actions.js` (`teacherActions()` honest-action cluster).
- **New pages**: `teacher.js` (profile template), `teacher-performance.js` (KPI/follow-up board).
- **New fixture resolver**: `outcomesOfTeacher(id)` in `attendance.js`.
- **New locales**: `ar.trn.js`, `en.trn.js`.
- **Edited**: `teachers.js` (enrich), `fixtures/teachers.js` (+status/workload/followUp/counts/outcome-breakdown — **no finance**), `nav.config.js` (promote `teacherKpi`), `build-html.mjs` (register 2 pages), `i18n.js` (register overlay), `dashboard.js` (one chip), `tests/{smoke,a11y,screenshots}`.
- **Reused unchanged**: `scheduleAgenda`, `outcomeRow`, `outcomeTemplate`, `cohort-panels`, `profileBanner`, `tabs`, `directoryCard`, `filterBar`, `summaryCards`, `kpiCard`, `status-tile`, `noResults`, `TEACHER_AVAIL`, `groupsOfTeacher`, `COURSES.teacherIds`, `SCHEDULE_WEEK.trainer.id`.
