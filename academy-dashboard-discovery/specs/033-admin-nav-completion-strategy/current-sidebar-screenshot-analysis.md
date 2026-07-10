# Current Sidebar Screenshot Analysis — Spec 033

Per-category analysis of the current Admin sidebar states. Source frames: `app/screenshots/dashboard__ar__light__desktop.png` (default = control), `…cat-families.png`, `…cat-teachers.png`, `…cat-reports.png` / `…dark…finance-group__cat-reports.png` (viewed), `…cat-admin.png`, `…cat-settings.png`. State legend cross-validated against `nav.config.js`: **IMPL** = active `<a>` link · **قريبًا** = planned non-navigating button · **🔒** = disabled-with-reason lock · **FOLD** = a real frontend surface exists elsewhere but the nav item still shows «قريبًا».

Fields per item: Displayed label · Displayed state · Class · Problem visible to user? · Recommended correction · Owner spec.

## Control (12 items)
| Label (AR) | State | Class | Visible problem? | Recommended correction | Owner |
|---|---|---|---|---|---|
| الرئيسية (home) | IMPL | implemented | No | keep route | — |
| الجلسات (sessions) | IMPL | implemented | No | keep route | — |
| الجدول (schedule) | IMPL | implemented | No | keep route | — |
| الحضور (attendance) | IMPL | implemented | No | keep route | — |
| تحليل الجلسات (sessionsAnalysis) | IMPL | implemented | No | keep route | — |
| المحادثات (messages) | قريبًا | planned, no surface | Yes — dead label | standalone page (inbox + thread + compose; send gated) | 034 |
| الطلبات الجديدة (leads) | قريبًا | planned, no surface | Yes | standalone page (requests inbox + detail + convert; persist gated) | 034 |
| المهام (tasks) | قريبًا | planned, no surface | Yes | standalone page (task board/list + create; persist gated) | 034 |
| الإعلانات والإشعارات (announcements) | قريبًا | planned, no surface | Yes | standalone page (list + compose; publish gated) | 034 |
| محول الوقت (timeConverter) | قريبًا | planned, no surface | Yes — it is a pure client tool | standalone page — **fully frontend, no gate** | 034 |
| العطلات الرسمية (publicHoliday) | IMPL | implemented | No | keep route | — |
| الإجراءات المجدولة (scheduledActions) | IMPL | implemented | No | keep route | — |

## Families / Students (9 items)
| Label (AR) | State | Class | Visible problem? | Recommended correction | Owner |
|---|---|---|---|---|---|
| العائلات (families) | IMPL | implemented | No | keep route | — |
| إضافة عائلة (addFamily) | IMPL | implemented | No | keep route | — |
| الطلاب (students) | IMPL | implemented | No | keep route | — |
| الدورات (courses) | IMPL | implemented | No | keep route | — |
| فئات العائلات (familyCategories) | قريبًا | FOLD (fam-cat drawer, Spec 027) | Yes — surface exists, label lies | real anchor → families.html (documented folded owner); remove «قريبًا» | 035 |
| المجموعات (groups) | IMPL | implemented | No | keep route | — |
| بحث الجدول (scheduleSearch) | قريبًا | planned, no surface | Yes | standalone page (availability search + results; booking gated) OR schedule.html search tab | 035 |
| نتائج الطلاب (studentResult) | قريبًا | planned (PLAN-029) | Yes | display-only board — standalone page OR deep-link student.html#view=results | 035 |
| تقييم الطلاب (studentEvaluation) | قريبًا | planned (PLAN-029) | Yes | display-only board — standalone page OR deep-link student.html#view=evaluation | 035 |

## Teachers (6 items)
| Label (AR) | State | Class | Visible problem? | Recommended correction | Owner |
|---|---|---|---|---|---|
| المعلمون (teachers) | IMPL | implemented | No | keep route | — |
| إضافة معلم (addTeacher) | قريبًا | FOLD (trn-add drawer, Spec 032) | Yes — surface exists, label lies | real anchor → teachers.html (folded owner); remove «قريبًا» (or standalone add-teacher.html to mirror add-family) | 036 |
| فئات المعلمين (teacherCategories) | قريبًا | FOLD (trn-categories drawer, Spec 028) | Yes | real anchor → teachers.html (folded owner); remove «قريبًا» | 036 |
| مؤشر أداء المعلمين (teacherKpi) | IMPL | implemented | No | keep route (teacher-performance.html) | — |
| مؤشر أداء الحصص (sessionsKpi) | قريبًا | planned (PLAN-029) | Yes | display-only board — fold as a teacher-performance.html tab (no computed rank/chart) OR standalone | 036 |
| الأداء الشهري (monthlyPerf) | قريبًا | planned (PLAN-029) | Yes | display-only board — fold as a teacher-performance.html tab OR standalone | 036 |

