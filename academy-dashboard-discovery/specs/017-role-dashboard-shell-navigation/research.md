# Research & Decisions — Spec 017 (D1–D13)

Format: Decision · Rationale · Alternatives. Grounding: Spec-016 law; `portal-shell.js` (read); `enhance.js` drawer internals (read: `openDrawer()` targets `#shell > .sidebar`, no-op on portals); the smoke portal block (read); legacy role-app screenshots (teacher + guardian sidebars, visually verified).

**D1 — Shell v2 layout structure.**
**Decision**: role pages render `header.pt-header` (evolved topbar) → `div.pt-layout` (flex) containing `aside.pt-sidenav` (desktop nav + identity block + hub entry) and the existing `main.pt-main#page > .pt-body#page-body`; the mobile `details.pt-nav-drawer` sits between header and layout, hidden ≥1024px while the aside hides <1024px. The hub keeps the current header-only shell path. **All nav markup lives OUTSIDE `#page-body`** — every standing body-scoped assert (bodyAnchors 0/0/1, zero-pay regex, gauges/avatars/planned tones, formControls) survives byte-verbatim.
**Rationale**: the smallest structural change that yields a real app frame; body-exteriority converts the riskiest compatibility question into a non-event.
**Alternatives**: nav inside main (rejected: breaks bodyAnchors asserts); CSS-grid holy-grail rework (rejected: flex on one wrapper suffices).

**D2 — Registry shape & home.**
**Decision**: `ROLE_NAV = { student: [7], family: [8], teacher: [7] }` in `src/js/fixtures/portal.js`; entry = `{ id, labelKey: 'prt.nav.<role>.<id>', icon, page: '<base-name>', status: 'implemented'|'planned' }`; href resolves language-correctly at bake (`page + (en ? '.en.html' : '.html')`). 017 ships home=implemented, all others planned. Registries are the single source for aside, drawer, and smoke expectations.
**Rationale**: matches `nav.config.js` discipline without touching it; 018–020 flip one `status` per delivered page.
**Alternatives**: separate `role-nav.config.js` (rejected: new source file outside the allowed list; the fixture module is the sanctioned home).

**D3 — Item rendering & active state.**
**Decision**: implemented → `<a class="pt-nav-item" href …>` with icon+label; the page's own entry gets `is-active` + `aria-current="page"` (a real self-link — standard dashboard idiom). planned → `<button type="button" class="pt-nav-item is-planned">` with icon+label+«قريبًا/Soon» pill; clicking triggers the EXISTING enhance.js generic acknowledge-toast (delegated default for buttons — zero new hooks). Never `href="#"`, never disabled-unexplained.
**Rationale**: honest classes 1 and 3 exactly; the pill + toast is the established planned vocabulary.
**Alternatives**: active item as `<span>` (rejected: self-link is real and keyboard-consistent); `data-coming-soon` attribute (unnecessary — the generic delegation already toasts).

**D4 — Mobile navigation (freeze Amendment A1).**
**Decision**: native `<details class="pt-nav-drawer"><summary>` («القائمة» + icon) containing the same registry list; closed by default; styled as a slide-down panel under the topbar; `<` 1024px only. Recorded as **freeze Amendment A1** via the change-control clause: the frozen "off-canvas drawer" wording assumed the enhance.js clone-drawer, which is admin-`#shell`-bound (verified in source) and enhance.js is untouchable — the native disclosure is the sanctioned role-app drawer. Bottom tabs stay forbidden.
**Rationale**: zero JS, native keyboard/RTL semantics, no hooks, honest.
**Alternatives**: reusing `data-action="open-drawer"` (verified no-op on portals); checkbox-hack off-canvas (worse a11y); enhance.js edit (forbidden).

**D5 — Desktop collapse (freeze Amendment A2).**
**Decision**: NO collapse-to-icons in 017 — fixed-width aside (~240px). Recorded as **Amendment A2**: collapse requires a toggle hook + persisted state; both `enhance.js` and new storage keys are frozen. Deferred until a spec may sanction an enhancement, if ever needed.
**Rationale**: honesty over ornament; 7–8 items don't need collapse.
**Alternatives**: CSS-only hover-expand (rejected: unusable on touch/keyboard).

**D6 — Identity block & hub exit.**
**Decision**: aside header = persona avatar initial (existing `avatar()` sizes), persona name, role chip (existing pattern); aside footer = the «العودة إلى المركز» hub link. The topbar keeps its existing switch link untouched (a smoke assert targets `.pt-header a[href]`).
**Rationale**: "real logged-in dashboard" feel from existing primitives; no new components.
**Alternatives**: identity in topbar only (rejected: the sidebar identity block is the app-frame signal the brief asks for).

