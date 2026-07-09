# Management Entity Scope — Spec 031

Display-only entities for the 031 surfaces. **No persistence, no auth, no files, no pay figures.** All fields are authored fixture data (never real PII from legacy captures). "Writes" columns list which actions are `backendRequired` gates.

| Entity | Allowed display fields | Forbidden fields | Writes → backendRequired gate |
|---|---|---|---|
| **StaffMember / AdminUser** | id, name, username, phone (masked/authored), email (authored), role-chip, status-chip | **password**, **salary/pay**, 2FA-secret, session-token | Add, Edit, Delete, Deactivate, Activate, Reset-password, Invite |
| **Role** | label (Manager/Accountant/Supervisor/Support enum) | role-definition CRUD (none in legacy) | — (display-only; no role-editor) |
| **PermissionGroup** | group name, item labels (~17 groups / ~170 items) | live `checked` state that persists | Save-permissions |
| **Permission** | label, granted/not chip (authored) | real enforcement | (toggle mutates nothing) |
| **CategoryScope** | student/teacher category names (authored) | real assignment persistence | Assign-categories |
| **ActivityLogEntry** | entity, action, date (authored) | — | (read-only, no write) |
| **Material (Subject)** | id, name, name_ar | file, content body | Add, Edit, Delete |
| **Book / LibraryItem** | id, name, type-chip, category, publishedAt (literal), views (count literal), downloads (count literal), status-chip | **file**, thumbnail-file, download URL, computed totals | Add, Edit, Upload, Download, Publish, Delete |
| **LibraryCategory** | name, type, item-count (literal) | — | Add, Edit, Delete |
| **CertificateTemplate** | id, name, background-thumbnail (authored image ref, not upload), usageCount (literal) | live drag positions, `<canvas>`, upload, FPDF output | Create, Edit, Save, Delete |
| **CertificateRequest** | student, course, teacher, description, date, status-chip | — | Approve, Reject, Generate, Send |
| **IssuedCertificate** | id, certificate label, status | Options actions (download/delete) | (read-only; Options non-actionable) |
| **SettingCard / SettingRow** | label, authored value | secret value | Save |
| **SettingToggle** | label, authored on/off | persisted state | (no persist) |
| **IntegrationCard** | provider name, status-chip (authored, e.g. "not connected") | **API key, secret, webhook, token, `type=password`**, live "Connected" | Connect, Disconnect, Test, Configure, Save-credentials |
| **NotificationRule** | event, role, channel, on/off (authored) | any amount/figure | Save |
| **PolicyDocument** | title, body text (authored, display-only) | live rich-text/`contenteditable` | Edit |
| **ExpenseHead** | name, status-chip | **amount / figure** | Add, Edit, Delete |
| **LookupItem** | name, status | amount | Add, Edit, Delete |
| **LocationSlice** | country, city, timezone, address (authored) | — (display slice inside settings-general; no page) | (folded, save-gated with General) |

## Cross-entity rules
- **No pay figure anywhere** — StaffMember omits salary; ExpenseHead/LookupItem show name+status only; NotificationRule `salaries` row is a figure-free on/off toggle. (Reuses the `payFigure`/`salFigureFree` discipline.)
- **No credential/secret** — IntegrationCard/SMTP/gateway/payout entities render provider name + status only; never `type=password`, api-key, webhook, secret, token.
- **No file** — Book/LibraryItem, CertificateTemplate, CertificateRequest, import/backup: no `type=file`, no upload, no download URL, no `.pdf`/`.csv`/`.xlsx`/`blob:`.
- **No computed metric** — views/downloads/usageCount/item-count are authored literals; no computed score/rank/percentile/chart/aggregate.
- **No real engine** — RBAC matrix, settings toggles, and every write are display + gate; toggling/confirming mutates nothing (before/after snapshot enforced in smoke).
- **Authored fake data only** — no email/phone/name from the legacy captures appears in any fixture.
