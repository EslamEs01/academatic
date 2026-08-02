# Implementation Status — Spec 043 (Sensitive Data Privacy, Role Isolation & Anti-Poaching)

**Branch**: `feature/012-role-portal-foundation` · **Accepted baseline HEAD**:
`830446ba7a61d4616dbb29124a58730761bac95a`. **Ponytail**: lite. **Executor**: root coordinator. One writer per
file; `tests/smoke/run.cjs` + `teacher.js` root-owned. **No commit/push** — an external host/IDE writer exists
outside this sandbox, is not identifiable here, and is not invoked by this run.

Per-task evidence (command · exit code · measured result) is recorded below as tasks complete.

## T001 — accepted committed lineage and narrow status-file supersession

- `feature/012-role-portal-foundation` at
  `830446ba7a61d4616dbb29124a58730761bac95a`; `git status --porcelain` was empty and `git diff --check` passed.
- Required ancestry is linear: `e474ad8ca70c` → `690186eef42c` →
  `3e87c162fcca2d7be4d1fc0b16f62bd48b9bd4c3` → `830446ba7a61d4616dbb29124a58730761bac95a`.
- `690186e` committed the Codex bootstrap and Claude partial Spec-043 implementation. `3e87c162` committed only
  trailing-whitespace normalization in the three SpecKit skill files. `830446ba` committed only the matching
  three-hash manifest-integrity update; all nine manifest hashes match their current files.
- No application bytes changed during either hygiene correction. The external writer is outside the sandbox and
  not identifiable; no Git-writing operation was invoked here.
- The five required historical commits (`9694527`, `a185494`, `cd56aa0`, `48a344b`, `3b6a5a3`) are ancestors.
  The original T001 premise barring a pre-existing `implementation-status.md` is narrowly superseded because that
  tracked status file arrived in `690186e`; its prior notes remain evidence only, not task-completion evidence.
- Baseline validation: `npm run build` exit 0 with 115 HTML and no tracked change; baseline smoke exit 0 (114
  page loads); baseline a11y exit 0 (`critical=0 serious=0`).

---

## Targeted Visual Grounding (root, images opened AS images — mandatory before edits)

Opened the exact images (not filenames/summaries) for all 3 changed surfaces + the legacy defects:

### Surface 1 — Student profile (child-view)
- **Current** `app/screenshots/student-profile__ar__light__desktop.png` — CONFIRMED: header «عرض الابن» (child-view);
  guardian block «وليّ الأمر: أبو سلمان الغامدي · المدينة: الرياض» (name + city only, **no contact** — matrix DENY);
  bottom shows **exactly 3 gate cards**: «حفظ بيانات الملف» (save) · «تغيير الصورة» (photo) · **«تغيير كلمة المرور»
  (password change)** — each an honest «يتطلب الخادم» gate. **The password card is the removal target (3→2).**
- **Legacy** `output/roles/family/screenshots/student-profile-edit-full.png` — CONFIRMED the defect: the FAMILY login's
  "profile" edits the **child** identity (First/Last name, e-mail) + a **Change-Password card (Old/New/Confirm)**.
  The guardian owns the child; there is no student login → a child-view password gate implies a non-existent account.
- **Legacy defect refused**: the child password/account affordance. **Current host reused**: `student-profile.js`
  fixture-mapped `plannedCard` renderer (0-diff). **Planned change**: remove `passwordChange` fixture entry +
  correct the header comment three→two. **Omitted**: nothing new; an affordance is deleted, not added.
- **Expected AR/EN/light/dark/mobile**: 2 gate cards (photo/save), no password affordance, no `type=password`.

### Surface 2 — Staff RBAC preview
- **Current** `app/screenshots/staff__ar__light__desktop__sp031-staff-rbac.png` — CONFIRMED the display-only host
  «الفريق والصلاحيات» with subtitle «دليل الطاقم والصلاحيات — عرض فقط: كل إجراء يحتاج ربط الخادم». The `st-perm`
  RBAC drawer (permDrawer) renders `PERM_GROUPS` generically.
