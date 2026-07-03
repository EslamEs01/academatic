# Honesty & backendRequired Contract (Spec 016 — binding on Specs 017–027)

Carries forward the Specs 008–015 honesty system and extends it to every future page. Specs 017–027 MUST cite this contract; deviations are review-blocking.

## 1. The four honest action classes (exhaustive — every interactive element is exactly one)

1. **Real link** to an existing built page (language-correct, crawl-verified, inside the page's sanctioned-anchor registry).
2. **Demo toast/confirm** via the existing closed `data-*` hook set (labeled demo behavior; no state change implied).
3. **Labeled disabled/planned/locked control** — disabled-with-reason, planned chip, or LOCK shell; never color-only, never unexplained.
4. **Display-only content** — cards/lines/previews with zero interactive affordance.

## 2. Gate patterns (frozen; see design freeze)

`.pt-planned` mini-card (non-anchor + labeled availabilityChip) · inline `.pt-card-chip` on preview cards · `.pt-note` gate sentence + labeled chip · full-page GATE/LOCK shell (admin 025/026). Availability vocabulary stays the Spec-008 labeled set (planned = neutral/clock · backendRequired = amber/lock · permission-locked = amber/lock + reason).

## 3. The complete no-fake register (nothing on this list may ever look operational)

payment / pay-now / renewal · salary or payroll processing of any kind · live join / start class / live room · chat send / message send · notification engine or unread counts · attendance write / mark absent / end-class save · homework upload or submission · material upload/download · voice/file recording upload · profile/account save · certificate request submit · cancel/reschedule submit · feedback/rubric submit · trial/add-child submit · meeting booking · integration connect/disconnect · security change (backup/import/policy/2FA) · user/permission save · data export/import · search against live data · scheduled-action execution · automation triggers · authentication/login of any kind.

Every one of these is rendered, when shown at all, as class 3 or 4 above — with the labeled gate naming what the real system requires.

## 4. Role-specific hard lines (standing, machine-enforced)

- **Teacher app (`teacher-*` family)**: zero pay surfaces/figures/vocabulary in copy AND comments (word-bounded EN `salary|salaries|pay|payouts?|earnings?|compensation|bonus|fines?` + AR `راتب|رواتب|أجر|مستحقات|غرامة|مكافأة`) + zero currency tokens (`EGP|SAR|USD|ريال|ر.س|جنيه|$€£`) + zero routes to pay surfaces + no computed score/rating (fixture numerics suppressed). Three-layer enforcement (source grep incl. comments · built grep · smoke assert) extends to every teacher page.
- **Family app (`family-*` family)**: zero amounts/prices/rates/currency tokens/pay-action language; billing & subscriptions are STATUS ONLY. The Spec-014 zero-pay regex extends to every family page.
- **Student app**: no leaderboard/rank/percentile/peer comparison; progress figures are authored fixture literals.
- **Admin finance (025)**: figures only as Spec-009-style authored literals on sanctioned pages; **no runtime money arithmetic ever**; payroll/payout surfaces are GATE shells with zero figures.
- **Reports body**: finance-free forever (Spec 008 guard stands).

## 5. Structural honesty

Zero `href="#"` · zero dead links · zero raw i18n keys · zero form controls in role apps · no fabricated data (fixtures are authored and internally consistent; real outcome refs preferred over invented ones) · truthful empty states only · planned nav items never navigate · no backend promises in copy ("requires the backend/server" is the honest register; delivery dates and "coming soon" hype are forbidden) · demo personas stay the existing fixtures (st1/fam1/sara) until real auth exists (backendRequired).

## 6. Enforcement continuity

Every future spec keeps green: the Spec-011 zero-`href="#"` standing · Spec-010 chip-tone guard + filter-visibility fix · Spec-012 portal-absence + payHit asserts · 013/014/015 branch asserts (extended per-page, never weakened) · the G-audit pattern (change-surface, byte-identity, grep layers, guarded-file diffs, prior-guard re-runs) applied per spec.
