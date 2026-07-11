# Implementation Plan — Spec 036: Teachers Nav Completion

**Branch**: `feature/012-role-portal-foundation` (single-branch) · **Spec dir**: `academy-dashboard-discovery/specs/036-teachers-nav-completion/`
**Baseline**: Spec 035 **implemented & green but UNCOMMITTED** (working tree; HEAD `1eb4d9a` = Spec 034). Public HTML **115**, build/smoke/a11y green, `feature.json` → 036. User explicitly approved planning on the green working tree.
**Status**: PLANNED (no tasks, no implementation, no commit).

---

## Targeted Visual Grounding — Spec 036 Plan Complete

```
Scope: addTeacher · teacherCategories · sessionsKpi · monthlyPerf

Evidence inspected:
- CURRENT APP: nav.config.js (teachers items :55-56 + cat.teachersPerf :63-64 all planned; FUTURE_ROUTES.teacherCategories :144);
  teachers.js (addTeacherAction→trn-add :105/112; trn-categories drawer :70-84/110 via "Manage categories" secondary btn);
  teacher-actions.js (trn-add/trn-edit teacherFields :45-63 = names/email/phone/status/subjects/level/courses/city/country/notes + cvGate;
  pay fieldset OMITTED :36; reset-password=off() gate :100); teacher-performance.js (FLAT display-only board — count tiles + comparison
  list + follow-up queue; NO tabs widget; NO computed rating/rank/chart :1-6; filterBar targets #perf-list);
  components/tabs.js (tabs({group,items,panels}); enhance.js syncs #view= + persists academy.schedView.<group>);
  build-html.mjs (teacher-performance already registered :115, activeId 'teacherKpi'); locales ar/en.trn.js (teacher module);
  fixtures/teachers.js + teacher-links.js (teacherCounts — authored counts).
- LEGACY CRAWL: management-teachers-create.md (Add-Teacher WITH Salary/Payout/Zoom/password — all forbidden here);
  management-teacher-categories(.-create/-members).md (list + CRUD name/status/description + member_id[]);
  management-class-feedback.md (Classes KPI: #/Teacher/Percentage/session count); management-teacher-feedback.md
  (Monthly Performance: #/Teacher/Percentage/Note + Category/Percentage + feedback-category modals).
- PRIOR SPECS: 033 (matrix 40/41/43/44, CS-10..13, page-vs-deeplink 17-20, roadmap 036 "2 anchor + 2 tabs", envelope row 13 = 0);
  028 (trn-add/trn-categories, teacher-performance display-only, performance-metric-scope forbids computed score/rank/chart);
  032 FC-20..24 (trn-* fields; OMIT password/salary/rate/fine/zoom/payout; cv=gate).

Legacy capabilities found:
- addTeacher: REAL create form WITH Salary + Payout + password + Zoom (all excluded forever).
- teacherCategories: REAL list + CRUD (name/status/description + assign members). No pay.
- sessionsKpi: REAL read-only "Classes KPI" report — teacher + COMPUTED Percentage + session count. No pay, no chart.
- monthlyPerf: REAL read-only "Monthly Performance" report — teacher + COMPUTED Percentage + note. No pay, no chart.

Current app patterns inspected: tabs() widget + #view= hash; formDrawer/previewTemplate + data-disabled-reason gates;
  filterBar/facetAttrs client-side narrowing; existing trn-add/trn-categories drawers; teacher-performance flat board.

Planning decisions:
- addTeacher: FOLD-ANCHOR → teachers.html (existing trn-add). Count 0. No pay/password.
- teacherCategories: FOLD-ANCHOR → teachers.html (existing trn-categories). Count 0. Drop FUTURE_ROUTES entry.
- sessionsKpi: FOLD as a display TAB → teacher-performance.html#view=sessions-kpi. Count 0. Counts + categorical labels; NO computed %.
- monthlyPerf: FOLD as a display TAB → teacher-performance.html#view=monthly. Count 0. Month + categorical trend/status + notes; NO computed %.
- count: 115 → 115 (0). tabs() added to teacher-performance.html (its body changes; teachers.html/teacher.html byte-identical).
- tests: additive Teachers block in smoke + a11y rows + screenshots; protected + teacher-pay asserts byte-verbatim.

Proceeding to plan: YES
```

**Evidence gate: PASS.** All four items grounded first-hand; two existing drawers (fold anchors), two read-only legacy reports folded as display tabs (computed `Percentage` deliberately dropped). No gap forcing invention.

