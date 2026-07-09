---
description: "Executable task list — Spec 031 Admin Management / Content / Certificates / Settings / Materials Deep Management"
---

# Tasks: Admin Management / Content / Certificates / Settings / Materials Deep Management

**Spec**: 031 · **Branch**: `feature/012-role-portal-foundation` · **Baseline**: Spec 030 committed (HEAD `7c5ab7b`, public HTML **97**)
**Target**: **103** public HTML (+6 = staff/library/certificates × AR/EN). Settings folds 0-delta. **No implementation happens from this document until `/speckit.implement`.**

**Paths**: repo root = `/media/mekky/work/backend/dashboard-intelligence-crawler`; app root = `academy-dashboard-discovery/app` (abbreviated `app/` below).

**Locked decisions**: 3 new pages (`staff.html`, `library.html`, `certificates.html`); settings sub-domains fold into `settings.html` tabs; `materials`→`library.html` Materials tab; `certificateRequests`→`certificates.html` Requests tab; `settingsUsers`→one staff home; `nav.config.js` = exactly 3 planned→implemented flips (`staff`/`books`/`certificates`); no backend/API/auth; no new dependency/hook/storage key.

**Absolute forbidden** (every task enforces): no fake save/create/invite/reset/role-update/permission/delete/deactivate/upload/download/publish/approve/generate/preview/send/connect/notify/backup/restore/import mutation or success; no `type=file`; no `type=password`; no API-key/secret/token/webhook/credential UI; no salary/pay/payout/compensation figure; no legacy PII in fixtures; no `<canvas>`/draggable designer/FPDF/json_data; no `window.open`/`a[download]`/`blob:`/`URL.createObjectURL`; no `.pdf`/`.csv`/`.xlsx` real href; no `href="#"`; no raw keys; no dead buttons.

**Allowed outcomes only**: display-only authored row · read-only drawer · real static tab/filter · backendRequired modal · backendRequired confirm · disabled-with-reason gate · planned/future-backend gate · intentionally-excluded record · folded existing-page surface · the existing real theme/language controls.

---

## Phase 1 — Setup / Preflight

- [ ] T001 Verify baseline state: run `git rev-parse --short HEAD` (expect `7c5ab7b` or later), `git branch --show-current` (expect `feature/012-role-portal-foundation`), and `cat .specify/feature.json` (expect it points to `specs/031-admin-management-content-certificates-settings-materials`). **Gate**: if HEAD does not include the Spec-030 finance-hub commit, STOP and report.
- [ ] T002 Verify Spec 030 committed baseline + count: `find app/public -maxdepth 1 -name '*.html' | wc -l` = **97**; `git log -1 --oneline` shows the finance-hub commit; working tree clean apart from `specs/031-*` + `.specify/feature.json`. **Gate**: if count ≠ 97, STOP and report.
- [ ] T003 Run the green baseline in `app/`: `npm run build` (97 HTML, 0 missing icons), `npm run test:smoke` (PASS), `npm run test:a11y` (critical=0 serious=0). **Verify**: all three green; record the numbers. **Gate**: any failure → STOP.
- [ ] T004 Confirm no 031 app source exists yet: `app/src/js/pages/{staff,library,certificates}.js` absent; `app/src/js/fixtures/{staff-management,content-library,certificates,settings-management}.js` absent; `app/src/locales/{ar,en}.adm.js` absent; `app/src/js/pages/settings.js` byte-matches HEAD. **Verify**: `git status --short app/` shows no app changes.
- [ ] T005 Load the binding scope contracts into working context: `specs/031-.../contracts/{scope-guard,page-count,impact-protection,no-fake-settings,no-secret-credential,no-file-upload-download,certificate-pdf-gate,smoke-rescope}.md`. **Verify**: the forbidden-token grep set and the 103-count rule are internalized before any edit.
- [ ] T006 Confirm the closed `data-*` hook inventory in `app/src/js/enhance.js` (`data-tab`/`data-filter*`/`data-drawer`/`data-modal-trigger`/`data-confirm`/`data-disabled-reason`/`data-coming-soon`/`data-row-menu`) covers every planned 031 interaction. **Verify**: no new hook/storage key is required (a new `staffMenu` is a branch on the existing `data-row-menu` dispatch, not a new hook).

