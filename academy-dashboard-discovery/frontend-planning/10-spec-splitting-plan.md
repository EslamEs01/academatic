<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **15-spec-splitting-plan-v2.md & 19-spec-coverage-map.md (every page→spec, verified)**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 10 — Spec‑Splitting Plan

> The rebuild is split into **many small specs**, run through our normal spec‑kit workflow one at a time — **not one giant spec**. This follows the suggested 001–012 split, refined with discovery findings. Each spec lists scope, pages, components, interactions, acceptance criteria, dependencies, and an explicit **NOT in this spec** boundary. **Coverage rule:** every discovered page template ([03](03-role-page-inventory.md)) and every distinct interaction ([06](06-interactions-and-states.md)) must land in exactly one spec; Spec 012 verifies this.

**Build order rationale:** foundation → admin shell → admin data modules (people → learning → finance → comms) → teacher portal → family portal → settings/account → QA. Admin first (richest, defines most components); teacher/family reuse the shell + component library. Within admin, simple list/detail before complex dashboards; entities before things that depend on them (Family/Student before Courses before Sessions before Finance).

Sizing note: 002, 005, 007 are the heaviest; if any feels too big when we get to it, split it (e.g. 007 → Invoices spec + Payroll/Payouts spec). Keep each spec shippable in one focused pass.

---

## Spec 001 — Frontend Foundation + Design System + App Shell
**Scope:** Project scaffold (Tailwind compiled, no CDN; native‑JS module structure; build tooling), the **design system** (tokens, palette, type scale, spacing, radii, shadows, light/dark, RTL/LTR plumbing), and the **app‑shell primitives**.
**Pages:** none (foundation). A component/style gallery page for internal review only.
**Components:** AppShell, Sidebar (data‑driven), Topbar, Breadcrumbs, PageHeader, ThemeSwitcher, LanguageSwitcher, GlobalSearch (shell only), ShortcutsWidget, plus base primitives: Button, FormField, Select, Modal, Drawer, Dropdown, Tabs, Accordion, Toast/ConfirmService, StatusChip, KpiCard, DataTable (base), Pagination, EmptyState/Loading/Error states, Avatar.
**Interactions:** theme toggle, locale/RTL switch, sidebar collapse, modal/drawer/dropdown/tab/accordion mechanics, toast + confirm service, responsive shell.
**Acceptance criteria:** shell renders in light+dark and LTR+RTL with no hard‑coded colors/directions; all base components keyboard‑accessible (focus trap, Esc, ARIA) and AA‑contrast; Tailwind builds locally (no CDN); design tokens centralised; one nav‑config powers the sidebar; no dead buttons in the gallery.
**Dependencies:** none.
**NOT in this spec:** any business page, any real data/API, role logic, charts, calendar, certificate/canvas, chat.