- **Legacy** `output/roles/admin/screenshots/management-admins-permission-6-full.png` (+ `-7`) — CONFIRMED the
  170/170 matrix: the **Families** group holds **Show Parent Phone** + **Show Parent Email** (the ONLY two named
  PII-gating permissions); pay rows (**Show Salaries Page · Show Teacher Rate · Show Student Rate**) and **no
  Login-as row** (impersonation ungovernable).
- **Legacy defect refused**: a 170-checkbox all-granted editor + real enforcement. **Current host reused**: the
  `permDrawer`/`st-perm` display-only preview. **Planned change**: +1 `PERM_GROUPS` group of 5 deny-by-default
  parent-contact rows. **Omitted**: any value slot/toggle/working grant; teacher never reaches these keys.
- **Expected AR/EN/light/dark/mobile**: 5 "not allowed" rows under a Parent-Contacts group; no input/toggle.

### Surface 3 — Teacher capability/notification policy
- **Current** `app/screenshots/teacher__ar__light__desktop.png` — CONFIRMED «تفاصيل المعلّم» is already **pay-free +
  contact-free**: overview «نظرة عامة» shows المواد/الحالة/التوفّر/الحِمل/الدورات/المجموعات/الطلاب — no salary,
  no contact, no country. The overview panel is the host for the `trn-policy` trigger (beside the availability
  opener pattern).
- **Legacy** `output/roles/admin/screenshots/management-teachers-1-full.png` — CONFIRMED the defects to REFUSE:
  **Left Students / Acquired Students** attribution tables, **Address: Giza Governorate, Egypt** (country/locality),
  **Hour Rate: 120 EGP** (pay), **Compensations + Salary tabs**, **Login as**, live `chat.whatsapp.com/…` invite URL,
  phone `201278910727`. The **Settings** tab holds teacher capabilities (`can_chat/can_see_library/can_edit_schedule/
  can_edit_class`) and the notification matrix carries a **salary_\* row** that MUST be excluded (pay-free).
- **Legacy** `output/roles/teacher/screenshots/teacher-studentslist-full.png` — CONFIRMED the **Country column (VUT)
  visible to the teacher** (A-02 anti-poaching defect; correctly dropped in the current app).
- **Legacy defect refused**: Left/Acquired attribution, country/locality, pay/Hour-Rate/Salary, the salary_\*
  notification row, contact, live invite. **Current host reused**: `teacher.js` `availabilityDrawer`/`previewTemplate`
  pattern + generic `data-drawer` dispatch. **Planned change**: structure-only `TEACHER_CAPABILITY_POLICY` +
  `capabilityPolicyDrawer('trn-policy')` (academic + non-pay notification rows) + one overview trigger.
- **Sensitive fields deliberately omitted**: salary/rate/currency/figure, guardian/student contact, country/locality,
  lead entitlement, Left/Acquired, any value slot/toggle/enforcement claim.
- **Expected AR/EN/light/dark/mobile**: academic + communication subheads, structure rows only, trailing honest
  backendRequired gate; PAY28 green on `teacher.html`.

**Raw vocabulary anchors** (raw records, from the specify/plan grounding): parent-contact = `parent-phone`/
`parent-email`; capabilities = `can_chat`/`can_see_library`/`can_edit_schedule`/`can_edit_class`; notifications =
`coursesUpdate`/`classReminders`/`classUpdates` × `whatsapp`/`email`, `salary_*` EXCLUDED.

---

## Resume grounding — Codex independent reinspection (2026-08-02)

The earlier section is retained as the pre-implementation audit record. Codex reopened the live output after HEAD
`5c2fc122126013d6d0bf5dafc76260975499fe96` and inspected these exact images at original detail:

- Student child-view: `app/screenshots/student-profile__ar__dark__desktop__sp043-2gate-dark.png` and
  `app/screenshots/student-profile__en__light__desktop__sp043-2gate-en.png` — exactly two honest backend gates
  (photo and save), no password affordance, guardian name + city only, and no guardian contact value.
