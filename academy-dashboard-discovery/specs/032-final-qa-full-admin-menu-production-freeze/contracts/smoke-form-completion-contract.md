# Contract: Smoke Form-Completion (the new freeze assertion)

**Purpose**: Prove every create/edit shows a real form; additive; protected asserts byte-verbatim.

**MUST add an additive smoke block**:
- For each create/edit trigger (the 40 FC surfaces / their baked `<template data-preview>`): the template body contains **≥1 `input`/`select`/`textarea`** AND exactly one `data-disabled-reason` (or `data-confirm`) final → **`fieldlessCreateEdit === 0`**.
- MUST-OMIT: 0 `input[type="password"]`; 0 salary/pay/hour-rate/fine/amount/computed-Total token; 0 credential-named input (name/id ~ pass|secret|api|key|token|webhook|otp) on form bodies.
- MUST-GATE: 0 `input[type="file"]` (DOM-scoped — do NOT regex `type="file"`, `library.html` has a legit `data-type="file"` facet); 0 `<canvas>`; 0 `.pdf`/`blob:`/`createObjectURL`/`window.open`/`download=`.
- 14 pickers still render a list + honest final; the 3 hybrid category drawers now contain a Create form control.
- count=103; menu 50/0-unclassified; route 103/0-orphan; `href="#"`=0; raw-keys=0; dead-buttons=0.

**MUST keep byte-verbatim** (not in the diff): `payHit`/`tchPay`/`famPay`/`payFigure`/child-view/finance-`forbidden`/no-mutation/`FAKE` + all 026/027/028/029/030/031 asserts. Any smoke change is **additive only** (insertions).

**Verify**: `git diff tests/smoke/run.cjs` = insertions + the new block; protected regexes absent from the diff; smoke PASS.

**Status**: Binding.
