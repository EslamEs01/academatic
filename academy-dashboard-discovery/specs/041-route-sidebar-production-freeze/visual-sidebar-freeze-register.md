# Spec 041 — Visual / A11y Sidebar Freeze Register

**Scope of this register**: the navigation surfaces only — the admin `.nav-rail`/`.nav-panel` shell
(`src/js/components/sidebar.js`) and the portal `aside.pt-sidenav` / `details.pt-nav-drawer` shell
(`src/js/components/portal-shell.js`) — across every state, role, language, theme and viewport they can
render in. It is a **coverage specification** (what must be screenshotted and axe-scanned, and what
"pass" means), not a redesign and not an implementation. No test file, source file or HTML file is
touched by this document. §9 states the hard boundary against the later bounded review specs.

This register is written against the LIVE baseline at HEAD `21502af` (Spec 040 committed) using the
authoritative facts supplied to this spec and independent source reads (`sidebar.js`, `portal-shell.js`,
`enhance.js`, `app.css`, `nav.config.js`, `ar.js`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`)
performed while drafting this file.

---

## 1. The navigation-state inventory (grounded, not assumed)

Two independent nav shells exist; four roles map onto them.

| Shell | Roles rendered | Source |
|---|---|---|
| Admin category rail + panel | admin only (64 files: 32 bases × 2 langs) | `components/sidebar.js` |
| Portal role sidenav / native drawer | teacher, family, student (48 of the 50 portal files: 24 of 25 bases × 2 langs — `portals.html` hub has no role sidenav) | `components/portal-shell.js` |

### 1.1 Admin shell — THREE distinct visual states (all three are real, sourced, and none is
currently in the a11y or screenshot matrices as a **named, asserted state** — see §7 gap analysis)

| # | State | How reached | DOM signature | Persistence |
|---|---|---|---|---|
| A1 | **Expanded desktop** (default) | any admin page load, viewport ≥768px, `academy.rail` unset or `'0'` | `.app-shell` has no `data-rail` attr (or `data-rail="false")`; `.nav-rail` (icon strip) + `.nav-panel` (labeled panel) both visible; `.rail-toggle[aria-expanded="true"]` | `RAIL_KEY = 'academy.rail'`, `localStorage` |
| A2 | **Collapsed rail** | click `[data-action="toggle-rail"]` (the `.rail-toggle` button, first control in `.nav-rail`) | `.app-shell[data-rail="true"]`; CSS `.app-shell[data-rail='true'] .nav-panel{display:none}` (`app.css:304`) and `.app-shell[data-rail='true']{--sidebar-w:var(--rail-w)}` (`app.css:25`) — only the icon rail + `title` tooltips remain; `.rail-toggle[aria-expanded="false"]` | same key, value `'1'`; **survives page navigation and reload** (source: `enhance.js:188-190` reads `RAIL_KEY` on every load via `applyRail()`) |
| A3 | **Mobile off-canvas drawer** | viewport <768px (`.app-shell > .sidebar{display:none}` at `app.css:365`, inside the `@media (max-width:767px)` block) → topbar hamburger `[data-action="open-drawer"]` (`components/topbar.js:15`, `.menu-toggle`, itself `@apply md:hidden`) | `enhance.js:421-429 openDrawer()` clones `#shell > .sidebar` into a `.drawer.is-open` panel + `.scrim.is-open` backdrop; the clone keeps **both** `.nav-rail` and `.nav-panel` regardless of A1/A2 state ("the off-canvas drawer keeps the category rail + panel so category switching works on mobile", `app.css:331`) — i.e. A3 always shows the EXPANDED layout even if the desktop state was A2 | none — closes on scrim click / `Escape` / re-open; not persisted |

