# Batch 9 — admin · Messages / Notifications (+ Settings)

---

### `management-chat` — Chat

- **Purpose:** Real-time messaging hub for the admin; supports both 1-on-1 contacts and group chats, with a "No chat selected" splash until a contact is chosen.
- **Key sections / flows:** Split layout — left panel is a searchable contact list (tabs: All / Staff / Teachers / Students) with unread badges; right pane is the message thread showing message history with "Loading more…" pagination. Group management is accessible from within the chat pane.
- **Key SAFE actions:** Search contacts (GET, client-side filter), navigate to contact thread, view group details panel.
- **Key MUTATING/dangerous actions:** Send message (unnamed submit), Create Group (form POST `create-group-form`), Add Member to group (`addMemberForm` POST), Delete Group (Confirm/Cancel flow), Leave Group (link action), Save group settings.
- **Important modals/forms:**
  - **Create Group** (`create-group-form`): Group Name, Bio, Image (file), multi-select Staff / Teachers / Students — fired via Submit; creates a new broadcast group.
  - **Add Member** (`addMemberForm`): multi-select Staff / Teachers / Students — appends members to an existing group.
  - **Group Settings** (modal 2): Edit group name/bio/image + Leave Group + Delete Group — all destructive paths live here without a dedicated confirmation step beyond a generic Confirm/Cancel pair.
  - **Chats drawer** (modal 3): Alternate contact list view, "Loading more…" scroll.
- **Variant-of:** unique template
- **Broken/empty:** Logo image 404 (`/storage/uploads/logo.png`). Chat pane shows placeholder "Open chat from the list" when no contact is selected — functional empty state, not an error.
- **UX improvement for the rebuild:** The Group Settings modal bundles Edit, Leave, and Delete into one modal with a generic Confirm button — split into three separate flows with a destructive-action confirmation dialog (typed name or explicit warning) for Delete Group and Leave Group. Add unread-count badge persistence and proper ARIA roles for the chat thread (live region, `role="log"`).

---

### `management-public-advertisement` — Public Advertisement & Notification

- **Purpose:** Compose and broadcast a message (in-app advertisement or WhatsApp) to targeted subsets of teachers and/or students, with category filtering, media attachment, expiry date, and send-rate limits.
- **Key sections / flows:** Single-page compose form at the top (type selector, message body, media upload, expiry date, audience filters); two tables below showing the resolved recipient lists — "List of Teachers" and "List of Students" — that update based on selected categories.
- **Key SAFE actions:** Filter teacher/student categories (client-side multi-select), view resolved recipient tables, select/deselect recipients via "Select All" checkboxes.
- **Key MUTATING/dangerous actions:** Submit broadcast (`management/public-advertisement-submit` POST) — sends WhatsApp and/or in-app advertisement to potentially all selected users; flagged with a "Maximum limit:0 / Maximum messages:0" quota indicator (values showed 0, suggesting rate-limit data may not have loaded).
- **Important modals/forms:**
  - **Broadcast form** (Form 2, inline — no modal): type checkboxes (Advertisement / WhatsApp), Private toggle, Message textarea, Media file upload, Expire At date, teacher category multi-select, student category multi-select, Country, Hours, Language dropdowns, and two "Select All" checkboxes for bulk recipient selection. Submits to `/public-advertisement-submit`.
- **Variant-of:** unique template
- **Broken/empty:** Quota badges show "Maximum limit:0" and "Maximum messages:0" — likely failed to load real limits from API. Recipient tables show "Select categories to send request" placeholder rows (no actual data rendered), possibly because no categories were pre-selected at capture time.
- **UX improvement for the rebuild:** Replace the single Submit button with a two-step flow: a "Preview Recipients" confirmation screen showing the resolved audience count and sampled names before the actual send, to reduce accidental mass-broadcasts. Surface real-time quota remaining prominently before the user composes the message.

---

### `management-settings-notification` — Settings: System Notifications

- **Purpose:** Admin configuration panel for controlling which notification events are sent to teachers and students, via which channel (app push, WhatsApp, email, profile), and with what timing/reminders.
- **Key sections / flows:** Single long-form settings page under H3 "System Notifications." Organised into logical groups: (1) Global on/off toggles (Notifications, App Notification); (2) Course Notifications — per teacher and per student channel select + status event checkboxes (Create, Edit, Status); (3) Class Notifications — per teacher and per student channel select + status checkboxes (Waiting, Running, Cancel, Absent, Teacher Absent, Auto Makeup, Reject, Cancel request, Approve, End class); (4) Reminders — teacher/student channel, hours-before numeric input, daily reminder, late-3-minutes, reschedule reminders, manual send toggle; (5) Invoice notifications — channel select + reminder interval in days; (6) Salaries and Family Status notification channels.
- **Key SAFE actions:** View current configuration, navigate settings sidebar.
- **Key MUTATING/dangerous actions:** Save changes (POST to `settings/notification/update`) — persists the entire notification configuration; a misconfiguration here silently changes all outbound notification behaviour for the platform.
- **Important modals/forms:**
  - **Notification settings form** (Form 2, 47 fields, inline): all the checkboxes and selects described above + `hours_to_reminder_teacher` and `hours_to_reminder_student` number inputs. Single "Save changes" submit button at the bottom.
