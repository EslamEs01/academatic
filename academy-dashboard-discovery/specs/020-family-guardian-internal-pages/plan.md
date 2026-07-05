# Implementation Plan: Family / Guardian Internal Pages (Spec 020)

**Branch**: `feature/012-role-portal-foundation` (single working branch, watcher-owned) · **Date**: 2026-07-04 · **Spec**: [spec.md](spec.md)
**Input**: spec.md + [`visual-grounding.md`](visual-grounding.md) (**COMPLETE at 100% — 27/27 family frames**) · Specs 016–019 law · direct source reads (shell, portal-page primitives, fixtures, family home/child modules, build script, all three harnesses).

## Summary

Build the seven family internal page pairs (`family-{children,schedule,progress,billing,requests,materials,profile}` ×AR/EN → 63→**77** built), flip the seven `ROLE_NAV.family` statuses (the proven 019 mechanism), apply the status-aware quick-tiles honesty fix to the family home's own copy (home body anchors 5→**12**: the 5 unchanged child drill-downs + 7 real tiles), preserve `family-child` as the drill-down (nav-only rebake; body byte-equal, extraction-proven), keep billing STATUS-FIRST under the zero-pay hard line (hour-quota + amount-free invoice rows; the verbatim payFigure regex extended to all seven new pages), and prove **59/77** identity with the student/teacher/hub/admin asserts + payHit + the original zero-pay lines BYTE-VERBATIM.

## Technical Context

**Stack**: unchanged. **New files**: 7 page modules + 14 built pages. **Touched**: `fixtures/portal.js` (7 flips + additive `FAMILY_PAGES`), both `prt` locales (additive), `family-portal.js` (quick-tiles only), `build-html.mjs` (**7 imports + 7 entries — purely additive 14 lines; the 019 activeId pass-through is live, zero engine change**), the three harnesses (ONE smoke amendment + additive a11y/capture rows), docs. **Expected ZERO new CSS** (portal-page primitives + the existing `.pt-*` set suffice; additive-only-if-forced, recorded). **Frozen**: `portal-shell.js`, `portal-page.js` (extend-only if a primitive gap appears), `enhance.js`, `nav.config.js`, `package.json`, `family-child.js` (default; stop-and-report exception), all student/teacher/admin modules, student/teacher registries. **NO NEEDS-CLARIFICATION remain** (D1–D20 resolved).

## Constitution Check (the CLAUDE.md hard-constraint law)

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; baked pages; closed hooks | **PASS** | 14 fully pre-rendered files; zero new hooks/storage; grouping replaces filter machinery |
| Fixtures only; four honest classes | **PASS** | FAMILY_PAGES authored literals; every write a labeled gate; trial step-2 stays gated (the recorded gap) |
| No engine/computed/chart/rank | **PASS** | bars `.pt-bar` only; no comparison; quota arithmetic authored (40=12+28), never computed |
| **ZERO-PAY hard line** (+ teacher pay-free) | **PASS** | billing shape has NO amount field; D13 wording rules pre-checked against the regex; the verbatim payFigure regex runs on all 7 pages; payHit + original lines byte-verbatim |
| Admin protected; two-shell law | **PASS** | 59/77; no admin selector; violet tokens only |
| Design freeze + compact discipline | **PASS** | 018/019 primitives; ceiling [500,2200] internals; no hero/grid/ledger |
| Zero `href="#"`/dead links/raw keys | **PASS** | smoke-pinned per page; the home tiles honesty fix |
| Screenshot acceptance | **PASS** | D19 matrix + REVIEW verdicts + unchanged proofs |
| Sequence discipline | **PASS** | 020 = Family Internal Pages per the recorded renumber; D20 annotations append-only |

