# Research — Spec 035 (Decisions D1–D31)

Format per decision: **Decision · Rationale · Alternatives considered.** Evidence is first-hand (see `plan.md` grounding note + `visual-grounding.md` + `legacy-families-students-coverage.md`).

## Count & scope

**D1 — Baseline count 113.** Verified `find public -name '*.html' | wc -l` = 113 at HEAD `1eb4d9a` (clean tree). *Alt:* trust the report — rejected; verified live.

**D2 — Target 115 (+2).** Only `schedule-search` adds files (× 2 langs). *Alt:* +6 (all standalone) — rejected: results/evaluation standalone pages have no honest content; +0 (fold schedule-search into a tab) — rejected: schedule-search is a distinct tool (see D8).

**D3 — One new base: `schedule-search`.** Legacy has a real distinct availability finder; the other three reuse existing surfaces. *Alt:* two/three new bases — unjustified by evidence.

**D4 — Exactly 4 nav resolutions.** The four planned families items (nav.config.js:44,46,47,48). *Alt:* touch adjacent items — out of scope.

## familyCategories

**D5 — Fold owner = `families.html`.** The category surface already lives there (filter + reclassify drawer). *Rationale:* Spec 033 CS-06/page-vs-deeplink "Folded owner (anchor)"; a standalone page needs forbidden category-CRUD persistence. *Alt:* standalone categories page — rejected (would fake create/assign). *Alt:* fold to family.html — rejected (families.html is the list/browse owner; family.html is a single detail).

**D6 — Reachability.** families.js:32 category filter + family.js:68 trigger → family.js:149-165 `fam-cat` drawer (also baked on families per families.js:39). No body edit; nav route only. *Alt:* add a new "Manage categories" button — unnecessary; surface already reachable.

**D7 — Gate.** `fam-cat` "Save category" stays `data-disabled-reason`=`fam.cat.reclassReason` (byte-identical). *Alt:* add a create-category form now — deferred to future-backend (would imply persistence).

## scheduleSearch

**D8 — Standalone page, layout mirrors `leads.js`.** *Rationale:* legacy "Search Schedule" (`/management/search-schedule`) is a distinct availability finder ("Search for an available & specific time among the teacher's timetable"), separate from the "Teachers Schedule" browse; `schedule.html` already fills the browse role. leads.js is the proven Control-page shape (header+summary+filterBar+facet rows+drawers+gates+empty). *Alt:* fold as `schedule.html#view=search` (count 0) — rejected: conflates two distinct legacy tools and would bloat the browse page.

**D9 — Filters.** Grounded in the legacy form: teacher, category/course, day, time-window (from/to), availability status, free-text search. Availability & courses toggles are modeled as **select facets** (all/available/partially/booked; all/with-courses) to reuse the proven `filterBar` select mechanism. *Alt:* checkbox facets — filterBar currently renders selects; adding checkbox facet support = new hook territory, avoided.

**D10 — Results board.** Authored candidate rows: teacher nameKey, subject/category, day, start–end, availability chip (icon+label). `facetAttrs({search,teacher,category,day,slot,availability})`. Display-only; no pay. *Alt:* a calendar grid — heavier, no honesty gain; a list matches "available teachers/slots" results.

**D11 — Empty state + optional drawer.** Reuse `noResults()` + an initial hint; optional read-only slot detail `previewTemplate`. *Alt:* no empty state — rejected (search with no matches must be honest).

**D12 — Book/Assign gate.** `data-disabled-reason` (`backendRequired`) clickable-aria-disabled final. *Alt:* a confirm dialog that toasts success — rejected (fake success).

**D13 — No-engine proof.** Filtering is client-side `data-filter`/facet narrowing of authored rows (identical to leads/students); no network, no availability computation, no mutation after the gate. *Alt:* compute overlap of time windows — rejected as an engine; availability is an authored label.

## studentResult / studentEvaluation

**D14 — studentResult deep-link `student.html#view=results`.** The tab exists and `#view=` wins on load (tabs.js:4, enhance.js:265). *Alt:* standalone `student-results.html` — rejected (no honest content; would invent aggregates).

