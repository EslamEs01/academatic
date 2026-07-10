---
description: "Executable task list — Spec 034 Control Center Pages Completion (messages / leads / tasks / announcements / time-converter)"
---

# Tasks: Control Center Pages Completion

**Spec**: 034 · **Branch**: `feature/012-role-portal-foundation` · **Baseline**: Spec 032 committed (HEAD `a438ac2`, public HTML **103**); Spec 033/034 artifacts present; feature.json → 034.
**Target**: **113** (+10 — 5 new page pairs). **No implementation runs from this document until `/speckit.implement`.**

**Paths**: repo root `/media/mekky/work/backend/dashboard-intelligence-crawler`; app root `academy-dashboard-discovery/app` (abbrev `app/`).

**Core law**: every Add/Create/New/Edit/Compose/Send/Convert/Assign/Publish opens a **real frontend surface with visible fields/list**; the final action is a `data-disabled-reason` (or `data-confirm` → backendRequired) gate. **No fake send/convert/save/move/publish/delivery; no persistence/mutation.** The ONE genuinely-working action is the **timeConverter conversion** (native `Intl`, no gate).

**Mechanism**: existing primitives (pageHeader/summaryCards/cardGrid/filterBar/tabs/previewTemplate+formDrawer/confirmAction/field/optsFrom) + the CLOSED `data-*` hook set; the ONE runtime addition is a **page-scoped `initTimeConverter()` IIFE** in `enhance.js` (mirrors `initTabs`/`initWizard`; guarded → inert elsewhere; no new global `data-*` hook, no dependency). **MUST-OMIT**: password · salary/pay/amount/price · credential/secret/api/webhook/token/otp · computed Total. **MUST-GATE** (no control): `type=file` uploads (chat image, ad media, attachments). **Protected asserts byte-verbatim** (payHit/tchPay/famPay/payFigure/child-view/finance/settings/FAKE + Spec-032 form-completion + 026–031); smoke change additive only.

**Model routing** — **Opus**: grounding synthesis, page architecture, no-fake boundary, timeConverter interaction, nav/count/test strategy, final clean-code/test-guard. **Sonnet**: repetitive fixtures, locale mirroring, simple card/table/list sections, screenshot config, docs/checklist.

---

## Phase 1 — Setup / Preflight

- [ ] T001 Verify baseline: `git rev-parse --short HEAD` (`a438ac2`+), `git branch --show-current` (`feature/012-role-portal-foundation`), `cat .specify/feature.json` (→ `specs/034-control-center-pages`), `find app/public -maxdepth 1 -name '*.html' | wc -l` = **103**. **Verify**: all match; if count ≠ 103, STOP.
- [ ] T002 Run the green baseline in `app/`: `npm run build` (103), `npm run test:smoke` (PASS), `npm run test:a11y` (0/0). **Verify**: record numbers; any failure → STOP.
- [ ] T003 Confirm no 034 app source exists yet: `git status --short app/` shows no app changes; `pages/messages.js`/`leads.js`/`tasks.js`/`announcements.js`/`time-converter.js` absent; `fixtures/control-center.js` + `locales/ar.ctrl.js`/`en.ctrl.js` absent. **Verify**: clean pre-implementation tree.
- [ ] T004 [Opus] Load the binding contracts: `specs/034-…/contracts/{scope-guard,page-count,nav-completion,forms-and-gates,no-fake-control-actions,no-backend-no-delivery,time-converter,role-law-carryover,impact-protection,smoke-coverage,a11y-screenshot}.md` + `data-model.md`. Internalize MUST-OMIT/MUST-GATE + the timeConverter init rule before any edit. **Verify**: scope + no-fake + timeConverter-init laws internalized.
- [ ] T005 Confirm reused primitives exist: `components/{page-header,card-grid,filter-bar,tabs,preview-drawer,form-field,states,confirm-modal,ui}.js`; `enhance.js` page-scoped inits (`initTabs`/`initWizard`) as the timeConverter precedent; CSS tokens (`.card`/`.chip`/`.field`/`.wiz-grid`/`.sheet-*`/`.select-input`). **Verify**: no new component/CSS framework required; only additive `.cc-*` classes + one `initTimeConverter` IIFE.

