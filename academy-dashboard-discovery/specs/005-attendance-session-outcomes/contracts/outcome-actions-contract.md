# Contract: Outcome Action Cluster (status-gated, demo-only)

**Status**: Binding · the status-gated, DEMO-ONLY session-outcome action cluster rendered inside the canonical outcome drawer (`outcome-details-contract.md` §8) and mirrored by the outcome row's `data-row-menu`. It realizes the reference's ONE shared session-action family (mark-attend / mark-absent("who") / cancel("who") / reschedule / notify / feedback / reverse) as honest demo / confirm→demo / disabled-with-reason controls, **status-gated** by `outcomeId`. **No real save, status mutation, persistence, notification, reschedule, make-up, or credit** (D4/D5/R36/R37). Reuses the existing four action hooks — **NO new action hook**.

## 1. Purpose & honest scope (no engine)

- Give the admin the genuinely useful reference behavior — the right actions for the row's outcome state — while making it unmistakable that **nothing is saved**.
- The legacy 13-control, field-dense Mark-Absent/Cancel modals are NOT reproduced; actions live in the calm drawer + small confirm modals (one calm row-action menu, not 3–6 inline pills).
- Every action MUST be exactly one of three honest kinds and MUST satisfy the no-dead-button rule (IP8): a **demo toast**, a **confirmation modal → demo toast** (destructive), or **disabled-with-reason**.
- No action writes data; no `id` mutates state; no action navigates to a real resource.
- Every user-facing string MUST be an i18n key resolved at build time (the `att.act.*` / `att.reason.*` namespace); **no raw i18n key** ever renders.

## 2. The action set + `kind` (binding — exact)

The cluster MUST expose exactly these actions, each with the bound `kind` and hook:

| action `id` | `kind` | hook(s) |
|---|---|---|
| **markAttend** | demo | `data-demo-action` + `data-toast` |
| **notify** (notify family — in-app demo) | demo | `data-demo-action` + `data-toast` |
| **feedback** (add feedback note) | demo | `data-demo-action` + `data-toast` |
| **reverse** (un-mark) | demo | `data-demo-action` + `data-toast` |
| **cancel** | confirm → demo (destructive) | `data-confirm` + `-title`/`-msg`/`-cta`/`-toast`/`-danger` |
| **reschedule** (make-up) | confirm → demo (destructive) | `data-confirm` + `-title`/`-msg`/`-cta`/`-toast`/`-danger` |
| **markStudentAbsent** | confirm → demo (destructive) | `data-confirm` + `-title`/`-msg`/`-cta`/`-toast`/`-danger` |
| **markTeacherAbsent** | confirm → demo (destructive) | `data-confirm` + `-title`/`-msg`/`-cta`/`-toast`/`-danger` |
| **real-save** (persist any outcome) | disabled-with-reason | `data-disabled-reason` + `data-reason-key` |
| **real-notify** (real WhatsApp/SMS/email send) | disabled-with-reason | `data-disabled-reason` + `data-reason-key` |
| **makeup-add-to-credit** | disabled-with-reason | `data-disabled-reason` + `data-reason-key` |

### 2.1 Demo actions (markAttend / notify / feedback / reverse)

- MUST resolve to the existing `data-demo-action` branch in `enhance.js` → a clearly-labeled demo toast via `data-toast` (e.g. `att.act.attendToast` = "Marked attended — demo only, nothing saved").
- They imply NO real send and NO write.
- They are rendered as calm `btn btn-secondary btn-sm` controls with an icon + label (never icon/color-only).

### 2.2 Confirm actions (cancel / reschedule / markStudentAbsent / markTeacherAbsent)

- MUST be built via `confirmAction({ titleKey, msgKey, confirmKey, toastKey, danger:true })` (or the equivalent `data-confirm` + `-title|-msg|-cta|-toast|-danger` attributes) → the existing `openConfirm` modal → on confirm, a demo toast.
- They are framed **destructive** (`-danger` → coral medallion + `btn-danger`) because they change a session's recorded outcome; confirming changes NOTHING in storage.
- **Mark-absent "who"**: the reference's single "who is absent?" select is realized as TWO distinct, pre-gated actions — `markStudentAbsent` and `markTeacherAbsent` — each its own confirm (the spec's required distinction), NOT a runtime select. **Cancel "who"** (teacher/student/admin) is recorded as a drawer attribution, not extra actions.

### 2.3 Disabled-with-reason controls (real-save / real-notify / makeup-add-to-credit)