**D7 — Hub copy scope.**
**Decision**: rewording confined to 4 keys — `prt.hub.sub` + the three role-card `d` lines — from "portal foundation" register to "dashboard app" register; `prt.hub.open/adminT/adminD/adminOpen/personaNote/headline` and structure untouched; `portals.js` markup untouched unless a key rename forces it (it doesn't — same keys, new copy).
**Rationale**: the 016-sanctioned "hub copy update", minimally.
**Alternatives**: full hub redesign (rejected: not this spec).

**D8 — Home-content integrity proof (SC-003).**
**Decision**: two layers: (1) **by construction** — `git diff` on the three page modules is empty (their `bodyHTML` output cannot change); (2) **built proof** — extract the `#page-body` inner HTML from HEAD's built pages and from the new build (node one-liner over the known `<div class="pt-body" id="page-body">…</div></main>` bounds) and byte-compare: expected EQUAL for all six role files.
**Rationale**: makes SC-003's strong form (byte-equal) checkable; no enumeration path needed.
**Alternatives**: DOM-diff in Playwright (heavier, same answer).

**D9 — Sanctioned-anchor registry (the new smoke pillar).**
**Decision**: per portal page, smoke collects `a[href]:not([href^="#"])` OUTSIDE `#page-body` (shell anchors) and asserts: unique-href SET equals {self, hub} for the three role pages, with exact multiset counts **self×2 + hub×3 = 5** (aside self + drawer self · header switch + aside hub + drawer hub); body anchors keep their existing per-role asserts (0/0/1 + teacher exact target). Hub page: existing hubRoleTargets/hubAdminLink asserts unchanged. The registry lives as an expected-map inside the smoke amendment.
**Rationale**: pins the complete link inventory machine-tight while leaving sibling asserts byte-verbatim.
**Alternatives**: set-only assert (rejected: multiset catches duplicate/missing renders).

**D10 — Locale keys.**
**Decision**: new 017-owned namespace `prt.nav.*`: chrome keys (`menu`, `soon`, `hub`, `navAria`) + per-role label sets (`stu.{home,schedule,homework,materials,progress,history,profile}`, `fam.{home,children,schedule,progress,billing,requests,materials,profile}`, `tch.{home,schedule,students,outcomes,tasks,reports,profile}`) — AR/EN key-mirrored; labels from the spec's frozen table. Teacher labels re-verified against the EXTENDED pay set (incl. أتعاب/فلوس/دولار/money/currency): clean. All existing `prt.stu/fam/tch` content keys + `data.*` byte-untouched.
**Rationale**: one namespace, one owner, sibling freezes intact.
**Alternatives**: per-role nav keys inside `prt.stu/tch/fam` (rejected: would touch frozen namespaces).

**D11 — CSS additions.**
**Decision**: additive `.portal-shell`-scoped selectors only: `.pt-layout` (flex, gap), `.pt-sidenav` (240px, sticky top, card surface, dark-safe), `.pt-ident` (identity block), `.pt-nav-item` (row, icon+label, hover, `is-active` accent pill via existing `--pt-accent*` tokens, `is-planned` muted + pill), `.pt-nav-soon` (pill), `.pt-nav-drawer` (details/summary styling, <1024px), breakpoint swap at 1024px, 390px safety. No existing selector modified.
**Rationale**: pure addition inside the frozen token system.
**Alternatives**: none serious.

**D12 — Tests & captures.**
**Decision**: ONE smoke amendment (portal block): shell asserts per D9 + `sidenav present on exactly the 3 role pages (absent on hub + all admin)`, `nav item counts 7/8/7 per instance`, `exactly one aria-current per page = home`, `planned items are BUTTONS (anchors count check)`, `details.pt-nav-drawer present w/ summary`; everything sibling/admin byte-verbatim. A11y: existing portal scenarios re-run (no new scenarios needed — same pages). Captures: existing portal frames re-capture with the shell; ADD `{ page:'teacher-portal', vp:'mobile', roleDrawer:true }` variant (capture.cjs additive: `click('.pt-nav-drawer summary')`); REVIEW.md verdict table.
**Rationale**: the proven single-amendment discipline; drawer-open state visually proven.
**Alternatives**: per-page new a11y scenarios (rejected: same three pages already covered).

**D13 — Byte-identity + audit.**
**Decision**: post-build target **41/49** identical (40 admin + `index.html`); changed = the four portal pairs exactly. G-audit: change-surface = allowed list · 41/49 hash-compare · pay-free three layers (extended set) over teacher sources+built · anchor registries green · zero href="#"/dead/raw · G2-frozen diffs empty (`enhance.js`, `build-html.mjs`, `nav.config.js`, `package.json`, the three page modules unless the signature pass-through is used — then wrapper-line-only diff shown) · prior guards 008–016 green.
**Rationale**: the standing per-spec identity discipline, retargeted.
**Alternatives**: none.
