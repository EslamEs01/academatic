# Evidence Review — Spec 024 Corrections From Legacy Coverage Audit

**Date**: 2026-07-07
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Spec 023 present as uncommitted working-tree baseline; 77 public HTML files.
**Purpose**: satisfy the Targeted Evidence Gate — record the exact Spec 023 backlog files and current app files opened before scoping any correction. No correction below rests on memory; every B-item cites the current file(s) it touches.

## Spec 023 backlog / register files read (all on disk, confirmed)

- `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/correction-backlog-for-024.md` — B-01…B-18 (4 Must, 7 Should, rest Later/Do-not-fix); GO-conditional for Spec 025.
- `.../missing-capabilities-register.md` — M-01…M-16 (0 P0, 6 P1, 2 P2, 1 P3, 7 excluded-by-law); severity histogram + P0 verdict.
- `.../extra-or-drift-register.md` — X-01…X-49 (0 remove; drift verdict NO); F-00-1 amended rows.
- `.../design-quality-register.md` — D-01…D-15 (ranked; D-01/D-05/D-09 empty-card pattern, D-06 dark hero, D-02 = F-00-1).
- `.../role-model-consistency-audit.md` — 9/9 PASS + confirmed F-00-1.
- `.../coverage-matrix.md` — master matrix; teacher/family/admin verdicts; excluded-denominator table.

## Current app files opened (per B-item, with exact findings)

### B-01 — child-view footer wording (`ar.prt.js` / `en.prt.js` / built pages)
- `app/src/locales/ar.prt.js:297` `noteT: 'لوحة الطالب — النسخة الأولى'`, `:298` `noteD: 'هذه لوحتك الدراسية…'` — **the F-00-1 leftover** (Student-primary framing).
- **Scope trap confirmed**: `ar.prt.js:387-388` is the FAMILY note («لوحة العائلة — النسخة الأولى») and `:446-447` is the TEACHER note («لوحة المعلم — النسخة الأولى») — both CORRECT (primary roles) and OUT of B-01 scope.
- `app/src/locales/en.prt.js:294` `noteT: 'Student dashboard — first version'` — the EN twin.
- Rendered on **6 of 7** child-view pages (`student-portal/homework/history/profile/progress/materials.html`; `student-schedule.html` carries no such note) + `.en` pairs + shipped `app/public/assets/locales/ar.prt.js:297` — grep-verified in Spec 023.
- Adjacent correct child-view keys already present: `ar.prt.js:205` heroSub «عرض الابن…», `:209` cvT «عرض الابن — معاينة», `:214` foldT «افتح عرض الابن الكامل» — the target vocabulary to align the note to.

### B-02 — Locations owner (`nav.config.js`)
- `grep -niE "location" app/src/js/nav.config.js` → **zero hits**. Locations has NO current nav/page surface; it exists only as a legacy RBAC permission group (`output/roles/admin/screenshots/management-admins-permission-6-full.png`). Confirms M-04: a pure ownership DECISION (default owner 031, settings/general slice) — no page built.

### B-03 — notifications (`enhance.js`, `topbar.js`, `portal-shell.js`)
- **Admin shell already has an honest gate**: `enhance.js:82` `notificationsMenu()` renders a bell header + a `Soon`-badged, `aria-disabled="true"`, `data-disabled-reason` "View All Notifications" item (`topbar.notifViewAll` / `topbar.notifViewAllReason`); `topbar.js:38-39` bell button wired via `data-action="notifications"` → `enhance.js:519`. **Honest, no fake count/read state.**
- **Role-portal shell has NO notifications**: `portal-shell.js:56,59` topbar carries only `theme-menu` + `lang-menu` — no bell, no notifications action. → B-03 targets the role portals (family/teacher/student), reusing the EXISTING honest pattern (no new hook) OR a futures-register entry. The admin gate must NOT be touched/duplicated.

### B-04 — teacher live-room
- `output/roles/teacher/pages/teacher-session-class-room-mq-2.md` — verified (Spec 023 R6) as a redirected copy of `/teacher/home` (incl. the salary band), NOT the real room. No live capture exists in the evidence tree → decision = future-backend record; teacher live/room actions stay honest gates. No app change beyond the recorded decision.

