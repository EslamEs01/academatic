# Contract: No-Fake Control Actions — Spec 034

**Binding.** Every backend-write across the four write-pages is honest; nothing mutates or claims success. (The ONE genuinely-working action is the timeConverter conversion — client math, not a write.)

- **No fake**: message send/reply, message read-state, lead convert/assign/note/status/create, task create/edit/move/status/assign/add-section, announcement publish/send/schedule, channel/notification delivery.
- **Every write final** = a `data-disabled-reason` (or `data-confirm` → backendRequired) gate. **No** row/card/note/message/announcement added or removed; **no** status/read-state/column flip.
- **No fake-success wording**: none of `(demo)` · «بنجاح» · `successfully` · «إجراء تجريبي» · `preview action` · «تم الإرسال» · «تم النشر» · «تم الحفظ» on any `data-toast`/`data-confirm-toast`/`data-confirm-msg`.
- **Verify**: smoke `FAKE` guard (byte-verbatim) over the 5 pages = 0; no-mutation snapshot on a representative write per write-page (list/board/thread/chip byte-identical before/after).
