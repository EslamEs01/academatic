# Contract — Admin Ops Page Set

**MUST**: Layer A builds exactly `sessions-analysis`, `public-holiday`, `scheduled-actions` (standalone, AR+EN); folds total-queues → `sessions`, schedule-requests → `schedule`; keeps leads/tasks/messages/announcements/time-convertor as honest planned gates. No other admin page is created.

**Acceptance**
- 3 new page modules + 3 `build-html.mjs` registers (`shell:'app'`, correct `activeId`/`titleKey`).
- 3 nav flips planned→implemented (`sessionsAnalysis`/`publicHoliday`/`scheduledActions`); other 5 stay `planned`.
- Each page: display-only body, authored fixtures, writes = `backendRequired`, no computed score/chart, no fake automation/export.
- Folds present in sessions/schedule with gated add/accept/reject; no invented fields.
- **Fail** if a 4th admin page is built, a non-core item is built, or a write is faked.
