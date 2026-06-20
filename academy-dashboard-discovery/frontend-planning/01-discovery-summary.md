<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **18-final-deep-planning-summary.md (exhaustive read of all 339 pages)**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 01 — Discovery Summary

> What the discovery crawl revealed about the legacy academy platform. Source: per‑page reports under `output/roles/*/pages/` plus combined summaries. This is a product/UX reference for building a **new, original** platform — not a description to clone.

## What the platform is

A **multi‑role academy / online‑tutoring management system** (an LMS + CRM + billing/payroll back office). Three audiences log into role‑specific areas:

- **Admin / staff** (`/management/*`) — the operations back office: leads, families, students, teachers, courses, live sessions, scheduling, attendance, finance (invoices, salaries, payouts, expenses), reports, content, communications, and system settings.
- **Teacher** (`/teacher/*`) — a focused teaching workspace: today's classes, run/end/cancel sessions, student rosters, monthly progress reports, certificate requests, personal timetable/availability, salary view, library, chat.
- **Family / guardian** (`/student/*`) — a parent‑operated student portal: child's timetable, today's sessions, course subscriptions, billing, library, request a trial, give teacher feedback, cancel/reschedule a session, upload session files.

The product is **session‑centric**: the atomic unit is a *class/session* with a rich lifecycle (Pending → Waiting → Running → Attended / Absent (student|teacher) / Cancelled (student|teacher|admin) → Reschedule / Make‑up / Add‑to‑Credit), and almost every module hangs off that lifecycle (attendance, salaries, invoices, credits, feedback, notifications). Strong cross‑cutting themes: **multi‑timezone** (student vs teacher time on every scheduled action), **multi‑currency** (16 currencies, AED base, editable FX rates), and **WhatsApp/Email notifications** woven through nearly every workflow.

## Roles & coverage at a glance

| Role | Area prefix | Pages visited | Discovered | Modules touched | UI language captured |
|---|---|---|---|---|---|
| Admin | `/management/*` | 300 | 365 | 19 | en / LTR |
| Teacher | `/teacher/*` | 26 | 37 | 13 | en / LTR |
| Family/guardian | `/student/*` | 13 | 24 | 9 | en / LTR |
| **Total** | — | **339** | — | 19 (admin superset) | en / LTR (1 page unspecified) |

- 0 failed pages, 0 failed interactions, 0 login redirects, 0 captured value leaks.
- Admin's 300 is a **page‑budget cap**, not the whole site: ~65 more routes were discovered‑but‑not‑visited (deep long‑tail — further sort/filter/pagination/per‑entity variants).
- The **unique page *templates*** are far fewer than 339. After collapsing query‑param variants, the admin back office is roughly **~70–80 distinct page templates**; teacher ~18; family ~12. See [03-role-page-inventory.md](03-role-page-inventory.md).

## Modules discovered (19)

Canonical module set (admin is the superset; teacher/family are subsets):

Dashboard/Home · New Requests (leads/CRM) · Students · Parents/Guardians/Families · Teachers · Staff/Admins · Roles/Permissions · Courses (enrollments) · Classes/Live Sessions · Timetable/Schedule · Attendance (embedded in sessions) · Assignments/Tasks (Tickets) · Exams/Quizzes (thin — see note) · Certificates · Payments/Invoices · Wallet/Finance (accounting, expenses, salaries, payouts) · Reports/Analytics · Messages/Notifications (chat, broadcast, notification routing) · Content/Library + Materials · Settings (general, integrations, security, customisation) · Profile/Account · Error/Utility pages.

Full grouping in [02-product-module-map.md](02-product-module-map.md).

## Scale of UI surface (crawler tallies — pre‑dedup)

| Component | Total | Admin | Teacher | Family |
|---|---|---|---|---|
| Buttons | 5,606 | 5,273 | 286 | 47 |
| Forms | 1,713 | 1,612 | 80 | 21 |
| Tables | 345 | 323 | 14 | 8 |
| Cards | 1,895 | 1,827 | 50 | 18 |
| Filters | 1,962 | 1,908 | 40 | 14 |
| Tabs | 395 | 393 | 0 | 2 |
| Modals | 1,373 | 1,280 | 77 | 16 |
| Badges/status chips | 2,424 | 2,292 | 105 | 27 |
| Dropdown triggers | 566 | 532 | 22 | 12 |

