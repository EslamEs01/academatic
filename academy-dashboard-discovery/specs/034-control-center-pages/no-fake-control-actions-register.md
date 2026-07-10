# No-Fake Control Actions Register — Spec 034

Every write/action across the four write-pages must be honest. Each row: the action · why it cannot be real (engine) · the honest treatment · enforcement.

| Action | Page | Why not real (engine) | Honest treatment | Enforcement |
|---|---|---|---|---|
| Send / Reply message | messages | real message-delivery engine | compose renders; **Send = backendRequired gate**; no bubble appended | smoke `FAKE` + no-mutation (thread byte-identical) |
| Create Group / Add Member | messages | real group persistence | form renders; **Save = gate**; image = gate | smoke gate + noFile |
| Mark read / unread | messages | real state persistence | unread chips are authored display-only; **no toggle** | no-mutation (chips byte-identical) |
| Convert lead → family/student | leads | real CRM + entity creation | **Convert = gate**; no entity created | smoke `FAKE` + no-mutation |
| Assign / follow-up lead | leads | real CRM assignment | **Assign = gate** | smoke gate |
| Add note (lead) | leads | real persistence | note field renders; **Save = gate**; no note appended | no-mutation (notes log byte-identical) |
| Change status (lead) | leads | real persistence | status select renders; **Update = gate**; **no chip flip** | no-mutation (status chip byte-identical) |
| Create new request | leads | real persistence | full form renders; **Submit = gate**; no row added | smoke `FAKE` + no-mutation (row count byte-identical) |
| Create / edit task | tasks | real task persistence | form renders; **Save = gate**; no card added | no-mutation (board byte-identical) |
| Move task / change column | tasks | real persistence | board is display-only; **no working drag**; move = gate/absent | no-mutation; no DnD wiring |
| Assign task | tasks | real persistence | **Assign = gate** | smoke gate |
| Add section | tasks | real persistence | name field; **Add-Section = gate** | smoke gate |
| Publish / send announcement | announcements | real broadcast delivery | compose + preview render; **Publish/Send = gate**; no delivery | smoke `FAKE` + no-mutation |
| WhatsApp / channel delivery | announcements | real integration credentials (Spec 040) | channel toggle shown; **send = gate**; no credential input | smoke gate + no-secret |
| Attach media (announcement / chat) | announcements, messages | real file upload/storage | **gate — no `type=file`** | smoke noFile (DOM `input[type=file]`=0) |
| Timezone conversion | time-converter | **none — pure client math** | **REAL, no gate** (native `Intl`) | smoke: output present + no external request; NOT gated |

## Blanket rules
- **No fake-success wording** anywhere: none of `(demo)` · «بنجاح» · `successfully` · «إجراء تجريبي» · `preview action` · «تم الإرسال» · «تم النشر» · «تم الحفظ» on any `data-toast`/`data-confirm-toast`/`data-confirm-msg`. → smoke `FAKE` guard (byte-verbatim).
- **No mutation** on any Save/Send/Convert/Publish/Move: lists/threads/boards/chips byte-identical before/after. → smoke no-mutation snapshots on a representative action per write-page.
- **No backend/API/websocket/realtime**; fixtures only; localStorage = UI-state only.
- **No fake persistence** (no row/card/note/message/announcement added or removed by any action).
- The **only** genuinely-working action in Spec 034 is the **timeConverter conversion** (client-side math) — everything else that implies a backend write ends at an honest gate.
