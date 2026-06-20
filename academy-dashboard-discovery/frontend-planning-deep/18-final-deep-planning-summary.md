# 18 — Final Deep Planning Summary

> Wrap‑up of the **exhaustive** discovery‑reading pass over the entire `output/` tree. **No spec‑kit command run, no frontend code/HTML/CSS/JS written, no single giant spec.** Ready for review before Spec 001.

## What was read (verified, not sampled)
- **2,837 files / 279 MB** under `output/`, fully manifested ([00](00-output-manifest.md)/.json).
- **339 pages** (admin 300, teacher 26, family 13): **every `.json` parsed by script** (100% — [02](02-all-pages-expanded-inventory.json/.md)) and **every `.md` read by the 47‑agent workflow** (totalPagesRead = 339). 339 `.txt`, 339 sanitized `.html` (structural signatures — [04](04-html-structure-analysis.md)), 339 raw `.html`, **1,113 screenshots** reviewed via **49 contact sheets** ([03](03-screenshot-review.md)), 3 network `endpoints.json`, 17 combined reports, role maps.
- **Completeness proven:** 339/339 pages have all core artifacts (0 gaps); role‑map ↔ JSON cross‑check clean (0 orphans) ([01](01-completeness-ledger.md)).

## What the deep pass found that sampling missed
1. **13 broken pages, not ~5** — **4 new admin 500s** (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`) on top of export‑course(500), message‑builder(504), 2× profile(500), 5× 404.
2. **Exact distinct counts:** **66 modals, 141 form‑actions, 104 table shapes, 195 GET routes, 109 mutation endpoints** — vs v1's estimates.
3. **178 route templates** (admin 145 / teacher 22 / family 11) from 339 pages — precise variant‑collapse.
4. **Production i18n key leaks** (`messages.Materials`, `messages.Inactive Families`, `messages.Stopped Families`, `messages.Inactive Teachers`, `messages.Create Feedback Categories`).
5. **Concrete UX defects:** sort via separate URL links (→ clickable headers); 3–6 colored per‑row pills (→ row‑action menu); eager‑rendered tabs/modals = 300–380 KB pages (→ lazy); hidden filters; "Notes List" modals stuck on "Loading…"; `date_type` blank degenerate filters; bare "Loading…" / no skeletons; logo 404 on every page.
6. **Visual archetypes confirmed** across all 3 role shells, modals, permission matrix, analytics (Apex + world map), certificate canvas designer, scheduling tools.

## What we will rebuild
A **new, original, improved** academy frontend — HTML + compiled Tailwind (no CDN) + native JS (no SPA), **Arabic‑first RTL + LTR**, **light/dark/system**, themeable, accessible (WCAG AA), responsive (mobile‑first teacher/family). Three role apps on one shared design system + ~34‑component library. Every discovered page → improved equivalent; every modal/dropdown/filter/tab → improved interaction; **no dead buttons**; all destructive actions confirmed. Structure & flows only — **no** proprietary code/brand/assets/wording.

## The v2 package ([frontend-planning-deep/](.))
00 manifest · 01 ledger · 02 all‑pages inventory · 03 screenshot review + 03b visual patterns · 04 HTML structure · 05 distinct interaction catalog · 06 complete data surface · 07 module map · 08 role‑page inventory · 09 permission/nav · 10 components · 11 interactions/states · 12 data/API · 13 IA · 14 design · 15 spec split · 16 Spec‑001 brief · 17 open decisions · 18 this summary · 19 spec coverage map · 20 no‑missing‑items audit. Build scripts + `_parts/` interpretive digests retained as evidence.

## Recommended order (12 small specs — verified coverage in [19](19-spec-coverage-map.md))
001 Foundation → 002 Admin Shell+Dashboard+Reports → 003 Students+Families+Leads → 004 Teachers+Staff/RBAC+Courses+Library → 005 Classes+Timetable+Sessions → 006 Forms+Certificates+Tasks → 007 Finance → 008 Messages → 009 Teacher → 010 Family → 011 Settings+Profile+Errors → 012 QA+Coverage. One at a time, via spec‑kit, when we reach it.

## What should happen next
1. Review this package (esp. [15](15-spec-splitting-plan-v2.md), [16](16-spec-001-brief-v2.md), [17](17-open-decisions-v2.md)).
2. Settle **A1–A6** in [17](17-open-decisions-v2.md) (default language Arabic‑first?, brand identity/palette/font, native‑JS/no‑SPA, one‑design‑system/three‑apps, light/dark+themeable).
3. Route **C‑items** to owner/backend — above all **the API contract & auth** ([12](12-data-api-surface-v2.md)/[17](17-open-decisions-v2.md) C1; legacy exposes no JSON API).
4. On approval, turn the Spec‑001 brief into the `/speckit.specify` command — only when you say go.

## Confirmation
- ✅ Read **every file/folder** relevant under `output/` (verified by manifest + ledger; 100% of JSONs script‑parsed; 100% of MDs agent‑read; all screenshots contact‑sheeted; sanitized HTML signatured).
- ✅ 21 deep docs + updated v1 docs; coverage map proves every page/modal → exactly one spec; audit proves no missing items.
- ✅ Honest about limits: English‑only (RTL fresh), mutating flows inferred, empty test data, field names = hints, no observed JSON API.
- ✅ **No spec‑kit command. No frontend implementation. No single giant spec.** Legacy used as UX/product reference only — no proprietary code/brand/assets/wording reproduced.
