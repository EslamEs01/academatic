# Admin Nav Completion Matrix — Spec 033 (THE main artifact)

All **50** admin nav items classified. Source: `app/src/js/nav.config.js` + the Spec-032 coverage baseline + legacy `output/roles/admin/` + `output/combined/*` evidence. **0 unclassified.**

Column key: **Status** = current nav.config status · **Route/Page** = current · **State** = user-visible (link / قريبًا / 🔒) · **Final** = recommended final state (KEEP / DEEP-LINK / FOLD-ANCHOR / PAGE / PAGE-or-FOLD) · **P?** needs standalone page · **DL?** can deep-link · **F?** can fold · **FB?** can stay future-backend (final action only) · **-قريبًا** remove coming-soon · **-🔒** remove lock · **Owner** follow-up spec · **Accept** acceptance check.

## Control (12)
| id | AR label | Status | Route/Page | State | Legacy evidence | Cur. owner | Final | Rec. route/deep-link | P? | DL? | F? | FB? | -قريبًا | -🔒 | Owner | Accept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | الرئيسية | implemented | dashboard.html | link | admin/pages dashboard | dashboard | KEEP | dashboard.html | – | – | – | – | – | – | — | route live |
| sessions | الجلسات | implemented | sessions.html | link | sessions pages | sessions | KEEP | sessions.html | – | – | – | – | – | – | — | route live |
| schedule | الجدول | implemented | schedule.html | link | schedule pages | schedule | KEEP | schedule.html | – | – | – | – | – | – | — | route live |
| attendance | الحضور | implemented | attendance.html | link | attendance pages | attendance | KEEP | attendance.html | – | – | – | – | – | – | — | route live |
| sessionsAnalysis | تحليل الجلسات | implemented | sessions-analysis.html | link | ops evidence | sessions-analysis | KEEP | sessions-analysis.html | – | – | – | – | – | – | — | route live |
| messages | المحادثات | planned | — | قريبًا | admin messages pages | none | PAGE | messages.html | Y | – | – | Y(send) | Y | – | 034 | inbox+thread+compose; send gated |
| leads | الطلبات الجديدة | planned | — | قريبًا | admin new-requests | none | PAGE | leads.html | Y | – | – | Y(persist) | Y | – | 034 | requests list+detail+convert; persist gated |
| tasks | المهام | planned | — | قريبًا | admin tasks | none | PAGE | tasks.html | Y | – | – | Y(persist) | Y | – | 034 | board/list+create; persist gated |
| announcements | الإعلانات والإشعارات | planned | — | قريبًا | admin announcements | none | PAGE | announcements.html | Y | – | – | Y(deliver) | Y | – | 034 | list+compose; publish gated |
| timeConverter | محول الوقت | planned | — | قريبًا | admin tool | none | PAGE | time-converter.html | Y | – | – | N | Y | – | 034 | **fully frontend tool, no gate** |
| publicHoliday | العطلات الرسمية | implemented | public-holiday.html | link | ops evidence | public-holiday | KEEP | public-holiday.html | – | – | – | – | – | – | — | route live |
| scheduledActions | الإجراءات المجدولة | implemented | scheduled-actions.html | link | ops evidence | scheduled-actions | KEEP | scheduled-actions.html | – | – | – | – | – | – | — | route live |

## Families / Students (9)
| id | AR label | Status | Route/Page | State | Legacy evidence | Cur. owner | Final | Rec. route/deep-link | P? | DL? | F? | FB? | -قريبًا | -🔒 | Owner | Accept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| families | العائلات | implemented | families.html | link | families pages | families | KEEP | families.html | – | – | – | – | – | – | — | route live |
| addFamily | إضافة عائلة | implemented | add-family.html | link | add-family wizard | add-family | KEEP | add-family.html | – | – | – | – | – | – | — | route live |
| students | الطلاب | implemented | students.html | link | students pages | students | KEEP | students.html | – | – | – | – | – | – | — | route live |
| courses | الدورات | implemented | courses.html | link | courses pages | courses | KEEP | courses.html | – | – | – | – | – | – | — | route live |
| familyCategories | فئات العائلات | planned | — (FOLD) | قريبًا | family-category drawer | family.html fam-cat drawer (Spec 027) | FOLD-ANCHOR | families.html (folded owner) | – | – | Y | – | Y | – | 035 | anchor→families.html; drawer reachable; no «قريبًا» |
| groups | المجموعات | implemented | groups.html | link | groups pages | groups | KEEP | groups.html | – | – | – | – | – | – | — | route live |
| scheduleSearch | بحث الجدول | planned | — | قريبًا | availability search | none | PAGE-or-FOLD | schedule-search.html OR schedule.html#view=search | Y | Y | Y | Y(book) | Y | – | 035 | search form+results; booking gated |
| studentResult | نتائج الطلاب | planned | — | قريبًا | student results board | (student.html results tab) | PAGE-or-DL | student-results.html OR student.html#view=results | Y | Y | – | – | Y | – | 035 | display-only board; NO computed score/chart |
| studentEvaluation | تقييم الطلاب | planned | — | قريبًا | student evaluation board | (student.html evaluation tab) | PAGE-or-DL | student-evaluation.html OR student.html#view=evaluation | Y | Y | – | – | Y | – | 035 | display-only board; NO computed score |

