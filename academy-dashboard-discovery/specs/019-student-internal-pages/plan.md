# Implementation Plan: Student Internal Pages (Spec 019)

**Branch**: `feature/012-role-portal-foundation` (single working branch, watcher-owned) · **Date**: 2026-07-04 · **Spec**: [spec.md](spec.md)
**Input**: spec.md + [`visual-grounding.md`](visual-grounding.md) (gate COMPLETE) · Specs 016/017/018 law · direct source reads (shell, fixtures, home modules, build script, all three test harnesses).

## Summary

Build the six student internal page pairs (`student-schedule/homework/materials/progress/history/profile` ×AR/EN → 51→**63** built files), flip the six `ROLE_NAV.student` statuses `planned → implemented` (the Spec-017 mechanism), make the student home's quick-tiles status-aware (the D13 honesty fix — implemented tiles become real links; home body anchors 0→6, reported as the sanctioned deviation from "byte-equal if possible"), re-home the Spec-018-displaced student content on its owning pages (zero retirement), and prove **49/63** byte-identity with payHit/zero-pay/family/teacher/hub/admin asserts BYTE-VERBATIM.

## Technical Context

**Stack**: unchanged (JS ES-module SSG → complete static HTML; closed `data-*` hook set; no deps added). **New files**: 6 page modules + 1 shared primitives component (`components/portal-page.js`, D3-sanctioned) + 12 built pages. **Touched**: `fixtures/portal.js` (nav flip + additive `STUDENT_PAGES`), both `prt` locales (additive), `app.css` (additive only if a new primitive is truly needed — expectation: ZERO new CSS; the 018 `.pt-*` set suffices), `build-html.mjs` (6 imports + 6 entries + the line-130 `activeId` pass-through — byte-neutral for existing pages), `student-portal.js` (quick-tiles only), the three test harnesses (ONE smoke amendment + additive a11y/capture rows), docs. **Frozen**: `portal-shell.js`, `enhance.js`, `nav.config.js`, `package.json`, all family/teacher/admin modules, family/teacher registries. **NO NEEDS-CLARIFICATION remain** (D1–D16 resolved in research.md).

## Constitution Check (the CLAUDE.md hard-constraint law — the effective constitution)

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first; complete baked pages; closed hooks | **PASS** | 12 fully pre-rendered files; zero new hooks/storage; display-only period chips chosen over filter machinery (history contract) |
| Fixtures only; four honest action classes | **PASS** | STUDENT_PAGES authored literals; every gate a labeled availability chip; the 3 profile gates legacy-evidenced |
| No engine/computed/chart/rank | **PASS** | bars = `.pt-bar` only; celebration stays unordered; the admin analytics frame explicitly kept admin-side |
| Pay rules (teacher extended · family zero-pay · student pay-free-by-authorship) | **PASS** | no teacher/family file touchable; byte-verbatim smoke lines; student token hygiene in D10(b)/D14 |
| Admin protected; two-shell law | **PASS** | 49/63 identity; role pages re-express rhythm in `.pt-*` tokens; zero admin selectors |
| Design freeze + compact discipline | **PASS** | 018 primitives reused; ceiling extended to internals [500,2200] (D11); no hero/table/grid patterns |
| Zero `href="#"` / dead links / raw keys | **PASS** | smoke-pinned per page; the quick-tiles honesty fix (D13) removes the would-be lie |
| Screenshot visual acceptance | **PASS** | D15 matrix + REVIEW.md verdicts + unchanged proofs |
| Sequence discipline (016 amended order) | **PASS** | 019 = Student Internal Pages per the recorded renumber; coverage annotations append-only (D16) |

**Post-Phase-1 re-check**: PASS (no design produced a violation; the one deviation — home body anchors 0→6 — is an honesty-law REQUIREMENT, recorded in D13 and the impact contract).

## Project Structure

```text
specs/019-student-internal-pages/
├── spec.md · visual-grounding.md · checklists/requirements.md
├── plan.md · research.md (D1–D16) · data-model.md · quickstart.md
└── contracts/ (15): targeted-visual-grounding · student-nav-flip · student-page-shell ·
    student-{schedule,homework,materials,progress,history,profile} · honesty-backendrequired ·
    impact-protection · pay-zero-safety · mobile-a11y-screenshot · smoke-rescope · scope-guard
```

