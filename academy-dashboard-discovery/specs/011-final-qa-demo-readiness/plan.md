# Implementation Plan: Admin Console Final QA Hotfix & Demo Readiness

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-07-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/011-final-qa-demo-readiness/spec.md`

## Summary

Spec 011 is a two-fix QA hotfix + demo-readiness pass closing the accepted follow-ups Spec 010 (committed `0ee1965`) deliberately left in the then-frozen dashboard body: (1) the dashboard **Overview `href="#"`** — fixed by adding a language-aware `linkHref: 'reports.html'` to the `section.overview` `sectionHeader` call (the natural, already-linked metrics hub; zero visual change, only the href value); (2) the **Arabic sessions badge showing Western digits** — fixed by wrapping the badge value in the existing build-time locale helper `num()` at the sidebar render site (`${num(it.badge)}`), keeping it tied to `SESSIONS.total`. Plus a demo-readiness sweep (zero `href="#"` sitewide, link/truthfulness intact) and two required updates to Spec 010 smoke assertions (locale-aware badge; `deadHash === 0` everywhere). **No new page/file/hook/library; reports & finance bodies untouched; dashboard `#page-body` diff limited to the Overview href.**

## Technical Context

**Language/Version**: native ES-module JavaScript (browser) + Node ≥20 build scripts — unchanged
**Primary Dependencies**: none at runtime; dev-only Playwright/axe — **no additions**
**Storage**: none (no fixture/data change; badge value is the existing authored `SESSIONS.total`)
**Testing**: existing `tests/smoke/run.cjs` (two assertions updated), `tests/a11y/run.cjs` (re-run), `tests/screenshots/capture.cjs` (re-capture; frames already exist)
**Target Platform**: static HTML on GitHub Pages; AR RTL + EN LTR; light/dark/system
**Project Type**: static multi-page admin frontend (SSG)
**Performance Goals**: n/a (two build-time string changes)
**Constraints**: static HTML-first (no `#app`, no new runtime construction, no new `data-*` hook, `enhance.js` untouched), no new library/CDN/TS, Django-ready, Specs 008/009/010 guards stay green
**Scale/Scope**: 2 render-site edits + 2 test-assertion edits + doc updates; 40 pages re-bake (sidebar badge ripple + dashboard Overview href)

## Constitution Check

*GATE: `.specify/memory/constitution.md` is the unfilled template; the effective constitution is the CLAUDE.md hard-constraints block + Specs 001–010 binding contracts. Evaluated against those:*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first, no `#app`, no runtime construction, no new hook | **PASS** | Two build-time string changes at existing render sites; `enhance.js` untouched |
| Fixture-only; no engines; honesty invariants | **PASS** | No data change; badge stays `SESSIONS.total`; Overview → a real implemented page |
| No new library/CDN/TS; relative paths; GitHub Pages | **PASS** | Nothing added |
| Specs 008/009/010 guards preserved | **PASS** | Reports/finance bodies untouched; dashboard body limited to the Overview href; no finance vocabulary added (target is `reports.html`, already a dashboard link) |
| No new pages/portals/legacy cloning | **PASS** | Zero new pages/files |
| Screenshot-based visual acceptance | **PASS** | Dashboard + sidebar-badge frames, human-reviewed |

**Post-Phase-1 re-check**: design artifacts add no violation — both fixes are one-line render changes; the only test edits correct two Spec 010 assertions to the fixed state. **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/011-final-qa-demo-readiness/
├── plan.md
├── research.md                 # D1–D5
├── data-model.md               # 5 doc/build-time shapes
├── quickstart.md
├── checklists/requirements.md
└── contracts/
    ├── dashboard-overview-link-contract.md
    ├── localized-nav-badge-contract.md
    ├── link-truthfulness-contract.md
    ├── dashboard-impact-contract.md
    ├── reports-impact-contract.md
    ├── finance-impact-contract.md
    ├── static-html-django-ready-contract.md
    ├── screenshot-acceptance.md
    └── scope-guard.md
```

### Source Code (repository root: `academy-dashboard-discovery/app/`)

```text
src/js/pages/dashboard.js        # +linkHref:'reports.html' (language-aware) on the Overview sectionHeader — the one dashboard-body touch-point
src/js/components/sidebar.js     # import num; render ${num(it.badge)}
tests/smoke/run.cjs              # badge assert → locale-aware; link-crawl deadHash → ===0 everywhere
README.md                        # Spec 011 Django note (reports url + localized-digit badge)
screenshots/REVIEW.md            # Spec 011 acceptance section
public/*                         # rebuilt (sidebar badge ripple + dashboard Overview href)
../specs/010-.../contracts/scope-guard.md   # G7 #4 line tightened, "(closed by Spec 011)"
../specs/010-.../page-coverage-audit.md · REVIEW.md   # one-line "Resolved in Spec 011" annotations
```

**Structure Decision**: No new modules/components/fixtures/pages/locale files/hooks/guards. `nav.config.js` and `i18n.js` are unchanged (`num()` reused as-is; badge value stays `SESSIONS.total`). Two render-site edits + two test-assertion corrections + docs.

## Impact Reviews (full text in contracts/)

- **Dashboard**: one sanctioned `#page-body` touch-point — the Overview `<a href>` value (`#` → `reports.html`). Nothing else; revenue KPI and all prior integrations untouched. The localized badge is in the shared sidebar (outside `#page-body`).
- **Reports**: zero diff; body byte-identical; it merely gains an inbound dashboard link (it was already a dashboard target).
- **Finance**: zero diff; all Spec 009 invariants intact; only the shared sidebar badge ripples.

## MVP & Sequencing (research D5)

**MVP = the two fixes + the two test updates** (steps 1–4): the demo-ready outcome. Then build/smoke/a11y/sweep → body-diff proofs + prior guards → screenshots → docs (REVIEW + D4 reconciliations + CLAUDE).

## Complexity Tracking

*No constitution-gate violations.* The only nuance — two Spec 010 smoke assertions change — is intentional and documented (research D3): they encoded the pre-fix state (Western badge; one allowed dashboard `href="#"`) and are corrected to the fixed state, not weakened.
