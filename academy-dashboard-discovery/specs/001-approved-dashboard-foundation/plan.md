# Implementation Plan: Approved Academy Dashboard Visual Foundation

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-06-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/001-approved-dashboard-foundation/spec.md`

## Summary

Build, from a clean commit, the **visual foundation** of the academy admin dashboard so it visibly matches the approved Claude Design dashboard (`design-references/approved-dashboard/`). The deliverable is a static, fixture-driven multi-page frontend: a design-token system (extracted from the approved HTML), an app shell (slim icon rail + light nav panel with a violet active pill + bottom profile avatar + organized topbar; per sidebar-reference.png), a base component library, the admin dashboard page, a reports overview page, and a component/style-preview gallery — all in Arabic RTL (default) + English LTR, with Light/Dark/System themes, accessibility (WCAG AA target), and **screenshot-based visual acceptance** against the approved reference.

Technical approach: native HTML/CSS/JS (ES modules, no framework) styled with a **locally compiled Tailwind/PostCSS** pipeline layered on CSS custom-property design tokens; self-hosted Tajawal font and local SVG icons (no CDN); theme via `[data-theme]` + `localStorage` + `prefers-color-scheme`; direction via `dir` + CSS logical properties; i18n via JSON locale dictionaries and a tiny native helper. No backend, no auth, no real data — all content from static fixtures. Quality is enforced by Playwright (screenshot capture + DOM smoke), axe-core (a11y), and a mandatory manual screenshot review.

## Technical Context

**Language/Version**: HTML5, CSS3, native JavaScript (ES2022 modules). Node.js 22 (tooling only). **No TypeScript.**
**Primary Dependencies**: Tailwind CSS 3.x + PostCSS + Autoprefixer (build only, compiled locally); Playwright 1.61 (already installed) + `@axe-core/playwright` for tests. **No runtime framework, no SPA framework, no chart library, no CDN.**
**Storage**: N/A. Display data comes from static JS/JSON fixtures. User preferences (theme, language) persist in `localStorage`.
**Testing**: Playwright (screenshot capture across the RTL/LTR × light/dark/system matrix + DOM smoke for no-dead-button / no-raw-i18n-key), axe-core (accessibility), and a **mandatory manual screenshot review** against `academy-dashboard.png`.
**Target Platform**: Modern evergreen browsers (Chromium/Firefox/WebKit); responsive desktop/tablet/mobile.
**Project Type**: Static multi-page web frontend (no backend tier).
**Performance Goals**: Fast first paint via local static assets + self-hosted fonts; **zero layout shift** on theme/direction switch; 60fps shell interactions; small payload (no framework, no chart lib).
**Constraints**: Arabic RTL is the default direction, English LTR supported; Light/Dark/System; fully offline-capable (every asset local, no CDN); fixture-only data; no TS/SPA/charts; visual output must match the approved design.
**Scale/Scope**: 3 pages (dashboard, reports overview, gallery), 1 app shell, ~15 base components, 2 locales, and ≥7 acceptance screenshots.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is still an **unfilled template** — there are no ratified principles to evaluate against. Per the explicit instruction accompanying this plan, the **Spec 001 constraints are treated as binding gates** for this plan:

| Gate (binding constraint) | Plan compliance |
|---|---|
| Approved design is the primary visual target | Tokens/layout extracted from the approved HTML/PNG drive every contract; screenshot acceptance compares to the approved reference. **PASS** |
| Arabic RTL first | `dir="rtl"` default, CSS logical properties, right sidebar; LTR is the mirrored alternate. **PASS** |
| English LTR support | `dir="ltr"` via language switch; full mirror validated. **PASS** |
| Light/Dark/System | `[data-theme]` tokens + `prefers-color-scheme` + persisted choice. **PASS** |
| Local Tailwind/PostCSS pipeline | Tailwind+PostCSS compiled locally to a static stylesheet; no CDN. **PASS** |
| Native JavaScript only | ES modules, no framework. **PASS** |
| No CDN | Self-hosted fonts/icons/CSS/JS; verified by a no-external-request test. **PASS** |
| No TypeScript | All JS is plain `.js`. **PASS** |
| No SPA framework | Multi-page static HTML; progressive enhancement only. **PASS** |
| No chart libraries | Sparklines/progress rendered as inline SVG/CSS by hand. **PASS** |
| No real API/auth in Spec 001 | Fixtures only; no network data; no auth. **PASS** |
| No business modules in Spec 001 | Only shell + dashboard + reports overview + gallery. **PASS** |
| No copied legacy assets/classes/logo/wording | Original tokens/markup; explicit avoid-list in `scope-guard.md`. **PASS** |
| Screenshot-based visual acceptance | Mandatory matrix + failure conditions in `screenshot-acceptance.md`. **PASS** |

No gate violations → **Complexity Tracking is empty** (nothing to justify).

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/001-approved-dashboard-foundation/
├── plan.md                 # This file (/speckit-plan output)
├── spec.md                 # Approved Spec 001
├── research.md             # Phase 0 output
├── data-model.md           # Phase 1 output (fixture display entities)
├── quickstart.md           # Phase 1 output (build/dev/screenshot workflow)
├── contracts/              # Phase 1 output
│   ├── approved-design-contract.md
│   ├── tokens-contract.md
│   ├── sidebar-shell-contract.md
│   ├── dashboard-layout-contract.md
│   ├── component-contracts.md
│   ├── screenshot-acceptance.md
│   └── scope-guard.md
└── checklists/
    └── requirements.md     # Spec quality checklist (already passing)
```