- MUST carry `data-disabled-reason` + `data-reason-key`, `aria-disabled="true"`, and a `title`/visible reason; clicking surfaces the reason toast via the existing `data-disabled-reason` branch.
- Reason keys, e.g. `att.reason.finance` = "requires the finance/credit module — out of scope"; `att.reason.persist` = "saving outcomes needs the backend — out of scope"; `att.reason.notify` = "real messaging needs the notifications backend — out of scope".
- They are visibly disabled, never silently dead, and never imply a real effect.

## 3. Status-gating by `outcomeId` (binding — which actions appear)

`gatedActions(item)` MUST render ONLY the actions sensible for the row's `outcomeId`, mirroring the reference's per-state gating:

| `outcomeId` | actions shown |
|---|---|
| **upcoming** / **live** | markAttend · markStudentAbsent · markTeacherAbsent · cancel · reschedule |
| **attended** | feedback · notify · reverse |
| **studentAbsent** / **teacherAbsent** / **cancelled** | reschedule (make-up) · notify · reverse |
| **rescheduled** | notify · reverse |

- The gating MUST be baked at build time from `item.outcomeId` — the cluster for each state is pre-rendered into that row's `<template data-preview>`. Runtime JS does NOT compute or mutate the gate.
- An action MUST NOT appear for a state it is not gated on — e.g. **no `reverse` on an `upcoming` session**, no `markAttend` on an already-`attended` outcome, no `markStudentAbsent` on a `cancelled` row.
- The **disabled-with-reason** controls (real-save / real-notify / makeup-add-to-credit) MAY appear alongside the gated cluster wherever their concept is relevant (e.g. `makeup-add-to-credit` beside the make-up/credit hint on absent/cancelled rows); they are always disabled-with-reason regardless of state.

### 3.1 Worked gating examples (binding intent)

- An **upcoming** session: the drawer shows markAttend (demo) · markStudentAbsent / markTeacherAbsent / cancel / reschedule (each confirm→demo); it shows NO `reverse`, NO `feedback`.
- An **attended** session: feedback / notify (demo) · reverse (demo); NO mark/cancel — the session is already held and attended.
- A **studentAbsent** session: reschedule-make-up (confirm→demo) · notify (demo) · reverse (demo) · the `makeup-add-to-credit` disabled-with-reason beside the make-up hint.
- A **rescheduled** session: notify (demo) · reverse (demo) only — no re-marking of a moved session.

## 4. Make-up / credit = display hint only (R37, binding)

- Make-up / credit is a **display hint only** — surfaced in the drawer's outcome section as a calm line ("make-up suggested" / "added to credit (demo)", `outcome-details-contract.md` §7) derived from `item.makeup`.
- The cluster's **makeup-add-to-credit** control MUST be **disabled-with-reason** ("requires the finance/credit module — out of scope").
- The **reschedule (make-up)** confirm action schedules NOTHING — it is a confirm→demo only; it does not write a new time.
- NO balance, NO finance/credit/accounting/salary math, NO real make-up scheduler. The hint never implies a real balance.

## 5. MUST NOT (binding boundary)

The cluster MUST NOT:
- perform a **real save** / write / persist of any outcome;
- **mutate** the row's `statusId` / `outcomeId` / attendance count in the DOM, `localStorage`, or anywhere;
- perform **real persistence** of attendance/feedback/reschedule/cancellation;
- send a **real notification** (WhatsApp / SMS / email / push);
- perform a **real reschedule** or write a new time;
- run a **real make-up** scheduler or touch a **real credit / payment / finance / salary** ledger;
- introduce a **new action hook**, a new runtime engine, a runtime "who is absent?" select, or any JS-generated id/class.

All four behaviors reuse the existing `enhance.js` branches (`data-demo-action`, `data-confirm`→`openConfirm`, `data-disabled-reason`, `data-toast`) unchanged.

## 6. Drawer + row-menu parity (binding)

- The PRIMARY surface for the gated cluster is the **outcome drawer** (`outcome-details-contract.md` §8).
- The outcome row's **`data-row-menu="<id>"`** kebab MUST also be honest: its "view details" item carries `data-drawer="<id>"` (opens the canonical drawer holding the full gated cluster).
- Any inline quick-action the row menu offers MUST be one of the SAME three kinds, carry the SAME hooks, and respect the SAME `outcomeId` gating as the drawer — never a dead control, never a different action vocabulary.
- No control on a row or in the drawer is a bare `<button>` with no behavior; every one demos, confirms→demos, opens the drawer, navigates (the real student/family/schedule links), or is disabled-with-reason.

## 7. `data-*` hooks (exact, reuse only — no invention)

