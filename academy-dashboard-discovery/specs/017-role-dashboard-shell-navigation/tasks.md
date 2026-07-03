# Tasks: Role Dashboard Shell + Navigation (Spec 017)

**Input**: Design documents from `academy-dashboard-discovery/specs/017-role-dashboard-shell-navigation/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D13) · data-model.md · contracts/ (11) · quickstart.md — plus the BINDING Spec-016 package.
**Tests**: ONE sanctioned smoke amendment (research D9/D12) in T012, reviewed as one diff at the G-audit. **Every standing sibling/admin assert — incl. the Spec-012 payHit — stays BYTE-VERBATIM** (nav renders outside `#page-body` by construction, D1). All other harness work is additive.
**App root**: `academy-dashboard-discovery/app/` (paths relative to it unless prefixed). **THE TEACHER PAY-FREE GLOBAL RULE applies to every task** (extended token set: word-bounded EN `salary|salaries|pay|payouts?|earnings?|compensation|bonus|fines?|money|currency` + AR `راتب|رواتب|أجر|أتعاب|مستحقات|مكافأة|غرامة|فلوس` + currency `EGP|SAR|USD|ريال|ر.س|جنيه|دولار|$€£`) — copy AND comments. **Option B stands: zero new pages; zero new hooks; zero new storage keys; `enhance.js`/`build-html.mjs`/`nav.config.js`/`package.json` FROZEN.**

## Phase 1: Setup (baseline gate)

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` + `npm test` (green: 48 loads, a11y 0/0; rebuild deterministic — 0 built diffs vs HEAD `2b8bb84`); record HEAD + the 49-file census; stub the "Spec 017" section in `screenshots/REVIEW.md` with the baseline record and the planned amendments A1/A2 note

---

## Phase 2: Foundational (registries · keys · styles — blocks all stories)

- [x] T002 [P] Add `ROLE_NAV` to `src/js/fixtures/portal.js` per data-model §1: student 7 · family 8 · teacher 7 entries in the spec's frozen order — `{id, labelKey:'prt.nav.<role>.<id>', icon (existing sprite names, verify each against `public/assets/icons/icons.json`), page, status}`; home entries `implemented`, all others `planned` with the future page bases (`student-schedule`…`teacher-reports`); PERSONAS/PREVIEWS/PLANNED byte-untouched; comments pay-token-clean (extended set)
- [x] T003 [P] Add the NEW `prt.nav.*` namespace to `src/locales/ar.prt.js` + `en.prt.js` per data-model §5: chrome keys (`menu` «القائمة»/Menu · `soon` «قريبًا»/Soon · `hub` «العودة إلى المركز»/Back to hub · `navAria`) + the three role label sets from the spec's frozen table — key-mirrored; PLUS the four sanctioned hub-copy rewordings (`prt.hub.sub` + the 3 role-card `d` lines → dashboard-app register); **every other `prt.*`/`data.*` key byte-untouched**; teacher labels re-verified against the extended pay set
- [x] T004 [P] Add additive `.portal-shell`-scoped CSS to `src/styles/app.css` per research D11: `.pt-layout` (flex+gap) · `.pt-sidenav` (~240px, sticky, surface card, dark-safe, hidden <1024px) · `.pt-ident` (identity block) · `.pt-nav-item` (icon+label row; `is-active` accent pill via existing `--pt-accent*`; `is-planned` muted) · `.pt-nav-soon` (pill) · `.pt-nav-drawer` (details/summary slide-down, hidden ≥1024px) · 390px safety; ZERO existing selectors modified

**Checkpoint**: registries/keys/styles ready — the shell can render.

---

## Phase 3: User Story 1 — Student sees a real dashboard shell (Priority: P1)

**Independent Test**: built student page renders `aside.pt-sidenav` (7 items, identity block, hub exit) + the drawer, home self-link `aria-current="page"`, all 13 home sections intact below; zero admin markup.

- [x] T005 [US1] Implement Shell v2 in `src/js/components/portal-shell.js` per the shell contract: role pages (student/family/teacher) render topbar (ALL existing controls kept) → `details.pt-nav-drawer` (summary = `prt.nav.menu`) → `.pt-layout` = `aside.pt-sidenav` (identity block from persona fixtures · ROLE_NAV items: implemented→language-correct `<a>`, active=self `is-active`+`aria-current` · planned→`<button class="pt-nav-item is-planned">` + `prt.nav.soon` pill · footer hub entry) + the EXISTING `main#page > .pt-body#page-body` untouched; hub path unchanged; NO anchor inside `#page-body`; NO admin classes; build and verify the student page in both languages, zero raw keys

