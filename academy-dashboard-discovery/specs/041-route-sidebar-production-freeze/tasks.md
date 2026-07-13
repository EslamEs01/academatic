# Tasks: Full Frontend Route & Sidebar Production Freeze (Spec 041)

**Input**: 16 specify artifacts + 18 plan artifacts (34 files; the brief's "35" double-counts
`count-and-freeze-contract.md`, which is a specify-round artifact).
**Baseline**: HEAD **`21502af`** · branch `feature/012-role-portal-foundation` · Spec 040 committed · PR #13 merged ·
merge commit `13d38af` (on `origin/main`) · tree clean except the Spec-041 artifacts + `.specify/feature.json`.
**Pre-041 state**: 115 pages · 57 `PAGES` · menu 50 · implemented 49 · planned 0 · disabled 1 · route split **22/27/1**.
**Total tasks**: **142** (T001–T142, contiguous, no gaps, no duplicates) · **`[P]`-marked**: **25** · Sequential: **117**.

> **The two parallelism counts are deliberately kept separate** (they are not the same thing):
> **(a) `[P]`-marked implementation tasks = 25** — genuinely independent *files* and dependencies.
> **(b) Broader verification steps that may run concurrently once implementation is complete** — the read-only
> censuses of Phase 13. The *suite runs* (T093, T094, T128, T140) are **not** parallelisable and belong to neither.
> Tasks writing a **single-writer file** are **never** `[P]`, even when a different model could execute them:
> T075–T077 and T092 all write `tests/screenshots/capture.cjs`; T088–T091 all write `tests/a11y/run.cjs`;
> **T130 and T131 both write `tests/smoke/run.cjs` (correction C-1) and therefore run SERIALLY, T130 → T131.**

> **This spec fixes three defects and freezes the route surface. It is not a redesign.**
> D-1 = the **MOVE** (forced, not chosen) · D-2 = orphan frozen · D-3 = the one-line `langUrl()` fix.

---

## Binding contract

| Metric | Before | After |
|---|---|---|
| Pages · `PAGES` · admin files · portal files · index | 115 · 57 · 64 · 50 · 1 | **unchanged** |
| Admin menu · categories | 50 · 6 | **50 · 6** |
| implemented · planned · disabled | 49 · 0 · 1 | **49 · 0 · 1** |
| **Route split** deep / plain / route-less | **22 / 27 / 1** | **24 / 25 / 1** (24+25+1 = 50) |
| `FUTURE_ROUTES` · coming-soon · honest locks | `{}` · 0 · 1 | **`{}` · 0 · 1** (`classSalaryReport` only) |
| Orphan set | {gallery.html, gallery.en.html} | **exactly the same 2** |
| Page **bodies** changed | — | **exactly 2** (`teachers.html`, `teachers.en.html`) |

**Amendment budget (exhaustive).** 5 protected-test supersessions **S1–S5** (each a *relocation*) · 2 wall
supersessions **W-1** (`enhance.js`, one expression) + **W-2** (`teacher-actions.js`, field-body extraction) ·
2 test-runner **strengthenings** R-2/R-3 (**not** S6/S7) · **0** deleted assertions.

## Single-writer files (never `[P]` together)

`src/js/nav.config.js` · `src/js/pages/teachers.js` · `src/js/components/teacher-actions.js` · `src/js/enhance.js` ·
`tests/smoke/run.cjs` · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs`

## Source allowlist (widening it is a STOP)

`nav.config.js` · `pages/teachers.js` · `components/teacher-actions.js` · `enhance.js` · `locales/ar.trn.js` ·
`locales/en.trn.js`
**Tests**: `tests/smoke/run.cjs` · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs`
**Docs**: `screenshots/REVIEW.md` · `CLAUDE.md` · `app/README.md` (only if required) · the Spec-041 directory.

## MUST BE 0-DIFF

`package.json` · `scripts/build-html.mjs` · `src/js/i18n.js` · `components/sidebar.js` · `components/tabs.js` ·
`components/form-field.js` · `components/settings-section.js` · `components/preview-drawer.js` ·
`components/ui.js` (the real path — there is **no** `src/js/ui.js`) · settings fixtures · `pages/staff.js` +
`fixtures/staff-management.js` · **`pages/teacher.js`** · every portal source/fixture · every unrelated
page/locale/fixture. **No** new dependency, component, page, `PAGES` entry, `data-*` hook, `hashchange` listener or
storage key.

---

## Phase 1 — Baseline & grounding

