# Follow-up Spec Roadmap — Spec 033

The remaining specs (034–041) that close the Admin sidebar. Every non-implemented item (30) has exactly one owner spec; 041 re-freezes. Model routing per the standing preference (Opus for complex/high-risk/finance/role-law/no-fake/synthesis; Sonnet for repetitive fixtures/locale/count/docs).

## 034 — Control Center Pages
- **Items covered (5):** messages, leads, tasks, announcements, timeConverter.
- **Expected surfaces:** 5 standalone pages (inbox/thread/compose · requests inbox · task board · announcement composer · timezone tool). timeConverter is fully frontend (no gate); the other 4 have a gated final (send/persist/publish).
- **Expected count impact:** **+10** (5 pairs AR/EN) → 113.
- **Risk:** High — 5 new page templates + new fixtures/locale + honest send/compose shells without faking delivery.
- **Model routing:** Opus — shell architecture, the compose/send no-fake gates, timeConverter tool logic; Sonnet — fixtures (authored threads/requests/tasks/announcements), locale mirroring, screenshot config.
- **Key laws:** no fake send/persist/deliver; Send/Publish/Save = backendRequired; no `href="#"`; AR/EN mirrored; a11y 0/0; mobile 390.

## 035 — Families & Students Nav Completion
- **Items covered (4):** familyCategories (fold-anchor), scheduleSearch (page or schedule tab), studentResult, studentEvaluation (deep-link to student tabs or standalone boards).
- **Expected surfaces:** 1 relabel-to-anchor + 1 search page/tab + 2 deep-links or display boards.
- **Expected count impact:** **0 to +6** (recommended +2: scheduleSearch page; results/evaluation deep-link) → ~115.
- **Risk:** Medium — the display boards must carry NO computed score/rank/chart.
- **Model routing:** Opus — the no-computed-score boundary + scheduleSearch results honesty; Sonnet — anchor relabel, deep-link wiring, locale.
- **Key laws:** no computed score/rank/chart; booking = backendRequired; student child-view unaffected.

## 036 — Teachers Nav Completion
- **Items covered (4):** addTeacher (fold-anchor or page), teacherCategories (fold-anchor), sessionsKpi, monthlyPerf (perf tabs or standalone).
- **Expected surfaces:** 2 relabel-to-anchor + 2 display tabs on teacher-performance.html.
- **Expected count impact:** **0 to +6** (recommended 0: all fold/anchor) → ~115.
- **Risk:** Low–Medium — teacher pay-free GLOBAL + no computed rank/chart.
- **Model routing:** Opus — teacher pay-free verification on the new boards; Sonnet — anchor relabel, tab wiring, locale.
- **Key laws:** teacher pay-free (no salary/rate/fine figure); no computed rank/chart.

## 037 — Reports & Analytics Nav Completion
- **Items covered (2):** monthlyReports, dataAnalysis.
- **Expected surfaces:** display-only tabs on reports.html (monthly board + authored analysis board). dataAnalysis carries NO `<canvas>`/computed analytics; stays a documented gate if no honest display.
- **Expected count impact:** **0 to +4** (recommended 0: fold as tabs) → ~115.
- **Risk:** Medium — the no-fake analytics boundary (no chart engine, no computed metric).
- **Model routing:** Opus — the analytics no-fake boundary decision; Sonnet — the monthly board fixtures, locale.
- **Key laws:** no chart/`<canvas>`/computed analytics; reports body finance-free; display-only.

## 038 — Finance Standalone Pages & Deep-Links Completion
- **Items covered (7):** invoices, monthlyInvoices, salaries (deep-link), staffSalaries, payments, classSalaryReport, banks (deep-link).
- **Expected surfaces:** 2 deep-links to existing tabs (salaries, banks — unlock) + figure-free display pages/boards for invoices/payments (+ monthlyInvoices/staffSalaries/classSalaryReport folded).
- **Expected count impact:** **0 to +8** (recommended +4: invoices + payments standalone; rest deep-link/fold) → ~119.
- **Risk:** **High** — the finance no-fake-money law (no arithmetic/computed-Total/payment/payroll/PDF/bank-sync; Spec-009 amount literals only).
- **Model routing:** Opus — every finance surface + the no-fake-money boundary + unlock verification; Sonnet — figure-free fixtures, locale, screenshots.
- **Key laws:** finance no-fake-money; no computed Total; money/payroll/PDF/bank actions = backendRequired; no `type=file`.

## 039 — Admin Content Deep-Links (Materials & Certificate Requests)
- **Items covered (2):** materials, certificateRequests.
- **Expected surfaces:** 2 deep-links to existing library/certificates tabs; remove «قريبًا».
- **Expected count impact:** **0** → unchanged.
- **Risk:** Low.
- **Model routing:** Sonnet — deep-link wiring + nav flip + smoke re-pin; Opus only for the nav-law review.
- **Key laws:** no fake upload/PDF/generation; existing Spec-031 gates intact.

## 040 — Settings Deep-Links Navigation Finish
- **Items covered (6):** settingsGeneral, settingsIntegrations, settingsCustomization, settingsNotifications, settingsSecurity, settingsUsers.
- **Expected surfaces:** 6 deep-links to the existing settings tabs (settingsUsers → settings.html#view=users or staff.html); remove all 6 «قريبًا».
- **Expected count impact:** **0** → unchanged.
- **Risk:** Low.
- **Model routing:** Sonnet — deep-link wiring, nav flips, smoke re-pin; Opus for the settings no-fake-settings/no-secret review.
- **Key laws:** settings no-fake-settings; no `type=password`/secret/webhook; theme/lang stay real; Save/Connect = gates.

## 041 — Final Sidebar / Route / Production Re-Freeze
- **Items covered:** all — the closure audit.
- **Expected surfaces:** none new; verify **zero «قريبًا», zero misleading locks**, full menu coverage (50/0-unclassified), route/page count re-frozen, every nav item a real link/deep-link/anchor, every backend action gated.
- **Expected count impact:** **0** → final count locked at the 038-established number.
- **Risk:** Medium — the final honesty + coverage + count re-freeze.
- **Model routing:** Opus — final synthesis, role-law/no-fake re-verification, freeze verdict; Sonnet — screenshot pack, docs.
- **Key laws:** all carryover laws (see `role-law-and-no-fake-carryover.md`); final sidebar has 0 dead labels.

## Coverage cross-check
- 034: messages, leads, tasks, announcements, timeConverter (5)
- 035: familyCategories, scheduleSearch, studentResult, studentEvaluation (4)
- 036: addTeacher, teacherCategories, sessionsKpi, monthlyPerf (4)
- 037: monthlyReports, dataAnalysis (2)
- 038: invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks (7)
- 039: materials, certificateRequests (2)
- 040: settingsGeneral, settingsIntegrations, settingsCustomization, settingsNotifications, settingsSecurity, settingsUsers (6)
- **Total owned: 30 = all non-implemented items. 041 re-freezes. No item ownerless.**

Sequence adjustment vs the default: 039 (Admin content) and 040 (Settings) are pure deep-links (Low risk, 0 count) and could be done in any order or merged; kept separate for a clean owner-per-category audit trail. 038 (Finance) is the highest-risk spec and is sequenced after the low-risk deep-link specs so the count is settled before the finance display work.
