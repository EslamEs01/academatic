# Feature Specification: Control Center Pages Completion / Messages / Leads / Tasks / Announcements / Time Converter

**Feature Branch**: `feature/012-role-portal-foundation` (authored in place per repo convention — specs 021–033 share this branch)
**Spec**: 034 · **Created**: 2026-07-10 · **Status**: Draft (specification only — NOT implementation)
**Baseline**: Spec 033 authored (strategy spec, in working tree); Spec 032 committed (HEAD `a438ac2`, public HTML **103**)
**Input**: "Control Center Pages Completion — replace the five Control «قريبًا» items (messages, leads, tasks, announcements, timeConverter) with real frontend pages; final backend actions gated; timeConverter fully client-side."

## Overview

Spec 033 classified the Admin sidebar and set the roadmap; Spec 034 owns the **Control category gaps** — the five items that still show «قريبًا»: **المحادثات (messages), الطلبات الجديدة (leads), المهام (tasks), الإعلانات والإشعارات (announcements), محول الوقت (timeConverter)**. Spec 034 replaces those coming-soon buttons with **five real standalone frontend pages** (AR + EN each), flipping the nav items `planned → implemented`. **Count 103 → 113 (+10).**

**The frontend rule (Spec-032/033 principle):** every Control item opens a real frontend surface first; only the final backend action (Send/Reply/Convert/Assign/Save/Move/Publish) is a `backendRequired` gate. No item stays «قريبًا»; none is replaced by a toast-only; no fake backend behavior. **timeConverter is the exception** — it is a pure client-side tool that computes real conversions locally (native `Intl`), with **no gate**.

**Grounding:** capability-coverage from the legacy academy, not a pixel clone. Each page's scope is grounded in the exact legacy evidence (`management-chat`, `management-new-requests`(+create), `management-tickets`, `management-public-advertisement`(+`management-settings-notification`), `management-time-convertor`) + the combined form/table/button/modal inventories — see `visual-grounding.md` and `legacy-control-center-coverage.md`. This is a **specification** spec: no implementation, no plan/tasks, no commit/push.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin opens Messages and sees a real inbox/thread/compose shell (Priority: P1)

The admin clicks المحادثات and lands on `messages.html`: a contact/conversation list on one side, the selected thread on the other, status/unread chips, a search/filter, and a compose/reply box. Composing and pressing Send opens an honest "needs the server" gate — nothing is sent, no thread mutates.

**Why this priority**: Messages is the most-requested Control gap and proves the inbox/thread + gated-compose pattern the other write-pages reuse.

**Independent Test**: Load `messages.html` (AR+EN); confirm inbox+thread+compose render, Send is a `backendRequired` gate, no «قريبًا», no fake "sent".

**Acceptance Scenarios**:
1. **Given** messages.html, **When** the admin views it, **Then** a contact list + a thread preview + a compose/reply field render with status/unread chips.
2. **Given** the compose box, **When** Send/Reply is clicked, **Then** a `backendRequired` gate fires and no message is appended, no read-state flips.
3. **Given** a Create-Group / Add-Member action, **When** opened, **Then** a real form (name/bio/members) renders with the image upload as a **gate** (no `type=file`); Save = gate.

---

### User Story 2 - Admin opens New Requests / Leads and sees a request inbox/detail/convert shell (Priority: P1)

The admin clicks الطلبات الجديدة and lands on `leads.html`: authored KPI stat cards (display-only), a lead list table with the 9 status chips + filters/search, a lead-detail drawer (notes log + Add-Notes + Change-Status forms), and a Create-Request form. Convert/Assign/Save/Update-Status are gates.

**Why this priority**: Leads is the CRM intake surface; it proves the list+detail+create pattern with display-only computed KPIs and gated writes.

**Independent Test**: Load `leads.html`; confirm KPI cards (authored), lead table + 9 status filters, detail drawer with Add-Notes/Change-Status forms, Create-Request form; all writes gated; no computed arithmetic.