## Phase 2 — Foundation / Registration (blocks all page work)

- [ ] T006 Create the 5 render-module stubs exporting `renderMessages`/`renderLeads`/`renderTasks`/`renderAnnouncements`/`renderTimeConverter` in `app/src/js/pages/{messages,leads,tasks,announcements,time-converter}.js` (return a minimal page-header shell first). **Verify**: each module imports cleanly (`node --input-type=module -e "await import('./src/js/pages/messages.js')"` … all 5 print OK).
- [ ] T007 Create `app/src/js/fixtures/control-center.js` skeleton with the named exports `MESSAGES`/`LEAD_KPIS`/`LEADS`/`LEAD_STATUSES`/`TASK_KPIS`/`TASKS`/`STAFF_TASK_ROWS`/`ANNOUNCEMENTS`/`TIMEZONES`/`TZ_CHANGES` (empty/small authored). **Verify**: imports cleanly; no PII/pay/secret placeholder.
- [ ] T008 Create the locale pair `app/src/locales/ar.ctrl.js` + `app/src/locales/en.ctrl.js` (skeleton: `common`/`msg`/`lead`/`task`/`ann`/`tz` blocks). **Verify**: both import cleanly; same top-level block set.
- [ ] T009 Register the ctrl locale in `app/src/js/i18n.js` — **+2 imports (`arCtrl`/`enCtrl`) + 2 `deepMerge(ar,arCtrl)`/`deepMerge(en,enCtrl)`** (mirror the existing pattern). **Verify**: `git diff i18n.js` = 2 imports + 2 deepMerge only; build has no missing-key error.
- [ ] T010 Register the 5 bases in `app/scripts/build-html.mjs` — **+5 `import { renderX }` + 5 PAGES entries** `{ base, activeId, titleKey, crumbKey, render }` (activeId = nav id: messages/leads/tasks/announcements/timeConverter; base = file base incl. `time-converter`). **Verify**: `git diff build-html.mjs` = 5 imports + 5 entries only.
- [ ] T011 Flip exactly 5 nav items in `app/src/js/nav.config.js`: `messages`/`leads`/`tasks`/`announcements`/`timeConverter` → `status:'implemented'` + `route:'<base>.html'`; **remove** the `messages`/`leads`/`tasks`/`announcements` keys from `FUTURE_ROUTES` (timeConverter has none). **Verify**: build-guard passes (implemented ⇒ route); `git diff nav.config.js` = 5 flips + FUTURE_ROUTES trim only; no other nav item changed.
- [ ] T012 Rebuild + confirm registration: `npm run build`. **Verify**: **113** public HTML files; the 5 new bases each have `.html` + `.en.html`; the 5 Control items render as `<a>` links (0 «قريبًا» among them); `package.json` 0-diff.

## Phase 3 — Fixtures / Locales / Shared UI (front-loaded so page modules are independent)

