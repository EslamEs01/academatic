# Feature Specification: Full Frontend Audit + Role Dashboards IA + Design Freeze

**Feature Branch**: `feature/012-role-portal-foundation` (spec folder is authoritative; branch naming is watcher-owned)
**Created**: 2026-07-03
**Status**: Draft (audit + strategy spec — NO implementation, NO tasks)
**Input**: User description: "Full Frontend Audit + Role Dashboards IA + Design Freeze — audit Specs 001–015, reclassify the three portals as role dashboard HOME pages, define the full role dashboard mini-apps + the complete admin sidebar finish plan, freeze the design, and sequence Specs 017–027 so the frontend finishes with zero gaps and zero redesign."

## The two jobs of this spec

1. **Corrective (audit)**: examine everything delivered or planned across Specs 001–015 plus the current 49-page build, against the FULL legacy surface (crawled routes + the current legacy sidebar screenshots), and register every missing, weak, thin, deferred, locked, or «قريبًا» item — with zero hidden gaps.
2. **Strategic (direction)**: fix the final frontend architecture — three role dashboard **mini-apps** (not single overview pages), the complete admin sidebar page plan, a frozen design system — and sequence Specs 017–027 so no future spec ever reopens design questions.

**This spec produces documents only.** No app source, HTML, CSS, JS, or test file changes. No tasks.md. Implementation begins at Spec 017.

## The verdict this spec must state plainly

**The current `student-portal.html` / `family-portal.html` / `teacher-portal.html` are excellent one-page role dashboard HOME/overview pages — they are NOT yet full role dashboard apps.** They are reclassified as **Role Dashboard Home** pages and become the home page of each role's mini-app. Nothing is thrown away; everything deepens around them. (Full reasoning: `role-dashboard-ia.md`.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Owner sees the complete, honest state of Specs 001–015 (Priority: P1)

The academy owner reads one audit document and understands exactly what the 15 delivered specs shipped, what each left planned/«قريبًا»/locked/backendRequired, what is genuinely weak or thin, and what classification every gap received.

**Why this priority**: every downstream decision (IA, sequence, budget) depends on an honest baseline; hiding gaps would poison Specs 017–027.

**Independent Test**: open `frontend-audit-001-015.md`; every spec 001–015 has a delivered/owned/deferred/excluded/weakness entry; every gap carries exactly one classification from the sanctioned set; zero "TBD".

**Acceptance Scenarios**:

1. **Given** the audit document, **When** the owner looks up any spec 001–015, **Then** they find what it shipped, what it deferred, and its task completion state (all fifteen are 100% task-complete).
2. **Given** the gaps register, **When** any gap is read, **Then** it has one classification (`must-fix-before-continuing` / `move-to-spec-0NN` / `backendRequired` / `intentionally-excluded` / `already-covered`) and a one-line reason.

---

### User Story 2 - Current portals correctly reclassified as Role Dashboard Home pages (Priority: P1)

The owner sees the three portal pages formally reclassified as the HOME pages of three role dashboard apps — kept, not discarded — with the boundary between "what the home shows" and "what internal pages own" defined per role.

**Why this priority**: this is the central product correction the whole spec exists to make.

**Independent Test**: `role-dashboard-ia.md` states the reclassification, the kept filenames, and the home-vs-internal-page content split per role.

**Acceptance Scenarios**:

1. **Given** the IA document, **Then** `student-portal.html`/`family-portal.html`/`teacher-portal.html` are named as the kept home pages (no rename, no deletion) and every current home section is mapped to the internal page that deepens it.

---

### User Story 3 - Student gets a complete dashboard app plan (Priority: P1)

A student persona can see, on paper, a complete student mini-app: home + internal pages (sessions/schedule, homework, materials, progress & achievements, history, profile) + role navigation + honest gates, covering every legacy student capability.

**Independent Test**: `role-dashboard-page-inventory.md` §Student lists every internal page with sections, fixture sources, gates, and the legacy rows it covers; no student capability from the coverage matrix is left unmapped.

**Acceptance Scenarios**:

1. **Given** the student page inventory, **Then** every legacy student-side capability (S-rows) resolves to home / an internal page / a gate / an exclusion — zero unmapped.

---

### User Story 4 - Guardian gets a complete dashboard app plan (Priority: P1)

Same as US3 for the family/guardian role: children, sessions/schedule, progress & history, subscriptions & billing-status, requests & feedback, materials, profile — zero-pay hard line preserved (status only, never figures).

