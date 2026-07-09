# Contract: Scope Guard (allowed/forbidden + stop conditions)

**Allowed files** (implementation phase):
`src/js/pages/settings.js` (modify) · `src/js/pages/{staff,library,certificates}.js` (new) · `src/js/fixtures/{settings-management,staff-management,content-library,certificates}.js` (new) · `src/locales/{ar,en}.adm.js` (new) · `src/js/nav.config.js` (3 flips) · `src/js/enhance.js` (1 staffMenu branch) · `src/js/i18n.js` (2 imports + 2 deepMerge) · `src/styles/app.css` (additive) · `scripts/build-html.mjs` (3 imports + 3 PAGES) · `tests/{smoke/run.cjs,a11y/run.cjs,screenshots/capture.cjs}` · `screenshots/REVIEW.md` · `README.md` · `CLAUDE.md` · this spec folder.

**Forbidden** (unless a page-count decision explicitly justifies): `package.json` · external dependencies · backend/API/auth/database · new upload/download/PDF/certificate/integration/notification/backup/chart engine · new hook/storage key · `type=file` · `type=password` · API-key/secret/webhook/token UI · payment-gateway/payout credential UI · teacher salary/pay page · family payment page · student primary-role page · finance/payroll/bank pages · chat/live-room engine.

**Stop and report if**:
Spec 030 baseline unstable · count ≠ 97 before planning · any unclassified menu item · any C-row unresolved · a new page chosen without the page-candidate test · fake settings save / user-RBAC mutation / upload-download / PDF-certificate generation / integration connection appears · `type=file` or `type=password` appears · API-key/secret/webhook/token rendered · legacy PII copied into a fixture · salary/pay/compensation figure appears · fake-success wording appears · a status/permission chip mutates after confirm · `href="#"` / dead button / raw key appears · `package.json` changes · backend/API/auth needed · a new hook/key/engine/dependency is needed · a protected role-law regex would change.

**Grep discipline**: reword source comments to avoid tripping the forbidden-token greps (scope-guard convention); e.g. don't write "no password field" as `password` next to `type=` — phrase as "credential field omitted".

**Status**: Binding for `/speckit.tasks` and implementation.
