# Contract — Scope Guard (Spec 026)

**Allowed to create/modify** (narrowed): `pages/{dashboard,sessions,schedule,attendance,sessions-analysis,public-holiday,scheduled-actions}.js`; `components/{appointment-details,outcome-details,teacher-actions,course-group-actions,finance-actions,settings-section,wizard,family,student}.js`; `enhance.js` (value/wiring only, no new hook); `nav.config.js` (3 flips); `fixtures/*`; `locales/*`; `styles/app.css` (additive); `scripts/build-html.mjs` (3 registers); `tests/*`; `screenshots/REVIEW.md`; `README.md`; `CLAUDE.md`; the 026 spec dir; append-only 016/023 records.

**Forbidden** (STOP + report): `package.json`; dependencies; backend/API/auth; teacher chat/pay/finance/live-room page; family payment page; student primary-role page; new CRUD/chart/notification/chat/live-room engine; new `data-*` hook or storage key (unless proven unavoidable + justified in `research.md`); building any 027–032 page; any fake persistence.

**Stop conditions**: count ≠ 91 at start or ≠ 97 after build; an ungrounded page; an out-of-scope build; any unclassified action or unresolved DU row; any fake save/delete/upload/export; dashboard filter not honestly resolvable (→ Option B, not fake); role-law scan fail (teacher/family/student/admin-finance); `href="#"` appears; a11y critical/serious; new engine/hook/dependency needed.

**Excluded-by-law guards** (carry forward): fake live room/direct-links (G13); pay-signal «Fine»/«unpaid» tint (M-14); computed «Average»/score/rank/chart (M-13); fake chat send (M-02).