**Independent Test**: inventory §Family complete; the zero-pay line restated as binding on every family page.

---

### User Story 5 - Teacher gets a complete dashboard app plan with zero pay surfaces (Priority: P1)

Same for the teacher role: today/sessions, students & follow-up, outcomes & history, tasks & materials, schedule & availability, reports & requests, profile. **The teacher pay hard rule extends from the single page to the entire teacher app, forever**: no pay page, figure, vocabulary (copy or comments), or route; legacy pay pages remain admin-finance/backendRequired.

**Independent Test**: inventory §Teacher complete; the pay-free contract names the whole `teacher-*` page family as its scope; T2/T17/T18/T19 remain outside the teacher app.

---

### User Story 6 - Admin sidebar fully inventoried and mapped (Priority: P1)

Every admin sidebar item visible in the current legacy screenshots (all six groups, ~50 items) is inventoried and classified — already-built / built-but-needs-redesign / missing-page / locked-needs-honest-page / coming-soon-needs-frontend-page / backendRequired-shell / dedicated-page-needed / can-be-merged / intentionally-excluded / future-spec — with its owning future spec.

**Independent Test**: `admin-sidebar-page-inventory.md` covers every item from the user-provided six-group list plus every item found in crawl/nav; zero unclassified.

---

### User Story 7 - Every «قريبًا»/locked item classified and planned (Priority: P1)

All 29 currently-`planned` nav items, all 7 `disabled` finance items, and every legacy locked surface get an explicit replacement plan: which spec builds the real page, and what honest state (working fixture page / permission-locked shell / backendRequired shell) replaces the current toast.

**Independent Test**: the inventory's replacement-plan column is filled for all 36 current non-implemented nav items (29 planned + 7 disabled); the standing rule "planned items become real pages or honest shells — never dead links" is restated.

---

### User Story 8 - Legacy screenshots and files used as evidence (Priority: P2)

The audit is grounded in the actual crawl corpus — 1,019 admin + 67 teacher + 27 family screenshots, 300 distinct admin crawled pages, role maps, and both planning generations — with representative frames visually reviewed, not just grepped.

**Independent Test**: `legacy-screenshot-review.md` names the frames reviewed and what each proved; `visual-reference-audit.md` records the design conclusions; the student-role evidence gap (0 crawled student screenshots; student surface captured via the family proxy `student-*` routes) is stated honestly.

---

### User Story 9 - Old system idea preserved, redesigned better (Priority: P2)

The legacy idea — role mini-apps with sidebars + a deep admin console — is explicitly kept; the legacy execution (KPI money walls, 10–23-column tables, fake live room, dual badges, dead routes) is explicitly not cloned. Every "ugly but useful" legacy surface gets a design treatment (card-first, agenda, drawer, honest gate).

**Independent Test**: the coverage matrix's design-treatment column is filled; the forbidden-visual-patterns list in the design freeze bans the legacy anti-patterns by name.

---

### User Story 10 - Zero uncategorized legacy routes (Priority: P1)

The master legacy-to-new coverage matrix maps every distinct legacy route/page (all roles, including blocked/failed/uncrawled ones) to a status from the sanctioned 21-value set. Nothing is silently dropped.

**Independent Test**: `legacy-to-new-coverage-matrix.md` totals reconcile: matrix rows ≥ distinct crawled pages + documented-but-uncrawled items; a zero-uncategorized assertion closes the file.

---

### User Story 11 - BackendRequired actions honest, never fake (Priority: P1)

The honesty contract carries forward and extends to every future page: the four honest action classes, the gate patterns (mini-card, inline chip, gate note, locked-page shell), and the complete no-fake list (payment, live join, chat send, attendance write, uploads, submits, integration connects, security/permission saves…).

**Independent Test**: `honesty-and-backendrequired-contract.md` enumerates the classes, patterns, and the full forbidden list; Specs 017–027 must cite it.

---

### User Story 12 - Design frozen — no more redesign rounds (Priority: P1)

The design freeze locks the token system, shells, navigation patterns, every component family (cards/tables/filters/tabs/modals/forms/empty states/chips/headers/stat-timeline-agenda-profile-settings-locked cards), mobile navigation, dark mode, Arabic typography, spacing, icons, density, role colors, and the forbidden-pattern list — sufficient for Specs 017–027 to build without new design decisions.

