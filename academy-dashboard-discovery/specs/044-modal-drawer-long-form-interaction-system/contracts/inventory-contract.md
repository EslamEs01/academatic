# Interaction Inventory Contract

## Required record

Every localized generated-page interaction record contains:

- route/page and locale/direction;
- source component/owner and generated consumer;
- opener selector/ordinal, dynamic-menu mapping when applicable, target ID, and closer selector;
- current and required family;
- form kind and direct editable-control count (audit evidence only);
- theme/viewport and mobile presentation;
- scroll, header, footer/action, validation, dirty, loading/error, and backend-required behavior;
- nested-interaction and duplicate-ID risk;
- owning specification and verified state.

## Recursive extraction

Extraction traverses document nodes and every nested `template.content`. Direct controls classify the current target; controls inside a nested target belong to that nested target and must not reclassify the containing details drawer.

Dynamic row menus resolve through their actual menu family:

- generic row → row identity target;
- family → `fam-edit`, `fam-cat`, profile navigation, and confirmation actions;
- student → `stu-edit`, profile navigation, and confirmations;
- teacher → `trn-edit`, profile navigation, and confirmations;
- staff → identity-specific view plus `staff-edit`, `st-perm`, `st-cat`, `st-activity`, `staff-dup`, gates, and confirmations.

## Fail-loud conditions

- expected source/route absent;
- opener absent, duplicated unexpectedly, or target unresolved;
- target absent/duplicated or classification missing/unknown;
- duplicate recursively expanded ID;
- closer absent;
- duplicate page/consumer record;
- parser failure or fallback to raw whole-file hashing when page-body extraction is required;
- generated/source mismatch;
- unsupported interaction silently ignored.

## Baseline unit

The canonical logical matrix uses the AR route body once and requires byte-structural AR/EN parity. Localized instance totals report both sides explicitly. Repeated row consumers remain individually countable even when they share one source producer.

