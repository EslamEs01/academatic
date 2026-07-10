# Visual Grounding — Spec 034

Targeted Visual Grounding skill run before authoring Spec-034 scope. Evidence inspected directly (6-file legacy deep-read + inventories + current app + Spec-033 artifacts).

## Legacy evidence inspected (capability coverage, not pixel clone)
- `output/roles/admin/pages/management-chat.md` — **messages**: inbox+thread messenger; contact list (name/role-badge/unread); Create-Group form (`name`, `bio`, **`image` type=file**, `staff[]`, `teachers[]`, `students[]`); Add-Member form; message composer (send = JS/AJAX, unnamed submit). Modals: Group Settings, Create Group, Add Member.
- `output/roles/admin/pages/management-new-requests.md` + `management-new-requests-create.md` — **leads**: index = KPI stat cards (Converted/Not-Converted/Avg-Scheduling-Time/Growth… = computed totals) + `date_range` filter; filter/detail pages = lead table (`#`/`Date`/`Parent name`/`E-mail`/`Phone number`/`Status`/`Actions`) + students subtable (`Name`/`Age`) + notes log (`#`/`Date`/`Users`/`All Notes`) + scheduled-trials table; 9-status set (duplicated/pending/contacting/no_response/qualified/scheduled/trial_taken/trial_missed/teacher); Create form (main+additional, ~19 fields incl. first_name/last_name/email/phone/friends_number/classes_Duration/hear_from/classes_count/gender/age/parent_age/language/timezone/trial_date/trial_time/coupone_code/country_id[req]/course_name/note); Add-Notes (`note` textarea) + Change-Status (`status` select, 9 opts) modals.
- `output/roles/admin/pages/management-tickets.md` — **tasks**: KPI cards (Total/Completed/Pending/Inprogres/Overdue) + per-staff table (`Name`/`Total`/`Pending`/`Overdue`/`Completed`/`Average`) + "Add Section"; board/create JS-driven (**not captured — evidence gap**).
- `output/roles/admin/pages/management-public-advertisement.md` — **announcements**: compose form (`type[]`=Advertisement/WhatsApp checkboxes, `private`, `message` textarea, **`media[]` type=file**, `expire_at` date, `category_selected[]`/`student_category_selected[]` multi-selects, `country_id`/`hours`/`language` selects) + recipient tables (Teachers/Students, Select-All) + quota display (Maximum limit/messages = computed).
- `output/roles/admin/pages/management-settings-notification.md` — the System-Notifications settings form (46 fields, channel Off/As-Profile/whatsApp/E-mail/Private) — **already owned by settings.html (Spec 031 Notifications tab); NOT rebuilt here** (boundary note).
- `output/roles/admin/pages/management-time-convertor.md` — **timeConverter**: 2 tabs — "Time Zone" converter (date nav Previous/Today/Next, location list w/ 24h strips + current-time marker, Add-Location modal ~150-city IANA catalog by region, Remove, business/night legend) = **pure client-side**; "Changes" DST table (`Time Zone`/`Affected Accounts`/`Next Change Date`/`Current Offset`/`Upcoming Offset`) = backend-read → **authored display** in rebuild. No writes.
- `output/combined/{form-inventory,table-inventory,button-coverage,modal-inventory}.md` — per-page field/column/button/modal rows cross-checked.

## Current app inspected
- `app/src/js/nav.config.js` — the 5 Control planned items (messages/leads/tasks/announcements/timeConverter), all `status:'planned'`, no route.
- `app/src/js/pages/sessions-analysis.js` — the display-only admin-ops precedent (pageHeader + summaryCards + cardGrid + authored fixtures + `backendRequired` export gate) that messages/leads/tasks/announcements follow.
- `app/src/build-html.mjs` (PAGES), `tests/smoke|a11y|screenshots`, existing form primitives (`field`/`optsFrom`/`formDrawer`/`previewTemplate`/`filterBar`/`confirmAction`) from Spec 032.

## Prior specs inspected
- `specs/033-…/admin-nav-completion-matrix.md`, `coming-soon-and-locks-register.md` (CS-01..CS-05), `follow-up-spec-roadmap.md` (034 row), `page-count-envelope.md` (034 = +10 → 113), `role-law-and-no-fake-carryover.md`.
- `specs/032-…/implementation-status.md` (form-drawer + gate patterns).

## Fields that MUST be excluded / gated (from grounding)
- **File uploads → gates (no `type=file`):** chat Create-Group `image`; announcement `media[]`.
- **Backend-write actions → gates:** message send/reply, group send; lead convert/assign/save-note/update-status/create; task create/move/assign/complete/add-section; announcement publish/send + WhatsApp channel.
- **Computed totals → authored display-only literals (no arithmetic):** lead KPIs (Converted/Not-Converted/Avg/Growth); task counts + "Average"; ad quotas (Maximum limit/messages); timeConverter "Affected Accounts"/offsets.
- **Not present anywhere (confirmed):** no password / salary-amount / api-key / secret / webhook / token field. (`coupone_code` = a discount code, not a money figure or secret → kept as a plain text field; `salaries` on the notification page = a toggle, out of scope here.)

## Evidence gaps
- **tasks** is the weakest: the board/kanban, "Add Section" form, and task create/assign/move modals were JS-driven and not captured. The rebuild authors clearly-labeled safe demo fields (title/description/assignee/status/priority/due) grounded in the captured KPI + per-staff columns; recorded as a gap in `legacy-control-center-coverage.md`.
- **messages** composer not captured as a structured form (send is AJAX); the rebuild uses a standard compose textarea + gated Send.

## Final grounding verdict
**PROCEED.** All five pages are grounded in inspected legacy evidence + current patterns + Spec-033 decisions. The scope below rests on evidence, not memory; the two gaps (tasks board, chat composer) are recorded and handled with authored safe fields.
