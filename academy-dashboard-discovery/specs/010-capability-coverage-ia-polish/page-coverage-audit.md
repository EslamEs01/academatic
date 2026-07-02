# Page Coverage Audit (Spec 010)

**Status**: Binding review artifact · grounds Spec 010's **User Story 5** (polished pages with
working filters) and **FR-013/FR-014** (calm empty states on every filterable list; the 20×10
page-by-page audit with fix-now gaps fixed in-spec, future gaps logged in the coverage matrix).
Companion to `contracts/page-coverage-audit-contract.md` (format/disposition rules) and
`contracts/page-polish-contract.md` (what "fix-now" may touch: copy / empty-state / token-level
only — no new sections, hooks, tabs, or layout).

**Method**: every page module in `app/src/js/pages/` was re-read against fresh eyes (not copied
from prior specs' plans), cross-checked against `app/src/js/enhance.js` (the closed `data-*` hook
set), `app/src/styles/app.css` (row-display rules), `app/scripts/build-html.mjs` (title/crumb/
activeId registry), and spot-checked in the built `app/public/*.html` output. Ten dimensions per
page: **purpose clarity · content richness · link integrity · action honesty · bilingual
completeness · RTL/LTR · dark/mobile safety · legacy coverage · better-than-legacy · disposition**.
Each cell is `pass` / `fixNow` / `future` + a short note. Zero cells are blank.

**Scope note (contract §1)**: `index.html` is a redirect and is out of this audit's scope (noted
once, here). The dev-only `gallery` row is included below (it is one of the 20 page bases) but is
documented as an intentional internal surface outside the product nav — see the Future Log.

---

## 1. Coverage matrix (20 pages × 10 dimensions)

