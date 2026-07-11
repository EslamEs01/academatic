# Current-App Content & Certificate Inventory — Spec 039

Baseline HEAD `4cbcb31` (Spec 038 committed). Classification per item: implemented-complete /
implemented-incomplete / deep-link-only / disabled-lock / duplicated-ambiguous / planned-card-only / absent /
owned-by-other-spec.

## Nav items (`src/js/nav.config.js`, admin category lines 99–104)
| Nav id | AR | Status/route (now) | Target surface | Classification |
|---|---|---|---|---|
| `staff` | الموظفون | `route: staff.html` | staff.html | implemented-complete (Spec 031) |
| `materials` | المواد التعليمية | **`status:'planned'`** («قريبًا») | library.html Materials tab (exists) | **planned-card-only → surface exists (deep-link pending) — Spec 039 target** |
| `books` | مكتبة المحتوى | `route: library.html` | library.html (opens Materials tab by default) | implemented-complete (Spec 031); mild IA blur (optional `#view=books` refinement) |
| `certificates` | الشهادات | `route: certificates.html` | certificates.html Templates tab | implemented-complete (Spec 031) |
| `certificateRequests` | طلبات الشهادات | **`status:'planned'`** («قريبًا») | certificates.html Requests tab (exists) | **planned-card-only → surface exists (deep-link pending) — Spec 039 target** |

`FUTURE_ROUTES` (nav.config.js:141–147): `materials: 'library.html'` present; **no `certificateRequests` entry.**
Admin category total items = **5** (unchanged by the flip). Admin menu sitewide = **50**.

## Page builders / registry
- `scripts/build-html.mjs` PAGES: `library` (base `library`, activeId `books`, `renderLibrary`) + `certificates`
  (base `certificates`, activeId `certificates`, `renderCertificates`). **No `materials`/`certificateRequests`
  page entry** — they are tabs, not pages. Public HTML = **115** (57 bases ×2 + index).
- `src/js/pages/library.js`: `tabs({group:'library', items:[materials, books]})`; `materialsPanel()` (SUBJECTS
  table, mat-add/mat-edit drawers, delete-confirm), `booksPanel()` (BOOKS table, filterBar, lib-cats + lib-item
  drawers, row gates). No `type=file`/`<canvas>`.
- `src/js/pages/certificates.js`: `tabs({group:'certificates', items:[templates, requests]})`; `templatesPanel()`
  (CERT_TEMPLATES cards + static `cert-stage` `role="img"` designer preview + cert-tpl drawer), `requestsPanel()`
  (CERT_REQUESTS rows + status chips + requestDrawer review + cert-create drawer + Approve/Reject/Generate/
  Preview/Download/Send gates). No `type=file`/`type=password`/`<canvas>`.
- `src/js/enhance.js` `initTabs()`: `#view=<id>` wins on load → deep-links already functional.

## Fixtures (authored; no pay/secret/PII)
- `content-library.js`: `SUBJECTS` 6 (bilingual name/nameAr) · `BOOKS` 6 · `BOOK_TYPES` 5 (file/video/image/
  audio/link) · `BOOK_STATUS` 3 (published/draft/archived) · `BOOK_CATEGORIES` 6 (authored `count`). Views/
  downloads = authored integer literals.
- `certificates.js`: `CERT_TEMPLATES` 4 (authored `usageCount`) · `CERT_DESIGNER` 4 static fields (x,y %) ·
  `CERT_STATUS` 3 (pending/approved/rejected) · `CERT_REQUESTS` 5 · `CERT_ISSUED` 2.

## Locales
`ar.adm.js` / `en.adm.js` — `adm.lib.*` (lines ~44–66) + `adm.cert.*` (lines ~68–99), mirrored 1:1. Existing
`nav.materials` / `nav.certificateRequests` labels present (currently rendered on the «قريبًا» buttons). No new
locale keys are strictly required for a nav-only flip (labels already exist).

## Tests (current assertions touching scope — from `tests/smoke/run.cjs`)
- **`navCount32 === 50`** (line ~1298): sitewide admin-menu freeze — unaffected by status flip.
- **`nav010.admItems.length === 5 && !includes('banks')`** (line ~1636): admin category count — stays 5;
  **message text "5 planned items" is inaccurate after the flip** (cosmetic fix; count assertion still passes).
- **`truth010.badPlanned === 0`** (lines ~1669–1679): generic planned-item truthfulness — unaffected.
- **Dashboard planned-item probe** (lines ~223–230): clicks admin category, expects a `.nav-item.is-planned`
  and a coming-soon toast. **WILL FAIL after the flip** (admin has 0 planned items) → the single sanctioned
  behavioral amendment: repoint admin→settings (which still has 6 planned items).
- **`a31` block** (lines ~1145–1208): library tabIds `['materials','books']`, rows≥6, gates≥3; certificates
  tabIds `['templates','requests']`, certStage===1, gates≥4; no type=file/password/canvas; tab-switch check.
  Unaffected — keep byte-verbatim.
- **Link-integrity crawl** (lines ~1648–1667): strips `#`; `library.html`/`certificates.html` already valid —
  the new hash routes pass with no change.
- No hardcoded page-count "115" assertion exists (count enforced via file crawl / VALID_FILES).
- `tests/a11y/run.cjs` + `tests/screenshots/capture.cjs`: already exercise `#view=books` / `#view=requests`; no
  materials/certificateRequests nav-specific rows exist yet (additive rows optional).

## Summary
The two targets are **deep-link-only pending** (surfaces built + reachable by hash; nav still «قريبًا»). No
absent, ambiguous, or duplicated surface. The change is a pure nav unlock — the proven Spec 037/038 pattern.