**D15 — Boundaries.** Existing `resultSummary` tab unchanged: authored per-course progress bars + certificates + level/term. No new surface. *Alt:* add an admin all-students results board — rejected (aggregate → computed figures).

**D16 — No-compute proof.** `result-summary.js` stays byte-identical ("NO gradebook … NO computed score"); numbers are authored literals; smoke greps confirm no new score/rank/%/chart. *Alt:* n/a.

**D17 — studentEvaluation deep-link `student.html#view=evaluation`.** Same mechanism; Spec 029 US3 already added a real deep-link to this tab. *Alt:* standalone `student-evaluation.html` — rejected (invented rubric totals).

**D18 — Boundaries.** Existing `evaluationRubric` tab unchanged: categorical rating pills + achievements/objectives narratives; Approve = `common.backendRequiredNote`. *Alt:* editable rubric — rejected (workflow/persistence).

**D19 — No-compute proof.** `evaluation-rubric.js` byte-identical; ratings categorical, never summed/averaged. *Alt:* n/a.

## Mechanics

**D20 — Fixtures.** New `fixtures/schedule-search.js`: `SS_KPIS` (authored literals), `SS_CANDIDATES` (rows), facet vocabularies (`SS_TEACHERS`, `SS_CATEGORIES`, `SS_DAYS`, `SS_SLOTS`, `SS_AVAILABILITY`). Authored, no PII/pay/computed. Existing `families.js`/`students.js` fixtures untouched. *Alt:* reuse `schedule.js` fixture — its shape is timetable blocks, not search candidates; a focused fixture is cleaner and keeps schedule.js byte-identical.

**D21 — Locale.** New mirrored pair `ar/en.ssr.js` (`ssr.*`), registered in `i18n.js` (+2 imports, +2 deepMerge → 13 pairs), mirroring the Spec-034 `ctrl` pair. familyCategories/studentResult/studentEvaluation need **no** new keys (nav labels + surfaces exist). 0 divergence, 0 raw keys. *Alt:* fold ssr keys into `ar.crs.js` — a dedicated module matches the one-module-per-spec precedent and isolates the diff.

**D22 — CSS.** Additive only; reuse `card`/`filterbar`/`sheet-*`/`chip`/`wiz-grid`/`badge`. Add `.ss-*` only if the results grid needs it; theme-aware; any motion inside the existing `prefers-reduced-motion: no-preference` block. *Alt:* new component CSS framework — forbidden.

**D23 — nav.config.js.** Flip the 4 items `planned→implemented` + `route`; drop `FUTURE_ROUTES.studentResult`/`.studentEvaluation`. The build guard (lines 150-156) is satisfied (each implemented item has a route; hash routes are valid hrefs). *Alt:* keep FUTURE_ROUTES entries — stale/misleading once implemented.

**D24 — build-html.mjs.** +1 import + 1 PAGES entry for `schedule-search`. No entries for the deep-links (not pages). *Alt:* register student-results/-evaluation pages — contradicts the deep-link decision.

**D25 — Smoke.** Additive Families/Students block (see `contracts/smoke-coverage-contract.md`). Key nuance: **hash-route link integrity** — resolve `student.html#view=results` by stripping the fragment to the existing file (optionally assert the tab id). Protected regexes byte-verbatim. *Alt:* rewrite protected asserts — forbidden; additions must be additive.

**D26 — A11y.** schedule-search AR/EN light/dark + mobile-390 + open-drawer; student tabs covered by existing rows. *Alt:* skip mobile — rejected (mobile-390 is standing).

**D27 — Screenshots.** schedule-search (form/results/empty) + families fold + student #view=results/#view=evaluation; AR/EN dark mobile. *Alt:* fewer frames — rejected (visual acceptance is the project's acceptance method).

**D28 — Role-law carryover.** All role laws + no-fake laws green; protected asserts byte-verbatim (see `contracts/role-law-carryover-contract.md`).

**D29 — Impact protection.** Only shared sidebar re-renders; four family/student page bodies + all portals + index byte-identical; package.json 0-diff (see `contracts/impact-protection-contract.md`).

**D30 — Allowed/forbidden files.** See `contracts/scope-guard.md`.

**D31 — Risks/stop conditions.** See `plan.md` §Risks + `contracts/scope-guard.md`.
