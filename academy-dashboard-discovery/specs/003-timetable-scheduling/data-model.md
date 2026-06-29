# Phase 1 Data Model: Timetable and Scheduling Experience

**No database, no API, no persistence.** These are **display fixture shapes** for the timetable/scheduling surfaces — the structure of the static data each surface pre-renders at build time. They **extend** the Spec 001/002 fixtures (`SCHEDULE_WEEK`, `SESSIONS_FULL`) and map cleanly to Django view context (each week/day/block list → a `{% for %}` loop; each tab panel → a static section or `{% if view %}`). Fixtures live in `app/src/js/fixtures/`. All user-facing strings are **i18n keys** (resolved per language at build time); numbers/times/dates format per locale and are **never mirrored**. Status always resolves through the single Spec 001 **status map** (color + icon + label, never color-only).

Persisted state remains `localStorage` only: theme/language/sidebar-rail/nav-category (unchanged) **plus** a new per-surface **selected tab** key (`academy.schedView.<page>`). No other state.

> **Block placement is computed at BUILD time**, not at runtime: from `start`/`end` and the week's cropped time axis the SSG derives a `gridRow` span (and, for overlaps, a `gridCol` sub-index) baked onto each block (a class or inline custom property). Runtime JS never lays out the grid.

---

## Entity: ScheduleWeek (fixture) — EXTENDED

The top-level container for a timetable/schedule view (one fixture "current week").

| field | type | notes |
|---|---|---|
| `weekId` | string | stable id (e.g., `w-2026-06-28`) |
| `labelKey` | i18n key | e.g. "هذا الأسبوع" / "This week" |
| `days` | `ScheduleDay[]` | ordered, **Sat-first** |
| `axis` | `{ startHour, endHour, stepMin }` | **cropped** working-hours window (e.g., 8→20, step 30) derived from the blocks |
| `teachers` | `{ id, nameKey, accent }[]` | **derived** from blocks → the teacher-lens facet options (+ an "all" option) |
| `total` | number | block count (for header/count) |

Maps to Django: `week.days` → `{% for day in week.days %}`; `week.axis` → the grid's row template.

---

## Entity: ScheduleDay (fixture) — EXTENDED

One weekday column (grid) / one day group (list/agenda).

| field | type | notes |
|---|---|---|
| `dayId` | enum | `sat…fri` (Sat-first) |
| `nameKey` | i18n key | weekday label (`sch.day.sun` …) |
| `dateISO` | ISO date | formatted per locale; drives the "today" accent |
| `isToday` | boolean | build-time flag (fixed fixture clock) → quiet today accent |
| `blocks` | `TimetableBlock[]` | sessions that day (may be empty → empty-day state) |
| `count` | number | blocks that day (day-head badge) |

---

## Entity: TimeSlot (build-time, display-only) — NEW

A row of the timetable axis (not stored on blocks; generated from `ScheduleWeek.axis`).

| field | type | notes |
|---|---|---|
| `slotIndex` | number | 0-based row index |
| `labelKey`/`label` | string | axis time label (e.g., "08:00"), **LTR numerals** even in RTL |
| `startMin` | number | minutes-from-midnight for the row |

Used to render the leading time-axis column and to compute each block's `gridRow`.

---

## Entity: TimetableBlock (fixture) — EXTENDED (was ScheduleBlock)

A single placed session in the grid / list / agenda.

| field | type | notes |
|---|---|---|
| `id` | string | stable id |
| `start` / `end` | `HH:MM` | time range (not mirrored); → build-time `durationMin` + `gridRow` span |
| `dayId` | enum | owning weekday (redundant with parent day for flat use) |
| `titleKey` / `levelKey` | i18n key | session title + level |
| `subject` | enum | filter facet (`math/arabic/programming/physics/english/science`) |
| `teacher` | `{ id, nameKey, accent }` | avatar + name; drives the teacher lens |
| `roomKey` | i18n key | room label |
| `roomLinkKey?` | i18n key | optional online-link label (Join/Open — disabled-with-reason) |
| `students?` | number \| `{ nameKey }[]` | count or short list (optional) |
| `familyKey?` | i18n key | optional family/guardian label |
| `statusId` | StatusId | `live / upcoming / completed / cancelled` |
| `tags?` | string[] | optional display tags (e.g., `rescheduled`) |
| `attention?` | `AttentionSignal \| null` | optional fixture-only conflict/delay flag |
| `type?` | enum | `session / trial / group` (optional facet) |
| `gridRow` | string | **build-derived** grid-row span (e.g., `"3 / 7"`) — not authored by hand |
| `gridCol?` | number | **build-derived** overlap sub-column index |

Maps to Django: a block partial; `gridRow`/`gridCol` become a precomputed inline `style="--row:…"` / class.

---

## Entity: TeacherTimetable (lens, display-only) — NEW

A derived view over `ScheduleWeek`, not a separate fixture.

| field | type | notes |
|---|---|---|
| `teacherId` | string \| `"all"` | selected lens (`all` = combined overview) |
| `nameKey?` | i18n key | selected teacher's name (when not `all`) |
| `accent?` | enum | teacher accent |
| `days` | `ScheduleDay[]` | the same week filtered to this teacher's blocks (or all) |

