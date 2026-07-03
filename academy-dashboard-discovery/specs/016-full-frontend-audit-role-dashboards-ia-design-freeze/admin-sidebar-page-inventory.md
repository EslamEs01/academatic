# Admin Sidebar Page Inventory (Spec 016 — every item classified; folds the locked/«قريبًا» replacement plan)

Source of truth: the user-provided six-group CURRENT legacy sidebar list + `design-references/sidebar-reference.png` (control group verified visually) + the crawl (145 admin route templates) + current `nav.config.js`. Naming variants unified (الدردشة=المحادثات · عطلة عامة=العطلات الرسمية · الإعلان والإخطار=الإعلانات والإشعارات · جدول المعلمين=بحث الجدول/جدول كل المعلمين family). **Zero unclassified items.**

Honest end-states (the replacement plan vocabulary): **REAL** = working fixture page · **LOCK** = permission-locked shell (page exists, clearly labeled locked-with-reason, content preview visible) · **GATE** = backendRequired shell (page exists, capability explained, writes gated). No item may end as a dead link, blank page, or bare «قريبًا» toast.

## Dashboard / Control → Spec 021 (except already-built)

| Item | Legacy route | Current state | Classification | End-state · spec |
|---|---|---|---|---|
| الرئيسية | /management/home | `dashboard.html` built (001/003/005 polish) | already-built | REAL · done (021 may add ops slices) |
| الجلسات | courseclasses/session family | `sessions.html` built | already-built | REAL · done |
| الجدول الدراسي | timetable family | `schedule.html` built (tabs+grid) | already-built | REAL · done |
| الحضور | (legacy: modals only, no page) | `attendance.html` built — BETTER than legacy | already-built | REAL · 021 adds per-student roster lens (G14) |
| تحليل الجلسات | /management/sessions_analysis | planned (`sessionsAnalysis`) | coming-soon-needs-frontend-page | REAL (display-only KPIs, authored) · **021** |
| المحادثات / الدردشة | /management/chat | planned (`messages`) | coming-soon-needs-frontend-page | GATE (thread preview display-only; send backendRequired) · **021** |
| الطلبات الجديدة | /management/new-requests family | planned (`leads`) | coming-soon-needs-frontend-page | REAL funnel preview (stages as cards; submissions GATE) · **021** |
| المهام | /management/tickets | planned (`tasks`) | coming-soon-needs-frontend-page | REAL (authored board; manage GATE) · **021** |
| الإعلانات والإشعارات | public-advertisement (+settings/notification matrix) | planned (`announcements`) | coming-soon-needs-frontend-page | REAL preview + send GATE · **021** (routing matrix page → 026 settings) |
| محول الوقت | /management/time-convertor | planned (`timeConverter`) | coming-soon-needs-frontend-page | REAL (static TZ table; display-only per no-time-zone-engine rule) · **021** |
| العطلات الرسمية | /management/public-holiday | planned (`publicHoliday`) | coming-soon-needs-frontend-page | REAL list preview; bulk-absence write GATE · **021** |
| الإجراءات المجدولة | /management/scheduled-actions | planned (`scheduledActions`) | coming-soon-needs-frontend-page | REAL list preview; automation GATE (no scheduled-actions engine) · **021** |
| (crawl-only) قوائم الانتظار | /management/total-queues | not in nav | can-be-merged | folds into sessions/attendance band · **021** |
| (crawl-only) صناديق طلبات الجدولة | schedule-sessions/trials-response, request-schedule | not in nav | can-be-merged | one "schedule requests" inbox preview · **021** |

## Families & Students → Spec 022 (except already-built)

| Item | Route | Current | Classification | End-state · spec |
|---|---|---|---|---|
| العائلات | /management/families | `families.html` + `family.html` built | already-built | REAL · done |
| إضافة عائلة | families/create | `add-family.html` wizard built | already-built | REAL · done |
| الطلاب | /management/student | `students.html` + `student.html` built | already-built | REAL · done |
| الدورات | /management/courses | `courses.html` + `course.html` built | already-built | REAL · 022 deepens Learning Path (G6) |
| المجموعات | group/index | `groups.html` + `group.html` built | already-built | REAL · done |
| فئات العائلات | categories/families | planned (`familyCategories`) | coming-soon-needs-frontend-page | REAL (labels + assignment preview; save GATE) · **022** |
| بحث الجدول | search-schedule | planned (`scheduleSearch`) | coming-soon-needs-frontend-page | REAL (availability-matcher preview; async search GATE) · **022** |
| نتائج الطلاب | (no legacy route — teacher update-result/forms) | planned (`studentResult`) | dedicated-page-needed | REAL thin page over profile Results content, links to profiles · **022** |
| تقييم الطلاب | (no legacy route) | planned (`studentEvaluation`) | dedicated-page-needed | REAL thin page over Evaluation rubric content · **022** |
| (crawl-only) نماذج تقارير الطلاب | forms/students | not in nav | can-be-merged | into 024 forms/reports family · **024** |

## Teachers → Spec 023 (except already-built)

