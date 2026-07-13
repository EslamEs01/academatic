# Contract — Scope Guard (Spec 041)

**Baseline: HEAD `21502af`** ("feat: implement settings deep linking architecture and add technical specification
contracts" — Spec 040 committed, PR #13 merged, present on `origin/main` at merge `13d38af`). Working tree **clean**
except the `specs/041-route-sidebar-production-freeze/` artifacts and `.specify/feature.json`. All `git diff` /
`git show` / md5 comparisons in this contract use `21502af` — never `4cbcb31` (CLAUDE.md is stale; see
`protected-test-register.md` §0 note).

**Scope**: Spec 041 = route/sidebar production **freeze** + three defect fixes — D-1 (teacher fold-anchor, Option A,
the MOVE), D-2 (gallery orphan, Option A, document-only), D-3 (topbar language hash loss, the one-line `langUrl` fix).
**Not** a redesign, feature, form-expansion or integration spec. This file is the allowlist/forbidden-list/grep
register that binds whichever round executes the two code-touching fixes (D-1, D-3); D-2 is documentation-only and
touches nothing on either list. **This authoring pass is PLANNING ONLY** — it writes no source/test/HTML, makes no
commit, and this document does not itself execute anything; it is the fence the implement round must not cross.

---

## 1. ALLOWED files (narrow allowlist — nothing outside this list may be touched)

### 1.1 Application source — D-1 (5 files)

| # | File | Change | Why it's in scope |
|---|---|---|---|
| 1 | `app/src/js/nav.config.js` | **2 route-string edits** at `:54-56` — `addTeacher.route` → `'teachers.html#view=add'`, `teacherCategories.route` → `'teachers.html#view=categories'` (`teachers.route` text **unchanged**) — **plus 2 stale-comment corrections**: the Spec-036 inline comments ("fold-anchor to teachers.html (trn-add drawer)" / "(trn-categories drawer)") are corrected — they would otherwise document a drawer that no longer exists (documentation correction, not a protected-assert supersession, FR-020/FR-021) | the only navigation-source edit; `FUTURE_ROUTES` stays `{}` |
| 2 | `app/src/js/pages/teachers.js` | body → `tabs({group:'teachers'})` with 3 panels (`directory` default · `add` · `categories`); header primary/secondary buttons removed; `categoriesDrawer()` → `categoriesPanel()` | hosts the MOVE (`d1-teacher-route-contract.md` §2, §5, §6) |
| 3 | `app/src/js/components/teacher-actions.js` | `teacherFields(p, withGeo)` exported (was private); `teacherAddDrawer()` repurposed → `teacherAddPanel()` (emits the panel body, not `formDrawer(...)`); `addTeacherAction()` removed with its sole call site | proven in the allowlist by grounding G9 — `teachers.js` is its **only** caller; `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` stay **0-diff** inside this same file |
| 4 | `app/src/locales/ar.trn.js` | +3 keys `trn.list.tab.{directory,add,categories}` | new tab labels; **must not** collide with `trn.tab.*` (`teacher.html` profile tabs) or `trn.board.tab.*` (`teacher-performance.html`) — the Spec-036 `trn.kpi` collision precedent |
| 5 | `app/src/locales/en.trn.js` | +3 keys, mirrored | locale parity — `trn` pair N+3/N+3, **0 divergence** |

### 1.2 Application source — D-3 (1 file, 1 line)

| # | File | Change |
|---|---|---|
| 6 | `app/src/js/enhance.js` | **exactly one line**, inside `langUrl(lang)` (`:240`): `return lang === 'en' ? ... : ...;` → `return (lang === 'en' ? ... : ...) + location.hash;`. This is a **declared narrow supersession** of the enhance.js 0-diff wall — scoped to this one function, this one line, per `d3-language-hash-contract.md` §5. Every other line of `enhance.js` — `acknowledge`, toasts, `openModal`, `openSheet`, `selectTab`, `initTabs`, `selectStep`, `initWizard`, `selectCategory`, `applyFilter`, `setTheme`, the delegated click listener (`:552-553`, value changes, the line itself does not), `initTimeConverter`, row-menu/drawer/confirm dispatch — is **byte-identical**. |

### 1.3 Application source — D-2 (0 files)

**Zero.** `d2-gallery-orphan-contract.md` §3: "0 application-source change. No edit to `nav.config.js`,
`build-html.mjs`, `pages/gallery.js`, or any component/locale file." D-2 is closed entirely by
`page-reachability-register.md` + this artifact set + one additive smoke assert (§1.4 below).

### 1.4 Tests / docs (allowed to change)

`app/tests/smoke/run.cjs` — the 5 D-1 supersessions (S1-S5, §4) + the additive Spec-041 blocks (T-01 … T-09 per
`protected-test-register.md` §5: derived+seeded 22→24 deep-link matrix, fragment-resolution assert, 50-item href
register, AR/EN route-parity assert, orphan-set assert `{gallery.html, gallery.en.html}`, the **group-aware fragment-ownership guard** — ⚠️ **NOT** a `[data-tabs] <= 1 per page` rule, which is **REJECTED** (Q-6/E-04): every probe is scoped `[data-tabs="<group>"] …` and detector **X-9** forbids two groups on one page declaring the **same tab id** — the
`smoke:2580` stale-comment fix `103` → `115` (T-09), and the **D-3 topbar block T-10 (rows T1-T8)**) · `app/tests/a11y/run.cjs` (+rows: 2 new
teacher deep-linked views × AR/EN × light/dark + mobile + keyboard tab-switching, per `d1-teacher-route-contract.md`
V11; the `settingsUsers` 1-row/1-frame floor recorded per E-10, not multiplied) · `app/tests/screenshots/capture.cjs`
(+frames for `teachers.html#view=add`/`#view=categories` × AR/EN, ≥2 per view per E-10) · `app/screenshots/REVIEW.md`
(if a verification round captures screenshots) · `app/README.md` (roadmap-sync note, optional) · `CLAUDE.md` (HEAD
pointer + status correction) · the `specs/041-route-sidebar-production-freeze/` directory itself · a new **committed
exact route-inventory contract** (FR-009/Q-9 — a checked-in expected-route table so a `nav.config.js` edit cannot
silently redefine its own expectation).

### 1.5 Regenerated HTML — the body-change allowlist

| Set | Files | Allowed change |
|---|---|---|
| Body allowlist (D-1 only) | `public/teachers.html`, `public/teachers.en.html` | **2** — full `#page-body` rewrite (directory verbatim as tab 0 + the moved `add`/`categories` panels); the **only** non-empty `#page-body` diff permitted in Spec 041 |
| Sidebar-only (D-1) | the other **62** admin files (incl. `gallery.html`/`.en`) | 2 `.nav-item` hrefs (`addTeacher`, `teacherCategories`) gain a `#view=` fragment; `#page-body` **byte-identical** vs `git show 21502af:…` |
| Byte-identical (D-1 and D-3 both) | the **51** non-admin files (50 portal + `index.html`) | **0 bytes** — D-3's shared-asset reach is behavioural only; no built HTML file's bytes change because of D-3 (`<script src>` reference unchanged; the asset's *content*, not any page's markup, differs) |
| Shared asset (D-3 only) | **`public/assets/js/enhance.js`** — the grounded path: `build-assets.mjs` does a verbatim `cpSync` of `src/js` → `public/assets/js`; **there is NO bundler and NO `assets/app.js`** | content changes for the **114** pages that load it (`index.html` does not) — this is layer (2) generated-shared-asset change, **not** 115 page changes, and **not one HTML byte** changes because the `<script src>` is an unversioned literal; see `impact-protection-contract.md` §1.1 |

`gallery.html`/`.en` are counted in the 62 sidebar-only set (D-1's two hrefs render on every admin page including
gallery) and are **not** in the body allowlist — D-2 adds nothing to the gallery body.

---

## 2. FORBIDDEN to change — 0-diff (verify with `git diff --stat`; any diff outside §1 ⇒ **STOP**)

```
package.json
scripts/build-html.mjs
src/js/i18n.js
src/js/components/sidebar.js
src/js/components/tabs.js
src/js/components/form-field.js
src/js/components/settings-section.js
src/js/components/preview-drawer.js
src/js/components/ui.js                (the real path; there is no src/js/ui.js)
src/js/components/topbar.js
src/js/components/dropdown.js
src/js/fixtures/settings.js
src/js/fixtures/staff-management.js
src/js/fixtures/form-options.js
src/js/fixtures/teacher-management.js
src/js/fixtures/teachers.js
src/js/pages/staff.js
src/js/pages/teacher.js
every other src/js/pages/*.js           (all EXCEPT pages/teachers.js — D-1 only)
every other src/js/fixtures/*.js
every other src/locales/*.js            (ar/en.trn.js move ONLY under D-1; no other pair moves)
every portal / teacher / family / student page source and fixture
src/js/enhance.js                       (D-3 releases exactly ONE line, inside langUrl — see §1.2; every other line 0-diff)
```

**Why `sidebar.js` stays 0-diff under D-3.** `sidebar.js`'s `langRoute()` is **already** hash-aware (Spec 035) —
`d3-language-hash-contract.md` §1.5 names this explicitly: "Sidebar route parity is CORRECT today"; D-3 fixes the
**topbar** helper only. Conflating the two, or "fixing" `sidebar.js` as well, is scope creep and a STOP condition.

**Why `teacher-actions.js` is on the allowlist (§1.1) and not this list.** The drawers already exist; D-1 does not
add or edit a drawer *template* — it repurposes two exported functions that emit form/list markup, per
`d1-teacher-route-contract.md` §6. `teacherEditDrawer()` / `teacherNoteDrawer()` / `teacherActions()` inside the same
file are 0-diff; only `teacherFields` (export added) and `teacherAddDrawer`→`teacherAddPanel` (repurposed) change.

```bash
git diff --stat -- app/src            # must show ONLY: nav.config.js, pages/teachers.js,
                                       # components/teacher-actions.js, locales/ar.trn.js, locales/en.trn.js,
                                       # and enhance.js with exactly 1 changed line
git diff --unified=0 -- app/src/js/enhance.js | grep -c '^[+-]'   # → 2  (one - one +, inside langUrl)
git diff -- app/package.json                    # empty, always
git diff -- app/scripts/build-html.mjs          # empty, always — no option adds a page
```

---

## 3. Forbidden-token greps (run on the BUILT `public/teachers.html` + `public/teachers.en.html`, and sitewide)

### 3.1 Secrets / credentials — census must be 0

```bash
grep -nE 'type="password"|type=file|type="file"'                 public/teachers*.html   # → 0
grep -niE 'name="[^"]*(pass|secret|api|key|token|webhook|card|cvv)' public/teachers*.html # → 0
grep -niE 'id="[^"]*(pass|secret|api|key|token|webhook|card|cvv)'   public/teachers*.html # → 0
```
The CV/attachments control on the `add` panel stays a `button[data-disabled-reason][data-reason-key="trn.form.cvReason"]`
**gate** — never an `<input type="file">` (D1-A2, `d1-teacher-route-contract.md` §7.1).

### 3.2 Files / canvas / PDF-ish
```bash
grep -nE 'type=file|<canvas|draggable|window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=' public/teachers*.html  # → 0
```

### 3.3 Pay / currency — teacher pay-free GLOBAL (D1-P1…P4, the standing law, unweakened)
```bash
grep -niE '\b(salary|salaries|payouts?|earnings?|compensation|hour[-_ ]?rate|fine)\b' public/teachers*.html  # → 0
grep -nE 'راتب|رواتب|أجر|مستحقات|غرامة|مكافأة'                                        public/teachers*.html  # → 0
grep -nE 'ريال|SAR|جنيه|EGP|AED|EUR|\$|€|£'                                            public/teachers*.html  # → 0
```
**No salary / rate / hour-rate / fine / payout / pay-period / compensation / currency field, figure, label, option or
comment may be introduced on `teachers.html`/`.en` by D-1.** The MOVE relocates markup; it adds no field
(`d1-teacher-route-contract.md` §8). The `payHit`/`PAY28` smoke regexes (`run.cjs:740-749`) run over
`#page-body.innerText` — **byte-verbatim**, no amendment permitted by Spec 041.

### 3.4 Fake status / fake success / fake persistence
```bash
grep -niE 'تم الحفظ|\bsaved\b|بنجاح|\bsuccessfully\b|تم الربط|\bdone\b' public/teachers*.html   # → 0
```
Every write final on the moved `add` and `categories` panels stays **exactly ONE** `.btn-primary[data-disabled-reason]`
(D1-A3, D1-C4) reading the existing `common.backendRequiredNote` / `common.add` ctaKey. No new toast copy.

### 3.5 Closed hook set / no new dependency
```bash
git diff 21502af -- app/src/js | grep -nE '^\+.*data-[a-z-]+='   # → only EXISTING hooks (data-tabs, data-tab,
                                                                   #   data-tabpanel, data-disabled-reason,
                                                                   #   data-reason-key, data-drawer [trn-edit only])
git diff 21502af -- app/src/js | grep -nE '^\+.*localStorage'    # → 0 (academy.schedView.teachers is a VALUE of
                                                                   #   the pre-existing SCHED_VIEW_KEY prefix, not
                                                                   #   a new key — enhance.js:243, D1-M8)
git diff 21502af -- app/package.json                              # → empty
```

### 3.6 Duplication ban (D-1's own law, D1-M1…M8 — machine-checkable, group-aware)
```bash
# exactly one live definition of the Add form fields, and none left in any <template>
document.querySelectorAll('#f-trnAdd-firstName').length === 1
[...document.querySelectorAll('template')].filter(t=>t.content.querySelector('#f-trnAdd-firstName')).length === 0

# no trn-add / trn-categories drawer survives on teachers.html
document.querySelector('template[data-preview="trn-add"]')        === null
document.querySelector('[data-drawer="trn-add"]')                 === null
document.querySelector('template[data-preview="trn-categories"]') === null
document.querySelector('[data-drawer="trn-categories"]')          === null

# no tab-with-another-click: the add/categories panels hold REAL controls, not a trigger
document.querySelectorAll('[data-tabs="teachers"] [data-tabpanel="add"] [data-drawer], [data-tabs="teachers"] [data-tabpanel="add"] [data-modal-trigger]').length === 0
document.querySelectorAll('[data-tabs="teachers"] [data-tabpanel="categories"] [data-drawer], [data-tabs="teachers"] [data-tabpanel="categories"] [data-modal-trigger]').length === 0
```

### 3.7 Repeated-destination census (T-06 — the D-1 mutation gate)
```bash
# The census tolerates EXACTLY ONE repeated {file, fragment} pair and NAMES it:
#   S-1 = salaries + staffSalaries -> finance.html#view=salaries   (Spec 038, sanctioned)
# and fails on any other repeat. It is deliberately NOT a naive "no two items may share a route"
# rule: that would flag S-1 -- a CORRECT pattern -- and pressure someone to "fix" it by inventing a
# duplicate tab or computing a per-staff pay figure. Both are forbidden by standing law.
```
Fails today on `teachers`/`addTeacher`/`teacherCategories` (all three = bare `teachers.html`); the D-1 fix must make
it pass. Any OTHER duplicate route introduced by this spec is a STOP condition.

### 3.8 D-3 diff-ceiling grep
```bash
git diff --unified=0 -- app/src/js/enhance.js | grep -E '^[+-]'   # exactly 2 lines total (1 -, 1 +)
grep -n 'location.hash' app/src/js/enhance.js                     # the langUrl line + the pre-existing
                                                                    # initTabs()/initWizard() reads only — no
                                                                    # new read/write site added
```

### 3.9 Orphan-set assert (D-2, additive, T-05)
```bash
# the live orphan set (never an href target after stripping #view=, never linked from index.html, no
# nav.config.js route) must equal EXACTLY {gallery.html, gallery.en.html} — cardinality 2, both named
```

---

## 4. Protected asserts — changeable ONLY via the five declared D-1 supersessions (S1-S5); D-3 declares zero

| # | Site | Today | After D-1 | Class |
|---|---|---|---|---|
| **S1** | `smoke:88` | `FORM_DRAWERS_032.teachers: ['trn-edit','trn-add','trn-categories']` | `['trn-edit']` | relocation — `trn-add`/`trn-categories` are no longer drawers on this page |
| **S2** | `smoke:111` | `PICKERS_032.teachers: ['trn-categories']` | remove the `teachers` entry | relocation |
| **S3** | `smoke:115` | `HYBRID_032 = { teachers:['trn-categories'], reports:[…], library:[…] }` | drop `teachers`; `reports`/`library` byte-verbatim | relocation |
| **S4** | `smoke:747-752` | asserts `[data-drawer="trn-categories"]` **and** `template[data-preview="trn-categories"]` both exist | asserts the categories **tab panel** exists inside `[data-tabs="teachers"]` and contains the list + create form + assign gate + one Save gate | relocation — identical honesty guarantee, host changes |
| **S5** | `smoke:1494-1495` | `addTeacher`/`teacherCategories` anchors match `/(^|\/)teachers\.(en\.)?html$/` | match `/…#view=add$/` and `/…#view=categories$/` | re-target, exact Spec-037 A1 precedent; `anchorOk` predicate unchanged |

D-3 declares **zero** protected-assert supersessions — it only **adds** the §7 row matrix T1-T7
(`d3-language-hash-contract.md` §7.3). D-2 declares **zero** — it only adds the orphan-set assert (net-new, not a
change to an existing assert).

**Everything else BYTE-VERBATIM**, in particular: `payHit`/`PAY28`/`tchPay`/`famPay`/`payFigure`/child-view (P-01…P-06)
· `finance` no-fake-money (P-07) · reports finance-free (P-08) · `pub.length===115` (P-09) · `navCount32===50` (P-10,
P-11) · `nav010.railCats===6` (P-12) · `finMembers` exact 8-list (P-13) · `admItems.length===5` (P-14) ·
`deadNav===0` (P-16) · `links010` (P-17) · `truth010.badPlanned===0`/`badDisabled===0` (P-18, vacuous-but-retained) ·
`prt.plannedNavAnchors===0` ×4 (P-19, vacuous-but-retained) · `zeroPlanned.planned===0 && .comingSoon===0` (P-21) ·
`nav040.planned===0 && .comingSoon===0` (P-22) · `a31`/`g32` gate floor `>=20` (P-23) · the `classSalaryReport` lock
at all five sites P-24/P-25/P-26/P-27/P-34 · `finLinks` exact 7-list (P-28) · `FUTURE_ROUTES==={}` (P-29, P-35) ·
`stillPlanned.length===0` (P-33) · `settings.items.length===7` (P-36) · `allItems.length===50` (P-37) ·
`FORM_DRAWERS_032.teacher` (`teacher.html`) `= ['trn-edit','trn-note']` · every finance/settings/library/certificates
lock and drawer register entry not named above · the sitewide standing censuses (§5 below).

**Never point any planned-item probe at `classSalaryReport`.** **Never repoint `HYBRID_032`/`PICKERS_032` beyond the
named `teachers` deletion.** **Never widen S1-S5 beyond the exact strings shown.**

---

## 5. Standing censuses re-verified, never weakened (product-wide, all 115 pages)

`type=password` = 0 · `type=file` = 0 · `<canvas>` = 0 · `.pdf`/`window.open` = 0 · credential-named inputs = 0 ·
authored secret value = 0 · fake-"Connected" chip = 0 · computed score/rank/leaderboard/percentile/chart = 0 ·
computed Total/outstanding/balance/profit/VAT/salary/payout = 0 · `href="#"` = 0 sitewide · 6 rail categories ·
raw locale keys = 0 · admin destinations reachable from any portal page = 0 · portal destinations reachable from any
admin page = 0 · teacher pay-free GLOBAL (source incl. comments, built HTML, smoke — three layers) · family zero-pay ·
student child-view · finance no-fake-money · settings no-fake.

---

## 6. Bans (explicit, binding on both fixes)

1. **No new dependency, component, page, `PAGES` entry, `data-*` hook, or storage key.** D-1 reuses `data-tabs`/
   `data-tab`/`data-tabpanel` (existing, Spec 035+) and the existing `SCHED_VIEW_KEY` prefix
   (`academy.schedView.teachers` is a **value**, not a new key). D-3 reuses `[data-set-lang]`/
   `[data-action="lang-menu"]` verbatim.
2. **No teacher pay/salary/rate/currency field** anywhere on `teachers.html`/`.en` — not in the moved Add form, not
   in the Categories panel, not in a comment. D1-P1…P4 bind absolutely.
3. **No `type=password` / `type=file`.** The CV gate stays a gate; no upload input is ever rendered.
4. **No fake persistence.** Every relocated final stays a clickable `data-disabled-reason` `common.backendRequiredNote`
   gate — exactly one primary per panel (D1-A3, D1-C4). No mutation, no fake save/success/mutation copy.
5. **No `<canvas>`, no PDF, no `window.open`, no drag/drop.**
6. **No hashchange listener.** D-3 does not add one (`d3-language-hash-contract.md` §4 N4) — same-page hash clicks
   remain non-reactive; this is why D-1's tablist, not a header anchor, is the affordance (K-1, accepted, out of
   scope for 041).
