# Data Model — Spec 025 Teacher Internal Pages

**Date**: 2026-07-07. Static authored fixtures only — no live data, no API objects, no persistence. Entities below are the page/fixture/gate/nav constructs the implementation manipulates, plus the explicit not-modeled boundary.

## Entities

### 1. Teacher internal page
- **What**: one of 7 portal-shell pages (`shell: 'portal', role: 'teacher'`, persona `data.t.sara`).
- **Fields**: `base` (teacher-<page>), `activeId` (nav id), `titleKey` (`prt.title.tch<Page>`), `render` (renderTeacher<Page>).
- **Output**: AR (RTL) + EN (LTR) `#page-body`; nav via portal-shell (sidebar + mobile drawer).
- **Validation**: loads in both langs; no `href="#"`/dead button/raw key; `payHit` false; mobile-390 clean.

### 2. Teacher capability (T#)
- **What**: the legacy capability a page realizes (schedule=T14, students=T8, outcomes=T22/T3, tasks=T11/T16, reports=T9+T20/T21, profile=T23, library=T15).
- **Validation**: every page cites its T# + evidence in `teacher-legacy-coverage.md`; excluded pay surfaces (T2/T17/T18/T19) never rendered.

### 3. TEACHER_PREVIEW fixture slice (extended, static)
- **What**: retained authored data per page — followUps (out15/out4), recentSessions (out1/out11), tasks (tk1/tk2), materials (tm1/tm2/tm3), rubric dims, certificate; extended with static rows for schedule sessions, roster, outcome states, report summaries, profile fields, library resources.
- **Fields**: authored strings + real outcome refs; NO numbers implying computation; NO pay data.
- **Validation**: every value authored; zero forbidden pay tokens; no computed score/chart; no fake live/chat/upload state.

### 4. Honest gate
- **What**: a labeled backendRequired/planned non-interactive control (`gateNote`/`guidePanel`/`plannedCard`).
- **Instances**: schedule live-room + availability-edit; outcomes save/submit; tasks complete/assign; reports export; profile photo/save/password; library upload/download; students contact (if surfaced).
- **Validation**: non-anchor OR real link to a real page; no fake behavior; `aria-disabled`/labeled; zero `href="#"`.

### 5. Nav item (ROLE_NAV.teacher)
- **What**: the 8 teacher nav entries; 7 flip planned→implemented.
- **Fields**: `id`, `labelKey` (`prt.nav.tch.*`), `icon`, `page`, `status: 'implemented'`.
- **Validation**: 8 implemented self-links; `plannedNavAnchors===0`; `navListAnchors===8`; `aria-current` on active; NO chat/finance/pay item.

### 6. Performance anchor (teacher-portal)
- **What**: the single teacher-home body anchor; repoints `teacher-performance` → `teacher-reports`.
- **Validation**: teacher-portal `bodyAnchors===1`, target `teacher-reports(.en).html`; smoke assert re-pinned; teacher home no longer routes into the admin shell.

## Not modeled (forbidden)

- teacher salary/pay/compensation/fine data or figures (T2/T17/T18/T19 excluded)
- fake live-classroom / meeting / camera-mic state
- fake chat threads/messages/send/unread
- fake notification counts
- fake file upload/download/open/delete/sync state
- computed score/rank/percentile/chart series
- any new API-shaped object, storage key, or persistence

## Relationships

- A **page** realizes one/more **T#** and renders one/more **fixture slices** + **honest gates**; its **nav item** flips to implemented.
- The **performance anchor** points to the reports **page** (teacher-owned, pay-free) — not the admin board.
- **Honest gates** never trigger persistence; **fixtures** never carry pay/computed data.
