# Quickstart — Spec 034 (Control Center Pages)

How to build + verify Spec 034 during implementation (`/speckit.tasks` → implement). Run from `academy-dashboard-discovery/app`.

## Build
```bash
npm run build            # expect: 113 static pages (+ index) — was 103
find public -maxdepth 1 -name '*.html' | wc -l   # 113
```

## Per-page smoke (manual spot-check before the suite)
- `messages.html` / `.en` — inbox list + thread panel + compose; Send is a gate; conversation rows open a read-only thread sheet.
- `leads.html` / `.en` — KPI cards + lead list + 9 status filters + detail drawer (notes/Add-Notes/Change-Status) + Create-Request; all writes gated.
- `tasks.html` / `.en` — KPI strip + board columns + per-staff table + Create-task/Add-Section; no drag; writes gated.
- `announcements.html` / `.en` — list + compose + preview; Publish/Send gated; media = gate.
- `time-converter.html` / `.en` — pick zones + date/time → output updates live (native Intl); NO gate; NO network.

## Test gate
```bash
npm run test:smoke       # PASS + the additive Control block (count 113; 5 routes; 0 «قريبًا» in Control;
                         #   per-page shell+gate; FAKE + no-mutation; noFile; tz conversion + no external request;
                         #   protected 009/021–032 + Spec-032 asserts byte-verbatim)
npm run test:a11y        # critical=0 serious=0 (+ 5 pages light/dark/mobile-390 + open-form rows)
node tests/screenshots/capture.cjs   # 0 console errors (+ 5 page frames AR/EN/dark/mobile + open form + tz conversion)
```

## Diff review (freeze invariants)
```bash
git diff --stat package.json                 # 0-diff
git diff --stat scripts/build-html.mjs       # +5 imports +5 PAGES entries only
git diff src/js/nav.config.js                # 5 planned→implemented+route; -4 FUTURE_ROUTES; nothing else
git diff src/js/enhance.js                   # +1 guarded initTimeConverter IIFE ONLY; no new global data-* dispatch
git diff src/js/i18n.js                      # +2 ctrl imports +2 deepMerge ONLY
find public -maxdepth 1 -name '*.html' | wc -l   # 113
```

## Django mapping (for the later backend)
- messages → a `Conversation`/`Message` list + a compose `ModelForm`; Send posts a message (gated until wired).
- leads → a `Lead` list + `date_range` filter + a Create `ModelForm` + Add-Notes/Change-Status forms; writes post (gated).
- tasks → a `Task`/`Section` board + a create `ModelForm`; move/assign/save post (gated).
- announcements → a broadcast `ModelForm` + audience querysets; Publish posts (gated); channels via integration creds (Spec 040).
- time-converter → **pure frontend**; no Django model — the browser's `Intl` tz database does the conversion.

## Stop conditions (abort + report)
count ≠ 113 · a page lacks legacy evidence · timeConverter needs an external API/dependency · any final fakes success · any row/status/thread/task mutates · `type=file` appears · backend/websocket introduced · `package.json` changes · a protected assert needs weakening.
