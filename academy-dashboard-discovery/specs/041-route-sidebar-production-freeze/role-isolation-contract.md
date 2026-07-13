# Role Isolation Contract — Spec 041

**Type**: freeze contract (binding on every subsequent spec). **Baseline**: HEAD `21502af`, branch
`feature/012-role-portal-foundation`, working tree clean, pushed (main merge `13d38af`). **Status**:
PLAN-ROUND, VERIFY-ONLY — this contract records a verified state and specifies the mutation that must prove it; it changes
no application source, no test, no HTML. Source evidence: `role-route-permission-matrix.md` (the full audit this
contract distills) and `mutation-test-register.md` §M-6 (the falsifying mutation). Do not re-derive competing
numbers from either — this file states the same facts more narrowly, for the one question its name promises:
**is the rendered link graph role-isolated, and what happens when it is deliberately broken?**

---

## 1. The contract, in one sentence

> **0 admin destinations are reachable from any of the 50 portal files; 0 portal destinations are reachable from
> any of the 64 admin files** — verified over the exact destination-matching census below, at `21502af`, and
> this must remain true, unchanged, through every future spec.

---

## 2. The verified result

| Assertion | Surfaces checked | Result |
|---|---|---|
| Admin destination reachable from **any** portal page | 50 portal files (18 family + 16 teacher + 14 student, incl. `family-child`) × every `<a href>` on each | **0** ✅ |
| Portal destination reachable from **any** admin page | 64 admin files (32 bases × 2 langs) × every `<a href>` on each | **0** ✅ |

Method: exact destination-file matching (fragment stripped per the shipped link-integrity crawl,
`tests/smoke/run.cjs:1814`) over the full 115-file corpus, cross-checked against the three portal shell-anchor
registries and the admin `nav.config.js` route table. Full derivation, per-surface breakdown, and the supporting
zero-censuses (`href="#"` 0 · empty href 0 · `javascript:` 0 · bad target 0 · AR/EN route-parity failures 0) are
in `role-route-permission-matrix.md` §§1–2 — not repeated here.

**What "reachable" does NOT mean.** This is a rendered-link-graph result, not a security boundary. See §3.

---

## 3. Binding disclaimer — hiding a nav link is not authorization

> **HIDING A NAV LINK IS NOT AUTHORIZATION.**

The product is fixtures-only, static-HTML-first, with no auth, no session, no role claim, no server, no API, no
route guard (standing architecture, Specs 001–016; Spec 041 does not alter it). A teacher who types
`finance.html` into the address bar **gets `finance.html`**, fully rendered, with its own admin sidebar. A family
member who types `staff.html` gets `staff.html`. The §2 result proves the *nav graph* contains no admin→portal or
portal→admin link — it proves nothing about what a person can retrieve by typing a URL, because URL retrieval is
unguarded for **all 115 files, for every role, today**.

| Property | Owned by | Status at 041 |
|---|---|---|
| Rendered link-graph isolation (§2) | **Spec 041 (this contract)** | **VERIFIED — 0 / 0** |
| Real route denial · API denial · session role claims · RBAC enforcement · sensitive-data isolation · anti-poaching | **Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching** (maintainer-directed roadmap slot, recorded in `040-.../future-owner-register.md` §1; *not* a chartered spec — see the roadmap-provenance caveat in `spec.md` §1 and `carry-forward-register.md`) | **NOT IMPLEMENTED — and 041 implements none of it** |

The `nav.config` `status` field (`implemented`/`disabled`) is a **presentation** flag consumed by
`components/sidebar.js`. `FUTURE_ROLE` (3 documented-but-never-rendered entries) is not a role gate either.
Nothing in this contract, or in Spec 041, may be cited as evidence that the product enforces access control.

---

## 4. The three role laws — what actually protects against leakage today

Because URL-typing has zero protection, the honest safeguard is not the nav graph — it is a set of **product
laws** constraining what a page may *render*, so that even a portal page reached by any means cannot leak the
forbidden data class. All three are re-verified at `21502af`, unchanged from their originating specs.

| # | Law | Enforced over | Shipped assertion | Result |
|---|---|---|---|---|
| **L1** | **Teacher PAY-FREE — GLOBAL.** No salary/payout/earnings/compensation/fee vocabulary in copy or source comments, anywhere in the teacher surface. | 16 teacher-portal files | `payHit` (`run.cjs:2069-2072`) · `tchPay` (`:1990-1991`) · admin-side `PAY28` (`:738`) | **0 violations** ✅ |
| **L2** | **Family ZERO-PAY hard line.** No currency figure, no amount, no pay action on any family body; billing is status-first (hour-quota + amount-free rows). | 16 family bodies (7 internals + portal home + `family-child`) | `famPay`/`payFigure` (`:1959-1960`, `:2025-2026`, `:2049-2050` — byte-identical regex, 3 sites) | **0 currency figures** ✅ |
| **L3** | **Student = CHILD-VIEW («عرض الابن»), never a primary role.** The pre-Spec-021 «لوحة الطالب»/«بوابة الطالب»/"student dashboard" framing may never render. | 14 student files | `run.cjs:1945-1950` (Spec 024 B-01) | **0 occurrences** ✅ |

