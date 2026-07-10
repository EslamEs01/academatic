# Count & Route Contract — Spec 034

Binding count/route rules for the Control Center pages. Derived from the Spec-033 page-count-envelope (034 = +10 → 113) + `nav.config.js` (the 5 planned Control items) + `build-html.mjs` PAGES.

## Count
- **Before (Spec 033 baseline): 103** (51 bases × 2 langs + index).
- **New page bases: 5** — `messages`, `leads`, `tasks`, `announcements`, `time-converter`.
- **New public HTML files: 10** — each base × {`.html`, `.en.html`}.
- **After: 113** (56 bases × 2 + index).
- **Delta: +10.**

## Routes / nav flips
- **5 nav flips** in `nav.config.js`, all in the `control` category, `planned → implemented` + a real `route`:
  | id | current | new route |
  |---|---|---|
  | messages | planned («قريبًا») | `messages.html` |
  | leads | planned | `leads.html` |
  | tasks | planned | `tasks.html` |
  | announcements | planned | `announcements.html` |
  | timeConverter | planned | `time-converter.html` |
- The `nav.config.js` build-time guard is satisfied (implemented ⇒ route present). `FUTURE_ROUTES` entries for `messages`/`leads`/`tasks`/`announcements` are removed (now real routes); `timeConverter` had no FUTURE_ROUTES entry.
- **`build-html.mjs` PAGES gains exactly 5 entries** (one per base, each rendered in both langs by the existing lang loop).

## Guardrails
- **No unrelated pages** created or removed. The other 45 nav items are untouched (0 nav flips beyond the 5).
- **No accidental removals**: the 103 existing pages remain; the 5 pairs are purely additive.
- **`package.json` 0-diff**; no new dependency/engine/hook/storage key.
- After build: `find app/public -maxdepth 1 -name '*.html' | wc -l` = **113**; every new base appears exactly twice (`.html` + `.en.html`); 0 orphan, 0 missing mirror.
- The Control category item count in the sidebar is unchanged (12); only 5 of its items change status planned→implemented. Admin-menu coverage stays **50 items** (now 25 implemented, 18 planned, 7 disabled — the 5 flips move planned→implemented).

## Acceptance
- Build = 113; smoke route-freeze asserts 113/0-orphan/0-missing-mirror; the 5 Control items render as real `<a>` links (0 «قريبًا» among them); `plannedNavAnchors===0` still holds (the remaining planned items stay non-anchor buttons).
