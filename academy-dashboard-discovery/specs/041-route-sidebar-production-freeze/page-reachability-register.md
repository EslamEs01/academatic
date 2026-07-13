# Page Reachability Register — Spec 041

Recomputed live against HEAD `21502af` (clean tree). Companion to `current-route-inventory.md` (the 115-file
partition), `count-and-freeze-contract.md` (the frozen counts + the supersession law) and `deep-link-register.md`
(the 22 `#view=` routes and the two non-unique destinations). This register answers a narrower question: **for every
one of the 115 generated files, is it actually reachable by a link somewhere in the corpus, and is every outbound
link on every page honest (real target, no dead/placeholder form)?**

## 1. Method

Two independent evidence sources, cross-checked, neither invented for this register:

1. **The smoke suite's link-integrity crawl** (`tests/smoke/run.cjs`), run on all 115 pages:
   - `links010` (`run.cjs:1805-1818`) — for every `a[href]` on the page: counts `href="#"`/empty → `deadHash`;
     skips in-page `#...` anchors and `https?:`/`//` externals; strips any `#view=` fragment
     (`h.split('#')[0]`) and checks the remaining filename against `VALID_FILES` (`PAGES` + `index.html`,
     built `run.cjs:41-43`) → `badTarget`.
   - `deadNav` (`run.cjs:145-147`, asserted `run.cjs:180`) — every `.nav-panel .nav-item`: an `<a>` must carry
     a non-empty, non-`#` `href`; a `<button>` must carry `data-coming-soon` or `data-disabled-reason`.
   - Assertions: `ok(links010.deadHash === 0, ...)`, `ok(links010.external === 0, ...)`,
     `ok(links010.badTarget === 0, ...)`, `ok(info.deadNav === 0, ...)` — all run on every one of the 115 pages
     (`links010`) and every admin page (`deadNav`).
2. **A direct source/inventory cross-reference** (this register, built from `nav.config.js`,
   `scripts/build-html.mjs`, `components/portal-shell.js` `ROLE_NAV`, and the drill-down link call sites in
   `pages/*.js`) — used to classify *how* each of the 57 bases is reached, and to isolate any base that is
   registered in `PAGES` but appears in none of: `nav.config.js` routes, any `ROLE_NAV` entry, `index.html`,
   or any drill-down `href` template.

## 2. Sitewide reachability census (all 115 files)

| metric | count | source |
|---|---|---|
| `href="#"` (dead hash) | **0** | `links010.deadHash`, `run.cjs:1805-1808`, asserted `:1821` — standing since Spec 011 |
| empty `href=""` | **0** | same `deadHash` branch (`h === ''`) |
| `javascript:` pseudo-links | **0** | no `javascript:` scheme appears in any rendered `href` across the 115 files — the same sitewide crawl finds no third link class beyond hash/relative/external |
| raw (unresolved) locale keys in link text/labels | **0** | every `t(...)`-driven string resolves through the registered `ar/en.*.js` modules at build time; the build fails closed on a missing key (no raw `key.path` token has ever surfaced in a built page) |
| missing `.html` link targets | **0** | `links010.badTarget`, `run.cjs:1815-1817`, asserted `:1823` — every non-hash, non-external `href`, once its `#view=` fragment is stripped, resolves to a file in `VALID_FILES` |
| dead `#view=` hashes (hash present, no matching `[data-tab]` on the target page) | **0** — but see the verification-method caveat below | not covered by `badTarget` (it strips the fragment); covered instead by the 22 hand-written fresh-context deep-link blocks (`run.cjs:2244-2472`) plus the 9/22 source-pinned routes (`run.cjs:2512-2555`) — see §3 |
| dead `.nav-panel .nav-item` (anchor w/o route, or planned/disabled button w/o a hook) | **0** | `deadNav`, `run.cjs:145-147`, asserted `:180`, every admin page × 2 langs |
| external links | **0** | `links010.external`, asserted `run.cjs:1821` |

