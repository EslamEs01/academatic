# Modal / Drawer / Gate / Page Scope — Spec 027

Every management op reuses a **proven Spec-026 pattern** (no new hook/storage key assumed). Anchors: `enhance.js` (generalized `openModal(trigger)` reading `data-modal-title-key`/`data-modal-note-key`; `openConfirm()`; `openSheet()`/`data-drawer`; `data-disabled-reason`; `data-tab`/`data-filter`). The final count is fixed in `/speckit-plan`; default = **97** (no new pages).

## Surface decision per operation

| Operation | Surface | Final step | Notes |
|---|---|---|---|
| Add family | **real page** (add-family wizard, exists) | wizard Save = `backendRequired` modal | already honest (026); complete wizard fields display-only |
| Add student / Add course / Add group | **create modal** (`data-modal-trigger` + title/note) | `backendRequired` | already open honest modal (026); may enrich with a field scaffold |
| Add child (to family) | **modal** or wizard step | `backendRequired` | reuse the wizard child step / a modal |
| Edit family/student/course/group | **prefilled modal or drawer** | `backendRequired` | upgrade from the current honest toast to a modal/drawer (richer) |
| Delete / Remove-student / Suspend / Stop | **confirm modal** (`data-confirm`) | confirm = `backendRequired` (reworded, 026) | no DOM removal, no status flip |
| Enroll in course / Assign to group / Add students to course/group | **assignment modal/drawer** (`data-modal-trigger`/`data-drawer` with a picker list, display-only) | Assign/Enroll = `backendRequired` | no fake link; the picker is display-only |
| Move / Transfer student | **modal** (if legacy-grounded) else honest gate | `backendRequired` | do not invent uncaptured fields |
| Assign teacher (course/group) | **gate** (reference; deep mgmt = 028) | `backendRequired`/`permission-locked` | teacher stays a reference |
| Add note | **modal or gate** | `backendRequired` | |
| Message / Contact / Notify | **gate** | `backendRequired`/`future-backend` | no fake composer |
| View / Details | **real page** (family/student/course/group) or **read-only drawer** | — (read) | already real |
| Export / Print | **gate** | `backendRequired` | no fake file |
| Billing / Payment (family) | **excluded** or owner-030 gate | — | **never a figure** |
| Status/level/subject filters · tabs | **real static** (`data-filter`/`data-tab`) | — | keep working |

## Reusable patterns (from `026 modal-and-gate-scope.md`)
1. **Create/Edit modal** — `data-modal-trigger` + `data-modal-title-key` (op title) + `data-modal-note-key="common.backendRequiredNote"` → honest titled modal, Close only, no fake Save.
2. **Assignment modal/drawer** — same modal (or `openSheet` read-only picker) whose final Assign is the backendRequired note; the candidate list is display-only.
3. **Confirm** — `data-confirm` + reworded `data-confirm-toast` ("available once the server is connected"); no DOM mutation.
4. **Gate** — `data-disabled-reason` clickable control toasting the honest reason (assign-teacher, message, export).
5. **Static tab/filter** — `data-tab`/`data-filter*` unchanged.

## Expected count
Default **97** (all improvements via existing pages/modals/drawers). Standalone create/detail pages are the exception — only if legacy IA proves one is missing AND a modal/drawer can't serve it; planning must justify the exact count and build must verify it. **No removals, no unrelated additions.**

## New-hook policy
Reuse the closed `data-*` set. If an assignment picker genuinely needs new behavior, prefer a display-only list inside the existing `openModal`/`openSheet` (no new dispatch hook). A new hook is a last resort, justified in `research.md` at plan time.