Admin-facing display only — **no portal, no edit, no availability persistence.** Realized purely by the existing client-side filter (`data-filter="teacher"`) over baked blocks.

---

## Entity: SessionAppointment (fixture) — EXTENDED (Session)

The Sessions-page row, enriched so the table, the today-agenda, and the shared drawer all read from one shape.

| field | type | notes |
|---|---|---|
| `id` | string | stable id |
| `time` | `HH:MM` | start |
| `durationMin` | number | "N min"; → agenda block span |
| `dateKey` | i18n key | session date (display) |
| `titleKey` / `levelKey` | i18n key | title + level |
| `subject` / `subjectKey` | enum / i18n key | subject facet + label |
| `trainer` (`teacher`) | `{ id, nameKey, accent }` | avatar + name |
| `roomKey` | i18n key | room |
| `roomLinkKey?` | i18n key | optional online link (disabled-with-reason) |
| `present` / `capacity` | number / number\|null | students; null → "—" |
| `familyKey?` | i18n key | optional family |
| `statusId` | StatusId | live / upcoming / completed / cancelled |
| `attention?` | `AttentionSignal \| null` | optional |
| `actions` | ActionId[] | view / edit-demo / cancel-confirm / notify-demo / join-disabled |
| `details` (→ `AppointmentDetails`) | object | the drawer's fields |

Container: `{ total, pageSize, lastUpdatedKey, rows[] }` + facets (`data-status`, `data-subject`, `data-trainer`, `data-search`).

---

## Entity: AppointmentDetails (display-only) — NEW

The progressive-disclosure payload baked into each `<template data-preview="<id>">` (shared by Schedule blocks, Sessions rows/agenda, dashboard rows).

| group | fields |
|---|---|
| **Summary** | `statusId`, `dateKey`, `start`/`end` (or `time`+`durationMin`), `teacher{nameKey,accent}` |
| **People** | `students?` (count/list), `familyKey?` |
| **Logistics** | `subjectKey`, `roomKey`, `roomLinkKey?` (Join/Open — disabled-with-reason), `tzHintKey` (static "academy timezone" note) |
| **More** | `notesKey?`, `materialsKey?`, `attention?` (note) |
| **Actions** | `view` (open) · `editDemo` · `notifyDemo` (toast) · `cancelConfirm` (confirm→toast) · `joinDisabled` (`data-disabled-reason`) |

No real persistence; `view`/links never navigate to a real resource.

---

## Entity: ScheduleFilterState (display-only) — NEW

Per surface; reflected as active-filter chips; drives client-side show/hide of pre-rendered blocks/rows in **both** tabs. Fields: `{ facet, value, labelKey }[]` (facets: `day`/`week`, `teacher`, `subject`, `status`, `type?`) + derived `hasResults` (controls the "no results" state). Preserved across tab switches. No URL/server contract beyond the view hash.

---

## Entity: DashboardScheduleSignal (fixture, display-only) — NEW

The minimal, fixture-backed dashboard impact (R16). Variants:

| signal | shape | links to |
|---|---|---|
| `viewTimetable` | a link/action | `schedule.html#view=timetable` |
| `upNext` | `{ items: TimetableBlock[] (next 3–4), labelKey }` | `schedule.html#view=timetable` |
| `attentionCount` | `{ count, labelKey }` (derived from `attention` flags) | `schedule.html` filtered to attention |

Every signal is **backed by an existing fixture** (`SCHEDULE_WEEK`/`SESSIONS`) and **links to an in-scope page** — no fake/unbacked widget.

---

## Supporting type: AttentionSignal (fixture, display-only) — NEW

`{ kind, labelKey }` where `kind` ∈ `conflict | delayed | cancelled | emptyDay`. Rendered as an **icon + label** (never color-only) on the block/row and as a note in the drawer. **Presentation flag only — no real conflict-detection or live-status engine.**

---

## Shared / reused entities (from Spec 001/002)

- **Status** vocabulary (single source: id → tone + icon + label) — reused by the timetable blocks, list, agenda, table, and drawer.
- **Tab State** (`academy.schedView.<page>`) — selected tab per surface (localStorage + URL hash); no server contract.
- **PageMeta** (build-time): `{ base, activeId, titleKey, crumbKey, render }` — `schedule`/`sessions`/`dashboard` already registered; `titleKey`/`crumbKey` for `schedule` updated to the reconciled label (R19). **No new page.**
- **NavItem** (`schedule`): label key updated to `الجدول الدراسي`/`Timetable`; `id`/`route` unchanged; `aria-current` on the Schedule page.

## Relationships (display-only, build-time)

- The same `TimetableBlock` set powers the List tab (grouped by day), the Timetable tab (grid, placed by `gridRow`), the teacher lens (filtered), and the mobile agenda — one source of truth per week.
- `SessionAppointment` and `TimetableBlock` share the status map and the `AppointmentDetails` drawer shape, so a session and a schedule block open the **same** drawer.
- `DashboardScheduleSignal.upNext`/`attentionCount` are **derived** from `SCHEDULE_WEEK`/`SESSIONS` (no second source); the deep-link target is the real `schedule.html` view.
- Teacher-lens options are **derived** from the week's blocks (no separate teacher store); they reference Spec 002 teacher fixtures by name only (no foreign keys).
- `attention` flags are illustrative fixture data only — not connected to any real detection.
