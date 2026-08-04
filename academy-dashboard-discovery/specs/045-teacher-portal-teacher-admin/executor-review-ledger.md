# Executor Review Ledger

**Superseded header (2026-08-02):** "No application executor result exists… Zero executor product files were delivered." That was true before the resumed run. As of 2026-08-03 the Kimi path is proven and delivering; see `assignment-ledger.md` § "Executor capability re-verification".

A "done" statement or read-only suggestion is never accepted output. File delivery, evidence paths, actual diff, test result, and reviewer verdict are mandatory. Claude Opus is the reviewer and final acceptance authority for this run; no Sol verdict is pending or required.

---

## Batch A — shared Teacher visual composition (T014) · Claude Opus · ACCEPTED

| Field | Result |
|---|---|
| Executor | Claude Opus, in-session (direct implementation, not a delegated subprocess) |
| Files delivered | `app/src/styles/app.css` — one additive block appended at end of file |
| Evidence inspected | EG-045-01–11 packet table in `visual-grounding.md`; `visual-system-contract.md`; `responsive-accessibility-contract.md`; all eleven authored page modules; `components/portal-page.js`, `directory-card.js`, `profile-banner.js`, `teacher-actions.js`; `tailwind.config.js`; `styles/tokens.css`; rendered `teacher__ar__light__mobile.png` and reference `management-teachers-1-full.png` opened at original detail |
| Diff scope | +94 lines, appended AFTER the closing brace of `@layer components`, matching the established additive `.cc-*` / `.mr-*` / `.finm-*` precedent. Zero existing selector modified. Zero token, hook, storage key, component, page, route, or dependency added. |
| What it delivers | Four opt-in primitives: `td-focus` (one section priority marker per page, logical `border-inline-start` so RTL is correct), `td-meta` (compact wrapping labelled metadata row), `td-gates` (groups ≥2 adjacent honest gate notes into one calm bordered block instead of stacked full-width banners), `td-actions` (dense admin action region: desktop behaviour identical to the previous `flex flex-wrap gap-2`; two-column grid at ≤560px). Plus a 390px containment guard and explicit dark-theme handling. |
| Shell neutrality | `--td-accent` resolves to `--pt-accent` inside `.portal-shell` and to `--c-primary` on admin pages, so one layer serves both shells while role identity stays distinct (FR-009). |
| Non-Teacher regression proof | Every selector is a NEW `td-*` class name, so the consumer set is exactly the modules that opt in. Proven empirically: after the T014 build, `git status` showed **only** `src/styles/app.css` and `public/assets/app.css` changed — **zero HTML pages drifted**, including all non-Teacher pages. |
| Purge safety | Verified in the compiled artifact: all four primitives, the 390px block, and both dark blocks are present in `public/assets/app.css` (`td-focus`×6, `td-meta`×6, `td-gates`×8, `td-actions`×7, `td-accent`×7). |
| Dark-theme correctness | The group surface is derived from the accent itself rather than `--pt-accent-weak`, which reads near-charcoal in dark — the documented Spec-024 D-06 hazard. Explicit `[data-theme="dark"]` plus the `prefers-color-scheme` fallback, matching the established pattern. |
| Focused verification | `npm run build` exit 0, 114 pages + index; CSS brace balance 811/811; zero HTML drift. |
| Claude verdict | **ACCEPTED.** |

## Batch B — truthful Teacher portal home (T016–T017) · Kimi K3 · ACCEPTED

