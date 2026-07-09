# Feature Specification: Admin Management / Content / Certificates / Settings / Materials Deep Management

**Spec number**: 031
**Feature directory**: `academy-dashboard-discovery/specs/031-admin-management-content-certificates-settings-materials/`
**Status**: SPECIFIED (specify-only — no plan, no tasks, no implementation, no commit)
**Baseline**: Spec 030 committed — HEAD `7c5ab7b` ("implement finance tabbed hub with salaries and banks management views"); working tree clean; public HTML **= 97**; `nav.config.js` `settings`→`settings.html` implemented, all 031-owned nav items `planned`.

## Overview

Specs 026–030 deliberately routed every remaining **non-finance** admin surface — staff/users/roles, materials, books/library, certificates, settings (general/integrations/customization/notifications/security/users), payment-gateway *settings*, expense-heads lookup, backup/whatsapp — to **Spec 031**. Spec 031 now owns that management / content / certificates / settings domain.

Spec 031 makes those surfaces **honest, complete, and non-dead** without pretending that any settings save, user/role/permission edit, file upload/download, certificate/PDF generation, integration connection, notification delivery, or backup/restore actually happens. It is admin management/content/settings — **NOT** real auth, **NOT** a permission engine, **NOT** PDF/file generation, **NOT** third-party integration, **NOT** backend/API/database.

This spec is **capability-coverage grounded, not a pixel clone** of the legacy academy system. Every useful legacy capability is either implemented display-only, folded into an existing page, served as a modal/drawer/gate, routed to future-backend, or intentionally excluded — with exact evidence citations in the companion artifacts.

### The binding honesty law (grounded, from the standing register)

Two things are true at once and both are load-bearing:

1. **Display is allowed.** Authored display-only rows, status chips, static tabs/filters, read-only detail drawers, `backendRequired` modals/confirms, and disabled-with-reason gates are all honest.
2. **Persistence, secrets, and files are forbidden.** No fake settings save, no fake user/role/permission mutation, no fake certificate/PDF generation, no fake material/book upload, no fake download, no fake integration connect, no fake backup/restore, no fake notification delivery, no fake delete/publish. No `type="file"`, no `type="password"`, no API-key/secret/webhook value rendered anywhere.

### The finance / pay boundary (grounded, inherited from Spec 009/016/030 — binding)

The legacy staff surfaces and settings pages carry **salary/pay figures** (staff-create `salary` field, settings "Hour Rates" / salary-period / `rate_student_absent` "% added to teacher's salary"). These are **excluded by law** from every 031 surface: no salary/payout/compensation FIGURE is ever rendered; the staff Add/Edit gate omits the salary field entirely; the settings general tab omits pay-rate rules (at most a non-numeric "managed in Finance" pointer). Expense-heads (re-deferred to 031 by `030/future-owner-register.md`) surfaces **name + status only, never an amount**. This keeps teacher pay-free, family zero-pay, and the Spec-030 finance boundary green.

### Grounding summary (Targeted Visual Grounding Gate — completed)

An 8-agent read-only audit inspected exact legacy evidence (`output/roles/admin/{pages,html,text,screenshots}`, `output/combined/*inventory.md`, `frontend-planning*/`) and current source (`nav.config.js`, `pages/settings.js`, `enhance.js`, components, `tests/smoke/run.cjs`) and the routed-to-031 registers (Specs 023/024/028/029/030). Full citations live in `visual-grounding.md` and `legacy-management-content-coverage.md`. Headlines:

