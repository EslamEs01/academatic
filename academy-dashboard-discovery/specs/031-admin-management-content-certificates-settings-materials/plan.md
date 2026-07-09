# Implementation Plan: Admin Management / Content / Certificates / Settings / Materials Deep Management

**Spec**: 031 · **Branch**: `feature/012-role-portal-foundation` · **Baseline**: Spec 030 committed (HEAD `7c5ab7b`, public HTML **97**, working tree clean before 031 spec)
**Inputs**: `spec.md` + the 12 companion artifacts · **Status**: PLANNED (no tasks, no implementation, no commit)

## Summary

Deepen the remaining **non-finance** admin domain — staff/users/RBAC, materials, books/library, certificates (+requests), and the six settings sub-domains + integrations — into honest, complete, non-dead surfaces. Display is allowed; **every write/secret/file/generation is a gate**. Reuse the closed `data-*` hook set and existing components; no new hook/storage key/engine/dependency/chart/canvas; no `type=password`/`type=file`; no salary/pay figure; no real backend/auth/upload/PDF/integration/backup.

**Count decision (the key planning output): 97 → 103.**
- **Settings-category items fold into the existing `settings.html`** as a tabbed hub (0 page-count cost — the finance.html/Spec-030 precedent): `settingsGeneral`, `settingsNotifications`, `settingsCustomization`, `settingsSecurity`, `settingsUsers`, `settingsIntegrations`, plus the Locations slice, expense-heads lookup, backup/import gates, and the WhatsApp/Email/payment-gateway locked-placeholder cards.
- **Admin-category items become three focused pages** (they belong to a different rail category than settings, and each is too large/distinct to fold honestly): **`staff.html`** (directory + kebab + RBAC matrix + drawers), **`library.html`** (Materials + Books tabs), **`certificates.html`** (Templates + static designer + Requests tabs). `certificateRequests` folds into `certificates.html`; `materials` folds into `library.html`.
- **Nav flips (justified page promotions)**: `staff`→implemented (`staff.html`), `books`→implemented (`library.html`), `certificates`→implemented (`certificates.html`). `materials`, `certificateRequests`, and all six `settings*` items stay `planned` (folded, reached as tabs). `settings` stays implemented.
- **Delta**: +3 `PAGES` entries in `build-html.mjs` → +6 HTML (AR+EN) → **103**. No page ships without smoke/a11y/screenshot coverage.

## Technical Context

- **Language/stack**: static HTML-first; native ES modules; per-page pre-rendered `public/*.html` (AR RTL default + `.en` LTR); Tailwind/PostCSS compiled; no CDN/framework/TS/SPA/chart lib.
- **Rendering**: `scripts/build-html.mjs` `PAGES[]` → `renderX()` page modules → `shellMarkup(...)` (admin shell) baked at build.
- **Closed `data-*` hook set** (reused, no new hook): `data-tab`, `data-filter*`/`-set`, `data-drawer`+`<template data-preview>`, `data-modal-trigger`(+`-title-key`/`-note-key`), `data-confirm[-danger]`, `data-disabled-reason`(+`-reason-key`), `data-coming-soon`(+`-soon-key`), `data-row-menu`(+`-kind`), `data-demo-action`/`data-toggle`(+`-toast`). All dispatch in `enhance.js:475-580`.
- **Fold mechanism**: `tabs({group, items:[{id,labelKey,icon}], panels:{id:html}, ariaKey})` from `components/tabs.js` (proven by `renderFinance` — `finance.js:263-288`).
- **Components reused**: `directory-card` (staff cards + optional `menuId`/`menuKind` kebab), `filter-bar`, `table`(`dataTable`/`tableFooter`), `preview-drawer`(`previewTemplate`/`sheetRow`), `confirm-modal`(`confirmAction`), `tabs`, `settings-section`(`settingsSection`), `finance-actions`(`disabledAction` gate pattern), `page-header`, `status-chip`, `ui`(`button`/`medallion`/`chip`/`avatar`). Chip tones limited to `{live,upcoming,completed,cancelled,amber,neutral}`.
- **Row-menu kind pattern**: a new `staffMenu` branch on the EXISTING `data-row-menu` dispatch (one branch mirroring `familyMenu`/`studentMenu`/`teacherMenu`) — NOT a new hook.
- **Fixtures**: new `fixtures/staff-management.js`, `fixtures/content-library.js`, `fixtures/certificates.js`, `fixtures/settings-management.js` (authored fake data; no computed/pay/PII values).
- **Locales**: new mirrored `ar.adm.js` / `en.adm.js` (staff/materials/books/certificates/settings-hub keys), registered via 2 imports + 2 `deepMerge` calls in `i18n.js`.
- **Persistence/auth/files**: NONE. No backend/API/DB. No `type=file`/`type=password`. No secrets. No PDF/canvas. No salary/pay figure.