```text
app/src/js/pages/student-{schedule,homework,materials,progress,history,profile}.js   # NEW ×6
app/src/js/components/portal-page.js        # NEW shared primitives (D3; consumed by the 6 new modules only)
app/src/js/pages/student-portal.js          # quick-tiles status-aware ONLY (D13)
app/src/js/fixtures/portal.js               # nav flip (6 lines) + additive STUDENT_PAGES (D5/D6)
app/src/locales/ar.prt.js · en.prt.js       # additive prt.title.stu* + prt.stu.pg.* + data.prtStuPg* (D7)
app/scripts/build-html.mjs                  # 6 imports + 6 entries + line-130 activeId pass-through (D4)
app/src/styles/app.css                      # expectation: NO change (018 primitives suffice); additive-only if forced, recorded
app/tests/smoke/run.cjs                     # the ONE amendment (smoke-rescope contract / D10)
app/tests/{a11y,screenshots}/*              # additive rows (D15)
docs: REVIEW.md · README.md · CLAUDE.md · 016 matrix + 018 displacement annotations (D16)
built: 12 new student files + the student home pair re-baked (63 total; 49/63 identical)
```

## Allowed files (exact — the implementation may touch NOTHING else)

Production: the 6 new page modules · `components/portal-page.js` (NEW, D3-sanctioned) · `student-portal.js` · `fixtures/portal.js` · `ar.prt.js`/`en.prt.js` · `app.css` (only if forced, additive) · `build-html.mjs` (the 6+6+1 touch). Tests/docs: `tests/smoke/run.cjs` · `tests/a11y/run.cjs` · `tests/screenshots/capture.cjs` · `screenshots/REVIEW.md` · `README.md` · `CLAUDE.md` · 016 `legacy-to-new-coverage-matrix.md` (append-only) · 018 spec folder (append-only annotations) · the 019 spec folder. Built: the 14 student files + `public/assets/*` regeneration.

## Forbidden (0-line diffs proven at the G-audit)

`portal-shell.js` · `enhance.js` · `nav.config.js` · `package.json` · every admin page/fixture/shell file · `family-portal.js` · `family-child.js` · `teacher-portal.js` · `portals.js` · `ROLE_NAV.family`/`ROLE_NAV.teacher` rows · any dependency/CDN/framework · backend/API/auth · commit/push/deploy/manual hook trigger.

## Phase 0 — Research (complete): D1–D16 in [research.md](research.md)

Headlines: grounding sufficient (D1) · six modules + ONE shared primitives component (D2/D3) · build = 6 imports + 6 entries + the **line-130 activeId pass-through** (D4, byte-neutral for all 49 existing files) · six-line nav flip (D5) · additive `STUDENT_PAGES` (D6) · `prt.stu.pg.*` namespace (D7) · per-page activeId (D8) · anchor law: internals body 0 · home body 6 · shell multiset 17 (D9) · ONE smoke amendment enumerated (D10) · ceiling extended to internals **[500, 2200]** (D11) · **49/63** (D12) · the quick-tiles honesty fix = the ONE recorded deviation (D13) · pay tripwires byte-verbatim (D14) · capture matrix (D15) · append-only coverage annotations (D16).

## Phase 1 — Design artifacts (complete)

[data-model.md](data-model.md) (8 shapes) · 15 contracts · [quickstart.md](quickstart.md) · CLAUDE.md SPECKIT pointer → this plan (sanctioned).

## Phase 2 — Implementation outline (for /speckit-tasks)

Baseline gate (build/test green vs HEAD `fe47f68`; 51 files; BEFORE state recorded) → foundational [P]: `portal-page.js` primitives + `STUDENT_PAGES` fixtures + locale keys → the six page modules in dependency-free sequence (schedule → homework → materials → progress → history → profile), each validated against its contract → the registration cluster as ONE reviewed step: build-html (6+6+1) + nav flip (6 lines) + home quick-tiles fix → `npm run build` (63) + heights recorded per page → the ONE smoke amendment (smoke-rescope contract) green = **MVP** → a11y rows + capture rows + REVIEW.md section → G-audit (49/63 hash · frozen-file 0-diffs · teacher pay three layers · family zero-pay · retention grep · anchor inventories · build-html diff shape) → docs + D16 coverage annotations → adversarial reviews (clean-code guard + test guard on the full diff) → final full gate → report.

**STOP — plan ends here; /speckit-tasks next.**
