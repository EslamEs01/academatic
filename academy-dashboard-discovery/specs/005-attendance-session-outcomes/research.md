# Phase 0 Research: Attendance and Session Outcomes

Spec 005 inherits the entire Spec 001 stack + Spec 002 decisions **R1–R10** + Spec 003 decisions **R11–R19** (the generic tabs widget, the timetable grid, `scheduleAgenda`, the shared **appointment drawer**, fixture-only attention flags, minimal dashboard impact) + Spec 004 decisions **R20–R31** (the Family entity + `familyId`, the family/student profiles, the labeled lifecycle status map, the people-signal dashboard card). **No new dependencies.** This file records only the decisions specific to the attendance/outcomes experience. Each: **Decision · Rationale · Alternatives rejected**. It is grounded in the inspected reference (the academatic daily "Classes Of {date}" board + the session-action modal family + the documented weaknesses) + the current implementation — not invented.

---

## R32 — A dedicated Attendance page; a NEW `control`-category nav promotion

**Decision**: Add `attendance.html` (+ `.en`) — page title **«الحضور ونتائج الجلسات» / "Attendance & Session Outcomes"**, nav label **«الحضور» / "Attendance"** — as a NEW `attendance` item in the **`control` category** (daily operations, beside `home`/`sessions`/`schedule`), promoted to `status:'implemented'` + `route:'attendance.html'` (route added to `FUTURE_ROUTES` at promotion, like `addFamily` in Spec 004). `sessionsAnalysis` stays `planned`. `activeId:'attendance'`.

**Rationale**: The reference's daily session-outcomes board is "Home / Classes Of {date}", which lives in daily operations. The app has no attendance item, and `sessionsAnalysis` is a distinct **analytics** roll-up (count+hours) — different surface, stays planned. A single new `control`-category page is the cleanest, reference-grounded placement and keeps the nav free of dead links (the build guard enforces it).

**Alternatives rejected**: reuse/promote `sessionsAnalysis` (wrong semantics — it is the count+hours analytics roll-up, a later spec); a Sessions-page tab instead of a page (the outcomes board is a first-class daily destination + needs its own filters/tiles; a buried tab would not match the reference); placing it in the `families` category (it is a daily-operations surface, not a people directory).

---

## R33 — A NEW labeled OUTCOME status map (collapsing the legacy 11-state + numeric codes)

**Decision**: Add `outcome-status.js` — `OUTCOME_STATUS` = id → `{ tone, icon, labelKey }` for **`attended · studentAbsent · teacherAbsent · cancelled · rescheduled · upcoming · live`** plus two display **flags** `makeUpSuggested` and `needsFollowUp` — rendered via the generic `chip` as **icon + text, never numeric or color-only**, AA-contrast, AR/EN. `outcomeChip(id)` resolves it. This is a THIRD vocabulary, distinct from the Spec 001/003 **session** status map (`live/upcoming/completed/cancelled`) and the Spec 004 **lifecycle** map (`active/trial/suspended/stopped/inactive`).

