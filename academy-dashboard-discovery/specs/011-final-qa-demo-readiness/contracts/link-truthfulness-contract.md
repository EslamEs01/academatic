# Contract: Link & Truthfulness Sweep (Spec 011)

**Status**: Binding · The demo-readiness verification. References FR-006/FR-007/FR-008/FR-013; US3; SC-001/SC-006; research D3.

## 1. Sweep (reuses the Spec 010 crawl + truthfulness sweep, one assertion tightened)

Across all 40 built pages:
- **Zero `href="#"` sitewide** — the dashboard follow-up is closed; no page (dashboard included) carries a dead hash. The Spec 010 link-crawl `deadHash` assertion is tightened from `=== (page==='dashboard' ? 1 : 0)` to `=== 0` for every page (research D3).
- Every local link resolves to an existing built file or a documented existing in-page hash target; zero external/CDN links.
- Planned nav items are non-navigating «قريبًا» buttons; disabled/backendRequired items expose their reason; future-role portals are unrendered.
- Zero raw `⟦key⟧`; correct single active nav item per page (0 on gallery); correct topbar title/crumb.

## 2. Badge assertion (locale-aware — research D3)

The Spec 010 sessions-badge smoke assertion becomes locale-aware: expected = `Intl.NumberFormat(lang==='en'?'en-US':'ar-EG').format(Number(SESSIONS_TOTAL))`, asserted `=== sessBadge`. Proves localization AND the fixture tie in one check.

## 3. MUST NOT

No new test file; no weakening of any existing assertion (the two updates are tightenings/corrections to match the fixed state); no new `data-*` hook.

**Acceptance (binding):**
1. **Given** all built pages, **When** the crawl runs, **Then** `href="#"` = 0 sitewide, dead targets = 0, external = 0.
2. **Given** the truthfulness sweep, **When** run, **Then** planned/disabled/future-role invariants all hold.
3. **Given** the updated badge assertion, **When** smoke runs, **Then** it passes for both languages tied to `SESSIONS.total`.
