# Feature Specification: Role Dashboard Shell + Navigation Implementation

**Feature Branch**: `feature/012-role-portal-foundation` (watcher-owned)
**Created**: 2026-07-03
**Status**: Draft (spec only — no plan, no tasks, no implementation)
**Input**: User description: "Role Dashboard Shell + Navigation Implementation — transform the three role pages from one-page portal overviews into real dashboard app shells (role sidebar, topbar, mobile nav, active states, honest planned states), keeping the current pages as the dashboard HOME pages. First implementation spec after Spec 016; builds ONLY the shell/navigation foundation for Specs 018–020."

**Binding law**: the entire Spec-016 package (IA · design freeze · honesty contract · teacher pay-free-global · sequence · coverage matrix · sidebar inventory + all 11 contracts). This spec implements the 016 sequence row for 017 and contradicts nothing in it.

## Grounding (verified this session, not memory)

- **Git**: HEAD `2b8bb84` — **Spec 016 IS committed** (watcher). Tree clean. `.specify/feature.json` now → this spec. Built pages: **49**; the three role homes exist and are the newest-reviewed surfaces in the product (013/014/015).
- **Legacy evidence (visually inspected)**: teacher app home (`output/roles/teacher/screenshots/teacher-home-full.png`) — own sidebar (Home · Chat · Schedule · Students · Library · Tasks · Log Out), the `Your Salary / 997.00 EGP / Estimated / Fines / Bonus` hero, hours KPIs, dense today table with a `(3.00 Fine)` fragment and Enter/End-class buttons; guardian app home (`output/roles/family/screenshots/student-home-full.png`) — own sidebar (Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library · Logout), hours gauge, Request-Trial; admin sidebar reference + `management-home` + `management-salaries` (reviewed for 016, same session). Route inventory: 178 legacy templates (22 teacher · 11 family; no separate student role — the guardian proxy is the student-side evidence). Zips are already extracted in-repo (`output/`, `frontend-planning/`, `frontend-planning-deep/`); no extraction needed.
- **The idea kept / the execution rejected**: legacy proves role-sidebar mini-apps are the right IA; the salary hero, money fragments, dense tables, chat/logout-in-nav, and fake live actions are exactly what the freeze forbids carrying.
- **Current shell (read)**: `portal-shell.js` renders header + `main#page > .pt-body#page-body` + footer — no navigation. **Feasibility finding**: `enhance.js` `openDrawer()` is hard-wired to the ADMIN `#shell > .sidebar` (it no-ops on portal pages) and `enhance.js` is frozen — the role mobile nav therefore CANNOT reuse the admin clone-drawer (see FR-005 and Amendment A1).

## The product decision (from Spec 016, now implemented)

Each role home page gets re-hosted inside **Role Dashboard Shell v2**: role topbar (evolved portal header) + persistent desktop role sidebar + native mobile nav disclosure + baked active states — a real logged-in dashboard app frame, visually role-warm, structurally NEVER the admin shell. The home CONTENT is not redesigned; internal pages arrive in 018–020.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student sees a real dashboard shell (Priority: P1)

A student opens `student-portal.html` and lands in a dashboard app: sky-accented sidebar with their 7 destinations, their identity in the topbar, the home marked active — not a bare scrolling portal page.

**Why this priority**: the shell is THE deliverable; the student app is the first nav map users see from the hub.

**Independent Test**: load the built page — `.pt-sidenav` renders 7 items, home is the only anchor and carries the active state, all existing 13 home sections still render inside the content area.

**Acceptance Scenarios**:

1. **Given** the built student page (AR or EN), **When** it loads, **Then** the role sidebar shows exactly 7 labeled items with icons, home active (`aria-current="page"`), and the page content area contains every pre-017 home section unchanged in order and data.
2. **Given** the sidebar, **Then** it contains zero admin markup/classes and sits OUTSIDE the page body region so existing body-anchor guarantees hold.

---

### User Story 2 - Student understands where everything will live (Priority: P1)

The six future destinations (جدولي · واجباتي · المواد · تقدّمي · سجل الحصص · ملفي) are visible in the nav as honestly-labeled planned items — the student sees the app's full shape today.

