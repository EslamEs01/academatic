# Data Model — Spec 018 (build-time shapes; no DB/API/auth)

## 1. CompactHome (per role, the 7-band recipe)
`{ role, bands: [header, kpiRow[4], now{todayMax3, next}, core, preview, quickLinks[nav-count-1..], note] }` — sections window 4–7; ceiling 2,200px @1366×768 (D1). **Integrity**: every pre-018 home section resolves in the displacement map; displaced fixtures/locales retained (D11).

## 2. KpiCard (`.pt-kpi`)
`{ icon, valueSource: fixture-literal, labelKey }` rendered with `num()`; role sets — student: attended(9)·overall %(78)·open homework(3)·streak(5); family: children(5)·attended(12)·upcoming(3)·followUps(1); teacher: today classes(2)·followUps(2)·open tasks(3)·roster(4). **Zero computed, zero money-adjacent figures.**

## 3. ChildProfilePanel (×5, baked; `family-child` page)
Children = the REAL fam1 roster **st1 · st6 · st11 · st12 · st13** (brief's st2–st5 corrected, D5). Panel = `{ childId, header(avatar/name/level/lifecycleChip), courseGroupTeacher line, todayNext (real ref or truthful none), attendanceMini (authored trio), progress (authored fixture literal), latestNote (real FAMILY_PREVIEW note or authored), homeworkSummaryKey, materialsSummaryKey, historyGate, profileGate }` — display-only; zero forms; zero money-like fields; gates = the frozen availability vocabulary.

## 4. ChildSwitcher
Baked trigger row (5 items, existing `data-tab` hooks) + 5 baked `[data-tabpanel]`s; default visible **st1** (no-JS safe); deep links `#child=stX` (existing hash machinery). No new hooks, no storage.

## 5. NEW fixture slices (`fixtures/portal.js` — additive; ROLE_NAV/PREVIEWS untouched)
`COMPACT_HOME = { student:{kpis, weekGlanceKeys, historyTeaserRef}, family:{kpis, requestsTeaserKey}, teacher:{kpis, workflowSummaryKey} }` + `CHILD_PROFILE = { st1:{...}, st6:{...}, st11:{...}, st12:{...}, st13:{...} }` (per-panel authored bits; real outcome/note refs where they exist).

## 6. Locale additions (`prt.*` — additive; displaced keys RETAINED)
`prt.kpi.{stu,fam,tch}.*` labels · `prt.band.*` (band titles/hints, quick-links title) · `prt.child.*` (page title/switcher aria/panel labels/summary lines) · `prt.title.familyChild` (declared shared-map addition) · `data.prtChild*` authored strings. AR/EN mirrored; teacher keys pass the extended pay set.

## 7. AnchorRegistries (post-rework, smoke-pinned)
Family HOME body === 5 links matching `family-child(\.en)?\.html#child=(st1|st6|st11|st12|st13)`, each once; student home body 0; teacher home body 1 (exact perf target). `family-child`: shell unique {family-portal, portals} multiset 5, navCurrent 2×family-portal, body 0. Homes' shell registries unchanged from 017.

## 8. SmokeExpectations (the ONE amendment, D7)
Per-branch replacement table + the new family-child branch + 50 loads + the 1366×768 ceiling/floor probe + tables/390 extended to family-child; BYTE-VERBATIM: payHit, family zero-pay regex, Shell-v2 asserts, admin/hub asserts.

## Validation rules
Every key resolves both overlays; every childId/outcomeId/sessionId ref resolves; ceiling/floor/window asserted; displaced-key retention grep green; 43/51 identity; the 2-line build-html touch is the only infra diff.