| Page | Purpose clarity | Content richness | Link integrity | Action honesty | Bilingual | RTL/LTR | Dark/mobile | Legacy coverage | Better-than-legacy | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|
| **dashboard** | pass — home/overview + drill-downs (welcomeZone, KPIs) | pass — welcome, KPI row, sessions module, up-next agenda, people-signal chips, status tiles, reports preview, states demo | pass — real links to schedule/families/students/attendance/groups/teacher-performance/reports; zero `#` | pass — permission-gated report cards only; no fake CRUD | pass — zero raw keys in built HTML | pass — shared shell/tokens | pass — token-based, no fixed layout | pass — legacy admin home/overview | pass — one consolidated overview vs. legacy's fragmented dashboards | pass — FR-021 locks the body; no change needed or permitted |
| **sessions** | pass — session/live-lifecycle operations view | pass — List(table)+Timetable(agenda) tabs, row-menu, outcome drawer, status tiles | pass — attendance deep-link; zero `#` | pass — new-session demo; row-menu view=drawer, edit/cancel=demo | pass | pass | pass | pass — legacy sessions/live-classroom listing | pass — shared drawer + dual List/Timetable vs. legacy's duplicated screens | **fixNow** — Timetable tab's `.sched-block` rows share the class-display filter-visibility bug (List/table tab is safe) |
| **schedule** | pass — timetable + admin all-teachers lens | pass — List(day-grouped agenda, default tab)+Timetable(hand-rolled grid) tabs, 3-facet filter, shared drawer | pass | pass — pure display + drawer, no engine | pass | pass | pass | pass — legacy timetable + find-available-teacher lens | pass — hand-rolled grid (no calendar lib) + teacher lens vs. legacy | **fixNow** — List tab (default view) uses `.sched-block`, same defect (Timetable grid's `.tt-block` was already safe) |
| **attendance** | pass — daily outcomes board, explicitly admin-review-only | pass — 5 outcome tiles-as-filters, 6-facet filter bar, outcome-row list, canonical drawer | pass — student/family deep links | pass — view-only, no mutation | pass | pass | pass | pass — legacy attendance/outcomes, labeled not numeric | pass — teacherAbsent≠studentAbsent distinct labels vs. legacy numeric statuses | **fixNow** — CONFIRMED `.outcome-row` filter-visibility defect (10 rows attribute-hidden, 15 still visually rendered) |
| **families** | pass — family directory, explicitly not a portal | pass — 3 summary cards, status+category filters, family-as-hero cards with child avatars | pass — add-family + per-card view-profile links | pass — kebab edit/suspend/stop all demo/confirm | pass | pass | pass | pass — legacy families list + categories facet (merged) | pass — family-as-hero cards grouping children vs. flat legacy rows | **fixNow** — `.family-card` class-display filter-visibility defect |
| **add-family** | pass — multi-step add-family demo wizard | pass — 5 baked steps: identity/contact/children/billing/review | pass — no dead links; disabled Manage-billing shows its reason | pass — Save=demo toast, no persistence, add-child=demo | pass | pass | pass | pass — legacy add-family form | pass — baked step wizard + review step vs. a single sprawling legacy form | pass |
| **family** | pass — family profile hub, explicitly not a portal | pass — Overview/Students/Schedule/Plan&Billing/Notes tabs + attendance/courses hint cards | **fixNow** — Plan & Billing tab has a disabled "manage billing" button but NO link to the finance shell | pass — edit/addChild=demo, suspend/stop=confirm, manage-billing honestly disabled | pass | pass | pass | pass — legacy family profile + billing tab | pass — unifies scattered legacy family views into 5 tabs | **fixNow** — link-integrity gap (family→finance), owned by source-links-contract |
| **students** | pass — student directory, explicitly not a portal | pass — 3 summary cards, family/status/subject filters, table + quick-peek drawer | pass — family chip + view-profile link | pass — Add=demo; drawer view-profile is a real link | pass | pass | pass | pass — legacy students directory + family relationship surfaced | pass — family chip/filter integrated vs. legacy silo | pass — `<tr>` rows are NOT subject to the class-display bug (verified: no competing `display` rule on `tr`); filtering already narrows correctly |
| **student** | pass — the academic profile centerpiece, explicitly not a portal | pass — Overview/Courses/Timetable/Results/Evaluation/Family/Notes (7 tabs) | pass — family/course/group/schedule deep links | pass — message/edit=demo only | pass | pass | pass | pass — legacy student-result + evaluation pages (merged) | pass — merges Results+Evaluation into one profile vs. two separate legacy pages | pass |
| **teachers** | pass — teacher directory, explicitly not a portal | pass — 3 summary cards, 4 filters, academic-context cards (courses/groups/students/workload/follow-up) | pass — view-profile real link | pass — addTeacherAction=demo | pass | pass | pass | pass — legacy Trainers directory (renamed) | pass — academic counts/workload/follow-up vs. legacy's plain list; honest Trainers→Teachers rename | **fixNow** — `.dir-card` class-display filter-visibility defect |
| **teacher** | pass — admin teacher profile, explicitly not a portal/nav item | pass — 8 tabs: Overview/Courses/Groups/Timetable/Sessions&Outcomes/Students/Follow-up/Notes | pass — course/group/student/family/schedule/attendance deep links | pass — edit/message=demo, notify=confirm, assign course/group honestly disabled, print disabled | pass | pass | pass | pass — legacy teacher profile (minus pay, by design) | pass — one tabbed hub vs. many separate legacy pages; honest no-pay boundary | pass |
| **teacher-performance** | pass — academy-wide KPI/follow-up board (promoted `teacherKpi` item) | pass — 7 summary tiles, comparison card grid, follow-up queue | pass — per-teacher view-profile links | pass — display-only, no CRUD | pass | pass | pass | pass — legacy performance/monitoring concept, no computed rank | pass — labeled counts/signals only, explicitly no score/rank/leaderboard vs. legacy risk | **fixNow** — `.dir-card` (perfRow) class-display filter-visibility defect |
| **courses** | pass — subject-offering catalogue | pass — 3 summary cards, 3 filters, cards with counts + upcoming/attention hints | pass — view-course real link | pass — Add=demo | pass | pass | pass | pass — legacy Curricula (renamed Courses) | pass — academic counts + status chip vs. legacy's simple list | **fixNow** — `.dir-card` class-display filter-visibility defect |
| **course** | pass — course profile, explicitly not a portal/nav item | pass — 8 tabs: Overview/Groups/Students/Teachers/Timetable/Outcomes/LearningPath/Notes | pass — group/student/teacher/schedule/attendance deep links | pass — edit=demo, assign-teacher/add-students honestly disabled, print disabled | pass | pass | pass | pass — legacy curriculum detail | pass — consolidates many legacy views into one tabbed profile | pass |
| **groups** | pass — cohort/group directory | pass — 3 tiles-as-filters, 6-facet filter bar, airy group-row list | pass — course/group/teacher deep links per row | pass — Add=demo | pass | pass | pass | pass — legacy groups/cohorts listing | pass — tiles-as-filters + attention flag vs. legacy's spreadsheet-like list | **fixNow** — `.group-row` class-display filter-visibility defect |
| **group** | pass — group profile, explicitly not a portal/nav item | pass — 7 tabs: Overview/Students/Timetable/Sessions&Outcomes/Teacher/Course/Notes | pass — student/family/course/teacher/schedule/attendance deep links | pass — edit/addStudents=demo (status-gated on `full`), removeStudent=confirm, assignTeacher/print disabled | pass | pass | pass | pass — legacy group/cohort detail | pass — consolidated roster/timetable/outcomes/teacher/course vs. scattered legacy views | pass |
| **reports** | pass — academic reports/operations shell, explicitly finance-free | pass — 8-tile operations overview + status strip, filterable category grid, 5 detail sections rolling up existing fixture summaries | pass — deep links to attendance/sessions/schedule/courses/groups/teacher-performance/teacher/students/families/student/family | pass — Print=demo, Export/Share=disabled+reason, Schedule=confirm→demo | pass | pass | pass | pass — legacy reports (previously scattered/weak/finance-mixed; finance removed here) | pass — one organized shell with roll-up stats, no BI engine, no finance-mixing | **fixNow** — `.report-card` class-display filter-visibility defect on the category grid (area/availability filters) — found by this audit, not previously named |
| **finance** | pass — finance/billing/payments fixture shell, explicitly honest preview | pass — 4 status tiles-as-filters, invoice list (status/family filters), unfiltered recent-payments list, 9 figure-free planned cards, baked invoice drawer | pass — family/student/course/group/teacher-performance deep links from rows + drawer | pass — View=drawer, Record-payment/Mark-paid/Send-reminder=confirm→demo (gated disabled on the cancelled invoice), Create/Export/Send-invoice=disabled+reason | pass | pass | pass | pass — legacy's ~10 scattered finance sidebar entries | pass — ONE shell + honest locks vs. legacy's #1 IA complaint ("scattered across ~10 sidebar entries") | pass — `.fin-row[hidden]{display:none}` was already added (Spec 009); filtering already narrows correctly |
| **settings** | pass — a deliberately small utility shell, scope clearly stated | pass — Profile/Appearance/Notifications/Account sections + read-only roles preview | pass — no dead links | pass — theme/language are real; save/toggle=demo; two-factor/billing-alerts honestly disabled | pass | pass | pass | pass — legacy settings sub-pages (only Appearance implemented; the rest are correctly planned nav items, not duplicated here) | pass — one honestly-scoped settings shell vs. legacy's many sub-pages | pass — small by design, not weak |
| **gallery** | pass (dev-only) — component/style preview, explicitly not a product page | pass — buttons/KPI/tiles/chips/medallions/fields/avatars/badges/reportCard/menus/toast/states sections; every control acts | pass — n/a, no product links expected | pass — every control demos or opens a real menu/modal; no dead buttons | pass | pass | pass | **future** — not a legacy-mapped page; internal engineering surface only | **future** — n/a (dev-only, not a legacy comparison) | **future** — documented as an intentional internal surface outside product nav; zero active nav by design |

---

## 2. Fix-now list (PolishActions)

Per `contracts/page-polish-contract.md` §1: allowed moves are copy/empty-state wording, empty-state
completion, style-level token tweaks (including the sanctioned "D7" `[data-row][hidden]` rule), and
the one sanctioned family→finance link. Nothing here adds a section/tab/hook/layout or removes
content.

**Status — all 12 DONE and verified.** Item 1 (the shared `[data-row][hidden]{display:none !important}`
CSS rule) is in `src/styles/app.css`; items 2–11 are computed-visibility assertions in
`tests/smoke/run.cjs` (every filterable page: `getComputedStyle(row).display !== 'none'` for excluded
rows must equal the facet match, and the filter must hide ≥1 row) — all green in the full `npm run
test:smoke` run (40 loads); item 12 (the family→finance link + `fam.bill.viewInvoices` key pair +
Spec 009 guard amendment) is implemented and smoke-asserted (family body finance-link count == 1).
No page-level copy/empty-state gap was found beyond these (every filterable list already renders a
labeled `[data-no-results]` empty state — verified, none missing).

1. **Target**: `src/styles/app.css` (component layer, after all component blocks).
   **Defect**: rows the client-side filter (`enhance.js` `applyFilter()`) marks `[data-row][hidden]`
   stay visually rendered wherever the row's own component class (`.outcome-row`, `.dir-card`,
   `.group-row`, `.family-card`, `.sched-block`, `.report-card`) declares `display:flex`/`block` —
   an author rule of equal specificity beats the browser's default `[hidden]{display:none}`, so
   hidden rows keep occupying layout (the confirmed instance: attendance — 10 rows
   attribute-hidden, 15 still visually rendered). Only `.fin-row` (finance) and `.tt-block`
   (schedule's Timetable grid) already carried a narrow `[hidden]` override.
   **Change**: add the one shared rule `[data-row][hidden] { display: none !important; }` — the
   page-polish-contract's sanctioned D7 style-level move (existing tokens only, no new tone). At
   the time of this audit the rule is present in `src/styles/app.css`.
   **Verification**: the per-page computed-visibility smoke assertions below (`getComputedStyle
   (row).display === 'none'` for every hidden row), owned by `contracts/filter-visibility-contract.md`.

2. **Target**: `tests/smoke/run.cjs` — attendance.html.
   **Defect**: no automated proof that filtered-out `.outcome-row` rows are actually invisible.
   **Change**: assert computed visibility (not just the `hidden` attribute) after a status-tile /
   select filter narrows the list; visible count must equal the tile's claimed count.
   **Verification**: `node tests/smoke/run.cjs` — new assertion closes the confirmed 10-hidden/
   15-visible case.

3. **Target**: `tests/smoke/run.cjs` — sessions.html (Timetable tab).
   **Defect**: `.sched-block` rows in the Timetable panel have no computed-visibility proof (the
   List/table tab is already safe via plain `<tr>`).
   **Change**: assert computed visibility for the Timetable panel after a status/subject filter.
   **Verification**: `node tests/smoke/run.cjs` passes the new sessions assertion.

4. **Target**: `tests/smoke/run.cjs` — schedule.html (List tab, the default view).
   **Defect**: `.sched-block` rows inside `.day-group`s have no computed-visibility proof (the
   Timetable grid's `.tt-block` is already safe).
   **Change**: assert computed visibility for the List tab after a teacher/subject/status filter.
   **Verification**: `node tests/smoke/run.cjs` passes the new schedule assertion.

5. **Target**: `tests/smoke/run.cjs` — families.html.
   **Change**: assert computed visibility for `.family-card` rows after a status/category filter.
   **Verification**: `node tests/smoke/run.cjs` passes the new families assertion.

6. **Target**: `tests/smoke/run.cjs` — students.html.
   **Change**: add a computed-visibility regression assertion for the students table (`<tr>` rows
   were already unaffected by the class-display bug; this closes the coverage gap so a future
   style change cannot silently reintroduce it).
   **Verification**: `node tests/smoke/run.cjs` passes the new students assertion.

7. **Target**: `tests/smoke/run.cjs` — teachers.html.
   **Change**: assert computed visibility for `.dir-card` rows after a subject/status/workload/
   availability filter.
   **Verification**: `node tests/smoke/run.cjs` passes the new teachers assertion.

8. **Target**: `tests/smoke/run.cjs` — teacher-performance.html.
   **Change**: assert computed visibility for the comparison `.dir-card` rows after a subject/
   workload/signal filter.
   **Verification**: `node tests/smoke/run.cjs` passes the new teacher-performance assertion.

9. **Target**: `tests/smoke/run.cjs` — courses.html.
   **Change**: assert computed visibility for `.dir-card` rows after a subject/level/status filter.
   **Verification**: `node tests/smoke/run.cjs` passes the new courses assertion.

10. **Target**: `tests/smoke/run.cjs` — groups.html.
    **Change**: assert computed visibility for `.group-row` rows after a course/teacher/level/day/
    status/attention filter.
    **Verification**: `node tests/smoke/run.cjs` passes the new groups assertion.

11. **Target**: `tests/smoke/run.cjs` — reports.html.
    **Defect**: `.report-card` category-grid rows have no computed-visibility proof — a gap this
    fresh-eyes audit found beyond the plan's originally-named page list.
    **Change**: assert computed visibility for the category grid after an area/availability filter.
    **Verification**: `node tests/smoke/run.cjs` passes the new reports assertion.

12. **Target**: `src/js/pages/family.js` (`billingPanel()`) + `src/locales/ar.fam.js` +
    `src/locales/en.fam.js`.
    **Defect**: the Plan & Billing tab shows a disabled "manage billing" button but offers no way
    to reach the finance shell where this family's invoices actually live (US6/FR-015).
    **Change**: add one real `<a>` link to `finance.html`/`finance.en.html` (language-aware href)
    next to the existing disabled Manage-billing button, honestly labeled as the fixture preview
    (new key pair, e.g. `fam.bill.viewInvoices` — both locale files in the same change,
    Arabic-first quality, no "coming soon" hype).
    **Verification**: smoke assert — family body `a[href$="finance.html"]`/`a[href$="finance.en.html"]`
    count == 1; Spec 009's path-aware finance-vocabulary scope-guard exclusion list amended with
    this one sanctioned touch-point (`contracts/scope-guard.md` amendment, per FR-018 — the
    pattern is never widened, only this exact file+token is added).

---

## 3. Future log

Every `future` cell above is cross-referenced to a classification in the companion
`legacy-capability-coverage.md` matrix (per contract §2 — nothing here is a verbal deferral):

- **gallery** — legacy coverage / better-than-legacy / disposition all marked `future`. This is not
  a legacy-system capability at all; it is the project's internal component/style-preview surface
  (`activeId: null`, zero active nav item, no in-page product link — reached only by visiting
  `gallery.html` directly). It is registered in `legacy-capability-coverage.md` as a documented
  internal/engineering artifact (alongside `index.html`'s redirect role), matching spec.md's User
  Story 3 Acceptance Scenario 3 ("the gallery is documented as an intentional internal surface
  outside the product nav — not a forgotten page") and the topbar-header-contract §2 note ("The dev
  gallery keeps its title/crumb and zero active nav"). No PolishAction applies; nothing is fixed
  because nothing is broken — it is intentionally outside the audited product surface.

No other `future` cells exist in the matrix above: every other dimension on every other page
resolved to `pass` or a named `fixNow` PolishAction in §2. (The exhaustive legacy-capability
classification — all 19 legacy modules, the nine-way scheme, exclusions, future-role registers — is
the separate `legacy-capability-coverage.md` artifact; this page audit only cross-references it.)

### Accepted follow-up (not Spec 010's to change) — ✅ RESOLVED IN SPEC 011

> **Resolved in Spec 011** (final QA hotfix): the Overview "view all metrics" link now points to
> `reports.html`/`reports.en.html` (the real metrics hub); sitewide `href="#"` is now zero. The note
> below is retained as the original Spec 010 record.

- **dashboard — one pre-existing `<a href="#">`**: the Overview section header renders a "view all"
  affordance (`sectionHeader({ linkKey: 'section.overviewLink' })` with no `linkHref`) as
  `a[href="#"]`. In this codebase `a[href="#"]` is the established enhance.js control-hook idiom
  (`enhance.js` matches and `preventDefault`s it), so it neither navigates nor errors — but this
  particular one has no onward action. It is a Spec 001 approved-design artifact living in the
  **contract-frozen dashboard body** (`dashboard-impact-contract.md`, FR-021), so Spec 010 must not
  touch it. Logged here as an accepted follow-up for a future dashboard-owning spec (give the Overview
  "view all" a real destination or drop the affordance). The Spec 010 link crawl and scope-guard both
  allow exactly this one pre-existing instance and fail on any new dead link elsewhere.

---

## 4. Reachability & topbar

Verified against `scripts/build-html.mjs`'s `PAGES` registry (all 20 entries) and
`src/js/nav.config.js`:

- **All 20 page bases carry both `titleKey` and `crumbKey`** in the `PAGES` registry — no
  exceptions found. Every built page resolves its topbar title and breadcrumb in both Arabic and
  English (confirmed: zero raw `⟦key⟧` in any file under `public/*.html`).
- **Reachability**: 14 page bases are direct nav items (dashboard→`home`, sessions, schedule,
  attendance, families, `addFamily`, students, courses, groups, teachers, `teacherKpi`→
  teacher-performance, reports, finance, settings). The remaining 6 are profile/dev pages reached
  via documented in-page links, not nav items: **family** (from families.html cards / students.html
  family chips), **student** (from students.html / family.html children rows), **teacher** (from
  teachers.html cards), **course** (from courses.html cards), **group** (from groups.html rows),
  and **gallery** (intentionally unreachable from product nav or in-page links — a documented
  internal surface, see §3 above; this is the one accepted exception to "reachable from nav or an
  in-page link").
- **Active-state correctness**: profile pages carry their owning list's `activeId` (family→
  `families`, student→`students`, teacher→`teachers`, course→`courses`, group→`groups`,
  teacher-performance→`teacherKpi`) so the sidebar highlights the right item even though the
  profile itself isn't a nav entry; `gallery`'s `activeId` is `null` (zero active nav, by design).
- **No mismatch found** between this audit and `contracts/topbar-header-contract.md`'s asserted
  truths — this section confirms (does not contradict) that contract; no new fix-now PolishAction
  is generated by this subsection.
