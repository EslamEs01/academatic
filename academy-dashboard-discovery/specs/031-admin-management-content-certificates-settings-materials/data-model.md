# Data Model — Spec 031 (display-only fixtures)

All entities are **authored fake fixture data** — no persistence, no auth, no files, no pay figures, no legacy PII, no computed metrics. Fixtures live in `src/js/fixtures/`; keys mirror `src/locales/ar.adm.js`/`en.adm.js`.

## fixtures/staff-management.js
```
STAFF = [ { id, nameKey, username, phone, emailKey, roleId, statusId } × ~5 ]   // NO password, NO salary
STAFF_ROLES   = { manager, accountant, supervisor, support }                     // enum labels (display)
STAFF_STATUS  = { active:{tone:'completed',icon}, onhold:{tone:'amber',icon}, inactive:{tone:'neutral',icon} }
PERM_GROUPS   = [ { labelKey, items:[ {labelKey, granted:true|false} ] } × ~10-17 ]  // display-only matrix
STAFF_CATEGORIES = [ { labelKey, scopeKey } ]                                     // read-only drawer
STAFF_ACTIVITY   = [ { id, entityKey, actionId, dateKey } ]                       // read-only audit
```
Validation: `roleId ∈ STAFF_ROLES`; `statusId ∈ STAFF_STATUS`; no `salary`/`password`/`amount` field may exist. Row-menu kind = `'staff'` (new `staffMenu` branch).

## fixtures/content-library.js
```
SUBJECTS = [ { id, nameKey, nameArKey } × ~6 ]                                    // materials tab
BOOKS    = [ { id, nameKey, typeId, categoryKey, publishedKey, views, downloads, statusId } × ~6 ]
BOOK_TYPES   = { file, video, image, audio, link }                               // type chips (styled tones)
BOOK_STATUS  = { published:{tone:'completed'}, draft:{tone:'amber'}, archived:{tone:'neutral'} }
BOOK_CATEGORIES = [ { id, nameKey, count } ]                                      // count = literal
```
Validation: `views`/`downloads`/`count` are authored integers (literals, NOT computed/summed); no `file`/`thumbnail`/URL field; `statusId ∈ BOOK_STATUS`; type chips must map to styled chip tones.

## fixtures/certificates.js
```
CERT_TEMPLATES = [ { id, nameKey, usageCount, thumbId } × ~4 ]                    // thumbId = authored image ref, NOT upload
CERT_DESIGNER  = { bgId, fields:[ {key:'student'|'teacher'|'desc'|'date', x, y } ] } // static CSS positions, no drag
CERT_REQUESTS  = [ { id, studentKey, courseKey, teacherKey, descKey, dateKey, statusId } × ~5 ]
CERT_STATUS    = { pending:{tone:'amber'}, approved:{tone:'completed'}, rejected:{tone:'cancelled'} }
CERT_ISSUED    = [ { id, labelKey, statusId } ]                                   // details drawer, Options non-actionable
```
Validation: designer positions are static baked values (no `json_data`, no live drag); no `.pdf`/file/`<canvas>`; `usageCount` literal; `statusId ∈ CERT_STATUS`.

## fixtures/settings-management.js
```
IDENTITY_ROWS = [ { labelKey, valueKey } ]                                        // name/domain/email/phone/whatsapp/address
LOCATIONS     = [ { labelKey, valueKey } ]                                        // country/city/timezone/address slice
EXPENSE_HEADS = [ { id, nameKey, statusId } × ~5 ]                                // NO amount
NOTIF_MATRIX  = [ { eventKey, rows:[ {roleKey, channelKey, on:true|false} ] } ]   // figure-free
POLICIES      = [ { id:'family'|'teacher', titleKey, bodyKey } ]                  // display-only text
BRAND_ROWS    = [ { labelKey, swatch } ]                                          // brand/status colors (display)
INTEGRATIONS  = [ { id, nameKey, kindId, statusId } × ~11 ]                        // locked placeholder: name+status ONLY
INTEG_KIND    = { payment, payout, whatsapp, email }
INTEG_STATUS  = { notConnected:{tone:'neutral'}, available:{tone:'amber'} }        // NEVER "connected" live
```
Validation: no credential/secret/`key`/`webhook`/`api`/`password` field on any integration record; `EXPENSE_HEADS` has no amount; `NOTIF_MATRIX` has no figure; `LOCATIONS`/`IDENTITY_ROWS` carry authored fake values (no legacy PII).

## Entity → surface → write-gate map
| Entity | Surface | Writes (all backendRequired gates) |
|---|---|---|
| STAFF / PERM_GROUPS / STAFF_CATEGORIES / STAFF_ACTIVITY | staff.html | Add/Edit(no pw/salary), Duplicate, Save-permissions, Assign-categories, Deactivate/Activate/Delete, Reset/Invite |
| SUBJECTS | library.html · Materials tab | Add/Edit(name), Delete |
| BOOKS / BOOK_CATEGORIES | library.html · Books tab | Add-Material/Upload/Download/Publish/Delete, Add/Edit-category |
| CERT_TEMPLATES / CERT_DESIGNER | certificates.html · Templates tab | Create/Edit/Save-template, Delete |
| CERT_REQUESTS / CERT_ISSUED | certificates.html · Requests tab | Approve/Reject/Generate/Preview/Download/Send, Create/Upload-cert |
| IDENTITY/LOCATIONS/EXPENSE_HEADS/NOTIF/POLICIES/BRAND/INTEGRATIONS | settings.html hub tabs | Save, logo, 2FA, policy-edit, Connect/Test/Configure, backup/import |

## Invariants (enforced by smoke)
- No field named/containing `password`, `salary`, `pay`, `amount`, `api`, `key`, `secret`, `token`, `webhook`, `file` on any 031 record.
- All numeric fields (`views`/`downloads`/`usageCount`/`count`) are authored literals — never computed/summed.
- All values are authored fake data — no email/phone/name copied from legacy captures.
- Chip tones ∈ `{live,upcoming,completed,cancelled,amber,neutral}`.
