# Agent 07 — Teacher Coverage + Pay-Free Audit (Spec 023)

## Scope & method

Mission: map every legacy TEACHER page/capability (~26 distinct captures under
`academy-dashboard-discovery/output/roles/teacher/pages/`) to the rebuilt teacher surfaces
(`teacher-portal(.en).html` living cockpit + ROLE_NAV.teacher planned gates + the admin
`teacher/teachers/teacher-performance` pages), classify each, and independently verify the
teacher PAY-FREE GLOBAL law at all three enforcement layers.

Method:
1. Read the completed sibling audit `agent-findings/02-legacy-screenshots-teacher.md` first,
   then re-verified its claims directly against the legacy `.md` captures (all 26 read — key
   pages in full, near-duplicates/404s via metadata+heading extraction) and opened 6 legacy
   screenshots visually (all four pay surfaces + tickets chart + timetable grid).
2. Opened the current rebuilt pages and their sources (portal shell, ROLE_NAV/PORTAL_PLANNED/
   TEACHER_PREVIEW registries, locale overlays, smoke assertions, Spec 015/016/022 contracts).
3. Ran the extended pay-token grep myself on built HTML, source JS, source and built locale
   overlays; inventoried every anchor href on both teacher-portal pages.
4. READ-ONLY outside this folder; no build/test commands executed (greps and file reads only).

Sibling warnings honored: the 4 dead-404 "Dashboard 1" routes are NOT counted as missing;
the live `session-class-room` page was never truly captured (marked unverified); the three
near-identical student-list/monthly-report routes are consolidated to ONE capability; pay data
confirmed on FOUR legacy routes (home band, update-result, salary, salary-class-report).

## Evidence opened (exact paths)

### Sibling audit (read first)
- `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/02-legacy-screenshots-teacher.md`

