# Implementation Plan: Control Center Pages Completion (Spec 034)

**Spec**: 034 · **Branch**: `feature/012-role-portal-foundation` · **Created**: 2026-07-10 · **Status**: PLANNED (no tasks, no implementation, no commit)
**Baseline**: Spec 032 committed (HEAD `a438ac2`, public HTML **103**); Spec 033 strategy + Spec 034 specify artifacts present; feature.json → 034; build green at 103; app source clean since `a438ac2` (smoke/a11y last green there, unchanged).

## Summary

Close the five Control-category «قريبًا» items by building **5 standalone frontend page pairs** — `messages`, `leads`, `tasks`, `announcements`, `time-converter` — and flipping their nav items `planned → implemented`. **Count 103 → 113 (+10).** Four pages are honest **shells** (real UI: lists/boards/detail/compose; every backend-write final is a `backendRequired` gate — no fake send/convert/save/move/publish, no persistence/mutation). The fifth, `time-converter`, is a **real working client-side tool** (native `Intl`, no gate, no dependency). Grounded in the legacy `management-{chat,new-requests,tickets,public-advertisement,time-convertor}` evidence; built entirely from existing primitives (pageHeader/summaryCards/cardGrid/filterBar/tabs/formDrawer/previewTemplate/confirmAction/field) — **no new component, no new dependency, no backend/engine.**

**The one runtime addition** (D17): `time-converter` needs client-side compute, which can only live in the shared runtime (`enhance.js`). It is added as a **page-scoped `initTimeConverter()` IIFE** mirroring the existing `initTabs`/`initWizard` inits — guarded by the presence of the converter DOM (inert on all other 108 pages), using native `Intl.DateTimeFormat({ timeZone })`, with **no new global `data-*` dispatch hook, no storage key, no dependency**. This is the single justified touch to a shared file; it preserves the closed-hook spirit (no new declarative cross-page hook) while enabling a genuinely-working tool.

## Technical Context

- **Stack**: static HTML-first; native ES modules; per-page pre-rendered `public/*.html` (AR RTL + `.en` LTR); enhancement-only via the closed `data-*` set in `enhance.js`; no CDN/framework/TS/SPA/chart lib; fixtures only.
- **Page render**: each base is a `renderX()` module returning baked HTML, registered in `scripts/build-html.mjs` PAGES (`{ base, activeId, titleKey, crumbKey, render }`) + rendered in both langs by the existing loop.
- **Primitives reused**: `pageHeader({titleKey,subKey,primary,secondary,summaryHTML})`, `summaryCards(items,{cols})`, `cardGrid(items,{cols,id})`, `filterBar({targetId,searchKey,selects})`, `tabs({group,items,panels})`, `previewTemplate(id,{...})` + `formDrawer(id,{titleKey,fields,ctaKey,reasonKey})` + `sheetRow`, `field({labelKey,name,type,options})` + `optsFrom`, `confirmAction`, `chip`, `button`, `states.emptyBox`.
- **Interactivity**: existing hooks `data-drawer`/`data-confirm`/`data-disabled-reason`/`data-tab`/`data-filter`/`data-filter-set` (no new hook) + the one page-scoped `initTimeConverter` IIFE.
- **Fixtures/locales**: one new `fixtures/control-center.js` (authored, no PII/pay/secret) + one new locale pair `ar.ctrl.js`/`en.ctrl.js` (registered in `i18n.js`, mirrored).
- **Persistence/engine**: NONE. Lists/boards/threads are authored display; every write final = gate; timeConverter computes locally (no storage, no network).

## Constitution Check (standing-law gates — all stay green)

| Gate | 034 compliance |
|---|---|
| Static HTML-first · closed `data-*` set | ✅ pages baked; reuse existing hooks; the ONE runtime add is a guarded page-scoped IIFE (no new global `data-*` dispatch) |
| No new dependency/engine | ✅ native `Intl` only; `package.json` 0-diff; no websocket/CRM/task/notification/upload engine |
| No `type=file`/`type=password`/secret | ✅ attachments (chat image, ad media) = gates; no credential control |
| No fake send/convert/save/move/publish/deliver | ✅ every write = `data-disabled-reason`/`data-confirm`→backendRequired; no-mutation |
| No fake-success wording | ✅ `FAKE` guard extends to the 5 pages |
| No money/pay figure · no computed Total | ✅ leads/tasks KPIs = authored literals; no arithmetic; Control is non-finance |
| `href="#"`=0 / raw-keys=0 / dead-buttons=0 | ✅ every nav item a real route; every action gives feedback |
| Teacher pay-free / family zero-pay / student child-view / finance / settings invariants | ✅ Control pages add no pay/role/finance token; protected regexes byte-verbatim |
| Count 113 · package.json 0-diff | ✅ +10 pages, no dependency |

**No gate violation.** No `[NEEDS CLARIFICATION]` remains (D1–D31 in `research.md`).

## Architecture (per page)

