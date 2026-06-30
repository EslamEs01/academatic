# Contract: Student Academic Profile Page

**Status**: Binding · `public/student.html` (+ `.en`). A complete baked, tabbed **academic profile** — banner (student + family link + lifecycle status + level + progress) over the Spec 003 `tabs` widget (Overview / Courses / Timetable / Results / Evaluation / Family / Notes). A **registered page, NOT a nav item** (`activeId: 'students'`), reached via "view profile" links; one representative baked template (Django → `student/<id>`). Fixtures only — no real enrollment / grade / evaluation / attendance / persistence engine. **Not** a student portal or dashboard.

## 1. Purpose & the profile-page pattern

`student.html` is the codebase's student-side **profile page** (D2/R22): the full academic profile exceeds a drawer's calm budget, so it is a dedicated baked page (the quick peek stays the Students-list drawer; a session detail stays the shared appointment drawer). It MUST read as a calm academic profile — airy, labeled, progressive-disclosure — **not** the legacy 99-button spreadsheet, and recognizably the same product as Spec 001/002/003 (warm canvas, `--g-violet`, `--r-card`, Tajawal). It surfaces the family↔student relationship as the spine.

## 2. Registration & active state (binding)

- `student.html` MUST be registered in the SSG `PAGES` with `{ base:'student', activeId:'students', titleKey, crumbKey, render }` and generated AR (`student.html`) + EN (`student.en.html`). It is **NOT** a new nav item — `students` stays the active nav pill (`categoryOf('students')` keeps the **families** category panel open). See `family-student-navigation-contract.md` (NI12/D3).
- It is reached only via **"view profile"** links from `students.html` rows (and the Students quick-peek drawer, and the family profile's Students tab). One representative fixture student is baked; Django later maps the page to `student/<id>` with the student as view context. **No dead link reaches or leaves this page.**

## 3. Layout (RTL, top → bottom)

1. **Profile banner** (§4) — student identity + family link + status + level + overall progress + action cluster.
2. **Tablist** (§5) — the Spec 003 generic `tabs` widget: Overview · Courses · Timetable · Results · Evaluation · Family · Notes; **Overview default**.
3. **Seven baked `role="tabpanel"`s** (§6–§12) — all pre-rendered; the inactive ones carry `hidden`.
4. **Page-level states region** + the shared overlays (drawer/modal/toast) the tabs trigger.

One calm column; the shell (category rail + topbar) is unchanged. Reflows per §14.

## 4. Profile banner (binding)

The banner (new `profile-banner.js`, composed from `ui` atoms) MUST present, in one calm header:

- **Student** — avatar (`accent`) + `nameKey`; long AR/EN names wrap/truncate gracefully.
- **Family link** — a labeled `chip` naming the guardian/family that is a **real `<a href>`** to `family.html` (language-aware), resolved from `Student.familyId` (data-model *FamilyStudentLink*). This makes the relationship unmistakable from the banner; it MUST NOT be a bare id or color-only.
- **Lifecycle status** — a `chip` via the `family-status` map (`active/trial/suspended/stopped/inactive`, R25) as **icon + label, never numeric/color-only**.
- **Level** — the student's `level` (foundation…advanced), labeled.
- **Overall progress** — the existing **hand-rolled** progress visual (bar/ring, R9, no chart library) from `StudentAcademicStatus.progress` (0–100), with a textual percent (never color-only).
- **Attention** — the fixture `attention` flag (icon + label) when present.
- **Action cluster** — edit / message / the kebab; each demo-with-toast or disabled-with-reason (§13).

## 5. Tabs via the Spec 003 `tabs` widget (binding)

- The profile sections MUST be the existing generic **`tabs`** widget (`../../003-timetable-scheduling/contracts/schedule-tabs-contract.md`), reused verbatim: a `role="tablist"` of `role="tab"` controls over baked `role="tabpanel"`s; `enhance.js` only toggles visibility (`hidden`), flips `aria-selected`, and moves roving `tabindex` — it builds **no** panel content. **No new tab engine.**
- **Overview is the default** tab; selection persists in `localStorage['academy.schedView.student']` and mirrors the **URL hash** `#view=overview|courses|timetable|results|evaluation|family|notes` (hash wins on load, then storage, then Overview), so a deep link (e.g. `student.html#view=results`) opens that tab. Switching changes only the visible panel — no navigation, no reload.
- With JS off, all seven baked panels remain visible as anchored sections (no content lost).

## 6. Overview tab

A calm summary: KPI `statMini`s (active courses, upcoming sessions, certificates), the contact/level recap, the attention note, and a short "latest" line (recent session / latest certificate). Display-only; any deep affordance links to the relevant tab via `data-view`.

## 7. Courses tab

The student's `enrollments` (data-model *StudentCourseEnrollment*): course `titleKey`, teacher avatar+name, a per-course status chip (active/completed/paused), a per-course **hand-rolled progress** visual, and a **group chip** (`StudentGroup`, display-only — the Groups module stays planned). "Add course"/"assign group" are demo / disabled-with-reason (no enrollment engine). Long titles wrap/truncate.

## 8. Timetable tab (reuse Spec 003 — no duplicated engine, binding)

- The Timetable tab MUST reuse **`scheduleAgenda`** to render the student's **upcoming sessions** — a filtered slice of Spec 003 schedule blocks resolved from `Student.upcomingSessionIds` (data-model *StudentTimetableSummary*). It MUST NOT re-implement the weekly grid (R29).
- Each session block MUST open the **ONE shared appointment drawer** via `data-drawer="<id>"` over a baked `<template data-preview="<id>">` (`../../003-timetable-scheduling/contracts/appointment-details-contract.md`) — the same builder/fields/actions, which already renders the **family context** (`familyKey`) row.
- A language-aware **"View in schedule"** affordance MUST be a real `<a href>` deep-link to `schedule.html#view=timetable` (`schedule.en.html#view=timetable` on the English page, via `langRoute()`). No dead link; no portal chrome.
- Empty state: "no upcoming sessions" (calm), distinct from a filter no-result.

## 9. Results tab

The fixture-only per-course progress + certificates + level/term summary, defined in full by **`student-result-contract.md`** (rendered by `result-summary.js` from `Student.results` / *StudentResultSummary*). No gradebook. Cross-reference is binding.

## 10. Evaluation tab

The fixture-only **Monthly Progress Report** rubric (criteria rows + calm rating pills + achievements + objectives + Approve demo), defined in full by **`student-evaluation-contract.md`** (rendered by `evaluation-rubric.js` from `Student.evaluation` / *StudentEvaluationSummary*). No evaluation workflow/engine. Cross-reference is binding.

## 11. Family tab (links back, binding)

- The Family tab MUST make the relationship explicit: the guardian/family card (name + status + contact placeholder) as a **real `<a href>`** to `family.html`, plus the **siblings** — the other `Family.studentIds` rendered as student chips, each a **real `<a href>`** to their own `student.html`. This closes the loop (family → child → siblings → family).
- "Add child"/"edit family" are demo / disabled-with-reason; no persistence.

## 12. Notes tab

The student `notesKey` activity/notes as calm read-only fixture text; "add note" is a demo toast. Empty state when none.

## 13. Actions — demo / disabled-with-reason (binding)

Every banner/tab action honors IP8/IP9: navigations (family link, "view in schedule", siblings, "view profile" elsewhere) go to real in-scope pages; edit/message/add-course/add-note/approve are **demo-with-toast** (`data-demo-action`); destructive (suspend/stop) use the approved **confirm modal** (`data-confirm` + `-title|-msg|-cta|-toast|-danger`) → demo toast; real-save/real-enroll/real-grade/billing controls are **disabled-with-reason** (`data-disabled-reason`/`data-reason-key`). No persistence, no dead control, no raw i18n key.

## 14. States, responsive, RTL-LTR, theme, a11y

- **States**: each tab renders its own calm **empty** state (no sessions / no certificates / no evaluation yet) — never a blank region; loading skeleton + error+retry per the Spec 001 `states` patterns.
- **Responsive**: the banner stacks on mobile; the tablist scrolls/stacks; the Timetable agenda is single-column; tables → cards. No horizontal overflow; the drawer is full-height on mobile.
- **RTL/LTR**: Arabic default (`student.html`), English (`student.en.html`); logical properties; tabs/numbers/levels/dates never mirror incorrectly; all links language-aware.
- **Theme**: Light/Dark/System via tokens; status/progress/rating read correctly in all three; status never color-only.
- **A11y**: tablist roving tabindex + Arrow/Home/End; drawer/modal focus-trap + Esc + return-focus; visible focus; ≥44px targets; icon-only controls named; axe critical = 0.

## 15. `data-*` hooks (exact, no invention)

`data-tabs="student-profile"`, `data-tab="overview|courses|timetable|results|evaluation|family|notes"`, `data-tabpanel="<id>"`, `data-view` (hash/persistence token, also on deep-link controls); the Timetable tab's `scheduleAgenda` markup (`data-agenda`, per block `data-row` + `data-status|data-subject|data-teacher|data-day`) + `data-drawer="<id>"` / `<template data-preview="<id>">` / `data-sheet-close` (shared appointment drawer); `data-demo-action`, `data-modal-trigger`/`data-confirm` (+ `-title|-msg|-cta|-toast|-danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`. The family link, sibling links, "view profile", and "view in schedule" are plain `<a href>`. Results/Evaluation tab hooks per their contracts. **No invented hooks; no JS-generated ids/classes.**

## 16. Reused / cross-references

Reuses Spec 001/002/003 `pageHeader`, `tabs`, `scheduleAgenda`, `appointmentTemplate`, `chip`, `statMini`, `states`, `ui` (avatar/medallion/button), the drawer/modal/toast engines, and the `family-status` map. New shared pieces: `profile-banner`, and (via their tabs) `result-summary` + `evaluation-rubric`. Binds to: `../../003-timetable-scheduling/contracts/schedule-tabs-contract.md` (tabs), `../../003-timetable-scheduling/contracts/appointment-details-contract.md` (drawer), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP5/IP8/IP9/IP10); and within this spec: `students-page-contract.md` (the inbound "view profile" link), `family-profile-contract.md` (the family link target + the Students-tab inbound links), `student-result-contract.md` + `student-evaluation-contract.md` (the Results/Evaluation tabs), `family-student-navigation-contract.md` (registration + deep-links + no-dead-link), `static-html-django-ready-contract.md` (SSG/Django rules), `screenshot-acceptance.md`.