- [ ] T013 [Sonnet] Author ALL display-only data in `app/src/js/fixtures/control-center.js` for the 5 domains (authored conversations/bubbles, lead rows + 9 statuses + KPI literals, task cards + per-staff rows + KPI literals, announcements, curated IANA `TIMEZONES` by region, `TZ_CHANGES` board). **Verify**: no PII, no pay/amount/price, no credential/secret, no computed value; imports cleanly.
- [ ] T014 [Sonnet] Author ALL mirrored keys in `app/src/locales/ar.ctrl.js` + `en.ctrl.js` (`msg.*`/`lead.*`/`task.*`/`ann.*`/`tz.*`/`cc.common.*` — labels/placeholders/options/gate-reasons for every page + form). **Verify**: flattened-key diff = 0 one-sided keys; reuse existing `common.*`/`fopt.*`/`lang.*` where they fit.
- [ ] T015 Add additive scoped CSS to `app/src/styles/app.css` (`.cc-msg-pane` two-pane, `.cc-board-col` task columns, `.cc-tz-grid` converter grid) reusing existing card/chip/field/sheet tokens. **Verify**: additive only (no rule deletion/restyle); build CSS green.
- [ ] T016 Rebuild + parity check: `npm run build`; run the 12-pair flattened-key locale diff. **Verify**: 12 pairs 0-divergence; 0 `⟦` raw keys in any built page; count still 113.
- [ ] T017 Per-group grounding notes: write a short "Targeted Visual Grounding — Complete" note for EACH page group (messages/leads/tasks/announcements/time-converter) citing the exact legacy evidence (`management-{chat,new-requests,tickets,public-advertisement,time-convertor}.md` + inventories) + current patterns, into the group's section of `specs/034-…/legacy-control-center-coverage.md` (append-only) before its page phase. **Verify**: 5 grounding notes recorded; each names evidence + decision + forbidden set.

## Phase 4 — US1 Messages page [Priority: P1] (depends on T013/T014)

- [ ] T018 [US1] Grounding note for messages (from `management-chat` + inventories) appended per T017 before editing. **Verify**: note present.
- [ ] T019 [P] [US1] Build `renderMessages` in `app/src/js/pages/messages.js`: inbox list (authored conversations: name/role/unread/last-time via `filterBar` + list) + a default open thread panel (authored bubbles) + a compose box (`message` textarea + **attachment inline gate**); each conversation row = `data-drawer="msg-<id>"` (read-only thread sheet via `previewTemplate`). **Verify**: inbox + thread + compose render; conversation rows open a read-only sheet.
- [ ] T020 [P] [US1] Add the `msg-group` + `msg-member` `formDrawer`s in `messages.js` (Create-Group: name/bio/staff/teachers/students selects + **image inline gate**; Add-Member: member multi-selects). **Verify**: each drawer has ≥1 control + one `data-disabled-reason` Save final; **no `type=file`** (image = gate).
- [ ] T021 [US1] Wire the Send/Reply final as a `data-disabled-reason` gate (`msg.reason.backend`). **Verify**: Send/Reply = gate; no message appended; no read-state flip; no fake-sent wording.

## Phase 5 — US2 Leads / New Requests page [Priority: P1] (depends on T013/T014)

- [ ] T022 [US2] Grounding note for leads (from `management-new-requests`(+create) + inventories) appended per T017. **Verify**: note present.
- [ ] T023 [P] [US2] Build `renderLeads` in `app/src/js/pages/leads.js`: `pageHeader` + `summaryCards` (authored KPI literals) + `filterBar` (9 status + source + search) + a lead list (`#`/Date/Parent/Email/Phone/Status/Actions with labeled status chips). **Verify**: KPI cards + list + filters render; a status filter narrows the list (real `data-filter`).
- [ ] T024 [US2] Add the lead-detail `data-drawer="lead-<id>"` (notes-log `sheetRow`s + **Add-Notes** form [note textarea] + **Change-Status** form [status select, 9 opts]) in `leads.js`. **Verify**: drawer opens; forms have controls; Save/Update = gates; no note appended; no status chip flip.
- [ ] T025 [US2] Add the `lead-new` Create-Request `formDrawer` in `leads.js` (grounded ~19 fields; **no money/price field**; couponCode = plain text). **Verify**: form has visible controls; Submit = gate; no row added.
- [ ] T026 [US2] Wire Convert/Assign as `data-disabled-reason` gates. **Verify**: Convert/Assign = gates; no fake conversion/assignment; no row/status mutation.

## Phase 6 — US3 Tasks page [Priority: P1] (depends on T013/T014)