**Post-Phase-1 re-check**: PASS (the one notable structural consequence — family-child's nav rebake — is contract-governed with a byte-equal body proof and a stop-condition).

## Project Structure

```text
specs/020-family-guardian-internal-pages/
├── spec.md · visual-grounding.md · checklists/requirements.md
├── plan.md · research.md (D1–D20) · data-model.md · quickstart.md
└── contracts/ (17): targeted-visual-grounding · family-nav-flip · family-page-shell ·
    family-{children,schedule,progress,billing-zero-pay,requests,materials,profile} ·
    family-child-preservation · honesty-backendrequired · impact-protection ·
    pay-zero-safety · mobile-a11y-screenshot · smoke-rescope · scope-guard
```

```text
app/src/js/pages/family-{children,schedule,progress,billing,requests,materials,profile}.js   # NEW ×7
app/src/js/pages/family-portal.js           # quick-tiles status-aware ONLY (D11)
app/src/js/fixtures/portal.js               # 7 flips + additive FAMILY_PAGES (D5/D6)
app/src/locales/ar.prt.js · en.prt.js       # additive prt.title.fam* + prt.fam.pg.* + data.prtFamPg* (D7)
app/scripts/build-html.mjs                  # 7 imports + 7 entries (14 additive lines; NO engine change — D4)
app/src/styles/app.css                      # expectation: NO change; additive-only-if-forced, recorded
app/tests/smoke/run.cjs                     # the ONE amendment (smoke-rescope contract / D14)
app/tests/{a11y,screenshots}/*              # additive rows (D19)
docs: REVIEW.md · README.md · CLAUDE.md · 016 matrix + 018 displacement annotations (D20)
built: 14 new + family-portal pair + family-child pair re-baked (77 total; 59/77 identical)
```

## Allowed files (exact)

Production: the 7 new modules · `family-portal.js` · `fixtures/portal.js` · `ar/en.prt.js` · `app.css` (only if forced) · `build-html.mjs` (7+7). Conditional: `portal-page.js` (additive primitive extension only, recorded) · `family-child.js` (**default FORBIDDEN**; only under the preservation contract's stop-and-report exception). Tests/docs: the three harnesses · REVIEW.md · README.md · CLAUDE.md · 016 matrix (append-only) · 018/019 spec folders (append-only annotations) · the 020 folder. Built: the 18 family files + `public/assets/*`.

## Forbidden (0-line diffs proven at the G-audit)

`portal-shell.js` · `enhance.js` · `nav.config.js` · `package.json` · every admin page/fixture/shell file · ALL student page modules · `teacher-portal.js` · `portals.js` · `ROLE_NAV.student`/`ROLE_NAV.teacher` rows · any dependency/CDN/framework · backend/API/auth · commit/push/deploy/manual hooks.

## Phase 0 — Research (complete): D1–D20 in [research.md](research.md)

Headlines: grounding 100% (D1) · seven modules on `portal-page.js` (D2/D3) · build = **14 purely-additive lines** (D4) · seven-line flip (D5) · `FAMILY_PAGES` incl. the amount-free billing shape (D6) · `prt.fam.pg.*` (D7) · per-page activeId via the live pass-through (D8) · family-child keeps home-active (D9) · anchors: multiset 19 / home 12 / children 5 / progress 5 / others 0 (D10/D11) · family-child body byte-equal BY CONSTRUCTION + extraction proof + stop-condition (D12) · billing wording pre-checked against the regex; the verbatim regex runs on all 7 pages (D13) · the ONE smoke amendment enumerated w/ the byte-verbatim register (D14) · **59/77** (D15) · student byte-stability structural + branch byte-verbatim (D16) · teacher tripwires (D17) · ceiling [500,2200] (D18) · capture matrix (D19) · append-only annotations (D20).

## Phase 1 — Design artifacts (complete)

[data-model.md](data-model.md) (8 shapes) · 17 contracts · [quickstart.md](quickstart.md) · CLAUDE.md SPECKIT pointer → this plan.

## Phase 2 — Implementation outline (for /speckit-tasks)

Baseline gate (build/test green vs HEAD `8d3d561`; 63 files) → foundational [P]: `FAMILY_PAGES` fixtures + locale keys (billing keys regex-pre-checked) → the seven page modules (children → schedule → progress → billing → requests → materials → profile; file-independent [P] after foundations, each validated against its contract) → the registration cluster as ONE reviewed step: build-html (7+7) + the seven-line flip + the home quick-tiles fix → `npm run build` (77) + heights recorded + the family-child `#page-body` extraction hash pre/post → the ONE smoke amendment green = **MVP** → pay/zero-pay audits (payFigure on 7 pages · payHit · teacher three layers · original lines byte-check) → identity audit (59/77 · frozen 0-diffs · build-html 14-line shape · retention grep · registry byte-proof) → a11y + captures + REVIEW → docs + D20 annotations → adversarial reviews (clean-code + test guards) → final full gate → report.

**STOP — plan ends here; /speckit-tasks next.**
