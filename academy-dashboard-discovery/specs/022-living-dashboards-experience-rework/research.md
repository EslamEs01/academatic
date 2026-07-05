# Research — Spec 022: Living Dashboards Experience Rework (D1–D24)

Grounding: `visual-grounding.md` (16 frames, L2–L10/C1–C10) · `dashboard-diagnosis.md` ·
`role-reclassification-scope.md` · Spec 021 decision record (binding) · live code reads of
portals.js, portal-shell.js, portal-page.js, fixtures/locales, app.css, smoke run.cjs (this session).

- **D1 — Grounding sufficiency**: SUFFICIENT, no amendment. All 12 required areas covered by
  opened frames (hub C1 · legacy family L2 · legacy teacher L4 · legacy admin L5 · current family
  C4 · current teacher C3 · current student C2 · fold point C5 · family internals C6/C7 · celebration
  language C10 · mobile C8 · dark C9 · legacy day surfaces L9/L10).
- **D2 — Rebake scope (final)**: exactly 22 built files change — `portals` ×2, `family-portal` ×2,
  `teacher-portal` ×2, ALL 14 student files (home body redesign + the locale-level brand reframe
  rebakes the six internals' shells), `family-child` ×2 (the ONE preview link). **`family-children`
  is NOT touched** (D8). All other 55 files byte-identical.
- **D3 — Hub plan**: `portals.js` reworked: the `ROLES` primary array becomes `[family, teacher]`
  (hub cards), the admin band stays, and a NEW demoted child-view row renders BELOW the grid — a
  compact `pt-guide`-style card: title «عرض الابن — معاينة», copy «معاينة لوحة الابن ضمن رحلة
  العائلة (شخصية العرض: سلمان)؛ دخول الأبناء يُدار عبر حساب العائلة», one real link →
  `student-portal(.en).html`. Hub hero copy refreshed to name the three primary roles. The hub's
  existing `.pt-hero` block is upgraded in place (it already exists — C1/portals.js:31).
- **D4 — Student demotion**: hub demotion (D3) + locale re-label of the role identity everywhere
  the shell bakes it: `prt.portal.student` «بوابة الطالب»→«عرض الابن» · `prt.role.student`
  «طالب»→«ابن العائلة» · `prt.title.student`→«عرض الابن» · `prt.hub.student.t/d` rewritten as the
  demoted-entry copy (EN mirrored). `ROLE_NAV.student` structurally untouched; no file deletion.
- **D5 — student-portal disposition**: child-view HOME (Option B+ confirmed): the body adopts the
  shared living primitives (idHero + dayRail + storyRow over the existing authored student facts);
  the six-sibling quick links, the two gates, and all content facts survive re-expressed.
- **D6 — Six internals reframe WITHOUT body rebuild**: proven zero-module-touch — the shell brand
  line bakes `prt.portal.student` and the chip bakes `prt.role.student` (portal-shell.js:50,55,79);
  re-labeling those locale keys reframes all six pages' shells; their `#page-body` content is
  untouched by construction (extraction-hash proof per page at implementation).
- **D7 — family-child fold point**: ONE honest preview panel in the page's intro area (before the
  switcher): «افتح عرض الابن الكامل — معاينة توضيحية (سلمان)» with one real link →
  `student-portal(.en).html`. Body anchors re-pin (the 5 `#child=` switcher links + 1 real link);
  the 5-panel/:target/default-st1 asserts stay BYTE-KEPT. This SUPERSEDES the 020 byte-equality
  preservation assert — declared, not silent (the 020 assert is re-pinned to the new extraction
  hash after the single sanctioned addition).
- **D8 — family-children links**: **REJECTED — no links added.** The child-view demo exists only
  for st1 (Salman); per-card links on st6/st11/st12/st13 would open Salman's data under another
  child's name — a fake-view lie. The single honest entry lives at the fold point (D7) whose copy
  names Salman explicitly. family-children stays byte-identical; its smoke asserts stay byte-kept.