### Legacy text captures (26 — read in full or via metadata/heading/table extraction)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-home.md` (full, incl. forms 1–6)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-salary.md` (full)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student.md` (full)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-salary-class-report.md` (full)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-timetable.md` (full)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-studentslist.md` (lines 180–260: table, 5 modals, sidebar links)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-students.md` (metadata/headings/columns)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-monthly-plans.md` (metadata/headings/columns)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-monthly-plans-mq-show.md` (metadata/headings/columns)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-library.md` (metadata/headings)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-chat.md` (metadata/headings)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-tickets.md` (metadata/headings/columns — KPI tiles + Average column)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-profile-edit.md` (metadata/headings)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-profile.md` (metadata/headings — error capture)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-1.md` (metadata/headings/columns)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-1-class.md` (metadata/headings)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-2-class.md` (metadata/headings)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-teacher-history-1.md` (metadata/headings/columns)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-teacher-history-1-d861d6e.md` (metadata/headings — duplicate route)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-session-class-room-mq-2.md` (metadata/headings — confirmed home copy incl. "Your Salary"/997.00)
- `academy-dashboard-discovery/output/roles/teacher/pages/management-home.md` (metadata/headings — confirmed home copy)
- `academy-dashboard-discovery/output/roles/teacher/pages/management-student-1.md` (metadata/headings — confirmed home copy)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-main-index-html.md` (404 "Opps!!!" confirmed)
- `academy-dashboard-discovery/output/roles/teacher/pages/main-index-html.md` (404 confirmed)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-main-index-html.md` (404 confirmed)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-monthly-plans-main-index-html.md` (404 confirmed)

### Legacy screenshots opened visually (6)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-home-full.png` (salary band 997.00 EGP + Estimated/Fines/Bonus chips + "(3.00 Fine)" table fragment SEEN)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-salary-full.png` (13-col ledger: Fixed…Fine/Gift/Hour-Rate/Total SEEN; sidebar "Salaries"/"Salary Class Report")
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student-full.png` (per-student Paid/Paid-if-continue/Free matrix SEEN)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-salary-class-report-full.png` (Date-Range + Group-By filter form SEEN)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-tickets-full.png` (pie-chart legend + Staff-Members "Average" column SEEN — forbidden-pattern class)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-timetable-full.png` (Sat–Fri × hourly grid, session chips SEEN)

### Current rebuilt evidence (18)
- `academy-dashboard-discovery/app/public/teacher-portal.html` (read in full — living cockpit, portal shell, nav, all sections)
- `academy-dashboard-discovery/app/public/teacher-portal.en.html` (pay-token grep + full href inventory)
- `academy-dashboard-discovery/app/public/teacher-performance.html` (shell check line 235 `app-shell`, nav rail lines 353–368, finance link line 354, pay-token scan)
- `academy-dashboard-discovery/app/public/teacher.html` (shell check line 235 `app-shell`; title "تفاصيل المعلّم")
- `academy-dashboard-discovery/app/public/teachers.html` (shell check line 235 `app-shell`; title "المعلمون")
- `academy-dashboard-discovery/app/src/js/pages/teacher-portal.js` (read in full)
- `academy-dashboard-discovery/app/src/js/pages/teacher-performance.js` (lines 1–40 — Spec 007 admin board, "no pay/finance figure" by construction)
- `academy-dashboard-discovery/app/src/js/components/portal-shell.js` (read in full — planned entries render as non-anchor `<button>` with «قريبًا»)
- `academy-dashboard-discovery/app/src/js/fixtures/portal.js` (lines 100–236 + certificate lines ~129: ROLE_NAV.teacher, PORTAL_PLANNED.teacher, COMPACT_HOME.teacher, TEACHER_PREVIEW retained slices)
- `academy-dashboard-discovery/app/src/locales/ar.prt.js` (teacher key scan; nav labels line 109; tch block line 391+; comment line 183)
- `academy-dashboard-discovery/app/src/locales/en.prt.js` (teacher key scan; comment lines 179–180; family "fine" hit line 339)
- `academy-dashboard-discovery/app/public/assets/locales/ar.prt.js` (built overlay pay scan)
- `academy-dashboard-discovery/app/public/assets/locales/en.prt.js` (built overlay pay scan)
- `academy-dashboard-discovery/app/tests/smoke/run.cjs` (lines 95–135 shell asserts; 461–570 teachers/teacher/teacher-performance asserts; 1090–1230 portal + payHit + teacher-portal + shell-anchor asserts)
- `academy-dashboard-discovery/specs/015-teacher-dashboard/spec.md` (T1–T27 capability map, FR-006/010/011/012/018, SC-005)
- `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/future-spec-sequence.md` (renumbered sequence: 025 = Teacher Internal Pages; 026–031 admin groups)
- `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/contracts/teacher-pay-free-global-contract.md` (the 6 binding rules + 3-layer enforcement)
- `academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/contracts/teacher-living-home-contract.md` (D10 six-band contract, nav 1+6 KEPT)

Totals: 26 legacy `.md` + 6 legacy `.png` = **32 legacy artifacts**; **18 current artifacts**.

## Coverage table — legacy TEACHER pages/capabilities → rebuilt

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| teacher | `/teacher/home` — daily cockpit (hour counters, today's classes table, next-class context) | `output/roles/teacher/pages/teacher-home.md`; `output/roles/teacher/screenshots/teacher-home-full.png` | `teacher-portal(.en).html` living cockpit: idHero (3 counters) + dayRail (today stops w/ room+roster+status) + follow-up board + flowStrip | `app/public/teacher-portal.html` lines 275–402; `app/src/js/pages/teacher-portal.js` | improved | legacy-grounded-improved | No | done | Table→living rail per no-clone law; counters authored fixtures; Spec 022 D10 contract six bands verified in built HTML |
| teacher | `/teacher/home` "Your Salary" band (997.00 EGP + Estimated 1,537.00 / Fines 1,003.00 / Bonus 2,000.00 chips + link to update-result + in-table "(3.00 Fine)") | `teacher-home.md` lines 47–48, 60; `teacher-home-full.png` (band SEEN) | NOT rebuilt — zero pay vocabulary/figures on any teacher surface | grep result below (0 hits); `specs/016-…/contracts/teacher-pay-free-global-contract.md` rules 1–2 | intentionally-excluded | — | No | intentionally-excluded | The pay-free GLOBAL law; excluded content precisely = amount 997.00 EGP + 3 pay chips + the fine fragment |
| teacher | `/teacher/home` end-class outcome recording (`classes-end`: remark·summary·homework·notes·files; `classes-absent`: video·notes) | `teacher-home.md` forms 4–5 (lines 149–182); screenshot `teacher-home-003-page-interaction-003.png` per sibling audit | flowStrip step 3 "تسجيل النتيجة" is the honest gate + outcomeSave guidePanel («يتطلب الخادم») + ROLE_NAV `outcomes` planned button | `app/public/teacher-portal.html` lines 362–365, 381–391; `app/src/js/fixtures/portal.js` line 193 (outcomeSave backendRequired); line 163 (nav outcomes planned) | gated-backendRequired | legacy-grounded | No | 025-teacher-pages | Full outcomes page = 025; recording itself is honestly backendRequired forever (fixtures-only law) |
| teacher | `/teacher/home` class row actions (View / Enter Again / End class / Send Reminder / gear: Reschedule / Auto-Make-up / Edit / Cancel modals) | `teacher-home.md` buttons lines 65–93 + form 3 `cancel_form__request` (reschedule vs auto-makeup radio) lines 125–147 | Not rendered as fake controls (no-fake law); concepts owned by the planned schedule/outcomes pages | `specs/015-teacher-dashboard/spec.md` FR-014 (no fake live-join/end-class-submit); `app/src/js/fixtures/portal.js` ROLE_NAV lines 161, 163 | planned-future | legacy-grounded | No | 025-teacher-pages | Reschedule/make-up request is a genuine backendRequired workflow — must appear as an honest gate on the 025 schedule/outcomes pages |
| teacher | `/teacher/timetable` — weekly Sat–Fri×24h grid + Availability modal (day/time ranges, Add/Update/Delete) + Edit-course/Edit-Schedule modals (T14) | `teacher-timetable.md` (full); `teacher-timetable-full.png` (grid SEEN) | ROLE_NAV `schedule` «قريبًا» planned button (nav + quick-tile); today slice already live in dayRail; availabilityEdit gate retained | `app/public/teacher-portal.html` lines 258, 270, 399; `app/src/js/fixtures/portal.js` lines 161, 195 (availabilityEdit backendRequired — retained) | planned-future | legacy-grounded | No | 025-teacher-pages | Spec 015 FR-009: agenda cards, never a grid clone; availability editing stays backendRequired |
| teacher | `/teacher/studentslist` — full roster (Country/Course/History/Schedule/Report/all-plans/certificate actions; Student-Timetable modal) | `teacher-studentslist.md` lines 180–237 | ROLE_NAV `students` «قريبًا» planned button; roster notes + recent-sessions slices retained in TEACHER_PREVIEW | `app/public/teacher-portal.html` line 258; `app/src/js/fixtures/portal.js` line 162 + TEACHER_PREVIEW (line 100+: rosterNotes, recent sessions T20/T21) | planned-future | legacy-grounded | No | 025-teacher-pages | Displacement law honored — Spec 015 US2/FR-005 fixtures retained verbatim for 025 |
| teacher | `/teacher/students` + `/teacher/monthly-plans` + `/teacher/monthly-plans/{id}/show` — ONE capability: 24-field monthly evaluation report + approval queue (T9/T11) | `teacher-students.md`; `teacher-monthly-plans.md`; `teacher-monthly-plans-mq-show.md`; `teacher-studentslist.md` modal 3 (lines 207–213) | ROLE_NAV `reports` «قريبًا» planned button; rubric dimensions retained display-only (achievements·progress·focus·homework·punctuality) | `app/src/js/fixtures/portal.js` line 165 + TEACHER_PREVIEW rubric slice (comment line ~128); `specs/015-teacher-dashboard/spec.md` FR-010 | planned-future | legacy-grounded | No | 025-teacher-pages | Consolidated to ONE capability per sibling warning (3 near-identical routes — no double-count); submit stays backendRequired; no rating-scale mockup (no-score law) |
| teacher | `/teacher/update-result?date_range=…` — 23-col per-student pay matrix (Paid Duration/Price/Total:/Paid/Paid-if-continue/Free, EGP) — the rendered output of the salary-class-report filter | `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student.md` lines 101–112; `…-full.png` (SEEN) | NOT rebuilt on any teacher surface | grep result below; `specs/016-…/contracts/teacher-pay-free-global-contract.md` rules 1–2, 6 | intentionally-excluded | — | No | intentionally-excluded | The 4th pay surface (reached only via the home salary band, NOT the sidebar — per sibling warning). Pay-ledger concept survives ONLY as zero-figure admin-finance GATE shells (contract rule 6 → Spec 030) |
| teacher | `/teacher/salary` — Salaries ledger (13 cols: Fixed…Fine/Gift/Hour Rate/Total:/Status) | `teacher-salary.md` lines 83–92; `teacher-salary-full.png` (SEEN) | NOT rebuilt on any teacher surface | grep result below; contract rules 1–2, 6 | intentionally-excluded | — | No | intentionally-excluded | Core Wallet/Finance module; admin-side zero-figure GATE shell owned by 030-admin-finance-invoices-salaries-banks |
| teacher | `/teacher/salary-class-report` — pay report filter (Date Range + Group By Student/Date/session → submits to update-result) | `teacher-salary-class-report.md` (form 2 action = `/teacher/update-result`, lines 69–81); `teacher-salary-class-report-full.png` (SEEN) | NOT rebuilt on any teacher surface | grep result below; contract rules 1–2, 6 | intentionally-excluded | — | No | intentionally-excluded | Same exclusion family; verified it is the FILTER page for the update-result matrix (one capability pair) |
| teacher | `/teacher/course-history/{id}` (+`/class` variants) + `/teacher/teacher-history/{id}` — per-student class history + "Student Details" drill (Class Remark/Summary/Homework/Note/Files) | `teacher-course-history-1.md`; `teacher-course-history-1-class.md` ("Class History Trial"); `teacher-course-history-2-class.md` ("Class History Sessions"); `teacher-teacher-history-1.md` (+ `-d861d6e` dup) | ROLE_NAV `students`/`outcomes` planned; recent-sessions slice (out1/out11) retained; admin-side improved equivalent = teacher.html sessions-outcomes tab w/ canonical outcome drawer | `app/src/js/fixtures/portal.js` lines 162–163 + TEACHER_PREVIEW recent-sessions; `app/tests/smoke/run.cjs` lines 514–528 (drawer assert); `app/public/teacher.html` | planned-future | legacy-grounded | No | 025-teacher-pages | 5 legacy captures = ONE capability (near-duplicate entry routes, incl. the trailing-dash dup — no double-count); remark/summary/homework record already reborn family-side (`teacherNotes`, portal.js line 74) |
| teacher | `/teacher/library` — materials library (hero, search, category filter; empty in capture) (T15) | `teacher-library.md`; `teacher-library-full.png` per sibling audit | TEACHER_PREVIEW.materials slice retained (3 display-only cards) + matUpload backendRequired gate retained — but NO ROLE_NAV entry and NOT rendered on the living home | `app/src/js/fixtures/portal.js` lines 194 (matUpload) + TEACHER_PREVIEW materials (lines ~122–126); `specs/015-teacher-dashboard/spec.md` FR-008 | planned-future | useful-but-needs-better-grounding | Yes | 025-teacher-pages | GAP-NOTE: materials/library is the one teacher internal with NO visible planned gate anywhere in the current app (nav has 6 planned items; library absent). 025 must either add it to ROLE_NAV.teacher or fold it into an owned page — record the decision |
| teacher | `/teacher/chat` — messaging/group chat (contact list, group settings, leave group) (T13) | `teacher-chat.md`; `teacher-chat-full.png` per sibling audit | Not represented anywhere in the teacher app; classified by Spec 015 as backendRequired → the operations/communications shell (admin "chat preview") | `specs/015-teacher-dashboard/spec.md` line 45 (T13 → planned-016); `specs/016-…/future-spec-sequence.md` line 13 (chat preview in the admin control/sessions/ops spec, now 026) | planned-future | useful-but-needs-better-grounding | Yes | 026-admin-control-sessions-ops | GAP-NOTE: teacher-SIDE chat has no honest «قريبًا» gate; only an admin-side preview is sequenced. 024/025 should decide whether the teacher nav gets a chat planned item or the exclusion is recorded explicitly |
| teacher | `/teacher/tickets` "Tasks" — task tracking concept (5 KPI tiles, staff table) | `teacher-tickets.md` (KPIs all 0); `teacher-tickets-full.png` (SEEN) | ROLE_NAV `tasks` «قريبًا» planned + 3 authored prep/review task cards retained in TEACHER_PREVIEW.tasks + idHero "مهام مفتوحة ٣" counter | `app/src/js/fixtures/portal.js` lines 164, tasks slice (lines ~117–121); `app/public/teacher-portal.html` lines 291–295 | planned-future | legacy-grounded | No | 025-teacher-pages | The legacy page was an EMPTY shell (all-zero KPIs) — Spec 015 T16 excluded the shell, kept the concept |
| teacher | `/teacher/tickets` pie-chart + Staff-Members "Average" column | `teacher-tickets.md` columns line (Name/Total/Pending/Overdue/Completed/**Average**); `teacher-tickets-full.png` (chart legend SEEN) | NOT rebuilt | Standing law: NO computed score/chart engine (CLAUDE.md hard constraints; Spec 015 FR-010 "no computed score") | intentionally-excluded | — | No | intentionally-excluded | Second independent forbidden-pattern class beyond pay (per sibling audit) — chart+computed average |
| teacher | `/teacher/studentslist` "Request Certificate" modal (student/course/description/date → management approval) (T10) | `teacher-studentslist.md` modal 4 (lines 215–221); screenshot `teacher-studentslist-004-page-interaction-004.png` per sibling audit | Certificate-request concept lines retained (display-only) + AR locale keys baked («طلب شهادة لطالب») — displaced from the home by Spec 018, not rendered today | `app/src/js/fixtures/portal.js` line 129; `app/src/locales/ar.prt.js` lines 429–431; `specs/015-teacher-dashboard/spec.md` FR-011 | planned-future | legacy-grounded | No | 025-teacher-pages | Genuine backendRequired workflow, NOT silently dropped (fixtures+keys grep-verified retained); 025 must re-render it with the submit gate |
| teacher | `/teacher/profile-edit` — avatar/name/email + change password (T23) | `teacher-profile-edit.md`; `teacher-profile-edit-full.png` per sibling audit | ROLE_NAV `profile` «قريبًا» planned button; Spec 015 account-slice contract (display-only, editing backendRequired) | `app/src/js/fixtures/portal.js` line 166; `specs/015-teacher-dashboard/spec.md` FR-012 | planned-future | legacy-grounded | No | 025-teacher-pages | Password change = auth surface = backendRequired forever |
| teacher | `/teacher/profile` — 500/"Something went wrong" capture (T24) | `teacher-profile.md` (H4 "Something went wrong, try again later") | Not reproduced (deliberate) | `specs/015-teacher-dashboard/spec.md` line 47 (T24 intentionally-excluded) + FR-012 ("the /profile 500 is not reproduced") | intentionally-excluded | — | No | intentionally-excluded | Legacy bug/crawler artifact, not a capability |
| teacher | `/teacher/session-class-room/{id}/{n}` — live class room entry | `teacher-session-class-room-mq-2.md` (verified: headings identical to teacher-home incl. "Your Salary"/997.00 — a redirected home copy, NOT the room) | No current equivalent; the true page was never captured | sibling audit risk item + my re-verification of the capture headings | unclear-needs-review | — | Yes | 024-correction | Legacy-crawl discovery gap (trial session had ended). Must NOT be marked covered OR excluded; 024 should order a fresh crawl of a live session before 025 designs the teacher day surfaces |
| teacher | `/management/home` + `/management/student/1` (teacher-persona aliases) | `management-home.md`, `management-student-1.md` (both verified byte-equivalent home copies: same headings incl. 997.00 EGP) | Covered by the teacher home row above | — | merged | — | No | done | Redirected duplicate captures — excluded from the denominator (no double-count) |
| teacher | 4 dead routes: `/teacher/main/index.html`, `/teacher/course-history/main/index.html`, `/teacher/monthly-plans/main/index.html`, `/main/index.html` ("Dashboard 1" sidebar link) | all four `*main-index-html.md` (each verified: H1 "Opps!!!" 404) | Not rebuilt (nothing to rebuild) | `specs/015-teacher-dashboard/spec.md` line 47 (T25 excluded) | intentionally-excluded | — | No | intentionally-excluded | Pre-existing legacy bug (broken static sidebar path) — excluded from the coverage denominator per sibling warning |
| teacher | Header notifications (bell, "View all notifications" → monthly-plans) + "Add shortcuts" personalization widget (on every page) | `teacher-home.md` lines 67–69; `teacher-salary.md` form 2 `/teacher/shortcuts` (lines 66–79) | Not represented (no fake notification count — Spec 015 FR-001; shortcuts need persistence) | `specs/015-teacher-dashboard/spec.md` FR-001, FR-014 | intentionally-excluded | — | Yes (record only) | 024-correction | Honest exclusions under the no-fake law, but neither is EXPLICITLY recorded as excluded in a register; 024 should add both to the exclusion register so 032's no-missing audit doesn't flag them |
| teacher | 9-language header switcher + logout | `teacher-salary.md` discovered links lines 135–145 | ar RTL + en LTR via the closed `lang-menu` hook; logout replaced by the honest hub "تبديل الدور" demo switch (no fake auth) | `app/public/teacher-portal.html` lines 250–253; `app/src/js/components/portal-shell.js` lines 43–44, 56–61 | reclassified | legacy-grounded | No | done | 2 languages is the binding constraint (Arabic-first + English); auth/logout = backendRequired until real auth |

### Current teacher-family surfaces — classification of the rebuilt items

| Current page/module | Current evidence path | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|
| `teacher-portal(.en).html` living cockpit home | `app/public/teacher-portal.html`; `app/src/js/pages/teacher-portal.js` | legacy-grounded-improved | No | done | Every band traces to a legacy capability (home cockpit/timetable-today/follow-ups/outcome-flow/tasks); smoke-pinned (run.cjs 1108–1129) |
| ROLE_NAV.teacher 1+6 registry (home + schedule/students/outcomes/tasks/reports/profile «قريبًا» buttons ×2 nav instances + 6 quick-tiles) | `app/src/js/fixtures/portal.js` lines 159–167; `app/public/teacher-portal.html` lines 258, 270, 399; `portal-shell.js` line 30 (planned = non-anchor `<button>`) | legacy-grounded | No | 025-teacher-pages | Honest planned gates verified in BUILT HTML both languages; smoke pins plannedNavAnchors===0 (run.cjs 1210) |
| The home→`teacher-performance.html` sanctioned anchor («فتح لوحة الأداء» / "عرض تجريبي") | `app/public/teacher-portal.html` lines 371–380; smoke pin run.cjs 1124–1126 | useful-but-needs-better-grounding | Yes | 024-correction | See Risk R1: the anchor drops the teacher persona into the ADMIN shell whose nav rail carries `finance.html` + الرواتب items one click away |
| `teacher-performance(.en).html` | `app/public/teacher-performance.html` line 235 (`app-shell` + `nav-rail`), line 354 (`href="finance.html"`), lines 356–368 (الرواتب/رواتب الموظفين/تقرير رواتب الفصول nav labels) | legacy-grounded (as ADMIN) | Yes (documentation) | 024-correction | VERIFIED: this is an ADMIN surface (Spec 007 board, admin six-category rail, admin nav item `teacherKpi`), NOT a teacher-role page — despite the `teacher-*` filename that the pay-free GLOBAL contract's letter covers ("every future teacher-*.html"). Its `#page-body` is pay-free and asserted so (run.cjs 548–561), but the file as a whole contains رواتب/salaries admin-nav tokens. Needs an explicit written exemption (or rename consideration) in the contract |
| `teacher(.en).html` (admin per-teacher profile, 8 tabs) + `teachers(.en).html` (admin directory) | `app/public/teacher.html`, `app/public/teachers.html` (both `app-shell` line 235); smoke run.cjs 461–538 | legacy-grounded (admin surfaces) | No | done (admin deepening → 028-admin-teachers-performance) | Admin management of teachers — a different legacy role (admin), correctly NOT part of the teacher app; noted here only to disambiguate the filename family |

