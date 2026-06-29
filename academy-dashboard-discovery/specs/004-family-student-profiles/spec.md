# Feature Specification: Families and Student Academic Profiles

**Feature Branch**: `feature/001-approved-dashboard-design` (continues; spec dir is independent)
**Spec Directory**: `004-family-student-profiles`
**Created**: 2026-06-29
**Status**: Draft
**Input**: User description: "Families and Student Academic Profiles — the admin-facing Families and Students academic management experience. How admins view, search, understand, and manage family/student academic information visually, so the system feels like a real academy platform, not just schedule/session pages. Grounded in the analyzed old academy system as product/UX reference, but cleaner, calmer, more premium, more modern. Static HTML-first, Django-ready, fixtures only."

---

## Context & Design Grounding *(mandatory for this spec)*

This spec **extends Spec 001/002/003** (implemented in `academy-dashboard-discovery/app/`). It is grounded in inspected artifacts (current code, binding contracts, approved references, and the old-system analysis + screenshots), not invented.

### Foundation this builds on (Spec 001/002/003)

- **Static, HTML-first** site: `scripts/build-html.mjs` pre-renders each page to a complete static file in `app/public/` (Arabic default + English `*.en.html`); `src/js/enhance.js` only enhances baked markup via `data-*` hooks. Verified green (build / smoke / axe 0-0 / screenshot review).
- **Category-rail shell** (`sidebar-reference.png`): six category tabs; the **`families` category** (العائلات / Families) already owns the relevant nav items — `students` and `courses` are **implemented** (`students.html`, `courses.html`); `families`, `addFamily`, `familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation` are **planned** (Soon buttons, no route). The build-time guard makes dead links impossible.
- **Reusable components/patterns** (compose, don't reinvent): `pageHeader`+`summaryCards`, `filterBar` (`data-filter-form`/`data-filter`/`data-target`), `dataTable`/`tableFooter`, `cardGrid`+`directoryCard`+`statMini`, `previewTemplate`+`sheetRow` (the `<template data-preview>` drawer engine), `tabs` (Spec 003 generic content-tabs: baked panels, JS toggles visibility, `#view` hash + localStorage), `scheduleAgenda` (single-day session agenda), `appointmentTemplate` (the shared session drawer — **already renders a `familyKey` row**), `status-chip`/`status-map`/`chip`, `states` (empty/loading/error/no-results), `ui` atoms, and the established `data-*` vocabulary. The `enhance.js` behaviors (filter, drawer, tabs+hash, confirm-modal, demo-action, toggle, disabled-with-reason) are all reused with **no new runtime engine**.
- **Existing Students/Courses** (Spec 002): `students.html` = a directory `dataTable` (avatar/name/status/level/progress/courses-count + preview drawer); the student fixture has `id, nameKey, accent, statusId, level, progress, enrolled, subject, guardian` — where **`guardian` is only a bare string id (`g1–g5`)**: there is **no Family entity, no `familyId`, no per-student course list, no academic record** today. `courses.html` = a card grid with denormalized `enrolled`/`sessions` counts. The Spec 003 schedule/session fixtures already carry a `familyKey` facet on some blocks/rows.

### Old academy system (PRODUCT/UX reference ONLY — never a visual copy)

Confirmed in `output/combined/{page,table,form,modal,interaction}-inventory.md`, `frontend-planning-deep/*`, and the admin **Families/Students** screenshots + contact sheets:

- **Core mental model**: the **Family = the guardian/parent login account** (the identity + billing unit); **students are "children/members" nested under one family** (one family → many students). The family record carries login + contact + billing; children carry only profile fields; the "Parent name" column on every student list is the family name; children attach via the family form and are created under the family route. This family↔student link is the spine of the whole module.
- **Family pages**: Families **list** (a row of status tiles + a collapsible advanced filter + a wide table incl. a "No. Children" column + lifecycle actions), **Add Family** (one enormous 4-section form: Main identity / Location & timezone / Payment / Courses config — billing-heavy), **Family Details** (banner + a long key→value attribute column + an **8-tab hub**: Children · Billing · Invoice Adjustments · Credits · Profile Activity · Student Feedback · Settings), **Family Categories** (a CRM **segmentation** list: name / description / status / count / assign).
- **Student pages**: Students **list** (status tiles + a "Parent name" column), **Student Details** (the heaviest page in the system — a banner + status + tabs: Courses · Trials · Siblings · Monthly-plan, with embedded enrollment/timetable/certificates/monthly-report tables), Add/Edit Student (a short "Student Information" form), plus an analytics page.
- **"Result"/"Evaluation" are NOT a gradebook** (academic exams/quizzes are an explicit *gap* in the reference). Achievement surfaces as: a **structured Monthly Progress Report** rubric (achievements narrative + rating scales — *learning progress* Excellent/Very-Good/Good/Slow, *focus*, *homework completion*, *punctuality*, *rescheduled sessions* — + next-month objectives + an Approve step), **certificates** per completed course, and **feedback-meeting** scheduling (parent–manager meetings). This is the honest basis for Spec 004's result/evaluation surfaces.
- **Groups vs Family Categories**: *Groups* = recurring multi-student classes (a **learning** construct: teacher/course/schedule + per-student rates). *Family Categories* = admin **segmentation/tiers of families** (a CRM construct: name/desc/status/assign/count). Different axes — kept distinct.
- **Documented weaknesses to improve**: dozens of status/segment *URLs* instead of one filtered list; **numeric, unlabeled student statuses** (`/status/0..6`); 6–7 cramped/duplicate-header tables crammed onto one profile; ~48% unlabeled form inputs + raw i18n key leaks; the family's "Children" table buried under a billing attribute dump; 99-button student page; a broken family-feedback page; no real attendance rollup or grade model.

### What is reused as product/UX concept

Family-as-account / students-as-children; the **family profile hub** and **student profile spine** as tabbed pages; lifecycle statuses (active/trial/suspended/stopped/inactive); **family categories** as a segmentation facet; the **monthly progress-report rubric** as the "evaluation"; certificates as the "result/achievement"; the **sectioned/stepped create-family** flow; the family→children grouping; the student↔course/group/timetable linkage.

### What is improved beyond the reference

Lead with the **family↔student relationship as the hero** (a calm family card grouping its children, not a parent attribute dump with a buried table); **one stateful filtered list** per entity instead of status-route walls; **labeled status chips** (never numeric/color-only); **separate billing from the human profile** (a "Plan & Billing" tab/step, fixture-only); a **guided multi-step Add-Family wizard** (every field labeled) instead of one giant form; **give Result/Evaluation real academic meaning** (a calm criteria-rating-narrative evaluation + a results/progress + certificates surface, distinct from meeting-scheduling); **airy, scannable** tables/cards with progressive disclosure; "none-yet" vs "no-match" empty states.

### What MUST NOT be copied (hard constraint)

Old logo/assets/favicon; legacy colors (purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`); Bootstrap/old CSS classes; old icon sets; legacy widget libraries; private academy wording/names/data; and any pixel-for-pixel legacy layout. The old system informs **structure/UX only**.

### Missing references

None. All current app files, Spec 001/002/003 contracts, approved references, and old-system family/student inventories + screenshots named in the request were located and inspected (one legacy family-feedback screenshot rendered a 500 in the archive and was skipped — noted, not guessed in place of).

---

## Design Decisions *(mandatory — resolve known tensions up front)*

**D1 — Family is a first-class entity; students link to families via a real `familyId`.** Today a student only has a bare `guardian` string. Spec 004 introduces a **Family fixture** (guardian account + nested student ids + segment/category + status + contact + plan stub) and adds a real `familyId` to students, so the family↔student relationship is the product spine (not a buried column).

**D2 — Lightweight peek = drawer; rich profile = a dedicated baked PAGE.** Per the contracts, quick "view details" stays the existing `<template data-preview>` **drawer** (and a student's *session* details reuse the **one shared `appointmentTemplate` drawer**). But the **full family profile and the full student academic profile exceed a drawer's calm budget** and are exactly what NI12/G6b authorize as real pages — so each is a **dedicated, baked, tabbed PAGE** (reusing the Spec 003 `tabs` widget for sections). This introduces the codebase's first per-entity *profile page* pattern (one representative baked template per entity, reached by a "view profile" link; Django later maps it to `family/<id>` / `student/<id>`).

**D3 — Pages added (NI12 promotions + profile templates):**
- **`families.html`** (promote `families` nav planned→implemented) — the Families directory as **family cards** (family-as-hero grouping its children).
- **`add-family.html`** (promote `addFamily`; add the route to `FUTURE_ROUTES` at promotion) — the **Add/Edit-family demo wizard**.
- **`family.html`** (new profile template; **not** a nav item; `activeId: 'families'`) — the family profile hub.
- **`student.html`** (new profile template; **not** a nav item; `activeId: 'students'`) — the student academic profile.
- **`students.html`** (existing, enriched) — add `familyId`, a family filter facet, and a "view profile" link to `student.html`.

**D4 — Add-Family wizard is BAKED, multi-step, no persistence.** All steps are pre-rendered static HTML (Identity → Contact & Location → Students/Children → Plan & Billing → Review); runtime JS only **toggles step visibility** (the schedule-tabs §3 pattern — a stepper, no form library, no validation engine), Next/Back move the active step, every field is labeled, and "Save" is a **demo toast** (`data-demo-action`) — **no real persistence**. Maps to Django as static sections / `{% if step %}`.

**D5 — Result/Evaluation are fixture-only, delivered as in-profile tabs (no grade engine).** The reference has no gradebook. Spec 004 surfaces, inside the **student profile**, a **Results** tab (per-course progress + certificates + a term/level summary — fixture display) and an **Evaluation** tab (the **monthly progress-report rubric**: criteria rows with calm rating pills — learning progress / focus / homework / punctuality — + an achievements narrative + next-month objectives + an Approve **demo** action). The `studentResult` / `studentEvaluation` **nav items stay `planned`** (academy-wide overview pages are a later spec); the user's "result/evaluation preview" is satisfied by these profile tabs. **No real grade/evaluation/attendance engine** — display only, never color-only.

**D6 — Family Categories = a segmentation facet; Groups stay planned.** `familyCategories` is surfaced as a **filter facet + category chips** on the Families page (the CRM-segmentation idea), and its **nav item stays `planned`** (a dedicated categories-admin page is later). `groups` (a learning construct) and `scheduleSearch` **stay `planned`** — out of this spec, no dead links.

**D7 — Spec 003 timetable linkage, no duplication, no portal.** Family and student profiles show **upcoming sessions** by reusing **`scheduleAgenda`** + the **shared appointment drawer** (which already renders the `familyKey` row), plus a **"View in schedule"** deep-link to `schedule.html#view=timetable`. The full timetable engine is **not** duplicated. **No student/family portal or dashboard** is built — those remain `future-role`, never rendered.

**D8 — Dashboard impact stays minimal + fixture-backed** (full reasoning in *Dashboard Impact Review*): reuse existing signals, deep-link to the new Families/Students surfaces, ensure session rows' family context flows through the shared drawer, and at most **one** small fixture-backed "needs attention" count — **no new stat wall, no fake/unbacked widget**.

---

## Scope *(mandatory for this spec)*

### In Scope (Spec 004)

A focused, frontend-only **admin Families & Students academic experience**, reusing the Spec 001/002/003 shell, tokens, components, and `data-*` vocabulary, fixtures only:

1. **Families page** (`families.html` + `.en`) — a directory of **family cards** (guardian + grouped child avatars/chips + status + counts + a fixture attention hint), with header + summary tiles, search + status + category filters, "view profile" + "add family" CTAs, states; mobile single-column.
2. **Family profile** (`family.html` + `.en`) — a **tabbed hub**: Overview (guardian contacts + KPIs + attention) · Students (the children, linking to student profiles, "add child" demo) · Schedule (the family's upcoming sessions via `scheduleAgenda` + deep-link) · Plan & Billing (calm fixture/disabled-with-reason stub) · Notes/Activity. Actions demo / disabled-with-reason.
3. **Add/Edit family wizard** (`add-family.html` + `.en`) — a baked multi-step demo flow (Identity → Contact & Location → Children → Plan & Billing → Review), JS toggles step visibility, Save = demo toast.
4. **Students page** (`students.html`, enriched) — add `familyId` + a **family** filter facet + a "view profile" link to the student profile (keep the quick-peek drawer).
5. **Student academic profile** (`student.html` + `.en`) — a **tabbed spine**: Overview (banner + family link + status + level + progress) · Courses (enrolled courses/groups) · Timetable (upcoming sessions via `scheduleAgenda` + deep-link) · **Results** (progress + certificates + summary) · **Evaluation** (the monthly progress-report rubric) · Family (the sibling/family link) · Notes.
6. **Family categories** as a segmentation facet/chips on the Families page; **timetable linkage** to Spec 003; **minimal dashboard impact**; **sidebar/topbar reconciliation** (promote `families`/`addFamily`, keep the rest planned, no dead links); **shared components/patterns** for family/student profile cards, summary panels, the evaluation rubric, and the demo wizard.

Plus, preserved end-to-end: per-language pages, RTL/LTR, Light/Dark/System, accessibility (axe critical=0), responsiveness, no-dead-button / no-raw-i18n-key / no-external-request guarantees, static / GitHub-Pages / Django-ready delivery, and screenshot acceptance.

### Out of Scope (Spec 004)

Backend API; database; real auth; real permission enforcement; **real create/edit/delete persistence**; **real enrollment / course-assignment engine**; **real grade/result engine**; **real evaluation workflow**; **real attendance workflow**; **real finance/payment/invoice/credits engine**; real notifications backend; the legacy billing/invoice/credits/feedback-meeting *workflows* (referenced as concepts only — billing appears as a calm disabled-with-reason stub); **student/teacher/family dashboards or portals**; a full Groups module; chart/table/form libraries; CDN; TypeScript; SPA framework; and any copied legacy assets/classes/logo/palette/icons/private wording.

> Family/student portals and role dashboards remain `future-role` (never rendered); when specified later they must feel comfortable, cheerful, simple, and human — not this admin UI.

### MVP slice (and why)

The MVP is **US1 (Families page) + US2 (Family profile) + US5 (Student profile)** — the family↔student spine. Delivering the families directory, the family hub (grouping its children), and the student academic profile proves the "real academy platform" feel and establishes the profile-page + tabbed-section patterns that the wizard (US3), results/evaluation (US6/US7), and dashboard impact (US9) reuse. Each surface is independently testable, sequenced by dependency/value.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin views families (Priority: P1)

As an academy administrator, I open the Families page and quickly search, filter, and understand our families — who they are, how many children each has, and which need attention.

**Why this priority**: The families directory is the entry point to the whole module and proves the family-as-hero card.

**Independent Test**: Open Families; read the family cards (guardian + grouped children + counts + status); search and filter by status/category with visible feedback + a "no results" state.

**Acceptance Scenarios**:

1. **Given** the Families page, **When** it renders, **Then** it shows a page header + summary tiles + a filter bar + a grid of **family cards**, each showing the guardian, the family's **children grouped visually** (avatars/chips), student & active-course counts, a status chip, and an attention hint where flagged — not a buried table.
2. **Given** the filter bar, **When** the admin searches or filters by status/category, **Then** matching pre-rendered cards show/hide with active-filter feedback and a "no results" + reset state — never a dead control.
3. **Given** a family card, **When** the admin clicks "view profile", **Then** it navigates to the family profile; "add family" navigates to the wizard.

---

### User Story 2 - Admin opens a family profile (Priority: P1)

As an administrator, I open a family profile and see the family overview, guardian contacts, the students in this family, their schedule, a billing stub, notes, and attention flags — in a calm tabbed hub.

**Independent Test**: Open a family profile; review the Overview/Students/Schedule/Plan&Billing/Notes tabs; confirm the children link to student profiles; confirm actions are demo / disabled-with-reason.

**Acceptance Scenarios**:

1. **Given** a family profile, **When** it renders, **Then** it shows a banner (guardian + status) and tabbed sections — Overview (contacts + KPIs + attention), **Students** (the children, each linking to their student profile, with an "add child" demo), Schedule (upcoming sessions), Plan & Billing (calm fixture/disabled stub), Notes — all baked; switching tabs toggles only the visible section.
2. **Given** the profile actions (edit / suspend / stop), **When** used, **Then** each is a demo-with-toast or disabled-with-reason (destructive → confirmation modal) — no persistence.
3. **Given** the family↔student link, **When** reviewed, **Then** the relationship is unmistakable (the family lists its children; each child links back to the family).

---

### User Story 3 - Admin uses the add/edit family visual flow (Priority: P2)

As an administrator, I preview the family creation/editing journey as a guided multi-step wizard, without any real save.

**Independent Test**: Open Add Family; step through Identity → Contact & Location → Children → Plan & Billing → Review with Next/Back; submit → demo toast; confirm every field is labeled and nothing persists.

**Acceptance Scenarios**:

1. **Given** the Add-Family wizard, **When** it renders, **Then** all steps are baked static HTML with a step indicator; **When** the admin uses Next/Back, **Then** only the active step is visible (JS toggles visibility, no page rebuild).
2. **Given** the Review step, **When** the admin submits, **Then** a clearly-labeled **demo** toast appears and nothing is persisted; backend-bound controls are disabled-with-reason.
3. **Given** any field, **When** inspected, **Then** it has a visible label (improving the legacy's unlabeled inputs).

---

### User Story 4 - Admin views students (Priority: P1)

As an administrator, I search, filter, and understand students quickly, including which family each belongs to.

**Independent Test**: Open Students; filter by family/status/subject; confirm each row shows the family link and "view profile" → the student academic profile (and the quick-peek drawer still works).

**Acceptance Scenarios**:

1. **Given** the Students page, **When** it renders, **Then** it shows the directory (avatar/name/status/level/progress/courses) plus the **family** each student belongs to, with a family filter facet.
2. **Given** a student row, **When** "view profile" is used, **Then** it navigates to the student academic profile; the quick-peek drawer remains for a fast look.
3. **Given** filters, **When** applied, **Then** rows narrow with visible feedback + a no-results state.

---

### User Story 5 - Admin opens a student academic profile (Priority: P1)

As an administrator, I open a student's academic profile and see the family link, courses/groups, a timetable snapshot, results, evaluation, notes, and academic status — so the system feels like a real academy platform.

**Independent Test**: Open a student profile; review Overview/Courses/Timetable/Results/Evaluation/Family/Notes tabs; confirm the timetable snapshot reuses the scheduling visual language and links to the schedule.

**Acceptance Scenarios**:

1. **Given** a student profile, **When** it renders, **Then** it shows a banner (student + **family link** + status + level + progress) and tabbed sections — Courses, Timetable (upcoming sessions via the scheduling visual + a "View in schedule" deep-link), Results, Evaluation, Family, Notes — all baked.
2. **Given** the Timetable tab, **When** a session is opened, **Then** it uses the **shared appointment drawer** (showing the student's family context), and "View in schedule" deep-links to `schedule.html#view=timetable`.
3. **Given** the profile, **When** reviewed, **Then** it reads as a calm academic profile (airy, labeled status, progressive disclosure) — not a 99-button spreadsheet.

---

### User Story 6 - Admin previews a student result (Priority: P2)

As an administrator, I view a student's results/progress summary (per-course progress + certificates + term/level summary), fixture-only.

**Independent Test**: On a student profile, open the Results tab; confirm a fixture progress/certificates summary with clear, calm presentation; no grade engine.

**Acceptance Scenarios**:

1. **Given** the Results tab, **When** it renders, **Then** it shows per-course progress (hand-rolled progress visuals), a certificates list, and a level/term summary — all fixture display, clearly not a live grade system.
2. **Given** any result action (export/print), **When** used, **Then** it is demo-with-toast or disabled-with-reason.

---

### User Story 7 - Admin previews a student evaluation (Priority: P2)

As an administrator, I view a student's evaluation as a calm monthly progress-report rubric (rating criteria + narrative + objectives), fixture-only.

**Independent Test**: On a student profile, open the Evaluation tab; confirm criteria rows with rating pills (learning progress / focus / homework / punctuality), an achievements narrative, next-month objectives, and an Approve **demo** — no real workflow.

**Acceptance Scenarios**:

1. **Given** the Evaluation tab, **When** it renders, **Then** it shows the monthly progress-report rubric (criteria + calm rating pills, never color-only + icon/label) + achievements narrative + objectives.
2. **Given** the Approve action, **When** used, **Then** it is a demo toast / disabled-with-reason — no real evaluation persistence.

---

### User Story 8 - Admin links family/student context to the timetable (Priority: P2)

As an administrator, I move from a family or student profile into the timetable context without dead links.

**Independent Test**: From a family/student profile, use "View in schedule" → lands on `schedule.html#view=timetable`; from the profile's session list, open the shared appointment drawer.

**Acceptance Scenarios**:

1. **Given** a profile's schedule section, **When** "View in schedule" is used, **Then** it deep-links to the Timetable view (language-aware `.en`), with no dead link.
2. **Given** a session in the profile, **When** opened, **Then** the shared appointment drawer shows the session with its family context.

---

### User Story 9 - Admin sees family/student dashboard impact (Priority: P2)

As an administrator, the dashboard gains only useful, fixture-backed family/student signals — deep-links and at most one small attention count — without new clutter.

**Independent Test**: On the dashboard, confirm a deep-link to Families/Students and (if added) one fixture-backed "needs attention" count linking to the filtered surface; confirm no new stat wall.

**Acceptance Scenarios**:

1. **Given** the dashboard, **When** reviewed, **Then** any added family/student element is backed by an existing fixture and links to an in-scope Families/Students page.
2. **Given** the dashboard, **When** reviewed, **Then** no fake/unbacked finance/payment widget and no new stat wall were added.

---

### User Story 10 - Static / Django-ready delivery (Priority: P1)

As a developer, every families/students surface (lists, profiles, tabs, wizard steps, drawers, templates) is real baked HTML in `public/`, deployable to GitHub Pages and convertible to Django templates; JS only switches tabs/steps, filters, opens overlays, and shows demo/disabled feedback.

**Independent Test**: Build; View Source on `families.html`/`family.html`/`student.html`/`add-family.html` — full shell + all sections + wizard steps + drawer templates as real markup, relative paths, no `#app`; no external requests.

**Acceptance Scenarios**:

1. **Given** a built page, **When** its source is viewed, **Then** all lists, profile tabs, wizard steps, and `<template data-preview>` drawers are complete static HTML (no whole-page `#app`, no JS-built page DOM) with relative `./assets/` paths.
2. **Given** the site on a static host, **When** a page loads, **Then** zero external (CDN) requests; no chart/table/form library loaded.
3. **Given** a page, **When** assessed, **Then** it maps cleanly to Django (`{% for family %}`/`{% for student %}`, tabs/steps → static sections / `{% if %}`, fixtures → context, `data-*` hooks).

---

### User Story 11 - Visual / reference alignment (Priority: P1)

As a reviewer, the families/students experience resembles the analyzed system's product idea but is cleaner, calmer, more premium, academy-specific — and consistent with Spec 001/002/003; not a generic CRM, not a spreadsheet.

**Independent Test**: Review the families/students surfaces against the approved design + the old-system family/student screenshots (product reference only); confirm premium/calm/academy-specific, not legacy copy, not invented.

**Acceptance Scenarios**:

1. **Given** the Families/family-profile/student-profile surfaces, **When** reviewed, **Then** they lead with the family↔student relationship, use calm labeled status chips, airy cards/tables, and the approved tokens — recognizably the same product as Spec 001.
2. **Given** any surface, **When** compared to the legacy, **Then** nothing is copied from its visuals/classes/wording.

---

### Edge Cases

- **Empty / no-results**: distinguish "no families/students yet" (warm empty state + clear CTA) from "no match" (filter no-results + reset) — improving the legacy's bare "No data found".
- **Family with one child vs many**: the family card groups 1..N children gracefully (overflow → "+N" chip); a family with no children shows a clear "no children yet / add child" state.
- **Student with no upcoming sessions / no results / no evaluation**: each profile tab shows its own calm empty state, never a blank region.
- **Long content**: long Arabic/English guardian/student/course names truncate/wrap gracefully in cards, tabs, tables, the wizard, and drawers in both directions.
- **Wizard with JS off**: all steps render as anchored sections (graceful degradation); with JS on, only the active step shows.
- **Loading / error**: skeleton + friendly error+retry states matching the approved patterns.
- **Theme/direction switch**: Light↔Dark↔System re-themes instantly; Arabic↔English navigates to the equivalent page; tabs/steps/numbers/dates never mirror incorrectly.
- **Mobile**: family cards single-column; profile tabs scroll/stack; the wizard is one step per screen; tables stack to cards.
- **Disabled-with-reason**: billing/credits/real-save/real-enrollment controls are visibly disabled with a stated reason, or a clearly-labeled demo.

---

## Requirements *(mandatory)*

### Functional Requirements — Families directory

- **FR-001**: The Families page MUST present a page header + summary tiles + a filter bar (search + status + family-category facets) + a grid of **family cards** that visually **group each family's children** (avatars/chips + overflow), show student & active-course counts, a labeled status chip, and a fixture attention hint — applied to pre-rendered cards with visible feedback + a no-results/reset state; no dead controls.
- **FR-002**: Each family card MUST offer "view profile" (→ the family profile) and the page an "add family" CTA (→ the wizard); any unimplemented action is demo-with-toast or disabled-with-reason.

### Functional Requirements — Family profile

- **FR-003**: The family profile MUST be a complete baked page with a banner (guardian + status) and **tabbed sections** (Overview / Students / Schedule / Plan & Billing / Notes), where the **Students tab lists the family's children** each linking to their student profile; runtime JS only toggles the visible tab.
- **FR-004**: Family-profile actions (edit / suspend / stop / add-child) MUST be demo-with-toast or disabled-with-reason (destructive → confirmation modal); billing/credits MUST be a calm fixture/disabled-with-reason stub — **no persistence**.

### Functional Requirements — Add/Edit family wizard

- **FR-005**: The Add/Edit-family flow MUST be a **baked multi-step wizard** (all steps static HTML; JS toggles step visibility only; Next/Back + a step indicator), with **every field labeled**, mapping to Django `{% if step %}`/static sections.
- **FR-006**: The wizard "Save"/submit MUST be a clearly-labeled **demo** (toast) with **no persistence**; backend-bound controls are disabled-with-reason.

### Functional Requirements — Students directory & profile

- **FR-007**: The Students page MUST add a real **family** link to each student (a `familyId`) + a family filter facet + a "view profile" link to the student academic profile, while keeping the quick-peek preview drawer.
- **FR-008**: The student academic profile MUST be a complete baked page with a banner (student + **family link** + status + level + progress) and **tabbed sections** (Courses / Timetable / Results / Evaluation / Family / Notes); JS only toggles the visible tab.
- **FR-009**: The student profile **Timetable** tab MUST reuse the scheduling visual language (`scheduleAgenda` + the shared appointment drawer) for upcoming sessions and provide a language-aware **"View in schedule"** deep-link to `schedule.html#view=timetable` — **no duplicated timetable engine**.

### Functional Requirements — Results & Evaluation (fixture-only)

- **FR-010**: The student profile **Results** tab MUST show fixture-only per-course progress (hand-rolled progress visuals) + a certificates list + a level/term summary — clearly not a live grade engine.
- **FR-011**: The student profile **Evaluation** tab MUST show a fixture-only **monthly progress-report rubric** (criteria rows with calm rating pills — never color-only — + achievements narrative + next-month objectives), with Approve as a demo / disabled-with-reason. **No real grade/evaluation/attendance engine.**

### Functional Requirements — Navigation, categories, dashboard

- **FR-012**: The nav MUST promote `families` → `families.html` and `addFamily` → `add-family.html` (via the NI12 checklist + build-time guard); `familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation` MUST stay `planned` (Soon buttons, no route); the `family.html`/`student.html` profile templates are registered pages reached via links with `activeId` keeping the **families/students** nav active. **No dead links; no portals/role dashboards rendered.**
- **FR-013**: Family categories MUST appear as a **segmentation facet/chips** on the Families page (not a new page); the dashboard impact MUST be **minimal + fixture-backed** (deep-link to Families/Students + the shared drawer's family context + at most one fixture-backed attention count) — **no new stat wall, no fake/unbacked widget**.

### Functional Requirements — Fixture Data & Architecture

- **FR-014**: All displayed data MUST come from local static fixtures: a new **Family** fixture (guardian, nested `studentIds`, category, status, contact placeholder, plan stub, attention) + an extended **Student** fixture (real `familyId` + academic fields: courses, upcoming sessions, results/certificates, the evaluation rubric, notes) + a **Family Category** fixture — no real backend, auth, permissions, persistence, or enrollment/grade/evaluation/attendance engine.
- **FR-015**: Each page MUST be a complete static HTML file in `public/` (real shell + all sections + wizard steps + drawer templates; no `<div id="app">`; no runtime JS building page DOM), deployable to GitHub Pages, and structured for clean Django conversion (`{% for %}` over families/students/children, tabs/steps → static sections / `{% if %}`, fixtures → context, `data-*` hooks).
- **FR-016**: Behavior MUST attach via the established **`data-*` hook vocabulary** (`data-filter-form`/`data-filter`/`data-target`, `data-table`/`data-row`+facets, `data-row-menu`, `data-drawer`/`data-preview`/`data-sheet-close`, `data-modal-trigger`/`data-confirm`, `data-demo-action`, `data-disabled-reason`, `data-toast`, and the Spec 003 `data-tabs`/`data-tab`/`data-tabpanel`/`data-view` for profile tabs + wizard steps) — reused, stable, Django-reproducible; no invented hooks, no JS-generated ids/classes.

### Functional Requirements — Cross-cutting Quality

- **FR-017**: Every surface MUST render correctly in Arabic RTL and English LTR (mirroring layout, never numbers/dates) and in Light, Dark, and System themes.
- **FR-018**: Every surface MUST be responsive (family cards → single column; profile tabs scroll/stack; wizard one step per screen; tables → cards) without overflow.
- **FR-019**: Every control MUST satisfy the **no-dead-button** rule (demo / in-scope navigation / overlay / filter / tab-or-step switch / disabled-with-reason); there MUST be **no raw i18n keys** and **zero external/CDN requests**; status/attention is never color-only.
- **FR-020**: Every surface MUST be keyboard operable with visible focus and meet WCAG AA, verified by an automated accessibility scan reporting **no critical violations**.
- **FR-021**: Acceptance MUST include a **screenshot review** of the matrix below, visibly matching the Spec 001/002/003 approved direction and improving on the legacy reference.

### Key Entities *(display fixtures only — no persistence, no API)*

- **Family (fixture)** — id, guardian (nameKey + avatar/accent), statusId (active/trial/suspended/stopped/inactive), categoryId (segment), `studentIds[]` + derived studentCount, activeCoursesCount, contact (placeholder phone/email/whatsapp), location (country/city/timezone placeholder), joinedDateKey, plan (cost type / hour rate — display-only billing stub), attention?, notesKey.
- **Student (fixture, extended)** — existing fields + real `familyId`; academic: `courses[]` (title/teacher/status), upcoming session refs (schedule block ids), results (per-course progress, certificates[], level/term summary), `evaluation` (month + rating scales {learningProgress, focus, homework, punctuality} + achievementsKey + objectivesKey + approved flag), notesKey.
- **Family Category (fixture)** — id, nameKey, descKey, statusId, count (segmentation facet).
- **Evaluation / Monthly Progress Report (fixture, display-only)** — the rubric criteria + ratings + narrative + objectives + approve-demo. No engine.
- **Result / Progress (fixture, display-only)** — per-course progress + certificates + summary. No grade engine.
- **Wizard Step State (display-only)** — selected step (baked steps; JS toggles visibility; no persistence).
- **Filter State (display-only)** — selected family/status/category/subject facets → active chips; no server contract.
- **Status vocabulary** — a labeled family/student lifecycle status map (chip color + icon + label; never numeric/color-only), distinct from the session status map.

---

## Dashboard Impact Review *(mandatory for this spec)*

1. **Do families/students affect the dashboard?** Lightly — the dashboard already surfaces sessions/students signals; the impact is wiring + at most one small fixture count.
2. **Add a small family/student signal?** Only if fixture-backed and linked to an in-scope page — e.g. a "students needing attention" or "new families this week" **count chip** (from existing fixture flags) linking to the filtered Families/Students surface.
3. **Update existing cards instead of new ones?** Yes — prefer wiring existing affordances (and the shared session drawer's family context) over adding cards.
4. **"Students needing attention" if fixture-backed?** Yes, as one calm count chip (icon+label) — not a new stat wall.
5. **"New families/students" if fixture-backed?** Optional, same minimal treatment; only if a fixture backs it.
6. **Link to Families/Students pages?** Yes — a deep-link from an existing affordance to `families.html` / `students.html`.
7. **Deferred until later specs?** Real attendance/finance/credits signals, real "at-risk" detection, and any portal/role-dashboard — all deferred. **No fake/unbacked finance/payment widget; no new stat wall.**

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An admin can, from the Families page, identify each family's guardian, its grouped children, and counts at a glance, and filter/search to a family — the family↔student relationship is unmistakable (not a buried table).
- **SC-002**: An admin can open a family profile and a student academic profile (each a complete baked tabbed page) and answer: which students belong to the family, what courses/groups, the academic status, upcoming sessions, and whether results/evaluations exist.
- **SC-003**: The Add-Family wizard steps through with Next/Back (baked steps, JS toggles visibility), every field labeled, Save = demo toast — **zero** persistence.
- **SC-004**: 100% of the required screenshot matrix is captured and judged to match the approved direction and improve on the reference; **zero** screenshots trigger a failure condition (notably: not a generic CRM, not a spreadsheet, family↔student relationship present, profile/detail present, strong filters, no dead actions, good dark mode, correct RTL/LTR).
- **SC-005**: Result and Evaluation appear as fixture-only in-profile tabs (progress/certificates + the rubric); a reviewer confirms they read as demo/fixture data (no live grade/evaluation engine claim).
- **SC-006**: **100%** of interactive controls are functional / navigational / overlay / filter / tab-or-step / disabled-with-reason (no dead buttons); **zero** raw i18n keys; **zero** external requests; status/attention never color-only.
- **SC-007**: Every surface renders correctly in all 6 combinations of {Arabic RTL, English LTR} × {Light, Dark, System} and at representative mobile/tablet/desktop widths, with no horizontal overflow.
- **SC-008**: Automated accessibility scans report **zero critical violations**; every surface is keyboard-operable with visible focus.
- **SC-009**: Each new page is a complete static HTML file in `public/` with **zero external requests** and no whole-page JS mount; the nav promotes `families`/`addFamily` with the build-guard satisfied and **no dead links**; profiles map cleanly to Django.
- **SC-010**: The dashboard impact is minimal + fixture-backed (deep-links + shared drawer + at most one count); a reviewer confirms **no new stat wall and no fake/unbacked widget**.
- **SC-011**: A reviewer unfamiliar with the project, shown the families/students surfaces beside Spec 001/002/003, confirms they belong to the same product (no drift) and resemble the analyzed system's idea without copying its visuals.

---

## Visual Acceptance *(mandatory for this spec)*

Automated tests are required but insufficient. Final acceptance REQUIRES a screenshot review visibly matching the Spec 001/002/003 approved direction. Required matrix (minimum) — naming `{page}__{lang}__{theme}__{viewport}[__{variant}].png`, verdicts appended to `app/screenshots/REVIEW.md`:

1. Families — **Arabic RTL, Light, Desktop**
2. Families — **Arabic RTL, Dark, Desktop**
3. Families — **English LTR, Light, Desktop**
4. Family profile — **Arabic RTL, Light, Desktop**
5. Add/Edit family wizard — **Arabic RTL, Light, Desktop** (a step variant, e.g. `__wizard-step3`)
6. Students — **Arabic RTL, Light, Desktop**
7. Students — **Arabic RTL, Dark, Desktop**
8. Student academic profile — **Arabic RTL, Light, Desktop**
9. Student **Results** tab — Arabic RTL, Light (if surfaced)
10. Student **Evaluation** tab — Arabic RTL, Light (if surfaced)
11. **Dashboard** family/student impact — Arabic RTL, Light (if added)
12. **Mobile** Families page — Arabic RTL, Light
13. **Mobile** Student profile — Arabic RTL, Light

Reviewed against: the Spec 001 approved dashboard direction, the Spec 002 admin operations + Spec 003 timetable direction, the sidebar/topbar reference, and the old academy family/student screenshots **as product/UX reference only (not visual copy)**.

**A review FAILS if any of the following are true:** looks like a generic CRM; looks like a plain spreadsheet only; missing the family↔student relationship; missing the profile/detail experience; missing search/filters; missing demo/disabled action behavior; missing the result/evaluation decision; missing the timetable-linkage decision; the Dashboard Impact Review is missing; dead links/actions; copied legacy visuals/assets/colors/classes; raw i18n keys; poor dark mode; broken RTL/LTR; JS-rendered whole page; cannot deploy to GitHub Pages; hard to convert to Django templates; or it does not visibly reflect the inspected reference system.

---

## Constraints & Non-Negotiables *(mandatory for this spec)*

**Must continue (from Spec 001/002/003):** static HTML-first delivery to `public/`; per-language pre-rendered pages; relative + local assets; compiled Tailwind/PostCSS CSS; native ES-module JS that **only enhances** existing markup (tabs/steps/overlays/filters); self-hosted fonts/icons; GitHub-Pages compatible; Django-template-ready; the established `data-*` hook vocabulary; the unchanged category-rail shell + topbar; the single status maps; screenshot-based visual acceptance; Arabic RTL first + English LTR; Light/Dark/System.

**Must NOT use:** chart/table/form/calendar libraries; SPA framework; TypeScript; CDN; backend API; database; real auth; real permission enforcement; real CRUD/persistence; real enrollment/grade/evaluation/attendance/finance engines; legacy widget libraries; any copied legacy assets/classes/Bootstrap/logo/palette/icons/private wording; or a JS-rendered whole-page mount.

**Must NOT include (product scope):** real billing/invoices/credits workflow; the legacy feedback-meeting workflow; a full Groups module; student/teacher/family dashboards or portals (these stay `future-role`, never rendered).

---

## Anticipated Contracts *(for the later plan)*

The `/speckit.plan` step is expected to produce, at minimum:

- `families-page-contract.md` — the families directory (family cards grouping children, summary, filters, states).
- `family-profile-contract.md` — the family profile hub (banner + tabbed sections, children linkage, billing stub, actions).
- `family-form-contract.md` — the baked Add/Edit-family wizard (steps, step-toggle, labeled fields, demo save, Django mapping).
- `students-page-contract.md` — the enriched students directory (family link + facet + profile link, kept drawer).
- `student-profile-contract.md` — the student academic profile (banner + tabs: courses/timetable/results/evaluation/family/notes).
- `student-result-contract.md` — the fixture-only results/progress + certificates surface.
- `student-evaluation-contract.md` — the fixture-only monthly progress-report rubric.
- `family-student-navigation-contract.md` — NI12 promotions (`families`/`addFamily`), profile-page registration + active state, timetable deep-links, no-dead-link + portal rules.
- `dashboard-impact-contract.md` — the minimal fixture-backed family/student dashboard impact.
- `static-html-django-ready-contract.md` — SSG for lists/profiles/tabs/wizard-steps/templates, per-language pages, relative paths, GitHub Pages, Django `{% for %}`/`{% if %}` mapping.
- `screenshot-acceptance.md` — the matrix + failure conditions above.
- `scope-guard.md` — the in/out scope + forbidden list above (fixtures only; no engines; no portals; admin-only; no library; no legacy copy).

---

## Assumptions

- **Pages added** = `families.html` + `add-family.html` (NI12 promotions of `families`/`addFamily`) + the new profile templates `family.html` + `student.html` (registered pages reached via links, `activeId` keeping families/students active), plus the enriched `students.html` — each with `.en`. `familyCategories`/`groups`/`scheduleSearch`/`studentResult`/`studentEvaluation` **stay planned** (no dead links).
- **Reuse over reinvention**: the experience composes existing components (`pageHeader`/`summaryCards`, `filterBar`, `dataTable`, `cardGrid`/`directoryCard`/`statMini`, `previewTemplate`/`sheetRow`, `tabs`, `scheduleAgenda`, `appointmentTemplate` (already has `familyKey`), `status-chip`/`chip`, `states`, `ui`) + the `enhance.js` behaviors. **Genuinely new**: the Family fixture/entity, the families page, the family + student **profile pages** (the codebase's first profile-page pattern), the **baked Add-Family wizard** (no form component exists), the **evaluation rubric** + results surfaces, and their fixtures/i18n namespaces.
- **Detail model (D2)**: quick peek = drawer (reuse); full profile = a dedicated baked tabbed page (one representative template per entity; Django → per-id).
- **Result/Evaluation (D5)**: fixture-only in-profile tabs grounded in the reference's progress-report rubric + certificates — **not** a fabricated gradebook; nav `studentResult`/`studentEvaluation` stay planned.
- **Wizard (D4)**: baked steps + JS visibility toggle (no form library); save = demo toast; no persistence.
- **Fixtures are original placeholder content** extending the existing `data.stud.*` names/guardians; no legacy/private wording, names, or assets.
- **Language model** continues Spec 001/002/003: per-language pre-rendered pages with a navigating toggle; profile tabs/wizard steps persist client-side (+ URL hash) only.
- **No constitution constraints yet**: the project constitution is an unfilled template; if ratified later, re-check this spec against it.
- **Git**: per the established project pattern, Spec 004 continues on branch `feature/001-approved-dashboard-design` (specs 001–003 are committed there); the spec directory name is independent of the branch, and nothing is committed by this command.
