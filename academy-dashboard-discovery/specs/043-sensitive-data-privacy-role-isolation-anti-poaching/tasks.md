# Tasks: Sensitive Data Privacy, Role Isolation & Anti-Poaching (Spec 043)

**Branch**: `feature/012-role-portal-foundation` | **Baseline HEAD**: `3b6a5a3` (plan + plan-consistency correction
committed) | **Wave**: 0 (foundation; 044 parallel) | **Ponytail**: lite (subordinate to spec/contracts/evidence/
protected-tests/Targeted-Visual-Grounding — never simplifies away a privacy/a11y/test/mutation requirement).

These tasks implement Spec 043's **own Wave-0 implement phase**: 3 changed logical surfaces (`staff` RBAC ·
`teacher` policy · `student-profile` child-view) → **6 localized page bodies** (× AR/EN). Every outcome folds into
an existing host: **0 new page/route/nav-item/dependency/component/hook/storage-key**. Real auth/RBAC/sessions/
secrets/delivery stay **FUTURE_BACKEND** (honest gates, never faked). Counts frozen **115 · 57 · 50 · 24/25/1 ·
49/0/1 · `FUTURE_ROUTES {}` · sole lock `classSalaryReport` · gallery pair**.

> **Do not commit / push / merge / pull / rebase / branch / stash / reset / checkout / clean / amend.** The watcher
> owns commits. Skip optional `before_tasks`/`after_tasks` commit hooks. **This file is the task list only —
> `/speckit.implement` is NOT run here.**

All line numbers were **re-grounded against HEAD `3b6a5a3`** (source + test grounding agents, this tasks phase) —
not copied from history. The implement phase **re-grounds again** before each path-specific edit (line numbers can
drift once earlier edits land).

---

## Binding legend (EVERY task inherits these — a task that violates one is a STOP, not a workaround)

- zero real PII · zero guardian/student contact on teacher surfaces · zero unnecessary teacher locality/country ·
  zero Left/Acquired teacher attribution · teacher **pay-free globally** · family zero-pay · child-view is **not**
  an adult account · zero `type=password` · zero `type=file` · zero credential value slot · zero live WhatsApp
  invite URL · zero minor identity in URLs · zero fake save/success/connected/authenticated/authorized state ·
  **hiding a link is not authorization** · real auth/RBAC/persistence/delivery = FUTURE_BACKEND · **no new
  dependency/page/route/nav-item/component/hook/storage-key** · existing protected assertions remain byte-verbatim
  **except the declared two-line child-view supersession** (`smoke:1971`/`:2082`).

## Task format

`- [ ] T### [P?] [US#?] Action — exact path — measurable done-condition`

`[P]` = may run in parallel (writes a **different file** or a genuinely isolated copy; never two `[P]` on the same
file). Setup/foundational/final-audit/mutation tasks omit `[US#]`; user-story tasks carry the correct `[US#]`.

## Single-writer chains (binding — no two tasks in a chain are `[P]`)

- **`app/tests/smoke/run.cjs`** — ONE serial chain, in this exact order (each depends on the previous):
  **T021 → T024 → T027 → T028 → T029 → T030 → T031 → T032 → T033 → T034 → T035 → T036 → T037.**
  Additive `{ … }` guard blocks are inserted **after `smoke:2899`** (close of the route-freeze block) and **before
  `smoke:2901`** (the `if (fails.length)` summary); each block uses `ok(…)` so failures accumulate into `fails[]`.
  Body/portal censuses read built HTML from `public/*.html` via `fs`; source censuses read `src/**` via `fs`
  (the ROUTES_50 / route-freeze blocks are the precedent pattern).
- **`app/src/js/pages/teacher.js`** — one writer (T025).
- **`app/src/js/fixtures/portal.js`** + **`app/src/js/pages/student-profile.js`** — both written by the single
  atomic child-view task **T020** (portal.js −1 fixture line; student-profile.js **header comment only**).
- **`staff-management.js`**, **`teacher-management.js`**, and each of the four locale files — one writer each.
- **`app/tests/a11y/run.cjs`**, **`app/tests/screenshots/capture.cjs`**, **`app/screenshots/REVIEW.md`** — one
  writer each; `[P]` with each other.

## Application-source allowlist (implementation tasks may target ONLY these)

`src/js/fixtures/portal.js` · `src/js/fixtures/staff-management.js` · `src/js/fixtures/teacher-management.js` ·
`src/js/pages/teacher.js` · `src/js/pages/student-profile.js` (**header comment only** — no render logic) ·
`src/locales/ar.adm.js` · `src/locales/en.adm.js` · `src/locales/ar.trn.js` · `src/locales/en.trn.js`
(**9 source files**). **Test/review allowlist**: `tests/smoke/run.cjs` · `tests/a11y/run.cjs` ·
`tests/screenshots/capture.cjs` · `screenshots/REVIEW.md`. **Docs**: `specs/043-…/implementation-status.md` +
the CLAUDE.md SPECKIT marker "Active feature" line. All paths are under `academy-dashboard-discovery/app/`
(docs under `academy-dashboard-discovery/specs/043-…/`).

