# Feature Specification: Role Portal Foundation

**Feature Branch**: `feature/011-final-qa-demo-readiness` (current working branch — carries Specs 001–011; the project uses one active branch per era)
**Spec Directory**: `academy-dashboard-discovery/specs/012-role-portal-foundation`
**Created**: 2026-07-02
**Status**: Draft
**Input**: User description: "Role Portal Foundation — start the role-portal layer after the admin console is demo-ready. Create the shared foundation for three non-admin portals (Student, Family/Guardian, Teacher): portal visual direction, shared portal shell, role navigation pattern, role switch/demo entry, bilingual RTL/LTR, light/dark, mobile-first, static HTML-first, future-ready for Specs 013–015. Foundation ONLY — the deep dashboards belong to Spec 013 (Student), Spec 014 (Family), Spec 015 (Teacher). Portals must feel completely different from the admin console: cheerful, calm, warm, easy, human, Arabic-first, premium, not table-heavy, not admin-like."

**Upstream dependency (satisfied)**: Specs 001–011 implemented and committed; **Spec 011 is committed as HEAD `e7ee011`**, working tree clean, 41 built pages. `.specify/feature.json` repointed to this spec.

---

## Grounding Summary *(what was actually inspected — not memory)*

- **Project state**: branch `feature/011-final-qa-demo-readiness`, HEAD `e7ee011`, clean tree, 41 built HTML files (20 admin page pairs + index). Admin console demo-ready (Spec 011 QA pass complete).
- **Current app**: `nav.config.js` (six-category admin rail; `FUTURE_ROLE` register: `teacher-portal` / `family-portal` / `student-portal`, "never rendered"), `build-html.mjs` (every page currently bakes the ADMIN shell — a portal page needs a second shell path), `i18n.js` (8-layer overlay chain + `num()`), `enhance.js` (closed hook set), components/fixtures/locales/styles, smoke/a11y/screenshot harnesses, `REVIEW.md`.
- **Standing invariant that MUST be reconciled**: the smoke suite asserts the three portal ids are rendered on **no** page ("future-role portals must NEVER be rendered"); Spec 012 legitimately creates portal surfaces, so that invariant is re-scoped to "never rendered **in the admin console**" (assertion stays on all admin pages; portal pages get their own checks). The `FUTURE_ROLE` register wording is updated the same way (foundation pages now exist; still never admin-nav items).
- **Legacy role references** (re-read this session from `academy-dashboard-discovery/output/roles/{teacher,family}/pages/*.md`, `role-map.md`, `output/combined/*`, `frontend-planning*/`): legacy has exactly **two** role portals — **Teacher** (`/teacher/*`, 22 templates/26 pages) and a **guardian-operated Family portal** (`/student/*`, 11 templates/13 pages, multi-child; **no separate student login** — the guardian proxies the student). Detailed per-page capability record produced (teacher: home with **prominent salary figures** + today's classes + end-class workflow [remark/summary/homework/files] + cancel/absent modals · live "room" that merely re-renders home (no real classroom) · chat · timetable + availability editor · students roster with monthly-report rubric [achievements/learning-progress/homework-completion/punctuality] + certificate request · monthly plans · salary + 23-col salary-class-report · course-history ×2 duplicate routes · library · empty tickets · profile-edit · **broken** `/teacher/profile` 500; family: home with hours KPIs + "Time Spendings" gauge + today's classes + teachers panel · today-sessions with request-cancel + **file/voice upload** · timetable · history with per-session Class-Summary/Homework details · subscriptions + feedback-about-teacher rubric · **view-only** billing (no pay flow) · empty feedback-meetings · request-trial wizard (new-vs-existing child) · library · profile-edit · **broken** `/student/profile` 500; both: dead "Dashboard 1" → 404, buggy dual notification badge).
- **Key legacy findings shaping this spec**: (1) gamification/achievements/leaderboard/points are **completely absent** in legacy — the student portal's progress/achievements previews are net-new value anchored only by legacy's hours gauge, monthly rubric, and per-session summary/homework notes; (2) the legacy planning docs themselves demand **mobile-first, card-based, simpler portals** ("teachers run classes on phones; parents check on phones"), card-ified tables, single row-action menus, stepped modals, real empty states; (3) the teacher home's salary hero is the #1 thing NOT to carry over.
- **Spec 010/011 records**: `legacy-capability-coverage.md` future-role group (10 grouped rows covering all 26 + 13 portal pages) — Spec 012 refines those rows into a role-level classification; Spec 011 QA notes (zero `href="#"` sitewide is now a standing invariant portal pages must also meet).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Product owner opens all three portal foundations (Priority: P1)

