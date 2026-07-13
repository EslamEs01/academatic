# Spec 041 — Role / Route / Permission Matrix

**Scope**: audit artifact. Records, per role, which destinations are reachable, which are forbidden, and the
**verified** result at HEAD `21502af` (branch `feature/012-role-portal-foundation`, working tree clean, pushed).
**Spec 041 is SPECIFY-ONLY and is a freeze**: it changes no source, no test, no HTML. It **implements no
permission system**. Nothing below may be read as a claim that the product enforces anything.

---

## 0. The load-bearing disclaimer (binding, non-negotiable)

> **HIDING A NAV LINK IS NOT AUTHORIZATION.**

Every "0 reachable" result in this document is a statement about the **rendered link graph of 115 static HTML
pages**, and nothing more. There is no auth, no session, no role claim, no server, no route guard, no API. A
teacher who types `finance.html` into the address bar gets `finance.html`. A family member who types
`staff.html` gets `staff.html`. Fixtures-only, static-HTML-first — that is the standing architecture (Specs
001–016) and 041 does not alter it.

| Property | Owned by | Status at 041 |
|---|---|---|
| Rendered link-graph isolation (no admin link on a portal page, no portal link on an admin page) | **Spec 041 (this audit)** | **VERIFIED — 0 / 0** |
| Real route denial · API denial · session role claims · RBAC enforcement · sensitive-data isolation · anti-poaching | **Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching** (maintainer-directed roadmap, recorded in `040-.../future-owner-register.md` §1) | **NOT IMPLEMENTED — and 041 implements none of it** |

The nav.config `status` field (`implemented` / `disabled`) is a **presentation** flag consumed by
`components/sidebar.js`. It is not a permission. `FUTURE_ROLE` (3 entries: `teacher-portal`, `family-portal`,
`student-portal`) is **documented-but-never-rendered** — it is not a role gate either.

Legacy grounding, for the record of what real enforcement will eventually have to model: legacy admin
permissions were **data-driven per staff member**, not a fixed 3-role table —
`/management/admins/permission/{id}` exposed **~170 permission flags across 17 named groups** plus a role label
(Manager / Accountant / Supervisor / Support) plus category scoping
(`frontend-planning-deep/09-permission-navigation-matrix-v2.md:32-35`). Spec 043 inherits that shape; Spec 041
does not touch it.

---

## 1. The four surfaces (recomputed from the tree, not reused)

| Surface | Files | Bases | Renders | Nav source |
|---|---:|---:|---|---|
| **Admin console** (sidebar-bearing) | **64** | 32 | `.nav-panel` + `data-nav-category` | `src/js/nav.config.js` → `components/sidebar.js` |
| **Portal / role shells** | **50** | 25 | the portal shell — **48** files render `pt-nav-item` (desktop `aside.pt-sidenav` + mobile `details.pt-nav-drawer`); the 2 hub files carry the shell **without** a role sidenav | `ROLE_NAV` in `fixtures/portal.js` → `components/portal-shell.js` |
| — family | 18 | 9 | | |
| — teacher | 16 | 8 | | |
| — student (child-view) | 14 | 7 | | |
| — hub (`portals.html`) | 2 | 1 | | |
| **Neither** (`index.html`) | **1** | — | public landing | — |
| **TOTAL** | **115** | **57** | | |

`64 + 50 + 1 = 115` ✅ · `32 + 25 = 57` bases ✅ (matches the 57-entry `PAGES` registry in
`scripts/build-html.mjs` exactly).

---

## 2. Reachability matrix — what each role can reach *by link*

"Reachable" = an `<a href>` exists on a page of that surface whose target resolves to a page of that surface
(fragment stripped for the file lookup, per the shipped link-integrity crawl, `tests/smoke/run.cjs:1814`).

| Role / surface | Its own destinations | Admin destinations | Other-portal destinations | Hub (`portals.html`) | `index.html` |
|---|---|---|---|---|---|
| **Admin** (64 files) | 50 nav items → 27 plain routes + 22 `#view=` deep-links + 1 route-less lock; plus in-body links | ✅ all | **0 — FORBIDDEN, verified 0** | 0 | 0 |
| **Teacher portal** (16 files) | 9 unique `ROLE_NAV.teacher` items = 8 role pages + the hub exit; rendered 18× per page (sidebar + mobile drawer); **planned 0** | **0 — FORBIDDEN, verified 0** | 0 | ✅ hub exit (sanctioned) | 0 |
| **Family portal** (18 files, incl. `family-child`) | 9 unique `ROLE_NAV.family` items = 8 role pages + the hub exit; rendered 18×; **planned 0** | **0 — FORBIDDEN, verified 0** | 0 | ✅ hub exit (sanctioned) | 0 |
| **Student (child-view)** (14 files) | 8 unique `ROLE_NAV.student` items = 7 role pages + the hub exit; rendered 16×; **planned 0** | **0 — FORBIDDEN, verified 0** | 0 | ✅ hub exit (sanctioned) | 0 |

**The two headline verifications (exact destination matching, all 115 pages):**

