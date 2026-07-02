# Feature Specification: Full Academy Capability Coverage, Navigation IA & Admin Experience Polish

**Feature Branch**: `feature/001-approved-dashboard-design` (project precedent: all specs live on the single working branch)
**Spec Directory**: `academy-dashboard-discovery/specs/010-capability-coverage-ia-polish`
**Created**: 2026-07-02
**Status**: Draft
**Input**: User description: "Full Academy Capability Coverage, Navigation IA and Admin Experience Polish — a comprehensive review, coverage, navigation, and polish spec for the academy admin frontend built so far. NOT a pixel clone of the legacy academy system. Confirm every useful legacy capability is covered or intentionally classified; make navigation/sidebar/topbar cleaner and more premium than legacy; ensure pages are purposeful, connected, honest; produce a legacy capability coverage matrix; define an IA correction plan; the final admin-console coverage and IA polish pass before future role dashboards or backend specs."

**Upstream dependency (satisfied)**: Specs 001–009 are all implemented — every spec's `tasks.md` is 100% checked, 20 page pairs (40 built HTML files) + `index.html` exist, and Spec 009's finance shell is live. The Spec 009 implementation was auto-committed by the environment watcher as `7a2ee50` after the implementation session ended (no manual commit was made).

---

## Grounding Summary *(what was actually inspected — not memory)*

- **Project state**: branch `feature/001-approved-dashboard-design`, HEAD `7a2ee50`, clean working tree; 41 built files in `public/` (20 AR pages + 20 EN pages + `index.html` redirect); `.specify/feature.json` repointed to this spec.
- **Specs 001–009**: all nine folders read (spec/plan/tasks/contracts). All task lists 100% complete. Full spec-to-page coverage map, nav-item history, deferred-promise register, and known-issue register produced (see Coverage Classification below and `plan.md` phase artifacts to come).
- **Current app**: `nav.config.js` (6 rail categories, 41 items: 14 implemented / 20 planned / 7 disabled-finance / 3 future-role registers), `build-html.mjs` (20 page entries, all with title+crumb keys), all 20 page modules, 55 components, 16 fixtures, i18n 8-layer overlay chain, smoke/a11y/screenshot harnesses, `screenshots/REVIEW.md` known-issues register.
- **Legacy reference**: `output/combined/*` inventories (339 pages → 178 route templates → 19 modules, 66 modals), `output/roles/`, `frontend-planning/`, `frontend-planning-deep/` (expanded inventory, spec-coverage map, no-missing-items audit, open decisions). Legacy used strictly as a capability checklist — no visuals, classes, palette, wording, or numeric status codes are copied.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete, organized, truthful sidebar (Priority: P1)

As an academy admin, when I open the sidebar I see a clean two-level category rail where every item is correctly grouped, correctly labeled in Arabic and English, correctly marked as working / coming-soon / backend-locked, and where nothing is misplaced, duplicated, stale, or misleading — noticeably better organized than the legacy system's flat ~10-entry scattered sidebar.

**Why this priority**: The sidebar is the admin's map of the whole system; the audit found concrete IA defects (a finance item stranded in the Admin category, a 10-item overloaded Reports category, a stale future-routes register, a hard-coded numeric badge) that undermine the "premium and trustworthy" goal on every single page.

**Independent Test**: Open any built page in Arabic and English; walk all six rail categories; verify every correction in the Navigation IA Correction Plan (below) is applied, every implemented item routes to a real page, every planned item shows «قريبًا», every locked item shows its honest reason, and no item is duplicated or stranded.

**Acceptance Scenarios**:

1. **Given** the expanded sidebar on any page, **When** the Reports category is opened, **Then** finance-related entries appear as one visually grouped finance sub-section (matching the existing Teachers→Performance sub-section pattern), with the implemented Finance shell first and the six backend-locked billing items under it, each still showing the truthful backend-required reason.
2. **Given** the Admin category, **When** its panel is opened, **Then** the Banks item is no longer stranded there — it lives with the other backend-locked finance items in the finance sub-section, and the Admin category contains only genuinely administrative planned items.
3. **Given** the Families category, **When** its panel is opened, **Then** its Arabic and English category labels honestly describe its actual contents (families, students, courses, groups — the enrollment workflow), not just "Families".
4. **Given** the sessions nav item, **When** any page renders, **Then** its badge (if kept) reflects a fixture-authored count that matches visible fixture data, not an unexplained hard-coded number.
5. **Given** the internal future-routes register, **When** audited, **Then** it contains no entry for an already-implemented item (attendance, groups, teacher performance, finance are removed) and every reserved route matches its planned item.
6. **Given** the sidebar in Arabic RTL and English LTR, light and dark, **When** compared with the legacy sidebar screenshots, **Then** it is demonstrably better grouped (6 purposeful categories vs one flat list) with zero copied legacy visuals, labels, or status codes.

