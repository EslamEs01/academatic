# Phase 1 Data Model: Families and Student Academic Profiles

**No database, no API, no persistence.** These are **display fixture shapes** for the families/students surfaces — the structure of the static data each surface pre-renders at build time. They **extend** the Spec 001/002/003 fixtures (`students.js`, `schedule.js`, `sessions.js`) and map cleanly to Django view context (each list → a `{% for %}` loop; each profile tab / wizard step → a static section or `{% if %}`). Fixtures live in `app/src/js/fixtures/`. All user-facing strings are **i18n keys** (resolved per language at build time); numbers/dates format per locale and are **never mirrored**. Family/student lifecycle status resolves through the new **family-status map** (tone + icon + label, **never numeric/color-only**); session status reuses the Spec 001 session map.

Persisted state remains `localStorage` only (theme/language/sidebar/nav-category + the profile **selected tab** via the existing `academy.schedView.<page>` key). The **wizard step is transient** (no persistence). No other state.

> **Core relationship**: the **Family is the guardian/parent account** (identity unit); **students are children nested under one family** (one family → many students). The bidirectional link is `Family.studentIds[]` ↔ `Student.familyId` (see *FamilyStudentLink*).

---

## Entity: Guardian (fixture, embedded in Family)

The guardian/parent is **the Family account itself** (the reference has one guardian per family) — modeled as the guardian sub-fields of `Family`, not a separate stored entity.

| field | type | notes |
|---|---|---|
| `nameKey` | i18n key | guardian display name (placeholder) |
| `accent` | enum | avatar accent (violet/teal/amber/sky/coral/success) |
| `contact` | `{ phoneKey, emailKey, whatsappKey }` | placeholder contact (display-only) |

Django: the guardian fields are columns on the family record (no separate table).

---

## Entity: Family (fixture) — NEW

| field | type | notes |
|---|---|---|
| `id` | string | stable id (`fam1…famN`) |
| `guardian` | `Guardian` | the parent/account (name + accent + contact) |
| `statusId` | enum | `active / trial / suspended / stopped / inactive` (lifecycle) |
| `categoryId` | string | → `FamilyCategory.id` (segmentation facet) |
| `studentIds` | string[] | the family's children (→ `Student.id`); drives `studentCount` |
| `activeCoursesCount` | number | derived/denormalized display count |
| `location` | `{ countryKey, cityKey, timezoneKey }` | placeholder (display-only) |
| `joinedDateKey` | i18n key | join date (display) |
| `plan` | `{ costTypeKey, hourRate, label }` | **display-only billing stub** (never real finance) |
| `attention` | `{ kind, labelKey } \| null` | fixture-only flag (e.g. `needsAttention`) |
| `notesKey` | i18n key | family note |

Container: `FAMILIES` = `{ total, rows: Family[] }` (≥8 families) + facets (`data-status`, `data-category`, `data-search`). Maps to Django `{% for family in families %}` + `family.students`.

---

## Entity: FamilyCategory (fixture) — NEW

| field | type | notes |
|---|---|---|
| `id` | string | `cat1…` |
| `nameKey` / `descKey` | i18n key | segment name + description |
| `statusId` | enum | active/inactive |
| `count` | number | families in the segment (display) |

`FAMILY_CATEGORIES = FamilyCategory[]` — powers the Families **category filter facet + chips** (the nav `familyCategories` item stays planned).

---

## Entity: FamilyStudentLink (display-only) — NEW

The bidirectional relationship (no join table — denormalized on both sides for static rendering):
- `Family.studentIds[]` → the children rendered on the family card + the family profile "Students" tab.
- `Student.familyId` → the family chip on the student row + the student profile "Family" tab + banner.
Maps to Django `family.students` / `student.family` (a real FK later).

---

## Entity: Student (fixture, EXTENDED)

Existing Spec 002 fields (`id, nameKey, accent, statusId, level, progress, enrolled, subject`) **+**:

| field | type | notes |
|---|---|---|
| `familyId` | string | **NEW** — replaces the bare `guardian` string; → `Family.id` |
| `statusId` | enum | now the **lifecycle** map (active/trial/suspended/stopped/inactive) |
| `enrollments` | `StudentCourseEnrollment[]` | the student's courses/groups |
| `groupIds?` | string[] | → `StudentGroup` (display chips; groups stay planned) |
| `upcomingSessionIds` | string[] | → schedule block ids (for the timetable snapshot) |
| `results` | `StudentResultSummary` | fixture progress + certificates + summary |
| `evaluation` | `StudentEvaluationSummary` | the monthly progress-report rubric |
| `notesKey` | i18n key | student note |

Container: `STUDENTS` extended in place (≥10) + the existing facets **+** `data-family`. The students list adds a **family** column/chip + a family filter facet + a "view profile" link to `student.html`.

---

## Entity: StudentAcademicStatus (display-only) — NEW

A small derived view for the student profile banner + the students list:

| field | type | notes |
|---|---|---|
| `statusId` | enum | lifecycle status (chip) |
| `level` | enum | foundation/l1…/advanced |
| `progress` | number (0–100) | overall progress (hand-rolled bar/ring) |
| `attention?` | `{ kind, labelKey }` | fixture attention |

No engine — derived from the student fixture for display.

---

## Entity: StudentCourseEnrollment (fixture) — NEW

| field | type | notes |
|---|---|---|
| `id` | string | enrollment id |
| `courseTitleKey` | i18n key | course/material |
| `teacherNameKey` / `accent` | i18n key / enum | teacher |
| `statusId` | enum | active / completed / paused (display) |
| `progress` | number (0–100) | per-course progress |
| `groupId?` | string | if a group enrollment |
| `certificateKey?` | i18n key | if a certificate exists |