| Assertion | Result |
|---|---|
| Admin destinations reachable from **any** portal page | **0** ✅ |
| Portal destinations reachable from **any** admin page | **0** ✅ |

Supporting censuses over the same 115 pages: `href="#"` **0** · empty `href` **0** · `javascript:` pseudo-links
**0** · missing `.html` link targets **0** · dead `#view=` hashes (a hash with no matching `data-tabpanel`)
**0** · raw locale keys **0** · AR/EN nav route parity failures **0** (every AR nav `href` has the exact `.en`
twin **with the hash preserved**).

**Orphans**: exactly **2** — `gallery.html` / `gallery.en.html`. Not in `nav.config`, not linked from
`index.html` or any other page, registered in `build-html.mjs` `PAGES` with `activeId:null`. They are the
component / design-system reference page. Reachable **by URL only**, by anyone, from any role — which is
precisely the point that §0 makes: URL reachability is universal for all 115 files, for every role, today.
(Ownership/entry-path gap = finding **D-2**; it is a documentation defect, not a permission defect.)

---

## 3. Role laws — statements and verified results

The three role laws are **product laws**, not permissions. They constrain what a page may *render*, so that even
under URL-typing (where there is no protection at all) a portal page cannot leak the forbidden class of data.
That is why they are the honest safeguard and the nav graph is not.

| # | Law | Enforced over | Shipped assertion | Verified result at `21502af` |
|---|---|---|---|---|
| **L1** | **Teacher PAY-FREE — GLOBAL.** No salary / payout / earnings / compensation / fee vocabulary may render anywhere in the teacher surface, in copy **or** in source comments. | 16 teacher-portal files (8 bases × 2 langs) — home + the 7 internals | `payHit` (`tests/smoke/run.cjs:2069-2072`) · `tchPay` (`:1990-1991`) · admin-side `PAY28` (`:738`, used at `:750/:784/:798`) | **0 violations** ✅ |
| **L2** | **Family ZERO-PAY hard line.** No currency figure, no amount, no pay action on any family body. Billing is **status-first**: hour-quota + amount-free invoice rows. | 16 family bodies (`famPay` `:1959-1960` over the 7 internals; `payFigure` — the *same* regex, byte-identical — at `:2025-2026` family-portal home and `:2049-2050` family-child) | `famPay` / `payFigure` | **0 currency figures** ✅ |
| **L3** | **Student = CHILD-VIEW («عرض الابن»), never a primary role.** The 7 student pages are the family-owned child drill-down. The pre-Spec-021 Student-primary framing «لوحة الطالب» / «بوابة الطالب» / "student dashboard" may never render. | 14 student files | `tests/smoke/run.cjs:1945-1950` (Spec 024 B-01 correction of defect F-00-1) | **0 occurrences** ✅ |

Legacy corroboration for L1 and L3 (`output/combined/role-permission-matrix.md:9-33`,
`output/combined/missing-coverage.md:199-215`): the legacy **teacher** role had **Payments/Invoices = 0 pages**
across the whole crawl — the pay-free law is not an invention, it reproduces the legacy role surface. And there
was **no student login at all** in legacy (three logins: Admin · Teacher · Family/Guardian at `/student/*`) —
the child-view demotion (Spec 021) restores the legacy role model rather than departing from it.

---

## 4. ⚠️ FALSE-POSITIVE WARNING — do not "verify" L1 with a naive grep

> **A naive `grep -i /SAR/` over the teacher portal MATCHES THE PERSONA NAME "Sara".**

`sara` is the teacher persona used across the portal since Spec 012 (personas: `st1` / `fam1` / `sara`). The
substring `sar` inside `Sara` is matched by an unanchored, case-insensitive `SAR` currency search, producing a
**false pay-law violation** on every teacher page that renders the teacher's own name — i.e. all 16.

**The shipped regex is word-boundary scoped and is the only correct check.** Verbatim (`run.cjs:2070-2072`):

```js
const payHit = /\b(salary|salaries|payouts?|earnings?|compensation)\b/i.test(prt.bodyText)
  || /راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/.test(prt.bodyText);
ok(!payHit, `${page}/${lang}: the teacher portal contains pay vocabulary — forbidden (FR-006)`);
```

Rules for any future auditor (including Specs 042 / 043 / 049 / 057):

1. **Never** hand-roll a currency/pay grep for the teacher surface. Re-use `payHit` / `tchPay` **byte-verbatim**.
2. The **family** law (L2) *does* legitimately grep `\bSAR\b` — note the word boundaries in
   `famPay` (`:1959`): `/ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|…/i`. The boundaries are what make it
   safe. Strip them and it, too, will match "Sara".
3. A pay-law "failure" reported without the word-boundary regex is a **tooling defect**, not a product defect.
   Reproduce with the shipped assertion before believing it.

---

## 5. The sanctioned exemption — `teacher-performance.html`

