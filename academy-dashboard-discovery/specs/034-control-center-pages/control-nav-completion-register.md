# Control Nav Completion Register — Spec 034

The 5 Control-category nav items that Spec 034 flips from «قريبًا» to real implemented routes. Source: `nav.config.js` control category + Spec-033 matrix/coming-soon register.

| id | Current nav status | Current visible marker | Recommended route | Count impact | Final nav status | Acceptance check |
|---|---|---|---|---|---|---|
| messages | planned | «قريبًا» button (no route) | `messages.html` | +2 (AR+EN) | implemented (real `<a>` link) | nav navigates to messages.html; no «قريبًا»; page renders inbox/thread/compose; Send gated |
| leads | planned | «قريبًا» button | `leads.html` | +2 | implemented | nav navigates to leads.html; no «قريبًا»; requests inbox + detail + convert form; Convert/Assign gated |
| tasks | planned | «قريبًا» button | `tasks.html` | +2 | implemented | nav navigates to tasks.html; no «قريبًا»; board/list + create form; Save/Move gated |
| announcements | planned | «قريبًا» button | `announcements.html` | +2 | implemented | nav navigates to announcements.html; no «قريبًا»; list + compose + preview; Publish gated |
| timeConverter | planned | «قريبًا» button | `time-converter.html` | +2 | implemented | nav navigates to time-converter.html; no «قريبًا»; **working timezone tool, no gate** |

## Rules
- All 5 flips are `planned → implemented` with a real `route` — satisfying the `nav.config.js` build-time guard (implemented ⇒ route).
- `FUTURE_ROUTES` loses its `messages`/`leads`/`tasks`/`announcements` entries (now real routes). `timeConverter` had none.
- The Control category still has 12 items; after the flips: 12 implemented (home, sessions, schedule, attendance, sessionsAnalysis, publicHoliday, scheduledActions **+ messages, leads, tasks, announcements, timeConverter**) — **0 «قريبًا» left in Control**.
- Sitewide admin-menu coverage stays 50 items; the 5 flips move planned→implemented (planned 23→18, implemented 20→25). `plannedNavAnchors===0` holds (remaining planned items in other categories stay non-anchor buttons).

## Owner / follow-up
- Owner: Spec 034 (this spec's implementation phase).
- No further owner needed for these 5 (they are fully closed here). The final sidebar re-freeze is Spec 041.
