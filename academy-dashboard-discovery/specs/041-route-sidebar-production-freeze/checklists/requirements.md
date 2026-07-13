# Specification Quality Checklist: Spec 041 — Full Frontend Route & Sidebar Production Freeze

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-07-12
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

*Note*: the spec names existing route strings, nav ids, file paths and line-anchored source excerpts. That is
deliberate, not an implementation leak — this is an audit/freeze spec whose entire subject is the exact route and
sidebar surface, and the census/freeze contract (§3), the two findings (§7) and the success criteria (§8) are only
auditable if the exact identifiers, file locations and current line numbers are stated.

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain — 0 used; the genuine open decisions (which D-1/D-2 fix option to take)
  are explicitly deferred to `/speckit.plan` (§7), not left ambiguous here
- [x] Requirements are testable and unambiguous — every FR in §6 maps to a specific, greppable/computable check
- [x] Success criteria are measurable — all 24 (SC-01…SC-24, §8) are machine-verifiable counts, greps or asserts
- [x] Success criteria are technology-agnostic in outcome (counts, censuses, parity) even though the verification
  method names real files, by design (see Content Quality note)
- [x] All acceptance scenarios are defined (§5, P1–P3)
- [x] Edge cases are identified (§10)
- [x] Scope is clearly bounded (§1.2 table: what 041 is NOT, with named owners for every excluded temptation)
- [x] Dependencies and assumptions identified (§1.3 standing laws; §9 carry-forward; §11 out of scope)

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria (§6: Census & freeze, Honesty, Deep-link truth,
  Reachability & isolation, Documentation reconciliation, Impact protection)
- [x] User scenarios cover primary flows (3 stories, P1 route truth · P2 deep-link truth · P3 reachability/parity/isolation)
- [x] Feature meets measurable outcomes defined in Success Criteria (§8, 24 criteria)
- [x] No implementation details leak into specification beyond the identifiers an audit spec must name to be auditable

## Spec-041-specific gates

- [x] **Baseline verified from the repository, not from memory or from CLAUDE.md.** HEAD `21502af` confirmed by
  direct inspection (not the stale `4cbcb31` CLAUDE.md still names); branch `feature/012-role-portal-foundation`;
  committed tree **CLEAN (0 entries)** — the only working-tree entries during this pass are the untracked
  `specs/041-…/` artifacts and the speckit-managed `.specify/feature.json` (**0 source / 0 test / 0 HTML touched**);
  GitHub sync confirmed PUSHED (ahead=0, behind=0) against `origin/feature/012-role-portal-foundation` and present on
  `origin/main`; both Spec 039 (`58a53e2`) and Spec 040 (`21502af`) confirmed COMMITTED — correcting CLAUDE.md's claim
  that 039 is "awaiting the watcher commit"
- [x] **Every count in §3 was RECOMPUTED against the live tree, never reused from a prior spec's prose.** Total HTML
  115 (`find public -maxdepth 1 -name '*.html' | wc -l`), PAGES 57 (`build-html.mjs` array length), admin/sidebar
  files 64 (32 bases × 2), portal files 50 (25 bases × 2, broken out family 18/teacher 16/student 14/hub 2), index 1
  — cross-checked `64 + 50 + 1 = 115` and `32 + 25 = 57`; admin menu 50 items / 6 categories with the exact 12/9/6/
  11/5/7 breakdown; status census implemented 49 / disabled 1 / planned 0; `FUTURE_ROUTES` confirmed `{}` by reading
  the source object, not by citing a prior spec's claim that it is empty
- [x] **Every count is cross-artifact consistent** — 115 / 57 bases (57 AR + 57 EN + index) / 64 admin (32 bases) /
  50 portal (25 bases: family 18·9 · teacher 16·8 · student 14·7 · hub 2·1) / 1 index · admin menu 50
  (12·9·6·11·5·7) · 49 implemented / 0 planned / 1 lock · 22 deep-link + 27 plain + 1 route-less · portal nav 9·9·8.
  A single reconciled table governs; no artifact disagrees. *(Detection caveat recorded where it matters: `pt-nav-item`
  greps to **48**, not 50 — `portals.html`/`.en` carry the portal shell without a role sidenav.)*
- [x] **All 22 `#view=` deep-links verified against the BUILT output, in BOTH languages.** Each of the 22 routes
  (§3.5) is traced to its `nav.config.js` line, its target page's `data-tabs` group id and default tab, and the fact
  that it resolves to a real `[data-tab]`/`data-tabpanel` pair — not merely asserted to exist. The two non-unique
  routes are called out explicitly and treated as intentional, not defects: `salaries`+`staffSalaries` →
  `finance.html#view=salaries` (S-1, sanctioned) and `teachers`+`addTeacher`+`teacherCategories` → bare
  `teachers.html` with no hash (D-1, the genuine defect)
- [x] **AR/EN parity verified**, not assumed — §4.1 records 0 nav-route parity failures: every AR nav `href` has the
  exact `.en` twin with the hash preserved, checked across all 115 pages, and SC-12 makes this a standing freeze gate
- [x] **Role isolation verified by exact destination matching**, not by category label — §4.2: 0 admin-destination
  links on any portal page, 0 portal-destination links on any admin page, and `teacher-performance.html` (the
  sanctioned Spec-024 B-07 admin exemption) confirmed linked from **zero** portal pages, not merely "not in
  ROLE_NAV"
