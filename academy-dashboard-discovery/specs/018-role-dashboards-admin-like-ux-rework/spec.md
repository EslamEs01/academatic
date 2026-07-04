# Feature Specification: Role Dashboards Admin-Like UX Rework

**Feature Branch**: `feature/012-role-portal-foundation` (watcher-owned)
**Created**: 2026-07-04
**Status**: Draft (spec only — no plan, no tasks, no implementation)
**Input**: User description: "Role Dashboards Admin-Like UX Rework — the current role homes are too long, too portal-like, and confusing; rework them into compact admin-like dashboards (short home, KPI cards, clear drill-down), give the family dashboard a real child-profile drill-down, and shift the future sequence to 028."

**The user's verdict is BINDING and this spec does not argue with it**: the role dashboards must follow the admin dashboard idea/design — short overview homes, clear structure, details behind drill-downs — not the long portal-page style.

## Grounding (verified this session, not memory)

- **Git**: HEAD `0edafe1` — **Spec 017 IS committed**; tree clean; 49 built pages; all three role homes exist inside Shell v2.
- **The problem, measured**: current full-page desktop captures — student home ≈ **5,400px** tall (13 stacked sections) · family ≈ similar (12 sections) · teacher ≈ **6,600px** (14 sections) — versus the admin dashboard reference at ≈ **3,800px** with far more data. The role homes read as long portals, not dashboards. Confirmed by direct visual comparison of `dashboard__ar__light__desktop.png` vs the three role frames (all re-captured this session).
- **The admin reference anatomy** (from `dashboard.js` + the frame): compact welcome band with inline day-stats → **`kpiRow`** (4 stat cards) → today's-sessions module (table + filters) → up-next strip → families follow-up band (chips + view-all link) → status tiles → reports card grid — every band short, every band with a `sectionHeader` and, where deeper content exists, a **view-all drill-down link**. This is the rhythm the role homes adopt.
- **Legacy evidence** (frames inspected this session): the legacy role apps were also SHORT dashboard homes behind sidebars — teacher home = hours strip + today table; guardian home = hours gauge + today band + teachers panel. The long-portal style was OUR deviation, not legacy's; this rework returns to the dashboard idea with our quality.
- **Spec 016/017 law**: design freeze + honesty contract + teacher pay-free-global + Shell v2 (role sidebar/registries/drawer) all stand; this spec restructures HOME CONTENT inside the existing shell — the shell itself is untouched.

## The core UX decision (binding)

**Role home pages become compact admin-like dashboards.** Each home = exactly these bands, in this order, and nothing else:

1. **Compact header band** — greeting + one-line "now" status (replaces the tall hero; no date, no notification count).
2. **KPI row** — 4 compact stat cards (authored fixture figures, role-appropriate, admin `kpiRow` rhythm with portal styling).
3. **Now band** — today's items (compact list) + the next-session/next-class card, side by side on desktop.
4. **Role-core band** — the one thing this role checks daily (student: homework snapshot · family: **children cards with real "فتح ملف الابن" drill-down links** · teacher: follow-up board).
5. **Preview band** — ONE compact secondary preview (student: week-at-a-glance + history teaser · family: billing STATUS chip + requests teaser · teacher: outcome-workflow summary card + the sanctioned performance link).
6. **Quick-links band** — tiles mirroring the role nav destinations (planned tiles = the honest non-anchor treatment until 019–021 ship pages).
7. The small closing note (existing pattern, one line).

