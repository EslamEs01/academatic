# Contract 5 — Academic Visual Redesign Handoff (BINDING on Specs 045–050)

**Canonical sources (cite by path + stable ID; never restate):**
`../visual-quality-and-academic-design-audit.md` (§1 verdict · §2 P-1…P-9 · §3/§4 V-T/V-F rows · §5 V-A rows ·
§6 page register · §7 X-1…X-8 · §8 D-1…D-6 · §11 fix-first) · `../page-review-ownership-map.md` §2 — the
**BINDING partition** (plan.md D2/D7): **045:11 teacher · 046:12 family · 047:12 child-view+session lifecycle ·
048:8 back-office+scheduling ops · 049:7 reports/courses/content · 050:7+`index`** = 57 bases + index = 58 review
units = 115 files. The visual audit's own §10 draft partition is a SUPERSEDED proposal (plan.md D2) — never cite
it for ownership. Charter: `../plan.md` **D8**; execution/validation routing: contract 14.

**Grounding (reopened AS IMAGES for this contract — the P-1/P-4 exemplars and both Priority-1 surfaces):**
- `app/screenshots/teacher-portal__ar__light__desktop.png` — SEEN: warm teal/mint identity, hero with 3 authored
  counters, inert day-rail cards (no affordance), the dashed «تسجيل النتيجة» card breaking a solid flow strip,
  and the quick-links band rendering **7 «قريبًا» chips for pages the same screen's sidebar links** (V-T1). Zero
  pay token anywhere (P-1 holds).
- `app/screenshots/family-portal__ar__light__desktop.png` — SEEN: populated violet home (hero, 3-session day rail
  with child chips, amount-free billing band «الحالة فقط، دون أرقام») **and** the «أبنائي» band: 5 sibling cards
  side-by-side with filled bars ٧٨٪·٤١٪·٣٣٪·٢٨٪·١٥٪ — the V-F1 sibling league table is real.
- `app/screenshots/dashboard__ar__light__desktop.png` — SEEN: violet hero, 4 sparkline KPI cards + trend pills,
  the «٤٨٬٢٠٠ ريال» revenue card, ٩٣٪ ring vs ٩٢٪ KPI on one screen, the inert 1|2|3 pager, and the «حالات
  الواجهة» gallery band (fake error + skeleton) closing the production operator home (V-A1/V-A2/V-A3/V-A4/V-A5).
- `output/roles/teacher/screenshots/teacher-home-full.png` — SEEN: the legacy purple Bootstrap ERP; «Your Salary
  997.00 EGP · Estimated 1,537.00 · Fines: 1,003.00 · Bonus 2,000.00», «Attended Percentage 0%», a `(3.00 Fine)`
  chip on the class row — and four LIVE row controls (View · Enter Again · End class · gear). Ugly but
  operationally complete: the inversion V-T2 names.
- `output/roles/family/screenshots/student-home-full.png` — SEEN: three zeroed hour tiles, «Time Spendings 0/0 H»,
  two pink error-styled empties («No sessions today», «No Teachers»), a real child name in the hero — and a
  «Request Trial» button ON the home (V-F4). Our family home beats this decisively (P-4), except that entry point.

## 1. Framing (binding interpretation of the work)
1. **The identity is already won.** §1 verdict: no page needs an identity rescue. 045–050 do **completion +
   de-ERPing, not a repaint**. Any proposal to re-skin the design system sitewide violates this contract.
2. **The bimodal-density finding is the shape of the work**: half the pages are 40–60 % empty viewport, the other
   half undifferentiated card walls (§1 item 3, X-3). Fix density per page; never by one mechanical template.
3. **Priority 1 = Spec 045 (teacher) and Spec 046 (family).** They run first among the page groups (plan.md D8);
   the teacher home is the weakest surface in the product and the family home is the best — protect the latter.

## 2. The NOT list (each is a review-failure condition)
NO legacy cloning (the legacy is the evidence corpus, not the target) · NO random gradients · NO
colour-without-hierarchy · NO oversized-card everything · NO AI-looking dashboard · NO generic corporate ERP ·
NO one-template-mechanically-everywhere.

## 3. The IS list (each is a review criterion)
Cheerful modern academy identity · comfortable lively colours · educational warmth without childishness · clear
hierarchy · useful density · friendly informative states · human-designed composition · role-appropriate
dashboards · consistent-not-monotonous · excellent AR RTL + EN LTR · mobile-first · accessible contrast/focus ·
strong light mode · deliberate dark mode · meaningful micro-interactions · visual continuity across roles.

## 4. The 11-step per-page loop (mandatory, per owned page)
1 reopen the legacy screenshots (paths in `../cluster-evidence-paths/`) → 2 open the current screenshots
(`app/screenshots/`) → 3 inspect the current source → 4 diagnose against §6's verdict for the page → 5 preserve
the improvements (P-1…P-9 + contract 9 rows) → 6 fix the gaps this group owns (allocation register rows) →
7 complete page-level forms/states (with 044/056 per contract 7) → 8 improve overlays under the 044 system →
9 **render + inspect AFTER implementation** → 10 iterate until the page reads academy-alive → 11 run the
8-surface test matrix (§5 below). Steps 9–11 are never skippable: **a design is not complete because the source
looks correct** (contract 14).

## 5. The 8-surface test matrix (per redesigned page, both before-merge and at review)
AR/EN · desktop/mobile · light/dark · empty/loading/error states · open overlays (drawer/modal/confirm) ·
keyboard/focus order · zero console errors (R-3 hard gate) · a11y serious=0/critical=0 (R-2 hard gate).
Gates R-2/R-3 are inherited per `../protected-test-carryover.md` §2 and may not be relaxed.

## 6. The five fix-first items (§11), pre-seeded to owners — first work in each owner's queue
1. **045** — `pages/teacher-portal.js:33-35`: the 7 false «قريبًا» quick-tiles (V-T1, UK-47, B-register caveat C-1).
2. **047** — `pages/dashboard.js:116-120`: the UI-states gallery band off the operator home (V-A1 → `gallery.html`).
3. **044** — `components/table.js:88-90`: the pager that looks alive and is not (V-A2, C01-17).
4. **044** — `enhance.js openDrawer()`: the admin mobile drawer clipping every label (V-A7, C15-15).
5. **048** — `fixtures/finance.js:94` + `locales/ar.fin.js:66,71,76`: the stale «قيد التخطيط» card + pre-Spec-026
   AR strings (§6 finance row). Owner corrected from the audit's §11 «049» tag, which follows the SUPERSEDED §10
   draft partition (header above): `finance` ∈ **048** per `../page-review-ownership-map.md` §2 / contract 3 §1.

## 7. Standing cross-references
- PRESERVE rows P-1…P-9 (§2) are MUST-PRESERVE requirements under contract 9; regression = review failure.
- No RJ row may be re-proposed by a redesign (contract 10); UNKNOWN visual evidence (§9 U-1…U-5) stays
  no-invention (contract 11); the V-A4 sparkline ruling and the `monthlyReports` label collision belong to 057 —
  045–050 must not silently repaint either way (§5 V-A4).
- Every new visual guarantee ships with its falsifying check (contract 13 / `../protected-test-carryover.md` §1).
