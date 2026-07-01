# Contract: Screenshot Acceptance (Spec 008 — Academic Reports & Operations Shell)

**Status**: Binding · Automated tests are required but NOT sufficient. **Final acceptance is a human screenshot review** of the enriched Reports page against the Spec 001–007 approved direction. "Passes tests but looks like a generic BI dashboard / a statistics wall / a chart suite / shows a fake score-rank / shows a finance widget / hides the source-page links / claims real reporting-export persistence" = **fail**. Self-contained for Spec 008. References **FR-018** (project gates), **SC-007** (a11y + responsive), **SC-008** (visual acceptance), **SC-009** (reuse + no fabricated metric).

## A0. Targets are built static pages

Acceptance runs against the built static site in `app/public/`. Target: the regenerated `public/reports.html` / `reports.en.html`. `npm run build` produces them; the harness serves `public/`. **Content (shell, page header, action cluster, the academic-operations overview, every report-category card, every per-area summary section, the planned/backendRequired cards, the filter bar) renders WITHOUT JS**; JS is used only to reach a **state** (apply a filter, open an action confirm/disabled-reason). The Reports page is the existing implemented `reports` nav page (`activeId:'reports'`), **enriched in place** — no new page.

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright / **Chromium**): per scenario, set the **theme via `localStorage`**, load the per-language file at the viewport, drive the minimal state, capture a full-page PNG to `app/screenshots/`. Viewports: **desktop 1440×900, mobile 390×844**. Deterministic fixtures; non-essential **animation disabled**. The per-area sections (attendance / sessions / courses-groups / teacher / student-family) all appear within the **full-page** `reports__ar__light__desktop` capture and are reviewed as regions of it (A2b) — no near-duplicate full-page frames are required.

## A2. Required matrix (7 frames) — exact file names

File naming: `{page}__{lang}__{theme}__{viewport}[__{variant}].png`.

| # | Scenario | File |
|---|----------|------|
| 1 | **Reports** shell (overview + all area sections) — AR RTL · Light · Desktop | `reports__ar__light__desktop.png` |
| 2 | **Reports** shell — AR RTL · **Dark** · Desktop | `reports__ar__dark__desktop.png` |
| 3 | **Reports** shell — **EN LTR** · Light · Desktop | `reports__en__light__desktop.png` |
| 4 | Report **action** (Schedule confirm-demo modal) — AR RTL · Light · Desktop | `reports__ar__light__desktop__action.png` |
| 5 | Report **filter** narrowed (category cards) — AR RTL · Light · Desktop | `reports__ar__light__desktop__filter.png` |
| 6 | **Mobile** Reports shell — AR RTL · Light · Mobile | `reports__ar__light__mobile.png` |
| 7 | **Reports** shell — EN RTL→LTR sanity / dark sampled (optional add) | `reports__en__dark__desktop.png` (optional) |

(There is **no** dashboard frame — Spec 008 makes no dashboard change. Frames 1–6 are the minimum gate.)

## A2a. `capture.cjs` MATRIX additions

Append to the `MATRIX` array (reuses the existing `variant`/click mechanism; the action frame uses a click step, the filter frame a `select` step):

```js
// Spec 008 — Academic Reports & Operations Shell (acceptance matrix)
{ page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop' },                                 // 1
{ page: 'reports', lang: 'ar', theme: 'dark',  vp: 'desktop' },                                 // 2
{ page: 'reports', lang: 'en', theme: 'light', vp: 'desktop' },                                 // 3
{ page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', reportAction: true, variant: 'action' }, // 4
{ page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', reportFilter: true, variant: 'filter' }, // 5
{ page: 'reports', lang: 'ar', theme: 'light', vp: 'mobile' },                                  // 6
```

`reportAction` clicks the Schedule action's `[data-confirm]` → captures the confirm modal (non-fullPage). `reportFilter` selects a facet to evidence narrowing. No new state-driving branch beyond a click/select.

## A2b. Per-frame acceptance criteria (what each frame/region must show)

