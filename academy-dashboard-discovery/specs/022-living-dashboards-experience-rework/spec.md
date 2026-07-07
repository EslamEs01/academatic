# Feature Specification: Living Dashboards Experience Rework

**Feature Branch**: `feature/012-role-portal-foundation` (no branch change; watcher owns git)
**Created**: 2026-07-05
**Status**: Spec ready → next `/speckit.plan`
**Input**: The user's rejection of the static card-gallery dashboards + the binding Spec 021
decisions (DEC-001…DEC-009). Companion artifacts (normative): `visual-grounding.md` (L2–L10 legacy
· C1–C10 current, all personally opened), `dashboard-diagnosis.md` (the 10 answers),
`role-reclassification-scope.md` (student demotion mechanics).

## Mission

Transform the hub and the role homes from static card galleries into **living, joyful, educational
dashboards** — and land the corrected role model (3 primary roles; Student demoted to the family
journey's child view) — while every standing law holds (static HTML-first, closed hook set, honesty
gates, teacher pay-free GLOBAL, family zero-pay, compact ceilings, RTL-first, screenshot acceptance).

**In scope (surfaces)**: `portals` (hub) · `family-portal` · `teacher-portal` · `student-portal`
(child-view reframe + shared-primitive uplift) · the six student internals (copy-reframe only) ·
`family-child` + `family-children` (fold-point cross-links only) · shared layer (`app.css` tokens/
primitives, fixtures, locales) · tests/docs. **Out of scope**: any new internal page, teacher
internals (025), admin pages, backend/auth/live/payment, new engines/frameworks/CDN.

## The Living Design System (shared primitives — the heart of this spec)

Six named primitives, shipped once in the shared layer and consumed by all reworked surfaces.
Concrete anatomy below is binding at the concept level; exact CSS/markup is plan-stage.

1. **`pt-hero` — role identity hero band** *(grounded: L2/L4 heroes; replaces heading+KPI spread)*
   Page-wide gradient wash in the role accent (violet/teal/student-blue variant), avatar + greeting
   + role chip, and 2–3 headline counters WITH one-line context. Compact (desktop ≈180–240px,
   mobile compressed); dark-safe gradient variants; never carries pay data.
2. **`pt-rail` — living day timeline** *(grounded: L9/L10 day-orientation; C4 today band content)*
   Today's sessions as time-rail stops: the NOW stop pulses (pure CSS), NEXT is emphasized, done
   stops dim. Stops carry child tags (family), room/count (teacher), course (child view). Rest-day
   empties stay truthful with the friendlier empty pattern. Vertical on mobile.
3. **`pt-story` — status story rows** *(replaces isolated KPI tiles)*
   Number + one-line narrative + one REAL link («١ يحتاج متابعة ← افتح تقدم الأبناء»). All numbers
   remain authored fixture literals.
4. **`pt-flow` — guided workflow strip** *(teacher home)*
   The prepare → attend → record → review outcome workflow as a 4-step visual flow with the current
   honest gate notes attached to the gated steps.
5. **`pt-guide` — guided action panels** *(upgrades every dashed gate card)*
   What this does when live · who acts · status chip (backendRequired/planned) — visibly designed,
   still non-interactive, honesty classes unchanged.
