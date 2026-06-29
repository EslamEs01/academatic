# Quickstart: Admin Core Operations Pages (Spec 002)

Build, preview, test, and screenshot-review the six new admin pages. App root: `academy-dashboard-discovery/app/`. Spec 002 **extends the Spec 001 app in place** — same pipeline, same static/HTML-first/Django-ready architecture; no new dependencies. **Implementation has not started** — this documents the intended workflow.

## Prerequisites

- Node ≥ 18 (tooling only) + npm; Playwright Chromium (already present).
- No network at runtime; all assets local (no CDN).

## Build & preview

```bash
cd academy-dashboard-discovery/app
npm install
npm run build      # vendor → copy assets → compile CSS → generate ALL public/*.html (Spec 001 + 002)
```

After build, `public/` gains: `sessions.html`, `schedule.html`, `students.html`, `teachers.html`, `courses.html`, `settings.html` (+ each `.en.html`).

Preview:
- **VS Code Live Server**: open `public/sessions.html` (or any page). No Node server required.
- **Node**: `npm run preview` → http://localhost:4178 (routes: `/sessions`, `/schedule`, `/students`, `/teachers`, `/courses`, `/settings`).

Sidebar links now navigate between the real pages with correct active state; theme toggles in place; language toggle navigates to the `.en` equivalent (theme persists).

The sidebar is a **two-level category rail**: a slim rail of **six category icons** (control / families / teachers / reports / admin / settings) beside a panel that shows **ONLY the selected category's links** (never all categories at once). Pick a category icon to **switch the panel** to that category's links — no page navigation; on a fresh page load the **route's category opens** automatically. Within a panel, the **8 implemented** pages are real links, **planned** items are «قريبًا/Soon» buttons (no dead links), and the **Finance-gated** items are locked-with-reason; `future-role` portals (teacher/family/student) are never rendered. The topbar adds an **apps-grid «▦» launcher**, a **Quick-Actions «+»** menu, and a **⌘K command popover** (plus notifications/profile menus). See `contracts/navigation-ia-contract.md`.

## What implementation adds (per plan)

- `src/js/pages/{sessions,schedule,students,teachers,courses,settings}.js` — `renderX()` body builders.
- `src/js/components/{page-header,filter-bar,card-grid,directory-card,schedule-list,settings-section,preview-drawer,confirm-modal,data-table}.js`.
- `src/js/fixtures/{sessions(extended),schedule,students,teachers,courses,settings}.js`.
- `src/js/nav.config.js` — real routes; `src/js/enhance.js` — filter/drawer/modal/confirm/demo/disabled behaviors; `scripts/build-html.mjs` — register the 6 pages; `src/locales/{ar,en}.js` — new keys.

## Test & screenshots

```bash
npm test               # smoke + a11y (extended to the new pages)
npm run test:smoke     # no raw keys · no external requests · no dead buttons · disabled-with-reason · HTML-structure (no #app mount)
npm run test:a11y      # axe — fails on any critical violation, all new pages
npm run screenshots    # capture the Spec 002 matrix → screenshots/  (review vs Spec 001)
```

Screenshot matrix (min): Sessions AR light/dark + EN light; Schedule/Students/Teachers/Courses/Settings AR light; one mobile table page; one tablet — reviewed side-by-side with the approved Spec 001 dashboard, sidebar reference, and existing Spec 001 screenshots (old academy screenshots = product/UX reference only). Verdicts in `app/screenshots/REVIEW.md`. See `contracts/screenshot-acceptance.md`.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy:pages -- --out=../../docs
```

`public/` stays self-contained (relative paths + `.nojekyll`) and works at a project URL; the new pages deploy alongside Spec 001's.

## Definition of done (Spec 002)

- Six new pages reachable from the sidebar with correct active state; each a complete static `public/*.html` (no `#app` mount), AR + EN.
- Visual review matches Spec 001 (no drift); 6 {ar/en}×{light/dark/system} combos correct; responsive mobile/tablet/desktop.
- axe critical=0; no dead buttons; no raw i18n keys; no external (CDN) requests; relative paths.
- Scope guard honored (no backend/API/auth/permissions/CRUD; no dashboards/portals; no charts/calendar libs; no legacy copy).
- Django-template-ready (pages → templates, fixtures → context, `data-*` hooks).

## Out of scope (reminder)

No backend/auth/permissions/persistence; no attendance/finance/wallet; no student/teacher/family **dashboards or portals**; no live Zoom; no notifications backend; no report detail analytics; no chart/calendar libraries; no TS/SPA/CDN; no copied legacy assets/wording. (Future role dashboards must feel cheerful/comfortable/simple/human — not heavy admin UI.)

## Next steps (not part of /speckit.plan)

- `/speckit.tasks` → generate `tasks.md` (not run here).
- Then implementation, then the screenshot review above.
