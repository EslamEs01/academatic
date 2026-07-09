# Contract — No Fake Actions

**MUST**: no fake create/save/edit/delete/remove/suspend/enroll/assign/move/upload/download/export/print/message. Honest alternatives only: `backendRequired`, `planned`, `future-backend`, `permission-locked`, `display-only`, read-only modal/drawer, confirm-with-backendRequired-final.

**Acceptance**
- No DOM mutation simulating persistence (no roster add/remove, no status flip, no fabricated link).
- Built grep: 0 «(تجريبي)»/"(demo)"/"preview action"/«بنجاح»/"successfully" in any page; `href="#"`=0.
- Picker selections never persist; confirm finals never claim done/saved.
- **Fail** on any faked outcome.