---

### User Story 2 - Every capability covered or honestly classified (Priority: P1)

As the product owner, I can open one human-readable coverage matrix document that lists every relevant legacy capability (all 19 legacy modules, including the easily-forgotten utility surfaces: chat, new requests, tasks, announcements, time converter, public holidays, scheduled actions, session analysis, class feedback, forms builder, certificates, materials/library, staff/permissions, settings sub-pages, scheduling utilities, Zoom surfaces) and see exactly how the new system treats it — implemented / renamed / moved / merged / planned / backend-required / future-role / intentionally excluded — with nothing accidentally forgotten.

**Why this priority**: This is the core deliverable of Spec 010 — the auditable proof that the rebuild covers the legacy system's useful capabilities. The audit found at least five legacy capabilities with **no classification anywhere today** (forms/assessment builder, family feedback-meetings, teacher request-schedule/response workflow, per-session class feedback, Zoom live-classroom surfaces); without this matrix they stay silently forgotten.

**Independent Test**: Read the generated coverage matrix; cross-check a sample of 10 legacy routes from the page inventory; every one must resolve to a classification row with a stated destination or reason.

**Acceptance Scenarios**:

1. **Given** the coverage matrix, **When** every legacy module from the combined page inventory is looked up, **Then** each has exactly one primary classification from the nine-way scheme, a destination (page / nav item / planned card / future spec), and a one-line rationale.
2. **Given** the five capabilities found unclassified by this spec's audit (forms builder, family feedback-meetings, request-schedule workflow, class feedback, Zoom surfaces), **When** the matrix is read, **Then** each now has an explicit classification and none is added as a fake working link or a new sidebar item that pretends to work.
3. **Given** the matrix rows classified "intentionally excluded", **When** reviewed, **Then** each states why (broken in legacy: the 500/504 routes; typo routes; thin/duplicate features; anti-patterns) — exclusion is documented, never silent.
4. **Given** the matrix rows classified "future role", **When** reviewed, **Then** all teacher-portal (26 legacy pages) and family/student-portal (13 legacy pages) capabilities appear there and none is rendered anywhere in the admin console.

---

### User Story 3 - Every implemented page reachable, every crumb correct (Priority: P1)

As an academy admin, I can reach every implemented page from the sidebar or from an obvious in-page link, the topbar title and breadcrumb are correct on every page, and the sidebar highlights the right item even on profile pages that aren't nav items themselves.

**Why this priority**: Reachability and orientation are the baseline of "I can find everything quickly"; the audit confirms this mostly already holds and Spec 010 must lock it in as verified, regression-guarded truth.

**Independent Test**: For each of the 20 built page bases, verify a navigation path exists from the sidebar (directly or via a documented in-page link), the topbar shows the right title/crumb in both languages, and exactly one nav item is active (zero only on the dev-only gallery).

**Acceptance Scenarios**:

1. **Given** any of the 14 implemented nav items, **When** clicked, **Then** it opens its real page with the correct active pill, title, and breadcrumb in both languages.
2. **Given** the profile pages (family, student, teacher, course, group), **When** opened via their list-page links, **Then** the sidebar highlights the owning list item and the breadcrumb names the profile correctly.
3. **Given** the dev-only component gallery page, **When** the coverage matrix is read, **Then** the gallery is documented as an intentional internal surface outside the product nav (not a forgotten page).

---

### User Story 4 - Better than legacy, documented (Priority: P2)

