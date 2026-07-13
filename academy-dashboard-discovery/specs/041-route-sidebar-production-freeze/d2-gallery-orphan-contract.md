# D-2 Gallery Orphan Contract — Spec 041 Plan

Ratifies `page-reachability-register.md` §§4–7 and `spec.md` §7 D-2 **Option A** ("Document it, don't link it") as
the ADOPTED and FINAL disposition of finding D-2. This file is the single binding owner + entry-path record the
audit round deliberately withheld (`count-and-freeze-contract.md` "the owner + entry-path record is NOT written
here … the decision belongs to `/speckit.plan`"). Nothing here re-opens the option set; A–D stay canonical and
identically lettered to `spec.md` §7 and `page-reachability-register.md` §6.

## 1. Decision

**Option A — adopted, no other option considered further.**

| # | option | disposition |
|---|---|---|
| A | Document it, don't link it (owner + entry path recorded here; additive orphan-set smoke assert) | ✅ **ADOPTED** |
| B | Link it from the sidebar (51st nav item) | ❌ rejected — breaks the 50-item freeze, asserted at 5 sites (`protected-test-register.md`) |
| C | Link it from `index.html` | ❌ rejected — weaker than A, exposes a maintainer-facing page in a user-facing entry point for no benefit |
| D | Delete `gallery` | ❌ rejected — violates zero-deletion; breaks the frozen 115/57 counts; destroys the component reference Specs 045–050 (visual-redesign review, roadmap-provenance caveat applies) need most |

## 2. The owner + entry-path record (binding)

| field | value |
|---|---|
| **Pages** | `gallery.html`, `gallery.en.html` |
| **Owner** | The **frontend/design-system maintainer** — a role, not a spec number. Explicitly **not** Spec 044 (044/FO-23 owns the modal/drawer/long-form *interaction system*; it does not own the component-catalogue reference page). No committed spec (000–041) claims `gallery`; this contract does not manufacture one. |
| **Purpose** | Component/design-system reference: `src/js/pages/gallery.js:1-2` renders a living style-guide (buttons, medallions, avatars, badges, trend pills, status chips/tiles, KPI cards, report cards, loading/error/empty states) sourced from the same fixtures (`KPIS`, `REPORTS`, `STATUS_SUMMARY`) as the real pages — proves the design system across the current direction + theme for the maintainer auditing shared UI. |
| **Entry path** | **Direct URL only, by design.** Reached by typing `gallery.html` / `gallery.en.html`; never linked from `nav.config.js`, `index.html`, or any of the other 113 built pages. This is the deliberate, documented entry path for a maintainer audience — not an end-admin-user surface, hence its correct absence from the nav IA. |
| **Registration** | `scripts/build-html.mjs:95` — `{ base: 'gallery', activeId: null, titleKey: 'topbar.title.gallery', crumbKey: 'topbar.crumb.gallery', render: renderGallery }`. `activeId: null` is intentional: no `.nav-item[data-nav]` in `nav.config.js` should ever highlight as "current page" for it, because no nav item targets it. |
| **Shell behavior** | Renders the full admin shell (6-category, 50-item sidebar) like any other admin page — it is a real, live, honest admin-shell page, just one nothing links *into*. Counted among the 64 sidebar-bearing admin files (`current-route-inventory.md` §1; `count-and-freeze-contract.md` A-18). |
| **Risk surface** | None beyond any other admin page: 100% display components; 0 `type=password`/`type=file`/`<canvas>`/computed-anything; the sitewide honesty censuses apply identically and are unaffected by reachability status. |

## 3. Why Option A is the correct — and only compliant — shape

The reachability law (`page-reachability-register.md` §5) requires every non-sidebar-reachable page to have **both**
a documented owner and a documented entry path; an "intentionally-reachable non-sidebar page" that has neither is
"indistinguishable from an accidental leftover, and indistinguishability from an accident is itself the defect —
not the page's existence." `gallery` had neither. This contract supplies both, closing the actual gap with:

- **0 application-source change.** No edit to `nav.config.js`, `build-html.mjs`, `pages/gallery.js`, or any
  component/locale file.
- **0 generated HTML change *from D-2*.** `gallery.html` / `gallery.en.html` bodies — and every other one of the 115
  files — are untouched **by this decision**: D-2's fix is documentation plus one additive test, never a source/HTML
  edit. *(For completeness, so the impact ledger is not misread: `gallery.html`/`.en` DO receive the shared-sidebar
  href change that **D-1** applies to all 64 admin files — they are counted in the 62 "sidebar-only" set of
  `impact-protection-contract.md` §2.3. Their `#page-body` stays byte-identical. That delta belongs to D-1, not D-2.)*
- **0 count change.** 115 HTML / 57 `PAGES` / 64 admin files / 50 portal files / 1 index / admin menu 50 all stay
  exactly as frozen (`count-and-freeze-contract.md` §1). `gallery` stays 2 of the 115, 2 of the 64 admin files, 1
  of the 32 admin bases, 1 entry-path class of `page-reachability-register.md` §3 ("admin reference-only (ORPHAN)").
- **0 new hook / storage key / nav item / dependency.** `activeId: null` and the absent `nav.config.js` entry are
  preserved verbatim — this contract does not add a 51st menu item (Option B) or wire a cosmetic link (Option C).

Options B, C, D each fail a standing law independently of this contract's preference (50-item nav freeze, minimal
footprint, zero-deletion respectively) — Option A is not merely preferred, it is the only option compatible with
Spec 041's mandate as a freeze, not a redesign/feature/deletion round.

