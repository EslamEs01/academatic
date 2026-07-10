# No-Fake Behavior Freeze Register — Spec 032

Every behavior that must never fake, tied to its guard in `tests/smoke/run.cjs`. All GREEN today; Spec 032's forms fix must keep them GREEN (the new Save/Submit buttons are honest gates, not fake persistence).

| Behavior that must never fake | Guard (run.cjs) | Confirmation |
|---|---|---|
| **No fake save** (settings/entity) | `FAKE` `:148`→`:160` + no-mutation snapshot `:990-1005` | 0 fake-success wording; Record-payment confirm leaves chips byte-identical. **The new form Save buttons = `data-disabled-reason` gates → no persistence.** |
| **No fake create/add** (opens gate/form, never a bare unhandled action) | `fakeCreate` `:157`→`:161` | 0 unhandled create `data-action`; wizard Save → honest gate `:411-414`. **The 40 new forms end at a backendRequired final.** |
| **No fake edit** | (forms fix) | Edit forms render fields; Save = gate; no row/field persists |
| **No fake delete/deactivate** | `openConfirm` confirms + no-mutation | Delete/Deactivate confirm, flip no status |
| **No fake assign/enroll/move** | picker drawers + `data-disabled-reason` final | 14 pickers show list, final = gate; no roster mutation |
| **No fake upload/download** | Spec-031 `noFile`/`noPdf` `:1074/:1078`; DOM `input[type=file]`=0 | 0 real file input; 0 `.pdf`/`blob:`/`window.open`/`download=` |
| **No fake PDF / certificate generation** | `noCanvas` `:1075`; noPdf `:1078` | static cert designer; generate/preview/download = gates |
| **No fake payment / salary** | finance `forbidden` `:944`; figure-free `:1037`; no-mutation `:990-1005` | no money arithmetic, no computed total, no pay figure, no status flip |
| **No fake permission mutation** | Spec-031 credInputs `:1070-1071`; RBAC display-only | matrix display-only + Save gate; no persisted `checked` |
| **No fake integration connect** | Spec-031 noSecret (provider names allowed, inputs 0) | locked-placeholder cards; connect/test = gates; no live "connected" |
| **No fake notification send** | `FAKE` `:148` | no "sent"/"تم الإرسال"; send = gate |
| **No fake backend / API** | (code) `enhance.js`/`i18n.js`/`theme.js` | localStorage = UI-state only (rail/nav-category/schedule-view/lang/theme); no entity/row/status persistence |
| **No misleading success wording** | `FAKE` `:148`→`:160` | `/\(تجريبي\)\|\(demo\)\|إجراء تجريبي\|preview action\|بنجاح\|\bsuccessfully\b/i` over `[data-toast],[data-confirm-toast],[data-confirm-msg]` = 0 across 103 HTML |
| **Reports/Finance export honesty** | reports `:814/:831-834`; finance `demoInCluster===0` `:932/:973` | Print/CSV/PDF are gates (0 `data-demo-action`) |
| **Planned nav = non-anchor buttons** | `plannedNavAnchors===0`; `deadNav` `:131` | planned items are `<button data-coming-soon>`, never anchors |

## Freeze forbidden-token set (for the new form fields)
The rebuilt forms must add **0** of: `type="password"` · `type="file"` (real input) · api-key/client-secret/webhook/token · salary/pay/hour-rate/fine figure · `<canvas>`/draggable designer · `.pdf`/`blob:`/`createObjectURL`/`window.open`/`download=` · computed total (`+`/`reduce` on money) · fake-success wording. The new Save/Submit = `data-disabled-reason` finals only.

**All 15 no-fake guards GREEN. The forms fix is additive form fields + honest gates — no new fake behavior.**
