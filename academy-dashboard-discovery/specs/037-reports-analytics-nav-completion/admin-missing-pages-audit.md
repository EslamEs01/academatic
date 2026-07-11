# Admin Missing-Pages Audit — Spec 037

Every Admin sidebar item from `src/js/nav.config.js` (50 items), classified. Verdict: **0 truly-missing targets, 0 ownerless items.** 3 items are `weak-surface` (owner = this spec, Spec 037). The remaining «قريبًا»/locked items each have an assigned owner (038/039/040).

**Classifications:** `implemented-page` · `implemented-fold-anchor` · `implemented-deeplink` · `future-backend-locked` (disabled+reason) · `still-coming-soon` (planned, owner assigned) · `weak-surface` (implemented but UX-weak) · `missing-target` (none found) · `needs-corrective-spec`.

## Control (12) — all implemented-page

| Nav key | AR | EN | Route | Target exists | Coming-soon | Surface clarity | Classification | Owner | Correction |
|---|---|---|---|---|---|---|---|---|---|
| home | الرئيسية | Home | dashboard.html | ✅ | no | clear | implemented-page | 001 | none |
| sessions | الجلسات | Sessions | sessions.html | ✅ | no | clear | implemented-page | 003 | none |
| schedule | الجدول | Schedule | schedule.html | ✅ | no | clear | implemented-page | 003 | none |
| attendance | الحضور | Attendance | attendance.html | ✅ | no | clear | implemented-page | 005 | none |
| sessionsAnalysis | تحليل الجلسات | Sessions Analysis | sessions-analysis.html | ✅ | no | clear | implemented-page | 026 | none |
| messages | الرسائل | Messages | messages.html | ✅ | no | clear | implemented-page | 034 | none |
| leads | العملاء المحتملون | Leads | leads.html | ✅ | no | clear | implemented-page | 034 | none |
| tasks | المهام | Tasks | tasks.html | ✅ | no | clear | implemented-page | 034 | none |
| announcements | الإعلانات | Announcements | announcements.html | ✅ | no | clear | implemented-page | 034 | none |
| timeConverter | محوّل الوقت | Time Converter | time-converter.html | ✅ | no | clear | implemented-page | 034 | none |
| publicHoliday | العطلات الرسمية | Public Holiday | public-holiday.html | ✅ | no | clear | implemented-page | 026 | none |
| scheduledActions | الإجراءات المجدولة | Scheduled Actions | scheduled-actions.html | ✅ | no | clear | implemented-page | 026 | none |

## Families (9)

| Nav key | AR | EN | Route | Target exists | Hash valid | Coming-soon | Surface clarity | Classification | Owner | Correction |
|---|---|---|---|---|---|---|---|---|---|---|
| families | العائلات | Families | families.html | ✅ | — | no | clear | implemented-page | 004 | none |
| addFamily | إضافة عائلة | Add Family | add-family.html | ✅ | — | no | clear | implemented-page | 004 | none |
| students | الطلاب | Students | students.html | ✅ | — | no | clear | implemented-page | 004 | none |
| courses | الدورات | Courses | courses.html | ✅ | — | no | clear | implemented-page | 006 | none |
| familyCategories | فئات العائلات | Family Categories | families.html | ✅ | — | no | **weak** (filter-only) | **weak-surface** | **037** | strengthen folded Categories board / `#view=categories` |
| groups | المجموعات | Groups | groups.html | ✅ | — | no | clear | implemented-page | 006 | none |
| scheduleSearch | بحث الجدول | Schedule Search | schedule-search.html | ✅ | — | no | clear | implemented-page | 035 | none |
| studentResult | نتائج الطلاب | Student Results | student.html#view=results | ✅ | ✅ | no | **weak** (single student) | **weak-surface** | **037** | cross-student Results board `students.html#view=results` |
| studentEvaluation | تقييم الطلاب | Student Evaluation | student.html#view=evaluation | ✅ | ✅ | no | **weak** (single student) | **weak-surface** | **037** | cross-student Evaluation board `students.html#view=evaluation` |

## Teachers (6)

| Nav key | AR | EN | Route | Target exists | Hash valid | Coming-soon | Surface clarity | Classification | Owner | Correction |
|---|---|---|---|---|---|---|---|---|---|---|
| teachers | المعلمون | Teachers | teachers.html | ✅ | — | no | clear | implemented-page | 007 | none |
| addTeacher | إضافة معلم | Add Teacher | teachers.html | ✅ | — | no | clear (trn-add drawer) | implemented-fold-anchor | 036 | none |
| teacherCategories | فئات المعلمين | Teacher Categories | teachers.html | ✅ | — | no | clear (trn-categories drawer) | implemented-fold-anchor | 036 | none |
| teacherKpi | مؤشرات المعلمين | Teacher KPI | teacher-performance.html | ✅ | — | no | clear | implemented-page | 007 | none |
| sessionsKpi | مؤشر أداء الحصص | Sessions KPI | teacher-performance.html#view=sessions-kpi | ✅ | ✅ | no | clear | implemented-deeplink | 036 | none |
| monthlyPerf | الأداء الشهري | Monthly Performance | teacher-performance.html#view=monthly | ✅ | ✅ | no | clear | implemented-deeplink | 036 | none |

## Reports (11)