These laws are what makes the §2 result meaningful rather than cosmetic: even in the (out-of-scope) case where a
future spec deliberately links across roles, L1–L3 remain the backstop against the three specific data classes
this product has committed never to leak.

---

## 5. ⚠️ False-positive warning — do not "verify" L1 with a naive grep

> **A naive `grep -i /SAR/` over the teacher portal MATCHES THE PERSONA NAME "Sara".**

`sara` is the teacher persona used across the portal since Spec 012 (personas: `st1`/`fam1`/`sara`). An
unanchored, case-insensitive `SAR` currency search matches the substring `sar` inside `Sara`, producing a
**false pay-law violation** on every teacher page that renders the teacher's own name — i.e. all 16.

**The only correct check is the shipped, word-boundary-scoped regex.** Verbatim (`run.cjs:2070-2072`):

```js
const payHit = /\b(salary|salaries|payouts?|earnings?|compensation)\b/i.test(prt.bodyText)
  || /راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/.test(prt.bodyText);
ok(!payHit, `${page}/${lang}: the teacher portal contains pay vocabulary — forbidden (FR-006)`);
```

Rules binding on every future auditor (including the recorded 042/043/049/057 amendment slots):

1. **Never** hand-roll a currency/pay grep for the teacher surface. Reuse `payHit`/`tchPay` **byte-verbatim**.
2. The **family** law (L2) *does* legitimately grep `\bSAR\b` — `famPay` (`:1959`):
   `/ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|…/i`. The word boundaries are what make it safe; strip them and
   it too matches "Sara".
3. A pay-law "failure" reported without the word-boundary regex is a **tooling defect**, not a product defect.
   Reproduce with the shipped assertion before believing it.

---

## 6. The sanctioned exemption — `teacher-performance.html`

| Fact | Value |
|---|---|
| Surface | **ADMIN** (renders `.nav-panel`, counted in the 64 — never in the 50 portal files) |
| Nav owners | `sessionsKpi` → `teacher-performance.html#view=sessions-kpi` · `monthlyPerf` → `teacher-performance.html#view=monthly` (both admin, teachers category, Spec 036) |
| Exemption | **Spec 024 B-07** — the L1 pay-free grep does not run to zero on this board; it is the ONE sanctioned admin exempt board |
| Linked from any of the 50 portal files | **ZERO** ✅ — Spec 025 repointed the teacher-home performance anchor `teacher-performance` → `teacher-reports` (`teacher-portal.js:70`), closing the adjacency that would otherwise have put an admin destination one click from a teacher |
| Still constrained | `PAY28` (`:798`) · the tabbed re-check `tp.pay` (`:1658`/`:1663`) · the fresh-load deep-link `noPay` (`:2291`/`:2296`) — all assert **no pay figure**; no computed score/rank/percentage/chart/`<canvas>` |

The exemption is narrow by construction: it exempts the *board* from the teacher-portal L1 grep **scope**, not
from the no-fake-money or no-computed-metric laws, and — critically for this contract — it grants **no link path
from any of the 50 portal files**. A teacher (or family, or student) following links can never arrive there. If
any future spec adds a link from a portal page to `teacher-performance.html`, that is precisely the class of
regression §7's mutation exists to catch.

---

## 7. The falsifying mutation (M-6) — inject an admin destination into a portal nav

Per the mutation-register law ("a test that cannot fail is not a test," `mutation-test-register.md` §1), the §2
result is not accepted as a freeze invariant until a mutation that violates it is shown to make the suite fail.
This is that mutation, reproduced here in full because it is this contract's load-bearing evidence — not a new
mutation, the same M-6 as `mutation-test-register.md` §4.

**Mutation** — `src/js/fixtures/portal.js`, `ROLE_NAV.teacher`: append a 9th item injecting an admin destination,
e.g. `{ id: 'finance', route: 'finance.html', labelKey: '…', status: 'implemented' }`. Rendered by
`components/portal-shell.js` into both the desktop `aside.pt-sidenav` and the mobile `details.pt-nav-drawer` on
all 16 teacher-portal files.

