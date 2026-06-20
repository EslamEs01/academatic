# Batch 40 — family · Content / Materials / Library

### `student-library` — Student Library

- Purpose: Allows a family/student portal user to browse and search the platform's content library, filtered by category.
- Key sections / flows: Hero banner with tagline ("Education, talents, and career opportunities. All in one place."), category dropdown filter ("All Categories" / "اللغه العربيه"), search input with submit, library item grid (33 images indicating material cards), notification badges ("0 New", "5 new").
- Key SAFE actions: Browse library items; search by keyword (GET form); filter by category (dropdown, GET); navigate to Billing ("View all invoices"); navigate sidebar links (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library).
- Key MUTATING/dangerous actions: "See All Notifications" button (POST submit form — could mutate notification state); Logout (POST form via sidebar/header).
- Important modals/forms: 1 modal captured via the "All Categories" dropdown interaction (category filter panel); search form (GET, fields: `query` text search + `filter` category select) — both safe, no destructive outcome. Logout form (POST) includes hidden `_token` and `id` fields — standard CSRF logout, not a content-level mutation.
- Variant-of: unique template (sole library page in family role; no other library slug found in this batch).
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`); custom stylesheet returns 404 (`/assets/custom/style.css`). Library content cards are present (33 images loaded), so the page itself is not empty. No server error observed.
- UX improvement for the rebuild: Replace the plain category select dropdown with a pill/chip filter row so users can see all available categories at a glance without opening a dropdown, and add an empty-state illustration + CTA when no results match the search/filter combination.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Student Library is the content discovery surface for the family/student role. Core entities: library materials (courses, resources, or media items) organized by category. Users browse, filter by category, and search by keyword. No purchase or enrollment action is visible on this page — it is read-only discovery.
- **Distinct page templates vs variant count:** 1 unique template (`student-library`), 0 variants in this batch.
- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
  - Category filter dropdown (safe GET interaction) — opens a filter overlay; stays on same URL.
  - Keyword search (safe GET form submit).
  - "See All Notifications" button is the only flagged mutating control on the page (POST form); must never be auto-fired.
  - Logout is present in both sidebar and header (POST); standard guard needed.
- **Improvements for the new platform:**
  - **Filters:** Replace select dropdown with horizontal chip/pill category filter; support multi-select for power users.
  - **Search:** Add debounced live search to avoid a full page reload on every keystroke; surface search result count.
  - **Empty/error state:** Add a proper no-results state with illustration and "Clear filters" CTA; current capture shows no such state.
  - **Loading state:** Add skeleton cards during fetch to avoid layout shift.
  - **Mobile:** Card grid should collapse to single-column on small screens; category chips should scroll horizontally.
  - **RTL-first:** The library tagline area and category filter must mirror for Arabic sessions (currently LTR only; Arabic category already in the option list, so RTL rendering is expected).
  - **Notifications:** The "See All Notifications" button pattern (POST submit) should be replaced with a safe GET-based notification drawer; mark-as-read should be an explicit user action with optimistic update, not a side-effect of opening the panel.
  - **Broken assets:** Logo and custom stylesheet 404s should be resolved before launch; they silently degrade the branded experience.
  - **Accessibility:** Search form lacks ARIA labels on `query` and `filter` fields; modal focus trap needs implementation.
- **Anything that needs owner/backend confirmation:**
  - What data source backs the library? (CMS, uploaded files, external catalog?) — determines whether search is client-side or API-driven.
  - Is the "See All Notifications" POST marking notifications as read, or does it navigate? Confirm intended mutation before rebuild.
  - Confirm whether library materials are role-gated (family vs. teacher vs. admin) or shared across roles.
