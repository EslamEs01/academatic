# Messages / Leads / Tasks / Announcements — Detailed Scope — Spec 034

The four write-pages, with grounded field/column/status/action lists. Every field flagged **[GATE]** stays a `data-disabled-reason` affordance (no control); **[OMIT]** is never rendered; all others are inert authored fields. Every final Save/Send/Convert/Publish is a `backendRequired` gate.

## messages.html (from `management-chat`)
**Contact list (display):** name · role chip (e.g. Manager) · unread chip (`N New`) · group tag · relative day.
**Thread (display):** authored message bubbles (sender · text · time) + empty state ("Open chat from the list").
**Compose:** `message` (textarea) → **Send/Reply = gate**.
**Create-Group form drawer** (grounded): `name` (text) · `bio` (text) · **`image` [GATE — no type=file]** · `staff` (select/multi) · `teachers` (select/multi) · `students` (select/multi) → **Save = gate**.
**Add-Member form drawer**: `staff`/`teachers`/`students` (multi-selects) → **Save = gate**.
**Actions:** view (read) · search (read) · Send/Reply/Create-Group/Add-Member/Leave/Delete-Group → **gates/confirm** (no mutation).
**No entity:** no thread/message/read-state persisted. **[OMIT]** none beyond the file upload gate.

## leads.html (from `management-new-requests` + `-create`)
**KPI stat cards (authored display-only, NO arithmetic):** Converted · Not Converted · Pending Actions · Completed Trials · Cancelled Trials · New Families This Month (authored literals — grounded labels, no computed metric).
**Lead list table columns:** `#` · Date · Parent name · E-mail · Phone number · Status · Actions.
**Status chips / filters (9):** Duplicated · Pending · Contacted · No-response · Qualified · Scheduled · Trial-Taken · Trial-Missed · Teacher (a real `data-filter` narrowing the list).
**Lead-detail drawer:** notes log table (`#`/Date/Users/All Notes) + linked students (Name/Age) + **Add-Notes form** (`note` textarea → Save gate) + **Change-Status form** (`status` select, 9 options → Update gate).
**Create-Request form drawer** (2 sections, grounded): first_name · last_name · email · phone · friends_number · classes_Duration · hear_from · classes_count · gender (select) · age · parent_age · language · timezone · trial_date · trial_time · coupone_code (text — a code, not a price) · country (select) · course_name · note (textarea) → **Submit = gate**.
**Actions:** filter/search (read) · Show-Details (read) · Create/Add-Notes/Change-Status/Convert/Assign → **gates** (no row/status mutation, no CRM persistence).
**[OMIT]:** no money/price field (courses by name); no computed KPI arithmetic. **No fake conversion.**

## tasks.html (from `management-tickets`; board/create = authored, evidence gap noted)
**KPI strip (authored display-only):** Total · Completed · Pending · In-progress · Overdue.
**Task board/list:** columns by status (Pending/In-progress/Completed/Overdue); cards show title · assignee · priority chip · due-date chip · status chip. **Display-only — no working drag/move.**
**Per-staff table columns:** Name · Total · Pending · Overdue · Completed · Average (authored literal — **NOT computed**).
**Create/Edit-task form drawer** (authored safe fields grounded in the columns): title (text) · description (textarea) · assignee (select) · status (select) · priority (select) · due-date (text) · section (select) → **Save = gate**.
**Add-Section:** name (text) → **gate**.
**Actions:** filter (read) · Create/Edit/Assign/Move/Add-Section → **gates** (no persistence, no fake move/status flip).
**[OMIT]:** computed "Average"/counts rendered as authored literals only.

## announcements.html (from `management-public-advertisement`; NOT the settings Notifications form)
**Announcements list (display):** message · audience chip · channel chip (Dashboard/WhatsApp) · status chip · expire date.
**Compose form:** `message` (textarea) · channel toggles `type[]` (Advertisement / WhatsApp) · `private` (checkbox) · `expire_at` (date text) · `category_selected` (audience multi-select, teachers) · `student_category_selected` (audience multi-select, students) · `country`/`hours`/`language` (selects) · **`media` [GATE — no type=file]**.
**Preview card:** client-side render of the composed announcement (display-only).
**Recipient display:** Teachers / Students lists (authored, Select-All display) + quota (Maximum limit/messages = authored display-only).
**Actions:** compose/preview (read) · Publish/Send · WhatsApp send · media attach → **gates** (no delivery, no fake published).
**Boundary:** the System-Notification *settings* (channel matrix, 46 fields) stay in `settings.html` (Spec 031/040) — announcements.html does **not** duplicate them.
**[OMIT/GATE]:** `media` file upload = gate; WhatsApp/channel delivery = gate; no fake success.

## Cross-page rules
- All lists/boards/threads are **authored fixtures** (display-only); no row/card/message is added or mutated by any action.
- Every create/edit/compose surface renders **≥1 visible field** before its gate (the Spec-032 form-completion rule) — no field-less "backendRequired-only" modal.
- Every final action = `data-disabled-reason` (or `data-confirm` → backendRequired). **0** fake send/convert/save/move/publish/delivery; **0** fake-success wording.
- **0** `type=file`/`type=password`/credential control; **0** money/price figure; **0** computed Total; **0** `<canvas>`/`.pdf`/`window.open`/`blob:`.
