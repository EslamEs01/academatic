# Time Converter Scope — Spec 034

`time-converter.html` is the ONE fully-frontend Control page — a real working tool, no backend gate on the conversion. Grounded in `management-time-convertor` ("World Time Zone Converter").

## Allowed local computation
- Conversion computed **in-browser** with native **`Intl.DateTimeFormat(locale, { timeZone, ... })`** (+ `Date`). No `moment.js`, no library, no external API, no network.
- Inputs: **source timezone** (select) · **target timezone** (select) · **date** (input) · **time** (input). Output: the converted date/time in the target zone, rendered live on change.
- A **common-academy-timezones quick view**: authored city→IANA-zone chips (e.g. Cairo `Africa/Cairo`, Riyadh `Asia/Riyadh`, London `Europe/London`, New York `America/New_York`) — clicking sets a zone.
- Optional: add/remove a compared zone column (client-side only).
- Optional: **copy result** — only via an existing safe client-side copy pattern if one exists in the codebase; otherwise the output is display-only (no fake copy toast).

## Allowed timezone list
- An **authored, hard-coded IANA timezone list** (a curated subset of the legacy ~150-city catalog, grouped by region: Africa/Americas/Asia/Europe/Oceania) baked into a fixture. No runtime fetch of tz data; the browser's own `Intl` tz database performs the conversion.

## Input / output behavior
- On any control change (source/target/date/time/quick-chip), recompute and re-render the output — a **page-scoped init**, not a new global `data-*` dispatch.
- **Precedent for the init pattern**: `enhance.js` already ships page-scoped init functions (`initTabs`, `initWizard`) and the topbar clock — a `time-converter` init follows the same shape (attach listeners to this page's own controls, write this page's own output region). This does **not** add a new entry to the global delegated `data-*` click dispatcher and does **not** introduce a new storage key or hook contract. (If the plan prefers zero JS additions, the fallback is a static baked board showing "now" across the common zones — but the grounded, user-requested behavior is the live converter; the init is the sanctioned, precedented path.)

## DST "Changes" display
- The legacy "Changes" tab (Affected Accounts + upcoming DST offsets) was backend-read. In the rebuild it is an **authored display-only board** (zone · next-change-date · current offset · upcoming offset) — no live sync, no computed account counts.

## Forbidden
- No backend/API dependency; no external API/CDN; no `package.json` change / new dependency (native `Intl` only).
- No fake "unavailable"/backendRequired gate over the working conversion (that would be dishonest — the tool works).
- No `type=file`, no credential, no money figure.
- No new global `data-*` hook or storage key; the init is page-scoped and read-only w.r.t. app state.

## Acceptance
- Selecting zones + date/time yields a **correct** converted time (native `Intl`); output updates on change; 0 network requests; `package.json` 0-diff; AR/EN mirrored; a11y controls labelled; mobile-390 no overflow.