- Staff parent-contact policy: `app/screenshots/staff__ar__light__desktop__sp043-parents.png`,
  `staff__ar__dark__desktop__sp043-parents-dark.png`, `staff__ar__light__mobile__sp043-parents-mobile.png`, and
  `staff__en__light__desktop__sp043-parents-en.png` — the open `st-perm` dialog contains the five parent-contact
  rows, all visibly not allowed; the desktop, dark, mobile, RTL, and EN layouts remain usable and display-only.
- Teacher capability policy: `app/screenshots/teacher__ar__light__desktop__sp043-policy.png`,
  `teacher__ar__dark__desktop__sp043-policy-dark.png`, `teacher__ar__light__mobile__sp043-policy-mobile.png`, and
  `teacher__en__light__desktop__sp043-policy-en.png` — the open `trn-policy` dialog has two sections, four academic
  rows, three non-pay communication rows, and one honest backend gate; no pay, parent contact, or locality appears.
- Legacy policy defects: `output/roles/admin/screenshots/management-admins-permission-6-full.png`,
  `management-admins-permission-7-full.png`, `management-teachers-1-full.png`,
  `output/roles/teacher/screenshots/teacher-studentslist-full.png`,
  `output/roles/family/screenshots/student-profile-edit-full.png`, and the admin teacher/family WhatsApp insight
  frames. They reconfirm the all-granted parent phone/e-mail permissions, teacher rate/salary/contact/locality and
  login-as defects, teacher-visible country, family-owned child password editor, and real PII/live invite evidence
  that Spec 043 must continue to refuse.

Live mapping: the three product bodies are implemented; the remaining work is independent contract review,
fail-loud selector and protected-test verification, fresh isolated mutation proof, the T057 dual-baseline impact
correction, final build/smoke/a11y/screenshot gates, and truthful T001–T063 ledger closure. No application edit was
authorized by or made during this grounding correction.

## Live-state reconstruction before executor assignment

- **Complete with valid evidence**: T001–T020, T022–T026, T040–T041. Baseline/preflight evidence is historical
  evidence for its assigned phase; current source bytes and the ten Spec-043 frames independently confirm the three
  implemented surfaces without restarting completed work.
- **Implemented but unverified after the latest protected-test corrections**: T021, T027–T039, T054–T056. HEAD
  `5c2fc12` changed only the Spec-043 smoke/a11y/screenshot guards and ledgers after the prior full-suite record, so
  those guard bytes require independent review and the affected final gates require a fresh run.
- **Implemented evidence absent/invalidated; must execute afresh**: T042–T053. A prior 12-mutation completion was
  reported, but no durable per-mutation command/exit/RED log is present and the protected tests changed afterward;
  none of the twelve mutations is accepted from that report.
- **Partial**: T057 (the original single-baseline observation is historically false for total feature impact and is
  preserved only as audit evidence); T059 and T062 (register/status scaffolding exists, but final evidence is absent).
- **Untouched final closure**: T058, T060–T061, T063. These remain open until fresh gates, independent guards, and
  the final Codex review complete. No task is blocked by an actual contract contradiction at this point.

Assignment ledger: Claude Opus owns a read-only audit of T021/T024/T027–T039/T060–T061 (no writable files);
Kimi K3 owns the deterministic read-only T057 dual-baseline measurement (no writable files). Codex owns executor
diff review, all task acceptance, mutation/gate validation, and final ledger closure. Expected return evidence is
exact file/line findings for Claude and exact path/count/hash-method output for Kimi; application pages, protected
tests, contracts, and Git state are forbidden to both assignments unless Codex issues a later correction brief.

## Final executor disposition and Codex corrections

- Claude's installed delegation relay could not start an implementation-capable session because its enforced shell
  sandbox requires the unavailable `socat` binary. Two read-only audit returns were rejected: the first stopped
  after orientation and the second cited non-existent paths/tasks. No Claude result or repository edit was accepted.
  Per the user's unavailable-executor rule, Codex completed the high-risk verification directly; no broad product
  implementation was needed because the live application and protected-test bytes already satisfied the contracts.
