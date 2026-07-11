# Content & Certificate Nav-Completion Register — Spec 039

Every scoped admin nav item: current status/marker → recommended route → final status → acceptance.

| Nav key | AR label | EN label | Category | Current status | Current marker | Recommended route | Count Δ | Final status | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|
| `materials` | المواد التعليمية | Materials | admin | `planned` | «قريبًا» button (no route) | `library.html#view=materials` | 0 | `implemented` | real anchor to `library.html#view=materials`, no «قريبًا»/aria-disabled/lock; fresh-load AR/EN opens Materials tab |
| `certificateRequests` | طلبات الشهادات | Certificate Requests | admin | `planned` | «قريبًا» button (no route) | `certificates.html#view=requests` | 0 | `implemented` | real anchor to `certificates.html#view=requests`, no «قريبًا»/aria-disabled/lock; fresh-load AR/EN opens Requests tab |
| `books` (refinement) | مكتبة المحتوى | Content Library | admin | `implemented` | `route: library.html` | `library.html#view=books` (optional) | 0 | `implemented` | (if applied) anchor to `library.html#view=books`; fresh-load opens Books tab |

## Nav.config.js exact changes
- Line 100: `item({ id:'materials', …, status:'planned' })` → `item({ id:'materials', …, route:'library.html#view=materials' })`.
- Line 103: `item({ id:'certificateRequests', …, status:'planned' })` → `item({ id:'certificateRequests', …, route:'certificates.html#view=requests' })`.
- `FUTURE_ROUTES`: **drop** the `materials: 'library.html'` entry (promoted). (No `certificateRequests` entry exists.)
- Optional: line 101 `books` `route:'library.html'` → `route:'library.html#view=books'`.
- **No other nav item changes.**

## Post-change admin-category state
- Admin category items = **5** (unchanged): staff · materials · books · certificates · certificateRequests.
- Admin category planned «قريبًا» count = **0** (both flipped) → matches the families/teachers/reports precedent
  (each already 0). The only category still carrying planned items = **settings** (6, owner Spec 040).
- Admin menu sitewide = **50** (status flip does not change item count).
- Public HTML = **115** (0 new pages).

## Nav-law guard (build-time, already enforced)
`nav.config.js` throws if an `implemented` item lacks a `route`, or a non-implemented item has a `route`, or a
`disabled` item lacks a `reasonKey`. The two flips supply valid `route`s → guard passes.
