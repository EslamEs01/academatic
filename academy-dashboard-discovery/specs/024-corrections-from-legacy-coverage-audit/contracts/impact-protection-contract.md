# Contract: Impact Protection

**Purpose**: protect everything Spec 024 must NOT disturb — the shipped surfaces, the role model, and the displaced-but-retained work.

## Byte-identical / unchanged (MUST hold)

- The FAMILY note (`ar.prt.js:387-388`) and TEACHER note (`ar.prt.js:446-447`) — unchanged (only the STUDENT note is B-01's target).
- All 40 admin pages + `index.html` — unchanged (024 touches no admin page source).
- `student-schedule.html` (+`.en`) — no F-00-1 note; unchanged by B-01.
- Admin `enhance.js` `notificationsMenu()` — unchanged (B-03 reuses it, does not edit it).
- `ROLE_NAV.student` (7 items, all implemented) — structurally untouched (student demoted-not-deleted).
- The dead `hub.student` locale key (`ar.prt.js:172`) — RETAINED (zero-deletion law; renders in no built HTML).
- `build-html.mjs`, `package.json`, `nav.config.js` (unless a proven-safe B-02 doc note), `topbar.js` — not touched.

## Role model (MUST NOT regress)

- Hub = 2 primary role cards (family, teacher) + admin console + 1 demoted child-view preview.
- Family owns the child journey; family-child is the fold point (6 body anchors); family-children has NO fold link (intentional).
- admin/family/teacher are the primary roles; student is the demoted child-view.

## Acceptance

- The unchanged set verifies unchanged (diff/grep); the role-model smoke pins stay green; no displaced work deleted.

**Stop condition**: any protected surface changes unexpectedly, or the role model regresses → STOP and report.
