# Research & Decisions — Spec 018 (D1–D15)

Grounding: the measured frames (admin ≈3,800px; student ≈5,400px; teacher ≈6,600px — all captured this session); legacy role homes (short, sidebar-driven — frames re-inspected); `build-html.mjs` PAGES table (read: portal entries lines 82–85; shell call line 130 passes NO activeId → default `'home'`); the 017 smoke portal block (in-context); the admin `dashboard.js` anatomy (`kpiRow` + `sectionHeader` + short bands).

**D1 — Calibrated ceiling.** **2,200px** scrollHeight at a 1366×768 viewport for each role home (+ a 900px floor against vacuous pages). Budget: header ≈140 + KPI row ≈150 + now band ≈320 + core ≈380 + preview ≈300 + quick links ≈230 + note ≈70 + shell chrome ≈180 ≈ **1,770px** → 2,200 gives AR-wrap/EN headroom. The 1–2-screen PRINCIPLE is binding; the constant may retune ±10% at implement time if a band legitimately needs it, with the retune recorded in REVIEW.md. Asserted via a new smoke probe (set viewport 1366×768 → `document.documentElement.scrollHeight`).

**D2 — Band mapping.** Exactly **7 `.pt-section` bands** per home in the spec's order (assert window 4–7 to allow the note-as-div variance): header band (compact, replaces hero) · KPI row · now band · role-core · preview · quick-links · (closing note stays a `.pt-note` div, not a section). Every current section resolves per the spec's displacement table — verified as a checklist during the home rewrites.

**D3 — Admin primitives, portal-side.** Re-express (never import admin CSS/classes): `.pt-kpi` = the compact stat card (icon medallion + `num()` figure + label — the admin kpi-card rhythm in portal tokens) · band headers = `pt-sec-head` + a drill-down affordance slot (link when the target exists — e.g., the 5 child links live on cards; quick tiles carry the planned treatment) · today list = existing `.pt-card` rows capped at 3 · quick-link tiles = `.pt-tile` variant with icon. All additive CSS inside the `.portal-shell` namespace; zero admin selectors touched.

**D4 — family-child registration.** The PAGES table lives in `build-html.mjs` → **the ONE sanctioned touch = exactly 2 lines**: the `renderFamilyChild` import + the PAGES entry `{ base: 'family-child', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: null, titleKey: 'prt.title.familyChild', render: renderFamilyChild }`. Line 130 is NOT touched — the shell default keeps **home as the active nav anchor on the child page** (correct drill-down semantics: the page is reached from home; home remains the app anchor). `prt.title.familyChild` is a declared ADDITION to the shared title map (additions sanctioned; rewording frozen keys is not).

