# Future-Owner Register — Spec 034

What Spec 034 builds vs what it explicitly defers (to a real backend engine or to another spec). Every deferred capability names its real-engine reason (per Spec-033 carryover) and its owner. Spec 034 builds the **frontend shell** for all four write-pages; only the final action is deferred.

## Built in Spec 034 (frontend shells + one full tool)
| Surface | Built | Final action (deferred to backend) |
|---|---|---|
| messages.html | inbox + thread + compose/reply UI + filters/status chips | **Send/Reply** → real message-delivery engine |
| leads.html | requests inbox + detail panel + convert/assign/follow-up form + filters/status/source chips | **Convert/Assign/Save** → real CRM ingestion/persistence |
| tasks.html | board/list + task cards + create/edit form + filters | **Save/Assign/Move** → real task persistence engine |
| announcements.html | list + compose + preview + audience/channel/status chips | **Publish/Send** → real broadcast/notification delivery |
| time-converter.html | **full working client tool** (native Date/Intl) | **none** — no backend needed |

## Deferred to future-backend (engine only; the shell IS built here)
| Capability | Why future-backend (real engine) | Owner |
|---|---|---|
| message send / receive / realtime thread | real message-delivery + websocket/polling engine | future-backend |
| message read-state mutation | real persistence | future-backend |
| chat attachments | real file upload/storage (no `type=file` in the shell — shown as a gate) | future-backend |
| lead convert-to-family/student | real CRM + entity-creation engine | future-backend |
| lead assign / follow-up persistence | real CRM assignment/persistence | future-backend |
| task create / move / status / assignment persistence | real task engine | future-backend |
| announcement publish / schedule / delivery | real broadcast + notification-delivery engine | future-backend |
| announcement channel delivery (email/SMS/push/WhatsApp) | real integration credentials + delivery (see Spec 040 integrations) | future-backend |
| message-builder (templated composition) | real template engine (already recorded future-backend in Spec 031) | future-backend |

## Deferred to other specs (NOT Spec 034's scope)
| Capability | Owner spec | Note |
|---|---|---|
| settings Notifications tab (event×channel matrix) | Spec 040 (settings deep-links) | already folded into settings.html (Spec 031); 034 does not touch it |
| integration credentials for announcement channels | Spec 040 | connect/test stay gates; no credential input |
| any finance/pay surface | Spec 038 | Control pages carry no money figure |
| final sidebar re-freeze | Spec 041 | verifies 0 «قريبًا» left in Control |

## Excluded fields/affordances (never rendered — per legacy grounding + carryover)
- No `type=file` upload control anywhere (chat attachment, announcement media → gated affordance only).
- No `type=password` / credential / api-key / webhook / token / OTP control.
- No salary/pay/amount/price figure (leads reference courses/teachers by name only).
- No computed total, no `<canvas>`, no `.pdf`/`window.open`/`blob:`/`download=`.
- No realtime/websocket; no external API (timeConverter uses native browser APIs only).
