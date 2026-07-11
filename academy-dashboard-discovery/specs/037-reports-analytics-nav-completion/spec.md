# Spec 037 — Reports / Analytics Nav Completion + Missing Pages Audit

**Status:** SPECIFIED (documentation only). **Feature dir:** `academy-dashboard-discovery/specs/037-reports-analytics-nav-completion/`. **Branch:** `feature/012-role-portal-foundation`. **Baseline HEAD:** `1eb4d9a` (Spec 034 committed). **Count before:** 115.

> ⚠️ **Baseline gate — Specs 035 AND 036 are UNCOMMITTED.** HEAD `1eb4d9a` is the Spec 034 commit. Specs 035 and 036 are IMPLEMENTED and green in the working tree but **not yet committed** (the spec folders show as untracked; their source/public/test changes are unstaged). This `/speckit.specify` step proceeds **as documentation only**, per the command. **Implementation of Spec 037 must NOT begin until the maintainer explicitly approves continuing on the green working tree** (and ideally the watcher commits 035, then 036, then 037 as separate commits first). This spec touches only `.specify/feature.json` and files under this spec folder.

## Why this spec exists

Spec 033 classified the whole Admin sidebar and assigned the remaining **Reports / Analytics** items to Spec 037. Specs 034 (Control), 035 (Families/Students), 036 (Teachers) closed their groups. Two Reports/Analytics items remain «قريبًا»:

- `monthlyReports` / التقارير الشهرية
- `dataAnalysis` / تحليل البيانات

Additionally, after Spec 035 shipped, the maintainer flagged three items as **still feeling missing** as real surfaces even though they are technically resolved in nav:

- `familyCategories` / فئات العائلات → currently `families.html`
- `studentResult` / نتائج الطلاب → currently `student.html#view=results`
- `studentEvaluation` / تقييم الطلاب → currently `student.html#view=evaluation`

Spec 037 therefore does **two** things: (1) complete the Reports/Analytics nav items with honest display-only surfaces, and (2) run a **full Admin Missing-Pages Audit** — verifying every sidebar item routes to a real page / deep-link / folded owner / honestly-gated future item — with a **deep re-audit of the three flagged 035 items** and explicit corrective recommendations.

## Core frontend law (binding)

- A visible Admin menu item must not remain «قريبًا» if a safe frontend surface can be shown.
- A sidebar item should not route to a *vague* page unless the target clearly exposes the intended feature.
- Show the page/tab/frontend surface first; only the final backend action is gated. Do not stop at `backendRequired` too early.

## Grounding verdict (see `visual-grounding.md`)

- `reports.js` is a single long **display-only** page (Spec 008 shell + Spec 029 feedback/forms fold). It has **no `tabs()`/`#view=` mechanism of its own** — the `#view=` links in its HTML are shared-sidebar links. Folding `monthlyReports`/`dataAnalysis` = wrap the existing content as an **overview** tab + add two display tabs (the exact Spec 036 `teacher-performance` precedent).
- Legacy honest, finance-free surfaces exist: `management/analysis-course` + `analysis-student` (→ dataAnalysis) and monthly operations roll-ups (→ monthlyReports). Finance analysis (`analysis-expenses`/`analysis-invoices`/`monthly-invoices`) is **excluded** (owner Spec 038; reports body stays finance-free forever).
- The three flagged items are all `implemented` in nav and functionally reachable, but **UX-weak**: familyCategories is only a filter dropdown + a kebab reclassify drawer; studentResult/studentEvaluation land on a single representative student (st1) despite plural nav labels. See `flagged-035-items-audit.md`.
- Full sidebar audit: **50 items, 0 truly-missing, 0 ownerless.** 26 real pages, 3 fold-anchors, 4 deep-links, 7 finance-locked (`disabled`+reason, owner 038), 10 planned-with-owner (037×2, 039×2, 040×6). See `admin-missing-pages-audit.md`.

## Recommended decisions (count-preserving; /speckit.plan finalizes)