**Hard ceilings (machine-asserted)**: ≤ **7** sections per role home · full-page height at 1366×768 ≤ **~2,400px** (a scrollHeight ceiling in smoke — roughly 1.5–2 screens, per the user's target). **Nothing is deleted from the product**: every displaced section is mapped (see the displacement table) to the family-child page, a future internal page (019–021), or a labeled gate.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student sees a compact dashboard (Priority: P1)

A student lands on a short, admin-like dashboard: header + 4 KPIs + today/next + homework snapshot + week/history preview + quick links — usable in ~1.5 screens, not an endless scroll.

**Independent Test**: student home renders ≤7 sections; scrollHeight ≤ the ceiling at 1366×768; every pre-rework capability appears in the displacement map.

**Acceptance Scenarios**:
1. **Given** the built student page, **Then** the band order above renders exactly, all 4 KPI figures are authored fixture literals, and the smoke ceiling asserts pass in both languages.

---

### User Story 2 - Student knows what's next and where details live (Priority: P1)

The now-band answers "next session?"; the KPI row answers "how am I doing?"; quick-link tiles point at Schedule/Homework/Materials/Progress/History/Profile (planned states until Spec 019).

**Independent Test**: next-session card present with honest live note; 6 quick-link tiles render with the planned treatment; zero fake links.

---

### User Story 3 - Guardian sees a compact family dashboard (Priority: P1)

Header + family KPIs (children · attended · upcoming · follow-ups) + today-across-children + children cards + billing-status/requests preview + quick links — short and calm.

**Independent Test**: ≤7 sections; ceiling passes; billing band is STATUS-ONLY (the zero-pay regex stays green).

---

### User Story 4 - Guardian opens each child's file (Priority: P1) — THE MANDATORY DRILL-DOWN

Every child card carries a real **«فتح ملف الابن» link** that opens the child's profile view, where the guardian sees THAT child completely: name/course/group/teacher · today-next session · attendance & progress summary · latest teacher note · homework/materials summary · history + profile gates.

**Decision (Option A, single shell page)**: ONE new page pair — **`family-child.html` / `.en.html`** — with **all five fam1 children baked as switchable panels** (the existing baked-tabpanel + hash mechanism from the admin profiles; default child st1; `#child=stX` deep-links). The home cards link to `family-child.html#child=stX` — real navigation, zero dead buttons, zero per-child page explosion, Django-ready as `family/child/<id>`.

**Independent Test**: 5 real links from the family home (smoke pins bodyAnchors === 5, all matching `family-child(.en).html#child=st*`); the child page renders 5 panels with the full per-child slice; switching children works via the existing tab hooks; zero-pay regex green on the new page too.

---

### User Story 5 - Teacher gets a compact cockpit (Priority: P1)

Header + 4 KPIs (today's classes · follow-ups · open tasks · roster) + today/next + follow-up board + workflow-summary/performance preview + quick links. The teacher stops getting lost: one screen answers the day.

**Independent Test**: ≤7 sections; ceiling passes; the performance link remains the ONLY teacher body anchor (exact target, byte-verbatim payHit green).

---

### User Story 6 - Teacher sees today/follow-ups/outcomes/reports fast (Priority: P1)

The KPI row + now-band + follow-up board answer the four questions in the first screen; outcomes/reports live behind quick links + the workflow summary gate.

---

### User Story 7 - Role dashboards feel like the admin idea (Priority: P1)

Band rhythm, compact stat cards, section headers with drill-down affordances, workspace density — visibly the same dashboard DNA as `dashboard.html`, with role accents (sky/violet/teal) and zero admin chrome (two-shell law stands).

**Independent Test**: screenshot review against the admin reference; no admin classes in role pages (standing assert).

---

### User Story 8 - Homes are shorter and easier (Priority: P1)

**Independent Test**: the scrollHeight ceiling + section window (4–7) asserted in smoke for all three homes, both languages; before/after heights recorded in REVIEW.md.

---

### User Story 9 - Every displaced capability is mapped (Priority: P1)

**Independent Test**: the displacement table in this spec covers 100% of the current 13/12/14 home sections; each row lands in {kept-compact, family-child, spec-019, spec-020, spec-021, gate}; fixtures/locales for displaced content are RETAINED (not deleted) for their future pages.

---

### User Story 10 - No fake actions introduced (Priority: P1)

All quick-link tiles and gates use the four honest classes; child links are real; zero `href="#"`; zero dead links.

---

### User Story 11 - Teacher pay-free enforced (Priority: P1)

The rework touches teacher copy/structure — the extended-set three-layer audit re-runs; payHit byte-verbatim; zero pay vocabulary in any new KPI/quick-link label.

---

### User Story 12 - Admin unchanged (Priority: P1)

**Independent Test**: 40 admin files + index hash-identical (target **41/51** after the new pair: 51 built files = 49 + the family-child pair; only the four portal pairs + the new pair differ).

---

### User Story 13 - Mobile 390px clean (Priority: P1)

KPI rows wrap 2×2; bands stack; the child page panels stack; probe green everywhere including `family-child`.

---

### User Story 14 - Arabic/English equivalence (Priority: P2)

All new keys mirrored; RTL/LTR; localized digits on KPI figures (`num()`).

---

### Edge Cases

- **Child-switcher honesty**: the five panels are BAKED (no runtime construction); the switcher reuses the existing tab hooks; deep-links via hash; default panel visible without JS.
- **family-child shell state**: uses the family Shell v2; its sidebar active state = home stays the only nav anchor (the child page is reached from home, not nav); its shell-anchor registry = {family-portal home ×2, hub ×3} — smoke-pinned; its own body anchors = 0.
- **Displaced-but-not-yet-paged content** (achievements, celebration, full timetable, rubric, requests hub details…): fixtures and locale keys STAY; only home rendering compresses; their full renders return in 019–021 exactly as inventoried in 016.
- **Smoke branch re-scope**: the 013/014/015 home-branch asserts (sections ≥10, gauges, avatars, planned tones ON THE HOMES) were written for the long homes — this spec's ONE sanctioned amendment re-scopes the three role-home branches to the compact contract (section window 4–7, ceiling, KPI floor, family bodyAnchors===5, teacher anchor===1 unchanged, zero-pay regexes BYTE-VERBATIM, payHit BYTE-VERBATIM) and adds the family-child branch (50 loads).
- **Gates relocation**: PORTAL_PLANNED mini-cards move with their content to future pages; homes keep at most the workflow-summary gate (teacher) and billing gate (family) as inline compact treatments — exact placement decided at plan time, counts re-pinned in the same amendment.

## Requirements *(mandatory)*

- **FR-001 (compact recipe)**: each role home MUST render exactly the 7-band recipe above; ≤7 sections; scrollHeight ceiling asserted.
- **FR-002 (KPI rows)**: 4 authored stat cards per role (student: attended sessions · overall progress · open homework · day-streak; family: children · attended · upcoming · follow-ups; teacher: today's classes · follow-ups · open tasks · roster size) — `num()` digits, labeled, no computed values, **no money-adjacent figure anywhere**.
- **FR-003 (now band)**: compact today list (≤3 rows per role) + the next card with the honest live note.
- **FR-004 (children drill-down)**: family home children cards each carry the real `family-child(.en).html#child=stX` link; the NEW page bakes 5 full per-child panels (the per-child slice listed in US4) with the existing tab/hash machinery; zero-pay on both pages.
- **FR-005 (quick links)**: one tile per role-nav destination; implemented→link, planned→honest button tile; consistent with the 017 registries (which stay untouched except none→no change).
- **FR-006 (displacement integrity)**: the displacement table is exhaustive; no capability deleted; fixtures/locales retained.
- **FR-007 (shell untouched)**: Shell v2, ROLE_NAV, and the 017 shell asserts stay as-is (the new page joins the shell as a family-role page).
- **FR-008 (honesty)**: four classes only; zero `href="#"`/dead/fake; billing status-only.
- **FR-009 (teacher pay-free)**: extended-set three layers over the reworked teacher surfaces; payHit byte-verbatim.
- **FR-010 (bilingual/RTL/theme/a11y/mobile)**: mirrored keys; axe 0/0; 390px probe incl. the new page.
- **FR-011 (admin identity)**: 41/51 hash-identical (40 admin + index); changed = 3 role pairs + hub pair untouched-or-changed? — hub NOT touched by this spec → changed = the three role pairs + the NEW family-child pair (**43/51 identical**; exact number pinned at plan time and reported honestly).
- **FR-012 (tests/screens)**: ONE sanctioned smoke amendment (re-scope + new branch + ceilings); captures re-run + new family-child frames + before/after height record in REVIEW.md.
- **FR-013 (sequence shift)**: the roadmap renumbers — 019 Student pages · 020 Family pages · 021 Teacher pages · 022–027 admin groups (formerly 021–026) · **028 Final QA** (formerly 027); recorded as a user-directed amendment appended to the 016 sequence artifact at implement time (append-only).
- **FR-014 (docs)**: CLAUDE.md pointer, README Django note for `family-child`, coverage-matrix delivery annotation.

### The displacement map (binding; 100% of current home sections)

| Current section | Student home | Family home | Teacher home |
|---|---|---|---|
| Hero | → compact header band | → compact header band | → compact header band |
| Today/next | → now band (compact) | → now band (child-tagged, ≤3) | → now band (compact) |
| Week agenda / timetable | → week-glance chips in preview band; FULL → **019** `student-schedule` | full → **020** `family-schedule` | day-groups → **021** `teacher-schedule` |
| Courses / progress gauge / trio | → KPI row + FULL → **019** `student-progress` | trio → KPI row; per-child → **family-child** | counts → KPI row |
| Homework / tasks | snapshot (top-2) in core band; FULL → **019** | per-child summary → **family-child** | snapshot count → KPI; FULL → **021** `teacher-tasks` |
| Materials | quick-link tile; FULL → **019** | quick-link tile; per-child → **family-child**; FULL → **020** | quick-link tile; FULL → **021** |
| Achievements / celebration | → **019** `student-progress` (fixtures retained) | — | — |
| History / recent sessions | 1-card teaser in preview band; FULL → **019** `student-history` | per-child → **family-child**; FULL → **020** | teaser via workflow summary; FULL → **021** `teacher-outcomes` |
| Children overview | — | core band cards + **family-child** panels | — |
| Signals / follow-up board | — | → **family-child** per-child + KPI count | KEPT (core band) |
| Teacher notes | — | latest per-child → **family-child** | — |
| Subscriptions / billing | — | STATUS chip band (kept compact) + gate; FULL → **020**/025-admin | — |
| Requests hub | — | teaser + FULL → **020** `family-requests` | cert/cancel notes → **021** `teacher-reports` |
| Outcome workflow 5-step | — | — | summary card + gate (kept compact); FULL → **021** `teacher-outcomes` |
| Rubric / reports / performance link | — | — | perf link KEPT (sanctioned anchor); rubric → **021** `teacher-reports` |
| Account/profile slice | quick-link tile → **019** | quick-link tile → **020** (guardian) + per-child basics → family-child | quick-link tile → **021** |
| Closing note | kept (1 line) | kept | kept |

## Success Criteria *(mandatory)*

- **SC-001**: All three homes: sections between 4 and 7 AND scrollHeight ≤ the ceiling at 1366×768 — smoke-asserted both languages.
- **SC-002**: Family home carries exactly **5 real child links** (pinned targets); `family-child` renders 5 baked panels each showing the full per-child slice; switching works; zero dead buttons.
- **SC-003**: Every current home capability resolves in the displacement map; fixtures/locales for displaced content remain in the repo.
- **SC-004**: Admin identity proven (40 admin + index untouched; the exact changed-pair list reported); Shell v2 asserts stay green unchanged.
- **SC-005**: payHit + family zero-pay regex BYTE-VERBATIM and green (zero-pay also run against `family-child`); extended pay greps zero across teacher surfaces.
- **SC-006**: Zero `href="#"`/dead links/raw keys; axe 0/0; 390px probe green on 5 role-family pages (3 homes + family-child ×2 langs in the loads count).
- **SC-007**: Before/after page heights recorded; the after heights meet the target; screenshot verdicts PASS against the admin-reference rhythm.
- **SC-008**: The renumbered sequence (019–028) recorded; Specs 019–021 inherit ready-made homes + drill-down patterns.

## Scope

**Allowed (implementation, at plan time)**: the three role page modules (home rework) · NEW `family-child` page module + registration in the build page list · `fixtures/portal.js` (compact-home KPI/preview slices + child-profile slices; ROLE_NAV untouched) · `ar/en.prt.js` (new keys; displaced keys retained) · `app.css` (compact bands, KPI cards portal variant, child-switcher styling — additive) · `tests/smoke/run.cjs` (the ONE re-scope amendment + new branch) · a11y/capture additive · REVIEW/README/CLAUDE/016-sequence-amendment + 016-matrix annotation (append-only) · built: 3 role pairs + the new family-child pair.

**Forbidden**: portal-shell.js structural changes beyond registering the new page's shell params · ROLE_NAV changes · hub changes · all admin files · enhance.js/build-html.mjs core (page REGISTRATION uses the existing pages table — if the table lives in build-html.mjs, the registration line is the ONE sanctioned touch, called out explicitly at plan time) · nav.config.js · package.json · engines/API/CDN/TS/auth · long landing pages (the ceiling forbids regression) · teacher pay vocabulary · commit/push.

## Assumptions

- The 1366×768 ceiling constant (~2,400px) is calibrated at plan time against the actual compact build and recorded; the principle (1–2 screens) is binding, the constant is tunable within it.
- `family-child.html` joins PAGES/smoke/a11y/capture lists (50 smoke loads, 51 built files).
- The 017 sanctioned-anchor registries extend: family home {self×2, hub×3} + 5 child links in body; family-child {home×2, hub×3} shell + 0 body.
- Hub pair untouched (its copy already says "dashboards").
- The 016 sequence contract's no-reorder rule is amended by explicit user direction (this brief) — insertion + renumber, recorded append-only.
