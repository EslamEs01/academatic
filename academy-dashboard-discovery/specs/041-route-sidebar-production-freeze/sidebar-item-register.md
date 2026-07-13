# Spec 041 — Sidebar Item Register (THE canonical per-item register)

**Status**: audit artifact of Spec 041 (*Full Frontend Route & Sidebar Production Freeze*). **SPECIFY ONLY** — this
file changes no source, no test, no HTML.
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD **`21502af`** ("settings deep linking architecture…",
= Spec 040 committed), working tree **clean**, in sync with `origin/feature/012-role-portal-foundation` and present on
`origin/main`.
**Scope**: every navigation item rendered anywhere in the product — the **50** admin sidebar items
(`src/js/nav.config.js` → `components/sidebar.js`) and the **26** role-portal items
(`src/js/fixtures/portal.js` → `components/portal-shell.js`: teacher 9 · family 9 · student 8, each counting the hub
exit). **76 rows total.** Nothing else in the product renders a nav item.

---

## 0. Register conventions (column normalisation — read before the tables)

The assignment's 18 per-item fields are carried in full, but four of them are **section-constant** by construction, so
they are hoisted into each section header rather than repeated 76 times:

| Hoisted field | Why it is constant within a section |
|---|---|
| **role** | An item's role is the register it lives in. `NAV_CATEGORIES` = admin only; `ROLE_NAV.teacher/.family/.student` = that role only. There is no cross-role item. |
| **category** | The category is the `NAV_CATEGORIES[]` entry (or the `sections[]` sub-group) the item is declared in. Portal registries have no categories — they are flat lists. |
| **visibility rule** | Uniform per shell (stated per section). Admin: every item is baked into all **64** admin files; only the active category's `.cat-panel` is visible on load, the other five carry `hidden` (`sidebar.js:catPanel`), and `enhance.js` swaps them on rail click. Portal: each registry renders **only** on that role's pages, and **twice per page** (desktop `aside.pt-sidenav` + the native mobile `details.pt-nav-drawer`). **Hiding a panel is NOT authorization** — no nav item is access-controlled; real enforcement is owned by Spec 043. |
| **AR destination / EN destination** | Mechanical: `langRoute()` (`components/sidebar.js:18-27`) rewrites `x.html#frag` → `x.en.html#frag` on English pages and is a no-op in Arabic. The **hash is preserved verbatim** in both languages. The AR href is therefore the `route` string as authored; the EN href is the same string with `.html` → `.en.html`. The tables carry the AR href + the hash + the tab id; the EN destination is the stated mechanical transform, verified by the smoke AR/EN nav-route parity check (**0 failures across all 115 pages**). |

