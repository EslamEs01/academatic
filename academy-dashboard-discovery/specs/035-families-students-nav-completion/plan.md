# Implementation Plan — Spec 035: Families & Students Nav Completion

**Branch**: `feature/012-role-portal-foundation` (single-branch convention) · **Spec dir**: `academy-dashboard-discovery/specs/035-families-students-nav-completion/`
**Baseline**: Spec 034 committed HEAD `1eb4d9a`, public HTML **113**, build/smoke/a11y green, `feature.json` → 035.
**Status**: PLANNED (no tasks, no implementation, no commit).

---

## Targeted Visual Grounding — Spec 035 Plan Complete

```
Scope:
- familyCategories · scheduleSearch · studentResult · studentEvaluation

Evidence inspected:
- CURRENT APP: nav.config.js (families items 44/46/47/48 planned; FUTURE_ROUTES 142-143 stale);
  pages/student.js (233-243 results+evaluation tabs → resultSummary/evaluationRubric; #view= shortcuts 84-85);
  pages/schedule.js (45-77 browse filter over List/Timetable — NOT a search tool);
  pages/students.js (admin directory, no results cols); pages/families.js (:32 category filter, :39 fam-cat baked);
  pages/family.js (:68 trigger, 149-165 fam-cat display-only reclassify drawer + gated Save);
  pages/leads.js (Spec-034 precedent: pageHeader+summaryCards+filterBar+facetAttrs rows+previewTemplate+formDrawer+gate+noResults);
  components/result-summary.js (fixture-only, "NO gradebook … NO computed score"); components/evaluation-rubric.js (fixture-only rubric, no total);
  components/tabs.js (:4 #view= sync) + enhance.js (261-269 hash wins); components/filter-bar.js (data-filter selects, client-side);
  dom.js (facetAttrs → data-row data-<facet>); build-html.mjs (PAGES format); i18n.js (12 mirrored pairs, deepMerge).
- LEGACY CRAWL: management-categories-families(.-create/-assign).md (REAL CRUD list: name/desc/status/count + assign member_id[]);
  management-search-schedule.md (REAL distinct availability finder → POST search-available-teacher; from/to window, category[], availability/courses toggles);
  management-student-1.md + management-forms-students.md (qualitative "Total Report"/"Send Report", no score);
  management-families-feedback.md (narrative report + categorical Class Remark); combined/*.md (0 academic-score hits);
  management-schedule-trials-response.md ("Request Result" = trial inbox, NOT academic results — do not conflate).
- PRIOR SPECS: 016 sidebar inventory (37-38 dedicated-page-needed); 027 (M-K fam-cat, M-R results/eval no-score, M-S schedule gate);
  029 (result-summary/evaluation-rubric, R-D/R-F/R-L, no-computed-% contract); 032 FC-05 (fam-cat); 033 (matrix 30/32/33/34, CS-06..09,
  page-vs-deeplink, page-count-envelope named schedule-search pair, roadmap 035).

Legacy capabilities found:
- familyCategories: REAL CRUD (list/create/edit/delete/assign-families). No computed figure.
- scheduleSearch: REAL distinct availability finder (time-window + category + availability/courses toggles → available teachers).
- studentResult: NO dedicated page; qualitative narrative report only; ZERO computed score.
- studentEvaluation: NO dedicated page; qualitative rubric/feedback only; ZERO computed score.

Current app patterns inspected:
- filterBar + facetAttrs client-side filtering (leads/students/schedule); previewTemplate/formDrawer/field/gate; tabs #view= deep-link;
  fam-cat display-only reclassify drawer + families category filter; result-summary/evaluation-rubric fixture-only tabs.

Planning decisions:
- familyCategories: FOLD-ANCHOR → families.html (reuse category filter + fam-cat drawer, gated Save). Count 0.
- scheduleSearch: STANDALONE page schedule-search.html + .en (mirror leads.js). Book/Assign = backendRequired. Client-side facet over authored fixtures. Count +2.
- studentResult: DEEP-LINK → student.html#view=results (existing display-only tab). Count 0. No computed score/chart.
- studentEvaluation: DEEP-LINK → student.html#view=evaluation (existing display-only tab). Count 0. No computed total/chart.
- count: 113 → 115 (+2). tests: additive smoke Families/Students block + a11y rows + screenshots; protected regexes byte-verbatim.

Proceeding to plan: YES
```

