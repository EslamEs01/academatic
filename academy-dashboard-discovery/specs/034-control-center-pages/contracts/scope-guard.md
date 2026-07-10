# Contract: Scope Guard — Spec 034

**Binding for `/speckit.tasks` + implementation.**

## Allowed files
- `app/src/js/pages/{messages,leads,tasks,announcements,time-converter}.js` (NEW)
- `app/src/js/fixtures/control-center.js` (NEW)
- `app/src/locales/{ar,en}.ctrl.js` (NEW)
- `app/src/js/nav.config.js` (5 flips + FUTURE_ROUTES trim ONLY)
- `app/scripts/build-html.mjs` (+5 render imports + 5 PAGES entries ONLY)
- `app/src/js/i18n.js` (+2 ctrl imports + 2 deepMerge ONLY)
- `app/src/js/enhance.js` (+1 guarded `initTimeConverter` IIFE ONLY — no new global `data-*` dispatch)
- `app/src/styles/app.css` (additive scoped classes ONLY)
- `app/tests/{smoke/run.cjs,a11y/run.cjs,screenshots/capture.cjs}` (additive ONLY)
- `app/screenshots/REVIEW.md`, `app/README.md`, `CLAUDE.md`, `specs/034-control-center-pages/`

## Forbidden
- `package.json`, any dependency, backend/API/auth/database, websocket/CRM/task/notification/upload/PDF/payment engine, new component/CSS framework, new global `data-*` hook or storage key, new page beyond the 5, finance/pay pages, teacher/family/student portal pages, unrelated specs (append-only status note only if unavoidable), weakening any existing test.

## Grep discipline
- Reword source comments to avoid tripping forbidden-token greps (describe "no upload control" without the literal `type="file"`; "no plotting element" without `<canvas>`).

## Stop and report if
- count ≠ 113 (unjustified) · any of the 5 pages lacks legacy evidence · timeConverter requires an external API/dependency · any final fakes success · any row/status/thread/task/message/announcement mutates · `type=file`/`type=password`/credential appears · `<canvas>`/`.pdf`/`window.open`/`blob:`/`download=` appears · backend/websocket introduced · `package.json` changes · `enhance.js` needs a new global `data-*` dispatch (not just the guarded init) · a role-law/no-fake/026–032 assert needs weakening · a field-less create/edit modal remains.