- **Legacy admin menu = a 68-item sidebar**; the 031-owned subset is: `Users & Staff` (`/management/admins`), `Materials` (`/management/materials`), `List of Books` (`/management/library`), `certificate` (`/management/pdf`), `Certificate Requests` (`/management/certificate-requests`), and the Settings group `General` / `Integrations` / `Customization`(Personalisation + Message-Builder) / `Notifications` / `Security`(Policy + System-Data) / `Users & Staff`. WhatsApp, payment-gateways/payouts, and Backup are **sub-surfaces** (cards/configure pages) *inside* Integrations/Security, not separate nav items. Expense-heads and "Locations" have **no sidebar item** (reached in-page / RBAC-group-name only).
- **Staff** = directory + row-kebab (Show-activity / Edit-permissions / Category / Edit / Duplicate-with-permissions / Delete); Create/Edit form carries **`password` (type=password) and `salary`** — both excluded. RBAC = a **~170-checkbox / ~17-group permission matrix** (display-only + gate, no engine). Role is a fixed 4-value enum (Manager/Accountant/Supervisor/Support) — **no role-definition CRUD** exists in legacy. No Invite / no reset-password flow found (password set inline).
- **Materials** = bilingual `name`/`name_ar` **subject catalog** (no files) — legacy title mislabeled "Courses List". **Books/Library** = media catalog (name/type/category/published-at/views/downloads/status) + category CRUD + an **Add-Material modal with two real `type=file` inputs** (file + thumbnail) — the file controls must become gates.
- **Certificates** = Templates list + a **drag-and-drop Designer** (jQuery-UI over a background `<img>`, **confirmed NOT `<canvas>`**; backend renders real PDFs via FPDF) + a **Requests queue** whose Approve modal opens a **live `/certificate/{id}/preview` PDF** and dispatches WhatsApp. Highest fake-PDF risk in the system → designer = static preview only; Approve/Preview/Generate/Upload/Send = gates.
- **Settings** = `settings.html` **already exists** (implemented, honest gates) and is the exact analogue of `finance.html` before Spec 030 → the settings sub-domains **fold into it as `data-tab` panels** at 0 page-count cost. General(identity + course-automation, pay-rate excluded) · Customization(theme/brand/status-colors; Message-Builder = 504 in crawl → excluded) · Notifications(~47-row event×role×channel matrix, figure-free) · Security(2FA/OTP + Family/Teacher Policy documents) · Users(staff + RBAC preview) · Integrations(11 provider cards — credentials/webhooks → locked placeholders, future-backend). Backup/Import (with a `password:123456` template column) = future-backend/excluded.
- **Current app** confirms **zero new hook / zero new storage key** is needed: `data-tab`, `data-filter*`/`-set`, `data-drawer`+`<template data-preview>`, `data-modal-trigger`(+`-title-key`/`-note-key`), `data-confirm[-danger]`, `data-disabled-reason`(+`-reason-key`), `data-coming-soon`, `data-row-menu`(+kind) all dispatch in `enhance.js`. Reusable components exist for every surface (`directory-card`, `filter-bar`, `table`, `preview-drawer`, `confirm-modal`, `tabs`, `settings-section`, `report-actions`/`finance-actions` gate patterns, `page-header`, `status-chip`, `ui`). Chip tones limited to `{live,upcoming,completed,cancelled,amber,neutral}`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Admin views staff / users honestly (Priority: P1)

An admin opens the staff / users surface and sees a real directory of staff accounts (name · username · phone · email · role · status) with per-row actions, so they understand who has access — without any real auth, password, or permission mutation.

**Why this priority**: Staff/users is the highest-privilege 031 surface (self-referential RBAC) and the highest secret risk (legacy carries `password` + `salary`). Getting it honest first anchors the whole spec.

**Independent Test**: Open the staff surface; confirm a display-only directory renders; row kebab opens View (read-only drawer), Edit (backendRequired modal, **no password / no salary field**), Category-scope (read-only drawer + assign gate), Edit-permissions (display-only grouped matrix + Save gate), Duplicate (backendRequired modal), Delete/Deactivate (backendRequired confirm). No `type=password`, no salary figure, no chip mutation after any confirm.

**Acceptance Scenarios**:
1. **Given** the staff directory, **When** it renders, **Then** each row shows name/username/phone/email/role-chip/status-chip from authored fixtures and no salary/pay figure appears anywhere.
2. **Given** a staff row, **When** the admin clicks Edit or Add-member, **Then** an honest backendRequired modal opens that never renders a `type=password` or salary field.
3. **Given** the permission matrix, **When** it renders, **Then** it is a display-only grouped list (≈17 groups) with a Save gate; toggling a checkbox changes nothing and Save is a backendRequired gate.
4. **Given** Delete/Deactivate, **When** confirmed, **Then** a backendRequired confirm fires and no row/status is actually mutated.

