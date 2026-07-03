# Contract: Student Dashboard Honesty (Spec 013)

**Status**: Binding · References FR-015…FR-017; research D2/D3/D6/D7.

## 1. The four honest action classes (exhaustive)

Every interactive element on the student page is exactly one of:
1. **Real link to an existing page** — permitted set: the shell's hub switch link ONLY (research D7: zero page-body links).
2. **Demo toast via existing hooks** — none planned; if used, existing `data-action` hooks only.
3. **Labeled disabled/planned control** — the three `.pt-planned` mini-cards (submit-hw backendRequired · download-mat backendRequired · full-history planned), each a `<div>` (never `<a>`), each carrying the labeled `availabilityChip` (icon + text).
4. **Display-only content** — everything else.

## 2. Live-session honesty (hard line)

The next-session affordance is a note/mini-card that SAYS the real join requires the live-session integration. It must never: look like a button-styled join, carry Zoom/meeting vocabulary as if real, or imply a countdown/live state the fixtures don't hold. (The legacy "live room" was itself fake — T6 excluded; the real classroom is T7 backendRequired.)

## 3. Homework / materials honesty

Homework items: display-only cards; NO submit/upload affordance on items; the backend gate is the labeled backendRequired mini-card (coverage F4). Materials items: display-only; NO download affordance; same gate pattern. Due labels are authored strings, never computed dates.

## 4. Celebration honesty (leaderboard resolution)

The «نجوم مجموعتي» section: unordered, no ordinals, no points, no per-peer performance claims; carries an authored/demo label. Any wording implying computed ranking is a contract violation.

## 5. Forbidden outright

`href="#"` · dead local links · fake chat/notification affordances · notification counts · backend promises ("will sync", "auto-saves") · "coming soon" hype · any pay/price vocabulary.

## Acceptance (binding)

1. **Given** both built files, **When** all anchors are enumerated, **Then** the set = shell links only (skip + hub switch + theme/lang buttons), and planned mini-cards are non-anchor divs with labeled chips (smoke plannedBad = 0).
2. **Given** the AR text body, **Then** «يتطلب الخادم» appears ≥ 1× (the backendRequired gates are visibly labeled) and no join-styled control exists.
3. **Given** grep over both files, **Then** zero `href="#"`, zero fake-engine vocabulary (chat/upload/submit controls), zero pay tokens.
