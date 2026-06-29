# Phase 1 Data Model: Admin Core Operations Pages

**No database, no API, no persistence.** These are **display fixture shapes** for the six admin pages — the structure of the static data each page pre-renders at build time. They extend the Spec 001 fixtures and map cleanly to Django view context (each list → a `{% for %}` loop). Fixtures live in `app/src/js/fixtures/`. All user-facing strings are **i18n keys** (resolved per language at build time); numbers/dates format per locale and are never mirrored. Status always resolves through the single Spec 001 **status map** (color + icon + label).

Persisted state remains only `localStorage` (theme/language/sidebar-rail) — unchanged from Spec 001.

---

## Entity: NavItem (sidebar) — CHANGED

Existing Spec 001 entity; `route` values change from `#` to real page paths. Fields unchanged: `id`, `labelKey`, `icon`, `route`, `badge?`, `active` (derived from page `activeId`), `disabled`.

Routes: `sessions→sessions.html`, `schedule→schedule.html`, `students→students.html`, `trainers→trainers.html`, `curricula→curricula.html`, `settings→settings.html`.

---

## Entity: Session (fixture) — EXTENDED

Extends the Spec 001 session fixture with preview details.

| field | type | notes |
|---|---|---|
| id | string | stable id |
| time | `HH:MM` | start (not mirrored) |
| durationMin | number | rendered "N min" |
| titleKey / levelKey | i18n key | session title + level |
| trainer | { nameKey, accent } | avatar initial derived from name |
| roomKey | i18n key | e.g. "Hall A" |
| present / capacity | number / number\|null | students; null → "—" |
| subjectKey | i18n key | for the subject filter facet |
| statusId | StatusId | live / upcoming / completed / cancelled |
| actions | ActionId[] | row-action menu (view / edit-demo / cancel-confirm) |
| details | object | preview fields: dateKey, notesKey, attendeesCount, materialsKey |

Page fixture: ≥10 rows (more than the dashboard's 5) with `total`, `pageSize`, `lastUpdatedKey`, plus filter facets (`data-status`, `data-subject`, `data-trainer`, `data-search`).

---

## Entity: ScheduleBlock (fixture) — NEW

Grouped into days for the week overview.

| field | type | notes |
|---|---|---|
| id | string | stable id |
| day | enum/index | weekday (Sun…Sat) → grouping |
| dateValue | ISO date | formatted per locale |
| start / end | `HH:MM` | time range |
| titleKey / levelKey | i18n key | session |
| trainer | { nameKey, accent } | avatar |
| roomKey | i18n key | room |
| subjectKey | i18n key | subject facet |
| statusId | StatusId | status chip |

Page fixture: a `ScheduleWeek` = ordered list of `{ day, dateValue, blocks: ScheduleBlock[] }` for the current fixture week (e.g., Wed 28 Jun 2026 reference), each day with a count; plus filter facets.

---

## Entity: Student (fixture) — NEW

| field | type | notes |
|---|---|---|
| id | string | stable id |
| nameKey | i18n key | student name (placeholder) |
| avatarText / accent | string / enum | initials fallback + accent |
| statusId | enum | active / paused / trial / inactive (maps to status tones) |
| levelKey | i18n key | grade/level |
| progress | number (0–100) | progress indicator (hand-rolled bar) |
| enrolledCount | number | enrolled courses |
| subjectKey | i18n key | primary subject (filter facet) |
| details | object | preview: contactKey(placeholder), coursesKeys[], joinedDateValue, guardianKey |

Page fixture: ≥10 students with `total`, filter facets (`data-status`, `data-subject`, `data-search`), and sort keys (name/level/progress).

---

## Entity: Trainer (fixture) — NEW

| field | type | notes |
|---|---|---|
| id | string | stable id |
| nameKey | i18n key | trainer name (placeholder) |
| avatarText / accent | string / enum | initials + accent |
| subjectsKeys | i18n key[] | subject tags |
| availabilityId | enum | available / busy / off (status tones) |
| performance | { utilization %, sessions, rating } | hand-rolled ring/sparkline values |
| hoursThisWeek | number | tabular |
| details | object | preview: bioKey, subjectsKeys, weeklyAvailabilityKeys, contactKey(placeholder) |

Page fixture: ≥8 trainers + summary tiles (total / available now / avg utilization) + filter facets (`data-availability`, `data-subject`, `data-search`).

---

## Entity: Course / Curriculum (fixture) — NEW

| field | type | notes |
|---|---|---|
| id | string | stable id |
| titleKey | i18n key | course/curriculum title |
| subjectKey | i18n key | subject |
| levelKey | i18n key | level |
| statusId | enum | active / draft / archived (status tones) |
| icon / accent | string / enum | medallion |
| enrolledCount / sessionsCount | number | counts |
| levels | { levelKey, statusKey }[] | optional level breakdown for preview |

Page fixture: ≥6 courses (card grid or table) + filter facets (`data-subject`, `data-level`, `data-status`, `data-search`).

---

## Entity: SettingsSection (fixture) — NEW

| field | type | notes |
|---|---|---|
| id | string | section id (academyProfile / appearance / account / notifications / roles) |
| titleKey / descKey | i18n key | section heading |
| icon / accent | string / enum | medallion |
| rows | SettingRow[] | controls |

**SettingRow**: `{ labelKey, helpKey?, kind, control }` where **kind** ∈ `real` | `demo` | `disabled` :
- `real` → theme switch, language switch (reuse Spec 001 behavior).
- `demo` → `data-demo-action` (toast feedback, no persistence).
- `disabled` → `data-disabled-reason` (visible reason; not operable).

Roles section = read-only grouped permission **preview** (group → permission labels), no enforcement.

---

## Entity: FilterState (display-only) — NEW

Per page: the set of active fixture facets reflected as active-filter chips; drives client-side show/hide of pre-rendered rows. No URL/server contract implied. Fields: `{ facet, value, labelKey }[]` + a derived `hasResults` boolean (controls the "no results" state).

---

## Shared / reused entities (from Spec 001)

- **Status** vocabulary (single source: id → tone + icon + label) — reused by sessions, schedule, students, trainers, courses.
- **ProfileSummary** (topbar/account) — reused; the Settings "Account" section references it.
- **PageMeta** (new, build-time): `{ base, activeId, titleKey, crumbKey, render }` per page in the SSG `PAGES` list (Arabic + English generated from the same module).

## Relationships (display-only, build-time)

- The Sessions, Schedule, and dashboard sessions all resolve status via the one Status map (consistent chips/tiles).
- Sidebar `sessions` badge count may mirror the Sessions fixture `total`.
- Trainer/Student/Course previews reference each other by fixture name only (no real foreign keys); previews show fixture-consistent cross-references (e.g., a student's enrolled course titles match course fixtures).
- Settings "Roles & Permissions preview" is illustrative only — not connected to any real permission gate.