| Field | Result |
|---|---|
| Executor | Kimi Code 0.31.1, `tokenrouter/kimi-k3-free`, session run 00:20:08.116Z → 00:30:52.788Z (644.7s), exit 0, stderr empty |
| Files delivered | `app/src/js/pages/teacher-portal.js`, `app/src/locales/ar.prt.js`, `app/src/locales/en.prt.js` — exactly the three owned files, zero forbidden files touched |
| Evidence inspected by executor | EG-045-01 packet: `output/roles/teacher/pages/teacher-home.md`, `teacher-home-full.png`, the four current `teacher-portal__*` screenshots, the authored owner, both generated consumers, plus the read-only `family-portal.js` / `student-portal.js` reference implementations and `fixtures/portal.js` |
| Defect 1 — FR-012 | `quickTiles()` rendered every non-home `ROLE_NAV.teacher` entry through an unconditional `is-planned` branch with a "قريبًا" badge, although all 8 entries are `status: 'implemented'` and all 8 pages exist and build. Teacher was the ONLY role home still carrying the stale helper; family and student already shipped the correct status-aware version. Kimi replaced it with the proven pattern verbatim and kept the `is-planned` branch for future entries (zero-deletion). |
| Defect 1 — verified | `teacher-portal.html` and `teacher-portal.en.html` now render **7 real `<a class="pt-qtile pt-lift">` links and 0 `pt-qtile-soon` badges** each, with correctly localized targets (`teacher-schedule.html` … `teacher-profile.html` / `.en.html`). Matches family-portal 7/0 and student-portal 6/0. |
| Defect 2 — FR-013 / FR-041 | `perfDesc` told the Teacher that performance indicators live in **the admin console** ("الواجهة الإدارية" / "admin console (demo)") and `perfOpen` was labelled "Open performance board" / "فتح لوحة الأداء" while the anchor actually targets `teacher-reports(.en).html`. That both implied access to the admin-only board and mislabelled the destination. Rewritten in both locales to describe the Teacher's own read-only academic reports; the anchor target is unchanged. |
| Defect 2 — verified | `teacher-portal.html` / `.en.html` contain **0** occurrences of `teacher-performance` and **0** of «الواجهة الإدارية» / "admin console" / "performance board" / «لوحة الأداء». |
| Defect 3 | `prt.band.quickHint` read «صفحات لوحتك — تصل تباعًا» / "Your dashboard pages — arriving soon", which is false once the tiles are real links. Corrected in both locales. |
| Shared-key collateral (declared) | `prt.band.quickHint` is shared with `student-portal.js` and `family-portal.js`. Their tiles were ALREADY all real links, so "arriving soon" was a **pre-existing falsehood on those two pages as well**. The corrected copy is true for all three role homes. Impact: `student-portal.html`, `student-portal.en.html`, `family-portal.html`, `family-portal.en.html` each change by **exactly one line** — a copy correction, not a redesign, so FR-010 (no unrelated redesign) holds. Recorded here and in `impact-ledger.md` as intended, attributable Spec-045 impact rather than unrelated drift. The rejected alternative — forking a teacher-only key — would have knowingly preserved a false sentence on two pages. |
| Composition | `td-focus` applied to exactly one section: the follow-up / needs-attention band. Header comment updated to describe the new anchor set truthfully. |
| Locale parity | Same three key names (`perfTitle`/`perfDesc`/`perfOpen`) plus `band.quickHint` changed in BOTH `ar.prt.js` and `en.prt.js`; no key added or removed, so parity is structurally preserved. |
| Claude review findings | No unsupported module, action, field, analytics, backend behaviour, route, nav item, hook, storage key or dependency added. No generated file hand-edited. No pay/score/rank/chart token. `teacherAbsent`/`studentAbsent` untouched and still distinct. All emitted anchors resolve to pages that exist. |
| Claude verdict | **ACCEPTED**, with the shared-key collateral explicitly declared above. No corrections ordered. |

## Batch C+D (first attempt) — LOST, no output

Nine owned files / seven evidence packets. Kimi spent the entire run inspecting evidence and had written none of its files; the lead then terminated it with ~10 minutes of the 30-minute watchdog still remaining. **That early termination was a lead error**, recorded as such rather than charged to the executor. No file was partially written; `git status` immediately afterwards showed only already-accepted work. Cost: one lost run, no rework, no tree damage. The batch was re-scoped and re-dispatched as C1.

## Batch C1 — schedule + library (T021, T033–T034) · Kimi K3 · ACCEPTED with one lead correction