As the product owner, I can see documented proof of every place the new IA improves on the legacy system — renames (Trainers→Teachers, Curricula→Courses, Tickets→Tasks, the mislabeled "Courses List"→Materials), merges (student results/evaluation into the student profile tabs, family categories into the families filter, finance's ~10 scattered entries into one shell + honest locks), and moves — so the "improved, not cloned" claim is auditable.

**Why this priority**: The rename/move/merge story already exists implicitly across nine specs; Spec 010 makes it explicit and reviewable in one place, which also resolves the planned-item overlaps the audit flagged.

**Independent Test**: Read the renamed/moved/merged section of the coverage matrix; verify each row names the legacy label/route, the new label/destination, and why the new treatment is better.

**Acceptance Scenarios**:

1. **Given** the matrix, **When** the merge rows are read, **Then** the three known planned-item overlaps (student results / student evaluation vs the student profile tabs; family categories vs the families filter facet) are explicitly resolved: the planned nav items stay (they promise future academy-wide pages) and the matrix states what already exists today and what the future page would add.
2. **Given** the matrix, **When** rename rows are read, **Then** no legacy private wording or numeric status code appears as a new label anywhere in the app.

---

### User Story 5 - Polished pages with working filters (Priority: P2)

As an academy admin, when I filter any list page (attendance outcomes, sessions, students, teachers, courses, groups, families, finance invoices…), rows that don't match actually disappear from view — and every page's content sections, headers, and empty states feel deliberate and premium.

**Why this priority**: A confirmed open defect makes tile/select filters on at least the attendance page visually keep rows they claim to hide (verified: 10 rows attribute-hidden, 15 still visible); the same latent pattern is unaudited on ~9 other filterable pages. This is the single biggest "pages feel broken" risk in the whole app and was explicitly flagged for follow-up by Spec 009's review.

**Independent Test**: On every filterable page, apply a narrowing filter and count visually rendered rows (computed visibility, not just markup attributes) — visible count must equal the filter's claimed count. Spot-check headers/subtitles/empty states page by page.

**Acceptance Scenarios**:

1. **Given** the attendance page with a status tile filter applied, **When** rows are counted by what is actually visible on screen, **Then** the visible count equals the tile's claimed count (the current defect: attribute-hidden rows remaining visible — is gone).
2. **Given** every other page with filters or tiles-as-filters, **When** the same computed-visibility check runs, **Then** hidden rows are genuinely invisible on all of them — enforced by an automated check per filterable page, not a one-page patch.
3. **Given** any page with zero matching rows after filtering, **When** viewed, **Then** a calm labeled empty state appears (no blank void, no raw keys).
4. **Given** all existing pages, **When** reviewed page by page against the audit's classification (purpose, sections, links, honesty, bilingual completeness), **Then** any page-level wording/empty-state gaps found are fixed, and no page loses existing content or gains fake content.

---

### User Story 6 - Connected pages, no dead ends (Priority: P2)

As an academy admin, wherever a page mentions a related entity, I can click through to it — family ↔ student ↔ course ↔ group ↔ teacher ↔ attendance ↔ schedule ↔ reports ↔ finance — and the one known missing shortcut (from a family's Plan & Billing tab to the finance shell where that family's invoices live) now exists.

**Why this priority**: Cross-links already exist broadly (the audit verified rich out-links on every page); the remaining gap is small and finance-specific, and dead ends are a top trust-killer.

**Independent Test**: Crawl every `href` on all built pages: zero `href="#"`, zero links to non-existent files; from the family profile's billing tab, reach the finance shell in one click.

**Acceptance Scenarios**:

1. **Given** the family profile Plan & Billing tab, **When** viewed, **Then** it offers a real link to the finance shell (labeled honestly as the fixture preview) alongside the existing disabled-with-reason manage action — and the finance page's family filter makes finding that family's invoices obvious.
2. **Given** every built page, **When** all links are extracted, **Then** none is `href="#"` and every target file exists in the built output.
3. **Given** the reports and finance shells, **When** their source links are followed, **Then** each lands on the correct implemented page (no link to a locked nav item or a planned page).

---

### User Story 7 - Honest planned/backend-required story everywhere (Priority: P2)

As an academy admin, every not-yet-real feature is visibly and consistently marked — planned items say «قريبًا», backend-locked items say exactly why, planned/backend-required cards carry availability chips and no figures — and nothing not-yet-real looks clickable-working.

**Why this priority**: Honesty-by-construction is the project's standing constitution; Spec 010 must verify it holds after nine specs and extend it to whatever the coverage matrix newly classifies.

**Independent Test**: Enumerate every planned/disabled nav item and every planned/backendRequired card across all pages; each must expose a visible label + reason (where disabled) and mutate nothing when clicked.

**Acceptance Scenarios**:

1. **Given** all 20+ planned nav items and 7 backend-locked items, **When** each is activated, **Then** no navigation occurs, no state changes, and the honest label/reason is exposed to sight and assistive tech.
2. **Given** the nine finance planned/backend-required cards and the reports planned cards, **When** inspected, **Then** each still carries its availability chip, zero numeric content on finance cards, and inline reason — unchanged by this spec's polish.

---

### User Story 8 - Coverage matrix signed off (Priority: P3)

As the product owner, I review the final coverage matrix and confirm in writing (a sign-off section inside the matrix document) that no useful legacy capability is missing without classification — the "final coverage pass" gate before role-dashboard or backend specs begin.

**Why this priority**: Turns the matrix from a document into a decision record; depends on US2 being done.

**Independent Test**: The matrix document ends with a review checklist (every module classified · every excluded row justified · every future-role row registered) that can be walked and checked.

**Acceptance Scenarios**:

1. **Given** the finished matrix, **When** its sign-off checklist is walked, **Then** every check passes and any newly-discovered gap during review is added to the matrix rather than left as a verbal note.

---

### User Story 9 - Still static, still honest, still Django-ready (Priority: P3)

As the engineering owner, after all Spec 010 changes the system still builds to complete static pages with no runtime page construction, no new libraries, no fake engines, works on GitHub Pages, and every changed surface still maps cleanly to future Django templates — and Specs 001–009's scope guards still pass.

**Why this priority**: Spec 010 touches the shared sidebar (every built page) and shared styles; the architecture contract must be re-proven, not assumed.

**Independent Test**: Full build + smoke + a11y + all prior scope-guard audits green; diff review confirms no new dependency, no new runtime DOM construction, no engine.

**Acceptance Scenarios**:

1. **Given** the full build after Spec 010, **When** prior specs' guards run (Spec 008 reports body finance-free; Spec 009 body-scoped dashboard/reports invariant, path-aware finance vocabulary audit), **Then** all stay green — with any newly sanctioned touch-point (e.g., the family→finance link) added to the path-aware exclusion lists *by documented amendment, never by weakening a guard*.
2. **Given** the built output, **When** loaded from a static file server with no backend, **Then** every page and interaction works exactly as before plus the polish changes.

---

### User Story 10 - Screenshot-proven, better-not-cloned (Priority: P3)

As the product owner, I can review a screenshot set proving the polished sidebar, headers, and key pages look premium in Arabic light/dark, English, and mobile — and visibly different from (and better organized than) the legacy screenshots.

**Why this priority**: Screenshot review is this project's binding acceptance mechanism (constitution + all prior specs); IA changes to the shared sidebar need visual proof on every category.

**Independent Test**: Capture the defined frame set; a human review records pass/fail per frame against the failure conditions in this spec.

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed, **Then** all six rail categories are shown expanded (AR light + dark), the finance sub-section grouping is visible, EN and mobile sidebar frames pass, and one frame proves the attendance filter now visually narrows rows.
2. **Given** a side-by-side with legacy sidebar captures, **When** compared, **Then** no visual element is copied (layout, palette, icons, wording) while every useful legacy destination is present or classified.

---

### Edge Cases

- **Sidebar ripple**: any nav change (finance sub-section, banks move, category label rename) rewrites the shared sidebar on **all 40 built pages**. The Spec 009 body-scoped invariant (exactly one finance link sitewide, six locked wallet items, dashboard/reports bodies finance-free) must still hold after regrouping — grouping must not duplicate or drop the finance link or any locked item.
- **Active-state after regrouping**: moving items into a sub-section must keep category-detection and active-pill logic correct (the existing Teachers→Performance sub-section proves the pattern; the finance page must still open its owning category with `finance` active).
- **Banks reason copy**: after moving `banks` next to the other finance locks, its reason must remain truthful and its icon/label unchanged (move ≠ rename).
- **Category rename vs approved design**: the six-category rail is part of the approved visual direction; Spec 010 may re-label a category but must not add a seventh rail category or restructure the rail geometry.
- **The revenue KPI on the dashboard**: it is part of the approved Spec 001 design and a sanctioned authored artifact (Spec 009's body-scoped smoke expects exactly its one currency token in the dashboard body). Spec 010 documents it in the matrix and **leaves it untouched** — no removal, no new finance links in the dashboard body, no reword — to avoid breaking the approved design and the Spec 009 invariant simultaneously.
- **Sessions badge**: if the authored badge stays, its number must be explainable by fixture data; if it cannot be, it is removed — either way the sidebar renders correctly with or without a badge.
- **Filter fix regression risk**: making attribute-hidden rows genuinely invisible app-wide could hide rows that some page intentionally shows via a more specific rule; the fix must be verified page-by-page (computed-visibility checks per filterable page), not blind-applied.
- **Planned items without reserved routes**: several planned items (time converter, public holidays, scheduled actions, family categories, schedule search, add teacher, sessions KPI, monthly performance, certificate requests, settings sub-items) intentionally have no reserved route yet; the audit must record this as intentional, and only add reserved routes where a future page is actually promised by the matrix.
- **Zero-data fixtures**: polish must not break the deliberately sparse teacher fixtures (calm empty states must survive).
- **New links introduce vocabulary**: the family→finance link puts finance vocabulary into a Spec 004 file; the Spec 009 path-aware guard must gain that file as a documented sanctioned touch-point (one line), not a loosened pattern.
- **English/Arabic drift**: every label change lands in both locale files in the same change; a missing side would surface as a raw `⟦key⟧` (already smoke-guarded).

## Requirements *(mandatory)*

### Functional Requirements

**Coverage matrix (the artifact)**

- **FR-001**: The feature MUST produce a human-readable legacy-capability coverage matrix document inside this spec's folder (`legacy-capability-coverage.md`) listing every legacy module and every distinct admin-relevant capability from the combined inventories (339 pages / 178 route templates / 19 modules / 66 modals, collapsed to capability level — query-param variants collapsed as one), each with exactly one primary classification from the nine-way scheme (implemented now / implemented under a better name / moved / merged / planned / backendRequired / future-role / intentionally excluded / missing-accidentally-now-logged), a destination, and a one-line rationale.
- **FR-002**: The matrix MUST explicitly classify the previously unclassified capabilities found by this spec's audit — forms/assessment builder, family feedback-meetings, teacher request-schedule/response workflow, per-session class feedback, Zoom/live-classroom surfaces, notification-settings matrix, CSV import/backup, RBAC permission matrix, WhatsApp/Email integration config, certificate designer, currency-rates maintenance — none may remain unlisted.
- **FR-003**: Every matrix row classified "intentionally excluded" MUST state the reason (legacy-broken 500/504 routes, typo routes, thin/empty features, duplicated routes, per-row action-pill anti-pattern, unconfirmed exam feature) — and excluded capabilities MUST NOT receive nav items, cards, or links.
- **FR-004**: All teacher-portal and family/student-portal capabilities MUST be classified future-role in the matrix, matching the existing future-role register, and MUST NOT render anywhere in the admin console.
- **FR-005**: The matrix MUST end with a product-owner sign-off checklist (every module classified · every exclusion justified · every future-role capability registered · zero silent gaps).

**Navigation IA corrections**

- **FR-006**: The Reports category MUST be reorganized so its finance entries form one labeled finance sub-section (using the existing category sub-section pattern): the implemented Finance shell first, then the six backend-locked billing items; the Reports items proper (reports, monthly reports, data analysis) remain above it. Rail geometry stays six categories.
- **FR-007**: The `banks` item MUST move from the Admin category into the finance sub-section, keeping its disabled state, icon, label, and truthful reason unchanged.
- **FR-008**: The Families category label (Arabic and English) MUST be updated to honestly cover its contents (families + students + courses + groups as the enrollment workflow) — default: «العائلات والطلاب» / "Families & Students" — with no item removed or added by the rename.
- **FR-009**: The internal future-routes register MUST be cleaned: entries for already-implemented items removed; every remaining reserved route MUST correspond to a planned item the coverage matrix confirms as genuinely promised; planned items the matrix leaves route-less are documented as such.
- **FR-010**: The sessions nav badge MUST become truthful: either derived at build time from authored fixture data (a count a reader can verify against the sessions page) or removed; no unexplained hard-coded number remains in the nav.
- **FR-011**: After all nav changes: every implemented item routes to an existing page, every planned item is a non-navigating «قريبًا» affordance, every disabled item exposes its reason, exactly one item is active per page (zero on the dev gallery), the existing build-time nav guard still passes, and the Spec 009 sidebar invariants (exactly one finance link; six locked billing items + banks still locked) still hold.

**Page & experience polish**

- **FR-012**: On every page with filters or tiles-as-filters, rows excluded by an active filter MUST be genuinely invisible (computed visibility, not merely attribute-hidden) — fixing the confirmed attendance defect and closing the same latent gap on every other filterable page via one consistent mechanism, verified per page by automated checks.
- **FR-013**: Every filterable page MUST show a calm labeled empty state when a filter yields zero rows (verified, and added where missing).
- **FR-014**: The page-by-page audit (all 20 pages × the ten review dimensions: purpose, content richness, link integrity, action honesty, bilingual completeness, RTL/LTR, dark/mobile safety, legacy coverage, better-than-legacy, follow-up needs) MUST be recorded as a review artifact, and every concrete gap it marks fix-now MUST be fixed within this spec; gaps marked future are logged in the matrix.
- **FR-015**: The family profile's Plan & Billing tab MUST gain one real link to the finance shell (honestly labeled as the fixture preview); no other page gains finance links; the dashboard and reports bodies remain finance-free per their standing contracts.
- **FR-016**: A build-time guard MUST verify every chip tone used anywhere resolves to a styled tone (closing the silent-unstyled-pill fragility class found in review); an unknown tone fails the build.
- **FR-017**: All demo/confirm/disabled action patterns MUST remain exactly as honest as today: no planned/backendRequired surface becomes a working link, no new dead `href="#"`, no fake action added anywhere.

**Truthfulness & architecture invariants**

- **FR-018**: All Spec 001–009 scope guards MUST pass after Spec 010's changes; where a sanctioned change adds vocabulary to a guarded file (e.g., the family→finance link), the guard's documented exclusion list is amended with that exact touch-point — guards are never weakened patternwise.
- **FR-019**: All changes MUST preserve the static HTML-first architecture: complete pre-rendered pages per language, runtime enhancement only via the existing closed hook set (no new hooks), no new libraries/CDN/TypeScript, relative asset paths, GitHub-Pages compatible, Django-template-ready mapping documented for every changed surface.
- **FR-020**: Every added or changed label MUST land in both Arabic and English in the same change, with Arabic-first quality (no machine-translated feel), and zero raw i18n keys anywhere in built output.
- **FR-021**: The dashboard body MUST NOT change (no new cards, chips, stat walls, or links) — Spec 010's dashboard impact is nav-shell-only; the reports body MUST stay an academic, finance-free shell; the finance body MUST keep all Spec 009 invariants (fixture-only, no money arithmetic, no receipt upload, no pay figures, chips never mutate).
- **FR-022**: Screenshot acceptance MUST cover: all six rail categories expanded (AR light), sidebar AR dark, sidebar EN light, mobile sidebar drawer, topbar/crumb on a representative page, dashboard, reports, finance (post-nav-polish, bodies unchanged), one people page (families), one operations page (attendance, with a frame proving the filter now visually narrows), one course/group page — each frame human-reviewed against this spec's failure conditions and recorded in the screenshots review document.

### Key Entities *(documentation/build-time shapes only — no DB, no API)*

- **LegacyCapability**: one legacy capability at module/feature granularity — name, legacy route(s), what it did, admin value (useful/weak/duplicated/broken), source inventory reference.
- **CapabilityClassification**: the nine-way primary classification + destination (page/nav item/card/future spec) + rationale; exactly one per capability.
- **CoverageMatrix**: the ordered collection of classified capabilities grouped by classification, with the sign-off checklist; rendered as the `legacy-capability-coverage.md` artifact.
- **NavigationAuditItem**: one nav item's audit row — id, category, label pair, status, route/reason, correction applied (none/moved/relabeled/regrouped/badge-fixed).
- **PageAuditItem**: one page's ten-dimension review row + fix-now vs future disposition.
- **PolishAction**: one concrete fix this spec performs — target surface, defect, change, verification hook.
- **ShortcutLink**: one cross-page link addition — source page/section, destination, honest label, guard amendment needed (if any).
- **SidebarSection**: a labeled sub-group inside a category (title key + member item ids) — the finance sub-section reuses this existing shape.
- **AcceptanceFrame**: one screenshot frame — page, language, theme, viewport, interaction state, pass/fail conditions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of legacy modules (19/19) and 100% of the enumerated admin-relevant capabilities appear in the coverage matrix with exactly one classification each; a random sample of 10 legacy routes from the page inventory all resolve to a matrix row.
- **SC-002**: Zero legacy capabilities remain unclassified: the five audit-found gaps (forms builder, family feedback-meetings, request-schedule workflow, class feedback, Zoom surfaces) each have an explicit matrix row; the product-owner sign-off checklist passes in full.
- **SC-003**: After IA corrections, an admin can locate any implemented capability from the sidebar in at most 2 interactions (category click + item click), and every one of the 20 built page bases is reachable from nav or a documented in-page link.
- **SC-004**: On every filterable page, applying any narrowing filter yields visible-row count == claimed count (computed visibility) — including the attendance page where this currently fails.
- **SC-005**: Zero dead links in built output: no `href="#"`, no link to a missing file, no link to a locked/planned destination — verified across all 40 built pages in both languages.
- **SC-006**: All prior guards stay green: build guard, Spec 008 reports-body guard, Spec 009 body-scoped invariants and path-aware vocabulary audits (with only documented touch-point amendments), smoke and accessibility suites (zero critical violations).
- **SC-007**: 100% of changed/added labels exist in both languages; zero raw i18n keys rendered anywhere.
- **SC-008**: The screenshot review records pass on every defined frame, including all six expanded categories and the attendance filter-narrowing proof frame, with zero failure conditions triggered.
- **SC-009**: Nav truthfulness holds exhaustively: every implemented item navigates, every planned item doesn't, every disabled item exposes a reason, the finance link count sitewide is exactly one, and the six billing locks + banks remain locked.
- **SC-010**: The dashboard body is byte-equivalent in content terms (no added/removed cards, chips, links) before vs after Spec 010; reports and finance bodies unchanged except where FR-014's fix-now list explicitly touches copy/empty states outside their guarded invariants.

## Scope

### In scope

1. The legacy-capability coverage matrix artifact + product-owner sign-off.
2. Navigation IA corrections: finance sub-section in Reports, banks relocation, Families category relabel, future-routes cleanup, sessions badge truthfulness.
3. The app-wide filter-visibility defect fix + per-page computed-visibility verification + empty-state completion.
4. Page-by-page ten-dimension audit artifact with fix-now items done (headers/subtitles/empty-state/copy-level polish only).
5. One new cross-page shortcut: family Plan & Billing → finance shell (with guard amendment).
6. Chip-tone build guard.
7. Bilingual label updates for everything changed.
8. Test-harness extension (nav assertions for the regrouped sidebar, per-page computed-visibility checks, link crawler) and screenshot acceptance set.
9. Documentation updates (README Django mapping for changed surfaces, screenshots REVIEW).

### Out of scope (unchanged honest boundaries)

- **No new pages** — zero new shells; the audit found no missing capability that is both safe and needed as a static page now (the time-converter and similar utilities stay planned; a static shell would add nav weight without admin value yet).
- No backend/API/DB/auth/permissions/CRUD/persistence; no real engines of any kind (chat, requests, tasks, notifications, scheduled actions, holidays, time-zone conversion, analytics, exports, imports, uploads, Zoom, finance/payroll/accounting).
- No role portals or role dashboards (teacher/family/student) — future-role classification only.
- No dashboard body changes, no reports-body finance, no finance-body changes beyond standing invariants.
- No new libraries/frameworks/TypeScript/CDN; no copied legacy visuals/classes/palette/wording/status codes; no seventh rail category; no removal of implemented work.
- No turning any planned/backendRequired item into a working link.

## Coverage Classification (grounding seed — to be formalized as the matrix artifact)

**Implemented now (Specs 001–009)**: dashboard/home · sessions & live lifecycle · attendance/outcomes · timetable/schedule (incl. all-teachers lens) · students + student profile · families + add-family + family profile · courses + course profile · groups + group profile · teachers + teacher profile · teacher performance board · academic reports shell · finance/billing shell · settings shell.

**Implemented under a better name**: Trainers→Teachers, Curricula→Courses (Spec 002); legacy "Tickets"→Tasks (planned item already correctly named); legacy mislabel "Courses List"→Materials (planned item already correctly named).

**Moved to a better category / IA**: legacy's ~10 scattered finance sidebar entries → one Finance shell + grouped honest locks (completed by this spec's sub-section); attendance out of session-page embedding → first-class page; banks Admin→finance sub-section (this spec).

**Merged into a stronger workflow**: student results + evaluation → student profile tabs (planned nav items stay as future academy-wide views, documented); family categories → families filter facet (same pattern); per-class quick-queues → session UI concepts (excluded as standalone); family billing tab + finance shell tell one story (link added by this spec).

**Planned / قريبًا (visible, honest, no route yet unless registered)**: messages/chat · leads/new-requests funnel · tasks · announcements/broadcast · time converter (incl. DST-change tracking) · public holidays · scheduled actions · sessions analysis · monthly reports · data analysis (student/course statistics) · staff directory · materials · books/library · certificates + certificate requests (incl. designer, as future scope) · add teacher · teacher categories · family categories · schedule search (incl. find-available-teacher + request-schedule workflow, documented) · student result · student evaluation (incl. family feedback-meetings concept, documented) · sessions KPI (incl. per-session class feedback, documented) · monthly performance (incl. teacher evaluation categories, documented) · settings sub-pages ×6 (general, integrations incl. WhatsApp/Email config, customization, notifications matrix, security incl. CSV import/backup, users incl. RBAC matrix).

**Deferred to backendRequired**: invoices engine · monthly invoices · payments collection/gateways · teacher salaries · staff salaries · class salary report · payouts/compensations · accounting/expenses/P&L/FX · banks — all already honest locks + nine figure-free cards (Spec 009); plus Zoom/live-classroom integration and forms/assessment builder (classified by this spec: backend-dependent, unconfirmed legacy value — matrix row, no surface).

**Future role spec**: entire teacher portal (26 legacy pages: home, live room, chat, timetable, students, monthly plans, salary views, library, profile, tasks) and family/student portal (13 legacy pages: home, today's sessions incl. uploads, timetable, read-only billing, feedback meetings, subscriptions + teacher feedback, request trial, history, library, profile).

**Intentionally excluded (documented reasons)**: all legacy-broken routes (message builder 504; export-course, teacher monthly-classes, scheduled-trials index, family-feedback detail, teacher/student profile views — all 500) · typo route (`downlaod`) · thin features (tasks/tickets KPI shell kept only as planned concept; total-queues/quick-queue; WhatsApp group insights) · duplicate teacher-history routes · per-row colored action-pill anti-pattern · 161 query-param page "variants" (collapsed to in-page state) · exams/quizzes as a module (absent in legacy beyond the forms builder; not scoped until confirmed).

**Missing accidentally → now logged (no surface added)**: forms/assessment builder · family feedback-meetings · request-schedule/teacher-response workflow · per-session class feedback · Zoom live surfaces — each becomes a documented matrix row folded under the planned/backendRequired concepts named above.

## Impact Reviews

- **Dashboard**: no body change. The revenue KPI stays untouched as the approved-design authored artifact (documented in the matrix); people-signal chips unchanged; the sidebar shell around the dashboard changes with the nav corrections like every page.
- **Reports**: body untouched; remains the academic, finance-free shell; its category's nav panel gains the finance sub-section around the existing items without adding/removing report entries.
- **Finance**: body untouched; all Spec 009 invariants preserved; benefits from the nav regrouping (its shell + locks now read as one story in the sidebar) and receives the inbound family-profile link.

## Assumptions

- Spec 009 is fully implemented (verified: 28/28 tasks, built pages, guards green) — the "Spec 009 as dependency" branch of the request does not apply.
- The environment watcher auto-committed prior work (`7a2ee50`); Spec 010 itself must not commit or push, per standing instruction.
- The six-category rail is part of the approved visual direction; IA corrections work within it (sub-sections and labels, not rail geometry).
- The existing category sub-section pattern (Teachers→Performance) is the sanctioned mechanism for the finance grouping; no new nav mechanics are invented.
- «العائلات والطلاب» / "Families & Students" is the default relabel for the families category; the plan phase may refine wording (Arabic-first) without changing the decision to relabel.
- The dev-only gallery page intentionally stays out of product nav, documented in the matrix as an internal surface.
- Planned nav items that overlap implemented tabs/filters (student result, student evaluation, family categories) are kept as future academy-wide views rather than removed — the matrix documents the overlap resolution.
- The filter-visibility fix is a shared-styling/behavior correction verified page-by-page; it is treated as fixing a defect in already-specced behavior (Specs 002–009 all intended filters to visually narrow), not as new feature scope.
- Fixture data is not restructured; the only fixture-adjacent change permitted is deriving/removing the sessions badge count and any copy-level empty-state keys.
- The coverage matrix is a documentation artifact (markdown), not a rendered app page; no "coverage page" ships in the product.
