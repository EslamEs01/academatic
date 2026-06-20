# Batch 17 — admin · Roles / Permissions (Staff Member Permission Editor)

---

### `management-admins-permission-6` — Set Permissions for Staff Member (ID: 6)

- **Purpose:** Full-page permission editor for a specific staff member (admin ID 6), allowing a super-admin to grant or revoke any of 170 granular system permissions across all modules.
- **Key sections / flows:** Single H4 heading "Set Permissions for staff member"; permission counter badge "170/170 permissions selected"; grouped permission checkboxes organized by module (Dashboard=14, New Requests=6, Families=24, Students=21, Teachers=17, Schedule=1, Reports=20, Invoices=15, Payment Methods=3, Locations, Material, Library, Banks, System Settings, Staff Members, Groups=5, Scheduled Actions); global "Select All" and per-group "Clear All" toggle buttons; inline text search to filter permissions; Submit button posts to `/management/admins/permission/store`.
- **Key SAFE actions:** View permission list; search/filter permissions by keyword (client-side); Select All / Clear All toggles (client-side state only, no server round-trip until Submit); navigate sidebar.
- **Key MUTATING/dangerous actions:** **Submit** (POST `/management/admins/permission/store`) — saves the complete permission set for the staff member; this is the sole save action and replaces the entire permission record with whatever is checked at submit time, making accidental "Clear All then Submit" catastrophic.
- **Important modals/forms:** Permission store form (Form 2) — hidden `userID` field identifies the staff member; `permisions[]` checkbox array (170 items); no confirmation dialog before submit. No other domain-meaningful modals (Modal 1 is a generic loader; others are global chrome).
- **Variant-of:** `management-admins-permission-7` — same template, different staff member ID in the URL and `userID` hidden field; all structure, form fields, button list, and DOM counts are identical.
- **Broken/empty:** No 404/500; page loaded successfully (HTTP 200). Logo image returns 404 (`/storage/uploads/logo.png`) — cosmetic asset miss.
- **UX improvement for the rebuild:** Replace raw "Submit" with a two-step confirmation flow: show a diff of added/removed permissions since page load and require explicit confirmation before writing, to prevent accidental full-permission wipe.

---

### `management-admins-permission-7` — Set Permissions for Staff Member (ID: 7)

- **Purpose:** Identical permission editor as above, targeted at staff member ID 7 — a pure data variant of the same template.
- **Key sections / flows:** Identical structure to permission-6: H4 heading, 170/170 counter, same 170 checkboxes across the same module groups, Select All / Clear All, permission search, Submit. DOM element counts are byte-for-byte the same (674 divs, 179 inputs, 172 labels, 27 buttons, 4 forms).
- **Key SAFE actions:** Same as permission-6 — view, search, toggle selections client-side, navigate sidebar.
- **Key MUTATING/dangerous actions:** **Submit** (POST `/management/admins/permission/store`) with `userID=7` — same risk profile as permission-6: full replacement of permission set with no confirmation.
- **Important modals/forms:** Identical to permission-6. Form 2 posts to same `/store` endpoint; `userID` hidden field carries `7` instead of `6`.
- **Variant-of:** `management-admins-permission-6` (base template). Only the URL path segment and the hidden `userID` value differ.
- **Broken/empty:** HTTP 200; same cosmetic 404 on logo asset.
- **UX improvement for the rebuild:** Add per-module "preset roles" (e.g., "Teacher Ops", "Finance Viewer") as one-click templates to reduce the manual effort of configuring 170 checkboxes from scratch; allow saving named permission sets for reuse across multiple staff members.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Staff Member Permission Editor is a flat-checkbox RBAC (Role-Based Access Control) configuration surface. The core entities are: staff member (identified by integer ID in the URL), and a flat list of 170 named permissions spanning every system module. There are no roles or role groups in the UI — all permissions are assigned directly to the individual staff member. The single save action POSTs the full checked array to a shared `/permission/store` endpoint.