---

## Technical Context
- **Stack**: native ES modules, static HTML-first, AR RTL + EN LTR, no framework/CDN/TS/chart lib, fixtures only.
- **Mechanism**: reuse the `tabs()` widget + `#view=` hash for the two new teacher-performance tabs; reuse the existing `trn-add`/`trn-categories` drawers for the two fold anchors; reuse `filterBar`/`facetAttrs`/`data-disabled-reason`/`chip`/`cardGrid`/`statMini`. Locale in the existing `ar/en.trn.js`. Authored data in a new `fixtures/teacher-performance.js`.
- **Unknowns**: none. NEEDS CLARIFICATION = 0.

## Constitution Check
`.specify/memory/constitution.md` is an unfilled template; binding law = the project CLAUDE.md contract (static-first, no backend/engine/dependency, teacher pay-free GLOBAL, no computed score/rank/chart, closed hook set, protected smoke asserts). Spec 036 complies (see contracts). **Gate: PASS.**

---

## Decisions (D1–D33)
Rationale in `research.md`; each references a contract.

| # | Decision | Summary |
|---|---|---|
| D1 | Baseline count 115 | verified `find public -name '*.html' \| wc -l` = 115 (green Spec-035 tree). |
| D2 | Target 115 | delta 0. |
| D3 | 0 new page bases | folds only. |
| D4 | 4 nav resolutions | addTeacher/teacherCategories/sessionsKpi/monthlyPerf. |
| D5 | addTeacher fold owner | `route:'teachers.html'`; teachers is the folded owner. |
| D6 | addTeacher reachability | `addTeacherAction()` primary → `trn-add` drawer (teacher-actions.js:71). No body edit. |
| D7 | addTeacher forbidden fields omitted forever | pay fieldset already OMITTED (teacher-actions.js:36); no password (reset=gate); CV=gate. |
| D8 | addTeacher Save gate | `formDrawer` `common.add` = `data-disabled-reason` backendRequired, byte-identical. |
| D9 | teacherCategories fold owner | `route:'teachers.html'`; drop `FUTURE_ROUTES.teacherCategories`. |
| D10 | teacherCategories reachability | "Manage categories" secondary → `trn-categories` drawer (list + Create form + gates). No body edit. |
| D11 | teacherCategories gate | Create Save = `common.backendRequiredNote`; assign = `trn.cat.assignReason`. Byte-identical. |
| D12 | sessionsKpi tab strategy | add `tabs({group:'perf', items:[overview, sessions-kpi, monthly]})` to teacher-performance.html; existing board → **overview** (default) panel; `#view=sessions-kpi` opens the KPI panel. |
| D13 | sessionsKpi board sections | authored KPI summary + a per-teacher **sessions board** (name + status chip + authored session counts [completed/teacher-absent/student-absent/cancelled via `teacherCounts`] + a categorical quality/attendance chip) + optional read-only drawer; a `filterBar` (teacher/subject) over the board. |
| D14 | sessionsKpi authored data | reuse `teacherCounts` (authored) for counts; new `fixtures/teacher-performance.js` for the categorical quality labels. No pay, no computed. |
| D15 | sessionsKpi no-compute proof | render counts as literals + categorical chips; **NO** computed score/rank/percentage; NO `<canvas>`/chart; the legacy `Percentage` is NOT reproduced. |
| D16 | sessionsKpi pay-free proof | names/counts/labels only; pay-token grep = 0. |
| D17 | monthlyPerf tab strategy | third tab on the same `perf` group; `#view=monthly` opens it. |
| D18 | monthlyPerf board sections | month filter + per-teacher **monthly rows** (name + status + month + categorical trend/status chip + authored note) + optional read-only drawer. |
| D19 | monthlyPerf authored data | new authored rows in `fixtures/teacher-performance.js` (teacher + month + categorical trend + note). No pay, no computed. |
| D20 | monthlyPerf no-compute proof | categorical trend/status + notes only; NO computed %/score/rank/total; NO chart; does not duplicate the Spec-029 feedback engine. |
| D21 | monthlyPerf pay-free proof | names/labels/notes only; pay-token grep = 0. |
| D22 | fixture structure | new `fixtures/teacher-performance.js`: `SESSIONS_KPI_LABELS` + `MONTHLY_ROWS` (+ month/label vocab). Authored, no PII/pay/computed. `fixtures/teachers.js`/`teacher-links.js` unchanged. |
| D23 | locale strategy | extend the EXISTING `ar/en.trn.js` (new keys under `trn.tab.*` / `trn.kpi.*` / `trn.monthly.*`), mirrored, 0 divergence. **No new locale pair; `i18n.js` 0-diff.** |
| D24 | CSS strategy | additive only; reuse `tabs`/`card`/`dir-card`/`chip`/`statMini`/`filterbar`; a small `.tp-*` only if needed; theme-aware. |
| D25 | nav.config.js changes | 4 status flips + routes; drop `FUTURE_ROUTES.teacherCategories`. Build guard satisfied (each implemented item has a route; hash routes are valid hrefs — the Spec-035 hash-aware `langRoute` already handles EN). |
| D26 | build-html.mjs | **0-diff** — teacher-performance already registered (:115); no new page. |
| D27 | smoke strategy | additive Teachers block (see `contracts/smoke-coverage-contract.md`); protected + teacher-pay + nav010 asserts byte-verbatim; sole sanctioned amendment = repoint the dashboard planned-item probe (teachers→reports/admin/settings). |
| D28 | a11y strategy | teacher-performance `#view=sessions-kpi` + `#view=monthly` AR/EN light/dark + mobile-390 + open-drawer rows → 0/0. |
| D29 | screenshot strategy | teachers Add-Teacher + Teacher-Categories fold proofs + the two new tabs; AR/EN dark/mobile; 0 console errors. |
| D30 | role-law carryover | teacher pay-free, family zero-pay, student child-view, finance/settings invariants green; protected asserts byte-verbatim. |
| D31 | impact protection | `teachers.html`/`teacher.html` `#page-body` byte-identical (nav-flip only); `teacher-performance.html`/`.en` bodies change (tabs) — the ONE sanctioned body change; portals ×16 + index + all other admin `#page-body` byte-identical; `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff. |
| D32 | allowed/forbidden files | see `contracts/scope-guard.md`. |
| D33 | risks/stop | see below + `contracts/scope-guard.md`. |

---

## Phases (for `/speckit.tasks`, NOT executed here)
- **Phase A — Foundation**: `fixtures/teacher-performance.js` (authored KPI labels + monthly rows) + new `trn.*` keys in `ar/en.trn.js`.
- **Phase B — teacher-performance tabs**: refactor `renderTeacherPerformance()` to wrap the current board as the `overview` panel + add `sessions-kpi` and `monthly` panels via `tabs({group:'perf'})`; optional additive `.tp-*` CSS.
- **Phase C — nav flips**: `nav.config.js` 4 flips + `FUTURE_ROUTES.teacherCategories` drop.
- **Phase D — fold anchors**: verify addTeacher/teacherCategories nav → teachers.html; `teachers.html`/`teacher.html` bodies byte-identical (no code change).
- **Phase E — tests**: smoke Teachers block + a11y rows + screenshots (additive).
- **Phase F — docs**: REVIEW.md, README.md, CLAUDE.md, implementation-status.md.
- **Phase G — verify**: build 115, smoke PASS, a11y 0/0, screenshots 0 errors, impact-protection diffs, teacher-pay grep 0.

## Risks & stop conditions
- **Baseline is uncommitted Spec 035** (primary): Spec 036 will build on top of the Spec 035 working tree. If the watcher commits Spec 035 mid-flight, the trees reconcile cleanly (disjoint files except the shared sidebar + nav.config, which both append). *Recommend the watcher commit Spec 035 before Spec 036 implement so they land as separate commits.* Do not mix Spec 035 and Spec 036 implementation concerns.
- **teacher-performance.html body changes** (adding tabs): must keep the existing overview board's smoke/a11y/screenshot assertions valid (overview = default tab; `#perf-list` + its `workload` FILTER_SPEC filter stay in the default-visible panel). *Stop if wrapping the board would break a protected teacher-performance assert that can't be preserved additively.*
- **No computed % reproduced**: legacy KPI/monthly had a `Percentage`; the tabs render counts + categorical labels only. *Stop if a computed score/rank/percentage/chart is required.*
- **Teacher pay-free**: *stop* if any salary/rate/fine/payout/currency figure is required.
- **Any** fake teacher/category/KPI persistence, row/status mutation, backend/network, `type=file`/`type=password`, `package.json` change, or a weakened protected/pay assert → **STOP and report**.

## Confirmations
- No tasks generated. No implementation started. No commit / no push. Only prior app-source touch = `feature.json` → 036.