| Item | Route | Current | Classification | End-state · spec |
|---|---|---|---|---|
| المعلمون | /management/teachers | `teachers.html` + `teacher.html` built | already-built | REAL · done |
| إضافة معلم | teachers/create | planned (`addTeacher`) | coming-soon-needs-frontend-page | REAL wizard preview (save GATE; **zero pay fields rendered** — legacy form's payout section stays GATE) · **023** |
| فئات المعلمين | teacher-categories | planned (`teacherCategories`) | coming-soon-needs-frontend-page | REAL (labels + members preview; save GATE) · **023** |
| مؤشرات أداء المعلمين | teacher-feedback/KPIs | `teacher-performance.html` built (007) | already-built | REAL · done |
| مؤشر أداء الحصص | sessions_analysis teacher-lens | planned (`sessionsKpi`) | coming-soon-needs-frontend-page | REAL display-only board (authored, no computed score) · **023** |
| الأداء الشهري | teacher-feedback?year | planned (`monthlyPerf`) | coming-soon-needs-frontend-page | REAL display-only monthly view · **023** |
| (crawl-only) تقرير حضور المعلمين | teachers_details | not in nav | can-be-merged | band inside 023 performance family · **023** |
| (crawl-only) جدول كل المعلمين | all/teachers/timetable | covered by schedule teacher-lens (003) | already-covered | REAL · done (023 may add a dedicated view if the lens proves insufficient — needs-decision resolved: lens suffices, dedicated page only as display-only reuse) |

## Reports & Finance → Specs 024 + 025

| Item | Route | Current | Classification | End-state · spec |
|---|---|---|---|---|
| التقارير | reports hub | `reports.html` built (008) | already-built | REAL · done |
| التقارير الشهرية | monthly-plans/forms family | planned (`monthlyReports`) | coming-soon-needs-frontend-page | REAL display-only · **024** |
| تحليل البيانات | analysis-student/-course | planned (`dataAnalysis`) | coming-soon-needs-frontend-page | REAL display-only (stat cards, NO charts) · **024** |
| المالية | accounting | `finance.html` built (009) | already-built | REAL · 025 deepens |
| الفواتير | invoices | disabled | locked-needs-honest-page | REAL fixture list (009 data) + payment-record GATE · **025** |
| الفواتير الشهرية | monthly-invoices | disabled | locked-needs-honest-page | REAL fixture list + GATE · **025** |
| الرواتب | salaries 💰 | disabled | backendRequired-shell | GATE shell: capability explained, **zero figures**, payroll = backend · **025** |
| رواتب الموظفين | staff-salaries 💰 | disabled | backendRequired-shell | GATE shell, zero figures · **025** |
| المدفوعات | payouts + settings/payments 💰 | disabled | backendRequired-shell | GATE shell (methods/providers preview, keys never) · **025** |
| تقرير رواتب الفصول | salary-class-report 💰 | disabled | backendRequired-shell | GATE shell, zero figures · **025** |
| البنوك | banks | disabled | locked-needs-honest-page | REAL fixture label list (no balances) + CRUD GATE · **025** |
| (crawl-only) المصروفات وبنودها | expense/heads 💰 | 009 planned card | backendRequired-shell | GATE shell · **025** |
| (crawl-only) تحليلات الفواتير والأرباح | analysis-invoices/-expenses 💰 | 009 planned card | backendRequired-shell | GATE shell (status language, no figures) · **025** |

## Management → Spec 026

| Item | Route | Current | Classification | End-state · spec |
|---|---|---|---|---|
| الفريق والصلاحيات | admins + permission matrix | planned (`staff`) | coming-soon-needs-frontend-page | REAL directory preview + RBAC matrix display-only; saves GATE (**staff salary field never rendered**) · **026** |
| المواد التعليمية | materials (+legacy Subjects folded) | planned (`materials`) | coming-soon-needs-frontend-page | REAL catalog · **026** |
| المكتبة | library | planned (`books`) | coming-soon-needs-frontend-page | REAL browse; upload GATE · **026** |
| الشهادات | pdf designer | planned (`certificates`) | coming-soon-needs-frontend-page | REAL template preview; designer GATE · **026** |
| طلبات الشهادات | certificate-requests | planned (`certificateRequests`) | coming-soon-needs-frontend-page | REAL queue preview; approve GATE · **026** |

## Settings → Spec 026

| Item | Route | Current | Classification | End-state · spec |
|---|---|---|---|---|
| الإعدادات (hub) | settings/* | `settings.html` built shell (002) | built-but-needs-redesign | REAL hub deepened · **026** |
| عام | settings/general | planned | coming-soon-needs-frontend-page | REAL display + save GATE · **026** |
| التكاملات | settings/integrations (11 configs) | planned | coming-soon-needs-frontend-page | REAL catalog; connect GATE (keys never shown/faked) · **026** |
| التخصيص | customisation (personalisation; message-builder 504) | planned | coming-soon-needs-frontend-page | REAL theming preview (already real theme controls!); builder GATE (504 never cloned) · **026** |
| الإشعارات | settings/notification matrix | planned | coming-soon-needs-frontend-page | REAL matrix display-only; toggles GATE · **026** |
| الأمان | settings/security data/policy | planned | coming-soon-needs-frontend-page | GATE shell (import/backup/policy = backend) · **026** |
| المستخدمون والموظفون | admins family | planned (`settingsUsers`) | can-be-merged | merged with الفريق والصلاحيات page (one staff surface, linked from both nav spots or one item retired — 026 decides the single home) · **026** |

## Totals (re-verified at plan time)

**57 inventoried rows** (the 50-item user sidebar list + 7 crawl-only additions) → already-built **13** · built-but-needs-redesign **1** (settings hub) · coming-soon-needs-frontend-page **26** · locked-needs-honest-page **3** · backendRequired-shell **6** · dedicated-page-needed **2** · can-be-merged **5** · already-covered **1** (all-teachers timetable lens) — sum 57, zero unclassified. Intentionally-excluded = 0 at sidebar level (exclusions are route-level anti-patterns, see the matrix). Future ownership: **021×10 · 022×4 · 023×5 · 024×3 · 025×9 · 026×12** (43 future-owned rows + 13 built + 1 covered = 57; the forms/students merge row counts once, under 024).
