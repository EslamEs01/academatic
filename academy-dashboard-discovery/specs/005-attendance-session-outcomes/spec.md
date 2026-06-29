# Feature Specification: Attendance and Session Outcomes

**Feature Branch**: `feature/001-approved-dashboard-design` (continues; spec dir is independent)
**Spec Directory**: `005-attendance-session-outcomes`
**Created**: 2026-06-29
**Status**: Draft
**Input**: User description: "Attendance and Session Outcomes — the admin-facing experience for reviewing sessions after they happen: understanding attendance outcomes, identifying absences / cancellations / reschedules, and following up on students / families / teachers — visually and clearly. Grounded in the analyzed old academy system as product/UX reference, but cleaner, calmer, more premium, more modern. Frontend-only, fixtures only; no real attendance engine, no persistence."

---

## Context & Design Grounding *(mandatory for this spec)*

This spec **extends Spec 001/002/003/004** (implemented in `academy-dashboard-discovery/app/`). It is grounded in inspected artifacts (current code, binding contracts, approved references, and the old-system analysis + screenshots), not invented.

### Foundation this builds on (Spec 001/002/003/004)

- **Static, HTML-first** site: `scripts/build-html.mjs` pre-renders each page to a complete static file in `app/public/` (Arabic default + English `*.en.html`); `src/js/enhance.js` only enhances baked markup via `data-*` hooks. Verified green (build / smoke / axe 0-0 / screenshot review).
- **Category-rail shell** (`sidebar-reference.png`): six category tabs; the **`control` category** (لوحة التحكم) owns daily operations — `home`/`sessions`/`schedule` are **implemented** (`dashboard.html`/`sessions.html`/`schedule.html`); `sessionsAnalysis` and others are **planned** (Soon buttons, no route). The build-time guard makes dead links impossible.
- **Spec 003 scheduling stack** (reuse, don't reinvent): the **session/status map** (`status-map.js`: `live/upcoming/completed/cancelled` → tone+icon+label), `scheduleAgenda` (single-day session list), the **shared `appointmentTemplate` drawer** (`<template data-preview>` engine; progressive disclosure status→people→logistics→notes/attention→**actions** edit/notify/cancel-confirm; **already renders a `familyKey` row**), the `tabs` widget, the **fixture-only `attentionFlag`** (icon+label), and the `data-*` vocabulary. The session fixtures (`SESSIONS_FULL` ≥10 rows: `statusId`, `present`/`capacity`, `trainer.id`, `subject`, `familyKey`, `attention`, `dateKey`; `SCHEDULE_WEEK` blocks) already carry the participant + attention data outcomes need.
- **Spec 004 family/student stack** (reuse): real `familyId` ↔ `Family.studentIds[]`; the **student academic profile** (`student.html`, tabbed) and **family profile** (`family.html`, tabbed); the **labeled lifecycle status map** (`family-status.js`, never numeric/color-only); the minimal fixture-backed **dashboard people-signal** card pattern; `filterBar`, `dataTable`, `cardGrid`, `chip`, `states`, `confirmAction`, `toast`, `previewTemplate`/`sheetRow`.
- **Established `enhance.js` behaviors** (all reused, no new runtime engine): client-side filtering of pre-rendered rows/cards, the preview/appointment drawer, the confirm-modal, demo actions, disabled-with-reason, toasts, tab switching.

### Old academy system (PRODUCT/UX reference ONLY — never a visual copy)

Confirmed in `output/combined/{page,table,form,modal,interaction}-inventory.md`, `frontend-planning-deep/{02-all-pages-expanded-inventory,03-visual-patterns,06-complete-data-surface,11-interactions-states-v2}.md`, and the session/attendance screenshots:

- **Session outcome lifecycle** — the reference themed a color per status across **~11 session statuses**: `pending`, `waiting`, `running`, `attend` (attended), `student-absent`, `teacher-absent`, `teacher-cancel`, `student-cancel`, `admin-cancel`, `trial`. Daily filtering used **opaque numeric URL codes** (`status=1`, `2,10`, `3,4`, `5,6,7`, `8`) — a documented weakness. The accounting/session surfaces used **named** statuses (`attend`/`student-absent`/`teacher-absent`).
- **The canonical session-action family** (the reference's best idea) — ONE shared SessionActionPanel reused on **20+ pages** (Home, Session detail, Session Room, Course detail): **Mark as Attend**, **Mark as Absent** (a single modal with a **"Who is absent?" → student/teacher** select that maps to the distinct statuses), **Cancel Class** (a **"Who wants to cancel?" → teacher/student/admin** select), **Edit Class**, **Reschedule** (a make-up *tab*, not a separate status), **Send WhatsApp**, **Add Feedback**, **Add Quick Queue**, **Send Notification**, **Reverse** (un-mark). Actions were **status-gated** (Pending/Waiting → Attend/Cancel/Absent/Edit; Attended → Reverse/Feedback/WhatsApp; Cancelled/Absent → Reverse/Make-up).
- **Mark Attend** was a **session-level** modal (remark · summary · homework · notes · images) — NOT a per-student roster checklist; group sessions carry one attend outcome. **Mark Absent / Cancel** captured *who* + reason + a **notify choice** (Don't send / Default / Custom) + a **make-up decision** (No Make-up / Auto Make-up / Reschedule / **Add to Credit**) + dual-timezone — all in one tall, field-dense modal.
- **Make-up & credit** were decided *at the moment of absence/cancellation* (embedded tabs), with policy defaults in settings; outcomes fed **finance** (the accounting session ledger; "salaries are attendance-driven"). Teacher "compensations" (fines/bonuses) are a separate concept.
- **Pages**: **Home / "Classes Of {date}"** (the daily ops board — 7 clickable KPI status tiles `Total/Pending/Attend/Waiting&Running/Cancel/Absent/Trials` + a today's-classes table + filters), **Sessions Analysis** (read-only count+hours KPIs grouped Regular/Trial/Helper), **Session Room** (a date-scoped class board), **Session detail** (a status state-machine page with enter-time tracking + direct links + a queue), **Teachers Details** (cross-teacher Cancel/Absent/Attend counts), **Class Feedback**, and finance roll-ups.
- **Today's-classes table columns**: `#`, `Class Time`, `Student/Group Name`, `Teacher Name`, `Course Details`, `Left hours`, `Class Status`, `Actions`. Filters: `date_range`, `from_time`/`to_time`, `teacher_id`, `family_id`, `student_id`, `type`, `status`.
- **Follow-up**: Send WhatsApp (teacher/student), Send Notification, Add Feedback (note + files), Add Quick Queue (urgent/medium/normal); teacher absence attached a **proof video**; sessions tracked **enter times** (Student Enter At / Teacher Enter At / Remind Teacher At). The monthly **Send Report** rubric is the same one Spec 004 already surfaces as the student Evaluation tab.
- **Documented weaknesses to improve**: numeric/opaque status codes with ad-hoc colors; ~178 route templates / ~230 variant URLs (a destination per status/scope/sort/date); 3–6 colored inline action pills per row; **53–66 buttons per page** (Home 66, session room 64, detail 53–55); tall, field-dense modals; hidden/collapsed filters; dense wide tables (a 23-column roll-up) with no responsive story; bare "Loading…" / no skeletons; broken pages shipped; **RTL never exercised**.

### What is reused as product/UX concept

The **daily session-outcomes board** (Home's "Classes Of {date}"); the **labeled status set** (attended / student-absent / teacher-absent / cancelled / rescheduled / upcoming / live); **status as a clickable summary tile/filter**; the **ONE canonical session-action family** reused everywhere (a single shared outcome drawer); **status-gated actions**; **"who is absent / who cancels" attribution**; outcome captured with context (notes/follow-up); the **make-up/credit decision** as a calm display hint; **notify choice** on an outcome; **follow-up queue** for sessions needing attention; the **session ↔ student ↔ family ↔ schedule** linkage.

### What is improved beyond the reference

**Labeled, AA-contrast outcome chips** (icon + text, never numeric/color-only) replacing `status=1..8`; **ONE stateful filtered Attendance page** instead of a route-per-status wall; **ONE shared outcome drawer** (extending the Spec 003 appointment drawer) instead of the modal set duplicated on 20+ pages; a **single calm row-action menu** instead of 3–6 inline pills; **calm demo confirms** instead of 13-control field-dense modals; a **persistent filter bar + active chips** instead of hidden filters; an **airy list/card hybrid** that reflows to mobile instead of a 23-column table; **Arabic RTL first**; and **honest demo-only actions** (no fake persistence, no finance/credit engine).

### What MUST NOT be copied (hard constraint)

Old logo/assets/favicon; legacy colors (purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`); Bootstrap/old CSS classes; old icon sets; legacy widget libraries; the numeric `status=0..N` codes; the tall multi-tab absent/cancel modals ported verbatim; the finance/credit/salary engines; private academy wording/names/data; any pixel-for-pixel legacy layout. The old system informs **structure/UX only**.

### Missing references

None. All current app files, Spec 001–004 contracts, approved references, and the old-system attendance/session/outcome inventories + screenshots named in the request were located and inspected (the reference is single-branch and English-only — no branch filter and no RTL exist in the legacy, both noted, not guessed).

---

## Design Decisions *(mandatory — resolve known tensions up front)*

**D1 — Add a dedicated Attendance page `attendance.html` (a NEW `control`-category nav item, NI12-promoted).** The reference's daily outcomes board is "Home / Classes Of {date}", which lives in daily operations beside Sessions and Schedule. The app has **no** attendance nav item, and `sessionsAnalysis` is a distinct **analytics** roll-up (count+hours) — it stays **planned**. So Spec 005 introduces a new `attendance` item (**الحضور / Attendance**) in the **`control` category**, promoted to `implemented` + `attendance.html` (route added to `FUTURE_ROUTES` at promotion, exactly as `addFamily` was in Spec 004). No dead links; the build-time guard must pass.

**D2 — A NEW labeled OUTCOME status map (collapsing the legacy 11-state + numeric codes).** A calm display set — `upcoming · live · completed · studentAbsent · teacherAbsent · cancelled · rescheduled` (+ display flags `makeup` and `needsFollowUp`) — rendered via the generic `chip` as **icon + text, never numeric/color-only**. The legacy **three cancel reasons** (teacher/student/admin) and **two absent parties** (student/teacher) are collapsed: *student-absent* and *teacher-absent* are distinct **statuses** (the spec's required distinction), while *who cancelled* is shown as an **attribution attribute inside the drawer**, not three statuses. This is a third vocabulary, distinct from the Spec 001/003 **session** status map (kept for scheduling views) and the Spec 004 **lifecycle** map. **No real 11-state engine** is imported.

**D3 — Outcome details = the SHARED drawer, extended (one canonical surface).** Reuse the `<template data-preview>` engine and the `appointmentTemplate` shape, adding an **outcome section** (outcome chip + who-absent/who-cancelled attribution + attendance summary `present/capacity` + a make-up/credit **display hint** + a follow-up hint + enter-time hints) and an **outcome action cluster**. This realizes the reference's best idea (one session-action family reused everywhere) as ONE drawer, opened from the Attendance page, the Sessions page, and profile schedule sections — no per-page modal duplication.

**D4 — All outcome actions are DEMO-only, honest, and status-aware.** Mark attend · mark **student** absent · mark **teacher** absent · cancel · reschedule · notify (WhatsApp/notification) · add feedback note · make-up suggestion · confirm outcome · reverse — each is a **demo toast**, a **confirmation modal → demo toast** (destructive: cancel / reschedule / mark-absent), or **disabled-with-reason**. Actions are **status-gated** (shown only when sensible for the row's outcome). The legacy 13-control modals are NOT reproduced — actions live in the calm drawer + small confirm modals. **No real save / status mutation / persistence / notification / reschedule / credit.**

**D5 — Make-up / credit = a fixture display hint only, no engine.** Grounded (the reference decided make-up/credit at the moment of absence/cancellation). Spec 005 shows a calm **"make-up suggested" / "added to credit (demo)"** hint in the outcome drawer (display-only), with the real action **disabled-with-reason** ("Requires the finance/credit module — out of scope"). **No finance/payment/credit/accounting engine.**

**D6 — Sessions page integration (light, reuse).** `sessions.html` rows gain an **outcome chip** (from the D2 map) + the row "view" opens the **shared outcome drawer** (D3) + a **"View attendance"** deep-link to `attendance.html`. No new lifecycle, no real mutation. The existing List/Timetable tabs and the existing structure are kept.

**D7 — Student/Family profile integration (light, fixture-only).** The **student profile** gains a calm **recent-outcomes / attendance hint** (a small fixture summary — e.g. "attended 6 of last 8 · 1 absence to follow up" — inside the existing Timetable/Overview area) + a **"View attendance"** deep-link; the **family profile** gains a children **follow-up hint** (fixture) + a deep-link. **No attendance engine, no new tabs required.**

**D8 — Dashboard impact stays minimal + fixture-backed.** Reuse the established pattern: at most **one** small fixture-backed signal — a **"sessions needing follow-up / absences today"** count chip + a deep-link to `attendance.html` — and let the existing **Today's Sessions** rows carry an outcome chip + open the shared drawer. **No new stat wall, no fake finance/credit widget, no real attendance metrics.**

---

## Scope *(mandatory for this spec)*

### In Scope (Spec 005)

A focused, frontend-only **admin Attendance & Session Outcomes experience**, reusing the Spec 001–004 shell, tokens, components, and `data-*` vocabulary, fixtures only:

1. **Attendance / Outcomes page** (`attendance.html` + `.en`) — page header + **outcome summary tiles** (total / attended / absent / cancelled-or-rescheduled / needs-follow-up) + a **filter bar** (date/day, teacher, student/family, course/subject, outcome status, attention) + an **airy list/card hybrid** of session-outcome rows (time · session · teacher · student/family · course · outcome chip · attention/follow-up flag · row-action menu) + empty/no-results/loading/error states; mobile reflow to cards.
2. **Outcome status vocabulary** — the new labeled OUTCOME map (D2) as a shared component, AA-contrast, AR/EN, never color-only.
3. **Outcome details drawer** (D3) — the shared `<template data-preview>` outcome drawer (status + people + attendance summary + who-absent/who-cancelled + make-up/credit hint + follow-up + notes + actions).
4. **Demo outcome actions** (D4) — attend / student-absent / teacher-absent / cancel / reschedule / notify / feedback / make-up-suggestion / reverse, each demo / confirm→demo / disabled-with-reason.
5. **Session-outcome fixture** — a new fixture (a set of past/today sessions, each with an outcome + attribution + make-up/follow-up flags), reusing the existing session/participant shape and resolving to real `Student`/`Family`/teacher refs.
6. **Student / family / teacher links** — outcome rows and the drawer link to `student.html`, `family.html`, and the schedule (`schedule.html#view=timetable`).
7. **Make-up / credit display-only hint** (D5).
8. **Sessions page integration** (D6) — outcome chip + shared drawer + deep-link.
9. **Student profile integration** (D7) — recent-outcomes/attendance hint + deep-link.
10. **Family profile integration** (D7) — children follow-up hint + deep-link.
11. **Minimal dashboard impact** (D8).
12. **Navigation reconciliation** — promote the new `attendance` item; the rest of the `control` category stays planned; no dead links; no portals.
13. **Shared components/patterns** for the outcome tiles, outcome rows, the outcome drawer, and the outcome status map.

Plus, preserved end-to-end: per-language pages, RTL/LTR, Light/Dark/System, accessibility (axe critical=0), responsiveness, no-dead-button / no-raw-i18n-key / no-external-request guarantees, static / GitHub-Pages / Django-ready delivery, and screenshot acceptance.

### Out of Scope (Spec 005)

Backend API; database; real auth; real permission enforcement; **real create/edit/delete persistence**; **real attendance engine / outcome workflow engine**; **real mark-attend / mark-absent / cancel / reschedule save**; **real status mutation**; real notifications backend; real WhatsApp/Zoom/live integration; **real make-up scheduling engine**; **real credit/payment/accounting engine**; real attendance reports / teacher-performance engine; the legacy 11-state backend lifecycle as a real engine; the legacy enter-time/queue/proof-video workflows (referenced as concepts only — shown as calm display hints at most); **Sessions Analysis** as a built page (stays planned); the finance session-ledger/salary roll-ups; **student/teacher/family dashboards or portals**; chart/table/form/calendar libraries; CDN; TypeScript; SPA framework; and any copied legacy assets/classes/logo/palette/icons/private wording.

> Role dashboards and portals remain `future-role` (never rendered). When specified later they must feel comfortable, cheerful, simple, and human — not this admin UI.

### MVP slice (and why)

The MVP is **US1 (Attendance page) + US3 (Outcome drawer) + US4 (absence-type distinction)** — the daily session-outcomes board with a shared outcome drawer that makes student-absent vs teacher-absent vs cancelled vs rescheduled unmistakable. This proves the "session outcome management" feel and establishes the outcome status map + shared drawer that filters (US2), demo actions (US5), follow-up links (US6), and the profile/dashboard integrations (US7–US9) reuse. Each surface is independently testable, sequenced by dependency/value.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin reviews attendance / outcomes (Priority: P1)

As an academy administrator, I open the Attendance page and see, in one calm place, which of today's/recent sessions were attended, which had a student or teacher absent, which were cancelled or rescheduled, and which need follow-up.

**Why this priority**: This is the entry point and proves the daily session-outcomes board — the core ask.

**Independent Test**: Open Attendance; read the outcome summary tiles + the list/card hybrid of session-outcome rows (time · session · teacher · student/family · outcome chip + flag); confirm it is not a generic spreadsheet.

**Acceptance Scenarios**:

1. **Given** the Attendance page, **When** it renders, **Then** it shows a page header + outcome summary tiles + a filter bar + a list/card hybrid of session-outcome rows, each with a **labeled outcome chip** (icon + text), a teacher, a student/family, a course, and an attention/follow-up flag where applicable — not a numeric/color-only status dump.
2. **Given** a session-outcome row, **When** it is reviewed, **Then** the outcome (attended / student-absent / teacher-absent / cancelled / rescheduled / upcoming / live) is unmistakable from the chip's icon + label, never color alone.

---

### User Story 2 - Admin filters outcomes (Priority: P1)

As an administrator, I filter the outcomes by day, teacher, student/family, course/subject, outcome status, and attention to find exactly the sessions I care about.

**Independent Test**: Apply each filter; confirm pre-rendered rows show/hide with active-filter feedback + a count + a no-results/reset state; never a dead control.

**Acceptance Scenarios**:

1. **Given** the filter bar, **When** the admin filters by outcome status (e.g. "student absent") or teacher/family, **Then** matching pre-rendered rows show/hide with visible feedback + a result count + a "no results" + reset state.
2. **Given** a summary tile, **When** clicked, **Then** it applies the corresponding outcome filter (clickable status tile = filter) — never a dead control.

---

### User Story 3 - Admin opens outcome details (Priority: P1)

As an administrator, I open a session-outcome drawer showing the status, participants, attendance summary, who was absent / who cancelled, follow-up, notes, and the available actions.

**Independent Test**: Open an outcome row → the shared drawer shows the outcome chip + teacher + student/family + present/capacity + attribution + make-up/follow-up hint + notes + actions.

**Acceptance Scenarios**:

1. **Given** an outcome row, **When** opened, **Then** the **shared** `<template data-preview>` drawer shows the outcome status, the people (teacher + student/family, with the family context row), the attendance summary, the who-absent/who-cancelled attribution, a make-up/credit display hint, a follow-up hint, notes, and an action cluster.
2. **Given** the drawer, **When** reviewed, **Then** it is the same shared drawer used by Sessions/Schedule (one canonical surface), not a bespoke per-page modal.

---

### User Story 4 - Admin distinguishes absence types (Priority: P1)

As an administrator, I can immediately tell a **student** absence from a **teacher** absence, and both from a cancellation or a reschedule.

**Independent Test**: On the list and in the drawer, confirm `studentAbsent`, `teacherAbsent`, `cancelled`, and `rescheduled` are visually + textually distinct (distinct chips + the drawer's "who" attribution).

**Acceptance Scenarios**:

1. **Given** a student-absent and a teacher-absent outcome, **When** compared, **Then** their chips carry distinct icons + labels and the drawer states who was absent.
2. **Given** a cancelled and a rescheduled outcome, **When** compared, **Then** the chip + the drawer's attribution (who cancelled / new time hint) distinguish them.

---

### User Story 5 - Admin performs demo outcome actions (Priority: P2)

As an administrator, I click attend / mark-absent / cancel / reschedule / notify / feedback actions and receive honest demo / confirm / disabled feedback — nothing is really saved.

**Independent Test**: From the drawer (or row menu), trigger each action; confirm a demo toast, a confirmation-modal→toast (destructive), or a disabled-with-reason — never a dead control, never a real mutation.

**Acceptance Scenarios**:

1. **Given** a session in an actionable state, **When** "Mark attend" / "Notify family" is used, **Then** a clearly-labeled **demo** toast appears; nothing persists.
2. **Given** a destructive action (cancel / reschedule / mark-absent), **When** used, **Then** a confirmation modal appears, and confirming shows a demo toast — no real status change.
3. **Given** a backend-bound action (real save / real notify / add-to-credit), **When** present, **Then** it is **disabled-with-reason**.

---

### User Story 6 - Admin follows up with family / student (Priority: P2)

As an administrator, I move from an outcome to the student profile, the family profile, or the schedule context without dead links.

**Independent Test**: From a row or the drawer, use the student / family / "view in schedule" links → land on `student.html` / `family.html` / `schedule.html#view=timetable`.

**Acceptance Scenarios**:

1. **Given** an outcome with a student/family, **When** the link is used, **Then** it navigates to the student or family profile (language-aware).
2. **Given** an outcome, **When** "view in schedule" is used, **Then** it deep-links to the Timetable view — no dead link.

---

### User Story 7 - Student profile reflects outcomes (Priority: P2)

As an administrator, on a student's academic profile I see a calm, fixture-only recent-attendance/outcome hint and a link to the Attendance page.

**Independent Test**: On `student.html`, confirm a fixture recent-outcomes/attendance hint + a "View attendance" deep-link; no attendance engine claim.

**Acceptance Scenarios**:

1. **Given** a student profile, **When** reviewed, **Then** it shows a calm fixture attendance/outcome summary (e.g. attended N of M · a follow-up hint) + a deep-link; clearly demo/fixture, not a live metric.

---

### User Story 8 - Family profile reflects outcomes (Priority: P2)

As an administrator, on a family profile I see a calm, fixture-only children follow-up hint and a link to Attendance / a child's profile.

**Independent Test**: On `family.html`, confirm a fixture children follow-up hint + a deep-link.

**Acceptance Scenarios**:

1. **Given** a family profile, **When** reviewed, **Then** it shows a calm fixture follow-up hint for the family's children + a deep-link; no finance/credit claim.

---

### User Story 9 - Dashboard reflects outcomes minimally (Priority: P2)

As an administrator, the dashboard gains at most one useful, fixture-backed outcome signal — a "needs follow-up / absences today" count + a deep-link — without new clutter.

**Independent Test**: On the dashboard, confirm one fixture-backed outcome count chip + a deep-link to Attendance, and that the Today's Sessions rows can carry an outcome chip / open the shared drawer; confirm no new stat wall.

**Acceptance Scenarios**:

1. **Given** the dashboard, **When** reviewed, **Then** any added outcome element is backed by an existing fixture and links to the in-scope Attendance page.
2. **Given** the dashboard, **When** reviewed, **Then** no fake/unbacked finance/credit widget and no new stat wall were added.

---

### User Story 10 - Static / Django-ready delivery (Priority: P1)

As a developer, every attendance/outcomes surface (the page, rows, summary tiles, the outcome drawer templates, confirmation modals) is real baked HTML in `public/`, deployable to GitHub Pages and convertible to Django templates; JS only filters, opens overlays, switches sections, and shows demo/disabled feedback.

**Independent Test**: Build; View Source on `attendance.html` — full shell + tiles + filter bar + all outcome rows + every `<template data-preview>` outcome drawer as real markup, relative paths, no `#app`; no external requests.

**Acceptance Scenarios**:

1. **Given** a built page, **When** its source is viewed, **Then** all rows, summary tiles, and `<template data-preview>` outcome drawers are complete static HTML (no whole-page `#app`, no JS-built page DOM) with relative `./assets/` paths.
2. **Given** the site on a static host, **When** a page loads, **Then** zero external (CDN) requests; no chart/table/form/calendar library loaded.
3. **Given** a page, **When** assessed, **Then** it maps cleanly to Django (`{% for outcome %}`, the shared drawer → an `{% include %}` partial, status map → a template tag, `data-*` hooks).

---

### User Story 11 - Visual / reference alignment (Priority: P1)

As a reviewer, the attendance/outcomes experience resembles the analyzed system's product idea (a daily session-outcomes board) but is cleaner, calmer, more premium, academy-specific — and consistent with Spec 001–004; not a generic attendance spreadsheet, not a numeric status dump.

**Independent Test**: Review the attendance surfaces against the approved design + the old-system session/attendance screenshots (product reference only); confirm premium/calm/academy-specific, not legacy copy, not invented.

**Acceptance Scenarios**:

1. **Given** the Attendance surfaces, **When** reviewed, **Then** they use calm labeled outcome chips, airy rows/cards, clickable status tiles, and the approved tokens — recognizably the same product as Spec 001.
2. **Given** any surface, **When** compared to the legacy, **Then** nothing is copied from its visuals/classes/wording/numeric statuses.

---

### Edge Cases

- **Empty / no-results**: distinguish "no sessions for this day yet" (warm empty state) from "no match" (filter no-results + reset) — improving the legacy's bare "No data".
- **Mixed-state day**: a day containing attended + student-absent + teacher-absent + cancelled + rescheduled + upcoming renders all chips legibly without a color collision.
- **Group session attendance**: attendance is a **session-level** outcome (per the reference) — a group session shows one outcome + a present/capacity summary, not a per-student roster engine.
- **Upcoming/live sessions**: a not-yet-held session shows `upcoming`/`live` with no absence attribution; actions are gated accordingly (no "reverse" on an upcoming session).
- **Make-up/credit hint**: shown as display-only; the real make-up/credit action is disabled-with-reason — never implies a real balance.
- **Long content**: long Arabic/English session/teacher/student names truncate/wrap gracefully in rows, tiles, and the drawer in both directions.
- **Loading / error**: skeleton + friendly error+retry states matching the approved patterns (fixing the legacy bare "Loading…").
- **Theme/direction switch**: Light↔Dark↔System re-themes instantly; Arabic↔English navigates to the equivalent page; outcome chips/times/dates never mirror incorrectly.
- **Mobile**: the list/card hybrid reflows to single-column cards; the drawer is full-height; tiles wrap — no horizontal overflow.
- **Disabled-with-reason**: real-save / real-notify / add-to-credit controls are visibly disabled with a stated reason, or a clearly-labeled demo.

---

## Requirements *(mandatory)*

### Functional Requirements — Attendance / Outcomes page

- **FR-001**: The system MUST provide an Attendance page (`attendance.html` + `.en`) presenting a page header + **outcome summary tiles** + a **filter bar** + an **airy list/card hybrid** of session-outcome rows (time · session · teacher · student/family · course · **labeled outcome chip** · attention/follow-up flag · row-action menu) — applied to pre-rendered rows, with empty/no-results/loading/error states; not a plain table, not a numeric status dump.
- **FR-002**: Each outcome row and tile MUST be honest: the row menu opens the shared drawer / demos / disables-with-reason; the student/family/schedule links navigate to in-scope pages; no dead controls.

### Functional Requirements — Outcome status & filters

- **FR-003**: The system MUST resolve session outcomes through a **single labeled OUTCOME status map** (`upcoming / live / completed / studentAbsent / teacherAbsent / cancelled / rescheduled` + display flags `makeup` / `needsFollowUp`) rendered as **icon + text, never numeric or color-only**, AA-contrast, AR/EN — distinct from the session status map and the lifecycle map.
- **FR-004**: The filter bar MUST filter pre-rendered rows by **day/date, teacher, student/family, course/subject, outcome status, and attention** (the facets that are fixture-backed), with active-filter feedback + a result count + a no-results/reset state; **summary tiles MUST act as outcome filters** (clickable status tile). No hidden filters; no dead control.

### Functional Requirements — Outcome details drawer

- **FR-005**: The system MUST open a **shared** session-outcome drawer (extending the Spec 003 `<template data-preview>` appointment drawer) showing: the outcome chip, the people (teacher + student/family with the family-context row), the **attendance summary** (`present/capacity`), the **who-absent / who-cancelled attribution**, a **make-up/credit display hint**, a **follow-up** hint, notes, and an **action cluster** — the same drawer reused by the Sessions page and profile schedule sections (one canonical surface, no per-page modal duplication).

### Functional Requirements — Outcome actions (demo-only)

- **FR-006**: The system MUST offer outcome actions — **mark attend, mark student-absent, mark teacher-absent, cancel, reschedule, notify (WhatsApp/notification), add feedback note, make-up suggestion, reverse** — each as a **demo toast**, a **confirmation modal → demo toast** (destructive: cancel / reschedule / mark-absent), or **disabled-with-reason**; actions MUST be **status-gated** (shown only when sensible). **No real save / status mutation / persistence / notification / reschedule / credit.**
- **FR-007**: Make-up / credit MUST be a **fixture display hint** only; the real make-up/credit action MUST be **disabled-with-reason** ("requires the finance/credit module — out of scope"). **No finance/credit/accounting engine.**

### Functional Requirements — Integrations & linkage

- **FR-008**: The Sessions page MUST gain an **outcome chip** per row + the row "view" MUST open the **shared outcome drawer** + a **"View attendance"** deep-link to `attendance.html`; the existing structure/lifecycle is otherwise unchanged.
- **FR-009**: Outcome rows and the drawer MUST link to `student.html`, `family.html`, and `schedule.html#view=timetable` (language-aware) — no dead links, no duplicated timetable engine.
- **FR-010**: The **student profile** MUST show a calm **fixture-only recent-outcomes/attendance hint** + a "View attendance" deep-link; the **family profile** MUST show a calm **fixture-only children follow-up hint** + a deep-link — clearly demo/fixture, **no attendance engine, no finance claim**.
- **FR-011**: The dashboard impact MUST be **minimal + fixture-backed** — at most one "needs-follow-up / absences-today" count chip + a deep-link to Attendance, with the Today's Sessions rows able to carry an outcome chip / open the shared drawer — **no new stat wall, no fake/unbacked finance/credit widget, no real attendance metrics**.

### Functional Requirements — Navigation, fixtures, architecture

- **FR-012**: The nav MUST promote a new **`attendance`** item (الحضور / Attendance) in the **`control` category** to `implemented` → `attendance.html` (via the NI12 checklist + build-time guard; route added to `FUTURE_ROUTES` at promotion); `sessionsAnalysis` and the rest of the planned items MUST stay `planned` (Soon buttons, no route). **No dead links; no portals/role dashboards rendered.**
- **FR-013**: All displayed data MUST come from a new **session-outcome fixture** (a set of past/today sessions, each with an outcome id, who-absent/who-cancelled attribution, make-up/follow-up flags, and participant refs) reusing the existing session/participant shape and resolving to real `Student`/`Family`/teacher refs — **no real backend, auth, permissions, persistence, or attendance/outcome/finance engine**.
- **FR-014**: Each page MUST be a complete static HTML file in `public/` (real shell + tiles + filter bar + all rows + every `<template data-preview>` outcome drawer; no `<div id="app">`; no runtime JS building page DOM), deployable to GitHub Pages, and structured for clean Django conversion (`{% for outcome %}`, the shared drawer → an `{% include %}` partial, status map → a template tag, `data-*` hooks).
- **FR-015**: Behavior MUST attach via the established **`data-*` hook vocabulary** (`data-filter-form`/`data-filter`/`data-target`, `data-table`/`data-row` + facets, `data-row-menu`, `data-drawer`/`data-preview`/`data-sheet-close`, `data-modal-trigger`/`data-confirm`, `data-demo-action`, `data-disabled-reason`/`data-reason-key`, `data-toast`, and the Spec 003 tabs hooks where reused) — reused, stable, Django-reproducible; no invented hooks, no JS-generated ids/classes.

### Functional Requirements — Cross-cutting Quality

- **FR-016**: Every surface MUST render correctly in Arabic RTL and English LTR (mirroring layout, never numbers/dates/times) and in Light, Dark, and System themes.
- **FR-017**: Every surface MUST be responsive (list/card hybrid → single-column cards; tiles wrap; drawer full-height on mobile) without horizontal overflow.
- **FR-018**: Every control MUST satisfy the **no-dead-button** rule (demo / in-scope navigation / overlay / filter / disabled-with-reason); there MUST be **no raw i18n keys** and **zero external/CDN requests**; outcome status/attention is **never color-only**.
- **FR-019**: Every surface MUST be keyboard operable with visible focus and meet WCAG AA, verified by an automated accessibility scan reporting **no critical violations**.
- **FR-020**: Acceptance MUST include a **screenshot review** of the matrix below, visibly matching the Spec 001–004 approved direction and improving on the legacy reference.

### Key Entities *(display fixtures only — no persistence, no API)*

- **SessionOutcome (fixture)** — id, the underlying session ref (titleKey, levelKey/subject, trainer{nameKey,accent,id}, roomKey, dateKey, time/duration), **outcomeId** (upcoming/live/completed/studentAbsent/teacherAbsent/cancelled/rescheduled), `present`/`capacity`, `familyId` + `studentId` refs, **attribution** (`absentBy?` student/teacher, `cancelBy?` teacher/student/admin), **makeup?** (none/auto/reschedule/credit — display hint), **followUp?** (needs-attention flag), `rescheduleHint?` (new-time display), `notesKey?`, `feedbackKey?`. Container `SESSION_OUTCOMES = { rows: [...] }` (≥12, spanning every outcome state) + facets (`data-outcome`, `data-teacher`, `data-family`, `data-day`, `data-subject`, `data-attention`).
- **Outcome Status (fixture map)** — id → tone + icon + label (the new labeled OUTCOME vocabulary; never numeric/color-only).
- **OutcomeSummary (display-only)** — derived counts for the summary tiles (total / attended / absent / cancelled-or-rescheduled / needs-follow-up) and the dashboard signal; derived from the fixture, no engine.
- **Make-up/Credit hint (display-only)** — a calm fixture flag; no balance, no finance.
- **Filter State (display-only)** — selected day/teacher/student-family/subject/outcome/attention facets → active chips; no server contract.

---

## Dashboard Impact Review *(mandatory for this spec)*

1. **Does attendance/outcome affect the dashboard?** Lightly — the dashboard already surfaces Today's Sessions; the impact is wiring + at most one small fixture count.
2. **Sessions needing follow-up?** Yes, as **one** calm fixture-backed count chip (icon + label) linking to the filtered Attendance surface.
3. **Absences today?** Folded into the same single signal (e.g. "N need follow-up today"), not a separate widget — to avoid a stat wall.
4. **Cancelled/rescheduled count?** Optional, same minimal treatment; only if a fixture backs it; never a new tile row.
5. **Update existing Today's Sessions instead of new widgets?** Yes — the Today's Sessions rows may carry an **outcome chip** and open the **shared outcome drawer** (reuse, not a new card).
6. **Link to Attendance?** Yes — a deep-link from an existing affordance (and the one count chip) to `attendance.html`.
7. **Deferred until later specs?** Real attendance metrics, real at-risk detection, finance/credit/salary signals, Sessions-Analysis count+hours roll-ups, and any portal/role dashboard — all deferred. **No fake/unbacked finance/credit widget; no new stat wall; no real attendance metrics.**

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An admin can, from the Attendance page, identify each session's outcome (attended / student-absent / teacher-absent / cancelled / rescheduled / upcoming / live) at a glance and filter/search to the sessions needing attention — outcomes are labeled (icon + text), never numeric/color-only.
- **SC-002**: An admin can distinguish a **student** absence from a **teacher** absence and from a cancellation/reschedule, on the list and in the drawer (the spec's required distinction).
- **SC-003**: An admin can open any outcome in the **shared** drawer and see status + people + attendance summary + who-absent/who-cancelled + make-up/follow-up hint + notes + actions; the same drawer is used across Attendance/Sessions.
- **SC-004**: 100% of the required screenshot matrix is captured and judged to match the approved direction and improve on the reference; **zero** screenshots trigger a failure condition (notably: not a generic attendance spreadsheet, outcome vocabulary present, student-vs-teacher absence distinct, drawer present, good dark mode, correct RTL/LTR).
- **SC-005**: 100% of interactive controls are functional / navigational / overlay / filter / demo / disabled-with-reason (no dead buttons); destructive actions route through a confirmation modal; **zero** raw i18n keys; **zero** external requests; status/attention never color-only.
- **SC-006**: A reviewer confirms every outcome action reads as **demo/fixture** — no claim of real attendance persistence, real notification, real reschedule, or real credit.
- **SC-007**: Every surface renders correctly in all 6 combinations of {Arabic RTL, English LTR} × {Light, Dark, System} and at representative mobile/tablet/desktop widths, with no horizontal overflow.
- **SC-008**: Automated accessibility scans report **zero critical violations**; every surface is keyboard-operable with visible focus.
- **SC-009**: The Attendance page is a complete static HTML file in `public/` with **zero external requests** and no whole-page JS mount; the nav promotes `attendance` with the build-guard satisfied and **no dead links**; it maps cleanly to Django.
- **SC-010**: The dashboard impact is minimal + fixture-backed (one count chip + deep-link + the Today's Sessions reuse); a reviewer confirms **no new stat wall and no fake/unbacked finance/credit widget**.
- **SC-011**: A reviewer unfamiliar with the project, shown the Attendance surfaces beside Spec 001–004, confirms they belong to the same product (no drift) and resemble the analyzed system's daily-outcomes idea without copying its visuals or numeric statuses.

---

## Visual Acceptance *(mandatory for this spec)*

Automated tests are required but insufficient. Final acceptance REQUIRES a screenshot review visibly matching the Spec 001–004 approved direction. Required matrix (minimum) — naming `{page}__{lang}__{theme}__{viewport}[__{variant}].png`, verdicts appended to `app/screenshots/REVIEW.md`:

1. Attendance / Outcomes — **Arabic RTL, Light, Desktop**
2. Attendance / Outcomes — **Arabic RTL, Dark, Desktop**
3. Attendance / Outcomes — **English LTR, Light, Desktop**
4. Outcome details **drawer** — Arabic RTL, Light, Desktop
5. Outcome action **confirmation modal** — Arabic RTL, Light, Desktop
6. **Sessions** page outcome integration — Arabic RTL, Light, Desktop (the outcome chips + shared drawer)
7. **Student profile** attendance/outcome section — Arabic RTL, Light, Desktop
8. **Family profile** follow-up section — Arabic RTL, Light, Desktop
9. **Dashboard** outcome impact — Arabic RTL, Light, Desktop
10. **Mobile** Attendance / Outcomes page — Arabic RTL, Light
11. **Mobile** outcome drawer — Arabic RTL, Light

Reviewed against: the Spec 001 approved dashboard direction, the Spec 002 admin operations + Spec 003 timetable + Spec 004 family/student direction, the sidebar/topbar reference, and the old academy session/attendance/outcome screenshots **as product/UX reference only (not visual copy)**.

**A review FAILS if any of the following are true:** looks like a generic attendance spreadsheet; missing the outcome status vocabulary; missing the student-absent vs teacher-absent distinction; missing the outcome details drawer/modal; missing demo/disabled action behavior; dead links/actions; copied legacy visuals/assets/colors/classes/numeric statuses; raw i18n keys; poor dark mode; broken RTL/LTR; JS-rendered whole page; cannot deploy to GitHub Pages; hard to convert to Django templates; claims real attendance persistence; the Dashboard Impact Review is missing or adds a stat wall / unbacked finance widget; or it does not visibly reflect the inspected reference system.

---

## Constraints & Non-Negotiables *(mandatory for this spec)*

**Must continue (from Spec 001–004):** static HTML-first delivery to `public/`; per-language pre-rendered pages; relative + local assets; compiled Tailwind/PostCSS CSS; native ES-module JS that **only enhances** existing markup (filters/overlays/sections); self-hosted fonts/icons; GitHub-Pages compatible; Django-template-ready; the established `data-*` hook vocabulary; the unchanged category-rail shell + topbar; the existing status maps reused; screenshot-based visual acceptance; Arabic RTL first + English LTR; Light/Dark/System.

**Must NOT use:** chart/table/form/calendar libraries; SPA framework; TypeScript; CDN; backend API; database; real auth; real permission enforcement; real CRUD/persistence; a real attendance/outcome workflow engine; real status mutation; real notifications/WhatsApp/Zoom/live; a real reschedule/make-up engine; a real credit/payment/accounting/salary engine; the legacy 11-state lifecycle as a real engine; legacy widget libraries; any copied legacy assets/classes/Bootstrap/logo/palette/icons/numeric statuses/private wording; or a JS-rendered whole-page mount.

**Must NOT include (product scope):** the legacy enter-time/queue/proof-video workflows as real features; Sessions Analysis as a built page; the finance session-ledger/salary roll-ups; student/teacher/family dashboards or portals (these stay `future-role`, never rendered).

---

## Anticipated Contracts *(for the later plan)*

The `/speckit.plan` step is expected to produce, at minimum:

- `attendance-page-contract.md` — the Attendance page (summary tiles, filters, list/card hybrid, states).
- `outcome-status-contract.md` — the labeled OUTCOME status map (the vocabulary, tones/icons/labels, never numeric/color-only, AR/EN).
- `outcome-details-contract.md` — the shared outcome drawer (extending the appointment drawer; fields + attribution + make-up/follow-up hints).
- `outcome-actions-contract.md` — the demo/confirm/disabled action set, status-gating, and the no-real-mutation rule.
- `sessions-integration-contract.md` — the Sessions page outcome chip + shared drawer + deep-link.
- `student-family-impact-contract.md` — the fixture-only student/family profile hints + deep-links.
- `dashboard-impact-contract.md` — the minimal fixture-backed dashboard outcome impact.
- `navigation-impact-contract.md` — the NI12 promotion of `attendance` in the `control` category; the planned-rest + no-dead-link + no-portal rules.
- `static-html-django-ready-contract.md` — SSG for the page/rows/tiles/drawer templates, per-language pages, relative paths, GitHub Pages, Django mapping.
- `screenshot-acceptance.md` — the matrix + failure conditions above.
- `scope-guard.md` — the in/out scope + forbidden list above (fixtures only; no engines; no finance/credit; no portals; admin-only; no library; no legacy copy / numeric statuses).

---

## Assumptions

- **Page added** = `attendance.html` + `.en` (an NI12 promotion of a new `attendance` item in the `control` category, route added to `FUTURE_ROUTES` at promotion). `sessionsAnalysis` and the other planned `control` items **stay planned** (no dead links). No new profile templates — Spec 005 reuses `student.html`/`family.html`.
- **Reuse over reinvention**: the experience composes existing components (`pageHeader`/`summaryCards`, `filterBar`, `dataTable`/`cardGrid`, `previewTemplate`/`sheetRow` + the `appointmentTemplate` drawer (already has `familyKey`), `chip`, `states`, `confirmAction`, `toast`, `statusChip`) + the `enhance.js` behaviors. **Genuinely new**: the session-outcome fixture, the labeled OUTCOME status map, the Attendance page, the extended outcome drawer content + action cluster, and their i18n namespace.
- **Outcome model (D2)**: a calm 7-state display map collapsing the legacy 11-state + numeric codes; *who absent* = distinct student/teacher statuses; *who cancelled* = a drawer attribution attribute. **No real lifecycle engine.**
- **Drawer (D3)**: the shared appointment drawer is extended with an outcome section + an action cluster; one canonical surface across Attendance/Sessions/profile-schedule.
- **Actions (D4/D5)**: demo / confirm→demo / disabled-with-reason only; make-up/credit is a display hint; no persistence, no finance.
- **Attendance granularity**: a **session-level** outcome (per the reference) + a present/capacity summary — not a per-student roster engine.
- **Fixtures are original placeholder content** extending the existing session/student/family fixtures; no legacy/private wording, names, numeric statuses, or assets.
- **Language model** continues Spec 001–004: per-language pre-rendered pages with a navigating toggle; filter/drawer state is client-side only.
- **No constitution constraints yet**: the project constitution is an unfilled template; if ratified later, re-check this spec against it.
- **Git**: per the established project pattern, Spec 005 continues on branch `feature/001-approved-dashboard-design` (specs 001–004 live there); the spec directory name is independent of the branch, and nothing is committed by this command.