As the product owner, I can open a Student portal, a Family/Guardian portal, and a Teacher portal foundation preview — each a complete, polished, bilingual static page that establishes its portal's identity — via a clean documented demo path that does not touch the admin console.

**Why this priority**: The whole deliverable is the existence and quality of the three foundations plus a sane way to reach them; everything else refines this.

**Independent Test**: From the documented demo entry (the role-switch hub page), reach each of the three portals in one click; each renders its full foundation in Arabic and English; the admin console shows zero new nav items or links.

**Acceptance Scenarios**:

1. **Given** the built output, **When** listed, **Then** three portal page pairs exist (`student-portal`, `family-portal`, `teacher-portal` — AR default + `.en.html`) plus one demo role-switch hub pair (`portals`), and every portal page is reachable from the hub in one click.
2. **Given** the hub page, **When** opened, **Then** it presents the three roles as clear friendly choices (plus a link back to the admin console), is honestly labeled as a demo role switcher (no fake login), and is itself not part of the admin nav.
3. **Given** the admin console, **When** any admin page is inspected after Spec 012, **Then** its sidebar and body contain zero portal links or portal chrome (the admin remains exactly as Spec 010/011 left it).

---

### User Story 2 - Student sees a friendly daily learning foundation (Priority: P1)

As a student, my portal feels fun, encouraging, and easy — focused on today and my progress — and clearly not an admin screen: a warm welcome, what I'm learning today, my next session, my courses, my progress, and a taste of achievements, with honest "coming soon" cards for the deeper features.

**Why this priority**: The student portal is the most experience-sensitive surface (children/young learners) and the strongest proof the portal layer is NOT an admin clone.

**Independent Test**: Open `student-portal.html`: no admin rail/sidebar, no dense table, a friendly hero, and the defined preview sections; all numbers fixture-authored; deeper-dashboard note points to Spec 013.

**Acceptance Scenarios**:

1. **Given** the student portal, **When** rendered, **Then** it contains: a friendly welcome hero (student persona by name), a "today's learning" preview, a "next session" preview, a "my courses" preview (small cards, not a table), a progress preview (visual, gauge/bar-style, fixture-authored), an achievements preview (honestly presented as a new experience), and planned cards for homework/tasks, materials, and leaderboard — each with an honest availability label.
2. **Given** any control on the page, **When** activated, **Then** it is a real link to an existing page, an honest demo action, or a labeled planned/disabled affordance — nothing fake, nothing dead.
3. **Given** the page's tone, **When** reviewed, **Then** it reads bright-but-not-childish, low-density, card-based, with zero admin chrome and zero legacy-cloned layout.

---

### User Story 3 - Family sees a children/progress-focused foundation (Priority: P1)

As a guardian, my portal feels trustworthy, calm, and parent-friendly — centered on my children: who they are, what sessions are today, how they're progressing, what the teacher said — with honest planned cards for billing, meetings, and subscriptions.

**Why this priority**: The family portal is the legacy system's actual home surface (guardians proxied everything); it must carry the multi-child concept from day one.

**Independent Test**: Open `family-portal.html`: guardian persona welcome, children overview (multi-child visible), today's sessions preview, attendance/progress preview, teacher-notes preview, and the planned cards; no payment figures presented as live functionality.

**Acceptance Scenarios**:

1. **Given** the family portal, **When** rendered, **Then** it contains: a guardian welcome, a children overview preview (the persona family's actual children from fixtures, presented as friendly cards with a visible multi-child pattern), a today's-sessions preview, an attendance/progress preview, a teacher-notes preview (anchored in the legacy per-session summary concept), and planned cards for billing/finance, feedback meetings, and subscriptions/plans — billing strictly as an honest planned/backendRequired card (or an honest link to the admin fixture Finance shell only if labeled as the admin demo).
2. **Given** the multi-child pattern, **When** viewed, **Then** switching children is either a working baked preview (fixture children) or an honestly labeled foundation affordance — never a fake control.
3. **Given** the page's tone, **When** reviewed, **Then** it reads calm and clear, child-centered, with no admin chrome and no finance-heavy surface.

---

### User Story 4 - Teacher sees a schedule/students/session-focused foundation (Priority: P1)

As a teacher, my portal feels organized and respectful of my time — today's schedule first, my next session, my students, and how session outcomes will work — with honest planned cards for materials and tasks, and **zero salary/pay/earnings figures anywhere**.

**Why this priority**: The teacher portal replaces the legacy teacher home whose hero was a salary tile; proving the pay-free, workflow-first direction is a core product decision.

**Independent Test**: Open `teacher-portal.html`: teacher persona welcome, today's schedule preview, next-session preview (demo, explicitly not a real join), my-students preview, outcome-workflow preview, planned cards; grep proves zero currency/pay tokens.

**Acceptance Scenarios**:

1. **Given** the teacher portal, **When** rendered, **Then** it contains: a teacher welcome, a today's-schedule preview (the persona teacher's actual fixture sessions), a next-live-session preview whose join affordance is honestly demo/planned (never resembling a real call join), a my-students preview, an attendance/outcome-workflow preview (how end-of-session recording will feel — display-only), planned cards for materials/library and tasks, and (if safe) one real link to the existing admin teacher-performance page labeled as the admin view.
2. **Given** the whole page in both languages, **When** scanned, **Then** zero salary/pay/earnings/compensation figures or vocabulary appear (the legacy salary surfaces are classified backendRequired for a future spec, never previewed with numbers).
3. **Given** the page's tone, **When** reviewed, **Then** it reads fast-daily-workflow (today first), card-based, mobile-comfortable — not the legacy KPI-and-table home.

---

### User Story 5 - Portal navigation is simple, clear, mobile-first (Priority: P2)

As any portal user, I get a simple, friendly navigation pattern — a warm portal header with the role identity and a handful of clear destinations — that works beautifully on mobile and is obviously not the admin category rail.

**Why this priority**: The shared shell/nav is the reusable foundation Specs 013–015 build on; getting its pattern right now prevents three divergent portals later.

**Independent Test**: On each portal at mobile width: header + nav usable, touch-friendly, no horizontal scroll, no admin rail/panel markup; nav items are either real (this page / existing pages) or honest planned affordances.

**Acceptance Scenarios**:

1. **Given** the shared portal shell, **When** compared across the three portals, **Then** it is one consistent pattern (header with brand + role identity + persona + language/theme controls + demo role-switch affordance) with role-specific accenting — and it contains none of the admin shell's rail/panel structure.
2. **Given** a portal page at 390px width, **When** exercised, **Then** all content reflows single-column, touch targets are comfortable, and nothing overflows horizontally.
3. **Given** portal nav destinations, **When** each is activated, **Then** it navigates to a real existing page or is an honest planned affordance — zero dead links, zero `href="#"`.

---

### User Story 6 - Bilingual, RTL/LTR, light/dark safe (Priority: P2)

As an Arabic-first academy, every portal page ships Arabic RTL by default with a full English LTR variant, localized digits, and clean light/dark/system rendering.

**Why this priority**: Standing architecture guarantee; portals must meet the same bar as the admin console from day one.

**Independent Test**: Load each portal in AR and EN, light and dark: correct direction, localized digits, no raw keys, a11y clean.

**Acceptance Scenarios**:

1. **Given** each portal pair, **When** loaded, **Then** the Arabic page is RTL with Arabic-Indic digits where numeric, the English page is LTR with Western digits, and zero raw `⟦key⟧` appear.
2. **Given** dark mode, **When** toggled on any portal, **Then** contrast and card surfaces remain premium (no unreadable text, no washed-out accents), meeting zero critical/serious accessibility violations.

---

### User Story 7 - Legacy role capabilities classified, no silent gaps (Priority: P2)

As the product owner, every legacy teacher-portal and family/student-portal capability has an explicit destination — foundation-only now, planned for Spec 013/014/015, backendRequired, future-role-deep, or intentionally excluded — recorded in a role coverage document.

**Why this priority**: This is the future-role continuation of Spec 010's zero-silent-gaps discipline; Specs 013–015 will be scoped directly from this classification.

**Independent Test**: Read the role coverage artifact: all 26 teacher-portal and 13 family-portal legacy pages resolve to classified rows with destinations and rationales; the broken/weak legacy routes are explicitly excluded with reasons.

**Acceptance Scenarios**:

1. **Given** the role coverage document, **When** any legacy portal route is looked up, **Then** it has exactly one primary classification, a destination (which foundation section previews it now / which future spec owns it / backendRequired / excluded), and a one-line rationale.
2. **Given** the classification, **When** reviewed, **Then**: the legacy salary/earnings surfaces are backendRequired (never a figure in any portal); the broken routes (both profile 500s, the "Dashboard 1" 404s) and weak duplicates (the thin monthly-reports roster, the fake "live room") are intentionally excluded with reasons; the guardian-proxied single portal is documented as deliberately SPLIT into Student (013) + Family (014) portals as an improvement.
3. **Given** the three future specs, **When** the document is read, **Then** each of Spec 013/014/015 has a clear itemized boundary (which capabilities it will own).

---

### User Story 8 - Admin console remains unchanged and clean (Priority: P1)

As the engineering owner, the admin console is untouched: no sidebar items, no body changes, no new admin chrome — all Spec 001–011 contracts and guards stay green.

**Why this priority**: Spec 010/011 just perfected the admin IA; polluting it would undo that work. The portal layer must be additive-only.

**Independent Test**: `git diff` shows zero changes to admin page modules and nav config beyond sanctioned register-wording/test-scope reconciliations; all prior guards pass; admin page bodies byte-identical.

**Acceptance Scenarios**:

1. **Given** `git diff`, **When** reviewed, **Then** no admin page module, admin fixture, or admin component changes (shared primitives may be reused by import, never modified in behavior), and `nav.config.js` changes are limited to the documented `FUTURE_ROLE` register wording update (no new nav item, no category change).
2. **Given** all 40 admin built pages, **When** compared with HEAD, **Then** their `#page-body` regions and sidebars are content-identical (the admin shell gains nothing).
3. **Given** the Spec 008/009/010/011 guard audits, **When** re-run, **Then** all green; the smoke portal-absence assertion is re-scoped to admin pages only (documented reconciliation), never deleted.

---

### User Story 9 - Static HTML-first / Django-ready architecture intact (Priority: P2)

As the engineering owner, the portal layer follows the exact same architecture: complete pre-rendered pages per language, no SPA/`#app`/runtime construction, no new libraries, relative paths, GitHub-Pages compatible, Django-template-ready mapping documented.

**Why this priority**: The portals are the template for three more specs; an architecture drift here would multiply.

**Independent Test**: Built portal pages are complete static HTML; runtime JS only enhances via the existing closed hook set (or documented portal-scoped additions of the same character); `package.json`/`enhance.js` diffs justified or empty; README maps portal surfaces to Django templates.

**Acceptance Scenarios**:

1. **Given** the built portal pages, **When** served statically with JS disabled, **Then** all content is present and readable (enhancement-only JS).
2. **Given** the build, **When** run, **Then** portal pages are produced by the same generator with a portal shell path (admin pages keep theirs), all guards (nav, coherence, chip-tone) stay silent, and no new dependency appears.
3. **Given** the README, **When** read, **Then** the portal shell maps to a Django portal base template with role-specific includes, mirroring the admin mapping style.

