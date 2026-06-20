# Batch 15 — admin · Profile / Account & Settings (Security)

---

### `management-profile-show` — Profile Show

- **Purpose:** Read-only view of the logged-in admin's own profile (name, email, username, password placeholder).
- **Key sections / flows:** Single card showing profile fields (Name, E-mail, Username, Password masked); heading shows the actual admin display name (e.g. "Eslam Essam"); "Edit" link navigates to the edit page. No data tables.
- **Key SAFE actions:** View profile fields; navigate to Edit page; global search; sidebar navigation.
- **Key MUTATING/dangerous actions:** "Edit" link leads to the mutating edit form (not itself dangerous but entry point); "See All Notifications" is a POST submit; "Add shortcuts" POST form in global chrome.
- **Important modals/forms:** Global chrome only — Recent Searches (read), Add Shortcuts (POST: shortcut_title, shortcut_link). No page-specific modal.
- **Variant-of:** Unique template (profile read view).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all pages in this batch. Page itself loaded 200 OK; content present.
- **UX improvement for the rebuild:** Combine Profile Show and Profile Edit into a single inline-editable card with a visible "Edit / Save / Cancel" toggle rather than a full-page navigation switch; avoids a wasted round-trip and keeps context.

---

### `management-profile-edit` — Profile Edit

- **Purpose:** Allows the admin to update their own account details: display name, email, username, password, and avatar photo.
- **Key sections / flows:** Single card form with avatar upload (file + online URL input), text fields (Name, E-mail, Username, Password); "Save changes" submits via POST to `/management/profile/edit`; "Discard" resets the form client-side; dropzone-style photo uploader (Dropzone.js loaded).
- **Key SAFE actions:** Discard / Reset button; navigate away via sidebar; view interaction dropdown/menu.
- **Key MUTATING/dangerous actions:** "Save changes" (POST form — updates name/email/username/password/avatar); "See All Notifications" POST; "Add shortcuts" POST.
- **Important modals/forms:** Form 2 (main): fields — onlineImage (text), image (file upload), name, email, username, password. No separate confirmation modal before save; password is plain-text input type (not `type=password`), which is a security concern.
- **Variant-of:** Unique template (profile edit form).
- **Broken/empty:** Logo 404 same as above. No empty-state issue; form always pre-fills current values.
- **UX improvement for the rebuild:** Password field must use `type="password"` (not `type="text"` as current); add a "Confirm password" field and strength indicator; avatar upload should show a live preview before submit; add a confirmation step or toast-undo for the save action.

---

### `management-settings-security-data` — Settings Security / Data

- **Purpose:** Bulk data operations hub: one-click LMS export (backup) and CSV import for teachers, families, children, and family invoices/subscriptions.
- **Key sections / flows:**
  - **Backup Settings card:** "Save changes" (saves backup config?) + "Send Backup" link (triggers backup export email/download).
  - **Import Data card:** Four separate file-upload sub-sections, each with: (a) a reference table showing required CSV column names and formats, (b) a file picker (`type=file`, required), (c) an "Upload" submit button, (d) a "Download Template" link for the CSV template. Entity types: teachers (10 columns), families (15 columns), children (7 columns), families/subscriptions (7 columns).
  - **Country List modal:** Triggered by "Show Country List" button; table of country codes (27 rows visible, full 240+ country dropdown in select); includes a "Copy" button to copy a code to clipboard.
  - Accordion interaction confirms sub-sections expand/collapse.
- **Key SAFE actions:** Download Template (CSV template download); Show Country List; Copy country code; sidebar navigation.
- **Key MUTATING/dangerous actions:** "Send Backup" (triggers data export/email — must NOT be auto-fired); four "Upload" buttons (each POSTs file to `/management/settings/security/data/import` with hidden `type` discriminator — bulk import, potentially destructive/irreversible); "Save changes" on backup config.
- **Important modals/forms:** Country List modal (read-only with Copy action). Four upload forms share identical structure: hidden `_token`, hidden `type`, file input (required). No confirmation dialog before bulk import — high risk.
- **Variant-of:** Unique template.
- **Broken/empty:** Logo 404. Page loaded 200 OK; all sections present. Country select has 670 option elements.
- **UX improvement for the rebuild:** Bulk import forms must show a confirmation modal with a row-count preview (parse CSV client-side before submit) and a clear warning that existing records may be affected; provide import result feedback (success count / error rows) after upload. "Send Backup" should use a confirm dialog before triggering. Separate the Backup and Import sections into distinct sub-route tabs to reduce cognitive load.