## Phase 2 — Foundation / Page registration (blocks all user stories)

- [ ] T007 Create the staff page module skeleton `app/src/js/pages/staff.js` exporting `renderStaff()` returning `pageHeader(...) + <directory shell>` (content added in Phase 4). **Verify**: import resolves; no `type=file`/`type=password`/salary token in the file.
- [ ] T008 Create the library page module skeleton `app/src/js/pages/library.js` exporting `renderLibrary()` returning `pageHeader(...) + tabs({group:'library', items:[materials, books]})` (panels added in Phase 5). **Verify**: uses `components/tabs.js`; two tabpanels emitted.
- [ ] T009 Create the certificates page module skeleton `app/src/js/pages/certificates.js` exporting `renderCertificates()` returning `pageHeader(...) + tabs({group:'certificates', items:[templates, requests]})` (panels added in Phase 6). **Verify**: no `<canvas>`; two tabpanels emitted.
- [ ] T010 Register the 3 new pages in `app/scripts/build-html.mjs`: import `renderStaff`/`renderLibrary`/`renderCertificates` and add exactly 3 `PAGES` entries — `{base:'staff', activeId:'staff', titleKey:'topbar.title.staff', crumbKey:'topbar.crumb.staff', render:renderStaff}`, `{base:'library', activeId:'books', titleKey:'topbar.title.library', crumbKey:'topbar.crumb.library', render:renderLibrary}`, `{base:'certificates', activeId:'certificates', titleKey:'topbar.title.certificates', crumbKey:'topbar.crumb.certificates', render:renderCertificates}`. **Verify**: no other PAGES entry changes.
- [ ] T011 Flip exactly 3 nav items in `app/src/js/nav.config.js`: `staff` planned→implemented (`route:'staff.html'`), `books` planned→implemented (`route:'library.html'`), `certificates` planned→implemented (`route:'certificates.html'`). Leave `materials`, `certificateRequests`, and all six `settings*` items `planned`. **Verify**: `git diff nav.config.js` shows only 3 status/route changes; build guard passes (implemented⇒route).
- [ ] T012 Create mirrored locale skeletons `app/src/locales/ar.adm.js` + `app/src/locales/en.adm.js` (topbar titles/crumbs for staff/library/certificates + nav labels) and register them in `app/src/js/i18n.js` (2 imports + 2 `deepMerge` calls). **Verify**: no `⟦key⟧` raw keys on the 3 new pages; AR/EN key-parity.
- [ ] T013 Run `npm run build` in `app/` and confirm the 6 new files exist (`app/public/{staff,library,certificates}.html` + `.en.html`) and the chip-tone guard passes. **Verify**: `find app/public -maxdepth 1 -name '*.html' | wc -l` = **103**.
- [ ] T014 Verify the nav build guard + no-drift: `nav.config.js` still has 6 rail categories; no settings sub-page, materials-standalone, or certificateRequests-standalone page was created; `package.json` 0-diff. **Verify**: `git diff --stat package.json` empty.

## Phase 3 — Fixtures / locale data / CSS (foundational; authored fake data only)