| Field | Result |
|---|---|
| Executor | Kimi Code 0.31.1, `tokenrouter/kimi-k3-free`, exit 0, stderr empty |
| Files delivered | `teacher-schedule.js`, `teacher-library.js`, `ar.prt.js`, `en.prt.js` — exactly the four owned files, zero forbidden files touched |
| Gate grouping (`td-gates`) | Both pages had TWO adjacent full-width `gateNote` banners. Each pair is now wrapped in one `td-gates` group. Verified in all four generated consumers (`class="td-gates"` ×1 each). Both gates remain individually visible with their own availability chip and text, and the page's closing `.pt-note` footer was correctly left OUTSIDE the group as instructed. |
| `td-focus` | Applied to exactly one section per page (schedule → today/next; library → resources). |
| Library search (FR-024/FR-025) | Implemented through the **existing shared mechanism** exactly as required: `filterBar({targetId, searchKey})` + `facetAttrs({search})` on each card + one `noResults()`. **No new `data-*` hook, no new listener, no page-local engine, no new dependency.** Search text is built from the authored title plus the authored type label. |
| No-invention discipline | The reference platform's "All Categories" subject dropdown was **not** reproduced, because `TEACHER_PREVIEW.materials` carries no authored category field — Kimi reached this conclusion independently during its capability probe and held to it here. |
| Locale parity | `searchPh` added under `prt.tch.pg.library.*` in **both** `ar.prt.js` ("ابحث في موادك…") and `en.prt.js` ("Search your resources…"). Same key name, mirrored meaning. |
| Behaviour proven, not assumed | The new smoke guard drives the real control: it types a non-matching query, asserts the visible card count goes 3 → 0 **and** that the single `[data-no-results]` state becomes visible, then clicks the reset control and asserts all three resources return. |
| **Lead correction (applied by Claude)** | `git diff --check` failed on four newly added lines in `teacher-library(.en).html`. Cause: `filterBar()`/`noResults()` emit lines ending in spaces — pre-existing shared-component output, newly surfaced because this page adopted those components. Fixing the components would have rewritten every other page that uses them (unrelated drift), so the lead contained the fix inside `teacher-library.js`. `git diff --check` now PASSES. Recorded in `impact-ledger.md`. |
| Claude verdict | **ACCEPTED** after the lead correction. No pay/score/rank/chart token; no backend, persistence, fake success or fake delay; no new route/page/nav/hook/storage key; `teacherAbsent`/`studentAbsent` untouched; every anchor resolves. |

## Batch D1 — Teacher directory + the live FR-031 violation (T043–T045) · Kimi K3 · PARTIAL, completed by the lead, ACCEPTED

