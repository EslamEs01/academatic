# Role-Model Consistency Audit — Spec 023 Full Legacy Coverage Audit 000–022

**Title**: Role-Model Consistency Audit (Spec 021 DEC-001…DEC-009 vs. the shipped app)
**Date**: 2026-07-06
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`, Specs 020/021/022
committed, 77 public HTML files (per
`agent-findings/00-main-session-grounding.md` "Baseline facts" and
`agent-findings/04-current-app-inventory.md` file inventory).
**Inputs used**:
- `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/06-family-child-student-coverage.md` (primary — §(b) role-model check)
- `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/01-legacy-routes.md` (§7 explicit role-model verification)
- `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/04-current-app-inventory.md` (hub/ROLE_NAV/smoke inventory)
- `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/00-main-session-grounding.md` (main-session screenshot grounding + confirmed finding F-00-1)
- Synthesis-time re-verification greps run by this writer against `app/src/locales/ar.prt.js`, `app/src/locales/en.prt.js`, and `app/public/*.html` (noted inline where used).

Path shorthands (each expands to an absolute path under
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/`):
`LEG` = `output/roles/family` · `PUB` = `app/public` · `SRC` = `app/src` ·
`SHOT` = `app/screenshots` · `SMOKE` = `app/tests/smoke/run.cjs` ·
`AF` = `specs/023-full-legacy-coverage-audit/agent-findings`.

Binding frame: legacy is a capability checklist, not a pixel-clone target; the corrected role
model (Spec 021 DEC-001…009) is **three logins — Admin, Teacher, Family/Guardian at `/student/*`
— with NO standalone Student role**; student pages are demoted to a family-owned child-view
preview, demoted NOT deleted.

## Verification table

| # | Claim (Spec 021 decision) | Verdict | Evidence (exact paths) |
|---|---|---|---|
| 1 | **Legacy side: Admin / Family / Teacher are the only real roles** — three logins through one `/login`, distinct credentials, three output trees | **PASS** | `AF/01-legacy-routes.md` §1 + §7: `roles.config.json` lines 3–38 defines exactly admin/teacher/family with dedicated credentials + auth-state files; every combined report header repeats "Roles with crawled output: admin, teacher, family" (`output/combined/page-inventory.md` line 5, `role-permission-matrix.md` line 5, `academy-system-map.md` line 5, `missing-coverage.md` line 5). |
| 2 | **Student is NOT a primary role (legacy)** — no fourth login, `/student/*` belongs to the Family/Guardian account | **PASS** | `AF/01-legacy-routes.md` §7: "student" appears ONLY in `roles.config.json` line 41 `supportedFutureRoles` (never credentialed, never crawled); all 13 family pages are `/student/*` routes (`output/combined/page-inventory.md` lines 349–361); `LEG/pages/student-home.md` records `Role | family`, logout action `/student/logout`, discovered from the family sidebar; `LEG/screenshots/student-home-full.png` (opened visually by Agent 01 AND the main session, `AF/00-main-session-grounding.md` obs. 2) shows the child persona «الطالبة لمار حسن» inside the guardian login. Agent 01 closes: "No evidence of a 4th role … the three-login / no-standalone-student model is confirmed with no counter-evidence." |
| 3 | **Student is NOT a primary role (current app)** — hub renders no student primary card | **PASS** | `AF/04-current-app-inventory.md` "Portals hub cards": `SRC/js/pages/portals.js` `ROLES` array (lines 17–20) has exactly 2 entries (family, teacher); `AF/06…md` §(b) item 1: `PUB/portals.html` lines 262–278 contain exactly two `.pt-hub-card` role cards (`data-role="family"`, `data-role="teacher"`), admin console section lines 280–289, NO student role card. Visual: `SHOT/portals__ar__light__desktop.png` opened by three independent readers (Agents 00, 04, 06). |
| 4 | **Student pages preserved as child-view — demoted, NOT deleted; six internals byte-preserved** | **PASS** | Existence: `AF/04-current-app-inventory.md` — all 14 `student-*.html` files present in `PUB/` (7 base names × 2 languages); `AF/06…md` §(b) item 4. Byte-preservation: Spec 022's law that the six student internal modules got ZERO touches and their `#page-body` stayed BYTE-EQUAL, proven by **12 extraction-hash proofs** — re-verified by Agent 06 against `specs/022-living-dashboards-experience-rework/spec.md` (listed in its "Prior art re-verified" evidence) and restated in `AF/00-main-session-grounding.md` F-00-1 ("the six student internal modules' `#page-body` were byte-preserved BY LAW (12 extraction-hash proofs)"); `AF/06…md` A2 rows for `student-schedule` etc.: "Body byte-equal preserved by 022 law (zero touches)." Nothing was deleted: displaced keys retained (e.g. `SRC/locales/ar.prt.js:172` `hub.student` kept but unrendered — `AF/00…md` "Related but NOT a leak"). |
| 5 | **Hub copy matches the decision — 2 primary cards + admin console + demoted «عرض الابن» preview** | **PASS** | Main-session screenshot proof: `AF/00-main-session-grounding.md` obs. 4 — `SHOT/portals__ar__light__desktop.png` shows exactly 2 primary role cards (ولي أمر «بوابة العائلة» / معلّم «بوابة المعلم»), the admin console row («لوحة تحكم الأكاديمية»), and the demoted preview row («عرض الابن — معاينة», «الوصول إلى الأبناء يُدار عبر حساب العائلة»). Source copy: `AF/06…md` §(b) item 2 — `PUB/portals.html` line 295 «عرض الابن — معاينة» + line 296 full explanation → `student-portal.html`. Machine-pinned: `SMOKE` lines 1099–1106 assert `hubRoleTargets === ['family-portal','teacher-portal']`, `hubAdminLink === 1`, `childViewLinks === 1` (`AF/06…md` item 3; `AF/04…md` hub section). |
| 6 | **ROLE_NAV.student remains functional but secondary** — structurally untouched, all links real, reachable only through family-owned entry points | **PASS** | `AF/04-current-app-inventory.md` ROLE_NAV section: `SRC/js/fixtures/portal.js` lines 139 ff. — `ROLE_NAV.student` = 7 items, ALL `status:'implemented'` targeting the 7 real `student-*.html` pages (zero deletion); `AF/06…md` §(b) item 4: functional but secondary — reachable only via the hub preview card + the family-child fold link, never as a primary hub role. Shell reframing confined to the locale layer: `SRC/locales/ar.prt.js` lines 92–94 (`title.student`/`portal.student` = «عرض الابن», `role.student` = «ابن العائلة») per `AF/04…md` and `AF/06…md` item 5; confirmed visually in `SHOT/student-portal__ar__light__desktop.png` (topbar «عرض الابن», chip «ابن العائلة» — `AF/00…md` obs. 8). |
| 7 | **Family owns the child journey** | **PASS** | `AF/06-family-child-student-coverage.md` §(b) item 7: the journey is clickable end-to-end — `PUB/family-portal.html` (lines 345–401) 5× `family-child.html#child=stX` drill-downs → `PUB/family-child.html` fold link → `student-portal.html` → `ROLE_NAV.student` internals; hub preview copy itself names the family journey (`PUB/portals.html` line 296). `ROLE_NAV.family` = 8 items, all implemented (`SRC/js/fixtures/portal.js`, `AF/04…md`). The fam1 roster `CHILD_ORDER = ['st1','st6','st11','st12','st13']` drives `family-child`'s baked panels (`SRC/js/fixtures/portal.js` lines 245–255, `AF/04…md`). |
| 8 | **family-child is THE fold point — 6 body anchors incl. «افتح عرض الابن الكامل»** | **PASS** | `AF/06…md` §(b) item 6: `PUB/family-child.html` `#page-body` anchors extracted = exactly 6 → `['student-portal.html','#child=st1','#child=st6','#child=st11','#child=st12','#child=st13']`; line 284 carries the sanctioned label «افتح عرض الابن الكامل» (`SRC/locales/ar.prt.js` line 214 `foldT`; `SRC/locales/en.prt.js` line 211 `foldT: 'Open the full child view'`); EN pair `PUB/family-child.en.html` line 280 → `student-portal.en.html`. Smoke pin: `SMOKE` line 1085 (`bodyAnchors === 6`). Companion fact: `PUB/family-children.html` body anchors = exactly 5 drill-downs with ZERO `student-portal` references — per-child fold links were REJECTED as dishonest (preview persona is st1/سلمان only); this is a **documented intentional deviation** from the 022 spec first draft, not a gap (`AF/06…md` risk 3). |
| 9 | **No page contradicts the model** | **PASS with one CONFIRMED copy-level contradiction (F-00-1, below)** | Grep over `PUB/*.html` for «بوابة الطالب|Student Portal» = zero hits (`AF/06…md` §(b) items 5+8; independently re-run by this synthesis writer at write time — zero hits confirmed). No current family/child page is wrong-role-classified (`AF/06…md` coverage roll-up: "No current family/child page is wrong-role-classified"). The one surviving contradiction is copy-level only — see the contradictions section. Regression-proof: any reintroduction of a student primary card or pay token now fails smoke (`SMOKE` lines 1013–1014, 1066–1067, 1085, 1090–1091, 1099–1106, 1110–1112 — `AF/06…md` risk 7). |

## Contradictions found

### F-00-1 — CONFIRMED: leftover «لوحة الطالب — النسخة الأولى» noteT/noteD wording on 6 of 7 child-view pages (copy-level; model intact) → route to 024

- **Status**: CONFIRMED by the main session with exact file:line evidence
  (`AF/00-main-session-grounding.md`, finding F-00-1), independently corroborated by Agent 06
  (`AF/06-family-child-student-coverage.md` §(b) item 8 residue + risk 1), and **re-verified by
  this synthesis writer at write time** (greps below reproduced).
- **What it is**: the bottom note on the child-view internals still reads
  «لوحة الطالب — النسخة الأولى» with a description addressing the reader as the dashboard owner
  («هذه لوحتك الدراسية…») — pre-Spec-021 Student-primary framing inside the demoted child-view.
- **Exact evidence**:
  - `app/src/locales/ar.prt.js:297` (`noteT: 'لوحة الطالب — النسخة الأولى'`) and `:298` (`noteD`) — re-verified.
  - `app/src/locales/en.prt.js:294` (`noteT: 'Student dashboard — first version'`) — re-verified.
  - Shipped locale copy: `app/public/assets/locales/ar.prt.js:297`.
  - Rendered in built HTML on **6 of 7** child-view pages: `app/public/student-portal.html:393`,
    `student-homework.html:397`, `student-history.html:344`, `student-profile.html:361`,
    `student-progress.html:409`, `student-materials.html:341` (+ their `.en` pairs).
    `student-schedule.html` carries no such note — the 6-of-7 count re-verified by this writer.
- **Why the model is NOT broken**: the shell/topbar framing («عرض الابن» / «ابن العائلة») dominates
  every child-view surface and is correct (`SHOT/student-portal__ar__light__desktop.png`,
  `AF/00…md` obs. 8); the note sits inside `#page-body` on the internals, which Spec 022 was
  **required by law to byte-preserve** (12 extraction-hash proofs) — so this is a *knowing
  leftover* of the sanctioned zero-touch contract, not a role-model violation by any spec.
- **Disposition**: copy-level contradiction, **routed to Spec 024 (Must fix)** — reframe
  `noteT`/`noteD` (ar+en) to child-view/family-owned wording, rebake the affected pages, declare
  supersession of the pinned `#page-body` extraction hashes for the five hash-pinned internals
  (same mechanism 022 used for the family-child body hash), and re-pin any smoke assertions that
  reference them — ONE sanctioned amendment. Acceptance criterion (grep-checkable): no
  primary-role «لوحة الطالب» wording remains on any child-view surface.

### Non-contradictions explicitly cleared (documented so 024/032 do not "fix" them)

1. **`ar.prt.js:172` `hub.student: { t: 'بوابة الطالب', … }`** — retained displaced key under the
   zero-deletion law; grep proves «بوابة الطالب» renders in **no built HTML** (hub renders the
   childView preview keys instead). Classification: keep/retained, optional relabel note in the
   drift register, NOT a contradiction and NOT a 024 blocker (`AF/00-main-session-grounding.md`
   "Related but NOT a leak").
2. **`family-children` carries no fold-point link** (5 drill-down anchors, zero `student-portal`
   references) — an intentional, honesty-driven implementation deviation from the 022 spec first
   draft (preview persona is st1 only; per-child child-view links would be dishonest). Must be
   treated as INTENTIONAL by 024/032; revisit only if real per-child credentials ship
   (`AF/06-family-child-student-coverage.md` §(b) item 6 + risk 3).
3. **`supportedFutureRoles` includes "student" in `roles.config.json` line 41** — a crawler-side
   placeholder never credentialed or crawled; it is evidence FOR the three-login model, not
   against it (`AF/01-legacy-routes.md` §7).

## Conflict resolution note

No conflicts between findings required adjudication: Agents 00 and 06 independently report the
same 6-of-7 note residue with matching file:line numbers, and Agents 01/04/06 agree on the hub
shape, ROLE_NAV registries, and smoke pins. As belt-and-braces this writer re-ran the three
load-bearing greps (noteT lines in `ar.prt.js`/`en.prt.js`, the 6-file «النسخة الأولى» set, and
the zero-hit «بوابة الطالب» scan over `app/public/*.html`) and all three reproduced exactly.

## Overall verdict

**The corrected role model (Spec 021 DEC-001…DEC-009) is consistently implemented and
machine-guarded across the legacy evidence, the hub, the shells, the nav registries, the locales,
and the smoke pins — 9/9 claims PASS — with exactly ONE confirmed copy-level contradiction
(F-00-1, the leftover «لوحة الطالب — النسخة الأولى» note on 6 of 7 child-view pages), which does
not break the model itself and is routed to Spec 024 as a Must-fix with a declared
hash-supersession plan.**
