# Phase 0 Research: Approved Academy Dashboard Visual Foundation

All `NEEDS CLARIFICATION` items were resolved in the spec via documented assumptions; this file records the **technical** decisions that operationalize the Spec 001 constraints. Each entry: **Decision · Rationale · Alternatives rejected.**

---

## R1 — Styling pipeline: local Tailwind + CSS custom-property tokens

**Decision**: Tailwind CSS 3.x compiled locally via PostCSS (+ Autoprefixer) into a single static stylesheet (`dist/app.css`). A `tokens.css` layer defines all design values as CSS custom properties (`--c-*`, `--sh-*`, radii, motion), and `tailwind.config.js` maps Tailwind's theme (`colors`, `borderRadius`, `boxShadow`, `fontFamily`) onto those variables so utilities and tokens stay in sync. Themeable values (color, shadow) reference variables; structural values (radius, spacing scale) can be literal.

**Rationale**: Honors "local Tailwind/PostCSS, no CDN." CSS variables enable instant light/dark/system switching without recompiling and without per-utility dark variants for color. Mapping Tailwind to variables avoids a parallel, drifting token source.

**Alternatives rejected**: (a) Tailwind CDN — violates no-CDN. (b) Tailwind v4 `@theme` — viable, but v3 + PostCSS is the most widely documented, stable local pipeline today; revisit at implementation if v4 is preferred. (c) Hand-written CSS only — loses utility velocity and consistency. (d) Tailwind `dark:` variants for every color — verbose and fights the token system; we theme via `[data-theme]` on `:root`.

---

## R2 — Theme strategy: `[data-theme]` + `prefers-color-scheme` + `localStorage`

**Decision**: `:root` holds light tokens; `[data-theme="dark"]` overrides them (values per spec Appendix A). A `theme.js` module supports three modes — **light / dark / system**. "System" applies no explicit `data-theme` and lets a `@media (prefers-color-scheme: dark)` block mirror the dark tokens; explicit light/dark set `data-theme` and persist to `localStorage`. An inline head snippet applies the stored choice before first paint to prevent a flash.

**Rationale**: Matches the approved HTML's `[data-theme]` mechanism exactly; covers all three required modes; no flash; no framework.

**Alternatives rejected**: Class-based `.dark` toggling (works but the approved design already uses `data-theme`); JS-only theming without a media query (fails true "System"); cookie storage (unneeded without a server).

---

## R3 — Direction & RTL: `dir` attribute + CSS logical properties

**Decision**: Default `dir="rtl"` + `lang="ar"` on `<html>`. Use CSS logical properties (`margin-inline`, `padding-inline-start`, `inset-inline`, `text-align: start`) throughout and Tailwind's logical utilities so a single stylesheet serves both directions. The language switch flips `dir`/`lang` and reloads the locale dictionary. Directional glyphs (chevrons, the sidebar side, table column order) mirror; **numbers, times, currency are never mirrored** and mixed Latin/Arabic runs are bidi-isolated.

**Rationale**: One codebase, two directions, no duplicated RTL stylesheet; matches the approved RTL layout; meets the Arabic-first constraint.

**Alternatives rejected**: Separate RTL/LTR stylesheets (maintenance burden, drift); physical properties with per-direction overrides (error-prone); `rtlcss` post-processing (extra tool, unnecessary with logical properties).

---

## R4 — Typography: self-hosted Tajawal

**Decision**: Self-host **Tajawal** (Arabic + Latin) as `woff2` in `src/fonts/`, declared via `@font-face` with `font-display: swap`, weights 400/500/700 (covering UI body, medium labels, and bold KPI numerals). Define a type scale (≈12.5–15px UI, 17px section titles, 34–36px KPI display) and enable tabular numerals for KPI/table figures.

**Rationale**: The approved HTML uses Tajawal; it is an open, Arabic-capable family suitable for self-hosting (no CDN); avoids legacy Inter lock-in. Limiting to three weights keeps payload small and avoids hairline weights that read poorly in Arabic.

**Alternatives rejected**: Google Fonts CDN (no-CDN violation); legacy Inter as primary (legacy association, weaker Arabic); variable font (larger file, unneeded with 3 static weights).

---

## R5 — Icons: local SVG set (no icon-font CDN)

**Decision**: A curated, **locally stored** SVG icon set (outline style matching the approved medallions/nav), shipped as either an inline SVG sprite (`src/icons/sprite.svg`) referenced via `<use>` or per-icon modules. Icons inherit `currentColor`. Sourced from an open MIT/ISC set (e.g. Lucide/Feather-style) and committed locally — never fetched from a CDN, and not the legacy tabler/Font Awesome sets.

**Rationale**: Honors local-assets/no-CDN; SVG scales crisply, recolors via tokens, and supports the icon-medallion treatment; avoids legacy icon dependencies.

**Alternatives rejected**: Font Awesome / tabler via CDN (no-CDN + legacy); icon web-font (poor a11y, blunt coloring); per-page inline duplication (bloat, drift).

---

## R6 — "Charts" without a chart library

