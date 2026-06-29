# Implementation Plan: Admin Core Operations Pages

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-06-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/002-admin-core-operations/spec.md`

## Summary

Extend the implemented Spec 001 frontend (`academy-dashboard-discovery/app/`) with six fixture-only **admin operation pages** behind the sidebar — **Sessions, Schedule, Students, Trainers, Curricula, Settings** — each pre-rendered Arabic (default) + English. The pages reuse the Spec 001 shell, tokens, components, theme/i18n behavior, static-site-generator, and screenshot-acceptance process, and preserve the **static HTML-first / GitHub-Pages / Django-template-ready** architecture: complete static markup in `public/`, **no whole-page `<div id="app">` mount**, runtime JS that only **enhances** existing markup via stable `data-*` hooks.

Technical approach: add per-page composition modules (`src/js/pages/<page>.js`) that return body HTML from fixtures (same pattern as `dashboard.js`), a small set of new shared components (page-header, breadcrumbs, filter-bar, card-grid, directory-card, schedule-list, settings-section, confirmation-modal, preview-drawer), new fixtures (sessions extended + schedule/students/trainers/curricula/settings), wire the sidebar nav to real routes, register the 12 new pages in the SSG (`build-html.mjs`), and extend `enhance.js` with behavior for filter-forms (client-side filtering of static rows), row menus → preview drawers, modal triggers, confirmation modals, demo actions, and disabled-with-reason. Quality is enforced by the existing build + smoke + axe + screenshot pipeline, extended to cover the new pages.

## Technical Context

**Language/Version**: HTML5, CSS3, native JavaScript (ES2022 modules). Node.js 22 (tooling only). **No TypeScript.**
**Primary Dependencies**: Tailwind CSS 3 + PostCSS + Autoprefixer + postcss-import (build only); Playwright 1.61 + `@axe-core/playwright` (tests); `@fontsource/tajawal` + `lucide-static` (vendored locally). **No runtime framework, no SPA, no chart library, no calendar library, no CDN.** (All inherited from Spec 001 — no new dependencies.)
**Storage**: N/A. Display data from static JS fixtures. Preferences (theme/language/sidebar rail) persist in `localStorage`.
**Testing**: Playwright (screenshot matrix + DOM smoke for no-dead-button / no-raw-i18n-key / no-external-request / keyboard), axe-core (a11y), and **mandatory manual screenshot review** against the Spec 001 approved design + existing Spec 001 screenshots + sidebar reference.
**Target Platform**: Modern evergreen browsers (Chromium/Firefox/WebKit); responsive desktop/tablet/mobile.
**Project Type**: Static multi-page web frontend (extends the Spec 001 app; no backend tier).
**Performance Goals**: Fast first paint (static, self-hosted assets); **zero layout shift** on theme/direction switch; instant client-side fixture filtering; small payload (no framework/chart/calendar libs).
**Constraints**: Arabic RTL default + English LTR; Light/Dark/System; fully offline-capable (every asset local, relative paths, no CDN); fixtures only; **static HTML-first, no whole-page JS mount**; GitHub-Pages compatible; Django-template-ready; visual output must match Spec 001.
**Scale/Scope**: 6 new pages × 2 languages = **12 new `public/*.html`**; ~9 new shared/page components; ~6 new fixtures; sidebar route wiring; ≥10 acceptance screenshots.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is still an **unfilled template** — no ratified principles. Per the standing instruction, the **Spec 001 + Spec 002 constraints are the binding gates**:

| Gate (binding constraint) | Plan compliance |
|---|---|
| Continue the approved Spec 001 design | Pages reuse Spec 001 shell/tokens/components; screenshot acceptance compares to Spec 001 + approved reference. **PASS** |
| Static HTML-first; no whole-page JS mount | All pages pre-rendered to complete `public/*.html`; no `<div id="app">`; SSG via `build-html.mjs`. **PASS** |
| Runtime JS enhances only | `enhance.js` attaches behavior to existing markup via `data-*` hooks; creates no page DOM. **PASS** |
| Per-language pre-rendered pages | Each page generated `*.html` (ar) + `*.en.html` (en); language toggle navigates. **PASS** |
| Relative asset paths / local only / no CDN | `./assets/...`; vendored fonts/icons; no-external-request test. **PASS** |
| GitHub-Pages compatible | Self-contained `public/` + `.nojekyll`; `deploy:pages`. **PASS** |
| Django-template-ready | Shell→partials, fixtures→context, `data-*` hooks; documented mapping. **PASS** |
| Native JS only; no TS/SPA | ES modules, no framework. **PASS** |
| No chart/calendar library | Schedule is a structured list/grid; trainer performance via hand-rolled SVG/CSS. **PASS** |
| No real API/auth/permissions/CRUD | Fixtures only; demo-with-feedback or disabled-with-reason. **PASS** |
| No out-of-scope modules | No attendance/finance/portals/dashboards/Zoom/notifications/report-analytics. **PASS** |
| Arabic RTL first + English LTR; Light/Dark/System | Inherited from Spec 001; validated per page. **PASS** |
| No copied legacy assets/classes/logo/wording | Original tokens/markup; avoid-list in `scope-guard.md`. **PASS** |
| Screenshot-based visual acceptance | Mandatory matrix + failure conditions in `screenshot-acceptance.md`. **PASS** |
| No-dead-button / no-raw-i18n-key | FR-008/FR-024 + smoke tests. **PASS** |

No gate violations → **Complexity Tracking is empty**.

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/002-admin-core-operations/
├── plan.md                 # This file
├── spec.md                 # Approved Spec 002
├── research.md             # Phase 0 output
├── data-model.md           # Phase 1 output (fixture display entities)
├── quickstart.md           # Phase 1 output
├── contracts/              # Phase 1 output (10 contracts)
└── checklists/requirements.md
```

### Source Code (extends the Spec 001 app, in place)

New/changed files under `academy-dashboard-discovery/app/` (existing Spec 001 files unchanged unless noted):

```text
app/
├── src/js/
│   ├── nav.config.js              # CHANGE: `#` routes → real page paths (active state per page)
│   ├── enhance.js                 # EXTEND: filter-form, row-menu→drawer, modal-trigger, confirm, demo-action, disabled-reason
│   ├── pages/
│   │   ├── sessions.js            # NEW — renderSessions()
│   │   ├── schedule.js            # NEW — renderSchedule()
│   │   ├── students.js            # NEW — renderStudents()
│   │   ├── trainers.js            # NEW — renderTrainers()
│   │   ├── curricula.js           # NEW — renderCurricula()
│   │   └── settings.js            # NEW — renderSettings()
│   ├── components/
│   │   ├── page-header.js         # NEW — title + breadcrumb + subtitle + actions + optional summary
│   │   ├── filter-bar.js          # NEW — generalized from the sessions toolbar (search/selects/apply/reset)
│   │   ├── card-grid.js           # NEW — responsive card grid wrapper
│   │   ├── directory-card.js      # NEW — student/trainer directory card
│   │   ├── schedule-list.js       # NEW — day-grouped schedule (no calendar lib)
│   │   ├── settings-section.js    # NEW — settings panel + rows + control kinds
│   │   ├── preview-drawer.js      # NEW — entity preview content (reuses drawer.js shell)
│   │   ├── confirm-modal.js       # NEW — confirmation modal (reuses modal pattern)
│   │   └── data-table.js          # NEW (optional) — generalized table (sessions/students reuse)
│   └── fixtures/
│       ├── sessions.js            # EXTEND — more rows + details for the full page
│       ├── schedule.js            # NEW
│       ├── students.js            # NEW
│       ├── trainers.js            # NEW
│       ├── curricula.js           # NEW
│       └── settings.js            # NEW
├── src/locales/{ar.js,en.js}      # EXTEND — keys for the 6 new pages
├── scripts/build-html.mjs         # EXTEND — register the 6 new pages (ar+en)
├── public/                        # +12 generated pages (sessions/schedule/students/trainers/curricula/settings × ar/en)
└── tests/                         # EXTEND — capture matrix + smoke/a11y page lists include new pages
```

**Structure Decision**: Extend the Spec 001 app **in place** (no new project). Each new page is a `renderX()` module consumed by the SSG (`build-html.mjs`) — identical to how `dashboard.js`/`reports.js` work — so the output stays static HTML-first with no runtime mount. New shared components are added alongside the existing ones and reused across pages. `enhance.js` remains the single enhancement entry. This guarantees visual + architectural continuity with Spec 001 and keeps everything GitHub-Pages and Django ready.

## Complexity Tracking

No constitution/constraint violations — intentionally empty.

## Phase Notes

- **Phase 0 (research.md)** resolves the Spec-002-specific design choices (schedule layout; students table vs trainers cards; drawer-vs-modal for previews/confirms; client-side fixture filtering of static rows; settings control taxonomy; nav routing + active state; SSG registration). No `NEEDS CLARIFICATION` remained in the spec.
- **Phase 1 (data-model.md, contracts/, quickstart.md)** defines the new fixture display entities, the ten contracts that bind implementation to the approved design + static/Django architecture, and the updated build/preview/screenshot workflow.
- **Phase 2 (tasks)** is **NOT run here.** `/speckit.tasks` will generate `tasks.md` later.

## Future direction note (out of scope, do not implement now)

Student, Teacher, and Family **dashboards/portals** are **out of scope for Spec 002**. When specified later they MUST NOT be heavy admin-style dashboards — they must feel cheerful, visually comfortable, simple, warm, human, creative, calming, and easy for non-technical users. This plan deliberately keeps the admin pages distinct so those future role experiences can diverge in tone.