6b. **No unscoped `[data-set-lang]` selector in any D-3 test — THE TEST-DESIGN TRAP (found live).** `settings.html`
   bakes **TWO** `[data-set-lang]` elements and **both are the Customization tab's REAL language control** (they carry
   `data-lang-opt`); the **topbar menu's** buttons are **JS-injected into a popover on click** and are not in the built
   HTML at all. A bare `page.click('[data-set-lang="en"]')` therefore hits the *wrong* control — which routes through
   the same handler, so the row **passes while proving nothing**. Every D-3 row MUST click `[data-action="lang-menu"]`
   first, assert the popover opened, then click `.popover [data-set-lang="<lang>"]` (equivalently
   `[data-set-lang]:not([data-lang-opt])`). An unscoped selector is a **test defect**, rejected in review.
7. **No `location.search` preservation.** D-3 is hash-only by design (`d3-language-hash-contract.md` §4 N3) — adding
   `+ location.search` is a behaviour change beyond the minimal fix and is explicitly **not** adopted.
8. **No redesign of the language control, the tabs engine, the wizard engine, or the `:target` CSS.** D-3 changes
   only the string `langUrl()` returns.
9. **No duplication.** D1-M1…M8 — one live definition of the Add fields; the drawer templates are removed, not
   copied, not renamed-and-kept.