- **D9 — Family home structure (5 bands, ceiling-safe)**: ① violet `idHero` (greeting +
  chips + 3 contextual counters: الأبناء ٥ · جلسات اليوم ٣ · تحتاج متابعة ١ — each with a story
  line) replacing pageHead+KPI row · ② family `dayRail` (the 3 today sessions + next as stops;
  child-tagged; now pulses/next emphasized/done dims) replacing the session-card band · ③ the five
  child cards upgraded in place (avatar tone, animated `.pt-bar`, latest-signal story line reusing
  kidHint facts, drill-down kept) · ④ `storyRow` band: billing settled story + requests/meeting
  gate stories (zero-pay copy pre-checked) · ⑤ quick links w/ `pt-lift` affordance + the note.
  Body anchors: 12 real links preserved; stories may ADD real links (exact count pinned at
  implementation, set-equality kept).
- **D10 — Teacher home structure (6 bands, pay-free)**: ① teal `idHero` (المعلمة سارة + counters:
  حصص اليوم ٢ · متابعات ٢ · مهام مفتوحة ٣) · ② teaching `dayRail` (room/course/count/status stops)
  · ③ follow-ups as priority `storyRow` (why + what next) · ④ `flowStrip` تحضير → حضور → تسجيل →
  مراجعة with the existing gate notes attached to the record step · ⑤ task chips w/ life ·
  ⑥ `guidePanel`-upgraded gates + planned-nav note. Zero pay tokens (extended set) at every layer.
- **D11 — Primitive home**: `portal-page.js` EXTEND-ONLY (the 020-proven convention). Five additive
  exports appended: `idHero(opts)`, `dayRail(stops, opts)`, `storyRow(stories)`, `flowStrip(steps)`,
  `guidePanel(gate)`; the six existing exports stay byte-identical (diff-prefix proof). Page-local
  duplication rejected (three consumers each → drift risk).
- **D12 — CSS strategy**: ONE additive `app.css` section `/* ==== Spec 022 · the living layer ==== */`
  appended at the end: tokens (`--lv-dur`, `--lv-ease`, per-role hero gradient pairs incl.
  dark-safe variants), classes `.pt-idhero` (NEW name — `.pt-hero` is taken by the hub),
  `.pt-rail`/`.pt-stop` (+ `.is-now/.is-next/.is-done`), `.pt-story`, `.pt-flow`/`.pt-flow-step`,
  `.pt-guide`, `.pt-lift`, `.pt-cele`; keyframes `lv-fill`, `lv-fadeup`, `lv-pulse`. ZERO edits to
  existing rules (additive proof: every pre-existing line byte-identical).
- **D13 — Reduced motion**: every `@keyframes` use and non-trivial transition in the living layer
  sits INSIDE `@media (prefers-reduced-motion: no-preference)`; the default (outside the query) is
  the complete static end-state (bars full, stops final, no pulse). Enforced by a CSS audit grep in
  the test pass (assert: no `lv-` animation reference outside the media query).
- **D14 — Closed-hook strategy**: ZERO new hooks, ZERO new storage keys — the living layer is pure
  CSS + baked markup. No new `data-tab`/`data-filter` usage on the homes (chips are display or real
  links); family-child's existing `:target` machinery untouched.
- **D15 — Teacher pay-free**: three layers re-run on the EXTENDED token set (EN incl.
  bonus/fine(s)/money/currency + AR incl. أتعاب/مستحقات/مكافأة/غرامة/فلوس/جنيه/ريال/دولار +
  EGP/SAR/USD/$/€/£): (1) source grep on teacher-portal.js + the LIVING fixture/locale additions,
  copy AND comments; (2) built grep on the teacher pair; (3) the payHit smoke assert BYTE-VERBATIM.
  Hero counters are hour/class/task counts only.
