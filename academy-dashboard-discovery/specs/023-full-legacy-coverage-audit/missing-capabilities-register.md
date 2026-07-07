# Missing Capabilities Register — Spec 023 Full Legacy Coverage Audit 000–022

- **Title:** Missing Capabilities Register (legacy → current, forward direction)
- **Date:** 2026-07-06 (resolved from `agent-findings/00-main-session-grounding.md`)
- **Baseline:** branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Specs 020/021/022 committed; 77 public HTML files (38 ar+en page pairs + `index.html`)
- **Inputs used:**
  - `specs/023-full-legacy-coverage-audit/agent-findings/00-main-session-grounding.md` (incl. confirmed finding F-00-1)
  - `specs/023-full-legacy-coverage-audit/agent-findings/03-legacy-forms-modals-tables.md` (top-20 interactive capabilities cross-check)
  - `specs/023-full-legacy-coverage-audit/agent-findings/05-admin-coverage.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/06-family-child-student-coverage.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/07-teacher-coverage.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/09-drift-extra-pages.md` (reverse-direction corroboration only)
  - Underlying evidence re-opened during synthesis: `output/roles/teacher/pages/teacher-tickets.md` (to resolve the "Total:" column ambiguity flagged by finding 03 — see Resolutions)

Scope rule applied: legacy is a CAPABILITY checklist, never a pixel-clone target. Violations of the
binding laws (teacher pay-free GLOBAL, family zero-pay, no computed score/chart engines, no fake
actions, static fixtures-only, corrected role model DEC-001…009) are **intentional exclusions**
recorded with severity `excluded-by-law`, not gaps. Properly scheduled + honestly gated
planned-future capabilities are listed in the "Accounted, not missing" section, not in the table.

## Register