---

### `management-settings-security-policy` — Settings Security / Policy

- **Purpose:** Rich-text editor for maintaining the platform's legal/operational policies displayed to families and teachers.
- **Key sections / flows:** Two independent Quill rich-text editor panels — "Family Policy" and "Teacher Policy"; each has a full toolbar (bold, italic, underline, link, ordered list, bullet list, clean); a single "Submit" button saves both policy texts via POST; two unlabelled select dropdowns present (likely language or version selectors for the policy content).
- **Key SAFE actions:** Read and edit policy text in-editor (client-side only until submit); sidebar navigation.
- **Key MUTATING/dangerous actions:** "Submit" button (single POST that overwrites both policy texts — no confirmation); "See All Notifications" POST; "Add shortcuts" POST. Two `about:blank` iframes detected (likely Quill editor canvases).
- **Important modals/forms:** No page-specific modal beyond global chrome. Form is implicit Quill submission — no explicit `<form action>` captured (Quill likely submits via XHR). Two unlabelled selects (purpose unclear — possibly language or policy version).
- **Variant-of:** Unique template.
- **Broken/empty:** Logo 404. Page loaded 200 OK; both policy editors present. The two select filters are unlabelled — intent unclear, needs backend confirmation.
- **UX improvement for the rebuild:** Add auto-save / draft functionality so policy content is not lost on accidental navigation; the single Submit button for both policies is ambiguous — split into per-section save buttons; add a last-saved timestamp and a change-history/audit log for policy modifications; label the two unlabelled selects (likely language switcher for localized policy text).

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the admin's self-service profile management and two security/governance settings sub-pages. Core entities: admin user account (name, email, username, password, avatar); platform data (bulk teacher/family/student/invoice CSVs); platform policies (Family Policy text, Teacher Policy text).

**Distinct page templates vs variant count:**
- 4 unique templates, 0 variants.
  1. Profile Show (read-only account view)
  2. Profile Edit (account edit form)
  3. Settings Security / Data (backup + bulk import hub)
  4. Settings Security / Policy (dual rich-text policy editor)

**Cross-cutting interactions and dangerous ones:**
- Global chrome modals appear on all 4 pages: Recent Searches (safe), Add Shortcuts (mutating POST), Notifications (POST).
- Page-specific dangerous actions: Profile Edit "Save changes" (account mutation), Data page four "Upload" bulk import submits (irreversible), Data page "Send Backup" (external trigger), Policy page "Submit" (overwrites both policy documents simultaneously).
- No bulk-import action has a confirmation dialog — highest risk item in this batch.
- Country List modal on the Data page is safely read-only.

**Improvements for the new platform:**
- **Profile:** Merge Show + Edit into a single inline-editable page; fix password field type; add confirm-password + strength meter; live avatar preview.
- **Data import:** Pre-import CSV validation with row count and error preview; confirmation modal before each bulk upload; post-import result summary (imported / skipped / errors); consider job-queue pattern for large files with progress indicator.
- **Backup:** Confirmation dialog + success feedback toast for "Send Backup"; expose backup history/log.
- **Policy editor:** Per-section save, draft/preview mode, last-saved timestamp, audit trail, language-labeled selects.
- **Global:** Broken logo (`/storage/uploads/logo.png` 404) must be fixed in the new asset pipeline.
- **Accessibility:** All 4 pages are LTR only; new platform needs RTL-ready layout. Unlabelled selects and missing ARIA on Quill editors need remediation.
- **Security:** Plain-text `type="text"` password field on the Edit page is a critical UX/security defect — must be `type="password"` in the rebuild.

**Items needing owner/backend confirmation:**
- The two unlabelled `<select>` elements on the Policy page — are they language selectors for localized policy versions, or policy version history? Their POST target is not explicit from captured data.
- What the "Save changes" button on the Backup Settings card actually saves (configuration vs. immediate trigger) vs. "Send Backup" — their distinction needs API confirmation.
- Whether bulk import appends or upserts/replaces records (critical for import UX warnings).
- Whether the `type` hidden field in each upload form maps to a specific entity type — confirm the four accepted values with backend.
