# Role-Law & No-Fake Carryover (Spec 036)

All standing laws from Specs 016–035 remain BINDING. Protected smoke assertions stay **byte-verbatim**.

## Role laws (must stay green)
| Law | Why it holds under Spec 036 |
|---|---|
| **Teacher pay-free (GLOBAL)** | The two fold anchors (trn-add/trn-categories) and the two new teacher-performance tabs carry NO salary/rate/fine/payout/pay figure or vocabulary (see `teacher-pay-free-register.md`). The 16 teacher-PORTAL files stay byte-identical; `teacher-performance.html` is the sanctioned admin exempt board (Spec 024 B-07) — display-only, never linked from the portal. |
| **Family zero-pay** | No family surface touched. |
| **Student child-view** | No student portal/surface touched. |
| **Admin finance Spec-009 invariant** | No finance body touched; teacher tabs carry no invoice/salary/payout figure. |
| **No computed score/rank/chart** | Both new tabs are display-only: authored counts + categorical labels + hand-rolled chips; NO computed score/rank/rating/percentile, NO `<canvas>`/chart (Spec 028 performance-metric-scope). |

## No-fake laws (must stay green)
- No fake teacher create / category create-save-assign / KPI or monthly calculation; every final = honest gate («يُتاح بعد ربط الخادم» / "available once the server is connected").
- No backend/API/websocket/database/auth; no external dependency (`package.json` 0-diff).
- No new `data-*` hook / storage key / engine. Reuse the CLOSED set: `data-drawer`→`template[data-preview]`, `data-disabled-reason`/`data-reason-key`, the `tabs()` widget + `#view=` hash, `filterBar`/`data-facet`, `data-confirm`.
- No `href="#"`, dead button, raw key, `type=file` (CV=gate), `type=password` (reset-password=gate), credential/secret.

## Protected smoke assertions to keep BYTE-VERBATIM
- `payHit` / teacher-pay guards, `payFigure` / `famPay`, child-view guard, finance/settings invariants.
- The Spec-026 action-completion asserts, Spec-032 form-completion asserts (incl. the `trn-add`/`trn-categories` FORM_DRAWERS_032 / PICKERS_032 / HYBRID_032 entries), and the 026–035 per-page asserts.
- The `nav010` block (6 rail cats · finance sub-section · admin-category `admItems.length === 5` · admin-menu 50 · banks placement · planned-truthfulness) — unaffected (teachers category is not admin/reports/finance).
- Spec-035 additive Families/Students block. Spec-036 additions are a separate additive teachers block; they never edit a protected regex.

## Sanctioned amendments (anticipated, to confirm at implement time)
- **Teachers-category «قريبًا» probe**: after Spec 036 the teachers category has **0** planned items. The dashboard planned-item smoke probe currently reveals `teachers` (repointed there by Spec 035, since families went to 0). It must be repointed again to a category that still has a planned item (**reports** → `monthlyReports`/`dataAnalysis`, or **admin** → `materials`/`certificateRequests`, or **settings**). Additive, honesty-preserving.
- **teacher-performance tab asserts**: new asserts for the 2 tabs (display-only, no computed rank/chart, `#view=` opens the right tab) — additive.
- Route count stays 115 (no route-freeze number change).

## Impact-protection expectation
- `teachers.html`/`teacher.html` `#page-body` byte-identical (fold anchors = nav-only).
- `teacher-performance.html`/`.en` bodies change (tabs added) — the ONE sanctioned body change.
- Only the shared admin sidebar re-renders elsewhere (4 «قريبًا» → anchors). All portal pages ×16 + index + all other admin `#page-body` byte-identical. `package.json`/`enhance.js` 0-diff.
