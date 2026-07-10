# Modal & Form Scope — Spec 034

Every create/edit/compose surface and its mechanism. All reuse the CLOSED `data-*` set + the Spec-032 `formDrawer()` helper — **no new hook, no new component**. Each form renders ≥1 visible field before its `data-disabled-reason` final (the Spec-032 form-completion rule); no field-less "backendRequired-only" modal.

## Forms / drawers by page
| Page | Surface | Mechanism | Fields (visible) | Final |
|---|---|---|---|---|
| messages | Compose/reply | inline compose box on the page | message (textarea) | Send/Reply = `data-disabled-reason` |
| messages | Create Group | `data-drawer="msg-group"` + `formDrawer` template | name · bio · staff(select) · teachers(select) · students(select) · **image = inline gate** | Save = gate |
| messages | Add Member | `data-drawer="msg-member"` + `formDrawer` | staff/teachers/students (multi-selects) | Save = gate |
| leads | Lead detail | `data-drawer="lead-<id>"` (`previewTemplate`) | notes log (sheetRows) + Add-Notes form + Change-Status form | Save/Update = gates |
| leads | Add Notes | inside lead-detail drawer | note (textarea) | Save = gate |
| leads | Change Status | inside lead-detail drawer | status (select, 9 opts) | Update = gate |
| leads | Create Request | `data-drawer="lead-new"` + `formDrawer` | ~19 grounded fields (name/email/phone/gender/age/language/timezone/trial/course/note…) | Submit = gate |
| tasks | Create/Edit Task | `data-drawer="task-new"`/`task-edit` + `formDrawer` | title · description · assignee(select) · status(select) · priority(select) · due-date · section(select) | Save = gate |
| tasks | Add Section | `data-drawer="task-section"` + `formDrawer` | name | Add = gate |
| announcements | Compose | inline compose form on the page | message(textarea) · channel toggles · private(checkbox) · expire(date) · audience selects · country/hours/language(selects) · **media = inline gate** | Publish/Send = gate |
| time-converter | Converter | page-scoped init (native `Intl`) | source-zone(select) · target-zone(select) · date · time | **no gate — real conversion** |

## Rules
- **Kebab/row triggers** (if any list rows carry menus) route via the EXISTING `data-row-menu` dispatch — no new kind unless a follow-up justifies it; default to `data-drawer`/`data-confirm` triggers.
- **Confirm actions** (delete/leave-group/etc.) use `data-confirm` → `openConfirm` (backendRequired toast; no mutation).
- **File affordances** (chat image, ad media) are `btn-secondary` inline gates (`data-disabled-reason`) — never `<input type="file">`.
- **timeConverter** is the sole interactive addition: a page-scoped init reading its own selects/inputs and writing its own output region (precedent: `initTabs`/`initWizard`) — NOT a new global `data-*` dispatch, NOT a storage key.
- Every drawer body has exactly one primary `data-disabled-reason` final (the Spec-032 invariant); options come from authored fixtures (no pay/credential/PII).
- All labels/placeholders/options mirrored AR/EN.
