# Batch 43 — family · Payments / Invoices

### `student-billing` — Student Billing  (HTTP 200)

- Purpose: Read-only invoice/billing summary page for a family-role student, listing all invoices tied to their enrolled courses.
- Key sections / flows: Single H5 "Billing Details" heading; one table with columns #, Serial No, Month-Year, Due Date, Course, Amount, Status (0 rows captured — empty state); a "View all invoices" navigation link in the header area; notification badge indicators ("0 New", "5 new").
- Key SAFE actions: View billing table; click "View all invoices" (navigates to same `/student/billing` route — effectively a self-link or intended to reset filters); language switcher (AR, FR, DE, ES, UR, IT, PT, RU, TR); navigate to My Profile; navigate via sidebar (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library).
- Key MUTATING/dangerous actions: "See All Notifications" button (type=submit on a non-GET form — must not be auto-fired; likely marks notifications as read or fetches more); Logout (POST to `/student/logout`).
- Important modals/forms: One modal captured via dropdown/menu interaction (content not detailed in report — likely a notifications dropdown triggered by the notification bell). Logout form (hidden fields: `_token`, `id`; POST `/student/logout`) — standard CSRF-protected logout, not a risk to auto-fire data mutations but must require explicit user intent.
- Variant-of: unique template (only billing page for the family/student role).
- Broken/empty: Table has 0 rows — no invoice data present at crawl time. The logo image returns 404 (`/storage/uploads/logo.png`). Custom stylesheet 404 (`/assets/custom/style.css`). These are asset-level broken resources, not a page-level failure; the page itself returned HTTP 200.
- UX improvement for the rebuild: The empty-state for the billing table should show a meaningful illustration + message (e.g., "No invoices yet — your billing history will appear here once you are enrolled in a paid course") with a clear CTA. Currently the table silently renders with no rows and no guidance. Also add status color-coding (paid = green, overdue = red, pending = amber) as a distinct visual column rather than relying on text alone, and expose a date-range filter so families can narrow by month/year without scrolling an unbounded list.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The `student-billing` page is the family-role student's payment and invoice portal. Core entities: Invoice (Serial No, Month-Year, Due Date, Course, Amount, Status). It is a read-only ledger — families can view what they owe or have paid per course per month but cannot initiate payments or disputes from this surface (no payment button was detected).
- **Distinct page templates vs variant count:** 1 unique template; 0 variants. This batch contains a single page.
- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:** One modal/dropdown captured (notification panel, triggered by bell icon) — likely safe read action but the submit button on it is classified unsafe (could mark-as-read or paginate server-side). The logout POST is the only confirmed mutating action on the page and must always require explicit user confirmation in the rebuild.
- **Improvements for the new platform:**
  - **Empty/error state:** Replace the silent empty table with a contextual empty-state component (illustration + message + CTA).
  - **Status colors:** Paid/Overdue/Pending badges with semantic color tokens; support RTL badge layout since Arabic is a target locale.
  - **Filters:** Add month/year range picker and course filter above the table; the current page offers zero filtering.
  - **"View all invoices" link:** Currently self-links to the same URL — clarify intent (reset filters? expand paginated view?). In the rebuild this should either be removed or wired to a dedicated full-list route.
  - **Mobile:** Billing tables are notoriously poor on small screens; rebuild should use a card/accordion pattern on mobile and a traditional table on desktop.
  - **RTL-first:** The crawled page is LTR (`en`) but the platform targets Arabic (`ar`) — all table columns, badge alignment, and amount formatting (currency direction) must be RTL-compatible.
  - **Logo / asset 404s:** Two 404 assets (`logo.png`, `custom/style.css`) must be resolved before launch; the logo 404 in particular breaks brand identity on every page.
  - **Accessibility:** The single H5 heading structure is flat; rebuild should use a proper H1 page title with H2 section headings, ARIA live regions for the notification count, and keyboard-accessible table sorting.
- **Anything that needs owner/backend confirmation:**
  - Confirm whether payment initiation (pay now, download invoice PDF) is intended to exist on this page in the new frontend or lives in a separate payment flow.
  - Confirm the "See All Notifications" submit button behavior — is it a pagination fetch or a mark-all-read mutation?
  - Clarify the "View all invoices" link target — same route vs. a paginated/filterable sub-route.
  - The 0-row table may reflect a test account with no billing history; confirm with a seeded account that the table actually populates correctly.