- [ ] T015 [P] Create `app/src/js/fixtures/staff-management.js` — `STAFF` (~5 rows: name/username/phone/email/roleId/statusId), `STAFF_ROLES`, `STAFF_STATUS`, `PERM_GROUPS` (~10-17 display groups), `STAFF_CATEGORIES`, `STAFF_ACTIVITY`. **Verify (C-34)**: no `password`/`salary`/`amount`/`pay` field; no legacy PII (authored fake names/emails/phones); chip tones ∈ {live,upcoming,completed,cancelled,amber,neutral}.
- [ ] T016 [P] Create `app/src/js/fixtures/content-library.js` — `SUBJECTS` (name/name_ar), `BOOKS` (name/type/category/publishedKey/views/downloads/status), `BOOK_TYPES`, `BOOK_STATUS`, `BOOK_CATEGORIES` (name/count). **Verify**: `views`/`downloads`/`count` are authored integer literals (not computed); no `file`/`thumbnail`/URL field; no PII.
- [ ] T017 [P] Create `app/src/js/fixtures/certificates.js` — `CERT_TEMPLATES` (name/usageCount/thumbId authored ref), `CERT_DESIGNER` (static x/y positions), `CERT_REQUESTS`, `CERT_STATUS`, `CERT_ISSUED`. **Verify (C-14)**: no `json_data`/`.pdf`/`<canvas>`/drag; `usageCount` literal; no PII.
- [ ] T018 [P] Create `app/src/js/fixtures/settings-management.js` — `IDENTITY_ROWS`, `LOCATIONS`, `EXPENSE_HEADS` (name/status), `NOTIF_MATRIX` (event×role×channel on/off), `POLICIES` (family/teacher text), `BRAND_ROWS`, `INTEGRATIONS` (name/kind/status). **Verify (C-33/C-34)**: `EXPENSE_HEADS` has **no amount**; `NOTIF_MATRIX` figure-free; `INTEGRATIONS` has no credential/`key`/`webhook`/`api`/`password` field; no legacy PII.
- [ ] T019 Populate mirrored keys in `app/src/locales/ar.adm.js` + `app/src/locales/en.adm.js` for staff/library/certificates/settings-hub copy (`adm.staff.*`, `adm.lib.*`, `adm.cert.*`, `adm.set.*` + gate reason keys). **Verify**: AR/EN key-parity (identical key sets); no fake-success wording («تم…»/"saved/done/(demo)"); reuse `common.backendRequiredNote` where possible. (Shared file — not [P].)
- [ ] T020 Add additive-only CSS in `app/src/styles/app.css` if needed (staff directory card, RBAC matrix grid, locked-placeholder integration card, static certificate-designer preview). **Verify**: only new rules appended; no rule deleted/broadly restyled; no new animation engine; reuse `.set-section`/`.tbl`/`.sheet-*`/chip classes where possible.

## Phase 4 — US1: Staff / Users (Priority P1)

**Goal**: `staff.html` is the ONE honest staff home; no real auth, no password, no salary. **Independent test**: staff loads AR/EN; directory + kebab render; every write is a modal/drawer/gate; no `type=password`, no salary figure, no chip mutation.

