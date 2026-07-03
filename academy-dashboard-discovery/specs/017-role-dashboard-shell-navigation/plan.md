# Implementation Plan: Role Dashboard Shell + Navigation (Spec 017)

**Branch**: `feature/012-role-portal-foundation` (watcher-owned) · **Date**: 2026-07-03 · **Spec**: [spec.md](spec.md)
**Input**: spec.md + the binding Spec-016 package (IA/freeze/honesty/pay-free-global/sequence + contracts) + this session's source reads (`portal-shell.js`, the `enhance.js` drawer finding, the smoke portal block, locales, fixtures) + the legacy role-app evidence (teacher/guardian sidebars, screenshot-verified).

## Summary

Build **Portal Shell v2**: the three role home pages get a role topbar, a persistent desktop sidebar (7/8/7 items from data-driven registries), and a native `<details>` mobile nav disclosure — all baked statically, all OUTSIDE `#page-body` so every standing sibling assert survives byte-verbatim. Home content is re-hosted unchanged (the page modules' `bodyHTML` is untouched by construction). Future nav entries render as labeled planned buttons (Option B, no placeholder pages). Only the four portal pairs change among the 49 built files (41/49 identical incl. all 40 admin + index).

## Technical Context

**Language/Version**: JS ES modules (SSG-executed) + baked HTML/CSS — unchanged stack · **Primary Dependencies**: none new (no CDN/packages; the existing sprite/i18n/num/esc helpers) · **Storage**: none (no new localStorage keys — sidebar has no persisted state in 017) · **Testing**: the existing smoke/a11y/capture harness; ONE sanctioned smoke amendment (portal-scoped) · **Target Platform**: static HTML, GitHub-Pages relative paths, Django-template-ready · **Project Type**: static multi-page frontend; second shell family · **Performance Goals**: n/a (static) · **Constraints**: `enhance.js`/`build-html.mjs`/`nav.config.js`/`package.json` FROZEN; no new `data-*` hooks (planned buttons reuse the existing acknowledge-toast delegation); admin byte-identity; teacher pay-free (extended token set); sibling content keys frozen · **Scale/Scope**: 1 shell component evolved · 3 registries (22 entries) · ~30 new `prt.nav.*` key pairs + sanctioned `prt.hub.*` rewording · ~15 additive CSS selectors · 4 built pairs re-rendered.

## Constitution Check

*GATE: the effective constitution = CLAUDE.md hard-constraints + Specs 001–016 binding contracts.*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; no SPA/runtime DOM; closed hook set | **PASS** | Shell baked by the SSG; mobile nav = native `<details>` (zero JS); planned buttons reuse the existing generic toast delegation — zero new hooks |
| Fixtures only; four honest action classes | **PASS** | Nav = real links (homes) + labeled planned buttons; registries are display metadata |
| Zero pay tokens (teacher, extended set); family zero-figures | **PASS** | Registry labels verified; three-layer audit re-run over the deepened teacher page; payHit byte-verbatim |
| No engines/computed anything | **PASS** | Navigation only |
| Admin protected; two-shell separation | **PASS** | 40 admin files + index byte-identical (41/49); no admin classes in shell v2; portal-absence assert untouched |
| Design freeze compliance | **PASS w/ recorded amendments** | A1 (native disclosure ≠ enhance.js clone-drawer — admin-bound, frozen) · A2 (no sidebar collapse in 017 — collapse needs hooks/storage that are frozen; deferred) — both via the freeze's change-control clause |
| Screenshot-based acceptance | **PASS** | Re-captured portal frames + a drawer-open mobile frame; REVIEW.md verdicts |

**Post-Phase-1 re-check**: no new violations; the two amendments are explicit and recorded. **GATE PASS.**

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/017-role-dashboard-shell-navigation/
├── spec.md · checklists/requirements.md
├── plan.md · research.md (D1–D13) · data-model.md · quickstart.md
└── contracts/ (11)
    shell-v2-contract.md · role-nav-registry-contract.md · mobile-nav-contract.md ·
    home-content-integrity-contract.md · sanctioned-anchor-registry-contract.md ·
    admin-impact-contract.md · sibling-content-impact-contract.md ·
    teacher-pay-free-contract.md · static-html-django-ready-contract.md ·
    screenshot-acceptance.md · scope-guard.md
```

### Source Code (app root: `academy-dashboard-discovery/app/`)

```text
src/js/components/portal-shell.js   # Shell v2: role topbar + aside.pt-sidenav + details.pt-nav-drawer
                                    #   (role pages only; hub keeps header-only) — nav OUTSIDE #page-body
src/js/fixtures/portal.js           # + ROLE_NAV registries (student 7 · family 8 · teacher 7) ONLY;
                                    #   PERSONAS/PREVIEWS/PLANNED untouched
src/js/pages/{student,family,teacher}-portal.js  # UNTOUCHED by default (bodyHTML identical);
                                    #   only if the shell call signature needs an activeId arg pass-through
src/js/pages/portals.js             # hub copy keys only (sanctioned rewording), structure unchanged
src/locales/ar.prt.js · en.prt.js   # + prt.nav.* (shared shell, 017-owned) + the sanctioned prt.hub rewording;
                                    #   ALL prt.stu/fam/tch content keys + data.* BYTE-UNTOUCHED
src/styles/app.css                  # additive .portal-shell selectors: .pt-layout/.pt-sidenav/.pt-nav-item/
                                    #   .pt-nav-drawer/.pt-ident (desktop grid + mobile disclosure + active pill)
tests/smoke/run.cjs                 # the ONE amendment: shell asserts + sanctioned-anchor registry
tests/screenshots/capture.cjs       # additive: drawer-open mobile frame (+ existing frames re-capture)
screenshots/REVIEW.md · README.md · CLAUDE.md (pointer)  # docs
public/{student,family,teacher}-portal(.en).html + portals(.en).html   # the ONLY built changes
```

## Phase 0 — Research (complete)

D1–D13 resolved in `research.md`. Headlines: layout = header → `.pt-layout` flex (aside + main), nav strictly outside `#page-body` · registries in `fixtures/portal.js` · active item = self-anchor with `aria-current` · planned = non-anchor buttons w/ «قريبًا» pill + existing toast · mobile = `<details>` disclosure (A1) · no collapse (A2) · hub copy rewording scoped to 4 keys · home integrity proven by construction (page modules untouched) + built-body extraction diff · sanctioned-anchor multiset pinned per page (5 shell anchors/role page: self×2 + hub×3) · smoke amendment single-diff · captures + a11y additive.

## Phase 1 — Design artifacts (complete)

`data-model.md` (registry/shell/anchor-registry/locale shapes + validation) · 11 contracts · `quickstart.md` · CLAUDE.md SPECKIT block re-pointed to this plan (the sanctioned 016→017 pointer refresh).

## Phase 2 — Implementation outline (for /speckit-tasks)

Baseline gate → registries + `prt.nav.*` keys + CSS [P] → shell v2 in `portal-shell.js` (role pages get sidebar+drawer; hub untouched path) → hub copy rewording → build + **home-integrity proof** (SC-003) → smoke amendment + green run (MVP) → a11y + captures (incl. drawer-open) → G-audit (41/49 identity · pay-free three layers extended set · anchor registries · prior guards) → docs (README/CLAUDE/REVIEW/coverage annotation) → reviews → final gate.

**STOP — plan ends here; /speckit-tasks generates the task list.**