| Field | Result |
|---|---|
| Executor | Kimi Code 0.31.1, `tokenrouter/kimi-k3-free`. Ran **27m55s** and hit the 28-minute watchdog mid-batch. |
| Delivered | 2 of 4 owned files: `pages/teachers.js` and `locales/en.trn.js`. **Not** reached: `locales/ar.trn.js` and the G45-2 guard. |
| Was the tree left broken? | **Yes, briefly and knowingly** — `en.trn.js` gained `trn.sum.highWorkload` while `ar.trn.js` did not, so AR/EN parity was broken and the AR directory would have rendered a raw key. The lead completed both missing pieces rather than reverting, because the delivered half was correct and reverting would have discarded good work. |
| **FR-031 fix (the batch's whole point)** | `const avgUtil = Math.round(rows.reduce((a, r) => a + r.util, 0) / rows.length)` and its `` `${num(avgUtil)}%` `` card are **gone**. Replaced by `const highLoad = rows.filter((r) => r.workload === 'high').length` rendered as a plain count with the new `trn.sum.highWorkload` label. |
| Why the replacement is compliant | A **count of records matching an authored categorical value** is exactly what the other two cards already do (`rows.length`, and the count of `avail === 'available'`). It is not a rate, average, percentage, score, rank or index. It reuses the existing authored `workload` vocabulary (`WORKLOAD_ORDER` / `workloadChip`), so no new metric or fixture field was invented. |
| Verified | `r.util` is no longer read anywhere in `teachers.js`; the `util` field remains in `fixtures/teachers.js` (zero-deletion); `trn.sum.util` remains authored in `*.extra.js` (zero-deletion) though now unused; **no `%` or `٪` renders in either localized summary row**; the new label renders correctly as «معلّمون بحِمل مرتفع» / "High-load teachers". |
| Risk the lead checked before accepting | Kimi added `sum: { highWorkload }` to `*.trn.js` while `trn.sum.total` / `.available` live in `*.extra.js`. If the locale merge replaced nested objects, the other two cards would have lost their labels. Verified in `i18n.js`: `deepMerge` **recurses** into nested objects (lines 33–35) and `*.trn.js` merges **after** `*.extra.js` (lines 46–47 then 52–53), so the block extends rather than clobbers. Confirmed empirically — all three cards render their labels. |
| Lead completion 1 | Added the mirrored `sum: { highWorkload: 'معلّمون بحِمل مرتفع' }` to `ar.trn.js`, wording matched to the existing authored «حِمل مرتفع» workload vocabulary. Parity restored and re-measured: **ar.trn 220 / en.trn 220, zero divergence** (portal locales also re-measured at 663/663). |
| Lead completion 2 | Authored the **G45-2** additive guard. It rejects the violation at the **source** (`avgUtil`, any read of `.util`, and any `reduce(...) / *.length` mean) *and* at the **rendered output** (no `%`/`٪` in either localized summary row), and fails loudly if its own anchor or target is missing. A first draft anchored on a `sum-card` class that does not exist; the guard correctly reported a vacuous match, and the anchor was corrected to the exact grid `teachers.js` emits. |
| Focused verification | Build PASS 114 pages; smoke **PASS** 114 loads with G45-2 active; locale parity exact; no `%` in either consumer. |
| Claude verdict | **ACCEPTED** — Kimi's delivered half is correct and well-reasoned, and its inline rationale is accurate. The batch is credited to Kimi at reduced weight (see the assignment ledger) because the lead authored the AR locale and the guard. |

---

## Session-4 micro-batches (one page scope each, 45-minute watchdog)

The D1 loss proved the batch shape was wrong, not the executor. Every session-4 batch owns **one**
page (or one small locale set) and a fixed short read list. **Every one of them completed inside its
watchdog** — no further watchdog losses occurred.

### D2-A — `teacher-students` page · Kimi · ACCEPTED

| Field | Result |
|---|---|
| Files | exactly one: `src/js/pages/teacher-students.js` |
| Implemented | The four relationships EG-045-03 proves the reference roster reaches — history · schedule · monthly report/plan · certificate — added as four honest `gateNote` rows wrapped in ONE `td-gates` group; `td-focus` on the follow-up band |
| Why gates and not links | The lead instructed gates deliberately: a protected smoke assertion pins teacher internal pages to **zero body anchors**, and none of the four has a verified safe current destination. Inventing a route would have been the worse failure. Verified in the build: still zero `#page-body` anchors. |
| Privacy | Roster shows name · course/group · subject tag · authored learning note only. **Zero** guardian contact, student contact, address or locality — confirmed in the rendered 390px frame and by the audit's contact-shaped-value sweep |
| Verified | build PASS; all four keys resolve (no raw dotted names); smoke **PASS** 114 with all 8 guards; 5 frames, 0 console errors, 0 overflow at exactly 390px; frame opened and inspected |
| Verdict | **ACCEPTED** |

### D2-B — `teacher-students` locale keys · Kimi · ACCEPTED

| Field | Result |
|---|---|
| Files | exactly two: `ar.prt.js`, `en.prt.js` |
| Implemented | The four keys D2-A referenced, authored in both locales under `prt.tch.pg.students.*`, in the established gate voice: «فتح سجل الحصص الكامل للطالب يتطلب ربط الخادم.» / "Opening a student's full session history requires the server connection.", and the schedule / report / certificate equivalents |
| Checked | No date promise, no "coming soon", no fake success, no pay or score token, no contact detail. Parity re-measured: `prt` mirrored exactly in both directions |
| Verdict | **ACCEPTED**. This batch existed because D2-A deliberately left placeholder keys — a two-step split that kept both batches inside the watchdog. |

### D2-C — `teacher-outcomes` composition · Kimi · ACCEPTED

| Field | Result |
|---|---|
| Files | exactly one: `src/js/pages/teacher-outcomes.js` |
| Implemented | `td-focus` on the record/save section — a single-line change |
| Judgement worth noting | It **correctly declined** to add a `td-gates` wrap, because that section holds one `gateNote` plus a `guidePanel` **card**, and `td-gates` restyles nested `.pt-note` only. Wrapping would have been decoration with no effect. The brief asked it to say so rather than force the class, and it did |
| Preserved | four-step flow strip · five-field display checklist · two real recorded examples · save gate — all intact |
| Verdict | **ACCEPTED** |

### T064 — Teacher visual-state screenshot coverage · Kimi · ACCEPTED

| Field | Result |
|---|---|
| Files | exactly one: `tests/screenshots/capture.cjs` |
| Diff shape | **+18 lines, 0 removed** — strictly additive. Verified mechanically: `git diff` shows zero removal lines, so no earlier Spec's protected row was weakened, reordered or reindented |
| Rows added | 9, all prefixed `sp045-`: `teachers` `#view=add` and `#view=categories`; `teacher` detail at 390px (action cluster); `teacher-performance` `sessions-kpi` and `monthly` at 390px; and dark rows for `teacher-students`, `teacher-tasks`, `teacher-reports`, `teacher-profile` — the four Teacher pages that had no dark row in the committed matrix |
| Mechanism discipline | Used only row fields the file already supports (`view`, `vp`, `theme`, `variant`). No new capture mechanism, helper, dependency or selector |
| **Correct refusal** | The brief asked for library search match / no-match / empty-state frames. Kimi **declined and documented why**: no existing row field types a free-text query into `input[data-filter="search"]`; the available state fields (`ssEmpty`, `reportFilter`, `teacher`) drive `<select>` dropdowns, not free text. Rather than invent a capture mechanism it skipped the states and said so in an inline comment. That is the third time this executor has refused to fabricate rather than guess, and it is the correct call — the library filter behaviour is already proven by the smoke guard that drives the real control (3 → 0, empty state visible, reset restores 3), so the coverage is not actually lost |
| Verdict | **ACCEPTED** |

### T057 / T058 — Claude cross-page coherence review of all eleven modules

Measured `td-*` adoption in source **and** in the rendered AR consumers:

| Scope | `td-focus` | `td-gates` | `td-meta` | `td-actions` |
|---|---:|---:|---:|---:|
| teacher-portal · schedule · students · outcomes · tasks · reports · library · profile | 1 each | 1 on schedule / students / library | 3 on tasks | — |
| teachers · teacher · teacher-performance (admin) | 0 | 0 | 0 | 1 on `teacher` |

**Coherent where it matters:** every one of the eight portal pages renders **exactly one** `td-focus`
marker — no page has two competing "this is the work" bands, and none has zero. `td-gates` appears
only where two or more adjacent notes actually exist (schedule, students, library); the pages that
declined it (outcomes, reports, profile, tasks) each documented why, and the rendered output confirms
the decision rather than the intention. `td-meta` appears only on `teacher-tasks`, the one page whose
cards genuinely stacked two separate one-fact lines.

**Recorded finding — the three admin pages carry no `td-focus`/`td-meta`.** They received only the
treatments their evidence called for: action prioritisation on `teacher` (`td-actions`), repeated-record
density on `teacher-performance`, and the FR-031 correction plus D1 preservation on `teachers`. This is
a deliberate outcome, not an oversight: the admin shell already supplies its own section rhythm
(`pageHeader` → summary cards → tablist → `dir-card`/`info-card`), and stamping the portal-oriented
section marker on top of it would blur the FR-009 requirement that portal and admin stay visibly
role-distinct. The `td-*` layer is shell-neutral by construction (`--td-accent` resolves to the admin
primary outside `.portal-shell`), so adoption remains available without rework if a later review wants
it. The claim being made is therefore "one coherent Teacher-domain language, applied where each shell
needed it" — **not** "uniform class application across eleven pages", which the numbers above would not
support.

### D3-A — `teacher-tasks` composition · Kimi · ACCEPTED

| Field | Result |
|---|---|
| Files | exactly one: `src/js/pages/teacher-tasks.js` |
| Implemented | `td-focus` on the task board; **`td-meta` genuinely earning its place**: the authored status word and due window previously rendered as a `pt-tag` inside the card row **plus** a separate `pt-tags` block below — two stacked bands per card. They are now one compact labelled row, each fact carrying its own icon **and** its own text (never colour-only). Verified in the 390px EN frame: "In prep · Due: today" on one line |
| Preserved | authored task meanings, statuses, due windows, monthly-plan preview row, and the single honest complete/assign gate |
| Rejected content confirmed absent | no staff-average table, no ranking, no completion toggle, no assignment mutation, no fake persistence |
| Verified | build PASS; `td-meta` ×3 in **both** locales; `td-focus` ×1; audit 9/9; 5 frames 0-console 0-overflow; frame inspected |
| Verdict | **ACCEPTED** |

---

## T058 — Kimi K3 independent audit of all eleven Teacher source modules + generated consumers · REVIEW-ONLY, clean

**Batch shape:** independent 11-module + consumer audit. Read-focused; no redesign; only unambiguous nits
were eligible for direct fix. **Zero `app/` files were changed** — the audit found no nit that survives the
repo's established conventions without becoming a cross-spec unrelated edit (see each call below).

**Executor** | Kimi Code 0.31.1, `tokenrouter/kimi-k3-free`, in-session subagent run.

**Evidence inspected (all 11 sources read + all 22 consumers swept):**
`src/js/pages/{teacher-portal,teacher-schedule,teacher-library,teacher-students,teacher-outcomes,teacher-tasks,teacher-reports,teacher-profile,teachers,teacher,teacher-performance}.js`;
shared primitives `src/js/components/portal-page.js` (pageHead/secHead/gateNote/plannedCard/dayRail/storyRow/flowStrip/guidePanel, `filter-bar.js`);
the `td-*` layer `src/styles/app.css:1290-1374`;
wiring — ROLE_NAV/PORTAL_PERSONAS `src/js/fixtures/portal.js:158-170`, `src/js/nav.config.js:143`, `src/js/pages/portals.js:19`;
and the 22 consumers in `app/public/` (each scope × AR/EN) swept by class/grep for `td-*`, `%`, `teacher-performance` links, `portal-shell`, body anchors, and inline-style signatures.

### Per-axis verdict (each measured in source AND rendered AR/EN consumer)

- **Hierarchy** — coherent. Each of the 8 portal pages renders **exactly one** `td-focus` (measured 1|1 AR|EN each for teacher-portal/schedule/library/students/outcomes/tasks/reports/profile). Portal cadence is uniform: `pageHead → section(td-focus) → gates → closing .pt-note`. Admin pages follow `pageHeader → summaryCards → tablist`. No hierarchy inversion found.
- **Design tokens** — reused. The `td-*` layer is shell-neutral (`--td-accent: var(--pt-accent, var(--c-primary))`, app.css:1304) so one layer serves portal teal + admin primary. Every filtered count/fact row reuses `statusChip`/`workloadChip`/`signalChip`/`teacherStatusChip`/`outcomeChip`/`statMini`; no `.def-anomaly` or duplicate `.def-*` dotted pattern detected in the 11 modules. Authored categorical quality/trend chips (KPI_QUALITY/PERF_TRENDS) are labelled chip vocabularies, not scores.
- **Duplication** — no executable duplication. `railStops`/`rosterChip`/`weekDay`/`rosterCard`/`fieldCard`/`taskCard`/`progressCard`/`kpiRow`/`statMini`/`preview` each do one job; shared behaviour (filter/search via `data-filter`, tabs `#view=`, gates via `plannedCard`/`gateNote`) is reused, not re-implemented. `teachers.js` preview and `teacher.js` banner share `avatar`/`sheetRow` but serve different surfaces — acceptable, not copy-paste drift.
- **390px mobile transformation** — present and honest. `td-actions` → 2-col grid ≤560px (app.css:1348-1352); a containment guard `max-width:100%` at 390px (1357-1361); repeated-record density is handled structurally (teacher-performance quality chip moves into the identity block, teacher-performance.js:117-120; `statMini` in `grid grid-cols-4`). No min-width or percent-height traps introduced.
- **Unsupported/invented modules** — **none**. No form, persistence, computed metric, analytic, pay, rank, score, or leaderboard. Measured: **0 `%`/`٪` in all 11 consumers**; **0 `style="width:N%"`** bars; FR-031 confirm — `teachers.js` reads `workload` only, **never `.util`** (no `avgUtil`), and the `trn.sum.*` summary row carries no percent (grep 0). Every write path is a labelled `gateNote`/`plannedCard`/`button` with `data-disabled-reason`=`backendRequired` — never a fake submit/toggle.
- **Portal/admin separation (FR-009)** — clean. The 8 portal pages render inside `.portal-shell` (1 each, 0 `sidebar`); the 3 admin pages (`teachers`,`teacher`,`teacher-performance`) carry no `portal-shell`, they inherit the admin `sidebar`. `nav.config.js:143` pins `teacher-portal` as *never an admin nav item*; ROLE_NAV teacher entries (portal.js:158-167) never target `teacher-performance`; and **0** body links to `teacher-performance` exist in any of the 8 portal consumers. Admin sidebar legitimately cross-links all pages incl. `teacher-performance` + `finance#view=salaries` — that is the admin role-index, not portal chrome.

### Defect list (T058 audit) — **all LOW severity, zero fixed in-source (each would be an unrelated cross-spec edit, so flagged, not touched)**

| # | file | :line | defect | sev | disposition |
|---|------|------|--------|-----|-------------|
| T058-01 | teacher-schedule.js | 60,64 | two one-off **student-key re-borrows** of the student schedule vocabulary (`prt.stu.weekTitle/weekFriNote/weekToday`) on the teacher schedule page, instead of teacher-scoped keys. Cosmetic/functioning; pre-existing, shared with the student schedule page. | LOW | vetted no-fix (rename owned by the locale batch); recorded |
| T058-02 | teacher-reports.js | 27 | `REPORT_KPIS` values are authored **fixture literals** consumed via shared `kpiRow`; fine *numerically*, but they read as real counters (24/4/3) with no authored breakdown — borderline "invented metric" surface, no enforcement needed today. | LOW | vetted no-fix (spec deliberately reframed perf→academic counts); recorded |
| T058-03 | portal-page.js | 58 `gateNote`, 82 `idHero` note | inline `style="padding:10px 12px"` + `pt-note` overrides the stylesheet token (app.css:944 padding 14px 16px), and `esc` is absent from two `t()` interpolations in `idHero`/`guidePanel`. | LOW | no-fix (component is shared across student/family/teacher homes since Spec 019; editing re-renders unrelated pages = forbidden drift) |
| T058-04 | teacher-portal.js | 83 | `style="font-size:11px"` on the section-head count-chip bypasses the `.pt-sec-hint` token (12px); plus the shared-component informal pattern `style="flex:1;min-width:0"` appears **41×** in portal body content as a floating layout helper instead of a utility class. | LOW | no-fix (idiom shared with student/family pages; a class would be a new token = scope creep) |
| T058-05 | teachers.js | 14 + 22 | two **dead imports** — `button` (never called; only referenced in an HTML comment) and `FORM_STATUS_OPTS`'s peer import is fine but `avatar/button` line shows `button` is carried unused. Zero runtime effect after build prune. | LOW | flagged for lead; NOT removed here (it's a servicing edit to a shared import line that sits directly above the Spec-041 `teacherCategories` comment block) |
| T058-06 | teacher-performance.js | 121 | **local name shadowing** — the page's `function kpiRow(tr)` hides the shared `kpiRow` from `components/portal-page.js` (which this page does not import, so no bug). Readability hazard only; functionally sound. | LOW | vetted no-fix (correct as-built; a rename would churn an accepted file with zero behavioural gain) |

