# Contract: Nav Completion — Spec 034

**Binding.** The 5 Control «قريبًا» items become real implemented routes.

- `nav.config.js`: `messages`/`leads`/`tasks`/`announcements`/`timeConverter` → `status:'implemented'` + `route:'{base}.html'` (build-guard: implemented ⇒ route).
- `FUTURE_ROUTES`: remove `messages`/`leads`/`tasks`/`announcements` keys (now real routes); `timeConverter` had none.
- **0 «قريبًا» left in the Control category** (all 12 Control items implemented after the flip).
- No other nav item changes. Admin-menu stays **50 items** (implemented 20→25, planned 23→18, disabled 7).
- `plannedNavAnchors===0` preserved (remaining planned items in other categories stay non-anchor buttons).
- **Verify**: smoke Spec-010/029 nav block + admin-menu-50 assert green (re-pinned additively); the 5 items are `<a>` links; deadHash/badTarget=0.