- [ ] T021 [US1] Build the staff directory in `app/src/js/pages/staff.js` from `STAFF` using `directory-card` + `filter-bar` (name/username/phone/email/role-chip/status-chip). **Verify (C-01)**: authored rows render; **no salary/pay figure**; a real status/role filter works.
- [ ] T022 [US1] Add a `staffMenu` branch to the existing `data-row-menu` dispatch in `app/src/js/enhance.js` (mirroring `familyMenu`/`studentMenu`/`teacherMenu`; kind `'staff'`), and wire per-row kebabs in `staff.js`. **Verify (C-01)**: one branch added, no new hook/storage key; kebab opens View/Edit/Permissions/Category/Activity/Duplicate/Delete.
- [ ] T023 [US1] Add Add-member / Edit / Duplicate as `data-modal-trigger` backendRequired modals in `app/src/js/pages/staff.js` (fields: name/username/phone/email/role-select/status-select). **Verify (C-02)**: modal renders **no `type=password` and no salary field**; note keys point to backendRequired copy.
- [ ] T024 [US1] Add the RBAC permission matrix as a display-only grouped drawer (`data-drawer` + `<template data-preview>`) from `PERM_GROUPS`, with a Save-permissions `data-disabled-reason` gate, in `app/src/js/pages/staff.js`. **Verify (C-03)**: matrix is display-only (~10-17 groups); toggling/Save mutates nothing (no persisted `checked`).
- [ ] T025 [US1] Add category-scope (read-only drawer + assign `data-disabled-reason` gate) and the activity log (read-only drawer) in `app/src/js/pages/staff.js` from `STAFF_CATEGORIES`/`STAFF_ACTIVITY`. **Verify (C-04)**: both drawers read-only; assign is a gate.
- [ ] T026 [US1] Add Delete/Deactivate/Activate as `data-confirm` controls in `app/src/js/pages/staff.js`. **Verify (C-05)**: confirm body uses backendRequired wording; no row/status chip mutates after confirm (before/after snapshot equal).
- [ ] T027 [US1] Add Reset-password and Invite as `data-disabled-reason` future-backend gates in `app/src/js/pages/staff.js`. **Verify (C-06)**: gates only; **no password field**, no invite-token field.
- [ ] T028 [US1] Establish `staff.html` as the canonical single staff home and confirm no duplicate staff directory exists elsewhere (the settings Users tab, built in Phase 7, only previews + deep-links here). **Verify (C-07)**: exactly one staff directory in the built site; `settingsUsers` nav stays `planned` (folded).

## Phase 5 — US2: Materials / Books / Library (Priority P1)

**Goal**: `library.html` = Content hub (Materials + Books tabs); display-only, no files. **Independent test**: library loads AR/EN; Materials + Books tabs render; count literals; no `type=file`, no download link.

- [ ] T029 [US2] Build the Materials tab panel in `app/src/js/pages/library.js` from `SUBJECTS` (name/name_ar rows) + Add/Edit name-only `data-modal-trigger` modal + Delete `data-confirm`. **Verify (C-08)**: subject rows render; modal is name-only; no files.
- [ ] T030 [US2] Build the Books tab panel in `app/src/js/pages/library.js` from `BOOKS` (name/type-chip/category/publishedAt/views/downloads/status) + `filter-bar` (type/category/search). **Verify (C-09)**: `views`/`downloads` are authored count literals (not computed); status/type chips use styled tones.
- [ ] T031 [US2] Add the Add-Material / Upload / thumbnail controls as `data-disabled-reason` gates in `app/src/js/pages/library.js`. **Verify (C-10)**: **no `type=file`** rendered anywhere; gates surface a backendRequired reason.
- [ ] T032 [US2] Add the library category surface as a read-only drawer (`data-drawer`) + name-only `data-modal-trigger` Add/Edit-category modal in `app/src/js/pages/library.js`. **Verify (C-11)**: category list read-only; modal name-only; no fake persistence.
- [ ] T033 [US2] Add per-row Download / Publish / Delete as `data-disabled-reason` / `data-confirm` gates in `app/src/js/pages/library.js`. **Verify (C-12)**: no `a[download]`, no `.pdf`/`.csv` href, no fake publish/delete mutation.
- [ ] T034 [US2] Build `library.html`/`.en` and verify. **Verify**: both load; Materials + Books tabs work; smoke greps `noFile`/`noPdf`/`figureFree` clean on the library bodies.

## Phase 6 — US3/US4: Certificates / Certificate Requests (Priority P1)

**Goal**: `certificates.html` = Templates(+static designer) + Requests tabs; no PDF/canvas/mutation. **Independent test**: certificates loads AR/EN; static designer has no `<canvas>`/drag; Approve = gate; no `.pdf`/`window.open`.

