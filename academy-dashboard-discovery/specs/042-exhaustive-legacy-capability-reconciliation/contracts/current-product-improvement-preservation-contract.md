# Contract 9 — Current-Product Improvement Preservation (BINDING on Specs 043–057)

**Canonical sources (cite by path + stable ID; never restate):**
`../current-product-better-than-legacy-register.md` — the **63 B-register findings** (B-1.1…B-9.12, §1–§9) with
the verification note, the preservation watchlist and caveats C-1…C-4 · `../legacy-current-capability-ledger.md` —
the **57 INTENTIONALLY_IMPROVED rows** (per `../plan.md` D3) · `../visual-quality-and-academic-design-audit.md`
§2 (P-1…P-9). Disposition law: plan.md **D3** — INTENTIONALLY_IMPROVED is a preservation law, **never copy-back**.

## 1. The rule
Every B-x.y finding and every INTENTIONALLY_IMPROVED ledger row is a **MUST-PRESERVE requirement**:
1. Every future spec (043–057) MUST enumerate, in its own plan, the preservation rows touching its owned
   surfaces (by B-x.y / Cnn-mm ID) — an empty list is a claim and is checked at review.
2. Every such spec MUST re-assert those rows **post-change** (grep/smoke/screenshot per the row's
   "Current proof" column). **Regression = review failure** — the change does not merge.
3. "The legacy had it" is NEVER an argument for restoring a refused or improved-away behaviour; re-opening any
   row requires the explicit supersession protocol (`../rejected-legacy-behaviour-register.md` standing rule +
   contract 13 mutation proof).

## 2. The P-1…P-9 visual-audit preserve list (named explicitly; §2 of the visual audit)
- **P-1 Teacher pay-free home** — no salary band, ever (vs the legacy's «Your Salary 997.00 EGP» panel).
- **P-2 No computed vanity metrics** — authored counts, no «Attended Percentage».
- **P-3 No PII in the chrome** — fixture persona, initials avatar, zero external requests.
- **P-4 The populated, warm family home** — the single biggest UX gain in the product.
- **P-5 Friendly, non-alarming empty states** — calm card + real CTA, never the legacy's pink error panel.
- **P-6 Icon + text status chips everywhere** — never colour-only, never a payment tint.
- **P-7 Real dark theme + system mode** across all 115 pages, no-flash boot.
- **P-8 Genuine RTL-first rendering** — the legacy never rendered RTL at all.
- **P-9 `messages.html` / `tasks.html` reference quality** — and tasks' refusal of the empty donut chart.

## 3. The highest-regression-risk watchlist (register bottom section — owners on notice)
1. **Teacher pay-free (B-3.\*)** — 056's form work walks straight through legacy pay fields; every teacher
   surface stays figure-free; `classSalaryReport` stays the sole lock (HONEST_LOCK, ONE physical lock).
2. **No secrets (B-2.\*)** — 053 keeps structure-only rows, Sandbox defaults, no enable-on-empty.
3. **No fake success (B-1.\*)** — 044/056 add fields behind gates; the Save stays backendRequired; confirm-first
   delete never becomes one-click; the working `time-converter` (B-1.7) is never gated.
4. **PII / anti-poaching (B-4.\*)** — 043's standing refusals (contract 6).
5. **a11y + console machine gates (B-7.\*)** — R-2/R-3 stay hard gates; the focus-trap/Esc/return contract holds.
6. **Route/orphan/nav freeze (B-8.\*)** — 057 re-freezes; deep-link precedence (hash beats stored) never regresses.

## 4. Caveats — where "we are better" may NOT be claimed (register caveats C-1…C-4)
- **C-1**: the teacher-portal 7 «قريبًا» quick-tiles are a live defect (owner 045-050) — never cite the teacher
  portal as "no dead controls" until closed.
- **C-2**: no `404.html` exists — the legacy had a branded one (owner 057).
- **C-3**: the static unread dot on the admin bell is a fake signal (owner 055; removal per visual V-A8).
- **C-4**: the inert 1|2|3 table pager is a silent dead control (owner 044/056).
A spec that fixes a caveat updates the claim; a spec that merely repeats the "better" narrative over an open
caveat fails review.

## 5. Verification obligation
Preservation asserts ride the inherited protected suite (`../protected-test-carryover.md`): existing greps/
asserts protecting a row are never weakened; a new preservation guarantee ships with its falsifying mutation.