## Forbidden / expected 0-diff (STOP if any must change)

`src/js/nav.config.js` · `src/js/enhance.js` · `src/js/components/sidebar.js` · `src/js/i18n.js` ·
`scripts/build-html.mjs` · `package.json` · `package-lock.json` · `src/js/pages/staff.js` ·
`src/js/pages/family-profile.js` · `src/js/pages/teacher-profile.js` ·
all `src/js/components/*` · `src/styles/app.css` · Settings/certificates implementation source · every unrelated
fixture/page/locale · every new backend/API/payment/integration/auth file. **`src/js/pages/student-profile.js` is
NOT forbidden** — it is allowlisted for a **header-comment-only** correction; its executable code (imports/render
onward) must stay byte-identical (guarded by T056).

---

## Phase 1 — Preflight & grounding  (BLOCKS all implementation; no app edit until every Phase-1 task is green)

- [X] **T001** [P] Resolve + record the actual branch and full HEAD (`git rev-parse --abbrev-ref HEAD` /
  `git rev-parse HEAD`) and prove a clean committed tree (`git status --porcelain` empty). Confirm the five required
  commits are present: spec suite `9694527`, dependency/ownership correction `a185494`, tally correction `cd56aa0`,
  plan `48a344b`, plan-consistency correction `3b6a5a3`. Confirm **no** `tasks.md` conflict-target/`implementation-status.md`
  pre-exists beyond this file. **Done**: branch/HEAD echoed; porcelain empty; 5 commits found.

  **Narrow supersession (2026-07-17)**: `implementation-status.md` was already tracked by the accepted
  `690186e` bootstrap/partial-implementation commit. Its pre-existing visual-grounding notes are retained as
  evidence only; they do not mark implementation work complete. The original “no … implementation-status.md
  pre-exists” premise is superseded solely to permit this evidence record. The accepted committed lineage and
  clean-tree proof are recorded in `implementation-status.md` and the requirements checklist.
- [X] **T002** [P] Verify frozen counts from source (no build needed): PAGES = **57** (`scripts/build-html.mjs`),
  admin menu = **50** `item({…})` (`src/js/nav.config.js`), route split = **24 deep / 25 plain / 1 disabled**,
  status = **49 impl / 0 planned / 1 disabled**, `FUTURE_ROUTES` = **{}**, `classSalaryReport` = sole `disabled`
  lock, gallery orphan pair present. **Done**: each value matches; any mismatch = STOP.
- [X] **T003** `npm run build` — confirm **byte-identical** rebuild: `git status --porcelain` empty after build;
  `ls public/*.html | wc -l` = **115**. **Done**: 115 HTML, 0 tracked changes.
- [X] **T004** Baseline `npm run test:smoke` → **PASS** (exit 0). If a single deep-link/hash-precedence assertion
  fails on a byte-identical baseline, re-run to distinguish a Playwright timing flake from a real red; a persistent
  red on unrelated code = STOP-and-report (do not author around a red baseline). **Done**: smoke exit 0 recorded.
- [X] **T005** Baseline `npm run test:a11y` → **critical=0 serious=0**, exit 0 (log tail `[a11y] critical=0
  serious=0`). Run **after** T004 (both bind port 4178 — never concurrent). **Done**: exit 0, 0/0 recorded.
- [X] **T006** Baseline `npm run screenshots` → **0 console errors** (R-3 gate exit 0). **Done**: exit 0, 0
  console errors recorded.
- [X] **T007** [P] Ownership machine-check: `node` parser over `owned-row-reconciliation.md` implementation table →
  **17 rows · 17 unique capIds · 0 missing · 0 unexpected · 0 duplicate · class 2/12/3** (Class-1 = {C12-09, C12-13};
  Class-3 = {C02-04, C02-05, C12-01}). **Done**: exact tally; any drift = STOP (ownership no longer parses).
- [X] **T008** [P] Mutation machine-check: `node` parser over `contracts/mutation-protocol-plan.md` table →
  **12 rows · 12 unique IDs · {MUT-1…MUT-11, MUT-TP} · 0 missing/unexpected/duplicate**; MUT-11→G13, MUT-TP→
  teacher-policy. **Done**: exact set; any drift = STOP.
- [X] **T009** [P] Re-ground the **9 source files** (`grep -n`): `portal.js` STUDENT vs FAMILY `profile.gates`
  (passwordChange lines) · **`student-profile.js` the header comment (`:1-4`) — the exact now-false "three…password
  change" text + the first `import`/render-function line (the byte-identical boundary)** · `staff-management.js`
  `PERM_GROUPS` bounds + group shape · `staff.js` `permDrawer` generic map · `teacher-management.js` end + 0 pay
  tokens · `teacher.js` `availabilityDrawer`/`pickers`/overview panel/the `data-drawer="trn-availability"` button
  pattern/the `previewTemplate`+`sheetRow` import · `ar/en.adm.js` `perm` block + shared `perm.note` · `ar/en.trn.js`
  insertion point + 0 pay keys. **Done**: a current line map recorded; do NOT reuse historical numbers blindly.