These inflate because global chrome (search, "Add shortcuts", logout, notification bell) and the same class‑action modal set repeat on every session page. The **distinct** component library is ~25–30 components ([05-component-inventory.md](05-component-inventory.md)) and the **distinct** modal set is ~30–40 dialogs ([06-interactions-and-states.md](06-interactions-and-states.md)).

## Interactions exercised (read‑only, safe)

dropdown/menu 551 · accordion expand 104 · navigation 59 · modal/dialog 47 · no‑visible‑change 11 · tab change 8 · inline state change 5. Modals captured: 1,373. **Unsafe controls deliberately skipped: 3** (real logout + two `student/{id}/suspend`). Safe controls skipped: 3.

## Honest notes: broken / empty / skipped

**Broken in the reference app (rebuild from scratch, do not reverse‑engineer behaviour):**
- `/teacher/profile` → **HTTP 500**; `/student/profile` → **HTTP 500** (the *view* profile pages are broken; only `profile-edit` works for both roles).
- `/main/index.html` and three deep `*/main/index.html` variants → **404** ("Opps!!!"), caused by a relative sidebar link ("Dashboard 1") — a bug to drop entirely.
- `/management/settings/customisation/message-builder` → **504 Gateway Timeout** (no UX reference; feature must be redesigned blind).
- `/management/export-course` → server error page.

**Failed download/export endpoints (file responses, not pages):**
- `/management/invoicesexportdata` and `/management/courseclasses/export-class/1` failed during crawl — they trigger file downloads. The invoice list's "Download"/"Export" links (the `downlaod` slug — a typo preserved in the route) belong here. Treat exports as proper endpoints to design in the rebuild.

**Empty in test data (column set known, rows inferred):** forms list, certificate templates (`/pdf`), certificate requests, tickets (all KPIs 0), most finance ledgers, banks, heads, groups, several teacher/family lists.

**Deliberately skipped (safety):** all `/management/lang/*` locale switches (would mix locales — this is why only English was captured), all `/logout`, `student/{id}/suspend` destructive GETs, auth pages.

## Key product facts to carry forward

- **Session lifecycle** is the spine. Statuses: Pending, Waiting, Running, Attended, Student Absent, Teacher Absent, Student Cancel, Teacher Cancel, Admin Cancel, Reschedule, Make‑up (11 status colors are even configurable in settings).
- **Make‑up / credit model**: cancelled/absent sessions can be Auto‑Makeup, Rescheduled, No‑Makeup, or **Add‑to‑Credit** (a family credit pool consumable by students).
- **Dual‑timezone everywhere**: every reschedule/cancel/edit modal asks "Student Timezone vs Teacher Timezone".
- **Dual‑rate billing**: each course carries a *family hour rate* (billing) and a *teacher hour rate* (payout), each "inherit from profile" or "custom".
- **Course types (4)**: Monthly Subscription, Hours per Course, Hours Subscription, Number Session.
- **Finance depth**: invoices (with adjustments/instalments), accounting transactions (session/invoice/salary), expenses (income+outcome with heads), teacher & staff salary generation, payout requests→approval→provider (Paymob/Payoneer), multi‑currency with editable FX.
- **CRM funnel**: New Requests with 9 stages (New → Contacted → Qualified → Trial Taken → No Response → Duplicated → Trial Missed → Scheduled → Teacher).
- **Granular RBAC**: a single staff permission screen exposes **~170 permissions across 17 groups**; staff also have roles (Manager/Accountant/Supervisor/Support) and category‑scoped visibility.
- **Communications**: in‑app multi‑role group chat; dashboard+WhatsApp broadcast ("Advertise & Notify"); a ~47‑field notification routing matrix (per event × per role × per channel WhatsApp/Email/App/Private).
- **Customisation/theming already a product feature**: brand colors, light/dark/system theme, layout/sidebar/card style toggles, and 11 per‑status colors — a strong signal that our themeable, light/dark, RTL design system aligns with how the product is used.
