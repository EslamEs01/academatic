# Feature Specification: Family / Guardian Internal Pages (Spec 020)

**Feature Branch**: `feature/012-role-portal-foundation` (single working branch, watcher-owned — the established pattern)
**Created**: 2026-07-04
**Status**: Draft (spec only — no plan/tasks/implementation yet)
**Input**: User description: "Family / Guardian Internal Pages — turn the seven Spec-017 family planned navigation entries into real, compact, admin-like internal pages inside Shell v2, completing the Family Dashboard App while preserving the family-child drill-down."

**Binding law inherited**: Spec 016 (IA, freeze, honesty, coverage, teacher pay-free GLOBAL) · Spec 017 (Shell v2 + ROLE_NAV) · Spec 018 (compact recipe, ceilings, the family-child drill-down, THE ZERO-PAY HARD LINE) · Spec 019 (the internal-pages delivery pattern: registry flip + own activeId + status-aware home quick-tiles + `portal-page.js` primitives). **Visual grounding gate: COMPLETE at 100%** — see [`visual-grounding.md`](visual-grounding.md): all **27/27** family frames personally viewed (16 opened for this spec, incl. every interaction shot), inventories greped, gaps recorded honestly.

## The one-paragraph verdict

The family app today is a compact home + the family-child drill-down + seven «قريبًا» buttons. Spec 020 builds the seven destinations — `family-children` · `family-schedule` · `family-progress` · `family-billing` · `family-requests` · `family-materials` · `family-profile` (AR+EN pairs, 14 new files, 63 → **77** built) — each a COMPACT admin-like page rebuilt from the fully-inspected legacy guardian app (subscriptions list · child-tagged today/week · per-child history · hour-quota billing minus the Amount column · trial/meeting/feedback requests · category library minus the hero · the profile-edit write surface as gates), flips the seven `ROLE_NAV.family` statuses, makes the family home's quick-tiles status-aware (the proven 019 honesty fix), keeps `family-child` as the one drill-down surface fed by real links, and leaves student/teacher/admin byte-untouched with the zero-pay and pay-free laws green.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Children at a glance, one click to each file (Priority: P1)

