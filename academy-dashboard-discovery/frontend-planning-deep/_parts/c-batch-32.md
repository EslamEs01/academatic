# Batch 32 — teacher · General / Error Pages + Profile

---

### `main-index-html` — "Opps!!!" 404 Error Page  (HTTP 302 → redirect loop → 200 on /teacher/home, served as 404 content)

- Purpose: Generic not-found error page rendered when `/main/index.html` is visited directly; the URL is a crawler artifact of following a sidebar link that resolves to a non-existent route.
- Key sections / flows: Single H1 "Opps!!!" + H4 "This page you are looking for could not be found." + one "Go Back to Home" navigation link. No data, no tables, no forms.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: Shares identical DOM structure, design tokens, and button set with `teacher-main-index-html` and `teacher-course-history-main-index-html` and `teacher-monthly-plans-main-index-html` — all are the same 404 error template triggered by crawler-generated `main/index.html` suffixes
- Broken/empty: YES — 404 content page. Also: logo image returns HTTP 404 (`/storage/uploads/logo.png`). Network log shows redirect chain: `/management/home` → `/login` → `/teacher/home` (200), indicating the crawler resolved auth but then tried the static `.html` path which doesn't exist.
- UX improvement for the rebuild: Implement a proper branded error state with a meaningful back-link pointing to the teacher's actual home dashboard (not `/login`), and include a short explanation so teachers understand why they landed here rather than a cryptic "Opps!!!" heading.

---

### `teacher-course-history-main-index-html` — "Opps!!!" 404 Error Page (Course History variant)

- Purpose: Same 404 error page as above, triggered when the crawler followed a sidebar link from `/teacher/course-history/1/class` and appended `/main/index.html`, which does not exist.
- Key sections / flows: Identical to `main-index-html` — H1 "Opps!!!", H4 not-found message, single navigation link.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: `main-index-html` (same 404 error template; different originating URL only)
- Broken/empty: YES — 404 content page. Logo 404 present. Redirect chain identical.
- UX improvement for the rebuild: Same as above — replace with a contextual error that redirects to `/teacher/course-history` rather than `/login`, preserving teacher navigation context.

---

### `teacher-main-index-html` — "Opps!!!" 404 Error Page (Teacher-scoped variant)

- Purpose: Same 404 error page, triggered from `/teacher/course-history/1` sidebar link resolving to `/teacher/main/index.html` which does not exist.
- Key sections / flows: Identical DOM — H1, H4, one link.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: `main-index-html` (same 404 error template)
- Broken/empty: YES — 404 content page. Logo 404 present.
- UX improvement for the rebuild: Contextual back-link to `/teacher/home` instead of `/login`.

---

### `teacher-monthly-plans-main-index-html` — "Opps!!!" 404 Error Page (Monthly Plans variant)

- Purpose: Same 404 error page, triggered when the crawler followed a sidebar link from `/teacher/monthly-plans/mq==/show` and resolved to `/teacher/monthly-plans/main/index.html`, a non-existent route.
- Key sections / flows: Identical DOM — H1 "Opps!!!", H4 not-found, one "Go Back to Home" link.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: `main-index-html` (same 404 error template)
- Broken/empty: YES — 404 content page. Logo 404 present. Base64-encoded plan ID in the originating URL (`mq==`) suggests plan IDs are base64-encoded in this system.
- UX improvement for the rebuild: Contextual back-link to `/teacher/monthly-plans` and surfacing a "plan not found" message when a plan ID resolves to nothing, rather than a generic 404.

---

### `teacher-profile` — Teacher Profile (error state)

