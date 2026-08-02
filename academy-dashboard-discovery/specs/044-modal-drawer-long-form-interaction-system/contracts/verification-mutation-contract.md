# Verification and Mutation Contract

## Additive Spec-044 guard blocks

1. Recursive inventory/classification/source-generated guard.
2. Browser lifecycle/focus/scroll/dirty/validation/backend-required guard.
3. Mobile 390px and stable-region geometry guard.
4. Dropdown non-modal and mobile-sidebar modal-grade guard.
5. Locale/theme/source-generated/count/impact guard.

Spec-043 privacy/RBAC assertion meaning and the R2/R3 hard exits remain unchanged. The three
Spec-032 interaction assumptions superseded by Spec 044 are declared, bounded, and strengthened in
[protected-test-supersession.md](protected-test-supersession.md); no other protected meaning change is authorized.

## Required browser proofs

- opener→target and close mapping;
- safe and dirty Escape/overlay/close behavior;
- interaction-purpose initial focus;
- Tab/Shift+Tab wrap and background isolation;
- exact opener restoration;
- one overlay/trap/listener/lock under repeated/nested requests;
- background scroll lock, compensation, and exact restoration;
- desktop and 390px viewport geometry; stable header/content/footer/action;
- dirty accuracy, canceled discard preservation, confirmed discard;
- validation associations, preserved invalid values, summary/focus;
- truthful in-surface backend-required state and no fake success/loading;
- dropdown keyboard/outside/Escape and non-modal semantics;
- mobile-sidebar modal-grade behavior;
- dedicated-page wizard state/departure;
- AR/EN, RTL/LTR, themes, and protected privacy parity.

## Mutation register

| ID | Single mutation | Expected exact RED |
|---|---|---|
| M44-01 | Remove one required opener | inventory required-opener guard |
| M44-02 | Point one opener at the wrong/missing target | mapping guard |
| M44-03 | Remove dialog/modal semantics | semantics guard |
| M44-04 | Disable focus containment | Tab-boundary/background-focus guard |
| M44-05 | Break exact opener restoration | restoration guard |
| M44-06 | Remove safe Escape handling | Escape guard |
| M44-07 | Allow dirty Escape/close without warning | dirty-dismissal guard |
| M44-08 | Permit a second modal-grade overlay | one-overlay guard |
| M44-09 | Skip body scroll restoration | scroll-position guard |
| M44-10 | Remove 390px full-screen rule | mobile geometry guard |
| M44-11 | Remove stable action/footer rule | long-surface geometry guard |
| M44-12 | Replace backend-required copy with false saved wording | truthfulness guard |
| M44-13 | Remove AR or EN required copy | locale parity guard |
| M44-14 | Swallow a required selector failure | fail-loud meta-guard |
| M44-15 | Reintroduce fixed nested feedback field IDs | recursive duplicate-ID guard |

Each mutation uses a fresh isolated copy, one mutation only, intended RED attribution, deletion/restoration, primary-tree GREEN, and final residue zero. Syntax/load/build/fixture/unrelated failures do not count.

## Full gates

Build; focused interaction guard; smoke; Spec-043 protected guards; accessibility critical=0/serious=0; screenshots console errors=0; manual original-detail review; exact page/body and consumer counts; source/generated parity; impact/ownership truthfulness; mutation residue=0; `git diff --check`.