---

### User Story 10 - Screenshots prove distinct-and-better, not cloned (Priority: P3)

As the product owner, a screenshot set proves the three portals are visually distinct from the admin console and better than the legacy portals — warm, card-based, mobile-friendly — and that the admin console is visually unchanged.

**Why this priority**: Screenshot review is the project's binding acceptance mechanism; "feels different from admin" is fundamentally a visual claim.

**Independent Test**: Capture the defined frame set; human review records pass/fail against the failure conditions (admin-clone look, legacy-clone look, table-heavy student portal, salary figures, fake-real actions…).

**Acceptance Scenarios**:

1. **Given** the frames, **When** reviewed side-by-side with an admin frame, **Then** the portal shell/layout/tone are unmistakably different (no rail, different header pattern, softer density) while sharing brand quality.
2. **Given** the frames, **When** reviewed against the legacy portal captures, **Then** no layout/visual cloning; the improvements (cards over tables, today-first, honest states) are visible.
3. **Given** the admin dashboard frame after Spec 012, **When** compared with the pre-012 frame, **Then** it is visually identical (no sidebar clutter).

---

### Edge Cases

- **Smoke portal-absence invariant**: the existing assertion (`teacher-portal`/`family-portal`/`student-portal` ids in zero pages) trips the moment portal pages exist. It MUST be re-scoped to admin pages (kept, on all 20 admin bases) with portal pages getting their own smoke block — a documented reconciliation, not a weakening. Portal page markup must also not accidentally use those exact register ids for unrelated elements.
- **`FUTURE_ROLE` register truthfulness**: its "never rendered" wording predates portal surfaces; update to "never in the admin console; foundation pages ship as a separate portal surface (Spec 012); deep experiences are Specs 013–015" — a sanctioned config-comment/wording touch-point, no structural change.
- **Build shell split**: the generator currently wraps every page in the admin shell; portal pages need a portal-shell path without disturbing the 20 admin pages (same generator, additive option). The demo hub page also uses a non-admin shell.
- **Link crawl & page registry**: the smoke `VALID_FILES`/PAGES registry must gain the 4 new bases or the crawl will false-flag portal links; portal pages join all page-level invariants (no raw keys, no external requests, zero `href="#"`, a11y).
- **Student persona vs family fixture coherence**: the student persona must be a real fixture student belonging to the family persona's family, so cross-portal previews tell one coherent story (same child appears in the family portal's children overview).
- **No-JS acceptability**: portal pages must be fully readable statically; any tab/switcher enhancement must degrade to visible content.
- **Pay-figure leak risk via reused fixtures**: teacher fixtures are pay-free by construction (Spec 007/009 invariants) — the portal must not introduce any new pay-adjacent field or copy; the scope guard greps for it.
- **Admin byte-identity**: unlike Specs 009/010 (shared sidebar ripple), Spec 012 gives admin pages NO reason to change — the acceptance bar is full content-identity of all 40 admin pages (rebuild-stable), which is stronger and must be asserted.
- **"Join session" honesty**: the teacher/student next-session preview must not render a button that looks like a live call join; it is a demo/planned affordance with honest labeling (legacy's "room" was itself fake — a re-rendered dashboard).
- **Locale growth**: new `*.prt.js` (or equivalent) overlay pairs must stay key-mirrored AR/EN; portal copy is Arabic-first authored, not translated-English-feel.

## Requirements *(mandatory)*

### Functional Requirements

**Role portal foundation**

- **FR-001**: The feature MUST establish a shared portal shell — a warm, friendly header-based layout (brand + role identity + persona + language/theme controls + demo role-switch affordance) with role-accent variation — that is structurally distinct from the admin shell (no category rail, no admin panel) and is reused by all three portals.
- **FR-002**: The feature MUST ship three portal foundation page pairs — Student, Family/Guardian, Teacher (AR default + `.en.html`) — each a complete baked page composed of the role's defined preview sections and planned cards (see Composition below), bound to a real fixture persona (an existing student/family/teacher, coherent across portals).
- **FR-003**: The feature MUST ship a demo role-switch entry: one hub page pair presenting the three roles (plus a labeled link back to the admin console), honestly framed as a demo switcher (no fake login/auth), reachable by documented URL and linked from each portal's shell — with zero presence in the admin nav or admin bodies.
- **FR-004**: Every portal number MUST be fixture-authored or a sanctioned row-count; every action MUST be one of the honest classes (real link to an existing page / demo toast / confirm→demo / labeled planned/disabled) — no fake backend behavior, no dead links, no `href="#"`.
- **FR-005**: Planned/backendRequired portal cards MUST use labeled availability presentation (reusing the existing availability vocabulary where it fits), each mapping 1:1 to a classified legacy capability or a Spec 013/014/015 boundary item; each portal ends with an honest note that its deep dashboard arrives in its owning spec.
- **FR-006**: The teacher portal MUST contain zero salary/pay/earnings/compensation figures or vocabulary; legacy pay surfaces appear only as classification rows (backendRequired), never as cards with numbers.

**Legacy role coverage**

- **FR-007**: The feature MUST produce a role coverage artifact (`legacy-role-capability-coverage.md`) classifying every legacy teacher-portal (26 pages/22 templates) and family-portal (13 pages/11 templates) capability under the seven-way scheme: foundation-only · planned-013 · planned-014 · planned-015 · backendRequired · future-role-deep · intentionally excluded — each row with destination + one-line rationale; zero silent gaps.
- **FR-008**: The artifact MUST explicitly record: the guardian-proxied single legacy portal deliberately SPLIT into Student + Family portals; the broken legacy routes (teacher/student profile 500s, "Dashboard 1" 404s) and weak surfaces (fake live room, thin duplicate rosters, empty tickets) as intentionally excluded with reasons; gamification/achievements/leaderboard as net-new (no legacy equivalent); and the Spec 013/014/015 ownership boundaries.

**Architecture**

- **FR-009**: Portal pages MUST be complete pre-rendered static HTML per language from the same generator (portal-shell path added additively), with no whole-page `#app`, no SPA, no runtime page construction, no new library/framework/TypeScript/CDN, relative paths, GitHub-Pages compatible.
- **FR-010**: Runtime behavior MUST reuse the existing closed enhancement hook set; any portal-specific interactive affordance must be baked-markup-plus-existing-hooks (or a plan-documented hook of identical character, added only if unavoidable).
- **FR-011**: The Django mapping for the portal layer (portal base template + role includes + persona context) MUST be documented in the README in the established style.
- **FR-012**: No real authentication, role permissions, backend/API/DB, chat, homework engine, attendance write, session joining/Zoom, payment/billing portal, salary/earnings portal, uploads, exports, or notification engine — the foundation is fixtures + honest affordances only.

**Admin impact**

- **FR-013**: The admin console MUST remain unchanged: zero new admin nav items/links, zero admin page-body changes, zero admin fixture/component behavior changes; all 40 admin built pages content-identical before/after; the only sanctioned admin-adjacent edits are the `FUTURE_ROLE` register wording update and the smoke portal-assertion re-scope (both documented).
- **FR-014**: All Spec 008/009/010/011 contracts and guards MUST stay green; any prior-guard reconciliation is additive and attributed (established amendment discipline).

**i18n & accessibility**

- **FR-015**: Arabic default + English `.en.html`, correct RTL/LTR, localized digits via the existing number helper, zero raw i18n keys, key-mirrored locale overlays, Arabic-first copywriting quality.
- **FR-016**: Portal pages MUST meet the standing accessibility bar (zero critical/serious violations), with proper landmarks (portal header/nav/main), focus-visible affordances, and touch-friendly mobile targets.

**QA**

- **FR-017**: Build, smoke (extended to portal pages: shell present, no admin rail, honest actions, zero dead links/raw keys/external requests), a11y, link crawl (registry extended), scope-guard audits, and the screenshot matrix MUST all pass; screenshot review recorded in the standing REVIEW document.

### Key Entities *(documentation/build-time shapes only — no DB, no API, no auth schema)*

- **RolePortal**: one portal — role id (student/family/teacher), page base, persona binding (fixture ids), accent identity, owning future spec (013/014/015).
- **RolePortalShell**: the shared shell — header composition (brand, role identity, persona, language/theme, role-switch), nav slot pattern, footer/demo-note slot, role-accent hook.
- **RoleNavigationItem**: one portal nav destination — label pair, target (real page / planned), honesty class.
- **RolePortalPreviewCard**: one foundation preview section/card — role, title pair, fixture source (which existing fixture feeds it), presentation (hero/cards/gauge/list), honesty class.
- **RolePortalAction**: one portal affordance — trigger, class (real link / demo / confirm-demo / planned/disabled), label pair, reason (if disabled/planned).
- **RoleCapabilityClassification**: one legacy portal capability row — legacy route(s), what it did, seven-way classification, destination, rationale.
- **RoleDemoEntry**: the demo hub — page base, the three role cards, admin-return link, honesty framing.
- **RoleAcceptanceFrame**: one screenshot frame — portal/page, language, theme, viewport, pass/fail conditions, verdict.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Three portal foundation page pairs + one demo hub pair exist and build (built page count grows by exactly 8 files); every portal page is reachable from the documented hub in one click.
- **SC-002**: The admin console is unchanged: all 40 admin built pages content-identical before/after Spec 012; zero portal links/items anywhere in the admin nav or bodies; the post-012 admin dashboard screenshot is visually identical.
- **SC-003**: Zero `href="#"`, zero dead local links, zero raw i18n keys, zero external/CDN requests across ALL built pages including the new eight.
- **SC-004**: Zero backend/API/DB/auth/engine additions; zero new dependencies (`package.json` unchanged); no new runtime page construction.
- **SC-005**: The teacher portal contains zero pay/salary/earnings figures or vocabulary in both languages (grep + review verified).
- **SC-006**: Every one of the 39 legacy portal pages (26 teacher + 13 family) resolves to a classified row in the role coverage artifact with destination + rationale; Specs 013/014/015 each have an itemized boundary list.
- **SC-007**: All portal pages pass RTL/LTR, light/dark, and mobile review (390px single-column, no horizontal scroll) and a11y critical=0 serious=0.
- **SC-008**: Screenshot review records PASS on all defined frames, including the distinct-from-admin and better-than-legacy comparisons and the admin-unchanged proof frame.
- **SC-009**: All Spec 008–011 guards re-run green; the smoke portal-absence assertion remains enforced on all admin pages (re-scoped, not removed).
- **SC-010**: Reports and finance bodies show zero regression (byte-identical); no admin module git diff.

## Foundation Composition (binding scope per portal)

**Student portal** (`student-portal.html` — deep dashboard = Spec 013): friendly welcome hero (persona student, encouraging tone) · today's learning preview (today's fixture session(s) for the persona) · next session preview (honest demo affordance, no fake join) · my courses preview (small friendly cards from existing enrollments) · progress preview (fixture-authored visual gauge/bars — anchored in legacy's hours concept, no computed scoring) · achievements preview (net-new, honestly introduced) · planned cards: homework/tasks, materials, leaderboard · Spec-013 note.

**Family portal** (`family-portal.html` — deep dashboard = Spec 014): guardian welcome · children overview (persona family's fixture children, multi-child pattern visible) · today's sessions preview (children's fixture sessions) · attendance/progress preview (existing outcome fixtures, display-only) · teacher notes preview (anchored in legacy per-session summary/homework notes concept, fixture-authored) · planned cards: billing/finance (honest planned/backendRequired; at most an "admin demo" labeled link to the fixture finance shell), feedback meetings, subscriptions/plans · Spec-014 note.

**Teacher portal** (`teacher-portal.html` — deep dashboard = Spec 015): teacher welcome (persona teacher) · today's schedule preview (persona's fixture sessions) · next live session preview (demo/planned, explicitly not a real join) · my students preview (persona's fixture students) · attendance/outcome workflow preview (display-only glimpse of the end-of-session flow) · planned cards: materials/library, tasks · optional real link to the admin teacher-performance page (labeled) · **zero pay figures** · Spec-015 note.

**Demo hub** (`portals.html`): three friendly role cards + labeled admin-console return link + honest demo framing.

## Scope

### In scope

1. Shared portal shell + portal layout/styling layer (token-based, role accents) + the friendly card system.
2. Three portal foundation page pairs + the demo hub pair; persona bindings to existing fixtures (+ a minimal portal fixture for preview snippets/planned-card registers).
3. Portal locale overlays (AR/EN), portal smoke/a11y/screenshot coverage, link-crawl registry extension.
4. The `legacy-role-capability-coverage.md` classification artifact with Spec 013/014/015 boundaries.
5. The two sanctioned reconciliations: `FUTURE_ROLE` register wording; smoke portal-assertion re-scope to admin pages.
6. Documentation: README (Django portal mapping + demo path), REVIEW acceptance section.

### Out of scope (Specs 013–015 and beyond)

- Deep student/family/teacher dashboard content, flows, and sub-pages (chat, homework, history browsing, timetable pages, request-trial wizard, feedback rubrics, certificate requests, availability editor, monthly plans, library browsing, profile management — all classified, not built).
- Real auth/permissions/backend/API/DB; real chat/homework/attendance-write/session-join/Zoom/payment/salary/upload/export/notification engines.
- Any admin console change beyond the two sanctioned reconciliations; any new library/framework/TypeScript/CDN; any legacy visual cloning.

## Impact Reviews

- **Admin console**: zero change — no nav item, no body change, no shared-component behavior change; acceptance = full content-identity of all 40 admin pages + prior guards green. (Stronger than the Spec 009/010 sidebar-ripple bar: Spec 012 gives admin pages no reason to rebuild differently.)
- **Reports/Finance**: bodies untouched (standing contracts); the family portal may reference the finance shell only as an honestly-labeled admin-demo link (decided at plan; default = planned card only).
- **Gallery/index**: untouched; the demo hub is a new internal-surface page in the gallery tradition (outside admin nav, documented).

## Assumptions

- Spec 011 committed (`e7ee011`), tree clean — verified. Spec 012 is authored on the current branch `feature/011-final-qa-demo-readiness`.
- **Page naming**: `student-portal` / `family-portal` / `teacher-portal` (+ `portals` hub) — avoids collision with the admin profile pages (`student.html`, `family.html`, `teacher.html`) and groups portals lexically; the suggested naming from the brief, adopted.
- **Demo entry**: a dedicated `portals.html` hub (gallery-tradition internal surface) + a role-switch affordance inside each portal shell; the admin console gets nothing. This is the cleanest of the three offered strategies (no gallery edit, no admin entry).
- **Three-portal split**: legacy had one guardian-operated portal; the split into Student (013) and Family (014) is a deliberate product improvement per this brief, recorded in the classification artifact. The legacy `FUTURE_ROLE` note "student experience lives under the family portal" is superseded and its wording updated.
- **Personas**: real fixture entities — one student who belongs to the persona family (coherent cross-portal story) and one active fixture teacher; exact picks at plan time.
- **Portal visual layer**: token-based extension of the existing design system (new portal-scoped classes/accents; possibly a few new tokens), same stylesheet pipeline, no new fonts/libraries; the admin's approved Spec 001 design remains the admin's visual target while portals get their own warmer direction — both sharing brand quality.
- **Availability vocabulary**: portal planned cards reuse the existing labeled availability presentation where it fits; any portal-specific availability label set is defined at plan time as labeled icon+text (never color-only).
- **The deep dashboards are explicitly NOT judged by this spec's acceptance** — foundation quality, distinctness, honesty, and coverage classification are.