## 17. Django mapping & enforcement

- **Django**: `public/student.html` → `templates/admin/student.html`, mapped to `student/<id>` with the student + its family + enrollments + timetable slice + results + evaluation as view context; the banner family link = `{% url 'admin:family' student.family_id %}`; tabs → static sections / `{% if view == ... %}` (default Overview), the tablist plain markup; the Timetable agenda → the same `{% for block in student.upcoming_sessions %}` loop as Schedule with each block's `<template data-preview>` → `{% include "admin/_appointment_details.html" %}`; "View in schedule" → `{% url 'admin:schedule' %}#view=timetable`; siblings → `{% for sib in student.family.students %}`. No whole-page `#app` mount; relative `./assets/` paths; zero external requests; status/rating via template tags.
- **Enforcement**: the smoke harness (R31) asserts on `student.html` (AR + EN) that the page is a complete static file with the baked banner + a `role="tablist"` with **7 tabs** and **exactly one** visible `tabpanel`, that the banner family link is a real `<a href>` to `family.html`, that the Timetable tab reuses `data-agenda` + the shared `data-drawer`/`<template data-preview>` and provides a real "View in schedule" deep-link (no dead link), that `activeId` keeps the `students` nav pill active (no new nav item), that every action is demo/confirm/disabled-with-reason (IP8), that there are **no raw i18n keys** and **zero external requests**, and that status/progress are never color-only. Screenshots: student profile AR-RTL light desktop + mobile (`screenshot-acceptance.md`).
