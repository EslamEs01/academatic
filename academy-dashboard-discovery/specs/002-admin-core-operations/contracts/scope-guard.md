# Contract: Scope Guard (Spec 002)

**Status**: Binding · What Spec 002 must NOT contain. Anything here appearing in the implementation is a defect, regardless of passing tests.

## G1. Forbidden — product scope

Do NOT build or wire as real: backend API · database · real authentication · real permission **enforcement** · real create/update/delete **persistence** · attendance workflow · finance / payroll / invoices / wallet · live Zoom integration · notifications backend · report **detail analytics**.

Do NOT build any **dashboards** or **portals**: student dashboard, teacher dashboard, family dashboard, student portal, teacher portal, family portal. (Spec 002 is admin operation **pages** only.)

Only six admin pages ship: **Sessions, Schedule, Students, Teachers, Courses, Settings** — plus the shared admin patterns and sidebar wiring.

## G2. Forbidden — technology

External **CDN** · **TypeScript** · any **SPA framework** · any **chart library** · any **calendar library** · legacy widget libraries (select2/flatpickr/ApexCharts/Quill/Dropzone) · a bundler that pulls a framework. Mini-visuals stay hand-rolled SVG/CSS; schedule stays a structured list (no calendar lib).

## G3. Forbidden — architecture regressions

No JS-rendered whole-page mount; no `<div id="app">`; no runtime JS building page DOM; no absolute root asset paths; no SPA routing. The static HTML-first / GitHub-Pages / Django-ready architecture (see `static-html-django-ready-contract.md`) MUST be preserved.

## G4. Forbidden — legacy reuse

Do NOT copy from the old academatic system: logo / favicon / brand assets; legacy colors/tokens (purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, etc.); Bootstrap modal/offcanvas/grid structure or old CSS classes; old icon sets (tabler / Font Awesome); legacy widget libraries; any private/academy-specific wording, names, or data; pixel-for-pixel legacy layout. The old system is **product/UX reference only**.

## G5. Allowed in Spec 002

Static fixtures; `localStorage` for theme/language/sidebar; the existing local Tailwind/PostCSS build; native ES-module enhancement JS; self-hosted Tajawal + local SVG icons; drawers/modals/popovers/toasts as transient JS widgets; **client-side filtering of pre-rendered rows**; demo actions with toast feedback; disabled-with-reason controls; a read-only roles/permission **preview** (no enforcement); Playwright/axe tests.

## G6. Future (do NOT implement now)

Student/Teacher/Family dashboards & portals are out of scope. When later specified they must feel cheerful, comfortable, simple, warm, human, creative, calming, and easy for non-technical users — **not** heavy admin-style dashboards. Keep the admin visual language distinct so those can diverge.

## G6b. Nav affordances for future areas (the one allowed surfacing)

The sidebar/topbar MAY surface future areas **only** as **planned (قريبًا)** or **disabled-with-reason** nav affordances — pure UI hooks with **NO backend/module wiring** (no route, no page, no data). This is not a scope exception: a planned/disabled item ships zero functionality beyond a toast. The teacher/family/student **portals** stay `future-role` and MUST NOT be rendered in the admin nav or implemented. Building a real page from a planned item (finance / messages / tasks / families / leads / materials / certificates / insights / staff) requires its **own approved spec** — not this one. See `navigation-ia-contract.md`.

## G7. Enforcement

`no-external-request` test (G2); HTML-structure + no-`id="app"` check (G3); code/asset review (G4); the smoke no-dead-button / no-raw-key tests; and screenshot review (drift/clutter/spreadsheet/placeholder = fail). This plan does NOT run `/speckit.tasks` or implement anything.
