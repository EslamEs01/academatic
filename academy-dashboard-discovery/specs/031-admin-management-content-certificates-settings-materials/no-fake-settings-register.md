# No-Fake-Settings Register — Spec 031

Mirrors `030/no-fake-money-register.md`. Every action that could imply real settings persistence, auth mutation, upload/download, certificate/PDF generation, integration connection, notification delivery, or backup/restore — with the honest replacement and the smoke assertion that proves it. Grep targets = the new/changed 031 `#page-body` HTML (built) + new source modules.

## Forbidden-token grep set → honest replacement → smoke assertion

| # | Forbidden token / pattern | Would fake | Honest replacement | Smoke assertion |
|---|---|---|---|---|
| 1 | `type="password"` | credential/secret input (gateway/integration/user pw) | never rendered → backendRequired/future-backend gate | `noSecret` (reuse f30 `run.cjs:1038`) |
| 2 | `api[-_ ]?key` / `apikey` / `client[-_ ]?secret` | API-key/secret exposure | never rendered; Connect = gate | `noSecret` |
| 3 | `webhook` | webhook URL config | never rendered; future-backend | `noSecret` |
| 4 | `secret` / `token` (credential) | secret exposure | never rendered | `noSecret` |
| 5 | `paymob` / `payoneer` / `stripe` / `paypal` / `xpay` / `mollie` | payment-gateway credential UI | excluded/future-backend (030 boundary); no config surface | `noSecret` |
| 6 | `type="file"` | file upload (materials/books/backup/cert/import/logo) | no upload affordance; display-only; gate | `noFile` (reuse f30 `run.cjs:1039`) |
| 7 | `<a download>` / `\.pdf` / `\.csv` / `\.xlsx` / `blob:` / `URL.createObjectURL` / `window.open` | fake file generation/download (cert PDF, backup, materials) | export/download = gate; no real file | `noPdf` / reuse `realExport===0` |
| 8 | fake-save wording: `\(تجريبي\)` / `\(demo\)` / `بنجاح` / `\bsuccessfully\b` / `تم الحفظ` / `\bsaved\b` / `تم الحذف` / `\bdeleted\b` | fake persistence/delete | backendRequired → «يُتاح بعد ربط الخادم» / "available once the server is connected" | reuse `FAKE` guard (`run.cjs:146`) |
| 9 | permission/toggle that flips a `checked`/chip and persists | fake RBAC/settings write | display-only matrix/toggle + Save gate; **no chip change before/after** | no-mutation snapshot (reuse `run.cjs:988-1003`) |
| 10 | `Generate certificate` / `Download PDF` / `<canvas>` / `ui-draggable` / `FPDF` / `json_data` | fake PDF/designer engine | static preview + gate; no file; no canvas/drag | `noCanvas` + `noDrag` + `noPdf` |
| 11 | `Backup now` / `Send backup` / `Restore` / «تنزيل نسخة» / «استعادة» / `backup_email` | fake backup/restore engine | gate; no file/blob/email input | `noBackup` |
| 12 | fake integration connect: `Connect`→`Connected` / «ربط»→«مفعّل» | fake integration status | gate; status stays "not connected"; no live status | integration status chip is authored, gate present |
| 13 | fake notification delivery: `Send test` / «إرسال إشعار» claiming sent / «تم الإرسال» | fake dispatch | gate; no "sent" | reuse `FAKE` guard |
| 14 | `<canvas>` / `chart.js` / `apexcharts` / `amcharts` / `data-chart` | chart engine | none — display-only | `noChart` (reuse `run.cjs:861`) |
| 15 | `\b(score\|rank(ed\|ing)?\|percentile\|leaderboard)\b` | computed metric | none — authored literals | `forbidden`/`noComputed` (reuse `run.cjs:942`,`:862`) |
| 16 | money/pay figure on staff/materials/settings bodies (`ريال\|SAR\|جنيه\|EGP\|AED\|EUR\|[$€£]\|[0-9]+[.,][0-9]`) | pay leakage into 031 surfaces | figure-free; staff salary omitted; heads name/status only | `figureFree` (reuse `salFigureFree` `run.cjs:1035`) |
| 17 | fake user-invite / password-reset (email link, token) | fake auth | future-backend gate; no password field | `noSecret` + gate present |
| 18 | Import template with `password`/`123456` column, "Download Template" | credential/PII leak | never shown; Import = gate | `noSecret` + `noFile` |

## Sections (mirrors 030 structure)
- **Settings save** — #8, #9, #16 · every Save = gate, no persist, figure-free.
- **User / RBAC / permission** — #1, #9, #17 · matrix display-only, no chip mutation, no password.
- **Integrations / credentials** — #1–#5, #12 · locked placeholders, no secrets, no live status.
- **Certificates / PDF** — #7, #10 · static preview, no file, no canvas.
- **Materials / books / upload** — #6, #7 · no `type=file`, no download.
- **Backup / restore** — #6, #7, #11, #18 · excluded/gate, no file/email/template.
- **Notifications** — #13, #16 · figure-free toggles, no dispatch.
- **Locations / expense-heads** — #16 · display slice / name-status lookup, no amount.

## Global smoke strategy (copy discipline from `030/no-fake-money-register.md`)
1. Add an **additive** 031 honesty block modeled on the finance `f30` block (`run.cjs:1019-1056`) over the built 031 bodies (settings + any new management/content/certificate pages, AR+EN).
2. Assert: `noSecret`, `noFile`, `noPdf`, `noCanvas`, `noDrag`, `noBackup`, `noChart`, `forbidden`, `figureFree`, no-mutation snapshot, `FAKE`-guard clean, gates-present, `href="#"`=0, raw-keys=0, dead-buttons=0.
3. Re-pin the admin-menu coverage rows 031 flips/folds (Spec-029 `admin-menu-coverage-inventory.md` + the Spec-010 nav block).
4. Keep **byte-verbatim** every protected role-law regex: `payHit` (`run.cjs:1410`), `tchPay` (`:1330`), `famPay` (`:1299`), `payFigure` (`:1365`,`:1389`), child-view (`:1288`), finance no-mutation (`:988-1003`) + `forbidden` (`:942`,`:986`).
5. Any hit on any forbidden token = **STOP** and fix; never weaken an assertion to pass.
