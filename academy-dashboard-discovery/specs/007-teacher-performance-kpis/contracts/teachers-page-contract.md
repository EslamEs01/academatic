# Contract: Teachers Page (enriched directory)

**Status**: Binding · `public/teachers.html` (+ `.en`). An **ENRICHMENT** of the existing teacher card-grid directory — not a replacement, not a new page. Adds academic context (status/counts/workload/follow-up) + a profile link to each card, reusing the existing `pageHeader`/`summaryCards`/`filterBar`/`cardGrid`/`directoryCard`/`noResults`. References FR-001 / FR-002 / FR-003 / FR-016 / FR-019; data-model §1 / §2 / §4 / §5 / §6 / §7 / §8.

---

## 1. Purpose & reuse

Give the admin a calm, relationship-visible **teacher directory** — each teacher's academic footprint (subjects, courses, groups, students, upcoming sessions) + a labeled status + a workload hint + a follow-up flag, with a one-click path to the profile. It MUST read as **academy teacher operations**, NOT a generic HR/employee table. It composes **existing** components only — `pageHeader`, `summaryCards`, `filterBar`, `cardGrid`, `directoryCard`, `statMini`, `avatar`, `chip`, `previewTemplate`/`sheetRow`, `noResults`, the reused `TEACHER_AVAIL`, and the new `teacher-status`/`teacher-signals` chips. No new table/library.

## 2. ENRICHMENT — not a page replacement

The current `renderTeachers()` (card grid + preview drawer + 3 summary cards + availability/subject filters) is **kept and extended**; the existing availability/subject behavior and the preview drawer remain. Enrichment is additive: new card content + new facets + a profile CTA.

## 3. Layout (RTL, top → bottom)

`pageHeader` (title «المعلّمون» + subtitle + primary/secondary actions) → `summaryCards` (display-only) → `filterBar` → `cardGrid` of enriched `directoryCard`s → `noResults` (hidden until a filter empties).

## 4. Summary tiles (display-only)

Keep the existing three (total · available · avg-util) OR refine to academy-relevant fixture counts (e.g. total teachers · available now · teachers needing follow-up). All are **fixture counts**, display-only — never a computed score. Three tiles max; each icon+label+count.

## 5. Filter bar (client-side over pre-rendered cards)

Facets (each a `select[data-filter]` or the search box, filtering baked cards): **search** (name/subject) · **subject** (the existing `SUBJECTS` facet) · **status** (`active/paused/inactive`) · **workload** (`light/balanced/high`) — and the existing **availability** facet MAY remain. A visible **result count** + a **no-results/reset** state. Sparse-data teachers still render (their cards show calm zero hints), distinct from a no-results empty filter.

## 6. Enriched card anatomy (the `.dir-card`)

Each `directoryCard` (root carries `facetAttrs({ status, subject, availability, workload, search })`) shows, calmly (no clutter):

- **avatar** (`accent`) + **name** + **subject chip(s)** (`subjectsKeys`).
- a **labeled teacher-status chip** (`teacherStatusChip(statusId)` — icon+text, never color-only) as the card status.
- the **academic counts**: courses · groups · active students (`statMini` trio), resolved from `COURSES.teacherIds` / `groupsOfTeacher` / the groups' rosters.
- an **upcoming-sessions hint** (count of upcoming blocks where `trainer.id` matches) — or "no recent sessions" for a sparse teacher.
- a **workload hint** (`workloadChip(workload)`).
- a **follow-up flag** rendered **only when** `followUp ∈ {needsFollowUp, attentionRisk}` (`signalChip(followUp)`) — not on every card (no clutter).
- a **"View profile"** real `<a href="./teacher.html">` (language-aware) as the primary CTA — plus the existing preview-drawer CTA (`data-drawer="<id>"`).

No salary/pay figure. No fabricated/computed metric. The existing `util/sessions/rating` stats MAY remain as display facts (never relabeled as a "score").

## 7. Responsive

Cards reflow `sm:grid-cols-2 xl:grid-cols-3` → single column on mobile; chips wrap; the filter bar stacks; no horizontal overflow in RTL or LTR.

## 8. States

- **No-results** (filter empties): the `noResults` panel + a reset — distinct from a zero-data teacher card.
- **Zero-data teacher** (e.g. `huda`): the card renders with calm zero hints ("no recent sessions"), never a broken/misleading count.
- **Loading / error**: reuse the Spec 001 `states` patterns.

## 9. Actions & no-dead-button

`pageHeader` primary = **Add teacher** (`data-demo-action` → toast, per `teacher-actions-contract.md`); the card CTA = **View profile** (real link) + the preview drawer. No dead control; no real create.

## 10. The teacher-status / workload / follow-up chips

Rendered per `teacher-status-contract.md` — labeled, distinct, never numeric/color-only. The card carries status + workload + (conditional) follow-up.

## 11. `data-*` hooks (reuse only)

`data-filter-form`/`data-filter`/`data-filter-reset`/`data-filter-apply`/`data-filter-count`/`data-no-results`; per card `facetAttrs` → `data-row data-status data-subject data-availability data-workload data-search`; `data-drawer="<id>"`/`data-preview="<id>"`/`data-sheet-close`; the "View profile" `<a href>`. No new hook.

## 12. Static-HTML-first & Django

All cards + the preview `<template>`s baked; JS filters + opens previews only. **Django**: `{% for teacher in teachers %}` → `_teacher_card.html`; the status/workload/follow-up via template tags; "View profile" → `{% url 'teacher' teacher.id %}`. No `#app`.

## 13. Enforcement

- **Smoke**: every teacher card carries a labeled status chip (icon+text) + the courses/groups/students counts + an upcoming hint + a workload hint + a "View profile" `<a href="teacher.html">`; the follow-up flag appears only on flagged teachers; the status/workload facets filter the cards with a result count + a no-results/reset state; sparse-teacher cards render zero hints; no `id="app"`; no raw `trn.*` key; axe critical = 0.
- **Screenshots**: frames #1–3 + #11 (AR light/dark, EN, mobile).

**Binds to** `teacher-profile-contract.md` (the "View profile" origin), `teacher-status-contract.md`, `teacher-actions-contract.md`, `static-html-django-ready-contract.md`, and the Spec 006 `../../006-courses-groups-learning-paths/contracts/courses-page-contract.md` (the enrichment precedent). **MUST NOT** become a generic HR/employee table, show a salary figure, render a computed score, or add a dead control.

**Acceptance (binding):**
1. **Given** the Teachers page, **When** loaded, **Then** every card shows a labeled status chip + subject chip(s) + courses/groups/students counts + an upcoming hint + a "View profile" link to `teacher.html`.
2. **Given** a subject/status/workload filter, **When** applied, **Then** only matching cards remain with a result count and a no-results/reset state.
3. **Given** a sparse-data teacher, **When** rendered, **Then** the card shows a calm zero hint, not a broken count — and it does not read as an HR table row.