10. **No commit, no push, no branch cut by the authoring/implementing agent.** The watcher commits. No `tasks.md`
    written by a spec/plan-authoring round (this artifact is planning-only).
11. **D-2 gets zero source/HTML change of any kind** — no `nav.config.js` entry (Option B, rejected), no
    `index.html` link (Option C, rejected), no delete/move/rename (Option D, rejected).

---

## 7. STOP CONDITIONS (any one fires ⇒ halt, do not commit)

1. Any diff in a §2 forbidden file, outside the two named exceptions (`pages/teachers.js` under D-1;
   `enhance.js`'s single `langUrl` line under D-3).
2. Public HTML ≠ **115** · `PAGES` ≠ **57** · `.nav-panel .nav-item` ≠ **50** on any admin page.
3. Sitewide planned ≠ **0** · `[data-coming-soon]` ≠ **0** · disabled locks ≠ **1** (`classSalaryReport`) ·
   `FUTURE_ROUTES` ≠ `{}`.
4. Any new `data-*` hook, new localStorage key, or new dependency (§6.1).
5. `#page-body` drift beyond the declared allowlist: **exactly 2** bodies differ (`teachers.html`, `.en`) from
   `21502af`; a third differing body, or any differing body attributable to D-2/D-3, is a defect — HALT.
6. Any teacher pay figure, family currency figure, or student «لوحة الطالب»/«بوابة الطالب» token introduced anywhere
   (§3.3, §5).
7. Any protected assert changed outside the five declared D-1 supersessions S1-S5 (§4).
8. AR/EN locale key-set divergence ≠ 0 (`trn.*` pair only moves for D-1; no other pair moves).
9. Duplicate DOM ids, or any panel whose only interactive descendant is a `[data-drawer]`/`[data-modal-trigger]`
   trigger (D1-M1…M7, §3.6) — "a tab whose panel only holds an Open-the-form button is an explicit failure state,
   not a fallback" (`d1-teacher-route-contract.md` §13).
10. `enhance.js` diff ≠ exactly 1 changed line (§3.8), or that line lies outside `langUrl`'s `return`.
11. The orphan set ≠ exactly `{gallery.html, gallery.en.html}` (§3.9).
12. Any forbidden git operation (`stash`, `reset --hard`, `checkout --`, `clean`, a branch switch) used for
    verification — non-destructive only: `git show 21502af:<path>` or a detached `git worktree add --detach`.

---

## 8. Provenance

Reconciled against, and adds no rival option/count to: `spec.md` §7 (D-1 A-G, D-2 A-D, both decided) ·
`d1-teacher-route-contract.md` (the MOVE architecture, §§1-14) · `d2-gallery-orphan-contract.md` (Option A, owner +
entry-path record) · `d3-language-hash-contract.md` (the one-line fix, §§1-7) · `impact-boundary.md` §§2-4 (D-1
ceiling, the 0-diff wall) · `protected-test-register.md` §§1-6 (the full protected set, the supersession law, the
five D-1 sites, the T-01…T-10 additive requirements) · `count-and-freeze-contract.md` (the frozen counts). Roadmap
references to Specs 042-057 anywhere in the cited artifacts are maintainer-directed, append-only amendments, not
chartered specs.

---

## AMENDMENT (tasks-reconciliation gate) — R-1 / R-2 / R-3

### R-1 — the derived route matrix is ADDITIVE (binding)

`SP037_DEEPLINKS`, `SP039_DEEPLINKS`, `SP040_VIEWS` and the Spec-038 finance view array are **RETAINED VERBATIM**.
They are **not** deleted, replaced, folded in, or altered in assertion logic. The derived 24-route matrix is added
**beside** them as the generic **freeze layer**; the four existing blocks remain **domain-specific regression
coverage**. Deleting or folding any of them would be a **sixth protected-test supersession** — the budget is
**exactly S1–S5** and no sixth is permitted. The only literals that may change are those already inside S1–S5
because D-1 changed their real destination.

### R-2 / R-3 — the two test-runner files enter the edit budget

| File | Change | Class |
|---|---|---|
| `app/tests/a11y/run.cjs` | exit non-zero when **`critical > 0` OR `serious > 0`** (today: `critical` only, `:375`). No threshold, no allowlist, no suppression. Baseline must first be shown at 0/0. | **strengthening** — not S6 |
| `app/tests/screenshots/capture.cjs` | exit non-zero when the captured **console-error count > 0** (today: always `process.exit(0)`). No filtering, no ignored-console allowlist. | **strengthening** — not S7 |

Both make an **already-claimed** result machine-enforced for the first time. Neither weakens, relocates or deletes
an assertion. Each carries a proof obligation: a synthetic `serious` violation / an injected console error MUST make
its runner exit non-zero, and removing it MUST restore green.

### Final edit budget for Spec 041

**Application source (6)**: `nav.config.js` · `pages/teachers.js` · `components/teacher-actions.js` · `enhance.js`
(one expression, D-3) · `locales/ar.trn.js` · `locales/en.trn.js`.
**Tests (3)**: `tests/smoke/run.cjs` · `tests/a11y/run.cjs` (R-2) · `tests/screenshots/capture.cjs` (R-3).
**Docs**: `tests/screenshots/REVIEW.md` · `CLAUDE.md` · `app/README.md` (only if required) · the Spec-041 directory.
**Everything else remains 0-diff** — in particular `package.json`, `scripts/build-html.mjs`, `src/js/i18n.js`,
`components/sidebar.js`, `components/tabs.js`, `components/form-field.js`, `components/settings-section.js`,
`components/preview-drawer.js`, `components/ui.js`, the settings fixtures, `pages/staff.js` +
`fixtures/staff-management.js`, every portal source/fixture, and every unrelated page/locale/fixture.
**No** new dependency, component, page, `PAGES` entry, `data-*` hook, `hashchange` listener or storage key.
