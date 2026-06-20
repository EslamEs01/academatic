# Batch 20 — admin · Students (Soft-Delete view)

---

### `management-student-status-softdelete` — Student Status: Deleted (SoftDelete)  (HTTP 200)

- **Purpose:** Displays the "Deleted Students" sub-view of the Student Status page — a filtered list of soft-deleted (logically removed but not purged) student records within the student management module.
- **Key sections / flows:**
  - KPI summary row: 7 status cards covering Active (2, 100%), Suspended (0%), Stop (0%), Inactive (0%), On Trial (0%), Incomplete (0%), and Deleted Students (0%) — each showing count + percentage.
  - "Deleted Students" section heading (H5) with a data table underneath.
  - Table columns: #, Student Name, Parent Name, Timezone, WhatsApp Group, Language, Gender, Age (9 columns total, 0 data rows in the captured snapshot — empty state).
  - Month filter (select) to scope the listing by time period.
  - Pagination present (1 page, `javascript:void(0)` — effectively empty).
  - Interaction: one dropdown/menu interaction captured on the same URL (no navigation change), likely the KPI-card status filter or row action menu.
- **Key SAFE actions:** View deleted student list, filter by month, navigate to other status views via KPI cards, navigate sidebar links, view all courses, view all queues.
- **Key MUTATING/dangerous actions:** "Save" (Add Shortcuts form — persists a shortcut link), "See All Notifications" (submit). No student-restore or permanent-delete buttons are visible in the captured state; however the row action menu (dropdown interaction) likely exposes restore/permanent-delete — these must NEVER be auto-fired and require confirmation dialogs.
- **Important modals/forms:**
  - Modal 1 (dynamic/loading): Content shown as "Loading…" — likely a row-level detail or action modal triggered from the table row action menu. Purpose unclear from static capture; must be confirmed with backend owner.
  - Modal 3 — Add Shortcuts: Title + Link fields; Save submits to `/management/shortcuts` (POST). Standard global chrome; skip in rebuild per rules.
- **Variant-of:** `management-student-status-*` template family. This page is a query-param/path variant of the parent Student Status listing (`/management/student/status/<StatusName>`), sharing the same KPI cards + table layout. The base template is `management-student` (student list) with a status-filter URL pattern. Among the status variants identified: Active, Suspended, Stop, Inactive, OnTrial, Incomplete, SoftDelete — this is the SoftDelete variant.
- **Broken/empty:** Table has 0 rows in the captured snapshot — empty state (no deleted students exist at capture time). No error HTTP status. Logo image returns 404 (`/storage/uploads/logo.png`) — site-wide asset issue, not page-specific.
- **UX improvement for the rebuild:** The empty state for the deleted students table renders as a completely blank table body with no messaging. The rebuild should display a proper empty-state component (e.g., an icon + "No deleted students found" message + optional "Return to Active Students" CTA) to make the zero-row state immediately comprehensible. Additionally, the row action menu (likely restore / permanent delete) should be replaced by an explicit two-step confirmation flow with clear labeling — especially for permanent delete, which should require a typed confirmation or a separate danger-zone modal.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single-page batch covers the Soft-Delete sub-view of the Student Status module within the admin panel. The core entity is the Student record, which carries a lifecycle status (Active / Suspended / Stop / Inactive / On Trial / Incomplete / Deleted). The SoftDelete view surfaces logically-deleted students for review and potential restoration or permanent removal, without destroying the records from the database.

**Distinct page templates vs variant count:**
- Unique templates: 1 (`management-student-status-softdelete` is itself a variant of the broader student-status template)
- Variant pages: 1 (this batch contains exactly 1 page; it is one of ~7 status-filter variants of the same underlying student table template)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Month filter (select): safe, scopes the table.
- KPI status cards: navigation-safe, switch between status views.
- Row action dropdown (inferred from interaction capture): likely mutating — restore or permanent delete. Must be treated as dangerous; requires confirmation.
- Loading modal (Modal 1): purpose unconfirmed — could be a student detail drawer or a row-action confirmation form. Dangerous if it triggers restore/delete.
- Add Shortcuts modal: global chrome, not dangerous to student data.

**Improvements for the new platform:**
1. **Empty/error state:** Replace the blank table body with a designed empty-state component (icon, message, optional action).
2. **Status navigation:** Replace the KPI card row as a navigation mechanism with a proper tab bar or segmented control so intent is explicit and accessible.
3. **Dangerous actions (restore / permanent delete):** Move out of an unlabeled dropdown into named row-action buttons with clear icons; wrap permanent delete in a two-step danger modal with explicit confirmation text ("Type DELETE to confirm").
4. **Table columns:** Consider adding a "Deleted At" timestamp column so admins can audit when deletion occurred — a critical field missing from the current layout.
5. **RTL-first:** Page is captured as LTR; rebuild should support RTL (Arabic) as the primary direction given the platform's audience, flipping the table, sidebar, and KPI cards.
6. **Mobile:** The 9-column table does not collapse gracefully on small screens; rebuild should use a card-list or collapsible row pattern for mobile teachers/family users.
7. **Pagination:** Rebuild with server-side pagination + page-size selector; the current `javascript:void(0)` pagination link is non-functional.
8. **Status colors:** KPI cards use text-only percentage labels; rebuild should apply semantic color coding (green=active, red=deleted, amber=suspended) with WCAG-compliant contrast ratios.
9. **Search within deleted list:** No search input is scoped to the deleted students table; add an inline filter/search for Student Name or Parent Name.
10. **Logo 404:** Site-wide broken logo asset should be resolved in the asset pipeline before launch.

**Items needing owner/backend confirmation:**
- What actions are available from the row action dropdown for deleted students (restore only, or permanent purge too)?
- Is permanent deletion hard-delete or does it move to a second archive tier?
- Does the "Deleted Students" KPI card count update in real time, or is it a cached/batch-computed figure?
- What triggers the Loading modal (Modal 1) — is it a student detail pane or an action confirmation form?
- Is the Month filter applied to deletion date, enrollment date, or session date?
