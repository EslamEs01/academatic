# Feature Specification: Admin Console Final QA Hotfix & Demo Readiness

**Feature Branch**: `feature/001-approved-dashboard-design` (project precedent: all specs live on the single working branch)
**Spec Directory**: `academy-dashboard-discovery/specs/011-final-qa-demo-readiness`
**Created**: 2026-07-02
**Status**: Draft
**Input**: User description: "Admin Console Final QA Hotfix and Demo Readiness — a small, focused final QA hotfix and demo-readiness pass after Specs 001–010. Close the two accepted follow-ups Spec 010 deliberately left (the dashboard Overview `href=\"#\"` in the then-frozen dashboard body, and the Arabic sessions nav badge showing Western digits), then run a final demo-readiness verification. NOT a feature/redesign/legacy-clone/role-dashboard/backend spec."

**Upstream dependency (satisfied)**: Specs 001–010 are all implemented and committed. Spec 010 was auto-committed by the environment watcher as `0ee1965`; the working tree is clean and HEAD is `0ee1965`. This spec closes the two follow-ups Spec 010's `page-coverage-audit.md` / `REVIEW.md` recorded as "accepted follow-ups, not Spec 010's to change" (the dashboard body was contract-frozen for Spec 010).

---

## Grounding Summary *(what was actually inspected — not memory)*

- **Project state**: branch `feature/001-approved-dashboard-design`, HEAD `0ee1965` (Spec 010, committed), clean working tree, 41 built HTML files (20 AR + 20 EN + `index.html`). `.specify/feature.json` repointed to this spec.
- **Finding 1 (dashboard Overview `href="#"`)**: `src/js/pages/dashboard.js:94` calls `sectionHeader({ titleKey: 'section.overview', linkKey: 'section.overviewLink' })` — it passes `linkKey` but **no** `linkHref`. The shared `sectionHeader()` (`src/js/components/ui.js`) defaults `linkHref = '#'`, so it renders `<a href="#" class="link-more">عرض كل المؤشرات / View all metrics ↗</a>`. Built output confirms exactly **one** `href="#"` on `dashboard.html` and one on `dashboard.en.html`, and **zero on all other 38 pages**. The sibling Reports section header (dashboard.js:111) already passes `linkHref: 'reports.html'`, so it is not dead.
- **Finding 2 (Arabic sessions badge digits)**: `src/js/components/sidebar.js:37` renders the badge as `<span class="badge nav-badge tabular">${it.badge}</span>` — the raw number, **not** passed through the locale number helper. Built output shows the badge as Western **"24"** on both `dashboard.html` (Arabic) and `dashboard.en.html`. The badge value is `SESSIONS.total` (Spec 010 made it fixture-derived). The project already has a locale digit helper `num()` (`src/js/i18n.js`) using `Intl.NumberFormat('ar-EG')` → Arabic-Indic digits (٢٤) and `'en-US'` → Western (24); `sidebar.js` imports `t, getLang` but **not** `num`.
- **Contracts reviewed**: Spec 009 `dashboard-impact`/`reports-impact`/`finance-impact`/`scope-guard`; Spec 010 `dashboard-impact-contract` (froze the dashboard body, documented the Overview `href="#"` as an accepted follow-up), `reports-impact`, `finance-impact`, `filter-visibility`, `source-links`, `static-html-django-ready`, `scope-guard`, `screenshot-acceptance`; Spec 010 `page-coverage-audit.md` (accepted-follow-up section) and `REVIEW.md`.
- **Scope note**: the badge lives in the shared **sidebar** (outside `#page-body`), so localizing it ripples every page's sidebar but is **not** a dashboard-body change. The only dashboard-`#page-body` change in this spec is the sanctioned Overview link fix.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dashboard has no dead Overview link (Priority: P1)

As an admin, when I open the dashboard I should not find a dead `href="#"` link. The Overview ("View all metrics") control should either navigate to a real implemented page, act honestly, or be non-interactive — while the section still looks intentional and nothing else on the dashboard changes.

**Why this priority**: A visible "View all metrics" link that goes nowhere is the single most obvious demo blemish on the primary landing page; it is the headline follow-up this spec exists to close.

**Independent Test**: Build; grep the two dashboard files for `href="#"` (must be 0); open the dashboard in both languages and click the Overview link — it either navigates to a real existing page or is not a link; confirm no dashboard card/stat/widget was added or removed and the `#page-body` differs from the previous commit only at the Overview control.

**Acceptance Scenarios**:

1. **Given** the built `dashboard.html` and `dashboard.en.html`, **When** grepped, **Then** `href="#"` count is 0 on both.
2. **Given** the Overview section header, **When** rendered, **Then** the "View all metrics" affordance still looks intentional (either a real link to an implemented page, or an honest non-navigational control) — no broken/empty control, no fake route, no link to a planned/locked item.
3. **Given** the dashboard `#page-body` region, **When** diffed against the pre-Spec-011 commit, **Then** the only difference is the Overview control fix — zero added/removed cards, stats, widgets, or analytics.