### User Story 2 — Admin views materials / books honestly (Priority: P1)

An admin browses the subject-catalog (materials) and the book/media library with categories and status, and opens Add/Edit/Upload as honest gates — without any real file upload/download/publish.

**Why this priority**: Materials/books is the core content domain and the primary `type=file` risk.

**Independent Test**: Open materials → display-only bilingual subject rows + Add/Edit backendRequired modal (name/name_ar only). Open books/library → display-only media rows (name/type/category/published-at/views-count/downloads-count/status) + category manage modal + Add-Material/Upload/Download/Publish/Delete gates. **No `type=file`, no download link, no `.pdf`/`.csv` asset href, no fake publish.**

**Acceptance Scenarios**:
1. **Given** the materials catalog, **When** it renders, **Then** each row is a display-only bilingual subject name and Add/Edit is a backendRequired modal.
2. **Given** the books/library list, **When** it renders, **Then** rows show authored count literals (views/downloads) and status chips, with no functional download control.
3. **Given** Add-Material / Upload, **When** the admin clicks it, **Then** it is a disabled-with-reason or backendRequired gate — no `type=file` input is rendered.
4. **Given** category manage, **When** opened, **Then** it is a read-only category list + a name-only backendRequired Add/Edit modal.

### User Story 3 — Admin views certificates & certificate requests honestly (Priority: P1)

An admin sees the certificate-template list, a **static** designer preview, and the certificate-request queue, and opens Approve/Reject/Generate/Send as honest gates — without any real PDF generation, canvas, or approval mutation.

**Why this priority**: Certificates is the single highest fake-PDF-generation risk (live preview endpoint + FPDF backend + WhatsApp dispatch).

**Independent Test**: Open certificates → display-only template rows + a **static, non-draggable** designer preview (no `<canvas>`, no jQuery-UI drag, no background upload) + Create/Edit-template backendRequired modal. Open certificate-requests → display-only queue rows + Approve/Reject/Generate-PDF/Download/Send gates. No `<canvas>`, no `.pdf` href, no `window.open` preview, no fake "Success!".

**Acceptance Scenarios**:
1. **Given** the templates list, **When** it renders, **Then** rows are display-only (name/background-thumbnail/usage-count) with Edit/Delete gates.
2. **Given** the certificate designer, **When** it renders, **Then** it is a static authored-layout preview with no drag, no upload, no `<canvas>`; Save = backendRequired modal.
3. **Given** the requests queue, **When** the admin clicks Approve, **Then** a backendRequired gate/confirm fires with no PDF preview, no WhatsApp send, no status mutation.

### User Story 4 — Admin opens certificate/template generation gates honestly (Priority: P2)

An admin attempts Generate-PDF / Download / Preview / Upload-certificate and always meets an honest "available once the server is connected" gate.

**Independent Test**: Every generate/download/preview/upload control on the certificates surfaces is a `data-disabled-reason` gate; none produces or opens a file. Smoke asserts zero `.pdf`/`type=file`/`blob:`/`download` affordance in the certificate bodies.

**Acceptance Scenarios**:
1. **Given** any certificate generate/download/preview control, **When** clicked, **Then** it surfaces a backendRequired reason and produces no file.
2. **Given** Upload-certificate, **When** surfaced, **Then** it is a gate with no `type=file`.

### User Story 5 — Admin views the settings overview honestly (Priority: P1)

An admin opens Settings and finds a coherent hub covering identity, appearance/branding, notifications, security/policy, users, and integrations, where Save is always an honest gate and the real theme/language toggles keep working.

**Why this priority**: Settings is the biggest surface by breadth and the natural fold hub (settings.html already exists).

**Independent Test**: Settings renders general/customization/notifications/security/users/integrations as tabs or sections; the existing real theme/lang controls still work; every Save/Connect/Import is a backendRequired gate; no `type=password`, no `type=file`, no fake save toast, no persisted setting.