**Evidence gate: PASS.** All four items grounded first-hand; two real legacy pages (fold + new page), two audited-absent pages (deep-links). No gap forcing invention.

---

## Technical Context
- **Language/stack**: native ES modules, static HTML-first (build-time pre-render), AR RTL + EN LTR. No framework/CDN/TS/SPA/chart lib. Fixtures only.
- **Build**: `scripts/build-html.mjs` PAGES registry × `['ar','en']` → HTML in `public/`. Locale: `i18n.js` deepMerge of mirrored `ar/en.X.js` pairs.
- **Enhancement**: CLOSED `data-*` hook set in `enhance.js` (`data-filter`/`data-facet`, `data-drawer`→`template[data-preview]`, `data-disabled-reason`, `#view=` tab hash, `data-confirm`). No new hook/storage key/engine.
- **Unknowns**: none material. NEEDS CLARIFICATION = 0.

## Constitution Check
`.specify/memory/constitution.md` is an unfilled template; the binding law is the project CLAUDE.md contract (static-first, no backend/engine/dependency, role laws, no-fake gates, no computed score/chart, closed hook set, protected smoke asserts). Spec 035 complies on every point (see contracts). **Gate: PASS** (no violations; nothing to justify).

---

## Decisions (D1–D31)
Full rationale in `research.md`; each references a contract.

| # | Decision | Summary |
|---|---|---|
| D1 | Baseline count 113 | Verified `find public -name '*.html' \| wc -l` = 113 at HEAD `1eb4d9a`. |
| D2 | Target count 115 | +2 from the single `schedule-search` base × 2 langs. |
| D3 | One new page base | Only `schedule-search`; no other page added/removed. |
| D4 | Exactly 4 nav resolutions | familyCategories/scheduleSearch/studentResult/studentEvaluation flip planned→implemented. |
| D5 | familyCategories fold owner | `route:'families.html'`; families is the folded owner. |
| D6 | familyCategories reachability | families category filter (families.js:32) + `fam-cat` reclassify drawer (family.js:149-165) stay reachable; no body edit. |
| D7 | familyCategories gate | `fam-cat` "Save category" stays `data-disabled-reason` (`fam.cat.reclassReason`), byte-identical. |
| D8 | schedule-search layout | pageHeader + summaryCards(authored KPIs) + filterBar + results list (`#ss-results`) + noResults + detail drawer + gated finals — mirrors `leads.js`. |
| D9 | schedule-search filters | search + select facets: teacher, category/course, day, time-window, availability status (all grounded in legacy `search-available-teacher`). Toggles → select facets (reuse proven select pattern). |
| D10 | schedule-search results | authored candidate rows (teacher name, subject/category, day, start–end, availability chip) via `facetAttrs({search,teacher,category,day,slot,availability})`. Display-only. |
| D11 | empty state + drawer | shared `noResults()` + initial "enter criteria" hint; optional read-only slot detail via `previewTemplate`. |
| D12 | Book/Assign gate | one `data-disabled-reason` (`backendRequired`) final per result (or page-level) — clickable aria-disabled, reason-only. |
| D13 | no-engine proof | filtering = client-side `data-filter`/facet over authored rows (same as leads/students); 0 network; no availability computation; no row mutation on gate. |
| D14 | studentResult deep-link | `route:'student.html#view=results'`; the tabs widget honors `#view=` on load (enhance.js:265). |
| D15 | studentResult boundaries | existing `resultSummary` tab unchanged (authored per-course bars + certs + level/term); no new surface. |
| D16 | studentResult no-compute proof | `result-summary.js` byte-identical; figures are authored literals; no new score/rank/%/chart token. |
| D17 | studentEvaluation deep-link | `route:'student.html#view=evaluation'`; same hash mechanism. |
| D18 | studentEvaluation boundaries | existing `evaluationRubric` tab unchanged (categorical ratings + narratives); Approve stays `backendRequired`. |
| D19 | studentEvaluation no-compute proof | `evaluation-rubric.js` byte-identical; no total/number introduced. |
| D20 | fixture structure | new `fixtures/schedule-search.js` (authored candidate rows + KPI literals + facet vocab). No PII/pay/computed. Existing families/students fixtures untouched. |
| D21 | locale strategy | new mirrored pair `ar/en.ssr.js` (schedule-search, `ssr.*`) registered in i18n.js (+2 imports/+2 deepMerge → 13 pairs). No new keys for fold/deep-links (nav keys exist). 0 divergence, 0 raw keys. |
| D22 | CSS strategy | additive only; reuse card/filterbar/sheet/chip/wiz-grid/badge; a small `.ss-*` results class if needed; theme-aware; no motion outside the reduced-motion block. |
| D23 | nav.config.js changes | 4 status flips + routes; drop `FUTURE_ROUTES.studentResult` + `.studentEvaluation`; familyCategories/scheduleSearch not in FUTURE_ROUTES (no removal there). Build guard satisfied (each implemented item gains a route). |
| D24 | build-html.mjs changes | +1 import `renderScheduleSearch`; +1 PAGES entry `{ base:'schedule-search', activeId:'scheduleSearch', titleKey:'ssr.title', crumbKey:'nav.scheduleSearch', render:renderScheduleSearch }`. No entry for studentResult/studentEvaluation (deep-links, not pages). |
| D25 | smoke strategy | additive Families/Students block: route-freeze 115; 4 nav flips (no «قريبًا»); admin-menu 50; schedule-search structural/gate/no-external-request/no-pay; student #view= deep-link asserts; no-computed-score/no-canvas; FAKE/file/password guards. **Hash-route link-integrity**: the nav link check must strip `#…` and resolve the file (student.html exists) so `student.html#view=results` is not a dead link. Protected regexes byte-verbatim. |
| D26 | a11y strategy | schedule-search AR/EN light/dark + mobile-390 + open-drawer rows → critical=0 serious=0. student deep-link tabs covered by existing student.html rows. |
| D27 | screenshot strategy | schedule-search (form/results/empty) + families fold proof + student #view=results/#view=evaluation; AR/EN, dark, mobile-390; 0 console errors. |
| D28 | role-law carryover | teacher pay-free, family zero-pay, student child-view, finance invariant green; protected asserts byte-verbatim; schedule-search carries no pay token. |
| D29 | impact protection | only the shared admin sidebar re-renders (4 buttons→anchors); families.html/family.html/students.html/student.html **bodies** byte-identical; all portals ×16 + index byte-identical; package.json 0-diff. |
| D30 | allowed/forbidden files | see `contracts/scope-guard.md`. |
| D31 | risks + stop conditions | see below + `contracts/scope-guard.md`. |