A2 is the material finding of this section: **it is a real, source-verified, user-reachable, persisted
UI state that has zero rows in either `tests/a11y/run.cjs` or `tests/screenshots/capture.cjs` today**
(`grep -n "toggle-rail\|data-rail=" tests/a11y/run.cjs tests/screenshots/capture.cjs` → 0 hits, verified
while drafting this register). §5 and §7 specify the fix.

### 1.2 Portal shell — TWO distinct visual states (Spec 017 "Shell v2", frozen; amendments A1/A2 in
that spec's own numbering are unrelated to A1/A2 above)

| # | State | How reached | DOM signature | Persistence |
|---|---|---|---|---|
| P1 | **Expanded desktop sidenav** | any portal-internal page load, viewport ≥768px | `aside.pt-sidenav` (`portal-shell.js:95`), always rendered, no collapse toggle exists (grep-confirmed: 0 `collapse`/`aria-expanded` tokens in `portal-shell.js`) — this is Spec-017 freeze amendment **A2 "no-collapse"**, i.e. the portal shell was DELIBERATELY never given an A2-style rail state | none (nothing to persist) |
| P2 | **Native mobile disclosure** | viewport <768px | `<details class="pt-nav-drawer"><summary>…menu…</summary>…</details>` (`portal-shell.js:89-93`) — a **native** HTML disclosure, not a JS-built scrim/drawer clone like A3; this is Spec-017 freeze amendment **A1 "native-disclosure"** | native `open` attribute only, resets on navigation |

Portal shell has **no collapsed/rail-equivalent state** by design (P1 has no A2 analogue) — this register
must not invent one. Where the assignment brief says "collapsed/rail state" it is scoped to the admin
shell (A2) only; the portal 4th-role coverage instead needs P1 + P2, not a third portal state.

### 1.3 What "active item" and "active deep-linked child item" mean concretely per shell

| Concept | Admin (`sidebar.js`) | Portal (`portal-shell.js`) |
|---|---|---|
| Active item | `.nav-item.is-active` + `aria-current="page"` on the `<a>` whose `it.id === activeId` (`navItem()`, `sidebar.js:41-45`); `activeId` is the page's own nav id, baked at build | analogous `a.pt-nav-item` current-page marking (own aria-current pattern; unaffected by this register) |
| Active deep-linked child item | **N/A as a nav-rail highlight** — none of the 22 `#view=` items receive a DIFFERENT `.is-active` treatment than their parent page's own nav id; e.g. loading `finance.html#view=invoices` highlights the `finance` nav row (id `finance`, not `invoices`) as active, because `activeId` is baked per-HTML-file, not per-hash. **This is a real, source-confirmed, non-defect fact this register must specify as a TEST, not omit**: the sidebar highlight is coarse (file-level); the FINE-grained "which tab is open" signal lives entirely in the tab strip (`role="tab" aria-selected`), never in the sidebar. §4 specifies the exact assertion. | portal `ROLE_NAV` items carry **plain routes with no `#view=` hash at all** (confirmed: `grep -c '#view=' src/js/fixtures/portal.js` → 0) — the only portal-side hash-deep-link in the whole product is the family-child `#child=stX` drill-down (Spec 018), which is a BODY state, not a nav-sidebar item (`family-child` is not itself in `ROLE_NAV`). **Portal nav therefore has no "active deep-linked child item" case to cover** — recorded here as a checked fact, not a gap. |

---

## 2. The four-role × two-theme × two-language × states matrix

Base cells required (role × theme × lang × applicable states, desktop + mobile where the state differs
by viewport):

| Role | Shell | States to shoot/scan | Cells (states × 2 themes × 2 langs) |
|---|---|---|---|
| Admin | sidebar.js | A1, A2, A3 | 3 × 2 × 2 = **12** |
| Teacher | portal-shell.js | P1, P2 | 2 × 2 × 2 = **8** |
| Family | portal-shell.js | P1, P2 | 2 × 2 × 2 = **8** |
| Student | portal-shell.js | P1, P2 | 2 × 2 × 2 = **8** |