**Acceptance Scenarios**:
1. **Given** the settings hub, **When** it renders, **Then** all six settings sub-domains are reachable (folded) and the page-count is held (no new settings pages minted).
2. **Given** the appearance section, **When** the admin changes theme/language, **Then** the existing real client-side preference still applies (this is the one genuinely functional control — preserved, not faked).
3. **Given** any Save-changes button, **When** clicked, **Then** it is a backendRequired gate and no value persists.
4. **Given** the general tab, **When** it renders, **Then** it omits pay-rate/salary-% fields (finance-law) and folds the "Locations" (country/city/timezone/address) display slice.

### User Story 6 — Admin views integrations / security / notifications settings without credentials or fake persistence (Priority: P1)

An admin opens Integrations, sees provider cards (Stripe/Paypal/Mollie/Xpay/Payoneer/Paymob/Custom, Paymob/Payoneer Payout, WhatsApp, Email) as **locked placeholder** cards showing name + status only, and opens Connect/Configure/Test as future-backend gates — with **no API key, secret, webhook, password, or `type=password` field anywhere**. Notifications shows a figure-free routing matrix; Security shows 2FA state + policy documents.

**Why this priority**: This is the highest secret/credential risk in the whole spec.

**Independent Test**: Integrations cards render provider name + a status chip only; Connect/Configure/Test/Save-credentials are future-backend gates; grep of the built bodies finds **zero** `type="password"`, `api-key`, `webhook`, `secret`, `paymob`/`payoneer`/`stripe` credential inputs. Notifications matrix rows are figure-free toggles (incl. the `salaries` notify-channel row, no amount). Security shows the 2FA row as a backendRequired gate (reusing the existing `#set-account` pattern) and policy documents as display-only text.

**Acceptance Scenarios**:
1. **Given** an integration card, **When** it renders, **Then** it shows provider name + status only — no credential input and no live "Connected" state.
2. **Given** Connect / Configure / Test-connection / Save-credentials, **When** clicked, **Then** each is a future-backend gate.
3. **Given** the notifications matrix, **When** it renders, **Then** rows are authored on/off toggles with no amount and no persistence.
4. **Given** the security section, **When** it renders, **Then** 2FA is a backendRequired gate and policy documents are display-only text (no live rich-text editor).

### User Story 7 — Admin opens upload / download / save / connect / delete gates honestly (Priority: P2)

Across all 031 surfaces, every write-implying control (Save, Add, Edit, Delete, Upload, Download, Publish, Connect, Test, Import, Backup, Generate, Approve, Send) resolves to a page-link, a real static tab/filter, a backendRequired modal, a read-only drawer, or a disabled-with-reason gate — never a dead button, `href="#"`, fake submit, fake file, or fake success.

**Independent Test**: The current-action inventory classifies every 031 action into an honest class; smoke finds `href="#"`=0, raw-keys=0, dead-buttons=0, fake-success-wording=0 across the 031 surfaces.

**Acceptance Scenarios**:
1. **Given** any 031 action, **When** inventoried, **Then** it maps to exactly one honest class and none is dead/fake.
2. **Given** any confirm-write (delete/deactivate/approve), **When** confirmed, **Then** nothing mutates (no chip flip, no row change, no storage write).

### User Story 8 — Product owner verifies every 031 admin menu item has an owner/status (Priority: P1)

A product owner opens `admin-management-menu-coverage-inventory.md` and finds every 031-owned menu item (staff, materials, books, certificates, certificateRequests, settingsGeneral/Integrations/Customization/Notifications/Security/Users, + payment-gateway-settings, expense-heads, backup, whatsapp) classified with disposition, owner, page/fold/modal/gate decision, and acceptance check — zero unclassified.

**Independent Test**: The inventory lists all 031-owned items with all required fields; the current admin-menu coverage gate (Spec-010/029 nav block) stays green; `nav.config.js` remains consistent with the build guard.

**Acceptance Scenarios**:
1. **Given** the coverage inventory, **When** reviewed, **Then** no 031-owned menu item is unclassified.
2. **Given** `nav.config.js`, **When** the build runs, **Then** the implemented⇒route / non-implemented⇒no-route / disabled⇒reasonKey guard passes.

### User Story 9 — Developer sees which auth / upload / PDF / integration engines are future-backend (Priority: P2)

A developer opens `future-owner-register.md` and `no-fake-settings-register.md` and finds every out-of-scope engine (real auth/user/permission, upload/storage/download, PDF/certificate generator, integration connectors, notification delivery, backup/restore, credential handling) assigned to future-backend / 032 / intentionally-excluded, each with the honest replacement it currently uses.

