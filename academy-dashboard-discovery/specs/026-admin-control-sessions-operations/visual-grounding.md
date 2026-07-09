# Visual Grounding — Spec 026

Targeted grounding for both layers. This spec did not rely on memory; it opened exact legacy and current evidence via three read-only audit passes, each citing paths.

## Legacy admin evidence opened

- **Ops home / daily controls**: `output/roles/admin/pages/management-home.md` (+ status lenses `management-home-status*.md`, helpers); `output/roles/admin/screenshots/management-home-full.png` — 8-KPI wall, "Classes Of {date}" table, filter form, view-mode modal, 6 status lenses, row actions (Show Details / Send Reminder / Reverse Action).
- **Session detail / lifecycle**: `management-courseclasses-1.md` (+`-2..-6.md`), `screenshots/management-courseclasses-1-full.png` — history/info/files/timetable/timeline + Actions→9 modals (attend/absent/cancel/edit/reschedule/queue/whatsapp/feedback/direct-links) + recording.
- **Timetable/schedule control**: `management-all-teachers-timetable.md`, `screenshots/management-all-teachers-timetable-full.png` — weekly grid, block popover (Show Details / Edit course / Show Student).
- **Session outcomes**: `management-sessions-analysis.md`, `screenshots/management-sessions-analysis-full.png` — outcome KPI board (regular + trial, count + duration).
- **Requests / scheduling**: `management-schedule-sessions-response.md`, `management-schedule-trials-response.md`, `management-request-schedule-1-1.md`, `-2-2.md`.
- **Ops utilities & automation**: `management-total-queues.md`, `management-public-holiday.md`, `management-scheduled-actions.md` (+`-create.md`), `management-time-convertor.md`.
- **Comms / CRM / tasks**: `management-chat.md`, `management-public-advertisement.md`, `management-new-requests.md` (+`-create.md`, `-filter-*.md`), `management-tickets.md`.
- **Binding decisions**: `specs/023-.../coverage-matrix.md`, `specs/023-.../missing-capabilities-register.md`, `specs/016-.../admin-sidebar-inventory.md`, `specs/016-.../future-spec-sequence.md`.

(Full capability→evidence→disposition table in `legacy-admin-ops-coverage.md`.)

## Current admin evidence opened

- Built pages: `app/public/*.html` — the 20 admin bases (dashboard, sessions, schedule, students, teachers, courses, settings, reports, gallery, families, add-family, family, student, attendance, groups, course, group, teacher, teacher-performance, finance) ×2 langs.
- Action infra: `app/src/js/enhance.js` (delegated click dispatch — `data-demo-action`, `data-confirm`, `data-drawer`, `data-tab`, `data-filter`, `data-coming-soon`, `data-disabled-reason`, `data-row-menu`, catch-all `toast(acknowledge(btn))`); `app/src/js/nav.config.js` (planned admin items :27–34 for Spec 026); `app/screenshots/REVIEW.md`; `app/tests/smoke/run.cjs`.

## Current portal evidence opened

- All 25 portal bases (hub · 3 role homes · family-child · 6 student · 7 family · 7 teacher internals) ×2 langs, cross-checked against `portal-page.js`, `fixtures/portal.js`, and the smoke asserts. Result: fully action-complete & honest (see `current-action-inventory.md`).

## 91-page sampling / grouping method

The 91 pages fall into three action-surface classes; the inventory covers **every** page but classifies shared chrome once:

1. **Admin shell (40 files = 20 bases ×2)** — shared topbar + six-category rail chrome (classified once: all honest — menus/toggles/coming-soon); plus **page-specific body actions** enumerated per base (Create/Edit/Delete/Cancel/View/Export/Filter/Tab/row-menu/drawer). This is where Layer-B reclassification concentrates.
2. **Portal shell (49 files = 24 role bases + family-child, ×2 minus hub-pair overlap)** — shared portal topbar + role sidebar (classified once: honest); body = real nav links + `:target` switcher + non-interactive gates. **Already complete** (agent-verified, smoke-pinned).
3. **Hub + index (2 + ... )** — the hub `portals` (4 real role/admin links, no sidebar) + `index` redirect. Honest.

Census facts (built, AR): `data-action` surface = shell chrome (theme/lang/notifications/profile/apps/quick-actions/command-palette/toggle-rail/open-drawer) + page actions (new-session/add-session/retry/open-modal/apply-filter/clear-filter/toast-demo); `data-drawer` on 10 pages, `data-tab` on 8, `data-filter` on 11, `data-demo-action` on 17, wizard steps on add-family. **`href="#"` = 0 sitewide.** Planned admin nav = `data-coming-soon` gates (29 in dashboard), **no broken anchors** to the absent planned pages.

## Exact gaps (what Spec 026 must address)

**Layer A (admin ops)** — the eight planned nav targets (`sessions-analysis, messages, leads, tasks, announcements, time-convertor, public-holiday, scheduled-actions`) + two folds (total-queues, schedule-requests inbox) are grounded in legacy but not yet built; they are currently honest `data-coming-soon` gates. Spec 026 (implementation phase) builds the grounded **operational** subset (sessions/timetable/attendance/outcomes/daily-ops) and deepens session-lifecycle modals on the done pages (dashboard/sessions/schedule/attendance); the rest stay honest planned gates or route to owner specs. Final page set + count decided in planning.

**Layer B (global completion)** — the substantive gap is the **era inconsistency**: admin Create/Edit/Cancel/Save/Export row-actions currently resolve to `data-demo-action` «preview action» toasts (no explicit "needs server" honesty), whereas the portal era uses non-interactive `backendRequired` gates. Reclassify persistence-implying admin actions to an honest `backendRequired` final step (confirm modal/gate). The portal surface (25 pages) needs **no** remediation. No `href="#"`, no dead links, no raw keys anywhere (re-verified).

## What Spec 026 must fix (summary)
1. Reclassify admin persistence-implying «preview action» toasts → honest `backendRequired` finals (modal/confirm/gate).
2. Build the grounded admin **operational** pages/modals (Layer A subset) with `backendRequired` writes; route non-ops planned items (leads/messages/announcements/etc.) to owner specs behind honest gates.
3. Deepen session-lifecycle actions (create/edit/cancel/reschedule/attendance/outcome) on the done ops pages as modals/drawers with `backendRequired` finals.
4. Keep the portal surface unchanged; keep all three role laws green; keep excluded-by-law surfaces (pay-signal, fake live room, direct-links) out.
