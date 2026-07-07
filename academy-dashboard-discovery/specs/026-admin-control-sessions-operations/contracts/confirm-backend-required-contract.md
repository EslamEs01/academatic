# Contract — Confirm → backendRequired

**MUST**: Delete/Cancel/Suspend/Stop/Remove/Reschedule/Record-payment/Mark-paid/Send-reminder/Reset/Schedule-report keep their `data-confirm` modal, but the confirm outcome states the change **requires the server**; never a success toast; never a DOM mutation.

**Acceptance**
- `data-confirm-toast`/message wording = backendRequired ("… requires the server / يتطلب الخادم"), never "cancelled/deleted/saved/done".
- No DOM row is added/removed/mutated on confirm.
- The confirm modal stays accessible (focus trap, Escape, scrim close — existing `openConfirm()`).
- **Fail** if a confirm implies the write happened or fakes a mutation.