- [ ] T035 [US3] Build the Templates tab panel in `app/src/js/pages/certificates.js` from `CERT_TEMPLATES` (name/thumb/usageCount) + Create/Edit `data-modal-trigger` modal + Delete `data-confirm`. **Verify (C-13)**: template rows render; usageCount literal.
- [ ] T036 [US3] Build the static certificate designer preview in `app/src/js/pages/certificates.js` from `CERT_DESIGNER` (CSS-positioned label divs over a background-image div). **Verify (C-14)**: **no `<canvas>`, no `ui-draggable`/`.draggable()`, no `json_data`/FPDF, no background upload**; positions are baked static values.
- [ ] T037 [US3] Ensure template Create/Edit/Save are backendRequired modals/gates in `app/src/js/pages/certificates.js`. **Verify**: Save = gate; no fake persistence.
- [ ] T038 [US4] Build the Requests tab panel in `app/src/js/pages/certificates.js` from `CERT_REQUESTS` (student/course/teacher/desc/date/status). **Verify (C-17)**: `certificateRequests` folds here as the Requests tab; `certificateRequests` nav stays `planned`.
- [ ] T039 [US4] Add Approve/Reject as `data-confirm`/`data-disabled-reason` gates in `app/src/js/pages/certificates.js`. **Verify (C-15)**: no status mutation after Approve/Reject; no WhatsApp/email send; backendRequired wording.
- [ ] T040 [US4] Add Generate-PDF / Preview / Download / Send + Create-certificate / Upload-certificate as `data-disabled-reason` gates in `app/src/js/pages/certificates.js`. **Verify (C-16)**: no `.pdf` href, no `window.open`, no `blob:`, no `type=file`.
- [ ] T041 [US3/US4] Build `certificates.html`/`.en` and verify. **Verify**: both load; Templates + Requests tabs work; smoke greps `noCanvas`/`noDrag`/`noPdf` + no-mutation clean.

## Phase 7 — US5/US6: Settings hub (Priority P1)

**Goal**: fold the six settings sub-domains into `settings.html` (0-delta); preserve real theme/lang. **Independent test**: settings renders 6 tabs, 1 visible; theme/lang functional; every Save = gate; no secret/file/figure.

- [ ] T042 [US5] Wrap `renderSettings()` panels in `tabs({group:'settings', items:[general, notifications, customization, security, users, integrations]})` in `app/src/js/pages/settings.js`, moving the existing sections into panels and **preserving the real theme/lang controls**. **Verify (C-18)**: 6 tabs render, 1 visible; theme/lang still functional; `settings` stays the only implemented settings route; **0 page-count delta**.
- [ ] T043 [US5] Build the General panel (identity rows + course-automation display toggles) in `app/src/js/pages/settings.js` from `IDENTITY_ROWS`; add Save + logo `data-disabled-reason` gates. **Verify (C-19/C-20)**: **pay-rate/salary fields omitted** (at most a non-numeric "managed in Finance" pointer); logo gate has **no `type=file`**.
- [ ] T044 [US5] Add the Locations display slice (country/city/timezone/address) inside the General panel from `LOCATIONS` in `app/src/js/pages/settings.js`. **Verify (C-21)**: display slice only; no dedicated Locations page; no fake persistence.
- [ ] T045 [US5] Add the expense-heads lookup (name/status rows + name-status Add/Edit modal + Delete gate) inside the General panel from `EXPENSE_HEADS`. **Verify (C-33)**: **no amount/figure**; figure-free lookup.
- [ ] T046 [US6] Build the Customization panel in `app/src/js/pages/settings.js`: keep theme/lang REAL; add brand/status color display rows from `BRAND_ROWS` + Save gate. **Verify (C-23)**: theme/lang functional; color save = gate; no fake persistence.
- [ ] T047 [US6] Build the Notifications panel from `NOTIF_MATRIX` (grouped event×role×channel toggles) + Save gate in `app/src/js/pages/settings.js`. **Verify (C-24)**: figure-free (the `salaries` notify-channel row shows no amount); toggles authored-state only; Save = gate.
- [ ] T048 [US6] Build the Security panel: 2FA `data-disabled-reason` gate (extend existing `#set-account`) + Family/Teacher policy display-only text (from `POLICIES`) + edit gate in `app/src/js/pages/settings.js`. **Verify (C-25/C-26)**: 2FA = gate; policies display-only (**no `contenteditable`/rich-text editor**).
- [ ] T049 [US6] Build the Users panel: the existing RBAC preview (`rolesSection`) as a compact summary + a real deep-link to `staff.html` in `app/src/js/pages/settings.js`. **Verify (C-07)**: one staff home; the Users tab does not duplicate the directory.
- [ ] T050 [US6] Build the Integrations panel from `INTEGRATIONS` as locked-placeholder cards (provider name + status chip) + Connect/Test/Configure `data-disabled-reason` future-backend gates; the WhatsApp card shows authored status only in `app/src/js/pages/settings.js`. **Verify (C-28/C-31)**: cards show name+status only; **no phone input, no pairing wizard, no real PII, no credential input**.
- [ ] T051 [US5/US6] Build `settings.html`/`.en` and verify the hub. **Verify**: both load; 6 tabs; theme/lang real; smoke greps `noSecret`/`noFile`/`figureFree` clean; only `settings.html`/`.en` changed among existing HTML.