- `data-demo-action` + `data-toast` — markAttend / notify / feedback / reverse.
- `data-confirm` + `data-confirm-title` / `-msg` / `-cta` / `-toast` / `-danger` — cancel / reschedule / markStudentAbsent / markTeacherAbsent → `openConfirm` → demo toast.
- `data-disabled-reason` + `data-reason-key` — real-save / real-notify / makeup-add-to-credit.
- `data-row-menu="<id>"` + `data-drawer="<id>"` — the kebab → canonical drawer.
- These are the SAME four action hooks already wired in `enhance.js`. **Spec 005 introduces NO new action hook; no JS-generated ids/classes; no per-action bespoke JS.**

## 7.1 Reused atoms / builders (no new component)

- The confirm actions reuse `confirmAction({ … })` (`confirm-modal.js`) → the existing `openConfirm` in `enhance.js`; the demo/disabled actions reuse the `ui` `button({ …, attrs })` / raw `btn` markup with the existing `data-*` attributes.
- No new builder beyond `gatedActions(item)` (inside `outcome-details.js`) is introduced; `gatedActions` emits only the existing hooks. There is NO new modal, NO new toast channel, NO new disabled mechanism.
- i18n keys live under `att.act.*` (labels + toasts: `attend`, `notify`, `feedback`, `reverse`, `cancel`, `reschedule`, `studentAbsent`, `teacherAbsent`, each with a `…Toast` / confirm `…Title|Msg|Cta`) and `att.reason.*` (the disabled reasons). Every key resolves at build time per language; no raw key renders.

## 8. States, responsive, a11y

- The cluster MUST wrap (`flex flex-wrap gap-2`) and reflow without horizontal overflow; on mobile it stacks inside the full-height drawer.
- Confirm modals are centered, scrim-dismissable, Esc-closable, focus the confirm CTA, and return focus on close (the existing `openConfirm` behavior).
- Destructive (confirm) actions use the danger framing (`-danger` → coral medallion + `btn-danger`); demo actions use the calm secondary button; disabled actions are visibly disabled with `aria-disabled="true"` + a stated reason.
- Every control is keyboard operable with visible focus; ≥44px targets; icon + label (never icon/color-only); WCAG AA; axe critical = 0; Light/Dark/System via tokens.
- **Edge cases**: a group session carries one session-level outcome (one cluster, no per-student actions); an upcoming/live row shows only the mark/cancel/reschedule set (no `reverse`); a `rescheduled` row shows only notify/reverse.

## 9. Static-HTML-first & Django mapping

- The full gated cluster (and the disabled-with-reason controls) MUST be BAKED into each row's `<template data-preview>` in the static `public/*.html` (Attendance + Sessions, ar + en) — real markup, relative `./assets/` paths, no `<div id="app">`, no JS-built actions, zero external/CDN requests.
- **Django**: the actions render inside the one `_outcome_details.html` partial (`outcome-details-contract.md` §13) from the outcome context.
- The per-state gate → `{% if outcome.id in "studentAbsent,teacherAbsent,cancelled" %}` (or a gating template tag) emitting the SAME `data-*` attributes server-side; the confirm copy / toast / reason keys → context strings.
- The action behavior is reproduced 1:1 by the same hooks — no server-side mutation, no real endpoint. No surface forks the action markup.

## 10. Enforcement & cross-references

- **Smoke** (R43): from the outcome drawer, **markAttend** fires a demo toast and nothing persists (no `statusId`/`outcomeId`/count change); a destructive action (**cancel**) opens the confirmation modal and confirming shows a demo toast (no real status change); a **disabled** action (e.g. add-to-credit / real-save) is `aria-disabled` and surfaces its reason key.
- It also asserts the cluster is **status-gated** (e.g. no `reverse` on an `upcoming` row, no `markAttend` on `attended`); the row `data-row-menu` "view" opens the canonical drawer; **no dead control** anywhere; **no raw i18n keys**; **zero external requests**.
- **Screenshots** (screenshot-acceptance): Outcome action **confirmation modal** — AR-RTL light desktop (matrix #5) — appended to `app/screenshots/REVIEW.md`.
- Binds to `outcome-details-contract.md` (the hosting drawer + the make-up/credit hint), `outcome-status-contract.md` (the `outcomeId` vocabulary the gating keys off), `attendance-page-contract.md` + `sessions-integration-contract.md` (the row menus that mirror the cluster), the Spec 003 `appointment-details-contract.md` (the prior demo/confirm/disabled action precedent), `static-html-django-ready-contract.md`, the Spec 002 `interaction-patterns-contract.md` (IP8/IP9), and `scope-guard.md` (the no-persistence / no-engine / no-finance-credit rules, in force).