- **D16 — Family zero-pay**: the verbatim payFigure regex green on the rebaked family bodies
  (family-portal, family-child) AND all untouched internals (already per-page in smoke); the
  billing story copy on the family home pre-checked against the regex before build.
- **D17 — Smoke amendment (ONE diff)**: re-pins — hub branch (2 primary role cards exactly
  [family, teacher] + hubAdminLink + EXACTLY 1 demoted child-view link with its own probe; role
  targets set-equality) · student-portal branch (kpiCards 4→0 + idHero===1 + railStops===today
  count + bodyAnchors re-pinned: 6 siblings + any story links, set-equality kept; gates 1+1 KEPT) ·
  family-portal branch (idHero===1 + railStops + childRe/sibRe subsets KEPT + story-link delta
  pinned) · teacher branch (idHero/rail/flow probes; navWant 7/5/1 KEPT; planned pills 6 KEPT) ·
  family-child (+1 real anchor re-pin; panels===5/default-st1/switcher===5 BYTE-KEPT) · NEW probes
  in the evaluate() collector (idHero, railStops, flowSteps, storyRows, celeBadges) · a
  reduced-motion CSS audit. **BYTE-VERBATIM FOREVER: payHit · both payFigure/famPay regex lines ·
  the ENTIRE admin assert set · the FAMILY_INTERNAL branch (family-children incl.) · the
  STUDENT_INTERNAL content branch · hub/family/teacher/student Shell-v2 nav branches (nav counts
  unchanged).**
- **D18 — A11y rows**: + portals, family-portal, teacher-portal, student-portal, family-child ×
  (AR light + AR dark) + family-portal EN light sample; plus the D13 reduced-motion CSS audit
  (grep-based) reported alongside axe results.
- **D19 — Screenshot matrix**: BEFORE = the existing on-disk frames (C1–C9 already archived).
  AFTER: hub d/m · family home d/m/dark · teacher home d/m/dark · student child-view d/m ·
  family-child (fold-point proof) d · hub EN. REVIEW.md gets a before/after verdict table per
  surface + the living-primitives proof row.
- **D20 — Ceilings**: windows UNCHANGED ([900,2200] homes · [500,2200] internals — hub gets a
  [500,2200] pin added). The idHero replaces (not stacks on) the heading+KPI spread; expected
  deltas ≤ +150px/page. If any surface exceeds its window at implementation: STOP, trim bands —
  the +10% tune is the recorded LAST resort, never silent.
- **D21 — Identity target**: expected **55/77** (22 intentionally rebaked per D2); the exact number
  is computed and recorded honestly at implementation (T-gate), incl. the six student internals'
  `#page-body` extraction-hash proof (bodies byte-equal; only shells changed) and the family-child
  new-baseline extraction hash after the single link.
- **D22 — Docs strategy**: README portal section (living layer + corrected role model + Django
  notes for the demoted student view) · REVIEW.md Spec 022 section (D19 table) · CLAUDE.md rewrite
  at delivery · **016 `future-spec-sequence.md` gets the append-only DEC-009 amendment note**
  (021–032 supersession, user-sanctioned).
- **D23 — Hub ownership**: Spec 022 ABSORBS the hub rework completely (it is in-scope here);
  Spec 024 receives only what the 023 audit finds — no deferred hub debt.
- **D24 — Risks & stop conditions**: (1) family-child byte-equality supersession must land as the
  declared re-pin (stop if any OTHER body delta appears in extraction diff); (2) ceiling overflow →
  stop & trim (D20); (3) `prt.portal.student` re-label must not orphan any EN mirror (raw-key smoke
  guards); (4) portal-page.js existing exports must stay byte-identical (diff-prefix check; stop on
  any non-append change); (5) hero gradient contrast in dark → axe serious=0 is the gate;
  (6) `.pt-hero` (hub) vs `.pt-idhero` (homes) collision avoided by naming — stop if any selector
  in the living layer overrides a pre-022 rule; (7) family-children must show ZERO diff (D8) —
  stop if it rebakes.