**D5 — Child profile data model.** Existing fixtures only: the five fam1 children st1/st6/st11/st12/st13 (NOT st1–st5 — the brief's `st2…st5` ids are corrected to the REAL fam1 roster, recorded here; link targets become `#child=st1|st6|st11|st12|st13`). Per-child panel content resolves from: students.js (name/level/subject/progress/statusId/groupIds) · SUBJ maps (course/teacher) · SESSIONS_FULL+todayChildren (today/next where real) · FAMILY_PREVIEW (kidHints/teacherNotes/signals per child where real) · NEW authored `CHILD_PROFILE` slices in `fixtures/portal.js` (per-child homework/materials summary lines + attendance mini-trio) — authored literals, zero computed, zero money-like fields.

**D6 — Hash/tab behavior.** The child switcher = five baked panels + a baked switcher row using the EXISTING tabs machinery (`data-tab`/`[data-tabpanel]` hooks + `#child=` hash, the Spec-003/admin-profile pattern; enhance.js already handles it — zero new hooks). Default visible panel: **st1** (no-JS safe). Deep links `#child=stX` select the panel on load exactly as admin `#view=` does.

**D7 — Smoke re-scope strategy.** ONE amendment, enumerated: (a) the three home branches REPLACE their long-home floors (student: gauges≥2/sections≥10/empty≥1 → KPI-row===4 + section window 4–7 + ceiling probe + bodyAnchors===0 stays; family: bars===5/sections≥10/empty≥1/bodyAnchors===0 → KPI===4 + window + ceiling + **bodyAnchors===5 w/ exact child targets** + zero-pay regex BYTE-VERBATIM; teacher: sections≥10/empty≥1/avatars≥6 → KPI===4 + window + ceiling + bodyAnchors===1 exact perf target BYTE-KEPT + payHit BYTE-VERBATIM); (b) NEW family-child branch (see D8); (c) PAGES list + PORTAL_PAGES gain `family-child` (50 smoke loads); (d) planned-tone counts re-pinned to the compact placements; (e) 390 probe + tables===0 extended to family-child; (f) Shell-v2 asserts (7/8/7, drawer, shell-anchor multiset 5) UNTOUCHED for the three homes. The 013/014/015 branch edits are the sanctioned re-scope this corrective spec exists for — reviewed as one diff.

**D8 — Anchor registries after the rework.** Family HOME: shell anchors unchanged {self×2, hub×3}; body anchors **=== 5**, all matching `family-child(\.en)?\.html#child=(st1|st6|st11|st12|st13)`, each id exactly once. FAMILY-CHILD page: shell anchors unique {family-portal, portals} multiset 5 (home×2 + hub×3; navCurrent = 2× family-portal); body anchors === 0; formControls 0; zero-pay regex; 5 panels + switcher asserts (5 `[data-tab]` triggers, default st1 visible). Student home body 0; teacher home body 1 (unchanged).

**D9 — Identity target.** 51 built files after the pair. Changed: `student-portal`, `family-portal`, `teacher-portal` pairs + NEW `family-child` pair (8 files; 2 new) → **43/51 hash-identical** (40 admin + `index.html` + the `portals` hub pair). Hub untouched (its copy already speaks dashboard).

**D10 — Teacher audit scope.** The home rewrite rewrites teacher copy/structure → all three layers re-run with the EXTENDED set (incl. money|currency|أتعاب|فلوس|دولار): source (page module + new fixture slices + new keys, incl. comments) · built pair · payHit byte-verbatim. New KPI labels checked at authoring time (حصص اليوم · متابعات · مهام مفتوحة · طلابي — clean).

**D11 — Displaced-content retention.** Rule: NO fixture field or locale key that fed a displaced section is deleted in 018; the G-audit greps that the displaced keys (e.g., `prt.stu.ach*`, `celeb*`, `prt.tch.flow*`, `prt.fam.req.*`) still exist in the overlays; 019–021 re-render them on their pages; only THOSE specs may retire what they consciously replace.

**D12 — Sequence append.** `future-spec-sequence.md` (016) gains an append-only "Amendment (user-directed, Spec 018)" section recording the renumber (019 student · 020 family · 021 teacher · 022–027 admin · 028 QA) and that 018 was inserted as a corrective spec; the original table stays untouched (history preserved); the matrix gains the standard delivery annotation at completion.

**D13 — Shell v2/ROLE_NAV.** UNTOUCHED — the rework happens entirely inside `#page-body`; the child page consumes the existing family shell via its PAGES entry. (The 017 home-integrity byte-guarantee is superseded BY DESIGN for the three homes — that guarantee protected 017's wrapper-only claim; 018 is the sanctioned content rework.)

**D14 — Admin diffs.** None possible by construction (no admin file in the allowed list; CSS additive in the portal namespace; the build-html touch adds a portal entry only) — verified by the 43/51 hash audit + G2 diff-empty checks.

**D15 — Screenshots & height records.** REVIEW.md gains a before/after height table (the three homes, 1366×768 measurements pre/post). Frames: 3 compact homes (AR light desktop + AR mobile) · teacher AR dark · one EN desktop · `family-child` AR light desktop + mobile + ONE SWITCHED-CHILD frame (capture step clicks the st11 tab) · hub + admin unchanged proofs. Capture additions are additive rows + one `childTab` click step.

## Addendum — additional legacy frames visually reviewed (user-requested sweep, 2026-07-04)

- `family/student-studentslist-full.png` — "All Account Subscriptions": one row per child×course w/ History + Feedback-About actions and a per-student filter → the per-child row ancestor of the family-child panels; table-based, empty test data.
- `family/student-student-history-fillter-2-full.png` — **the legacy child-inspection flow**: Select-Student dropdown + Submit → history table. Direct evidence FOR the 018 drill-down decision: same business idea, rebuilt as five real links + baked panels instead of a form-filter.
- `family/student-billing-full.png` — view-only billing table incl. an Amount column, NO pay button (crawler finding confirmed visually). Our status-only/zero-figures line is stricter than legacy by design.
- `teacher/teacher-studentslist-full.png` — roster with per-student View-History / Show-Schedule / Monthly-Report / all-plans buttons → grounds Spec 021 `teacher-students`; capabilities already dispositioned in coverage §9 (T8/T9/T20).
- `teacher/teacher-timetable-full.png` — 12AM-first hour×day grid with tiny blocks — the exact dense-grid anti-pattern the freeze bans for role apps; the day-grouped agenda remains the sanctioned replacement.

Frames deliberately deferred to their owning specs: family today-sessions/request-trial (→ Spec 020 grounding) · teacher monthly-plans/course-history (→ Spec 021 grounding) · pay-surface frames stay unopened-by-policy beyond the already-reviewed salary evidence.

**SUPERSEDED 2026-07-04 — visual-grounding gate closed.** The user directed a full pre-implementation
visual sweep; the deferrals above were pulled forward and completed. The complete evidence record
(23 frames, folders census, the required conclusions 1–8, zero decision changes) lives in
[`visual-grounding-addendum.md`](visual-grounding-addendum.md); `tasks.md` gained the T000 gate.
Headlines: the legacy guardian profile page is a **500 error** (family-child fills a gap legacy never
delivered) · the mislabeled `teacher-update-result…` frame is actually the legacy **Salary Class
Report** (outcome↔salary coupling = hard evidence for the pay-free law) · the legacy teacher Tasks
page uses a native KPI-tile row (legacy precedent for the KPI band) · both legacy libraries open with
marketing heroes (the banned landing anti-pattern, now visually evidenced).

## Implementation amendment — D6/D8 child-switch mechanism (recorded 2026-07-04, during T005)

**Discovered at implement time:** the frozen `enhance.js` tab machinery reads the URL hash as `#view=` ONLY
(`initTabs`: `location.hash.match(/view=([a-z0-9-]+)/i)`, hard-coded). It does NOT read `#child=`. So the
`data-tab`/`[data-tabpanel]` path assumed by D6 ("enhance.js already handles it") **cannot** drive the MANDATED
`family-child.html#child=stX` deep links without editing a frozen file — which is forbidden.

**Resolution (honors the mandate, zero frozen-file edits, zero new JS hooks):** the child switcher is implemented
in **pure CSS** — `#child=stX` fragments target `id="child=stX"` panels via `:target`, with `:has()` selecting the
default (st1) when no fragment is present, and highlighting the active pill. This is fully static / no-JS-safe (more
aligned with the "static HTML-first" constitution than a JS dependency), works for deep links + default + switching,
and was verified in the Playwright Chromium (default→st1, `#child=st11/st13/st6` all switch, exactly one panel
visible). **Consequences vs the original D6/D8:** the switcher is five `<a href="#child=stX">` pills, so the
**family-child page body carries 5 hash anchors** (the switcher), not 0 — D8's "family-child body === 0" is amended
to **=== 5** (all `#child=(st1|st6|st11|st12|st13)`; smoke pins this). The three homes and the family-home
body-anchor count (===5 child drill-downs) are unaffected. This is the only decision that changed during
implementation; everything else (ceiling, bands, KPI===4, identity 43/51, pay-free, displacement) landed as planned.
