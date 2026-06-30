# Phase 1 Data Model: Attendance and Session Outcomes

**No database, no API, no persistence.** These are **display fixture shapes** for the attendance/outcomes surfaces — the structure of the static data each surface pre-renders at build time. They **extend** the Spec 001/002/003/004 fixtures (`sessions.js`, `schedule.js`, `students.js`, `families.js`) and map cleanly to Django view context (each list → a `{% for %}` loop; the drawer → one `{% include %}` partial). Fixtures live in `app/src/js/fixtures/`. All user-facing strings are **i18n keys** (resolved per language at build time); numbers/dates/times format per locale and are **never mirrored**. The session outcome resolves through the new **outcome-status map** (tone + icon + label, **never numeric/color-only**); the scheduling status reuses the Spec 001/003 session map.

Persisted state remains `localStorage` only (theme/language/sidebar/nav-category). The **Attendance filter selection and the open drawer are transient** (no persistence). No other state.

> **Core relationship**: a **SessionOutcome** is one past/today session + its admin-review outcome. It reuses the session/participant shape and **resolves to the real Spec 004 `Student` and `Family`** (`outcome.studentId` → `Student`, `outcome.familyId` → `Family`) so follow-up links land on the correct profiles; the scheduling status (`statusId`) and the review outcome (`outcomeId`) are **separate fields** (R34).

---

## Entity: SessionOutcome (fixture) — NEW

The row backing the Attendance list, the Sessions secondary chip, and the outcome drawer.

| field | type | notes |
|---|---|---|
| `id` | string | stable id (`out1…outN`) |
| `titleKey` / `levelKey` | i18n key | session/course title + level |
| `subject` | enum | math/arabic/programming/physics/english/science (facet) |
| `trainer` | `{ id, nameKey, accent }` | teacher (reused session shape) |
| `roomKey` | i18n key | room (display) |
| `dayId` / `dateKey` | string / i18n key | day facet + display date |
| `time` / `durationMin` | string / number | when / how long |
| `statusId` | enum | **scheduling** status (Spec 001/003 map: upcoming/live/completed/cancelled) |
| `outcomeId` | enum | **review** outcome (the R33 map: attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live) |
| `studentId` | string | → `Student.id` (resolves to name/accent + `student.html`) |
| `familyId` | string | → `Family.id` (resolves to guardian + `family.html`) |
| `present` / `capacity` | number | attendance summary |
| `attribution` | `OutcomeAttribution \| null` | who-absent / who-cancelled |
| `makeup` | `MakeupCreditHint \| null` | display-only hint |
| `followUp` | `OutcomeFollowUp \| null` | needs-attention flag |
| `rescheduleHint` | i18n key \| null | new-time display (rescheduled only) |
| `notesKey` / `feedbackKey` | i18n key \| null | session note / feedback note |

Container: `SESSION_OUTCOMES = { rows: SessionOutcome[] }` (≥12, spanning every outcome state) + facets (`data-outcome`, `data-teacher`, `data-family`, `data-day`, `data-subject`, `data-attention`). Maps to Django `{% for outcome in outcomes %}` + `outcome.student` / `outcome.family`.

---

## Entity: OutcomeStatus (fixture map) — NEW

The single source of truth for the **review outcome** vocabulary, rendered via the generic `chip` (icon + label, **never numeric/color-only**), distinct from the session status map and the lifecycle map.

| id | tone | icon (lucide, vendored) | meaning |
|---|---|---|---|
| `attended` | success | check-circle | held & attended |
| `studentAbsent` | coral | user-x | student did not attend |
| `teacherAbsent` | amber | user-x (distinct accent) | teacher did not attend |
| `cancelled` | neutral/coral | x-circle | cancelled (who → drawer attribution) |
| `rescheduled` | sky | calendar-clock | moved to a new time |
| `upcoming` | upcoming(sky) | clock | not yet held |
| `live` | live(teal) | play | in progress |
| *flag* `makeUpSuggested` | amber | rotate-cw | make-up suggested (display flag) |
| *flag* `needsFollowUp` | amber | alert-triangle | needs admin follow-up (display flag) |