- [ ] T027 [US3] Grounding note for tasks (from `management-tickets` + inventories; record the board/create evidence gap) appended per T017. **Verify**: note present + gap recorded.
- [ ] T028 [P] [US3] Build `renderTasks` in `app/src/js/pages/tasks.js`: KPI strip (`summaryCards`, authored) + a display-only **board** (status columns Pending/In-progress/Completed/Overdue, each a `cardGrid` of task cards: title/assignee/priority/due/status chips) + a per-staff table (Name/Total/Pending/Overdue/Completed/**Average = literal**) + filters. **Verify**: KPI + board + table render; **no working drag**.
- [ ] T029 [US3] Add the `task-new`/`task-edit` `formDrawer` (title/description/assignee/status/priority/due-date/section) + `task-section` `formDrawer` (name) in `tasks.js`. **Verify**: forms have controls; Save/Add-Section = gates; no card added.
- [ ] T030 [US3] Wire Assign/Move as gates; confirm the board has no DnD wiring. **Verify**: Assign/Move = gates; no status/column mutation; "Average" is an authored literal (not computed).

## Phase 7 — US4 Announcements page [Priority: P1] (depends on T013/T014)

- [ ] T031 [US4] Grounding note for announcements (from `management-public-advertisement`; note the settings-Notifications boundary) appended per T017. **Verify**: note present; boundary recorded (settings form NOT duplicated).
- [ ] T032 [P] [US4] Build `renderAnnouncements` in `app/src/js/pages/announcements.js`: `pageHeader` + announcements list (`cardGrid`, audience/channel/status chips) + a preview card + a recipient display (authored). **Verify**: list + preview + recipients render.
- [ ] T033 [US4] Add the compose form section (message textarea · channel toggles [Advertisement/WhatsApp] · private checkbox · expire date · audience category multi-selects · country/hours/language selects · **media inline gate**). **Verify**: compose has visible controls; **no `type=file`** (media = gate).
- [ ] T034 [US4] Wire Publish/Send + WhatsApp/channel delivery as `data-disabled-reason` gates. **Verify**: Publish/Send = gates; no fake published/sent wording; no delivery; not a duplicate of the settings Notifications form.

## Phase 8 — US5 Time Converter page [Priority: P1] (NOT [P] — touches enhance.js)

- [ ] T035 [US5] Grounding note for time-converter (from `management-time-convertor`) appended per T017. **Verify**: note present.
- [ ] T036 [US5] Build `renderTimeConverter` in `app/src/js/pages/time-converter.js`: `tabs` (Time Zone | Changes) + converter panel (source-zone select, target-zone select, date input, time input, an output region with `data-tc-output`, common-academy quick chips) + an authored DST "Changes" board; mark the root `[data-time-converter]`. **Verify**: controls + output region + quick chips + Changes board render; **no gate markup on the conversion**.
- [ ] T037 [US5] [Opus] Add the page-scoped `initTimeConverter()` IIFE to `app/src/js/enhance.js` (mirror `initTabs`/`initWizard`): guarded by `document.querySelector('[data-time-converter]')`; on control change recompute via **native `Intl.DateTimeFormat(locale,{ timeZone })`** + `Date` and write `[data-tc-output]`. **Verify**: `git diff enhance.js` = ONE guarded IIFE only; **no new global `data-*` dispatch**, no storage key, no dependency; inert on the other 108 pages.
- [ ] T038 [US5] Add `TIMEZONES` quick-chip wiring (set source/target from a chip) inside the same init (no new hook). **Verify**: clicking a quick chip updates a select + re-runs the conversion; no navigation.
- [ ] T039 [US5] Rebuild + tool check: `npm run build`; load `time-converter.html`/`.en`. **Verify**: changing source/target/date/time updates the output with a correct native-`Intl` conversion; **0 external request**; **NO gate**; `package.json` 0-diff.

## Phase 9 — Nav completion / count verification

- [ ] T040 Verify nav completion in the built pages: the 5 Control items are `<a>` implemented links; **0 «قريبًا» in the Control category**; `plannedNavAnchors===0`; admin-menu still 50 items. **Verify**: grep built sidebar; Spec-010/029 nav block intent holds.
- [ ] T041 Verify count/route: `find app/public -maxdepth 1 -name '*.html' | wc -l` = **113**; each new base appears exactly twice; 0 orphan/missing-mirror; no unrelated route added/removed. **Verify (`page-count-contract` + `route`)**.
- [ ] T042 Verify `nav.config.js`/`build-html.mjs` diffs are exactly the 5 flips + 5 registrations (no scope creep). **Verify**: diffs match `nav-completion-contract` + `impact-protection-contract`.

## Phase 10 — Smoke / A11y / Screenshots (additive only — NEVER [P])

- [ ] T043 [Opus] Add the additive **Control block** to `app/tests/smoke/run.cjs`: add the 5 bases to the load list; assert count 113; 5 Control items are links (0 «قريبًا»); per-page shell + gate (messages Send; leads Convert/Assign/Save; tasks Save/Move; announcements Publish/Send); `FAKE` + no-mutation on the 4 write-pages; `noFile`; **timeConverter output updates on input + 0 external request + no gate**; `href="#"`=0/raw-keys=0/dead-buttons=0; no money/credential control. **Verify**: assertions added; smoke PASS.
- [ ] T044 [Opus] Confirm protected asserts BYTE-VERBATIM in `run.cjs`: payHit/tchPay/famPay/payFigure/child-view/finance-forbidden+no-mutation/settings-block/`FAKE`/Spec-032 form-completion + 026–031. **Verify**: `git diff run.cjs` = insertions + the Control block only; protected regexes absent from the diff.
- [ ] T045 Add a11y rows to `app/tests/a11y/run.cjs`: the 5 pages desktop AR-light + AR-dark + one EN + mobile-390 + open-form interaction rows (messages compose, leads Create-Request, tasks Create-task, announcements compose, time-converter controls). **Verify**: critical=0 serious=0.
- [ ] T046 Add screenshot frames to `app/tests/screenshots/capture.cjs`: messages inbox/thread/compose + Create-Group; leads list/detail/Create; tasks board/create; announcements list/compose/preview; time-converter **active conversion** — each desktop AR + select EN + dark + mobile-390. **Verify**: 0 console errors.
- [ ] T047 Run smoke: `npm run test:smoke`. **Verify**: PASS incl. the Control block.
- [ ] T048 Run a11y: `npm run test:a11y`. **Verify**: critical=0 serious=0.
- [ ] T049 Run screenshots: `node tests/screenshots/capture.cjs`; update `app/screenshots/REVIEW.md` with a Spec-034 section. **Verify**: 0 console errors; REVIEW updated; visually confirm each page shows real UI before the gate + the timeConverter output.

## Phase 11 — Docs / final audit

- [ ] T050 Update `app/README.md` with a Spec-034 section (5 Control pages; honest shells + gated finals; timeConverter native-`Intl` tool; Django mapping). **Verify**: section appended.
- [ ] T051 Update the `CLAUDE.md` active-feature pointer → "Spec 034 … IMPLEMENTED" **at implementation time only** (per repo convention); demote Spec 032/033 to History. **Verify**: history preserved.
- [ ] T052 Create `specs/034-…/implementation-status.md` (page-by-page result, count 113, nav flips, no-fake proof, timeConverter proof, impact proof, verdict). **Verify**: mirrors prior implementation-status format.
- [ ] T053 Run the full gate in `app/`: `npm run build` (113), `npm test`, `npm run test:smoke`, `npm run test:a11y`, `node tests/screenshots/capture.cjs`. **Verify**: all green.
- [ ] T054 [Opus] Clean-code guard (`$clean-code-guard`) over the changed source (incl. comments): grep for `type="file"`/`type="password"`/`<canvas`/`.pdf"`/`window.open`/`blob:`/salary|pay|amount|price/credential/api-key/webhook/token/otp/computed-total; scope creep; count drift; wrong nav flips; fake send/publish/persist; locale divergence; `href="#"`; role-law regression; mobile overflow. **Verify**: 0 real hits; reword any disclaimer comment that trips a grep.
- [ ] T055 [Opus] Test-guard (`$test-guard`): smoke diff = insertions + Control block (protected regexes not in the diff); a11y/screenshots additive; the timeConverter smoke actually changes an input and observes the output; no hardcoded pass hides a fake send/publish. **Verify**: additive-only; re-run tests after any fix.
- [ ] T056 Impact/diff review: `git diff --stat package.json` empty; `build-html.mjs` = 5 imports/entries; `nav.config.js` = 5 flips + FUTURE_ROUTES trim; `enhance.js` = 1 guarded IIFE; `i18n.js` = 2 imports + 2 deepMerge; teacher-portal ×16 + family + student + index + all existing `#page-body` byte-identical; count 113. **Verify (`impact-protection-contract`)**: all hold.
- [ ] T057 Final freeze check: 0 «قريبًا» in Control; 5 routes AR/EN live; no-fake/role-law green; a11y 0/0; screenshots 0 errors; count 113; `package.json`/dependency 0-diff. **Verify**: acceptance criteria met.
- [ ] T058 Deliver the final report; **stop — no commit, no push** (the watcher commits). **Verify**: HEAD unchanged; working tree holds the 034 changes uncommitted.

---

## Dependencies & execution order
- **Phase 1** (T001–T005) gates all. **Phase 2** (T006–T012) — module stubs + fixture/locale skeletons + registration + nav flips block every page task. **Phase 3** (T013–T017) front-loads ALL fixture data + ALL locale keys + CSS so the page modules become independent.
- **Phases 4–8** (the 5 pages) depend on T013/T014. The 4 write-page modules (messages/leads/tasks/announcements) touch only their own `pages/X.js` → **[P]-eligible**. **time-converter (Phase 8) is NOT [P]** (touches shared `enhance.js`).
- **Phase 9** (nav/count) after the pages build. **Phase 10** (smoke/a11y/screenshots) after all pages exist — **never [P]** (shared test files). **Phase 11** docs/audit/guards last.

## Parallel execution guidance
- **Safe [P]**: T019/T020 (messages.js), T023 (leads.js), T028 (tasks.js), T032 (announcements.js) — each an independent page file, all after T013/T014. Fixture-data drafting (T013) and locale drafting (T014) are single shared files → sequential, not [P].
- **Never [P]**: `i18n.js` (T009), `build-html.mjs` (T010), `nav.config.js` (T011), `enhance.js` (T037), `control-center.js`/`ctrl.js` (T013/T014, shared), `run.cjs`/`a11y`/`capture.cjs` (T043–T049), final audits (T054–T058).

## MVP / safest path
MVP = **Phase 1 → Phase 2 → Phase 3 → Phase 8 (time-converter)** — the timeConverter is the one fully-working page and exercises the riskiest decision (the `enhance.js` guarded init); proving it first de-risks the runtime touch. Then the 4 write-page shells (messages/leads/tasks/announcements) in parallel, then nav/count → smoke/a11y/screenshots → docs/freeze.

## Story → phase map
| Story | Phase | Pages |
|---|---|---|
| US1 Messages | 4 | messages |
| US2 Leads | 5 | leads |
| US3 Tasks | 6 | tasks |
| US4 Announcements | 7 | announcements |
| US5 Time Converter | 8 | time-converter |
| US6 Nav removal AR/EN | 9 | all |
| US7 No-fake | 10 | all write-pages |
| US8 Role-law green | 10–11 | all |

**Total tasks: 58** · Phases: 11 · [P]-eligible: 5 (T019, T020, T023, T028, T032) · Count target: **113** · New pages: **5 pairs (+10)**.
