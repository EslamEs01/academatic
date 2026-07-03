# Data Model — Spec 016 (documentation shapes only)

No DB, no API, no auth, no fixtures — this spec models its own documents so 017–027 can consume them mechanically.

## 1. AuditFinding (`frontend-audit-001-015.md` + `missing-pages-and-gaps-register.md`)
`{ id: G1..G20, surface, evidence, classification: one-of(must-fix-before-continuing | move-to-spec-017..027 | backendRequired | intentionally-excluded | already-covered | duplicate-merged), destination, reason }` — **integrity**: exactly one classification per row; totals line sums to row count; `must-fix` count = 0.

## 2. RoleDashboardApp (`role-dashboard-ia.md` + `role-dashboard-page-inventory.md`)
`{ role: student|family|teacher, accent: sky|primary|teal, home: kept-filename, navItems[7..9], internalPages[]: { file, sections[], sources[], gates[], covers[] } }` — **integrity**: home filenames unchanged; every nav item maps to home or an internal page; every legacy row of that role resolves to a page/gate/exclusion; teacher app carries zero pay anything.

## 3. AdminSidebarItem (`admin-sidebar-page-inventory.md`)
`{ arLabel(+variants), legacyRoutes[], currentNavStatus: implemented|planned|disabled|future-role|crawl-only, classification: one-of(already-built | built-but-needs-redesign | missing-page | locked-needs-honest-page | coming-soon-needs-frontend-page | backendRequired-shell | dedicated-page-needed | can-be-merged | intentionally-excluded | future-spec/already-covered), endState: REAL|LOCK|GATE, owningSpec }` — **integrity**: 57 rows; zero unclassified; ownership sums reconcile (43 future + 13 built + 1 covered).

## 4. CoverageRow (`legacy-to-new-coverage-matrix.md`)
`{ role, routeTemplate, arItem, function, formsModals, currentDestination, plannedDestination, status: sanctioned-21-value set, spec, treatment: CARDS|AGENDA|DRAWER|TILES|LINES|GATE|LOCK|STAT }` — **integrity**: 178 templates all statused; variants folded into templates; extends (never edits) the Spec-012 artifact §§1–9; `needs-decision` = 0.

## 5. FrozenPattern (`role-dashboard-design-freeze.md`)
`{ category, pattern, definition, source: frozen-as-exists(ref)|frozen-new(owning spec), forbiddenVariants[] }` — **integrity**: every category from the user's freeze list present; every frozen-new pattern has an owning spec; the forbidden register is closed (additions require amendment).

## 6. FutureSpec (`future-spec-sequence.md`)
`{ number: 017..027, name, scope, pages[], dependsOn, acceptanceFloor, splitValve?: bool }` — **integrity**: no overlap (each sidebar row/coverage destination appears in exactly one spec); no gap (union of 017–026 destinations + already-built = the full inventory); 027 rules machine-checkable; splitting allowed at a spec's own plan time, reordering forbidden.

## Cross-artifact validation rules
- Register ↔ matrix ↔ sidebar inventory agree on every destination spec (one truth, three views).
- Vocabulary closure: statuses/classifications/treatments used anywhere are members of their sanctioned sets — no ad-hoc values.
- The three role homes appear as `overview-home` in the matrix, kept-filenames in the IA, and untouched files in the no-app-source contract.
- Nothing in any artifact contradicts a standing 001–015 contract (spot-check list in quickstart).