A guardian (fam1's أبو سلمان) opens «الأبناء» and sees all five children as cards — course/group/teacher, status/subscription chips, an attendance/progress snapshot, the latest note line — each with a real «فتح ملف الابن» link.

**Why this priority**: the children list is the guardian's directory (the legacy "All Account Subscriptions" ancestor) and the primary feeder of the family-child drill-down.

**Independent Test**: open `family-children(.en).html` → a summary band + five child cards over the REAL fam1 roster (st1/st6/st11/st12/st13), each carrying exactly one `family-child(.en).html#child=stX` link; labeled chips; truthful empty pattern available; active nav = «الأبناء».

**Acceptance Scenarios**:

1. **Given** the children page, **Then** every legacy subscriptions-row capability resolves on the card (status→lifecycle chip, teacher/course/subscription→labels/chips, History/Feedback-About→the drill-down link + note line) and each child links to its exact panel once.
2. **Given** the page body, **Then** its anchors are EXACTLY the five child drill-down links — no other body anchor, no dead link.

### User Story 2 — The family week, child-tagged (Priority: P1)

A guardian opens «الجدول» and understands today across all children and the week ahead, every session tagged with the child's name.

**Independent Test**: `family-schedule(.en).html` → today band (child-tagged session cards ≤ the authored set + the next card) → day-grouped week agenda with child tags → truthful rest-day empties → ONE live/join backendRequired gate; zero tables; active nav = «الجدول».

**Acceptance Scenarios**:

1. **Given** the schedule page, **Then** today's sessions render the authored fam1 mapping (s2→st1 · s3→st11 · s5→st6) with child names visible, statuses labeled, and the week grouped by day (never an hour×day grid).

### User Story 3 — Per-child progress without charts (Priority: P1)

A guardian opens «التقدم» and understands each child's progress, attendance, and the teachers' signals — with a real shortcut into each child's file.

**Independent Test**: `family-progress(.en).html` → family summary band → five per-child cards (authored progress bar + attendance mini + hint/signal line) each linking to `family-child(.en).html#child=stX` → teacher notes band (the RETAINED 014 notes re-homed) → truthful empty; zero charts/rank/comparison; active nav = «التقدم».

### User Story 4 — Billing status a guardian can trust (Priority: P1)

A guardian opens «الفواتير» and understands the account's standing — hour quota, per-child subscription status, invoice STATUS rows — with zero money figures and honest gates for anything financial.

**Independent Test**: `family-billing(.en).html` → hour-quota tiles (authored hour counts — the legacy Total/Remaining/Taken idea) → the settled-status chip + reassurance (the RETAINED 014 billing register) → per-child subscription chips → invoice STATUS rows (serial/month/due-label/course/status — NO amount column, NO currency token) → backendRequired finance gates + the admin-finance note. The Spec-014 zero-pay regex passes on the page body; active nav = «الفواتير».

**Acceptance Scenarios**:

1. **Given** the billing page body, **Then** the zero-pay token regex (currency/amount/pay-action, AR+EN) finds ZERO hits, and no control simulates payment/receipt/upload.

### User Story 5 — Requests without fake submits (Priority: P2)

A guardian opens «الطلبات» and sees the request world — trial (new/existing child), follow-up meetings, teacher feedback, cancel/reschedule — as status-chipped preview cards with honest create/submit gates.

**Independent Test**: `family-requests(.en).html` → summary band → type-grouped request cards (the RETAINED `prt.fam.req.*` register re-homed: trial two-path tiles, meeting empty-state, feedback question lines, cancel/reschedule options + caution) each closed by a labeled backendRequired gate → truthful empties; zero forms; active nav = «الطلبات».

### User Story 6 — Materials by child, no hero (Priority: P2)

A guardian opens «المواد» and finds the children's learning files grouped by child with course/type chips and an honest download gate.

**Independent Test**: `family-materials(.en).html` → per-child groups (the RETAINED 014 materials slice re-homed + extended so every child with a real course has ≥1 item or a truthful empty) → type chips → the matDownload backendRequired gate; NO marketing hero; active nav = «المواد».

### User Story 7 — The family account, honestly editable (Priority: P2)

A guardian opens «الملف» and sees guardian identity, family/account details, a children summary, preferences — and exactly the legacy-evidenced write surface as gates (photo upload · profile save · password change).

**Independent Test**: `family-profile(.en).html` → guardian identity card → account rows (email/city/joined/children count — the RETAINED 014 acct register re-homed) → children summary line → preference chips → EXACTLY 3 backendRequired gates; zero `<form>/<input>`; active nav = «الملف».

### User Story 8 — Real navigation, complete app (Priority: P1)

The seven family sidebar entries become real language-correct links; every family page (home + 7 internal + family-child) shows the correct active item; the home quick-tiles become real links.

**Independent Test**: on all family-shell pages ×2 languages: nav renders 8 items, ALL EIGHT anchors, zero planned buttons; the current page's item (and only it) is `is-active`+`aria-current` ×2 instances; the home's quick-links band navigates (tiles → 7 real links); family-child keeps home as its active anchor (the drill-down semantics) while its shell now carries the full 8-link registry.

### User Story 9 — Mobile, bilingual, themed (Priority: P1)

All seven new pages are clean at 390px, AR/EN mirrored, dark/light/system-safe.

### User Story 10 — Nothing else moves (Priority: P1)

Student (all 14 files) / teacher / admin / index / hub byte-identical; student nav stays 7 implemented; teacher stays 1+6 planned; teacher payHit + the zero-pay lines byte-verbatim green.

### Edge Cases

- **Nav-flip blast radius**: the flip re-bakes the nav on `family-portal(.en).html` AND `family-child(.en).html` (both consume the family registry) → both pairs change (sanctioned; family-child's body must stay byte-equal — nav-only change; its home-active/`navCurrent=2×family-portal` semantics and the smoke branch re-scope accordingly: navListAnchors 1→8, shell multiset 5→19 (8×2+hub×3)).
- **Family home body**: the 018 home already carries 5 real child links (bodyAnchors===5); the quick-tiles honesty fix ADDS 7 tile links → home bodyAnchors 5→**12** (5 child + 7 siblings, exact sets pinned). The five child cards keep their drill-downs unchanged.
- **children vs home overlap**: the home keeps its compact child cards (the 7-band recipe); the children PAGE is the full directory (richer per-child data). Both link to the same family-child panels — no duplication of the panels themselves.
- **Billing vocabulary**: hour counts are figure-safe (sessions/hours, never money); the zero-pay regex (currency/مبلغ/سعر/رسوم/amount/price/payment…) must stay un-triggered — authoring reviewed against the regex BEFORE build; "Serial No"/"Month-Year"/"Due" render as labels/status text without amounts.
- **Ceiling**: all seven pages inherit the internal-page window [500, 2200] @1366×768 (the 019 precedent); the homes keep [900, 2200].
- **family-child stays OUT of the sidebar** (the brief's default confirmed): reached from home children cards + children/progress page links; its PAGES entry/activeId untouched.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Grounding gate)**: `visual-grounding.md` (27/27 frames + inventories + gaps) MUST be cited by the plan; any contradicting design re-grounds first. ✅ complete at spec time.
- **FR-002 (Nav flip)**: exactly the seven `ROLE_NAV.family` entries flip `planned → implemented` (order/labels/icons/pages FROZEN). Student registry stays 7×implemented; teacher stays 1+6; both byte-untouched.
- **FR-003 (Seven page pairs)**: `family-{children,schedule,progress,billing,requests,materials,profile}` ×AR/EN registered in the build PAGES table with per-page `activeId` (= nav id), `personaKey: 'data.fam.fam1.name'`, new `prt.title.fam*` additions. Built 63 → **77**.
- **FR-004 (Active states)**: each page's nav item `is-active`+`aria-current` once per nav instance; home a plain link on internal pages; family-child keeps `activeId` home.
- **FR-005 (Children page)**: summary band + five real-roster child cards (course/group/teacher · lifecycle+subscription chips · attendance/progress snapshot · latest-note line) + exactly five `family-child(.en).html#child=stX` body links (each once) + truthful empty pattern.
- **FR-006 (Schedule page)**: child-tagged today band + next card + day-grouped week agenda w/ child tags + truthful rest days + ONE live/join backendRequired gate; zero tables/grids.
- **FR-007 (Progress page)**: family summary band + five per-child progress cards (authored `.pt-bar` + attendance mini + signal) each with the real child drill-down link + re-homed teacher notes; zero charts/rank/peer-comparison.
- **FR-008 (Billing page)**: hour-quota tiles (authored counts) + settled-status chip + per-child subscription chips + amount-free invoice STATUS rows + backendRequired finance gates + the admin-finance note; the Spec-014 zero-pay regex green on this body; no payment/receipt/pay control of any kind.
- **FR-009 (Requests page)**: type-grouped request cards re-homing the RETAINED `prt.fam.req.*` register (trial new/existing tiles · meetings truthful empty · feedback lines · cancel/reschedule options + caution) + labeled backendRequired gates per type; zero forms.
- **FR-010 (Materials page)**: per-child groups + type chips + matDownload gate; NO hero; truthful empties.
- **FR-011 (Profile page)**: guardian identity card + account rows + children summary + preference chips + EXACTLY 3 backendRequired gates (photo/save/password); zero form controls.
- **FR-012 (family-child preservation)**: the drill-down page's BODY stays byte-equal (nav-only rebake); it remains out of the sidebar; all `#child=stX` deep links keep working; the home's five child links unchanged.
- **FR-013 (Fixtures)**: ONE additive `FAMILY_PAGES` group re-referencing the RETAINED 014/018 slices (todayChildren/attendance/signals/teacherNotes/history/materials/kidHints/CHILD_PROFILE) + minimal new authored bits (hour-quota trio, per-child subscription states, invoice status rows, request statuses); ZERO deletion/rewording; all data consistent with fam1 + the five children + family-child panels.
- **FR-014 (Locales)**: additive `prt.title.fam*` + `prt.fam.pg.*` + `data.prtFamPg*`, AR/EN mirrored; retained keys reused verbatim; billing keys authored against the zero-pay regex.
- **FR-015 (Design)**: violet accent via existing tokens; `portal-page.js` primitives + existing `.pt-*` set; additive CSS only if a genuinely new primitive is needed; admin chrome never imported; every page ≤2 screens.
- **FR-016 (Honesty)**: zero fake pay/receipt/submit/send/cancel/download/save/password/live actions; the four honest classes only; zero `href="#"`/dead links/dead filters; home quick-tiles must tell the truth post-flip (implemented → real links).
- **FR-017 (Impact protection)**: changed built = 14 new + `family-portal(.en).html` (nav + quick-tiles band) + `family-child(.en).html` (nav-only; body byte-equal) + shared assets → **59/77 hash-identical** (40 admin + index + hub pair + 14 student files + teacher pair); frozen files 0-diff.
- **FR-018 (Pay safety)**: teacher pay-free three layers re-verified; payHit + both zero-pay regex lines byte-verbatim; the zero-pay regex EXTENDED (one sanctioned addition) to run on the new family-billing body — the strictest surface gets the standing guard.
- **FR-019 (Tests)**: ONE sanctioned smoke amendment: 77 loads; family-internal branch (shell/active/anchors/forms/tables/ceiling + per-page pins: children bodyAnchors===5 exact, progress ===5 exact, billing zero-pay + 0 pay-controls, profile 3 gates + 0 forms, requests/materials gate counts); family home re-scope (bodyAnchors===12 exact sets); family-child re-scope (nav counts 8/multiset 19; body asserts BYTE-KEPT); student/teacher/hub/admin branches + payHit + zero-pay lines BYTE-VERBATIM; 390px + tables extended.
- **FR-020 (a11y/screens/docs)**: additive axe rows (7 pages AR light/dark + EN sample) 0/0; captures per page desktop+mobile + proofs; REVIEW.md verdict section; README/CLAUDE + the Django note ("family internal pages use the same ROLE_NAV registry and active_id; planned entries flip one line at a time; family-child remains a drill-down"); 016 matrix + 018/019 annotations append-only.

### Key Entities

- **FamilyPage** (×7): `{ base, activeId, titleKey, render }` — compact bands per its FR.
- **FAMILY_PAGES fixture group**: additive slices (quota trio · per-child subscription states · invoice status rows · request cards · materials groups · profile prefs/gates) resolving fam1 + the five children.
- **AnchorInventories**: home body 12 (5 child + 7 tiles) · children body 5 · progress body 5 · schedule/billing/requests/materials/profile body 0 · family-child body 5 hash-switcher (unchanged) · every family shell = 8 nav ×2 + hub×3 = multiset 19.

## Success Criteria *(mandatory)*

- **SC-001**: 77 built files; the seven pairs render both languages, zero raw keys.
- **SC-002**: family nav = 8 real anchors on every family-shell page; zero «قريبًا» buttons; correct single active item everywhere.
- **SC-003**: a guardian reaches any child's file in ≤2 clicks from ANY family page (sidebar → children/progress → child link, or home → child card).
- **SC-004**: every new page ≤2 screens (window [500,2200] smoke-pinned); zero long-page regression.
- **SC-005**: zero fake actions/dead links/`href="#"`/raw keys across all 77 files; every gate labeled; the billing body passes the zero-pay regex.
- **SC-006**: 390px clean ×7; axe critical=0 serious=0 on the new rows.
- **SC-007**: **59/77** hash-identical; payHit + zero-pay lines byte-verbatim; student/teacher/admin untouched.
- **SC-008**: every Spec-014 displaced family capability and every 016 F-row resolves to a shipped section or labeled gate on its owning page — grep-audited, zero silent drops.

## Assumptions

- Sequence stands: this is **Spec 020 — Family/Guardian Internal Pages**; teacher = 021.
- Single-branch/watcher-commit workflow; hooks never manually triggered.
- The 019 mechanisms are REUSED as-is: per-page `activeId` via the build pass-through (already shipped), `portal-page.js` primitives, the status-aware quick-tiles pattern (applied now to the family home's own copy).
- The family home's five child cards and all other bands stay byte-equal; only its quick-tiles band + baked nav change.
- family-child body byte-equal is REQUIRED (its content has no registry dependence); if any build nuance breaks this, stop and report before proceeding.
- No new npm dependency, hook, or storage key in any acceptable implementation.
