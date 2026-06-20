# Batch 42 — Family · General / Unknown

Both pages in this batch belong to the `family` role and are classified under "General / Unknown" module. Both rendered as error/broken states during the discovery crawl.

---

### `main-index-html` — Opps!!!  (404-equivalent / broken page)

- **Purpose:** Not a real functional page — this is the platform's generic 404 / "page not found" error screen, reached when a family-role user navigates to `/main/index.html` (which does not exist for this role).
- **Key sections / flows:** Single-screen error layout with H1 "Opps!!!" and H4 "This page you are looking for could not be found." One CTA button leads back to login.
- **Key SAFE actions:** "Go Back to Home" — navigates to `/login`.
- **Key MUTATING/dangerous actions:** None.
- **Important modals/forms:** None.
- **Variant-of:** Unique template (global 404 error page).
- **Broken/empty:** YES — this IS the broken/not-found state. The page title itself is the error. Additionally, logo asset at `/storage/uploads/logo.png` returns 404, and `/assets/custom/style.css` returns 404 — the error page itself has broken assets.
- **UX improvement for the rebuild:** Replace the generic "Opps!!!" error page with a role-aware 404 screen that (a) keeps the family-role chrome/nav intact so the user can orient themselves, (b) suggests likely destinations (e.g., Student Home, Today's Sessions) rather than redirecting to the login page, and (c) properly loads the logo and stylesheet.

---

### `student-profile` — Student Profile  (server error / broken page)

- **Purpose:** Intended to be the student profile page at `/student/profile` for a family-role viewer, but during capture it rendered a server error state instead of real profile content.
- **Key sections / flows:** Single-screen error layout with H4 "Something went wrong, try again later." One CTA navigates back to login. No headings, forms, inputs, tables, or meaningful content were captured.
- **Key SAFE actions:** "Go Back to Home" — navigates to `/login`.
- **Key MUTATING/dangerous actions:** None (error state only; no actions exposed).
- **Important modals/forms:** None.
- **Variant-of:** Unique template (global server error / 500-equivalent page — distinct from the 404 template above by its H4 copy and SVG illustration).
- **Broken/empty:** YES — page failed to load student profile data. The crawler hit a 302 redirect chain from `/management/home` → `/login` → `/student/home`, suggesting auth or session instability caused the profile API/render to fail. Logo (`/storage/uploads/logo.png`) and custom stylesheet also 404 here.
- **UX improvement for the rebuild:** The student profile should be a first-class page for families, showing the linked student's name, grade, enrollment status, attendance summary, and session history. The error state should include a "Retry" action rather than routing the user entirely back to login. Offline/error state should preserve navigation so the user is not stranded.

---

## Module synthesis (this batch)

- **What this module does:** Both pages represent the family-role's access to student-facing routes (`/main/index.html` and `/student/profile`). Neither rendered working content — both hit error states during the crawl (404 and server error respectively). This batch reveals that the family role's routing and auth session handling was broken or incomplete at capture time.

- **Distinct page templates vs variant count:**
  - 2 unique error-state templates captured (404/not-found and 500/server-error).
  - 0 functional pages with real content.
  - 0 variant pages (no query-param/status/scope variants).

- **Cross-cutting interactions:** None observed — both pages are dead-end error screens with a single "Go Back to Home" link pointing to `/login`. No modals, no filters, no tabs, no mutations.

- **Improvements for the new platform:**
  1. **Role-aware error pages:** The rebuild must render role-specific not-found and server-error states that preserve the navigation shell so users can self-recover without being ejected to the login screen.
  2. **Student profile as a core family feature:** `/student/profile` must be a fully designed, data-rich page for the family role — it is conceptually the most important page for parents/guardians and should not be an afterthought. Include: student avatar/name, grade/class, enrollment status, upcoming sessions, recent grades, attendance percentage.
  3. **Broken asset audit:** Both pages share broken logo and custom stylesheet 404s; the rebuild must serve all static assets from a reliable CDN or verified path.
  4. **Auth session stability:** The 302 redirect chain (management/home → login → student/home) observed in network logs suggests the family role's session was not properly established before page capture, causing both pages to fail. Backend must ensure stable family-role auth tokens before frontend integration testing begins.
  5. **RTL readiness:** Both pages use LTR (`lang: en`, `dir: ltr`). The rebuild should support RTL from day one given the platform's Arabic locale support (Arabic flag icon loaded in both network logs).
  6. **Retry / graceful degradation:** Error pages need actionable recovery options — "Retry", "Go to Dashboard", "Contact Support" — not just a redirect to login.

- **Anything needing owner/backend confirmation:**
  - Confirm whether `/student/profile` is intentionally gated for the family role or if the crawl session auth failure was the sole cause of the error.
  - Confirm whether `/main/index.html` is a legacy/dead route or was a real page that has been removed.
  - Confirm the correct "home" route for the family role (the network logs suggest `/student/home` and `/student/today-sessions` are loaded as sub-navigations, implying the family portal is actually the student portal viewed as a parent proxy).
