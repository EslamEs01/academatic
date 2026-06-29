# Contract: Scope Guard (Spec 004)

**Status**: Binding · What Spec 004 must NOT contain. **Extends** the Spec 002 + Spec 003 scope guards and reproduces them here so it is self-contained for the families/students academic work. Anything listed here appearing in the implementation is a defect, regardless of passing tests.

## G1. Forbidden — product scope (no engines, no portals)

Do NOT build or wire as real, for the families/students domain:

- **backend API** · **database** · real **authentication** · real **permission enforcement** · real **create / edit / delete persistence** (no real add-family/add-child/save/suspend/stop).
- a real **enrollment / course-assignment engine** — the student profile Courses tab is **fixture display only** (no real enroll/unenroll/assign).
- a real **grade / result engine** — the Results tab is **fixture-only** progress + certificates + a level/term summary; **no gradebook, no marks, no terms engine** (the reference has none — inventing one is forbidden).
- a real **evaluation workflow / engine** — the Evaluation tab is the **fixture-only** Monthly Progress Report rubric (criteria rows + rating pills + narrative + objectives + an **Approve demo** action); no real scoring, routing, or approval state.
- a real **attendance workflow** — no attendance rollup, no check-in/out.
- a real **finance / payment / invoice / credits / billing engine** — Plan & Billing is a **calm fixture / disabled-with-reason stub** only; the wizard's Plan & Billing step is labeled fields with **no persistence**; no invoice/credit/payout math.
- a real **notifications backend** · the legacy **feedback-meeting** workflow · **scheduled-actions** automation.

Do NOT build any **dashboards** or **portals**: student / teacher / family dashboard or portal. The `family.html` / `student.html` profiles are **admin-facing** views of fixture data — NOT a family/student portal, NOT a role dashboard, and MUST NOT impersonate one (no "my children" / login / role-switcher framing). Portals stay `future-role` (never rendered).

Do NOT build a **full Groups module** or a **full Family-Categories admin module**: Groups appear as **display chips only**; Family Categories appear as a **filter facet + chips** on `families.html` — their nav items stay `planned` (a dedicated module is a later spec).

## G2. Forbidden — technology

External **CDN** · **TypeScript** · any **SPA framework** · any **chart library** · any **table library** · any **form library / form builder / validation engine** · any **calendar library** · any **drag-and-drop library** · legacy widget libraries (select2 / flatpickr / ApexCharts / Quill / Dropzone) · a bundler that pulls a framework. The Add-Family wizard is a **baked multi-step flow** (a tiny stepper over the existing tab-selection logic — `data-step-next`/`data-step-prev`), NOT a form library and NOT a validation engine. Progress bars/rings, rating pills, the evaluation rubric, and the family/student cards stay **hand-rolled SVG/CSS** — no chart/widget library.

## G3. Forbidden — architecture regressions

No **JS-rendered whole-page mount**; no `<div id="app">`; no runtime JS building page DOM (the families cards, the profile tabs, **all** wizard steps, and every `<template data-preview>` drawer are **baked** static HTML); no JS-rendered profile sections or wizard steps (JS only **toggles** baked tab/step visibility); no absolute root asset paths; no SPA routing; no JS-generated ids/classes Django can't reproduce. The static HTML-first / per-language / GitHub-Pages / Django-ready architecture (see `static-html-django-ready-contract.md`) MUST be preserved.

## G4. Forbidden — legacy reuse

Do NOT copy from the old academatic system: logo / favicon / brand assets; legacy colors/tokens (purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, etc.); Bootstrap modal/offcanvas/grid structure or old CSS classes; old icon sets (tabler / Font Awesome); legacy widget libraries; the legacy **numeric `/status/0..6`** student statuses (replaced by the new labeled lifecycle status map — never numeric/color-only); the legacy ~30-field one-page family form ported verbatim (the wizard uses a **curated labeled subset** per step); any private/academy-specific wording, names, or data; pixel-for-pixel legacy layout. The old system is **product/UX reference only** (structure, not visuals).

## G5. Allowed in Spec 004

Static fixtures (new `families.js` = `FAMILIES` + `FAMILY_CATEGORIES`; extended `students.js` with a real `familyId` + academic fields); `localStorage` for theme / language / sidebar-rail / nav-category **plus** the per-page **selected-tab** key (the wizard step is **transient**, not persisted); the existing local Tailwind/PostCSS build; native ES-module **enhancement** JS; self-hosted Tajawal + local SVG icons; the reused **tabs** widget for profile sections + the **shared appointment drawer** + the **`<template data-preview>`** quick-peek drawer + **`scheduleAgenda`** (a filtered slice) for profile schedule sections; a **baked multi-step wizard** (all steps pre-rendered; a tiny `data-step-next`/`data-step-prev` stepper over the existing tab-selection logic; every field labeled; "Save" = demo toast; no persistence); **hand-rolled** progress bars/rings, rating pills, the evaluation rubric, the family/student cards, and the labeled lifecycle status chip; **client-side filtering of pre-rendered cards/rows** (search + status + category + family + subject facets); demo actions with toast feedback; disabled-with-reason controls; **fixture-only attention flags** (icon + label); Playwright/axe tests.

## G6. Future role surfaces stay out

Student / Teacher / Family **profiles-as-portals, dashboards, and portals** stay out of scope (`future-role`, never rendered). When later specified they must feel cheerful, comfortable, simple, warm, human, and calming — **not** this admin families/students UI. Keep the admin visual language distinct so those can diverge. The admin `family.html` / `student.html` profiles do not count as portals and MUST NOT drift into one.

## G6b. Spec 004 IS the approved spec for these surfaces

Promoting `families` → `families.html` and `addFamily` → `add-family.html`, and registering the `family.html` / `student.html` profile templates, is authorized **by this approved spec** (D3, FR-012; `family-student-navigation-contract.md`) — Spec 004 IS that spec. All **other** `families`-category planned items (`familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation`) stay **planned («قريبًا/Soon»)** with zero functionality beyond a toast; promoting any of them into a real page requires **its own** future approved spec — not this one. Results/Evaluation/Categories/Groups are satisfied **in-place** (student-profile tabs / a families facet / display chips), not as new nav pages. See `navigation-ia-contract.md`.

## G7. Admin-frontend-only

Spec 004 is an **admin frontend** feature: fixtures-only families/students academic pages reusing the Spec 001/002/003 shell, tokens, components, and `data-*` vocabulary. No backend, no API, no auth/permissions, no persistence, no engines — and **no** student/teacher/family portal or role dashboard. Every interactive control is functional / navigational / overlay / filter / tab-or-step / disabled-with-reason (no dead buttons); no raw i18n keys; zero external/CDN requests; status/attention never color-only.

## G8. Enforcement

`no-external-request` test (G2, also guarantees no chart/table/form/calendar library loads); HTML-structure + no-`id="app"` checks asserting baked family cards, baked profile tab panels (exactly one visible), **all** baked wizard steps, and baked `<template data-preview>` drawers (G3); code/asset + status-vocabulary review (G4, no numeric statuses, no legacy classes/palette/wording); the smoke no-dead-button / no-raw-i18n-key / tab-switch / wizard-advances / drawer-opens / no-portal-in-DOM tests; and screenshot review against the failure conditions (generic CRM, plain spreadsheet, missing family↔student relationship, missing family/student profile, missing wizard, missing result/evaluation decision, missing timetable linkage, dead links, legacy copy, raw keys, poor dark mode, broken RTL/LTR, JS-rendered whole page, can't deploy to Pages, hard to Djangoify = fail). This contract does NOT run `/speckit.tasks` or implement anything.