## PAY-FREE VERIFICATION (part b)

### Exact scans performed and results

**Scan 1 — BUILT teacher app pages** (extended token set, case-insensitive, word-bounded EN + AR substrings):

```
grep -n -i -E '\b(salary|salaries|pay|pays|payout|payouts|payment|earnings?|compensation|bonus|fines?|money|currency|EGP|SAR|USD)\b|راتب|رواتب|أجر|مستحقات|غرامة|مكافأة|أتعاب|فلوس|دولار|ريال|جنيه|[$€£]' \
  app/public/teacher-portal.html app/public/teacher-portal.en.html
→ ZERO hits (exit 1)
```

**Scan 2 — SOURCE** (`app/src/js/pages/teacher-portal.js`, same pattern incl. comments): **ZERO hits**.
`app/src/js/fixtures/portal.js` teacher slices (ROLE_NAV.teacher, PORTAL_PLANNED.teacher,
COMPACT_HOME.teacher, TEACHER_PREVIEW): **ZERO hits** on the pattern.

**Scan 3 — LOCALE overlays, source and built** (`app/src/locales/ar.prt.js`, `en.prt.js`,
`app/public/assets/locales/ar.prt.js`, `en.prt.js`, same pattern):
- All **teacher-namespace keys** (`prt.nav.tch.*`, `prt.kpi.tch.*`, `prt.tch.*`, `lv.tch`): **ZERO hits**.
- Built overlays: **ZERO hits** on the salary/currency/أتعاب/فلوس/دولار set.
- Two benign non-teacher findings, recorded for hygiene (see Risks R2/R3):
  `en.prt.js:339` — family key `lv.fam.meetingsEmpty` contains the English adjective "fine"
  ("everything's just fine 🌿") which trips a word-bounded `fines?` regex; and
  `en.prt.js:179–180` — a source COMMENT contains the word "pay" twice ("zero pay/figure-bearing
  tokens (the pay-free GLOBAL rule)"), whereas the mirrored Arabic comment (`ar.prt.js:183`) is
  worded clean ("zero figure-bearing/flagged tokens").

**Scan 4 — anchor inventory** (every `href` in both built teacher-portal pages):
- `teacher-portal.html`: `portals.html` ×3 (hub) · `teacher-portal.html` ×2 (self) ·
  `teacher-performance.html` ×1 (the sanctioned body anchor) · `#page` skip-link · `#i-*` SVG refs only.
- `teacher-portal.en.html`: identical shape (`portals.en.html` ×3 · self ×2 · `teacher-performance.en.html` ×1).
- **Zero anchors to finance/billing/invoice surfaces from the teacher app itself.** The smoke pins
  this structurally: `run.cjs:1124–1126` (bodyAnchors===1, target must match
  `teacher-performance(.en).html`) and `run.cjs:1212–1216` (shell-anchor multiset must be exactly
  {self×2, hub×3} = 5).

### The three enforcement layers (cited)

Per `specs/016-…/contracts/teacher-pay-free-global-contract.md` rule 5, verified present:
1. **Source grep** (incl. comments) over the teacher family — re-executed above (Scans 2–3), green
   for the teacher family; one EN comment-hygiene nit outside the teacher namespace (R2).
2. **Built grep** over all teacher pages — re-executed above (Scan 1 + built overlays), green.
3. **Smoke pay asserts** — `app/tests/smoke/run.cjs:1108–1112`: the `payHit` regex
   (`\b(salary|salaries|payouts?|earnings?|compensation)\b` + `راتب|رواتب|أجر|مستحقات|غرامة|مكافأة`)
   runs against the RENDERED `#page-body` text of `teacher-portal` in BOTH languages; plus the
   admin-side guard `run.cjs:548–561` asserting the teacher-performance BODY carries no
   salary/payroll/الرواتب/score/rank tokens.

**Verdict: the teacher app (teacher-portal pair + its sources/fixtures/teacher locale keys) is
PAY-FREE on the extended token set at all three layers — independently re-verified, not taken
from memory.** The four legacy pay surfaces (home band, update-result matrix, salary ledger,
salary-class-report filter) are all visually confirmed in the legacy captures and are all
intentional exclusions with precise content documented in the table above.

## Risks, gaps, and proposed corrections

- **R1 — The sanctioned performance anchor exits into the ADMIN shell (finance nav one click
  away).** `teacher-portal.html` line 378 links to `teacher-performance.html`, which is an admin
  `app-shell` page whose nav rail carries a real `href="finance.html"` (line 354) and finance-
  category items labeled الرواتب / رواتب الموظفين / تقرير رواتب الفصول (lines 356–368). The
  pay-free contract rule 3 says "zero routes from any teacher page to any pay surface (admin
  finance included)"; the anchor is sanctioned by Specs 015/018/022 and smoke-pinned, and
  teacher-performance is classified admin (Spec 007) — but the persona experience is: teacher home
  → one click → a shell showing pay-named navigation. Proposed correction (024, then 025): when
  the real `teacher-reports` internal page ships in 025, repoint the home's performance link to it
  and demote the admin board link to admin-only; meanwhile record an explicit contract exemption
  for the pre-existing Spec 007 page. Evidence: `app/public/teacher-portal.html` line 378;
  `app/public/teacher-performance.html` lines 235, 354, 356–368.