- **Reports shell (#1–3, #6)**: a page header («التقارير» / "Reports") + a **report action cluster** (Print / Export CSV / Export PDF / Share / Schedule — all honest) + an **Academic Operations overview** (a calm band of fixture **count** tiles + labeled report-signal chips) + **report-category cards** (Attendance & Outcomes · Sessions & Timetable · Courses & Groups · Teachers · Students & Families, each with a labeled **availability** chip + a fixture summary + a **real drill-down link**) + the **per-area summary sections** + a row of **planned/backendRequired** advanced-report cards. It reads as a **calm academy operations shell**, **NOT a generic BI dashboard, statistics wall, or chart suite**. Dark (#2) is true-dark, AA contrast; EN (#3) is fully mirrored to LTR with Latin digits + English labels. Mobile (#6) reflows to a single column, no overflow.
  - **Attendance & Outcomes region**: completed + **teacher absences (amber) vs student absences (red) — two distinct chips** + cancelled/rescheduled + needs-follow-up counts + a "View attendance" link.
  - **Sessions & Timetable region**: a labeled session-status summary (live/upcoming/completed/cancelled) + "View sessions"/"View timetable" links.
  - **Courses & Groups region**: active courses/groups + a groups-needing-attention signal + "View courses"/"View groups" links.
  - **Teachers region**: teachers-needing-follow-up + teacher/student absence counts + "Teacher performance"/"Teacher profile" links — **no score/rank**.
  - **Students & Families region**: students/families needing follow-up + "View students"/"View families" links.
- **Report action (#4)**: clicking **Schedule report** opens an honest confirm modal ("schedule this report? — demo only, no backend job is created") → on confirm a demo toast; **no real scheduled job**. (Export CSV/PDF/Share show disabled-with-reason on hover/focus.)
- **Report filter (#5)**: a facet narrows the category cards with a visible count + a no-results/reset affordance.
- **Across all**: recognizably the same product as Spec 001 (tokens, calm cards, **labeled** signal/availability chips never numeric/color-only); **every number is a fixture count** (matches the dashboard chips); the source links are visible and real; **no chart/graph, no computed score/rank/leaderboard/percentile, no finance/revenue/salary card**; `reports` is the active nav item; no `future-role` portal chrome.

## A3. Review process & comparison references (baselines)

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with: the **Spec 001 approved dashboard** (`design-references/approved-dashboard/academy-dashboard.png`) — the visual target; the approved **sidebar reference**; the **existing Spec 001–007 screenshots** (`app/screenshots/*.png`) — continuity; the **legacy report/statistics screens** (Sessions Analysis KPI cards, Classes-KPI/Teacher-Feedback %, the chart/analysis pages, the finance reports) — **product/UX reference ONLY, never a visual copy** (Spec 008 must out-build the scattered, chart-debt, finance-mixed legacy, not replicate it — and deliberately omits its charts).
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts in `app/screenshots/REVIEW.md` (A6) — **the manual review there is the FINAL gate**.

## A4. Failure conditions (any one = FAIL)

- Looks like a **generic BI dashboard** / a **generic statistics wall** / a **chart-heavy analytics suite** (any chart/graph/sparkline/canvas).
- A **computed score / ranking / leaderboard / percentile / trend / health-%** appears.
- A **finance / salary / payroll / invoice / revenue / accounting** report card, figure, or widget appears.
- Missing the **teacherAbsent vs studentAbsent** distinction (collapsed into one "absences").
- Missing the **source-page links** (a section/card with no drill-down) — or a **dead link / dead `#`** (planned reports must be labeled, not dead).
- A report action performs a **real export / PDF / CSV / share / scheduled job** (instead of demo/confirm/disabled).
- **Copied legacy visuals / assets / colors / classes / wording / numeric statuses / report column dumps.**
- **Raw i18n keys** visible (`rep.*` shown literally).
- **Poor dark mode.** · **Broken RTL or LTR** (mirrored numbers, broken chip/card/section in either direction).
- Page is **JS-rendered whole page** instead of static HTML-first (a card/section/chip built at runtime, or a whole-page `#app` mount).
- **Claims real reporting / export / analytics persistence** (a real save/generate/send/schedule).
- **Cannot deploy** to GitHub Pages (absolute paths / external requests).
- **Hard to convert** to a Django template (`{% for category/section %}`, signal/availability maps → template tags).
- **A number that does not match its source fixture export** (fabricated metric).

## A5. Automated checks that accompany (not replace) the review

- **a11y** (SC-007): axe **critical = 0** (and serious = 0) on `reports` in AR light + dark + EN (incl. a filter/action state); signal/availability/outcome chips **never color-only**; RTL and LTR render without overflow on desktop + mobile.
- **no-dead-button / no-raw-i18n-key / no-external-request**: smoke over `reports` (no-external-request also proves no chart/analytics library loads).
- **HTML-structure** (SC-005): static shell + baked category cards (each `available` one a real `<a>` to an implemented page) + baked overview tiles + baked per-area sections + **no `id="app"`**; relative asset paths.
- **no-finance / no-chart / no-score**: the G8a grep audit (scope-guard) is clean.
- **fixture-coherence**: every report number equals its source export (e.g. matches the dashboard chip counts); teacherAbsent ≠ studentAbsent present.

## A6. REVIEW.md verdict format

Append a **dated section** to `app/screenshots/REVIEW.md`:

```
## Spec 008 — Academic Reports & Operations Shell — <YYYY-MM-DD>

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Reports shell (AR/light/desktop) | reports__ar__light__desktop.png | ✅ PASS — <reason> |
| … | … | … | … |

Failure conditions: none triggered.
Automated (accompanying): build clean · smoke PASS · axe critical=0/serious=0 · grep-audit clean · 0 console errors.
```

Every row uses `✅ PASS — <reason>`; any FAIL names the triggered A4 condition and **blocks acceptance** until re-captured. The dated REVIEW.md section is the **final gate** (FR-018, SC-008).

## A7. Output & naming

`app/screenshots/reports__{lang}__{theme}__{viewport}[__{variant}].png`, with verdicts appended to `app/screenshots/REVIEW.md` per A6.

## A8. Determinism & shell-invariant cross-check

- **Deterministic** — fixtures are fixed; non-essential animation disabled so the action/filter frames are crisp.
- **Shell cross-check** — every frame MUST satisfy the carried shell rules: exactly one visible nav category panel, exactly one `is-active[aria-current]` (the `reports` item), the rail intact, no `future-role` portal chrome.
- **No legacy bleed-through** — reviewers compare against the old report screens only to confirm the *product idea* (organized academic operations reports); any copied chart, numeric status, palette, class, finance column, or private wording in a frame is an automatic FAIL (A4).