---

## Phase 4: User Story 2 — Student sees where everything will live (Priority: P1)

- [x] T006 [US2] Verify the student planned states on the built pair: exactly 6 `is-planned` BUTTONS (never anchors) each with icon+label+«قريبًا/Soon» pill; clicking one yields the existing acknowledge toast; zero `href="#"` anywhere on the page (grep both built files)

---

## Phase 5: User Story 3 — Guardian gets family navigation (Priority: P1)

- [x] T007 [US3] Verify the built family pair: 8 nav items in frozen order (الأبناء…الملف), violet accent active pill on home, all 12 home sections byte-intact, the billing label is the status-register wording, zero figures anywhere (the standing family zero-pay assert set stays untouched)

---

## Phase 6: User Story 4 — Guardian sees the app map (Priority: P2)

- [x] T008 [US4] Verify the family planned states: exactly 7 `is-planned` buttons with pills; no anchor beyond {self×2, hub×3} outside the body; body anchors still 0

---

## Phase 7: User Story 5 — Teacher gets workflow navigation (Priority: P1)

- [x] T009 [US5] Verify the built teacher pair: 7 items (جدولي/طلابي/نتائج الحصص/المهام/التقارير/ملفي + home), teal active pill, all 14 home sections intact, the performance link still the ONLY `#page-body` anchor with the exact target

---

## Phase 8: User Story 6 — Teacher app stays pay-free, layer 1 (Priority: P1)

- [x] T010 [US6] Pay-free source grep (layer 1, EXTENDED set incl. comments) over `src/js/components/portal-shell.js`, the `ROLE_NAV` teacher block in `src/js/fixtures/portal.js`, and the `prt.nav.tch.*`/chrome keys in both overlays → zero hits; fix any wording and re-grep

---

## Phase 9: Home-content integrity (cross-cutting — SC-003)

- [x] T011 Run the two-layer integrity proof per research D8: (1) `git diff` on `src/js/pages/{student,family,teacher}-portal.js` is EMPTY (or wrapper-arg-only, enumerated); (2) extract the `#page-body` inner HTML from HEAD's six built role files (`git show 2b8bb84:…`) and from the new build → byte-equal for all six; record both results for the G-audit

---

## Phase 10: User Story 9 — Safe honest future states + the smoke amendment (Priority: P1) 🎯 MVP checkpoint

**Independent Test**: `npm run test:smoke` green on all 48 loads with the amended portal block; `git diff tests/smoke/run.cjs` confined to the additions; every pre-017 assert byte-verbatim.

- [x] T012 [US9] Amend `tests/smoke/run.cjs` (the ONE sanctioned amendment, portal block additions ONLY) per research D9/D12: `sidenav` present on exactly the 3 role pages (absent on hub; admin pages already covered by the byte-verbatim portal-absence assert) · per-instance nav counts 7/8/7 (aside AND drawer) · exactly ONE `[aria-current="page"]` per role page and it is home · planned items render as BUTTONS (`.pt-sidenav a` count == implemented count) · `details.pt-nav-drawer > summary` present · **the sanctioned-anchor registry**: shell anchors (`a[href]:not([href^="#"])` outside `#page-body`) unique-set == {self, hub} AND multiset count == 5 per role page · **ALL existing asserts byte-verbatim** (student/family/teacher branches, payHit, hub, admin, tables+390 probe); run smoke green — **MVP = T001–T012**

---

## Phase 11: User Story 7 — Mobile nav works (Priority: P1)

- [x] T013 [US7] Mobile audit at 390px on all three role pages: the aside is hidden, the disclosure opens/closes by pointer AND keyboard (native), the open panel lists all items, zero horizontal overflow open or closed (probe green); fix any overflow in `src/styles/app.css` only

---

## Phase 12: User Story 8 — English equivalence (Priority: P1)