**Independent Test**: `role-dashboard-design-freeze.md` covers every category in the user's freeze list; each entry says "already exists — frozen as-is" or defines the new frozen pattern.

---

### User Story 13 - Future specs clearly sequenced (Priority: P1)

Specs 017–027 are adopted with owners, scope, dependencies, and per-spec acceptance floors: 017 role shell/navigation · 018 student pages · 019 family pages · 020 teacher pages · 021 admin control/ops · 022 admin families/students/courses/groups · 023 admin teachers/performance · 024 admin reports/analytics/feedback/forms · 025 admin finance (honest shells) · 026 admin management/content/certificates/settings · 027 final QA + no-missing audit.

**Independent Test**: `future-spec-sequence.md` gives each spec a scope table, page list, dependency line, and acceptance floor; the gaps register routes every deferred item into exactly one of them.

---

### User Story 14 - Final QA has measurable no-missing acceptance rules (Priority: P2)

Spec 027's acceptance is pre-defined and measurable now: every coverage-matrix row resolved; zero `planned` items without a page or honest shell; zero `href="#"`; zero raw keys; zero pay tokens in role apps; all guards green; screenshot review per page family.

**Independent Test**: the final-acceptance rules section of `future-spec-sequence.md` lists machine-checkable criteria only.

---

### Edge Cases

- **Uncrawlable legacy surfaces** (auth-blocked, 500s, empty shells): classified from role-maps/planning docs with `crawl state` recorded; never guessed into existence — `needs-decision` where evidence is genuinely thin.
- **Student role evidence**: 0 direct student crawls; the `student-*` route family captured under the family session is used as the student surface evidence, stated as such.
- **Legacy sidebar items with no crawled page** (e.g., بحث الجدول variants, some categories pages): classified from the sidebar screenshot + route naming; flagged docs-only.
- **Conflicts between the user's sidebar list and the crawl** (naming variants like الدردشة/المحادثات، عطلة عامة/العطلات الرسمية): the inventory carries both labels and treats them as one item.
- **Legacy-only anti-features** (fake live room, dual-badge bug, dead Dashboard-1 links, typo routes): remain intentionally-excluded — listed, never rebuilt.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (001–015 audit)**: The spec MUST audit all fifteen delivered specs — deliverables, owned pages, deferrals, exclusions, weaknesses, task completion — in `frontend-audit-001-015.md`, and register every finding in `missing-pages-and-gaps-register.md` with one sanctioned classification each.
- **FR-002 (current app audit)**: The spec MUST inventory the current build (49 pages = 20 admin pairs + 3 portal pairs + hub pair + ar-only index) and audit it for placeholder/thin/inconsistent surfaces.
- **FR-003 (current sidebar audit)**: The spec MUST list every current nav item by status (the implemented set behind the 20 admin page pairs; 29 planned; 7 disabled-finance; 3 future-role) and give each non-implemented item a replacement plan.
- **FR-004 (legacy route audit)**: The spec MUST produce the master legacy route inventory (all roles; crawled, failed, blocked, and documented-only routes) feeding the coverage matrix.
- **FR-005 (legacy screenshot audit)**: The spec MUST visually review representative legacy screenshots per role and per surface family and record findings in `legacy-screenshot-review.md` + `visual-reference-audit.md`.
- **FR-006 (role shell decision)**: The spec MUST decide the role dashboard shell: an evolved portal shell v2 with role sidebar + topbar + mobile drawer — a SECOND shell family, never the admin shell — with the three current pages kept as homes.
- **FR-007 (role page inventory)**: The spec MUST list every internal page per role app with sections, data sources, gates, and covered legacy rows.
- **FR-008 (admin sidebar inventory)**: The spec MUST classify every admin sidebar item from the six-group screenshot list (plus crawl-discovered items) with owning spec and design treatment; zero unclassified.
- **FR-009 (locked/«قريبًا» replacement plan)**: The spec MUST define the three honest end-states (real fixture page / permission-locked shell / backendRequired shell) and assign one to every currently planned/disabled/locked item.
- **FR-010 (coverage matrix)**: The spec MUST produce `legacy-to-new-coverage-matrix.md` using exactly the sanctioned 21-status vocabulary, with zero uncategorized rows, extending (never overwriting) the Spec-012 coverage artifact.
- **FR-011 (design freeze)**: The spec MUST freeze the design system across all categories in the user's freeze list, including the forbidden-visual-patterns register.
- **FR-012 (honesty)**: The spec MUST carry the four honest action classes + complete no-fake list forward as binding on Specs 017–027.
- **FR-013 (teacher pay-free)**: The spec MUST extend the teacher pay hard rule (vocabulary sets + currency tokens + comment discipline + no route) to the entire future teacher app surface.
- **FR-014 (admin separation)**: The spec MUST keep the two-shell separation binding: role apps never render admin chrome or admin-only data; the admin console never links to role apps (hub-only entry stands).
- **FR-015 (sequence)**: The spec MUST adopt and justify the 017–027 sequence with dependencies and acceptance floors.
- **FR-016 (no implementation)**: Spec 016 MUST change zero app/source/test/built files; documents only; no tasks.md.

