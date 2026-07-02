<!-- SPECKIT START -->
Active feature: **Spec 012 — Role Portal Foundation**
(branch `feature/011-final-qa-demo-readiness`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/012-role-portal-foundation/plan.md`
(see also `research.md` (D1–D12), `data-model.md`, `quickstart.md`, and `contracts/` — 12 contracts).

Spec 012 starts the ROLE-PORTAL layer as a FOUNDATION-ONLY pass on top of the demo-ready admin console
(Specs 001–011 complete; Spec 011 = commit `e7ee011`; 41 built pages). Deliverables: (1) a **shared warm
portal shell** — NEW `components/portal-shell.js` (`portalShellMarkup()`): sticky friendly header (brand +
portal name + role-identity chip + persona greeting + EXISTING `data-action="lang-menu"/"theme-menu"` hooks
reused + labeled demo role-switch link) above single-column `main#page > #page-body`; root
`class="portal-shell" data-role="student|family|teacher|hub"` drives role accents from EXISTING tokens; NO
`.app-shell`/`.nav-rail`/`.nav-panel`/admin topbar — structurally distinct from admin BY CONSTRUCTION;
(2) **four new page pairs** (8 files → 49 total): `portals` (demo role-switch hub: 3 friendly role cards +
ONE labeled admin-return link + honest no-login framing — the documented demo path; gallery/index untouched)
+ `student-portal` / `family-portal` / `teacher-portal`, registered in `build-html.mjs` via a NEW per-page
`shell:'portal'` branch (admin render path untouched — all 40 admin files rebuild BYTE-IDENTICAL, asserted by
hash-compare, stronger than the 009/010 body-scoped bar); (3) **personas from EXISTING fixtures** (coherent
story): student=`st1` (∈ fam1, math, progress 78, grp1) · family=`fam1` (5 children st1/st6/st11/st12/st13 —
real multi-child pattern) · teacher=`sara` (full teacher-links graph); NEW `fixtures/portal.js` = display-only
preview snippets/planned-card registers, NO new domain entities; (4) **binding compositions** (the ceiling AND
the floor — deep dashboards are Specs 013/014/015): student = welcome hero · today's learning · next-session
(honest demo, NEVER a live-join look) · my-courses cards (ZERO tables) · progress gauge (authored) ·
achievements preview (net-new — legacy had NO gamification) · planned homework/materials/leaderboard cards ·
Spec-013 note; family = guardian welcome · children overview · today's sessions · attendance/progress ·
teacher-notes preview · planned billing(NO amounts)/meetings/subscriptions cards · Spec-014 note; teacher =
welcome · today's schedule · next-session demo · my students · outcome-workflow preview (display-only) ·
planned materials/tasks cards · optional labeled admin teacher-performance link · **ZERO pay figures/vocab
(grep-enforced EN+AR: salary|payout|earning|راتب|رواتب|أجر…)** · Spec-015 note; (5) NEW locale overlay
`ar.prt.js`/`en.prt.js` (`prt.*`, merged LAST after fin; Arabic-first copy, availability language, no
"coming soon" hype); `.portal-shell` CSS namespace block in `app.css` (tokens reused, mobile-first,
warm/soft/card-based); (6) **`legacy-role-capability-coverage.md`** — ALL 39 legacy portal pages (teacher
26/22 templates + guardian-operated family portal 13/11 — legacy had NO separate student login; the
three-portal split is a recorded improvement) classified under the SEVEN-way scheme (foundation-only/
planned-013/planned-014/planned-015/backendRequired/future-role-deep/intentionallyExcluded): pay surfaces→
backendRequired (never previewed); broken routes (both /profile 500s, Dashboard-1 404s) + the FAKE legacy
"live room" (it just re-rendered home) + thin duplicates→excluded; itemized 013/014/015 boundaries +
sign-off; (7) **two sanctioned reconciliations ONLY**: `nav.config.js` FUTURE_ROLE `reason` wording updated
to post-012 truth (foundation shipped; deep = 013–015; never an admin nav item) + `tests/smoke/run.cjs`
portal-absence assertion RE-SCOPED to the 20 admin bases (kept verbatim there, never deleted) with a NEW
PORTAL_PAGES branch (portal shell present · admin markup absent · pay-token-free teacher portal · localized
digits · honest planned cards · crawl auto-covers the 4 new bases via PAGES). Admin console gains NOTHING
(no nav item/link/body change); `enhance.js`/`package.json`/all existing fixtures+components untouched.
MVP = shell + overlays + build branch + hub + student portal + smoke re-scope (research D12).

Spec 011 (commit `e7ee011`) closed the final admin QA follow-ups: dashboard Overview `href="#"` →
language-aware `linkHref:'reports(.en).html'` (zero `href="#"` sitewide is now a STANDING invariant, smoke
`deadHash===0` on every page) + the sessions badge localized via `num()` (`${num(it.badge)}` in sidebar.js —
AR ٢٤ / EN 24, still `SESSIONS.total`; smoke assert locale-aware + Arabic-no-ASCII-digit guard). Spec 010
(commit `0ee1965`) delivered the coverage matrix (90 rows, nine-way scheme), nav IA corrections (finance
sub-section under Reports via the teachersPerf `sections` mechanism · banks moved from admin · `cat.families`
→ «العائلات والطلاب» · FUTURE_ROUTES cleanup · badge derived), the app-wide `[data-row][hidden]{display:none
!important}` filter-visibility fix + computed-visibility smoke on all 11 filterable pages, ONE family→finance
link (Spec 009 guard amended additively), and the chip-tone build guard. Prior plans: `…/011-final-qa-demo-
readiness/plan.md`, `…/010-capability-coverage-ia-polish/plan.md`, `…/009-finance-billing-payments/plan.md`,
`…/008-academic-reports-analytics/plan.md`, `…/007-teacher-performance-kpis/plan.md`,
`…/006-courses-groups-learning-paths/plan.md`, `…/005-attendance-session-outcomes/plan.md`,
`…/004-family-student-profiles/plan.md`, `…/003-timetable-scheduling/plan.md`,
`…/002-admin-core-operations/plan.md`, `…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Specs 001–011, all carried + binding): the ADMIN console continues the approved design
(Spec 001 visual target; six-category rail); **static HTML-first** — complete pre-rendered `public/*.html`
per language, NO whole-page `#app`, all content baked at build (runtime JS builds no page DOM), enhancement
only via the CLOSED `data-*` hook set — NO new hook; relative paths; GitHub-Pages compatible;
Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System; ALL status/signal chips labeled
icon+text; native JS; no CDN/TypeScript/SPA/chart/table/form/calendar libs; fixtures only — no real
API/auth/permissions/CRUD/persistence; NO engine of any kind (attendance/scheduling/enrollment/grading/
teacher-scoring/notification/chat/tasks/requests/scheduled-actions/holidays/time-zone/reporting/BI/export/
invoice/payment/accounting/payroll/gateway); NO computed score/rank/leaderboard/percentile/chart; ALL
salary/payroll/compensation/payout math OUT of scope — zero pay figures anywhere; reports body finance-free
FOREVER; finance body Spec 009-invariant; zero `href="#"` sitewide; no copied legacy assets/classes/palette/
wording/status codes; screenshot-based visual acceptance. **Spec 012 amends the portal rule**: role portals
are now a real SEPARATE surface (foundation pages only) — student/family/teacher portal items remain FOREVER
absent from the admin console (nav + bodies; admin-scoped smoke assertion), deep role dashboards stay future
(Specs 013–015), and the portal layer must never look like the admin console or the legacy portals. **Spec
012 adds**: new files confined to the portal namespace + 3 registration touch-points; personas = existing
fixtures; every portal number authored; every action one of the four honest classes; planned cards labeled,
figure-free; the demo hub is the only entry (documented URL); admin built output byte-identical; Specs
008–011 guards re-run green with zero new amendments.
<!-- SPECKIT END -->