## Constitution Check (standing-law gates — all must stay green)

| Gate | Rule | 031 compliance |
|---|---|---|
| Static HTML-first | pre-rendered pages, closed hooks | ✅ 3 new pages + settings hub, reused hooks |
| No new hook/storage key | closed `data-*` set | ✅ `staffMenu` = branch on existing `data-row-menu` |
| No engine | no auth/permission/upload/PDF/integration/backup engine | ✅ all gates |
| No `type=password`/`type=file` | binding | ✅ none rendered |
| No secret/API-key/webhook | binding | ✅ locked-placeholder cards only |
| No `<canvas>`/chart/computed metric | binding | ✅ static designer preview; count literals |
| No salary/pay figure | finance/pay law | ✅ staff omits salary; heads name/status; notif `salaries` figure-free |
| No fake persistence/success | honesty law | ✅ `FAKE` guard; no-mutation snapshot |
| `href="#"`=0 / raw-keys=0 / dead-buttons=0 | standing | ✅ every write = gate/modal/drawer |
| Teacher pay-free / family zero-pay / student child-view | role laws | ✅ 031 touches admin surfaces only; regexes byte-verbatim |
| Finance Spec-030 invariant | binding | ✅ finance.html untouched |
| Admin-menu coverage gate | Spec-010/029 | ✅ nav flips consistent with build guard; coverage re-pinned |

**No gate violation.** No `[NEEDS CLARIFICATION]` remains (resolved by `research.md` D1–D48).

## Page / fold architecture

### settings.html → tabbed hub (0-delta)
`renderSettings()` wraps its panels in `tabs({group:'settings', items:[general, notifications, customization, security, users, integrations], panels})`. The existing real theme/lang controls are preserved (inside the Customization/appearance panel). Panels:
- **General** — academy identity rows + Locations slice (country/city/timezone/address) + course-automation display toggles + **expense-heads lookup** (name/status, no amount); Save = gate; logo = gate. **Pay-rate/salary fields omitted.**
- **Notifications** — figure-free event×role×channel matrix (grouped rows) + Save gate (extends existing `#set-notif`).
- **Customization** — theme/lang (REAL, preserved) + brand/status colors display + Save gate.
- **Security** — 2FA gate (extends existing `#set-account`) + Family/Teacher policy display-only text + edit gate; backup/import = excluded/gate.
- **Users** — the existing RBAC preview (`rolesSection`) as a compact summary + a real deep-link to `staff.html` (the single staff home; resolves B-16).
- **Integrations** — locked-placeholder provider cards (payments/payouts/WhatsApp/Email) + Connect/Test/Configure future-backend gates; no credentials.

### staff.html (NEW) — `staff`→implemented
Directory (`directory-card` + `filter-bar`) with a per-row `staffMenu` kebab: View (drawer) · Edit (modal, **no password/salary**) · Permissions (RBAC matrix drawer, display-only + Save gate) · Category (drawer + assign gate) · Activity (drawer) · Duplicate (modal) · Deactivate/Activate/Delete (confirm, no mutation). Add-member = modal. Reset-password/Invite = future-backend gate.

### library.html (NEW) — `books`→implemented; `materials` folds
`tabs({group:'library', items:[materials, books]})`:
- **Materials** — subject rows (name/name_ar) + Add/Edit name-only modal + Delete gate.
- **Books** — media rows (name/type/category/publishedAt/views/downloads count-literals/status) + `filter-bar` + category drawer (name-only modal) + Add-Material/Upload/Download/Publish/Delete gates (**no `type=file`, no download link**).

