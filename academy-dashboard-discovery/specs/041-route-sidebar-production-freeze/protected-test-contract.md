# Protected-Test Contract — Spec 041 (Plan Round)

**Baseline**: HEAD `21502af` (Spec 040 committed · PR #13 merged · `main` merge `13d38af` · both on `origin/main` ·
ahead 0 / behind 0 · tree clean except the Spec-041 artifacts + `.specify/feature.json`).
**Suite line numbers**: `app/tests/smoke/run.cjs`, `app/tests/a11y/run.cjs`, `app/tests/screenshots/capture.cjs`
at `21502af`. Every line quoted below was read from the file, not recalled.
**Instrument**: this file is the **plan-round disposition** of the test surface. `protected-test-register.md` is the
**specify-round** register (what may never change, what already changed, what 041 must add). Where the two differ,
the difference is **declared here** (§0.3) — never silently.
**Decisions are CLOSED**: D-1 = **Option A / the MOVE architecture**; D-2 = **Option A / orphan frozen**;
D-3 = **the one-line `langUrl()` fix**. This contract does not re-open them and creates no rival counts.

---

## 0. The law, and the one amendment the plan round makes to it

### 0.1 The supersession law (restated, binding)

| # | Rule |
|---|---|
| **L-1** | A protected assertion may never be **WEAKENED**. It may only tighten (narrow a regex, raise a floor, add a conjunct) or be **re-targeted** when its subject has honestly ceased to exist. Lowering a floor, widening an allowlist, deleting a conjunct or `skip`-ping a case is forbidden. |
| **L-2** | **A test may never be the reason the product lies.** (Spec 040, Option B, rejected verbatim.) |
| **L-3** | Every supersession ships **six** artefacts: old code (byte-verbatim) · new code (byte-verbatim) · evidence · reason · preserved neighbours · a mutation proof. |
| **L-4** | A supersession is **declared** — in the plan text **and** in an inline code comment. Never performed silently. |
| **L-5** | **Zero-deletion.** A render branch/handler that becomes unexercised is RETAINED; its guard becomes a vacuous-but-retained assert. |
| **L-6** | The amendment budget is **small and named**. |

### 0.2 The Spec-041 amendment budget (exhaustive — nothing outside this list may change)

| Class | Count | Sites |
|---|---|---|
| **Protected-assert supersessions (D-1 relocations)** | **5** | `smoke:88` · `smoke:111` · `smoke:115` · `smoke:747`+`:752` · `smoke:1494-1495` |
| **0-diff-wall supersessions (D-3)** | **1** | `src/js/enhance.js` (`langUrl`, one expression) — **not a test supersession** |
| **Induced matrix relocations (a11y / screenshots)** | **2 + 6 rows** | `a11y:215` · `a11y:293` · `capture:226,290,291,294,367,368` — coverage rows, **not honesty asserts** |
| **Documentation corrections** | **2** | FR-020 (`smoke:2580` comment) · FR-021 (vacuity note) — **not supersessions** |
| **Additive coverage blocks** | **7** | A-1 … A-7 (§5) |
| **Everything else** | **0** | BYTE-VERBATIM (§1) |

### 0.3 Declared divergence from `protected-test-register.md` (AMENDMENT A-0)

`protected-test-register.md` §0 L-6 and §5 state *"Spec 041 takes **zero** supersessions … its whole test delta is
additive."* That statement was **true of the specify round**, where D-1's fix was deliberately left unchosen:
the same register's §5 **T-06** writes the route-uniqueness assert *"to fail"* on
`teachers`/`addTeacher`/`teacherCategories` and says *"No fix is applied or chosen here … `/speckit.plan` selects
it."*

The plan round selects **Option A (MOVE)**. That selection **necessarily** converts a deliberately-failing assert
into a product fix, and a product fix to `teachers.html` **necessarily** moves the host of two form surfaces from
drawers to tabs. **Therefore the budget is amended from 0 to exactly 5 protected-assert supersessions + 1 wall
supersession** — enumerated in §2 and §3, each with its six L-3 artefacts. No further amendment is authorised. This
is the amendment, declared, not a contradiction discovered later.

### 0.4 Roadmap-provenance caveat

Spec 041 is the only chartered spec in the committed corpus beyond 040. **Specs 042–057 (incl. 044, 056, 057) are a
maintainer-directed, append-only amendment, not chartered specs.** Every ownership hand-off in this file inherits that
caveat.

---

## 1. BYTE-VERBATIM — the protected set Spec 041 may not touch

Any edit to a line in this section, for any reason, is a spec failure. The five D-1 sites (§2) and the two FR-020/021
documentation lines (§4) are the **only** lines of `run.cjs` that Spec 041 is permitted to modify.

### 1.1 Role laws (the five hard lines)

| ID | Site | Assertion | Law |
|---|---|---|---|
| **P-01** | `smoke:2069-2072` | `payHit` — `/\b(salary\|salaries\|payouts?\|earnings?\|compensation)\b/i` + `/راتب\|رواتب\|أجر\|مستحقات\|غرامة\|مكافأة/` on the teacher-portal body | teacher **PAY-FREE GLOBAL** |
| **P-02** | `smoke:1990-1991` | `tchPay` — the same two regexes on the 7 teacher **internal** pages | teacher pay-free (extended set) |
| **P-03** | `smoke:1959-1960` | `famPay` on the 7 family internal pages | family **ZERO-PAY** |
| **P-04** | `smoke:2025-2026` **and** `smoke:2049-2050` | `payFigure`, twice byte-identically (family-portal home · family-child) | family zero-pay hard line |
| **P-05** | `smoke:1945-1950` | child-view — `!/لوحة الطالب\|بوابة الطالب\|student dashboard/i` | student **CHILD-VIEW** |
| **P-06** | `PAY28` `smoke:738`, used at `:751`, `:784`, `:798`; `noPay` `:1658`/`:1663`, `:2291`/`:2296` | admin teacher surfaces carry **no pay figure**; `teacher-performance.html` = the sanctioned Spec-024 **B-07** exempt board, linked from **zero** portal pages | teacher pay-free, admin side |
| **P-07** | `smoke:1031-1124` | finance: 4 tiles · 9 invoices · 6 payments · 9 planned cards · 9 `inv-*` drawers · the `forbidden` regex · no-mutation · no-receipt | finance **NO-FAKE-MONEY** |
| **P-08** | `smoke:894-909` | reports: 7 `.report-card` · 8 tiles · source-link · `deadHash === 0` in the reports body | reports body **finance-free forever** |

> **P-06 carries a D-1 consequence — a COVERAGE HOLE THAT MUST BE CLOSED ADDITIVELY, NOT BY EDITING P-06.**
> `smoke:745-748` greps `document.getElementById('page-body').innerText`. `innerText` **excludes `[hidden]`
> subtrees**. After the MOVE, the add + categories forms live in `#page-body` inside `[data-tabpanel][hidden]`
> panels, so their text is **invisible to `PAY28` as currently written**. `PAY28` and its `ok(!kb.pay, …)` line stay
> **byte-verbatim** (P-06 is protected); the hole is closed by the **additive** panel-scoped grep **A-6.3**
> (`textContent` over `[data-tabs="teachers"] [data-tabpanel]`, all panels, hidden included). Net effect: teacher
> pay-free coverage on `teachers.html` is **strictly larger** after 041 than before.
> Source evidence that the moved body is pay-free by construction: `components/teacher-actions.js:44-59`
> `teacherFields()` emits firstName · lastName · firstNameAr · lastNameAr · email · phone · status · subjects ·
> level · courses (+ city · country when `withGeo`) + a notes textarea + `cvGate()` — **zero** salary / rate / fine /
> payout / currency control, and the CV control is a `<button …data-disabled-reason>`, never `<input type="file">`.

