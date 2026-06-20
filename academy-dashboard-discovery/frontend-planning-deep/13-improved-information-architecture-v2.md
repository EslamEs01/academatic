# 13 — Improved Information Architecture (v2)

> Confirms v1 ([../frontend-planning/08-improved-information-architecture.md](../frontend-planning/08-improved-information-architecture.md)) and tightens it with verified numbers + the exhaustive read's interaction findings.

## The core IA move (verified)
339 captured pages = **178 route templates** (admin 145 / teacher 22 / family 11), and the legacy admin sidebar is **~40 flat links**. The rebuild:
1. **Collapses variants into stateful pages** — scope/status/sort/date/pagination become **URL query state on one list**, not separate destinations. (E.g. ~60 teacher scope/sort pages → 1 list; ~25 invoice variants → 1 list; family/student status segments → 1 list each.)
2. **Regroups the flat sidebar into ≤8 job‑based sections** per role.
3. **List → Detail → Action** consistently; advanced filters behind a toggle; **clickable sort headers** (not URL links); **row‑action menus** (not 3–6 pills).

## Admin IA (8 groups)
`Overview` (Today · Sessions Analysis · Reports) · `People` (Leads/CRM · Families · Students · Teachers · Staff & Access) · `Learning` (Courses · Sessions/Live Classes · Timetable · Attendance · Materials · Library · Certificates) · `Finance` (Accounting · Invoices · Transactions · Expenses · Payroll · Payouts · Banks) · `Communication` (Chat · Announcements · Notification Center) · `Settings` (General · Integrations · Notifications · Customisation · Data · Payment methods · Locations) · `Tools` (Tasks · Scheduled Actions · Time Zone Converter) · `Account` (topbar). Full tree in v1 [08](../frontend-planning/08-improved-information-architecture.md).

**Regroupings vs legacy:** Finance consolidated from ~10 flat entries → one group; Reports centralised; Materials renamed (was "Courses List"); `tickets`→**Tasks**; `downlaod` typo dropped; status/scope/sort pages leave the nav entirely (become filters).

## Teacher IA (5 areas, mobile‑first)
`Today` (run/end/cancel/edit classes) · `Schedule` (calendar + availability) · `My Students` (roster · **single consolidated** history · monthly reports · request certificate) · `Chat` · `Library` · `Earnings` (salary · salary report) · `Account`. Drop broken `/teacher/profile` view (rebuild); remove "Dashboard 1" 404; surface "pending monthly reports" on Today (legacy hid it behind the bell).

## Family IA (6 areas, parent‑friendly)
`Home` · `Schedule` · `Courses` (subscriptions + feedback) · `Classes` (today: join · request cancel · upload/voice · history) · `Billing` (confirm pay flow) · `Library` · `Feedback & Meetings` · `Account` (with **multi‑child switcher** as a first‑class top control). Drop broken `/student/profile` view; rebuild.

## Routing conventions
`/{app}/{section}/{entity?}/{id?}` with filter/sort/page/tab in the query string · decode legacy base64 IDs transparently · **absolute paths** (kills the `main/index.html` 404 bug) · role apps = separate guarded route trees · proper denied/redirect state.

## Cross‑app coherence
The 7 cross‑role flows (certificate, schedule request, cancel/reschedule, trial, progress report, salary→payout, feedback — [09](09-permission-navigation-matrix-v2.md) §cross‑role) share one **status vocabulary** and one **notification model** in the shared layer, even though the three apps' UIs differ.

## New IA‑level fixes (from exhaustive read)
- Rename `/tickets`→**Tasks** with a visible Create action (legacy had none surfaced).
- Distinguish **"none yet"** vs **"no match"** empty states per list.
- Fix **i18n key leaks** (`messages.Materials`, `messages.Inactive Families`, `messages.Stopped Families`, `messages.Create Feedback Categories`, `messages.Inactive Teachers`) via typed i18n.
- Context‑aware controls (hide status sort on single‑scope lists; Re‑activate on Inactive lists).
