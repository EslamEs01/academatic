# Data Model — Spec 019 (build-time shapes; no DB/API/auth)

## 1. StudentPage (×6)
`{ base: 'student-<x>', activeId: <navId>, titleKey: 'prt.title.stu<X>', render: renderStudent<X> }` — registered in the build PAGES table (D4); body = compact bands (pageHead → summary → content groups → gates → note); height window [500, 2200] @1366×768 (D11).

## 2. NavFlip
Six `ROLE_NAV.student` rows: `status 'planned' → 'implemented'`. Everything else in the row FROZEN. Family (1+7) / teacher (1+6) registries byte-untouched.

## 3. QuickTile (home, status-aware — D13)
`implemented → <a class="pt-qtile" href="student-<x>(.en).html">icon+label</a>` · `planned → the existing non-anchor tile + «قريبًا» pill` (byte-pattern preserved). Student home body anchors === 6 exact sibling targets.

## 4. STUDENT_PAGES fixture group (additive, `fixtures/portal.js`)
- `homework`: `{ kpis: {pending: 2, inProgress: 1, reviewed: 2}, records: [hw1(pending)·hw2(inProgress)·hw3(pending→grouped pending)· NEW hw4(reviewed w/ noteKey)· NEW hw5(reviewed w/ noteKey)] }` — each record `{ id, titleKey(reuse data.prtStuHw*/new), courseId, dueKey(reuse prt.stu.due.*), stateId(pending|inProgress|reviewed), noteKey? }`.
- `materials`: `{ groups: [{courseId:'c1', items:[mat1,mat2,+NEW]}, {courseId:'c3', items:[mat3,+NEW]}] }` — item `{ id, titleKey, typeIcon, typeKey }`.
- `progress`: `{ signals: ['data.prtStuPgSig1','data.prtStuPgSig2'] }` (+ re-renders RETAINED `STUDENT_PREVIEW.{overallProgress, courses, attendance, achievements, celebration}`).
- `history`: `{ records: [h1(outcomeId:'out1')·h2·h3 (RETAINED refs) + NEW h4·h5 authored `{ dayKey, courseId, teacherKey, outcomeToneId, summaryKey, homeworkKey }`] }`.
- `profile`: `{ prefs: [{labelKey,icon}×3 (language/theme/contact)], gates: ['photoUpload','profileSave','passwordChange'] }` + resolves st1 (students.js) + fam1 guardian safe fields (families.js) + SUBJ maps.
- Schedule: NO new slice — `SESSIONS_FULL` (sara rows) + `SCHEDULE_WEEK` (sara-proxy day groups) + one gate line key.

**Integrity**: additive only; the RETAINED 013/018 slices/keys stay byte-identical; every figure consistent with st1's canon (9 attended · 78%/41% · streak 5 · the hw trio).

## 5. Locale additions (`prt.*` — additive, AR/EN mirrored)
`prt.title.stu{Schedule,Homework,Materials,Progress,History,Profile}` · `prt.stu.pg.{sched,hw,mat,prog,hist,prof}.*` (headers/hints/sections/gates/chips/empties) · `data.prtStuPg*` authored strings. Existing `prt.stu.*` keys reused verbatim where copy fits; zero rewording.

## 6. SharedPrimitives (`components/portal-page.js` — NEW, sanctioned by D3)
Exports `pageHead(titleKey, subKey)`, `secHead(icon, titleKey, hintKey?, extra?)`, `kpiCard(k, tone)`, `kpiRow(kpis, tone)`, `plannedCard(p)`, `gateNote(msgKey)` — byte-equal logic to the 018 home copies; consumed ONLY by the six new modules (018 homes untouched).

## 7. AnchorRegistries (post-flip, smoke-pinned — D9)
Every student page: shell multiset **17** (7 nav ×2 + hub×3), unique {6 siblings + self + portals}, navCurrent 2×self, navListAnchors 7, plannedNavAnchors 0. Body: internal pages **0** · home **6**. Family/teacher/hub/family-child registries UNCHANGED.

## 8. SmokeExpectations (the ONE amendment — D10)
63 loads · new student-internal branch (shell/active/anchors/forms/tables/hygiene + per-page pins: profile 3 amber gates + 0 forms; homework ≥5 records; materials ≥4 items; history ≥5 records) · home branch re-scope (bodyAnchors===6 exact, navListAnchors 7, multiset 17) · expPlanned +6 entries · ceiling [500,2200] on internals, homes byte-verbatim [900,2200] · 390px + tables===0 extended · **BYTE-VERBATIM: payHit, family zero-pay ×2, family/teacher/hub/family-child branches, admin asserts**.

## Validation rules
Every key resolves in both overlays; every courseId/outcomeId/teacherKey ref resolves; retained-key grep green; 49/63 identity; build-html diff = 6 imports + 6 entries + 1 amended line; no new hooks/storage/deps.