### 1.2 Count / menu / route freezes

| ID | Site | Assertion |
|---|---|---|
| **P-09** | `smoke:2583` | `pub.length === 115` (57 bases × 2 + `index.html`) + the per-base language-mirror assert |
| **P-10** | `smoke:1391` | `navCount32 === 50` on every admin page × 2 langs |
| **P-11** | `smoke:1576` · `:2400` · `:2506` · SOURCE `:2554` | the same **50** at four further independent sites |
| **P-12** | `smoke:1782` | `nav010.railCats === 6` |
| **P-13** | `smoke:1784` | `finMembers` = the exact 8-id finance membership, in order |
| **P-14** | `smoke:1787-1788` | `banksInReports && !banksInAdmin`; `admItems.length === 5 && !admItems.includes('banks')` |
| **P-15** | `smoke:1796-1801` | sessions-badge localized-fixture asserts + `famTitle` |

### 1.3 Link integrity / honest state

| ID | Site | Assertion |
|---|---|---|
| **P-16** | `smoke:145-147` + `:180` | `deadNav === 0` |
| **P-17** | `smoke:1805-1823` | `links010.deadHash === 0` · `external === 0` · `badTarget === 0` (`href="#"` = 0 sitewide) |
| **P-18** | `smoke:1829-1836` | `truth010.badPlanned === 0` · `truth010.badDisabled === 0` — `badPlanned` is **vacuous-but-retained** (§4, FR-021) |
| **P-19** | `smoke:2111` · `:2132` · `:2153` · `:2174` | `prt.plannedNavAnchors === 0`, four times byte-identically — vacuous-but-retained since Spec 025 |
| **P-20** | `smoke:891`/`:909` · `:1014`/`:1057` | body-scoped `href="#"` = 0 |
| **P-21** | `smoke:247-254` | the Spec-040 zero-census `zeroPlanned.planned === 0 && zeroPlanned.comingSoon === 0` |
| **P-22** | `smoke:1574` | `nav040.planned === 0 && nav040.comingSoon === 0` per admin page × 2 langs |
| **P-23** | `smoke:1196-1200` · `:1387-1388` | the `a31` / `g32` honesty gates (gate floor `>= 20`; may be raised, never lowered) |

### 1.4 The `classSalaryReport` lock probe — five sites, all byte-verbatim

| ID | Site | Assertion |
|---|---|---|
| **P-24** | `smoke:1728-1732` → `:1742` | `walletIds = ['classSalaryReport']`; `walletOk` = status `disabled` ∧ `aria-disabled` ∧ `use[href="#i-lock"]` |
| **P-25** | `smoke:1770-1776` → `:1793` | `nav010.lockedFin = ['classSalaryReport']` + `data-reason-key === 'nav.reason.finance'` |
| **P-26** | `smoke:2398` | finance route block: non-anchor ∧ disabled ∧ reason ∧ lock icon ∧ **no `href`** |
| **P-27** | SOURCE `smoke:2526-2527` | `csr.status === 'disabled' && csr.reasonKey === 'nav.reason.finance' && !csr.route` |
| **P-28** | `smoke:1786` | `finLinks` = the 7 implemented finance ids in DOM order (Spec-038 supersession, itself now protected) |

**Forbidden move, restated:** the retired planned-item click probe may **NOT** be repointed at `classSalaryReport`.
A `disabled` lock is categorically **not** a `planned` item — different status, different hook
(`data-disabled-reason` + `data-reason-key` + `#i-lock` vs `data-coming-soon`), different copy.

### 1.5 The `nav.config` SOURCE audit (`smoke:2512-2555`) — byte-verbatim in full

| ID | Assertion |
|---|---|
| **P-29** | `!('materials' in FUTURE_ROUTES)` · `!('certificateRequests' in FUTURE_ROUTES)` |
| **P-30** | `byId('admin','materials').route === 'library.html#view=materials'` · `certificateRequests → 'certificates.html#view=requests'` · `books → 'library.html#view=books'` |
| **P-31** | = **P-27** (the `csr` honest-lock assert) |
| **P-32** | the six `SIX_ROUTES` settings entries: `status === 'implemented'` ∧ exact route string |
| **P-33** | `stillPlanned.length === 0` |
| **P-34** | `locks.length === 1 && locks[0].id === 'classSalaryReport'` |
| **P-35** | `Object.keys(FUTURE_ROUTES).length === 0` |
| **P-36** | settings category `.items.length === 7` |
| **P-37** | `allItems.length === 50` |

> **The source audit is where the D-1 route change lands without a supersession.** P-30/P-32 pin route strings for
> 9 of the 22 pre-041 deep-links; **none of them is a teachers route**. The two new teachers routes are pinned by the
> **additive** committed route-inventory table (A-2), so the source audit block is edited **not at all** — the D-1
> route strings are new *rows in a new register*, never rewrites of an existing literal.

### 1.6 Explicitly protected neighbours of the D-1 edits (same line, same constant — must not drift)

| Neighbour | Site | Byte-verbatim value |
|---|---|---|
| `FORM_DRAWERS_032.teacher` (the **`teacher.html`** profile page) | `smoke:88`, second half of the line | `teacher: ['trn-edit', 'trn-note'],` |
| `PICKERS_032.family` | `smoke:111`, second half of the line | `family: ['fam-cat'],` |
| `HYBRID_032.reports` / `.library` | `smoke:115` | `reports: ['rep-fbcat'], library: ['lib-cats']` |
| `PICKERS_032.teacher` | `smoke:110` | `teacher: ['trn-assign-course', 'trn-assign-group', 'trn-availability'],` |
| the teachers **kebab** honesty asserts | `smoke:750`, `:753-762` | kebab count === card count · View link · Edit modal · `confirms >= 2` · `demo === 0` |
| `PAY28` + `ok(!kb.pay, …)` | `smoke:738`, `:751` | unchanged (see the P-06 note) |
| Spec-036 `sessionsKpi` / `monthlyPerf` regexes | `smoke:1496-1497` | `/…teacher-performance\.(en\.)?html#view=sessions-kpi$/` · `…#view=monthly$/` |
| Spec-036 `nav036.teachersPlanned === 0` | `smoke:1498` | unchanged |

Three of the five D-1 edits are **intra-line surgery** (`:88`, `:111`) or a same-line constant (`:115`). The
implementer must diff these lines character-by-character and prove the neighbour halves are untouched.

---

## 2. The FIVE declared D-1 supersessions (each a RELOCATION, not a weakening)

### 2.0 Why the MOVE forces exactly these five — and why each is a relocation

