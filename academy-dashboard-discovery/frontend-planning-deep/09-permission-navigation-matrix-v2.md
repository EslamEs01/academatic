# 09 — Permission & Navigation Matrix (v2)

> Expanded from the exhaustive read. Confirms the v1 matrix and adds verified numbers + the full RBAC picture. Source: `role-permission-matrix.md`, the per‑page RBAC extraction, and `_build/aggregates.json`.

## Three separate role apps, one design system
Verified by URL namespace + nav + shell: **admin** `/management/*` (145 route templates), **teacher** `/teacher/*` (22), **family** `/student/*` (11). Build **one** design system + component library; **three** route trees / nav configs / guards. (Visual shells differ too — see [03](03-screenshot-review.md).)

## Module × role presence (verified page counts)
| Module | admin | teacher | family |
|---|--:|--:|--:|
| Dashboard / Home | 29 | 4 | 3 |
| New Requests (CRM) | ✓ | — | — |
| Students | 26 | 5 | 8 |
| Parents/Guardians/Families | 31 | — | (own) |
| Teachers | 94 | 15 | — |
| Roles/Permissions (admins) | 2 | — | — |
| Courses | 22 | 3 | 1 |
| Classes/Live Sessions | 10 | 5 | 2 |
| Timetable/Schedule | 6 | 1 | 1 |
| Assignments/Tasks | 1 | 1 | — |
| Exams/Quizzes (forms) | 2 | — | — |
| Certificates | 3 | (request) | — |
| Payments/Invoices | 51 | — | 2 |
| Wallet/Finance | 16 | 3 | — |
| Reports/Analytics | 16 | 1 | — |
| Messages/Notifications | 4 | 1 | (notices) |
| Content/Materials/Library | 4 | 1 | 1 |
| Settings | 27 | — | — |
| Profile/Account | 5 | 1 | 1 |
*(page counts are crawl coverage, not feature completeness; a module a role can't reach shows — or "own".)*

## Admin internal RBAC (permission‑data‑driven, not role‑hardcoded)
The `/management/admins/permission/{id}` screen exposes **~170 permissions in 17 groups**, plus a **role** (Manager / Accountant / Supervisor / Support), plus **category scoping** (which student/teacher categories a staff member can see). Groups & counts (verified from the permission page): Dashboard/General 14 · New Requests 6 · Families 24 · Students 21 · Teachers 17 · Search Teacher Schedule 1 · Reports/Analytics 20 · Invoices 15 · Payment Methods 3 · Locations 4 · Materials 4 · Library 4 · Banks 4 · System Settings 6 · Staff Members 7 · Groups 5 · Scheduled Actions 4.

**Frontend implication:** permissions are **data** (a permission set fetched at login) gating not just routes but individual buttons, table columns, tabs, and modals. An Accountant sees Finance, not Settings; a Supervisor sees only their categories' families. Build a `can(permission)` helper consumed everywhere; never hard‑code role checks beyond app selection.

## Unique‑to‑role capabilities (verified)
- **Admin‑only:** CRM/leads, family management, staff/RBAC, course CRUD, all finance (invoices/accounting/expenses/salaries/payouts/banks), settings, materials/library management, certificate templates+approval, broadcast, scheduled actions, public holiday, teacher categories, reports suite, cross‑role chat creation.
- **Teacher‑only:** run/end class, mark absent (+video), request cancel, submit 24‑field monthly report, request certificate, manage availability, own salary + salary‑class report, class history.
- **Family‑only:** request trial (new/existing child), feedback about teacher (per subscription), request cancel/reschedule, upload session files **+ voice recording**, view billing, multi‑child switching.

## Navigation: shared vs separate
**Shared shell primitives (build once):** top bar (global search, notifications, language [10 locales], theme, profile, logout), sidebar shell (grouped, collapsible, pinned **shortcuts** — every role POSTs `/{role}/shortcuts`), breadcrumbs, page header, theme controls (light/dark + brand + the 11 status colors — already a legacy product feature), and the **session‑action modal family** (shared admin+teacher; family has a simpler Request‑Cancel).

**Separate per role:** sidebar contents (3 nav configs — see [13](13-improved-information-architecture-v2.md)); dashboard composition; guard model (admin = permission‑set; teacher/family = role + own‑resource scope); layout density (admin dense, teacher/family mobile‑first).

## Cross‑role flows (keep data contracts aligned across the 3 apps)
1. Certificate: teacher requests → admin approves+delivers. 2. Schedule request: admin broadcasts → teachers respond → admin confirms. 3. Cancel/reschedule: family/teacher requests → admin ledger + makeup/credit + notify. 4. Trial: family/admin → schedule → teacher delivers → feedback both ways. 5. Monthly report: teacher submits → admin/family view. 6. Salary→Payout: admin generates → teacher requests → admin approves → provider. 7. Feedback: family rates teacher → admin KPIs.
