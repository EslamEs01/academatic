# Quickstart — Spec 031 (build & verify recipe)

For the implementation phase. Establishes the exact commands and the expected green state. **No commit/push in specify/plan.**

## Build & test
```bash
cd academy-dashboard-discovery/app
npm run build            # expect: 102 static pages → public/ (+ index) = 103
npm test                 # smoke + a11y
npm run test:smoke       # PASS — 102 page loads (…101 loads +index?), 031 honesty block green
npm run test:a11y        # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors; +031 frames
```
> Count note: build reports "N static pages → public/ (+ index.html)". At 103 total HTML, that is **102 static pages + index**. Smoke iterates the built pages (≈102 loads).

## Expected green state (after implementation)
- **Build**: 103 public HTML (97 + staff/library/certificates ×AR/EN); icons 0 missing; chip-tone guard green.
- **Smoke PASS** with an additive 031 block asserting, over the built 031 bodies (settings + staff + library + certificates, AR+EN):
  - settings hub renders 6 tabs (general/notifications/customization/security/users/integrations), 1 visible; theme/lang still functional.
  - staff directory renders (≥5 rows) + kebab; RBAC matrix display-only (≥10 groups); Add/Edit modal has **no `type=password`, no salary figure**.
  - library renders Materials(≥6 subjects) + Books(≥6, count-literals) tabs + category drawer + Add-Material/Upload gate (**no `type=file`**).
  - certificates renders Templates(+static designer, **no `<canvas>`/drag**) + Requests(≥5, Approve gate, **no `.pdf`/window.open**) tabs.
  - integrations = locked-placeholder cards (≥8) + Connect/Test gates; **noSecret** (no `type=password`/api-key/webhook/paymob/payoneer).
  - global: `noFile`, `noPdf`, `noBackup`, `noCanvas`, `figureFree`, `FAKE`-clean, no-mutation snapshot on any confirm/toggle/save, `href="#"`=0, raw-keys=0, dead-buttons=0.
  - count assert = 103; admin-menu coverage re-pin (6 categories, planned-truthfulness, build guard).
  - **byte-verbatim**: `payHit`, `tchPay`, `famPay`, `payFigure`, child-view, finance no-mutation/`forbidden`, and all Spec 026/027/028/029/030 asserts.
- **A11y**: critical=0 serious=0 (+031 rows: staff, library materials/books, certificates templates/requests, settings hub, a modal, a drawer, dark, mobile 390).
- **Screenshots**: 0 console errors (+031 frames).

## Impact expectations
- **Changed existing HTML**: only `settings.html`/`.en` (folded into hub). Everything else byte-identical except shared-asset hashes (new locales/CSS).
- **New HTML**: `staff.html`/`.en`, `library.html`/`.en`, `certificates.html`/`.en`.
- **0-diff**: `package.json`; finance/reports/teacher-portal×16/teacher-performance/family/student/dashboard/admin-ops/management pages; no new dependency/engine/hook/storage key.
- **nav.config.js**: exactly 3 flips (`staff`/`books`/`certificates` planned→implemented + route).

## Stop conditions (any ⇒ STOP and report)
count ≠ 103 · any `type=file` · any `type=password` · any api-key/secret/webhook/token rendered · any `.pdf`/`blob:`/`window.open`/`<canvas>`/drag · any salary/pay figure · any legacy PII in a fixture · any fake save/delete/success/sent/connected wording · any status/permission chip mutating after confirm · any `href="#"` · any dead button · any raw key · `package.json` change · any backend/API/auth · any new hook/storage key/engine/dependency · any protected regex altered.

## Definition of done (implementation phase)
Every 031-owned menu item implemented (staff/books/certificates + settings) or folded (materials/certificateRequests/settings*/heads/locations/integration-facets) or future-backend (gateway/payout/SMTP/backup/import/message-builder); 0 unclassified; 0 dead placeholder; all gates honest; all registers satisfied; docs + REVIEW updated; **no commit/push** (watcher commits).
