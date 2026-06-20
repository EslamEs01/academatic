# Batch 41 — family · Dashboard / Home

---

### `management-home` — Home  (HTTP 302 → student/home)

- **Purpose:** Entry-point route for the family role; immediately redirects (302) to `/student/home`, so there is no distinct management home page — it is purely a redirect alias.
- **Key sections / flows:** After redirect lands on the student dashboard: greeting card with student name + hour-budget summary (Total Hours / Remaining Hours / Hours Taken, all 0 in this capture); "Today's Classes" card with a "No sessions today" empty state + Request Trial CTA + Show More link; "Your Teachers" card showing an empty teachers table ("No Teachers"); notification badge in header (0 New, 5 new counts visible).
- **Key SAFE actions:** "View all invoices" → `/student/billing`; "Request Trial" → `/student/request-trial`; "Show More" → `/student/today-sessions`; sidebar navigation links (Schedule, Classes Summary, Courses, Billing, Student Feedback, Library).
- **Key MUTATING/dangerous actions:** "See All Notifications" (button type=submit on a form — could POST); logout form (POST to `/student/logout`).
- **Important modals/forms:** Modal 1 was captured via interaction (dropdown_or_menu trigger, stays on same URL) — likely a notifications or user-menu dropdown; no meaningful data-entry form beyond the hidden logout form.
- **Variant-of:** unique template (redirect alias, but the landing content is the same as `student-home`)
- **Broken/empty:** Logo 404 (`/storage/uploads/logo.png`); custom stylesheet 404 (`/assets/custom/style.css`); all KPI values are 0 (empty/no-data state — this is live data, not a broken page); Teachers table shows "No Teachers" empty state; Today's Classes shows "No sessions today".
- **UX improvement for the rebuild:** Replace the three separate "0 / 0 / 0" hour counters with a single visual progress ring or horizontal bar showing consumed vs. remaining hours, making the budget status immediately scannable at a glance.

---

### `student-home` — Student Home  (HTTP 200)

- **Purpose:** The actual family/student dashboard — the canonical landing page after the redirect from `/management/home`; shows a holistic summary of the enrolled student's current status.
- **Key sections / flows:** Header with notification bell (0 New badge), language switcher (9 languages), "View all invoices" quick-link, and user avatar with profile dropdown; sidebar with 8 navigation items (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout) plus a "Dashboard 1" legacy link; main content has three widget cards: (1) student greeting + hour budget (Total / Remaining / Taken, displayed as "0/0 H"), (2) Today's Classes with empty state + "Request Trial" CTA + "Show More" to `/student/today-sessions`, (3) Your Teachers table (empty). One XHR/fetch call observed indicating live data loading.
- **Key SAFE actions:** All sidebar nav links; "View all invoices"; "Request Trial" (navigate to trial request form); "Show More" (navigate to today's sessions list); language switcher links; "My Profile" → `/student/profile`; profile-edit → `/student/profile-edit`.
- **Key MUTATING/dangerous actions:** "See All Notifications" (submit button on form — may mark notifications read/POST); logout POST form.
- **Important modals/forms:** Interaction 0 shows a dropdown_or_menu firing (stays on `/student/home`) — inferred to be the notifications panel or user-account menu dropdown. No destructive modal visible in this state.
- **Variant-of:** unique template (this is the canonical student home; `management-home` is just a redirect to it)
- **Broken/empty:** Logo 404; custom stylesheet 404; all hour values are 0 and teachers/sessions tables are empty (live data state — student has no active packages or sessions in this snapshot); "Dashboard 1" sidebar link points to a separate legacy `main/index.html` route (dead-end / legacy).
- **UX improvement for the rebuild:** The "Request Trial" CTA buried inside an empty-state card is easy to miss; for zero-state users (no active package), show a prominent onboarding banner or step-by-step setup wizard (e.g. "Start here: Book a trial lesson") at the top of the dashboard to drive conversion instead of relying on the small card link.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The family-role dashboard is a lightweight student overview hub. Core entities: enrolled Student (one per family session), Hour Budget (total/remaining/taken hours), Today's Sessions list, Teacher roster. The dashboard is read-only in normal operation; the only write surfaces are notification dismissal and logout.

**Distinct page templates vs variant count:**
- Unique templates: **2** (`management-home` as redirect alias + `student-home` as the real page)
- Effective rendering templates: **1** — both slugs deliver identical DOM/content; `management-home` is a server-side redirect to `student-home` with no distinct layout.
- Variant pages: **1** (management-home is just an alias variant)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Notifications dropdown (triggered on both pages, stays in-place) — moderate risk if it POSTs a mark-as-read; the "See All Notifications" button is flagged unsafe.
- Logout form (POST) — dangerous, must always require explicit user intent; do not auto-fire.
- "Show More" navigates to `/student/today-sessions` (safe, read-only).
- No filters or tabs observed in the dashboard widgets themselves.

**Improvements for the new platform:**
1. **Redirect elimination:** Map `/management/home` directly to the family dashboard route at the router level; avoid the double 302 redirect chain that adds latency.
2. **Hour budget visualization:** Replace raw 0/0/0 number cards with a progress indicator (ring, bar) — far more scannable for parents checking quickly on mobile.
3. **Zero-state onboarding:** When all values are 0 (no package purchased), show a contextual onboarding card with a primary CTA ("Book your first trial") above the fold instead of embedding it inside an empty sessions card.
4. **Notifications:** The "See All Notifications" submit button should be converted to a safe GET navigation link to the notifications page, or if it must POST (mark-as-read), protect it with a visible confirmation or at minimum debounce.
5. **Logo 404 fix:** The logo image asset is missing server-side; rebuild should use a correct path or fallback SVG placeholder.
6. **Legacy "Dashboard 1" link:** Remove or gate this orphan link (`/main/index.html`) — it points to an old UI and will confuse family users.
7. **RTL/i18n:** The page is LTR but links to Arabic, Urdu, and other RTL language options. The rebuild must implement a full RTL layout switch (flex-direction, text-align, icon mirroring) when the user selects an RTL language — the current app does not appear to handle this.
8. **Mobile:** The three-card layout should collapse to a single-column scroll on small viewports; the hour-budget card and today's-classes card are priority content for mobile parents.
9. **Accessibility:** The logout form uses hidden inputs with no ARIA; the notifications button has no aria-label; implement proper roles and keyboard navigation for all interactive elements.
10. **Teacher card empty state:** Rather than a bare table with "No Teachers" row, show a friendly empty-state illustration with guidance (e.g., "Your teacher will appear here once a session is scheduled").

**Needs owner/backend confirmation:**
- What does the "See All Notifications" button actually POST? Is it mark-as-read, or just a navigation wrapped in a form? Confirm so the rebuild can safely convert it to a GET link.
- Is the hour budget (0/0/0) always per-student-enrollment, or per-subject/course? The display label "Time Spendings" is ambiguous — confirm data model before designing the budget widget.
- The "Request Trial" link and the trial-booking flow scope: does this create a new booking record (mutating)? Confirm so the rebuild can gate it appropriately (e.g., disable if trial already requested).
- The "Dashboard 1" legacy link: can it be safely removed from the sidebar for the family role?