Rendered in the student profile **Courses** + **Results** tabs. No real enrollment engine.

---

## Entity: StudentGroup (fixture, lightweight) — NEW

| field | type | notes |
|---|---|---|
| `id` | string | group id |
| `nameKey` | i18n key | group name |
| `teacherNameKey` | i18n key | teacher |

A **display chip only** (the full Groups module is out of scope; the `groups` nav item stays planned). Referenced by `Student.groupIds` / `StudentCourseEnrollment.groupId`.

---

## Entity: StudentTimetableSummary (display-only) — NEW

The student's upcoming-sessions snapshot for the profile **Timetable** tab — a filtered slice of Spec 003 schedule blocks:
`{ blocks: ScheduleBlock[] (the student's upcoming), viewAllHref: 'schedule.html#view=timetable' }`. Rendered via the existing **`scheduleAgenda`**; each block opens the **shared appointment drawer**. No new timetable engine.

---

## Entity: StudentResultSummary (fixture, display-only) — NEW

| field | type | notes |
|---|---|---|
| `levelKey` / `termKey` | i18n key | level/term summary |
| `overallProgress` | number (0–100) | hand-rolled progress |
| `courses` | `{ courseTitleKey, progress }[]` | per-course progress |
| `certificates` | `{ titleKey, dateKey, statusId }[]` | certificates list |

**No gradebook** — fixture display only. Rendered by `result-summary.js` in the **Results** tab.

---

## Entity: StudentEvaluationSummary (fixture, display-only) — NEW

The **Monthly Progress Report** rubric:

| field | type | notes |
|---|---|---|
| `monthKey` | i18n key | report month |
| `criteria` | `{ key, ratingId }[]` | `learningProgress / focus / homework / punctuality` → a rating id (e.g. `excellent/good/sometimes/rarely`) |
| `achievementsKey` | i18n key | narrative |
| `objectivesKey` | i18n key | next-month objectives |
| `approved` | boolean | display flag; Approve = **demo** action |

**No evaluation workflow/engine** — fixture display. Rendered by `evaluation-rubric.js` (criteria rows + calm rating pills, icon+label, never color-only) in the **Evaluation** tab.

---

## Entity: FamilyProfile (display-only composition) — NEW

The composition the `family.html` page renders: a `Family` + its resolved `students` (the children) + its upcoming sessions + the plan stub + notes, arranged into the baked tabs **Overview / Students / Schedule / Plan&Billing / Notes**. Not a stored entity — a build-time view over `Family` + `Student[]`.

---

## Entity: StudentProfile (display-only composition) — NEW

The composition the `student.html` page renders: a `Student` + its `Family` (link) + `enrollments` + `StudentTimetableSummary` + `StudentResultSummary` + `StudentEvaluationSummary` + notes, arranged into the baked tabs **Overview / Courses / Timetable / Results / Evaluation / Family / Notes**. A build-time view, not a stored entity.

---

## Entity: FamilyWizardDraft (display-only, transient) — NEW

The Add-Family wizard's baked steps + current step. **No persistence, no draft storage** — purely the static step markup + the transient active-step state:

| field | type | notes |
|---|---|---|
| `steps` | `{ id, labelKey, fields }[]` | Identity / Contact&Location / Children / Plan&Billing / Review (baked) |
| `currentStep` | string | the visible step (JS toggles; not persisted) |

`fields` are labeled `form-field` definitions (text/select/textarea/toggle) — a curated subset per step (not a port of the ~30 legacy fields). "Save" = demo toast. Maps to Django `{% if step %}`.

---

## Entity: DashboardFamilyStudentSignal (fixture, display-only) — NEW

The minimal dashboard impact (R30):

| signal | shape | links to |
|---|---|---|
| `viewFamilies` | a link/action | `families.html` |
| `attentionCount` | `{ count, labelKey }` (derived from `attention` flags) | `students.html` / `families.html` filtered |

Every signal is **backed by an existing fixture** and **links to an in-scope page** — no fake/unbacked widget, no new stat wall.

---

## Shared / reused entities (from Spec 001/002/003)

- **Family/student lifecycle Status** (new single source: id → tone + icon + label) — reused by family cards, student rows, profile banners.
- **Session Status** (Spec 001 map) — reused by the timetable snapshot + the shared appointment drawer.
- **Tab State** (`academy.schedView.<page>`) — reused for the profile tabs; the wizard step is transient.
- **PageMeta** (build-time): `{ base, activeId, titleKey, crumbKey, render }` — new entries for `families`/`add-family`/`family`/`student`; `family`/`student` use `activeId` `families`/`students` (no new nav item).
- **NavItem**: `families` + `addFamily` promoted to `implemented` + `route`; the rest of the families category stays `planned`.

## Relationships (display-only, build-time)

- One **Family** → many **Students** (`studentIds` ↔ `familyId`); rendered as the family card's grouped children + the family profile Students tab + the student profile Family tab + banner.
- A **Student** → many **enrollments**/**groups**/**upcoming sessions**/**certificates**; all denormalized on the student fixture for static rendering.
- **Results/Evaluation** are **derived from the student fixture** (no second source, no engine).
- **Family categories** are a segmentation facet (a category id on the family); no membership table.
- **Dashboard signals** derive from existing `attention` flags; the deep-link target is the real `families.html`/`students.html`.
- **No real foreign keys, no persistence** — every relationship is fixture data resolved at build time and maps to Django FKs/loops later.
