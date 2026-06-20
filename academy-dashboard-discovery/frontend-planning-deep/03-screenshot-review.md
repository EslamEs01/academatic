# 03 — Screenshot Review

> Visual review of the captured screenshots. Because there are **1,113 PNGs** (339 full‑page + 774 interaction), I generated **49 contact sheets** with Pillow (`_build/build_contact_sheets.py` → `contact-sheets/`, index in `contact-sheets/_index.json`) and reviewed them group‑by‑group. Screenshots are legacy reference only — **not reproduced** in the rebuild.

## Method & honesty
- **Full‑page sheets (38):** every one of the 339 full‑page screenshots is tiled (top‑cropped thumbnail, labeled by slug), grouped by role+module. Broken pages flagged red (HTTP≠200).
- **Modal/dialog sheets (3):** the 47 `modal_or_dialog` interaction captures (real opened dialogs) tiled together.
- **Visually inspected in detail this pass:** admin Dashboard/Home, admin Students (list+detail+forms+status variants), admin Reports/Analytics, admin Roles/Permissions, admin Wallet/Finance, admin Timetable/Schedule, admin Certificates, teacher Dashboard/Home, family Dashboard/Home, modal sheet 1. These span **every distinct visual archetype**.
- **Remaining sheets** (Teachers ×5, Payments ×3, Families ×2, Courses ×2, Settings, Classes, Content/Library, Messages, Profile, Timetable, Roles, plus teacher/family per‑module sheets, modal sheets 2–3): confirmed as **pattern‑equivalent variants** of the archetypes below (the structured data in [01](01-completeness-ledger.md)/[02](02-all-pages-expanded-inventory.md) corroborates sameness). All 49 sheets are on disk for the owner to inspect.

## Role shells (3 distinct)
- **Admin** — fixed **purple left sidebar** (icon + label, grouped, scrollable; ~40 entries), sticky **top bar** (logo, global search, a cluster of action icons, notification bell, avatar). Content = breadcrumb + page title + a **row of multi‑colored KPI tiles** + dense **data tables** with collapsible filter areas. High information density.
- **Teacher** — narrow icon sidebar (Home/Chat/Schedule/Students/Library/Tasks[+New badge]/Logout). Content leads with a **banner "hero" card** holding 3–4 circular KPI metrics + the teacher's avatar/name centered, then a **salary card** (estimated/fines/bonus), then **Today's Classes** table. Lighter, friendlier than admin.
- **Family/Student** — same banner‑hero pattern (Total/Remaining/Taken hours + "Time Spendings" gauge + child's name, shown **in Arabic** — confirms RTL content in an LTR shell), then "Today's Classes" + "Your Teachers" cards with **pink empty‑state banners** ("No sessions today"). Sidebar: Home/Schedule/Classes Summary/Courses/Billing/Student Feedback/Library/Logout. Orange avatar accent.

## Page archetypes observed
1. **List/index** — KPI/status cards on top (often clickable filters), then a wide table; filters in a collapsible bar; per‑row colored action buttons/menu; pagination at bottom. (students, teachers, families, courses, invoices, payouts.)
2. **Tabbed detail** — banner header (name + status badge + action menu) over a multi‑tab body (up to 8 tabs), each tab a set of cards/tables. (student/family/teacher/course detail — the largest sanitized HTML, 330–380 KB.)
3. **Create/Edit form** — sectioned cards, labeled fields, select2 dropdowns, flatpickr dates, a Save/Submit footer. (create family/student/teacher/course/invoice.)
4. **Analytics dashboard** — KPI tiles + **ApexCharts** (pie/donut/bar/line) + a **country world‑map**; date/month filters + Current/Last Month quick buttons. (analysis‑student/course/invoices/expenses, sessions‑analysis, accounting.)
5. **Wizard/builder** — request‑trial (stepper), request‑schedule (type → details → teacher select‑all → Send), form builder, **certificate designer** (canvas preview + properties panel: font/style/size/color/alignment/X‑Y‑W‑mm + merge fields), permission matrix (grouped 4‑col checkboxes + search + select‑all).
6. **Modal/dialog** — centered Bootstrap dialogs (header / body / footer), **purple primary + yellow/amber secondary** buttons; the session‑action family (Attend/Absent/Cancel/Edit/Queue/WhatsApp/Feedback), Direct Links, Timetable, New Transaction, etc. Many are tall and field‑dense.
7. **Calendar/timetable** — 7‑day weekly grid with session blocks (all‑teachers timetable); availability editor.
8. **Error/empty** — "Opps!!!" 404, "Something went wrong" 500, gateway‑timeout; empty lists show a centered icon + "No data found" or a pink banner.

## Broken pages confirmed visually / by status (13)
`management-export-course` (500), `management-families-feedback-family-1` (500), 2× `management-new-requests-scheduled-trials-index-*` (500), `management-settings-customisation-message-builder` (504), `management-teachers-1-monthly-classes` (500), teacher `main-index-html`×3 variants (404) + `teacher-profile` (500), family `main-index-html` (404) + `student-profile` (500). (Full list in [01](01-completeness-ledger.md).)

## Screenshot index
- `contact-sheets/_index.json` — which slugs are on each sheet.
- 38 `full__{role}__{module}[__n].png` + 3 `modals__n.png`.
- Per‑page full screenshots remain at `output/roles/{role}/screenshots/{slug}-full.png`; interaction captures at `{slug}-NNN-page-interaction-NNN.png`.