**Rationale**: The reference themed colors across ~11 statuses (pending/waiting/running/attend/student-absent/teacher-absent/teacher-cancel/student-cancel/admin-cancel/trial) and filtered by **opaque numeric URL codes** (`status=1`, `2,10`, `3,4`, `5,6,7`, `8`) — a documented weakness. A calm 7-state labeled map (+2 flags) is the honest, readable improvement that keeps the distinctions admins actually act on. The three legacy **cancel reasons** (teacher/student/admin) collapse to one `cancelled` status (the *who-cancelled* shown as a drawer attribution); the two **absent parties** stay distinct statuses (`studentAbsent`/`teacherAbsent` — the spec's required distinction). `pending/waiting` → `upcoming`; `running` → `live`; `trial` is a session *type* facet, not an outcome.

**Alternatives rejected**: import the legacy 11-state + numeric codes as a real lifecycle (banned — an engine + the documented anti-pattern); reuse the session status map (lacks absence/reschedule states); color-only badges (fails "never color-only").

---

## R34 — Outcome vs session status: a clear primary/secondary rule (no double-encoding)

**Decision**: A session carries BOTH a scheduling **`statusId`** (the Spec 001/003 session map — upcoming/live/completed/cancelled) and an admin-review **`outcomeId`** (the R33 map). The display rule:
- **Attendance page** — the **outcome** chip is PRIMARY (the page is about outcomes); the scheduling status is not shown on the row (it is implied + visible in the drawer).
- **Sessions page** — the scheduling **status** stays PRIMARY (the existing chip); a small **secondary** outcome chip is shown ONLY when a recorded outcome exists (i.e. completed/absent/cancelled/rescheduled), never on plain upcoming/live rows.
- **Outcome drawer** — shows BOTH, clearly labeled "Status" (scheduling) and "Outcome" (review), with the outcome emphasized.

**Rationale**: The reference conflated scheduling state and outcome into one 11-state code, which the planning docs flagged as confusing. Separating them — one primary per surface + a secondary only where it adds information — avoids double-encoding while keeping each page legible.

**Alternatives rejected**: one merged status everywhere (the legacy confusion); showing both chips on every row of every page (clutter, the 3–6-pills-per-row weakness).

---

## R35 — ONE canonical outcome drawer = a superset of the Spec 003 appointment drawer

**Decision**: Add `outcome-details.js` → `outcomeTemplate(item)`, the **single** canonical outcome drawer, opened via the existing `data-drawer` → `openSheet` engine on a baked `<template data-preview>`. It renders the **same session field-rows as `appointmentTemplate`** (status · date/time/duration · teacher · students(present/capacity) · **family** · subject · room · notes) **plus an outcome section** (outcome chip · who-absent / who-cancelled attribution · attendance summary · make-up/credit hint · follow-up hint · feedback note) **plus a status-gated action cluster** (R36). It **degrades** to the plain appointment view when a session has no recorded outcome. To avoid duplication, the shared session field-rows are factored into a small reusable helper (`appointmentRows(item)`) imported by both `appointment-details.js` and `outcome-details.js`. The **Attendance + Sessions** pages use `outcomeTemplate`; the **Schedule/Timetable** page keeps `appointmentTemplate` (pure scheduling); **profiles deep-link** to Attendance/Schedule (no bespoke profile drawer).

**Rationale**: The reference's single best idea was ONE session-action family reused everywhere; its worst was duplicating that modal set on 20+ pages. A canonical `outcomeTemplate` (a superset of the appointment drawer) realizes the good idea with zero per-page bespoke drawers and minimal duplication (the shared-rows helper).

**Alternatives rejected**: a bespoke drawer per page (the legacy 20×-duplication weakness; forbidden by the critical-issue brief); cramming outcomes into the appointment drawer used by Schedule (would force outcome fields onto scheduling blocks that have none); a brand-new drawer engine (the existing sheet engine already does scrim/focus-trap/Esc/return-focus).

---

## R36 — A status-gated, DEMO-only outcome action cluster

**Decision**: The outcome drawer (and the row menu) expose a **status-gated** action cluster, mirroring the reference's gating: **upcoming/live** → Mark attend · Mark student-absent · Mark teacher-absent · Cancel · Reschedule; **attended** → Add feedback note · Notify family · Reverse; **absent/cancelled** → Reschedule (make-up) · Notify family · Reverse. Each action is exactly one of: a **demo toast** (mark-attend, notify, feedback, reverse), a **confirmation modal → demo toast** (destructive: cancel, mark-absent, reschedule), or **disabled-with-reason** (any real-save / real-notify / add-to-credit). Reuses the existing `data-demo-action`/`data-confirm`/`data-disabled-reason`/`data-toast` hooks — **no new action hook, no new engine**. **No real status mutation, persistence, notification, or reschedule.**

**Rationale**: Status-gating is the reference's genuinely useful behavior (valid actions per state); honest demo/confirm/disabled feedback satisfies the no-dead-button rule while making clear nothing is saved. Reusing the established hooks keeps it Django-reproducible.

**Alternatives rejected**: the legacy 13-control field-dense Mark-Absent/Cancel modals ported verbatim (a documented weakness + would imply a real workflow); always-on actions regardless of state (nonsensical "reverse" on an upcoming session); a real mutation/persistence (banned).

---

## R37 — Make-up / credit = a fixture display hint only (no engine)

**Decision**: A `makeup` field on the outcome fixture (`none/auto/reschedule/credit`) renders a calm **display hint** in the drawer ("make-up suggested" / "added to credit (demo)"), with the real make-up/credit action **disabled-with-reason** ("Requires the finance/credit module — out of scope"). No balance, no math.

**Rationale**: The reference decided make-up/credit at the moment of absence/cancellation, feeding finance. Spec 005 honestly surfaces the *concept* as a display hint without any finance/credit/accounting engine (forbidden).

**Alternatives rejected**: a real credit balance / make-up scheduler (banned engines); omitting make-up entirely (loses a grounded, useful signal admins expect).

---

## R38 — Outcome summary tiles double as filters via a tiny `data-filter-set` hook

**Decision**: The Attendance page's `summaryCards` outcome tiles (total / attended / studentAbsent / teacherAbsent / cancelled-or-rescheduled / needsFollowUp) are wrapped as **`<button data-filter-set="outcome:studentAbsent" data-target="#attendance-list">`**. `enhance.js` gains a tiny delegated `[data-filter-set]` branch that parses `facet:value`, sets the matching `<select data-filter="facet">` in the page's filter form, and re-runs the existing `applyFilter` — i.e. a **clickable status tile = a filter shortcut**, reusing the existing client-side filtering. No new heavy engine, no route-per-status wall.

**Rationale**: Clickable KPI status tiles were the reference's best filtering affordance; the legacy implementation was a route-per-status wall. A 6-line `data-filter-set` shim over the existing filter engine delivers the good idea statically + Django-reproducibly.

**Alternatives rejected**: a route/URL per status (the ~230-variant-URL weakness); a new client-side filter engine (the existing `applyFilter` already does it); non-clickable display-only tiles (loses the affordance the spec asked for).

---

## R39 — An airy outcome list/card hybrid (not a 23-column table)

**Decision**: Render outcomes as an airy **list of `.outcome-row`** (a flex row: time/date · session title + course · teacher avatar/name · student/family link-chip · **outcome chip** · attention/follow-up flag · a row-action menu) inside the page, **filterable via `facetAttrs`** (`data-row` + `data-outcome`/`data-teacher`/`data-family`/`data-day`/`data-subject`/`data-attention`), reflowing to **single-column cards** on mobile via CSS source-order (the Spec 003 reflow pattern). The row menu opens the canonical outcome drawer.

**Rationale**: The reference's outcome data lived in dense wide tables (up to 23 columns) with no responsive story. An airy row/card hybrid with a single row-action menu fixes the "23-col table" + "3–6 pills per row" weaknesses and stays premium/scannable.

**Alternatives rejected**: a wide `dataTable` with every column (the legacy spreadsheet weakness); a pure card grid (loses the scannable time-ordered list density admins want for a day's sessions).

---

## R40 — A session-outcome fixture reusing the session shape + resolving real refs

**Decision**: Add `fixtures/attendance.js` → `SESSION_OUTCOMES = { rows: [...] }` (≥12 rows spanning **every** outcome state) where each row reuses the existing session shape (titleKey/levelKey/subject/trainer{nameKey,accent,id}/roomKey/time/duration/dateKey/present/capacity) **plus** `outcomeId`, `statusId`, a real `studentId` → `STUDENTS` and `familyId` → `FAMILIES`, the attribution (`absentBy?` student/teacher, `cancelBy?` teacher/student/admin), `makeup?`, `followUp?`, `rescheduleHint?`, `notesKey?`, `feedbackKey?`. A derived `OUTCOME_SUMMARY` provides the tile + dashboard counts. Resolution (student/family → name/accent/href) is done at build time.

**Rationale**: Reusing the session/participant shape + resolving to the real Spec 004 `Student`/`Family` fixtures keeps the family↔student spine intact (outcomes link to the right profiles), maps cleanly to Django (`{% for outcome %}` + `outcome.student`/`outcome.family`), and needs no engine.

**Alternatives rejected**: a standalone outcome fixture disconnected from students/families (breaks the follow-up links); mutating the existing `SESSIONS_FULL` in place (keeps Sessions stable; the outcome data is a new, richer set).

---

## R41 — Light, fixture-only Sessions / Student / Family integration

**Decision**: (a) **Sessions** (`sessions.js`): a secondary outcome chip per row (R34) + rows open the canonical outcome drawer + a "View attendance" deep-link. (b) **Student profile** (`student.js`): a calm fixture **recent-outcomes / attendance hint** (e.g. "attended 6 of last 8 · 1 absence to follow up") in the existing Timetable/Overview area + a "View attendance" deep-link — **no new tab**. (c) **Family profile** (`family.js`): a calm fixture **children follow-up hint** + a deep-link. All display-only.

**Rationale**: The reference tied session outcomes to the student/family/teacher everywhere; the cleanest reuse is a light fixture hint + a deep-link to the canonical Attendance page (no duplicated outcome list, no attendance engine, no new profile tab).

**Alternatives rejected**: a full attendance tab/list inside each profile (duplication + scope creep); a real attendance metric/engine (banned).

---

## R42 — Minimal, fixture-backed dashboard impact (template from 003 R16 / 004 R30)

**Decision**: Fold **one** fixture-backed signal — a **"needs follow-up today"** count chip (from the `followUp`/absence flags) linking to the filtered Attendance surface — into the **existing Spec 004 people-signal card** (no new card/tile/row); optionally let the existing **Today's Sessions** rows carry a small outcome chip + open the canonical outcome drawer. No new stat wall, nothing finance/unbacked.

**Rationale**: Same minimal pattern as Spec 003/004 — connect existing signals to the new surface + one tiny fixture-backed chip; the dashboard stays calm.

**Alternatives rejected**: an attendance KPI row / stat wall (forbidden); a real attendance-rate widget (unbacked + an engine claim); a payments/credit widget (forbidden).

---

## R43 — Tests & screenshots extend the existing harness

**Decision**: Extend `tests/smoke/run.cjs` (add `attendance` to PAGES; assert the outcome tiles + filter bar + outcome rows are baked, the tiles filter via `data-filter-set`, the outcome chip is labeled (icon+label), the canonical drawer opens with the outcome section, the student/family/schedule links are real `<a>`, the `attendance` nav item is a real `<a>` with a route + the rest stay Soon, no portals, no `#app`, relative paths). Extend `tests/screenshots/capture.cjs` MATRIX + naming with the Spec 005 frames (attendance ar light/dark + en; outcome drawer; confirm modal; sessions integration; student/family sections; dashboard impact; mobile attendance + mobile drawer). Extend a11y coverage. The "no external requests" assertion already guarantees no chart/table/form library.

**Rationale**: One pipeline covers Spec 001+002+003+004+005; deterministic; reuses installed Playwright/axe; turns the spec's failure conditions into machine-checkable + screenshot-checked gates.

**Alternatives rejected**: a separate harness (duplication); manual-only verification (not reproducible).

---

## Resolved decisions summary

| # | Topic | Decision |
|---|---|---|
| R32 | Page + nav | New `attendance.html` («الحضور ونتائج الجلسات»/«الحضور»); NI12 promote a new `attendance` item in the `control` category; `sessionsAnalysis` stays planned |
| R33 | Outcome status | New labeled OUTCOME map (attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live + makeUpSuggested/needsFollowUp), icon+label, never numeric/color-only; collapses the legacy 11-state |
| R34 | Outcome vs status | Both carried; outcome primary on Attendance, status primary + outcome secondary on Sessions, both labeled in the drawer — no double-encoding |
| R35 | Drawer | ONE canonical `outcomeTemplate` = a superset of the appointment drawer (+ a shared `appointmentRows` helper); Attendance+Sessions use it; Schedule keeps the appointment drawer; profiles deep-link |
| R36 | Actions | Status-gated, DEMO-only cluster (demo / confirm→demo / disabled-with-reason); reuse existing hooks; no mutation/persistence/notify |
| R37 | Make-up/credit | Display hint only; real action disabled-with-reason; no finance/credit engine |
| R38 | Tiles | Summary tiles double as filters via a tiny `data-filter-set` hook over the existing `applyFilter` |
| R39 | List | Airy `.outcome-row` list/card hybrid (not a 23-col table); facetAttrs; mobile reflow |
| R40 | Fixture | `SESSION_OUTCOMES` reusing the session shape + resolving real Student/Family refs; derived `OUTCOME_SUMMARY` |
| R41 | Integration | Light fixture-only Sessions (secondary chip + drawer + link) / Student (hint + link) / Family (hint + link) |
| R42 | Dashboard | Minimal + fixture-backed (one follow-up chip folded into the people-signal card + optional Today's-Sessions outcome chip) |
| R43 | Tests | Extend smoke (page/tiles/filter/drawer/links) + capture matrix + a11y |

No unresolved `NEEDS CLARIFICATION` remain.