- **Variant-of:** unique template
- **Broken/empty:** No broken states observed; page loaded cleanly (HTTP 200, 105 network requests). Logo image returns 404 (shared platform-wide issue).
- **UX improvement for the rebuild:** The single monolithic form with 47 fields and one Save button at the very bottom is error-prone — any accidental change is silently saved. Rebuild as tabbed sections (Courses / Classes / Reminders / Invoices / Salaries) each with its own Save, with unsaved-changes guards and a visual diff summary before the final save. Add per-section preview of who will be affected (e.g., "X teachers will now receive WhatsApp on class cancel").

---

## Module synthesis (this batch)

**What this module does and its core entities:**
Batch 9 covers the admin-side communication and notification layer — three distinct pages all in the "Messages / Notifications" module:
- **Chat** — real-time messaging with contacts and group management.
- **Public Advertisement** — mass-broadcast tool targeting teachers/students via in-app or WhatsApp.
- **Settings / Notifications** — system-wide configuration of all notification triggers, channels, and timing.

Core entities: Chat Contact, Group (members: Staff, Teachers, Students), Broadcast Message (type, recipients, media, expiry), Notification Rule (event, channel, statuses, reminder timing).

**Distinct page templates vs variant count:**
- 3 pages read, 3 unique templates, 0 variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Chat: Create Group and Add Member modals are mutating; Delete Group and Leave Group in Group Settings modal are **dangerous** (irreversible) and share a generic Confirm button — no dedicated destructive-action warning.
- Public Advertisement: the broadcast Submit is the single most dangerous action in the batch — one click sends messages to potentially all teachers and students; no preview/confirmation step exists.
- Notification Settings: the 47-field Save changes is a silent, sweeping configuration change; no per-section saves, no confirmation dialog.
- All three pages share global chrome modals (Recent Searches, Add shortcuts) — safe, not worth flagging per-page.

**Improvements for the new platform:**

1. **Chat — group safety:** Split Delete Group and Leave Group into explicit destructive-action flows with typed-name confirmation. Add ARIA live regions (`role="log"`) for the message thread. Introduce read-receipts or at least unread-count persistence.
2. **Chat — mobile:** The two-panel layout collapses poorly on mobile; implement a single-column slide-in panel pattern.
3. **Public Advertisement — send guard:** Add a mandatory preview step showing resolved audience count + channel breakdown + quota remaining before the final Send. Disable Submit when quota shows 0.
4. **Public Advertisement — rate limit visibility:** Show live quota (remaining messages, next reset time) at the top of the compose area, not as a badge that may show stale "0" values.
5. **Notification Settings — tabbed form:** Split the 47-field monolith into tabs per domain (Courses / Classes / Reminders / Invoices / Salaries), each with its own Save and unsaved-changes guard (route-leave warning).
6. **Notification Settings — impact preview:** Before save, show a concise summary ("This will enable WhatsApp reminders for all teachers 1h before each session") to help admins understand the blast radius.
7. **RTL / i18n:** All three pages are LTR-only (lang: en), but multi-select options include Arabic names (e.g., "المعلم محمد صادق", "الطالبة لمار حسن"). The rebuild must handle mixed-direction text inside form controls (dir="auto" on option text or RTL-first layout mode).
8. **Shared platform bug — logo 404:** `/storage/uploads/logo.png` returns 404 on every page; the rebuild should use a bundled fallback asset rather than a user-uploaded path for the primary logo.
9. **Empty states:** Public Advertisement recipient tables need a proper empty-state illustration + instructional copy ("Select at least one teacher category above to see recipients") rather than a raw table row with placeholder text.
10. **Accessibility:** Chat modals lack explicit `role="dialog"` and focus traps; Notification Settings checkboxes lack group `<fieldset>`/`<legend>` structures — both must be fixed in the rebuild for keyboard and screen-reader users.

**Owner / backend confirmation needed:**
- Public Advertisement: clarify what "Maximum limit:0 / Maximum messages:0" means — is it a per-day limit, per-account limit, or a WhatsApp BSP quota? The UI must surface whichever clearly.
- Notification Settings: confirm whether changes take effect immediately or on next scheduled run; the rebuild should communicate this to the admin.
- Chat: confirm whether the group chat messages persist in the DB or are ephemeral; affects data-fetch strategy and message history pagination design.
