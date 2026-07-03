# Design Freeze (Spec 016 — binding on Specs 017–027; no future spec reopens design)

Principle: **the design system already exists and is proven across 49 pages — this freeze names it, fills the few missing patterns, and forbids the alternatives.** Entries say either *frozen-as-exists* (source) or *frozen-new* (defined here, built once in its owning spec, reused after).

## Shells & navigation

- **Admin shell** — frozen-as-exists (Spec 001/010): icon rail (6 categories) + light category panel + topbar. Never used by role apps.
- **Role dashboard shell (v2)** — frozen-new (built in 017, per `role-dashboard-ia.md`): portal header (evolved to role topbar) + flat role sidebar (7–9 items, icon+label, single level, collapsible, role-accented active pill) + single-column `pt-body` content well (max-width 980px stands). No categories, no nesting, no admin classes.
- **Role topbar** — frozen: brand+portal name / greeting / theme+lang / role-switch; NO notification badge, NO search until honestly delivered.
- **Mobile navigation** — frozen: admin = existing off-canvas drawer; role apps = same drawer pattern hosting the role sidebar; bottom-tab bars are FORBIDDEN (one nav pattern per family).
- **Admin locked-page style** — frozen-new (025/026): the page renders its header + a capability explainer card + a `LOCK` band (lock icon + «مقفلة — تتطلب صلاحية» tone-amber labeled chip + one calm sentence) + preview content where honest. Never blank, never a toast-only destination.
- **«قريبًا» replacement pattern** — frozen: planned nav items become real pages or LOCK/GATE shells in their owning spec; until then the existing labeled planned-button behavior stands; bare "coming soon" pages are FORBIDDEN.
- **backendRequired gate pattern** — frozen-as-exists (012–015): `.pt-planned` mini-card (non-anchor div + labeled availabilityChip) · inline `.pt-card-chip` on content-bearing preview cards · `.pt-note` gate sentence with labeled chip · plus the new full-page GATE shell (025/026). These four, nothing else.

## Tokens & foundations (all frozen-as-exists, Spec 001)

- **Palette**: warm-cream surfaces + violet primary + the 5 accents; role accents LOCKED: student=sky, family=violet/primary, teacher=teal, admin=violet. New colors FORBIDDEN.
- **Dark mode**: token-pair system as-is; every new page ships light+dark+system; axe 0/0 required.
- **Arabic typography**: current font stack + RTL-first layout; AR is the default language of every pair; Arabic-Indic digits via `num()` for user-facing counters (`.tabular` for times); EN mirrors LTR.
- **Spacing scale**: the existing clamp/gap rhythm (22px section gap, 12px card gap, 16px card padding, 18px card radius, 999px chips) — frozen numerically as used.
- **Icons**: the existing sprite (lucide-derived, `icon()` helper, `#i-*` refs). New icons enter the sprite via build only; no second icon system, no emoji-as-icon in chrome (emoji allowed inside authored copy/empty-states as today).
- **Visual density**: admin = comfortable-dense (cards + tables where earned); role apps = airy card-first (current portal rhythm). Legacy-style 10+ column density FORBIDDEN everywhere.

## Component families

- **Cards** — frozen-as-exists: admin directory/KPI cards; portal `.pt-card` family (card-row, title/sub, tags). New variants must be composed from these primitives.
- **Stat cards** — `.pt-stat` (portal) and admin KPI card (admin). Authored figures only; NEVER money figures outside admin-finance sanctioned literals.
- **Timeline cards** — frozen-as-exists: the outcome/history card shape (medallion + title—entity + day + chip + summary/homework lines) from 013/014/015.
- **Agenda cards** — frozen-as-exists: `.pt-day` day-groups (portals) and Spec-003 agenda (admin). Weekly GRIDS allowed only in the admin timetable tab (existing); role apps use day-groups, grids FORBIDDEN.
- **Profile cards** — `.pt-prof-row` k/v rows + labeled chips + gate note (as 014/015).
- **Settings cards** — admin settings-section pattern (002) extended in 026; toggle rows render display-only with GATE chips until real.
- **Finance locked cards** — frozen-new (025): status band + GATE; **zero figures, zero currency tokens** outside the Spec-009 sanctioned authored literals on the existing finance page.
- **Tables** — admin-only, existing table component, ≤7 visible columns, always a card/drawer alternative for detail; tables in role apps FORBIDDEN (machine-asserted today, stands forever).
- **Filters** — tiles-as-filters (count tiles) + filter-bar with `[data-filter]` hooks + `[data-row][hidden]` visibility (the 010 fix). No new filter machinery.
- **Tabs** — the Spec-003 accessible tabs widget, baked panels, `#view=` hash. Role apps prefer separate pages over tabs; tabs allowed for profile-like sub-views only.
- **Modals/drawers** — existing confirm-modal + detail drawer (canonical outcome/appointment drawers). New drawers must be baked `<template>`-style like existing ones; no runtime-built DOM.
- **Forms** — REAL forms exist nowhere until a backend exists. Form-shaped previews = concept lines (`.pt-lines`) or wizard-step display (add-family pattern is the only baked multi-step wizard family; its saves stay demo/GATE). `<form>/<input>` in role apps FORBIDDEN (asserted).
- **Empty states** — `.pt-empty` (portals) / existing admin empty pattern; must be truthful and encouraging; fake-empty (hiding real fixture data) FORBIDDEN.
- **Status chips** — labeled icon+text chips ONLY (never color-only); the existing tone maps (session/outcome/lifecycle/teacher/group/course/invoice/payment/availability). New vocabularies require a new labeled map + chip-tone guard extension.
- **Page headers** — admin page-header pattern; portal `pt-hero` (home) / `pt-sec-head` (sections); internal role pages get a slim `pt-hero` variant (title + one-line purpose, no big greeting — greeting is home-only).
- **Section headers** — `pt-sec-head` with icon + optional hint, as-is.

## Forbidden visual patterns (the anti-legacy register)

KPI money wall on any home · salary/pay hero anywhere · 10–23-column ledgers as UI · dense hour×day grids in role apps · fake live room/join buttons · fake submit/save/upload/send controls · notification count badges without an engine · dual/conflicting badges · color-only status · **aggressive warning walls and alarm-styled (red/pink alert) empty states** (empties are truthful + encouraging, the `.pt-empty` register) · admin chrome in role apps · role-app links in admin nav · `href="#"` · bare «قريبًا» destinations · leaderboard/rank/percentile visuals · computed score displays · chart libraries/BI visuals (authored stat cards + labeled lists instead) · CDN assets · second font/icon/color systems.

## Better-than-legacy commitments (measurable)

Less table-heavy (role apps: 0 tables; admin: card/drawer alternative always) · clearer hierarchy (one h1, sectioned cards) · mobile-first (390px probe green on every page) · warmer role moods (accent + copy register per role) · premium consistency (one primitive set; screenshot review per spec) · dashboards-first (today/next/action answered above the fold on every home).

**Change control**: any deviation from this freeze requires an explicit amendment section in the deviating spec's plan (like 015's A1/A2) — silent drift is a review-blocking finding in 027.