**Acceptance Scenarios**:
1. **Given** leads.html, **When** viewed, **Then** authored KPI cards + a lead list (#/Date/Parent/Email/Phone/Status/Actions) + status filters render.
2. **Given** a lead row, **When** opened, **Then** a detail drawer shows the notes log + Add-Notes (note textarea) + Change-Status (9-option select) forms; Save/Update = gate.
3. **Given** Create-Request, **When** opened, **Then** the grounded 2-section form renders (name/email/phone/gender/age/language/timezone/trial/course/note …), no money field; Submit = gate.

---

### User Story 3 - Admin opens Tasks and sees a board/list/create shell (Priority: P1)

The admin clicks المهام and lands on `tasks.html`: a KPI strip (Total/Completed/Pending/In-progress/Overdue — authored), a task board/list (display-only, no drag persistence), a per-staff summary table, filters, and a Create/Edit-task form. Save/Assign/Move/Add-Section are gates.

**Why this priority**: Tasks proves the board/list + create-form pattern with display-only status columns and gated mutations.

**Independent Test**: Load `tasks.html`; confirm KPI strip + board/list + per-staff table + create-task form; Save/Move/Add-Section gated; no fake move/persist; "Average" is an authored literal (not computed).

**Acceptance Scenarios**:
1. **Given** tasks.html, **When** viewed, **Then** the KPI strip + task board/list + per-staff table render.
2. **Given** the board, **When** a card is present, **Then** it shows title/status/priority/due/assignee chips; there is no working drag-to-move (no fake status mutation).
3. **Given** Create-task / Add-Section, **When** opened, **Then** a real form renders (title/description/assignee-select/status-select/priority-select/due-date); Save = gate.

---

### User Story 4 - Admin opens Announcements and sees a list/compose/preview shell (Priority: P1)

The admin clicks الإعلانات والإشعارات and lands on `announcements.html`: an announcements list with audience/channel/status chips, a compose form (message + channel toggles + expire date + audience category selects), a preview card, and a recipient display. Publish/Send is a gate; the media attachment and WhatsApp channel are gates.

**Why this priority**: Announcements proves the compose+preview+audience pattern with gated publish/delivery and no `type=file`.

**Independent Test**: Load `announcements.html`; confirm list + compose + preview render; Publish/Send gated; media attachment is a gate (no `type=file`); WhatsApp/channel delivery gated; no fake "published".

**Acceptance Scenarios**:
1. **Given** announcements.html, **When** viewed, **Then** an announcements list + a compose form + a preview card render with audience/channel/status chips.
2. **Given** the compose form, **When** Publish/Send is clicked, **Then** a `backendRequired` gate fires; nothing is delivered; no "published"/«تم النشر».
3. **Given** the media attachment affordance, **When** present, **Then** it is a `data-disabled-reason` gate — never an `<input type="file">`.

---

### User Story 5 - Admin uses Time Converter as a real client-side tool (Priority: P1)

The admin clicks محول الوقت and lands on `time-converter.html`: pick a source and target timezone (+ date/time), and see the converted time computed live in the browser — plus a common-academy-timezones quick view and an authored DST-changes display. No gate: the conversion actually works.

**Why this priority**: timeConverter is the one fully-frontend tool; it proves a genuinely working utility with no backend dependency.

**Independent Test**: Load `time-converter.html`; change source/target/date; confirm the output updates with a correct native-`Intl` conversion; no backend gate on the conversion; no external API; no new dependency.

**Acceptance Scenarios**:
1. **Given** time-converter.html, **When** the admin selects timezones + a date/time, **Then** the converted time renders, computed locally (native `Intl`), correctly.
2. **Given** the tool, **When** used, **Then** there is no `backendRequired` gate on the conversion, no network request, no `package.json` change.
3. **Given** the DST "Changes" display, **When** viewed, **Then** it shows authored zone/offset/next-change data (display-only), never a fake live sync.

---

### User Story 6 - QA verifies the five «قريبًا» are removed and routes work AR/EN (Priority: P2)

QA confirms all five Control nav items are real implemented links (0 «قريبًا» in Control), both language mirrors exist, and the count is 113.

**Why this priority**: The nav-completion guarantee is the point of the spec.

**Independent Test**: Smoke: 5 Control items are `<a>` links; count 113; each base has `.html` + `.en.html`.

**Acceptance Scenarios**:
1. **Given** the sidebar, **When** QA inspects Control, **Then** messages/leads/tasks/announcements/timeConverter are real links, 0 «قريبًا».
2. **Given** the build, **When** counted, **Then** 113 pages; 5 new bases × 2 langs.

---

### User Story 7 - QA verifies no fake send/publish/persist behavior (Priority: P2)

QA confirms every write action is an honest gate and nothing mutates or claims success.

**Why this priority**: The no-fake laws must survive the new pages.

**Independent Test**: Smoke `FAKE` guard + no-mutation snapshot on the four write-pages; `noFile` DOM check.

**Acceptance Scenarios**:
1. **Given** any Send/Convert/Save/Publish, **When** triggered, **Then** a gate fires, no row/chip/thread mutates, no fake-success wording.
2. **Given** the four write pages, **When** scanned, **Then** 0 `type=file`, 0 credential control, 0 money figure.

---

### User Story 8 - Role-laws / no-fake laws remain green (Priority: P2)

All standing role-laws and no-fake laws (Specs 009/021–032) stay green after adding the five pages.

**Why this priority**: Frontend honesty must not regress.

**Independent Test**: Protected smoke asserts (payHit/tchPay/famPay/payFigure/child-view/finance/settings/FAKE + 026–032) stay byte-verbatim and green.

**Acceptance Scenarios**:
1. **Given** the new pages, **When** the smoke suite runs, **Then** the protected role-law/no-fake asserts are unchanged and pass.

### Edge Cases

- **timeConverter needs runtime interactivity** but the standing law is "static-HTML-first, no new global `data-*` hook." Resolution: a **page-scoped init** (mirroring the existing `initTabs`/`initWizard`/clock inits in `enhance.js` or a page module) using native `Intl` — NOT a new global delegated `data-*` dispatch, NOT a new dependency. Recorded in `time-converter-scope.md`.
- **Computed totals** (leads KPIs, tasks counts + "Average", ad quotas): render as **authored display-only literals** (Spec-009/026 pattern) — no arithmetic, no computed metric.
- **File uploads** (chat group image, announcement media): **gated affordances**, never `<input type="file">`.
- **WhatsApp / channel delivery** (announcements): a gate (real integration credentials owned by Spec 040) — no fake send.
- **Notification settings** already live in `settings.html` (Spec 031 Notifications tab): announcements.html hosts the **Public-Advertisement compose + list**, NOT a duplicate settings form.
- **Weak legacy evidence for tasks** (board/create JS-driven, not captured): fields are authored as clearly-labeled safe demo fields grounded in the captured KPI/table columns; recorded as an evidence gap.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Spec 034 MUST complete targeted visual grounding for all five pages (recorded in `visual-grounding.md` + `legacy-control-center-coverage.md`) before defining scope.
- **FR-002**: Spec 034 MUST specify **5 standalone page pairs** — `messages`, `leads`, `tasks`, `announcements`, `time-converter` (each `.html` + `.en.html`) — folded into no existing page; **count 103 → 113**.
- **FR-003**: Spec 034 MUST flip the 5 Control nav items `planned → implemented` with real routes (`control-nav-completion-register.md`); 0 «قريبًا» left in Control; `plannedNavAnchors===0` preserved.
- **FR-004**: `messages.html` MUST render an inbox/thread/compose shell (contact list, thread preview, status/unread chips, filter/search, compose/reply); **Send/Reply = backendRequired gate**; Create-Group/Add-Member = real forms with the image upload **gated** (no `type=file`).
- **FR-005**: `leads.html` MUST render authored KPI cards (display-only, no arithmetic) + a lead list (grounded columns) + the 9 status filters + a lead-detail drawer (notes log, Add-Notes, Change-Status forms) + a Create-Request form; **Convert/Assign/Save/Update-Status = gates**; no money field.
- **FR-006**: `tasks.html` MUST render a KPI strip + a display-only board/list (no drag persistence) + a per-staff table + a Create/Edit-task form + Add-Section; **Save/Assign/Move/Add-Section = gates**; "Average" is an authored literal (not computed).
- **FR-007**: `announcements.html` MUST render an announcements list + a compose form + a preview card + a recipient display (audience/channel/status chips); **Publish/Send = gate**; media attachment and WhatsApp/channel delivery = gates (no `type=file`); it MUST NOT duplicate the settings Notifications form.
- **FR-008**: `time-converter.html` MUST be a **real working client-side tool** — source/target timezone + date/time inputs, live converted output computed with native `Intl` (no backend gate on conversion), a common-timezones quick view, and an authored DST-changes display. No external API, no new dependency, no fake "unavailable" gate.
- **FR-009**: Every write action across the four write-pages MUST be honest (`data-disabled-reason`/`data-confirm` → backendRequired); **no fake send/reply/convert/assign/create/move/publish/delivery, no row/status mutation, no fake-success wording** (`no-fake-control-actions-register.md`).
- **FR-010**: All new copy MUST be mirrored AR/EN (0 divergence, 0 raw keys); RTL/LTR correct; light/dark/system; mobile 390 no overflow; a11y critical=0 serious=0 (incl. open-compose-form rows).
- **FR-011**: Spec 034 MUST preserve every carryover law (`role-law-and-no-fake-carryover.md`); protected 009/021–032 + Spec-032 form-completion smoke asserts stay byte-verbatim; smoke changes additive.
- **FR-012**: Spec 034 MUST NOT build backend/API/auth/database/websocket, add a dependency, create any real messaging/CRM/task/notification/upload engine, touch finance/pay surfaces, or modify unrelated pages beyond the shared sidebar; and MUST NOT produce a plan/tasks or commit/push.

### Key Entities

- **Message / Conversation**: authored thread — contact name, role badge, unread count, last-message time, message bubbles. No delivery.
- **Lead / New Request**: authored request — date, parent name, email, phone, status (1 of 9), source, notes log, linked students. No conversion.
- **Task**: authored task — title, description, assignee, status (Pending/In-progress/Completed/Overdue), priority, due date, section/column. No persistence.
- **Announcement**: authored announcement — message, audience categories, channel (dashboard/WhatsApp/email), status, expire date. No delivery.
- **Timezone Conversion**: a real client-side computation — source zone, target zone, date/time → converted time (native `Intl`). No stored entity.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 5 new page pairs build; public HTML count = **113**; each new base has `.html` + `.en.html`.
- **SC-002**: 0 «قريبًا» remain in the Control category; all 5 items are real implemented links.
- **SC-003**: 100% of write actions (Send/Reply/Convert/Assign/Save/Move/Publish) are honest gates; 0 fake-success wording; 0 row/status mutation (no-mutation snapshot passes).
- **SC-004**: 0 `type=file`, 0 `type=password`/credential control, 0 money/price figure, 0 computed Total, 0 `<canvas>`/`.pdf`/`window.open`/`blob:` across the 5 new page bodies.
- **SC-005**: timeConverter produces a correct native-`Intl` conversion with no network request and no `package.json` change.
- **SC-006**: 11 locale pairs stay 0-divergence with the new keys; 0 raw keys; a11y critical=0 serious=0; screenshots 0 console errors.
- **SC-007**: Protected role-law/no-fake/026–032 smoke asserts byte-verbatim and green; teacher-portal ×16 + family + student + all other existing bodies byte-identical.

## Assumptions

- Legacy evidence grounds the field/column/status sets (chat, new-requests, tickets, public-advertisement, time-convertor); where evidence is thin (tasks board/create), fields are authored as clearly-labeled safe demo fields consistent with the captured columns.
- The existing primitives suffice: `pageHeader`/`summaryCards`/`cardGrid`/`filterBar`/`chip`/`previewTemplate`+`formDrawer` (Spec 032)/`confirmAction`/`field()`+`optsFrom` — no new component or CSS framework.
- timeConverter uses a page-scoped init (precedent: `initTabs`/`initWizard`) + native `Intl.DateTimeFormat({timeZone})` — not a new global `data-*` hook, not a dependency.
- Notification *settings* remain owned by `settings.html` (Spec 031/040); announcements.html hosts the public-advertisement compose + list only.
- The finance/pay laws are trivially satisfied (Control pages are non-finance); leads reference courses/teachers by name, never a price.
- Count and route rules are fixed by `count-and-route-contract.md`; exact field lists finalize + build-verify in the implementation phase (`/speckit.tasks` → implement), not here.
