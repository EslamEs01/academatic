# Quickstart: Verifying Spec 010 — Coverage, Navigation IA & Polish

All commands from `academy-dashboard-discovery/app/` unless noted.

## 1. Build & preview

```bash
npm run build          # must succeed silently: nav guard + Spec 009 coherence guard + NEW chip-tone guard all pass
npx serve public       # or any static server — no backend anywhere
```

Open `dashboard.html` (AR RTL) and `dashboard.en.html` (EN LTR). Everything below works from a plain static server (GitHub-Pages equivalent).

## 2. Coverage matrix (the artifact)

Open `../specs/010-capability-coverage-ia-polish/legacy-capability-coverage.md`:
- nine classification groups, every legacy module present;
- explicit rows for: forms/assessment builder · family feedback-meetings · request-schedule workflow · per-session class feedback · Zoom surfaces · notification matrix · CSV import/backup · RBAC matrix · WhatsApp/Email config · certificate designer · currency-rates · teacher-portal pages · family/student-portal pages · broken legacy routes · thin/duplicate features;
- every "intentionally excluded" row has a reason; sign-off checklist at the end is complete.
- Spot-check: pick 3 random routes from `output/combined/page-inventory.md` → each resolves to a matrix row.

## 3. Sidebar IA (walk all six categories, AR then EN)

1. **Rail**: still exactly 6 categories — no seventh.
2. **Reports category**: items reports / monthly reports / data analysis, then a labeled **finance sub-section** («المالية»): Finance (real link, first) + invoices, monthly invoices, salaries, staff salaries, payments, class salary report, **banks** — all 7 still lock-iconed, disabled, showing the truthful backend reason on focus/hover.
3. **Admin category**: banks is GONE from here; exactly 5 planned items remain (staff, materials, books, certificates, certificate requests).
4. **Families category**: label now «العائلات والطلاب» / "Families & Students"; same items as before (no add/remove).
5. **Sessions item**: badge shows the fixture total (24) — verify it matches the total shown on `sessions.html` itself; grep proof: `grep -n "SESSIONS.total" src/js/nav.config.js` (derived, not hard-coded).
6. **Future routes register**: `grep -nE "attendance|groups:|teacherKpi|finance" src/js/nav.config.js` → none of the four appears inside `FUTURE_ROUTES`.
7. **Active states**: open `finance.html` → reports category opens, finance pill active. Open `group.html` → families category, groups pill active. Gallery → zero active (dev page).

## 4. Filter visibility (the defect fix)

On **attendance.html**: click a status tile (e.g. teacher-absent) → visually count rows — only matching rows are visible (previously 15 remained visible with 10 attribute-hidden). Repeat one narrowing filter on: sessions, students, teachers, courses, groups, families, teacher-performance, finance. Zero-match filters show the calm labeled empty state.

CSS proof: `grep -n "data-row..hidden" src/styles/app.css` → the shared `[data-row][hidden]{display:none !important}` rule exists; `.fin-row[hidden]` remains.

## 5. Family → finance shortcut (the ONE new link)

Open `family.html` → Plan & Billing tab: alongside the existing disabled "manage billing" button there is now a real link to the finance shell, honestly labeled (fixture preview wording). Click → lands on `finance.html` (EN page links `finance.en.html`). No other page gained a finance link; dashboard/reports bodies still have zero.

## 6. Honesty sweep

- Every planned item: «قريبًا» button, no navigation.
- Every disabled item: visible reason, `aria-disabled`, no navigation.
- No dead links: `grep -c 'href="#"' public/*.html` → all `:0`.
- Finance planned cards: still 9, figure-free, availability chips intact.

## 7. Guarded bodies

- `dashboard.html` body: unchanged (revenue KPI still the only money widget; no finance links/tokens).
- `reports.html` body: unchanged, finance-free.
- `finance.html` body: unchanged (tiles = row counts; drawer has no total line; no receipt concept).

## 8. Test suites & audits

```bash
npm test                       # smoke (incl. NEW: regrouped-sidebar asserts, per-filterable-page computed
                               # visibility, family-shortcut assert, link crawl, truthfulness sweep) + a11y
bash ../specs/010-capability-coverage-ia-polish/contracts/scope-guard-audit.sh   # if split out; else run the
                               # G-blocks in contracts/scope-guard.md — every line must print ok
```

Also re-run **all prior guards** (Spec 008 + Spec 009 scope-guard G8a blocks verbatim, with 009's two attributed Spec 010 amendments) — every line `ok`.

## 9. Page audit artifact

Open `../specs/010-capability-coverage-ia-polish/page-coverage-audit.md`: 20 rows × 10 dimensions; every fix-now item checked off with its verification noted; future items cross-referenced to matrix rows.

## 10. Screenshots

```bash
node tests/screenshots/capture.cjs
```

Review the 13 Spec 010 frames per `contracts/screenshot-acceptance.md` and record verdicts in `screenshots/REVIEW.md` (all six categories AR light, reports category AR dark + EN, mobile drawer, family Plan & Billing, attendance filtered proof, dashboard, finance). Zero console errors during capture.

## 11. Architecture confirmations

- No new libraries: `git diff package.json` → empty.
- No new hooks: `git diff src/js/enhance.js` → empty.
- Static-first: no `id="app"`, no runtime page construction added (`git diff src/js/pages/` shows only the one family.js link).
- Django-ready: README's mapping section covers the nav sub-section (template include with a section loop — same shape as teachersPerf) and the family link (plain `{% url %}`-mappable anchor).
