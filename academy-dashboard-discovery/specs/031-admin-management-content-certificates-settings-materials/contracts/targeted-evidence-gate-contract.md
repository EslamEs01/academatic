# Contract: Targeted Evidence Gate

**Purpose**: Every 031 surface must trace to cited legacy evidence — no invented admin/settings pages.

**MUST**:
- Every built 031 capability maps to a row in `legacy-management-content-coverage.md` with an exact evidence path.
- No surface is built from memory or generic SaaS assumptions.
- Documented evidence gaps (Message-Builder 504, Locations page absence, RBAC ~170/17 approximation, empty legacy tables) are handled as excluded/gated/folded — never invented.
- Fixtures use authored fake data (no legacy PII).

**Verify**: cross-check `visual-grounding.md` + `legacy-management-content-coverage.md` citations against the implemented surfaces; grep fixtures for legacy PII patterns (captured emails/phones) = 0.

**Status**: grounding complete (8-agent audit). Binding for implementation.
