# Batch 3 — Admin · Content / Materials / Library

---

### `management-library` — Library (Book List)

- **Purpose:** Central repository for educational media files (books, videos, images, audio, links) organized by category, with inline category management.
- **Key sections / flows:** Filter bar (media type dropdown); main table — columns: #, Book Name, Category, Published at, Views, Downloads, Status, View, Actions (1 row shown: "No Material Added" empty state); side panel showing Categories table — columns: Category name, Total of material, Action (1 example row: "اللغه العربيه / 0"). Two interaction flows: open Categories modal to manage category list; open Add Material modal to upload a new file.
- **Key SAFE actions:** View all courses (nav link), View All Queues (nav link), filter by media type (GET form), view material detail modal (read-only).
- **Key MUTATING/dangerous actions:** Add Material (file upload + category assignment — POST to `/management/library`); Edit category name (POST to `/management/library` with `cat_id`); Save changes on category edit; Save changes on material add.
- **Important modals/forms:**
  - *Category Details modal* — lists all categories in a table, inline edit row via "Edit" button; fields: `name` (text), `type_id` (hidden), `cat_id` (hidden); submit: "Save changes". Also has "Add new category" sub-action within the modal.
  - *Add Material modal* — fields: `name` (material name text), `type` (select: Video / Images / Audio / Links), `category_id` (select from existing categories), `file` (file upload), `thumbnail` (file upload); submit: "Save changes".
  - *Material detail modal* (read-only) — shows title, description text ("This material is provided solely for educational purposes and enrichment.").
- **Variant-of:** Unique template — combines a filterable file list with an inline category management panel and multi-type file upload.
- **Broken/empty:** Main table shows "No Material Added" — empty state present but no styled empty-state component; logo image returns 404 (`/storage/uploads/logo.png`).
- **UX improvement for the rebuild:** Split category management into a dedicated sub-page or drawer rather than embedding it in a modal on the library page; add per-type icon indicators and a media preview thumbnail column; add a confirmation step before saving edits to categories that already have materials attached.

---

### `management-materials` — Materials / Courses List

- **Purpose:** Admin list of course subjects/tracks (confusingly labeled "Courses List" despite living under `/materials`) — functions as a reference taxonomy that can be attached to library materials.
- **Key sections / flows:** Breadcrumb: Dashboard > Courses List; single table — columns: #, Name, name_ar, Settings (with Edit and Delete row actions); one example row: "arabic / للغه عربيه". "Add Course" button in header navigates to create page. Two dropdown interactions captured (likely row-action menus for Edit/Delete).
- **Key SAFE actions:** View list, follow breadcrumb to Dashboard.
- **Key MUTATING/dangerous actions:** Delete (inline row action — POST with `_method` override to `/management/materials/1`; no visible confirm dialog captured); Edit (navigates to edit page or triggers inline action).
- **Important modals/forms:** No meaningful content modals. Delete action uses hidden-method form (Form 2 and Form 3 both POST to `/management/materials/1` with `_method` hidden field — strongly suggests DELETE/PUT method spoofing with no confirmation guard shown in captures).
- **Variant-of:** Unique template (course/subject taxonomy list, distinct from library file list).
- **Broken/empty:** No empty state observed for the table. Logo 404 persists.
- **UX improvement for the rebuild:** Add an explicit confirmation dialog before delete (currently no visible guard); rename this section in navigation to avoid confusion between "Materials" (taxonomy) and "Library" (media files) — they serve different purposes but share the same module label.

---

### `management-materials-1-edit` — Edit Course (Subject/Track)

- **Purpose:** Single-record edit form for a course subject entry (bilingual: English name + Arabic name).
- **Key sections / flows:** Breadcrumb: Dashboard > messages.Materials > Edit Courses (note: `messages.Materials` is an untranslated i18n key — a bug); one card section "Main information" containing the edit form.
- **Key SAFE actions:** Navigate via breadcrumb/sidebar.
- **Key MUTATING/dangerous actions:** Submit (POST to `/management/materials/1` with `_method` hidden, updating the record); fields: `name` (Course Name), `name_ar` (Course Name in Arabic).
- **Important modals/forms:** *Main information card form* — fields: `name` (text, placeholder "Course Name"), `name_ar` (text, placeholder "Course Name in Arabic"); submit button: "Submit". No cancel/back button captured inside the form card itself.
- **Variant-of:** Unique template (dedicated full-page edit form for a materials taxonomy record).
- **Broken/empty:** Breadcrumb contains literal untranslated i18n key `messages.Materials` — translation mapping missing for this label. Logo 404 persists.
- **UX improvement for the rebuild:** Fix the broken i18n key in the breadcrumb; add a "Cancel" / "Back to list" link inside the form card so users can abandon edits without relying on the browser back button; require both name and name_ar fields (currently not marked required).

---

### `management-materials-create` — Create Course (Subject/Track)

