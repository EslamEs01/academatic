# Contract: Teacher Pay-Free (Spec 015)

**Status**: Binding · THE hard rule. References FR-018, US14, SC-005; carries Spec-012 FR-006 forward onto the deepened page. Capture-verified: the legacy `/teacher/home` led with a `Your Salary` hero (`997.00 EGP` + Estimated/Fines/Bonus badges linking to the pay report); the pay pages were `/teacher/salary` (13-col ledger), `/teacher/salary-class-report`, `/teacher/update-result` (23-col matrix).

## 1. Absolute absence

The teacher dashboard renders **zero** pay surfaces, figures, controls, or vocabulary:
- No salary hero, ledger, report, or any element derived from T2/T17/T18/T19 — those rows stay **backendRequired** in the coverage artifact, never previewed.
- No money/currency figure or token: `EGP`, `SAR`, `USD`, `ريال`, `ر.س`, `جنيه`, `$`, `€`, `£`.
- No pay vocabulary in **visible copy OR source comments** (the standing word-bounded set): `salary`, `salaries`, `pay`, `payout(s)`, `earning(s)`, `compensation`, `bonus`, `fine(s)`, `راتب`, `رواتب`, `أجر`, `مستحقات`, `غرامة`, `مكافأة`.
- No route to any pay surface: the ONE page-body link targets `teacher-performance(.en).html` — the Spec-007 KPI board that is itself pay-free by construction (Spec 007 G-guards).

## 2. Enforcement (three independent layers)

1. **Source grep** (scope-guard audit): the word-bounded EN+AR regex over `teacher-portal.js`, the portal fixture teacher block, and both locale overlays — including comments — zero hits.
2. **Built-output grep**: the same regex + the currency-token regex over both built teacher files — zero hits.
3. **Smoke assertion**: the EXISTING Spec-012 teacher pay-token assertion (`payHit` on the rendered body innerText, both languages) stays **byte-verbatim** and must pass on the deepened page.

## 3. Wording discipline

Honest availability copy near gated writes must avoid pay-adjacent framing (e.g., the outcome-save gate speaks of "recording results", never of session rates or compensation). The suppressed fixture numerics (`rating`, `util`, `hours`, `sessions`) are also never rendered — no number that could read as a pay-adjacent metric.

## Acceptance (binding)

1. **Given** the sources (incl. comments) + both built files, **When** the pay + currency regexes run, **Then** zero hits.
2. **Given** the smoke run, **Then** the Spec-012 teacher payHit assertion passes unchanged on the deepened page.
3. **Given** visual review of every frame, **Then** no pay surface, figure, or vocabulary appears — recorded in REVIEW.md.
