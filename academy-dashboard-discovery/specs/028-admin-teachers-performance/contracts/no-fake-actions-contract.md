# Contract — No Fake Actions (Spec 028)
**MUST**: no fake create/save/edit/delete/status-change/assign/schedule-mutation/upload/export/print/message/live-join/payroll; only honest outcomes (backendRequired, planned, future-backend, permission-locked, display-only, read-only modal/drawer, confirm-with-backendRequired-final).
**Acceptance**
- No DOM mutation simulating persistence (no status flip, no roster/schedule change, no fabricated assignment/link).
- Built grep: 0 «(تجريبي)»/"(demo)"/"preview action"/«بنجاح»/"successfully" in any built teacher page; `href="#"`=0.
- Picker selections never persist; confirm finals never claim done/saved.
- **Fail** on any faked outcome.
