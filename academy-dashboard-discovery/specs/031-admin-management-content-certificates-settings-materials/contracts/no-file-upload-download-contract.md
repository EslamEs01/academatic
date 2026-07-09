# Contract: No File Upload / Download

**Purpose**: No real file upload, download, or storage anywhere.

**MUST** (0 occurrences on any 031 built body):
- `type="file"` = 0 (Add-Material file+thumbnail, logo, avatar, import, upload-certificate → all gates).
- `<a download>` / `download=` = 0.
- real asset href `\.pdf`/`\.csv`/`\.xlsx` = 0; `blob:` / `URL.createObjectURL` = 0.
- No "Download Template" content / no import column schema (esp. no `password:123456`).
- Upload/Download/Publish/Delete/Export/Print/Backup/Import = backendRequired/disabled-with-reason gates; no file produced, no publish/delete mutation.
- `views`/`downloads` are authored count literals (display), never a functional download link.

**Verify**: smoke `noFile = !/type="file"/i`; `noPdf = !/\.pdf\b|\.csv\b|\.xlsx\b|blob:|URL\.createObjectURL|download=/i`; `noBackup` for backup/restore affordances.

**Status**: Binding. Register #6, #7, #11, #18.