## Teachers (6)
| id | AR label | Status | Route/Page | State | Legacy evidence | Cur. owner | Final | Rec. route/deep-link | P? | DL? | F? | FB? | -قريبًا | -🔒 | Owner | Accept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| teachers | المعلمون | implemented | teachers.html | link | teachers pages | teachers | KEEP | teachers.html | – | – | – | – | – | – | — | route live |
| addTeacher | إضافة معلم | planned | — (FOLD) | قريبًا | add-teacher form | teachers.html trn-add drawer (Spec 032) | FOLD-ANCHOR | teachers.html (or standalone add-teacher.html to mirror addFamily) | opt | – | Y | – | Y | – | 036 | anchor→teachers.html; form reachable; no «قريبًا» |
| teacherCategories | فئات المعلمين | planned | — (FOLD) | قريبًا | teacher-category drawer | teachers.html trn-categories drawer (Spec 028) | FOLD-ANCHOR | teachers.html (folded owner) | – | – | Y | – | Y | – | 036 | anchor→teachers.html; drawer reachable |
| teacherKpi | مؤشر أداء المعلمين | implemented | teacher-performance.html | link | perf board | teacher-performance | KEEP | teacher-performance.html | – | – | – | – | – | – | — | route live |
| sessionsKpi | مؤشر أداء الحصص | planned | — | قريبًا | sessions KPI board | none | FOLD-or-PAGE | teacher-performance.html#view=sessions-kpi OR standalone | opt | Y | Y | – | Y | – | 036 | display board; NO computed rank/chart |
| monthlyPerf | الأداء الشهري | planned | — | قريبًا | monthly perf board | none | FOLD-or-PAGE | teacher-performance.html#view=monthly OR standalone | opt | Y | Y | – | Y | – | 036 | display board; NO computed rank/chart |

## Reports / Finance (11)
| id | AR label | Status | Route/Page | State | Legacy evidence | Cur. owner | Final | Rec. route/deep-link | P? | DL? | F? | FB? | -قريبًا | -🔒 | Owner | Accept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| reports | التقارير | implemented | reports.html | link | reports pages | reports | KEEP | reports.html | – | – | – | – | – | – | — | route live |
| monthlyReports | التقارير الشهرية | planned | — | قريبًا | monthly reports board | none | FOLD-or-PAGE | reports.html#view=monthly OR standalone | opt | Y | Y | – | Y | – | 037 | display board; no chart |
| dataAnalysis | تحليل البيانات | planned | — | قريبًا | analytics page (legacy chart) | none | FOLD-or-PAGE | reports.html#view=analysis OR standalone | opt | Y | Y | Y(engine) | Y | – | 037 | display-only authored board; **NO `<canvas>`/computed analytics** |
| finance | المالية | implemented | finance.html | link | finance pages | finance | KEEP | finance.html | – | – | – | – | – | – | — | route live |
| invoices | الفواتير | disabled | — | 🔒 | invoice ledger | none | PAGE-or-FOLD | invoices.html OR finance.html#view=invoices | Y | Y | Y | Y(pay) | – | Y | 038 | figure-free/amount-literal display; Record/Export gated |
| monthlyInvoices | الفواتير الشهرية | disabled | — | 🔒 | monthly invoice board | none | FOLD-or-PAGE | finance/reports monthly tab OR standalone | opt | Y | Y | Y | – | Y | 038 | figure-free board; no arithmetic |
| salaries | الرواتب | disabled | — (FOLD tab exists) | 🔒 | salaries board | finance.html Salaries tab (Spec 030) | DEEP-LINK | finance.html#view=salaries | – | Y | Y | – | – | Y | 038 | deep-link to existing figure-free tab; unlock |
| staffSalaries | رواتب الموظفين | disabled | — | 🔒 | staff-salary board | (finance salaries tab) | FOLD-or-PAGE | finance salaries tab OR standalone | opt | Y | Y | Y | – | Y | 038 | figure-free board |
| payments | المدفوعات | disabled | — | 🔒 | payments ledger | none | PAGE-or-FOLD | payments.html OR finance.html#view=payments | Y | Y | Y | Y(pay) | – | Y | 038 | figure-free ledger; Record-payment gated |
| classSalaryReport | تقرير رواتب الفصول | disabled | — | 🔒 | class-salary report | none | FOLD-or-PAGE | finance/reports tab OR standalone | opt | Y | Y | Y | – | Y | 038 | figure-free board |
| banks | البنوك | disabled | — (FOLD tab exists) | 🔒 | banks board | finance.html Banks tab (Spec 030) | DEEP-LINK | finance.html#view=banks | – | Y | Y | – | – | Y | 038 | deep-link to existing tab; unlock |

