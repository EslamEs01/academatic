# Contract: Scope Guard (allowed/forbidden + stop conditions)

**Allowed files** (implementation phase):
`src/js/components/{preview-drawer,course-group-actions,teacher-actions,report-feedback,outcome-details,table,welcome,form-field}.js` · `src/js/pages/{sessions,family,families,student,students,courses,course,groups,group,teachers,teacher,finance,staff,library,certificates,settings,add-family}.js` · `src/js/enhance.js` (kebab trigger swaps only) · `src/js/fixtures/*` · `src/locales/{ar,en}.*.js` · `src/styles/app.css` (additive) · `nav.config.js` (optional stale-map cleanup only) · `tests/{smoke/run.cjs,a11y/run.cjs,screenshots/capture.cjs}` · `screenshots/REVIEW.md` · `README.md` · `CLAUDE.md` · this spec folder.

**Forbidden**: `package.json` · dependency · backend/API/auth/database · new engine (chart/PDF/upload/download/payment/notification/permission/certificate/integration) · new hook/storage key · new public page (unless the count contract approves) · `openModal` generalization unless a specific FC justifies Option A · `type=file` · `type=password` · API-key/secret/webhook/token/otp UI · pay/salary/hour-rate/fine/computed-Total field · `<canvas>`/draggable designer · `.pdf`/`blob:`/`createObjectURL`/`window.open`/`a[download]` · teacher salary/pay page · family payment page · student primary-role page.

**Stop and report if**:
Spec 031 baseline unstable · count ≠ 103 (unjustified) · any FC row unresolved · plan requires a new engine/hook/dependency/storage-key · a MUST-OMIT field is rendered · a MUST-GATE affordance is made working · `type=file`/`type=password` introduced · `.pdf`/`window.open`/`blob:`/`download`/`<canvas>` introduced · a pay/salary/credential field or computed Total appears · a role-law/no-fake/026-031 assert is weakened · a field-less create/edit modal remains · fake success/persistence/mutation appears · `package.json` changes · backend/API/auth appears.

**Grep discipline**: reword source comments to avoid tripping the forbidden-token greps (scope-guard convention) — e.g. describe "no upload control" without the literal `type="file"`, "no plotting element" without `<canvas>`.

**Status**: Binding for `/speckit.tasks` and implementation.
