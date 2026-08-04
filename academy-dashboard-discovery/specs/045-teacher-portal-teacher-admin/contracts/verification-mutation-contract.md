# Verification and Mutation Contract

The existing build, smoke, accessibility, screenshot, interaction, privacy, locale, source/generated, protected-test, and impact mechanisms are extended; no new test framework is added.

Required protected guarantees include scope/localized consumers, route/link/trigger truth, pay/rank/absence/role/privacy, Spec-044 interactions, AR/EN/theme/390px parity, console/accessibility, source/generated parity, and unrelated-drift rejection.

Mutation candidates:

| ID | Single mutation | Exact intended RED |
|---|---|---|
| M45-01 | Remove one Teacher scope record | scope inventory guard |
| M45-02 | Remove one localized consumer | locale/source-generated guard |
| M45-03 | Add visible salary/payroll text to a portal page | pay-free guard |
| M45-04 | Expose Teacher performance in portal navigation | role/navigation guard |
| M45-05 | Make admin detail use self-profile identity | identity-separation guard |
| M45-06 | Merge Teacher and student absence labels | absence-integrity guard |
| M45-07 | Break one required deep link/trigger | link/selector guard |
| M45-08 | Remove one AR or EN Teacher copy key | locale parity guard |
| M45-09 | Remove a required 390px containment rule | mobile geometry guard |
| M45-10 | Remove a required dark-theme rule | theme parity guard |
| M45-11 | Desynchronize authored and generated output | source/generated guard |
| M45-12 | Swallow a required selector failure | fail-loud meta-guard |
| M45-13 | Insert false saved/submitted wording | truthfulness guard |
| M45-14 | Break one inherited Spec-044 Teacher interaction | interaction regression guard |
| M45-15 | Leak a forbidden private role field | privacy guard |
| M45-16 | Disable unrelated page-body drift detection | impact meta-guard |

Each run uses a fresh isolated copy, one intentional mutation, exact causal RED, deletion/restoration, final primary-tree GREEN, and residue zero. Syntax/module/fixture/unrelated build failures never count.