6. **Joy & motion layer** *(grounded: C10's existing وسام/celebration language — scaled up)*
   Badge/celebration accents driven by EXISTING authored facts (streak days, group stars, settled
   billing); bar-fill and fade-in transitions, hover lift on link cards — ALL pure CSS, subtle,
   inside `@media (prefers-reduced-motion: no-preference)` with a fully static fallback. No JS
   animation engine, no new runtime hooks.

## Surface contracts (what each page becomes)

### Hub (`portals`)
Three primary role cards (العائلة/المعلم/الإدارة order Arabic-first) with persona + "what you'll
see" line; the Student entry DEMOTED below as the child-view preview row with the family-journey
explanation copy; admin console entry retained; demo notes retained; no fake login. *(Full scope:
`role-reclassification-scope.md` §1.)*

### Family home (`family-portal`) — the living guardian cockpit
Violet `pt-hero` (guardian greeting, children count + attention counter with context) → family
`pt-rail` (child-tagged stops) → the five child cards upgraded (avatar tone, animated progress,
latest-signal story line, real drill-down kept) → billing/requests as `pt-story` rows (settled
story + zero-pay law intact) → quick entries with real-link affordance. Content facts unchanged —
presentation transformed.

### Teacher home (`teacher-portal`) — the living teaching cockpit
Teal `pt-hero` (teacher greeting, classes-today + follow-ups counters; ABSOLUTELY pay-free) →
teaching `pt-rail` (room/course/count/status stops) → follow-ups as priority stories → `pt-flow`
outcome workflow → task chips with life → `pt-guide` panels for outcomeSave/matUpload/availability.
Teacher internals remain planned («قريبًا») until Spec 025.

### Child view (`student-portal` + internals)
Option **B+** per the reclassification scope: all seven pages reframed from «بوابة الطالب» to the
child-view identity; the home additionally adopts hero/rail/story primitives over its existing
authored facts; the six internals get copy-reframe only. Preserved byte-content wherever the
contract doesn't name a change.

### Fold point (`family-child`, `family-children`)
Honest «افتح عرض الابن الكامل» link(s) into the child view — the only body change on these pages;
everything else byte-preserved.

## User Scenarios & Testing

- **US1 (P1)** — A visitor opens the hub and understands within seconds that the product has three
  primary roles; the child view reads as part of the family journey, not a fourth login.
  *Test*: hub shows exactly 3 primary role cards + admin + 1 demoted child-view entry with the
  explanation copy; no «بوابة الطالب» primary framing anywhere.
- **US2 (P1)** — A guardian opens the family home and experiences a living cockpit: identity hero,
  today rail with their children on it, children cards that move and tell the latest signal.
  *Test*: hero + rail + ≥5 story/celebration elements render from authored facts; all existing
  drill-downs still work; zero-pay regex green.
- **US3 (P1)** — The guardian moves family home → family-child → the child's own view without
  confusion; naming stays coherent («عرض الابن»).
  *Test*: the fold-point links exist, resolve, and are labeled per the scope file; journey clickable
  end-to-end in both languages.
- **US4 (P1)** — A teacher opens the teacher home and sees their teaching day as a timeline plus
  what needs attention and how the outcome workflow proceeds.
  *Test*: rail + flow + priority stories render; zero pay tokens (extended set) in source AND built.
- **US5 (P1)** — The student pages remain reachable and functional but never present themselves as
  a primary role.
  *Test*: all 14 student files build and load; shell copy shows child-view framing; hub demotion in
  place; `ROLE_NAV.student` structurally untouched.
- **US6 (P1)** — The dashboards feel alive: motion, celebration, stories — and remain compact.
  *Test*: screenshot review records the before/after verdict per surface; ceilings hold within the
  recorded tunable window.
- **US7 (P1)** — Every action remains an honest gate or a real link. *Test*: no new interactive
  affordances without href; gate classes unchanged; zero `href="#"`; no dead links.
- **US8 (P1)** — No teacher pay vocabulary anywhere (extended token set, copy AND comments).
- **US9 (P1)** — Family zero-pay regex stays green on all family surfaces.
- **US10 (P2)** — Mobile 390 stays clean (hero compresses, rail goes vertical, no overflow).
- **US11 (P2)** — AR/EN stay mirrored (all new keys authored in both).
- **US12 (P2)** — No legacy product meaning is lost (the map file's ✅ rows stay ✅; 023 re-audits).

## Functional Requirements

- **FR-001 Grounding**: the visual-grounding gate is complete (this folder) and re-verified at plan.
- **FR-002 Hub correction**: hub role model per DEC-004 + scope §1.
- **FR-003 Student demotion**: Option B+ per scope §2; zero deletion (DEC-003/005).
- **FR-004 Family ownership**: fold-point links per scope §3 (DEC-006).
- **FR-005 Family living rework**: the family-home surface contract above.
- **FR-006 Teacher living rework**: the teacher-home surface contract above.
- **FR-007 Child-view framing**: shell/copy reframe on all seven student pages.
- **FR-008 `pt-hero`**, **FR-009 `pt-rail`**, **FR-010 `pt-story`**, **FR-011 `pt-flow`**,
  **FR-012 `pt-guide`**, **FR-013 joy/motion layer**: the six primitives as specified — shared,
  consistent, dark/RTL/mobile-safe, `prefers-reduced-motion` honored, pure CSS only.
- **FR-014 Static-safe interactivity**: only the existing CLOSED `data-*` hook set (data-tab/
  data-filter/`:target` patterns already proven); NO new hooks, NO new storage keys, NO engine.
- **FR-015 Teacher pay-free**: the extended forbidden token set (incl. أتعاب/فلوس/جنيه/ريال/دولار/
  EGP/SAR/USD/$/€/£/bonus/fine…) in ALL teacher files, copy and comments, three-layer enforced.
- **FR-016 Family zero-pay**: the verbatim payFigure regex green on every family body.
- **FR-017 Honesty**: the four action classes; no fake actions; planned nav stays non-anchor.
- **FR-018 Link hygiene**: zero `href="#"`, zero dead links, zero raw keys, sitewide.
- **FR-019 Responsive/theme**: mobile 390 clean; dark/light/system clean; RTL/LTR mirrored.
- **FR-020 Screenshot acceptance**: before/after frames per surface (desktop+mobile, light+dark
  samples) reviewed eyes-on in REVIEW.md.
- **FR-021 Impact protection**: 40 admin pages + index BYTE-IDENTICAL; family internals
  byte-identical EXCEPT the two fold-point pages; smoke byte-verbatim blocks (payHit · the
  original zero-pay regex lines · ALL admin asserts) unchanged; ONE sanctioned smoke amendment
  re-pins the reworked portal surfaces; ceilings re-pinned within a recorded ±10% window.
- **FR-022 Sequence artifact**: the 016 sequence artifact receives its append-only DEC-009
  amendment note at implement time.

## Success Criteria

- **SC-001**: A first-time viewer of the hub can name the three primary roles and describe the
  child-view relationship without explanation.
- **SC-002**: Side-by-side before/after screenshots of the three homes show an unmistakable
  transformation (hero present, timeline present, stories present) — the static-card problem is
  visibly solved and recorded in REVIEW.md.
- **SC-003**: 100% of pre-existing real links and gates survive (no capability regression).
- **SC-004**: All standing audits stay green: pay-free (3 layers), zero-pay (all family bodies),
  a11y critical=serious=0, smoke full suite, 390/dark/RTL.
- **SC-005**: Page heights stay within the re-pinned compact windows (no return of the endless page).
- **SC-006**: With reduced motion enabled, every page is fully usable and visually complete.

## Key Entities

- **Living primitives** (`pt-hero`/`pt-rail`/`pt-story`/`pt-flow`/`pt-guide`/joy tokens) — shared
  CSS+markup patterns, fixture-driven.
- **Hero facts / story lines** — additive authored fixture slices + mirrored locale keys (no
  computed data, no engines; naming at plan).
- **Demoted hub entry & child-view labels** — locale-level identity copy (scope file).

## Assumptions

- Specs 020+021 land via the watcher before 022 implementation starts; 022 plans against the
  77-file baseline.
- The ceilings may need up to +10% for the hero; the exact re-pin happens at plan and is recorded
  as tunable, per the 018 convention.
- The six student internals need copy-reframe only; if plan-stage extraction proves a structural
  need, it returns as an explicit plan decision, not silent scope growth.
- Expected rebake set (honest estimate, finalized at plan): portals ×2, family-portal ×2,
  teacher-portal ×2, student pages ×14, family-child ×2, family-children ×2, shared assets —
  identity target computed and pinned at plan.

## Out of scope / forbidden

New internal pages · teacher/admin internals · backend/API/auth · real payment/salary/upload/
download/live · charting or JS animation engines · new frameworks/CDN/packages · new `data-*`
hooks or storage keys · pixel-cloning legacy · fake actions of any class · pay/currency leakage
anywhere (family zero-pay; teacher pay-free GLOBAL).
