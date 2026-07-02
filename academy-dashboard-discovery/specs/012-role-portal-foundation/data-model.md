# Data Model: Spec 012 — Role Portal Foundation

**All shapes are documentation/build-time shapes.** No DB schema, no API schema, no auth schema, no new domain entities — personas bind to EXISTING fixtures (`fam1`, `st1`, `sara`); the only new fixture file (`fixtures/portal.js`) carries display-only preview snippets and registers.

## 1. RolePortal *(one per role — drives the page + accents)*

| Field | Type | Rules |
|---|---|---|
| `role` | enum | `student · family · teacher` |
| `pageBase` | string | `student-portal · family-portal · teacher-portal` (AR + `.en.html`) |
| `persona` | ref | `student → st1` · `family → fam1` · `teacher → sara` (existing fixture ids; st1 ∈ fam1 for cross-portal coherence) |
| `accent` | token ref | role accent mapped to EXISTING palette tokens (data-role attribute hook) |
| `owningSpec` | enum | deep dashboard owner: `013 · 014 · 015` (rendered as the honest closing note) |

## 2. RolePortalShell *(the shared shell — one component)*

| Field | Rules |
|---|---|
| `header` | brand medallion + portal name · role-identity chip · persona greeting · language/theme controls (EXISTING `data-action="lang-menu"/"theme-menu"` hooks) · demo role-switch link → `portals.html` |
| `main` | single-column `main#page > #page-body`, card-based, mobile-first |
| `structure` | MUST NOT contain `.nav-rail`, `.nav-panel`, `.app-shell`, admin topbar/crumbs |
| `roleHook` | `data-role="student|family|teacher"` on the shell root drives accenting |
| `footerSlot` | honest demo note + owning-spec note |

## 3. RoleNavigationItem *(portal nav destinations — foundation keeps these minimal)*

`{ labelKey pair, target: realPage | plannedAffordance, honesty: link | planned }` — every rendered nav affordance either navigates to an existing built page or is a labeled non-navigating planned control. Zero `href="#"`.

## 4. RolePortalPreviewCard *(one per foundation section — the composition register)*

| Field | Rules |
|---|---|
| `role / id / titleKey` | section identity (e.g. student `todayLearning`, family `childrenOverview`, teacher `todaySchedule`) |
| `fixtureSource` | which EXISTING fixture feeds it (sessions/schedule/students/courses/attendance via persona) or `portal.js` authored literal |
| `presentation` | `hero · cards · gauge · list · plannedCard` (minimal tables; card-first) |
| `honesty` | display-only; numbers fixture-authored or row counts; no computed scoring |

The binding card set per portal = spec.md "Foundation Composition" (student 7 sections + 3 planned cards; family 5 + 3; teacher 5 + 2 + optional labeled admin link).

## 5. RolePortalAction

`{ trigger, class: realLink | demoToast | confirmDemo | plannedDisabled, labelKey pair, reasonKey? }` — the four honest classes only; the teacher next-session affordance is `plannedDisabled`/`demoToast` and MUST NOT resemble a live call join; family billing is `plannedCard` (or a labeled admin-demo link if the plan's default is overridden at review).

## 6. RoleCapabilityClassification *(rows of `legacy-role-capability-coverage.md`)*

| Field | Rules |
|---|---|
| `capability / legacyRoutes / whatItDid` | from the role capture record (26 teacher + 13 family pages, all covered) |
| `classification` | exactly one: `foundation-only · planned-013 · planned-014 · planned-015 · backendRequired · future-role-deep · intentionallyExcluded` |
| `destination / rationale` | which foundation section previews it now / which future spec owns it / why excluded |

Mandatory rows: research D9's seeded set, incl. pay surfaces→backendRequired (never previewed), broken routes + fake live room→excluded, gamification→net-new note, the three-portal split record, and the itemized 013/014/015 boundary lists.

## 7. RoleDemoEntry *(the hub — `portals.html`)*

`{ pageBase: 'portals', roleCards: 3 (icon+accent+promise+persona note+real link), adminReturnLink: labeled → dashboard.html, framing: honest demo-switcher copy (no fake login) }`.

## 8. RoleAcceptanceFrame *(12 frames — research D10)*

`{ page, lang, theme, viewport, passConditions, failConditions, verdict }` — recorded in `screenshots/REVIEW.md` Spec 012 section; includes the admin-dashboard unchanged-proof frame.

## Build/test-time changes (recorded for completeness — not data)

- `build-html.mjs`: PAGES entries gain optional `shell: 'portal'` + `role`; render loop branches to `portalShellMarkup` (admin path untouched).
- `i18n.js`: +2 imports/merges (`ar.prt.js`/`en.prt.js`, merged last).
- `nav.config.js`: FUTURE_ROLE `reason` wording only (D7).
- `tests/smoke/run.cjs`: +4 PAGES bases; `PORTAL_PAGES` set; admin-scoped portal-absence; portal shell/honesty/pay-token/digit block (D6).
- `tests/a11y`, `tests/screenshots`: additive page/MATRIX entries.
- No new guard needed at build time; existing nav/coherence/chip-tone guards remain and must stay silent.
