# Data Model — Spec 017 (build-time shapes only; no DB/API/auth)

## 1. RoleNavRegistry (`src/js/fixtures/portal.js` — NEW, 017-owned)
`ROLE_NAV = { student: NavEntry[7], family: NavEntry[8], teacher: NavEntry[7] }`
`NavEntry = { id, labelKey: 'prt.nav.<role>.<id>', icon: existing-sprite-name, page: '<base>' , status: 'implemented' | 'planned' }`
- 017 values: home entries `implemented` (pages exist); all others `planned` with future page bases exactly as the spec's frozen table (`student-schedule` … `family-profile` … `teacher-reports`).
- **Validation**: labelKeys resolve in BOTH overlays; icons exist in the sprite; `implemented` ⇒ both built files exist (crawl-checked); teacher entries pass the extended pay grep; counts fixed 7/8/7; order frozen.

## 2. ShellV2 (portal-shell.js)
`portalShellMarkup({ role, personaKey, bodyHTML })` gains role-app rendering for `role ∈ {student, family, teacher}`: topbar (existing controls + nothing removed) · `details.pt-nav-drawer` (mobile) · `.pt-layout > aside.pt-sidenav + main#page > #page-body(bodyHTML)` · footer. Hub path unchanged (header-only). Active resolution: the entry whose `page` matches the current page gets `is-active` + `aria-current="page"` (017: always home).
- **Invariant**: zero anchors added INSIDE `#page-body`; zero admin classes; `bodyHTML` passed through byte-untouched.

## 3. IdentityBlock (aside header)
persona avatar initial (existing `avatar()`), persona nameKey (existing PORTAL_PERSONAS→fixture), role chip (existing pattern). Display-only; no auth implied; demo footer note stands.

## 4. SanctionedAnchorRegistry (smoke amendment data)
Per role page: shell anchors (`a[href]:not([href^="#"])` outside `#page-body`) must satisfy unique-set == { selfHref, hubHref } AND multiset count == 5 (self×2: aside+drawer · hub×3: header+aside+drawer). Body anchors: student 0 · family 0 · teacher 1 (exact performance target) — existing asserts BYTE-VERBATIM. Hub: existing asserts unchanged.

## 5. LocaleKeys (`prt.nav.*` — NEW namespace, 017-owned)
Chrome: `menu` («القائمة»/Menu) · `soon` («قريبًا»/Soon) · `hub` («العودة إلى المركز»/Back to hub) · `navAria` (nav accessible name). Role labels per the spec's frozen table. Sanctioned rewording: `prt.hub.sub` + 3 role-card `d` keys → dashboard register. Everything else in `prt.*`/`data.*` byte-untouched.

## 6. FreezeAmendments (recorded in this spec, cited by REVIEW)
A1: mobile nav = native `<details>` disclosure (enhance.js clone-drawer is admin-bound + frozen). A2: no desktop collapse in 017 (hooks/storage frozen). Both via the 016 change-control clause.

## Validation rules (cross-cutting)
- Registry ↔ built nav ↔ smoke expectations agree (counts, hrefs, active, planned-as-buttons).
- No new `data-*` hooks; no new storage keys; no new source files beyond the allowed list.
- The three role page modules produce byte-identical `bodyHTML` (git-diff empty or wrapper-arg-only).
- Built deltas confined to the four portal pairs; 41/49 hash-identical.
