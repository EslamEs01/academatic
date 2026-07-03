<!-- SPECKIT START -->
Active feature: **Spec 017 — Role Dashboard Shell + Navigation Implementation**
(branch `feature/012-role-portal-foundation`; Spec 016 = commit `2b8bb84` (docs-only law) · Spec 015 = `20dc089`, 49 built pages).

For decisions, contracts, and acceptance read the current plan and its artifacts:
`academy-dashboard-discovery/specs/017-role-dashboard-shell-navigation/plan.md`
(see also `research.md` (D1–D13), `data-model.md`, `quickstart.md`, and `contracts/` — 11 contracts).

**Spec 016 is BINDING LAW for all Specs 017–027** (committed docs at
`…/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/`): the role-dashboard IA
(the three portals are Role Dashboard HOMES — kept filenames; full apps = mini-apps with role
sidebars), the design freeze (+ forbidden-pattern register + change control), the honesty/
backendRequired contract (four action classes, four gate patterns, the no-fake register), the
**teacher pay-free GLOBAL contract** (the entire `teacher-*` family forever), the legacy coverage
matrix (178 templates, zero uncategorized), the admin sidebar inventory (57 rows → Specs 021–026),
and the sequence 017–027 with Spec-027's eight machine-checkable no-missing rules.

**Spec 017 builds Portal Shell v2** — role topbar + persistent desktop `aside.pt-sidenav`
(identity block · registry items · hub exit) + native mobile `details.pt-nav-drawer` — for the
THREE role pages only (hub stays header-only). Nav = data-driven `ROLE_NAV` registries in
`fixtures/portal.js` (student 7 · family 8 · teacher 7, frozen labels in the spec table);
017 ships home=implemented (real self-link, `aria-current="page"`) + all future entries as
labeled planned BUTTONS («قريبًا/Soon» pill + the existing acknowledge toast — zero new hooks;
**Option B: no placeholder pages**). ALL nav markup sits OUTSIDE `#page-body` so every standing
body assert (bodyAnchors 0/0/1 + teacher exact target, zero-pay regexes, payHit BYTE-VERBATIM)
survives untouched. **Freeze amendments recorded**: A1 mobile nav = native disclosure (the frozen
enhance.js clone-drawer is admin-`#shell`-bound) · A2 no desktop collapse (hooks/storage frozen).
**Change surface (scope-guard G1)**: `portal-shell.js` · `fixtures/portal.js` (ROLE_NAV only) ·
`portals.js` (4 hub copy keys only) · role page modules (wrapper-arg-only if needed; content
byte-untouched — integrity contract proves `#page-body` byte-equal) · `ar/en.prt.js` (NEW
`prt.nav.*` namespace + the 4 hub keys ONLY; all sibling content keys + `data.*` frozen) ·
`app.css` additive · smoke (ONE amendment: sidenav on exactly 3 pages, counts 7/8/7, one
aria-current, planned-as-buttons, drawer present, **sanctioned-anchor registry**: shell anchors
unique-set {self,hub} multiset 5 = self×2+hub×3 per role page) · a11y/capture additive (+ the
drawer-OPEN mobile frame) · docs (README/CLAUDE/REVIEW + the 016 matrix delivery annotation).
**Acceptance ceiling: 41/49 built files hash-identical** (40 admin + index) — only the four
portal pairs change. MVP = registries/keys/CSS → shell v2 → integrity proof → smoke green.

History: Spec 015 (`20dc089`) delivered the TEACHER home — 14 sections (real out15/out4 follow-ups,
5-step workflow + A2 gate notes «تسجيل الغياب…»/«طلب إلغاء أو تعويض…», recent-sessions slice out1/out11,
SAT/MON/TUE day-groups + truthful free-days empty, rubric lines, ONE sanctioned body anchor →
`teacher-performance(.en).html`), planned register {outcomeSave/matUpload/availabilityEdit:
backendRequired, taskManage: planned}, three-layer pay-free enforcement; coverage §9 (27 T-rows).
Spec 014 (`0d144aa`): FAMILY home — 12 sections, zero-pay regex, PORTAL_PLANNED.family 2+2;
coverage §8. Spec 013 (`86729a9`): STUDENT home — 13 sections, gauges, PORTAL_PLANNED.student 2+1;
coverage §7. Spec 012 (`5bcf490`): portal layer + hub + `ar,en.prt.js` overlay + payHit assert +
the 39-page legacy coverage artifact. Spec 011 (`e7ee011`): zero `href="#"` STANDING. Spec 010
(`0ee1965`): coverage matrix/nav IA/chip-tone guard. Prior plans under `…/specs/0NN-*/plan.md`.

Hard constraints (Specs 001–016, all carried + binding): the ADMIN console continues the approved
design (six-category rail); **static HTML-first** — complete pre-rendered `public/*.html` per
language, NO whole-page `#app`, all content baked at build, enhancement only via the CLOSED
`data-*` hook set — NO new hook, NO new storage key; relative paths; GitHub-Pages compatible;
Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System; ALL status/signal chips
labeled icon+text; native JS; no CDN/TypeScript/SPA/chart/table/form/calendar libs; fixtures only —
no real API/auth/permissions/CRUD/persistence; NO engine of any kind; NO computed
score/rank/leaderboard/percentile/chart; ALL salary/payroll/compensation/payout math OUT of scope —
zero pay figures anywhere; reports body finance-free FOREVER; finance body Spec 009-invariant; zero
`href="#"` sitewide; no copied legacy assets/classes/palette/wording/status codes; screenshot-based
visual acceptance. **Portal rules (Specs 012–017, standing)**: role apps are a SEPARATE surface —
never the admin shell, never in admin nav; personas = st1/fam1/sara until real auth
(backendRequired); every number authored; every action one of the four honest classes; planned nav
items are labeled non-links, never anchors; the sanctioned-anchor registry pins every portal page's
link inventory; the family app carries ZERO currency/pay figures; **the teacher app is PAY-FREE
GLOBALLY** (extended token set incl. أتعاب/فلوس/دولار/money/currency, copy AND comments, no route to
any pay surface — three-layer enforced). Future: 018 student pages · 019 family pages · 020 teacher
pages · 021–026 admin families per the 016 sidebar inventory · 027 final no-missing QA.
<!-- SPECKIT END -->