- Kimi performed the bounded T057 measurement. Codex rejected its first normalized/re-serialized body-hash method
  because it could not prove raw byte identity, then ordered the exact-raw-region correction. The corrected preserved
  run and two final Codex reruns passed. Kimi made no repository edit during that measurement assignment.
- Codex found one defect in its temporary mutation harness: the first MUT-3 patch encoded a literal `\\n`, causing
  a JavaScript syntax failure. That observation is preserved under
  `/tmp/spec043-mutation-evidence-codex/MUT-3-rejected-syntax` and was not accepted as RED evidence. Codex removed
  only the validated isolated copy, corrected the temporary harness, and reran MUT-3 from a fresh copy to the exact
  child-profile guard. The primary tree's before/resume/after SHA-256 manifests stayed identical.

## Final task evidence — T001–T063

| Tasks | Command/evidence | Final result |
| --- | --- | --- |
| T001–T012 | Read-only Git lineage/status/diff checks; source/test re-grounding; frozen-count, ownership, mutation-register and baseline artifacts | Accepted branch lineage; 115 HTML, 57 PAGES, 50 menu items, routes 24/25/1, status 49/0/1, empty FUTURE_ROUTES, sole `classSalaryReport` lock, gallery pair present; ownership 17/17 with classes 2/12/3; mutation register 12/12 |
| T013–T019 | Source inspection plus final `npm run build`, locale key-set census and built raw-key census | Parent-contact registry is 5/5 deny; teacher policy is 4 academic + 3 communication; `adm` 685/685 and `trn` 219/219 with 0 divergence; 0 raw keys |
| T020–T022 | Source/built DOM inspection, protected child assertion, full smoke and MUT-3 | Student child-view has exactly photo/save (2) backend gates, no password/input; family and teacher profile 3-gate neighbours remain intact |
| T023–T024 | Source/built drawer census, G3/G11, open-drawer screenshot/a11y runs, MUT-2/MUT-6 | Staff AR/EN parent-contact group renders exactly 5 not-allowed rows, 0 input/toggle; teacher reachability 0 |
| T025–T027 | Source/built template census, exact policy assertions, open-drawer screenshot/a11y runs and MUT-TP | Teacher AR/EN policy renders two subheads, 4+3 rows and one honest gate, with 0 pay/contact/locality/input/toggle |
| T028–T029 | G7–G10 protected-test inspection, full smoke and MUT-4/MUT-5 | Sitewide real-PII/live-invite, credential/PAN and external-host guards are present and GREEN |
| T030–T032 | G1/G2/G4/G6 inspection, full smoke and MUT-1/MUT-8/MUT-9 | Teacher contact/locality/Left-Acquired source/body leakage 0; family cross-identity leakage 0; portal-to-admin links 0 except the declared hub link |
| T033–T034 | G12/G13 inspection, full smoke and MUT-7/MUT-11 | Certificate group delivery absent; minor-identifying query parameters absent |
| T035–T037 | Protected-test diff/review and full smoke | G14 is scoped to structured gate/authz contexts; historical staff “signed in” is unaffected; fake impersonation freeze present; G1–G14 consolidate GREEN; only the declared child 3→2 contract changed |
| T038–T041 | `npm run test:a11y`, `npm run screenshots`, exact-frame visual opening and REVIEW.md verification | 293 a11y scenarios, critical=0 serious=0; 389 screenshots, console errors=0; required selectors/drawers fail loudly; all 14 Spec-043 AR/EN/light/dark/mobile frames visually accepted |
| T042–T053 | Fresh-copy mutation harness, distinct ports 4301–4312, exact RED matching, copy removal and primary GREEN | 12/12 mutation-specific RED→GREEN; see mutation table below |
| T054–T056 | Final count/locale/raw-key/forbidden/hash/parity scripts plus `git diff` | Frozen counts exact; 0 locale divergence/raw keys; all forbidden files 0-diff; student-profile executable region unchanged; 9/9 generated/source assets agree; no new route/page/nav/dependency/hook/storage key |
| T057 | Strict raw-region verifier using only `git show` for history; corrected Kimi run plus two Codex reruns, each exit 0 | Continuation 0/115; total feature 6/109/115; exact six paths and three surfaces; index stub and gallery pair unchanged |
| T058 | Final gates, with build/smoke evidence retained because application/public/smoke bytes were unchanged; expanded a11y and screenshots rerun after matrix correction | 115 HTML; 114/114 smoke; a11y 0/0; 389 frames/0 console errors |
| T059 | Mutation artifact census + primary before/after SHA-256 diff | 12 unique accepted mutations; all copies removed; primary mutation residue 0 |
| T060 | Independent Clean Code/LLM failure-mode review of the production delta | Minimal structure-only reuse; no dead/duplicated code, fake state, new dependency or stale child-profile comment; no finding |
| T061 | Independent adversarial test review plus mutation cross-check | No skip, weakened protected guard, required-selector swallow or unrelated RED acceptance; R-2/R-3 hard exits intact; no finding |
| T062 | This ledger, tasks ledger, requirements checklist, screenshot review and CLAUDE marker verified against live bytes | Documentation matches evidence; existing CLAUDE marker already reads Spec 043 IMPLEMENTED, so no marker edit was needed |
| T063 | Final Codex review, `git diff --check`, status, forbidden drift, residue and exact-count audits | Safe for user review; all 63 tasks complete; no STOP condition; no commit/push/merge |