**Verification-method caveat on the `#view=` row** (carried forward, not re-litigated here — the structural gap
itself is out of this register's scope): `badTarget` strips every fragment before validation, so it can never
by itself prove a `#view=` hash resolves to a live tab. The **0 dead hashes** figure is true and is instead
proven by the 22 nav items each getting a dedicated fresh-context load (`run.cjs:2244-2472`) that asserts
`r.active === view` — i.e. the hash actually activated the named tab. 9 of those 22 (`materials`/`books`/
`certificateRequests` + the 6 `settingsX` items) are additionally **discriminating** (seeded with a conflicting
`localStorage` view first — `SP039_DEEPLINKS`/`SP040_VIEWS`, `run.cjs:2404-2472`); the other 13 are unseeded and
only prove "hash beats the baked default," not "hash beats a real stored view." That distinction is a *test
coverage* question, not a *reachability* one — recorded here for completeness, owned by the coverage-gap
register.

## 3. Reachability matrix by entry path (57 bases — an exact partition, no residue)

Every base falls into **exactly one** entry-path class, and the classes sum to the frozen 57 (32 admin + 25 portal)
without double-counting. `index.html` is not a base (it is outside `PAGES`) and is listed separately.

| # | entry-path class | bases | how reached |
|---|---|---:|---|
| 1 | **admin nav destination** | **26** | the file named by an admin nav item. 27 plain routes resolve to **25** distinct files (`addTeacher` + `teacherCategories` collapse onto `teachers` — D-1), plus **`library`**, which has **no** plain route and is reached only by its two `#view=` deep-links (`materials`, `books`). The other 7 deep-link host files (`families`, `students`, `teacher-performance`, `reports`, `finance`, `certificates`, `settings`) already hold a plain route and are counted once, here. |
| 2 | **admin drill-down** (no nav id of its own) | **5** | `family`, `student`, `course`, `group`, `teacher` — reached only via a directory-card link on their parent list page (`families`/`students`/`courses`/`groups`/`teachers`), never from the sidebar |
| 3 | **admin reference-only (ORPHAN)** | **1** | `gallery` — `activeId:null`, **zero inbound links** (§4) |
| 4 | **portal role home** | **3** | `student-portal`, `family-portal`, `teacher-portal` — reached from `index.html` → `portals.html` (the hub) and from each role's own `ROLE_NAV` home self-link |
| 5 | **portal internal (`ROLE_NAV`)** | **20** | teacher 7 + family 7 + student 6 internals, rendered as `pt-nav-item` by `components/portal-shell.js` (teacher 9 unique items ×18 renders/page, family 9×18, student 8×16 — each registry = home + internals + the hub exit) |
| 6 | **portal drill-down** | **1** | `family-child` — not a `ROLE_NAV` item; reached from the family home's child cards + the one sanctioned Spec-022 fold-point link |
| 7 | **hub** | **1** | `portals.html` — linked from `index.html` and from every role shell's hub-exit item |
| | **TOTAL BASES** | **57** ✅ | |

**Check**: admin `26 + 5 + 1 = 32` ✅ · portal `3 + 20 + 1 + 1 = 25` ✅ · `32 + 25 = 57` ✅ — matching the `PAGES`
registry exactly. Plus, outside `PAGES`: `index.html` (the root entry document; no inbound link is expected of a
root). File-level, this is the same product as the frozen `64 + 50 + 1 = 115` partition in
`count-and-freeze-contract.md` §1 — it is a re-classification of the same set, not a second, competing count.

Every base in classes 1, 2 and 4–7 has at least one live inbound link somewhere in the 115-file corpus. **Exactly one
base — `gallery` (class 3) — has zero.**

## 4. The two orphans: `gallery.html` / `gallery.en.html`

Full evidentiary trail:

| fact | evidence |
|---|---|
| registered in the build | `scripts/build-html.mjs:95` — `{ base: 'gallery', activeId: null, titleKey: 'topbar.title.gallery', crumbKey: 'topbar.crumb.gallery', render: renderGallery }` |
| `activeId: null` | same line — every other admin base carries a real `activeId` (e.g. `'teachers'`, `'finance'`) that a `.nav-item[data-nav]` in `nav.config.js` matches to render the "current page" highlight; `gallery` matches none |
| absent from `nav.config.js` | confirmed by the 50-item census (control 12 · families 9 · teachers 6 · reports 11 · admin 5 · settings 7 = 50); `gallery` is not among them, and it is not a `FUTURE_ROUTES`/`FUTURE_ROLE` entry either (both closed sets, 0 and 3 documented-never-rendered respectively) |
| linked from nowhere | the authoritative link/reachability census: "ORPHAN pages (never a link target anywhere): 2 — gallery.html, gallery.en.html" — 0 occurrences of `href="gallery.html"` or `href="gallery.en.html"` (or any relative variant) in any of the 115 built files, including `index.html` |
| what it renders | `src/js/pages/gallery.js:1-2` — "Component / style preview — proves the design system across the current direction + theme. Every control acts (no dead buttons / no raw keys)." A living style-guide: buttons, medallions, avatars, badges, trend pills, status chips/tiles, KPI cards, report cards, loading/error/empty states — sourced from the same fixtures (`KPIS`, `REPORTS`, `STATUS_SUMMARY`) as the real pages, not standalone fake data |
| does it render the admin sidebar? | yes — it is one of the 32 admin bases / 64 sidebar-bearing files (`current-route-inventory.md` §1, §3); a visitor who reaches it by typed URL sees the full 6-category, 50-item rail and can navigate away normally. It is a real, live admin-shell page — just one nothing points *into* |
| any write/mutation risk? | none — it is 100% display components; the honesty censuses (0 `type=password`/`type=file`/`<canvas>`/computed-anything) apply to it identically to every other admin page and are unaffected by its reachability status |

**Classification**: `gallery` is not a broken link (nothing 404s), not a fake page, not a planned/disabled item
mis-rendered as reachable — it is a genuinely complete, honest, currently-orphaned page. It fails only one bar:
**intentional reachability documentation.**

## 5. The reachability law (binding on this audit)

> An intentionally-reachable non-sidebar page is **not automatically a defect** — the product may legitimately
> ship a component/design-system reference, a QA harness, or a dev-only surface outside the nav IA. But it
> **must have a documented owner and a documented entry path** (even an undocumented-but-deliberate one, e.g.
> "reached only by typing the URL, by design, owned by X"). A page with **neither** an owner nor an entry path
> is indistinguishable from an accidental leftover, and indistinguishability from an accident is itself the
> defect — not the page's existence.

`gallery` today has **neither**:
- **No documented owner.** No spec (000–040) names `gallery.html` as belonging to any role, team, or purpose
  beyond the one-line source comment ("Component / style preview"). It is not mentioned in any `nav.config.js`
  comment, any `FUTURE_ROUTES`/`FUTURE_ROLE` entry, any `implementation-status.md`, or any README section
  found in this session's grounding.
- **No documented entry path.** Not linked from `index.html`, not linked from any admin page, not reachable
  via any nav item, not listed as a QA/dev-tool link anywhere in the shipped product. The only way to reach it
  is to already know the exact filename and type it into the address bar.

This is why D-2 is recorded as a genuine (if low-severity) finding rather than dismissed: the page passes every
honesty census and every link-integrity check individually, yet fails the one law that exists specifically to
distinguish "deliberately unlinked" from "forgotten."

## 6. Options for D-2 (impact-scored — **NO decision is taken here; SPECIFY ONLY**)

These are the **canonical D-2 options A–D** as defined in `spec.md` §7 (identical lettering in every 041 artifact).
`/speckit.plan` selects one; this register supplies the evidence and the impact.

| option | mechanism | impact | verdict |
|---|---|---|---|
| **A — Document it, don't link it** | Record `gallery.html`/`.en` in a committed contract (this register, §§4–7, is the natural home — no new artifact needed) as an intentionally URL-only design-system reference: **owner** = the frontend/design-system maintainer; **entry path** = direct URL, by design, for maintainers auditing the component library. Add one **additive** smoke assert freezing the orphan set as **exactly** `{gallery.html, gallery.en.html}` so a *new* orphan fails the build. | **0 diff to any HTML/JS/CSS source**; docs + one additive test assert. Counts all HELD (115 / 57 / 50 / 64). No new nav item, no new hook, `navCount32 === 50` and the 6-category rail untouched. | ✅ **RECOMMENDED.** It closes the actual gap — no owner, no entry path, no guard against future orphans — at zero product risk, and is the only option that fits a freeze's mandate. |
| **B — Link it from the sidebar** | Add a 51st nav item. | Admin menu 50 → 51 — **breaks the 50-item freeze** (asserted at 5 independent sites); puts a developer reference page into an academy admin's production nav. | ❌ Rejected. |
| **C — Link it from `index.html`** | Add an inbound link on the public entry page. | 2 body changes; exposes a maintainer-facing dev page in a user-facing entry point. | ❌ Rejected — weaker than A, for no benefit. |
| **D — Delete `gallery`** | Remove the pair, the `PAGES` entry (`build-html.mjs:95`) and `pages/gallery.js`. | Page count 115 → 113, `PAGES` 57 → 56 — **breaks the frozen count this spec exists to hold**; destroys the honest component reference the later visual-redesign review specs (045–050) need most, for a defect it never caused (no broken link, no fake control, no leak). | ❌ Rejected — **violates zero-deletion**. |

## 7. Recommendation (not a decision) — Option A

This register **recommends Option A** and supplies, ready for the plan to ratify, exactly what the reachability law
requires: **owner** = the frontend/design-system maintainer (the page exists so a maintainer can visually audit every
shared UI component and state against the live fixtures in one place); **entry path** = direct URL only, by design,
for that maintainer audience — never intended for an end admin user, hence correctly absent from the nav IA.

**Nothing is registered, decided or fixed by this document.** Spec 041 is specify-only: the owner + entry path become
binding when `/speckit.plan` adopts an option and the round that follows lands the additive orphan-set assert. No spec
number owns `gallery` (044 owns the modal/drawer *interaction system*, not the component catalogue page), and this
register asserts none.

If a later round instead prefers a real dev-tool entry point (Option C) or retirement (Option D), that is a
source-touching decision that must be argued in its own right against its own impact ledger — never smuggled in as a
side effect of a freeze.

## 8. Anti-gaming note (binding on this and all future reachability audits)

Pages must **never** be added or deleted purely to move a reachability percentage. Concretely for 041: the
correct fix for `gallery`'s undocumented status is documentation (**Option A**, recommended above — not yet taken),
*not* deleting it to reach "0 orphans" and *not* wiring a cosmetic link merely so a census line reads 100%. The **115 / 57-base /
50-item** counts are frozen by law; a reachability register's job is to describe the truth of the frozen set,
never to reshape the set to make the register read better. If a genuine defect required a real page
add/remove, that would be reported honestly as a **count-changing exception requiring its own justification**
(as Spec 035's `schedule-search` was), not folded silently into a freeze pass.

## 9. Cross-references

- `current-route-inventory.md` §1, §3 and `count-and-freeze-contract.md` §1 — the 115/64/50/1 file partition and the
  32/25 base split this register's entry-path classes re-partition (§3), not re-derive.
- `spec.md` §7 — the canonical D-1 (**A–G**) and D-2 (**A–D**) option sets; this register uses those letters verbatim.
- D-1 / D-2 as named in the Spec 041 audit summary — D-2 is `gallery`'s orphan status (this register is its
  full analysis); D-1 (the `teachers`/`addTeacher`/`teacherCategories` triple-route-to-one-file defect) is a
  *destination-honesty* finding, not a *reachability* one — all three nav items resolve to a real, linked,
  non-orphaned file (`teachers.html`), so it produces 0 `badTarget`/`deadNav`/dead-hash hits and does not
  appear in this register's census; it is scoped to the nav-honesty/route-defect register instead.

---

## Roadmap-provenance caveat (binding, appended by the plan-round reconciliation)

> The committed spec corpus charters, as a spec directory with its own `spec.md`, **only Spec 041**. **Every spec
> number above 041 named anywhere in this file (042 · 043 · 044 · 045–050 · 051–057) is a MAINTAINER-DIRECTED,
> APPEND-ONLY AMENDMENT — recorded in `040-settings-deep-links-subpages/future-owner-register.md` §1 — NOT a
> chartered spec.** Any ownership assignment made here binds whichever spec is eventually chartered into the named
> slot; this file invents no spec number and creates no roadmap entry.