- [X] **T010** [P] Re-ground the **4 test files** (`grep -n`): `smoke:1971`/`:2082` (student-profile) + the
  neighbours `:2007`/`:2020`/`:2083`/`:2084` (family/teacher — MUST NOT touch) · PAY28 `:748` · tchPay/payHit ·
  realPii `:1287` · g32 `:1406-1412` · ROUTES_50 `:2608` · additive insertion region (after `:2899`, before the
  summary) · `a11y` MATRIX + R-2 gate `:393` · `capture` MATRIX + R-3 gate `:555` · `app/screenshots/REVIEW.md`.
  **Done**: a current line map recorded.
- [X] **T011** Capture the non-destructive **`#page-body` md5 baseline** for all 115 built pages to the scratchpad
  (after T003; never `stash`/`reset`/`checkout`). **Done**: a 115-row md5 snapshot file exists (the before/after
  impact basis, `contracts/impact-protection-plan.md`).
- [X] **T012** [P] Snapshot the **allowlist + forbidden-file** hashes (git-tracked md5 of every file in both lists)
  to the scratchpad — the 0-diff basis for T056. **Done**: hash list recorded.

---

## Phase 2 — Foundational registries & locale preparation  (data prerequisites; no renderer/test until complete)

Parallelism: the two fixtures write different files → `[P]`; the four locale files write different files → `[P]`;
locale **parity** verification runs only after **both** language edits of each namespace. No renderer/census task
(T023/T025/T027) starts until its registry + locale prerequisites are green.

- [X] **T013** [P] `src/js/fixtures/staff-management.js` — append ONE group to `PERM_GROUPS` (after the last group,
  before the closing `]` ≈ L44): `{ labelKey:'adm.staff.perm.g.parents', items:[ {k:'viewPhone',granted:false},
  {k:'viewEmail',granted:false}, {k:'exportContacts',granted:false}, {k:'approvedUse',granted:false},
  {k:'revealMasked',granted:false} ] }`. No `STAFF_ROLES`/`STAFF`/`STAFF_ACTIVITY` change. **Done**: exactly one
  new group, exactly 5 items, **every `granted:false`**.
- [X] **T014** [P] `src/js/fixtures/teacher-management.js` — append `export const TEACHER_CAPABILITY_POLICY =
  { academic:[chat, library, editSchedule, editClass], comm:[coursesUpdate, classReminders, classUpdates] }` (each
  academic row `{k, status:<authored categorical label key>}`; each comm row `{k, channels:['whatsapp','email']}`).
  **NO salary row; 0 pay/rate/currency/figure token; 0 value slot; 0 toggle; 0 contact.** **Done**: registry present,
  4 academic + 3 comm rows, salary excluded, 0 pay token.
- [X] **T015** [P] `src/locales/ar.adm.js` — inside the existing `perm` block: add `g.parents` (group label) +
  `i.viewPhone`/`i.viewEmail`/`i.exportContacts`/`i.approvedUse`/`i.revealMasked`. Reuse existing `perm.note`/
  `granted`/`notGranted`/`save`/`saveReason` verbatim (no new state key). **Done**: 6 mirrored AR keys added, no
  new note key.
- [X] **T016** [P] `src/locales/en.adm.js` — the same 6 keys, English strings, mirrored structure. **Done**: 6 EN
  keys added; key-set matches ar.adm.js.
- [X] **T017** [P] `src/locales/ar.trn.js` — add the `trn.policy.*` block (after `availEdit`): `title`,
  `academicTitle`, `commTitle`, `cap.{chat,library,editSchedule,editClass}`, notification event labels +
  `ch.{whatsapp,email}`, `granted`/`notGranted`, `note` (structure-only; enforcement + delivery are backend),
  gate `open`/`reason`. **NO salary/pay/rate key.** **Done**: full AR block added, 0 pay key.
- [X] **T018** [P] `src/locales/en.trn.js` — the same `trn.policy.*` block, English strings, mirrored. **Done**:
  EN block added; key-set matches ar.trn.js.
- [X] **T019** Locale parity + raw-key check (after T015–T018): `adm` ar↔en and `trn` ar↔en key-sets **identical
  (0 divergence)**; `i18n.js` **0-diff** (both namespaces already registered). **Done**: 0 divergence; no new
  locale module.

---

## Phase 3 — User Story 2: Child-view is not an adult account  [US2, P1]