- [x] T014 [US8] Verify the three `.en.html` pages: LTR mirror, mirrored EN labels per the frozen table, same counts/active/planned behavior, zero raw keys (smoke covers both langs — this is the eyes-on pass)

---

## Phase 13: User Story 10 — Admin separate and unchanged (Priority: P1)

- [x] T015 [US10] Identity audit: hash-compare all 49 built files vs HEAD `2b8bb84` → **41/49 identical** (40 admin + `index.html`), only the four portal pairs differ; `git diff` EMPTY on `enhance.js` + `build-html.mjs` + `nav.config.js` + `package.json` + all admin sources; the admin-markup-absence check green on portal pages

---

## Phase 14: User Story 6 — Pay-free layers 2+3 (Priority: P1)

- [x] T016 [US6] Complete the three-layer audit: (2) extended-set grep over BOTH built teacher files → zero hits; (3) confirm the Spec-012 payHit assert passed BYTE-UNCHANGED in the T012 run; verify no teacher anchor targets any pay-adjacent page (the registry assert covers it — record explicitly)

---

## Phase 15: User Story 11 — Specs 018–020 set up (Priority: P2)

- [x] T017 [US11] Append the Spec-017 delivery annotation to `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/legacy-to-new-coverage-matrix.md` (append-only note: shell row delivered; role-shell-needed satisfied; 018–020 flip registry statuses only) and record the flip mechanics in the annotation (one `status` line + the built pair = a live nav destination)

---

## Phase 16: User Story 12 — Freeze conformance (Priority: P1)

- [x] T018 [US12] Freeze-conformance review against `role-dashboard-design-freeze.md`: only frozen primitives used; role accents sky/violet/teal; no forbidden pattern (no bottom tabs, no fake affordances, no admin chrome); amendments **A1** (native disclosure) + **A2** (no collapse) recorded in `screenshots/REVIEW.md` with their reasons

---

## Phase 17: Polish — a11y, captures, docs, final gate

- [x] T019 Run `npm run test:a11y` → critical=0 serious=0 (portal scenarios incl. the new nav, light+dark); fix any contrast finding in `src/styles/app.css` tokens-only
- [x] T020 Extend `tests/screenshots/capture.cjs` additively: a `roleDrawer` step (`page.click('.pt-nav-drawer summary')`) + the frame `{page:'teacher-portal', lang:'ar', theme:'light', vp:'mobile', roleDrawer:true, variant:'drawer-open'}`; re-capture the portal frames (student/family/teacher AR-light desktop, teacher AR-dark, one EN desktop, teacher mobile closed+open, portals hub, admin dashboard proof) → 0 console errors; record the Spec-017 verdict table + failure sweep in `screenshots/REVIEW.md`
- [x] T021 [P] Docs: add the Shell-v2 Django note (`ROLE_NAV` → `{% for %}` + `active_id`) to `academy-dashboard-discovery/app/README.md`; verify `CLAUDE.md` points at Spec 017 (done at plan time — confirm untouched)
- [x] T022 Final gate from `academy-dashboard-discovery/app/`: `npm run build` + `npm test` green + re-run the FULL scope-guard G3 audit (change-surface · 41/49 · pay-free three layers · anchor registries · integrity proof recorded · G2 diffs empty · prior guards 008–016 green, amendment reviewed as ONE diff) + mark this tasks.md accurately

---

## Dependencies & execution order

- **T001 → T002/T003/T004 [P] → T005 → T006…T010 (verification, any order) → T011 → T012 (MVP) → T013/T014 → T015/T016 → T017/T018 [P-safe] → T019 → T020 → T021 [P] → T022.**
- Story order: US1 (shell) unlocks US2–US6; US9 (smoke) is the MVP gate; US7/US8/US10/US11/US12 close the ladder. No story depends on a later one.
- Parallel: T002+T003+T004 (three files); T017∥T018 (different files); T021 parallel with T020.

## Implementation strategy

**MVP = T001–T012**: registries/keys/CSS → the shell component → per-role verification + pay grep + integrity proof → the smoke amendment green. Then mobile/EN passes, identity + pay layers, coverage annotation, freeze review, and the polish gate. Any blocking finding routes to its owning task — never to scope expansion; Option B (no new pages), the frozen-file law, and byte-verbatim sibling asserts are checked at every build touchpoint.