**Total base nav-shell cells: 36.** This is the floor before adding the content-specific rows in §3–§6
(long labels, active-item, deep-link, lock, keyboard-focus) which layer ON TOP of a subset of these 36
cells rather than multiplying them out fully (e.g. the classSalaryReport lock only needs to be shot inside
admin A1/A3, not inside A2 or any portal state, since the lock item is admin-finance-only).

RTL/LTR is not a separate axis here: `ar` pages are RTL (`dir="rtl"`), `en` pages are LTR (`dir="ltr"`) —
already the "lang" column above; §1's CSS evidence already shows the RTL/LTR-sensitive rules that must be
exercised in both directions (`html[dir='rtl'] .drawer{transform:translateX(100%)}` vs.
`html[dir='ltr'] .drawer{transform:translateX(-100%)}`, `app.css:324-326` — the drawer slides in from the
OPPOSITE physical edge per direction; a screenshot pair (ar+en) of state A3 is the direct proof this rule
is applied, not just declared).

---

## 3. Long-label stress rows (grounded in the actual longest strings, not invented placeholders)

Read `src/locales/ar.js` for the true longest AR nav labels (no placeholder Latin-lorem text — every
`data-*` hook in this product is forbidden from carrying anything but real authored copy, and a visual
freeze register must audit with real copy for the same reason):

| Nav id | AR label (source: `ar.js:14-31`) | Length (chars) | Why it stresses layout |
|---|---|---|---|
| `settingsUsers` | «المستخدمون والموظفون» | 21 | longest settings-category label; must not clip in A2 (rail-only, `title` tooltip) or wrap awkwardly in A1/A3 panel width (`min(334px,92vw)` drawer cap) |
| `announcements` (control cat) | «الإعلانات والإشعارات» | 21 | ties for longest in the whole nav; control category has 12 items — tests vertical density too |
| `classSalaryReport` | «تقرير رواتب الفصول» | 19 | longest **disabled/locked** label — must coexist with the lock icon (`icon('lock','ico ico-sm nav-lock')`, `sidebar.js:35`) without the label text colliding with the icon (this is the §6 lock row's typography case) |
| `staff` | «الفريق والصلاحيات» | 18 | admin-category longest |
| `nav.reason.finance` (tooltip, not a label) | «يتطلب نظام الفوترة الفعلي — صفحة «المالية» تعرض معاينة تجريبية بالبيانات الثابتة.» | 90 | the `title=` attribute on the `classSalaryReport` button (`sidebar.js:34`) — long enough that its native browser tooltip rendering must be checked for legibility, not just presence |

EN counterpart rows use the EN strings for the same 4 ids (mirrored 1:1, per the `ar`/`en` locale-parity
law already verified elsewhere in the corpus) — English strings are typically shorter, so the AR row is
the binding stress case; the EN row exists to prove the SAME layout doesn't over-compensate (e.g. leaving
excess empty space that looks broken) rather than to find a new failure mode.

**Required assertion (screenshot, all 3 admin states × 2 langs = 6 frames minimum)**: the `settings` and
`control` (or wherever `announcements` lives) category panels, opened via `[data-nav-category]` click,
captured in A1 (full panel), A2 (rail-only — verifying the `title` tooltip does NOT auto-render in a
static screenshot, so this cell is really an a11y-tree assertion that `title` text equals the full label,
not a pixel check), and A3 (mobile drawer width cap).

---

## 4. Active item / active deep-linked child item — required assertions

Because §1.3 established the sidebar highlight is FILE-level, not TAB-level, the correct test is a
**two-part** assertion, and both parts must be specified so neither is silently dropped:

1. **Sidebar highlight (file-level)**: loading `finance.html#view=invoices` (or any of the 22 deep-links)
   → the PARENT file's own nav-id row (`finance`, `families`, `reports`, `teacher-performance` via
   `teacherKpi`, `library`, `certificates`, `settings`) carries `.is-active` + `aria-current="page"`.
   **This is already covered** by the existing per-page `nav010`/`navCount32` sweep (every admin page
   asserts its own `activeId`) — §7 records it as HELD, not a gap.
2. **Tab strip highlight (view-level)**: the SAME load → the tab whose `data-tab` equals the `#view=`
   fragment carries `role="tab" aria-selected="true"` and is the only visible `[role="tabpanel"]`. This
   is the discriminating check already specified by the "Deep-link test discrimination rule" (seeded
   `localStorage` vs. hash precedence) — §7 records which of the 22 have it (9 seeded) and which don't
   (13 unseeded, `run.cjs` L2273-2362) as the load-bearing gap this register inherits from the smoke-test
   grounding, **not a new finding of this register** — cited here only because the VISUAL proof (a
   screenshot with the correct tab visually highlighted) is a separate artifact from the DOM assertion,
   and today only frames exist for materials/books/certificateRequests/settings×6 relative to the
   `sp039`/`sp040` tags (§7 table) — the 13 unseeded deep-links have fresh-load DOM proof but **no
   dedicated screenshot frame proving the tab is visually the active one** (they DO appear in frames from
   §1's admin-category clicks and from the earlier per-spec `sp035`-`sp038` frames, so this is a labeling
   gap in the screenshot filename taxonomy, not a missing capture — recorded in §7 as LOW severity).

Required new frames (if none already tagged): one fresh-context screenshot per deep-link GROUP (not per
view — 8 groups: families, students, teacher-performance, reports, finance, library, certificates,
settings) × 2 langs, with the active tab visually confirmable = **16 frames**, most of which likely
already exist under `sp035`…`sp040` tags per the grounding's own frame inventory (§7 cites the exact
counts) and simply need a pass/fail checklist entry rather than new capture work.

---

## 5. `classSalaryReport` disabled-lock — required visual + a11y assertions

Source-confirmed rendering (`sidebar.js:33-36`):
```html
<button type="button" class="nav-item is-disabled" data-nav="classSalaryReport"
  data-nav-status="disabled" aria-disabled="true" data-disabled-reason
  data-reason-key="nav.reason.finance" title="…90-char AR reason…"
  aria-label="…label — reason…">
  {icon} <span class="label">تقرير رواتب الفصول</span> {lock icon, class="ico ico-sm nav-lock"}
</button>
```

Required assertions (in addition to the already-HELD DOM assertions in the smoke suite — the lock is asserted at
**FIVE** independent sites: `run.cjs:1728-1742` · `1769-1793` · `2386-2398` · `2526-2527` · `2551`; see
`honest-lock-register.md` §4 and `protected-test-register.md` §1.4):