| ID | Legacy capability | Evidence | Why it matters | Current status | Severity | Recommended owner spec | Correction type | Notes |
|---|---|---|---|---|---|---|---|---|
| M-01 | Header notifications (bell + "See All Notifications" + unread badge) — present on ALL 13 family pages and every teacher page in legacy | `agent-findings/06-family-child-student-coverage.md` table A1 row "Header: notifications bell" (legacy: `output/roles/family/pages/student-home.md` Buttons/Badges); `agent-findings/07-teacher-coverage.md` R7 (legacy: `output/roles/teacher/pages/teacher-home.md` lines 67–69) | The only true cross-cutting MISSING capability in the family audit; guardians/teachers lose the "something needs my attention" signal; 032's no-missing audit will flag it if unowned | missing — no current surface, no labeled gate, no register entry on family or teacher apps | P1-before-next-build | 024-correction | Add ONE honest `pt-guide` backendRequired gate (or an explicit futures-register entry) per role app — never a fake bell/count | 021 map already classed it 🔒 backendRequired; 023 must hand 024 the owner record. Merged from findings 06 (family) + 07 R7 (teacher) — one capability, two shells |
| M-02 | Teacher chat/messaging (`/teacher/chat`: contact list, group settings, leave group — legacy T13) | `agent-findings/07-teacher-coverage.md` coverage row `/teacher/chat` + R5 (legacy: `output/roles/teacher/pages/teacher-chat.md`); `agent-findings/03-legacy-forms-modals-tables.md` §4 "Chat" (send-form NEVER captured — only `loadMoreChats` pagination) | The teacher persona currently has ZERO trace of messaging; the only sequenced owner is an ADMIN-side preview (026), so the teacher-side capability is unowned/undecided | missing on the teacher side — no «قريبًا» nav item, no gate; admin preview scheduled in 026 | P2-scheduled | 024-correction | Record a decision: either ROLE_NAV.teacher gains a chat «قريبًا» planned item in 025, or the teacher-side exclusion is explicitly registered (admin preview stays 026) | Message-SEND is an UNCONFIRMED capability (03's crawl never captured a compose form) — whatever ships must be a backendRequired gate, never invented send fields |
| M-03 | Teacher library/materials (`/teacher/library` — browse teaching materials, search, categories — legacy T15) | `agent-findings/07-teacher-coverage.md` coverage row `/teacher/library` + R4 (legacy: `output/roles/teacher/pages/teacher-library.md`; current: `app/src/js/fixtures/portal.js` TEACHER_PREVIEW.materials + matUpload gate retained, but NO ROLE_NAV entry) | The ONE teacher internal capability with no visible planned gate anywhere in the current app (nav has 6 planned items; library absent) — invisible ≠ honestly gated | weakly-covered — fixtures retained (nothing lost), but zero user-visible surface or gate | P1-before-next-build | 025-teacher-pages | 025 must either add a library item to ROLE_NAV.teacher or fold materials into an owned page — and record the decision | Displacement law honored (fixtures grep-verified retained); this row exists because the gating is currently invisible, i.e. unscheduled at the UI layer |
| M-04 | Admin "Locations" capability (RBAC permission group Show/Add/Edit/Delete Locations) | `agent-findings/05-admin-coverage.md` coverage row "RBAC «Locations» permission group" + Risk 1 (legacy: `output/roles/admin/screenshots/management-admins-permission-6-full.png`; absent from `specs/016-…/admin-sidebar-page-inventory.md`) | The ONLY legacy admin capability with no owner row in the 57-row inventory or the 026–031 plan — a genuine hole in the otherwise-complete admin map | unclear-needs-review — no crawled locations page, no owner spec | P1-before-next-build | 024-correction | Record an ownership decision (most natural home: a display slice inside 031's settings/general — legacy general settings already carries Country/City/Timezone/Address) | Do not build anything yet; the correction is the DECISION + register row |
| M-05 | Teacher live class room (`/teacher/session-class-room/{id}/{n}` — the real in-session surface) | `agent-findings/07-teacher-coverage.md` coverage row `session-class-room` + R6 (legacy: `output/roles/teacher/pages/teacher-session-class-room-mq-2.md` — verified a redirected copy of `/teacher/home` incl. the salary band, NOT the room) | The true page was NEVER captured (trial session had ended at crawl time); 025 will design the teacher day surfaces partially blind if this stays unverified | unclear-needs-review — must not be counted covered OR excluded | P1-before-next-build | 024-correction | Order a fresh targeted crawl during a live session before 025 finalizes the teacher day surfaces | A legacy-crawl DISCOVERY gap, not a build gap; the eventual real room is future-backend regardless (no fake live surfaces — the admin-side fake room is already excluded, 05 row `session-class-room`) |
| M-06 | Family "Send" action on `/student/today-sessions` (mutating button with no independently captured target form) | `agent-findings/03-legacy-forms-modals-tables.md` §5 "Notable non-obvious skip" + Risks (legacy: `output/combined/skipped-actions.md` family section; absent from `output/combined/form-inventory.md` family lines ~20390–20619) | Only interactive capability from 03's inventory not positively mapped by findings 05/06/07; could be an alias of an already-shipped Spec 020 request action or a genuine gap | unclear-needs-review | P2-scheduled | 024-correction | One targeted look: confirm it maps to the cancel/reschedule/upload family already gated on `family-requests`/child-view homework, or add it as a new gated action | Finding 06 covered today-sessions' cancel/reschedule/upload forms (row `/student/today-sessions`), which likely absorbs it — but no finding states it explicitly, so it stays open |
| M-07 | Family-visible certificates read view (does the guardian ever SEE issued certificates?) | `agent-findings/06-family-child-student-coverage.md` Risk 5 (021 `role-model-decision.md` C5 carried the question to this audit); 13/13 legacy family pages show NO certificates surface | Open product question from Spec 021; leaving it unanswered lets it drift past 031 | unclear-needs-review — NOT a family coverage gap (no legacy evidence of one) | P3-nice-to-have | 031-admin-management-content-certificates-settings | Record the decision inside 031's certificates work (family-facing read view = future-backend if wanted) | The teacher-request → admin-approve → issue pipeline itself is accounted (025 + 031, see below) |
| M-08 | Child-view framing on the 6 student internal bodies (legacy: the whole `/student/*` surface belongs to the Family login — DEC-001..005) | **F-00-1 CONFIRMED**: `agent-findings/00-main-session-grounding.md` — «لوحة الطالب — النسخة الأولى» noteT/noteD survives at `app/src/locales/ar.prt.js:297–298`, `en.prt.js:294`, `app/public/assets/locales/ar.prt.js:297`, rendered on 6 of 7 child-view pages (`app/public/student-portal.html:393`, `student-homework.html:397`, `student-history.html:344`, `student-profile.html:361`, `student-progress.html:409`, `student-materials.html:341` + `.en` pairs); corroborated by `agent-findings/06-…` §(b) row 8 | The corrected role model is the project's central 021 verdict; residual Student-primary wording ("this is YOUR dashboard") contradicts the child-view demotion on the page bodies themselves | weakly-covered — shell/locale reframing landed (022), body note wording did not (byte-preserved BY LAW in 022, so a knowing leftover) | P1-before-next-build | 024-correction | Relabel `noteT`/`noteD` (ar+en) to «عرض الابن» / guardian-addressed wording, rebake, DECLARE SUPERSESSION of the affected `#page-body` extraction hashes, re-pin smoke — one sanctioned amendment (the 022 family-child precedent) | The top child-view correction candidate; grep-checkable acceptance: zero «لوحة الطالب» primary-role wording on child-view surfaces |
| M-09 | Teacher "see my own performance" (legacy home → performance/history views) without touching pay | `agent-findings/07-teacher-coverage.md` R1 + current-surfaces row "home→teacher-performance anchor": `app/public/teacher-portal.html:378` links to `teacher-performance.html`, an ADMIN `app-shell` page whose nav rail carries `href="finance.html"` (line 354) + الرواتب/رواتب الموظفين/تقرير رواتب الفصول labels (lines 356–368) | Pay-free contract rule 3 says "zero routes from any teacher page to any pay surface"; the persona experience is teacher home → one click → a shell showing pay-named navigation. Sanctioned by Specs 015/018/022 and smoke-pinned, but the contract letter has no written exemption | weakly-covered — capability reachable, but via an admin shell that strains the pay-free contract's letter | P1-before-next-build | 024-correction | Record an explicit written contract exemption for the pre-existing Spec 007 admin board NOW; then 025 ships the real `teacher-reports` internal page and repoints the home link, demoting the admin board link to admin-only | The `teacher-performance.html` BODY is pay-free and smoke-asserted (`run.cjs:548–561`); the issue is the surrounding admin nav rail one click from the teacher persona |
| M-10 | "Add shortcuts" header personalization widget (legacy `/teacher/shortcuts` POST, on every teacher page) | `agent-findings/07-teacher-coverage.md` coverage row "Header notifications + Add shortcuts" + R7 (legacy: `output/roles/teacher/pages/teacher-salary.md` form 2, lines 66–79) | Correctly not faked (needs real persistence — fixtures-only/no-persistence law), but NO exclusion register names it, so 032's no-missing audit would flag it as unexplained | honest exclusion, currently UNREGISTERED | excluded-by-law | 024-correction | Register-entry only: add to the 024 exclusion register as future-backend personalization | Law basis: no persistence/no real CRUD in the static fixture build |
| M-11 | Teacher pay surfaces: home "Your Salary" band (997.00 EGP + Estimated/Fines/Bonus chips), `/teacher/salary` 13-col ledger, `/teacher/salary-class-report` filter, `/teacher/update-result` 23-col per-student pay matrix | `agent-findings/07-teacher-coverage.md` rows 2/8/9/10 of the coverage table (legacy: `output/roles/teacher/pages/teacher-home.md` lines 47–48/60, `teacher-salary.md` lines 83–92, `teacher-salary-class-report.md`, `teacher-update-result-…-filter-student.md` lines 101–112 + all four screenshots SEEN) | The four legacy pay surfaces define the exclusion scope of the teacher pay-free GLOBAL law; naming them prevents 032 counting them as gaps | intentionally excluded — pay-free verified at all 3 layers (07 Scans 1–4: zero hits on built/source/locales; smoke `payHit` byte-verbatim) | excluded-by-law | intentionally-excluded | None (the ledger CONCEPT survives only as zero-figure admin-finance GATE shells owned by 030) | Teacher pay-free GLOBAL contract rules 1–2, 6 |
| M-12 | Family billing "Amount" column (legacy invoice table: #/Serial/Month-Year/Due/Course/**Amount**/Status) | `agent-findings/06-family-child-student-coverage.md` A1 row `/student/billing` + §(c) (legacy: `output/roles/family/pages/student-billing.md` + `student-billing-full.png`; current: `app/public/family-billing.html` lines 282–401, zero pay-token hits, hour-quota ٤٠/١٢/٢٨) | Names the single deliberately-dropped family column so no future pass "restores" it | intentionally excluded — every other legacy column kept; billing is status-first by law | excluded-by-law | intentionally-excluded | None (detailed invoices honestly gated «يتطلب نظام الفوترة الفعلي») | Family zero-pay hard line; smoke `famPay` regex green on all 18 family bodies |
| M-13 | Computed/chart engines across legacy: accounting 10-tile AED money wall + 5 line charts, analysis-student bar/donut/world-map charts, tickets pie chart + computed "Average" column, teacher-feedback computed "Percentage" column | `agent-findings/05-admin-coverage.md` §(d) + rows `/management/accounting`, `/management/analysis-student`, `/management/teacher-feedback`; `agent-findings/07-teacher-coverage.md` row "tickets pie-chart + Average" (screenshots: `management-accounting-full.png`, `management-analysis-student-full.png`, `teacher-tickets-full.png`, `management-teacher-feedback-full.png`) | Defines the no-computed-score/rank/chart-engine exclusion scope; 029/030 authors must build STAT cards with authored literals, never re-import charts | intentionally excluded — current equivalents are chart-free (reports.html, teacher-performance.html, finance.html status tiles) | excluded-by-law | intentionally-excluded | None (029 dataAnalysis + 030 finance shells deliver the authored-STAT-card treatment) | Constitution: NO computed score/rank/leaderboard/percentile/chart |
| M-14 | Pay-signal leaks in legacy ops UI: «(3.00 Fine)» fragment on the admin home classes table; «Active & unpaid» coloring on the all-teachers timetable | `agent-findings/05-admin-coverage.md` Risk 5 (screenshots: `management-home-full.png`, `management-all-teachers-timetable-full.png`) | These are legacy anti-patterns that 026/028 authors could accidentally re-import when building ops bands and teacher performance pages | intentionally excluded — rebuilt dashboard/schedule correctly drop them | excluded-by-law | intentionally-excluded | None; carry a "do-not-re-import" guard note into the 026/028 spec contracts | Zero pay figures anywhere + teacher pay-free law |
| M-15 | 9-language header switcher (ar/fr/de/es/ur/it/pt/ru/tr) beyond the AR/EN pair | `agent-findings/06-family-child-student-coverage.md` A1 row "9-language switcher" (legacy: `output/roles/family/role-map.md` lines 69–77); `agent-findings/07-teacher-coverage.md` row "9-language switcher + logout"; `agent-findings/03-…` §5 (all 27 lang routes deliberately un-crawled) | Prevents 032 counting 7 locales as missing; also records that even the AR/EN toggle has ZERO legacy behavioral evidence (designed fresh, not ported) | intentionally excluded — Arabic-RTL-first + English-LTR pairs sitewide is the binding scope; extra locales are Django-side concerns | excluded-by-law | intentionally-excluded | None; keep 03's note that the locale toggle is a fresh design with no legacy reference to audit against | Static ar/en page pairs by design; closed `lang-menu` hook already real |
| M-16 | Admin payroll/compensation FIGURES and math (salaries ×13-col ledger, staff-salaries, compensations ledger «Fine 1,000.00», salary generation, payout approval amounts) | `agent-findings/05-admin-coverage.md` rows `/management/salaries`, `/management/staff-salaries`, `/management/teachers/{id}/compensations`, `/management/salary-class-report` + §(d) (screenshots: `management-salaries-full.png`, `management-teachers-1-compensations-1-full.png`) | Salary/payroll/compensation/payout MATH is permanently out of scope; only the figure-free workflow shells are buildable | intentionally excluded (figures/math) — the honest zero-figure GATE shells are separately accounted to 030 (`app/src/js/fixtures/finance.js` lines 93–103; 7 disabled-with-reason nav items `nav.config.js:85–91`) | excluded-by-law | intentionally-excluded | None for the figures — 030 builds shells with ZERO figures forever | Boundary to restate in the 030 contract (05 Risk 6): authored invoice-amount literals on ADMIN finance are Spec-009-sanctioned; salary figures are NOT — invoice amounts ≠ pay figures |

## Cross-check: finding 03's top-20 interactive capabilities

Every one of the 20 is accounted for. None is silently missing; two feed register rows above.

| # (03) | Capability | Disposition | Where accounted |
|---|---|---|---|
| 1 | Session lifecycle action set (Attend/Absent/Cancel/Edit/Reschedule/Make-up) | covered/improved + gated writes | 05 rows `/management/courseclasses/{id}` (sessions.html + drawers, attendance.html); status writes future-backend |
| 2 | Teacher end-of-class report (`classes-end`) | honestly gated now; page in 025 | 07 row "end-class outcome recording" (flowStrip gate + `outcomeSave` backendRequired) |
| 3 | Teacher mark-absent with video (`classes-absent`) | same outcomes family, gated | 07 same row; 025 owns the full outcomes page |
| 4 | Teacher monthly student-progress report (24 fields) | planned + rubric retained display-only | 07 row "students + monthly-plans" → 025; no rating-scale mockup (no-score law) |
| 5 | Family trial-booking wizard (`request-trial`, stepped) | gated-backendRequired; step-2 fields = recorded gap | 06 A1 row `/student/request-trial` → future-backend (021 map already records it) |
| 6 | Family post-class teacher feedback (`/student/feedback`) | gated on family-requests («تقييم المعلّم») | 06 A1 row `/student/studentslist` embedded form |
| 7 | Family homework/session upload w/ voice (`upload-files`) | gated (child-view homework + requests) | 06 A1 row `/student/today-sessions`; voice-record detail stays future-backend |
| 8 | Admin bulk Schedule-Cancel-Classes | scheduled | 05 rows public-holiday bulk-absence + scheduledActions → 026 |
| 9 | WhatsApp/notification broadcast | scheduled | 05 row `/management/public-advertisement` → 026 (`announcements` planned nav) |
| 10 | Family lifecycle (Suspend/Stop/Schedule-Stop/Activate) | gated-backendRequired | 05 rows families create/edit + RBAC verbs → future-backend gates |
| 11 | Student lifecycle incl. the crawler-refused suspend route | gated-backendRequired | 05 row "student suspend/force-delete/restore" → future-backend |
| 12 | Admin invoice + transaction recording (New Transaction modal) | scheduled, admin-only | 05 rows invoices/transactions → 030; currency stays off teacher/family |
| 13 | Teacher compensation/salary generation | excluded figures + scheduled shells | **Register row M-16** (+ M-11 for the teacher-side surfaces) |
| 14 | Admin invoice adjustments | scheduled | 05 row accounting/transaction ledgers → 030; family-billing counterpart stays status-first |
| 15 | Certificate request→approve→issue pipeline (cross-role) | retained + scheduled | 07 row "Request Certificate" (fixtures+keys retained, 025 re-renders) + 05 rows pdf/certificate-requests → 031 |
| 16 | Admin RBAC (permission matrix, 170 checkboxes) | scheduled — display-only matrix + save gate | 05 row `/management/admins/permission/{id}` → 031; **except the Locations group = register row M-04** |
| 17 | Group/roster assembly (Create Group/Add Member) | covered, create gated | 05 row `/management/group/index` (groups.html + group.html) |
| 18 | Family Request-Cancel (shared family/teacher modal) | covered as honest gate | 06 A1 row `/student/today-sessions` → family-requests «إلغاء أو تأجيل جلسة»; teacher twin → 025 (07 row "class row actions") |
| 19 | Admin settings suite (7 sub-forms) | scheduled | 05 rows settings general/integrations/customisation/notification/security → 031 |
| 20 | Locale/language switch (9 routes, un-crawled) | ar/en real today; extra locales excluded | **Register rows M-15** (scope) — the fresh-design note is recorded there |

03's residual flags: the today-sessions "Send" button = **M-06**; chat send-form unconfirmed = folded
into **M-02**; the "Total:/Average" table ambiguity = resolved below.

## Accounted, not missing (properly scheduled + honestly gated)

These are NOT register rows because their gating is honest and their owner spec is sequenced
(DEC-009). Listed so 032's no-missing audit has the roll-up:

- **43 admin planned items across 026–031** — re-verified against today's `nav.config.js` by finding
  05 §(c): 026 ×10 (leads, chat, tasks, announcements, timeConverter, publicHoliday,
  scheduledActions, sessionsAnalysis, total-queues fold, schedule-requests inbox fold) · 027 ×4
  (familyCategories, scheduleSearch, studentResult, studentEvaluation) · 028 ×5 (addTeacher,
  teacherCategories, sessionsKpi, monthlyPerf, teachers-details fold) · 029 ×3+folds
  (monthlyReports, dataAnalysis, feedback/forms families) · 030 ×9 (invoices, monthlyInvoices,
  salaries, staffSalaries, payments, classSalaryReport, banks + expense/heads + analytics shells —
  all disabled-with-reason or figure-free GATE cards) · 031 ×12 (staff+RBAC, materials, books,
  certificates ×2, six settings sub-pages). Totals re-check = 57/57 of the 016 inventory — no item
  flipped, added, or dropped (`agent-findings/05-admin-coverage.md` §(c)).
- **Teacher internals 1+6** — ROLE_NAV.teacher planned «قريبًا» non-anchor buttons
  (schedule/students/outcomes/tasks/reports/profile), smoke-pinned `plannedNavAnchors===0`; owner
  025 (`agent-findings/07-teacher-coverage.md` current-surfaces table). Exception: library (M-03).
- **Family gated writes** — profile 3 gates ↔ 3 legacy POST forms (exact write-surface parity),
  trial wizard gate, upload/feedback/cancel gates — all honest backendRequired
  (`agent-findings/06-family-child-student-coverage.md` A1 rows) → future-backend.
- **family-children carries NO fold-point link** — an INTENTIONAL, documented deviation (per-child
  child-view links rejected as dishonest; preview persona is st1 only). 024/032 must not "fix" it
  (`agent-findings/06-…` Risk 3).
- **`hub.student` retained locale key** («بوابة الطالب», `ar.prt.js:172`) — renders in NO built HTML;
  a displaced key retained under the zero-deletion law, not a leak
  (`agent-findings/00-main-session-grounding.md` "Related but NOT a leak").
- **Admin impersonation of teacher home** (`/teacher/home` under the admin login) — requires real
  auth → future-backend (`agent-findings/05-…` row `/teacher/home`).
- **Fake live classroom** (`/management/session-class-room/{enc}/{id}` re-rendered home) — the fake
  is never cloned (G13); real rooms = future-backend (`agent-findings/05-…`). The TEACHER-side
  unknown remains M-05.

## Dead/broken legacy routes — excluded from this register

Per the standing instruction, dead-404 and 500/504-only legacy routes do not inflate "missing"
counts. One-line note: **4 teacher dead 404s** (`/teacher/main/index.html`,
`/teacher/course-history/main/index.html`, `/teacher/monthly-plans/main/index.html`,
`/main/index.html` — all H1 "Opps!!!", `agent-findings/07-…`), **2 admin export routes that only
ever 500'd** (`/management/export-course`, the `downlaod`/invoicesexportData family —
`agent-findings/05-…` row + Risk 4), plus the other legacy-broken captures
(`/student/profile` 500, `/management/families/feedback/family/{id}` 500, new-requests
scheduled-trials 500s, `/management/teachers/{id}/monthly-classes` 500,
`/management/settings/customisation/message-builder` 504, family `/main/index.html` 404) are all
intentionally-excluded with their capabilities re-homed; 032 must keep them NAMED so the final
no-missing script doesn't count them as gaps (05 Risk 4).

## Resolutions performed during synthesis (evidence re-opened)

1. **"Total:/Average" table shape (03 Risks)** — finding 03 flagged the admin/teacher column set
   `Name, Total:, Pending, Overdue, Completed, Average` as ambiguous (count vs amount). Resolved by
   re-opening `output/roles/teacher/pages/teacher-tickets.md` (lines 41–56, 107–120): the shape is
   the tickets/tasks staff table; Total/Pending/Overdue/Completed are all-zero TASK COUNTS with zero
   currency tokens in the capture; "Average" is the computed column already excluded by law
   (register row M-13, corroborated by 07's visual open of `teacher-tickets-full.png`). Not a
   pay-leak risk; no register row needed beyond M-13.
2. **Notifications double-report** — findings 06 (family bell) and 07 R7 (teacher bell) describe the
   same cross-cutting legacy capability; merged into ONE row (M-01) to avoid double-counting.
3. **Adjacent corrections that are NOT capabilities** (pointers for the 024 backlog, not rows here):
   the incomplete `FUTURE_ROUTES` documentation map (05 Risk 2, P3 paperwork), the EN locale comment
   "pay"-token hygiene + the family "fine 🌿" regex collision (07 R2/R3, scanner hygiene), the
   X-29/X-30 provenance notes (09, documentation only), the gallery nav-exposure machine check and
   variant-folding/broken-route registers for 032 (05 Risks 3–4, 09 Risk 1).

## Severity histogram

| Severity | Count | Rows |
|---|---|---|
| P0-blocker | 0 | — |
| P1-before-next-build | 6 | M-01, M-03, M-04, M-05, M-08, M-09 |
| P2-scheduled | 2 | M-02, M-06 |
| P3-nice-to-have | 1 | M-07 |
| excluded-by-law | 7 | M-10, M-11, M-12, M-13, M-14, M-15, M-16 |
| **Total** | **16** | |

## Verdict

**P0 blockers: no.** Nothing in the legacy corpus is both missing and blocking: the 6 P1 items are
all decision/relabel/register work sized for Spec 024 (the confirmed F-00-1 wording fix, the
Locations owner decision, the live-room re-crawl order, the library gate, the notifications gate,
and the pay-free contract exemption record); everything else is either properly scheduled under
DEC-009 (025–031), honestly gated future-backend, or an intentional exclusion under binding law.
