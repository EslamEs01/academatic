# Implementation Plan: Timetable and Scheduling Experience

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-06-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/003-timetable-scheduling/spec.md`

## Summary

Evolve the implemented Spec 001/002 Schedule and Sessions surfaces (`academy-dashboard-discovery/app/`) into a proper **timetable/scheduling experience**, grounded in the analyzed academy reference system but cleaner, calmer, and more premium. The core UX is a **two-tab pattern** on every schedule surface — **Tab 1 List/Agenda** (the existing calm day-grouped block list, kept) and **Tab 2 Timetable** (a NEW hand-rolled CSS-grid weekly time-grid, **no calendar library**) — plus clickable **time blocks** that open a shared **appointment/session details drawer**, **strong filters** (week/day, teacher, subject, status) that narrow both views, an admin-facing **teacher-timetable lens** inside the Schedule page (no teacher portal), a richer **Sessions** integration (List table + today's timetable/agenda tab), and a **minimal, fixture-backed dashboard impact** (deep-links to the timetable + the shared drawer + one small "up next" strip + a fixture attention count).

Technical approach: keep the **static HTML-first / GitHub-Pages / Django-ready** architecture exactly. All tab panels, the weekly grid, the agenda, and the per-item detail `<template>`s are **baked into the static `public/*.html` at build time** by the existing SSG (`scripts/build-html.mjs`) via new `renderX()`/component modules; runtime `enhance.js` only **switches tabs, persists the selection (localStorage + URL hash), filters pre-rendered blocks, opens the drawer/confirm modal, and shows toasts / disabled-reasons**. New shared components — a generic **tabs** widget, a **timetable grid**, a **time-block**, an enriched **appointment-details** drawer builder, an **attention** indicator, and a **mobile agenda** — compose existing Spec 001/002 atoms (status-map, drawer engine, filter-bar, page-header, card/chip/medallion/avatar). Fixtures extend `SCHEDULE_WEEK`/`SESSIONS_FULL` with the fields the grid/drawer/lens need (day/date, duration→grid span, room/online link, students/family, attention, type). Quality is enforced by the existing build + smoke + axe + screenshot pipeline, extended for tabs, the grid, and the drawer.

## Technical Context

**Language/Version**: HTML5, CSS3, native JavaScript (ES2022 modules). Node.js (tooling only). **No TypeScript.**
**Primary Dependencies**: Tailwind CSS 3 + PostCSS + Autoprefixer + postcss-import (build only); Playwright + `@axe-core/playwright` (tests); `@fontsource/tajawal` + `lucide-static` (vendored locally). **No runtime framework, no SPA, no chart library, no calendar library, no drag/drop library, no CDN.** (All inherited from Spec 001/002 — **no new dependencies**.)
**Storage**: N/A. Display data from static JS fixtures. Preferences persist in `localStorage` (theme/language/sidebar rail/nav category — unchanged — **plus** a new per-surface selected-tab key).
**Testing**: Playwright (screenshot matrix + DOM smoke for tabs/grid/drawer/no-dead-button/no-raw-i18n-key/no-external-request/keyboard), axe-core (a11y), and **mandatory manual screenshot review** vs the Spec 001/002 approved design + the old-system schedule screenshots (product reference only).
**Target Platform**: Modern evergreen browsers (Chromium/Firefox/WebKit); responsive desktop/tablet/mobile (timetable → agenda on mobile).
**Project Type**: Static multi-page web frontend (extends the Spec 001/002 app in place; no backend tier).
**Performance Goals**: Fast first paint (static, self-hosted assets); **zero layout shift** on theme/direction/tab switch; instant client-side tab toggle + fixture filtering; small payload (no framework/chart/calendar libs); the timetable grid is pure CSS (no runtime layout pass).
**Constraints**: Arabic RTL default + English LTR; Light/Dark/System; offline-capable (every asset local, relative paths, no CDN); fixtures only; **static HTML-first, no whole-page JS mount, no runtime-drawn grid**; GitHub-Pages compatible; Django-template-ready; visual output must match Spec 001/002 and improve on the legacy reference.
**Scale/Scope**: Surfaces touched = **Schedule, Sessions, Dashboard** (× ar/en = 6 `public/*.html` regenerated, none added); ~6 new shared components (tabs, timetable-grid, time-block, appointment-details, attention, mobile-agenda); 2 fixtures extended; sidebar label reconciliation; **9 contracts**; ≥10 acceptance screenshots.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is still an **unfilled template** — no ratified principles. Per the standing instruction, the **Spec 001 + Spec 002 constraints are the binding gates**:

| Gate (binding constraint) | Plan compliance |
|---|---|
| Continue the approved Spec 001/002 design | Reuses the shell/tokens/components; the timetable uses the existing status map + violet/accents; screenshot acceptance compares to Spec 001/002 + approved reference. **PASS** |
| Static HTML-first; no whole-page JS mount | Tabs, weekly grid, agenda, and detail `<template>`s are baked into complete `public/*.html`; no `<div id="app">`; SSG via `build-html.mjs`. **PASS** |
| Runtime JS enhances only | `enhance.js` only toggles tabs (+ hash/localStorage), filters pre-rendered blocks, opens drawer/confirm, toasts/disabled-reason; **builds no page DOM, draws no grid**. **PASS** |
| Per-language pre-rendered pages | `schedule/sessions/dashboard` regenerated `*.html` (ar) + `*.en.html` (en); language toggle navigates. **PASS** |
| Relative asset paths / local only / no CDN | `./assets/...`; vendored fonts/icons; no-external-request smoke test. **PASS** |
| GitHub-Pages compatible | Self-contained `public/` + `.nojekyll`; `deploy:pages`. **PASS** |
| Django-template-ready | Grid/list/agenda → `{% for day %}{% for block %}`; tabs → static panels; shell → partials; fixtures → context; stable `data-*` hooks. **PASS** |
| Native JS only; no TS/SPA | ES modules, no framework, no router. **PASS** |
| **No calendar library / chart library / drag-drop** | Timetable is a **hand-rolled CSS grid**; blocks placed by build-time `grid-row` spans; attention/status via the status map; **no library**. **PASS** |
| No real API/auth/permissions/CRUD/persistence | Fixtures only; actions demo-with-toast or disabled-with-reason; no real reschedule/cancel/join. **PASS** |
| No out-of-scope modules | No backend scheduling/recurrence/conflict-detection/Zoom/attendance/notifications/finance; no portals/role dashboards. **PASS** |
| Teacher timetable = admin display only | In-page lens (teacher filter + all-teachers overview); no teacher portal/dashboard, no new route. **PASS** |
| Arabic RTL first + English LTR; Light/Dark/System | Grid Sat-first + mirrored via logical properties (times never mirrored); validated per surface. **PASS** |
| No copied legacy assets/classes/logo/wording | Original tokens/markup; old grid is structural reference only; avoid-list in `scope-guard.md`. **PASS** |
| Screenshot-based visual acceptance | Mandatory matrix + failure conditions in `screenshot-acceptance.md`. **PASS** |
| No-dead-button / no-raw-i18n-key | FR-022 + smoke (tabs/filters/drawer/disabled-reason all give feedback). **PASS** |

No gate violations → **Complexity Tracking is empty**.

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/003-timetable-scheduling/
├── plan.md                 # This file
├── spec.md                 # Approved Spec 003
├── research.md             # Phase 0 output (R11–R19, extending Spec 002 R1–R10)
├── data-model.md           # Phase 1 output (fixture display shapes)
├── quickstart.md           # Phase 1 output
├── contracts/              # Phase 1 output (9 contracts)
└── checklists/requirements.md
```

### Source Code (extends the Spec 001/002 app, in place)

New/changed files under `academy-dashboard-discovery/app/` (existing files unchanged unless noted):

```text
app/
├── src/js/
│   ├── enhance.js                     # EXTEND: tabs (toggle + hash + localStorage + roving tabindex);
│   │                                  #         richer appointment drawer; attention indicator; (filters/drawer engine reused)
│   ├── nav.config.js                  # CHANGE: schedule label → "الجدول الدراسي"/"Timetable" (id/route unchanged)
│   ├── pages/
│   │   ├── schedule.js                # CHANGE: header + tabs(List|Timetable) + filter bar (teacher facet) + both panels + teacher lens + templates
│   │   ├── sessions.js                # CHANGE: wrap table as List tab + add Timetable/agenda (today) tab + richer drawer templates
│   │   └── dashboard.js               # CHANGE (minimal): deep-link "View Schedule"/"view all" → schedule#view=timetable; shared drawer; optional up-next strip + attention count
│   ├── components/
│   │   ├── tabs.js                    # NEW — generic accessible content tabs (role=tablist/tab/tabpanel)
│   │   ├── timetable-grid.js          # NEW — hand-rolled weekly CSS grid (days × cropped working hours)
│   │   ├── time-block.js              # NEW — a single timetable block card (status tone, time, title, teacher)
│   │   ├── appointment-details.js     # NEW — shared detail-drawer content builder (replaces/extends preview-drawer for sessions/schedule)
│   │   ├── attention-flag.js          # NEW — fixture-only conflict/delay indicator (icon + label)
│   │   ├── schedule-agenda.js         # NEW — single-day agenda (mobile fallback + Sessions today tab), reuses .sched-block
│   │   └── schedule-list.js           # REUSE (List tab) — minor polish only
│   └── fixtures/
│       ├── schedule.js                # EXTEND — blocks gain duration/span, roomLink, students/family, attention, type; teacher list derived
│       └── sessions.js                # EXTEND — rows gain dateKey, roomLink, family, notes, materials, attention
├── src/styles/app.css                 # EXTEND — .tabs/.tab(panel), .timetable/.tt-* grid, .tt-block, .attention-*, mobile agenda
├── src/locales/{ar.js,en.js} (+ .extra)# EXTEND — tabs/timetable/teacher-lens/attention/appointment keys; reconcile schedule label
├── scripts/build-html.mjs             # REUSE — schedule/sessions/dashboard already registered (no new pages)
├── public/                            # REGENERATE — schedule, sessions, dashboard (× ar/en)
└── tests/                             # EXTEND — smoke (tabs/grid/drawer asserts) + capture matrix (Spec 003 frames)
```

**Structure Decision**: Extend the Spec 001/002 app **in place** — **no new pages/routes**. The Schedule, Sessions, and Dashboard `renderX()` modules are revised to compose the new tab/grid/agenda/drawer components; every panel is baked by the SSG exactly like today, so the output stays static HTML-first with no runtime mount and no runtime-drawn grid. The teacher timetable is an in-page lens (a teacher filter + all-teachers overview), **not** a new nav destination — honoring scope-guard G6b (a new page would need its own spec). This guarantees visual + architectural continuity with Spec 001/002 and keeps everything GitHub-Pages and Django ready.

## Complexity Tracking

No constitution/constraint violations — intentionally empty.

## Phase Notes

- **Phase 0 (research.md)** records the Spec-003-specific decisions **R11–R19** (tabs widget; hand-rolled timetable grid — block placement, axis cropping, RTL, overlap, mobile agenda; teacher-timetable lens; Sessions integration; shared appointment drawer; dashboard impact; fixture extension; tests/screenshots; label reconciliation), explicitly **evolving Spec 002's R3** (list-only → list+timetable tabs, still no calendar lib). Spec 002 R1–R10 (SSG, routing, filters, overlays, status map, hand-rolled visuals, test harness) are inherited unchanged. No `NEEDS CLARIFICATION` remained in the spec.
- **Phase 1 (data-model.md, contracts/, quickstart.md)** defines the extended fixture display shapes, the **nine** binding contracts, and the updated build/preview/screenshot workflow.
- **Phase 2 (tasks)** is **NOT run here.** `/speckit.tasks` will generate `tasks.md` later.

## Dashboard Impact Review (plan-level decision)

**Changes now (active, fixture-backed):** (1) the hero **"View Schedule"** action and the Today's Sessions module **"view all"** deep-link to `schedule.html#view=timetable`; (2) the Today's Sessions row detail opens the **shared appointment-details drawer** (FR-011), unifying the experience; (3) one **small "Up next / This week"** strip reusing `.sched-block` over `SCHEDULE_WEEK`/`SESSIONS`, linking to Schedule; (4) a **fixture-only attention count** chip on the existing sessions card header (e.g., "2 need attention"), linking to the schedule filtered — backed by the `attention` fixture flag.
**Deferred / out:** real conflict detection, real upcoming/notification feeds, attendance, recordings, accounting/payout, the request→respond scheduling workflow. No new fake/unbacked widget; the dashboard stays calm (no new stat wall).
**Why:** the dashboard already surfaces strong schedule signals (Today's Sessions module, hero counts, KPI, status tiles); the right impact is *connecting* them to the new timetable + unifying the drawer, plus one tiny preview that an existing fixture already backs — not new clutter.

## Navigation / Sidebar / Topbar impact

- **Sidebar**: reconcile the `schedule` item label to **`الجدول الدراسي` / `Timetable`** (id `schedule`, route `schedule.html` unchanged); active pill + `aria-current` correct on the Schedule page. **No new nav item** (teacher timetable is in-page); planned items (`sessionsAnalysis`, `scheduleSearch`, `timeConverter`, `scheduledActions`, `publicHoliday`, `sessionsKpi`) **stay planned** (still «قريبًا/Soon» buttons — not promoted). The category-based two-level rail is **unchanged**.
- **Topbar**: unchanged structure; the existing search/quick-actions are not expanded for this spec (no dead controls added). A schedule deep-link may be surfaced only via existing affordances.

## Future direction note (out of scope, do not implement now)

Student/Teacher/Family **timetables, dashboards, and portals** are **out of scope**. When specified later they MUST feel cheerful, comfortable, simple, human, and creative — **not** this admin timetable. The teacher-timetable lens here is admin-facing display only and must not drift toward a teacher portal.