**Independent Test**: Both registers enumerate the engines with owners and honest replacements; no engine is silently implied as real.

**Acceptance Scenarios**:
1. **Given** the future-owner register, **When** reviewed, **Then** each real engine has an explicit owner and reason.
2. **Given** the no-fake-settings register, **When** reviewed, **Then** each persistence/secret/upload/PDF risk has a forbidden token + honest replacement + smoke assertion.

### User Story 10 — QA finds zero fake settings / file / certificate actions (Priority: P1)

QA runs smoke/a11y/screenshots and finds zero fake settings save, zero fake user/role/permission mutation, zero fake upload/download, zero fake certificate/PDF generation, zero fake integration connect, zero credential/secret/password/API-key/webhook rendered, zero `type=file`, zero `type=password`, zero `href="#"`, zero dead links, zero raw keys, zero dead buttons.

**Independent Test**: An additive smoke block (modeled on the finance `f30` block) asserts the 031 no-secret/no-file/no-fake/figure-free/no-mutation invariants; a11y critical=0 serious=0; screenshots 0 console errors; the protected role-law regexes (`payHit`/`tchPay`/`famPay`/`payFigure`/child-view + finance no-mutation/forbidden) stay byte-verbatim.

**Acceptance Scenarios**:
1. **Given** the 031 smoke block, **When** run, **Then** every no-fake/no-secret/figure-free/no-mutation assertion passes.
2. **Given** the protected role-law regexes, **When** the smoke diff is reviewed, **Then** they are byte-verbatim unchanged.

### User Story 11 — Existing role laws from 021–030 stay green (Priority: P1)

After Spec 031, teacher portal stays pay-free, family stays zero-pay, student stays child-view, and the Spec-026/027/028/029/030 surfaces stay working and byte-identical where 031 does not touch them.

**Independent Test**: Teacher-portal ×16 + teacher-performance + family + student + reports + finance + the admin-ops/management pages are byte-identical (031 touches only its own surfaces); the protected regexes hold; the finance hub is unaffected.

**Acceptance Scenarios**:
1. **Given** the built site, **When** compared, **Then** all non-031 pages are byte-identical to the Spec-030 baseline (except shared asset hashes from added locales/CSS).
2. **Given** the role-law smoke asserts, **When** run, **Then** teacher pay-free / family zero-pay / student child-view / finance-invariant all pass.

### Edge Cases

