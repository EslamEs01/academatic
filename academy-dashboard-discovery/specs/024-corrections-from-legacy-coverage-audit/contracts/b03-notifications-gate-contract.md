# Contract: B-03 — Notifications honest gate (Must fix)

**Problem**: notifications appear on all 13 legacy family pages + every teacher page, but the role-portal shell has no notifications surface OR gate (M-01). The admin shell already has an honest gate.

## Chosen: Option A (with fallbacks)

**Option A** — add an honest notifications gate to the role-portal topbar reusing the EXISTING pattern:
- Add a `data-action="notifications"` icon-button (bell) to `app/src/js/components/portal-shell.js` topbar, beside the existing theme/lang buttons.
- The existing `enhance.js:519` handler serves it via `notificationsMenu()` (Soon-badged, `aria-disabled="true"`, `data-disabled-reason`, existing `topbar.notif*` keys). No `enhance.js` edit; no new hook; no new key.

**Fallback A2** — if the role-portal topbar cannot reach the `enhance.js` popover without an `enhance.js` change: add a static inline honest `pt-guide` notifications gate (backendRequired) in the role home body instead (still no new hook).

**Fallback B** — if any UI path risks scope creep/new engine: record notifications as future-backend in the correction/coverage docs, no UI.

## Forbidden (all options)

- Duplicating or altering the admin `notificationsMenu()`.
- Any fake count / read-unread / feed items / real popover behavior beyond the existing Soon gate.
- New `data-*` hook, new storage key, new engine, `href="#"`.

## Acceptance

- Notifications appear only as an honest gate (Soon/backendRequired) OR a recorded futures entry.
- Admin `enhance.js` `notificationsMenu()` byte-unchanged.
- If UI added: a11y (`aria-disabled`, keyboard-focusable non-activating) green; smoke shell-anchor multiset still holds; the control is a non-anchor (`plannedNavAnchors` unaffected).
- Zero fake badge/count in built HTML.

**Owner**: 024-correction (Must fix).