## Spec 002 — Admin Shell + Dashboard + Global Components + Reports skeleton
**Scope:** Admin app frame (route tree, role/permission guard scaffold consuming a permission set), the **Today** ops dashboard, global components that recur everywhere, and the analytics/chart foundation.
**Pages:** Admin Today (KPIs + today's sessions), Reports/Analytics shells (Students, Courses, Invoices, P&L, Teacher Performance, Classes KPI), Sessions Analysis. (Dashboard/Home + Reports modules.)
**Components:** Chart (line/bar/pie/donut + geo map), advanced DataTable (server sort/filter/paginate, row‑action menu, bulk select, sticky col), FilterBar (+ active‑filter chips), Timeline/ActivityLog, MetricGauge, permission‑aware rendering helper.
**Interactions:** dashboard filters; KPI‑card‑as‑filter; chart tooltips; URL‑driven filter/sort/page state; permission‑gated buttons/columns.
**Acceptance criteria:** admin shell guards routes by permission set; Today dashboard shows the 8 KPI tiles + today's session table with a per‑row action **menu** (actions open stub modals, no mutation yet); reports render charts in both themes incl. the country map; filter/sort/page reflected in URL; AA + RTL.
**Dependencies:** 001.
**NOT in this spec:** the session‑action mutations (Spec 005), people CRUD (003/004), finance (007), settings (011).

## Spec 003 — Admin: Students + Families + Guardians (+ Leads/CRM)
**Scope:** The people‑who‑pay/learn side. Family is the account root; Student is its child; Leads feed Students.
**Pages:** Families (list+status+advanced finance filter, 8‑tab detail, create, edit, categories+assign, feedback/meetings), Students (list+status, tabbed detail, create, edit, add‑trial, analytics, report forms), Leads/New Requests (funnel, stage list, lead detail, create, scheduled‑trials).
**Components:** MultiSelect/TokenInput, NotificationMatrix (7×2 family prefs), LeadDetailPanel, InvoiceAdjustment & Credits sub‑views (read), ScheduleRepeater (for embedded trial), DefinitionList/InfoCard, status segment tabs.
**Interactions:** status‑segment filtering; advanced filter accordion; 8‑tab lazy detail; suspend/stop/activate/schedule‑stop modals; lead status change + notes; add meeting/report; create/edit forms with validation.
**Acceptance criteria:** every Family/Student/Lead template from [03](03-role-page-inventory.md) §A3–A4/A2 present; multi‑child & family‑scoped student creation works; all mutating actions behind confirm dialogs; advanced finance filter functional; AA + RTL; no dead buttons.
**Dependencies:** 001, 002.
**NOT in this spec:** teacher entities (004), course/session actions (005), invoice creation/finance ledgers (007), notification *routing* settings (011 — only family prefs here).

## Spec 004 — Admin: Teachers + Staff/Access + Courses + Materials/Library
**Scope:** The people‑who‑teach side + the course catalog + content. (Teacher entity is needed by Courses; Materials/Library are catalog refs.)
**Pages:** Teachers (list scope+sort, tabbed profile incl. availability, create, edit, attendance report, categories, performance/feedback, compensations), Staff & Access (staff list, create/edit, **permission matrix ~170**, activity log, category scope), Courses (list type+status, detail, create paid/free, edit w/ preview, copy), Materials (CRUD), Library (content+categories+upload).
**Components:** PermissionMatrix, RateTierRepeater (teacher pay), ScheduleRepeater (course), LibraryGrid, FileUpload/Dropzone, WeeklyCalendar (availability view — full calendar in 005), Zoom/payout field groups.
**Interactions:** scope+sort+page list state; permission matrix search/select‑all/clear; course create with schedule repeater + dual rates; course edit session‑impact preview; library upload; compensation create/edit.
**Acceptance criteria:** teacher create captures full entity (incl. Zoom/payout/capabilities); permission matrix saves grouped flags and is searchable; course create/edit/copy work with schedule + dual rate + free toggle; Materials/Library CRUD; AA + RTL; no dead buttons.
**Dependencies:** 001, 002, 003 (students/families referenced by courses).
**NOT in this spec:** session lifecycle actions & timetable (005), salaries/payouts (007), certificate templates (006), settings (011).

## Spec 005 — Classes + Timetable + Attendance + Live Sessions
**Scope:** The session spine and scheduling — shared by admin (and reused by teacher/family later).
**Pages:** Session detail (lifecycle), Groups (+create), Sessions room entry, All‑teachers timetable (calendar), Availability search/matcher, Schedule‑request broadcast + trial/session response inboxes, request‑schedule detail, Sessions Analysis (wired to real actions), Attendance review.
**Components:** **SessionActionPanel** (Attend/Absent/Cancel/Edit/Reschedule/Make‑up/Add‑to‑Credit/WhatsApp/Queue/Feedback), TimezoneField (student vs teacher), WeeklyCalendar (full, all‑teachers + popovers), schedule‑request wizard, makeup/credit controls.
**Interactions:** the full session‑action modal family with status‑gated availability + dual‑TZ tabs; bulk Schedule‑Cancel; calendar click→detail/edit; async availability search; broadcast request + response handling. **All mutations confirmed; never auto‑fired.**
**Acceptance criteria:** session detail exposes the correct action set per status; every session‑action modal present with dual‑TZ + makeup/credit; calendar renders weekly grid (Sat‑first option), reflows on mobile, mirrors in RTL; schedule matcher returns results async; AA + RTL.
**Dependencies:** 001, 002, 003, 004 (students/teachers/courses must exist).
**NOT in this spec:** salary/finance effects UI (007), certificates (006), teacher/family portal versions (009/010).

## Spec 006 — Assignments/Forms + Exams + Certificates + Reports polish
**Scope:** Assessment/recognition + finishing the reports suite. (Exams is thin — scope as the Forms/assessment builder + flag the gap.)
**Pages:** Forms (list + dynamic builder, 6 question types), monthly report forms, Certificate templates (canvas designer) + template list, Certificate requests (approve queue), Tasks/Tickets, plus any remaining Reports/Analytics polish (Class Feedback drilldown, Teacher Performance per‑teacher/year, Course analysis).
**Components:** FormBuilder, **CertificateDesigner** (canvas, merge fields, mm coords, PDF preview), approval modal with template select + WhatsApp delivery, rubric report form (shared w/ teacher Spec 009).
**Interactions:** form question add/remove/reorder; certificate canvas drag/position; approve‑with‑preview; report submit.
**Acceptance criteria:** form builder produces all 6 question types; certificate designer positions merge fields and previews output; request approval flow works (template + optional WhatsApp); AA + RTL; **Exams gap explicitly documented** if no real exam feature is confirmed.
**Dependencies:** 001, 002, 003, 004, 005.
**NOT in this spec:** invoices/payroll (007), settings (011).

## Spec 007 — Finance: Invoices + Payments + Accounting + Expenses + Payroll + Payouts + Wallet
**Scope:** The whole finance domain. (Largest spec — split into 007a Invoices/Accounting and 007b Payroll/Payouts if needed.)
**Pages:** Accounting dashboard (+FX rates), Transactions (3 tabs), Invoices (list+status+date‑type+create parent invoice+monthly+adjustments+export), record‑payment, Expenses (+heads), Teacher Salaries (generate+slip), Staff Salaries, Payouts (+providers), Salary class report, Invoice analysis, P&L analysis, Banks, Payment methods.
**Components:** CurrencyAmount (native+base), InvoiceBuilder (line items+discount/fees/adjustment/instalments), SalarySlip, Generate‑Salary modal, Payout approval (bulk), provider config (key1–4), FX rate editor, finance charts.
**Interactions:** invoice build + record payment; generate salary (month+selection); payout request→bulk approve; expense add/edit; FX edit; export endpoints (proper download UX + failure handling for the 2 known‑failing exports).
**Acceptance criteria:** invoice create produces correct line items + adjustments + instalments; salaries generate per month with attendance inputs; payout lifecycle (8 statuses) navigable; multi‑currency with base‑equivalent; exports download (or fail gracefully); AA + RTL; all money mutations confirmed.
**Dependencies:** 001, 002, 003, 004, 005 (sessions/courses/people feed finance).
**NOT in this spec:** payment‑gateway *integration config* (011 settings), teacher's read‑only salary view (009).

## Spec 008 — Messages + Notifications + Broadcast + Chat
**Scope:** Communication across roles.
**Pages:** Chat (groups, members, settings), Announcements/Broadcast (dashboard+WhatsApp, targeting, quotas), Notification Center/history, WhatsApp family‑insights diagnostic.
**Components:** ChatPanel (real‑time), Create‑Group/Add‑Member modals, broadcast composer + recipient targeting + quota indicators, notification list.
**Interactions:** real‑time messaging (WS/poll), group management, broadcast send (confirmed, with recipient‑count preview), mark notifications read.
**Acceptance criteria:** chat lists contacts/groups and sends (against a real or mocked realtime channel); broadcast composes with targeting + quota display + confirm; notifications panel works app‑wide; AA + RTL.
**Dependencies:** 001, 002 (and people specs for recipient pickers). Note: depends on backend realtime contract — **flag** ([07](07-data-and-api-surface.md)).
**NOT in this spec:** notification *routing settings* matrix (011).

## Spec 009 — Teacher Portal
**Scope:** The full teacher app, reusing the shell + components + SessionActionPanel.
**Pages:** Today (run/end/cancel/edit classes), Schedule + availability, My Students (roster, history — **consolidated single route**, monthly progress report, request certificate), Chat, Library, Earnings (salary + salary‑class report, 23‑col table), Account (profile‑edit, password, shortcuts). Build a **real profile view** (legacy 500). Fix nav (remove `main/index.html`).
**Components:** mobile‑first reuse of SessionActionPanel (teacher subset: End/Absent/Request‑Cancel/Edit), rubric report drawer (24‑field), certificate request modal, salary table (sticky col), availability editor.
**Interactions:** end/mark‑absent(+video)/request‑cancel/edit class; submit monthly report; request certificate; manage availability; view salary.
**Acceptance criteria:** all teacher templates from [03](03-role-page-inventory.md) §B present; duplicate history routes consolidated; working profile view; mobile‑first + AA + RTL; classroom route has a defined target (real classroom UI or clearly stubbed — **flag**); no dead buttons.
**Dependencies:** 001, 002, 005 (session components), 006 (report/cert), 007 (salary read model).
**NOT in this spec:** admin‑only management; the live‑classroom A/V build (separate spec if pursued).

## Spec 010 — Family / Student Portal
**Scope:** The guardian‑operated student portal.
**Pages:** Home (child summary + quick actions), Schedule, Courses/Subscriptions (+ teacher feedback), Classes/Today's sessions (join, request cancel, upload files+voice, history), Billing (view + confirm pay flow), Library, Feedback & Meetings, Account (profile‑edit, password, **child switcher**). Build a **real profile view** (legacy 500). Fix nav.
**Components:** multi‑child switcher, Request‑Trial wizard (new/existing child), Feedback‑about‑teacher modal, Request‑Cancel modal, Upload‑File modal w/ **voice recorder (MediaRecorder)**, billing list, MetricGauge.
**Interactions:** request trial (2‑step conditional wizard); give teacher feedback; request cancel/reschedule (with "no replacement" warning); upload files/voice; switch child.
**Acceptance criteria:** all family templates from [03](03-role-page-inventory.md) §C present; multi‑child switching works across pages; working profile view; mobile‑first + AA + RTL; all mutations confirmed; billing "pay" behavior resolved with owner; no dead buttons.
**Dependencies:** 001, 002, 005 (session/cancel components), 008 (notifications).
**NOT in this spec:** admin/teacher functions; payment‑gateway checkout build (depends on owner decision).

## Spec 011 — Settings + Roles/Permissions polish + Profile + Error Pages
**Scope:** System configuration + account + system pages.
**Pages:** Settings General (4 tabs), Integrations catalog + per‑integration configure (WhatsApp pairing wizard, Email/SMTP multi‑account, payment gateways, payout providers), Notification routing matrix (~47), Customisation (theme + 11 status colors + pick‑from‑logo), Security (CSV import, backup, dual policy editor), Payment methods, Locations, Profile (all roles), and the **system pages**: 404, 500, 403/denied, gateway‑timeout/retry, export‑failed.
**Components:** NotificationMatrix (full), IntegrationCard + configure forms, Wizard (WhatsApp pairing), RichTextEditor (policies), ColorPicker + status‑color editor (feeds the design‑system status map), CSV importer, error/empty/denied state pages.
**Interactions:** tabbed settings save; integration connect/configure; notification matrix edit; theme/customisation save (live preview, wires to design tokens); CSV import; policy edit.
**Acceptance criteria:** settings IA from [03](03-role-page-inventory.md) §A12 complete; customisation actually re‑themes the app (closing the loop with Spec 001 tokens); permission matrix polished (built in 004, refined here for role presets); all 5 error states designed; AA + RTL.
**Dependencies:** 001 (tokens), 004 (permission matrix base), 002 (shell).
**NOT in this spec:** the data those settings govern (already built in their domain specs).

## Spec 012 — Final QA + Responsive + Polish + Discovery Coverage Check
**Scope:** Cross‑cutting hardening and the **coverage audit**.
**Pages:** none new — audits all.
**Components:** none new — refines all.
**Interactions:** full keyboard/AX pass, RTL pass (Arabic), light/dark pass, responsive pass (mobile/tablet/desktop/wide), perf pass (skeletons, lazy tabs, table virtualization for big lists), empty/loading/error coverage.
**Acceptance criteria (the gate):**
- **Coverage matrix:** every discovered page template ([03](03-role-page-inventory.md)) maps to a shipped page; every distinct modal/dropdown/filter/tab ([06](06-interactions-and-states.md)) has an improved equivalent; **no dead buttons anywhere**.
- All pages pass AA, RTL, dark mode, and responsive checks.
- All destructive/mutating actions have confirms; no action auto‑fires.
- All broken legacy routes replaced with working pages or proper error states; all exports handled.
- Sign‑off checklist completed.
**Dependencies:** all prior specs.
**NOT in this spec:** new features (anything discovered‑but‑unbuilt is logged as backlog, not silently dropped).

---

## Coverage map (spec → discovered modules)
| Spec | Modules covered |
|---|---|
| 001 | Design system / shell (cross‑cutting) |
| 002 | Dashboard/Home, Reports/Analytics, Sessions Analysis |
| 003 | Students, Families/Guardians, Leads/CRM |
| 004 | Teachers, Staff/Admins+RBAC, Courses, Materials, Library |
| 005 | Classes/Live Sessions, Timetable/Schedule, Attendance, Groups |
| 006 | Assignments/Forms, Exams(gap), Certificates, Tasks, Reports polish |
| 007 | Payments/Invoices, Wallet/Finance (accounting/expenses/payroll/payouts/banks) |
| 008 | Messages/Notifications (chat/broadcast) |
| 009 | Teacher portal (all teacher pages) |
| 010 | Family/Student portal (all family pages) |
| 011 | Settings, Roles/Permissions, Profile, Error/Utility |
| 012 | Coverage verification (all) |

> Each spec is created **one at a time** via spec‑kit when we reach it — this plan is the roadmap, not a batch of specs to generate now. Spec 001's brief is in [11-next-spec-001-brief.md](11-next-spec-001-brief.md).
