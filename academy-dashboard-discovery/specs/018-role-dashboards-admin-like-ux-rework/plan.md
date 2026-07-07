# Implementation Plan: Role Dashboards Admin-Like UX Rework (Spec 018)

**Branch**: `feature/012-role-portal-foundation` (watcher-owned) · **Date**: 2026-07-04 · **Spec**: [spec.md](spec.md)
**Input**: spec.md (the binding user verdict + 7-band recipe + displacement map) · Specs 016/017 law · this session's evidence (admin dashboard frame ≈3,800px vs role homes ≈5,400–6,600px; legacy role homes were short; `build-html.mjs` PAGES table located; smoke/capture harness in-context).

## Summary

Compress the three role HOMES into admin-like compact dashboards (7 bands, hard ceilings) inside the untouched Shell v2, add the mandatory **`family-child`** drill-down page pair (five baked child panels, hash-switched, linked from real home child cards), re-scope the long-home smoke branches in ONE sanctioned amendment (payHit + family zero-pay regex byte-verbatim, now also covering the new page), and record the 019–028 sequence shift as an append-only amendment to the 016 sequence artifact. Built surface: 49 → **51** files; changed = the three role pairs + the NEW family-child pair (hub untouched) → **43/51 hash-identical** (40 admin + index + hub pair).

## Technical Context

**Language/Version**: JS ES modules (SSG) + baked HTML/CSS — unchanged stack · **Dependencies**: none new · **Storage**: none (hash-based child switching; no storage keys) · **Testing**: existing harness; ONE sanctioned smoke amendment (home-branch re-scope + family-child branch + compactness probes) · **Target**: static, GitHub-Pages, Django-ready (`family/child/<id>`) · **Constraints**: Shell v2 + ROLE_NAV + hub UNTOUCHED · `enhance.js`/`nav.config.js`/`package.json` FROZEN · `build-html.mjs` = the ONE sanctioned 2-line registration touch (import + PAGES entry) · teacher pay-free extended set · displaced fixtures/locales RETAINED · **Scale**: 3 home rewrites + 1 new page module + ~20 fixture slice fields + ~45 locale key pairs + ~12 CSS additions.

## Constitution Check

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; closed hooks; no runtime DOM | **PASS** | Child panels BAKED; switching = existing tabs/hash machinery (Spec-003 hooks); zero new hooks/storage |
| Fixtures only; four honest classes | **PASS** | KPI figures authored; child links real; quick-link planned tiles reuse the 017 button treatment |
| Pay rules (teacher extended; family zero-figure; reports finance-free) | **PASS** | Three layers re-run on the reworked teacher home; zero-pay regex byte-verbatim AND extended to `family-child` |
| No engines/computed | **PASS** | All KPI numbers are fixture literals via `num()` |
| Admin protected; two-shell law | **PASS** | 40 admin + index + hub byte-identical (43/51); shell untouched |
| Design freeze | **PASS** | Compact bands compose FROZEN primitives (admin `kpiRow` rhythm re-expressed with `.pt-*` cards; sectionHeader-with-drilldown idiom); no new pattern beyond `.pt-kpi`/`.pt-band` variants declared additive |
| Screenshot acceptance | **PASS** | Before/after heights recorded; new family-child frames; admin proof |
| Sequence discipline | **PASS w/ recorded amendment** | User-directed insertion → 019–028 renumber appended to the 016 sequence artifact (append-only; the no-reorder rule amended by owner instruction) |

**Post-Phase-1 re-check**: PASS.

## Project Structure

```text
specs/018-role-dashboards-admin-like-ux-rework/
├── spec.md · checklists/requirements.md
├── plan.md · research.md (D1–D15) · data-model.md · quickstart.md
└── contracts/ (11): compact-role-home · family-child-drilldown · displacement-map ·
    admin-like-design · honesty-backendrequired · teacher-pay-free · admin-impact ·
    smoke-rescope · mobile-a11y-screenshot · future-sequence-amendment · scope-guard
```

```text
app/src/js/pages/{student,family,teacher}-portal.js   # HOME REWRITES (7-band recipe)
app/src/js/pages/family-child.js                      # NEW — 5 baked child panels + switcher
app/scripts/build-html.mjs                            # THE sanctioned 2-line touch: import + PAGES entry
                                                      #   { base:'family-child', shell:'portal', role:'family',
                                                      #     personaKey:'data.fam.fam1.name', titleKey:'prt.title.familyChild', render }
app/src/js/fixtures/portal.js                         # + COMPACT_HOME slices + CHILD_PROFILE slices (ROLE_NAV untouched)
app/src/locales/ar.prt.js · en.prt.js                 # + prt.kpi/band/child keys + prt.title.familyChild; displaced keys RETAINED
app/src/styles/app.css                                # additive: .pt-kpi row, band spacing, child-switcher, compact cards
app/tests/smoke/run.cjs                               # ONE amendment (see the rescope contract)
app/tests/{a11y,screenshots}/*                        # additive: family-child scenarios/frames + height records
docs: REVIEW.md · README.md · CLAUDE.md · 016 sequence amendment + matrix annotation (append-only)
built: student/family/teacher pairs + family-child pair (51 total)
```

## Phase 0 — Research (complete): D1–D15 in research.md

Headlines: ceiling **2,200px @1366×768** (+ floor 900; budget-derived, ±10% tunable within the 1–2-screen principle, any retune recorded) · bands = 7 sections exactly (window assert 4–7) · admin primitives re-expressed portal-side (`.pt-kpi` cards, band headers with drill-down affordance) · build registration = the 2-line touch · child model = existing st1–st5/fam1 fixtures + authored per-child slices · hash/tabs = existing baked-panel machinery, default st1, home stays the active nav anchor on the child page · smoke re-scope enumerated per branch · family home bodyAnchors === 5 exact `family-child(.en).html#child=stX` · identity **43/51** · teacher audit re-run all three layers · displaced content retained-by-rule · sequence appended-only · Shell v2/ROLE_NAV untouched · admin zero-diff · screenshot set incl. switched-child frame + before/after height table.

## Phase 1 — Design artifacts (complete)

data-model.md (CompactHome/KpiCard/ChildProfilePanel/AnchorRegistries/SmokeExpectations) · 11 contracts · quickstart.md · CLAUDE.md SPECKIT pointer → this plan (sanctioned).

## Phase 2 — Implementation outline (for /speckit-tasks)

Baseline gate → fixtures+locales+CSS [P] → family-child page module + the 2-line registration → the three home rewrites (one per role, sequential) → build + heights measured + ceiling calibrated-and-pinned → the ONE smoke amendment (re-scope + new branches + probes) green = MVP → a11y + captures (incl. switched child + before/after table) → G-audit (43/51 · pay layers · anchor registries · displaced-retention grep · prior guards) → docs + sequence amendment → reviews → final gate.

**STOP — plan ends here; /speckit-tasks next.**