Each entry: `{ tone, icon, labelKey }`; AA-contrast; the label always accompanies the tone+icon. `outcomeChip(outcomeId)` resolves it.

---

## Entity: OutcomeAction (display-only) — NEW

A status-gated, demo-only action descriptor (rendered in the drawer + the row menu).

| field | type | notes |
|---|---|---|
| `id` | enum | markAttend / markStudentAbsent / markTeacherAbsent / cancel / reschedule / notify / feedback / makeupSuggest / reverse |
| `kind` | enum | `demo` (toast) · `confirm` (modal→toast, destructive) · `disabled` (disabled-with-reason) |
| `labelKey` / `icon` | i18n key / icon | display |
| `gatedOn` | enum[] | the `outcomeId`s for which the action is shown (status-gating) |
| `toastKey` / `reasonKey` / `confirm{Title,Msg,Cta,Toast}Key` | i18n key | the demo/disabled/confirm copy |

No `id` writes data; every action resolves to a `data-demo-action` / `data-confirm` / `data-disabled-reason` control. **No persistence, no mutation.**

---

## Entity: OutcomeParticipant (display-only) — NEW

The people on an outcome, resolved at build time.

| field | type | notes |
|---|---|---|
| `role` | enum | student / teacher / family |
| `nameKey` / `accent` | i18n key / enum | display |
| `href?` | string | `student.html` / `family.html` (language-aware) for student/family; teacher is a label (teachers directory link optional) |
| `absent?` | boolean | marks the absent party (drives the attribution) |

---

## Entity: OutcomeAttribution (display-only) — NEW

