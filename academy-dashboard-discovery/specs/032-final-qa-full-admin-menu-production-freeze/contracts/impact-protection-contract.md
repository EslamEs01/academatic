# Contract: Impact Protection

**Purpose**: Bound the blast radius of the forms fix.

**MUST**:
- **Changed**: the create/edit form pages/components (families/students/courses/groups/teachers/reports/finance/staff/library/certificates/settings + sessions + shared action components) + `enhance.js` (kebab `data-modal-trigger`→`data-drawer` swaps only) + `preview-drawer.js` (+`formDrawer` helper) + fixtures/locales + tests/docs.
- **0-diff**: `package.json`; `build-html.mjs` PAGES; `nav.config.js` route rules (optional stale-map cleanup only). No new dependency/engine/hook/storage key/page.
- **enhance.js**: only kebab menu markup changes (trigger swaps) — **no new dispatch hook, no `openModal` change** (Option B).
- **Byte-identical**: teacher-portal ×16 + all portal pages + index; every `#page-body` region not hosting a rebuilt form.
- **`app.css`**: additive only (a tiny form-in-sheet tweak at most; no rule deletion/broad restyle).

**Verify**: `git diff --stat package.json` = 0; `git status public/*.html` = only the create/edit-host pages (+ their `.en`); portal/index byte-identical; count 103.

**Status**: Binding.