### certificates.html (NEW) — `certificates`→implemented; `certificateRequests` folds
`tabs({group:'certificates', items:[templates, requests]})`:
- **Templates** — template rows + a **static, non-draggable designer preview** (baked authored layout; no `<canvas>`, no jQuery-UI, no upload) + Create/Edit modal + Delete gate.
- **Requests** — queue rows + Approve/Reject/Generate/Preview/Download/Send gates (**no PDF, no window.open, no send, no mutation**) + Create/Upload-certificate gates.

## Project structure (files this feature will touch — implementation phase)

```
academy-dashboard-discovery/app/
  src/js/pages/
    settings.js            (MODIFY → tabbed hub)
    staff.js               (NEW)
    library.js             (NEW)
    certificates.js        (NEW)
  src/js/fixtures/
    settings-management.js (NEW — settings hub authored rows: identity/locations/heads/notif-matrix/policy/integration-cards)
    staff-management.js    (NEW — staff directory + RBAC groups + categories + activity)
    content-library.js     (NEW — subjects + books + categories)
    certificates.js        (NEW — templates + designer layout + requests)
  src/js/components/
    (reuse only; a new small builder e.g. locked-card.js ONLY if justified — prefer existing ui/card)
  src/js/
    nav.config.js          (MODIFY → staff/books/certificates planned→implemented + routes)
    enhance.js             (MODIFY → one staffMenu branch on data-row-menu dispatch)
    i18n.js                (MODIFY → register ar/en.adm.js)
  src/locales/
    ar.adm.js / en.adm.js  (NEW — mirrored)
  src/styles/app.css       (MODIFY → additive only, if needed: staff cards / matrix grid / locked card / designer preview)
  scripts/build-html.mjs   (MODIFY → import 3 renderers + 3 PAGES entries)
  tests/smoke/run.cjs      (MODIFY → additive 031 honesty block + coverage re-pin; protected regexes byte-verbatim)
  tests/a11y/run.cjs       (MODIFY → additive 031 rows)
  tests/screenshots/capture.cjs (MODIFY → additive 031 frames)
  screenshots/REVIEW.md    (MODIFY)
  README.md                (MODIFY)
CLAUDE.md                  (MODIFY → Spec 031 pointer)
```

**Forbidden to touch/create**: `package.json`, any dependency, backend/API/auth, any upload/PDF/integration/backup/chart engine, teacher-portal/family/student/finance/reports pages, any `type=file`/`type=password`/credential UI.

## Complexity & risk tracking

| Risk | Mitigation |
|---|---|
| Certificate designer/PDF (highest fake-gen risk) | static preview only; smoke `noCanvas`/`noDrag`/`noPdf`; every action a gate |
| Integration credentials | locked-placeholder cards; smoke `noSecret` (no `type=password`/api-key/webhook) |
| Backup/import files + `password:123456` template | excluded/gate; smoke `noFile`/`noBackup` |
| Staff `password`+`salary` fields | omitted; smoke `noSecret`+`figureFree` |
| RBAC 170-checkbox engine | display-only matrix + Save gate; no-mutation snapshot |
| Count creep | 103 fixed; 3 pages justified by page-candidate test; settings folds 0-delta |
| Role-law regression | 031 touches admin surfaces only; protected regexes byte-verbatim; non-031 pages byte-identical |
| nav.config change | 3 justified flips; build guard enforces implemented⇒route |

## Phase outputs
- **Phase 0** → `research.md` (D1–D48 resolved).
- **Phase 1** → `data-model.md` (entities/fixtures), `contracts/` (23), `quickstart.md` (build/verify recipe), CLAUDE.md pointer.
- **Phase 2 (tasks)** → NOT generated by this command (`/speckit.tasks` next).

## Progress
- [x] Preflight green (Spec 030 committed, count 97, build 97, smoke PASS)
- [x] Count decision fixed (103) + per-page justification
- [x] Constitution check (no violation)
- [x] Phase 0 research (D1–D48)
- [x] Phase 1 data-model + contracts + quickstart
- [ ] Phase 2 tasks (next command)