## Phase 8 — US7: Upload / download / PDF / integration / backup gates (Priority P2)

**Goal**: every credential/file/PDF/backup surface is a gate. **Independent test**: 0 `type=file`/`type=password`/secret across all 031 bodies.

- [ ] T052 [US7] Represent Message-Builder as a generic future-backend gate in `app/src/js/pages/settings.js` (Customization panel). **Verify (C-22)**: no invented fields (504, no evidence); gate only.
- [ ] T053 [US7] Represent Backup / Import as excluded/future-backend gates in `app/src/js/pages/settings.js` (Security panel). **Verify (C-27)**: **no `type=file`, no `backup_email` input, no template schema/`password:123456`**; gate only.
- [ ] T054 [US7] Confirm every integration credential/gateway/payout/SMTP action is a future-backend gate (no config surface) in `app/src/js/pages/settings.js`. **Verify (C-29/C-30/C-32)**: **no `type=password`, no api-key/client-secret/webhook/token/`smtp_password`**; payment-gateway/payout credentials stay 030-boundary future-backend.
- [ ] T055 [US7] Ensure export/download/PDF/CSV/Excel/print controls are `data-disabled-reason` gates across `app/src/js/pages/{library,certificates,settings}.js`. **Verify (C-35)**: no `a[download]`/`blob:`/`URL.createObjectURL`/`window.open`; no real file.
- [ ] T056 [US7] Rebuild and grep all 031 built bodies (`app/public/{staff,library,certificates,settings}.html` + `.en`). **Verify**: `type="file"`=0, `type="password"`=0, `api[-_ ]?key|secret|token|webhook|paymob|payoneer`=0, `.pdf|blob:|window.open|download=`=0, `<canvas`=0.

## Phase 9 — US8: Admin management menu coverage / no forgotten page (Priority P1)

- [ ] T057 [US8] Verify the 3 nav flips and folded reachability: `staff`/`books`/`certificates` implemented with routes; `materials` reachable as the library Materials tab; `certificateRequests` as the certificates Requests tab; the six `settings*` as settings tabs. **Verify**: build guard green; every non-implemented item is a non-navigating `data-coming-soon` button.
- [ ] T058 [US8] Update `specs/031-.../admin-management-menu-coverage-inventory.md` to reflect the implemented/folded end-state (implemented vs folded vs future-backend). **Verify**: 0 unclassified; matches the built nav.
- [ ] T059 [US8] Add the admin-menu coverage re-pin to `app/tests/smoke/run.cjs` (6 categories, planned-truthfulness, `deadHash`/`badTarget`=0, count=103). **Verify**: smoke coverage sweep green; no dead 031 placeholder.

## Phase 10 — US9: Future-owner / excluded rows (Priority P2)

