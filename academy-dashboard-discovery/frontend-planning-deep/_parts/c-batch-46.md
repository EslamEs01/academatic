# Batch 46 — family · Timetable / Schedule

### `student-timetable` — Student Timetable  (HTTP 200)

- Purpose: Displays the student's weekly class schedule in a day-column grid so the family/student can see what sessions are scheduled for each day of the week.
- Key sections / flows: Single 8-column table with columns for `#`, `Saturday`, `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`; a KPI/header card area showing the day columns; notification badge area (0 New / 5 new); header with "View all invoices" quick link to billing; sidebar navigation with links to Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library; language switcher supporting 9 locales (ar, fr, de, es, ur, it, pt, ru, tr); one XHR call to `/student/today-sessions` populating session data.
- Key SAFE actions: View weekly timetable; navigate to billing via "View all invoices"; navigate to any sidebar route (Home, Classes Summary, Courses, Billing, Student Feedback, Library); switch display language.
- Key MUTATING/dangerous actions: "See All Notifications" button (submit type, non-GET form — could mark notifications read or trigger server state change); Logout (POST to `/student/logout`).
- Important modals/forms: Modal 1 captured via dropdown/menu interaction (no named purpose in capture — likely a notification panel or user profile dropdown triggered from the header); no data-entry forms beyond the logout form.
- Variant-of: unique template (sole timetable/schedule page in this batch).
- Broken/empty: Table has **0 rows** — the timetable grid rendered with no session data, indicating either no sessions are scheduled or the data failed to load; logo image 404 (`/storage/uploads/logo.png`); custom stylesheet 404 (`/assets/custom/style.css`).
- UX improvement for the rebuild: The zero-row timetable provides no visual feedback — add a proper **empty state** ("No sessions scheduled this week") with a call-to-action or teacher contact link; also replace the flat day-column table with a responsive week-view grid that stacks to a day-picker on mobile and supports RTL day ordering for Arabic locale.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch contains a single page from the **family/student portal** covering the **Timetable / Schedule** module. The core entity is the student's weekly schedule — a grid of days × time slots showing which classes (sessions) are booked. Supporting entities referenced via navigation include billing invoices, course lists, feedback, and library resources.

**Distinct page templates vs variant count:**
- 1 unique template (`student-timetable`); 0 variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Header notification panel (dropdown/menu interaction captured) — "See All Notifications" submit button is flagged unsafe (potential server mutation; must not be auto-fired).
- Logout POST form — dangerous (session termination).
- Language switcher — safe navigation, but switching locale mid-session should preserve the current route.
- No filters, tabs, or date-range selectors are present on this page (daterangepicker and flatpickr CSS/JS are loaded but appear unused in this render, suggesting dynamic filtering may be intended but not yet surfaced in the captured state).

**Improvements for the new platform:**
1. **Empty/error states:** The timetable grid with 0 rows must show a clear empty state explaining why no data appears and what the student/parent should do.
2. **Responsive week-view:** Replace the plain HTML table with a CSS-grid week view that collapses gracefully to a day-tab selector on mobile — critical for family use on phones.
3. **RTL-first day ordering:** For Arabic locale, days should render right-to-left (Friday → Saturday) to match natural reading direction.
4. **Session detail on click:** Each timetable cell should open an accessible modal (focus-trapped, Escape-closable, role=dialog) showing session details (teacher, subject, room, meeting link) instead of a bare table cell.
5. **Loading skeleton:** Since data is fetched via XHR (`/student/today-sessions`), add a skeleton loader to prevent a confusing empty grid flash.
6. **Notification action safety:** The "See All Notifications" submit should be a safe GET navigation or at minimum require no confirmation — but it must not auto-fire; ensure it is clearly labeled and not styled as a primary action.
7. **Asset hygiene:** The missing logo (`logo.png`) and custom stylesheet cause silent visual degradation — the rebuild should serve all assets from a versioned CDN with fallbacks.
8. **Sidebar hierarchy:** "Schedule" is a top-level sidebar item but leads to a minimal page — consider nesting it under a "My Learning" section alongside Classes Summary and Courses for better information architecture.

**Anything that needs owner/backend confirmation:**
- Why does `/student/today-sessions` return no data — is this a test-environment data gap or a production issue?
- The `daterangepicker` and `flatpickr` libraries are loaded but no date filter UI is visible — confirm whether date-range filtering is a planned but unimplemented feature or was removed.
- The "See All Notifications" button's actual server action must be confirmed before assigning it a safe/unsafe classification in the rebuild.
- Confirm which day is the week start (Saturday is column #2, Sunday is #3 — Middle-East calendar convention) so the rebuild week-view is configured correctly per locale.
