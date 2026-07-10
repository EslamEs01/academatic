# Coming-Soon & Locks Register — Spec 033

Every visible «قريبًا» (23 planned items) and every 🔒 lock (7 disabled items) = **30 markers**, each recorded with why it appears, whether a frontend UI is possible, the recommended resolution, the owner spec, and an acceptance check. **No unresolved row.**

Marker key: **قريبًا** = planned non-navigating button · **🔒** = disabled-with-reason (`nav.reason.finance`).

## «قريبًا» markers (23)
| # | Category | Item | Marker | Why it appears today | Frontend UI possible? | Recommended resolution | Owner | Accept |
|---|---|---|---|---|---|---|---|---|
| CS-01 | Control | messages | قريبًا | no surface; needs a real message-delivery engine | Yes (inbox+thread+compose shell) | standalone messages.html; send=backendRequired | 034 | page opens; send gated; no fake sent |
| CS-02 | Control | leads | قريبًا | no surface; needs real CRM ingestion | Yes (requests inbox+detail+convert form) | standalone leads.html; convert=backendRequired | 034 | page opens; persist gated |
| CS-03 | Control | tasks | قريبًا | no surface; needs real task persistence | Yes (board/list+create form) | standalone tasks.html; save=backendRequired | 034 | page opens; persist gated |
| CS-04 | Control | announcements | قريبًا | no surface; needs real broadcast delivery | Yes (list+compose form) | standalone announcements.html; publish=backendRequired | 034 | page opens; publish gated |
| CS-05 | Control | timeConverter | قريبًا | no surface; but it is a **pure client tool** | Yes — fully | standalone time-converter.html; **no gate needed** | 034 | tool computes locally; no backend |
| CS-06 | Families | familyCategories | قريبًا | surface EXISTS (fam-cat drawer, Spec 027) — label misleads | Yes (exists) | real anchor → families.html (folded owner); remove «قريبًا» | 035 | nav navigates; drawer reachable; no قريبًا |
| CS-07 | Families | scheduleSearch | قريبًا | no surface; availability search | Yes (search form+results board) | schedule-search.html OR schedule.html#view=search; booking gated | 035 | search UI shows; booking gated |
| CS-08 | Families | studentResult | قريبًا | no dedicated admin board (per-student tab exists) | Yes (display board) | student-results.html OR deep-link student.html#view=results | 035 | display board; NO computed score |
| CS-09 | Families | studentEvaluation | قريبًا | no dedicated admin board (per-student tab exists) | Yes (display board) | student-evaluation.html OR deep-link student.html#view=evaluation | 035 | display board; NO computed score |
| CS-10 | Teachers | addTeacher | قريبًا | surface EXISTS (trn-add drawer, Spec 032) — label misleads | Yes (exists) | real anchor → teachers.html (or standalone add-teacher.html); remove «قريبًا» | 036 | nav navigates; form reachable |
| CS-11 | Teachers | teacherCategories | قريبًا | surface EXISTS (trn-categories drawer, Spec 028) — misleads | Yes (exists) | real anchor → teachers.html; remove «قريبًا» | 036 | nav navigates; drawer reachable |
| CS-12 | Teachers | sessionsKpi | قريبًا | no surface; sessions KPI board | Yes (display board) | fold as teacher-performance.html tab OR standalone; NO computed rank/chart | 036 | display board; no chart |
| CS-13 | Teachers | monthlyPerf | قريبًا | no surface; monthly perf board | Yes (display board) | fold as teacher-performance.html tab OR standalone; no chart | 036 | display board; no chart |
| CS-14 | Reports | monthlyReports | قريبًا | no surface; monthly reports board | Yes (display board) | fold as reports.html tab OR standalone | 037 | display board; no chart |
| CS-15 | Reports | dataAnalysis | قريبًا | no surface; legacy was a **charting** page | Partial (display-only board; NO computed chart) | fold as reports.html tab (authored board) OR future-backend if no honest display | 037 | NO `<canvas>`/computed analytics |
| CS-16 | Admin | materials | قريبًا | surface EXISTS (library Materials tab, Spec 031) — misleads | Yes (exists) | deep-link library.html#view=materials; remove «قريبًا» | 039 | deep-link works; no قريبًا |
| CS-17 | Admin | certificateRequests | قريبًا | surface EXISTS (certificates Requests tab, Spec 031) — misleads | Yes (exists) | deep-link certificates.html#view=requests; remove «قريبًا» | 039 | deep-link works |
| CS-18 | Settings | settingsGeneral | قريبًا | surface EXISTS (General tab, Spec 031) — misleads | Yes (exists) | deep-link settings.html#view=general | 040 | deep-link works |
| CS-19 | Settings | settingsIntegrations | قريبًا | surface EXISTS (Integrations tab) — misleads | Yes (exists) | deep-link settings.html#view=integrations; connect stays gate | 040 | deep-link works |
| CS-20 | Settings | settingsCustomization | قريبًا | surface EXISTS (Customization tab) — misleads | Yes (exists) | deep-link settings.html#view=customization; Save stays gate | 040 | deep-link works |
| CS-21 | Settings | settingsNotifications | قريبًا | surface EXISTS (Notifications tab) — misleads | Yes (exists) | deep-link settings.html#view=notifications | 040 | deep-link works |
| CS-22 | Settings | settingsSecurity | قريبًا | surface EXISTS (Security tab) — misleads | Yes (exists) | deep-link settings.html#view=security; no secret/OTP control | 040 | deep-link works |
| CS-23 | Settings | settingsUsers | قريبًا | surface EXISTS (Users tab → staff, B-16) — misleads | Yes (exists) | deep-link settings.html#view=users (or staff.html) | 040 | deep-link works |