## 4. The additive orphan-set smoke guard (specified here; landed by the implement round)

One new, purely additive assertion in `tests/smoke/run.cjs`, alongside the existing `links010`/`deadNav` link-
integrity crawl (`page-reachability-register.md` §1, §2) — it does not touch, weaken, or replace any existing
protected assert (`protected-test-register.md` T-05):

- **Compute** the live orphan set: every one of the 115 built files that is never the target of an `href` (after
  stripping any `#view=` fragment) anywhere across all 115 files, and is never an `index.html` link, and carries no
  `nav.config.js` route.
- **Assert** that set is **exactly** `{gallery.html, gallery.en.html}` — cardinality 2, no more, no fewer, both
  members named explicitly (not just "count === 2").
- **Effect**: a future page that is built (a new `PAGES` entry) but never linked from anywhere — an accidental
  leftover distinct from `gallery`'s documented, deliberate case — makes the orphan set grow to 3+ and **fails the
  build**. Conversely, if `gallery` itself ever gains an inbound link (Option B/C, or an accidental one), the set
  shrinks to <2 and **also fails** — the assert freezes the *exception itself*, not just a floor.
- **Scope discipline**: this is new test-only surface (`app/tests/**`), not application source — it lands with
  0 app-source / 0 HTML diff, consistent with `impact-boundary.md`'s "0 in the specify round … lands in a later
  round, still 0 app-source / 0 HTML" classification of 041's additive coverage.

## 5. What this contract does NOT do

- Does **not** add `gallery` to `nav.config.js` (Option B) or `index.html` (Option C).
- Does **not** delete, rename, or move `gallery.html` / `gallery.en.html` / `pages/gallery.js` (Option D).
- Does **not** assign `gallery` to any spec number, including 044 — the owner is a maintainer role, not a spec.
- Does **not** change `activeId: null`, the `PAGES` registration, or any fixture `gallery.js` consumes.
- Does **not** pre-empt a future, independently-argued decision (e.g., a real dev-tool entry point or retirement)
  — per `page-reachability-register.md` §6/§8, any such future change is its own source-touching decision against
  its own impact ledger, never smuggled into a freeze pass.

## 6. Cross-references

- `page-reachability-register.md` §§4–8 — full evidentiary trail, the reachability law, and the anti-gaming note
  this contract's §5 restates.
- `spec.md` §7 D-2, SC-13, SC-19, Q-3, E-12 — the canonical option set, success criteria, and the E-12 orphan-set
  mutation-test requirement this contract's §4 specifies.
- `count-and-freeze-contract.md` "D-2 — ORPHAN, frozen with an owner requirement" — the freeze rule this contract
  discharges.
- `protected-test-register.md` T-05 — the orphan-page assert's test-design rationale (RED-on-mutation case:
  "add a PAGES entry with no inbound link → RED").
- `impact-boundary.md` line 25 — "0 app-source and 0 HTML impact under every non-rejected option — no file in this
  contract's allowlist moves for D-2," confirmed unchanged by this decision.
- Roadmap-provenance caveat (binding, per this round's task brief): "Specs 045–050 (visual-redesign review)" named
  in §1/§3 above are maintainer-directed append-only roadmap references, not chartered specs — this contract does
  not assign `gallery` to them, it only notes them as the future beneficiary of the component reference staying
  intact.