| Item | Disposition | Route | Count |
|---|---|---|---|
| monthlyReports | display-only tab on reports.html | `reports.html#view=monthly` | 0 |
| dataAnalysis | display-only tab on reports.html | `reports.html#view=analysis` | 0 |
| familyCategories (corrective) | strengthen folded surface on families.html (labeled Categories board / `#view=categories`) | `families.html#view=categories` | 0 |
| studentResult (corrective) | cross-student Results board folded into students.html + per-student deep-link | `students.html#view=results` | 0 |
| studentEvaluation (corrective) | cross-student Evaluation board folded into students.html + per-student deep-link | `students.html#view=evaluation` | 0 |

**Recommended count target: 115 → 115 (delta 0, 0 new page bases, 0 new files). Admin menu stays 50.** Alternatives (defer correctives / standalone pages) are documented with explicit count impact in `count-and-route-contract.md` and `corrective-surfaces-register.md`. **Key open decision for /speckit.plan:** whether Spec 037 implements the three flagged-035 correctives now (recommended, count 0) or defers them to a follow-up spec.

## User Scenarios & Testing

### US1 — Monthly Reports surface (Priority: P1)
Admin clicks **Monthly Reports** and sees a clear, month-scoped monthly-reports board instead of «قريبًا».
- **Acceptance:** `reports.html#view=monthly` opens the Monthly tab on fresh load (AR/EN); an authored month-scoped operations board renders (summary cards + report rows + category/status chips + a month filter); any export/send/PDF final is a `backendRequired` gate; no canvas, no computed metric, no finance figure.

### US2 — Data Analysis surface (Priority: P1)
Admin clicks **Data Analysis** and sees a clear analytics board instead of «قريبًا».
- **Acceptance:** `reports.html#view=analysis` opens the Analysis tab on fresh load (AR/EN); an authored insight board renders (insight cards + categorical trend/status chips + a read-only list/table + filters); no `<canvas>`/chart, no computed metric/percentage/rank, no finance figure; any export final is a gate.

### US3 — Full Admin sidebar audit (Priority: P1)
QA audits the entire Admin sidebar and finds no unintentionally missing pages.
- **Acceptance:** every one of the 50 items is classified (`admin-missing-pages-audit.md`); every item routes to a real page / deep-link / folded owner / honestly-gated future item with an assigned owner spec; 0 dead nav; admin menu still 50.

### US4 — Family Categories clarity (Priority: P2)
QA verifies **Family Categories** is a clear feature surface, not a hidden vague route.
- **Acceptance:** the audit records the current weak state and a corrective (recommended: a labeled Family Categories board/tab on families.html with authored category counts + reclassify drawer + create gate); no fake category creation/save/mutation.

### US5 — Student Results clarity (Priority: P2)
QA verifies **Student Results** is clear and adequate for admin use.
- **Acceptance:** the audit records the single-student weakness and a corrective (recommended: a display-only cross-student Results board folded into students.html + per-student deep-links); no computed score/GPA/rank/percentage.

### US6 — Student Evaluation clarity (Priority: P2)
QA verifies **Student Evaluation** is clear and adequate for admin use.
- **Acceptance:** the audit records the single-student weakness and a corrective (recommended: a display-only cross-student Evaluation board folded into students.html + per-student deep-links); no computed rubric total/score/rank.

### US7 — No-fake academic/report actions (Priority: P1)
QA verifies no fake report generation, analytics calculation, student result/evaluation calculation, or family-category persistence.
- **Acceptance:** every generate/export/PDF/send/save/publish/reclassify final is a `backendRequired` gate; no computed metric/score/rank/GPA/percentage/rubric-total; no chart/`<canvas>`; no row/status/result mutation; no backend/API/network.

### US8 — Role-law / no-fake carryover (Priority: P1)
QA verifies previous role-law and no-fake contracts remain green.
- **Acceptance:** teacher pay-free, family zero-pay, student child-view, finance Spec-009 invariant, admin-menu-50 freeze, reports 7-card/finance-9-planned asserts, and the Spec 026–036 protected asserts all stay byte-verbatim; tests additive only.

## Functional Requirements

