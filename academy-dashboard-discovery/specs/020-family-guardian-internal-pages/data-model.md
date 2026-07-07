# Data Model — Spec 020 (build-time shapes; no DB/API/auth)

## 1. FamilyPage (×7)
`{ base: 'family-<x>', activeId: <navId>, titleKey: 'prt.title.fam<X>', render: renderFamily<X> }` — additive PAGES entries (7 imports + 7 entries; the 019 activeId pass-through is live, NO engine change). Body = pageHead → summary → short bands → gates → note; height window [500, 2200] @1366×768.

## 2. NavFlip
Seven `ROLE_NAV.family` rows: `status 'planned' → 'implemented'`; everything else FROZEN. Student (7 impl) / teacher (1+6) registries byte-untouched.

## 3. QuickTile (family home, status-aware — D11)
The 019 pattern applied to `family-portal.js`'s own copy: implemented → `<a class="pt-qtile" href="family-<x>(.en).html">`; home body anchors 5→**12** (5 child drill-downs UNCHANGED + 7 sibling tiles; both subsets smoke-pinned exactly).

## 4. FAMILY_PAGES fixture group (additive, `fixtures/portal.js`)
- `quota: { totalH: 40, takenH: 12, remainH: 28 }` — authored hour counts (40=12+28; takenH mirrors the retained attended=12); hours = figure-safe units, never money.
- `children: [5 rows { childId, subscriptionKey, nextOrNoteKey }]` — identity/course/teacher/progress/status resolve from EXISTING canon (students.js · SUBJ maps · kidHints · familyStatusChip).
- `billing: { invoices: [3 rows { id, serialKey, monthKey, dueKey, courseId, statusTone: 'completed'|'upcoming' }] }` — **the shape has NO amount field** (zero-pay by construction; the legacy Amount column deliberately dropped).
- `requests: { items: [4 { type: trial|meeting|feedback|cancel, statusTone, previewKeys → the RETAINED prt.fam.req.* }] }`.
- `materials: FAMILY_PREVIEW.materials re-referenced (st1/st11/st6) + 2 NEW (st12, st13)` — every child covered.
- `profile: { prefs: [3 chips], gates: ['photoUpload','profileSave','passwordChange'] }` — the legacy profile-edit write surface.
- Schedule: NO new slice (SESSIONS_FULL + FAMILY_PREVIEW.todayChildren + SCHEDULE_WEEK proxy + one gate key).

**Integrity**: additive only; retained 014/018 slices byte-identical; consistent with fam1 + st1/st6/st11/st12/st13 + the family-child panels (no contradiction with CHILD_PROFILE attendance trios).

## 5. Locale additions (additive, AR/EN mirrored)
`prt.title.fam{Children,Schedule,Progress,Billing,Requests,Materials,Profile}` · `prt.fam.pg.{kids,sched,prog,bill,req,mat,prof}.*` · `data.prtFamPg*`. Retained `prt.fam.*` keys reused verbatim. Billing keys pre-checked against the zero-pay regex (D13).

## 6. AnchorRegistries (post-flip, smoke-pinned — D10)
Every family-shell page: shell multiset **19** (8×2 + hub×3), unique = {family-portal, 7 internals, portals}; navCurrent 2×self (family-child: 2×family-portal KEPT); navListAnchors 8; plannedNavAnchors 0. Body: home 12 · children 5 · progress 5 · schedule/billing/requests/materials/profile 0 · family-child 5 hash links (BYTE-KEPT).

## 7. FamilyChildPreservation (D12)
`family-child.js` untouched; body inputs untouched → body byte-equal by construction; PROVEN by `#page-body` extraction hash pre/post + the byte-kept smoke body asserts. STOP-condition if it drifts.

## 8. SmokeExpectations (the ONE amendment — D14)
76 loads · FAMILY_INTERNAL branch (role/active/8-links/19-multiset/forms 0/tables 0/ceiling [500,2200]/verbatim payFigure regex on each/per-page pins: children 5+cards≥5 · progress 5+bars≥5 · billing plannedBackend===1 · requests gate table · materials items≥5 · profile 3 gates+0 forms) · home re-scope (12 anchors in two exact subsets · navList 8 · multiset 19) · family-child re-scope (navList 8 · multiset 19 · navCurrent+body asserts BYTE-KEPT) · expPlanned +7 · **BYTE-VERBATIM: payHit · the original zero-pay lines · the whole student branch · teacher branch · hub · admin asserts**.

## Validation rules
Every key resolves both overlays; every childId/courseId/sessionId ref resolves; billing shape amount-free; retained-key grep green; 59/77 identity; build-html diff = 14 added lines; no new hooks/storage/deps; family-child body extraction hash-equal.
