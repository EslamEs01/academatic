# Frontend Audit — Specs 001–015 (Spec 016, evidence-grounded)

**Grounding**: all fifteen spec folders read this session (spec/plan/tasks + coverage artifacts); the current build (49 pages, HEAD `20dc089`, tree clean); `nav.config.js` statuses (29 planned · 7 disabled · 3 future-role); the crawl corpus (339 captured legacy pages, 1,113 screenshots). Every spec's tasks.md is **100% checked** — the audit below is about *scope and product completeness*, not unfinished work.

## Verdict up front

**Nothing from Specs 001–015 is broken, fake, or silently missing.** All guards are green, every deferral was recorded honestly, and the two follow-ups Spec 010 documented were closed by Spec 011. The real finding is *strategic*: the delivered surface is an **admin console (20 pages) + three one-page role HOMES + a demo hub**, while the legacy system it replaces is an **admin console of ~145 route templates + role mini-apps with their own sidebars**. The gap is *breadth by design* (the spec-by-spec plan always deferred it), and it is now scheduled: Specs 017–027.

## Per-spec audit (delivered · owned · deferred · excluded · weaknesses)

### Spec 001 — Approved Dashboard Foundation (65/65 tasks)
- **Delivered**: the SSG (`build-html.mjs`, AR-RTL default + EN pairs), full token system (warm-cream/violet + 5 accents, light/dark/system), two-part admin shell (icon rail + category panel + topbar), ~15 base components, the admin Dashboard, reports entry page, gallery.
- **Owns**: `dashboard` · `reports` · `gallery` (+ `index.html` dev entry).
- **Deferred**: the six sidebar destinations seeded as placeholders (→ closed by 002).
- **Weakness (judgment)**: reports page was entry-cards-only (→ made real by 008). `index.html` remains **ar-only** (no `.en` pair) — cosmetic, registered.

### Spec 002 — Admin Core Operations (68/68)
- **Delivered**: six operation pages (Sessions, Schedule, Students, Teachers, Courses, Settings) + shared patterns (page-header, filter-bar, directory cards, drawers, confirm modal).
- **Weakness**: Settings shipped as a mostly disabled-with-reason **shell** — honest but thin; the six settings sub-pages are still `planned` nav items today (→ Spec 026). Schedule was list-only (→ fixed by 003).

### Spec 003 — Timetable & Scheduling (43/43)
- **Delivered**: tabs widget, hand-rolled RTL weekly timetable + mobile agenda, teacher lens, appointment drawer, attention flags.
- **Deferred**: `sessionsAnalysis`/`scheduleSearch`/`timeConverter`/`scheduledActions`/`publicHoliday`/`sessionsKpi` stayed planned (→ 021/022/023).
- **Weakness**: attention/conflict markers are authored flags (display-only by constitution — recorded, not a defect).

