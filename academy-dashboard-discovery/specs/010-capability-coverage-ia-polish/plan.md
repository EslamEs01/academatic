# Implementation Plan: Full Academy Capability Coverage, Navigation IA & Admin Experience Polish

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-07-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/spec.md`

## Summary

Spec 010 is the brownfield coverage/IA/polish pass over the implemented Spec 001–009 app: (1) a **legacy capability coverage matrix** (`legacy-capability-coverage.md`) classifying every relevant capability of the 339-page legacy system under the nine-way scheme with zero silent gaps; (2) **navigation IA corrections** — a finance sub-section inside the reports category (teachersPerf pattern), `banks` moved out of admin into it, the families category relabeled «العائلات والطلاب»/"Families & Students", four stale `FUTURE_ROUTES` entries removed, the sessions badge derived from the authored fixture total; (3) the **app-wide `[hidden]` filter-visibility fix** (`[data-row][hidden]{display:none !important}` + per-page computed-visibility smoke checks, proving attendance fixed and finance still fixed); (4) exactly **one new cross-page shortcut** (family Plan & Billing → finance shell) with an exact-token amendment to Spec 009's scope guard; (5) a **chip-tone build guard**; (6) a **page-by-page audit artifact** with fix-now copy/empty-state polish; all under a path-aware scope guard that re-runs every prior spec's audits as its acceptance floor. **Zero new pages. Zero dashboard/reports/finance body changes.**

## Technical Context

**Language/Version**: Native ES-module JavaScript (browser) + Node ≥20 build scripts — unchanged
**Primary Dependencies**: none at runtime; dev-only Playwright (+axe) and the existing CSS build — **no additions**
**Storage**: none (fixtures are authored JS modules; Spec 010 adds no fixture entity — only D6's badge derivation reads an existing authored total)
**Testing**: existing harnesses extended in place — `tests/smoke/run.cjs` (nav-shape asserts, per-filterable-page computed-visibility, family-shortcut assert, link integrity), `tests/a11y/run.cjs` (re-run), `tests/screenshots/capture.cjs` (+2 interaction frames)
**Target Platform**: static HTML on GitHub Pages (relative paths); Arabic RTL default + English LTR pages; light/dark/system
**Project Type**: static multi-page admin frontend (SSG: page modules → complete `public/*.html`)
**Performance Goals**: n/a (static pages; no runtime change beyond one CSS rule)
**Constraints**: static HTML-first (no runtime page DOM construction, closed `data-*` hook set, no new hooks), fixture-only honesty, Django-template-ready, no new libraries/CDN/TypeScript, six-category rail preserved, Specs 001–009 guards stay green (amendments additive + attributed only)
**Scale/Scope**: 20 page bases ×2 languages re-built (sidebar ripple on all 40); 41 nav items audited, ~10 corrected/regrouped; 19 legacy modules → ~60 capability rows classified; ~10 filterable pages gain computed-visibility checks; 13 screenshot frames

## Constitution Check

*GATE: `.specify/memory/constitution.md` is the unfilled template (verified again this session) — the effective constitution is the CLAUDE.md hard-constraints block + the binding contracts of Specs 001–009. Gate evaluated against those:*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first, no `#app`, no runtime page construction | **PASS** | Changes are config (`nav.config.js`), one CSS rule, locale labels, one baked `<a>` in the family page render module, build-guard code, docs, tests |
| No new `data-*` hook / `enhance.js` untouched | **PASS** | The `[hidden]` fix rides the existing `data-row` filter hook; the shortcut is a plain baked link |
| Fixture-only; no engines; no money arithmetic; honest actions | **PASS** | No fixture entity added; badge derivation reads an authored literal (row-count precedent); no action semantics change |
| No new libraries/CDN/TS; relative paths; GitHub Pages | **PASS** | Nothing added |
| Specs 001–009 guards preserved | **PASS (with documented amendment)** | Spec 009 G8a/G8b amended additively with two exact tokens for the sanctioned family shortcut (research D10); all prior audits re-run as acceptance |
| No new pages / no portals / no legacy cloning | **PASS** | Zero new pages; matrix is documentation; legacy used as checklist only |
| Screenshot-based visual acceptance | **PASS** | 13-frame matrix (research D11), human-reviewed into `screenshots/REVIEW.md` |

**Post-Phase-1 re-check**: design artifacts (contracts, data-model) introduce no violation — all shapes are documentation/build-time; the only guarded-file edit remains the single sanctioned family.js touch-point. **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/
├── plan.md                            # This file
├── research.md                        # D1–D12 decisions (Phase 0)
├── data-model.md                      # 11 documentation/build-time shapes (Phase 1)
├── quickstart.md                      # Verification walkthrough (Phase 1)
├── legacy-capability-coverage.md      # THE coverage matrix artifact (implementation output, contract-bound)
├── page-coverage-audit.md             # 20-page × 10-dimension audit artifact (implementation output)
├── checklists/requirements.md         # Spec quality checklist (done)
└── contracts/
    ├── legacy-capability-coverage-contract.md
    ├── navigation-ia-polish-contract.md
    ├── topbar-header-contract.md
    ├── page-coverage-audit-contract.md
    ├── page-polish-contract.md
    ├── filter-visibility-contract.md
    ├── source-links-contract.md
    ├── planned-backendrequired-contract.md
    ├── dashboard-impact-contract.md
    ├── reports-impact-contract.md
    ├── finance-impact-contract.md
    ├── static-html-django-ready-contract.md
    ├── screenshot-acceptance.md
    └── scope-guard.md
```

### Source Code (repository root: `academy-dashboard-discovery/app/`)

```text
src/js/nav.config.js          # D1 finance sub-section · D3 banks move · D5 FUTURE_ROUTES cleanup · D6 badge derivation (+1 fixture import)
src/locales/ar.js, en.js      # cat.families relabel (D2) · new cat.finance sub-section title key — base-label edits only
src/locales/ar.fam.js, en.fam.js  # +1 key pair: fam.bill.viewInvoices (honest shortcut label)
src/js/pages/family.js        # ONE sanctioned edit: real link → finance shell in billingPanel() actions row (Spec 009 guard amended)
src/styles/app.css            # +1 rule: [data-row][hidden]{display:none !important} (D7) · any fix-now polish styling (existing tokens only)
scripts/build-html.mjs        # + chip-tone build guard (post-render scan, throws on unknown chip tone)
tests/smoke/run.cjs           # + regrouped-sidebar asserts · per-filterable-page computed-visibility · family-shortcut assert (exactly 1 body finance link on family) · link-integrity crawl · planned/disabled truthfulness sweep
tests/screenshots/capture.cjs # + family Plan&Billing frame · attendance filtered frame (rest re-captured from existing MATRIX)
public/*                      # all 40 pages re-built (sidebar ripple — sanctioned diff) 
README.md · screenshots/REVIEW.md · CLAUDE.md   # docs updates
../specs/009-…/contracts/scope-guard.md          # additive attributed amendment (D10)
```

**Structure Decision**: No new modules, components, fixtures, pages, or locale overlay files. Spec 010 is config + one CSS rule + one baked link + guards + tests + documentation artifacts. The i18n overlay chain is untouched (base `ar.js`/`en.js` edits for nav labels are the Spec 009 reason-copy precedent; the one `fam.*` key lands in the existing Spec 004 overlay files).

## Impact Reviews (binding summaries — full text in contracts/)

- **Dashboard**: `#page-body` unchanged (content-identical). The Spec 001 revenue KPI stays untouched (matrix-documented). Only the shared sidebar around it changes. Smoke keeps asserting: finance tokens absent from body, wallet-in-body = 1 (revenue KPI), body finance links = 0.
- **Reports**: body unchanged, finance-free forever (Spec 008 contract intact). Its nav panel gains the finance sub-section *around existing items* — panel items' set is unchanged except grouping + `banks` arriving as a locked member.
- **Finance**: body unchanged; every Spec 009 invariant holds (fixture-only, row-count tiles, no arithmetic, no receipt, no pay figures, chips never mutate). Gains one inbound link (from family) and clearer sidebar grouping.
- **Sidebar ripple**: all 40 built pages legitimately re-bake (same Spec 009 precedent); body-scoped invariants — not whole-file identity — are the acceptance mechanism.

## MVP & Sequencing (research D12)

**MVP = Phases 1–4** (baseline snapshot → coverage matrix → nav IA corrections → register/badge truthfulness): shippable, reviewable, and delivers the two P1 outcomes (organized truthful sidebar + zero-silent-gaps matrix) even if polish pauses. Then: `[hidden]` fix → visibility checks → family shortcut + guard amendment → chip-tone guard → page audit + fix-now polish → link/truthfulness sweeps → invariant re-checks → screenshots → docs.

## Complexity Tracking

*No constitution-gate violations to justify.* The single `!important` in D7 is documented in research (standard hidden-reset pattern, scoped to the filter hook attribute, empirically verified per page) — an accepted, contract-bound exception rather than a gate violation.
