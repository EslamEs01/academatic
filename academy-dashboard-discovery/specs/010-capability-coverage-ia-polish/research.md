# Research: Full Academy Capability Coverage, Navigation IA & Admin Experience Polish (Spec 010)

**Input**: spec.md · Specs 001–009 (all read; all implemented, tasks 100%) · `nav.config.js` · `build-html.mjs` · `sidebar.js` · `ui.js` (chip) · `app.css` · `sessions.js` fixture · `family.js` billingPanel · `tests/smoke/run.cjs` (Spec 009 body-scoped block) · Spec 009 `contracts/scope-guard.md` (G8/G8a/G8b) · legacy inventories (`output/combined/*`, `frontend-planning-deep/*`).

Every decision below was verified against the actual files this session — not memory.

---

## D1 — Finance sub-section vs a seventh rail category

**Decision**: Group finance inside the existing **reports** category as a labeled sub-section (`sections: [{ titleKey: 'cat.finance', items: [finance, invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks] }]`), exactly like the existing `teachers → cat.teachersPerf` sub-section. The rail stays six categories.

**Rationale**: The approved visual direction (sidebar-reference.png, Spec 001/002) is a six-category rail; `catItems()` and `categoryOf()` already traverse `sections` (verified in `nav.config.js` lines 108–116), so active-state detection for `finance` keeps working with **zero new nav mechanics**. The reports panel currently renders 10 finance+report items as one undifferentiated list — the sub-section restores scannability without changing rail geometry.

**Alternatives considered**: (a) Seventh rail category «المالية» — rejected: changes approved rail geometry, ripples the rail on all 40 pages, contradicts spec edge-case rule. (b) Move finance items to the admin category — rejected: admin is a planned-items parking lot; finance belongs with reporting per the current IA story and the Spec 009 precedent of registering `finance` in the reports category.

## D2 — Families category relabel

**Decision**: `cat.families`: AR **«العائلات والطلاب»**, EN **"Families & Students"**.

**Rationale**: The category contains families, add-family, students, courses, groups (plus 4 planned items) — the admin's enrollment workflow (family → student → course → group). "العائلات" alone undersells 3 of its 5 implemented destinations. The chosen label is short (fits the panel title and rail tooltip), Arabic-first, and honest without enumerating everything.

**Alternatives considered**: «شؤون الطلاب» (drops families — the hero entity of Spec 004); «الأكاديمية» (collides conceptually with the whole product); moving courses/groups out to a new category (rail-geometry change — rejected per D1 reasoning). Wording may be refined at implementation only within the same meaning (label change, not IA change).

## D3 — Banks: move, not duplicate

**Decision**: **Move** the `banks` item from the admin category into the D1 finance sub-section (last position). Same id, icon (`wallet`), label keys, `status:'disabled'`, `reasonKey:'nav.reason.finance'`. The admin category keeps its five planned items (staff, materials, books, certificates, certificateRequests).

**Rationale**: Banks is a finance capability (legacy `/management/banks`, Spec 009 planned-card `banks`); stranding it in admin was a Spec 002-era placement that predates the finance story. A move keeps the Spec 009 sidebar invariants intact (still exactly 7 locked finance items sitewide, still one finance link); duplication would break the "six wallet items + banks" lock-count assertions and the 1:1 locks↔planned-cards story.

## D4 — Overlapping planned items (studentResult, studentEvaluation, familyCategories)

**Decision**: **Keep all three as planned** nav items, unchanged. The coverage matrix documents each overlap explicitly: what already exists today (student profile Results/Evaluation tabs — Spec 004; families category filter facet — Spec 004 D6) and what the future academy-wide page would add (cross-student result browsing; evaluation-category administration incl. legacy feedback-categories; family segment CRUD).

**Rationale**: Removing them would orphan real legacy capabilities (`/management/categories/families`, student-result browsing, evaluation categories) from the nav's forward register; renaming/annotating «قريبًا» buttons would invent a new nav affordance (against "no new nav mechanics"). Documentation resolves the ambiguity the audit flagged without UI churn.

## D5 — Stale FUTURE_ROUTES entries

**Decision**: Remove the four stale entries for already-implemented items: `attendance`, `groups`, `teacherKpi`, `finance`. Keep the rest (sessionsAnalysis, messages, leads, tasks, announcements, studentResult, studentEvaluation, teacherCategories, materials, books, certificates, staff, dataAnalysis, monthlyReports) — each verified to map to an existing planned item. Planned items with intentionally no reserved route (timeConverter, publicHoliday, scheduledActions, familyCategories, scheduleSearch, addTeacher, sessionsKpi, monthlyPerf, certificateRequests, settings sub-items) stay route-less, recorded as intentional in the coverage matrix.