| Nav key | AR | EN | Route/status | Target exists | Coming-soon | Surface clarity | Classification | Owner | Correction | Count impact |
|---|---|---|---|---|---|---|---|---|---|---|
| reports | التقارير | Reports | reports.html | ✅ | no | clear | implemented-page | 008 | none | 0 |
| monthlyReports | التقارير الشهرية | Monthly Reports | `planned` | ❌ (no page) | **yes** | «قريبًا» | **still-coming-soon** | **037** | fold as `reports.html#view=monthly` | 0 |
| dataAnalysis | تحليل البيانات | Data Analysis | `planned` | ❌ (no page) | **yes** | «قريبًا» | **still-coming-soon** | **037** | fold as `reports.html#view=analysis` | 0 |
| finance | المالية | Finance | finance.html | ✅ | no | clear | implemented-page | 009/030 | none | 0 |
| invoices | الفواتير | Invoices | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | unlock/board in 038 | — |
| monthlyInvoices | الفواتير الشهرية | Monthly Invoices | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | fold/board in 038 | — |
| salaries | الرواتب | Salaries | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | deep-link finance Salaries tab in 038 | — |
| staffSalaries | رواتب الموظفين | Staff Salaries | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | fold in 038 | — |
| payments | المدفوعات | Payments | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | board in 038 | — |
| classSalaryReport | تقرير رواتب الحصص | Class Salary Report | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | fold in 038 | — |
| banks | البنوك | Banks | disabled (reason) | — | no (locked) | honest lock | future-backend-locked | 038 | deep-link finance Banks tab in 038 | — |

> Note: the 7 finance items are `status:'disabled'` with `reasonKey='nav.reason.finance'` — an **honest visible lock**, not «قريبًا». They are figure-free and owned by Spec 038. Out of Spec 037 scope (reports body stays finance-free).

## Admin (5)

| Nav key | AR | EN | Route/status | Target exists | Coming-soon | Surface clarity | Classification | Owner | Correction |
|---|---|---|---|---|---|---|---|---|---|
| staff | الموظفون | Staff | staff.html | ✅ | no | clear | implemented-page | 031 | none |
| materials | المواد | Materials | `planned` | folded → library.html Materials tab | **yes** | folded (nav still «قريبًا») | still-coming-soon | **039** | flip to fold-anchor `library.html` in 039 |
| books | الكتب | Books | library.html | ✅ | no | clear | implemented-page | 031 | none |
| certificates | الشهادات | Certificates | certificates.html | ✅ | no | clear | implemented-page | 031 | none |
| certificateRequests | طلبات الشهادات | Certificate Requests | `planned` | folded → certificates.html Requests tab | **yes** | folded (nav still «قريبًا») | still-coming-soon | **039** | flip to fold-anchor `certificates.html` in 039 |

## Settings (7)

| Nav key | AR | EN | Route/status | Target exists | Coming-soon | Surface clarity | Classification | Owner | Correction |
|---|---|---|---|---|---|---|---|---|---|
| settings | الإعدادات | Settings | settings.html | ✅ | no | clear | implemented-page | 031 | none |
| settingsGeneral | إعدادات عامة | General | `planned` | folded → settings.html General tab | **yes** | folded (nav «قريبًا») | still-coming-soon | 040 | deep-link `settings.html#view=general` in 040 |
| settingsIntegrations | التكاملات | Integrations | `planned` | folded → settings.html Integrations tab | **yes** | folded | still-coming-soon | 040 | deep-link in 040 |
| settingsCustomization | التخصيص | Customization | `planned` | folded → settings.html Customization tab | **yes** | folded | still-coming-soon | 040 | deep-link in 040 |
| settingsNotifications | الإشعارات | Notifications | `planned` | folded → settings.html Notifications tab | **yes** | folded | still-coming-soon | 040 | deep-link in 040 |
| settingsSecurity | الأمان | Security | `planned` | folded → settings.html Security tab | **yes** | folded | still-coming-soon | 040 | deep-link in 040 |
| settingsUsers | المستخدمون | Users | `planned` | folded → settings.html Users tab / staff.html | **yes** | folded | still-coming-soon | 040 | deep-link in 040 |

## Tally (50)

| Classification | Count | Items |
|---|---|---|
| implemented-page | 26 | 12 control + families/addFamily/students/courses/groups + teachers/teacherKpi + reports/finance + staff/books/certificates + settings + scheduleSearch |
| implemented-fold-anchor | 3 | familyCategories*, addTeacher, teacherCategories |
| implemented-deeplink | 4 | studentResult*, studentEvaluation*, sessionsKpi, monthlyPerf |
| future-backend-locked | 7 | invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks (038) |
| still-coming-soon (owner) | 10 | monthlyReports, dataAnalysis (037); materials, certificateRequests (039); settings×6 (040) |
| **TOTAL** | **50** | admin-menu freeze holds |

`* weak-surface` — the 3 flagged-035 items: familyCategories, studentResult, studentEvaluation (owner 037; see `flagged-035-items-audit.md`).

**missing-target: 0. needs-corrective-spec (ownerless): 0.** After Spec 037 promotes monthlyReports+dataAnalysis, the reports category has **0 planned** items (finance items are `disabled`, not `planned`); still-coming-soon drops to 8 (materials/certificateRequests + settings×6), all owner-assigned.

## Acceptance checks

- Every row above resolves to a real page / deep-link / folded owner / honest lock or planned-with-owner.
- Admin-menu freeze = 50 (smoke line ~1271) stays green.
- Reports 7-card / 2-planned (smoke ~870) and finance 9-planned (smoke ~1036) stay byte-verbatim.
- After 037: `#catpanel-reports` has 0 `.nav-item.is-planned` (new additive assert, mirroring families/teachers).
