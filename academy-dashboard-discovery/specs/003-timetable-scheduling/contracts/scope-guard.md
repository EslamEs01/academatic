# Contract: Scope Guard (Spec 003)

**Status**: Binding · What Spec 003 must NOT contain. **Extends** the Spec 002 scope guard and reproduces it here so it is self-contained for the timetable/scheduling work. Anything listed here appearing in the implementation is a defect, regardless of passing tests.

## G1. Forbidden — product scope

Do NOT build or wire as real: **backend scheduling API** · **database** · real **authentication** · real **permission enforcement** · real **create / edit / delete persistence** (no real reschedule/cancel/join) · **drag-and-drop scheduling** · a **recurrence engine** · **REAL conflict detection** (attention/conflict flags are **fixture-only display** — no detection engine) · real **Zoom / live integration** · real **attendance workflow** · **notifications backend** · **finance / payroll / invoices / wallet** · the **request→respond scheduling** broadcast workflow · **scheduled-actions** automation.

Do NOT build any **dashboards** or **portals**: student / teacher / family dashboard; student / teacher / family portal. (Spec 003 layers a scheduling experience onto existing **admin** pages only.)

Spec 003 touches only the existing **Schedule, Sessions, and Dashboard** surfaces (+ `.en`) plus shared scheduling patterns — it ships **no new page**.

## G2. Forbidden — technology

External **CDN** · **TypeScript** · any **SPA framework** · any **chart library** · any **calendar library** · any **drag-and-drop library** · legacy widget libraries (select2 / flatpickr / ApexCharts / Quill / Dropzone) · a bundler that pulls a framework. The weekly timetable stays a **hand-rolled CSS grid**; all visuals stay hand-rolled SVG/CSS.

## G3. Forbidden — architecture regressions

No **JS-rendered whole-page mount**; no `<div id="app">`; no **runtime-drawn grid** (the timetable is baked at build time, block spans precomputed); no runtime JS building page DOM; no absolute root asset paths; no SPA routing. The static HTML-first / GitHub-Pages / Django-ready architecture (see `static-html-django-ready-contract.md`) MUST be preserved.

## G4. Forbidden — legacy reuse

Do NOT copy from the old academatic system: logo / favicon / brand assets; legacy colors/tokens (purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, etc.); Bootstrap modal/offcanvas/grid structure or old CSS classes; old icon sets (tabler / Font Awesome); legacy widget libraries; the legacy 11-state status vocabulary as a real lifecycle; any private/academy-specific wording, names, or data; pixel-for-pixel legacy layout. The old system is **product/UX reference only** (structure, not visuals).

## G5. Allowed in Spec 003

Static fixtures; `localStorage` for theme / language / sidebar-rail / nav-category **plus** the per-surface **selected-tab** key; the existing local Tailwind/PostCSS build; native ES-module **enhancement** JS; self-hosted Tajawal + local SVG icons; a **hand-rolled CSS-grid weekly timetable** (baked block spans); a generic **tabs** widget + **drawers / modals / toasts** as transient JS widgets; **client-side filtering of pre-rendered blocks/rows** across both tabs; demo actions with toast feedback; disabled-with-reason controls; **fixture-only attention flags** (icon + label); Playwright/axe tests.

## G6. Teacher timetable = admin-facing display only; future role surfaces stay out

The **teacher timetable** is an admin-facing **in-page lens** on the Schedule Timetable tab (single-teacher week + all-teachers overview) — **NOT** a teacher portal, teacher dashboard, or new page, and with **no** real availability/edit persistence.

Student / Teacher / Family **timetables, dashboards, and portals** stay out of scope. When later specified they must feel cheerful, comfortable, simple, warm, human, and calming — **not** this heavy admin timetable. Keep the admin visual language distinct so those can diverge.

## G6b. New page needs its own approved spec — Spec 003 adds NO nav page

Promoting any planned nav affordance (e.g. `sessionsAnalysis`, `scheduleSearch`, `timeConverter`, `scheduledActions`, `publicHoliday`, `sessionsKpi`) into a **real page** requires **its own approved spec** — not this one; such items stay **planned («قريبًا/Soon»)** with zero functionality beyond a toast. **Spec 003 introduces no new nav item or route**: the teacher timetable is in-page (G6), and the `schedule` item's id/route are unchanged (only its label is reconciled). See `navigation-ia-contract.md`.

## G7. Enforcement

`no-external-request` test (G2, also guarantees no calendar/chart library loads); HTML-structure + no-`id="app"` + present-`[data-timetable]`-grid checks (G3); code/asset + status-vocabulary review (G4); the smoke no-dead-button / no-raw-i18n-key / tab-switch / drawer-opens tests; and screenshot review (plain-table-only, missing calendar tab, missing drawer, legacy copy, clutter, JS-rendered, or a teacher-portal drift = fail). This contract does NOT run `/speckit.tasks` or implement anything.