**Permission taxonomy (170 total, grouped by module):**
- Dashboard (14): class queue controls, chat, WhatsApp monitor, session analysis, advertise/notify, tasks, public holiday
- New Requests (6): show, create, update, delete, show details, create account, change status
- Families (24): full CRUD, force-delete, restore, account status, contact visibility, location/prefs/capabilities, categories
- Students (21): status views (active/suspended/deactivated/deleted), CRUD, courses, feedback, trial, certificates
- Teachers (17): CRUD, settings, vacation, force-delete, restore, KPIs, salaries, categories, schedule search
- Schedule (1): request schedule
- Reports (20): data analysis, expenses, agenda, transactions (add/export/edit/delete), salaries (generate/send/edit/delete), payouts (view/request/approve/execute/delete/providers), monthly report
- Invoices (15): full invoice lifecycle, credits, adjustments, payment methods, export/phone-export
- Payment Methods (3): show/add/edit/delete (counted as 3 in badge; 4 checkboxes)
- Locations, Material (course), Library (books), Banks — each: show + CRUD
- System Settings: general, integrations, customization, notification, security, backup
- Staff Members: show, add, edit, show actions, show/edit permissions, delete
- Groups (5): show, create, edit, show details, add/remove students, edit hour rate
- Scheduled Actions: show, create, cancel, delete

**Distinct page templates vs variant count:**
- 1 unique template: the staff member permission editor (`/management/admins/permission/{id}`)
- 2 pages in this batch, both variants of the same template (IDs 6 and 7)
- 0 broken pages

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Client-side permission search (text input): filters visible checkboxes, safe
- Select All / per-group Clear All: client-side toggle, safe on its own — dangerous only when followed by Submit
- **Submit (POST /permission/store)**: the only dangerous action — a full-replace write with no diff preview, no confirmation dialog, and no undo

**Improvements for the new platform:**

1. **Diff-before-save confirmation:** Show a modal listing permissions being added and removed before committing the POST, preventing accidental bulk revocation.
2. **Named permission presets / role templates:** Allow saving a checked state as a reusable preset (e.g., "Finance Admin", "Academic Ops") and applying it to any staff member — today there is no role abstraction, just per-user flat assignment across 170 items.
3. **Grouped accordion UI with progress indicators:** The current flat scroll of 170 checkboxes is unwieldy; group them into collapsible sections with per-group counts (already partially surfaced as badges) and expand-all/collapse-all controls.
4. **Permission search with highlighting:** The existing search input is unlabeled and has no ARIA role; the rebuild should use a labeled, accessible filter with real-time match highlighting and a "no results" empty state.
5. **Change audit log:** Log who changed which permissions and when; no audit trail is surfaced in the current UI.
6. **RTL/Arabic readiness:** Page is LTR-only; the permission label text is all English. If the platform serves Arabic-speaking admins, labels need Arabic translations and the layout must flip to RTL.
7. **Accessibility:** 172 checkbox labels exist but none have explicit ARIA descriptions; the form has no fieldset/legend grouping for screen readers; rebuild must add proper grouping and keyboard navigation.
8. **Logo asset fix:** `/storage/uploads/logo.png` returns 404 on both pages — the asset path is broken and should be resolved at the infrastructure level before launch.

**Anything that needs owner/backend confirmation:**
- Is there a server-side role/group abstraction that the frontend should expose, or is per-user flat permission assignment intentional design?
- Does the `/permission/store` endpoint perform a diff or a full replace? If full replace, the confirmation-dialog UX improvement is critical.
- The `permisions[]` field name has a typo (single `s`) — confirm whether the API accepts `permissions[]` or requires the misspelled key; the rebuild should use the correct spelling and update the API contract if needed.
- Staff member IDs 6 and 7 are hardcoded in URLs; confirm the ID range and whether there are pagination concerns when many staff members exist.
