# Spec 041 — Implementation Status

**Status**: IMPLEMENTED · **Baseline**: HEAD `21502af` (Spec 040 · PR #13 · merge `13d38af` on `origin/main`)
**Branch**: `feature/012-role-portal-foundation` · **No commit / no push** — the watcher commits.

Spec 041 froze the route/sidebar surface and fixed **three** defects. It is not a redesign.

---

## 1. The three defects

| # | Defect | Fix | Proof |
|---|---|---|---|
| **D-1** | Three sidebar items — `teachers`, `addTeacher`, `teacherCategories` — carried the **identical href** `teachers.html`. "Add Teacher" promised a form and delivered the directory; the three were indistinguishable by outcome. | **The MOVE.** `teachers.html` gains a 3-tab hub (`directory` · `add` · `categories`) on the **existing** `tabs()`/`#view=` engine. The `trn-add` and `trn-categories` **forms moved** into real tab panels; their drawers and both header triggers are **gone**. | `#view=add` renders **13** `field()` controls, **1** primary gated Save, **0** drawer buttons, **0** file/password inputs. **0** duplicate ids. |
| **D-2** | `gallery.html`/`.en` are orphans with no documented owner or entry path. | **Frozen.** Direct-URL-only by design; owner = the frontend/design-system maintainer. An additive guard pins the orphan set at **exactly** those two. **0 source, 0 HTML change.** | A new orphan **and** gallery gaining an inbound link both fail. |
| **D-3** | `enhance.js:237` `langUrl()` built the mirrored URL from `location.pathname` **alone** — a topbar language switch **destroyed the fragment**: `finance.html#view=banks` → `finance.en.html`, silently reverting to the baked default tab. | **One expression**: `+ location.hash`. Preserves `#view=`, `#step=` (add-family wizard) and `#child=` (family-child). `location.search` deliberately **not** preserved. `sidebar.js` untouched (it was already hash-aware since Spec 035 — this was a **topbar-only** defect). | 7 cases green, incl. a **no-fragment control row** (a page without a hash must not gain one). |

## 2. Final counts (all verified on the built output)

| Metric | Before | After |
|---|---|---|
| Pages · `PAGES` | 115 · 57 | **115 · 57** |
| Admin menu · implemented · planned · disabled | 50 · 49 · 0 · 1 | **50 · 49 · 0 · 1** |
| **Route split** deep / plain / route-less | **22 / 27 / 1** | **24 / 25 / 1** (= 50) |
| `FUTURE_ROUTES` · honest locks | `{}` · 1 | **`{}` · 1** (`classSalaryReport`) |
| Orphan set | 2 | **exactly 2** (gallery ×2) |

**Impact**: **2 page bodies changed** (`teachers.html`, `teachers.en.html`) · **62 sidebar-only** · **51 byte-identical**
= 115. **0-diff wall: all 12 files identical.** `teacher.html` = sidebar-only (body byte-identical; only the two
teacher hrefs differ). D-3 changed **zero HTML bytes** (`enhance.js` is a verbatim `cpSync` copy to
`public/assets/js/enhance.js`; there is no bundler and no `assets/app.js`).

## 3. Amendment budget (exhaustive, as declared)

**5 protected-test supersessions — each a RELOCATION, not a weakening** (the form, its 13 fields, its CV gate, its
single backendRequired Save and its honesty are unchanged; only the **host** moved from a drawer to a tab):

| # | Site | Change |
|---|---|---|
| **S1** | `smoke:88` | `FORM_DRAWERS_032.teachers: ['trn-edit','trn-add','trn-categories']` → `['trn-edit']` |
| **S2** | `smoke:111` | the picker register's `teachers` entry removed |
| **S3** | `smoke:115` | `HYBRID_032` drops `teachers` (reports/library byte-verbatim) |
| **S4** | `smoke:747`+`:752` | the `trn-categories` **drawer/template** presence assert → the **categories TAB PANEL** assert (same guarantee, new host) |
| **S5** | `smoke:1494-1495` | the Spec-036 fold-anchor route asserts → the **exact hashes** `#view=add` / `#view=categories` |

**2 wall supersessions**: **W-1** `enhance.js` (one expression, D-3) · **W-2** `teacher-actions.js` (field-body
extraction). **2 runner strengthenings** (R-2/R-3, below). **0 deleted assertions** — the four hand-written
deep-link arrays (`SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS`, the Spec-038 finance block) are **retained
verbatim** (R-1) and still pass.

## 4. The two runner strengthenings — and the honest finding behind them

**This spec discovered that two results the project has reported since Spec 031 were never actually enforced.**

- **R-2** — `tests/a11y/run.cjs:375` exited non-zero on **`critical > 0` only**. `serious` was counted, printed and
  warned — and then **ignored**. Every spec reported "critical=0 serious=0"; the second half was an **unenforced
  claim**. The runner now gates **`critical > 0 || serious > 0`**. No threshold, no allowlist, no suppression.
- **R-3** — `tests/screenshots/capture.cjs` **always** `process.exit(0)`. "0 console errors" was a **log line**, not
  a gate. It now exits non-zero when the captured console-error count > 0.

Both are **strengthenings**, not S6/S7. The baseline was demonstrated at **0/0** and **0 console errors** *before*
either gate was added (T006/T007), so each tightens an already-true invariant rather than hiding an existing failure.

## 5. The eight silently-degrading rows

`a11y:215`, `a11y:293` and `capture:226, 290, 291, 294, 367, 368` all opened `[data-drawer="trn-add"]` /
`trn-categories`. After the MOVE those drawers do not exist — and **both runners `.catch(() => {})` a missing
selector**, so all eight would have **kept passing while silently auditing the teachers *directory*** instead of the
form. All eight are relocated to `#view=add` / `#view=categories`, with historical frame names preserved.

**A derived finding**: `categories` had **ZERO** a11y rows before 041 (only screenshots covered it) — a **gap, not a
relocation**. Two genuine rows were added. `settingsUsers` had 1 row + 1 frame → +1 each to reach the ≥2 floor.

## 6. Verification

| Gate | Result |
|---|---|
| Build | **115** pages · `PAGES` 57 |
| Smoke | **PASS** — 114 page loads |
| A11y (**under the new R-2 gate**) | **critical = 0 · serious = 0** |
| Screenshots (**under the new R-3 gate**) | **375 captured · 0 console errors** |
| 0-diff wall | **12/12** byte-identical |
| Impact | **2 bodies · 62 sidebar-only · 51 byte-identical = 115** |

**Derived route freeze** (all additive): a group-aware matrix over all **49** implemented routes (destination exists
in both languages · fragment resolves to a real `[data-tab]` **and** `[data-tabpanel]` in its **owning group** ·
GROUPS map asserted complete, no orphan entries) · the **repeated-destination census** (exactly **one** sanctioned
repeat: **S-1** `salaries` + `staffSalaries` → `finance.html#view=salaries`; the teachers triple is no longer a
repeat) · **all 24 deep-links SEEDED** (AR+EN = 48 executions; a conflicting stored view is pre-seeded so the URL
hash must **win**) · the orphan-set guard · the direct-surface proof.

> **Before 041 only 9 of the 22 deep-links were seeded.** A regression of `initTabs` from `hash || stored` to
> `stored || hash` would have passed the other 13 and been caught only by those 9. That hole is now closed.

## 7. Mutations — 16/16 executed (RED, all restored)

**Correction.** The first implementation pass executed only **6** of 16 (a batch script timed out) yet reported
"142/142 complete". **That was invalid.** The remaining **10** were executed in a dedicated completion pass, each in
a **fresh isolated copy** of a proven-green tree (one mutation per copy; every copy `diff`-verified byte-identical
to the golden *before* mutating). The primary tree was never touched and **no `git` command was ever run inside a
copy**.

| # | Mutation | Result |
|---|---|---|
| **M-1** | `staff` → `staff-members.html` (nonexistent) | **RED** exit 1 · **66** — `1 link(s) to a nonexistent page file` |
| **M-2** | `staff` → `library.html` (**real but wrong**) | **GREEN first ⚠ → RED after T-03** exit 1 · **1** — `route-register: staff must route EXACTLY to "staff.html", got "library.html"`. **See §10.** |
| **M-3** | wrong `#view=` fragment (`#view=bogus`) | **RED** — no `[data-tab="bogus"]` / no `[data-tabpanel="bogus"]` |
| **M-4** | the disabled lock rendered as an `<a>` | **RED** exit 1 · **83** — `1 disabled nav item(s) missing button/aria-disabled/reason` |
| **M-5** | `settingsUsers` implemented → `planned` | **RED** exit 1 · **203** — `sitewide planned must be 0 (got planned=1, coming-soon=1)` |
| **M-6** | sidebar `langRoute()` drops the fragment | **RED** exit 1 · **587** — every EN deep-link collapses (**EN-only**, as predicted) |
| **M-7** | revert the D-3 `+ location.hash` (**topbar**) | **RED** — hash lost; the panel fell back to the seeded stored view |
| **M-8** | admin `finance` injected into `ROLE_NAV.teacher` | **RED** exit 1 · **64** — `teacher shell anchors outside {8 teacher pages, hub}: [..."finance.en.html"...]`; multiset `19 → 21` |
| **M-9** | a 58th `PAGES` base | **RED** exit 1 · **2** — `must hold exactly 115 HTML pages …, got 117` |
| **M-10** | a 51st nav item | **RED** exit 1 · **204** — `admin menu must stay 50, got 51` (×4 sites) + `route-register: UNREGISTERED nav item(s) ["staffExtra"]` |
| **M-11** | a new built page with **no inbound route** | **RED** exit 1 · **2** — orphan set **grew** |
| **M-12** | the gallery **gains** an inbound link | **RED** exit 1 · **1** — orphan set **SHRANK** to `["gallery.en.html"]`. Proves the guard pins the exception **exactly**, not an orphan *maximum*. |
| **M-13** | `addTeacher` → bare `teachers.html` | **RED** — S5's hash assert + the repeated-destination census |
| **M-14** | restore the `trn-add` drawer beside the tab | **RED** — **13 duplicate ids**, `f-trnAdd-firstName` ×2. **The empirical proof the MOVE was forced, not a preference.** |
| **M-15** | one synthetic **serious** a11y violation | **RED** — exit **1** (`0 critical + 1 serious`) |
| **M-16** | one injected **console error** | **RED** — exit **1**, names the offending frame |

**Residue: 0.** All isolated copies destroyed; the golden worktree removed (`git worktree list` = the primary only).
`nav.config.js` re-verified **byte-identical** to the intended final version (50 · 24/25/1 · planned 0 · lock 1 ·
no `staffExtra`/`bogus`/`gallery-copy`/`orphan-test` id). **No stash / reset / checkout / clean; the branch was
never switched.**

---

## 10. THE FINDING THIS PASS PRODUCED — gap G-1 was still open

Executing **M-2** (`staff` repointed at `library.html`, a **real but wrong** page) passed the **entire suite** —
**exit 0, zero failing assertions**.

The derived route matrix (T053) only proves a destination **EXISTS**. Nothing pinned the **25 plain routes**. Any
one of them could have been silently repointed at another real page and every gate would have stayed green. This is
gap **G-1**, named in `plan.md` §9 and in `mutation-test-register.md` §3 as *"the one required mutation the shipped
suite does not catch"*.

**Task T061 — which existed precisely to close it — was marked `[X]` with the claim "Done: 50/50 match". The block
had never been written.** The claim was false. This is recorded rather than quietly repaired, because a fabricated
completion is exactly the failure mode the mutation law exists to catch: *a test that cannot fail is not a test, and
a task that was never run is not done.*

**Closed here** by **T-03**, a strictly additive block in `tests/smoke/run.cjs`: the **`ROUTES_50` register** pins
every nav id to its exact route string, read from the nav.config **source**, and also fails on an unregistered or
missing item. It was cross-checked **50/50** against the checked-in `route-inventory-contract.md` table (the only
differing cell is `classSalaryReport`: prose `— (no route)` vs `null` — semantically identical), so the test does
**not** redefine its own expectation from the source it guards. **R-1 honoured**: nothing deleted, relaxed or
rescoped; the four hand-written deep-link arrays remain verbatim.

**M-2 re-run ⇒ RED**, one surgical assertion. **G-1 closed.**

## 8. Files changed

**Source (6)**: `nav.config.js` (2 routes) · `pages/teachers.js` (the 3-tab MOVE) · `components/teacher-actions.js`
(`teacherFields` exported; `teacherAddDrawer` → `teacherAddPanel`; `addTeacherAction` removed) · `enhance.js`
(the one D-3 expression) · `locales/ar.trn.js` + `en.trn.js` (`trn.list.tab.*` — **not** `trn.tab.*`, which is
`teacher.html`'s profile tablist and where `trn.tab.notes` is *also* a field label, and **not** `trn.board.tab.*`,
which is `teacher-performance`).
**Tests (3)**: `smoke/run.cjs` · `a11y/run.cjs` · `screenshots/capture.cjs`.

## 9. Honest notes / residual

1. **A defect in my own task text, corrected during execution**: T028/T119 demanded `teacher.html` be *whole-file*
   byte-identical. That is impossible — it is an **admin** page and renders the shared sidebar, whose two teacher
   hrefs changed. The correct invariant (**body** byte-identical; whole file differs only in those 2 lines) is what
   was verified.
2. **A false-positive I walked into**: my first draft of the panel-scoped pay grep used `/…|SAR/i` (no word
   boundary) and matched **"Sara"**, the teacher persona — the exact trap documented earlier in this spec. Replaced
   with the **protected `PAY28` regex verbatim**; the point of that assert is its **scope** (hidden panels included),
   not a stricter pattern.
3. `common.backendRequiredNote` ("…nothing is saved yet", EN, ~50 pages) remains carried forward to the
   product-wide copy sweep (**Spec 044**). Not swept here — it would exceed a route freeze's impact boundary.
5. **A PRE-EXISTING duplicate-id defect, found while verifying — NOT introduced by Spec 041, and NOT fixed here.**
   The sitewide duplicate-id census reports **30** duplicate ids: `f-fbAdd-category` / `f-fbAdd-remark` /
   `f-fbAdd-note`, three on each of **10** pages (`attendance` · `course` · `group` · `sessions` · `teacher`, ×2
   languages). They come from the **Spec-032 nested `fb-add` drawer** (a feedback form baked inside the outcome
   sheet) and are **present at baseline `21502af`** — verified directly against
   `git show 21502af:…/public/teacher.html`, which already shows the same 3.
   **Spec 041's own surface is clean**: `teachers.html` / `.en` have **0** duplicate ids (the D-1 MOVE deliberately
   removed the drawer that would have collided — see M-14).
   So the accurate claim is **"0 duplicate ids introduced, 0 on the D-1 surface"** — *not* "0 duplicate ids
   sitewide", which would be false. **No gate currently catches this**; the duplicate-id audit added by Spec 041 is
   scoped to the teachers pages. Recorded as a carry-forward defect for the owner of the `fb-add` drawer
   (Spec 032 lineage); fixing it means uniquifying the nested drawer's field names, which is a body change to 10
   pages and is **far outside a route freeze's impact boundary**.
6. **A bug in my own verification script, caught before it produced a false report.** The first impact check used
   `<div id="page-body"` — but the element is `<div class="page-pad" id="page-body">`, so the regex never matched
   and **silently fell back to hashing the whole file**, reporting **64 changed bodies**. The corrected extractor
   (`<div[^>]*id="page-body"[^>]*>` … `</main>`, with a hard assert instead of a fallback) reports the true
   **2 / 62 / 51**. A verifier that silently degrades to a weaker check is the same class of defect as the eight
   silently-degrading test rows this spec exists to fix.
4. **Roadmap provenance**: only Spec 041 is chartered in the committed corpus. **042–057 are a maintainer-directed,
   append-only amendment, not chartered specs.**