## 🔒 lock markers (7 — all `nav.reason.finance`)
| # | Category | Item | Marker | Why it appears today | Frontend UI possible? | Recommended resolution | Owner | Accept |
|---|---|---|---|---|---|---|---|---|
| LK-01 | Finance | invoices | 🔒 | locked pending billing backend | Yes (figure-free/amount-literal ledger display) | invoices.html OR finance.html#view=invoices; Record/Export gated; **unlock** | 038 | display shows; money actions gated; no arithmetic |
| LK-02 | Finance | monthlyInvoices | 🔒 | locked pending billing backend | Yes (figure-free board) | fold finance/reports tab OR standalone; unlock | 038 | display; no arithmetic |
| LK-03 | Finance | salaries | 🔒 | surface EXISTS (Salaries tab, Spec 030) — lock misleads | Yes (exists) | deep-link finance.html#view=salaries; **unlock** | 038 | deep-link works; figure-free |
| LK-04 | Finance | staffSalaries | 🔒 | locked; staff-salary board | Yes (figure-free board) | fold finance salaries tab OR standalone; unlock | 038 | display; figure-free |
| LK-05 | Finance | payments | 🔒 | locked pending payment backend | Yes (figure-free ledger; Record gated) | payments.html OR finance.html#view=payments; unlock | 038 | display; Record-payment gated |
| LK-06 | Finance | classSalaryReport | 🔒 | locked; class-salary report | Yes (figure-free board) | fold finance/reports OR standalone; unlock | 038 | display; figure-free |
| LK-07 | Finance | banks | 🔒 | surface EXISTS (Banks tab, Spec 030) — lock misleads | Yes (exists) | deep-link finance.html#view=banks; **unlock** | 038 | deep-link works |

## Summary
- **23 «قريبًا» + 7 locks = 30 markers, all recorded, all resolved (no unresolved row).**
- **11 markers hide an already-built surface** (CS-06, CS-10, CS-11, CS-16..CS-23, LK-03, LK-07) → the highest-value, lowest-risk fixes: relabel to a real deep-link/anchor, 0 count impact.
- **After the follow-up specs (034–040) execute, and 041 re-freezes: 0 «قريبًا», 0 misleading locks remain.** The only residual gating is on final backend **actions** (send/persist/pay/generate), never on the sidebar surface.