### Source Code (repository)

The implementation lives in a dedicated, self-contained app directory alongside the spec and discovery artifacts. It is independent of the existing crawler (which stays at `academy-dashboard-discovery/` root).

```text
academy-dashboard-discovery/app/
├── package.json                 # app-local; tailwind/postcss/autoprefixer + playwright/axe devDeps
├── postcss.config.js
├── tailwind.config.js           # theme maps to CSS custom-property tokens
├── index.html                   # redirects/links to pages (dev entry)
├── src/
│   ├── styles/
│   │   ├── tokens.css           # :root + [data-theme="dark"] custom properties (Appendix A)
│   │   ├── base.css             # resets, base typography, RTL logical defaults
│   │   └── app.css              # Tailwind entry (@tailwind base/components/utilities) + component layers
│   ├── js/
│   │   ├── main.js              # bootstraps shell, theme, i18n on each page
│   │   ├── theme.js             # light/dark/system, persist, prefers-color-scheme
│   │   ├── i18n.js              # locale load, dir switch, data-i18n binding, missing-key guard
│   │   ├── shell.js             # sidebar + topbar wiring (collapse, drawer, active state)
│   │   ├── components/          # native JS render modules (kpi-card, status-tile, table, modal, ...)
│   │   ├── nav.config.js        # data-driven sidebar groups/items
│   │   └── fixtures/            # static display data (sessions, kpis, reports, profile)
│   ├── locales/
│   │   ├── ar.json              # Arabic (default)
│   │   └── en.json              # English
│   ├── icons/                   # local SVG icon set (sprite or per-file) — no CDN
│   ├── fonts/                   # Tajawal woff2 (self-hosted)
│   └── pages/
│       ├── dashboard.html       # Admin dashboard (approved layout)
│       ├── reports.html         # Reports overview (entry cards only)
│       └── gallery.html         # Component / style preview
├── dist/                        # compiled tailwind output (generated)
├── tests/
│   ├── screenshots/             # Playwright capture specs (matrix)
│   ├── a11y/                    # axe-core specs
│   └── smoke/                   # no-dead-button / no-raw-i18n-key / no-external-request
└── screenshots/                 # captured PNGs for review (baseline + current)
```

**Structure Decision**: A single static multi-page frontend under `academy-dashboard-discovery/app/`, self-contained with its own `package.json` and local build pipeline. No backend/frontend split (no backend exists in this spec). Components are native ES-module render functions consuming fixtures; pages are plain HTML that the shell/JS enhances. This keeps the foundation framework-free, offline-capable, and directly reusable by future role apps (which will supply their own `nav.config` and fixtures).

> **Architecture update (2026-06-29, binding):** delivery is **static HTML-first**, not a JS-rendered app. A static-site generator (`scripts/build-html.mjs`) pre-renders each page (Arabic + English) to complete HTML in **`app/public/`** (full shell + sections, no `<div id="app">` mount); `src/js/enhance.js` only enhances the markup via `data-*` hooks. Relative `./assets/` paths make `public/` deployable to **GitHub Pages** (publish `public/`, or copy to **`docs/`**) and openable with **VS Code Live Server** (`public/dashboard.html`), with no backend for preview. The pages are **Django-template-ready**. See `quickstart.md`, `app/README.md`, and `contracts/scope-guard.md` §G4b + `contracts/screenshot-acceptance.md` §A0. This MUST NOT change the approved visual design.

## Complexity Tracking

No constitution/constraint violations — this section is intentionally empty.

## Phase Notes

- **Phase 0 (research.md)**: resolves the few open technical choices (Tailwind major version & integration mode, icon-set sourcing, sparkline-without-charts technique, dev-server choice, i18n binding approach, screenshot tooling). No `NEEDS CLARIFICATION` remained in the spec; research records decisions + rationale + rejected alternatives.
- **Phase 1 (data-model.md, contracts/, quickstart.md)**: defines the fixture display entities; pins the seven contracts that bind implementation to the approved design (design fidelity, tokens, shell, dashboard layout, components, screenshot acceptance, scope guard); and documents the build/dev/screenshot workflow.
- **Phase 2 (tasks)**: **NOT run here.** `/speckit.tasks` will generate `tasks.md` later.