- [x] **The honest lock verified property-by-property, not just "still disabled".** `classSalaryReport` checked
  against all six required properties simultaneously: non-anchor `<button>` · no `href` · `data-nav-status="disabled"`
  · `aria-disabled="true"` · `data-reason-key="nav.reason.finance"` present · lock icon (`#i-lock`) present · route-less
  by construction — matching the shipped smoke predicate at `run.cjs:1770-1793`/`2398`/`2526-2527`, not a paraphrase
  of it
- [x] **Both findings (D-1, D-2) are recorded with fix OPTIONS, not a silent fix.** D-1 carries **7** scored options
  (**A recommended**: fold into `teachers.html` tabs with real `#view=` hashes; B rejected — new drawer-hash hook, out
  of 041's bounds, owned by Spec 044 + breaches the `enhance.js` 0-diff wall; C rejected — dishonest lock on a working
  surface, breaks the 1-lock law; D rejected — violates zero-deletion, breaks the 50-item freeze; E rejected —
  standalone page, already rejected once by Spec 036, breaks the 115 count freeze; F rejected — "record it as an
  intentional exception", i.e. Spec 036's declaration repeated, and *a declaration does not make a destination
  honest*; G rejected — relabel-only, same 64-file blast radius as A but leaves the three items indistinguishable by
  outcome). D-2 carries **4** scored options (**A recommended**: document owner + entry path + an orphan-set guard, 0
  source/HTML change; B/C rejected — break the 50-item freeze or expose a maintainer page in production nav; D
  rejected — violates zero-deletion and harms the later visual-redesign specs). **Neither fix is taken, applied or
  chosen in any artifact** — the decision belongs to `/speckit.plan`
- [x] **The option lettering is canonical and identical across every artifact** — D-1 **A–G** and D-2 **A–D** as
  defined in `spec.md` §7; `impact-boundary.md` prices those same letters, `sidebar-item-register.md` §7 and
  `page-reachability-register.md` §6 refer to them, and no artifact defines a rival set
- [x] **No artifact claims a fix was applied, and none records a "decision".** Every finding is stated as
  finding → options → recommendation → *decided in `/speckit.plan`*
- [x] **No spec number, roadmap entry or future owner is invented.** Specs **042–057** are named in exactly one
  committed document (`040-settings-deep-links-subpages/future-owner-register.md` §1), which itself declares them a
  **maintainer-directed, append-only amendment** and not chartered specs — every artifact that cites an owner repeats
  that caveat. The copy-sweep owner (CF-1) is **recommended (044, evidence-traced)** and **named in the plan**, from
  the corpus-named candidates 044 / 056 / 057 only
- [x] **No protected test weakened · `classSalaryReport` never unlocked and never joined by a second lock ·
  `finance-analysis` never invented · "hiding a nav link is not authorization" stated in every role-facing artifact**
  (real enforcement = 043)
- [x] **No plan.md or tasks.md created** — verified by directory listing. This specify pass produced only `spec.md`,
  **14** supporting registers/contracts, and this checklist under `specs/041-route-sidebar-production-freeze/`
  (16 files total)
- [x] **No application source, test, or public HTML touched** — the entire deliverable is documentation; §6's Impact
  Protection requirements (non-destructive `git show`/detached-worktree proof method, never stash/reset/checkout)
  govern the *eventual* fix in a future plan pass, not this spec pass, and are stated as forward-binding requirements
  rather than as work already performed
- [x] The two conflicting committed definitions of "what Spec 041 is" (`033-.../follow-up-spec-roadmap.md` "final
  freeze" vs. `040-.../future-owner-register.md` "baseline freeze, no integrations, final freeze moves to 057") are
  identified and explicitly resolved in favor of the later, maintainer-directed amendment (§1.2, FR-000) — not
  silently picked
- [x] The corrected probe-supersession chain (034 control→families, 035 families→teachers, 036 teachers→admin, 038
  no-op, 039 admin→settings, 040 retired) is stated, correcting a factual error inside Spec 040's own
  `protected-test-supersession-register.md` (which wrongly attributed the admin repoint to Spec 038)
- [x] The product-wide copy-sweep ownership gap (`common.backendRequiredNote`, dual "Spec 044/056" owner recorded
  only in a findings section) is carried forward, not resolved by invention — recorded as CF-1 with a named-owner
  recommendation for the plan pass, not silently assigned
- [x] The two structural test holes (fragment-blind link-integrity crawl; hand-maintained, non-derived deep-link
  matrices) are captured as FR-013/SC-09/SC-10, framed as **additive coverage to specify**, not as defects to fix in
  application code
- [x] Every protected (byte-verbatim) assert this spec must not weaken is named with its exact file:line location
  (payHit, tchPay, famPay, payFigure ×2, child-view, PAY28, truth010.badPlanned/badDisabled, deadNav, links010,
  plannedNavAnchors, nav010 sub-asserts, navCount32, the finance/reports/a31/g32 blocks, route/page freeze) so a
  later plan pass cannot claim ignorance of the wall

## Notes

- 0 [NEEDS CLARIFICATION] markers. The two genuine open decisions — which D-1 option and which D-2 option to take —
  are deliberately NOT resolved here; per the specify/plan split they are deferred to `/speckit.plan`, each already
  carrying a recommendation, rejected alternatives with reasons, and an exact impact estimate, so neither blocks
  progression.
- 041 is audit/freeze-only: no plan, no tasks, no source/test/HTML change occurred or is proposed in this document
  beyond the two forward-facing fix menus in §7 and the impact-protection method binding on whichever option a
  future plan selects.
- **Ready for `/speckit.plan`.**
