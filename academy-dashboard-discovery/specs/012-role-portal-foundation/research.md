# Research: Role Portal Foundation (Spec 012)

**Input**: spec.md · the legacy role-portal capability record (re-read this session from `output/roles/{teacher,family}/`, combined inventories, planning trees) · `shell-markup.js` · `build-html.mjs` · `sidebar.js`/`topbar.js` · `enhance.js` hook set · `i18n.js` chain · fixtures (`families.js`, `students.js`, `teachers.js`, `teacher-links.js`, `sessions.js`, `schedule.js`, `attendance.js`, `courses.js`, `groups.js`) · `tests/smoke/run.cjs` · `app.css` tokens · Spec 010 coverage matrix + Spec 011 QA notes. Every decision verified against the actual files this session.

---

## D1 — Portal shell: a sibling shell function + per-page build option

**Decision**: New component `src/js/components/portal-shell.js` exporting `portalShellMarkup({ role, bodyHTML, … })` — a header-based shell: sticky friendly header (brand medallion + portal name, role-identity chip, persona greeting block, language/theme controls reusing the EXISTING `data-action="theme-menu"`/`"lang-menu"` hooks, and a labeled demo role-switch link to the hub) above a single-column `main#page > #page-body`. NO `.nav-rail`, NO `.nav-panel`, NO admin topbar/crumbs. `build-html.mjs` PAGES entries gain an optional `shell: 'portal'` + `role` field; the render loop branches `shell === 'portal' ? portalShellMarkup(...) : shellMarkup(...)` — the 20 admin pages take the existing path untouched (byte-identical rebuild).