| # | Assertion that MUST fail | Site | Expected failure message |
|---|---|---|---|
| 1 | `prt.navAside === 8 && prt.navDrawer === 8` | `run.cjs:2169-2170` | `teacher-portal/ar: teacher registry count mismatch (aside 9 / drawer 9, want 8)` |
| 2 | `prt.navListAnchors === 8` | `run.cjs:2175` | `teacher-portal/ar: expected all 8 teacher nav items implemented as links, got 9` |
| 3 | the sanctioned-anchor registry (`uniq` vs `wantTch`, the 8 teacher bases + hub) | `run.cjs:2177-2178` | `teacher-portal/ar: teacher shell anchors outside {8 teacher pages, hub}: ["finance.html", …]` |
| 4 | `prt.shellAnchors.length === 19` (8×2 + hub×3) | `run.cjs:2180` | `teacher-portal/ar: sanctioned teacher shell-anchor multiset must be 19 (8×2 + hub×3), got 21` |

**Volume**: 4 messages × 16 teacher files = **64 failing lines**. The identical registry shape exists for family
(`navListAnchors === 8`, multiset 19, `run.cjs:2112-2117`/`:2133-2138`) and student (`=== 7`, multiset 17,
`:2154-2159`) — this contract requires the mutation be re-run once per role (family: inject an admin destination
into `ROLE_NAV.family`; student: into `ROLE_NAV.student`) to prove **all three** registries discriminate
independently, not just the teacher one.

**Required observations — do not overclaim what caught it:**

| Guard | Result under M-6 | Why |
|---|---|---|
| `payHit` (`:2070-2072`) / `tchPay` (`:1990-1991`) | **stays green** | scans `#page-body` **innerText**; the portal nav lives **outside** `#page-body`. A pay-adjacent *destination* is invisible to a text-content pay-free regex. |
| `prt.adminMarkup` (`:1911`) | **stays green** | detects leaked admin *shell markup* (`.app-shell`/`.nav-rail`/`.nav-panel`), not an admin *link*. Injecting a link to `finance.html` does not itself render admin shell markup on the teacher page. |
| the three shell-anchor registries (`wantTch`/`wantFam`/`wantStu`) | **the only guard that fires** | they are exact-set assertions over the rendered anchor list |

**Conclusion, binding on this contract**: the role-isolation invariant "admin destinations reachable from a
portal page = 0" is enforced **solely** by the three shell-anchor registries. No pay-free regex, no admin-markup
probe, and no other census substitutes for them. This is also their known limitation (recorded as gap **G-5** in
`mutation-test-register.md` §6): they are per-role **hand-written base lists**, so a new portal page added by a
future spec must have its base added to `wantTch`/`wantFam`/`wantStu` by hand, or the registry's exact-set check
silently stops covering it. Recorded here, not resolved — resolving it is scoped to the future portal-review
slots (recorded maintainer-amendment entries **049**/**050**, not chartered specs; `carry-forward-register.md`).

**And again**: this mutation proves the *nav surface* is isolated. It proves nothing about permission enforcement
— that remains **Spec 043**'s, and only Spec 043's, to build (§3).

---

## 8. What Spec 041 freezes here

**Nothing changes.** This contract records the verified state at `21502af` — the §2 result, the three role laws
(§4), the false-positive trap (§5), the B-07 exemption's zero-portal-link fact (§6), and the M-6 falsification
proof (§7) — as a **freeze**: every subsequent spec must re-prove all of it, unchanged, or explicitly declare and
justify a supersession per the standing supersession law. **No source, test, or HTML file is touched by THIS
CONTRACT** — role isolation is verified, not modified. (Spec 041 as a whole *does* touch source and tests, but only
for D-1 and D-3; neither goes anywhere near the portal/admin link graph, and the 50 portal files stay **byte-identical
as whole files**.)

Out of scope for 041, recorded so no later spec "helpfully" assumes it is already done:

| Concern | Owner |
|---|---|
| Real route/API denial, session roles, RBAC, sensitive-data isolation, anti-poaching | **Spec 043** (recorded slot, not chartered) |
| Deriving the shell-anchor registries from `ROLE_NAV` instead of hand-written base lists (G-5) | **Specs 049 / 050** (recorded slots, not chartered) — only if a portal page is ever added |
| Legacy capability reconciliation | **Spec 042** (recorded slot, not chartered) |
| Final exhaustive parity, security & production freeze | **Spec 057** (recorded slot, not chartered) |

---

## 9. Cross-references

- `role-route-permission-matrix.md` — the full audit this contract distills (§§1–2 reachability derivation, §5
  the B-07 exemption in full, §6 forbidden-by-law destination table, §7 the honest-lock nav-state truth).
- `mutation-test-register.md` §4 M-6, §6 gap G-5 — the falsifying mutation and its known limitation, reproduced
  in §7 above.
- `count-and-freeze-contract.md` §1 — the 115/64/50/1 file partition (64 admin + 50 portal + 1 index = 115).
- `spec.md` §1 — the roadmap-provenance caveat governing every "Spec 042/043/049/050/057" reference in this file.
- `carry-forward-register.md` — the full table of recorded maintainer-amendment slots and their scope.