## Admin (5)
| id | AR label | Status | Route/Page | State | Legacy evidence | Cur. owner | Final | Rec. route/deep-link | P? | DL? | F? | FB? | -قريبًا | -🔒 | Owner | Accept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| staff | الفريق والصلاحيات | implemented | staff.html | link | staff pages | staff | KEEP | staff.html | – | – | – | – | – | – | — | route live |
| materials | المواد التعليمية | planned | — (FOLD tab exists) | قريبًا | materials catalog | library.html Materials tab (Spec 031) | DEEP-LINK | library.html#view=materials | – | Y | Y | – | Y | – | 039 | deep-link to existing tab; no «قريبًا» |
| books | المكتبة | implemented | library.html | link | library pages | library | KEEP | library.html | – | – | – | – | – | – | — | route live |
| certificates | الشهادات | implemented | certificates.html | link | certificates pages | certificates | KEEP | certificates.html | – | – | – | – | – | – | — | route live |
| certificateRequests | طلبات الشهادات | planned | — (FOLD tab exists) | قريبًا | cert requests queue | certificates.html Requests tab (Spec 031) | DEEP-LINK | certificates.html#view=requests | – | Y | Y | – | Y | – | 039 | deep-link to existing tab |

## Settings (7)
| id | AR label | Status | Route/Page | State | Legacy evidence | Cur. owner | Final | Rec. route/deep-link | P? | DL? | F? | FB? | -قريبًا | -🔒 | Owner | Accept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| settings | الإعدادات | implemented | settings.html | link | settings pages | settings | KEEP | settings.html | – | – | – | – | – | – | — | route live |
| settingsGeneral | عام | planned | — (FOLD tab exists) | قريبًا | general settings | settings General tab (Spec 031) | DEEP-LINK | settings.html#view=general | – | Y | Y | – | Y | – | 040 | deep-link; no «قريبًا» |
| settingsIntegrations | التكاملات | planned | — (FOLD tab exists) | قريبًا | integrations | settings Integrations tab | DEEP-LINK | settings.html#view=integrations | – | Y | Y | – | Y | – | 040 | deep-link; connect stays gate |
| settingsCustomization | التخصيص | planned | — (FOLD tab exists) | قريبًا | customization | settings Customization tab | DEEP-LINK | settings.html#view=customization | – | Y | Y | – | Y | – | 040 | deep-link; Save stays gate |
| settingsNotifications | الإشعارات | planned | — (FOLD tab exists) | قريبًا | notifications matrix | settings Notifications tab | DEEP-LINK | settings.html#view=notifications | – | Y | Y | – | Y | – | 040 | deep-link; figure-free matrix |
| settingsSecurity | الأمان | planned | — (FOLD tab exists) | قريبًا | security | settings Security tab | DEEP-LINK | settings.html#view=security | – | Y | Y | – | Y | – | 040 | deep-link; no secret/OTP control |
| settingsUsers | المستخدمون والموظفون | planned | — (FOLD tab exists) | قريبًا | users↔staff (B-16) | settings Users tab → staff.html | DEEP-LINK | settings.html#view=users (or staff.html) | – | Y | Y | – | Y | – | 040 | deep-link to canonical owner |

## Roll-up
- **KEEP (implemented): 20.**
- **DEEP-LINK (surface exists): 10** — salaries, banks, materials, certificateRequests, settingsGeneral, settingsIntegrations, settingsCustomization, settingsNotifications, settingsSecurity, settingsUsers.
- **FOLD-ANCHOR (drawer surface exists, nav → host page): 3** — familyCategories, addTeacher, teacherCategories.
- **PAGE (new standalone, no surface): 5 firm** — messages, leads, tasks, announcements, timeConverter (Control) **+ up to 7 optional** — scheduleSearch, studentResult, studentEvaluation, invoices, payments (recommended standalone) and sessionsKpi/monthlyPerf/monthlyReports/dataAnalysis/monthlyInvoices/staffSalaries/classSalaryReport (recommended fold, standalone optional).
- **FOLD-or-PAGE (display board; fold recommended, standalone optional): 9** — sessionsKpi, monthlyPerf, monthlyReports, dataAnalysis, monthlyInvoices, staffSalaries, classSalaryReport (+ scheduleSearch, invoices, payments overlap the PAGE set as "recommended standalone").
- **Unclassified: 0.**
- Every non-implemented item (30) has a follow-up owner (034–040) + a final-freeze re-check in 041.