**Independent Test**: the 6 future items render as labeled non-anchor planned controls (never `href="#"`, never dead links); activating one gives the existing honest demo acknowledgement.

---

### User Story 3 - Guardian gets family-specific navigation (Priority: P1)

A guardian opens `family-portal.html` into the violet family app: 8 destinations (الرئيسية · الأبناء · الجدول · التقدّم · الفواتير · الطلبات · المواد · الملف), home active, all 12 home sections intact.

**Independent Test**: nav count = 8; the billing item's label is status-register wording (الفواتير = the status surface; ZERO figures anywhere, the standing family zero-pay assert stays green).

---

### User Story 4 - Guardian understands the app map (Priority: P2)

The 7 future family destinations are visible as labeled planned items; the guardian can see children/schedule/progress/billing-status/requests/materials/profile are coming, with nothing clickable-but-fake.

---

### User Story 5 - Teacher gets a teaching-workflow nav (Priority: P1)

A teacher opens `teacher-portal.html` into the teal cockpit: 7 destinations (الرئيسية · جدولي · طلابي · نتائج الحصص · المهام · التقارير · ملفي) mirroring the daily workflow, home active, all 14 home sections intact.

**Independent Test**: nav count = 7; the one sanctioned body anchor (the performance link) still passes its exact-target assert.

---

### User Story 6 - Teacher app stays pay-free (Priority: P1)

No nav item, label, locale key, source comment, or built byte in the teacher page contains pay/currency vocabulary — the legacy sidebar's implied pay surfaces (salary hero lineage) have NO nav presence; legacy pay pages remain admin-finance/backendRequired (Spec 025).

**Independent Test**: the three-layer pay-free audit passes on the deepened teacher page including the new nav markup; the byte-verbatim Spec-012 payHit assert stays green; the extended token set from the user brief (incl. أتعاب/فلوس/دولار/money/currency) greps zero in teacher-owned sources and built output.

---

### User Story 7 - Mobile user opens and closes the nav easily (Priority: P1)

At 390px the sidebar becomes a native disclosure panel under the topbar: one tap opens the full role nav, one tap closes it; keyboard Enter/Space works natively; RTL/LTR correct; zero horizontal overflow.

**Independent Test**: the smoke 390px probe stays green; the disclosure element is detectable (`details.pt-nav-drawer` or equivalent frozen selector), is keyboard-focusable, and contains the same nav items as desktop.

---

### User Story 8 - English user gets the equivalent app (Priority: P1)

Every `.en.html` role page renders the same shell with mirrored EN labels (Home/Schedule/Homework/... etc.), LTR layout, and identical nav counts/behaviors.

---

### User Story 9 - Future destinations are safe (Priority: P1)

Until 018–020 ship real pages, no nav entry navigates anywhere fake: home entries are real links; all future entries are labeled non-anchor planned controls (**Option B** — no placeholder pages are created; see the decision in Requirements). Zero `href="#"`, zero dead links, zero dead pages, zero placeholder pages to throw away later.

---

### User Story 10 - Admin stays separate and unchanged (Priority: P1)

All 40 admin files remain byte-identical; no role nav appears in admin pages; no admin shell markup appears in role pages; the hub remains the only entry.

**Independent Test**: post-build hash-compare = 41/49 identical (40 admin + `index.html`); only the four portal pairs change; the portal-absence guard on admin pages stays byte-verbatim green.

---

### User Story 11 - Owner verifies 018–020 are set up (Priority: P2)

After 017, each future role spec only: builds its internal pages, flips its nav registry entries `planned → implemented`, and extends its smoke branch — zero shell work remains.

**Independent Test**: the nav registries carry all 22 entries (7+8+7) with statuses; flipping one entry requires exactly one registry line change + the page existing.

---

### User Story 12 - Design follows the freeze (Priority: P1)

The shell uses only frozen patterns (portal primitives, labeled chips, role accents sky/violet/teal, existing spacing/typography/dark tokens); the ONE necessary deviation (mobile disclosure instead of the enhance.js clone-drawer) is recorded as an explicit freeze amendment, not silent drift.