- **FR-001** Targeted Visual Grounding must be run and recorded before any implementation (done in `visual-grounding.md`).
- **FR-002** `monthlyReports` must be covered by an honest display-only surface (recommended: `reports.html#view=monthly` tab).
- **FR-003** `dataAnalysis` must be covered by an honest display-only surface (recommended: `reports.html#view=analysis` tab).
- **FR-004** A full Admin missing-pages audit of all 50 items must be produced with a classification per item.
- **FR-005** The three flagged 035 items must be deeply audited (visual + functional + UX) with an explicit corrective decision each.
- **FR-006** A page-vs-fold/standalone decision must be recorded for the reports items and each flagged item.
- **FR-007** A corrective decision must be recorded for familyCategories, studentResult, studentEvaluation.
- **FR-008** The count target must be evidence-based and explicit (recommended 115; standalone alternatives quantified).
- **FR-009** Nav changes must be evidence-based and exactly: monthlyReports + dataAnalysis flips + any adopted flagged correctives (route refinements) only.
- **FR-010** No fake report generation, analytics engine, export/PDF/download, student result/evaluation calculation, or family-category save.
- **FR-011** No computed score/rank/GPA/percentage/rubric-total; no `<canvas>`/chart; reports body finance-free.
- **FR-012** No backend/API/auth/database/websocket/external request; no `type=file`/`type=password`/secret; no `href="#"`; no raw keys; no dead buttons; no `package.json` change.
- **FR-013** AR/EN locale parity; RTL/LTR; mobile 390; a11y critical=0 serious=0; screenshots; additive smoke coverage.
- **FR-014** Role-law/no-fake carryover asserts remain green and byte-verbatim (additive tests only).
- **FR-015** `FUTURE_ROUTES` stale entries for `monthlyReports`/`dataAnalysis` are removed/repointed when those items are promoted; admin menu stays 50; no accidental removals.

## Key Entities (display-only fixtures)

- **Monthly report row** — authored: month, area/category, status chip, count literals (no money, no computed metric).
- **Analysis insight** — authored: subject/area, categorical trend/status chip, count literal, note (no computed percentage/rank).
- **Family category** — authored: name, member-count literal, status (no fake persistence).
- **Student result summary (board)** — authored per-student: name, level, certificate/result status chip, deep-link (no computed score/GPA/rank).
- **Student evaluation summary (board)** — authored per-student: name, categorical evaluation status chip, deep-link (no computed rubric total).

## Non-goals

Spec 037 must not: implement now · create plan.md/tasks.md · commit/push · touch app source except `.specify/feature.json` · add backend/API/auth/database · add finance/payment/payroll logic · add a real analytics/report engine · add PDF/export/download generation · create fake calculated financial numbers · create fake student result/evaluation calculations · create fake family-category persistence · weaken any prior role-law/no-fake test.

## Assumptions

- The tabs()/`#view=` deep-link mechanism (enhance.js) opens the correct tab on fresh load — proven by Specs 035/036.
- `reports.html`'s existing content (operations overview, 7 category cards, detail sections, feedback/forms) is preserved intact inside the new **overview** tab; the reports smoke asserts (7 cards / 2 planned) continue to pass because they live inside overview.
- Finance-flavoured "analysis"/"monthly" legacy pages are owned by Spec 038 and are excluded here to keep the reports body finance-free.
- Materials/certificateRequests (039) and settings×6 (040) and finance×7 (038) remain owner-assigned «قريبًا»/locked and are **not** touched by Spec 037.

## Dependencies

- Specs 035 + 036 (uncommitted working-tree baseline) — implementation gated on maintainer approval.
- Spec 033 admin-nav-completion-matrix + follow-up-spec-roadmap (owner assignments).
- Spec 036 `teacher-performance` tabs() fold precedent.

## Success Criteria

- **SC-001** monthlyReports and dataAnalysis are no longer «قريبًا»; each opens a clear display-only surface on fresh deep-link load in both languages.
- **SC-002** All 50 admin items are classified; 0 unintentionally-missing; 0 ownerless.
- **SC-003** Each of the three flagged items has a recorded verdict + corrective; a non-technical admin can understand each feature exists.
- **SC-004** No computed metric/score/rank/chart/finance-figure anywhere in the new surfaces; every backend action gated.
- **SC-005** Admin menu stays 50; count target held (recommended 115); no accidental removals.
- **SC-006** All prior role-law/no-fake asserts remain green (byte-verbatim, additive tests only).