- **Staff `password` + `salary` fields (legacy)** → the Add/Edit gate renders neither; no `type=password`, no salary figure. (`no-fake-settings-register.md` #1, #16)
- **RBAC 170-checkbox matrix** → display-only grouped list + Save gate; toggling a checkbox mutates nothing (no-mutation snapshot). No real permission engine, no `role`-definition CRUD (legacy has none).
- **Certificate designer** → jQuery-UI drag-drop in legacy (NOT canvas); rebuild is a static preview — no drag, no `<canvas>`, no background upload, no FPDF, no `/preview` window.open.
- **Certificate Approve** → live PDF preview + WhatsApp dispatch in legacy; rebuild = backendRequired gate, no file, no send, no status mutation.
- **Library Add-Material** → two legacy `type=file` inputs (file + thumbnail) → both become gates; no `type=file` rendered.
- **Integrations credentials** → key1-4 / `settings[api_key]` / `smtp_password`(type=password) / webhook / OAuth secrets → **locked placeholder cards**, never inputs; payment-gateway + payout-provider credentials → future-backend (Spec-030 boundary).
- **WhatsApp connect** → pairing wizard + "Connected" status + real PII in legacy insights → locked-placeholder status card, authored fake data only, future-backend gate; no phone input, no pairing wizard, no real PII.
- **Backup / Import** → 1-click LMS export + CSV import whose family template exposes a `password:123456` column → intentionally-excluded / future-backend gate; no `type=file`, no template schema, no `backup_email` input.
- **Message Builder** → legacy crawl returned HTTP 504; zero field evidence → intentionally-excluded / generic future-backend gate; do not invent fields.
- **Locations** → no crawled page; only an RBAC group name → fold as a display slice inside settings-general (country/city/timezone/address already there); no dedicated Locations page.
- **Expense-heads** → re-deferred to 031 by `030/future-owner-register.md` (name + status only, **no amount**); finance-adjacent but figure-free.
- **Notifications `salaries` toggle** → an on/off notify-channel row, never a figure.
- **Policy documents (Family/Teacher)** → display-only static text, no live rich-text/`contenteditable` editor; distinct from 2FA "security".
- **settingsUsers vs staff** (B-16 duplicate) → 031 names ONE staff home and aliases/folds the duplicate nav spot; no two competing staff surfaces.
- **Real PII in legacy captures** (emails/phones/names) → never reused; all 031 fixtures are clearly authored fake data.
- **Reset password / Invite** → no legacy flow exists; if surfaced at all, future-backend gate (no password field).

## Requirements *(mandatory)*

### Functional Requirements

**Grounding & inventory**
- **FR-001**: Spec 031 MUST complete the Targeted Visual Grounding Gate with exact-path citations for legacy staff/users, materials/books, certificates, settings, integrations/security/backup, and content/lookups evidence (`visual-grounding.md`, `legacy-management-content-coverage.md`).
- **FR-002**: Spec 031 MUST produce `admin-management-menu-coverage-inventory.md` classifying every 031-owned menu item (staff, materials, books, certificates, certificateRequests, settingsGeneral/Integrations/Customization/Notifications/Security/Users, payment-gateway-settings, expense-heads, backup, whatsapp) with all required fields; **zero unclassified**.
- **FR-003**: Spec 031 MUST produce `current-management-action-inventory.md` classifying every current/planned action on the 031 surfaces into an honest class; **every row resolved**, none dead/fake.
- **FR-004**: Spec 031 MUST produce `missing-action-register.md` (prefix **C-**) resolving every missing/dead/misleading/out-of-scope action or page; **no unresolved row**.

**Staff / users behavior**
- **FR-005**: Staff/user rows MUST be display-only; detail MUST open a read-only drawer.
- **FR-006**: Add/Edit staff/user MUST be a backendRequired modal that renders **no `type=password` and no salary/pay field**.
- **FR-007**: Activate/Deactivate/Delete/Reset-password/Invite MUST be backendRequired confirms/gates with no real auth/user mutation.
- **FR-008**: The RBAC permission set MUST be a display-only grouped matrix; Save MUST be a backendRequired gate; toggling MUST mutate nothing. No role-definition CRUD is created (none exists in legacy).
- **FR-009**: Category-scope MUST be a read-only drawer with an assign gate; the activity log MUST be display-only.

**Materials / books behavior**
- **FR-010**: Materials (subject) rows MUST be display-only; Add/Edit MUST be a backendRequired modal (name/name_ar only).
- **FR-011**: Book/library rows MUST be display-only (name/type/category/published-at/views/downloads/status; counts are authored literals, not computed); category manage MUST be a read-only list + name-only backendRequired modal.
- **FR-012**: Upload/Download/Delete/Publish MUST be backendRequired gates; **no `type=file`**, no real download link, no `.pdf`/`.csv`/`.xlsx`/`blob:` asset, no fake publish.

**Certificates behavior**
- **FR-013**: Certificate list/request rows MUST be display-only; certificate detail MUST open a read-only drawer.
- **FR-014**: The certificate designer/template MUST be a **static display-only preview** — no drag, no `<canvas>`, no background upload, no live positioning.
- **FR-015**: Create/Edit template MUST be a backendRequired modal; Approve/Reject/Generate-PDF/Download/Preview/Send/Upload MUST be backendRequired gates with **no real PDF, no `window.open` preview, no WhatsApp send, no approval mutation**.

**Settings behavior**
- **FR-016**: Settings sub-domains (general/customization/notifications/security/users/integrations) MUST fold into the existing `settings.html` as static tabs/sections; the existing real theme/language controls MUST be preserved (the one genuinely functional control).
- **FR-017**: Save-settings MUST be a backendRequired gate; toggles MAY show authored current state only and MUST NOT persist.
- **FR-018**: The general tab MUST omit pay-rate/salary-% fields (finance-law) and MUST fold the Locations display slice (country/city/timezone/address); no dedicated Locations page.
- **FR-019**: Security MUST show 2FA as a backendRequired gate (reusing the existing `#set-account` pattern) and policy documents as display-only text; **no live rich-text editor, no `contenteditable`**; no real security/2FA mutation, no backup/restore.

**Integrations behavior**
- **FR-020**: Integration provider cards MUST be display-only/locked-placeholder (provider name + status only); Connect/Disconnect/Test-connection/Save-credentials MUST be future-backend gates.
- **FR-021**: Spec 031 MUST NOT render any real API key, secret, webhook, token, or `type="password"`; if credential parity is required, a locked placeholder card MUST be used instead of an input.
- **FR-022**: Payment-gateway and payout-provider credentials MUST be 031/future-backend owner-routed only, with no credentials and no config surface (Spec-030 boundary respected).

**Export / print / file behavior**
- **FR-023**: Every Export/Print/PDF/CSV/Excel/Download/Backup/Import control MUST be a backendRequired/planned gate; no fake file, no fake print, no silent no-op, no generated certificate/report/document.

**Menu coverage, scope registers, entities**
- **FR-024**: `nav.config.js` MUST stay consistent with the build guard; folded items stay `planned` (no route) or are promoted `implemented`+route only if planning mints a real page; the admin-menu coverage gate stays green.
- **FR-025**: Spec 031 MUST produce `management-entity-scope.md`, `settings-and-integration-scope.md`, `certificate-and-file-scope.md`, `modal-and-page-scope.md`, `future-owner-register.md`, and `no-fake-settings-register.md`.

**Honesty & role-law preservation**
- **FR-026**: No 031 write MUST fake persistence, success, deletion, publish, connection, generation, or delivery; all fake-success wording is forbidden (reuse the existing `FAKE` guard).
- **FR-027**: No dead UI: `href="#"`=0, raw-keys=0, dead-buttons=0 on all 031 surfaces; every planned nav item stays a non-navigating button.
- **FR-028**: Spec 031 MUST NOT create a real backend/API/auth/database, a real user/password/permission engine, an upload/storage/download engine, a certificate/PDF generator, an integration connector, a notification-delivery engine, or a backup/restore engine.
- **FR-029**: Spec 031 MUST NOT weaken the protected role-law smoke regexes (`payHit`, `tchPay`, `famPay`, `payFigure`, child-view, finance no-mutation/`forbidden`); they stay byte-verbatim.
- **FR-030**: No salary/payout/compensation figure MUST appear on any 031 surface; teacher pay-free, family zero-pay, student child-view, and the Spec-030 finance invariant MUST stay green; Spec-026/027/028/029 surfaces MUST stay working.
- **FR-031**: Spec 031 MUST NOT add a new `data-*` hook, a new storage key, a new engine, or a new dependency; it reuses the closed hook set.
- **FR-032**: Public HTML count policy MUST be defined in planning (default: fold-first / hold 97); any new page MUST pass the page-candidate test and be build-verified; no accidental removals, no unrelated additions.

### Key Entities *(display-only; no persistence, no auth, no files, no pay figures)*

- **StaffMember / AdminUser** — id, name, username, phone, email, role (enum), status. **No password, no salary.**
- **Role** — fixed enum (Manager/Accountant/Supervisor/Support); display-only label, no definition CRUD.
- **PermissionGroup / Permission** — ~17 groups / ~170 items; display-only matrix, Save gate.
- **CategoryScope** — student/teacher category visibility (read-only drawer).
- **ActivityLogEntry** — read-only audit row (entity/action/date).
- **Material (Subject)** — name, name_ar.
- **Book / LibraryItem** — name, type, category, publishedAt, views (count literal), downloads (count literal), status. **No file.**
- **LibraryCategory** — name, type.
- **CertificateTemplate** — name, background-thumbnail, usageCount; static preview only.
- **CertificateRequest** — student, course, teacher, description, date, status.
- **IssuedCertificate** — display-only list; non-actionable Options.
- **SettingCard / SettingRow / SettingToggle** — authored value/state; Save gate; no persistence.
- **IntegrationCard** — provider name, status; locked placeholder, no credentials.
- **NotificationRule** — event × role × channel; figure-free toggle.
- **PolicyDocument** — family/teacher policy text; display-only.
- **ExpenseHead** — name, status. **No amount.**
- **LocationSlice** — country/city/timezone/address; display slice in settings-general.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of 031-owned admin menu items are classified in `admin-management-menu-coverage-inventory.md` (0 unclassified).
- **SC-002**: 100% of current/planned 031 actions are resolved in `current-management-action-inventory.md` and `missing-action-register.md` (0 dead/fake/unresolved).
- **SC-003**: 0 `type="password"`, 0 `type="file"`, 0 API-key/secret/webhook value, 0 `.pdf`/`.csv`/`.xlsx`/`blob:` asset, and 0 `<canvas>` rendered on any 031 surface (built-body grep).
- **SC-004**: 0 salary/payout/compensation figures on any 031 surface; teacher pay-free / family zero-pay / student child-view / finance-invariant all green.
- **SC-005**: 0 fake settings save, 0 fake user/role/permission mutation, 0 fake upload/download/publish, 0 fake certificate/PDF generation, 0 fake integration connect, 0 fake notification delivery, 0 fake backup/restore (smoke).
- **SC-006**: `href="#"`=0, raw-keys=0, dead-buttons=0 on all 031 surfaces; a11y critical=0 serious=0; screenshots 0 console errors.
- **SC-007**: The protected role-law regexes (`payHit`/`tchPay`/`famPay`/`payFigure`/child-view/finance-no-mutation/finance-forbidden) are byte-verbatim in the smoke diff.
- **SC-008**: Public HTML count matches the planning-fixed target exactly (default fold-first / 97); `nav.config.js` build guard green; admin-menu coverage gate green.
- **SC-009**: All non-031 pages are byte-identical to the Spec-030 baseline except shared-asset hashes; no new hook/storage key/engine/dependency.
- **SC-010**: Every out-of-scope real engine (auth/user/permission, upload/storage/download, PDF/certificate, integration connector, notification delivery, backup/restore, credential handling) has an owner in `future-owner-register.md`.

## Assumptions

- The baseline is Spec 030 committed (HEAD `7c5ab7b`, count 97, clean tree). If count ≠ 97 at plan/implement time, stop and report.
- `settings.html` remains the fold hub (the finance.html analogue); folding settings sub-domains as `data-tab` panels holds count at 0-delta, mirroring Spec 030.
- The closed `data-*` hook set and existing components suffice for every 031 surface; no new hook/storage key/engine is needed.
- Personas/fixtures are authored fake data (never the real PII found in legacy captures).
- Role is a fixed enum (no role-definition CRUD) and no Invite/reset-password flow exists in legacy; anything auth-adjacent is future-backend.
- Message-Builder has no usable legacy evidence (504) and is excluded/gated without invented fields.
- Expense-heads is owned by 031 (per the most-recent `030/future-owner-register.md`) as a figure-free name/status lookup; the earlier Spec-016 finance placement is superseded.
- The exact page count and the fold-vs-new-page decisions are finalized in `/speckit.plan` with a build-verified target.

## Out of Scope (routed or excluded)

- **future-backend**: real auth/user/permission engine · real upload/storage/download engine · real PDF/certificate generator · real integration connectors (payment gateways, payout providers, WhatsApp, Email/SMTP) · real notification delivery · real backup/restore · real credential handling · reset-password/invite. (See `future-owner-register.md`.)
- **intentionally-excluded**: certificate `<canvas>`/drag designer engine · Message-Builder fields (504, no evidence) · Import-Data template schema (`password:123456` column) · real PII from legacy captures · `type=password`/`type=file` controls · any salary/payout/compensation figure.
- **Spec-030 (finance) boundary**: payment-gateway/payout credentials are figure-free and credential-free here; finance figures stay in finance.html.
- **Spec-032 (final QA)**: any residual stale-map / final coverage sweep.
- **Owned elsewhere / not duplicated**: teacher-library (Spec 025) · family/teacher/student portal surfaces · family cert-notification toggles (family settings) · teacher CV `cv_certificates` (teacher onboarding).