**Classification legend** (the assignment's five classes):

| Cls | Meaning | Count |
|---|---|---|
| **1** | Implemented **page route** — `route` is a bare `*.html`, and the page it names is that item's own distinct surface. | **48** (**25** admin + **23** portal) |
| **2** | Implemented **deep-link / tab route** — `route` carries a `#view=` fragment that resolves to a real `[data-tab]` / `data-tabpanel` on the target page. | **22** (all admin) |
| **3** | Implemented **external / documented** — a rendered destination that is not a registry page route. | **3** (the 3 portal hub-exit anchors) |
| **4** | **Disabled honest lock** — non-anchor, no route, `aria-disabled`, reason-bearing. | **1** (`classSalaryReport`) |
| **5** | **Invalid / defective route** — renders as a real link but does not deliver its own surface. | **2** (`addTeacher`, `teacherCategories`) |

`48 + 22 + 3 + 1 + 2 = 76` ✅ — every rendered nav item in the product is classified, none twice.
There are **0 external (`http(s)://`) links** anywhere (smoke `links010.external === 0`), so class 3 is used only for the
shell's documented hub exit, which is a real in-product page (`portals.html`) rendered outside the role registry.

**Fresh-load result** = what a first-time load of the exact href actually does, with an empty profile.
`enhance.js:261-273` `initTabs` precedence is **URL `#view=` hash → stored `academy.schedView.<group>` → baked default
tab**; `selectTab(...,{persist:true})` writes both `localStorage` and `history.replaceState('#view=…')`, so a returning
user genuinely carries a conflicting stored view — which is why "the hash beats the stored view" is a production
claim, not a hypothetical.

---

## 1. Admin menu — the 50-item arithmetic (reconciliation)

`NAV_CATEGORIES` is 6 categories; two of them carry an extra `sections[]` sub-group whose items are part of the same
category (`catItems()` flattens `items` + `sections[].items`). The flattened count is what the product asserts as
**50**.

| # | Category id | `cat.*` AR label | `cat.*` EN label | direct `items` | `sections[]` items | **total** | cls 1 | cls 2 | cls 4 | cls 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `control` | لوحة التحكم | Control panel | 12 | — | **12** | 12 | 0 | 0 | 0 |
| 2 | `families` | العائلات والطلاب | Families & Students | 9 | — | **9** | 6 | 3 | 0 | 0 |
| 3 | `teachers` | المعلمون | Teachers | 3 | 3 (`cat.teachersPerf` — مؤشرات الأداء / Performance) | **6** | 2 | 2 | 0 | **2** |
| 4 | `reports` | التقارير | Reports | 3 | 8 (`cat.finance` — المالية / Finance) | **11** | 2 | 8 | **1** | 0 |
| 5 | `admin` | الإدارة | Administration | 5 | — | **5** | 2 | 3 | 0 | 0 |
| 6 | `settings` | الإعدادات | Settings | 7 | — | **7** | 1 | 6 | 0 | 0 |
| | **TOTAL** | | | **39** | **11** | **50** ✅ | **25** | **22** | **1** | **2** |

`12 + 9 + 6 + 11 + 5 + 7 = 50` ✅ · by class `25 + 22 + 1 + 2 = 50` ✅ · by category cls-1 `12 + 6 + 2 + 2 + 2 + 1 = 25` ✅.

**Route-string reconciliation** (each item counted exactly once):

| Bucket | Items | Count |
|---|---|---|
| Plain `*.html` route, **unique** destination → **cls 1** | control ×12 · `families` `addFamily` `students` `courses` `groups` `scheduleSearch` · `teachers` `teacherKpi` · `reports` `finance` · `staff` `certificates` · `settings` | **25** |
| Plain `*.html` route, **colliding** destination (`teachers.html`, already owned by `teachers`) → **cls 5** | `addTeacher`, `teacherCategories` | **2** |
| `#view=` deep-link route → **cls 2** | the 22 listed in §4 | **22** |
| **No route** (honest lock) → **cls 4** | `classSalaryReport` | **1** |
| | **TOTAL** | **50** ✅ |

Plain-route items = 25 + 2 = **27** · deep-link = **22** · route-less = **1** → 27 + 22 + 1 = **50** ✅.
Product-wide class 1 = **25 admin + 23 portal = 48** (portal: teacher 8 + family 8 + student 7 registry page items; the
3 hub exits are class 3 → 23 + 3 = **26** portal items ✅).

**Sitewide census, re-verified from source and from all 115 built pages**: `planned` items **0** ·
`[data-coming-soon]` **0** · `FUTURE_ROUTES` **`{}`** (empty) · honest locks **1** · admin menu **50** ·
pages **115** (57 bases × 2 + `index.html`) · admin/sidebar-bearing files **64** · portal files **50** · neither **1**.

---

## 2. Admin — CONTROL (12 items) · all class 1

**Role** admin · **category** `control` (`nav.config.js:20-36`) · **visibility** baked on all 64 admin files; this is
the category shown on load for `dashboard.html` (`categoryOf('home') === 'control'`).

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | hash | tab id | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `home` | الرئيسية | Home | 1 | implemented | `dashboard` | `dashboard.html` | — | — | `dashboard` (`activeId:'home'`) | dashboard renders | nav.config.js:23 · build-html.mjs:93 | **FREEZE** |
| 2 | `sessions` | الجلسات | Sessions | 1 | implemented | `sessions` | `sessions.html` | — | — | `sessions` (`activeId:'sessions'`) | sessions list renders; nav badge = `SESSIONS.total` (authored) | nav.config.js:24 · build-html.mjs:96 | **FREEZE** |
| 3 | `schedule` | الجدول الدراسي | Timetable | 1 | implemented | `schedule` | `schedule.html` | — | — | `schedule` | timetable renders (also the folded all-teachers-timetable lens, Spec 028) | nav.config.js:25 · build-html.mjs:97 | **FREEZE** |
| 4 | `attendance` | الحضور | Attendance | 1 | implemented | `attendance` | `attendance.html` | — | — | `attendance` | attendance board renders | nav.config.js:26 · build-html.mjs:108 · label `ar.att.js:9`/`en.att.js:7` | **FREEZE** |
| 5 | `sessionsAnalysis` | تحليل الجلسات | Sessions analysis | 1 | implemented | `sessions-analysis` | `sessions-analysis.html` | — | — | `sessionsAnalysis` | display-only board renders | nav.config.js:27 · build-html.mjs:118 (Spec 026) | **FREEZE** |
| 6 | `messages` | المحادثات | Messages | 1 | implemented | `messages` | `messages.html` | — | — | `messages` | inbox+thread+compose shell renders; every send = `backendRequired` gate | nav.config.js:28 · build-html.mjs:122 (Spec 034) | **FREEZE** |
| 7 | `leads` | الطلبات الجديدة | New Requests | 1 | implemented | `leads` | `leads.html` | — | — | `leads` | leads list + detail drawer render | nav.config.js:29 · build-html.mjs:123 | **FREEZE** |
| 8 | `tasks` | المهام | Tasks | 1 | implemented | `tasks` | `tasks.html` | — | — | `tasks` | KPI strip + display-only board render | nav.config.js:30 · build-html.mjs:124 | **FREEZE** |
| 9 | `announcements` | الإعلانات والإشعارات | Announcements | 1 | implemented | `announcements` | `announcements.html` | — | — | `announcements` | list + compose render; Publish/Send = gates | nav.config.js:31 · build-html.mjs:125 | **FREEZE** |
| 10 | `timeConverter` | محوّل الوقت | Time converter | 1 | implemented | `time-converter` | `time-converter.html` | — | — | `timeConverter` | **genuinely working** client tool (`Intl.DateTimeFormat`, page-scoped IIFE) | nav.config.js:32 · build-html.mjs:126 | **FREEZE** |
| 11 | `publicHoliday` | العطلات الرسمية | Public holidays | 1 | implemented | `public-holiday` | `public-holiday.html` | — | — | `publicHoliday` | authored holiday list renders | nav.config.js:33 · build-html.mjs:119 | **FREEZE** |
| 12 | `scheduledActions` | الإجراءات المجدولة | Scheduled actions | 1 | implemented | `scheduled-actions` | `scheduled-actions.html` | — | — | `scheduledActions` | authored queue renders | nav.config.js:34 · build-html.mjs:120 | **FREEZE** |

---

## 3. Admin — FAMILIES & STUDENTS (9) · TEACHERS (6) · REPORTS + FINANCE (11) · ADMINISTRATION (5) · SETTINGS (7)

### 3.1 `families` — العائلات والطلاب / Families & Students (9 items; 6 × cls 1, 3 × cls 2)

**Tab group of the deep-link targets**: `families.html` → `data-tabs="families"` (baked default `directory`);
`students.html` → `data-tabs="students"` (baked default `directory`).

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | hash | tab id | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 13 | `families` | العائلات | Families | 1 | implemented | `families` | `families.html` | — | (opens `directory`) | `families` | directory tab renders | nav.config.js:40 · build-html.mjs:103 | **FREEZE** |
| 14 | `addFamily` | إضافة عائلة | Add family | 1 | implemented | `add-family` | `add-family.html` | — | — | `addFamily` | the 5-step wizard page renders (`#step=` machinery) | nav.config.js:41 · build-html.mjs:104 | **FREEZE** — the contrast case for D-1: family creation has a *real page*; teacher creation does not |
| 15 | `students` | الطلاب | Students | 1 | implemented | `students` | `students.html` | — | (opens `directory`) | `students` | directory tab renders | nav.config.js:42 · build-html.mjs:98 | **FREEZE** |
| 16 | `courses` | الدورات | Courses | 1 | implemented | `courses` | `courses.html` | — | — | `courses` | courses list renders | nav.config.js:43 · build-html.mjs:100 | **FREEZE** |
| 17 | `familyCategories` | فئات العائلات | Family categories | **2** | implemented | `families` | `families.html#view=categories` | `#view=categories` | `categories` (group `families`) | **`families`** (the base page's id — this item never gets the active pill) | Categories board tab opens (hash > stored view) | nav.config.js:44 (Spec 037) · smoke `nav035.fc` regex `families\.(en\.)?html#view=categories$` (run.cjs:1474) · fresh-context test `SP037_DEEPLINKS` (run.cjs:2302-2335) | **FREEZE** + strengthen test (§6) |
| 18 | `groups` | المجموعات | Groups | 1 | implemented | `groups` | `groups.html` | — | — | `groups` | groups list renders | nav.config.js:45 · build-html.mjs:110 | **FREEZE** |
| 19 | `scheduleSearch` | بحث الجدول | Schedule search | 1 | implemented | `schedule-search` | `schedule-search.html` | — | — | `scheduleSearch` | standalone availability finder renders (Spec 035, the last page added) | nav.config.js:46 · build-html.mjs:132 · smoke `nav035.ss` (run.cjs:1475) | **FREEZE** |
| 20 | `studentResult` | نتائج الطلاب | Student results | **2** | implemented | `students` | `students.html#view=results` | `#view=results` | `results` (group `students`) | **`students`** | cross-student Results board tab opens | nav.config.js:47 (Spec 037; supersedes Spec 035's `student.html#view=results`) · smoke run.cjs:1476 | **FREEZE** + strengthen test |
| 21 | `studentEvaluation` | تقييم الطلاب | Student evaluation | **2** | implemented | `students` | `students.html#view=evaluation` | `#view=evaluation` | `evaluation` (group `students`) | **`students`** | cross-student Evaluation board tab opens; per-student drill-down → `student.html#view=evaluation` | nav.config.js:48 · smoke run.cjs:1477 | **FREEZE** + strengthen test |

### 3.2 `teachers` — المعلمون / Teachers (6 items = 3 direct + 3 in `cat.teachersPerf`) — **carries both defects**

**Tab group**: `teacher-performance.html` → `data-tabs="perf"` (baked default `overview`).

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | hash | tab id | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | `teachers` | المعلمون | Teachers | 1 | implemented | `teachers` | `teachers.html` | — | — | `teachers` (`activeId:'teachers'`) | teachers directory renders | nav.config.js:54 · build-html.mjs:99 | **FREEZE** |
| 23 | **`addTeacher`** | **إضافة معلم** | **Add teacher** | **5 — INVALID** | implemented (renders as a real `<a>`) | `teachers` | **`teachers.html`** (byte-identical to #22) | **none** | **none** | **`teachers`** — the item can never carry the active pill, because the page it lands on is owned by `teachers` | **Lands on the teachers directory. NO drawer opens.** `enhance.js` handles **only** `#view=` (tabs) and `#step=` (wizard); there is no drawer-hash mechanism. The user must then find and click the page-header "Add teacher" button. | nav.config.js:55 (comment: *"Spec 036 — fold-anchor to teachers.html (trn-add drawer)"*) · drawer wired to a header button only: `pages/teachers.js:83`, `components/teacher-actions.js:27-29` · `enhance.js:261-273` (hash router: `view=` only) · Spec 036 `add-teacher-fold-register.md` admits it: *"Spec 036 only points the nav item at this page; no body edit."* · legacy had a **dedicated 57-field creation page** `/management/teachers/create` (route-graph.md:270; role-page-inventory-v2.md:214 — forms=1 flds=57) | **DEFECT D-1 — smallest honest fix required** (§7) |
| 24 | **`teacherCategories`** | **فئات المعلمين** | **Teacher categories** | **5 — INVALID** | implemented (renders as a real `<a>`) | `teachers` | **`teachers.html`** (byte-identical to #22 and #23) | **none** | **none** | **`teachers`** | **Lands on the teachers directory. NO drawer opens.** Same mechanism gap; the `trn-categories` drawer is reachable only via a second header button. | nav.config.js:56 (comment: *"fold-anchor … (trn-categories drawer)"*) · `pages/teachers.js:105`, `components/teacher-actions.js:70-72` · legacy `/management/teacher-categories` was **its own CRUD route template** with 3 child routes (route-graph.md:238-241,477; role-page-inventory-v2.md:203-206 — forms=2 flds=4 tbl=1) | **DEFECT D-1 — smallest honest fix required** (§7) |
| 25 | `teacherKpi` | مؤشرات أداء المعلمين | Teacher performance | 1 | implemented | `teacher-performance` | `teacher-performance.html` | — | (opens `overview`) | `teacherKpi` (`activeId:'teacherKpi'`) | the performance board's overview tab renders (display-only; no computed score/rank/chart) | nav.config.js:62 · build-html.mjs:115 | **FREEZE** — this is the sanctioned Spec-024 **B-07 admin exempt board**, linked from **zero** portal pages |
| 26 | `sessionsKpi` | مؤشر أداء الحصص | Sessions performance | **2** | implemented | `teacher-performance` | `teacher-performance.html#view=sessions-kpi` | `#view=sessions-kpi` | `sessions-kpi` (group `perf`) | **`teacherKpi`** | the Sessions-KPI tab opens; authored session COUNTS only, **pay-free** (smoke `noPay`, run.cjs:2291/2296) | nav.config.js:63 (Spec 036) · smoke run.cjs:1496 · fresh-context test run.cjs:2273-2300 | **FREEZE** + strengthen test |
| 27 | `monthlyPerf` | الأداء الشهري | Monthly performance | **2** | implemented | `teacher-performance` | `teacher-performance.html#view=monthly` | `#view=monthly` | `monthly` (group `perf`) | **`teacherKpi`** | the Monthly-performance tab opens; categorical trend chips, **no computed percentage** (the legacy computed `Percentage` is deliberately not reproduced) | nav.config.js:64 · smoke run.cjs:1497 | **FREEZE** + strengthen test |

### 3.3 `reports` — التقارير / Reports (3 direct) + `cat.finance` — المالية / Finance (8) = 11

**Tab groups**: `reports.html` → `data-tabs="reports"` (default `overview`, 7 `.report-card` preserved);
`finance.html` → `data-tabs="finance"` (default `overview`, 6 panels).

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | hash | tab id | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 28 | `reports` | التقارير | Reports | 1 | implemented | `reports` | `reports.html` | — | (opens `overview`) | `reports` | reports overview renders; body is **finance-free FOREVER** | nav.config.js:72 · build-html.mjs:94 | **FREEZE** |
| 29 | `monthlyReports` | التقارير الشهرية | Monthly reports | **2** | implemented | `reports` | `reports.html#view=monthly` | `#view=monthly` | `monthly` (group `reports`) | **`reports`** | display-only month-grouped board opens | nav.config.js:73 (Spec 037) · smoke run.cjs:1514 · fresh-context run.cjs:2302-2335 | **FREEZE** + strengthen test. **Provenance caveat**: legacy's own sidebar mislabeled `/management/forms` as "monthly reports" (management-teachers-details.md:221/292) — this item has an authored surface, not a legacy ancestor page. |
| 30 | `dataAnalysis` | تحليل البيانات | Data analysis | **2** | implemented | `reports` | `reports.html#view=analysis` | `#view=analysis` | `analysis` (group `reports`) | **`reports`** | display-only insight-card board opens; **authored categorical trend labels, no chart/`<canvas>`, no trend math** | nav.config.js:74 · smoke run.cjs:1515 | **FREEZE** + strengthen test. **Provenance caveat**: the legacy "Data Analysis" sidebar entry was a dead `javascript:void(0)` stub (management-teachers-details.md:293) — the current item is *more* honest than its ancestor, not less. |
| 31 | `finance` | المالية | Finance | 1 | implemented | `finance` | `finance.html` | — | (opens `overview`) | `finance` | the 6-tab finance hub opens on Overview | nav.config.js:84 · build-html.mjs:117 · labels `ar.fin.js:10-12`/`en.fin.js:9-11` | **FREEZE** |
| 32 | `invoices` | الفواتير | Invoices | **2** | implemented | `finance` | `finance.html#view=invoices` | `#view=invoices` | `invoices` | **`finance`** | invoices tab (4 tiles + filterBar + 9 authored rows; amount **literals** only) | nav.config.js:85 (Spec 038) · smoke run.cjs:2337-2362 | **FREEZE** + strengthen test |
| 33 | `monthlyInvoices` | الفواتير الشهرية | Monthly invoices | **2** | implemented | `finance` | `finance.html#view=monthly-invoices` | `#view=monthly-invoices` | `monthly-invoices` | **`finance`** | monthly board (the same 9 invoices grouped by authored `monthKey` into 4 groups; **no computed monthly total**) | nav.config.js:86 | **FREEZE** + strengthen test |
| 34 | `salaries` | الرواتب | Salaries | **2** | implemented | `finance` | `finance.html#view=salaries` | `#view=salaries` | `salaries` | **`finance`** | **figure-free** salaries tab (name + status + period; **0 pay figures**) | nav.config.js:87 | **FREEZE** — see **S-1** below |
| 35 | `staffSalaries` | رواتب الموظفين | Staff salaries | **2** | implemented | `finance` | `finance.html#view=salaries` | `#view=salaries` | `salaries` | **`finance`** | **same tab as #34** — the salaries panel carries BOTH the teacher board and the staff board | nav.config.js:88 (Spec 038) | **FREEZE — S-1: sanctioned SHARED destination**, not a duplicate. Recorded here so no future spec "de-duplicates" it. Two nav items, one panel, two boards. |
| 36 | `payments` | المدفوعات | Payments | **2** | implemented | `finance` | `finance.html#view=payments` | `#view=payments` | `payments` | **`finance`** | payments tab (6 `.fin-pay-row` rows; Record/Reconcile = gates) | nav.config.js:89 | **FREEZE** + strengthen test |
| 37 | **`classSalaryReport`** | **تقرير رواتب الفصول** | **Class salary report** | **4 — HONEST LOCK** | **disabled** | **— (none)** | **— (no href; renders as `<button type="button">`)** | — | — | **n/a** — a disabled item can never be active | **Nothing navigates.** Clicking surfaces the reason toast: «يتطلب نظام الفوترة الفعلي — صفحة «المالية» تعرض معاينة تجريبية بالبيانات الثابتة.» / "Requires the real billing backend — the Finance page shows a fixture-only preview." | nav.config.js:90 · `reasonKey:'nav.reason.finance'` (`ar.js:14`/`en.js:14`) · rendered: `class="nav-item is-disabled" data-nav-status="disabled" aria-disabled="true" data-disabled-reason data-reason-key="nav.reason.finance"` + `use[href="#i-lock"]` (`sidebar.js:35-38`) · asserted at **4 sites**: run.cjs:1728-1742, 1770-1793 (`lockedFin`), 2398, 2526-2527 (source) | **FREEZE — the ONE honest lock.** A real class-salary report implies **computed per-class pay**, forbidden by the no-fake-money + pay-free laws. It is **not** a planned item (different status, different hook) and must never be repointed at by a planned-item probe (Spec 040, Option B′ FORBIDDEN). Owner: the future payroll backend. |
| 38 | `banks` | البنوك | Banks | **2** | implemented | `finance` | `finance.html#view=banks` | `#view=banks` | `banks` | **`finance`** | banks tab (name + status; **no balance**); Add-bank = `backendRequired` | nav.config.js:91 | **FREEZE** — placement is asserted: `banksInReports && !banksInAdmin` (run.cjs:1787) |

### 3.4 `admin` — الإدارة / Administration (5 items; 2 × cls 1, 3 × cls 2)

**Tab groups**: `library.html` → `data-tabs="library"` (**baked default `materials`**); `certificates.html` →
`data-tabs="certificates"` (default `templates`).

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | hash | tab id | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 39 | `staff` | الفريق والصلاحيات | Staff & Roles | 1 | implemented | `staff` | `staff.html` | — | — | `staff` | the ONE staff home (display-only directory; RBAC matrix drawer; **no password, no salary**) | nav.config.js:99 · build-html.mjs:128 (Spec 031) | **FREEZE** — Spec 040 Decision 1 re-affirmed this as the single staff home; `settingsUsers` deliberately does **not** point here |
| 40 | `materials` | المواد التعليمية | Materials | **2** | implemented | `library` | `library.html#view=materials` | `#view=materials` | `materials` (group `library`) | **`books`** ← note: `library`'s `activeId` is **`books`**, so landing on the Materials tab highlights «المكتبة»/Library | Materials subject-catalog tab opens. **This hash sits ON the baked default tab** — which is exactly why its smoke test is **seeded** (the stored view is set to `books` first, so the hash must WIN). | nav.config.js:100 (Spec 039) · smoke `anchorOk039` run.cjs:1534 · **seeded** deep-link block `SP039_DEEPLINKS` run.cjs:2404-2439 · source audit run.cjs:2519 | **FREEZE** — and record the active-pill anomaly (§6, A-1) |
| 41 | `books` | المكتبة | Library | **2** | implemented | `library` | `library.html#view=books` | `#view=books` | `books` (group `library`) | **`books`** (`build-html.mjs:129 activeId:'books'`) | Books/content catalog tab opens | nav.config.js:101 (Spec 039 *refined* `library.html` → `#view=books` precisely so the two library items open **distinct** tabs) · smoke run.cjs:1536 · seeded test run.cjs:2404-2439 | **FREEZE** — this refinement is the **precedent** for the D-1 fix in §7 |
| 42 | `certificates` | الشهادات | Certificates | 1 | implemented | `certificates` | `certificates.html` | — | (opens `templates`) | `certificates` | Templates tab + the **static** designer preview (`role="img"`; no `<canvas>`/drag/upload/PDF) | nav.config.js:102 · build-html.mjs:130 | **FREEZE** |
| 43 | `certificateRequests` | طلبات الشهادات | Certificate requests | **2** | implemented | `certificates` | `certificates.html#view=requests` | `#view=requests` | `requests` (group `certificates`) | **`certificates`** | the Requests queue tab opens; Approve/Reject/Generate/Send all = `backendRequired` gates | nav.config.js:103 (Spec 039) · smoke run.cjs:1535 · **seeded** test run.cjs:2404-2439 · source audit run.cjs:2520 | **FREEZE** |

### 3.5 `settings` — الإعدادات / Settings (7 items; 1 × cls 1, 6 × cls 2)

**Tab group**: `settings.html` → `data-tabs="settings"` (**baked default `general`**). Spec 040 flipped the last six
`planned` items in the product here — after it, **sitewide planned = 0**.

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | hash | tab id | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 44 | `settings` | الإعدادات | Settings | 1 | implemented | `settings` | `settings.html` | — | (opens `general`) | `settings` (`activeId:'settings'`) | the 6-tab settings hub opens on General | nav.config.js:109 · build-html.mjs:101 | **FREEZE** |
| 45 | `settingsGeneral` | عام | General | **2** | implemented | `settings` | `settings.html#view=general` | `#view=general` | `general` | **`settings`** | General tab opens. **Hash sits ON the baked default** → its test is **seeded** with `integrations` as the stored view, so the assertion is discriminating. | nav.config.js:117 · smoke `SIX` loop run.cjs:1564-1573 · **seeded** `SP040_VIEWS` run.cjs:2441-2472 · source audit run.cjs:2540-2545 | **FREEZE** |
| 46 | `settingsIntegrations` | التكاملات | Integrations | **2** | implemented | `settings` | `settings.html#view=integrations` | `#view=integrations` | `integrations` | **`settings`** | Integrations tab: **locked-placeholder** provider cards (name + status only). **Never** `type=password`, API key, secret or webhook. | nav.config.js:118 · smoke run.cjs:1564-1573, 2441-2472 | **FREEZE** — real integrations are Spec 053/054, explicitly **barred from 041** |
| 47 | `settingsCustomization` | التخصيص | Customization | **2** | implemented | `settings` | `settings.html#view=customization` | `#view=customization` | `customization` (**US spelling**) | **`settings`** | Customization tab opens; **theme + language are the only REAL writes in the product** | nav.config.js:119 + its inline spelling-trap comment (legacy route is `/settings/customi**s**ation/`, UK — carrying that `s` into the hash yields a dead deep-link the tab machinery silently ignores) · smoke run.cjs:1569-1570 | **FREEZE** — and see §6 H-2: `badTarget` cannot catch that class of typo |
| 48 | `settingsNotifications` | الإشعارات | Notifications | **2** | implemented | `settings` | `settings.html#view=notifications` | `#view=notifications` | `notifications` | **`settings`** | figure-free event × channel matrix opens | nav.config.js:120 | **FREEZE** |
| 49 | `settingsSecurity` | الأمان | Security | **2** | implemented | `settings` | `settings.html#view=security` | `#view=security` | `security` | **`settings`** | Security tab opens. NB it legitimately renders a **padlock icon** — which is why the Spec-040 anchor predicate `anchorOk040` deliberately excludes `lock` from its rejection set (run.cjs:1559-1562). A padlock **icon** is not a lock **state**. | nav.config.js:121 · run.cjs:1559-1573 | **FREEZE** |
| 50 | `settingsUsers` | المستخدمون والموظفون | Users & staff | **2** | implemented | `settings` | `settings.html#view=users` | `#view=users` | `users` | **`settings`** | the purpose-built Users tab opens (**not** `staff.html` — Spec 040 Decision 1, Option A) | nav.config.js:122 · smoke run.cjs:1564-1573 · seeded run.cjs:2441-2472 | **FREEZE** — but it is the **thinnest-covered** view in the product: exactly **1** a11y row (a11y/run.cjs:209) and exactly **1** screenshot frame (capture.cjs:429). Any per-view matrix floor added later fails here first. |

**Admin subtotal: 50 rows** ✅ (12 + 9 + 6 + 11 + 5 + 7).

---

## 4. The 22 deep-link routes — destination resolution matrix

Every one verified to resolve to a **real** `data-tabpanel` on **both** languages; **0 dead `#view=` hashes** across
all 115 pages.

| # | nav item | target page | tab group (`data-tabs`) | tab id | baked default of that group? | seeded (discriminating) test? |
|---|---|---|---|---|---|---|
| 1 | `familyCategories` | `families` | `families` | `categories` | no (`directory`) | **no** |
| 2 | `studentResult` | `students` | `students` | `results` | no (`directory`) | **no** |
| 3 | `studentEvaluation` | `students` | `students` | `evaluation` | no | **no** |
| 4 | `sessionsKpi` | `teacher-performance` | `perf` | `sessions-kpi` | no (`overview`) | **no** |
| 5 | `monthlyPerf` | `teacher-performance` | `perf` | `monthly` | no | **no** |
| 6 | `monthlyReports` | `reports` | `reports` | `monthly` | no (`overview`) | **no** |
| 7 | `dataAnalysis` | `reports` | `reports` | `analysis` | no | **no** |
| 8 | `invoices` | `finance` | `finance` | `invoices` | no (`overview`) | **no** |
| 9 | `monthlyInvoices` | `finance` | `finance` | `monthly-invoices` | no | **no** |
| 10 | `salaries` | `finance` | `finance` | `salaries` | no | **no** |
| 11 | `staffSalaries` | `finance` | `finance` | `salaries` **(shared with #10 — S-1)** | no | **no** |
| 12 | `payments` | `finance` | `finance` | `payments` | no | **no** |
| 13 | `banks` | `finance` | `finance` | `banks` | no | **no** |
| 14 | `materials` | `library` | `library` | `materials` | **YES** ⚠ | **yes** (`SP039_DEEPLINKS`, seeded `books`) |
| 15 | `books` | `library` | `library` | `books` | no | **yes** (seeded `materials`) |
| 16 | `certificateRequests` | `certificates` | `certificates` | `requests` | no (`templates`) | **yes** (seeded `templates`) |
| 17 | `settingsGeneral` | `settings` | `settings` | `general` | **YES** ⚠ | **yes** (seeded `integrations`) |
| 18 | `settingsIntegrations` | `settings` | `settings` | `integrations` | no | **yes** (seeded `customization`) |
| 19 | `settingsCustomization` | `settings` | `settings` | `customization` | no | **yes** (seeded `security`) |
| 20 | `settingsNotifications` | `settings` | `settings` | `notifications` | no | **yes** (seeded `general`) |
| 21 | `settingsSecurity` | `settings` | `settings` | `security` | no | **yes** (seeded `users`) |
| 22 | `settingsUsers` | `settings` | `settings` | `users` | no | **yes** (seeded `notifications`) |

**Coverage truth**: all 22 have a fresh-context load test; only **9** have a *discriminating* (stored-view-seeded) one.
The 13 unseeded ones would still pass if `initTabs` regressed to `stored || hash` precedence. → §6 T-1.

---

## 5. Portal registries — teacher (9) · family (9) · student (8) = 26 items

**Renderer**: `components/portal-shell.js:23-34` (`navItem` / `navList`) + the hub exit at `portal-shell.js:79`,
emitted **twice** per page (desktop `.pt-nav-exit` L92 + mobile drawer L98).
**Visibility rule (all three registries)**: rendered only on that role's own pages; **never** in the admin shell and
**never** an admin nav item (`FUTURE_ROLE`, `nav.config.js` — documented-but-never-rendered). Admin destinations
reachable from any portal page: **0**. Portal destinations reachable from any admin page: **0**.
**Active-state owner (all)**: `portalShellMarkup({activeId})`, fed by the PAGES entry's `activeId`
(`build-html.mjs:204`, defaulting to `'home'`). Every registry item **does** own its own active pill — unlike the 22
admin deep-links.
**Status census**: planned **0** in all three (`plannedNavAnchors === 0`, asserted 4× at run.cjs:2111/2132/2153/2174).
Hrefs are `page.html` in AR and `page.en.html` in EN (`portal-shell.js:26`).

### 5.1 Teacher — 8 registry items + hub exit = 9 · **PAY-FREE GLOBAL**

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | href (EN) | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 51 | `home` | الرئيسية | Home | 1 | implemented | `teacher-portal` | `teacher-portal.html` | `teacher-portal.en.html` | self (`activeId:'home'` default) | the teaching cockpit renders | portal.js:160 · build-html.mjs:137 | **FREEZE** |
| 52 | `schedule` | جدولي | Schedule | 1 | implemented | `teacher-schedule` | `teacher-schedule.html` | `.en.html` | self | renders | portal.js:161 · build-html.mjs:153 | **FREEZE** |
| 53 | `students` | طلابي | Students | 1 | implemented | `teacher-students` | `teacher-students.html` | `.en.html` | self | renders | portal.js:162 · build-html.mjs:154 | **FREEZE** |
| 54 | `outcomes` | نتائج الحصص | Outcomes | 1 | implemented | `teacher-outcomes` | `teacher-outcomes.html` | `.en.html` | self | renders; Save = `backendRequired` gate | portal.js:163 · build-html.mjs:155 | **FREEZE** |
| 55 | `tasks` | المهام | Tasks | 1 | implemented | `teacher-tasks` | `teacher-tasks.html` | `.en.html` | self | renders | portal.js:164 · build-html.mjs:156 | **FREEZE** |
| 56 | `reports` | التقارير | Reports | 1 | implemented | `teacher-reports` | `teacher-reports.html` | `.en.html` | self | renders — **academic only** (authored counts + rubric lines; no chart/score). Spec 025 repointed the teacher-home performance anchor here, closing the B-07 admin-shell adjacency. | portal.js:165 · build-html.mjs:157 | **FREEZE** — must never link to `teacher-performance.html` |
| 57 | `library` | مكتبتي | Library | 1 | implemented | `teacher-library` | `teacher-library.html` | `.en.html` | self | renders; upload/download = gates | portal.js:166 · build-html.mjs:159 (Spec 024 B-05 → Spec 025) | **FREEZE** |
| 58 | `profile` | ملفي | Profile | 1 | implemented | `teacher-profile` | `teacher-profile.html` | `.en.html` | self | renders; the 3 write actions = gates | portal.js:167 · build-html.mjs:158 | **FREEZE** |
| 59 | *(hub exit)* | العودة إلى المركز | Back to hub | **3** | implemented (shell-owned, not in `ROLE_NAV`) | `portals` | `portals.html` | `portals.en.html` | none (never active) | the role-switcher hub renders | `portal-shell.js:79` (`a.pt-nav-item.pt-nav-hub`), rendered at L92 + L98 · label `prt.nav.hub` (`ar.prt.js`/`en.prt.js`) | **FREEZE** — the sanctioned shell exit; the sanctioned-anchor registry pins it |

**Pay-free enforcement**: the shipped `payHit` regex (run.cjs:2069-2072) + `tchPay` (run.cjs:1990-1991) → **0
violations on all 16 teacher-portal files**. *(A naive `/SAR/i` grep false-positives on the persona name **Sara** — the
shipped regex is word-boundary scoped. Never "fix" a false positive by weakening it.)*

### 5.2 Family — 8 registry items + hub exit = 9 · **ZERO-PAY hard line**

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 60 | `home` | الرئيسية | Home | 1 | implemented | `family-portal` | `family-portal.html` | self | the guardian cockpit renders | portal.js:150 · build-html.mjs:136 | **FREEZE** |
| 61 | `children` | الأبناء | Children | 1 | implemented | `family-children` | `family-children.html` | self | renders | portal.js:151 · build-html.mjs:145 | **FREEZE** |
| 62 | `schedule` | الجدول | Schedule | 1 | implemented | `family-schedule` | `family-schedule.html` | self | renders | portal.js:152 · build-html.mjs:146 | **FREEZE** |
| 63 | `progress` | التقدم | Progress | 1 | implemented | `family-progress` | `family-progress.html` | self | renders | portal.js:153 · build-html.mjs:147 | **FREEZE** |
| 64 | `billing` | الفواتير | Billing | 1 | implemented | `family-billing` | `family-billing.html` | self | renders **STATUS-FIRST**: hour-quota + **amount-free** invoice rows. **0 currency figures** (`famPay`, run.cjs:1959-1960). | portal.js:154 · build-html.mjs:148 | **FREEZE** — the zero-pay hard line is a law, not a stylistic choice |
| 65 | `requests` | الطلبات | Requests | 1 | implemented | `family-requests` | `family-requests.html` | self | renders; submit = gate | portal.js:155 · build-html.mjs:149 | **FREEZE** |
| 66 | `materials` | المواد | Materials | 1 | implemented | `family-materials` | `family-materials.html` | self | renders; download = gate | portal.js:156 · build-html.mjs:150 | **FREEZE** |
| 67 | `profile` | الملف | Profile | 1 | implemented | `family-profile` | `family-profile.html` | self | renders | portal.js:157 · build-html.mjs:151 | **FREEZE** |
| 68 | *(hub exit)* | العودة إلى المركز | Back to hub | **3** | implemented (shell-owned) | `portals` | `portals.html` | none | hub renders | portal-shell.js:79/92/98 | **FREEZE** |

**Note — `family-child.html`** (the 5-child drill-down, `build-html.mjs:138`) is a family-shell page with
`activeId:null` → the shell defaults it to `'home'`, so the **Home** pill is lit while on it. It is **not** a nav item
(it is reached from the family home's child cards and the ONE sanctioned Spec-022 fold-point link) and therefore holds
no row in this register. Its zero-pay assertion is separate (run.cjs:2049-2050).

### 5.3 Student — 7 registry items + hub exit = 8 · **CHILD-VIEW («عرض الابن»), family-owned**

| # | item id | AR label | EN label | Cls | Status | Base page | href (AR) | Active-state owner | Fresh-load result | Evidence | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 69 | `home` | الرئيسية | Home | 1 | implemented | `student-portal` | `student-portal.html` | self | the child view renders | portal.js:141 · build-html.mjs:135 | **FREEZE** |
| 70 | `schedule` | جدولي | Schedule | 1 | implemented | `student-schedule` | `student-schedule.html` | self | renders | portal.js:142 · build-html.mjs:139 | **FREEZE** |
| 71 | `homework` | واجباتي | Homework | 1 | implemented | `student-homework` | `student-homework.html` | self | renders; submit = gate | portal.js:143 · build-html.mjs:140 | **FREEZE** |
| 72 | `materials` | المواد | Materials | 1 | implemented | `student-materials` | `student-materials.html` | self | renders; download = gate | portal.js:144 · build-html.mjs:141 | **FREEZE** |
| 73 | `progress` | تقدمي | Progress | 1 | implemented | `student-progress` | `student-progress.html` | self | renders — **no computed score/rank/leaderboard** | portal.js:145 · build-html.mjs:142 | **FREEZE** (recognition/leaderboards are Spec 052, privacy-safe by construction) |
| 74 | `history` | سجل الحصص | History | 1 | implemented | `student-history` | `student-history.html` | self | renders | portal.js:146 · build-html.mjs:143 | **FREEZE** |
| 75 | `profile` | ملفي | Profile | 1 | implemented | `student-profile` | `student-profile.html` | self | renders | portal.js:147 · build-html.mjs:144 | **FREEZE** |
| 76 | *(hub exit)* | العودة إلى المركز | Back to hub | **3** | implemented (shell-owned) | `portals` | `portals.html` | none | hub renders | portal-shell.js:79/92/98 | **FREEZE** |

**Child-view law**: none of the 14 student files may carry «لوحة الطالب» / «بوابة الطالب» / "student dashboard"
(run.cjs:1945-1950) — **0 violations**. The student surface is a **demoted child view owned by the family**, and the
hub renders it as a single demoted preview card, not a primary role.

**Portal subtotal: 26 rows** ✅ (9 + 9 + 8). **Register total: 50 + 26 = 76 rows** ✅.

---

## 6. Register-derived observations (record now; act per the disposition column)

| id | Observation | Evidence | Owner |
|---|---|---|---|
| **A-1** | **Deep-link items never own the active pill.** `sidebar.js:41` lights an item only when `it.id === activeId`, and `activeId` comes from the PAGES entry of the *base* page. So arriving via `finance.html#view=invoices` lights **Finance**, not **Invoices** — for all 22 deep-links. Sharpest case: `library`'s `activeId` is **`books`** (`build-html.mjs:129`), so `#view=materials` lands on the Materials tab while the sidebar highlights «المكتبة»/Library. | `sidebar.js:41` · `build-html.mjs:93-132` | **Record as a known, accepted limitation of the static shell** (the active pill is baked at build time; a hash-aware pill would require a new runtime hook — forbidden by the closed hook set). NOT a defect. Revisit only if a later spec opens the hook set. |
| **A-2** | **6 of the 32 admin bases are not nav destinations**: `family`, `student`, `course`, `group`, `teacher` (5 drill-downs, reachable from their list pages) and **`gallery`** (`activeId:null`, reachable from nothing). 26 nav-target bases + 5 drill-downs + 1 orphan = **32** ✅. | `build-html.mjs:95` (`gallery`, `activeId:null`) · orphan census: 2 files (`gallery.html`, `gallery.en.html`) | **D-2** — `gallery` needs a documented owner + entry path, or an explicit "reachable by URL only, by design" record. It is the component/design-system reference page. |
| **T-1** | **13 of the 22 deep-links have a non-discriminating test** (fresh context, EMPTY localStorage → they only prove *hash beats baked default*). A regression to `stored \|\| hash` precedence would pass all 13. The 9 seeded ones (Spec 039/040) are the only ones that would catch it. | run.cjs:2273-2362 (unseeded) vs 2404-2472 (seeded) | **041 additive coverage**: seed the remaining 13 the same way. Purely additive; touches no protected assert. |
| **H-2** | **The link-integrity crawl cannot see a `#view=` fragment.** `run.cjs:1814` does `const file = h.split('#')[0];` before the `VALID_FILES` lookup — which is *why* `deadHash`/`badTarget` stay 0 across all 22 deep-links, but it also means a typo like `settings.html#view=customi**s**ation` (the exact UK-spelling trap flagged in `nav.config.js:112-115`) is **invisible** to `badTarget`. Today it is caught only by hand-written per-spec literals. | run.cjs:1805-1823 · nav.config.js:112-115 | **041 additive coverage**: a **derived** matrix over `NAV_CATEGORIES` — every item whose `route` contains `#view=` must resolve to an existing `[data-tab]` on its target page, in both languages. Today `SP037_DEEPLINKS` / `SP039_DEEPLINKS` / `SP040_VIEWS` / the finance view array are hand-maintained literals, so a 23rd deep-link would get **zero** automatic coverage. |
| **H-3** | `initTabs` (`enhance.js:266`) parses **one** `hashView` and applies it to **every** `[data-tabs]` wrapper on the page. No current page has two tab groups, so there is no live bug — and no test asserts there is only one. | enhance.js:261-273 | **041**: one-line guard (`document.querySelectorAll('[data-tabs]').length <= 1` on admin pages) **or** make the derived matrix group-aware. |

> **RESOLVED BY THE PLAN ROUND (Q-6 / E-04 / R-18) — this either/or is CLOSED, do not re-open it.** The plan adopts the **group-aware** option and **REJECTS** the `[data-tabs] <= 1 per admin page` rule (it would legislate away a legitimate future multi-group page for no honesty gain). The shipped guard is: every deep-link assertion is scoped `[data-tabs="<group>"] [data-tabpanel="<view>"]`, plus detector **X-9** — *no two `[data-tabs]` groups on one page may declare the same tab id*. See `derived-route-matrix-contract.md` §0/§5 (X-9) and `plan.md` §9 T-07. This is a **refinement, not a supersession**: the one-widget guard was a specify-phase proposal, never shipped code.

| **H-4** | `truth010.badPlanned` (run.cjs:1829-1836) is now **vacuous** (zero `planned` items exist), exactly like `plannedNavAnchors === 0` (which the suite already documents as vacuous at run.cjs:237-240). It is retained byte-verbatim per the zero-deletion law. | run.cjs:1829-1836 | **041**: record explicitly as *vacuous-but-retained*. **Do not delete.** Likewise the `is-planned` render branches in `sidebar.js:30-34` / `portal-shell.js:30` and the `data-coming-soon` handler in `enhance.js` — retained, permanently unexercised. |

---

## 7. The two class-5 rows — D-1, and the smallest honest fix

**The defect, restated from the register**: `teachers` (#22), `addTeacher` (#23) and `teacherCategories` (#24) carry
the **byte-identical route string `'teachers.html'`** — no hash, no distinguishing fragment. `enhance.js` implements
exactly two hash routers, `#view=` (tabs, L261-273) and `#step=` (wizard); there is **no drawer-hash mechanism**. A
live probe confirms it: landing on `teachers.html` opens **no drawer**. So «إضافة معلم» promises a form and delivers a
directory, and the three sidebar items are **indistinguishable by outcome**.

Spec 036 declared them "fold-anchors" and said so plainly — *"Spec 036 only points the nav item at this page; no body
edit"* — but **a declaration does not make a destination honest**. This is not a planned item (status is
`implemented`) and not a lock (it renders as a live `<a href>`); it is the register's only **classification 5**.

**Why this is a regression, not a nit** — legacy had **3 (arguably 4)** genuinely distinct teacher-domain sidebar
destinations:

| legacy sidebar label | legacy route | what it actually was | current successor |
|---|---|---|---|
| Teachers | `/management/teachers` | the roster list | ✅ `teachers.html` (#22) |
| **Add New Teacher** | `/management/teachers/create` | **a dedicated 57-field creation page** (forms=1, flds=57) | ❌ collapsed onto `teachers.html` (#23) |
| **Teachers Category** | `/management/teacher-categories` | **its own CRUD page** (forms=2, flds=4, tbl=1) with 3 child routes | ❌ collapsed onto `teachers.html` (#24) |
| Teachers *(label reused)* | `/management/teachers_details` | a Cancel/Absent/Attend table | ~ closest is `teacherKpi` → `teacher-performance.html`, unnamed by any spec |

*(evidence: route-graph.md:238-241, 244, 245, 270, 477, 481 · role-page-inventory-v2.md:203-206, 214 ·
management-teachers-details.md:215-217, 286-288)*

**Smallest honest fix** (specify-only here — **no fix is applied or decided by this register**; the option set is the
canonical **A–G** in `spec.md` §7 D-1, and the choice belongs to `/speckit.plan`):
the **precedent already exists in the product** — Spec 039 refined `books` from bare `library.html` to
`library.html#view=books` *precisely so two nav items pointing at one page would open two distinct surfaces*
(nav.config.js:101). This register's recommendation is therefore the **`books` pattern** — canonical **Option A** —
not a new page and not a new hook:

* **Recommended — canonical Option A** (*refine: distinct `#view=` fragments; zero new mechanism*): give
  `teachers.html` a real tab group and route `addTeacher` / `teacherCategories` at distinct `#view=` fragments,
  resolving in-place exactly like every other promoted item since Spec 035. Cost: one `nav.config.js` change + one
  page-body change (`teachers.html`/`.en`), inside the existing closed hook set, count held at 115, admin menu held
  at 50.
* **Rejected — canonical Option E** (*a standalone `add-teacher.html`*): breaks the 115 count and the PAGES freeze
  (57 → 58), and Spec 036 already rejected it on honesty grounds (teacher creation is a single flat form fully
  realised in the `trn-add` drawer; a standalone page would duplicate it with no added honesty, and no legacy
  multi-step add-teacher wizard exists).
* **Rejected — canonical Option C** (*demote both to honest locks*): dishonest by omission — the target surfaces
  **already exist** and are **already reachable** (the two page-header buttons). This is the same reasoning Spec 040
  used to reject an honest lock for `settingsUsers`.
* **Rejected — canonical Option B** (*a new drawer-hash router, e.g. `#drawer=trn-add`*): a new URL-state mechanism in
  `enhance.js` — it breaches the 0-diff wall and is owned by **Spec 044** (FO-23, the modal/drawer interaction
  system). Barred here.
* **Also rejected — canonical Options D, F, G**: D deletes nav items (zero-deletion); F merely re-declares the
  collapse as intentional (*a declaration does not make a destination honest*); G relabels only, leaving the three
  items indistinguishable by outcome. See `spec.md` §7 for the full scoring.

**Whichever option the spec selects, these register invariants must survive it**: page count **115** · admin menu
**50** · exactly **one** honest lock (`classSalaryReport`) · `FUTURE_ROUTES` **`{}`** · planned **0** ·
`[data-coming-soon]` **0** · teacher **pay-free** (the `trn-add` drawer stays pay-free and password-free; its
CV-upload stays a gate, never `type=file`) · `#page-body` byte-identity for every page not named in the fix's impact
allowlist, proven **non-destructively** (`git show 21502af:<path>` or a detached worktree — **never** `git stash` /
`reset --hard` / `checkout --`).

---

## 8. Standing-law re-verification carried by this register

| Law | Register evidence | Result |
|---|---|---|
| Teacher **pay-free** (global) | rows 51-59 (portal, 16 files, `payHit`/`tchPay`) + rows 26/27 (`noPay` on the admin perf tabs) + the `trn-add` drawer carries no pay field | **0 violations**. `teacher-performance.html` is the sanctioned Spec-024 **B-07 admin exempt board**, linked from **zero** portal pages. |
| Family **zero-pay** | row 64 (`family-billing`, amount-free) + `famPay`/`payFigure` on all family bodies | **0 currency figures** |
| Student **child-view** | rows 69-76; no «لوحة الطالب»/«بوابة الطالب» on any of the 14 files | **0 violations** |
| Finance **no-fake-money** | rows 31-38: authored per-row literals only; `FINANCE_SUMMARY` row-count-only; salaries/staff **figure-free**; banks **no balance**; **0 computed** total/outstanding/balance/profit/VAT/salary/payout | **held** |
| **No-secret / no-fake** | row 46 (Integrations = locked placeholders): `type=password` **0** · `type=file` **0** · `<canvas>` **0** · `.pdf`/`window.open` **0** · credential inputs **0** · authored secret values **0** · fake-"Connected" chips **0** | **held** |
| Closed `data-*` hook set | no row requires a new hook; the D-1 fix's Option N is rejected **because** it would need one | **held** |
| Exactly **one** honest lock | row 37, asserted at 4 independent sites | **held** |
| **Hiding is not authorization** | every one of the 76 items is reachable by URL regardless of the rail panel's `hidden` attribute; no item is access-controlled | **stated, not fixed** — real enforcement is **Spec 043** |
| Zero `href="#"`, zero external links | `links010.deadHash === 0`, `external === 0`, `badTarget === 0` on all 115 pages | **held** (with the caveat in **H-2**) |
| AR/EN route parity | `langRoute()` (`sidebar.js:18-27`) preserves the hash; every AR nav href has the exact `.en` twin | **0 failures** |

---

## Roadmap-provenance caveat (binding, appended by the plan-round reconciliation)

> The committed spec corpus charters, as a spec directory with its own `spec.md`, **only Spec 041**. **Every spec
> number above 041 named anywhere in this file (042 · 043 · 044 · 045–050 · 051–057) is a MAINTAINER-DIRECTED,
> APPEND-ONLY AMENDMENT — recorded in `040-settings-deep-links-subpages/future-owner-register.md` §1 — NOT a
> chartered spec.** Any ownership assignment made here binds whichever spec is eventually chartered into the named
> slot; this file invents no spec number and creates no roadmap entry.
