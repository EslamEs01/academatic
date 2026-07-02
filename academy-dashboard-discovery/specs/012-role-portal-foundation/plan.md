# Implementation Plan: Role Portal Foundation

**Branch**: `feature/011-final-qa-demo-readiness` | **Date**: 2026-07-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/012-role-portal-foundation/spec.md`

## Summary

Spec 012 starts the role-portal layer as a foundation-only pass: a **shared warm portal shell** (`portal-shell.js` — header-based, rail-less, role-accented, reusing the existing theme/lang hooks), **three portal foundation page pairs** (`student-portal` / `family-portal` / `teacher-portal`) bound to coherent existing-fixture personas (**st1 ∈ fam1**, **sara**) with the spec's binding preview-section compositions and honest planned cards, a **demo role-switch hub** (`portals.html` + a switch link in each portal header; admin console untouched), a **`legacy-role-capability-coverage.md`** artifact classifying all 39 legacy portal pages under the seven-way scheme with itemized Spec 013/014/015 boundaries, and the two sanctioned reconciliations (**smoke portal-absence assertion re-scoped to admin pages**; **`FUTURE_ROLE` register wording updated**). Deep dashboards stay in Specs 013–015. **Zero admin change: all 40 admin built pages content-identical; zero pay figures anywhere in the teacher portal; zero new libraries/hooks/engines.**

## Technical Context

**Language/Version**: native ES-module JavaScript + Node ≥20 build — unchanged
**Primary Dependencies**: none new; dev-only Playwright/axe — **no additions**
**Storage**: none; personas bind to existing fixtures; new `fixtures/portal.js` = display-only preview snippets/registers
**Testing**: `tests/smoke/run.cjs` extended (+4 pages, `PORTAL_PAGES` branch, admin-scoped absence check, portal block incl. pay-token + digit asserts), `tests/a11y` (+portal scenarios), `tests/screenshots` (+12 MATRIX frames)
**Target Platform**: static HTML on GitHub Pages; AR RTL default + EN LTR; light/dark/system; **mobile-first for portals**
**Project Type**: static multi-page frontend — now two shells (admin + portal) from one generator
**Performance Goals**: n/a (static pages)
**Constraints**: static HTML-first (no `#app`/SPA/runtime construction; closed hook set — portal header reuses `theme-menu`/`lang-menu`; no new hook expected), fixture-only honesty, Django-ready, admin console byte-stable, no pay figures, Specs 008–011 guards green
**Scale/Scope**: +4 page pairs (8 files → 49 total) · 1 shell component + portal card/section helpers · 1 fixture file · 1 locale overlay pair · ~1 CSS namespace block · 39 legacy pages classified · 12 screenshot frames

## Constitution Check

*GATE: `.specify/memory/constitution.md` remains the unfilled template — the effective constitution is the CLAUDE.md hard-constraints block + Specs 001–011 binding contracts:*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; no `#app`/SPA; closed hooks | **PASS** | Portal pages baked by the same generator via a sibling shell fn; header reuses existing menu hooks |
| Fixture-only; no engines; honest actions | **PASS** | Personas = existing fixtures; new fixture = display snippets; four honest action classes only; no auth/join/chat/payment |
| No new libraries/CDN/TS; relative paths; Pages-compatible | **PASS** | Nothing added |
| Admin console protected (Spec 010/011 IA + all body contracts) | **PASS** | Zero admin edits beyond the two documented reconciliations (register wording, test re-scope); acceptance = 40-file content identity |
| No pay figures (Spec 007/009 spine) | **PASS** | FR-006 + smoke pay-token assert + scope-guard grep on portal files |
| Screenshot-based visual acceptance | **PASS** | 12-frame matrix incl. distinct-from-admin and admin-unchanged proofs |

**Post-Phase-1 re-check**: contracts/data-model introduce no violation; the only debatable surface — a second shell — is an additive sibling function, not an architecture change. **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/012-role-portal-foundation/
├── plan.md · research.md (D1–D12) · data-model.md · quickstart.md
├── legacy-role-capability-coverage.md      # implementation output (contract-bound)
├── checklists/requirements.md
└── contracts/  (12)
    role-portal-foundation-contract.md · role-portal-navigation-contract.md ·
    student-portal-foundation-contract.md · family-portal-foundation-contract.md ·
    teacher-portal-foundation-contract.md · legacy-role-capability-coverage-contract.md ·
    admin-impact-contract.md · static-html-django-ready-contract.md ·
    source-links-contract.md · planned-backendrequired-contract.md ·
    screenshot-acceptance.md · scope-guard.md
```

### Source Code (repository root: `academy-dashboard-discovery/app/`)

```text
src/js/components/portal-shell.js     # NEW — portalShellMarkup(): header shell, role accents, switch link
src/js/components/portal-cards.js     # NEW (if needed) — friendly section/card helpers shared by the 3 portals
src/js/pages/portals.js               # NEW — demo hub (3 role cards + admin return)
src/js/pages/student-portal.js        # NEW — student foundation composition
src/js/pages/family-portal.js         # NEW — family foundation composition
src/js/pages/teacher-portal.js        # NEW — teacher foundation composition (zero pay tokens)
src/js/fixtures/portal.js             # NEW — persona bindings + preview snippets + planned-card registers (display-only)
src/locales/ar.prt.js · en.prt.js     # NEW — prt.* overlay, merged last
src/js/i18n.js                        # +2 imports/merges
scripts/build-html.mjs                # +4 PAGES entries + shell branch (admin path untouched)
src/js/nav.config.js                  # FUTURE_ROLE reason wording ONLY (research D7)
src/styles/app.css                    # + .portal-shell namespace block (tokens reused)
tests/smoke/run.cjs                   # +4 bases · PORTAL_PAGES branch · admin-scoped absence · portal block
tests/a11y/run.cjs · tests/screenshots/capture.cjs   # additive entries
README.md · screenshots/REVIEW.md · CLAUDE.md        # docs
public/*                              # +8 built files; the 40 admin files rebuild BYTE-IDENTICAL
```

**Structure Decision**: All new behavior lives in new portal-namespaced files; shared admin components are imported, never modified (`ui.js` atoms, `chip`, `states`, `num()` reused read-only). `enhance.js` and `package.json` untouched.

## Impact Reviews (binding summaries — full text in contracts/)

- **Admin console**: zero change; acceptance = content-identity of all 40 admin built files vs HEAD + prior guards green + the unchanged-proof screenshot. Sanctioned edits: FUTURE_ROLE wording (config comment-level), smoke re-scope (test-level).
- **Reports/Finance/Dashboard bodies**: untouched by construction (no shared-file behavior edits).
- **Gallery/index**: untouched; the hub is a new internal surface in the gallery tradition, reached by documented URL.

## MVP & Sequencing (research D12)

**MVP = baseline gate → shell + overlays + build branch → hub → student portal → smoke re-scope/portal block**: proves the full foundation pattern on the most experience-sensitive role with green tests. Then family → teacher → coverage artifact → admin-identity + prior-guard audits → screenshots/review → docs.

## Complexity Tracking

*No constitution-gate violations to justify.* The second shell is the one structural addition; it is required by the product decision ("portals must not be admin clones") and implemented as the smallest possible sibling function with per-page opt-in.