- **R2 — Comment-hygiene: the EN locale overlay's rule-disclaimer comment contains the token
  "pay" twice** (`app/src/locales/en.prt.js` lines 179–180, and mirrored in the built copy
  `app/public/assets/locales/en.prt.js`), while the Arabic twin is worded clean
  (`ar.prt.js:183`). The contract's letter is "copy AND comments" over the teacher family's
  "sources, locales". This file is a shared locale that carries the teacher keys. One-line reword
  in 024 (match the ar.prt.js phrasing) removes the only word-bounded source hit.
- **R3 — Benign regex collision:** `en.prt.js:339` family copy "everything's just fine 🌿" trips
  word-bounded `fines?`. It is FAMILY namespace copy (`lv.fam.meetingsEmpty`), not teacher, and
  not a pay usage — but any future automated family-wide `fines?` grep must whitelist or reword it
  to avoid a false red. Recommend rewording in 024 ("all good 🌿") purely for scanner hygiene.
- **R4 — Teacher library/materials has NO visible planned gate** anywhere in the current teacher
  app (not in ROLE_NAV.teacher's 6 planned items, not on the living home). The fixtures
  (TEACHER_PREVIEW.materials, matUpload gate) are retained, so nothing is lost — but 025 must
  consciously give the capability a surface (nav item or a section of an owned page) or record the
  merge decision. Evidence: `app/src/js/fixtures/portal.js` lines 159–167 vs TEACHER_PREVIEW
  materials slice; `output/roles/teacher/pages/teacher-library.md`.
- **R5 — Teacher-side chat has no gate and its owner is an ADMIN spec.** Spec 015 routed T13 chat
  to the operations/communications shell (admin "chat preview", now 026). The teacher persona
  currently has zero trace of messaging. Decide in 024 whether ROLE_NAV.teacher gains a chat
  «قريبًا» item in 025 or the teacher-side exclusion is recorded explicitly. Evidence:
  `specs/015-teacher-dashboard/spec.md` line 45; `specs/016-…/future-spec-sequence.md` line 13.
- **R6 — The live `session-class-room` page is UNVERIFIED** — the only capture is a redirected
  copy of `/teacher/home` (re-verified: identical headings including the salary band). Order a
  fresh crawl during a live session before 025 finalizes the teacher day surfaces; until then it
  must not be counted covered or excluded. Evidence:
  `output/roles/teacher/pages/teacher-session-class-room-mq-2.md`.
- **R7 — Silent honest exclusions need registering.** Notifications and the "Add shortcuts"
  personalization widget are correctly not faked, but no exclusion register names them; 032's
  no-missing audit would flag them as unexplained. Add both to the 024 exclusion register.
  Evidence: `output/roles/teacher/pages/teacher-home.md` lines 67–69;
  `output/roles/teacher/pages/teacher-salary.md` lines 66–79.
- **Denominator guard (for the 023 roll-up):** of the 26 legacy teacher captures, the honest
  capability denominator is ~17: 4 are 404 artifacts, 3 are redirected home copies, 1 is a 500
  capture, and 5 history/monthly routes consolidate into 2 capabilities. Counting raw captures
  would overstate "missing" coverage.
