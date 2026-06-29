# Contract: Scope Guard (Spec 005)

**Status**: Binding · What Spec 005 must NOT contain. **Extends** the Spec 002 + Spec 003 + Spec 004 scope guards and reproduces the relevant lines here so it is self-contained for the attendance/session-outcomes work. Anything listed here appearing in the implementation is a defect, regardless of passing tests.

## G1. Forbidden — product scope (no engines, no portals, no finance)

Do NOT build or wire as real, for the attendance/outcomes domain:

- a **backend API** · a **database**.
- real **authentication** · real **permission enforcement**.
- real **create / edit / delete persistence** (no save/mutation of any kind).
- a real **attendance engine** — no attendance rollup, no check-in/out, no per-student roster engine (attendance is a **session-level** fixture outcome + a `present/capacity` display).
- a real **outcome-workflow / status-mutation engine** — no real **mark-attend / mark-student-absent / mark-teacher-absent / cancel / reschedule SAVE**; no real **reverse**; no real lifecycle state machine. The legacy **11-state lifecycle** (`pending/waiting/running/attend/student-absent/teacher-absent/teacher-cancel/student-cancel/admin-cancel/trial`) MUST NOT be imported as an engine.
- a real **notifications backend** · real **WhatsApp / Zoom / live** integration · the legacy **enter-time / quick-queue / proof-video** workflows as real features (referenced as calm display hints at most).
- a real **make-up scheduling engine** · a real **credit / payment / accounting / billing / salary** engine — make-up/credit is a **display hint only**; the real action is **disabled-with-reason** ("requires the finance/credit module — out of scope"). No balance, no math, no ledger.
- a real **attendance-reports / teacher-performance** engine · the finance **session-ledger / salary roll-ups** · **Sessions Analysis** as a built page (it stays `planned`).

Do NOT build any **dashboards** or **portals**: student / teacher / family dashboard or portal. The `attendance.html` board and the Student/Family profile hints are **admin-facing** views of fixture data — NOT a family/student/teacher attendance portal, and MUST NOT impersonate one (no "my child's attendance" / login / role-switcher framing). Portals stay `future-role` (never rendered).

The legacy session-action family is reused as a **concept only** — each action maps to honest demo feedback, never a real workflow:

| Legacy action | Spec 005 treatment (allowed) | Forbidden as |
|---|---|---|
| Mark Attend | `data-demo-action` → toast | a real attendance save / per-student roster |
| Mark Absent ("who?") → student/teacher | `data-confirm` → toast; absent party = a distinct status + drawer attribution | a real status mutation |
| Cancel ("who?") → teacher/student/admin | `data-confirm` → toast; who = a drawer attribution (not 3 statuses) | a real cancellation engine |
| Reschedule (make-up) | `data-confirm` → toast; new-time = a display hint | a real reschedule / make-up scheduler |
| Notify (WhatsApp / notification) | `data-demo-action` → toast, or disabled-with-reason | a real notifications backend |
| Add to Credit / make-up | **disabled-with-reason** + a display hint | a real credit / finance ledger |
| Reverse / Add Feedback | `data-demo-action` → toast | real persistence |

## G2. Forbidden — technology

Do NOT add:

- External **CDN** · **TypeScript** · any **SPA framework** · a bundler that pulls a framework.
- any **chart library** · any **table library** · any **form library / form builder / validation engine** · any **calendar library** · any **drag-and-drop library**.
- legacy widget libraries (select2 / flatpickr / ApexCharts / Quill / Dropzone) or any remote font/script/style.

The summary tiles, the filter bar, the outcome rows/cards, the labeled outcome chips, the make-up/follow-up hints, and the canonical outcome drawer stay **hand-rolled SVG/CSS** — no chart/widget library. The tile→filter is a **tiny `data-filter-set` shim over the existing `applyFilter`**, NOT a new client-side filter engine.

## G3. Forbidden — architecture regressions

Do NOT regress the static HTML-first architecture (see `static-html-django-ready-contract.md`):

- no **JS-rendered whole-page mount**; no `<div id="app">`.
- no runtime JS building page DOM — the summary tiles, **every** `.outcome-row`, the tile **counts**, and **every** `<template data-preview>` outcome drawer are **baked** static HTML.
- no **JS-computed tile count**; no **JS-assembled drawer body** (JS only **clones** the baked template + **toggles** row/tile visibility + re-runs `applyFilter`).
- no absolute root asset paths; no SPA routing; no JS-generated ids/classes Django can't reproduce.
- no **second outcome drawer** (per-page bespoke) — exactly one canonical `outcomeTemplate` partial.

## G4. Forbidden — legacy reuse

Do NOT copy from the old academatic system:

- logo / favicon / brand assets; pixel-for-pixel legacy layout.
- legacy colors/tokens — purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, and the rest.
- Bootstrap modal/offcanvas/grid structure or old CSS classes; old icon sets (tabler / Font Awesome); legacy widget libraries.
- **the numeric `status=0..N` codes** (`status=1`, `2,10`, `3,4`, `5,6,7`, `8`) — replaced by the new labeled OUTCOME map, never numeric/color-only.
- the **tall multi-tab Mark-Absent / Cancel modals ported verbatim** (the calm drawer + a small confirm modal replace them); the **enter-time / quick-queue / proof-video** workflow chrome.
- the **route-per-status / ~230-variant-URL** wall (one stateful filtered page replaces it).
- any private/academy-specific wording, names, or data.

The old system is **product/UX reference only** (structure, not visuals). The improvements over it are mandatory, not optional: labeled chips replace `status=1..8`; one stateful filtered page replaces the route-per-status wall; one canonical drawer replaces the 20×-duplicated modal set; a single calm row-action menu replaces 3–6 inline pills; calm confirms replace the 13-control modals.

## G5. Allowed in Spec 005

Explicitly permitted (fixtures only, no engines):

- Static fixtures: new `attendance.js` = `SESSION_OUTCOMES` (reusing the session/participant shape + resolving real `Student`/`Family`/teacher refs) + the derived `OUTCOME_SUMMARY`.
- The new **labeled OUTCOME status map** (`outcome-status.js` → `{tone, icon, labelKey}`, AA-contrast, **never numeric/color-only**) — a third vocabulary, distinct from the session status map and the lifecycle map.
- The **one canonical outcome drawer** (`outcomeTemplate`, a superset of the Spec 003 appointment drawer + a shared `appointmentRows` helper) reused on Attendance + Sessions; the Schedule page keeps its appointment drawer; profiles deep-link.
- `localStorage` for theme / language / sidebar-rail / nav-category — the Attendance **filter selection + open drawer are transient** (not persisted).
- The existing local Tailwind/PostCSS build; native ES-module **enhancement** JS; self-hosted Tajawal + local SVG icons.
- **Demo actions with toast feedback**; **confirm-modal → demo toast** for destructive actions (cancel / mark-absent / reschedule); **disabled-with-reason** controls (any real save / real notify / add-to-credit); status-gated actions.
- A **make-up / credit DISPLAY hint** only (no balance, no finance math).
- The **`data-filter-set` tile→filter** hook (the one new hook) over the existing `applyFilter`; **client-side filtering** of pre-rendered rows (day / teacher / family / subject / outcome / attention facets).
- **Fixture-only** integrations: Sessions (secondary outcome chip + drawer + deep-link) · Student (recent-outcomes hint + deep-link) · Family (children follow-up hint + deep-link).
- The **minimal fixture-backed dashboard signal** (one follow-up count chip folded into the existing people-signal card; optional outcome chip on Today's Sessions rows).
- Playwright / axe tests extending the existing harness.

## G6. Future role surfaces stay out

Student / Teacher / Family **profiles-as-portals, dashboards, and portals** stay out of scope (`future-role`, never rendered). When later specified they must feel cheerful, comfortable, simple, warm, human, and calming — **not** this admin attendance UI. Keep the admin visual language distinct so those can diverge. The admin Attendance board + the profile hints do not count as portals and MUST NOT drift into one. In particular: no "my child's attendance" view, no parent/student/teacher login, no role switcher, and no `teacher-portal`/`family-portal`/`student-portal` id anywhere in the rendered DOM.

## G6b. Spec 005 IS the approved spec for these surfaces

Promoting a **new `attendance`** item → `attendance.html` in the `control` category (adding its route to `FUTURE_ROUTES` at promotion) is authorized **by this approved spec** (D1, FR-012; `navigation-impact-contract.md`) — Spec 005 IS that spec. **`sessionsAnalysis`** (the count+hours analytics roll-up) and **every other** planned `control` item (`messages`, `leads`, `tasks`, `announcements`, `timeConverter`, `publicHoliday`, `scheduledActions`) stay **planned («قريبًا/Soon»)** with zero functionality beyond a toast; promoting any of them into a real page requires **its own** future approved spec — not this one. The Sessions/Student/Family/Dashboard integrations are satisfied **in-place** (a chip / a hint / a deep-link), **not** as new nav pages, and add **no** new profile template.

## G7. Admin-frontend-only

Spec 005 is an **admin frontend** feature: a fixtures-only attendance/outcomes board + light integrations reusing the Spec 001/002/003/004 shell, tokens, components, and `data-*` vocabulary. No backend, no API, no auth/permissions, no persistence, no engines, no finance/credit — and **no** student/teacher/family portal or role dashboard. The standing invariants hold on every Spec 005 surface:

- every interactive control is functional / navigational / overlay / filter / demo / confirm→demo / disabled-with-reason (**no dead buttons**);
- **no raw i18n keys**; **zero external/CDN requests**;
- outcome status / attention is **never color-only** (always icon + label);
- correct in **Arabic RTL + English LTR** and **Light / Dark / System**; responsive with no horizontal overflow; axe critical = 0.

## G8. Grep-able anti-patterns (any hit = investigate / likely defect)

- `id="app"` / `getElementById('app')` / `#app` whole-page mount → G3.
- `status=0` … `status=8` / `/status/` numeric codes / `outcome === 1` → G4 (numeric statuses).
- `rgb(94,77,126)` / `rgb(248,194,10)` / `rgb(255,102,146)` / `#5e4d7e` / `#f8c20a` / `#ff6692` → G4 (legacy palette).
- `bootstrap` / `select2` / `flatpickr` / `apexcharts` / `quill` / `dropzone` / `cdn.` / `https://` in an asset ref → G2 (library / CDN).
- `fetch(` / `XMLHttpRequest` / `axios` / `localStorage.setItem('outcome` / `.save(` / `POST` for an action → G1 (real persistence / mutation / notify).
- `new Chart(` / `<canvas` for a metric / a `<table>` table-library widget → G2.
- `teacher-portal` / `family-portal` / `student-portal` / "my child" / role switcher in the DOM → G1/G6.
- a second outcome drawer template (a per-page bespoke drawer) instead of the one canonical `outcomeTemplate` → G1/architecture.
- credit/balance math (`balance`, `credit -=`, `salary`, invoice totals) → G1 (finance engine).
- a runtime-built tile count (`tile.textContent = count`) instead of a baked count → G3.
- a new `data-*` action hook beyond `data-filter-set` (e.g. `data-mark-attend`, `data-save-outcome`) → G1/G3 (no new engine/hook).
- `sessions-analysis.html` / a `sessionsAnalysis` route, or any other `control` item flipped to `implemented` → G6b (only `attendance` is promoted).
- a per-student attendance **roster / checkbox grid** (instead of a session-level `present/capacity`) → G1 (no attendance engine).
- a new student/family **attendance tab** on a profile (instead of a hint + deep-link) → G6b/scope creep.
- `enter_time` / `quick_queue` / `proof_video` / `remind_teacher_at` as real fields/flows → G1/G4 (legacy workflows, concept-only).
- a new dashboard **stat row / KPI wall** or an attendance-rate widget → G1 (minimal, fixture-backed signal only).

## G8b. The one-line tests

A reviewer can sanity-check Spec 005 scope with five questions; a "no" to any is a defect:

1. Is the Attendance board (tiles + filter bar + every `.outcome-row` + every `<template data-preview>` drawer) fully present in **View Source with JS off**?
2. Does every outcome action **toast / confirm→toast / disable-with-reason** — and **nothing** persist, mutate, notify, reschedule, or touch credit?
3. Is the outcome shown as a **labeled chip (icon + text)** — never a numeric code (`status=1..8`) and never color-only?
4. Is `attendance` the **only** promoted nav item, with `sessionsAnalysis` + the rest of `control` still «قريبًا/Soon»?
5. Are there **zero external requests** and **zero** chart/table/form/calendar libraries loaded?

## G9. Enforcement

`no-external-request` test (G2, also guarantees no chart/table/form/calendar library loads); HTML-structure + no-`id="app"` checks asserting baked summary tiles (with derived counts + `data-filter-set`), the baked filter bar, baked `.outcome-row`s, and baked `<template data-preview>` outcome drawers (G3); code/asset + status-vocabulary review (G4 — no numeric statuses, no legacy classes/palette/wording, the grep list of G8); the smoke no-dead-button / no-raw-i18n-key / tile-filter / drawer-opens / confirm-then-toast / disabled-with-reason / no-portal-in-DOM tests; the NI12 nav guard (`attendance` is a real `<a>` with a route, exactly one active item, `sessionsAnalysis` + the rest stay Soon, no dead link); and screenshot review against the failure conditions (generic attendance spreadsheet, missing outcome vocabulary, missing student-vs-teacher absence distinction, missing the canonical drawer, missing demo/disabled actions, dead links, legacy copy / numeric statuses, raw keys, poor dark mode, broken RTL/LTR, JS-rendered whole page, claims real persistence, can't deploy to Pages, hard to Djangoify, new stat wall / unbacked finance widget, >1 nav category panel = fail). This contract does NOT run `/speckit.tasks` or implement anything.
