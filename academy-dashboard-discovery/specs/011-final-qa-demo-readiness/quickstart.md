# Quickstart: Verifying Spec 011 — Final QA Hotfix & Demo Readiness

All commands from `academy-dashboard-discovery/app/`.

## 1. Build & preview

```bash
npm run build        # nav guard + finance coherence guard + chip-tone guard all silent
npx serve public     # static; no backend
```

## 2. Dashboard Overview fix

Open `dashboard.html` (AR) and `dashboard.en.html` (EN). The Overview section's "View all metrics" / «عرض كل المؤشرات» link now navigates to the reports page (language-correct). Proof:

```bash
grep -c 'href="#"' public/dashboard.html public/dashboard.en.html   # both 0
grep -c 'href="#"' public/*.html | grep -v ':0$'                    # empty → zero sitewide
```

Visual: the link looks exactly as before (same text/icon/style) — only its destination changed. No dashboard card/stat/widget changed.

## 3. Sessions badge — Arabic vs English

```bash
# Arabic page → Arabic-Indic digits (e.g. ٢٤); English page → Western (24)
node -e 'const fs=require("fs");
  console.log("AR:", (fs.readFileSync("public/dashboard.html","utf8").match(/nav-badge tabular">([^<]+)/)||[])[1]);
  console.log("EN:", (fs.readFileSync("public/dashboard.en.html","utf8").match(/nav-badge tabular">([^<]+)/)||[])[1]);'
```

Both equal the fixture `SESSIONS.total`; grep `src/js/nav.config.js` → still `badge: SESSIONS.total` (no literal reintroduced).

## 4. Link & truthfulness sweep

`npm run test:smoke` runs the crawl (zero `href="#"` sitewide, no dead/external targets), the truthfulness sweep (planned non-navigating · disabled expose reason · future-role unrendered), and the locale-aware badge assertion.

## 5. Contract-frozen bodies

```bash
# reports/finance page modules unchanged; dashboard changed only at the Overview linkHref
git diff --name-only HEAD -- src/js/pages/reports.js src/js/pages/finance.js   # empty
git --no-pager diff HEAD -- src/js/pages/dashboard.js                          # only the linkHref line
# reports/finance #page-body identical to HEAD; dashboard #page-body only the Overview href (see the plan's body-diff check)
```

## 6. Full tests + guards

```bash
npm test                      # smoke PASS + a11y critical=0 serious=0
# then run contracts/scope-guard.md G3 (each line ok) + Spec 008/009/010 guard audits (all ok)
```

## 7. Screenshots

```bash
node tests/screenshots/capture.cjs
```

Review the dashboard (AR/EN), the Arabic sidebar badge (٢٤), the English sidebar badge (24), and mobile AR sidebar per `contracts/screenshot-acceptance.md`; record verdicts in `screenshots/REVIEW.md`. Zero console errors.

## 8. Architecture confirmations

`git diff package.json` empty (no new library) · `git diff src/js/enhance.js` empty (no hook change) · no new files under `src/`/`scripts/` · Django mapping note in README (`{% url 'reports' %}` link + localized-digit badge filter).