**Decision**: KPI **sparklines** and **progress/ring** indicators are rendered by hand as inline SVG `<polyline>`/`<path>` (sparklines), a CSS conic-gradient or stroked SVG circle (attendance ring), and a token-colored `<div>` bar (progress). All driven by fixture numbers; no animation library.

**Rationale**: Satisfies "no chart libraries" while reproducing the approved KPI visuals (orange/green/teal/violet sparklines + green ring). Inline SVG is tiny, themeable, and accessible (with `aria-hidden` + a text equivalent).

**Alternatives rejected**: Chart.js/ApexCharts (banned + legacy); canvas drawing (heavier, less themeable, worse a11y); omitting the mini-visuals (fails FR-016 and the "KPI cards not basic" acceptance bar).

---

## R7 — Component architecture: native ES-module render functions

**Decision**: Each base component is a native ES module exporting a pure render function (returns a DOM node or HTML string consumed via templates) plus optional behavior wiring. Pages are static HTML; `main.js` mounts the shell and hydrates components from fixtures. Shared status/color logic lives in one status-map module so chips/tiles/table stay consistent.

**Rationale**: No framework needed; keeps components reusable and testable; one status source prevents ad-hoc colors (the legacy failure). Aligns with "native JavaScript only."

**Alternatives rejected**: Web Components/custom elements (viable but heavier ergonomics for a foundation; can adopt later); a templating library (adds a dependency); copy-pasted markup per page (drift, dead-code risk).

---

## R8 — Internationalization without a framework

**Decision**: JSON dictionaries (`locales/ar.json`, `locales/en.json`) with namespaced keys; a small `i18n.js` resolves `data-i18n` attributes (and `data-i18n-attr` for placeholders/aria-labels) at mount and on language switch. A **missing-key guard** logs and visibly flags any unresolved key in dev so "no raw i18n keys" is enforceable. Arabic is the default/fallback locale.

**Rationale**: Lightweight, native, testable; the guard operationalizes FR-028; Arabic-first fallback matches the constraint.

**Alternatives rejected**: i18next/FormatJS (dependency, overkill for 2 locales); hard-coded bilingual strings in markup (unmaintainable, breaks the no-raw-key check); server-side rendering of copy (no server).

---

## R9 — Dev server & build scripts

**Decision**: npm scripts: `dev` (Tailwind `--watch` + a minimal static file server such as a tiny Node `http` server or `serve`-equivalent run locally), `build` (one-shot Tailwind compile to `dist/`), and `screenshots`/`test:a11y`/`test:smoke` (Playwright). Pages are served as static files so partial-fetch/ES-module loading works over `http://localhost`.

**Rationale**: Minimal, framework-free, no bundler; supports native ES modules and self-hosted assets; reuses the already-installed Playwright.

**Alternatives rejected**: Vite/webpack (a bundler isn't required and edges toward SPA tooling; avoided to keep the foundation maximally plain — may be reconsidered later if multi-page asset hashing is needed); opening files via `file://` (breaks module/fetch and Playwright fidelity).

---

## R10 — Screenshot acceptance tooling

**Decision**: Playwright 1.61 (installed) drives Chromium to load each page, set direction (ar/en) and theme (light/dark/system), and capture full-page PNGs at desktop, tablet, and mobile viewports into `app/screenshots/`. `@axe-core/playwright` runs the a11y scan in the same harness. Captured PNGs are reviewed **manually** against `design-references/approved-dashboard/academy-dashboard.png`; the failure conditions in `screenshot-acceptance.md` are the gate. Optional pixel-diff baselines may assist but do not replace human judgment.

**Rationale**: Reuses existing tooling; produces the exact required matrix deterministically; keeps human visual judgment authoritative per the spec ("passes tests but looks bad = fail").

**Alternatives rejected**: Manual browser screenshots only (not reproducible); pure pixel-diff CI gate (brittle, and the approved target is a concept match, not pixel-identity); third-party visual-testing SaaS (external dependency, out of scope).

---

## Resolved decisions summary

| # | Topic | Decision |
|---|---|---|
| R1 | Styling | Local Tailwind 3 + PostCSS, mapped to CSS custom-property tokens |
| R2 | Theme | `[data-theme]` + `prefers-color-scheme` + `localStorage`, no-flash |
| R3 | Direction | `dir`/`lang` + CSS logical properties, single stylesheet |
| R4 | Type | Self-hosted Tajawal woff2, 400/500/700, tabular numerals |
| R5 | Icons | Local SVG set/sprite, `currentColor`, no icon-font/CDN |
| R6 | Charts | Hand-rolled inline SVG/CSS sparklines, rings, bars |
| R7 | Components | Native ES-module render functions + single status map |
| R8 | i18n | JSON dictionaries + `data-i18n` binder + missing-key guard |
| R9 | Build | npm scripts: Tailwind watch + minimal static dev server, no bundler |
| R10 | Screenshots | Playwright capture matrix + axe + mandatory manual review |

No unresolved `NEEDS CLARIFICATION` remain.