**Rationale**: `FUTURE_ROUTES` documents "intended routes when a planned item is promoted"; an entry whose item is implemented is dead documentation that misleads the next spec author. Removal has zero runtime effect (verified: nothing reads FUTURE_ROUTES at render; it is a documentation register + promotion reference).

## D6 — Sessions badge: derive, not remove

**Decision**: Replace the hard-coded `badge: 24` in `nav.config.js` with a build-time derivation from the authored fixture: import `SESSIONS` from `fixtures/sessions.js` and use `badge: SESSIONS.total`.

**Rationale**: Investigation shows `24` is not false — it equals the authored `SESSIONS.total: 24` (and `SESSIONS_FULL.total: 24`), which the sessions page itself displays. The defect is a duplicated literal (two sources of truth). Deriving from the fixture is a sanctioned row-count-style read of an authored value (OUTCOME_SUMMARY precedent), keeps the approved-design badge visual, and makes drift impossible. Import direction fixture→nav.config is cycle-free (fixtures import nothing from nav).

**Alternatives considered**: removal (loses an approved-design affordance for no honesty gain — the number is authored and verifiable); leaving as-is (fails FR-010's "no unexplained hard-coded number").

## D7 — Shared `[hidden]` filter-visibility fix

**Decision**: Add one late-position rule to `app.css`: **`[data-row][hidden] { display: none !important; }`** — scoped to the exact closed-hook attribute (`data-row`) that the runtime filter mechanism sets `hidden` on. Keep the existing narrow rules (`.fin-row[hidden]`, `.tt-block[hidden]`, `.tabpanel[hidden]`, `.cat-panel[hidden]`, `.wiz-step[hidden]`) untouched. Verify empirically per page (D-quickstart + smoke): every page with `[data-filter-form]`/`[data-filter-set]` gets a computed-visibility assertion (`getComputedStyle(row).display === 'none'` for excluded rows), extending the pattern Spec 009 introduced for finance.

**Rationale**: The confirmed defect class is "component display rule wins the specificity tie against `[hidden]`" (attendance verified broken: 10 attr-hidden / 15 visually shown; `.fin-row` needed a patch in Spec 009). `[data-row][hidden]` (0,2,0) + `!important` guarantees the semantic hidden state always wins, including against compound component selectors and any future component rule — this is the standard hidden-reset pattern, and scoping it to `[data-row]` keeps components with their own visibility semantics (tabs, panels, wizard steps, drawers) unaffected. A blind bare `[hidden]{display:none!important}` was rejected for exactly that blast-radius reason; per-page one-off rules were rejected because they recreate the defect class for every future page (the bug already recurred once).

## D8 — Page-by-page audit artifact format

**Decision**: `page-coverage-audit.md` in the Spec 010 folder: one table row per page base (20 rows) × the ten dimensions (purpose · content richness · link integrity · action honesty · bilingual completeness · RTL/LTR · dark/mobile · legacy coverage · better-than-legacy · disposition), each cell pass/fix-now/future with a short note; followed by a consolidated **fix-now list** (each item becomes a PolishAction with target file + verification) and a **future log** (rows the coverage matrix absorbs). Seeded from this session's audit; finalized during implementation with fresh screenshots.

**Rationale**: One artifact, greppable, maps 1:1 to FR-014 and feeds tasks directly; mirrors the REVIEW.md verdict-table style the project already uses for screenshot acceptance.

## D9 — Coverage matrix format and grouping

**Decision**: `legacy-capability-coverage.md` in the Spec 010 folder, grouped by the **nine classifications** (implemented now · better name · moved · merged · planned · backendRequired · future-role · intentionally excluded · missing-accidentally-now-logged). Each row: capability · legacy route(s) · what it did (1 line) · destination in the new system (page/nav id/planned card/future spec) · rationale (1 line). Query-param page "variants" collapse to their parent capability (the legacy 339 pages → 178 templates → 19 modules reduction). Ends with the product-owner **sign-off checklist** (FR-005). Explicit rows required for the fifteen named capabilities in the user brief (forms builder, family feedback-meetings, request-schedule workflow, class feedback, Zoom surfaces, notification matrix, CSV import/backup, RBAC matrix, WhatsApp/Email config, certificate designer, currency-rates, teacher-portal pages, family/student-portal pages, broken routes, thin/duplicate features).

**Rationale**: Classification-first grouping answers the product question ("what happened to X?") faster than module-first; the spec's Coverage Classification seed section maps onto it directly; markdown table format keeps it reviewable in a PR and greppable by the scope guard.

## D10 — Amending older scope guards without weakening them

**Decision**: Amend **in place, additively, with attribution**. Spec 009 `contracts/scope-guard.md` G8a exclusion list gains exactly two tokens for the sanctioned family→finance shortcut — `fam\.bill\.viewInvoices` (the new label key used in `pages/family.js`) and the `finance(\.en)?\.html` href it points to — each annotated “(Spec 010 sanctioned touch-point: family→finance shortcut)”. G8b question 5 ("did any guarded file change?") gains one sentence: "except `pages/family.js`, changed once by Spec 010's documented shortcut". No regex pattern is widened, no file is removed from any guarded set, no guard command is deleted. Spec 010's own scope-guard re-runs **all** prior G8a audits as its acceptance floor.

**Rationale**: This is the same amendment discipline Spec 009 itself used (its guard was amended twice during implementation with documented exact-token exclusions); exact-token exclusions keep the guard's detection power for everything except the one sanctioned line.

## D11 — Screenshot matrix

**Decision**: 13 frames: (1–6) all six rail categories expanded, AR light, desktop — the finance sub-section frame is the reports-category one; (7) sidebar AR dark (reports category — shows the finance group in dark); (8) sidebar EN light (reports category); (9) mobile sidebar drawer AR; (10) family profile Plan & Billing tab AR light (shows the new finance link + existing disabled manage); (11) attendance AR light **with a status tile filter applied** (filter-narrowing proof); (12) dashboard AR light (body-unchanged proof); (13) finance AR light (post-nav-polish, body unchanged). Reports body-unchanged is covered by frame (2)'s panel + the existing Spec 008 frames; a course/group page and families page ride along in the existing capture matrix (already covered by Spec 006/004 frames — re-captured, not re-designed).

**Rationale**: Covers every FR-022 requirement with minimal new frames by reusing the existing capture MATRIX infrastructure; the two proof frames (10, 11) are the only interaction-state additions.

## D12 — MVP sequencing

**Decision**: Follow the brief's order: (1) baseline + guard snapshot (all prior audits green pre-change) → (2) coverage matrix artifact → (3) nav IA corrections (D1–D3) → (4) FUTURE_ROUTES cleanup + badge truthfulness (D5–D6) → (5) shared `[hidden]` fix (D7) → (6) per-page computed-visibility checks → (7) family→finance shortcut + guard amendment (D10) → (8) chip-tone build guard → (9) page audit artifact + fix-now polish (D8) → (10) link crawler + planned/disabled truthfulness sweep → (11) dashboard/reports/finance invariant re-checks → (12) screenshots + review → (13) docs (README/REVIEW/CLAUDE).

**Rationale**: Documentation-first (matrix) de-risks the audit before any code moves; nav changes land as one coherent sidebar diff before test extensions assert the new shape; the CSS fix precedes its verification harness; guards re-run last against the final tree. **MVP = steps 1–4** (matrix + truthful IA): independently shippable and reviewable even if polish pauses.

---

## Additional verified facts the plan relies on

- `catItems()`/`categoryOf()` already flatten `sections` — the finance sub-section needs no helper change (nav.config.js:108–116).
- The build-time nav guard (implemented→route, non-implemented→no route, disabled→reasonKey) covers moved/regrouped items automatically (nav.config.js:135–141).
- The smoke body-scoped block runs only for `page === 'dashboard' || page === 'reports'` (run.cjs:727) — the family body link does not trip it; Spec 010 adds its own family-page assertion (exactly one body finance link there).
- The chip styled tone set in `app.css` is `live/upcoming/completed/cancelled/amber/neutral` (`.chip.tone-*`, app.css:104ff); `chip()` interpolates any tone string unvalidated (`ui.js:38–40`) — the guard closes this at build time by scanning rendered page HTML for `chip tone-X` against the styled set (medallion tones are a separate, richer palette and stay out of the chip guard's scope).
- `sidebar.js:37` renders `it.badge` verbatim — the D6 change is config-side only.
- The dev gallery page (`activeId:null`) and `index.html` redirect are intentional non-nav surfaces; the coverage matrix records both.