---

### Edge Cases

- **Hub page**: gets NO sidebar (it is the entry chooser, not an app); its shell stays header-based; hub card copy may be refreshed to "dashboard" language (`prt.hub.*` — sanctioned for 017 by the 016 IA "hub copy update").
- **`#page-body` integrity**: the sidebar/topbar live OUTSIDE `#page-body`, so the standing body-scoped asserts (student/family bodyAnchors 0, teacher ===1 + exact target, formControls 0, zero-pay regex, gauges/avatars/planned tones) remain byte-verbatim and green.
- **Header hub link**: the existing `.pt-header` role-switch link stays (a smoke assert depends on its location); the sidebar adds a footer "back to hub" entry as the quick-exit affordance — both are registry-sanctioned anchors.
- **Skip link**: the existing skip-to-content target (`#page`) must skip OVER the sidebar into the content.
- **Sidebar on non-role portal pages**: only the three role pages get the sidebar; `portals.html` and admin never.
- **Locale growth**: nav labels are new `prt.nav.*` keys (shared shell namespace — sanctioned to GROW for 017; existing shared keys not reworded except the sanctioned hub copy).
- **`index.html`**: untouched (no new pages under Option B), stays byte-identical.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Shell v2)**: The portal shell MUST gain a role-app layout for the three role pages: role topbar (existing header evolved: brand+portal name · persona identity block · theme/lang · hub switch link) + persistent desktop sidebar + content area + footer. The hub keeps the header-only shell. Zero admin classes/markup; the shell remains one shared component with per-role accent via the existing `data-role` attribute.
- **FR-002 (Nav registries)**: A data-driven ROLE navigation registry MUST exist (inside the portal fixture module) with entries `{id, labelKey, icon, href (ar/en resolvable), status: implemented|planned}` — student 7 · family 8 · teacher 7, in the frozen order below. Registries are the single source for desktop, mobile, and tests; 018–020 flip statuses without shell changes.
- **FR-003 (Desktop sidebar)**: ≥1024px the sidebar renders all registry items as icon+label rows; `implemented` = real language-correct links; `planned` = non-anchor buttons with a small labeled «قريبًا / Soon» pill reusing the EXISTING acknowledge-toast behavior (no new hooks); active item = accent pill + `aria-current="page"` (baked per page). A compact identity block (persona avatar initial + name + role chip) heads the sidebar; a "back to hub" entry closes it.
- **FR-004 (Role topbar)**: The topbar keeps ALL existing controls (theme menu, lang menu, greet, role chip, hub switch) and gains the mobile nav toggle; no notification counts, no search (honesty: no engines).
- **FR-005 (Mobile nav)**: <1024px the sidebar collapses into a **native `<details class="pt-nav-drawer">` disclosure** under the topbar: `<summary>` = the nav toggle (icon + current-page label), the open panel = the same registry items. Native semantics give keyboard/RTL/no-JS behavior for free. **Bottom tab bars remain forbidden.** *(This is design-freeze Amendment A1: the frozen "off-canvas drawer" wording is amended for role apps because the frozen `enhance.js` clone-drawer is admin-`#shell`-bound by construction; the native disclosure is the sanctioned role-app drawer. The freeze's change-control clause is the vehicle.)*
- **FR-006 (Active states)**: Every role page bakes its own nav with exactly one active item; in 017 that is Home on each of the three pages.
- **FR-007 (Honest states)**: Planned nav items MUST be non-anchors, labeled, figure-free, and never render as disabled-looking dead ends without explanation (the pill + toast IS the explanation). Zero `href="#"` sitewide stands. **Option B is the decision**: NO placeholder/gate pages are created in 017 (rationale: 018–020 would immediately rewrite them; placeholder pairs would add 38 throwaway files; Option B keeps the surface minimal and the honesty perfect). If the owner later wants clickable previews pre-018, that is a recorded alternative, not this spec.
- **FR-008 (Home re-hosting)**: The three home pages MUST render their existing sections byte-equal in content and order inside the new shell (wrapper-level diff only). A per-section content-integrity proof is required (see SC-003). Home hero/section copy is NOT redesigned; only shell-required additions (e.g., nothing expected beyond the wrapper) are sanctioned.
- **FR-009 (Bilingual/RTL/theme)**: All shell strings are key-mirrored AR/EN (`prt.nav.*` + per-role label keys); AR RTL default, EN LTR; light/dark/system tokens as-is; Arabic-Indic digits wherever user-facing counters appear (none expected in the shell).
- **FR-010 (A11y)**: The sidebar is a `<nav>` with an accessible name; disclosure summary is keyboard-operable natively; active item exposed via `aria-current`; axe critical=0 serious=0 across the portal matrix (incl. the new nav in both themes).
- **FR-011 (390px)**: Zero horizontal overflow at 390px on all portal pages (existing probe extends automatically since it already covers the three deepened portals).
- **FR-012 (Admin separation)**: Zero admin-file changes; the portal-absence assert on admin pages and the admin-markup-absence assert on portal pages both stay green and byte-verbatim.
- **FR-013 (Teacher pay-free global)**: The teacher registry, labels, keys, comments, and built output MUST pass the three-layer audit with the EXTENDED token set (standing word-bounded EN set + money|currency + AR راتب|رواتب|أجر|أتعاب|مستحقات|مكافأة|غرامة|فلوس + currency tokens incl. دولار); the Spec-012 payHit assert stays BYTE-VERBATIM; no route from any teacher surface toward any pay surface.
- **FR-014 (No dead anything)**: Zero `href="#"`, zero dead links, zero dead/blank pages, zero raw keys — crawl-asserted.
- **FR-015 (Tests)**: ONE sanctioned smoke amendment (portal-scoped): shell v2 asserts (sidebar presence on exactly the 3 role pages; registry counts 7/8/7; exactly one active item = home; planned items are buttons, not anchors; the disclosure element present; **the sanctioned-anchor registry per portal page** — the complete allowed-href set: header hub link + sidebar home self-link + sidebar hub link + body anchors 0/0/1 with the teacher exact target); ALL existing student/family/teacher/hub/admin asserts stay byte-verbatim (nav sits outside `#page-body` by construction). Screenshots: additive frames (3 role pages desktop w/ sidebar AR light + teacher dark + 1 mobile-drawer-open frame + hub unchanged-proof + admin unchanged-proof); REVIEW.md verdicts.
- **FR-016 (Docs)**: CLAUDE.md pointer refresh to Spec 017 (its first docs task, per 016 D11) + README portal-shell-v2 Django note + coverage-matrix delivery annotation for the shell row.

### The frozen navigation maps (labels final)

| # | Student (sky) | Family (violet) | Teacher (teal) |
|---|---|---|---|
| 1 | الرئيسية / Home → `student-portal(.en).html` | الرئيسية / Home → `family-portal(.en).html` | الرئيسية / Home → `teacher-portal(.en).html` |
| 2 | جدولي / Schedule → planned (`student-schedule`) | الأبناء / Children → planned (`family-children`) | جدولي / Schedule → planned (`teacher-schedule`) |
| 3 | واجباتي / Homework → planned (`student-homework`) | الجدول / Schedule → planned (`family-schedule`) | طلابي / Students → planned (`teacher-students`) |
| 4 | المواد / Materials → planned (`student-materials`) | التقدّم / Progress → planned (`family-progress`) | نتائج الحصص / Outcomes → planned (`teacher-outcomes`) |
| 5 | تقدّمي / Progress → planned (`student-progress`) | الفواتير / Billing → planned (`family-billing`, STATUS-ONLY forever) | المهام / Tasks → planned (`teacher-tasks`) |
| 6 | سجل الحصص / History → planned (`student-history`) | الطلبات / Requests → planned (`family-requests`) | التقارير / Reports → planned (`teacher-reports`) |
| 7 | ملفي / Profile → planned (`student-profile`) | المواد / Materials → planned (`family-materials`) | ملفي / Profile → planned (`teacher-profile`) |
| 8 | — | الملف / Profile → planned (`family-profile`) | — |

The `planned (page-id)` values are the registry's future hrefs — inert metadata in 017 (items render as buttons), becoming live links when 018–020 flip the status. Teacher labels verified against the extended pay-token set: clean.

### Key Entities

- **RoleNavRegistry**: per-role ordered entries {id, labelKey (AR/EN mirrored), icon (existing sprite), futureHref, status} — student 7 / family 8 / teacher 7.
- **ShellV2Layout**: topbar + sidebar (desktop) / disclosure (mobile) + content + footer; hub variant = topbar-only.
- **SanctionedAnchorRegistry**: per portal page, the exact allowed href set (shell anchors + body anchors), smoke-pinned.
- **FreezeAmendmentA1**: the mobile-nav pattern record (native disclosure, reason: frozen enhance.js drawer is admin-bound).

## Success Criteria *(mandatory)*

- **SC-001**: All three role pages render shell v2 with registry counts 7/8/7 and exactly one active item (home) in both languages — smoke-asserted.
- **SC-002**: Mobile: the disclosure opens/closes by pointer and keyboard on a 390px viewport with zero horizontal overflow — probe + captured open-state frame.
- **SC-003**: Home-content integrity proven: for each role page, the pre-017 `#page-body` inner content equals the post-017 `#page-body` inner content byte-for-byte (extraction diff), OR any wrapper-forced delta is enumerated and shown to preserve every section's structure and data.
- **SC-004**: Byte-identity 41/49 (40 admin + index); only the four portal pairs differ; all prior guards (008–015 asserts incl. payHit byte-verbatim, family zero-pay, bodyAnchors 0/0/1) green without edits.
- **SC-005**: Zero `href="#"`, zero dead links, zero raw keys, zero pay tokens (extended set) in teacher-owned sources/built files; axe 0/0 across the portal matrix.
- **SC-006**: Every anchor on every portal page ∈ its sanctioned-anchor registry (new smoke assert).
- **SC-007**: 018–020 readiness: flipping one registry entry to `implemented` (plus the page existing) is the ONLY change needed to light up a nav destination — demonstrated in the spec's contracts, no shell rework listed in any 018–020 floor.
- **SC-008**: Screenshot review records PASS verdicts (shell not-admin-like, role moods correct, no forbidden pattern) in REVIEW.md.

## Scope

**Allowed change surface (exhaustive)**: `src/js/components/portal-shell.js` (shell v2) · `src/js/pages/portals.js` (hub copy only, if reworded) · the three role page modules (ONLY if re-hosting requires a wrapper touch; content untouched) · `src/js/fixtures/portal.js` (the nav registries) · `src/locales/ar.prt.js`/`en.prt.js` (`prt.nav.*` + sanctioned hub copy; all sibling/role content keys untouched) · `src/styles/app.css` (additive `.portal-shell` selectors: sidebar/disclosure/active/identity) · `tests/smoke/run.cjs` (the one amendment) · `tests/a11y/run.cjs` + `tests/screenshots/capture.cjs` (additive) · `screenshots/REVIEW.md` · `README.md` · `CLAUDE.md` · the 016 coverage-matrix delivery annotation · this spec folder. Built: the four portal pairs ONLY.

**Forbidden**: everything else — all admin source/pages, `nav.config.js`, `enhance.js`, `build-html.mjs`, `package.json`, finance pages, any internal-page content (018–020), any engine/API/CDN/TS/auth/CRUD, placeholder pages (Option B), commit/push/hooks.

## Assumptions

- Option B (no placeholder pages) is the recorded decision; the registries carry future hrefs as inert metadata.
- `prt.nav.*` is a NEW shared-shell namespace owned by 017; the 012–015 freezes on existing keys stand (hub copy refresh is the one sanctioned rewording, per 016).
- The persona identity block uses existing persona fixtures (st1/fam1/sara) — no auth implied; the demo note stays.
- The disclosure default state is closed; no persistence (no new storage keys).
- Legacy chat/logout nav items deliberately have NO 017 nav presence: chat = backendRequired concept (021 admin page; role gates later), logout = meaningless without auth (backendRequired).
