# Legacy Screenshot Review (Spec 016 — visual evidence record)

Corpus: **1,113 legacy screenshots** (admin 1,019 · teacher 67 · family 27 · student 0) under `output/roles/<role>/screenshots/`, covering 339 captured pages / 178 route templates. Frames below were **visually inspected this session** (not grepped); the crawl-metadata layer (forms/modals/tables per route) supplements them.

## Frames inspected + what each proved

1. **`design-references/sidebar-reference.png`** (current legacy, AR): the control group verbatim — الرئيسية · جدول المعلمين · الدردشة · طلبات جديدة · تحليل الجلسات · محول الوقت · عطلة عامة · الإعلان والإخطار · المهام · الإجراءات المجدولة — plus the 6-icon category rail. Proves the user's sidebar list is the CURRENT legacy IA and anchors the naming unification (الدردشة=المحادثات etc.).
2. **`admin/management-home-full.png`** (EN variant): the ops dashboard — 6+ KPI tile wall (Total/Pending/Attend/Waiting&Running/Cancel/Absent), collapsible Filter Classes, dense classes table with per-row action pills and a literal **"(3.00 Fine)" money fragment on the home table**. Proves: KPI-money-wall + money-fragments-on-ops-surfaces are real legacy patterns → both in the forbidden register; our card-first home already improves this.
3. **`admin/management-salaries-full.png`**: "Teachers Salaries" — 6 pay KPI tiles (Attended/Absent×2/Fixed/Fine-Gift/Total EUR), **Request payouts + Generate Salary buttons**, a 13+-column ledger (Fixed/plus/minus/Fine/Gift/Hour Rate/Total/EUR/Salary Type). Proves the pay-surface shape that stays admin-finance/backendRequired GATE forever and NEVER enters the teacher app.
4. **`family/student-home-full.png`**: the guardian app home — **its own sidebar** (Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library · Logout), hours-gauge hero (Total/Remaining/Taken + Time Spendings), Today's Classes with Request-Trial, Your Teachers panel, pink alert-style empty states ("No sessions today"). Proves: role mini-app-with-sidebar is the legacy IA (the core 016 correction); hours-gauge + trial-request are guardian-home concepts (already carried into 013/014 homes); harsh pink empties → our encouraging `.pt-empty` pattern is the improvement.
5. **Teacher salary hero** (`teacher-home` family, capture-verified in Spec 015's planning): `Your Salary` / `997.00 EGP` / Estimated/Fines/Bonus badges — the #1 excluded surface; re-confirmed unchanged.

## Screenshot-family findings (from filenames + crawl metadata, spot-verified)

- **Finance family** (accounting/transaction×3, invoices ×18 variants, downlaod ×8, monthly-invoices, salaries, staff-salaries, payouts+providers, banks, expense, analysis-invoices/-expenses, settings-payments ×7): fully screenshot-evidenced; uniformly table+KPI surfaces → 025 GATE/LOCK treatments.
- **Settings family** (general, integrations ×11 configure + 2 WhatsApp insights, customisation ×2, notification matrix, security ×2): evidenced; message-builder = 504 → capability GATE, page never cloned.
- **RBAC** (admins-permission ×2): ~170-checkbox matrix — display-only matrix preview + GATE in 026.
- **CRM/leads** (new-requests × stage filters + scheduled-trials): 9-stage funnel evidenced → 021 funnel cards.
- **Teacher app family** (22 templates incl. duplicate history routes, broken profile 500, 404 stubs): evidenced; consolidations already dispositioned in coverage §9.
- **Family app family** (11 templates): evidenced incl. **billing = view-only table, NO pay form in the legacy itself** — our status-only line is stricter than legacy but directionally identical.
- **Student**: zero frames — no legacy student role existed (crawler configured admin/teacher/family; planning docs unanimous). The student surface = the guardian-proxy `student-*` pages above. Our student app is honest net-new value.

## The visual-audit answers (required set)

- **Old structure**: two worlds — a deep admin console (6-category sidebar) + per-role sidebar mini-apps. Idea KEPT; execution redesigned.
- **Sidebar-visible pages**: the six-group list in `admin-sidebar-page-inventory.md` (all classified).
- **Locked pages**: none rendered as locked-UI in legacy — legacy ships **broken (500/504/404)** instead of locked; our LOCK/GATE shells are the honest replacement.
- **«قريبًا» badges**: none found in the legacy crawl (the «قريبًا» inventory is OUR current nav's 29 planned items — replacement plan defined).
- **Ugly-but-useful**: leads funnel, notification matrix, RBAC matrix, availability matcher, time converter, holidays bulk-absence, scheduled actions, expense heads — all kept as capabilities, all redesigned card-first.
- **Table-heavy → card-first**: home classes table, all roster/ledger tables, invoice lists, 7×24 grids (role side).
- **Must stay dedicated pages**: the 021–026 page families per the sidebar inventory.
- **Fold into overviews**: total-queues, schedule request/response inboxes, teachers-details band, forms/students (→ reports family), Subjects (→ materials).
- **backendRequired gates**: everything in the honesty contract's no-fake register — most prominently payroll/payouts, live room, chat send, uploads, integration connects, security/permission saves.