- **messages.html** — a two-pane shell: inbox list (authored conversations: name/role/unread/last-time, via `filterBar` + a list) + a default open thread panel (authored bubbles) inline; each conversation row is `data-drawer="msg-<id>"` → read-only thread sheet; a compose box (`message` textarea + gated attachment) with **Send/Reply = gate**; **Create-Group** (`msg-group`) + **Add-Member** (`msg-member`) `formDrawer`s (image = inline gate).
- **leads.html** — `pageHeader` + `summaryCards` (authored KPI literals) + `filterBar` (9 status + source + search) + a lead list (`#`/Date/Parent/Email/Phone/Status/Actions) + a lead-detail `data-drawer` (notes-log `sheetRow`s + **Add-Notes** form + **Change-Status** form) + a **Create-Request** `formDrawer` (~19 grounded fields, no money). Convert/Assign/Save/Update = gates.
- **tasks.html** — a KPI strip (`summaryCards`, authored) + a display-only **board** (status columns Pending/In-progress/Completed/Overdue, each a `cardGrid` of task cards; **no drag**) + a per-staff summary table (authored; "Average" = literal) + a **Create/Edit-task** `formDrawer` + **Add-Section** `formDrawer`. Save/Assign/Move/Add-Section = gates.
- **announcements.html** — `pageHeader` + an announcements list (`cardGrid`, audience/channel/status chips) + a **compose** form section (message textarea, channel toggles, private checkbox, expire date, audience multi-selects, country/hours/language selects, **media = gate**) + a **preview** card + a recipient display. Publish/Send + WhatsApp/channel = gates.
- **time-converter.html** — `tabs` (Time Zone | Changes): the **converter** panel (source-zone select, target-zone select, date input, time input, live output + common-zone quick chips) driven by `initTimeConverter` (native `Intl`, **no gate**) + an authored **DST Changes** board (zone/offset/next-change, display-only).

## Project structure (files this feature will touch)

```
app/src/js/pages/{messages,leads,tasks,announcements,time-converter}.js   (NEW — 5 render modules)
app/src/js/fixtures/control-center.js                                     (NEW — authored data; no PII/pay/secret)
app/src/locales/{ar,en}.ctrl.js                                           (NEW — mirrored control copy)
app/src/js/i18n.js                                                        (MODIFY — +2 imports +2 deepMerge for ctrl)
app/src/js/nav.config.js                                                  (MODIFY — 5 planned→implemented + route; drop 4 FUTURE_ROUTES)
app/scripts/build-html.mjs                                                (MODIFY — +5 render imports +5 PAGES entries)
app/src/js/enhance.js                                                     (MODIFY — +1 page-scoped initTimeConverter IIFE; NO new global hook)
app/src/styles/app.css                                                    (MODIFY — additive only: messages two-pane, task board columns, tz grid; reuse existing tokens)
app/tests/{smoke/run.cjs,a11y/run.cjs,screenshots/capture.cjs}           (MODIFY — additive coverage)
app/screenshots/REVIEW.md · README.md · CLAUDE.md                        (MODIFY — docs)
specs/034-control-center-pages/*                                          (plan artifacts)
```

**Forbidden**: `package.json`, dependency, backend/API/auth/database, websocket/CRM/task/notification/upload engine, new component/CSS framework, new global `data-*` hook or storage key, finance/pay pages, teacher/family/student portal pages, any new page beyond the 5.

## Complexity & risk

| Risk | Mitigation |
|---|---|
| 5 new page templates (largest additive surface since Spec 025) | uniform ops-page precedent (pageHeader + boards + drawers); one shared fixture + one locale pair |
| **timeConverter needs runtime → enhance.js touch** | page-scoped `initTimeConverter` IIFE (precedent `initTabs`/`initWizard`), guarded → inert elsewhere; NO new global `data-*` dispatch; native `Intl`; static-board fallback if the init is rejected |
| tasks thin legacy evidence (board/create JS-driven) | authored safe fields grounded in the captured KPI/per-staff columns; recorded as a gap |
| Fake-write leak (send/convert/save/publish) | every final = `data-disabled-reason`/`data-confirm`; smoke `FAKE` + no-mutation snapshot per write-page |
| type=file leak (chat image, ad media) | gated affordances; smoke `noFile` DOM check |
| Count creep | 113 held; `page-count-contract`; build-verify |
| Protected-assert drift | smoke additive only; 009/021–032 + Spec-032 form-completion regexes byte-verbatim |
| Nav-flip touches shared sidebar on all pages | same pattern as Spec 025/031 flips; existing `#page-body` bytes unchanged; only sidebar anchors change |

## Phase outputs
- **Phase 0** → `research.md` (D1–D31 resolved).
- **Phase 1** → `data-model.md` (per-page fixture/field specs), `contracts/` (17), `quickstart.md`, CLAUDE.md pointer (deferred to implement per repo convention).
- **Phase 2 (tasks)** → NOT generated here (`/speckit.tasks` next).

## Progress
- [x] Baseline gate green (count 103, feature.json→034, build green, app clean since 032)
- [x] Targeted visual grounding (legacy + current patterns) complete
- [x] Constitution check (no violation; the enhance.js touch is a guarded page-scoped init, not a new hook)
- [x] Phase 0 research (D1–D31)
- [x] Phase 1 data-model + contracts + quickstart
- [ ] Phase 2 tasks (next command)
