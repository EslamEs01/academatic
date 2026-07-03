# Research & Decisions — Spec 014 Family / Guardian Dashboard

All fourteen required decisions resolved. Format: Decision · Rationale · Alternatives considered. Grounding: spec.md; the Spec-012 coverage artifact §2 (F1–F17) + §7 (013 deliveries); fresh fixture reads (fam1 = 5 children with real per-child outcome signals; `data.fam.fam1.plan` = «الخطة المتقدمة» — a pure amount-free label; `fam.plan.perHour` = «ريال/ساعة» — the currency key the family page must NEVER reference); the capture-verified legacy sweep (billing genuinely view-only with zero rendered amounts; NO global child-switcher in legacy; the rubric/cancel/trial/upload field inventories; the 10/8/8-column table anti-patterns; zero empty-state design).

---

**D1 — Final section order.**
**Decision**: 12 sections answering the guardian's six questions in urgency order:
1. **Hero** (guardian name · family summary line · today reassurance · plain-text next-action hint — no anchor, no date, no notification count)
2. **My children** (all five inline, deepened cards — D2)
3. **Today's sessions** (child-associated cards)
4. **Attendance & progress signals** (the "is anyone behind?" band — D9: authored family trio + real-outcome gentle chips + reassurance line)
5. **Teacher notes** (deepened, child-associated)
6. **Recent sessions** (guardian F6 mirror — D7 + full-history planned mini-card)
7. **Plans & subscriptions** (per-child plan labels, zero amounts — D3)
8. **Billing status** (settled/attention status, zero figures, backendRequired gate — D3)
9. **Requests & communication hub** (ONE section, four honest preview cards: cancel/reschedule · feedback-about-teacher · meetings (the truthful empty state, D10) · request-trial/add-child — D4/D5/D6)
10. **Family materials** (display-only cards + download gate — D8)
11. **My account** (guardian contact + children relation + backendRequired edit note)
12. **Closing honest note** (delivered-state; live/requests/payment backendRequired; communications = Spec 016)
**Rationale**: children-first (question 1), then today (2), then the reassurance band (3), then what teachers said (4), then money-status (5), then "do I act" gathered in ONE hub (6) — grouping the four request previews into a single hub keeps the page calm (the spec's defining adjective) instead of scattering four thin sections.
**Alternatives**: 15 separate sections per the spec's area list (rejected: fragmented, anxious-feeling; the hub satisfies FR-010…FR-013 as labeled sub-cards); billing before teacher notes (rejected: children/learning before money — trust order).

**D2 — Multi-child pattern: everyone-inline, no switcher.**
**Decision**: all five children render as deepened inline cards (name · level · labeled lifecycle chip · gentle progress bar · per-child today/signal hint). NO switcher control of any kind — not even a labeled preview toggle.
**Rationale**: the capture proves legacy had NO global switcher (per-page selects only; the top-bar switcher was a rebuild aspiration) — so nothing is lost; five cards fit one calm grid; and omitting the control entirely is the strongest honesty (the fake-switch trap cannot exist). The Spec-012 kidsHint copy («التبديل الكامل يأتي مع لوحة العائلة في ٠١٤») is REPLACED by honest post-014 copy — the switching promise resolves as everyone-visible-at-once (recorded in the coverage note for F2).
**Alternatives**: real baked per-child tabs via the existing `data-tab` hook (rejected: hides four children behind clicks — worse for "how are my children doing at a glance"; adds interactivity for no value at 5 children); labeled focus-preview card (rejected: redundant next to five full cards).

**D3 — Billing/subscriptions graduation with zero pay figures.**
**Decision**: **Subscriptions** = per-child rows: child name + plan label (`data.fam.fam1.plan` «الخطة المتقدمة» family-wide + per-child lifecycle chip active/trial) — no amount, no renewal control. **Billing** = ONE calm status card: an authored «جميع الفواتير مسوّاة» settled chip (tone-completed) + a reassurance line + the `.pt-planned` mini-card **«الفواتير والدفع»** classed **backendRequired** (viewing real invoices and paying requires the billing backend). ZERO currency tokens: `hourRate`, `plan.perHour` («ريال/ساعة»), and any digit-with-currency never render; the D11 smoke regex polices the built body.
**Rationale**: matches capture-verified legacy truth (view-only, zero rendered amounts) while upgrading it (legacy had a raw 8-column empty table; we give a status answer to "are there billing issues?"); the settled status is an authored display literal like every portal number.
**Alternatives**: per-invoice preview rows without amounts (rejected: invoice rows without figures look broken and invite "where's the amount?" confusion); showing amounts as "fixture/static" (rejected: the spec's hard line and the standing zero-pay spine).

**D4 — Cancel/reschedule/absence request preview.**
**Decision**: a preview card in the requests hub: title «إلغاء أو تأجيل جلسة» + two display-only option lines (with-reschedule / without-replacement) + the honest caution as a `pt-note` («تنبيه: عند الإلغاء دون تأجيل لا تُعوَّض الجلسة») + an inline **backendRequired** availability chip on the card (submitting the request requires the backend). NO radios, NO date/time inputs, NO submit.
**Rationale**: carries the F3 capability shape (the captured modal's two types + its exact warning concept) as an honest preview; inputs would be a fake form.
**Alternatives**: disabled form fields (rejected: disabled inputs read as broken, invite interaction, and add a11y noise); a planned mini-card only (rejected: loses the educational preview of what can be requested — the "what to know" value).

**D5 — Feedback-about-teacher rubric preview.**
**Decision**: a preview card listing the capture-verified rubric dimensions as display-only question lines (see/hear clarity · what you like · anything to improve · optional comment — gentle re-wordings, no legacy private copy, no "rating/score" vocabulary) + an inline **backendRequired** chip (submitting feedback requires the backend).
**Rationale**: shows the guardian what feedback covers (F8 capability) without a fake rubric control; avoiding rating-scale visuals keeps clear of score/rank adjacency.
**Alternatives**: star-scale mockup (rejected: fake control + rating-visual adjacency); deferring wholly to a planned card (rejected: loses the capability preview the spec mandates).

**D6 — Request-trial / add-child preview.**
**Decision**: a preview card with the two paths as display-only mini-tiles — «طفل جديد» (name/age/language/gender concept line) and «طفل حالي» (choose-from-my-children concept line) — + an inline **backendRequired** chip (submitting the trial request requires the backend).
**Rationale**: preserves the captured wizard's defining distinction (new-vs-existing child) as knowledge, not as a fake two-step form.
**Alternatives**: rendering the wizard steps as disabled tabs (rejected: interactive-looking, hook pressure, fake).

**D7 — Guardian history mirror (F6) card shape.**
**Decision**: «آخر الجلسات» renders 3 records — **real `out1`** (st1 · math · sara · attended chip · `data.att.fb.good`) and **real `out15`** (st11 · math · sara · studentAbsent chip + follow-up framing · `data.att.fb.support`) resolved from `SESSION_OUTCOMES`, + 1 authored record (st6 · science · khalid, reusing the established note pairing) — each card: **child** + course + teacher + authored day label + summary line + homework-note line (the F6 field pair), outcome chip where fixture truth exists. Section closes with the `.pt-planned` mini-card **«السجل الكامل»** classed **planned**.
**Rationale**: the guardian mirror differs from the student view by leading with the CHILD; anchoring the absent record on real `out15` makes the "is anyone behind" story truthful end-to-end; mirrors the proven 013 shape.
**Alternatives**: more records (rejected: calm reflection, not a log); modal details (rejected: legacy-clone interaction).

**D8 — Family materials policy.**
**Decision**: 3 authored child-associated material cards (title + type icon + child ref) display-only + the `.pt-planned` mini-card **«تحميل الملفات»** classed **backendRequired**. No links (no student-appropriate local targets exist — the standing D7-013 logic), no search/filter shell.
**Rationale**: delivers the family slice of F12 with the same honesty geometry as the student materials section — consistent portal language.
**Alternatives**: linking to admin course pages (rejected: portal-separation breach); search box (rejected: dead control).

**D9 — Attendance/progress signal strategy.**
**Decision**: the signals band = (a) the authored family trio kept from the foundation (attended ١٢ · upcoming ٣ · «تحتاج متابعة» ١ — authored literals, relabeled gently); (b) a **needs-attention row grounded in REAL outcome rows**: st11 → card with the real `studentAbsent` outcome chip + «غياب واحد — متابعة لطيفة مع سارة» framing; st13 → card with the real `cancelled` chip + trial framing («جلسة ملغاة خلال الفترة التجريبية»); (c) a closing reassurance line «بقية الأبناء على المسار الصحيح ✅». Per-child progress stays on the children cards (authored fixture literals).
**Rationale**: answers "is anyone absent or behind?" with fixture truth (out15/out12 are real rows), in a calm two-card form — the opposite of a KPI wall; the trio stays authored per the standing every-number-authored rule.
**Alternatives**: deriving trio counts from `outcomesOfFamily('fam1')` (rejected: derivation is engine-adjacent and the standing rule says authored); listing all five children's outcomes (rejected: noise; the band is for attention, the cards carry the rest).

**D10 — Truthful empty-state site: meetings.**
**Decision**: the meetings preview card renders the reusable `.pt-empty` pattern truthfully — «لا توجد لقاءات مجدولة — كل شيء على ما يرام 🌿» — because NO meetings entity exists anywhere in the fixtures (and the legacy capture itself was empty); plus an inline **planned** chip for requesting a meeting.
**Rationale**: the only genuinely empty family surface (like 013's Friday); doubles as the F10 delivery (status: none scheduled) and demonstrates the reassuring-empty mandate (FR-016).
**Alternatives**: faking a scheduled meeting (rejected: fabrication with no fixture anchor); empty sessions-today (rejected: fam1 has real today sessions — would be a lie).

**D11 — Family smoke re-scope (family branch only).**
**Decision**: inside the Spec-012 portal block, amend ONLY the family expectations: planned-card count **3 → 4** with new semantics `{billingGate: backendRequired, matDownload: backendRequired, fullHistory: planned, meetingRequest: planned}` (assert via the 013-proven chip-tone mechanism: `.pt-planned .chip.tone-amber === 2` + `.tone-neutral === 2`); NEW family asserts: five-children check (kids section renders 5 child cards), `.pt-empty ≥ 1`, `.pt-section ≥ 10`, `bodyAnchors === 0`, **zero-pay regex** on the family body (`/ريال|ر\.س|\bSAR\b|\bUSD\b|[$€£]|pay now|ادفع الآن|سداد/i` → 0 hits), localized-digit check (existing gaugeAscii covers it), and the **390px probe** extended to the family page. The plannedBad rule applies unchanged. **Student branch, admin-scoped, teacher, and hub assertions stay byte-verbatim.**
**Rationale**: same sanctioned-reconciliation discipline as 012/013 — the family branch gets stronger, nothing else moves; the currency regex makes the zero-pay hard line machine-enforced, not just reviewed.
**Alternatives**: keeping count 3 by merging gates (rejected: would under-gate the graduated sections); a separate test file (rejected: harness fragmentation).

**D12 — Byte-identity protection.**
**Decision**: post-build hash-compare vs HEAD must show **47/49 identical** — 40 admin + `student-portal`/`teacher-portal`/`portals` pairs + `index.html`; only the family pair changes. Enforced by construction: page edits confined to `family-portal.js`; fixture edits confined to `FAMILY_PREVIEW` + `PORTAL_PLANNED.family`; locale edits confined to new `prt.fam.*`/`data.prtFam*` keys (shared `prt.shell/portal/role/hub`, sibling `prt.stu.*`/`prt.tch.*`, `data.prtStu*`, `data.prtNote1/2` frozen — EXCEPT the family-owned `prt.fam.kidsHint` copy update sanctioned by D2, which lives inside the family namespace and only affects the family page); CSS additions are new selectors only (external file — cannot affect other built HTML anyway); all G2 files untouched.
**Rationale**: the proven 012/013 standard; namespace confinement makes it cheap to hold.
**Alternatives**: body-scoped comparison (rejected: weaker, unnecessary).

**D13 — Screenshot matrix & mobile checks.**
**Decision**: additive MATRIX entries: family **ar/light**, **ar/dark**, **en/light** desktop + **ar/light mobile 390** full-page (the four exist from Spec 012 — re-captured naturally) + **six element-scoped area frames** (the 013 `s.area` mechanism): children overview · today sessions · signals+notes · billing+subscriptions · requests hub · history+materials. Unchanged proofs: student, teacher, hub, admin dashboard (ar/light). Mobile correctness double-checked by the D11 390px probe; dark contrast by the existing family a11y scenarios (ar/light, ar/dark, en/light from Spec 012) re-run against the deepened page.
**Rationale**: mirrors the accepted 013 pattern; the area mechanism already exists — zero new capture machinery.
**Alternatives**: viewport-scroll crops (rejected: brittle); fewer area frames (rejected: the user's minimum list names six areas).

**D14 — MVP & sequencing.**
**Decision**: Baseline gate (build+tests green, HEAD recorded, REVIEW stub) → fixtures + locales (all `FAMILY_PREVIEW` extensions + `prt.fam.*`/`data.prtFam*` keys, key-mirrored) + small CSS bits → **Band A: hero upgrade · children deepening · today band · signals band (D9)** → **family smoke re-scope (D11)** — green = **MVP** → **Band B: teacher notes deepening · history mirror (D7) · subscriptions · billing status (D3)** → **Band C: requests hub (D4/D5/D6) · meetings empty state (D10) · materials (D8) · profile slice · closing note** → byte-identity audit + full G-audit set + prior guards → a11y + screenshots (incl. 6 area frames) + REVIEW verdicts → coverage §8 delivery notes → docs (README/CLAUDE).
**Rationale**: Band A alone answers the guardian's top three questions with tests green — a true MVP; Bands B/C are additive sections with no cross-dependencies; one smoke amendment reviewed as one diff.
**Alternatives**: per-section test updates (rejected: the single sanctioned amendment stays reviewable as one unit).
