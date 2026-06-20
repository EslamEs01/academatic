<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **13-improved-information-architecture-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 08 — Improved Information Architecture

> A **better** IA for the new platform — not a mirror of the legacy sidebar (which is long, flat, and inconsistently grouped). Business meaning is preserved; grouping, naming, and hierarchy are improved. Naming is original and generic (no legacy labels). Three role apps share one shell.

## Problems with the legacy IA (to fix)
- **One giant flat admin sidebar** (~40 links) mixing operations, people, finance, content, and settings without clear sections.
- **Duplicated/oddly named items** ("Teachers" appears 3× → list, add, details; "Courses List" actually = Materials; "Classes Summary" = history; the `downlaod` typo route).
- **Query‑param pages treated as separate destinations** (status/scope/sort variants) instead of in‑page filters.
- **Hidden filters**, all‑at‑once tab loading, broken nav entries ("Dashboard 1"), and broken profile views.
- **Finance scattered** across ~10 sidebar entries with overlapping concepts (accounting vs transactions vs invoices vs analysis).

## Principles for the new IA
1. **Role‑first:** three apps (Admin, Teacher, Family) on one design system; each has its own focused nav.
2. **Group by job‑to‑be‑done**, max 2 levels deep, ~6–8 top groups per role.
3. **List → Detail → Action**, consistently. Status/scope/sort/page = **in‑page state in the URL**, never separate nav items.
4. **Progressive disclosure:** dashboards summarise; details lazy‑load tabs; advanced filters behind a toggle.
5. **Search‑first** for power users (omni search + recent + pinned shortcuts).
6. **Every destination reachable ≤3 clicks**; primary create actions live on their list's header.

---

## Admin app — proposed IA (8 groups)

```
🏠 Overview
   • Today (ops dashboard: KPIs + today's sessions)
   • Sessions Analysis
   • Reports & Analytics  (Students · Courses · Invoices · Profit & Loss · Teacher Performance · Classes KPI · Forms)

👥 People
   • Leads (CRM)         (funnel stages as in-page filter; lead detail; convert)
   • Families            (list w/ status+advanced filter → 8-section detail)
   • Students            (list w/ status filter → tabbed detail)
   • Teachers            (list w/ scope+sort → tabbed profile; categories; performance; compensations)
   • Staff & Access      (staff list; roles; permission matrix; activity)

📚 Learning
   • Courses (Enrollments)
   • Sessions / Live Classes   (incl. groups)
   • Timetable               (all-teachers calendar · availability search · schedule requests)
   • Attendance              (review/aggregate; mostly acted on inside sessions)
   • Materials (Subjects)
   • Library (Content)
   • Certificates            (templates · requests)

💰 Finance
   • Dashboard (Accounting + currency rates)
   • Invoices                (list · create · monthly · adjustments)
   • Transactions
   • Expenses                (+ heads)
   • Payroll                 (Teacher salaries · Staff salaries)
   • Payouts                 (requests · providers)
   • Banks

💬 Communication
   • Chat
   • Announcements / Broadcast
   • Notification Center (history)

⚙️ Settings
   • General (Identity · Teaching rules · Class automation · Security/2FA)
   • Integrations (Payments · Payouts · WhatsApp · Email)
   • Notifications (routing matrix)
   • Customisation (theme · status colors)
   • Data (import · backup · policies)
   • Payment methods · Locations

🛠 Tools
   • Tasks / Tickets
   • Scheduled Actions (automation)
   • Time Zone Converter

👤 Account  (topbar menu)
   • Profile · Shortcuts · Language · Theme · Logout
```

**Key regroupings vs legacy:**
- **Finance** consolidated from ~10 flat entries into one group with logical subsections.
- **People** unifies the human entities; **Learning** unifies course/session/schedule/content/certs.
- **Reports** centralised under Overview (was scattered: KPIs, Classes KPI, Monthly Performance, Data Analysis, monthly reports).
- **Materials** renamed from the misleading "Courses List"; **Classes Summary** → history within session/student details.
- Status/scope/sort variant pages **disappear from nav** and become filters.

## Teacher app — proposed IA (mobile‑first, 5 areas)
```
🏠 Today            (classes today + run/end/cancel/edit; hours & salary snapshot)
📅 Schedule         (weekly calendar · my availability)
👥 My Students      (roster · history · monthly progress reports · request certificate)
💬 Chat
📚 Library
💰 Earnings         (salary · salary-class report)
👤 Account          (profile/edit · password · shortcuts · language · theme)
```
- Drop broken `/teacher/profile` view; consolidate the two duplicate history routes into one "Class History".
- Surface "pending monthly reports" as a Today/notification item (legacy hid it behind the bell).

## Family / Guardian app — proposed IA (parent‑friendly, 6 areas)
```
🏠 Home             (child summary, today's classes, quick actions)
📅 Schedule         (weekly timetable)
🎓 Courses          (subscriptions per child + course feedback)
🗓 Classes          (today's sessions: join · request cancel · upload files/voice · history)
💳 Billing          (invoices + status + pay — confirm pay flow with owner)
📚 Library
⭐ Feedback & Meetings
👤 Account          (profile/edit · password · child switcher · language · theme)
```
- **Multi‑child switcher** as a first‑class control (top of app), since the account is guardian‑operated with multiple children.
- Drop broken `/student/profile` view; build a real one from the edit fields.
- "Classes Summary"/"Student Feedback" renamed for parent clarity.

## URL / routing conventions (new)
- `/{app}/{section}/{entity?}/{id?}` with **filters/sort/page/tab in the query string** (e.g. `/admin/people/teachers?scope=active&sort=name&page=2`).
- Decode legacy base64 IDs (`MQ==`) transparently; never expose them.
- Use **absolute paths** (kills the `main/index.html` 404 bug).
- Role apps are separate route trees behind role/permission guards; deep links respect guards with a proper denied/redirect state.

## Cross‑app coherence
The 7 cross‑role flows (certificate, schedule request, cancel/reschedule, trial, progress report, salary→payout, feedback — see [04](04-permission-and-navigation-matrix.md) §6) must share status vocabulary and notification semantics across the three apps even though their UIs differ. Keep one canonical **status‑color map** and one **notification model** in the shared layer.