## Mutation evidence (fresh isolated copies)

Every accepted mutation used one fresh filesystem copy, one mutation, its own port, the unchanged full smoke runner,
an exact expected-RED match, and validated copy removal. Source mutations rebuilt first. Final primary build and smoke
both exited 0.

| ID | Mutated contract | Exact accepted RED |
| --- | --- | --- |
| MUT-1 | Teacher contact/source isolation | G2 teacher fixture carries a contact/locality/Left-Acquired field |
| MUT-2 | Parent registry teacher-unreachable | G3 parent-contact registry reachable by a teacher surface |
| MUT-3 | Child two-gate policy | Student profile expected exactly 2 photo/save gates, got 3 (AR and EN) |
| MUT-4 | Real PII/live invite | G7/G8 real crawl PII/live WhatsApp invite token in `teacher.en.html` |
| MUT-5 | Credential-value surface | Forbidden live input/canvas affordance, password input count 1 |
| MUT-6 | Parent deny registry | G11 five-row registry contained `[true,false,false,false,false]` |
| MUT-7 | Certificate delivery | G12 certificate group-delivery option present |
| MUT-8 | Active-family isolation | G4 non-fam1 guardian identity `أم جوري` present |
| MUT-9 | Portal/admin isolation | G6 portal body linked to admin base `dashboard` |
| MUT-10 | Honest authorization wording | Scoped G14 fake current-auth claim in `student-profile.en.html` |
| MUT-11 | Minor identity in URL | G13 `?student_name=Mutation` in a built href |
| MUT-TP | Teacher policy exactness | `trn-policy` failed exact 4-capability + 3-notification-row assertion |

Evidence root: `/tmp/spec043-mutation-evidence-codex`. Accepted smoke statuses are all non-zero with the exact target
line present; all `copy.status` files say `removed`; `primary-residue.count=0`;
`primary-green-build.status=0`; `primary-green-smoke.status=0`; final line:
`[smoke] PASS — 114 page loads, no raw keys / external requests / dead buttons / unexplained disabled controls`.

## T057 dual-baseline impact — narrow evidence-method supersession

The earlier single-baseline attempt is intentionally retained above as a failed historical observation: the partial
feature already existed before that snapshot, so it could not truthfully measure total Spec-043 impact.

The accepted method validates a three-way identical 115-path set, valid UTF-8, exactly one raw
`id="page-body"` anchor and owning `</main>` boundary on each of 114 body-bearing files, and hashes the exact raw
region bytes without serialization or normalization. Missing/duplicate anchors, boundary/path/parser errors, or
whole-file fallback hard-stop. The sole known exception, body-less `index.html`, must remain a byte-identical
meta-refresh stub and is counted separately as the 115th identity unit.

- Accepted reconstruction `830446ba7a61d4616dbb29124a58730761bac95a` → current rebuilt tree:
  **0 changed, 115 unchanged**.