| Fact | Value |
|---|---|
| Surface | **ADMIN** (renders `.nav-panel`, counted in the 64) |
| Nav owners | `sessionsKpi` → `teacher-performance.html#view=sessions-kpi` · `monthlyPerf` → `teacher-performance.html#view=monthly` (both admin, teachers category, Spec 036) |
| Tab group | `data-tabs="perf"`, default panel `overview` (3 tabs) |
| Exemption | **Spec 024 B-07** — the pay-free grep is *not* run to zero on this admin board; it is the one sanctioned admin exempt board |
| Linked from any portal page | **ZERO** ✅ — Spec 025 repointed the teacher-home performance anchor `teacher-performance` → `teacher-reports` (`teacher-portal.js:70`), closing the adjacency |
| Still constrained | `PAY28` runs on it (`:798`); the tabbed re-check `tp.pay` (`:1658`/`:1663`) and the fresh-load deep-link `noPay` (`:2291`/`:2296`) both assert **no pay figure**; **no computed score / rank / percentage / chart / `<canvas>`** |

So the exemption is narrow: it exempts the *board* from the teacher-portal pay-free **grep scope**, not from the
no-fake-money or no-computed-metric laws, and it grants **no link path** from any teacher page. A teacher
following links can never arrive there.

---

## 6. Forbidden-by-law destinations, per role (recorded so no later spec "helpfully" adds them)

| Role | Must never be link-reachable | Why |
|---|---|---|
| Teacher | Any admin page (all 64), incl. `finance.html` (any `#view=`), `staff.html`, `settings.html`, `teacher-performance.html`, `certificates.html`, `library.html` | Admin surface + L1 (finance/salaries carry pay vocabulary by construction) + the B-07 exemption is admin-only |
| Family | Any admin page (all 64); any currency/amount/pay-action rendering on its own pages | Admin surface + **L2** zero-pay hard line. Legacy family *did* have a Payments module (2 pages) — the rebuild deliberately renders billing **status-first, amount-free**; a real payments surface is a later backend/integration spec (053/054), never a link added under a freeze |
| Student (child-view) | Any admin page; any Student-primary framing; any independent-role affordance | Admin surface + **L3**. There is no student role — legacy had no student login (folder/inventory/pixel-proven, Spec 021) |
| Admin | Any portal page (all 50). Portals are a **separate surface** — never the admin shell, never in admin nav (standing portal rule, Specs 012–017) | Verified **0** |
| All roles | `type=password` · `type=file` · `<canvas>` · `.pdf` / `window.open` · credential-named inputs · authored secret values · fake "Connected" chips · computed score/rank/leaderboard/percentile/chart · computed Total/outstanding/balance/profit/VAT/salary/payout | Standing no-secret / no-fake / no-fake-money censuses (031–040), all at **0** |

---

## 7. Nav-state truth (the one honest lock, and what it is *not*)

| State | Count | Where |
|---|---:|---|
| `planned` items | **0** | sitewide (Spec 040 milestone) |
| `[data-coming-soon]` | **0** | sitewide |
| `FUTURE_ROUTES` | **`{}`** | `nav.config.js` |
| **Honest locks** (`status:'disabled'`) | **1** | `classSalaryReport` |

`classSalaryReport` renders as:

```html
<button type="button" class="nav-item is-disabled" data-nav="classSalaryReport"
        data-nav-status="disabled" aria-disabled="true"
        data-disabled-reason data-reason-key="nav.reason.finance" title="…">
```

⇒ non-anchor ✅ · **no `href`** ✅ · `aria-disabled` ✅ · reason-bearing ✅ · lock-marked (`#i-lock`) ✅ ·
**route-less** ✅ · **not** `planned` ✅.

**It is a capability lock, not a permission.** It says "a real class-salary report implies computed per-class
pay, which the no-fake-money + pay-free laws forbid until a backend exists" (Spec 038). It does **not** say
"you are not allowed to see this". Any later spec that treats a `disabled` nav item as an access control has
misread it. `finance-analysis` is **absent** from `nav.config` and from all 115 built pages ✅ — correctly never
invented.

---

## 8. What Spec 041 changes here

**Nothing.** This matrix is a *record of the verified state*, produced by the freeze. The two reachability
results (0 / 0), the three role laws (all green), the false-positive warning, the B-07 exemption and the
single honest lock are **frozen as of `21502af`** and must be re-provable, unchanged, by every subsequent spec.

Explicitly **out of scope for 041** and owned elsewhere. *(Every spec number below is a **recorded maintainer-amendment
slot** in `040-settings-deep-links-subpages/future-owner-register.md` §1 — **not** a chartered spec. 041 invents no
spec number; see the roadmap-provenance caveat in `spec.md` §1 and the full table in `carry-forward-register.md`.)*

| Concern | Owner |
|---|---|
| Real route/API denial, session roles, RBAC, sensitive-data isolation, anti-poaching | **Spec 043** |
| Legacy capability reconciliation (incl. the 5 legacy finance sidebar destinations — `/management/accounting`, `/management/expense`, `/management/analysis-expenses`, `/management/analysis-invoices`, `/management/payouts` — that have no current top-level nav item) | **Spec 042** |
| Teacher-portal full review · Family & Student portal full review | **Specs 049 · 050** |
| Payment / WhatsApp / Zoom / Meet integrations (the only honest way a family ever sees an amount) | **Specs 053 · 054** |
| Final exhaustive parity, security & production freeze | **Spec 057** |
