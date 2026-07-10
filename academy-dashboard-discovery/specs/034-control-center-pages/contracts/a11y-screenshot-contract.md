# Contract: A11y & Screenshots — Spec 034

**Binding.** Additive rows only; critical=0 serious=0; 0 console errors.

**A11y (`tests/a11y/run.cjs`) new rows:**
- 5 pages: desktop AR-light + AR-dark + one EN + mobile-390.
- open-form/interaction rows: messages compose, leads Create-Request, tasks Create-task, announcements compose, time-converter controls (focus-trap/labelled-controls/dialog on open drawers; labelled selects/inputs on the converter).
- Gate: critical=0 (fail on any critical); serious=0 target.

**Screenshots (`tests/screenshots/capture.cjs`) new frames:**
- messages: inbox/thread/compose (desktop AR + EN + dark + mobile) + Create-Group drawer.
- leads: list+filters + detail drawer + Create-Request drawer (AR + EN/dark/mobile).
- tasks: board + per-staff table + create drawer (AR + dark/mobile).
- announcements: list + compose + preview (AR + EN/dark/mobile).
- time-converter: converter + quick view + Changes board + **active-conversion** frame (AR + EN/dark/mobile).
- All: 0 console errors; update `screenshots/REVIEW.md` with a Spec-034 section.

**Mobile 390**: every page + open form reflows to 1-col; no horizontal overflow.
