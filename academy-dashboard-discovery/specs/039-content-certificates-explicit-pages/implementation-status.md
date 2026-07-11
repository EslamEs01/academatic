# Implementation Status — Spec 039 (Admin Content & Certificates Explicit Pages)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`.
**Baseline: HEAD `4cbcb31` (Spec 038 committed; working tree clean).** **No commit / no push** performed.

## Verdict
Navigation-only unlock (Option B — deep-links to existing tabs). The two admin content «قريبًا» locks became
real deep-links to surfaces that already exist (Spec 031): **materials → `library.html#view=materials`** and
**certificateRequests → `certificates.html#view=requests`**; **books refined `library.html` →
`library.html#view=books`** so the two library items open distinct tabs. Count held **115**; admin menu **50**.
The sole application-source edit is `src/js/nav.config.js`; every page body/fixture/locale/component/build script/
dependency is **0-diff**. Safe to review/commit.

## Counts / invariants
- Public HTML **115 → 115** (0 new pages). Admin menu **50**.
- Admin category: **5 items / 0 «قريبًا»** (was 2 planned). Settings is now the ONLY planned-bearing category
  (**6** items → owner Spec 040). `classSalaryReport` finance lock unchanged.
- Nav: `materials` `planned → implemented` (`library.html#view=materials`); `certificateRequests`
  `planned → implemented` (`certificates.html#view=requests`); `books` route refined to `library.html#view=books`;
  **`FUTURE_ROUTES.materials` removed**.
- **0-diff**: `pages/library.js`, `pages/certificates.js`, `fixtures/content-library.js`,
  `fixtures/certificates.js`, `locales/ar.adm.js`, `locales/en.adm.js`, `enhance.js`, `components/tabs.js`,
  `components/sidebar.js`, `i18n.js`, `styles/app.css`, `scripts/build-html.mjs`, `package.json`.
- No new page/fixture/locale key/component/CSS class/hook/storage key/dependency.

## Surfaces (all reused unchanged — reachable via the unlocked nav)
| Item | Route | Surface (existing, Spec 031) |
|---|---|---|
| materials | `library.html#view=materials` | Materials tab — 6 bilingual subjects; mat-add/mat-edit drawers; delete-confirm; gated |
| books | `library.html#view=books` | Books tab — 6 content rows; types file/video/image/audio/link; categories; authored views/downloads; filters; lib-cats/lib-item drawers; uploads gated (no `type=file`) |
| certificates | `certificates.html` | Templates tab — 4 templates + STATIC `role="img"` designer preview (no `<canvas>`/drag/upload/PDF) |
| certificateRequests | `certificates.html#view=requests` | Requests tab — 5 authored requests; review drawer (cr-cr*); create drawer (cert-create); Approve/Reject/Generate/Preview/Download/Send gated |

## No-fake / role-law proof
- Every write stays a `backendRequired`/`data-disabled-reason`/confirm gate; **no** fake persistence/upload/delete/
  category-save/publish/download/approval/generation/issuance/WhatsApp-email delivery; **no** view/download metric
  or request-status mutation.
- **0** `type=file` / `type=password` / `<canvas>` / `.pdf` / `window.open` / drag-designer / `href="#"` / raw key
  on the library/certificates bodies (existing `a31` + sitewide `g32` honesty asserts pass byte-verbatim).
- Static certificate preview never described as generated/saved/issued/downloaded/delivered.
- Role law: admin manages; teacher/family library read-only; all 16 portal bodies byte-identical; teacher pay-free
  / family zero-pay / student child-view / finance no-fake-money / classSalaryReport lock carried byte-verbatim.
- Future-backend (never mocked): real persistence, file upload, the drag/PDF certificate designer, PDF generation,
  issuance, WhatsApp/email delivery. Settings deep-links = Spec 040; final freeze = Spec 041.

## Protected-test amendments (the TWO declared supersessions — everything else byte-verbatim)
1. **Dashboard planned-item toast probe** (`tests/smoke/run.cjs` ~227–230): repointed `data-nav-category`
   `admin → settings` (admin now has 0 planned items; settings still has 6) — toast logic/threshold preserved.
2. **Admin category assertion** (`tests/smoke/run.cjs` ~1636 / `nav010`): `admItems.length===5 && !includes('banks')`
   logic kept byte-verbatim; the inaccurate "5 planned items" message corrected; added `admPlanned` to the nav010
   evaluate block + a companion `admPlanned === 0` assertion (mirrors famPlanned/teachersPlanned/reportsPlanned).

