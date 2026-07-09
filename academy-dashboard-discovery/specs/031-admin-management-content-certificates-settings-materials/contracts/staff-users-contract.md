# Contract: Staff / Users

**Purpose**: `staff.html` is the ONE honest staff home (resolves B-16); no real auth, no password, no salary.

**MUST**:
- Display-only directory (`directory-card` + `filter-bar`), authored rows (name/username/phone/email/role-chip/status-chip). **No salary/pay figure.**
- Per-row `staffMenu` kebab (new branch on the existing `data-row-menu` dispatch — NOT a new hook): View (drawer) · Edit (modal) · Permissions (RBAC drawer) · Category (drawer) · Activity (drawer) · Duplicate (modal) · Deactivate/Activate/Delete (confirm).
- Add-member / Edit / Duplicate = backendRequired modals with **no `type=password`, no salary field**.
- Deactivate/Activate/Delete = confirm; **no row/status mutation**.
- Reset-password / Invite = future-backend gate (no password field).
- `settingsUsers` folds → settings "Users" tab (RBAC preview + real deep-link to `staff.html`); one staff home only.

**Verify**: smoke — staff loads AR/EN; ≥5 rows; kebab present; Add/Edit modal has no `type=password` and no pay figure; no-mutation snapshot on Deactivate.

**Status**: Binding. `management-entity-scope.md` StaffMember.
