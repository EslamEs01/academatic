# Contract: Scope Guard

**Status**: Binding · Defines what Spec 001 **must not** contain. Anything here appearing in the implementation is a defect, regardless of passing tests.

## G1. Forbidden — product scope (no business modules)

Do NOT build, stub as real, or wire up:

- Real backend API · real authentication · real permission/role enforcement.
- Students module · Families module · Teachers module · Courses module.
- Attendance · Finance / payroll / invoices · wallet.
- Sessions **lifecycle** beyond fixture/static display (no create/edit/cancel/attend flows that mutate state).
- Report **detail** pages (reports are entry cards only).
- Teacher portal · Family/Student portal.

Only the **dashboard foundation + visual system** ships: shell, sidebar, topbar, tokens, base components, admin dashboard, reports **overview**, and the gallery.

## G2. Forbidden — technology

- External **CDN** for any asset (fonts, icons, CSS, JS, images all local).
- **TypeScript**.
- Any **SPA framework** (React/Vue/Angular/Svelte/etc.).
- Any **chart library** (Chart.js/ApexCharts/D3-as-charts/etc.) — mini-visuals are hand-rolled SVG/CSS.
- A bundler is not required; if introduced later it must not pull a framework or violate the above.

## G3. Forbidden — legacy reuse

Do NOT copy from the old academatic system:

- Old **logo**, favicon, or brand assets.
- Old **colors/tokens**: purple `rgb(94,77,126)`/`#5E4D7E`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, teal `rgb(70,202,235)`, legacy page bg `#FAFAFA`/`#F5F8FF`, and the purple-tinted lift shadow.
- Old **CSS classes / Bootstrap** modal/offcanvas/grid structure.
- Old **icon sets** (tabler, Font Awesome) and old **widget libraries** (select2, flatpickr, ApexCharts, Quill, Dropzone).
- The flat 40-item ungrouped sidebar; per-row colored action **pill buttons**; unlabeled form fields.
- Any **private/academy-specific wording**, names, or content. Fixtures use original placeholder copy.
- **Pixel-for-pixel** legacy layout.

(The old system informs **product/UX concepts only** — navigation grouping, KPI/status tiles, sessions table, reports area, filters — re-expressed in the approved visual language.)

## G4. Allowed in Spec 001 (for clarity)

- Static fixtures, `localStorage` for theme/language, local Tailwind/PostCSS build, native ES modules, self-hosted Tajawal + local SVG icons, Playwright/axe for tests.
- A **fixture** permission flag used solely to demonstrate the disabled-with-reason report card.
- Navigable links/section "see all" that point to in-spec pages or harmless placeholders — but every control must still satisfy **no-dead-button** (act or disabled-with-reason).

## G4b. Delivery architecture (binding) — static HTML-first, Django-ready

The foundation MUST be delivered as a **static, HTML-first** site (not a JS-rendered app):

- **Final client preview uses `app/public/`** — built static HTML, served by any static host. No backend, no Django, no dev server required for preview.
- **Live Server opens `app/public/dashboard.html`** directly (no npm server needed).
- **GitHub Pages** publishes the self-contained `app/public/` (relative paths + `.nojekyll`); `docs/` is the recommended Pages source (`npm run deploy:pages -- --out=../../docs`).
- **Pages contain real HTML structure** — the full shell + every section ship as static markup. **No JS-rendered empty app mount** (`<div id="app">`) may remain.
- **JavaScript only enhances** existing markup (theme/language/sidebar/drawer/dropdowns/modal/filter+table demo/feedback) via `data-*` hooks; it MUST NOT create page DOM.
- **Asset paths MUST be relative** (`./assets/...`) so the site works at a GitHub Pages project URL; no absolute root paths.
- **Django-template-ready**: pages map to `templates/admin/*.html`, the shell extracts to partials, `src/styles`/`src/js` map to Django static files, and build-time fixtures map to view context. Avoid JS-generated IDs/classes Django can't reproduce.

Forbidden under this model: full JS mount that builds all page DOM; SPA-like runtime; business content embedded only inside JS render functions with no template mapping.

## G5. Enforcement

- The no-external-request test (A5) enforces G2's no-CDN rule.
- Code/asset review enforces G3 (no legacy tokens/classes/assets/wording).
- This plan does **not** run `/speckit.tasks` or implement anything; nothing in G1 is even scaffolded.