- [X] **T020** [US2] **Atomic child-view source edit — TWO files** (`src/js/fixtures/portal.js` +
  `src/js/pages/student-profile.js`): **(a)** in `portal.js`, **delete the `passwordChange` entry** (≈ L323) from
  `STUDENT_PAGES.profile.gates`, leaving `photoUpload` + `profileSave` (2 gates); **(b)** in `student-profile.js`,
  correct **only the header comment** (`:1-4`) from "…EXACTLY **three** backendRequired gates (photo upload ·
  profile save · **password change** …)" to "…EXACTLY **two** backendRequired gates (photo upload · profile save
  …)"; **(c)** keep `student-profile.js`'s functional renderer code (from the first `import` / the render function
  onward) **byte-verbatim**; **(d)** keep `FAMILY_PAGES.profile.gates` passwordChange (≈ L380) and the inline teacher
  gates `teacher-profile.js:82-85` (password ≈ L85) **byte-verbatim** (separate arrays — confirmed). **Done (all
  must hold)**: student gate array = **2** entries; the `student-profile.js` header comment says **two** / lists
  only photo/save; **no `password` token remains** in that child header comment; the `student-profile.js` executable
  code (first `import` onward) is **byte-identical**; family + teacher gates untouched.
- [X] **T021** [US2] `tests/smoke/run.cjs` — the **declared two-line supersession** (guard **G5**, SMOKE WRITER #1): `:1971`
  `plannedBackend === 3` → `=== 2` (comment "photo/save/password" → "photo/save"); `:2082` `'student-profile': 3`
  → `'student-profile': 2`. **Do NOT touch** family `:2007`/`:2083` or teacher `:2020`/`:2084` (byte-verbatim).
  **Done**: exactly 2 lines changed; the 4 neighbour lines byte-identical (diff proves it).
- [X] **T022** [US2] Build + verify (after T020, T021): `student-profile.html` and `.en` each render **exactly 2**
  gate cards (photo/save, **no password affordance, 0 `type=password`, 0 input**); run focused smoke for the
  student-profile block → PASS. **Done**: 2 gate cards AR/EN; focused smoke green. *(MUT-3 proof is T044.)*

---

## Phase 4 — User Story 5: Parent-contact permissions deny-by-default  [US5, P2]

*(Registry data + locales landed in Phase 2: T013 + T015/T016.)*

- [X] **T023** [US5] Verify `src/js/pages/staff.js` = **0-diff** (permDrawer maps `PERM_GROUPS` generically); build
  + DOM-verify `staff.html` and `.en`: the RBAC drawer (`data-drawer="st-perm"`) renders the **5 parent-contact
  rows**, each shown as "not allowed" (`adm.staff.perm.notGranted`), **0 value slot / 0 input / 0 toggle**, no raw
  key. **Done**: 5 rendered rows AR/EN, all "not allowed", staff.js 0-diff.
- [X] **T024** [US5] `tests/smoke/run.cjs` — parent-contact census (SMOKE WRITER #2, after T021):
  **G3 (teacher-unreachable)** — no teacher-facing file (`teacher*.js`, `teacher-*` fixtures) references
  `adm.staff.perm.g.parents`/`i.viewPhone`/… (source grep) **and** the `parents` group renders on **0** built
  teacher body (grep `public/teacher*.html`); **G11 (deny-by-default)** — the `parents` group's 5 items are all
  `granted:false` (source census). Mirrors the ROUTES_50 closed-register pattern. **Done**: G3 + G11 assertions
  added, both green. *(MUT-2 = T043, MUT-6 = T047.)*

---

## Phase 5 — User Story 1: Teacher anti-poaching & policy preview  [US1, P1]

*(Registry data + locales landed in Phase 2: T014 + T017/T018.)*

- [X] **T025** [US1] `src/js/pages/teacher.js` — add `capabilityPolicyDrawer('trn-policy', …)` mirroring
  `availabilityDrawer()` (≈ L131-136): `previewTemplate('trn-policy', { titleKey:'trn.policy.title', headIcon:'lock',
  … bodyHTML })` where `bodyHTML` = an **Academic capabilities** subhead + 4 `sheetRow()` capability rows + a
  **Communication & Notifications** subhead + the 3 non-pay notification rows (channel labels) + the structure-only
  `trn.policy.note` + a trailing inline `data-disabled-reason` gate. Append it to the `pickers` const (≈ L193-196).
  Add ONE `data-drawer="trn-policy"` trigger button inside `overviewPanel()` (≈ L76-101), cloning the existing
  `data-drawer="trn-availability"` button pattern (≈ L185). `previewTemplate`/`sheetRow` already imported (L21).
  **No new hook/component/namespace; `enhance.js`/`i18n.js` 0-diff.** **Done**: drawer + trigger added; generic
  `openSheet` dispatch; 0 new hook.
- [X] **T026** [US1] Build + DOM-verify `teacher.html` and `.en`: the overview panel shows the `trn-policy` trigger;
  the drawer renders the academic subhead + 4 rows (chat/library/editSchedule/editClass) and the communication
  subhead + 3 rows (coursesUpdate/classReminders/classUpdates × whatsapp/email); **0 Salary row · 0 pay/rate/
  currency token · 0 `<input>`/value slot · 0 toggle claiming enforcement · 0 guardian/student contact · 0
  locality**. **Done**: both subheads + 7 rows render AR/EN; every forbidden token count = 0.
- [X] **T027** [US1] `tests/smoke/run.cjs` — teacher-policy census (SMOKE WRITER #3, after T024), guarded
  `if (page === 'teacher')`: built teacher body has **0 pay token** (PAY28 double-cover), **0 `<input>`/value slot/
  toggle** in the `trn-policy` template, academic + communication subheads present, 4 capability rows present, **0
  `salary`/`راتب` token**, **0 guardian-contact token**. Insertion sibling: the teacher-portal pay block
  (`smoke:2096-2100`). **Done**: census added, green. *(MUT-TP = T053.)*

---

## Phase 6 — User Story 3: Secrets and credentials never render  [US3, P1]

No Settings/certificates source change in Spec 043 — these are guard/freeze tasks only.

- [X] **T028** [US3] `tests/smoke/run.cjs` — **G7 + G8 (strengthening)**, SMOKE WRITER #4 (after T027): broaden the
  settings-scoped realPii regex (`:1287`) to the full corpus token set — `01015264856│أحمد محمد│chat.whatsapp.com│
  201508604112│afaaqonline1│01154859653│441200480244│201278910727│eslammekky│ui-avatars│abod11│msadeqx9│
  aboda155502│alaashapan1996` — and run it as a **sitewide per-page census (= 0 on every built page)**, including a
  standalone `chat.whatsapp.com = 0` (live WhatsApp invite) census. The existing settings assertion (`:1312`) stays
  a byte-verbatim subset. False-positive exclusion: the `www.w3.org` SVG namespace is not PII. **Done**: sitewide
  real-PII + WhatsApp-URL censuses added, both green; settings subset unchanged. *(MUT-4 = T045.)*
- [X] **T029** [US3] `tests/smoke/run.cjs` — **G10 + G9 (additive/verify)**, SMOKE WRITER #5 (after T028): assert
  the **g32** credential census (`:1406-1412`, `pw===0 && file===0 && canvas===0`, sitewide) is present and
  **unrelaxed**, add an additive raw-PAN-digit absence census, and assert the **external-host guard** (`:176`,
  `ext.length === 0`) is present and unrelaxed (`www.w3.org` SVG ns allowed). **Done**: g32 + external guards
  confirmed strong; PAN census added; all green. *(MUT-5 = T046.)*

---

## Phase 7 — User Story 4: A directly-fetched page leaks nothing  [US4, P1]

Honest limitation (recorded, not faked): static pages are **world-readable**; the frontend guarantee is
**data-absence**, not link-hiding — real route authorization is FUTURE_BACKEND.

- [X] **T030** [US4] `tests/smoke/run.cjs` — **G6 no-admin-link census**, SMOKE WRITER #6 (after T029): every
  portal `a[href]` resolves to **0** href targeting any of the 57 admin bases (dashboard/staff/finance/…). Explicit
  allowlist: `portals.html → dashboard.html`; `teacher-performance.html` is the sanctioned exempt board (not a
  portal page). **Done**: portal→admin census added, green. *(MUT-9 = T050.)*
- [X] **T031** [US4] `tests/smoke/run.cjs` — **G1 + G2 teacher-contact census**, SMOKE WRITER #7 (after T030):
  **G1** rendered `teacher-*.html` + admin `teacher.html` bodies contain **0** guardian/student contact VALUE (phone
  regex `\b\d{10,}\b`, `@`-address, guardian-contact tokens), **excluding** the teacher's OWN self-contact on
  `teacher-profile` (`sara@academy.example`); **G2** the teacher-roster fixture source (`fixtures/teachers.js`,
  `teacher-management.js`) has **0** `phone`/`email`/`address`/`country`/`locality` field and **0** Left/Acquired
  attribution (subject/level/course learning fields allowed). **Done**: G1 body + G2 source censuses added, green.
  *(MUT-1 = T042.)*
- [X] **T032** [US4] `tests/smoke/run.cjs` — **G4 active-family-only census**, SMOKE WRITER #8 (after T031):
  guardian-facing `family-*` bodies contain **0** non-fam1 guardian name (`أم جوري` fam2 … fam8); no cross-family
  persona; no admin data baked into any portal body. Admin `families.html` (not a portal) may show all 8. **Done**:
  family-isolation census added, green. *(MUT-8 = T049.)*

---

## Phase 8 — User Story 6: Certificate delivery cannot expose a minor  [US6, P2]

Additive test tasks only — **no certificate source redesign**.

- [X] **T033** [US6] `tests/smoke/run.cjs` — **G12 no certificate group delivery**, SMOKE WRITER #9 (after T032):
  the `certificates.html` body has **no group-delivery option / no group-channel option / no recipient picker
  implying real delivery**; the honest `data-disabled-reason` gate is allowed. **Done**: cert-delivery census
  added, green. *(MUT-7 = T048.)*
- [X] **T034** [US6] `tests/smoke/run.cjs` — **G13 no minor identity in query strings**, SMOKE WRITER #10 (after
  T033): every built-page `a[href]` carries **0** `student_name=` (or any minor-identifying query param); in-page
  `#view=`/`#child=` hashes remain allowed. **Done**: query-string census added, green. *(MUT-11 = T052.)*

---

## Phase 9 — G14 honest wording + Class-(2) existing-safe freeze + smoke consolidation

- [X] **T035** `tests/smoke/run.cjs` — **G14 honest-wording census**, SMOKE WRITER #11 (after T034), scoped to
  **gate/authz context only** (`data-disabled-reason`/gate copy + success-toast copy + current-state chips + authz/
  enforcement notes — **NOT** arbitrary body text): **0** occurrence of `authorized│verified│محمي│مسجّل الدخول`
  **claiming a real enforced session**. **Narrow exception (preserve):** the authored **past-tense** staff
  activity-log EVENT value `login:'signed in'` (`en.adm.js`, rendered in `staff.html`'s activity drawer) is ALLOWED
  — it is a historical audit entry, not an authz claim; likewise the `backendRequired` honest vocabulary and "Login"
  as an activity category. **Never** implement a naive sitewide `"signed in"`/`"logged in"` body ban (it would RED
  the baseline staff activity log). **Done**: context-scoped census added; forbidden-claim = 0; the activity-log
  value stays green. *(MUT-10 = T051.)*
- [X] **T036** `tests/smoke/run.cjs` — **Class-(2) existing-safe freeze** censuses, SMOKE WRITER #12 (after T035),
  each additive with a mutation or the freeze: **DST-column-absent** (`time-converter.html`: table has no "Affected
  Accounts" column) · **no-invented-login-UI** (no `<form action=` login on any body) · **no-fake-impersonation**
  surface (no login-as/impersonate control claiming a real session). **Done**: the 3 freeze censuses added, green.
- [X] **T037** `tests/smoke/run.cjs` — smoke consolidation gate, SMOKE WRITER #13 (after T036): confirm all
  **G1–G14** blocks are present (a self-count of the guard labels) and run the **full smoke → PASS**. Diff-verify
  the protected asserts are **byte-verbatim**: PAY28 `:748`, tchPay `:2018-2019`, payHit `:2096-2100`, famPay/
  payFigure, M-8 `:1939`, ROUTES_50 `:2608-2652`, no-external `:176`, g32 `:1406-1412`, `planned===0`, orphan
  `:2752`, honest-lock, D-1 `:2695-2736`; the **only** superseded lines are `:1971`/`:2082`. **Done**: G1–G14 all
  present; smoke PASS; the 2-line supersession is the sole protected-assert change (`git diff` confirms).

---

## Phase 10 — A11y & screenshots  (after the UI is stable: T022 + T023 + T026 + build)

- [X] **T038** [P] `tests/a11y/run.cjs` — add MATRIX rows (format `{page,lang,theme,open?,viewport?}`): **student-
  profile** AR/EN light+dark (2-gate, no-password); **staff** AR/EN light+dark `open:'[data-drawer="st-perm"]'` +
  mobile-390; **teacher** AR/EN light+dark `open:'[data-drawer="trn-policy"]'` + mobile-390. Focus-trap/Esc/backdrop/
  scroll on the opened drawers; a required selector (open drawer) must **FAIL loudly** — no `.catch(()=>{})`. Run
  `test:a11y` → **critical=0 serious=0** (R-2 `:393` never relaxed). **Done**: rows added; a11y 0/0; R-2 unrelaxed.
- [X] **T039** [P] `tests/screenshots/capture.cjs` — add MATRIX rows (format `{page,lang,theme,vp,openDrawer?,
  variant}`): **student-profile** 2-gate AR/EN light+dark; **staff** `openDrawer:'st-perm'` AR/EN light+dark +
  mobile-390; **teacher** `openDrawer:'trn-policy'` AR/EN light+dark + mobile-390. Run `screenshots` → **0 console
  errors** (R-3 `:555` never relaxed). **Done**: frames added; 0 console errors; R-3 unrelaxed.
- [X] **T040** [P] `app/screenshots/REVIEW.md` — append a `## Spec 043 — Sensitive Data Privacy, Role Isolation &
  Anti-Poaching (2026-…)` narrative section (recent-spec style) naming each changed surface + state (student-profile
  2-gate; staff RBAC parent-contact rows; teacher policy preview), the AR/EN/light/dark/mobile frames, and the
  verdict. **Done**: section appended.
- [X] **T041** **Mandatory browser/screenshot loop** (after T038–T040): OPEN the captured images as images and
  visually accept each changed surface — AR+EN, light+dark, mobile-390 where layout shifts, the **st-perm** drawer
  open, the **trn-policy** drawer open, and the child profile with **2 gates and no password affordance**. Record
  the verdict in REVIEW.md. **Source-reading is never visual acceptance.** **Done**: every frame opened + accepted;
  REVIEW.md verdict recorded.

---

## Phase 11 — Mutation execution  (after Phase 9 green + build + smoke green — the proven-green tree)

Rules: **one mutation per fresh isolated copy/worktree** (`git worktree` or filesystem copy — **never**
`stash`/`reset`/`checkout`/mutation on the primary tree); no combined mutation; no mutation marked complete from
inspection; record the diff, runner command, exit code and the exact RED assertion; discard the copy; confirm the
primary tree is byte-identical and GREEN (residue 0). `[P]` is allowed because each runs on its own isolated copy —
but the runners bind a **fixed port (4178)**, so `[P]` permits parallelism without requiring it: run mutations
sequentially, or give each isolated copy its own port, if concurrent runs would contend for 4178.

- [X] **T042** [P] **MUT-1** (G1/G2) — isolated copy: add a guardian phone value to a teacher fixture/body →
  build → `test:smoke` → **teacher-contact census RED** → discard → primary GREEN.
- [X] **T043** [P] **MUT-2** (G3) — isolated copy: make a parent-contact grant reachable by a teacher surface
  (add the `parents` group to a teacher-rendered surface / a teacher-body-rendered `granted:true` parent row) →
  **G3 teacher-unreachable RED** → discard → GREEN.
- [X] **T044** [P] **MUT-3** (G5) — isolated copy: re-add `passwordChange` to `STUDENT_PAGES.profile.gates` →
  **`student-profile plannedBackend === 2` RED** (got 3) → discard → GREEN.
- [X] **T045** [P] **MUT-4** (G7/G8) — isolated copy: insert a live `chat.whatsapp.com/…` invite URL into a
  fixture/page → **sitewide real-PII census RED** → discard → GREEN.
- [X] **T046** [P] **MUT-5** (G10) — isolated copy: add a `type=password` input / credential value slot →
  **g32 `pw===0` RED** → discard → GREEN.
- [X] **T047** [P] **MUT-6** (G11) — isolated copy: flip one parent-contact row to `granted:true` →
  **deny-by-default census RED** → discard → GREEN.
- [X] **T048** [P] **MUT-7** (G12) — isolated copy: restore a certificate group-delivery option →
  **cert-delivery census RED** → discard → GREEN.
- [X] **T049** [P] **MUT-8** (G4) — isolated copy: add another family's data (`أم جوري`) to a family portal page →
  **family-isolation census RED** → discard → GREEN.
- [X] **T050** [P] **MUT-9** (G6) — isolated copy: add an admin route (`dashboard.html`) link to a portal page →
  **no-admin-link census RED** → discard → GREEN.
- [X] **T051** [P] **MUT-10** (G14) — isolated copy: change an honest gate's wording into a fake authorization
  claim (`authorized`/`مسجّل الدخول`) → **G14 wording census RED**, while the staff activity-log value stays green
  → discard → GREEN.
- [X] **T052** [P] **MUT-11** (G13) — isolated copy: add an `href` carrying a minor-identifying query param
  (`?student_name=…`) to a built page → **query-string census RED** → discard → GREEN.
- [X] **T053** [P] **MUT-TP** (teacher-policy) — isolated copy: add a Salary row / pay token / value `<input>` to
  `TEACHER_CAPABILITY_POLICY` / `capabilityPolicyDrawer` → **teacher-policy census RED** (+ PAY28 double-cover on
  `teacher.html`) → discard → GREEN.

---

## Phase 12 — Counts, impact, guards & final audit

- [X] **T054** [P] Counts re-verify (post-build): public HTML = **115**, PAGES = **57**, menu = **50**, routes =
  **24/25/1**, status = **49/0/1**, `FUTURE_ROUTES` = **{}**, `classSalaryReport` sole lock, gallery pair unchanged.
- [X] **T055** [P] Locale parity + raw keys: `adm` + `trn` ar↔en identical (0 divergence); **0 raw keys** on any
  built page.
- [X] **T056** [P] Forbidden-file **0-diff**: `git diff` empty for `nav.config.js`, `enhance.js`,
  `components/sidebar.js`, `i18n.js`, `build-html.mjs`, `package.json`, `package-lock.json`, `pages/staff.js`,
  `pages/family-profile.js`, `pages/teacher-profile.js`, all `components/*`, `app.css` (vs the T012 snapshot).
  **`pages/student-profile.js` is NOT whole-file 0-diff** — instead require its `git diff` to be **restricted
  exactly to the header comment** (`:1-4`): every line from the **first `import` / the render function onward is
  byte-identical** (verify by diffing that region). Confirm **0 new hook/storage-key/dependency/component/route/
  page/nav-item**.
- [X] **T057** [P] **Impact proof — narrow dual-baseline supersession** (non-destructive): preserve the original
  failed single-baseline observation as audit evidence, then hash the exact raw bytes of each extracted
  `#page-body` region with fail-loud missing/duplicate-anchor, owning-boundary, parser/UTF-8 and unexpected-path
  checks (no whole-file fallback). **Continuation impact** compares accepted reconstruction
  `830446ba7a61d4616dbb29124a58730761bac95a` with the current rebuilt tree → **0 changed / 115 unchanged**.
  **Total Spec-043 feature impact** compares true pre-feature `e474ad8ca70c` with the current rebuilt tree →
  **exactly 6 changed / 109 unchanged / 115 total**: `staff`, `teacher`, `student-profile` × AR/EN, exactly
  **3 logical surfaces**. The sole body-less `index.html` meta-refresh stub is separately required byte-identical
  and counts as the 115th identity unit, never as a page-body hash. Shared sidebar/shell and the gallery pair remain
  unchanged; any seventh page body or shell/sidebar delta = STOP. **Never** use
  `stash`/`reset`/`checkout` as the method.
- [X] **T058** Full suite green (final): `npm run build` (115, byte-consistent) → `test:smoke` **PASS** → `test:a11y`
  **critical=0 serious=0** → `screenshots` **0 console errors**.
- [X] **T059** Mutations audit: **12/12** (MUT-1…MUT-11 + MUT-TP) executed **RED→GREEN** on isolated copies, each
  with recorded command + exit code + RED message; residue **0**; primary tree byte-identical.
- [X] **T060** [P] Clean-code guard (independent non-author review): minimal diff, no dead/duplicated code, no churn,
  fixtures structure-only, **comment accuracy — the `student-profile.js` header comment (`:1-4`) MUST read "two"
  gates (photo/save) and contain no `password` token** (the mandatory comment-only correction from T020; a stale
  "three gates" comment is a review failure), while its executable code stays byte-identical.
- [X] **T061** [P] Adversarial test guard (independent non-author review): no protected assert deleted/rescoped/
  loosened/skipped/`catch()`-swallowed; **only** the declared 2-line child-view supersession; required selectors
  FAIL loudly; R-2/R-3 never relaxed; every new guarantee has a RED-proven mutation.
- [X] **T062** Documentation: write `specs/043-…/implementation-status.md` (per-task evidence: command, exit code,
  RED/GREEN, the 6-body impact diff) and refresh the CLAUDE.md SPECKIT-marker "Active feature" line to
  **IMPLEMENTED** (marker only; no other CLAUDE.md change).
- [X] **T063** Final safe-to-review audit: all gates green (counts, impact 6-bodies, forbidden 0-diff, smoke/a11y/
  screenshots, 12/12 mutations, ownership 17/2-12-3, mutation register 12), **no STOP condition triggered**, **no
  commit/push** (the watcher owns commits). Report readiness for review.

---

## Dependencies (the real chains)

- **Phase 1 blocks all implementation** (no app edit until T001–T012 green).
- **Phase 2 data** blocks its renderers/censuses: T013+T015+T016 → T023/T024 (parent-contact); T014+T017+T018 →
  T025/T026/T027 (teacher policy). T019 parity after T015–T018.
- **T020 (child fixture)** → **T021 (supersession)** → **T022 (build-verify)**.
- **`smoke/run.cjs` serial chain**: T021 → T024 → T027 → T028 → T029 → T030 → T031 → T032 → T033 → T034 → T035 →
  T036 → T037 (each depends on the previous; none `[P]`).
- **All UI + smoke complete (through T037) + build green** → **Phase 10** (a11y/screenshots need the built drawers:
  T022 + T023 + T026).
- **Proven-green tree (T037 + build + smoke)** → **Phase 11 mutations** (T042–T053).
- **All 12 mutations (T042–T053)** → **T059** → **Phase 12 final audit** (T054–T058 may run once the tree is final;
  T063 last). **T063 blocks completion.**

## MVP boundary (honest)

**MVP = Phase 1 (baseline/preflight) + Phase 3 (child-view) + Phase 4 (parent-contact registry) + Phase 5 (teacher
policy preview) + Phases 6–9 (G1–G14 smoke coverage + freeze).** That delivers the frontend privacy foundation the
dependent specs (045–056) gate on. **A11y/screenshots (Phase 10), mutations (Phase 11), and impact/counts/final
audit (Phase 12) are MANDATORY for full completion and may not be omitted** — a guard without a RED-proven mutation
and a surface without visual acceptance are not "done".

## Stop conditions (report before proceeding — do NOT author around them)

Baseline not clean / smoke persistently red on unrelated code · ownership no longer parses 17-unique/2-12-3 ·
mutation register ≠ 12 · a standalone page/new route required · an existing host cannot render the policy rows
without a new shared component · child removal would alter family/teacher account behaviour · any teacher contact/
pay/locality field required · any frontend claim needs real backend enforcement · a sensitive value/input required ·
a protected assertion must be weakened beyond the declared 2-line supersession · count/menu/route/lock/orphan
invariants cannot hold · a `package.json`/`build`/`i18n.js`/`nav.config.js`/`sidebar.js`/`enhance.js` change becomes
necessary · an unrelated body must change · evidence missing/contradictory (would require guessing). Contradiction
during tasks ⇒ STOP and report; never silently decide.
