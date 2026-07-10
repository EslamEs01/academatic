# Contract: Fixtures & Locale — Spec 034

**Binding.** One authored fixture + one mirrored locale pair; 0 divergence, 0 raw keys.

- **Fixture**: `fixtures/control-center.js` — named exports `MESSAGES`, `LEAD_KPIS`, `LEADS`, `LEAD_STATUSES`, `TASK_KPIS`, `TASKS`, `STAFF_TASK_ROWS`, `ANNOUNCEMENTS`, `TIMEZONES`, `TZ_CHANGES` — authored display-only; **no PII, no pay/amount, no secret, no computed value**.
- **Locale**: new pair `ar.ctrl.js` / `en.ctrl.js`, registered in `i18n.js` (+2 imports, +2 `deepMerge`); namespaces `msg.*`/`lead.*`/`task.*`/`ann.*`/`tz.*`/`cc.common.*`; every key mirrored AR/EN. Locale pairs **11 → 12**.
- Reuse existing `common.*` (save/add/close/backendRequiredNote) and `fopt.*`/`lang.*` where they fit.
- **Verify**: flattened-key diff on the new pair = 0 one-sided keys; all 12 pairs 0-divergence; 0 `⟦` raw keys in any built page; `i18n.js` diff = the 2 imports + 2 deepMerge only.