---

## Phases (for `/speckit.tasks`, NOT executed here)
- **Phase A — Foundation**: `fixtures/schedule-search.js` + `ar/en.ssr.js` + i18n registration.
- **Phase B — schedule-search page**: `pages/schedule-search.js` (mirror leads.js) + `build-html.mjs` entry + optional `.ss-*` CSS.
- **Phase C — nav flips**: `nav.config.js` 4 flips + FUTURE_ROUTES trim.
- **Phase D — deep-links**: verify `student.html#view=results` / `#view=evaluation` open the right tab (no code change to student.js expected — nav route only).
- **Phase E — tests**: smoke block + a11y rows + screenshots (additive).
- **Phase F — docs**: REVIEW.md, README.md, CLAUDE.md, implementation-status.md.
- **Phase G — verify**: build 115, smoke PASS, a11y 0/0, screenshots 0 errors, impact-protection diffs.

## Risks & stop conditions
- **Hash-route link integrity** (primary): the Spec-010 nav link-integrity smoke (deadHash/badTarget) must accept `student.html#view=results`/`#view=evaluation` (target file exists; hash is a valid in-page tab id). Plan: strip the fragment to resolve the file; optionally assert the tab id exists in student.html. *Stop if this cannot be made honest without weakening a protected assert.*
- **Active-pill** on student.html/schedule-search.html: studentResult/studentEvaluation have no PAGES entry (deep-links) → no false aria-current. schedule-search gets `activeId:'scheduleSearch'`. Low risk.
- **schedule-search must stay a shell**: client-side facet only; no availability engine. *Stop if a real matching engine is required.*
- **No aggregate results/evaluation board**: legacy had none and zero computed figures. *Stop if studentResult/studentEvaluation are pushed to require computed score/rank/total.*
- **familyCategories** must become a real anchor to an existing surface. *Stop if it cannot (it can — surface exists).*
- **Any** fake success / row-status mutation / backend / `type=file` / `package.json` change / weakened role-law assert → **STOP and report**.

## Confirmations
- No tasks generated. No implementation started. No commit / no push. Only prior app-source touch = `feature.json` → 035.