- [ ] T060 [US9] Verify no duplication of owned-elsewhere surfaces: teacher-library (Spec 025), family cert-notification toggles (family settings), teacher CV `cv_certificates` (teacher onboarding), teacher request-certificate origin (teacher portal). **Verify (C-36…C-39)**: none rebuilt in 031; the 4 teacher-portal + family + student pages stay byte-identical.
- [ ] T061 [US9] Confirm `specs/031-.../future-owner-register.md` remains accurate (reset/invite/gateway/payout/SMTP/backup/import/message-builder → future-backend; C-40 stale-map sweep → Spec 032). **Verify**: register matches the built gates; append-only edits if needed.

## Phase 11 — Cross-cut action completion

- [ ] T062 Verify every C-01…C-40 row is resolved and every 031 action opens a page/modal/drawer/tab/filter/gate, in `app/tests/smoke/run.cjs`. **Verify**: `href="#"`=0, raw-keys=0, dead-buttons=0, `FAKE`-guard clean across the 4 built 031 surfaces.
- [ ] T063 Add no-mutation snapshots (before/after chip/`checked`/row equality) for a Save-settings, a permission toggle, a certificate Approve, and a staff Delete in `app/tests/smoke/run.cjs`. **Verify**: all four confirm nothing mutates.

## Phase 12 — Smoke / a11y / screenshots

- [ ] T064 Add the additive Spec-031 honesty block to `app/tests/smoke/run.cjs` (modeled on the finance `f30` block): tabs render (settings 6 / library 2 / certificates 2, 1 visible each); staff directory + kebab + RBAC matrix; Add/Edit no `type=password`/no salary; library Materials+Books + no `type=file`; certificates static designer (no `<canvas>`/drag) + Approve gate; integrations locked cards + `noSecret`; global `noFile`/`noPdf`/`noBackup`/`noCanvas`/`figureFree`; count=103. **Verify**: smoke PASS; **`payHit`/`tchPay`/`famPay`/`payFigure`/child-view + all 026/027/028/029/030 asserts byte-verbatim** (not in the diff).
- [ ] T065 Add a11y rows to `app/tests/a11y/run.cjs` for staff, library (Materials+Books), certificates (Templates+Requests), settings hub tabs, one modal, one drawer, dark + light, mobile 390. **Verify**: critical=0 serious=0; honest gates aria-safe.
- [ ] T066 Add Spec-031 screenshot frames to `app/tests/screenshots/capture.cjs`: staff directory + RBAC drawer, library Materials/Books + category drawer, certificates Templates + static designer + request gate, settings overview + integrations locked card + create/edit modal, mobile 390, dark. **Verify**: 0 console errors.
- [ ] T067 Update `app/screenshots/REVIEW.md` with the Spec-031 section (what became deep, no-fake/no-secret/no-file proof, role-law + impact). **Verify**: section added.
- [ ] T068 Run the full gate in `app/`: `npm run build` (103), `npm run test:smoke` (PASS), `npm run test:a11y` (0/0), `node tests/screenshots/capture.cjs` (0 errors). **Verify**: all green.

## Phase 13 — Docs / final audit

