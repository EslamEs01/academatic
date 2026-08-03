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
