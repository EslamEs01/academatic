# Contract — Scope Guard (Spec 027)

**Allowed to create/modify** (narrowed): `pages/{families,family,add-family,students,student,courses,course,groups,group}.js`; `components/{family,family-card,student,wizard,course-group-actions,group-row,table}.js`; `enhance.js` (add `studentMenu` builder + a `'student'` row-menu dispatch branch mirroring `familyMenu` — reuses the existing `data-row-menu` hook; no new dispatch hook); `fixtures/*`; `locales/*`; `styles/app.css` (additive); `tests/*`; `screenshots/REVIEW.md`; `README.md`; `CLAUDE.md`; the 027 spec dir; append-only 016/023/026 records.

**Forbidden** (STOP + report): `package.json`; dependencies; backend/API/auth/database; teacher chat/pay/finance/live-room page; family payment page; student primary-role page; admin finance/reports/settings pages; new CRUD/chart/notification/chat/live-room engine; new `data-*` dispatch hook or storage key (unless proven unavoidable + justified in `research.md`); **any new standalone page** (count stays 97 unless planning re-justifies with legacy IA); building any 028–032 domain.

**Stop conditions**: count ≠ 97 at start or after build; a new page where a modal/drawer suffices; any M-row unresolved or action unclassified; any fake save/delete/enroll/assign/remove; cross-family transfer fields invented; computed result/evaluation score/rank/chart; family-portal pay figure; teacher pay token; student-primary wording; `href="#"`/dead button/raw key; new engine/hook/dependency needed; a Spec-026 protection regresses; a11y critical/serious.

**Excluded-by-law guards** (carry forward): family-portal zero-pay; salary/payroll figures never; student child-view; teacher pay-free; admin finance Spec-009 invariant; no computed score/rank/chart; no fake CRUD/roster mutation.
