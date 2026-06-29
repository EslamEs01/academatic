# Contract: Sessions Page Outcome Integration

**Status**: Binding · `public/sessions.html` (+ `.en`). The Spec 001/003 Sessions page (`app/src/js/pages/sessions.js`) **lightly enriched** with session-outcome awareness: each row KEEPS its scheduling **status** chip as PRIMARY and gains a small **secondary outcome chip** ONLY when a recorded outcome exists; the row "view" opens the **canonical outcome drawer** (the SAME drawer Attendance uses); and a **"View attendance"** deep-link points at `attendance.html`. Nothing else about the page changes. Admin operations view only — **not** an attendance page, **not** a portal.

## 1. Purpose & exactly-what-changes vs Spec 001/003

This contract EXTENDS, it does not replace, the existing Sessions page. The page stays the same calm two-tab (List + today Timetable) view over `SESSIONS_FULL` with `pageHeader` + `summary()` status tiles + `filterBar` (status/subject/search) + `dataTable` + `scheduleAgenda` + `tableFooter` + `noResults` (see `sessions.js` `renderSessions()`). **The only additions are the three below** — the existing lifecycle, structure, filters, status chips, tabs, and responsiveness are unchanged.

The three changes, and **only** these three:

1. **A secondary outcome chip** per row — added to the existing status cell (`<td>${statusChip(s.statusId)}</td>` in `row(s)`), rendered ONLY when the row has a recorded outcome (§2).
2. **The canonical outcome drawer** — the baked `<template data-preview="<id>">` the row opens is upgraded from `appointmentTemplate(apptItem(s))` to **`outcomeTemplate(...)`** (the same drawer Attendance opens), §3.
3. **A "View attendance" deep-link** — a real `<a href>` from the page header (beside the existing `data-demo-action` "new session" affordance) to `attendance.html` (§4).

No Spec 001/003 column, control, tab, tile, filter facet, or behavior is removed. No new page chrome, no table library, no JS-built rows, no bespoke drawer, no new nav item.

## 2. The secondary outcome chip — primary/secondary rule (R34, binding)

- The existing **scheduling status chip** (`statusChip(s.statusId)`, the Spec 001/003 session map `live/upcoming/completed/cancelled`) MUST stay PRIMARY on every row — the Sessions page is a scheduling/operations view, so the status is the lead signal (R34).
- A small **secondary** outcome chip (`outcomeChip(s.outcomeId)`, the labeled OUTCOME map — `outcome-status-contract.md`) MUST be added beside the status chip **ONLY when a recorded outcome exists** — i.e. `outcomeId ∈ { attended, studentAbsent, teacherAbsent, cancelled, rescheduled }`. It MUST render as **icon + label** (AA-contrast, never numeric/color-only) and MAY be visually subordinate (smaller / softer) to the primary status chip.
- The secondary chip MUST NOT appear on plain **`upcoming` / `live`** rows — a not-yet-recorded session shows its status only. This avoids **double-encoding** (R34): one primary signal per surface, a secondary only where it adds information (no return to the legacy 11-state conflation, no 3–6-pills-per-row weakness).
- The secondary chip is **display-only**: it resolves through the fixture's `outcomeId` (the `SESSION_OUTCOMES` join / `SESSIONS_FULL` extension, data-model *SessionOutcome*), never via a runtime engine, and it MUST NOT mutate, override, or recolor the scheduling status. Where the fixture also flags `needsFollowUp`, the row MAY carry the existing attention flag (icon + label) — unchanged from Spec 003, not a new control.

## 3. Canonical outcome drawer (the SAME drawer as Attendance, binding)