## Additive smoke coverage (weakens nothing)
- Per-page Spec 039 nav block: materials/certificateRequests/books exact anchors (no «قريبًا»/aria-disabled/lock,
  AR+EN href regex) + `settingsPlanned === 6`.
- End-of-file: fresh-context deep-link loads (`library#view=materials|books`, `certificates#view=requests`, AR+EN)
  open exactly one visible tabpanel = the target, no canvas/chart/type=file/password, 0 external request; +
  exact route-anchor block (materials/certificateRequests/books + admItems 5 / admPlanned 0 / settingsPlanned 6 /
  adminMenu 50).
- **`nav.config` SOURCE audit** (Node-side, after `browser.close()`, mirroring the Spec-022 CSS audit pattern):
  `FUTURE_ROUTES.materials` is **removed**, `certificateRequests` was **never added** to the map, the three exact
  routes are pinned, and `classSalaryReport` is still an honest `disabled` + `nav.reason.finance` lock with **no
  route**. This closes the one requirement the DOM-only tests could not reach.
- **Deep-link rows are DISCRIMINATING (adversarial-review hardening).** An earlier draft loaded
  `library.html#view=materials` in a clean context — but `materials` is library's *baked default* tab, so that row
  would have passed **even with JavaScript disabled** (it asserted nothing about hash routing). Each deep-link row
  now pre-seeds the **opposite** tab as the stored view (`localStorage['academy.schedView.<group>']`) so the URL
  hash must **beat** it. Mutation-proven: control loads with no hash resolve to the seeded tab (seed is effective),
  and the hash still wins in all six AR/EN cases — i.e. the assertion can genuinely fail.

## Verification (all re-run from scratch on the final tree)
- `npm run build` → **115 pages** (114 + index), 0 raw keys.
- `npm run test:smoke` → **PASS** (114 loads) — Spec 039 anchors + AR/EN deep-links + admin 0-planned + settings
  6-planned + admin-menu 50 + the FUTURE_ROUTES source audit; the two sanctioned amendments; all prior protected
  asserts (a31/g32/navCount32/truth010.badPlanned/payHit/famPay/payFigure/childView) byte-verbatim.
- `npm run test:a11y` → **critical=0 serious=0** (+library `#view=materials|books` / certificates `#view=requests`
  × AR/EN × light/dark + mobile-390 + mat-edit/lib-item/lib-cats/cr-cr1/cert-create drawers + the Materials
  **delete-confirm** + **keyboard tab switching** via roving tabindex ArrowRight/ArrowLeft).
- `node tests/screenshots/capture.cjs` → **347 captured · 0 console errors** (13 `sp039-*` frames, incl. the admin
  sidebar itself and the honest delete-confirm).
- Locale parity `adm` **403/403, 0 divergence** (both locale files are 0-diff).
- Built-page no-fake grep (raw text, so it also sees inside `<template>` where `querySelectorAll` cannot):
  library/certificates × AR/EN → **0** `<input type=file>`, **0** `<input type=password>`, **0** `<canvas>`,
  **0** `window.open`, **0** `.pdf`, **0** `href="#"`, **0** `draggable`. Uploads/issuance remain
  `data-disabled-reason` gates (19 in library, 36 in certificates).

## Impact protection (non-destructive)
Baseline = the **COMMITTED HEAD `4cbcb31`** read via `git show` (the working tree is never touched: **no stash, no
reset, no checkout, no branch switch**). Rebuilt and compared normalized `#page-body` md5 for all 115 pages:
**all 115 `#page-body` byte-identical** (library/certificates bodies + every other admin body + 16 portals + index;
`index.html` has no `#page-body` and was proven byte-identical whole-file). Classified: **64 admin pages** differ at
file level (the shared sidebar ONLY — 2 «قريبًا» buttons → anchors + `books` gains `#view=books`), **51 non-admin
pages changed = 0**. Forbidden-file 0-diff proven; only `src/js/nav.config.js` changed under `src/`
(5 insertions, 4 deletions).

## Next
Watcher commit. Remaining Spec-033 roadmap: **040** (settings deep-links ×6) · **041** (final sidebar/route/
production re-freeze). The real content/certificate backend (persistence, upload, PDF designer/generation,
issuance, WhatsApp/email delivery) stays future-backend — never mocked.
