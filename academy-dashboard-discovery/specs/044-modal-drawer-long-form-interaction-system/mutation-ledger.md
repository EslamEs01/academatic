# Mutation Ledger — Spec 044

**Accepted result:** 15/15 exact RED; primary-tree GREEN 22/22; isolated-copy residue `0`.

Each row used a newly created `/tmp/academatic-spec044-mutation-*` app copy, one mutation only,
the named selected guard, and unconditional copy removal. Source mutations ran the canonical build
inside their copy. Syntax, module-load, server, fixture, and unrelated failures were rejected.

| ID | Removed/broken guarantee | Exact guard result |
|---|---|---|
| M44-01 | required opener | `inventory.required-opener` RED |
| M44-02 | opener-target mapping | `interaction.opener-target-mapping` RED |
| M44-03 | dialog semantics | `interaction.dialog-semantics` RED |
| M44-04 | focus containment | `interaction.focus-containment` RED |
| M44-05 | exact opener restoration | `interaction.focus-restoration` RED |
| M44-06 | safe Escape dismissal | `interaction.escape-dismissal` RED |
| M44-07 | dirty-close warning | `interaction.dirty-dismissal` RED |
| M44-08 | one-overlay invariant | `interaction.one-overlay` RED |
| M44-09 | scroll restoration | `interaction.scroll-restoration` RED |
| M44-10 | 390px full-screen width | `layout.mobile-390-fullscreen` RED |
| M44-11 | stable action footer | `layout.stable-action-footer` RED |
| M44-12 | truthful backend-required AR copy | `interaction.backend-required-truthfulness` RED |
| M44-13 | EN locale parity | `inventory.locale-parity` RED |
| M44-14 | fail-loud error dispatch | `inventory.fail-loud` RED |
| M44-15 | scoped nested target IDs | `inventory.recursive-duplicate-id` RED |

The initial M44-07 run was correctly RED but the harness expected a later assertion string; Codex
narrowly corrected the causal substring to the first observable discard-warning failure and reran
the complete ledger from fresh copies. The initial M44-11 mutation changed overflow without
violating its paired geometry assertion; Codex replaced it with removal of the stable footer rule
and reran the complete ledger. Neither correction changed production code or an acceptance guard.

Final runner output: `Spec 044 mutations: 15/15 exact RED · residue=0`.

The complete mutation ledger was rerun after the final production CSS/root-lock correction. All 15
fresh copies again produced only their intended RED, the final primary tree returned 22/22 GREEN,
and no `/tmp/academatic-spec044-mutation-*` directory remained.