- Purpose: The teacher's own profile page; captured in a broken/error state ("Something went wrong, try again later") rather than showing actual profile data.
- Key sections / flows: Only an H4 error message "Something went wrong, try again later" and a single "Go Back to Home" navigation link are rendered. No profile fields, no form, no avatar, no personal data visible in this capture.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None visible in this error state
- Important modals/forms: None (not rendered in error state)
- Variant-of: unique template (conceptually distinct from the 404 pages — this is a 500/server-error state for a real functional page)
- Broken/empty: YES — error state with "Something went wrong, try again later". Logo also 404. Redirect chain: `/management/home` → `/login` → `/teacher/home` (200), but then the profile API call failed. DOM structure uses `rect`/`circle` SVG elements indicating a skeleton/loading illustration rather than the 404 icon, confirming this is a different error component from the not-found pages.
- UX improvement for the rebuild: Design a dedicated profile error state with retry capability and a meaningful explanation (e.g., network issue vs. auth issue vs. data missing). The actual profile page (when healthy) should expose editable fields for name, contact, avatar, subject/grade assignments — confirm required fields with backend.

---

## Module synthesis (this batch)

**What this module covers and its core entities:**
This batch contains only teacher-role pages, and all 5 were captured in broken states. Four are identical "Opps!!!" 404 error pages produced by the crawler following sidebar/navigation links that contain `main/index.html` path suffixes — these routes do not exist on the server. The fifth (`teacher-profile`) is a real functional page captured in a server error state (500-class), rendering a different error illustration (SVG with circles/rects = skeleton/broken state graphic) rather than an "Opps!!!" 404 heading.

**Distinct page templates vs variant count:**
- 1 unique template: `teacher-profile` (real page, server error state — unique SVG error graphic, distinct heading copy)
- 1 shared 404 error template instantiated in 4 variants: `main-index-html`, `teacher-course-history-main-index-html`, `teacher-main-index-html`, `teacher-monthly-plans-main-index-html` — DOM byte-for-byte identical, only originating URL differs
- Total: 2 distinct templates, 4 variant pages

**Cross-cutting observations:**
- All 5 pages share the same redirect chain at network level: `/management/home` (302) → `/login` (302) → `/teacher/home` (200), meaning the crawler's teacher session correctly resolved auth but could not access the intended sub-routes
- Logo asset (`/storage/uploads/logo.png`) is broken (HTTP 404) across every page in this batch — a systemic asset issue affecting all teacher pages
- The "Go Back to Home" link on the 404 error pages points to `/login` (not `/teacher/home`) — a UX flaw that would log teachers out instead of returning them to their dashboard
- No mutating actions are present in any page in this batch (all error states)
- The monthly-plans originating URL uses base64-encoded IDs (`mq==` in the path) — the rebuild must handle base64 plan IDs or replace with numeric/UUID routing

**Improvements for the new platform:**
1. **Error page system:** Build two distinct error components — one for not-found routes (404) and one for server errors (500/503) — both with role-aware back-links (teacher → `/teacher/home`, not `/login`)
2. **Asset management:** Fix the broken logo asset pipeline; use a CDN-hosted or build-time logo with fallback
3. **Teacher profile:** When healthy, this page likely includes personal info, subject/grade assignments, and possibly a password-change form — design with a two-panel layout (read view + edit mode) and a dedicated error/retry state
4. **Monthly plans URL scheme:** Confirm with backend whether base64-encoded plan IDs are intentional; if so, the rebuild router must decode them; prefer UUID or numeric slugs for cleaner URLs
5. **Sidebar link integrity:** The four 404s were all triggered by sidebar navigation — the rebuild should validate sidebar links at runtime and suppress or grey-out links that resolve to non-existent routes

**Items needing owner/backend confirmation:**
- What fields does the teacher profile expose and which are editable (name, phone, email, avatar, subjects, grades, bio)?
- Are base64-encoded IDs (`mq==`) intentional for monthly plan routes, or a legacy artifact?
- Why does the profile page throw a server error during crawler capture — is it a session/auth restriction or a backend bug?
- What content should the teacher-scoped `main/index.html` routes have served (course history index, monthly plans index) — are these planned but unbuilt pages?