`field()` emits `id="f-<name>"` (`components/form-field.js`). `teacherFields('trnAdd', …)` therefore emits
`f-trnAdd-firstName`, `f-trnAdd-email`, … Rendering the same field body in **both** a tab panel and the `trn-add`
`<template data-preview>` would produce **duplicate ids the instant `enhance.js` clones the template into the live
sheet** (a template's content is inert while baked, live DOM once opened). Hence:

| Candidate shape | Verdict |
|---|---|
| tab panel **and** drawer both hold the form | **FORBIDDEN** — duplicate `f-*` ids on open |
| tab panel holds only an "Open the form" button | **FORBIDDEN** — the direct-surface law (no second click) |
| **the form MOVES into the tab panel; the drawer is removed from `teachers.html`** | **THE ONLY COMPLIANT SHAPE** — extract-and-reuse, never duplicate |

**The relocation argument (applies to all five).** The MOVE changes **the HOST**, and nothing else:

| Property | Before (drawer) | After (tab panel) | Verdict |
|---|---|---|---|
| The field body | `teacherFields('trnAdd', true)` | the **same** field body, from the same builder | identical |
| The CV control | `cvGate()` — `<button data-disabled-reason>`, never `type=file` | the same `cvGate()` | identical |
| The final | exactly ONE `.btn-primary[data-disabled-reason]` backendRequired Save | the same single gated primary | identical |
| Categories surface | list + REAL inline create form (name/status/description) + assign gate + one Save gate | the same four elements | identical |
| Persistence | none (inert fields; no save, no mutation) | none | identical |
| Spec-032 law ("Add/Create opens a REAL form with visible grounded fields FIRST; only the final Save is a gate") | satisfied after 1 click | satisfied with **0 clicks** (the sidebar deep-link lands on it) | **strengthened** |
| Reachability | one header button | tablist + `teachers.html#view=add` deep-link (AR **and** EN) | **strengthened** |

Nothing is deleted, softened, or made optional. Every predicate the retired asserts enforced
(**exists · has controls · has a gate · has exactly one primary · MUST-OMIT-clean · list ≥ 40 chars ·
create form ≥ 2 controls**) is **re-imposed on the new host** by A-6, at equal or greater strength. That is the
definition of a relocation.

---

### S1 — `smoke:88` — `FORM_DRAWERS_032.teachers`

**OLD (byte-verbatim)**
```js
  teachers: ['trn-edit', 'trn-add', 'trn-categories'], teacher: ['trn-edit', 'trn-note'],
```
**NEW (byte-verbatim; the `teacher:` half is untouched)**
```js
  // Spec 041 D-1 (declared supersession S1): trn-add + trn-categories are no longer DRAWERS on
  // teachers.html — their forms MOVED into the #view=add / #view=categories tab panels (duplicate
  // f-* ids make a drawer+tab pair impossible). The full 032 audit follows them: see TAB_FORMS_041.
  teachers: ['trn-edit'], teacher: ['trn-edit', 'trn-note'],
```

| L-3 artefact | Content |
|---|---|
| **Evidence** | Post-D-1 `pages/teachers.js` no longer calls `teacherAddDrawer()` / `categoriesDrawer()`; `template[data-preview="trn-add"]` and `…="trn-categories"` are **absent from `teachers.html`**. The loop at `smoke:1321-1324` pushes any absent id into `out.missing` → `ok(f32.missing.length === 0, …)` (`:1345`) would go RED **by construction**. The assertion is unsatisfiable by an honest build (Law L-1's re-target clause). |
| **Reason** | D-1 Option A (the MOVE). `trn-edit` **stays** a drawer on `teachers.html` (opened from the card kebab) and on `teacher.html`. |
| **Neighbours proven unchanged** | `teacher: ['trn-edit', 'trn-note']` (same line) · every other `FORM_DRAWERS_032` key (`families`/`family`/`students`/`student`/`courses`/`course`/`groups`/`group`/`reports`/`finance`/`staff`/`certificates`/`library`/`settings`/`attendance`) · `NESTED_FB_032` · the guard `if (FORM_DRAWERS_032[page] \|\| PICKERS_032[page])` (`:1304`) still fires for `teachers` because the key survives with `['trn-edit']`. |
| **Not a weakening** | `trn-edit` keeps the **entire** 032 audit (fieldless / noGate / multiPrimary / omitLeak / canvas). The two removed ids are **not dropped from the audit** — A-6.1 re-runs the *identical* predicate function over their new panels. Coverage moves; it does not shrink. |
| **Mutation (must go RED)** | Ship the add tab with **zero** `field()` controls (or with the Save final ungated). A-6.1 fails (`fieldless`/`noGate` non-empty). Also: restore `teacherAddDrawer()` **and** the add panel → the duplicate-id guard (A-6.5) fails. |

---

### S2 — `smoke:111` — the picker register entry

**OLD (byte-verbatim)**
```js
  teachers: ['trn-categories'], family: ['fam-cat'],
```
**NEW (byte-verbatim; the `family:` half is untouched)**
```js
  // Spec 041 D-1 (declared supersession S2): the teachers picker entry is removed — the categories
  // surface is no longer a drawer. Its list + honest final are re-asserted on the categories TAB
  // panel (TAB_FORMS_041 / A-6.2), with the SAME predicates (list ≥ 40 chars + a gated final).
  family: ['fam-cat'],
```

| L-3 artefact | Content |
|---|---|
| **Evidence** | `PICKERS_032` is consumed at `:1333-1338`: for each id it requires `template[data-preview="<id>"]` **with** a `[data-disabled-reason]` **and** ≥ 40 chars of text. With no such template on `teachers.html`, `out.pickerBad` = `['trn-categories']` → `ok(f32.pickerBad.length === 0, …)` (`:1351`) RED by construction. |
| **Reason** | D-1 MOVE. |
| **Neighbours proven unchanged** | `family: ['fam-cat']` (same line) · `PICKERS_032.student` / `.course` / `.group` / `.teacher` / `.reports` / `.library` / `.staff` (`:107-112`) — all byte-verbatim. `PICKERS_032.teacher` (the **profile** page: `trn-assign-course` · `trn-assign-group` · `trn-availability`) is a **different key** and is untouched. |
| **Not a weakening** | The two predicates the picker register enforced — *the surface renders a real candidate list* (`text ≥ 40`) and *its final is an honest gate* (`[data-disabled-reason]`) — are re-imposed verbatim on the categories panel by A-6.2. |
| **Mutation (must go RED)** | Strip the category list from the categories panel (leave the create form only) → A-6.2 `text >= 40` fails. Replace the Save gate with a `data-demo-action` toast → A-6.2 gate assert fails. |

---

### S3 — `smoke:115` — `HYBRID_032`

**OLD (byte-verbatim)**
```js
const HYBRID_032 = { teachers: ['trn-categories'], reports: ['rep-fbcat'], library: ['lib-cats'] };
```
**NEW (byte-verbatim)**
```js
// Spec 041 D-1 (declared supersession S3): the teachers hybrid drawer became the categories TAB
// panel; its "real create form (≥ 2 controls)" predicate is re-imposed there (A-6.2). reports +
// library are UNCHANGED.
const HYBRID_032 = { reports: ['rep-fbcat'], library: ['lib-cats'] };
```

| L-3 artefact | Content |
|---|---|
| **Evidence** | `HYBRID_032` is consumed at `:1340-1343`: `template[data-preview="<id>"]` must carry ≥ 2 `input,select,textarea`. No template ⇒ `out.hybridBad` non-empty ⇒ `:1352` RED by construction. |
| **Reason** | D-1 MOVE. |
| **Neighbours proven unchanged** | `reports: ['rep-fbcat']` and `library: ['lib-cats']` — **byte-verbatim** (their drawers are untouched by Spec 041; `pages/reports.js` and `pages/library.js` are 0-diff). |
| **Not a weakening** | The predicate ("the embedded Create is a REAL form, ≥ 2 controls") is the strictest thing `HYBRID_032` said, and A-6.2 re-imposes it on the panel **plus** three predicates it never had (exactly one primary final · MUST-OMIT clean · pay-token-free). |
| **Mutation (must go RED)** | Reduce the categories create form to a single control → A-6.2 `ctrls >= 2` fails. |

---

### S4 — `smoke:747` (probe) + `smoke:752` (assert) — the `trn-categories` existence proof

**OLD (byte-verbatim)**
```js
            cat: !!document.querySelector('[data-drawer="trn-categories"]'), catTpl: !!document.querySelector('template[data-preview="trn-categories"]') };
```
```js
        ok(kb.cat && kb.catTpl, `${page}/${lang}: teacher-categories manage drawer/template missing`);
```
**NEW (byte-verbatim; strictly stronger — 2 predicates → 6)**
```js
            // Spec 041 D-1 (declared supersession S4): the categories surface MOVED drawer → tab.
            // The honesty guarantee is unchanged and re-asserted on its NEW HOST, with more
            // conjuncts than the old existence check carried (list · create form · gate · one final).
            cat: !!document.querySelector('[data-tabs="teachers"] [data-tab="categories"]'),
            catPanel: (() => {
              const pn = document.querySelector('[data-tabs="teachers"] [data-tabpanel="categories"]');
              if (!pn) return null;
              return {
                text: (pn.textContent || '').trim().length,
                ctrls: pn.querySelectorAll('input,select,textarea').length,
                gates: pn.querySelectorAll('[data-disabled-reason],[data-confirm]').length,
                primaries: pn.querySelectorAll('.btn-primary[data-disabled-reason]').length,
              };
            })() };
```
```js
        ok(kb.cat && kb.catPanel && kb.catPanel.text >= 40 && kb.catPanel.ctrls >= 2
          && kb.catPanel.gates >= 1 && kb.catPanel.primaries === 1,
          `${page}/${lang}: the teacher-categories surface (relocated drawer → tab by Spec 041 D-1) lost its tablist entry / list / create form / backendRequired final — ${JSON.stringify(kb.catPanel)}`);
```

| L-3 artefact | Content |
|---|---|
| **Evidence** | `[data-drawer="trn-categories"]` was rendered by `pages/teachers.js` as the `pageHeader` **secondary** button; both the button and the template are removed by D-1 (§ *ROUTES AFTER D-1* / *HEADER BUTTONS*). The old query returns `null` → `kb.cat === false` → RED by construction. |
| **Reason** | D-1 MOVE **plus** the header-button removal (a header button cannot become a tab-selector: `selectTab()` requires the button **inside** `[data-tabs]` (`enhance.js:242-273`); and it cannot become a same-page anchor: there is **no `hashchange` listener**, so `href="teachers.html#view=categories"` clicked *from* `teachers.html` changes the fragment without switching the tab). |
| **Neighbours proven unchanged** | `PAY28` (`:738`) · `kb.cards` / `kb.kebabs` / `kb.pay` fields · `ok(kb.kebabs > 0 && kb.kebabs === kb.cards, …)` (`:750`) · `ok(!kb.pay, …)` (`:751`) · the whole kebab-popover honesty block (`:753-762`) — **all byte-verbatim**. |
| **Not a weakening** | Old = 2 existence booleans. New = the tablist entry exists **∧** the panel exists **∧** it renders a real list (`text ≥ 40` — the retired `PICKERS_032` predicate) **∧** a real create form (`ctrls ≥ 2` — the retired `HYBRID_032` predicate) **∧** an honest gate **∧** exactly one primary final (the retired `multiPrimary` predicate). Four retired predicates are **absorbed** here; two more are added. |
| **Mutation (must go RED)** | (a) Delete the categories tab from `tabs({group:'teachers'})` → `kb.cat` false. (b) Ship the panel without the create form → `ctrls >= 2` fails. (c) Ship two gated primaries in the panel → `primaries === 1` fails. (d) Restore the old drawer *instead of* the tab → RED (the old assert would be GREEN — proving the two are not interchangeable and the new one discriminates). |

---

### S5 — `smoke:1494-1495` — the Spec-036 teacher anchor regexes

**OLD (byte-verbatim)**
```js
        ok(anchorOk036(nav036.at, /(^|\/)teachers\.(en\.)?html$/), `${page}/${lang}: addTeacher must be a real anchor → teachers.html, got ${JSON.stringify(nav036.at)}`);
        ok(anchorOk036(nav036.tc, /(^|\/)teachers\.(en\.)?html$/), `${page}/${lang}: teacherCategories must be a real anchor → teachers.html, got ${JSON.stringify(nav036.tc)}`);
```
**NEW (byte-verbatim)**
```js
        // Spec 041 D-1 (declared supersession S5): the two Spec-036 fold-anchors gain DISTINCT
        // fragments. Pre-041 all three teacher items (teachers/addTeacher/teacherCategories) landed
        // on the SAME bare teachers.html — three nav items, one destination. The predicate
        // (anchorOk036 = anchor ∧ ¬coming-soon ∧ regex) is UNCHANGED; only the regex is TIGHTENED
        // from "the file" to "the file AND the exact view fragment".
        ok(anchorOk036(nav036.at, /(^|\/)teachers\.(en\.)?html#view=add$/), `${page}/${lang}: addTeacher must be a real deep-link → teachers.html#view=add, got ${JSON.stringify(nav036.at)}`);
        ok(anchorOk036(nav036.tc, /(^|\/)teachers\.(en\.)?html#view=categories$/), `${page}/${lang}: teacherCategories must be a real deep-link → teachers.html#view=categories, got ${JSON.stringify(nav036.tc)}`);
```

| L-3 artefact | Content |
|---|---|
| **Evidence** | `nav.config.js:54-56` — `teachers`, `addTeacher`, `teacherCategories` all carry the **byte-identical** `route: 'teachers.html'`. After D-1 the latter two carry `'teachers.html#view=add'` / `'#view=categories'`; the old `…html$` anchors would no longer match. |
| **Reason** | D-1 route split: deep-links 22 → **24**, plain routes 27 → **25**, route-less lock **1**, menu total **50** (24 + 25 + 1). The teachers triple ceases to be a duplicate destination. |
| **Precedent** | **Spec 037 A1** did exactly this — retargeted the `nav035` route regexes (`families.html` → `families.html#view=categories`; `student.html#view=…` → `students.html#view=results\|evaluation`) while leaving `anchorOk` untouched. The corpus already classifies that as a re-target, not a weakening. |
| **Neighbours proven unchanged** | `smoke:1493` `anchorOk036` (the predicate itself) · `:1496` `sessionsKpi` regex · `:1497` `monthlyPerf` regex · `:1498` `nav036.teachersPlanned === 0` · the whole `nav036` probe (`:1485-1492`) — **byte-verbatim**. The `nav037`/`nav039`/`nav040` blocks: untouched. |
| **Not a weakening** | `…html$` → `…html#view=add$`: the new regex matches a **strict subset** of the old (`$`-anchored, fragment-mandatory). Anything the old regex rejected, the new one also rejects. A tightening by construction. |
| **Mutation (must go RED)** | Re-collapse either route to bare `'teachers.html'` → RED here **and** at detector **X-8** (duplicate `{file, fragment}`) **and** at A-2 (the committed route table). Typo the fragment (`#view=adds`) → RED here **and** at **X-3** (dead-hash resolution). |

---

### 2.6 One INDUCED effect of S1 that must be compensated (not a sixth supersession)

`smoke:1358-1375` — the "behavioural proof" loop — picks the **first VISIBLE** `[data-drawer="<id>"]` trigger from
`FORM_DRAWERS_032[page]` (`trg.offsetParent` truthy) and opens it.

* **Today** it selects `trn-add` (the page-header primary) and asserts the sheet opens with `ctrls >= 1` + a gate.
* **After S1** `FORM_DRAWERS_032.teachers = ['trn-edit']`, whose only trigger lives **inside the kebab popover** →
  `offsetParent` is `null` → `openable32 === null` → **the behavioural block silently skips for `teachers`.**

That silent skip would be a **loss of behavioural coverage smuggled in under a structural edit** — precisely what
Law L-1 forbids. It is compensated, mandatorily, by **A-6.4** (the tab-panel behavioural proof: click the
`add` / `categories` tabs and assert the panel becomes the *only* visible panel of the `teachers` group and renders
its controls + gated final) and by **A-6.6** (open `trn-edit` **from the kebab**, exactly as `capture.cjs:498`
already does for the teacher kebab, so the drawer path keeps a behavioural test). The loop code at `:1358-1375` is
**not edited** — only the register it reads changes, and the compensators are additive.

---

## 3. The ONE D-3 supersession — a **0-diff-wall** supersession, not a test supersession

**Instrument being superseded**: the Spec-040 **0-diff wall** (13 files declared byte-identical), which lists
`src/js/enhance.js`. **No assertion in any suite is edited by D-3.**

| | |
|---|---|
| **Site** | `src/js/enhance.js:237-241` (`langUrl`), called at `:552-553` |
| **OLD (byte-verbatim)** | `return lang === 'en' ? `${base}.en.html` : `${base}.html`;` |
| **NEW (byte-verbatim)** | `return (lang === 'en' ? `${base}.en.html` : `${base}.html`) + location.hash;` |
| **Evidence** | `langUrl` reads `location.pathname` only and never `location.hash`; `:552-553` does `location.href = langUrl(l)`. Live headless reproduction: `finance.html#view=banks` → EN → `finance.en.html`, **hash gone**, visible tab reverts to the baked `overview`. |
| **Contrast (do NOT "fix" the sidebar)** | `components/sidebar.js` `langRoute()` is already hash-aware (Spec 035) and preserves the fragment. Route parity therefore splits into **two** contracts: **sidebar parity = CORRECT today**; **topbar language-switch parity = DEFECTIVE today, fixed by 041**. |
| **Bounds** | ONE function, ONE expression. `location.hash` already carries its own `#` (or is `''`). No new hook · no storage key · no dependency · no redesign of the language control · `sidebar.js` untouched · every other `enhance.js` function 0-diff. |
| **Explicitly NOT adopted** | `location.search` preservation. The **current** helper already drops it (it only ever read `pathname`); the app is static and uses no query strings; preserving `search` is a behaviour change **beyond** the minimal fix. **Recorded, not silently done.** |
| **Preserved neighbours** | Every protected assert (§1) · the `#step=` wizard fragment (preserved *by* the fix) · the `#child=` CSS-`:target` fragment (likewise) · `initTabs` precedence (`enhance.js:261-273`) untouched. |
| **Mutation (must go RED)** | **M-D3-1**: delete `+ location.hash` → the A-4 rows T1–T7 fail at assertion **A2** (hash empty) and **A3** (the visible panel is the baked default). **M-D3-3**: author it as `+ '#' + location.hash` → **A5** (`##view=banks`) and **A6** (trailing `#` on a hash-less route) fail. **T8 must stay GREEN under M-D3-1** — it is the control row; if it goes red, the row is mis-authored. |

**The test-design trap (binding on every D-3 row).** `settings.html` renders **two** `[data-set-lang]` elements: the
topbar language **menu** (JS-injected by `openPopover()` into `document.body`) and the **Customization tab's real
language control** (`components/settings-section.js`, baked in `#page-body`, carries `data-lang-opt`). A bare
`document.querySelector('[data-set-lang="en"]')` hits the **Customization control** — which routes through the same
handler, so the test would **pass while proving nothing**. Every D-3 row **must** (1) click
`[data-action="lang-menu"]`, (2) assert the popover opened, (3) click `.popover [data-set-lang="<lang>"]` (or
`[data-set-lang]:not([data-lang-opt])`). An unscoped selector is a **test defect** and is rejected in review.

---

## 4. FR-020 / FR-021 — DOCUMENTATION corrections, **not** supersessions (closes Q-8)

**The classification rule, applied once and consistently:** an edit is a **supersession** iff it changes what an
assertion **accepts or rejects** (its logic, its regex, its floor, its register, its subject). An edit that changes
**no truth value for any input** is **documentation**. Neither FR-020 nor FR-021 changes a truth value.

| ID | Site | Change | Class | Why not a supersession |
|---|---|---|---|---|
| **FR-020** | `smoke:2580` | `// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====` → **`// ===== Spec 041 — route/page count freeze: 57 bases × 2 languages + index = 115 =====`** | **DOC** | A **comment**. The assertion two lines below (`pub.length === 115`, `smoke:2583` = **P-09**) is **byte-verbatim** and its behaviour is identical before and after. The comment was stale from Spec 035 (113 → 115) onward; 041 is the re-freeze, so the header must state the frozen number. |
| **FR-021** | `smoke:1829-1836` (P-18) + a new comment beside it | Add an inline note recording `truth010.badPlanned` as **vacuous-but-retained** (the filter `[data-nav-status="planned"]` selects an empty set sitewide since Spec 040) | **DOC** | The assert is **byte-verbatim** and **retained** (Law L-5). The comment explains *why* it can never be non-empty and *why it stays*: it is the tripwire that fires the day a `planned` item returns. Precedent: the suite already documents `plannedNavAnchors === 0` as vacuous at `smoke:237-240`. |

**Consequence of the rule:** neither FR-020 nor FR-021 requires an L-3 six-artefact package, and neither counts
against the amendment budget (§0.2). They **do** require the L-4 inline comment, which is what they *are*.

**The vacuous-but-retained register Spec 041 re-publishes (never deletes):**

| Guard | Site | Vacuous since | Retained because |
|---|---|---|---|
| `prt.plannedNavAnchors === 0` | `:2111` / `:2132` / `:2153` / `:2174` | Spec 025 | `components/portal-shell.js:30` still renders an `is-planned` branch |
| `truth010.badPlanned === 0` | `:1829-1830`, `:1835` | Spec 040 | `components/sidebar.js`'s planned branch + `enhance.js`'s `data-coming-soon` handler are RETAINED |
| `zeroPlanned.planned === 0 && .comingSoon === 0` | `:247-254` | born vacuous by design | it **is** the freeze, stated positively |
| `nav040.comingSoon === 0` | `:1574` | Spec 040 | per-page twin |
| `Object.keys(FUTURE_ROUTES).length === 0` | `:2551` | Spec 040 | forbids the map's resurrection |

---

## 5. Additive coverage (A-1 … A-7) — new blocks, zero protected edits

> **Naming reconciliation (binding — these are ONE set of blocks under two labels, never rival sets).** This contract
> labels the additive blocks **A-1…A-7**; `plan.md` §9, `quickstart.md` §3.1 and `mutation-execution-contract.md` §3
> label the same work **T-01…T-10** (the canonical numbering reserved by `protected-test-register.md` §5). The map:
>
> | A-block (here) | T-id (plan / quickstart / mutation contract) |
> |---|---|
> | **A-1** derived group-aware route matrix + detectors X-1…X-9 | **T-01** (seeded matrix) · **T-02** (fragment resolution) · **T-06** (repeated-destination census) · **T-07** (group-aware fragment ownership) |
> | **A-2** committed route-inventory literal | **T-03** |
> | **A-3** the 24 seeded deep-links | **T-01** (its runtime half) |
> | **A-4** D-3 language-hash rows T1–T8 | **T-10** |
> | **A-5** orphan-set guard | **T-05** |
> | **A-6** D-1 tab-surface honesty block | *(net-new; no pre-reserved T-id — it is the S1–S4 relocation compensator)* |
> | **A-7** E-10 matrix floor | **T-08** |
> | *(AR/EN route-parity rule)* | **T-04** — asserted by detector **X-4** inside A-1 |
> | *(the `run.cjs:2580` comment + the FR-021 vacuity note)* | **T-09** — documentation corrections, §4 |

Every block below is **appended**; none rewrites an existing assertion. Where a new block duplicates an existing
literal (e.g. the settings routes), **both run**: the literal is the hand-committed expectation, the derived row is
the machine check (FR-009 / Q-9 requires both).

| # | Block | Instrument | Mutation that must turn it RED |
|---|---|---|---|
| **A-1** | **Derived route matrix** — build the 50 rows from `NAV_CATEGORIES` (flattened incl. `sections[]`), **group-aware** per E-04 (each row records the `[data-tabs]` group that owns its tab id; every DOM query is scoped `[data-tabs="<group>"] [data-tabpanel="<view>"]`). Runs the nine detectors **X-1 … X-9** of `derived-route-matrix-contract.md`. | new smoke block (Node source parse + built DOM, AR + EN) | X-1: point a route at a nonexistent file · **X-2**: repoint `settingsUsers` → `staff.html` (a *real but wrong* page — today **nothing** catches this; gap **G-1**) · X-3: rename a `data-tab` id (`customization` → `customisation`) · X-8: re-collapse `addTeacher` onto bare `teachers.html` |
| **A-2** | **Committed route-inventory table** (FR-009 / Q-9) — the 50-row expected table is transcribed **as a literal constant** into the test from `route-inventory-contract.md` §1–6 and compared against the source-derived tuples. **Never re-derived from `nav.config.js` a second time** (that would be circular: a nav edit would silently redefine its own expectation). | new smoke constant + comparison | edit any one of the 50 routes/statuses in `nav.config.js` → RED against the literal, even though the source-derived matrix agrees with itself |
| **A-3** | **The 24 seeded deep-links** — for every `#view=` route × 2 langs: a **FRESH `browser.newContext()`**, `localStorage['academy.schedView.<group>']` **pre-seeded to a different existing tab id of that group**, then `goto <file>[.en].html#view=<view>`; assert `count([data-tabs="<group>"] [data-tabpanel]:not([hidden])) === 1` **and** it is the target, and external requests === 0. **[R-1 — STRICTLY ADDITIVE]** The four hand-written literal arrays (`SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS`, the Spec-038 finance array) are **RETAINED VERBATIM AND PERMANENTLY** — nothing is "folded in", nothing is deleted, no assertion logic is changed. The derived matrix is the generic **freeze layer**; the existing blocks remain **domain-specific regression coverage**. Folding or deleting any of them would constitute a **sixth protected-test supersession**, which the S1–S5 budget FORBIDS. | new smoke block | flip `initTabs` (`enhance.js:266-272`) from `hash \|\| stored` to `stored \|\| hash` → **all 24 rows fail**. Today only the **9** seeded rows would; the **13** unseeded ones (familyCategories · studentResult · studentEvaluation · sessionsKpi · monthlyPerf · monthlyReports · dataAnalysis · invoices · monthlyInvoices · salaries · staffSalaries · payments · banks) would stay green, and the two baked-default-coincident rows (`materials` on `library`, `settingsGeneral` on `settings`) would pass **even with JavaScript disabled**. |
| **A-4** | **D-3 language-hash block** — rows **T1–T8** with assertion set **A1–A9** (`d3-language-hash-contract.md` §7): T1 `finance.html#view=banks`→EN (the live-reproduced defect) · T2 `settings.html#view=security`→EN (the **trap page**, popover-scoped) · T3 `library.en.html#view=books`→AR (EN→AR direction) · T4 `teachers.html#view=add`→EN (**new D-1 deep-link**) · T5 `teachers.en.html#view=categories`→AR · T6 `add-family.html#step=children`→EN (**wizard fragment**) · T7 `family-child.html#child=st6`→EN (CSS `:target`; also proves the shared asset reaches **portal** pages) · T8 `dashboard.html` (**no fragment** — the control row: the fix adds nothing where there was nothing). T1–T5 additionally carry **A4** (stored view pre-seeded to a *different* view). | new smoke block | **M-D3-1** (revert the one-line fix) → T1–T7 RED at A2/A3, **T8 stays GREEN** · **M-D3-3** (`+ '#' + location.hash`) → A5/A6 RED · **M-D3-2** (unscoped `[data-set-lang]`) → the row still *passes*: it is a **review-gate** mutation documenting the trap, not a CI assertion |
| **A-5** | **Orphan-set guard (D-2)** — compute the live orphan set (a built file that is never an `href` target across all 115 files after fragment-stripping, is not linked from `index.html`, and carries no `nav.config` route) and assert it is **exactly** `{gallery.html, gallery.en.html}` — cardinality 2, **both members named**, never merely `=== 2`. | new smoke block (test-only; **0 app-source / 0 HTML diff**) | add a `PAGES` entry with no inbound link → set grows to 3 → RED · give `gallery` an inbound link → set shrinks to 1 → **also RED** (the guard freezes the *exception itself*, not a floor) |
| **A-6** | **D-1 tab-surface honesty block** — the relocation compensators (§5.1) | new smoke block + `TAB_FORMS_041` register | see §5.1 |
| **A-7** | **E-10 matrix floor** — every deep-linked view carries **≥ 2 a11y rows** and **≥ 2 screenshot frames**. Audit of the existing matrices: **only `settingsUsers` is short** (`a11y:209` = its single row, en/light/desktop; `capture:429` = its single frame, ar/light/desktop). Add **exactly one** a11y row + **exactly one** frame for `#view=users`. **Do NOT multiply the whole matrix.** | +1 a11y row, +1 capture frame | delete a deep-link's second row → the floor assert RED. **NB** `capture.cjs:545` is `process.exit(0)` — screenshot console-error counts are **advisory**, so a floor there is a discipline enforced in review, not by CI |

### 5.1 A-6 — the D-1 tab-surface honesty block (the compensators, in detail)

An additive register, mirroring `FORM_DRAWERS_032`'s shape so the two cannot drift apart:

```js
// Spec 041 D-1 — form surfaces hosted by a TAB PANEL (not a drawer). The SAME audit() predicate
// function used for FORM_DRAWERS_032 runs over these panels: fieldless / noGate / multiPrimary /
// omitLeak(password|file|secret|pay-named|canvas). A moved form is audited exactly like a drawered one.
const TAB_FORMS_041 = {
  teachers: [
    { group: 'teachers', view: 'add',        minCtrls: 13 },  // teacherFields('trnAdd', true) = 13 field()
                                                          //   controls (incl. the notes textarea); the CV upload
                                                          //   GATE is emitted INSIDE teacherFields(), not beside it
    { group: 'teachers', view: 'categories', minCtrls: 2  },  // the real inline create form
  ],
};
```

| # | Assertion | Replaces / strengthens |
|---|---|---|
| **A-6.1** | Run the **identical** `audit()` predicate (`smoke:1308-1320`) over `[data-tabs="teachers"] [data-tabpanel="add"]`: `ctrls >= minCtrls` (**a FLOOR — may be raised, never lowered**; the exact live-built control count is pinned by the implement round against the built DOM) · `gates >= 1` · `primaries === 1` · **`omitLeak === 0`** (no `input[type=password]`, no `input[type=file]`, no `pass\|secret\|api-key\|token\|webhook\|otp\|salary\|hour-rate\|fine\|payout\|iban\|cvv`-named control, no `<canvas>`) | the retired `FORM_DRAWERS_032.teachers` audit of `trn-add` (S1) |
| **A-6.2** | The same `audit()` over `[data-tabpanel="categories"]`, **plus** `text >= 40` (real list) and `ctrls >= 2` (real create form) | the retired `PICKERS_032.teachers` (S2) **and** `HYBRID_032.teachers` (S3) — both predicates absorbed |
| **A-6.3** | **`PAY28.test(panel.textContent)` === false** for **every** `[data-tabs="teachers"] [data-tabpanel]`, hidden panels included | **closes the `innerText` hole** the MOVE would otherwise open in **P-06** (§1.1 note). P-06 itself stays byte-verbatim; this is net-new coverage |
| **A-6.4** | **Behavioural**: click the `add` tab, then the `categories` tab; after each, exactly **one** panel of the `teachers` group is visible and it is the clicked one; the panel renders its controls + its single gated final; **no drawer opens** | compensates the induced skip of the `:1358-1375` behavioural loop (§2.6) |
| **A-6.5** | **Duplicate-id guard**: `teachers.html` (AR + EN) contains **zero** `template[data-preview="trn-add"]` and **zero** `template[data-preview="trn-categories"]`; and no `f-trnAdd-*` id appears more than once in the document after opening the `trn-edit` drawer | the id-collision argument of §2.0 becomes a **test**, so a future "helpful" restoration of the drawer alongside the tab fails immediately |
| **A-6.6** | `trn-edit` still opens **from the kebab** with controls + a gated final (the kebab-hosted drawer path keeps a behavioural test, exactly as `capture.cjs:498` drives the teacher kebab) | preserves the drawer-mechanism coverage that `FORM_DRAWERS_032.teachers = ['trn-edit']` asserts only structurally |
| **A-6.7** | **Header-button absence**: `#page-body` on `teachers.html` renders **no** `[data-drawer="trn-add"]` and **no** `[data-drawer="trn-categories"]` trigger; the tablist is the affordance | prevents a silent re-introduction of the second-click pattern the direct-surface law forbids |

### 5.2 Induced matrix relocations (a11y + screenshots) — **mandatory, and silent-failure-prone**

Both suites swallow a missing selector: `a11y/run.cjs:349` is `await p.click(s.open).catch(() => {})` and
`capture.cjs:499` is `await page.click(\`[data-drawer="${s.openDrawer}"]\`).catch(() => {})`. After D-1 the rows below
would therefore **still "pass"** — as ordinary, drawer-less page scans/frames. That is a **silent degradation**, not a
failure, and it is exactly the class of rot this contract exists to prevent. They are relocated, not deleted:

| Suite | Site | Old row | New row | Note |
|---|---|---|---|---|
| a11y | `:215` | `{ page:'teachers', lang:'ar', theme:'light', open:'[data-drawer="trn-add"]' }` | `{ page:'teachers', lang:'ar', theme:'light', hash:'#view=add' }` | the open-form a11y scan (focus order · labelled controls) now scans the **panel**; `hash` is already supported (`a11y:127`, `:311-330`) |
| a11y | `:293` | `{ page:'teachers', lang:'ar', theme:'light', viewport:'mobile', open:'[data-drawer="trn-add"]' }` | `{ page:'teachers', lang:'ar', theme:'light', viewport:'mobile', hash:'#view=add' }` | the mobile-390 reflow proof (`.wiz-grid` → one column) follows the form |
| a11y | **+1 new** | — | `{ page:'teachers', lang:'en', theme:'light', hash:'#view=categories' }` | the categories panel had **no** a11y row when it was a drawer beyond `sp028`; the E-10 floor (≥ 2 rows per deep-linked view) requires AR **and** EN coverage for both new views — the implement round adds exactly the rows needed to reach the floor, no more |
| screenshots | `:226` (`sp028-categories`) · `:294` (`sp032-trn-categories-form`) · `:368` (`sp036-teacher-categories`) | `openDrawer:'trn-categories'` | `view:'categories'` | `view:` is the existing capture flag for `#view=` (`capture:311-325`, `:414-420`) |
| screenshots | `:290` (`sp032-trn-add`) · `:291` (`sp032-trn-add-mobile`) · `:367` (`sp036-add-teacher`) | `openDrawer:'trn-add'` | `view:'add'` (mobile row keeps `vp:'mobile'`) | the historical `sp028`/`sp032`/`sp036` frame **variants are kept** — the visual regression baseline stays comparable across specs |
| screenshots | **+1 new** | — | `{ page:'settings', …, view:'users', … }` second frame | E-10 / A-7: `settingsUsers` is the only view below the ≥2-frame floor (`capture:429`) |

**Classification**: these are **coverage-matrix rows**, not honesty assertions. They carry no `ok()` and gate no law.
They are recorded here (rather than in the matrix files alone) because a silently-degraded row is indistinguishable
from a passing one, and because `capture.cjs`'s `process.exit(0)` means no CI signal would ever surface it.

---

## 6. The test-file edit budget (exhaustive; anything else = a spec failure)

| File | Lines EDITED | Lines ADDED | Lines DELETED |
|---|---|---|---|
| `tests/smoke/run.cjs` | **6 assertion/register lines** (`88`, `111`, `115`, `747`, `752`, `1494`, `1495` — `747`+`752` count as the single site S4) + **1 comment** (`2580`, FR-020) + **1 comment** beside `1829` (FR-021) | the A-1 … A-6 blocks + `TAB_FORMS_041` + the declared inline supersession comments | **0** |
| `tests/a11y/run.cjs` | 2 rows (`215`, `293`) | ≥ 2 rows (categories coverage + the A-7 `settingsUsers` row) | 0 |
| `tests/screenshots/capture.cjs` | 6 rows (`226`, `290`, `291`, `294`, `367`, `368`) | 1 frame (A-7) | 0 |

**Zero deletions, anywhere, in any suite.** Every removal above is a **replacement in place** with a declared inline
comment (L-4/L-5).

---

## 7. Anti-patterns — explicitly forbidden while implementing this contract

| # | Forbidden | Why |
|---|---|---|
| **F-1** | Keeping the `trn-add` / `trn-categories` templates on `teachers.html` "so the old asserts stay green" | duplicate `f-*` ids on drawer open; and it would make the old asserts pass while the product carries two rival hosts for one form. A test may not be the reason the product is wrong (L-2, inverted). |
| **F-2** | Deleting the add-teacher **capability** — i.e. dropping the field body, shipping the `add` panel without the 13 `field()` controls / the CV gate / the single gated Save, or leaving `pages/teachers.js` as the only place the fields are defined | zero-deletion (L-5) protects **capabilities**, not symbols. The **decided** disposition (`d1-teacher-route-contract.md` §6, mirrored in `plan.md` §3.3) is: **export** `teacherFields()` as the one definition · **repurpose** `teacherAddDrawer()` → `teacherAddPanel()` · **remove** `addTeacherAction()` with its sole call site. Retaining `teacherAddDrawer()` as a dead-but-callable export is **rejected** — it would re-arm the `f-trnAdd-*` duplicate-id collision (F-1). `teacher-actions.js` is therefore **in the impact allowlist** (wall supersession **W-2**) — no artifact may pretend `pages/teachers.js` changes alone. |
| **F-3** | Turning either header button into a tab-selector or a same-page anchor | `selectTab()` requires the button **inside** `[data-tabs="<group>"]` (`enhance.js:242-273`); and there is **no `hashchange` listener**, so a same-page `href="teachers.html#view=add"` changes the fragment without switching the tab. Both header buttons are **removed**; the tablist + the sidebar deep-links are the affordance. |
| **F-4** | Repointing the retired planned-item click probe at `classSalaryReport` | a disabled lock is categorically not a planned item (§1.4). |
| **F-5** | Lowering `a31.gates >= 20`, widening `payHit`/`famPay` into substring matches ("improving" `\bSAR\b` — it would false-positive on the persona **Sara**), or `skip`-ping any case | L-1. |
| **F-6** | A page-global `[data-tabpanel]` query in any new test | E-04. Every query is scoped `[data-tabs="<group>"] …`. Do **not** impose a permanent "one tabs widget per page" rule — detector **X-9** (no two groups on one page may declare the same tab id) is the correct, non-constraining guard. |
| **F-7** | A bare `[data-set-lang]` selector in any D-3 row | the settings trap (§3). |
| **F-8** | Re-deriving the A-2 expected route table from `nav.config.js` | circular; a nav edit would redefine its own expectation (FR-009 / Q-9). |
| **F-9** | Sweeping `common.backendRequiredNote` ("…nothing is **saved** yet", EN, ~50 pages) | assigned to **Spec 044**, which owns the shared modal/drawer/long-form interaction system and is the **default `reasonKey` of `formDrawer()`** (`components/preview-drawer.js`). Out of a route/sidebar freeze's impact boundary. (Provenance caveat, §0.4.) |

---

## 8. Acceptance — what "the protected set held" means for Spec 041

1. `git diff` of `tests/smoke/run.cjs` shows **exactly** the 6 assertion/register lines + 2 comments of §6, each with
   an adjacent declared supersession comment (L-4). Every other line of §1 is **byte-identical** — proven by
   `git show 21502af:app/tests/smoke/run.cjs`, never by `git stash` / `reset --hard` / `checkout --` / `clean`.
2. The five S1–S5 packages each carry their six L-3 artefacts **and** a demonstrated RED→GREEN mutation.
3. The D-3 wall supersession carries its bounds, its non-adopted `search` note, and the **M-D3-1** revert-mutation
   proof (T1–T7 RED, **T8 GREEN**).
4. A-1 … A-7 are green, and each has been shown to go **RED** under its named mutation. A block that cannot be made
   to fail is not evidence and does not count.
5. The frozen counts re-verify: **115 HTML · 57 PAGES · 64 admin · 50 portal · 1 index · 6 categories · 50 menu ·
   49 implemented · 0 planned · 1 disabled · 24 deep-links · 25 plain · 1 route-less · `FUTURE_ROUTES = {}` ·
   coming-soon 0 · honest locks = `classSalaryReport` only · orphan set = exactly `{gallery.html, gallery.en.html}` ·
   `finance-analysis` absent.**
6. The `#page-body` md5 comparison against `21502af` shows **exactly two** changed bodies: `teachers.html` and
   `teachers.en.html`. The other 62 admin files differ **only** in the shared sidebar's two `href` fragments; the 51
   non-admin files have **byte-identical bodies** — and, for this build, **byte-identical WHOLE FILES**: `enhance.js`
   is copied verbatim to **`public/assets/js/enhance.js`** (there is **no bundler and no `assets/app.js`**) and every
   page references it through an **unversioned** literal `<script src>`, so the asset's *content* changes while not one
   HTML byte does. This is a *generated-shared-asset* change (L2), never a body change (L4) — the five-level impact
   taxonomy of `impact-protection-contract.md` §2 applies.

---

## 9. Cross-references

`protected-test-register.md` (the specify-round register; §0.3 declares the one divergence) ·
`mutation-test-register.md` (M-1 … M-8 + gap **G-1**, which detector **X-2** closes) ·
`derived-route-matrix-contract.md` (TAB_GROUP_REGISTRY · the 50 rows · detectors X-1 … X-9 · the S-1 sanctioned
duplicate `salaries ≡ staffSalaries → finance.html#view=salaries`) ·
`route-inventory-contract.md` (the committed 50-row expectation A-2 transcribes) ·
`d3-language-hash-contract.md` (T1–T8 · A1–A9 · M-D3-1…4 · the settings trap) ·
`d2-gallery-orphan-contract.md` (the orphan guard A-5) · `count-and-freeze-contract.md` (the frozen partition) ·
`impact-boundary.md` (the five-layer impact distinction and the 0-diff wall) · `spec.md` §7 (D-1 A–G · D-2 · D-3),
FR-009 · FR-011 · FR-020 · FR-021 · E-04 · E-10 · Q-8 · Q-9.

---

## R-2 / R-3 — THE TWO TEST-RUNNER STRENGTHENINGS (added at the tasks-reconciliation gate)

These are **runner-gate strengthenings**, **NOT** protected-assert supersessions. The amendment budget stays
**exactly S1–S5**. Neither creates an S6 or S7. Neither weakens, relocates or deletes any assertion — each makes an
**already-claimed** result *machine-enforced* for the first time.

### R-2 — `serious` a11y violations become a machine gate

**The defect (verified live at `21502af`).** `app/tests/a11y/run.cjs:374-376`:

```js
console.log(`\n[a11y] critical=${critical} serious=${serious}`);
if (critical > 0) { console.error('A11Y FAILED: critical violations present'); process.exit(1); }
process.exit(0);
```

The runner exits non-zero on **`critical > 0` ONLY**. `serious` is counted, printed and (at `:368`) warned — but it
**never fails the suite**. Every spec from 031 to 040 has reported "**critical=0 serious=0**"; the first half was
enforced, the second half was **an unenforced claim**. A production freeze may not certify a result its own suite
does not gate.

**The ruling.** The runner MUST exit non-zero when **`critical > 0` OR `serious > 0`**.
- The detailed per-row reporting is **preserved** (no output is removed).
- **No threshold, no allowlist, no suppression, no ignore-list** is permitted. `serious` is not "budgeted" — it is zero.
- The **baseline must first be demonstrated at 0/0** on the unmodified runner, so the gate is proven to be tightening
  a *already-true* invariant rather than papering over an existing failure.
- **Proof obligation:** inject one synthetic `serious` violation → the runner MUST exit non-zero. Remove it → green.

**Classification:** strengthening. `tests/a11y/run.cjs` enters the test-file budget and the scope guard.

### R-3 — screenshot console errors become a machine gate

**The defect (verified live at `21502af`).** `app/tests/screenshots/capture.cjs` (tail):

```js
const withErrors = results.filter((r) => r.errors.length).length;
console.log(`\n[screenshots] ${results.length} captured · ${withErrors} with console errors`);
process.exit(0);
```

It **always exits 0** — even when `withErrors > 0`. Console errors are counted and printed, then ignored. "0 console
errors" has been reported as a pass condition for many specs while being, mechanically, only a *log line*.

**The ruling.** The runner MUST exit non-zero when the captured console-error count is **> 0**.
- Successful capture behaviour and the summary line are **preserved** when errors === 0.
- **No suppression, no filtering, no ignored-console allowlist**, no "known-noise" exception.
- **Proof obligation:** inject one console error on one captured page → the runner MUST exit non-zero. Remove it → green.

**Classification:** strengthening. `tests/screenshots/capture.cjs` enters the test-file budget and the scope guard.

### Budget after R-1/R-2/R-3

| Kind | Count | Items |
|---|---|---|
| Protected-test **supersessions** | **5** | S1 `:88` · S2 `:111` · S3 `:115` · S4 `:747-752` · S5 `:1494-1495` — each a **relocation** |
| **Wall** supersessions | **2** | W-1 `enhance.js` (exactly one line, D-3) · W-2 `teacher-actions.js` (field-body extraction) |
| Test-runner **strengthenings** | **2** | R-2 a11y `serious` gate · R-3 screenshot console-error gate |
| Deleted assertions / deleted coverage | **0** | The four hand-written deep-link arrays are **retained verbatim** (R-1) |