- [ ] T069 Update `app/README.md` with a Spec-031 section (settings hub fold + 3 new pages + honesty law + Django mapping notes). **Verify**: section appended; no contradiction with prior sections.
- [ ] T070 Update the `CLAUDE.md` active-feature pointer (between the SPECKIT markers) → "Spec 031 … IMPLEMENTED" **at implementation time only** (per repo convention; plan/specify left it on Spec 030). **Verify**: history preserved; Spec 030 demoted to History.
- [ ] T071 Create `specs/031-.../implementation-status.md` (tasks summary, C-row resolution, count 103, verification results, impact proof). **Verify**: mirrors the 030 implementation-status format.
- [ ] T072 Clean-code guard: grep the new/changed 031 source (incl. comments) for forbidden tokens (`type="file"`, `type="password"`, `api[-_ ]?key`, `secret`, `webhook`, `<canvas`, `draggable`, `json_data`, `FPDF`, `salary|pay|amount|ريال|SAR|جنيه|EGP`, `.reduce(`/`+=`/`Sum`). **Verify**: 0 real hits; reword any disclaimer comment that trips a grep (scope-guard convention).
- [ ] T073 Test-guard + impact/diff review: `git status --short app/public/*.html` shows only `settings`/`staff`/`library`/`certificates` (+`.en`); `git diff --stat package.json` empty; `nav.config.js` = 3 flips; `enhance.js` = one `staffMenu` branch; finance/reports/teacher-portal×16/teacher-performance/family/student/admin-ops pages byte-identical; protected regexes byte-verbatim in the smoke diff. **Verify**: all hold; count 103.
- [ ] T074 Deliver the final implementation report (count 97→103, C-01…C-40 resolution, role-laws green, impact proof) and **stop — no commit, no push** (the watcher commits). **Verify**: HEAD unchanged; working tree holds the 031 changes uncommitted.

---

## Dependencies & execution order
- **Phase 1** (T001–T006) → gates everything. **Phase 2** (T007–T014) → registration blocks all US phases. **Phase 3** (T015–T020) → fixtures/locale/CSS block the US panels.
- **US phases 4–7** are largely independent per page (`staff.js` / `library.js` / `certificates.js` / `settings.js`) but each shares `ar/en.adm.js` (sequential edits) — do not parallelize locale edits.
- **Phase 8** (gates) touches `settings.js`/`library.js`/`certificates.js` after their US phases (sequential on those files).
- **Phases 9–13** are verification/polish; run after all surfaces exist.

## Parallel execution guidance
- **Safe [P]**: T015/T016/T017/T018 (independent fixture files). Verification-only tasks may run concurrently once their inputs exist.
- **Never [P]**: `nav.config.js` (T011), `build-html.mjs` (T010), `i18n.js` (T012), `ar/en.adm.js` (T019 + all US locale edits), `settings.js` (T042–T050, T052–T055), `enhance.js` (T022), `run.cjs`/`a11y`/`capture.cjs` (T059, T062–T066), final audits (T072–T074).

## MVP / safest path
MVP = **Phase 1 → Phase 2 → Phase 3 → Phase 4 (US1 Staff)**: the highest-privilege, highest-secret-risk surface (staff directory + RBAC + no password/salary), independently testable, proving the honest-gate pattern before the remaining surfaces. Then US2 (library) → US3/4 (certificates) → US5/6 (settings hub) → US7 gates → coverage/audit.

## C-row → task map
| C | Task(s) | | C | Task(s) |
|---|---|---|---|---|
| C-01 | T021, T022 | | C-19 | T043 |
| C-02 | T023 | | C-20 | T043 |
| C-03 | T024 | | C-21 | T044 |
| C-04 | T025 | | C-22 | T052 |
| C-05 | T026 | | C-23 | T046 |
| C-06 | T027 | | C-24 | T047 |
| C-07 | T028, T049 | | C-25 | T048 |
| C-08 | T029 | | C-26 | T048 |
| C-09 | T030 | | C-27 | T053 |
| C-10 | T031 | | C-28 | T050 |
| C-11 | T032 | | C-29 | T054 |
| C-12 | T033 | | C-30 | T054 |
| C-13 | T035 | | C-31 | T050 |
| C-14 | T036 | | C-32 | T054 |
| C-15 | T039 | | C-33 | T045 |
| C-16 | T040 | | C-34 | T015–T018 |
| C-17 | T038 | | C-35 | T055 |
| C-18 | T042 | | C-36…C-39 | T060 |
| | | | C-40 | T061 |

**Total tasks: 74** · Phases: 13 · Parallelizable: 4 ([P] fixtures) · Count target: 97 → **103**.
