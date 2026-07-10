# Contract: No Backend / No Delivery — Spec 034

**Binding.** No real backend, no delivery engine, no network (except the browser's own `Intl` tz database, which is local).

- **Forbidden engines**: backend/API/auth/database, websocket/realtime, CRM ingestion, task persistence, notification/broadcast delivery, file upload/download, PDF/export, payment.
- **No dependency**: `package.json` 0-diff; no `<script src>`/CDN added; native `Date`/`Intl` only.
- **localStorage**: UI-state only (rail/nav-category/schedule-view/lang/theme); no entity/message/lead/task/announcement write.
- **timeConverter**: computes locally; **0 external request** on load or interaction.
- **Verify**: smoke external-request=0 on all 5 pages (incl. timeConverter interaction); `git diff --stat package.json` empty; no new `<script>` tags in built pages.
