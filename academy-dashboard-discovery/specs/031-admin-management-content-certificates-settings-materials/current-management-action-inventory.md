# Current Management / Content / Settings Action Inventory — Spec 031

Every current or planned action on the 031 surfaces, classified into an honest class. **Every row resolved; none dead/fake.** Two truths shape this inventory: (1) the six `settings*` sub-items and all five `admin`-category items (`staff`/`materials`/`books`/`certificates`/`certificateRequests`) are currently **`planned` nav buttons only** (no page yet) — they render as honest `data-coming-soon` «قريبًا» buttons; (2) `settings.html` is a **built, already-honest** page whose existing actions are the baseline 031 deepens.

Class legend: **LINK**=real page link · **TAB**=real static tab · **FILTER**=real static filter · **MOD**=backendRequired modal · **RD**=read-only drawer · **GATE**=disabled-with-reason/backendRequired · **PLANNED**=planned-future nav gate · **DO**=display-only (not an action) · **FOLD**=folded into existing page · **EXCL**=intentionally-excluded.

## Part 1 — Currently rendered actions (built today)

### `settings.html` (implemented — the fold hub baseline)
| Action | Element | Hook | Current behavior | Expected (031) | Class | Fix? |
|---|---|---|---|---|---|---|
| Theme (light/dark/system) | control | `data-theme` | **real** client-side pref | preserved real | (real, keep) | No |
| Language (ar/en) | control | lang toggle | **real** | preserved real | (real, keep) | No |
| Save changes (profile) | button | `data-demo-action data-toast` | honest "available after backend" toast | keep/normalize → GATE/MOD | GATE | Align |
| Session-alert / weekly-summary toggles | toggle | `data-toggle data-toast` | authored on/off, no persist | keep, expand to matrix | DO toggle | Deepen |
| Billing-alerts toggle | toggle | `data-disabled-reason` | disabled + reason | keep | GATE | No |
| 2FA "Edit" | button | `data-disabled-reason` | disabled + "backend" reason | keep, extend as security tab | GATE | Deepen |
| Reset demo data | button | `data-confirm` | confirm, no real reset | keep | GATE | No |
| Roles/permissions preview | section | — | display-only "no enforcement" | expand to RBAC matrix DO | DO | Deepen |

### Planned nav items (render as honest `data-coming-soon` buttons today)
| Nav item | Element | Hook | Current behavior | Expected (031) | Class | Fix? |
|---|---|---|---|---|---|---|
| `staff` | nav button | `data-coming-soon` | «قريبًا» toast | build staff surface OR keep planned until page ships | PLANNED→built | Yes |
| `materials` | nav button | `data-coming-soon` | «قريبًا» | build materials surface | PLANNED→built | Yes |
| `books` | nav button | `data-coming-soon` | «قريبًا» | build books/library surface | PLANNED→built | Yes |
| `certificates` | nav button | `data-coming-soon` | «قريبًا» | build certificates surface | PLANNED→built | Yes |
| `certificateRequests` | nav button | `data-coming-soon` | «قريبًا» | build/fold requests queue | PLANNED→built | Yes |
| `settingsGeneral/Integrations/Customization/Notifications/Security/Users` | nav buttons | `data-coming-soon` | «قريبًا» | fold into settings hub tabs | PLANNED→FOLD | Yes |

## Part 2 — Legacy actions 031 must render honestly (build targets, per surface)

### Staff / users
| Action | Expected behavior | Class |
|---|---|---|
| View staff row / open detail | read-only drawer | RD |
| Add member / Edit staff | modal, **no password/salary field** | MOD |
| Duplicate-with-permissions | modal (or Add "duplicate from") | MOD |
| Edit-permissions (RBAC matrix) | display-only grouped matrix + Save gate | DO+GATE |
| Category-scope | read-only drawer + assign gate | RD+GATE |
| Show-activity (audit log) | display-only list | DO |
| Delete / Deactivate / Activate | confirm, no mutation | GATE |
| Reset-password / Invite | future-backend gate (no password) | GATE/FB |

### Materials / books
| Action | Expected behavior | Class |
|---|---|---|
| Materials list / Add-Edit subject | display rows / name-only modal | DO / MOD |
| Books list | display rows (count literals) | DO |
| Add-Material / Upload (file+thumbnail) | gate, **no `type=file`** | GATE |
| Category manage (add/edit) | read-only list + name-only modal | RD/MOD |
| Download / Publish / Delete | gate, no file/publish | GATE |

### Certificates
| Action | Expected behavior | Class |
|---|---|---|
| Templates list | display rows | DO |
| Designer / Save-template | **static preview**, Save modal (no drag/canvas/upload) | DO/MOD |
| Requests queue | display rows | DO |
| Approve / Reject | gate, no PDF/send/mutation | GATE |
| Generate-PDF / Preview / Download / Send | gate, no file, no window.open | GATE |
| Create-certificate / Upload-certificate | modal / gate (no `type=file`) | MOD/GATE |
| Certificate-details | read-only drawer (non-actionable Options) | RD |

### Settings (folded tabs)
| Action | Expected behavior | Class |
|---|---|---|
| Identity / Save changes | display rows + save gate; logo gate | DO/GATE |
| Locations slice | display (country/city/timezone/address) | DO |
| Theme/branding | theme/lang real; brand/status colors save gate | real/GATE |
| Notifications matrix | figure-free toggles + save gate | DO/GATE |
| 2FA / Security | gate | GATE |
| Policy documents | display-only text + edit gate | DO/GATE |
| Message Builder | excluded / generic future-backend gate | EXCL/GATE |

### Integrations
| Action | Expected behavior | Class |
|---|---|---|
| Provider cards | locked-placeholder (name + status) | DO |
| Connect / Disconnect / Test / Configure / Save-credentials | future-backend gate, **no credentials** | GATE/FB |
| WhatsApp connect / test-send | future-backend gate (no phone/wizard) | GATE/FB |
| Backup / Import | excluded / future-backend gate (no `type=file`) | EXCL/GATE |

### Content / lookups
| Action | Expected behavior | Class |
|---|---|---|
| Expense heads list / Add-Edit | display + name/status modal (**no amount**) | DO/MOD |

## Forbidden classifications — none present, none allowed
No row is or may become: `dead-button`, `href="#"`, `empty-link`, `fake-submit/save/delete/upload/download/pdf`, `fake-certificate-generation/approval`, `fake-user-invite/role-update/permission-save/password-reset`, `fake-integration-connect`, `fake-api-key/webhook-save`, `fake-backup/restore`, or `visual-button-with-no-outcome`. Every write ends at a `backendRequired`/`disabled-with-reason` gate or a `data-confirm` that mutates nothing.