### Spec 004 — Families & Student Profiles (40/40)
- **Delivered**: Families directory, Family profile hub (5 tabs), Add-Family wizard, enriched Students, Student profile (7 tabs incl. Results/Evaluation rubric).
- **Weakness**: family **Plan & Billing tab is a stub** (partially resolved by 009/010 link + 014's status-only family billing; the full admin billing surface → 025). Results/Evaluation live as tabs; the legacy has no separate routes for them (crawl-verified), so the `studentResult`/`studentEvaluation` planned nav items are **promotable as dedicated pages or resolvable into the profile tabs — decision registered** (→ 022).

### Spec 005 — Attendance & Session Outcomes (35/35)
- **Delivered**: `attendance` page (tiles-as-filters + outcome rows + canonical drawer), OUTCOME status map, cross-page integration.
- **Weakness**: session-level only — **no per-student roster attendance view**; faithful to legacy (legacy has NO standalone attendance page at all — modals only), registered as a 021 redesign consideration, not a regression.

### Spec 006 — Courses, Groups & Learning Paths (46/46)
- **Delivered**: enriched Courses + Course profile (8 tabs), Groups directory + Group profile (7 tabs), group-status map, Learning Path ladder.
- **Weakness**: **Learning Path is the thinnest surface** in the admin console (static ladder; self-described lowest-priority) — candidate for deepening when 022 rebuilds the course family; management affordances are demo toasts by constitution.

### Spec 007 — Teacher Performance & KPIs (37/37)
- **Delivered**: enriched Teachers, Teacher profile (8 tabs), `teacher-performance` KPI board (pay-free by construction).
- **Deferred**: `sessionsKpi`/`monthlyPerf`/`addTeacher`/`teacherCategories` planned (→ 023).

### Spec 008 — Academic Reports & Analytics Shell (29/29)
- **Delivered**: real `reports` page (category cards + operations band; legacy `revenue` card removed — reports body finance-free FOREVER).
- **Deferred**: `monthlyReports`/`dataAnalysis` planned (→ 024).

### Spec 009 — Finance, Billing & Payments Shell (28/28)
- **Delivered**: `finance` page (fixture invoices/payments, two labeled vocabularies, tiles-as-filters, drawers, 9 figure-free planned/backendRequired cards).
- **Deferred**: 7 disabled nav items (invoices/monthlyInvoices/salaries/staffSalaries/payments/classSalaryReport/banks) — locked with reason toasts (→ 025 as honest pages/shells).
- **Structural note**: the "body-scoped identity" exception for sidebar ripple is documented and sound.

### Spec 010 — Capability Coverage, IA & Polish (33/33)
- **Delivered**: the nine-way legacy classification matrix (~60 rows), 20-page audit, finance nav grouping, filter-visibility bugfix, chip-tone guard.
- **Closed by 011**: dashboard `href="#"` + Western-digit badge (both then fixed).

### Spec 011 — Final QA Hotfix (15/15)
- **Delivered**: the two one-line fixes + `deadHash===0` sitewide standing. No open follow-ups.

### Spec 012 — Role Portal Foundation (committed `5bcf490`)
- **Delivered**: portal shell (rail-less, role-accented), demo hub, three foundation portals, `prt` locale overlay, portal-absence guard on admin, the teacher payHit assert, the 39-page legacy role coverage artifact (§§1–6).
- **Weakness → the central 016 finding**: the shell has **no role navigation** — single scrolling page per role. Correct for its phase; now the primary thing 017 must add.

### Spec 013 — Student Dashboard (committed `86729a9`)
- **Delivered**: 13-section student HOME (gauge, week agenda, homework/materials with gates, celebration, history w/ real out1); smoke student branch; coverage §7.
- **Weakness**: it is one page. Homework/materials/history/progress each deserve internal pages (→ 018). **Net-new value note**: legacy has NO separate student role (crawl-verified) — 013 already exceeds legacy; 018 formalizes the app.

### Spec 014 — Family/Guardian Dashboard (committed `0d144aa`)
- **Delivered**: 12-section family HOME (5 children inline, real-outcome signals, status-only billing w/ zero figures, requests hub previews, truthful empty states); zero-pay regex; coverage §8.
- **Weakness**: one page; requests/billing-status/history/children each deserve internal pages (→ 019). The legacy guardian app had 11 route templates with a sidebar — breadth 019 restores (minus fake/broken parts).

### Spec 015 — Teacher Dashboard (committed `20dc089`)
- **Delivered**: 14-section teacher HOME (real follow-ups, 5-step workflow + T4/T5 gate notes, recent-sessions slice, day-grouped timetable, rubric, exactly ONE sanctioned body anchor); three-layer pay-free enforcement; coverage §9 (all 27 T-rows).
- **Weakness**: one page vs the legacy teacher app's 22 route templates (→ 020, pay pages permanently excluded from the teacher app).

## Current build inventory (audited)

49 files = 20 admin pairs (`dashboard sessions schedule attendance families add-family family students student teachers teacher teacher-performance courses course groups group reports finance settings gallery`) + 3 portal pairs + hub pair + ar-only `index.html`. All 48 loads smoke-green; axe 0/0; zero `href="#"`; zero raw keys; byte-audit trail intact through 015.

## Current sidebar state (the «قريبًا»/locked inventory)

- **29 `planned`** items: control 8 (sessionsAnalysis, messages, leads, tasks, announcements, timeConverter, publicHoliday, scheduledActions) · families 4 (familyCategories, scheduleSearch, studentResult, studentEvaluation) · teachers 4 (addTeacher, teacherCategories, sessionsKpi, monthlyPerf) · reports 2 (monthlyReports, dataAnalysis) · admin 5 (staff, materials, books, certificates, certificateRequests) · settings 6 (general, integrations, customization, notifications, security, users).
- **7 `disabled`** finance items: invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks.
- **3 `future-role`**: the portals (correctly never rendered in admin nav).
- Replacement plans: `admin-sidebar-page-inventory.md`. **Standing rule**: every one becomes a real fixture page or an honest locked/backendRequired shell — never a dead link, never a bare «قريبًا» toast in the finished product.

## Field matrix (all six audit fields × all fifteen specs — the compressed sections above expand here)

| Spec | Owns (pages) | Deferred | Excluded | Weakness | Tasks |
|---|---|---|---|---|---|
| 001 | dashboard · reports · gallery (+index) | six nav placeholders → 002 | backend/auth, ops modules, finance, portals, chart libs | reports thin (→008); index ar-only (→027 G19) | 65/65 |
| 002 | sessions · schedule · students · teachers · courses · settings | none new | backend/CRUD, attendance, finance, portals, calendar libs | settings shell (→026 G17); schedule list-only (→003) | 68/68 |
| 003 | none new (enhances schedule/sessions/dashboard) | sessionsAnalysis · scheduleSearch · timeConverter · scheduledActions · publicHoliday · sessionsKpi | real scheduling engines, drag-drop, Zoom, libs | authored attention flags (G16, by design) | 43/43 |
| 004 | families · add-family · family · student (+students) | familyCategories · groups(→006) · scheduleSearch · studentResult · studentEvaluation | enrollment/grade/billing engines, full Groups | billing stub tab (→025/019); result/eval as tabs (→022 G6) | 40/40 |
| 005 | attendance | sessionsAnalysis | attendance/outcome engines, credit module, notify/Zoom | session-level only (→021 G14) | 35/35 |
| 006 | groups · group · course (+courses) | staff · materials · books · certificates · certificateRequests (admin cat) | course/group/certificate engines | Learning Path thin (→022 G6); demo-only hub actions (by constitution) | 46/46 |
| 007 | teacher · teacher-performance (+teachers) | sessionsKpi · monthlyPerf · addTeacher · teacherCategories | ALL pay/payroll; computed score/rank/leaderboard | sparse-teacher empties (by design) | 37/37 |
| 008 | reports (rewrite) | monthlyReports · dataAnalysis | legacy revenue card (removed); chart/BI/export engines | none found | 29/29 |
| 009 | finance (new) | 7 disabled wallet items + 9 figure-free cards | runtime money math, gateways, pay figures | body-scoped identity exception (documented, sound) | 28/28 |
| 010 | none (matrix + IA + bugfix) | full planned catalogue (matrix) | broken/dupe/typo routes; 161 variants folded | two deferrals (closed by 011) | 33/33 |
| 011 | none (2 hotfixes) | none | new features of any kind | none | 15/15 |
| 012 | portals · student/family/teacher-portal foundations | deep dashboards → 013/014/015 | auth, engines, admin cross-links | no role nav — single pages (→017 G1) | 100% (`5bcf490`) |
| 013 | student-portal (deepened) | hwSubmit/matDownload gates · fullHistory planned | engines, leaderboard/rank | one page, not an app (→018 G2) | 25/25 |
| 014 | family-portal (deepened) | billingGate/matDownload gates · fullHistory/meetingRequest planned | pay figures (zero-figure line), engines | one page (→019 G3) | 24/24 |
| 015 | teacher-portal (deepened) | outcomeSave/matUpload/availabilityEdit gates · taskManage planned | ALL pay (three-layer), computed ratings, fake live | one page (→020 G4) | 25/25 |

## What the audit did NOT find

No fake actions, no dead links, no raw keys, no pay leakage, no silent scope drops, no undocumented deferral, no design drift between specs (all portal work shares one primitive set; all admin work shares one component set). **Zero items classified `must-fix-before-continuing`** — the corrective work of 016 is architecture and coverage planning, not repair.
