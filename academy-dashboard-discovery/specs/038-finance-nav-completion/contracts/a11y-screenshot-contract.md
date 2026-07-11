# Contract — A11y & Screenshots

## A11y (`tests/a11y/run.cjs`) — additive rows
- `finance` `#view=invoices` — AR light + dark, EN light.
- `finance` `#view=payments` — AR light + dark, EN light.
- `finance` `#view=monthly-invoices` — AR light + dark, EN light.
- `finance` `#view=salaries` — AR light (re-scope of the existing Spec-030 row to the new 6-tab
  layout; no new row needed if the existing `#view=salaries` row already exists — confirm and
  extend with dark if missing).
- `finance` `#view=banks` — AR dark (re-scope of the existing Spec-030 row; the sidebar link is
  now enabled instead of `aria-disabled`, so its accessible role changes — re-audit).
- Mobile-390 (one row each): `finance#view=invoices`, `finance#view=monthly-invoices`, and one of
  `#view=payments`/`#view=salaries`/`#view=banks` (mirrors the Spec-036/037 "one mobile row per
  new surface, not every combination" precedent).
- Open-drawer state: `finance#view=banks` with the existing `[data-drawer="bank-add"]` drawer open
  (already present in the matrix at line ~202 — re-verify it still resolves correctly against the
  6-tab structure; no new row needed unless the existing one breaks).
- **Result required: critical=0, serious=0.** (Watch `scrollable-region-focusable` on the new
  monthly-invoices board's row/list wrapper → `tabindex="0" role="region" aria-label`, per the
  Spec-036 `tasks.js:99` precedent, if the board scrolls independently.)

## Screenshots (`tests/screenshots/capture.cjs`) — additive frames
- `finance` overview tab (default, no hash) — preservation proof frame (the pre-existing
  `financeActions()` + planned-cards content, now without the invoice/payment lists inline).
- `finance#view=invoices` — the new Invoices tab (tiles + filter + 9 rows).
- `finance#view=payments` — the new Payments tab (6 rows).
- `finance#view=monthly-invoices` — the new month-grouped board.
- `finance#view=salaries` — the Salaries tab, now reachable via a real (non-disabled) nav anchor.
- `finance#view=banks` — the Banks tab, now reachable via a real (non-disabled) nav anchor.
- **`classSalaryReport` honest-lock proof** — the Reports→Finance sidebar sub-section showing
  `classSalaryReport` still `disabled` + lock icon + reason tooltip, alongside the 6 now-enabled
  siblings (proves the ONE item that intentionally stays locked, not an oversight).
- Variants: AR + EN, light + dark, mobile-390 for each of the 6 finance tabs (6 tabs × up to 4
  variants ≈ 24 new frames) + the 1 overview-preservation frame + the 1 classSalaryReport
  honest-lock frame (AR + EN ≈ 2 frames) ≈ 27 new frames.
- **Result required: 0 console errors.** Update `screenshots/REVIEW.md` with the new `sp038`
  frames.

## Rules
- Additive only; no existing a11y row or screenshot frame removed. The existing Spec-030
  `finance#view=salaries`/`#view=banks` rows/frames stay valid targets — only re-verify they still
  resolve against the 6-tab hub (same `#view=` mechanism, same destination panel).
- Every deep-link row/frame is captured via a fresh navigation to `#view=...` (no in-page tab click
  first), matching the smoke fresh-context rule.
- Dark-mode and RTL(AR)/LTR(EN) must both be exercised on every new tab at least once.
- No a11y row or screenshot targets `classSalaryReport` as an openable surface — only its sidebar
  lock state is captured (it has no `#view=` route).