- True pre-Spec-043 `e474ad8ca70c` → current rebuilt tree:
  **6 changed, 109 unchanged, 115 total**.
- Exact changed localized bodies:
  `staff.html`, `staff.en.html`, `teacher.html`, `teacher.en.html`,
  `student-profile.html`, `student-profile.en.html`.
- Exact logical surfaces: staff RBAC parent-contact policy; teacher capability policy; student child-view profile.
- The gallery pair and `index.html` are unchanged. No seventh body changed; shell/sidebar-only content was not
  misclassified as a page-body change.

## Final gates and honest boundary

- Final build: exit 0, **114 static pages + index = 115 HTML**, 69 icons, 0 missing.
- Final smoke: exit 0, **114/114 page loads PASS**.
- Final accessibility: hard-gate completion, **293 scenarios; critical=0 serious=0**.
- Final screenshots: exit 0, **389 captured; 0 console errors**; all 14 required Spec-043 frames were reopened at
  useful detail after capture and accepted.
- Final Git checks: `git diff --check` passes; branch
  `feature/012-role-portal-foundation`, HEAD `5c2fc122126013d6d0bf5dafc76260975499fe96`.
- This is a static HTML-first frontend. Its enforceable guarantee is protected-data absence from unauthorized
  role bodies/DOM/payload fixtures and honest backend-required gates. Real session-role checks, route/API denial,
  persistence and field-level RBAC remain explicitly **FUTURE_BACKEND**; no fake authorization was added or claimed.
- No commit, push, merge, pull, fetch, rebase, cherry-pick, stash, reset, clean, branch switch or PR operation was
  performed.

## Reopened correction assignment — screenshot/a11y matrix completeness

The documentation guard found that T038/T039's literal matrix contract was not yet complete: the a11y matrix lacked
the EN-dark open-drawer states for staff and teacher, while the screenshot matrix lacked student AR-light,
student EN-dark, staff EN-dark open-drawer and teacher EN-dark open-drawer frames. T038–T041, T058 and T062–T063
were reopened before correction.

- **Executor**: Kimi K3; **task IDs**: T038–T040 implementation only.
- **Owned files**:
  `app/tests/a11y/run.cjs`, `app/tests/screenshots/capture.cjs`, `app/screenshots/REVIEW.md`.
- **Read-only dependencies**: Spec-043 tasks/contracts, existing Spec-043 matrix rows, generated pages and current
  screenshots.
- **Expected behavior**: add only the two missing EN-dark required-drawer a11y rows and four missing screenshot
  rows, use unique `sp043-*` variants, preserve fail-loud `requiredDrawer` handling and R-2/R-3, and update the
  review inventory from 10 to 14 Spec-043 frames without claiming a gate run.
- **Required executor checks**: syntax-check both CJS files and report exact diff; Codex owns the subsequent build,
  a11y, full screenshot run, image opening, T041/T058 acceptance and final docs review.
- **Forbidden files/actions**: all application source/public HTML, smoke tests, SpecKit task/status/checklist files,
  package files, Git writes, protected-test weakening, and any change beyond the three owned files.

### Correction outcome

Kimi's first relay added the two a11y rows, then stalled after a no-op screenshot patch miss; Codex terminated that
relay cleanly and resumed the same session with a two-file delta brief. The completed Kimi diff touched exactly the
three owned files: +2 EN-dark required-drawer a11y rows, +4 unique Spec-043 screenshot rows, and the review inventory.
Codex independently verified syntax, 14/14 unique variants, required-selector paths and unchanged R-2/R-3 exits.
The expanded a11y matrix completed at **293 scenarios, critical=0 serious=0**. The expanded screenshot matrix exited
0 at **389 captured, 0 console errors**. Codex opened the four new PNGs at original detail and accepted: child
AR-light and EN-dark each show exactly two gates/no password; staff EN-dark opens the scrollable deny-only parent
drawer; teacher EN-dark opens the complete 4+3 pay/contact/locality-free policy. T038–T041 and the downstream final
gates are therefore closed from fresh evidence.