**Nit scan conclusion:** of these six, the only *unambiguous, batch-tied* candidate was T058-05's dead `button`
import — but it is interleaved with the Spec-041 `teacherCategories` tab block and sits in an `admin` file
outside the eight-portal focus; removing it yields zero behavioural or byte change (bundles tree-shake), so the
safe/honest call under the minimal-edit contract was to **flag rather than touch**. **No source file was edited
and no consumer was regenerated** for this audit.

**Gate results (review batch — this run actually executed):**
- `npm run build` — **PASS / exit 0, 114 pages + index** (this run, 06:26). ⚠ **honest disclosure:** the build is
  the mandated regenerate path and it rewrote all Teacher consumer bytes from the **current working-tree
  sources** (which already held another batch's accepted Spec-045 edits). So `git status` shows 22 `app/public/*`
  files modified *pre-existing session work*, plus this build's regeneration — **I authored zero of those bytes
  by hand**; the only file I wrote outside `app/public`'s regenerated output is this ledger entry. Sources were
  not edited by me at all.
- `npm run test:smoke` — **not re-run** (deliberate skip). The 114-page smoke self-spawns `serve.cjs` on the
  shared `:4178`; with concurrent batches in flight and a read-only audit, the only-valid outcome is the port
  being free, so re-running buys no signal and risks a false `EADDRINUSE` collision. Recorded as skip, not pass.
- `npm run test:a11y` — **not re-run** (300-state matrix; previously recorded critical=0/serious=0 on the
  committed matrix per T062). I changed zero `app/` source bytes by hand → no new a11y exposure to re-measure.
- `npm run screenshots` — **not re-run** (no visual change; matrix already accepted at 80-frame + 411-capture
  coverage per T060/T062).

**Flagged upward to the lead:** T058-05 (dead import; a one-word cleanup they may batch with the next
`teachers.js` touch) and T058-01/T058-02 (naming/semantics calls that belong to the locale/spec owners, not to a
minimal review batch). No defect rises above LOW; none blocks the spec. **Verdict: audit complete, acceptance
recommended — no corrections ordered.**