The "who" of an absence/cancellation (the spec's required distinction), shown in the drawer.

| field | type | notes |
|---|---|---|
| `absentBy?` | enum | `student` / `teacher` (drives `studentAbsent` vs `teacherAbsent`) |
| `cancelBy?` | enum | `teacher` / `student` / `admin` (the legacy 3 reasons → a drawer attribute, not 3 statuses) |
| `labelKey` | i18n key | the human attribution line ("Student absent" / "Cancelled by the teacher") |

---

## Entity: MakeupCreditHint (display-only) — NEW

A calm fixture flag — **no balance, no finance**.

| field | type | notes |
|---|---|---|
| `kind` | enum | `none` / `auto` / `reschedule` / `credit` |
| `labelKey` | i18n key | "make-up suggested" / "added to credit (demo)" |

The real make-up/credit action is **disabled-with-reason** ("requires the finance/credit module — out of scope").

---

## Entity: OutcomeFollowUp (display-only) — NEW

| field | type | notes |
|---|---|---|
| `kind` | enum | `absence` / `cancel` / `reschedule` / `feedback` |
| `labelKey` | i18n key | the follow-up reason (icon + label) |

Drives the `needsFollowUp` flag, the attention facet, the tile count, and the dashboard signal.

---

## Entity: AttendanceFilterState (display-only) — NEW

The page's filter selection → active chips; **no server contract**.

| facet | data hook | options |
|---|---|---|
| day/date | `data-filter="day"` over `data-day` | the fixture days |
| teacher | `data-filter="teacher"` over `data-teacher` | teachers present in the fixture |
| student/family | `data-filter="family"` over `data-family` | families present |
| subject/course | `data-filter="subject"` over `data-subject` | the subject set |
| outcome | `data-filter="outcome"` over `data-outcome` | the OutcomeStatus ids |
| attention | `data-filter="attention"` over `data-attention` | needs-follow-up flag |

Filtering reuses the existing `applyFilter`; the summary tiles set the `outcome` (or `attention`) facet via `data-filter-set` (R38).

---

## Entity: AttendanceSummaryTile (display-only) — NEW

A `summaryCards` tile that doubles as a filter.

| field | type | notes |
|---|---|---|
| `icon` / `tone` | icon / enum | display |
| `value` | number | derived count (from `OUTCOME_SUMMARY`) |
| `labelKey` | i18n key | جلسات مكتملة / غياب طلاب / غياب معلمين / ملغاة ومؤجلة / تحتاج متابعة |
| `filterSet` | string | `outcome:attended` / `outcome:studentAbsent` / … / `attention:1` (the `data-filter-set` value) |

Container: `OUTCOME_SUMMARY` = the derived counts (`total`, `attended`, `studentAbsent`, `teacherAbsent`, `cancelledOrRescheduled`, `needsFollowUp`).

---

## Entity: OutcomeDetails (display-only composition) — NEW

The composition the **canonical outcome drawer** (`outcomeTemplate`) renders: a `SessionOutcome` arranged as the shared **appointment field-rows** (status · date/time/duration · teacher · students(present/capacity) · family · subject · room · notes) **plus** the **outcome section** (outcome chip · attribution · make-up/credit hint · follow-up · feedback) **plus** the **status-gated action cluster** (R36). Not a stored entity — a build-time view over `SessionOutcome` baked into a `<template data-preview="<id>">`. Mapped to a single Django `_outcome_details.html` partial.

---

## Entity: StudentOutcomeSignal (display-only) — NEW

The light student-profile hint (R41) — derived from the student's `SESSION_OUTCOMES`:

| field | type | notes |
|---|---|---|
| `attended` / `total` | number | "attended N of M" recent sessions |
| `followUp?` | `{ count, labelKey }` | absences/cancellations to follow up |
| `href` | string | `attendance.html` (language-aware) deep-link |

Display-only; **no attendance engine, no real metric**.

---

## Entity: FamilyOutcomeSignal (display-only) — NEW

The light family-profile hint (R41) — derived from the family's children's outcomes:

| field | type | notes |
|---|---|---|
| `followUp` | `{ count, labelKey }` | children sessions needing follow-up |
| `href` | string | `attendance.html` (language-aware) deep-link |

Display-only; **no finance/credit claim**.

---

## Entity: DashboardOutcomeSignal (fixture, display-only) — NEW

The minimal dashboard impact (R42):

| signal | shape | links to |
|---|---|---|
| `needsFollowUp` | `{ count, labelKey }` (from `followUp` flags) | `attendance.html` (filtered) |
| (reuse) Today's Sessions outcome chip | the `outcomeChip` on existing rows | the canonical outcome drawer |

Folded into the **existing Spec 004 people-signal card** — no new card/tile/row. Every signal is **backed by `SESSION_OUTCOMES`** and **links to an in-scope page**.

---

## Shared / reused entities (from Spec 001/002/003/004)

- **Session Status** (Spec 001/003 map) — the scheduling status (upcoming/live/completed/cancelled), reused for the drawer "Status" row + the Sessions primary chip.
- **Student / Family** (Spec 004) — `outcome.studentId` / `outcome.familyId` resolve to the real profiles (name/accent/href) + drive the family↔student follow-up links.
- **Appointment field-rows** (Spec 003 `appointmentTemplate`) — factored into a shared `appointmentRows(item)` helper reused by the outcome drawer.
- **PageMeta** (build-time): `{ base, activeId, titleKey, crumbKey, render }` — a new entry for `attendance` (`activeId:'attendance'`, `control` category).
- **NavItem**: `attendance` added + promoted to `implemented` + `route`; `sessionsAnalysis` + the rest of the `control` category stay `planned`.

## Relationships (display-only, build-time)

- One **SessionOutcome** → one **Student** + one **Family** + one **teacher** (`studentId`/`familyId`/`trainer.id`), all denormalized for static rendering and resolved to real profile links.
- **OutcomeAttribution** distinguishes `studentAbsent` vs `teacherAbsent` (statuses) and records `cancelBy` (a drawer attribute, not a status).
- **Make-up/credit/follow-up** are **derived from the outcome fixture** (no second source, no engine).
- **Summary tiles / dashboard signal** derive counts from `SESSION_OUTCOMES`; the tile filters via `data-filter-set`; the deep-link target is the real `attendance.html`.
- **No real foreign keys, no persistence** — every relationship is fixture data resolved at build time and maps to Django FKs/loops later.