### Key Entities

- **AuditFinding**: {spec/surface, finding, severity, classification, destination-spec, reason}
- **RoleDashboardApp**: {role, home page (kept), internal pages[], nav items[], gates[], covered legacy rows[]}
- **AdminSidebarItem**: {AR label(s), legacy route(s), current nav status, classification, owning spec, design treatment, honest end-state}
- **CoverageRow**: {role, route, page name, sidebar item, function, forms/modals, current destination, planned destination, status (21-value set), reason, future spec, backendRequired?, design treatment}
- **FrozenPattern**: {category, pattern name, definition, source (exists/new), forbidden variants}
- **FutureSpec**: {number, name, scope, pages, dependencies, acceptance floor}

## Success Criteria *(mandatory)*

- **SC-001**: All 15 specs audited; every finding classified; **zero hidden gaps** (the register's classification column is 100% filled).
- **SC-002**: The reclassification is stated in plain words: current portals = Role Dashboard Home pages; full apps arrive via 017–020.
- **SC-003**: Each of the three role apps has a complete internal-page inventory whose union covers 100% of that role's coverage-matrix rows (delivered / gated / excluded — nothing unmapped).
- **SC-004**: Every admin sidebar item from the screenshot list is classified with an owning spec — zero unclassified; every current «قريبًا»/locked nav item has a named honest end-state.
- **SC-005**: The coverage matrix has zero uncategorized legacy routes; totals reconcile against the crawl (300 distinct admin pages, 26 teacher, 13 family/student-proxy) plus documented-only items.
- **SC-006**: The design freeze answers every category in the freeze list; Specs 017–027 can cite it instead of making design decisions.
- **SC-007**: The teacher app plan contains zero pay surfaces/vocabulary/routes; the family app plan contains zero pay figures — both restated as machine-enforceable rules for future specs.
- **SC-008**: The 017–027 sequence is adopted with per-spec acceptance floors; Spec 027's no-missing criteria are machine-checkable.
- **SC-009**: `git status` shows only the Spec-016 folder + `.specify/feature.json` (+ sanctioned doc pointers) — zero app/built/test changes, zero tasks, zero commit/push by this spec.

## Assumptions

- Spec 015 is implemented and committed (`20dc089`); the audit treats 001–015 as fully delivered (all fifteen tasks.md at 100%).
- The user-provided six-group sidebar list reflects the CURRENT legacy system (newer than parts of the crawl); where the crawl lacks a page for a listed item, the item is still planned (docs/screenshot evidence, marked as such).
- Static HTML-first, fixtures-only, Django-template-ready, GitHub-Pages-compatible remain binding for all future specs; nothing here relaxes the standing constitution.
- The demo hub (`portals.html`) remains the only entry to role apps until real auth exists (backendRequired).
- File naming for future role pages follows `student-*.html` / `family-*.html` / `teacher-*.html`; the three home filenames stay unchanged.

## Companion artifacts (this spec's deliverables)

`frontend-audit-001-015.md` · `role-dashboard-ia.md` (incl. the role navigation map) · `role-dashboard-design-freeze.md` · `role-dashboard-page-inventory.md` (incl. the three per-role page plans) · `admin-sidebar-page-inventory.md` (incl. the locked/«قريبًا» replacement plan) · `legacy-to-new-coverage-matrix.md` · `missing-pages-and-gaps-register.md` · `future-spec-sequence.md` (incl. the admin finish plan + final acceptance rules) · `visual-reference-audit.md` · `legacy-screenshot-review.md` · `honesty-and-backendrequired-contract.md` · `checklists/requirements.md`.
