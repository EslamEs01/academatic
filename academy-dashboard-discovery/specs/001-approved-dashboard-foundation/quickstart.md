# Quickstart: Approved Academy Dashboard Visual Foundation

Build, preview (static / Live Server), test, and deploy. App root: `academy-dashboard-discovery/app/`.

**Architecture (HTML-first static site):** authoring lives in `src/`; a static-site
generator pre-renders each page to **complete static HTML** in `public/` (real shell +
sections, no JS mount). Runtime JS only **enhances** the markup. Per-language pages
(`dashboard.html` Arabic, `dashboard.en.html` English); relative asset paths so it
works on GitHub Pages and VS Code Live Server. Django-template-ready (see README).

## Prerequisites

- Node ≥ 18 (tooling only) + npm. Playwright Chromium (already present).
- No network at runtime; every asset (Tajawal, SVG icons, CSS, JS) is local. No CDN.

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install
npm run build      # vendor fonts/icons → copy assets → compile CSS → generate public/*.html
```

Preview options:
- **VS Code Live Server**: open `public/dashboard.html` (right-click → Open with Live Server). No Node server needed.
- **Node**: `npm run preview` → http://localhost:4178.

Pages: `public/{dashboard,reports,gallery}.html` (+ `*.en.html`). Theme toggles in place; language toggle navigates to the other-language page (theme persists).

## Scripts

| script | purpose |
|---|---|
| `build` | vendor assets + copy + compile CSS → `public/assets/app.css` + generate `public/*.html` |
| `build:html` / `build:assets` / `build:css` | individual build steps |
| `preview` / `serve` | static Node server over `public/` |
| `deploy:pages -- --out=<dir>` | copy `public/` to a Pages deploy dir (default `gh-pages`) |
| `screenshots` | capture the acceptance matrix → `screenshots/` |
| `test:a11y` · `test:smoke` · `test` | axe · smoke · both |

## Screenshot acceptance (mandatory)

```bash
npm run screenshots
```

Captures: dashboard ar/light, ar/dark, en/light; reports ar/light; gallery ar/light + dark; dashboard mobile + tablet. Review each side-by-side with `design-references/approved-dashboard/academy-dashboard.png` against the §A4 failure conditions in `contracts/screenshot-acceptance.md`; record verdicts in `app/screenshots/REVIEW.md`. Automated tests are required but **do not** replace this human review.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy:pages -- --out=../../docs   # or a gh-pages branch / Pages action
```

`public/` is self-contained (relative paths + `.nojekyll`) and works at a project URL.

## Definition of done (Spec 001)

- Static `public/` site opens via Live Server / any static host — **no backend** for preview.
- Pages contain **real HTML structure** (not empty mounts); easy to convert to Django templates.
- Visual review matches the approved design; 6 {ar/en}×{light/dark/system} combos correct; responsive mobile/tablet/desktop.
- axe critical=0; no dead buttons, no raw i18n keys, no external (CDN) requests.
- Scope guard honored (no business modules / API / auth / charts / TS / SPA / legacy assets).

## Out of scope

Per `contracts/scope-guard.md`: no real backend/auth/permissions, no business modules, no sessions lifecycle beyond fixtures, no report detail pages, no portals, no charts/CDN/TypeScript/SPA, no copied legacy assets/wording.
