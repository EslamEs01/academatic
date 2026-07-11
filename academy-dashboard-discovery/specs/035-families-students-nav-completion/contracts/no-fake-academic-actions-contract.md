# Contract — No-Fake Academic Actions

Every write across the four surfaces is an honest gate; no academic value is computed or persisted. (Mirrors `../no-fake-academic-actions-register.md` NF-01…NF-12 as the binding plan contract.)

| Action | Surface | Required treatment |
|---|---|---|
| Book / Assign / Add-to-schedule | schedule-search | `data-disabled-reason` gate; no slot booked, no row added |
| Save category / Reclassify | families.html `fam-cat` | existing `fam.cat.reclassReason` gate, byte-identical; INERT select |
| (view) Results | student.html#view=results | display authored literals; no calc |
| Approve / (view) Evaluation | student.html#view=evaluation | Approve = `backendRequired`; ratings categorical |
| Export / Print (existing) | results tab | Export stays `disabled`; Print stays honest "available once server connected" toast |

## Hard forbiddens
- fake send/save/publish/convert/book/assign; fake success wording («تم/حُفظ/(تجريبي)» / "saved/done"); row/status/result mutation.
- backend/API/websocket/database/auth; external request; external dependency; new hook/storage key.
- `type=file`/`type=password`/credential/secret; `<canvas>`/`.pdf`/`window.open`/`blob:`/`href="#"`; raw keys; dead buttons.

## Honest wording
- All new gates use the standing Spec-026 phrasing («يُتاح بعد ربط الخادم» / "available once the server is connected") via existing reason keys.

## Acceptance
- Smoke `FAKE` guard runs on schedule-search (and the four surfaces) with 0 hits; post-click state unchanged; 0 external request.
