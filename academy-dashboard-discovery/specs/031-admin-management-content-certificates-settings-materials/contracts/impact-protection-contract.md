# Contract: Impact Protection

**Purpose**: Bound the blast radius of 031.

**MUST**:
- **Changed existing HTML**: only `settings.html`/`.en` (folded into hub).
- **New HTML**: `staff.html`/`.en`, `library.html`/`.en`, `certificates.html`/`.en` (additive).
- **Byte-identical**: finance/reports/teacher-portal×16/teacher-performance/family/student/dashboard + all admin-ops/management pages (except shared-asset hashes from new locales/CSS).
- **0-diff**: `package.json`; no new dependency/engine/hook/storage key.
- **nav.config.js**: exactly 3 flips (`staff`/`books`/`certificates`); no other nav change.
- **enhance.js**: one `staffMenu` branch on the existing `data-row-menu` dispatch; no new hook.
- **i18n.js**: 2 imports + 2 `deepMerge` for `ar/en.adm.js`.
- **build-html.mjs**: 3 imports + 3 `PAGES` entries.
- **app.css**: additive only (no rule deletions/broad restyle).

**Verify**: `git status --short public/*.html` = only settings + the 3 new pages; `git diff --stat package.json` = 0; count 103.

**Status**: Binding.