## Reports / Finance (11 items)
| Label (AR) | State | Class | Visible problem? | Recommended correction | Owner |
|---|---|---|---|---|---|
| التقارير (reports) | IMPL | implemented | No | keep route | — |
| التقارير الشهرية (monthlyReports) | قريبًا | planned (PLAN-029) | Yes | display-only board — fold as a reports.html tab OR standalone | 037 |
| تحليل البيانات (dataAnalysis) | قريبًا | planned (PLAN-029) | Yes | display-only authored board — fold as a reports.html tab (**NO computed chart/analytics**) OR stay future-backend if no honest display | 037 |
| المالية (finance) | IMPL | implemented | No | keep route | — |
| الفواتير (invoices) | 🔒 | disabled (finance) | Yes — misleading lock | figure-free display page (Spec-009 amount literals, no arithmetic) + Record/Export gated | 038 |
| الفواتير الشهرية (monthlyInvoices) | 🔒 | disabled | Yes | figure-free monthly-invoice board — fold into finance/reports tab OR standalone | 038 |
| الرواتب (salaries) | 🔒 | disabled — surface EXISTS (Spec 030 tab) | Yes — surface exists, lock lies | deep-link finance.html#view=salaries; **remove lock** | 038 |
| رواتب الموظفين (staffSalaries) | 🔒 | disabled | Yes | figure-free staff-salary board — fold into finance salaries tab OR standalone | 038 |
| المدفوعات (payments) | 🔒 | disabled | Yes | figure-free payments ledger page; Record-payment gated | 038 |
| تقرير رواتب الفصول (classSalaryReport) | 🔒 | disabled | Yes | figure-free class-salary board — fold into finance/reports OR standalone | 038 |
| البنوك (banks) | 🔒 | disabled — surface EXISTS (Spec 030 tab) | Yes — surface exists, lock lies | deep-link finance.html#view=banks; **remove lock** | 038 |

## Admin (5 items)
| Label (AR) | State | Class | Visible problem? | Recommended correction | Owner |
|---|---|---|---|---|---|
| الفريق والصلاحيات (staff) | IMPL | implemented | No | keep route | — |
| المواد التعليمية (materials) | قريبًا | FOLD (library Materials tab, Spec 031) | Yes — surface exists, label lies | deep-link library.html#view=materials; remove «قريبًا» | 039 |
| المكتبة (books) | IMPL | implemented | No | keep route (library.html) | — |
| الشهادات (certificates) | IMPL | implemented | No | keep route | — |
| طلبات الشهادات (certificateRequests) | قريبًا | FOLD (certificates Requests tab, Spec 031) | Yes | deep-link certificates.html#view=requests; remove «قريبًا» | 039 |

## Settings (7 items)
| Label (AR) | State | Class | Visible problem? | Recommended correction | Owner |
|---|---|---|---|---|---|
| الإعدادات (settings) | IMPL | implemented | No | keep route | — |
| عام (settingsGeneral) | قريبًا | FOLD (settings General tab, Spec 031) | Yes — tab exists, label lies | deep-link settings.html#view=general; remove «قريبًا» | 040 |
| التكاملات (settingsIntegrations) | قريبًا | FOLD (Integrations tab) | Yes | deep-link settings.html#view=integrations | 040 |
| التخصيص (settingsCustomization) | قريبًا | FOLD (Customization tab) | Yes | deep-link settings.html#view=customization | 040 |
| الإشعارات (settingsNotifications) | قريبًا | FOLD (Notifications tab) | Yes | deep-link settings.html#view=notifications | 040 |
| الأمان (settingsSecurity) | قريبًا | FOLD (Security tab) | Yes | deep-link settings.html#view=security | 040 |
| المستخدمون والموظفون (settingsUsers) | قريبًا | FOLD (Users tab → staff, B-16) | Yes | deep-link settings.html#view=users (or staff.html); remove «قريبًا» | 040 |

## Summary
- **20 IMPL** — no problem, keep.
- **23 «قريبًا»** — all a visible problem: 11 have a surface already (relabel to real anchor/deep-link), 12 have no surface (build page or display board).
- **7 🔒 locks** — all a visible problem: 2 have a surface already (salaries/banks → deep-link, unlock), 5 need a figure-free display shell with gated money actions.
- **Net: 30/50 items show a misleading «قريبًا» or lock today; all 30 are recorded with a correction + owner.**