- **Purpose:** New-record creation form for a course subject entry (bilingual), identical in structure to the edit page but POSTing to the collection endpoint.
- **Key sections / flows:** Breadcrumb: Dashboard > messages.Materials > Create Courses (same i18n key bug as edit); one card "Main information" with the creation form; no table.
- **Key SAFE actions:** Navigate via breadcrumb/sidebar.
- **Key MUTATING/dangerous actions:** Submit (POST to `/management/materials`); fields: `name` (Course Name), `name_ar` (Course Name in Arabic).
- **Important modals/forms:** *Main information card form* — fields: `name` (text), `name_ar` (text); submit button: "Submit". Structurally identical to edit form minus the `_method` hidden field.
- **Variant-of:** `management-materials-1-edit` — same layout, same two fields, same submit label; differs only in HTTP target (collection vs. resource) and absence of `_method` spoofing.
- **Broken/empty:** Same untranslated i18n key `messages.Materials` in breadcrumb. Logo 404. No field validation UI observed.
- **UX improvement for the rebuild:** Merge Create and Edit into a single reusable form component; add inline validation with RTL-aware error messages since `name_ar` is an Arabic field; add required markers on both fields.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Content / Materials / Library module manages two distinct but related domains that the current platform conflates under a single sidebar section:
1. **Course taxonomy** (`/materials`) — a bilingual (EN/AR) list of subject/track labels used to classify content. CRUD via list + create + edit pages.
2. **Media library** (`/library`) — the actual educational files (videos, images, audio, links, books/PDFs) stored per category, with views, downloads, and status tracking.

Core entities: `Material` (course subject record with `name` + `name_ar`), `LibraryItem` (media file with type, category, thumbnail, view/download counters, status), `LibraryCategory` (category for grouping library items, with item count).

**Distinct page templates vs variant count:**
- **3 unique templates:** Library (management-library), Materials List (management-materials), Materials Create/Edit form (management-materials-create / management-materials-1-edit are structural variants of one template).
- **1 variant pair:** `management-materials-create` and `management-materials-1-edit` share the same layout, same two fields, same submit label — differ only in the form target URL and presence of `_method` override.
- Total: 3 unique templates, 1 variant page.

**Cross-cutting interactions and which are dangerous:**
- Category edit inline in the Library modal (dangerous — saves without confirmation).
- Material add via modal with file upload (dangerous — irreversible server-side file storage).
- Course record Delete on the Materials list (dangerous — no confirmation dialog visible; raw form submission with `_method` DELETE).
- Course record Submit on create/edit (mutating but recoverable).
- All pages share the same global chrome: search modal, shortcuts modal, notifications — none dangerous in isolation.

**Improvements for the new platform:**

1. **Naming/navigation clarity:** Rename sidebar entries to clearly distinguish "Course Subjects" (taxonomy) from "Media Library" (files). The current "Materials" label is ambiguous and bleeds into i18n key leakage (`messages.Materials`).
2. **i18n fix:** Replace all raw `messages.*` i18n key fallbacks in breadcrumbs with proper translated labels; ensure Arabic names (`name_ar`) display RTL inline in the same list row.
3. **Delete guard:** Add a confirmation dialog (with record name displayed) before any delete action on course subjects — the current implementation fires immediately via a hidden-method form.
4. **Library empty state:** Add a styled empty-state component for the Library table ("No materials yet — upload your first file") with a direct CTA to Add Material.
5. **Category management separation:** Move category management out of the Library page modal into a dedicated route (`/library/categories`) or a persistent sidebar panel, reducing modal depth and improving discoverability.
6. **File upload UX:** The Add Material modal uses a plain `<input type="file">` for both file and thumbnail — replace with a Dropzone component showing preview, file size, and accepted formats, with progress indicator.
7. **Status column:** Library table has a Status column but no values are visible in the current empty state — clarify status values (draft/published/archived) and add color-coded badges.
8. **RTL-first forms:** The `name_ar` field should use `dir="rtl"` and an Arabic keyboard hint; the rebuild should apply per-field directionality automatically based on field name conventions.
9. **Mobile layout:** Both the library table (9 columns) and the materials table (4 columns) overflow on mobile — rebuild should use card or accordion layout on small screens.
10. **Accessibility:** No ARIA labels on form fields, no focus trap in modals — all modals need `role="dialog"`, `aria-labelledby`, and Escape-to-close.
11. **Logo asset:** `/storage/uploads/logo.png` returns 404 across all pages — backend file or config fix needed before go-live.

**Needs owner/backend confirmation:**
- What are the valid `status` values for library items (draft, published, archived, other)?
- Are "Materials" (course subjects) used only for library categorization or also for other features (e.g., sessions, courses)?
- Is there a soft-delete or hard-delete for course subjects? Any cascade impact on library items if a subject is deleted?
- The `/management/materials` endpoint appears to manage a course subject taxonomy but is titled "Courses List" — confirm this is not the same as `/management/courses` (which also exists in the sidebar).
- File storage path for uploads — confirm S3 or local; important for thumbnail preview URLs in the new frontend.
