# Implementation Status — Spec 034 (Control Center Pages Completion)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`; baseline Spec 032 committed at HEAD `a438ac2`. **No commit / no push** performed.

## Verdict
The five Control-category «قريبًا» items are closed with real frontend pages: four honest shells (real UI, gated backend-write finals) + one genuinely-working client tool (time-converter). Safe to review and commit.

## Counts / invariants
- Public HTML **103 → 113** (+10; 5 new bases × 2 langs). Verified `find public -name '*.html' | wc -l` = 113.
- Nav: 5 Control items `planned → implemented` + route; 0 «قريبًا» left in Control; admin-menu **50 items** (implemented 20→25); `FUTURE_ROUTES` trimmed of messages/leads/tasks/announcements.
- `package.json` 0-diff; no dependency; no backend/API/websocket/engine; no new component/CSS framework.
- `enhance.js` = +1 guarded `initTimeConverter` IIFE (no new global `data-*` hook/storage key). `build-html.mjs` = +5 imports/entries. `i18n.js` = +2 imports/+2 deepMerge. `nav.config.js` = 5 flips + FUTURE_ROUTES trim. `app.css` = additive `.cc-*` only.
- Locale: new mirrored pair `ar/en.ctrl.js`; **12 pairs, 0 divergence**; 0 raw keys.

## FC / pages
| Page | Surface | Writes (all gated) |
|---|---|---|
| messages.html | inbox list + thread panel + compose + read-only thread sheets + Create-Group/Add-Member drawers | Send/Reply/attach; group image = GATE (no type=file); group/member Save |
| leads.html | KPI cards (authored) + lead list (date/parent/email/phone) + 9 status filters + detail drawer (notes log + Add-Notes + Change-Status) + Create-Request form (~19 fields, no money) | Create/Add-Notes/Change-Status/Convert/Assign |
| tasks.html | KPI strip + display-only board (no drag) + per-staff table (Average = literal) + Create/Edit + Add-Section drawers | Save/Assign/Move/Add-Section |
| announcements.html | list + compose (channels/audience/expire) + preview + recipients | Publish/Send/WhatsApp/media (all GATES; no type=file); not a duplicate of settings Notifications |
| time-converter.html | source/target zone + date/time → **live native-Intl conversion** + quick chips + authored DST board | **none — real working tool, no gate** |

## No-fake / role-law proof
- Every write final = `data-disabled-reason` gate or an inert disabled-with-reason button; **0 fake send/convert/save/move/publish/delivery**; **0 row/status/thread/card mutation**; 0 fake-success wording (smoke `FAKE` guard byte-verbatim, runs on all 5 pages).
- **0** `input[type=file]`/`input[type=password]`/credential control/`<canvas>`/`.pdf`/`window.open`/`blob:`/money-figure in any of the 5 bodies (smoke g32 + Control block).
- time-converter: **0 external request** on load + interaction; output updates on input (Cairo 3PM→NY 8AM); `package.json` 0-diff.
- Role laws green: teacher pay-free, family zero-pay, student child-view, finance no-fake-money, settings no-fake-settings — Control pages are non-finance and carry no pay/role token. Protected smoke regexes byte-verbatim.

## Verification
- `npm run build` → **113 pages**, 0 raw keys, 12 locale pairs 0-divergence.
- `npm run test:smoke` → **PASS** (112 loads) + additive Control block (per-page shell + gated finals, timeConverter output-updates + no external request, route-freeze 113). The ONE sanctioned amendment: route-freeze count 103→113 + the dashboard planned-item feedback probe now reveals the families category (Control no longer has a planned item). Protected role-law + Spec-032 form-completion + 026–031 asserts byte-verbatim.
- `npm run test:a11y` → **critical=0 serious=0** (+5 pages light/dark/mobile-390 + open-form rows; fixed one tasks scrollable-region-focusable warning via `tabindex="0" role="region"` on the per-staff table wrapper).
- `node tests/screenshots/capture.cjs` → **282 captured · 0 console errors** (24 new sp034 frames incl. the time-converter active-conversion result).

## Impact protection
Only the 52 admin pages' shared sidebar changed (5 «قريبًا» → anchors — the standard nav-flip pattern). dashboard `#page-body` byte-identical HEAD vs working; all portal pages ×16 + index byte-identical; `package.json` 0-diff.

## Next
Watcher commit. Then Spec 035 (Families & Students nav completion) per the Spec-033 roadmap.