- [X] **T001** Verify branch `feature/012-role-portal-foundation`, HEAD **`21502af`**, and that `13d38af` (PR #13)
      is on `origin/main`. **Done**: all three hold; else STOP.
- [X] **T002** Verify the tree contains **only** the Spec-041 artifacts + `.specify/feature.json` —
      `git status --porcelain` shows **0** entries under `academy-dashboard-discovery/app/`. **Done**: 0; else STOP.
- [X] **T003** Verify the pre-041 baseline from live source: pages **115**, `PAGES` **57**, admin menu **50**,
      implemented **49**, planned **0**, disabled **1**, route split **22 / 27 / 1**, `FUTURE_ROUTES` `{}`.
      **Done**: all eight exact. *(`count-freeze-contract.md`)*
- [X] **T004** Baseline build → **115** pages.
- [X] **T005** Baseline **smoke** → PASS. Record the pass line.
- [X] **T006** Baseline **a11y** on the UNMODIFIED runner → record **`critical=0 serious=0`**. This is the
      precondition for R-2: the gate must be shown to tighten an already-true invariant, never to hide an existing
      failure. **Done**: 0/0 recorded; if `serious > 0` ⇒ **STOP** (R-2 cannot be adopted without first fixing them).
- [X] **T007** Baseline **screenshots** on the UNMODIFIED runner → record **0 console errors**. Same precondition for
      R-3. **Done**: 0 recorded; if > 0 ⇒ **STOP**.
- [X] **T008** **Non-destructive baseline snapshot**: for all 115 pages record (a) whole-file md5 and (b) normalized
      `#page-body` md5, sourced from **`git show 21502af:…`** — never from a mutated worktree. Also record md5 of
      `public/assets/js/enhance.js` and of every 0-diff-wall file. Store in the scratchpad, not the repo.
      **No stash / reset / checkout / clean / branch-switch — ever.** *(`impact-protection-contract.md`)*
- [X] **T009** Re-open the cited screenshots as images: `dashboard__ar__light__desktop__cat-teachers.png`,
      `dashboard__{ar,en}__light__desktop__sp040-sidebar-zero-soon__cat-settings.png`,
      `finance__{ar,en}__light__desktop__sp038-classsalary-lock*.png`, and the current teachers frames
      (`sp028-categories`, `sp032-trn-add`, `sp036-add-teacher`). **Done**: opened; the D-1 defect (three
      identical-looking teacher links) is visually confirmed.
- [X] **T010** Verify from LIVE source, not from any report: `teacherFields()` emits **13** `field()` controls when
      `withGeo=true` (the 13th is the `notes` textarea) and **`cvGate()` is emitted INSIDE `teacherFields()`**.
      **Done**: 13 confirmed; if it is 12 or 14 ⇒ reconcile the contracts before proceeding.
- [X] **T011** Verify the caller census: `teacherAddDrawer()` and `addTeacherAction()` are called **only** by
      `pages/teachers.js`; `teacherEditDrawer()` by `teachers.js` **and** `pages/teacher.js`; `teacherNoteDrawer()`
      by `teacher.js` only. `trn-add` / `trn-categories` templates are baked **only** on `teachers.html`/`.en`.
      **Done**: confirmed ⇒ `teacher.js` stays **source 0-diff** and `teacher.html`'s **BODY** stays byte-identical. **CORRECTION**: the whole FILE cannot be byte-identical — `teacher.html` is an admin page that renders the shared sidebar, whose 2 teacher hrefs changed. It is one of the 62 sidebar-only files.
- [X] **T012** Verify the **eight silent-failure rows** exist at the cited sites and that both runners swallow a
      missing selector: `a11y:215`, `a11y:293` (`open: '[data-drawer="trn-add"]'`) and
      `capture:226, 290, 291, 294, 367, 368` (`openDrawer: 'trn-add' | 'trn-categories'`). Confirm each runner
      `.catch(() => {})` a missing target — i.e. after D-1 they would **silently pass while auditing the directory
      tab**. **Done**: all 8 located; the silent-pass hazard is reproduced.

**✅ CHECKPOINT 1** — baseline proven, evidence re-grounded, no app byte changed.

---

## Phase 2 — Planning-reconciliation gate (R-1 / R-2 / R-3)

*Spec-041 artifacts only. No app file. Implementation may not begin until this checkpoint is green.*

- [X] **T013** **R-1 — the derived route matrix is ADDITIVE.** Correct every artifact that says the derived matrix
      "replaces the four hand-written literal arrays": `plan.md`, `quickstart.md`, `protected-test-contract.md`,
      `protected-test-register.md`. Ruling: `SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS` and the Spec-038
      finance array are **RETAINED VERBATIM** with their assertion logic intact; the derived matrix is added
      **beside** them as the generic freeze layer; they remain domain-specific regression coverage. Deleting or
      folding any of them would be a **sixth supersession**, which the S1–S5 budget forbids.
      **Done**: a cross-artifact grep for "replace(s) the four hand-written" returns **0** un-corrected hits.
- [X] **T014** **R-2 — `serious` becomes a machine gate.** Record in `protected-test-contract.md`,
      `scope-guard.md` and `a11y-screenshot-contract.md`: `tests/a11y/run.cjs:375` today exits non-zero on
      **`critical > 0` only**; `serious` is counted, printed and warned but **never fails the suite**. Every spec
      since 031 has reported "serious=0" as an **unenforced claim**. Ruling: the runner must exit non-zero on
      `critical > 0` **OR** `serious > 0`; no threshold, allowlist or suppression; classified a **strengthening**,
      not S6. **Done**: all three artifacts state it; `tests/a11y/run.cjs` is in the edit budget.
- [X] **T015** **R-3 — screenshot console errors become a machine gate.** Record the same way:
      `tests/screenshots/capture.cjs` always `process.exit(0)` — console errors are counted, printed, then ignored.
      Ruling: exit non-zero when the captured console-error count **> 0**; capture output preserved when 0; no
      filtering or ignored-console allowlist; a **strengthening**, not S7. **Done**: stated; the file is in the budget.
- [X] **T016** **Reconciliation proof.** Cross-artifact search proving: (a) no "replace the hand-written matrices"
      wording survives; (b) `serious` is described as machine-gated everywhere it is claimed; (c) the console-error
      gate likewise; (d) the supersession budget is still **exactly S1–S5**; (e) R-2/R-3 are classified as
      strengthenings, **not** additional supersessions. **Done**: all five hold across the 34 artifacts; else STOP —
      **do not generate implementation work from a contradictory plan.**

**✅ CHECKPOINT 2** — the plan is self-consistent. Implementation may begin.

---

## Phase 3 — D-3: topbar language-hash preservation

*Writes `src/js/enhance.js` (wall supersession **W-1**) then `tests/smoke/run.cjs`. Serial.*

- [X] **T017** [US-D3] `src/js/enhance.js` — `langUrl()` (`:237-241`) currently builds the URL from
      `location.pathname` **only** and never reads `location.hash`; `:552-553` assigns `location.href = langUrl(l)`.
      Apply the **one-expression** fix: append `location.hash` to the mirrored URL.
      **Done**: `#view=`, `#step=` (the `add-family` wizard) and `#child=` (family-child) all survive a language
      switch. **`location.search` is deliberately NOT preserved** — the helper already drops it today and preserving
      it would exceed the minimal fix (recorded, not silent). **No new hook, storage key, dependency or
      `hashchange` listener.** *(`d3-language-hash-contract.md`; wall supersession **W-1**, declared inline.)*
- [X] **T018** Verify `src/js/components/sidebar.js` is **0-diff** — `langRoute()` is already hash-aware (Spec 035)
      and sidebar route parity is already correct. D-3 is a **topbar-only** defect. **Done**: byte-identical.
- [X] **T019** Build; verify `public/assets/js/enhance.js` is a **verbatim copy** of the edited source (the build
      `cpSync`s it; there is **no bundler and no `assets/app.js`**). **Done**: the two files are byte-identical and
      **no HTML file changed** as a result of D-3.
- [X] **T020** [US-D3] Add the D-3 smoke block to `tests/smoke/run.cjs`.
      ⚠ **TEST-DESIGN TRAP (binding):** `settings.html` renders **two** `[data-set-lang]` elements — the topbar
      language **menu** and the Customization tab's **real** language control. The test MUST open
      `[data-action="lang-menu"]` first and click the **menu's** control; an unscoped selector hits the wrong one and
      **silently proves nothing**. **Done**: the selector is topbar-scoped.
- [X] **T021** [US-D3] The D-3 cases: `finance.html#view=banks` → EN → `finance.en.html#view=banks` ·
      `settings.html#view=security` → EN · `library.en.html#view=books` → AR · `teachers.html#view=add` → EN ·
      `teachers.en.html#view=categories` → AR · one `#step=` wizard route (`add-family.html#step=<id>`) ·
      **one no-fragment control row** (a page with no hash must NOT gain one).
      Assert per case: pathname mirrored · **hash byte-preserved** · exactly **one** matching `[data-tabpanel]`
      visible in its group · a conflicting **stored view cannot override** the preserved hash · **no double hash** ·
      topbar language control remains keyboard-accessible. **Done**: all seven green.
- [X] **T022** Run smoke → PASS.
- [X] **T023** **D-3 RED→GREEN proof**: revert the `+ location.hash` in an isolated copy → the T021 block MUST fail;
      restore → green. **Done**: both recorded. *(mutation **M-7**)*

**✅ CHECKPOINT 3** — the language switch preserves every fragment family; zero HTML bytes changed.

---

## Phase 4 — D-1: field-body extraction (`teacher-actions.js`)

*Primary writer: `src/js/components/teacher-actions.js` (wall supersession **W-2**). Serial.*

> **Correction C-2 — Phase 4 is NOT teacher-actions.js-only.** **T026 is the single sanctioned cross-file edit of
> this phase**: removing `addTeacherAction()` without simultaneously removing its sole `primary:` call site would
> leave `teachers.js` importing a symbol that no longer exists — an unbuildable intermediate state. T026 therefore
> removes the export **and** its import + call site **atomically**. The **Categories** secondary trigger is *not*
> touched here; it belongs to **T035**. T026 must complete before Phase 5 edits `teachers.js` further.

- [X] **T024** [US-D1] Export `teacherFields()` **without changing its output or signature** — same 13 `field()`
      controls, same `cvGate()` emitted inside, same names (`trnAdd-*`). **Done**: the emitted string for
      `teacherFields('trnAdd', true)` is byte-identical to the pre-041 output.
- [X] **T025** [US-D1] Rename/repurpose `teacherAddDrawer()` → **`teacherAddPanel()`**, emitting the **tab-panel
      body** (the 13-control `.wiz-grid` + the CV gate + **exactly one** primary `data-disabled-reason` Save) instead
      of a `formDrawer('trn-add', …)` template.
      **Why the old symbol may not simply be retained-but-unused:** a dead-but-callable `formDrawer('trn-add', …)`
      **re-arms the `f-trnAdd-*` duplicate-id collision that the MOVE exists to prevent.** The zero-deletion law
      protects **capabilities**, not symbols — and the capability survives, relocated. **Done**: no
      `formDrawer('trn-add', …)` call remains anywhere.
- [X] **T026** [US-D1] **[C-2 — the ONE sanctioned cross-file edit of Phase 4, performed atomically]**
      Remove `addTeacherAction()` from `components/teacher-actions.js` **and, in the same task**, remove its
      **import** and its sole **`primary:` call site** from `pages/teachers.js`. Splitting these would leave
      `teachers.js` importing a deleted symbol (an unbuildable intermediate state).
      The header button cannot become a tab-selector (`selectTab` requires the button **inside** the `[data-tabs]`
      wrap) and cannot become a same-page anchor (**there is no `hashchange` listener**).
      **Scope fence**: the **Categories** secondary trigger is **NOT** touched here — it belongs to **T035**.
      **Done**: the symbol, its import and its call site are gone; no other caller exists (T011); the tree builds.
- [X] **T027** Verify `teacherEditDrawer()`, `teacherNoteDrawer()` and `teacherActions()` are **unchanged**.
      **Done**: byte-identical.
- [X] **T028** **[CORRECTED during execution — the original wording was wrong.]** Verify **`pages/teacher.js` is
      0-diff** and that **`teacher.html` / `teacher.en.html` have a BYTE-IDENTICAL `#page-body`**.
      ⚠ They **cannot** be *whole-file* byte-identical, and demanding that was an error in this task's original
      text: `teacher.html` is an **admin** page, so it renders the **shared sidebar** — whose `addTeacher` and
      `teacherCategories` hrefs change under D-1. It is therefore one of the **62 sidebar-only** files, not one of
      the 51 untouched ones. The honest invariant is: **body identical, whole file differs only in those two
      hrefs.** **Done**: `teacher.js` 0-diff; both bodies identical; the whole-file diff is exactly the 2 href lines.
- [X] **T029** [US-D1] Prove **exactly ONE** definition of the add form exists in the source tree (no second copy,
      no hidden duplicate). **Done**: `teacherFields` has one definition and one rendering path.

**✅ CHECKPOINT 4** — the field body is extracted once; `teacher.html` untouched.

---

## Phase 5 — D-1: the teachers-page MOVE

*Single writer: `src/js/pages/teachers.js`. Serial. Depends on Phase 4.*

- [X] **T030** [US-D1] Add the tab group using the **existing** engine:
      `tabs({ group: 'teachers', items: [directory, add, categories] })`. `directory` is the **baked first/default**
      tab (so bare `teachers.html` lands on it). **No new component; `components/tabs.js` stays 0-diff.**
      **Done**: one `[data-tabs="teachers"]` wrap with three `[data-tab]` / `[data-tabpanel]` pairs.
- [X] **T031** [US-D1] **directory panel** = the CURRENT page body, moved verbatim: `summaryCards` + `filterBar` +
      `cardGrid#teachers-grid` + `noResults()` + the per-teacher preview drawers + `trn-edit`.
      **Done**: the directory surface is unchanged in content; the single global `[data-no-results]` /
      filter ownership is retained (one filterable region per page — `enhance.js` contract).
- [X] **T032** [US-D1] **add panel** = `teacherAddPanel()` — the **real form, directly**. **13** `field()` controls,
      the `cvGate()` upload GATE, **exactly one** primary backendRequired Save.
      **DIRECT-SURFACE LAW**: a fresh load of `teachers.html#view=add` shows the form itself. **No "Open form"
      button. No second click.** **Done**: on fresh load the add panel contains ≥13 form controls and 0 buttons whose
      only function is to open a drawer.
- [X] **T033** [US-D1] **categories panel** = `categoriesPanel()` (repurposed from `categoriesDrawer()`) — the full
      surface, directly: the category list + the **real inline create form** (name / status / description) + the
      assign **gate** + **exactly one** primary Save gate. **Done**: fresh `#view=categories` shows the management
      surface, not a button.
- [X] **T034** [US-D1] **Remove** the `trn-add` and `trn-categories` `<template data-preview>` blocks from
      `teachers.js`. **Done**: `grep 'data-preview="trn-add"\|data-preview="trn-categories"' public/*.html` = **0**.
- [X] **T035** [US-D1] **[C-2 — scope fenced]** Remove **only** the **Categories** secondary drawer trigger
      (`secondary: button(data-drawer="trn-categories")`). The Add-Teacher `primary:` trigger was **already removed
      atomically in T026** — **do not repeat that edit**. Then **verify both are absent**.
      The **tablist + the sidebar deep-links are the affordances**. Spec 032's law ("every Add/Create opens a REAL
      form with visible grounded fields first") is satisfied *more* directly than before.
      **Done**: 0 `[data-drawer="trn-add"]` **and** 0 `[data-drawer="trn-categories"]` triggers on the page.
- [X] **T036** [US-D1] Retain the **`trn-edit`** drawer and its card-kebab trigger — fully functional.
      **Done**: the kebab opens `trn-edit`; its form is unchanged.
- [X] **T037** [US-D1] **Duplicate-ID guard**: build and assert **0** duplicate `id` attributes in the live DOM of
      `teachers.html`/`.en` — in particular exactly **one** `f-trnAdd-firstName` (and one of each `f-trnAdd-*`).
      **Done**: 0 duplicates, all three tabs considered.
- [X] **T038** Build → **115** pages (no new page, no `PAGES` entry).

**✅ CHECKPOINT 5** — `#view=add` and `#view=categories` deliver the real surfaces on a fresh load, with zero
duplicated DOM and zero extra clicks.

---

## Phase 6 — Routes & locales

- [X] **T039** [US-D1] `src/js/nav.config.js` — **exactly two** route edits:
      `addTeacher` → `teachers.html#view=add` · `teacherCategories` → `teachers.html#view=categories`.
      `teachers` stays the **plain** `teachers.html`. **Do not modify any other nav item.**
      **Done**: the `implemented ⇒ route` build guard passes.
- [X] **T040** Verify the new split: deep-links **24** · plain **25** · route-less **1** · **24+25+1 = 50**;
      menu **50**; implemented **49**; planned **0**; disabled **1**; `FUTURE_ROUTES` `{}`.
      **Done**: all seven exact. *(`count-freeze-contract.md`)*
- [X] **T041** [P] [US-D1] `src/locales/ar.trn.js` — add `trn.list.tab.directory` / `.add` / `.categories`.
      **Namespace law**: **never** `trn.tab.*` (that is `teacher.html`'s profile tablist — and `trn.tab.notes` is
      *also* the notes field label inside `teacherFields()`) and **never** `trn.board.tab.*` (that is
      `teacher-performance`). `trn.list.*` is verified free. **Done**: 3 keys added; no collision.
- [X] **T042** [P] [US-D1] `src/locales/en.trn.js` — the exact mirror of T041. **Done**: 3 keys.
- [X] **T043** Locale parity: the flattened `trn.*` key-sets of AR and EN are **identical** (0 divergence).
      **Done**: 0. Depends on T041, T042.
- [X] **T044** Raw-key audit: **0** raw locale keys rendered on any of the 115 pages. **Done**: 0.
- [X] **T045** Verify `src/js/i18n.js` is **0-diff** (the `trn` pair is already registered). **Done**: byte-identical.

**✅ CHECKPOINT 6** — three real destinations; the teachers triple is no longer a duplicate.

---

## Phase 7 — Protected-test relocations (exactly S1–S5)

*Single writer: `tests/smoke/run.cjs`. Serial. **No sixth supersession is permitted.***
Each task: inline supersession comment · the original guarantee · the new host · the compensating assertion ·
a RED→GREEN mutation · proof that neighbouring assertions stay byte-verbatim.

- [X] **T046** **S1** `smoke:88` — `FORM_DRAWERS_032.teachers: ['trn-edit','trn-add','trn-categories']` →
      **`['trn-edit']`**. Guarantee: every registered drawer has a trigger, ≥1 field, ≥1 gate, ≤1 primary gate, 0
      MUST-OMIT-named input, 0 canvas. New host: the add/categories **tab panels** (compensating assertion in T063).
      **`FORM_DRAWERS_032.teacher` (teacher.html) = `['trn-edit','trn-note']` stays BYTE-VERBATIM.**
- [X] **T047** **S2** `smoke:111` — remove the `teachers: ['trn-categories']` entry from the picker/drawer register.
      Guarantee relocated to the categories panel. `family`/`reports`/`library`/`staff` entries **byte-verbatim**.
- [X] **T048** **S3** `smoke:115` — `HYBRID_032` drops its `teachers` entry. `reports: ['rep-fbcat']` and
      `library: ['lib-cats']` stay **byte-verbatim**. The "category list + a REAL embedded create form" guarantee
      moves to the categories tab (T063).
- [X] **T049** **S4** `smoke:747`+`:752` — `cat: !!document.querySelector('[data-drawer="trn-categories"]')` and
      `catTpl: !!…template[data-preview="trn-categories"]` → assert the **categories TAB PANEL** exists and contains
      the list + the create form + the assign gate + exactly one Save gate. The neighbouring kebab and `PAY28`
      asserts (`:751`, `:753`) stay **byte-verbatim**.
- [X] **T050** **S5** `smoke:1494-1495` — `anchorOk036(nav036.at, /(^|\/)teachers\.(en\.)?html$/)` and the
      `teacherCategories` twin → `/(^|\/)teachers\.(en\.)?html#view=add$/` and `…#view=categories$/`.
      The `sessionsKpi` / `monthlyPerf` asserts in the same block stay **byte-verbatim**.
- [X] **T051** **Byte-verbatim audit**: `git diff` on `run.cjs` touches **only** the five S-sites plus the additive
      blocks of Phase 8. Every role law (`payHit`/`tchPay`/`famPay`/`payFigure`/child-view/`PAY28`), every count/menu
      freeze, the `classSalaryReport` lock probe, the nav.config source audit, link integrity, and every unrelated
      Spec 031–040 assertion are **unchanged**. **Done**: confirmed; **any sixth supersession ⇒ STOP.**
- [X] **T052** **P-06 coverage hole — closed ADDITIVELY, not by editing the protected assert.** `smoke:745-748`
      greps `#page-body` **`innerText`**, which **excludes `[hidden]` subtrees** — after the MOVE the add/categories
      forms sit in hidden panels and would be **invisible** to the pay-free grep. `PAY28` and its `ok(!kb.pay, …)`
      stay **byte-verbatim**; add a panel-scoped **`textContent`** grep over
      `[data-tabs="teachers"] [data-tabpanel]` (all panels, hidden included). **Done**: teacher pay-free coverage on
      `teachers.html` is now **strictly larger** than before 041.

**✅ CHECKPOINT 7** — exactly five relocations; nothing deleted, nothing weakened.

---

## Phase 8 — Additive route-freeze coverage

*Single writer: `tests/smoke/run.cjs`. **STRICTLY ADDITIVE** (R-1): the four hand-written literal arrays
(`SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS`, the Spec-038 finance array) are **RETAINED VERBATIM** with
their assertion logic intact. The derived matrix is the generic **freeze layer**; they remain domain-specific
regression coverage.*

- [X] **T053** Add the **derived route matrix** from `NAV_CATEGORIES`: for each of the **49** implemented routes
      derive id · category · status · source route · file · fragment · AR route · EN route · destination type ·
      **tab group**. **Done**: 49 rows derived, 0 hand-written.
- [X] **T054** **Group-aware map (E-04)**: carry an explicit `file → [data-tabs] group → baked default` map
      (the group is **not** derivable from the route string — `teacher-performance` → group **`perf`**), assert it is
      **complete** (every deep-link file has an entry, no orphan entries), and add the new row
      `teachers → group 'teachers', default 'directory'`. Queries are **group-scoped**
      (`[data-tabs="<group>"] [data-tabpanel]`). **Do NOT impose a permanent one-tabs-widget-per-page rule** —
      a future multi-group page must remain safe.
- [X] **T055** Matrix detector: **nonexistent destination** (the route's file does not exist).
- [X] **T056** Matrix detector: **real-but-wrong destination** for a plain route.
- [X] **T057** Matrix detector: **wrong `#view=` fragment** (the fragment has no matching `[data-tab]` /
      `[data-tabpanel]` in its group).
- [X] **T058** Matrix detector: **AR/EN mismatch** and **dropped hash** in the mirrored route.
- [X] **T059** Matrix detector: **implemented rendered planned/disabled**, and **disabled rendered as an anchor**.
- [X] **T060** **Repeated-destination census**: tolerate **exactly one** sanctioned repeat —
      **S-1: `salaries` + `staffSalaries` → `finance.html#view=salaries`** (Spec 038) — name it, and **fail on any
      other**. **After D-1 the teachers triple is no longer a repeat.** **Done**: census = 1, and it is S-1.
- [X] **T061** **The committed route-inventory table (FR-009/Q-9)**: assert all **50** items against the checked-in
      expected-route table in `route-inventory-contract.md`, **in addition** to the source-derived matrix — so a
      `nav.config` edit cannot silently redefine its own expectation.
      **⚠ CORRECTION (completion pass).** This task was previously marked `[X]` with the claim "**Done**: 50/50
      match". **That claim was false — the block was never written.** The derived matrix (T053) only proves a
      destination **exists**; nothing pinned the **25 plain routes**. This is gap **G-1**, named in `plan.md` §9,
      and it was left OPEN. It was caught by executing **M-2** (`staff` → `library.html`, a real-but-wrong page),
      which passed the ENTIRE suite with **0 failures / exit 0**. **Now genuinely done**: `tests/smoke/run.cjs`
      gains the **`ROUTES_50` register** (T-03) — every nav id pinned to its exact route string, read from the
      nav.config **source**; unregistered/missing items fail too. Cross-checked **50/50** against the checked-in
      contract table (the only differing cell is `classSalaryReport`, prose "— (no route)" vs `null` — semantically
      identical). **M-2 re-run ⇒ RED**, exactly 1 assertion:
      `route-register: staff must route EXACTLY to "staff.html", got "library.html"`. **G-1 CLOSED.**
- [X] **T062** **The 24 seeded deep-links**: for every `#view=` route × AR/EN — a **fresh `browser.newContext()`**,
      `localStorage['academy.schedView.<group>']` **pre-seeded via `addInitScript` to a different existing tab id of
      that group**, then `goto`; assert **exactly one** visible `[data-tabpanel]` in that group and it is the target,
      and **0** external requests. **Done**: **48 executions** green.
      *(Today only **9 of 22** are seeded; a regression of `initTabs` from `hash || stored` to `stored || hash` would
      pass the other 13 — this closes that hole. `deep-link-discrimination-contract.md`.)*
- [X] **T063** **D-1 direct-surface honesty block**: on a fresh `teachers.html#view=add`, assert the add panel
      contains **≥13** form controls and **0** drawer-opening buttons; on `#view=categories`, assert the list + the
      create form + the assign gate + **exactly one** primary Save gate. **Done**: no second click anywhere.
- [X] **T064** **Header-trigger absence**: assert **0** `[data-drawer="trn-add"]` and **0**
      `[data-drawer="trn-categories"]` on `teachers.html`/`.en`, and **0** `template[data-preview]` for either id.
- [X] **T065** **`trn-edit` preservation**: assert the card kebab still opens `trn-edit` and its form is intact.
- [X] **T066** **Duplicate-id guard** (sitewide, all 115 pages): **0** duplicate `id` attributes.
- [X] **T067** **Gallery orphan-set guard (D-2)**: the set of pages that are never a link target is **exactly**
      `{gallery.html, gallery.en.html}`. A **new** orphan fails; **losing** the exception also fails.
      **Done**: exactly 2. *(`d2-gallery-orphan-contract.md`; **0 source, 0 HTML change**.)*
- [X] **T068** **Role-isolation census**: **0** admin destinations reachable from any portal page; **0** portal
      destinations from any admin page. Use the shipped **word-boundary** `payHit` regex — a naive `/SAR/i` grep
      false-positives on the persona name *Sara*. **Done**: 0/0.
- [X] **T069** **Group/tab-id ambiguity detector**: fail if two tab groups on one page could contend for the single
      global `#view=` fragment (`selectTab` persists one hash for all groups). No page has two groups today; the
      detector keeps it that way, or forces a declared amendment.
- [X] **T070** Run smoke → PASS. **Done**: green, with the four legacy deep-link blocks still present and passing.

**✅ CHECKPOINT 8** — the freeze layer is additive and discriminating.

---

## Phase 9 — Silent-row relocation (the eight rows + the derived gaps)

*Serial per file. **Derived from live source, not assumed** (T012 + the per-view census).*

**Derived census (pre-041):** teachers a11y = 3 default rows + **2** `trn-add` rows + **0** categories rows.
Teachers screenshots = **3** `trn-add` frames + **3** `trn-categories` frames + 7 others.
settings `users` = **1** a11y row + **1** frame (floor is ≥2 each).

- [X] **T071** `tests/a11y/run.cjs:215` — `{ page:'teachers', open:'[data-drawer="trn-add"]' }` →
      `{ page:'teachers', hash:'#view=add' }`. **Done**: the row audits the add panel.
- [X] **T072** `tests/a11y/run.cjs:293` — the **mobile** `trn-add` row → `{ …, viewport:'mobile', hash:'#view=add' }`.
- [X] **T073** **`categories` has ZERO a11y rows today** (only screenshots covered it) — so this is a **gap, not a
      relocation**. Add **two** new rows to reach the ≥2 floor: `#view=categories` AR/light and one further
      (EN or dark). **Done**: categories a11y rows = 2. *(Derived in T012, not assumed.)*
- [X] **T074** `settingsUsers` — add the **one** missing a11y row to reach the ≥2 floor (it has 1). **Done**: 2.
- [X] **T075** `tests/screenshots/capture.cjs:290, 291, 367` — the three `openDrawer:'trn-add'` frames →
      `view:'add'`. **Preserve the historical variant names** (`sp032-trn-add`, `sp032-trn-add-mobile`,
      `sp036-add-teacher`) so the review history stays traceable.
- [X] **T076** `tests/screenshots/capture.cjs:226, 294, 368` — the three `openDrawer:'trn-categories'` frames →
      `view:'categories'`, preserving `sp028-categories`, `sp032-trn-categories-form`, `sp036-teacher-categories`.
- [X] **T077** `settingsUsers` — add the **one** missing screenshot frame to reach the ≥2 floor (it has 1).
- [X] **T078** **REQUIRED-SELECTOR LAW** (this is the whole point of Phase 9): **no required D-1 selector may use
      `.catch(() => {})`.** For every required tab/panel target the runner MUST: assert the target **exists**;
      assert the intended `[data-tabpanel]` is **visible**; assert the audited surface is **not the directory**;
      and **fail loudly** if the target is missing. Optional drawer behaviour elsewhere may keep its existing
      handling unless separately in scope. **Done**: the 8 relocated rows + the 3 new rows all fail loudly on a
      missing target.
- [X] **T079** **Silent-pass proof**: point one relocated row at a **non-existent** tab id → it MUST fail (before
      this phase it would have silently passed while auditing the directory). Restore. **Done**: RED then GREEN.
- [X] **T080** Run a11y → record.
- [X] **T081** Run screenshots → record.

**✅ CHECKPOINT 9** — no relocated row can silently audit the wrong surface.

---

## Phase 10 — Runner strengthenings (R-2 / R-3)

*These are **strengthenings**, not S6/S7. Preconditions T006 (a11y 0/0) and T007 (0 console errors) must be green.*

- [X] **T082** **R-2** `tests/a11y/run.cjs` — exit **non-zero** when `critical > 0` **OR** `serious > 0`
      (today `:375` gates `critical` only). Preserve the detailed per-row reporting.
      **No threshold, no allowlist, no suppression, no "known-noise" exception.** **Done**: the gate is in place.
- [X] **T083** **R-2 proof**: inject one **synthetic `serious`** violation → the runner exits non-zero; remove it →
      green. **Done**: RED→GREEN recorded. *(mutation **M-15**)*
- [X] **T084** **R-3** `tests/screenshots/capture.cjs` — exit **non-zero** when the captured console-error count
      **> 0** (today it always `process.exit(0)`). Preserve capture output and the summary line when the count is 0.
      **No filtering, no ignored-console allowlist.** **Done**: the gate is in place.
- [X] **T085** **R-3 proof**: inject one console error on one captured page → the runner exits non-zero; remove it →
      green. **Done**: RED→GREEN recorded. *(mutation **M-16**)*
- [X] **T086** Re-run a11y with the new gate → **critical=0 · serious=0**, exit 0. **Now machine-enforced for the
      first time.**
- [X] **T087** Re-run screenshots with the new gate → **0 console errors**, exit 0. **Now machine-enforced.**

**✅ CHECKPOINT 10** — the suite now *enforces* the results the project has been *reporting* since Spec 031.

---

## Phase 11 — A11y & screenshot matrix

- [X] **T088** A11y rows for `teachers` `#view=directory` / `#view=add` / `#view=categories` × **AR/EN** ×
      **light/dark**, plus **mobile-390** for add and categories. **Done**: rows present.
- [X] **T089** A11y: **keyboard tab navigation** across the 3-tab tablist (roving tabindex,
      ArrowRight/ArrowLeft/Home/End) and the `trn-edit` drawer (focus trap · `role="dialog"` · Escape ·
      no nested dialog · **no double focus target**).
- [X] **T090** A11y: fresh-load hashes, **Back/Forward**, and the **topbar language toggle preserving each hash**.
- [X] **T091** A11y: **active sidebar child item** state and the **`classSalaryReport` lock** row.
- [X] **T092** Screenshot frames: the three teacher views × AR/EN + dark + mobile-390 (representative, not
      combinatorial), the `trn-edit` drawer, the active sidebar child item, and representative
      **admin / teacher / family / student** sidebars (desktop + mobile).
- [X] **T093** Run a11y → **critical = 0 · serious = 0** (now gated).
- [X] **T094** Run screenshots → **0 console errors** (now gated); **no clipped form/category surface**, **no hidden
      duplicate drawers**, correct **RTL/LTR**, **visible keyboard focus**, responsive tab controls.
- [X] **T095** [P] Update `tests/screenshots/REVIEW.md`: the relocated frames, the new teacher-tab frames, and the
      record that the `trn-add` / `trn-categories` **drawer hosts no longer exist** (the capability moved to tabs).

**✅ CHECKPOINT 11** — the navigation is visually and programmatically production-safe.

---

## Phase 12 — Mutation execution (16)

**EXECUTION LAW**: mutations run **only** in a **detached temporary worktree** (or an equivalent isolated safe copy)
or as an in-place **patch → prove → revert**. **Never** `stash` / `reset` / `checkout` / `clean`; **never** switch the
primary branch. Each records: exact changed line · expected failing assertion · expected message · whether a build is
required · confirmation the mutation was removed · post-mutation green proof.

**EXECUTION RECORD (completion pass).** All 16 executed. **M-1/M-2/M-4/M-5/M-6/M-8/M-9/M-10/M-11/M-12 were NOT run
in the first implementation pass** (a batch script timed out); they were previously marked `[X]` on report-only
evidence. **That was invalid and is corrected here.** Each was re-run in a **fresh isolated copy** of a
proven-green tree (one mutation per copy; the copy is `diff`-verified byte-identical to the golden before mutating;
the primary tree is never touched and no `git` command is ever run inside a copy).

- [X] **T096** [P] **M-1** `staff` → `staff-members.html` (nonexistent). **RED, exit 1, 66 assertions** —
      `<page>/<lang>: 1 link(s) to a nonexistent page file` on every admin page × both langs.
- [X] **T097** [P] **M-2** `staff` → `library.html` (real but **wrong**). **FIRST RUN: GREEN, exit 0, 0 failures** —
      this empirically confirmed gap **G-1** (see T061). After adding the **T-03 `ROUTES_50` register**:
      **RED, exit 1, exactly 1 assertion** —
      `route-register: staff must route EXACTLY to "staff.html", got "library.html" — a real-but-wrong destination
      is still wrong (gap G-1)`. **The single most important proof in Spec 041.**
- [X] **T098** [P] **M-3** wrong `#view=` fragment (`#view=bogus`). **RED** — `no [data-tab="bogus"]` /
      `no [data-tabpanel="bogus"]`.
- [X] **T099** [P] **M-4** the disabled lock rendered as a navigable `<a>` (`sidebar.js`). **RED, exit 1, 83
      assertions** — `<page>/<lang>: 1 disabled nav item(s) missing button/aria-disabled/reason`.
- [X] **T100** [P] **M-5** `settingsUsers` implemented → `planned`. **RED, exit 1, 203 assertions** —
      `Spec 040 — sitewide planned must be 0 (got planned=1, coming-soon=1)` + `settingsusers must be a real
      deep-link → settings.html#view=users` + `settings must have 0 planned «قريبًا» items`.
- [X] **T101** [P] **M-6** sidebar `langRoute()` drops the fragment. **RED, exit 1, 587 assertions** — every EN
      deep-link collapses, e.g. `teacherCategories must be a real deep-link → teachers.html#view=categories, got
      {"href":"teachers.en.html"}`. **EN-only, as predicted** (distinct from the topbar defect D-3/M-7).
- [X] **T102** **M-7** **topbar** language-switch hash loss (revert the D-3 `+ location.hash`). **RED** — the
      fragment is destroyed; the panel falls back to the seeded stored view. *(= T023)*
- [X] **T103** [P] **M-8** admin `finance` injected into `ROLE_NAV.teacher`. **RED, exit 1, 64 assertions** —
      `teacher shell anchors outside {8 teacher pages, hub}: [..."finance.en.html"...]` + `teacher registry count
      mismatch (aside 9 / drawer 9, want 8)` + `shell-anchor multiset must be 19 …, got 21`. **Cross-role leak
      caught.**
- [X] **T104** [P] **M-9** a 58th `PAGES` base. **RED, exit 1, 2 assertions** — `route freeze: public/ must hold
      exactly 115 HTML pages …, got 117` + the orphan-set guard.
- [X] **T105** [P] **M-10** a 51st nav item. **RED, exit 1, 204 assertions** — `admin menu must stay 50, got 51` (×4
      independent sites) + `admin category should have exactly 5 items` + **the new T-03 register**
      (`route-register: UNREGISTERED nav item(s) ["staffExtra"]`).
- [X] **T106** [P] **M-11** a new built page with no inbound route. **RED, exit 1, 2 assertions** — `orphan-set: …
      Got ["gallery.en.html","gallery.html","orphan-test.en.html","orphan-test.html"]` + the 115 freeze.
- [X] **T107** [P] **M-12** the gallery **gains** an inbound link (from the dashboard body). **RED, exit 1, exactly 1
      assertion** — `orphan-set: … Got ["gallery.en.html"]`. The frozen set **SHRANK**, and that fails: this proves
      the guard pins the sanctioned exception **exactly**, not merely an orphan *maximum*.
- [X] **T108** **M-13** `addTeacher` reverted to bare `teachers.html` → S5's hash assert **and** the
      repeated-destination census both fail. **RED.**
- [X] **T109** **M-14** a restored `trn-add` template → **RED, 13 duplicate ids** (`f-trnAdd-firstName` ×2).
      **This is the mutation that proves the MOVE was forced, not chosen.**
- [X] **T110** **M-15** a synthetic **serious** a11y violation → the a11y runner **exits 1**. *(= T083)*
- [X] **T111** **M-16** an injected **console error** → the screenshot runner **exits 1**. *(= T085)*

**✅ CHECKPOINT 12** — every freeze invariant has a mutation proving its assertion discriminates. A test that cannot
fail is not a test.

---

## Phase 13 — Impact protection

- [X] **T112** Rebuild; compare against the T008 snapshot. **Non-destructive only** (`git show 21502af`; no stash /
      reset / checkout / clean / branch-switch).
- [X] **T113** **L4 — page bodies**: **exactly TWO** `#page-body` md5s differ — `teachers.html` and
      `teachers.en.html`. **Done**: 2, no more.
- [X] **T114** **L3 — sidebar markup**: the other **62** admin files differ **only** in the two teachers `href`
      fragments (`#view=add`, `#view=categories`); their `#page-body` md5s are **identical**. **Done**: 62.
- [X] **T115** **L5 — whole files**: the **51** non-admin files (50 portal + `index.html`) are **byte-identical**.
      **Done**: 51.
- [X] **T116** **L2 — shared assets**: `public/assets/js/enhance.js` differs **only** by the copied one-line D-3
      change (it is a verbatim `cpSync` copy — there is **no bundler and no `assets/app.js`**). The mirrored
      `assets/js/{nav.config,pages/teachers,components/teacher-actions,locales/ar.trn,locales/en.trn}.js` differ as
      copies of their edited sources. **No HTML file changes because of any L2 change.** **Done**: verified.
      *(NB `index.html` does **not** load `enhance.js` — 114 of 115 do.)*
- [X] **T117** **L1 — source**: `git diff --stat` shows **exactly** the 6 allowed source files + 3 test files + docs.
- [X] **T118** **0-diff wall**: re-hash every forbidden file from T008 — `package.json` · `build-html.mjs` ·
      `i18n.js` · `sidebar.js` · `tabs.js` · `form-field.js` · `settings-section.js` · `preview-drawer.js` ·
      `components/ui.js` · settings fixtures · `staff.js` + `staff-management.js` · **`pages/teacher.js`** · every
      portal source/fixture. **Done**: all identical; any diff ⇒ **STOP**.
- [X] **T119** **[CORRECTED — see T028.]** `teacher.html` / `teacher.en.html`: **`#page-body` byte-identical**;
      the whole file differs **only** in the two shared-sidebar hrefs (`addTeacher`, `teacherCategories`). They are
      **sidebar-only** files (part of the 62), **not** part of the 51 untouched non-admin files. **Done**: verified
      by diff — exactly 2 changed lines each.
- [X] **T120** Final counts: 115 · `PAGES` 57 · menu 50 · implemented 49 · planned 0 · disabled 1 · coming-soon 0 ·
      `FUTURE_ROUTES {}` · locks = `classSalaryReport` only · **24/25/1** · orphan set exactly 2 ·
      **`finance-analysis` absent**. **Done**: all twelve exact.
- [X] **T121** Confirm **no** new dependency, component, page, `PAGES` entry, `data-*` hook, `hashchange` listener
      or storage key. **Done**: 0 of each.

**✅ CHECKPOINT 13** — 2 bodies · 62 sidebar-only · 51 byte-identical = 115.

---

## Phase 14 — Honesty & role laws

- [X] **T122** [P] **Teacher pay-free (global)** — the shipped word-boundary `payHit` regex on the 16 teacher-portal
      files: **0**. Plus the additive panel-scoped `textContent` grep on `teachers.html` (T052): **0**.
      **Done**: 0/0.
- [X] **T123** [P] **Family zero-pay** (16 files) and **student child-view** (14 files): **0** each.
- [X] **T124** [P] No `type=password` · no `type=file` · no credential-named input · no authored secret. **Done**: 0.
      *(The CV upload remains an honest `<button data-disabled-reason>` gate — never an `<input type=file>`.)*
- [X] **T125** [P] No fake save / success / connected / mutation; no computed rank/score; no computed money/salary.
- [X] **T126** [P] No dead links (`href="#"` = 0) · no raw locale keys · no duplicate ids.
- [X] **T127** [P] **No teacher pay, salary, rate or currency field** was introduced by the MOVE — the add panel's
      13 controls are exactly the pre-041 `teacherFields()` set.
- [X] **T128** Run the **full** smoke suite → **PASS**.
- [X] **T129** **Adversarial test guard (Opus)**: re-read the whole `run.cjs` diff. **Exactly** S1–S5 + the Phase-8
      additive blocks + the T052 additive grep. **Zero** other protected assert touched. **Zero** coverage deleted —
      the four hand-written deep-link arrays are still present and passing. **Done**: confirmed; a sixth
      supersession ⇒ **STOP**.

**✅ CHECKPOINT 14** — every standing law holds; the test surface is strictly larger than before.

---

## Phase 15 — Documentation & final guards

- [X] **T130** **FR-020** — correct the stale `smoke:2580` comment (it still describes a superseded state).
      **Classified as a DOCUMENTATION correction, not a protected-assert supersession.**
- [X] **T131** **FR-021** — add the vacuity note for assertions that are now vacuously true (e.g. `badPlanned`
      with zero planned items). **Also a documentation correction.**
- [X] **T132** [P] Record the corrected **historical supersession chain** (Specs 035–041) in
      `documentation-reconciliation-contract.md`.
- [X] **T133** [P] Record the **copy-sweep owner**: `common.backendRequiredNote` ("…nothing is saved yet", EN, ~50
      pages) → **Spec 044** (it owns the shared modal/drawer/long-form interaction system and is `formDrawer()`'s
      default `reasonKey`). **Not swept in 041.** Carry the roadmap-provenance caveat: only Spec 041 is chartered;
      **042–057 are a maintainer-directed, append-only amendment, not chartered specs**.
- [X] **T134** [P] Record the **gallery owner and entry path** (D-2): frontend/design-system maintainer;
      direct-URL-only by design; **not** a spec number.
- [X] **T135** [P] Update `CLAUDE.md`: the new baseline/status, the route split **24/25/1**, the three fixed defects,
      the 5 supersessions + 2 wall supersessions + 2 runner strengthenings.
- [X] **T136** [P] Update `app/README.md` **only if required** by the route change.
- [X] **T137** Write `implementation-status.md`: what shipped, the final censuses, S1–S5, W-1/W-2, R-1/R-2/R-3, the
      16 mutations, the derived a11y gap (categories had **zero** rows — a gap, not a relocation), and the honest
      record that **`serious=0` and `0 console errors` were unenforced claims until this spec**.
- [X] **T138** **Adversarial clean-code guard (Opus)**: `teachers.js` and `teacher-actions.js` are idiomatic —
      one definition of the field body, no dead code, no duplicated panel logic, comments state constraints rather
      than narrate. **Done**: reviewed.
- [X] **T139** **Docs guard**: every count in every doc matches the built output. **Done**: 0 drift.
- [X] **T140** **Final regression**: build + smoke + a11y + screenshots all green under the **new** gates.
- [X] **T141** Verify all 34 Spec-041 artifacts + `tasks.md` + `implementation-status.md` agree on every number.
- [X] **T142** **No commit / no push — the watcher commits.** **Done**: `git log -1` still shows the
      pre-implementation HEAD; the tree carries the Spec-041 changes uncommitted.

**✅ CHECKPOINT 15 — SPEC 041 COMPLETE.**

---

## Dependencies & serial chains

```
Phase 1  (T001–T012)  baseline + grounding            — no app change
Phase 2  (T013–T016)  R-1/R-2/R-3 reconciliation      — artifacts only; GATE
        ↓  (implementation may not begin until CHECKPOINT 2)
Phase 3  (T017–T023)  D-3  enhance.js → smoke         — serial
Phase 4  (T024–T029)  D-1  teacher-actions.js         — serial (single writer)
        ↓
Phase 5  (T030–T038)  D-1  teachers.js MOVE           — serial (depends on Phase 4)
        ↓
Phase 6  (T039–T045)  nav.config.js + locales         — T041/T042 [P] (different files), then parity
        ↓
Phase 7  (T046–T052)  S1–S5 relocations               — serial (single writer: run.cjs)
Phase 8  (T053–T070)  additive freeze coverage        — serial (same writer)
Phase 9  (T071–T081)  silent-row relocation           — a11y serial; capture rows [P]
Phase 10 (T082–T087)  runner strengthenings           — serial per runner
Phase 11 (T088–T095)  a11y + screenshot matrix
Phase 12 (T096–T111)  16 mutations                    — isolated worktree; most [P]
Phase 13 (T112–T121)  impact protection
Phase 14 (T122–T129)  honesty + role laws             — greps [P]
Phase 15 (T130–T142)  docs + final guards             — docs [P]
```

### The two parallelism counts (kept separate, as required)

**(a) `[P]`-marked implementation tasks — exactly 25**, each writing a *distinct* file with no ordering dependency:

`T041` `T042` (different locale files) · `T095` (`REVIEW.md`) ·
`T096` `T097` `T098` `T099` `T100` `T101` `T103` `T104` `T105` `T106` `T107` (mutations — each in its **own isolated
worktree**, so no shared writer) ·
`T122` `T123` `T124` `T125` `T126` `T127` (read-only law greps) ·
`T132` `T133` `T134` `T135` `T136` (documentation — distinct files).

**(b) Broader verification steps that may run concurrently after implementation** — the read-only censuses of
Phase 13 (T113–T121) can be evaluated in any order once the build exists. They are **verification**, not
implementation, and are **not** counted in (a).

**Explicitly NOT `[P]`, despite being mechanical** — they share a single-writer file:
`T075` `T076` `T077` `T092` (all write `tests/screenshots/capture.cjs`) · `T088` `T089` `T090` `T091`
(all write `tests/a11y/run.cjs`) · every task in Phases 3–8 (each writes `enhance.js`, `teacher-actions.js`,
`teachers.js`, `nav.config.js` or `run.cjs`).
The suite runs (`T093`, `T094`, `T128`, `T140`) are inherently serial and belong to neither count.

## Model routing (task IDs that exist)

**Opus** — T001–T012 (grounding) · T013–T016 (reconciliation) · T017, T020–T023 (D-3) · T024–T029 (extraction) ·
T030–T038 (the MOVE) · T039–T040 (routes) · T046–T052 (S1–S5) · T053–T070 (derived matrix) · T078–T079
(required-selector law) · T082, T084 (runner gates) · T096–T111 (mutations) · T112–T121 (impact) · T129, T138
(adversarial guards).
**Sonnet** — T041–T045 (mirrored locales, after the namespace is fixed) · T071–T077 (mechanical row relocation) ·
T088–T092, T095 (matrix rows + REVIEW) · T122–T127 (law greps) · T130–T137 (documentation) · T139–T141
(count/diff reporting).

## STOP conditions

1. R-1 / R-2 / R-3 cannot be reconciled (Phase 2 red).
2. A **sixth** protected-test supersession would be required.
3. D-1 needs duplicate form DOM, or `#view=add` needs a second click.
4. Header buttons would have to be retained as broken same-page anchors.
5. `pages/teacher.js` or `teacher.html` must change.
6. A new `data-*` hook, `hashchange` listener, router, storage key or dependency is required.
7. `build-html.mjs` or `package.json` must change.
8. `serious = 0` cannot become machine-gated; or console errors cannot.
9. An existing per-spec deep-link block would have to be deleted.
10. Counts cannot remain 115 / 57 / 50, or the split cannot reach 24/25/1.
11. Any role / no-pay / no-secret law would have to weaken.
12. Any unrelated page body changes.

## Story coverage

| Story | Tasks |
|---|---|
| **US-D1** — teacher destinations tell the truth | T024–T042, T046–T050, T063–T065, T108–T109 |
| **US-D2** — the orphan set is frozen | T067, T106, T107, T134 |
| **US-D3** — a language switch never loses your place | T017–T023, T090, T102 |
| **US-FREEZE** — the route surface is frozen and every invariant discriminates | T053–T062, T066, T068–T070, T096–T105, T110–T121 |

**No MVP subset.** `/speckit.implement` executes **every** task. Leaving the derived matrix out, or shipping D-1
without the direct-surface proof, is a spec failure.