**Rationale**: `shellMarkup()` is one small pure function — a sibling function is the minimal, zero-risk way to get a structurally different shell (US2–US5's "no admin chrome" is then true by construction). Reusing the existing theme/lang hooks keeps the closed hook set closed. The header-based, rail-less layout is exactly what the legacy planning docs prescribe for portals ("mobile-first; card-ified; simpler").

**Alternatives considered**: (a) Parameterizing `shellMarkup()` with a variant flag — rejected: risks admin markup drift; two clean functions beat one branching one. (b) A separate build script — rejected: duplicate pipeline, drift risk; one generator with a field is Django-friendlier (one base template per shell).

## D2 — Pages & registry

**Decision**: Four new PAGES entries — `portals` (hub), `student-portal`, `family-portal`, `teacher-portal` — each `shell: 'portal'`, `activeId: null`, with `titleKey` from the new `prt.*` overlay (used for `<title>` only; portal shell renders no admin crumbs). Built output: +8 files → 49 HTML total. New page modules: `src/js/pages/portals.js`, `student-portal.js`, `family-portal.js`, `teacher-portal.js`.

**Rationale**: Follows the established registry pattern (gallery precedent for non-nav pages); naming avoids collision with admin profile pages (`student.html` etc.) and groups portals lexically.

## D3 — Personas (verified against fixtures)

**Decision**: Family persona = **`fam1`** (premium/active, guardian «أبو سلمان الغامدي», 5 children: st1/st6/st11/st12/st13 — the multi-child pattern is real). Student persona = **`st1`** (fam1's child: active, math, `progress: 78`, `grp1` → has sessions/outcomes via existing fixtures). Teacher persona = **`sara`** (active math teacher, `followUp: 'strongDelivery'`, rich `teacher-links.js` graph: courses/groups/students/schedule/outcomes).

**Rationale**: One coherent cross-portal story (st1 appears in the family portal's children overview AND owns the student portal); both personas already have the deepest fixture graphs, so every preview section reads real authored data with zero new entity fixtures. A small new `fixtures/portal.js` holds only portal-specific preview snippets (persona bindings, welcome copy keys, achievements/progress preview literals, planned-card registers) — display-only, no new domain.

## D4 — Locale overlays

**Decision**: New overlay pair `src/locales/ar.prt.js` / `en.prt.js` (`prt.*` keys: portal titles, role identities, section headings, planned-card copy, demo-entry framing, honest notes), merged LAST in `i18n.js` (after `fin`). Key-mirrored AR/EN; Arabic-first authored copy (warm, education-toned — never machine-translated feel).

**Rationale**: The established per-spec overlay pattern (fam/att/crs/trn/rep/fin precedents); merging last cannot clobber admin keys.

## D5 — Portal visual layer

**Decision**: A portal-scoped style block in `app.css`: everything namespaced under `.portal-shell` (+ `data-role="student|family|teacher"` accent hooks mapping to EXISTING token accents — e.g. student→sky/teal warmth, family→violet calm, teacher→teal/success order; final mapping at implementation with screenshot review). Softer surfaces (larger radius, lighter shadows, generous spacing), bigger friendly type scale for heroes, card-grid utilities, mobile-first single-column flow. No new fonts, no new libraries, tokens reused (a handful of portal-specific derived tokens allowed, e.g. `--portal-hero-bg`, defined from existing palette).

**Rationale**: Distinct-by-scope: admin selectors never match portal markup and vice-versa; the token system already carries the needed hues. This satisfies "visually distinct, same brand quality" without a second stylesheet pipeline.

**Alternatives considered**: a separate `portal.css` file — viable but adds a build output + link divergence; one stylesheet with strict namespacing keeps GitHub-Pages/Django wiring identical. (Plan may still split the file if size demands; default is the single sheet.)

## D6 — Smoke re-scope & portal test block (the critical reconciliation)

**Decision**: In `tests/smoke/run.cjs`: (1) add the four portal bases to `PAGES` (they join universal checks: raw keys, external requests, page errors, focusables, disabled-with-reason, zero `href="#"` via the crawl, `VALID_FILES` grows automatically since it derives from `PAGES`); (2) introduce `PORTAL_PAGES = new Set(['portals','student-portal','family-portal','teacher-portal'])` and branch the SHELL-specific assertions: admin pages keep every existing assert unchanged (rail/panel/one-active-nav/category-panels/nav010/links010-admin-expectations **and the portal-absence check, now admin-scoped**); portal pages get a new block asserting: `.portal-shell` present, `.nav-rail`/`.nav-panel`/`.app-shell` ABSENT, a role-switch link to the hub present, hub reachable, teacher-portal body contains zero pay tokens (EN `salary|pay|earnings|payout|compensation` + AR رواتب/راتب/أجر/مستحقات regex), localized digits on AR portal pages, every planned card labeled, zero dead links.
(3) The portal-absence assertion is NEVER deleted — it still runs verbatim on all 20 admin bases.

**Rationale**: This is the spec's edge-case #1. Scoping by page set keeps the admin invariant at full strength while making portal pages first-class tested surfaces. The teacher pay-token check is the FR-006/SC-005 enforcement.

## D7 — `FUTURE_ROLE` register wording (sanctioned touch-point)

**Decision**: Update the three `reason` strings in `nav.config.js` `FUTURE_ROLE` to the post-012 truth, e.g.: teacher-portal → "Separate Teacher portal surface — foundation shipped by Spec 012 (`teacher-portal.html`); deep experience is Spec 015; never an admin nav item."; family-portal → same pattern (Spec 014, multi-child switcher noted); student-portal → "Student portal split out of the legacy guardian-proxied portal as its own surface — foundation Spec 012, deep experience Spec 013; never an admin nav item." No structural change; the register still drives the admin-scoped absence assertion.

**Rationale**: FR-013's only allowed nav.config edit; keeps the register truthful (its old "never rendered" wording would become false the moment portal pages ship).

## D8 — Demo hub (`portals.html`)

**Decision**: A small warm page on the portal shell (neutral accent): headline framing it honestly as the demo role switcher («تجربة البوابات — اختر دورًا») + three large friendly role cards (each: role icon/accent, one-line promise, persona note, real link to its portal) + one labeled "admin console (demo)" return link to `dashboard.html` + a short honesty note (fixtures only, no login). Each portal's header carries a small «تبديل الدور» link back to the hub. Documented demo path: open `portals.html` directly (README/quickstart), gallery untouched, admin untouched.

**Rationale**: The cleanest of the brief's three entry options — zero admin/gallery edits, one obvious documented URL, and the hub itself demonstrates the portal design language.

## D9 — Role coverage artifact

**Decision**: `legacy-role-capability-coverage.md` in the spec folder: grounding header (role capture paths) → per-role tables (Teacher: all 22 templates/26 pages · Family: all 11 templates/13 pages), columns: capability · legacy route(s) · what it did (1 line) · seven-way classification (`foundation-only / planned-013 / planned-014 / planned-015 / backendRequired / future-role-deep / intentionally excluded`) · destination · rationale → a "net-new value" section (gamification/achievements/leaderboard absent in legacy; the three-portal split) → itemized Spec 013/014/015 boundary lists → sign-off checklist (Spec 010 style). Seeded classifications (binding defaults): teacher home→foundation-only preview (pay tile → backendRequired, never previewed); end-class workflow/monthly reports/certificates→planned-015; chat→backendRequired (both roles); timetable+availability→planned-015; students roster→planned-015 (roster preview = foundation); salary+salary-class-report→backendRequired; course-history duplicates→planned-015 (consolidated); library→planned-013/014/015 shared concept (browse-only); tickets (empty)→intentionally excluded (concept covered by admin tasks-planned); profile 500s + Dashboard-1 404s + fake live room→intentionally excluded (broken/fake); family home widgets→foundation-only; today-sessions (+cancel/upload/voice)→planned-014 (upload=backendRequired); student timetable→planned-013; history+session-details→planned-013/014; subscriptions+teacher-feedback rubric→planned-014; billing view-only→backendRequired (+ Spec 009 shell already covers admin side); feedback meetings→planned-014; request-trial wizard→planned-014; profile-edit→planned-013/014/015 (account concept).

**Rationale**: Continues Spec 010's zero-silent-gaps discipline at role level; the seeded defaults come straight from this session's legacy record so the implementation only formalizes, not re-researches.

## D10 — Screenshot matrix

**Decision**: 12 frames: student AR light / AR dark / EN light / AR mobile · family AR light / EN light / AR mobile · teacher AR light / EN light / AR mobile · hub AR light · **admin dashboard AR light (unchanged-proof)**. Capture drivers: none new (plain page loads); MATRIX entries only. Review records PASS/FAIL against the spec's failure conditions (admin-clone, legacy-clone, table-heavy, pay figures, fake-real actions, clutter).

## D11 — Scope-guard shape

**Decision**: Path-aware: portal vocabulary and new code live ONLY in the new portal files (`pages/{portals,student-portal,family-portal,teacher-portal}.js`, `components/portal-shell.js` + any `portal-*` components, `fixtures/portal.js`, `locales/*.prt.js`, the `.portal-shell` CSS block) + 3 registration touch-points (`build-html.mjs` entries/branch, `i18n.js` +2 merges, `nav.config.js` FUTURE_ROLE wording) + tests/docs. Guarded-untouchable (git diff empty): ALL admin page modules, admin fixtures, `enhance.js`, `package.json`, reports/finance file sets. Concrete audits: admin built pages content-identical vs HEAD (hash compare of all 40 files); zero pay tokens in portal sources+built teacher portal; zero portal tokens in admin bodies; page count = 49; prior guards (008/009/010/011) re-run verbatim.

## D12 — MVP & sequencing

**Decision**: (1) baseline gate → (2) portal shell + CSS layer + prt overlays + build branch (hub page first as the shell's proof) → (3) student portal → (4) family portal → (5) teacher portal → (6) smoke re-scope + portal block + crawl registry → (7) coverage artifact → (8) admin-identity + prior-guard audits → (9) screenshots + review → (10) docs (README Django mapping, REVIEW, CLAUDE). **MVP = steps 1–3 + 6** (shell + hub + student portal + green tests): proves the entire foundation pattern end-to-end on the most experience-sensitive role; family/teacher then reuse it.

---

## Additional verified facts the plan relies on

- `fam1` studentIds `['st1','st6','st11','st12','st13']`; `st1` active/math/progress 78/`grp1`; `sara` active with full `teacher-links.js` graph — persona coherence holds with zero fixture changes.
- Theme/lang menus are `data-action="theme-menu"`/`"lang-menu"` (existing enhance hooks) — the portal header reuses them verbatim; no new hook needed for the foundation (any tab-like affordance uses the existing `data-tabs` engine or stays baked-visible).
- `htmlDoc()` (head/sprite/theme-snippet/enhance script) is shell-agnostic — portal pages reuse it unchanged; only the body wrapper differs.
- The smoke `VALID_FILES` set derives from `PAGES` — adding the four bases auto-extends the link crawl.
- `applyLang(lang)` runs before render in the build loop — `num()` localizes portal digits per page exactly as it does the badge (Spec 011 precedent).
- The a11y and screenshot harnesses take page lists/MATRIX entries — additive extension, no structural change.