### B-05 — teacher library gate (`fixtures/portal.js`)
- `ROLE_NAV.teacher` (`portal.js:161-166`) = schedule · students · outcomes · tasks · reports · profile — **NO `library` item**. Confirms M-03: teacher library has no visible planned gate. `TEACHER_PREVIEW.materials` + `matUpload` (backendRequired) fixtures are retained. → B-05 = add an honest planned library presence OR record the 025 fold decision.

### B-06 — teacher chat (`fixtures/portal.js`)
- No `chat` entry anywhere in `ROLE_NAV.teacher`; chat exists only admin-side (sequenced to 026). Confirms M-02. → B-06 = record the teacher-side decision (honest «قريبًا» in 025 vs explicit exclusion); send-form UNCONFIRMED (never invent fields).

### B-07 — pay-free exemption (`teacher-portal.html`, `teacher-performance.html`, contract)
- Spec 023 X-39/X-44/M-09: `teacher-portal.html:378` → `teacher-performance.html:354` (`href="finance.html"`) + `:356-368` (الرواتب nav labels). The performance BODY is pay-free and smoke-asserted (`run.cjs:548-561`); the surrounding admin-shell nav chrome is the tension. Contract to amend: `specs/022-…/contracts/teacher-pay-free-contract.md` (+ the 016 global contract). → B-07 = written exemption + scheduled 025 repoint.

### B-08 / B-09 — exclusion + finance boundary provenance
- Excluded-by-law items already enumerated in `missing-capabilities-register.md` M-10…M-16 and `coverage-matrix.md` excluded-denominator table; the invoice-amount boundary is X-47 (`app/public/finance.html` 24 authored «ريال» literals, Spec 009-invariant; zero aggregate/math). → B-08/B-09 = consolidate these into a durable provenance record (correction docs + README/CLAUDE where apt).

### B-10 — rail moved-vs-deleted (`before-022` screenshots, 022 contracts)
- Spec 023 X-49/D-01: `app/screenshots/before-022/teacher-portal__ar__light__desktop.png` shows richer rail cards (student counts + «التحضير المقترح» prep hint) vs the current rail. Verification references present: `specs/022-…/contracts/{teacher-living-home-contract.md, impact-protection-contract.md, smoke-rescope-contract.md, visual-regression-screenshot-contract.md}`. → B-10 = verify moved-vs-deleted against those contracts; restore as real link/gate only if genuinely deleted; record the determination.

### B-11 — visual-density pass (`app.css` living layer)
- Living layer confirmed at `app/src/styles/app.css:1019+` (`.pt-idhero/.pt-rail/.pt-story/…`, single `prefers-reduced-motion` quarantine block). Design-register rows to address (scoped): D-01 empty rails, D-04 family-children static, D-05 stat-void tiles, D-06 dark-hero wash, D-07 schedule hierarchy, D-08 hub empty slot, D-09 week strip, D-10/D-11/D-12 delight, D-13 mobile topbar. D-02 = F-00-1 (handled by B-01). → B-11 = one pure-CSS pass; rows touching pinned bodies (D-04/D-05/D-09) carry hash supersession.

## Specs read

`016-full-frontend-audit-role-dashboards-ia-design-freeze/` (future-spec-sequence, teacher pay-free contract, admin-sidebar-inventory), `021-role-model-student-reclassification/` (DEC-001…009), `022-living-dashboards-experience-rework/` (spec + 16 contracts, incl. the four B-10 reference contracts), `023-full-legacy-coverage-audit/` (all six backlog/register files above). CLAUDE.md history for the standing laws.

## Evidence gaps / notes

1. **B-04 live-room** has no capture — the decision is future-backend by necessity, not choice.
2. **B-03** must not touch the working admin gate; scope is the role-portal shell only.
3. **B-06 chat send-form** was never captured — remains UNCONFIRMED; any gate is display-only.
4. Spec 023 is uncommitted (working-tree baseline); the corrections build on the working tree, not a committed SHA.

## Confirmation

The Targeted Evidence Gate is satisfied: all six Spec 023 backlog/register files and every current file each B-item touches were opened and their exact state recorded above. No correction is invented; each is grounded in a named backlog ID + current file.
