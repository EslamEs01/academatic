# Batch 30 — Teacher · Content / Materials / Library

### `teacher-library` — Teacher Library  (HTTP 200)

- Purpose: Browsable content/materials library for teachers, organized by category with search and filter capability.
- Key sections / flows: Single hero-style heading "Education and talents All in one place." with an "All Categories" filter dropdown. Category filter renders options including at least "All Categories" and "اللغه العربيه" (Arabic subject). Content items appear as image-rich cards with "New" and badge-count indicators (e.g., "5 new"). Interactions confirm a category dropdown expands inline on the same URL without navigating away.
- Key SAFE actions: Browse/view library items; search by keyword via the search form (GET, query param `query`); filter by category via `filter` select; view notifications; navigate sidebar links.
- Key MUTATING/dangerous actions: "See All Notifications" (submit button — could persist read-state); "Save" in Add Shortcuts modal (POSTs to `/teacher/shortcuts`); logout form (POST to `/teacher/logout`).
- Important modals/forms: **Add Shortcuts modal** — fields: `shortcut_title` (text, placeholder "Title"), `shortcut_link` (text, pre-filled with current page URL); submits POST to `/teacher/shortcuts`. Skip global chrome (logout form, notification panel).
- Variant-of: unique template
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`). No "No data" state captured, but page appears to load live content (2 XHR/fetch calls observed). No error state documented.
- UX improvement for the rebuild: Replace the flat category select dropdown with a persistent left-panel or top chip-bar of category filters; this gives teachers a faster scan-and-click pattern and makes the active filter visually obvious, especially important when the library grows to many subjects. Also add a loading skeleton and a proper empty state when no items match a search.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Teacher Library is a read-oriented content browser where teachers discover and access educational materials grouped by subject/category. Core entities: library items (cards with images, "New" badge, numerical counts), categories (subject tags), and the search/filter controls. The shortcuts modal is a cross-cutting global feature rather than library-specific logic.

- **Distinct page templates vs variant count:** 1 unique template (`teacher-library`). No URL-level variants were discovered in this batch (the category filter interaction stays on the same URL without navigation).

- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
  - Category dropdown (safe — client-side filter, same URL)
  - Search form (safe — GET with `query` and `filter` params)
  - Add Shortcuts modal (mutating — POSTs to `/teacher/shortcuts`; must not be auto-fired)
  - Notification panel / "See All Notifications" button (potentially mutating — marks notifications read)
  - Logout forms (mutating — session-terminating; three instances in DOM)

- **Improvements for the new platform:**
  - **Filter UX:** Migrate from a single `<select>` dropdown to a visible chip/tab row for category filtering; improves discoverability and mobile tap targets.
  - **RTL-first:** The existing page is LTR-only despite Arabic content appearing in the category list (اللغه العربيه). The rebuild must wrap all text containers with RTL-aware utilities and ensure card layouts flip correctly.
  - **Empty/loading/error states:** No skeleton or empty state captured. Add shimmer loading cards (2 API calls are made on load) and a "No items found" illustration with a clear CTA.
  - **"New" badge semantics:** The badge design ("New", "5 new") should use accessible `aria-label` and a consistent badge color system across the platform (avoid relying on color alone).
  - **Logo 404:** Backend must confirm correct logo upload path (`/storage/uploads/logo.png` is broken); the rebuild's asset pipeline should fail-fast with a placeholder rather than a broken image.
  - **Shortcuts feature:** The "Add shortcut" flow is a global affordance bolted onto every teacher page. For the rebuild, consider a dedicated "My Shortcuts" widget in the sidebar or user profile area rather than a floating modal on every page.
  - **Mobile layout:** 33 images on a card-grid page requires a responsive image grid with lazy loading. Current design not optimized for small screens.
  - **Accessibility:** Modals need focus trap and `role="dialog"` with `aria-labelledby`. The search form's `query` input lacks a visible `<label>`.

- **Anything that needs owner/backend confirmation:**
  - What categories and item types exist in the full library? Is there pagination or infinite scroll for large libraries?
  - Does filtering by category hit the server (API call) or is it client-side? The two XHR calls need mapping to confirm endpoint shape.
  - Is "See All Notifications" read-marking server-side? If so, it must never be triggered automatically in the new frontend.
  - Confirm the intended behavior of "View all notifications" link pointing to `/teacher/monthly-plans` — this looks like a misconfigured link (notifications redirecting to monthly plans page).
