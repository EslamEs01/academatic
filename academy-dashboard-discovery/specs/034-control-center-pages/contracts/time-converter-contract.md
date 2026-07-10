# Contract: time-converter.html — Spec 034

**The ONE fully-frontend page — a real working tool, no backend gate on the conversion.**

**Sections**: `tabs` (Time Zone | Changes) · converter panel (source-zone select · target-zone select · date input · time input · live output) · common-academy-timezone quick chips · authored DST "Changes" board (zone/offset/next-change, display-only).
**Allowed (REAL)**: change source/target/date/time/quick-chip → **live conversion via native `Intl.DateTimeFormat(locale,{ timeZone })`** (+ `Date`); add/remove a compared zone (client-side); optional copy-result via an existing safe client-side pattern (else display-only).
**Runtime**: a page-scoped `initTimeConverter()` IIFE in `enhance.js` (mirrors `initTabs`/`initWizard`), guarded by `[data-time-converter]` → inert on all other pages. **No new global `data-*` dispatch hook, no storage key.**
**Forbidden**: backend/API, external API/CDN, new dependency (no moment.js — native `Intl` only), server time fetch, `<script src>` addition, fake "unavailable"/backendRequired gate over the working conversion, `type=file`.
**Fallback**: if the init is disallowed, a static baked "now across common zones" board (zero JS) — but the grounded/spec'd behavior is the live converter.
**Coverage**: smoke (time-converter.html/.en load; controls render; changing a control updates the output; **0 external request**; **NO gate** on conversion; `package.json` 0-diff). a11y (converter controls labelled). screenshots (converter + quick view + changes board + active-conversion AR/EN/dark/mobile).