| Check | Method | Pass condition |
|---|---|---|
| Visual muted treatment | screenshot, finance sub-section expanded, both langs, light+dark | the row reads visually distinct from the 6 implemented finance siblings (this is what the `sp038-classsalary-lock`/`-en` frames already capture per §7's inventory — REUSE, do not recapture) |
| Lock icon does not collide with the 19-char label | screenshot at 2 zoom-equivalent widths (desktop ≥1366px, mobile A3 drawer ≤334px) | icon + label do not overlap, no clipped last character (this is the direct payoff of the §3 long-label register applied to the ONE locked item) |
| `title` tooltip legible | a11y tree query, not pixel | `aria-label` computed value contains both the label AND the 90-char reason (already true by construction — `aria-label="${label} — ${reason}"`, `sidebar.js:34`) |
| Focus visible on the disabled button | keyboard Tab to the row, screenshot | disabled buttons are still focusable (no `disabled` HTML attribute is used — it is `aria-disabled`, a CSS-only mute, per `sidebar.js:33` using `<button type="button" class="…is-disabled" aria-disabled="true">` NOT `<button disabled>`) — a visible focus ring MUST render exactly like any other nav item; this is the concrete case for the §6 "no invisible focus" verify-list item |
| axe: no `aria-disabled` / `button` role conflict | axe-core scan with the finance sub-section expanded | 0 critical, 0 serious (existing target, reused) |
| Dark mode | screenshot, dark theme, both langs | lock icon + muted text stay contrast-legible against `--c-nav-panel` dark token — direct instance of the "no unreadable contrast" verify-list item |

This is the ONLY disabled/locked item in the entire product (facts: "exactly 1 disabled lock" sitewide) —
so it is also the only row needing this treatment; no matrix multiplication beyond the table above.

---

## 6. Keyboard focus — required assertions (admin rail tablist + portal disclosure)

Two independently-implemented keyboard surfaces exist and must both be specified:

1. **Admin category rail** (`role="tablist"` at `.rail-cats`, `sidebar.js:84`) — roving tabindex per
   `railCat()` (`sidebar.js:70-74`, `tabindex="0"` only on the active tab) driven by `enhance.js:217-222`
   (arrow-key handler). Required: `ArrowDown`/`ArrowUp` (rail is `aria-orientation="vertical"`) moves focus
   between the 6 category tabs, `Enter`/`Space` activates, and the newly-activated tab's `aria-selected`
   flips — with a **visible focus ring** at every step (screenshot with `:focus-visible` captured, both
   themes — dark-mode focus rings are the highest-risk case for "no invisible focus", since a focus ring
   using the same hue family as `--c-canvas` dark can vanish).
2. **Portal native disclosure** (`<details class="pt-nav-drawer">`) — native keyboard semantics apply for
   free (`Enter`/`Space` on `<summary>` toggles `open`); required: Tab reaches `<summary>`, activates it,
   Tab then continues INTO the now-open nav item list (not trapped, not skipped) — this is the concrete
   "no sidebar scroll trap" / "no mobile backdrop/close problem" check for the portal shell specifically
   (P2 has no scrim/backdrop element at all — it is a native disclosure, so there is structurally no
   backdrop-click-to-close code path to test; recorded here so no test is invented for a mechanism that
   does not exist).
3. **Admin mobile drawer (A3) focus trap + Escape**: `enhance.js` `openPanel`/`closeDrawer` general
   pattern (confirmed via `openDrawer()`/`scrim`/`is-open` machinery, §1.1) — required: focus moves INTO
   the drawer on open, `Escape` and scrim-click both close it and RETURN focus to the triggering hamburger
   button (the general `lastFocus`/`closeDrawer` pattern already confirmed in `enhance.js:415-418` for the
   sheet/panel family — the SAME pattern is used for the sidebar drawer since `openDrawer()` calls the
   shared `openPanel()`).
4. Already-covered keyboard case (do not re-derive, reuse): the library/certificates `KEYBOARD tab
   switching (roving tabindex ArrowRight/ArrowLeft)` rows cited in the CLAUDE.md Spec-039 history — that
   is TAB-STRIP keyboard nav, a different `role="tablist"` from the admin CATEGORY rail in this section;
   both exist in the product and both need coverage, under different ids (`data-tabs` tablists vs.
   `[data-nav-rail]` tablist) — this register is only responsible for the nav-rail one.

---

## 7. Coverage-gap analysis against the CURRENT `tests/a11y/run.cjs` / `tests/screenshots/capture.cjs`

| Item | Current a11y rows | Current screenshot frames | Verdict |
|---|---|---|---|
| A1 expanded desktop sidebar | present (every admin `MATRIX` row implicitly renders A1 as the default state) | present (`cat:'admin'`, `cat:'settings'`, `cat:'families'`, `cat:'teachers'`, `cat:'reports'` category-open frames, `capture.cjs:58-63`) | **HELD** |
| A2 collapsed rail | **0 rows** (`grep` confirmed) | **0 frames** (`grep` confirmed) | **GAP — new, this register's primary finding** |
| A3 mobile drawer | present (Spec-017 "native mobile nav disclosure, captured OPEN", `capture.cjs:211` comment — NOTE this comment literally names the PORTAL native disclosure, not the admin scrim/drawer; re-verify which shell it actually targets before assuming admin A3 is covered) | same caveat | **PARTIAL — re-verify scope, do not assume covered** |
| P1 portal expanded desktop | present (every portal-internal `MATRIX` row) | present | **HELD** |
| P2 portal native mobile disclosure | present via `s.roleDrawer` driver (`capture.cjs:494`, `.pt-nav-drawer > summary` click) | present | **HELD** |
| classSalaryReport lock | present (finance a11y rows, §5 targets already asserted in DOM by smoke) | present (`sp038-classsalary-lock` / `-en`, 2 frames, confirmed opened as images during grounding) | **HELD for DOM+existing frames; NEW checks in §5's table (icon/label collision, dark contrast) not yet enumerated anywhere** |
| Long AR labels (settingsUsers, announcements, classSalaryReport, staff) | not enumerated as a dedicated stress case anywhere | not enumerated | **GAP — new** |
| Active deep-linked child (tab-level visual) | DOM-level: 9/22 seeded + 13/22 unseeded (inherited fact, not this register's finding) | frame TAXONOMY gap only — likely-existing frames under `sp035`-`sp040` tags are not filed under a "which tab is visually active" checklist | **GAP is labeling/checklist, not missing capture — LOW severity** |
| Keyboard focus — admin rail tablist arrow-keys | not found as a dedicated row (`a11y/run.cjs` `s.keys` driver exists per the grounding facts, but scoped to `data-tabs` roving tabindex, i.e. tab STRIPS, not the `data-nav-rail` CATEGORY tablist) | not found | **GAP — new** |
| Keyboard focus — admin drawer trap/Escape/return-focus | not found as a dedicated row | not found | **GAP — new** |
| `settingsUsers` (#view=users) thinness | exactly 1 a11y row, 1 screenshot frame (both already flagged as the thinnest deep-link view in the supplied grounding) | same | **Pre-existing thin spot, inherited — this register's §2/§3 rows naturally thicken it (it is the §3 longest-label specimen) without a dedicated new row** |

Net new rows this register specifies that do not exist today: **A2 (collapsed rail) full matrix (12
cells per §2) + long-label stress captures (§3, 6 frames) + lock icon/label collision + dark-contrast
checks (§5, 2 new checks) + rail-tablist keyboard (§6.1) + drawer focus-trap/Escape (§6.3)**. Everything
else in §1–§6 is either already held by the existing suites or is a checklist/labeling clarification over
existing captures, not new capture work.

---

## 8. Verify list — the 9 defect classes, mapped to concrete checks in this register

| # | Defect class (from the assignment) | Concrete check(s) in this register |
|---|---|---|
| 1 | No clipped labels | §3 long-label rows (all 3 admin states); §5 lock label/icon collision |
| 2 | No overlapping badges/icons | §5 lock icon vs. 19-char label; the `nav-badge` count badges on `sessions`/`invoices` etc. (existing `.badge.nav-badge.tabular`, `sidebar.js:44`) checked at both label-length extremes in A1/A2/A3 |
| 3 | No invisible focus | §6.1 rail-tablist arrow-key focus ring, both themes; §5 disabled-button focus ring; §6.3 drawer-open focus |
| 4 | No off-screen nav | A2's `--rail-w` width collapse (verify the rail itself never goes to 0/negative width, i.e. never disappears entirely — distinct from A1↔A2 toggling which is intentional); A3/P2 drawer positioning both RTL (`translateX(100%)`) and LTR (`translateX(-100%)`, §2) |
| 5 | No unreadable contrast | §5 dark-mode lock-icon/muted-text row; general A1/A2/A3 × light/dark pairs (§2's 36-cell matrix IS this check, applied structurally) |
| 6 | No incorrect section expansion | admin category-panel show/hide (`cat-panel[hidden]` toggling on `[data-nav-category]` click, `enhance.js` category-rail switch logic) — verify exactly ONE `.cat-panel` lacks `hidden` at any time, across all 6 categories × A1/A2/A3 |
| 7 | No sidebar scroll trap | admin A1/A3 with the 12-item `control` category open (the longest category) — verify the panel scrolls internally without trapping page scroll or losing keyboard reachability of items below the fold; portal P1/P2 with 9-item teacher `ROLE_NAV` (longest portal list) |
| 8 | No mobile backdrop/close problem | A3 scrim click-to-close + `Escape` + return-focus (§6.3); P2 has NO backdrop by construction (§6.2) — verify this is intentional, not a missing feature (native `<details>` needs none) |
| 9 | No visual "coming soon" residue | direct re-verification of the DOM-level "sitewide planned=0, `[data-coming-soon]`=0" fact (already held) AT THE PIXEL LEVEL across A1/A2/A3 — i.e. confirm A2's rail-only icons carry no leftover `nav-soon` pill artifact and A3's cloned drawer (built by `cloneNode(true)` off the LIVE sidebar, `enhance.js:422`) does not resurrect a stale `data-coming-soon` node from a caching/clone bug |

---

## 9. Targets

- a11y: **critical = 0, serious = 0** across every cell in §2's 36-cell base matrix plus the §3–§6
  specimen rows, using the project's existing `@axe-core/playwright` harness (`tests/a11y/run.cjs:359-365`,
  `impact === 'critical'` / `'serious'` classification — reused unchanged, not redefined by this register).
- Console errors: **0**, using the project's existing per-frame console-error collection
  (`tests/screenshots/capture.cjs:456-458`) — noting the existing structural weakness (also inherited, not
  new): the screenshot suite reports console-error counts but **never fails the run on them**
  (`capture.cjs:545`, `process.exit(0)` unconditionally) — advisory only. This register does not change
  that; it specifies the CONTENT of what should be captured, not a change to the harness's exit-code
  policy (that is an implementation decision, out of scope for a specify-only register).
- Screenshot frame count added by this register if implemented in full: **12 (A2 matrix) + 6 (long-label)
  + 0 new for lock, since existing `sp038-classsalary-lock` frames are reused + 16 (deep-link tab-active,
  likely overlapping existing `sp035`-`sp040` frames rather than net-new) + a small number of interaction
  frames for §6 keyboard rows (rail-tablist focus, drawer-trap) not separately budgeted here since keyboard
  states are usually captured as `:focus-visible` variants of already-open panels, not wholly new pages.**
  This register intentionally does not commit to an exact final frame count — that arithmetic belongs to
  the plan/tasks phase of whatever spec implements this register, per the Spec-041 "specify only" rule.

---

## 10. Boundary — what this register explicitly does NOT own

Spec 041 (as redefined by `040-.../future-owner-register.md` §1/§3, which this spec's own `spec.md`
reconciles against the conflicting `033-.../follow-up-spec-roadmap.md` framing — see that file, not
duplicated here) is a **route/sidebar BASELINE freeze**, not the final product freeze and not a visual
redesign. This register inherits that boundary explicitly:

- **Full page / academic visual redesign** (typography system, color system beyond
  contrast-compliance, layout rework, illustration/iconography direction) is **deferred to the later
  bounded review specs** — per the committed 042–057 roadmap amendment, the pages-and-surfaces-scoped
  specs (045 Admin General Operations & Communications Review · 046 Admin People & Academic Operations
  Review · 047 Reports, Analytics & Finance Review · 048 Content, Certificates, Access & Settings Review ·
  049 Teacher Portal Full Review · 050 Family & Student Portal Full Review) are the ones that "each own a
  set of pages and combine evidence review + complete forms/interactions + modal/drawer improvement +
  visual redesign" (per the assignment brief's own framing, corroborated by the roadmap's per-spec
  descriptions in the supplied facts). Spec 041 supplies those specs a CLEAN, PROVEN-HONEST nav baseline
  to build on top of — it does not pre-empt their redesign authority over the pages the sidebar merely
  links to.
- **Modal/drawer/long-form interaction system redesign** → Spec 044 (FO-23, already assigned in the
  committed corpus) — this register's §6.3 drawer-focus-trap check is a HONESTY/ACCESSIBILITY floor
  (focus must not be lost or trapped), not a visual/interaction redesign of the drawer itself; 041 must not
  be read as green-lighting drawer restyling.
- **Form completeness re-audit** → Spec 056 (FO-24) — out of this register's scope entirely; no form
  fields are touched by a nav-shell register.
- **classSalaryReport's underlying feature** (a real class-salary computation) stays owned by a future
  payroll/backend spec (per the standing "hiding a nav link is NOT authorization" law) — §5 of this
  register audits the LOCK'S PRESENTATION only, never proposes unlocking it.
- **No new `data-*` hook, no new storage key.** Every check in §1–§8 above is specified against
  EXISTING hooks (`data-nav-category`, `data-nav-rail`, `data-action="toggle-rail"`, `data-action="open-
  drawer"`, `data-rail` attribute, `academy.rail` storage key, `role="tablist"`/`role="tab"`, the existing
  `s.keys`/`s.roleDrawer`/`s.cat`/`s.view` screenshot-matrix drivers). If an implementer of this register
  finds a check in §1–§8 requires a NEW hook to express, that is itself a finding to escalate, not
  something to add silently.
- **This register does not lower or re-scope any protected assert.** Every DOM-level fact it cites (nav
  counts, lock state, planned=0, `#view=` route strings) is inherited from the supplied authoritative facts
  and the live `nav.config.js`/`smoke` grounding, never re-derived to a different number.

---

## 11. Summary table — this register's net additions vs. the current test corpus

| Register section | New coverage specified | Reuses existing |
|---|---|---|
| §2 admin A2 (collapsed rail) | 12 cells (3 states collapse to the 1 net-new state × 2 themes × 2 langs) | 0 |
| §3 long-label stress | 6 frames (2 categories × 3 states, folded to ≤6 by reusing A2/A3 as DOM-tree checks rather than pixel diffs where a screenshot adds no new information over A1) | existing category-open frames as the A1 baseline |
| §4 active deep-linked child (tab-level) | checklist/labeling pass over likely-existing `sp035`-`sp040` frames | DOM-level 9-seeded/13-unseeded fact (inherited, not re-derived) |
| §5 classSalaryReport lock | 2 new checks (icon/label collision, dark contrast) | existing `sp038-classsalary-lock`/`-en` frames + existing DOM asserts (**5 sites**) |
| §6 keyboard focus | rail-tablist arrow-keys (new), drawer focus-trap/Escape/return-focus (new) | existing tab-strip `s.keys` driver (different tablist, cited not duplicated) |
| §8 verify list | maps 9 defect classes onto the above — no new capture beyond what §2–§6 already specify | — |

---

## Roadmap-provenance caveat (binding, appended by the plan-round reconciliation)

> The committed spec corpus charters, as a spec directory with its own `spec.md`, **only Spec 041**. **Every spec
> number above 041 named anywhere in this file (042 · 043 · 044 · 045–050 · 051–057) is a MAINTAINER-DIRECTED,
> APPEND-ONLY AMENDMENT — recorded in `040-settings-deep-links-subpages/future-owner-register.md` §1 — NOT a
> chartered spec.** Any ownership assignment made here binds whichever spec is eventually chartered into the named
> slot; this file invents no spec number and creates no roadmap entry.