---

### User Story 2 - Arabic sessions badge uses localized digits (Priority: P1)

As an Arabic admin, the sessions nav badge should display a localized Arabic number (e.g. ٢٤) while an English admin sees Western digits (24) — and in both cases the number equals the authored fixture sessions count.

**Why this priority**: Western digits inside an otherwise fully Arabic-Indic RTL sidebar are an immediately visible localization defect on every page; the badge shows on all 40 pages.

**Independent Test**: Build; read the sessions badge from `dashboard.html` (expect Arabic-Indic digits) and `dashboard.en.html` (expect Western digits); confirm the numeric value equals `SESSIONS.total`; confirm no second hard-coded badge literal was introduced.

**Acceptance Scenarios**:

1. **Given** any Arabic built page, **When** the sessions nav badge renders, **Then** it shows localized Arabic-Indic digits (٢٤) equal to the fixture sessions count.
2. **Given** any English built page, **When** the sessions nav badge renders, **Then** it shows Western digits (24) equal to the same fixture count.
3. **Given** `src/js/nav.config.js` and the render path, **When** inspected, **Then** the badge value is still the single fixture-derived source (`SESSIONS.total`) — no duplicated hard-coded count and no per-language hard-coded badge strings.

---

### User Story 3 - Final link & truthfulness sweep passes (Priority: P2)

As the product owner, I can trust the console for a demo because a full sweep confirms no new dead links, no fake planned links, no raw i18n keys, and no broken nav states.

**Why this priority**: Demo readiness is only real if the fixes did not introduce regressions and the rest of the console still holds the honesty invariants from Specs 001–010.

**Independent Test**: Run the link-integrity crawl and truthfulness sweep across all 40 built pages; all pass with zero `href="#"` remaining anywhere.

**Acceptance Scenarios**:

1. **Given** all built pages, **When** the link crawl runs, **Then** there is zero `href="#"` sitewide (the dashboard follow-up is closed), zero links to nonexistent files, zero external/CDN links.
2. **Given** every planned nav item, **When** activated, **Then** it does not navigate; every disabled/backendRequired item exposes its reason; future-role items are not rendered.
3. **Given** all pages, **When** loaded, **Then** zero raw `⟦key⟧`, correct sidebar active state, correct topbar title/crumb.

---

### User Story 4 - Contract-frozen bodies remain safe (Priority: P2)

As the engineering owner, I can confirm the reports and finance bodies are untouched, the dashboard body changed only at the sanctioned Overview fix, and all prior guards (Specs 008/009/010) still pass.

**Why this priority**: The two fixes touch the shared sidebar (every page) and the dashboard body; the frozen-body invariants and prior scope guards must be re-proven, not assumed.

**Independent Test**: `git diff` the reports/finance page modules (empty) and the reports/finance `#page-body` regions (identical); confirm the dashboard `#page-body` diff is only the Overview control; re-run every prior scope-guard audit.

**Acceptance Scenarios**:

1. **Given** `git diff`, **When** reviewed, **Then** `pages/reports.js`, `pages/finance.js`, and every reports/finance fixture/component show zero changes, and their built `#page-body` regions are content-identical.
2. **Given** the built dashboard, **When** its `#page-body` is diffed, **Then** the only change is the Overview link fix (the badge change is in the sidebar, outside `#page-body`).
3. **Given** the Spec 008 reports-body guard, the Spec 009 G8a audit (with Spec 010's amendments), and the Spec 010 G7 audit, **When** re-run, **Then** all print `ok`.

---

### User Story 5 - Demo screenshots prove the fix (Priority: P3)

As the product owner, I can review screenshots proving the dashboard Overview fix, the Arabic badge localization vs the English badge, sidebar health, and no visual regression.

**Why this priority**: Screenshot review is the project's binding acceptance mechanism; the two visible fixes must be shown, not just asserted.

**Independent Test**: Capture the defined frames; a human records pass/fail per frame against this spec's failure conditions.

**Acceptance Scenarios**:

1. **Given** the frames, **When** reviewed, **Then** the dashboard (AR + EN) shows an intentional Overview control with no dead link, the Arabic sidebar shows ٢٤ on the sessions badge, the English sidebar shows 24, and the mobile Arabic sidebar is intact.
2. **Given** a comparison with the pre-Spec-011 dashboard frame, **When** reviewed, **Then** there is no visual regression beyond the Overview control and the localized badge.

---

### Edge Cases

- **Sidebar ripple**: localizing the badge changes `sidebar.js`, which re-bakes the sidebar on all 40 pages. That is expected and is a sidebar change, not a `#page-body` change; the dashboard/reports/finance body invariants must still hold.
- **Spec 010 smoke assertion**: Spec 010's smoke asserts `sessions badge === SESSIONS_TOTAL` where `SESSIONS_TOTAL` is the Western-digit source string "24". After localization the Arabic badge becomes "٢٤", which would fail that exact-string check. The badge test MUST be updated to be locale-aware (Arabic pages expect the Arabic-Indic form, English pages expect Western), still tied to the fixture count — this is a required, in-scope test update, not a new assertion of new behavior.
- **Overview target choice**: if the Overview link is pointed to a real page, that page must be implemented and semantically honest (the reports/operations hub is the natural "all metrics" destination); it must never point to a planned/locked/nonexistent target. If instead the control is made non-navigational, its visual must be preserved (the section must still look intentional).
- **`num()` and build-time locale**: `num()` reads the current locale set by `applyLang(lang)` during the static build, so the badge localizes correctly per built page with no runtime rendering — consistent with static-HTML-first. The fix must not introduce any runtime-only rendering of the badge.
- **Shared component blast radius**: the preferred badge fix wraps the value in `num()` at the sidebar render site (or an equivalent minimal shared helper). It must not change `sectionHeader()`'s or other shared components' behavior for unrelated callers.
- **No new hard-coded count**: the badge must remain sourced from `SESSIONS.total`; the fix must not reintroduce a literal `24` anywhere.
- **Zero other href="#"**: the sweep must confirm no other page relies on `href="#"`; the only instance is the dashboard Overview one being fixed, so after this spec the sitewide count is 0.

## Requirements *(mandatory)*

### Functional Requirements

**The two hotfixes**

- **FR-001**: The pre-existing dashboard Overview `href="#"` (from the `section.overview` `sectionHeader` call that omits `linkHref`) MUST be replaced with an honest non-dead treatment — a real link to an implemented page, a real in-page anchor to an existing element id, an honest non-navigational control, or a decorative element with link semantics removed — chosen at plan time. `href="#"` MUST NOT remain.
- **FR-002**: The dashboard body MUST NOT otherwise change — no added/removed cards, no new widgets/stats, no fake analytics, no redesign. The change is confined to the Overview control.
- **FR-003**: The Arabic sessions nav badge MUST render localized Arabic-Indic digits while remaining derived from the fixture sessions count (`SESSIONS.total`), by reusing the existing locale number helper (`num()`) or an equivalent minimal shared formatting step in the existing build/nav render path — no runtime-only rendering.
- **FR-004**: The English sessions nav badge MUST continue to render Western digits equal to the same fixture count.
- **FR-005**: The badge fix MUST NOT reintroduce a hard-coded duplicate count or per-language hard-coded badge strings; the value stays the single `SESSIONS.total` source.

**The demo-readiness sweep**

- **FR-006**: After the fixes, the built output MUST contain zero `href="#"` on every page (the accepted dashboard follow-up is closed; no new one is introduced anywhere).
- **FR-007**: Every local link MUST resolve to an existing built file or a documented, existing in-page hash target.
- **FR-008**: Planned items MUST remain non-navigating «قريبًا» controls; disabled/backendRequired items MUST expose their reason; future-role items MUST remain unrendered.
- **FR-009**: The reports body MUST remain unchanged (Spec 008 invariant intact).
- **FR-010**: The finance body MUST remain unchanged and preserve all Spec 009 invariants (fixture-only, no money arithmetic, no receipt concept, no pay figures, chips never mutate, tiles = row counts).
- **FR-011**: The dashboard `#page-body` diff MUST be limited to the sanctioned Overview fix; the badge change lives in the shared sidebar, not the dashboard body.
- **FR-012**: All standing architecture rules remain true — static HTML-first (no `#app`, no new runtime page construction, no new `data-*` hook), bilingual AR/EN, RTL/LTR, light/dark/system, relative paths / GitHub-Pages compatible, Django-template-ready; no new library/framework/TypeScript/CDN.
- **FR-013**: Full build, smoke, accessibility, and screenshot checks MUST pass; the Spec 010 badge smoke assertion MUST be updated to a locale-aware form (still tied to the fixture count).
- **FR-014**: Documentation (README/REVIEW and this spec's artifacts) MUST record the two resolved follow-ups and confirm no remaining accepted follow-ups from this pass (or list any precisely).

**Truthfulness & guard invariants**

- **FR-015**: All Spec 008/009/010 scope guards MUST pass after this spec; if the sanctioned dashboard-body Overview touch-point needs a documented note in any prior guard, it MUST be an additive, attributed amendment — never a weakening. (The badge change is sidebar-only and needs no finance/reports guard amendment.)

### Key Entities *(documentation/build-time shapes only — no DB, no API, no new fixture domain)*

- **DashboardOverviewFix**: the single Overview control change — element, old state (`href="#"`), new treatment (target page / anchor id / non-link), and the honesty rationale.
- **LocalizedBadge**: the sessions badge localization — source value (`SESSIONS.total`), render helper (`num()`), expected AR form (Arabic-Indic), expected EN form (Western), and the truthfulness tie to the fixture.
- **LinkAuditResult**: the sweep record — per-page counts of `href="#"`, dead targets, external links; raw-key count; nav truthfulness pass/fail.
- **ImpactDiff**: the before/after record proving reports/finance bodies unchanged and the dashboard body limited to the Overview fix.
- **AcceptanceFrame**: one screenshot frame — page, language, theme, viewport, interaction state, and pass/fail conditions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `href="#"` count across all built pages is **0**; the known dashboard Overview `href="#"` is gone; any intentional in-page hash that remains points to a real existing element id and is documented.
- **SC-002**: The Arabic sessions badge displays localized Arabic-Indic digits equal to the fixture-authored sessions count.
- **SC-003**: The English sessions badge displays Western digits equal to the same fixture-authored count.
- **SC-004**: The dashboard `#page-body` diff versus the pre-Spec-011 commit is limited to the Overview control; no other dashboard content changed.
- **SC-005**: The reports and finance `#page-body` regions are content-identical before/after Spec 011 (and their page modules show zero git diff).
- **SC-006**: Zero raw i18n keys, zero missing-file links, zero external/CDN requests, and zero fake planned links are introduced.
- **SC-007**: All prior guards (Spec 008 reports-body, Spec 009 G8a incl. Spec 010 amendments, Spec 010 G7) remain green.
- **SC-008**: Accessibility has zero critical and zero serious violations.
- **SC-009**: The screenshot review records PASS for the dashboard (AR + EN) and the Arabic vs English sidebar badge frames, with no visual regression beyond the two fixes.
- **SC-010**: No new pages, libraries, backend work, engines, or fixture domains were added.

## Scope

### In scope

1. The one dashboard Overview `href="#"` fix (sanctioned dashboard-body touch-point).
2. The sessions nav badge digit localization (shared sidebar render path).
3. The required locale-aware update to the Spec 010 badge smoke assertion + the link/truthfulness sweep verification.
4. Screenshot acceptance for the two fixes + sidebar health.
5. Documentation updates (README/REVIEW + this spec's artifacts) recording the resolved follow-ups.

### Out of scope

- No new pages, dashboard/reports cards, finance features, backend/API/DB/auth/CRUD, real engines (chat/requests/tasks/notifications/Zoom/etc.), imports/exports/uploads, role portals, or role dashboards.
- No new library/framework/TypeScript/CDN; no legacy-clone visuals; no random sidebar items.
- No change to: the Spec 010 coverage-matrix classifications (except a direct typo/reference to the fixed follow-up if found), the reports body, the finance body, the Spec 010 admin IA / finance sub-section / banks relocation / families relabel, or the Spec 009 finance invariants.
- No dashboard redesign or new analytics of any kind.

## Impact Reviews

- **Dashboard**: exactly one sanctioned `#page-body` touch-point — the Overview control loses its `href="#"` (fixed per FR-001). No other body change. The sidebar around it changes only by the localized badge (shared sidebar, all pages).
- **Reports**: body untouched; remains the academic, finance-free shell (Spec 008 intact).
- **Finance**: body untouched; all Spec 009 invariants preserved; the sidebar's localized badge is the only ripple.

## Assumptions

- Spec 010 is fully implemented and committed (`0ee1965`); the working tree is clean — verified. This spec starts from that baseline.
- The environment watcher may auto-commit; Spec 011 itself must not commit or push (standing instruction).
- **Recommended Overview treatment (plan may finalize)**: point the "View all metrics" affordance to the implemented reports/operations hub (`reports.html`, language-aware) — it is a real, already-linked page and the natural "all metrics" destination, preserving the visual affordance with a one-value change at the dashboard call site (mirroring the sibling Reports header). Fallback if that reads as a semantic stretch: make the Overview control non-navigational while preserving its visual. Either way, no `href="#"`, no fake route.
- **Recommended badge treatment**: import and wrap the badge value in the existing `num()` helper at the sidebar render site (`${num(it.badge)}`) — reuses the project's locale digit formatter, stays fixture-truthful, adds no library, works at build time per language.
- The badge is in the shared sidebar (outside `#page-body`), so its localization is not a dashboard/reports/finance body change; it ripples all 40 pages' sidebars, which is expected.
- Screenshot PNGs are gitignored (only `REVIEW.md` is tracked), per the established repo convention.
- The `before_specify` git branch hook is intentionally skipped (Specs 002–010 precedent: it would create a mis-numbered branch; the project uses one working branch and the standing no-commit/no-push instruction applies).