- The row "view" (the existing `data-row-menu="<id>"` kebab and the row's open affordance) MUST open the **canonical outcome drawer** — the baked `<template data-preview="<id>">` cloned by the existing `data-drawer`→`openSheet` engine — built by **`outcomeTemplate(item)`** (`outcome-details-contract.md`, R35), NOT by `appointmentTemplate`. Concretely, the `templates` line in `renderSessions()` (`data.rows.map((s) => appointmentTemplate(apptItem(s)))`) is swapped to bake `outcomeTemplate` for rows carrying a recorded outcome, and **degrades** to the plain appointment view for rows that have none.
- It MUST be the **same** canonical drawer Attendance opens (one canonical surface — R35) — same builder, same fields, same status-gated action cluster, same scrim/focus-trap/Esc/return-focus engine. Sessions MUST NOT define a bespoke per-page outcome drawer/modal (the legacy 20×-duplicated SessionActionPanel is exactly what this avoids).
- The drawer's actions stay **status-gated, demo / confirm→demo / disabled-with-reason** (`outcome-actions-contract.md`, R36): opening or acting from a Sessions row MUST NOT save, mutate status, persist, notify, reschedule, or touch credit. The action cluster shown is gated on the row's `outcomeId` (e.g. no "reverse" on an upcoming row), not on the Sessions page.

## 4. "View attendance" deep-link (→ `attendance.html`, binding)

- The page MUST offer a **"View attendance"** affordance that is a **real `<a href>`** to `attendance.html`, language-aware (`attendance.en.html` on the English page via the existing `getLang()`/`langRoute()` pattern, like `schedHref()` in `dashboard.js`). It sits on an existing affordance (the `pageHeader` action area beside the "new session" button) — not a new module, tile, or row.
- It MUST be a live navigation to the in-scope page built this spec (`attendance-page-contract.md`) — never `href="#"`, never a dead control, never a JS-only handler.
- The deep-link MAY carry a filter hash/query the Attendance page reads client-side (e.g. a teacher/day facet), but landing MUST NOT require JS — `attendance.html` renders its rows statically regardless.

## 5. MUST NOT (hard boundaries)

- MUST NOT change the existing Sessions lifecycle, columns, tabs (List/Timetable), filter facets, status tiles, summary, or structure beyond the three additions in §1.
- MUST NOT **duplicate an attendance list** inside Sessions — no embedded outcomes table, no per-student roster, no second list/card hybrid, no outcome summary tiles; the canonical Attendance surface owns that. Sessions stays the scheduling table; deep-link out for the outcomes board.
- MUST NOT **mutate the scheduling status**, recolor it, or replace the primary `statusChip` with the outcome chip; the two coexist (primary status + conditional secondary outcome).
- MUST NOT add a finance/credit/make-up claim, a real attendance metric, a chart, a table/form library, a new nav item, a portal, or a JS-rendered whole page.

## 6. Edge cases & states (binding)

- **Mixed-state day**: a List/Timetable spanning attended + student-absent + teacher-absent + cancelled + rescheduled + upcoming MUST render every primary status chip + conditional secondary outcome chip legibly, with no color collision and no row growing a pill wall (one status + at most one outcome + the optional attention flag).
- **Group session**: attendance is a **session-level** outcome — a group row shows ONE outcome chip + the existing `present/capacity` cell (`<span class="tabular">${num(s.present)} / ${num(s.capacity)}</span>`), never a per-student roster engine.
- **Upcoming/live (no outcome)**: the row shows its status chip only and opens the drawer in its plain appointment form (degraded `outcomeTemplate`), with no absence attribution and the action cluster gated accordingly.
- **Long content**: long AR/EN session/teacher/room names keep the Spec 002 truncate/wrap behavior in both directions; the added chip never forces horizontal overflow.
- **Empty / loading / error**: the existing `noResults` + the page states are unchanged — the secondary chip and the deep-link add no new state.

## 7. `data-*` hooks (exact, no invention)

Reuses, unchanged: `data-filter-form`, `data-filter="status|subject"`, `data-target`, `data-filter-apply|reset|count`, `data-no-results`; `data-table`, per row `data-block="<id>"` + `facetAttrs` (`data-status|data-subject|data-teacher` + search); `data-row-menu="<id>"`; the tabs hooks (`data-tabs="sessions"`, `data-tab="list|timetable"`); **`data-drawer="<id>"` + the baked `<template data-preview="<id>">` + `data-sheet-close`** (now built by `outcomeTemplate`); `data-demo-action`, `data-confirm` (+ `-title|-msg|-cta|-toast|-danger`), `data-disabled-reason`/`data-reason-key`, `data-toast` (drawer actions). The "View attendance" affordance is a plain `<a href>` (no new hook). The only new Spec 005 hook `data-filter-set` belongs to the Attendance page, **not** here. **No invented hooks; no JS-generated ids/classes.**

## 8. Responsive / RTL-LTR / theme / a11y

- The List table stacks to cards on mobile (existing behavior); both the primary status chip and the secondary outcome chip stay legible and wrap without overflow; the drawer is full-height on mobile. The Timetable agenda is unchanged.
- Arabic RTL is the default page (`sessions.html`); English ships as `sessions.en.html` with the "View attendance" link language-aware (`langRoute()`); logical properties; times/dates/numbers never mirror.
- Light/Dark/System via tokens; both chips read correctly (icon + label) in all three, never color-only.
- Keyboard operable with visible focus; the deep-link is a real link in the tab order; the drawer keeps focus-trap + Esc + return-focus; ≥44px targets; axe critical = 0.

## 9. Django mapping & enforcement

- **Django**: `public/sessions.html` → `templates/admin/sessions.html`; `{% for s in sessions %}` over the rows; the secondary outcome chip = `{% if s.outcome %}{% outcome_chip s.outcome %}{% endif %}` beside the existing scheduling `{% status_chip s.status %}`; the row drawer `<template data-preview>` → the **same shared** `{% include "admin/_outcome_details.html" %}` partial used by Attendance (not a sessions-specific template); "View attendance" → `{% url 'admin:attendance' %}` (language via `LocaleMiddleware`). No whole-page `#app` mount; relative `./assets/` paths; zero external requests.
- **Enforcement**: the smoke harness (R43) asserts on `sessions.html` (AR + EN) that rows with a recorded outcome carry the **secondary outcome chip** (icon + label, never numeric/color-only) AND plain upcoming/live rows do **not** (R34), that the row "view" opens the **canonical** `<template data-preview>` / `outcomeTemplate` drawer (the same partial Attendance uses, not a bespoke one), that a real **"View attendance" `<a href>`** to `attendance.html` exists (no `href="#"`, no dead control), that the primary `statusChip` is unchanged and not mutated, that no embedded attendance list/tiles were added, that there are **no raw i18n keys** and **zero external requests**. Screenshots: Sessions page outcome integration AR-RTL light desktop (`screenshot-acceptance.md`, Visual Acceptance #6).

## 10. Reused / cross-references

Reuses Spec 001/002/003 `pageHeader`, `summary()` status tiles, `filterBar`, `dataTable`/`tableFooter`, `tabs`, `scheduleAgenda`, `statusChip`, `attentionFlag`, `states`, `ui` (avatar/button), and the drawer/confirm/toast engines — all from `sessions.js` unchanged. New shared pieces consumed (not defined) here: `outcomeChip` (`outcome-status-contract.md`) and `outcomeTemplate` (`outcome-details-contract.md`). Binds to: `outcome-status-contract.md` (the secondary chip vocabulary), `outcome-details-contract.md` (the canonical drawer + the `appointmentRows` superset), `outcome-actions-contract.md` (the drawer's status-gated demo/confirm/disabled actions), `attendance-page-contract.md` (the "View attendance" target), `navigation-impact-contract.md` (no dead links), `static-html-django-ready-contract.md` (SSG/Django rules), `scope-guard.md` (no engine/finance/duplication), `screenshot-acceptance.md`.
