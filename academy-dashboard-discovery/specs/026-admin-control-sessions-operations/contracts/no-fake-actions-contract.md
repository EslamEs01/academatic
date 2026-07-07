# Contract — No Fake Actions

**MUST**: no fake create/save/edit/delete/submit/upload/download/export/print/chat/notification-count/live-room/attendance-write/outcome-write/payment/invoice-payment/report-generation/password-change. Honest alternatives only: `backendRequired`, `planned`, `future-backend`, `permission-locked`, `display-only`, read-only modal, confirm-with-backendRequired-final.

**Acceptance**
- No DOM mutation simulating persistence anywhere.
- No file/download/upload produced; no live room; no attendance/outcome write; no scheduler engine; no chat send; no notification count/dot.
- Built grep: `data-demo-action` absent from persistence-implying actions; `href="#"`=0.
- **Fail** on any faked outcome.
