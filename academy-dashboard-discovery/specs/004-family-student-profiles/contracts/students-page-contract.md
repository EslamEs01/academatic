# Contract: Students Directory (Enriched)

**Status**: Binding · `public/students.html` (+ `.en`). The Spec 002 students directory **enriched** with a real **family** relationship — a family link/column, a `data-family` filter facet, and a "view profile" link to `student.html` — keeping the existing `dataTable` + summary + filter bar + quick-peek preview drawer. Active nav: `students` (unchanged). Admin directory only — **not** a student dashboard or portal.

## 1. Purpose & exactly-what-changes vs Spec 002

This contract EXTENDS, it does not replace, the Spec 002 Students directory (`../../002-admin-core-operations/contracts/directory-pages-contract.md` "Students" §1–10). The page stays the same calm `dataTable` of students (avatar+name, lifecycle status chip, level, hand-rolled progress, enrolled-courses count, kebab → preview drawer) with `pageHeader` + `summaryCards` + `filterBar` + `states`. **The only additions are the family relationship and the profile link** — everything else (look, drawer engine, filter engine, status chips, responsiveness) is unchanged.

The four changes, and **only** these four:

1. **Real `familyId`** on every student row (replacing the bare Spec 002 `guardian` string, data-model *Student EXTENDED* / D1) — the spine of the module made real.
2. **A family link** rendered in each row — a `chip`-styled family cell that names the guardian/family and **navigates to that family's profile** (`family.html`), per *FamilyStudentLink*.
3. **A family filter facet** (`data-filter="family"` over per-row `data-family`) added to the existing filter bar.
4. **A "view profile" link** to the student academic profile (`student.html`) added to each row (and the row's kebab + drawer), **alongside** the kept quick-peek preview drawer.

No Spec 002 column, control, or behavior is removed. No new page chrome, no table library, no JS-built rows.

## 2. The family link (column / chip) — binding

- Each student row MUST surface the family it belongs to as a labeled **`chip`** (guardian `nameKey` + family avatar `accent`), resolved from the student's `familyId` → its `Family` at build time (data-model *FamilyStudentLink*). It MUST NOT be a bare string id (the legacy `g1–g5` weakness) and MUST NOT be color-only.
- The family chip MUST be a **real `<a href>`** to `family.html` (language-aware via `langRoute()` → `family.en.html` on the English page), so it is a live navigation, never a dead control. (Django later → `student.family` → `family/<id>`.)
- The family chip MUST also appear in the row's **quick-peek drawer** body (§5), so a peek answers "which family?" without leaving the list.

## 3. "View profile" link (→ `student.html`) — binding

- Each row MUST offer a **"view profile"** affordance that is a **real `<a href>`** to `student.html` (language-aware), the student academic profile (`student-profile-contract.md`). This is in addition to — not a replacement for — the quick-peek drawer (D2/R22: peek = drawer, rich profile = page).
- "View profile" MUST appear in the row's kebab menu (`data-row-menu="<id>"`) **and** as a primary affordance inside the quick-peek drawer; both MUST point at the same `student.html` target. No dead link, no `href="#"`.
- The row's primary chevron / open affordance MAY open the quick-peek **drawer** (fast look) while "view profile" navigates to the page — the two are distinct, both honest.

## 4. Family filter facet (`data-family`)

- The existing `filterBar` (`../../002-admin-core-operations/contracts/interaction-patterns-contract.md` IP2) MUST gain a **family** facet: a `data-filter="family"` select whose options are the families present in the fixture, filtering pre-rendered rows by their `data-family="<familyId>"` value.
- The facet composes with the kept Spec 002 facets (search, status, subject, sort) via the same client-side filter engine: on apply, matching rows show/hide, the result count updates, active-filter **chips** reflect the family selection, and the **no-results + reset** state appears when nothing matches. The family filter MUST give visible feedback always — **never dead**.
- Degrades gracefully: with JS off, all rows render and filters are inert (all visible). The family deep-link MAY be reached from the dashboard/Families surfaces via a `?` or hash hint, but selection MUST NOT require JS to render the rows.

## 5. Quick-peek drawer (KEPT, lightly enriched)

- The existing `<template data-preview="<id>">` student preview drawer (the Spec 002 drawer engine, IP5) is **kept**. Runtime JS still only clones the baked template into the transient sheet — it builds no page DOM.
- The drawer body MUST now also render the **family chip** (a real `<a href>` to `family.html`) and the **"view profile"** primary affordance (a real `<a href>` to `student.html`), so the peek both shows the family and offers the full profile. Other drawer fields (status, level, progress, enrolled courses) are unchanged.
- A student's **session** detail is NOT this drawer — sessions reuse the ONE shared `appointmentTemplate` drawer (`../../003-timetable-scheduling/contracts/appointment-details-contract.md`, which already renders a `familyKey` row); the student preview drawer is for the student peek only.

## 6. Status — lifecycle map (binding)

The student status chip MUST resolve through the **new family/student lifecycle map** `family-status.js` (`active / trial / suspended / stopped / inactive` → `{ tone, icon, labelKey }`, R25), rendered via the generic `chip` as **icon + label, never numeric or color-only** (fixing the legacy `/status/0..6`). This is the SAME map used by family cards, the family profile banner, and the student profile banner — one source of truth, distinct from the session status map.

## 7. Fixture

- `fixtures/students.js` EXTENDED in place (≥10 students, data-model *Student EXTENDED*): each student gains a real `familyId` (→ a `Family` in `fixtures/families.js`), plus the academic fields consumed by the profile (`enrollments`, `upcomingSessionIds`, `results`, `evaluation`, `notesKey`). The list itself reads only `id, nameKey, accent, statusId, level, progress, enrolled, subject, familyId`.
- The `familyId → guardian nameKey/accent` resolution is done at build time so the family chip is baked text + a baked `href` (no runtime lookup). Each row carries `data-family="<familyId>"` for the facet.

## 8. No-dead-button & demo/disabled actions

Every control honors IP8/IP9: search/status/subject/sort/**family** filters apply/reset over pre-rendered rows; the **family chip** and **"view profile"** navigate to real in-scope pages; the row chevron opens the **quick-peek drawer**; "add student"/export and any edit/delete are **demo-with-toast** (`data-demo-action`) or **disabled-with-reason** (`data-disabled-reason` / `data-reason-key`) — no persistence, no dead control, no raw i18n key.

## 9. Responsive / RTL-LTR / theme

- The table stacks to cards on mobile (Spec 002 behavior); the family chip and "view profile" stay reachable in the stacked card. No horizontal overflow.
- Arabic RTL is the default page; English ships as `students.en.html` with all links language-aware (`langRoute()`). Logical properties throughout; numbers/levels/dates never mirror. Light/Dark/System via tokens; the family chip and status chip read correctly in all three.
- Keyboard operable with visible focus; the family chip and "view profile" are real links in the tab order; axe critical = 0.

## 10. `data-*` hooks (exact, no invention)

`data-filter-form`, `data-filter="search|status|subject|sort|family"`, `data-target`, `data-filter-apply|reset|count`, `data-no-results`; `data-table`, per row `data-row` + `data-status|data-level|data-subject|data-family`; `data-row-menu="<id>"`; `data-drawer="<id>"` + the baked `<template data-preview="<id>">` + `data-sheet-close` (the kept quick-peek drawer); `data-demo-action`, `data-disabled-reason`/`data-reason-key`, `data-toast`. The family chip and "view profile" are plain `<a href>` (no new hook). **No invented hooks; no JS-generated ids/classes.**

## 11. Reused / cross-references

Reuses Spec 001/002 `pageHeader`, `summaryCards`, `filterBar`, `dataTable`/`tableFooter`, `previewTemplate`+`sheetRow`, `chip`, `states`, `ui` (avatar/medallion). New shared piece: the family `chip` link + the `family-status` map. Binds to: `students-page` Spec 002 anatomy (`../../002-admin-core-operations/contracts/directory-pages-contract.md`), the interaction patterns (`../../002-admin-core-operations/contracts/interaction-patterns-contract.md` IP2/IP3/IP5/IP8/IP9), `student-profile-contract.md` (the "view profile" target), `family-profile-contract.md` (the family chip target), `family-student-navigation-contract.md` (`student.html`/`family.html` page registration with `activeId` `students`/`families`, no dead links), and `static-html-django-ready-contract.md` (this spec's SSG/Django rules).

## 12. Django mapping & enforcement

- **Django**: `public/students.html` → `templates/admin/students.html`; `{% for student in students %}` over the rows; the family chip = `{{ student.family.guardian.name }}` linking `{% url 'admin:family' student.family_id %}`; "view profile" = `{% url 'admin:student' student.id %}`; the family facet = a server-side filter over the same queryset (no new endpoint); the status chip → the lifecycle status template tag; the preview `<template data-preview>` → a `{% include "admin/_student_preview.html" %}` per row. No whole-page `#app` mount; relative `./assets/` paths; zero external requests.
- **Enforcement**: the smoke harness (R31) asserts on `students.html` (AR + EN) that every row has a real family `<a href>` (no bare id, no `href="#"`) AND a real "view profile" `<a href>` to `student.html`, that the `data-family` facet narrows rows with visible feedback + a no-results/reset state, that the quick-peek drawer still opens/closes/returns focus, that no control is dead (IP8), that there are **no raw i18n keys** and **zero external requests**, and that status is icon+label (never numeric/color-only). Screenshot acceptance captures Students AR-RTL light + dark desktop (`screenshot-acceptance.md`).
