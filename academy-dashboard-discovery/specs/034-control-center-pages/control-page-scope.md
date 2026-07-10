# Control Page Scope — Spec 034

Per-page scope: main sections · allowed actions · final gated actions · forbidden behavior · test coverage. All pages use the existing primitives (pageHeader/summaryCards/cardGrid/filterBar/chip/previewTemplate+formDrawer/confirmAction/field/optsFrom) — no new component/CSS framework.

## messages.html
- **Main sections**: contact/conversation list (name · role chip · unread chip · last-time) · thread preview (authored message bubbles + empty state) · compose/reply box · search/filter · Create-Group + Add-Member form drawers.
- **Allowed actions (read/UI)**: select conversation (show baked thread), filter/search contacts, open Create-Group/Add-Member drawers.
- **Final gated actions**: Send/Reply (compose) → backendRequired; Create-Group Save → gate; Add-Member Save → gate; group image upload → gate.
- **Forbidden**: fake sent, thread/read-state mutation, `type=file` (image = gate), websocket/realtime, backend/API.
- **Coverage**: smoke (page loads AR+EN, compose Send gate, no-mutation, noFile, no fake wording); a11y (open-compose row); screenshots (desktop AR/EN + dark + mobile + open compose + Create-Group drawer).

## leads.html
- **Main sections**: authored KPI stat cards (display-only) · lead list table (`#`/Date/Parent/Email/Phone/Status/Actions) · status/source filters (9 statuses) + search · lead-detail drawer (notes log + Add-Notes form + Change-Status form) · Create-Request form drawer.
- **Allowed actions**: filter by status/source, search, open lead-detail drawer, open Create-Request drawer, page through the list (client-side).
- **Final gated actions**: Create-Request Submit → gate; Add-Notes Save → gate; Change-Status Update → gate; Convert/Assign → gate.
- **Forbidden**: fake conversion/assignment/CRM persistence, row/status mutation, computed KPI arithmetic (KPIs are literals), money/price figure.
- **Coverage**: smoke (loads AR+EN, 9-status filter narrows list, detail drawer forms, Create gate, no-mutation, no money figure); a11y (open Create-Request row); screenshots (list + filters + detail drawer + Create drawer, AR/EN/dark/mobile).

## tasks.html
- **Main sections**: KPI strip (Total/Completed/Pending/In-progress/Overdue — authored) · task board/list (columns by status, display-only cards) · per-staff summary table (Name/Total/Pending/Overdue/Completed/Average — authored) · filters · Create/Edit-task form drawer · Add-Section.
- **Allowed actions**: filter tasks, open Create/Edit-task drawer, view cards/columns (static).
- **Final gated actions**: Create/Edit-task Save → gate; Assign → gate; Move (status change) → gate/absent (no working drag); Add-Section → gate.
- **Forbidden**: fake task persistence, drag-to-move status mutation, fake assignment, computed "Average" (authored literal), backend/API.
- **Coverage**: smoke (loads AR+EN, board renders, create form gate, no-mutation, no computed metric); a11y (open Create-task row); screenshots (board + per-staff table + create drawer, AR/EN/dark/mobile).

## announcements.html
- **Main sections**: announcements list (message · audience chip · channel chip · status chip · expire) · compose form (message textarea · channel toggles [dashboard/WhatsApp/private] · expire date · audience category multi-selects · language/country/hours selects) · preview card · recipient display (Teachers/Students authored).
- **Allowed actions**: open/fill the compose form, pick audience categories, preview (client-side render of the composed card).
- **Final gated actions**: Publish/Send → backendRequired; WhatsApp/channel delivery → gate; media attachment → gate.
- **Forbidden**: fake publish/notification delivery, `type=file` (media = gate), fake success wording, duplicate of the settings Notifications form, backend/API.
- **Coverage**: smoke (loads AR+EN, compose renders, Publish gate, media gate/noFile, no fake published); a11y (compose form row); screenshots (list + compose + preview, AR/EN/dark/mobile).

## time-converter.html
- **Main sections**: converter panel (source timezone select · target timezone select · date input · time input · live converted output) · common-academy-timezones quick view (authored city→zone chips) · authored DST "Changes" display board (zone/offset/next-change).
- **Allowed actions (REAL, no gate)**: select source/target zone, enter date/time → **live conversion computed with native `Intl.DateTimeFormat({timeZone})`**; add/remove a compared zone (client-side); optional client-side copy of the result if a safe pattern exists.
- **Final gated actions**: **none** — the conversion works; the DST board is display-only.
- **Forbidden**: backend/API, external API, new dependency (no moment.js — native `Intl` only), fake "unavailable" gate over a working tool, `type=file`.
- **Coverage**: smoke (loads AR+EN, conversion output present + updates, no external request, no gate on conversion); a11y (converter controls labelled); screenshots (converter + quick view + changes board, AR/EN/dark/mobile).

## Shared
- Every page: page-header + honest empty states; AR RTL + EN LTR; light/dark/system; mobile-390 no overflow; 0 `href="#"`; 0 raw keys; authored fixtures only.
- Interactivity: reuse existing hooks (data-drawer/data-confirm/data-disabled-reason/data-tab/data-filter). **timeConverter** adds a page-scoped init (native Intl) — not a new global `data-*` dispatch (see `time-converter-scope.md`).
