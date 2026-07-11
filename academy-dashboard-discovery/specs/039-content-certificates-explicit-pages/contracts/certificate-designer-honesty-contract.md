# Contract — Certificate Designer Honesty (Spec 039)

The certificate Templates tab + designer preview are **reused unchanged**. Spec 039 does not touch them; this
contract pins the honesty invariants that MUST remain true (they hold by 0-diff).

## Invariants (existing — `pages/certificates.js` templatesPanel/designerPreview)
- Designer is a **static preview**: `cert-stage` `<div role="img" aria-label=…>` with absolutely-positioned
  `<span class="cert-field">` merge-field labels (`CERT_DESIGNER.fields` static x,y %).
- **NO `<canvas>`**, no drag, no jQuery-UI positioning, no plotting/chart engine.
- **NO background upload** (`type=file`), NO `.pdf`/`blob:` asset, NO `window.open` preview.
- Create/Edit template (`cert-tpl`) = `backendRequired` gate; Generate/Preview/Download/Upload = gates.

## Never describe the preview as
generated · saved · issued · downloaded · delivered. It is a labelled display-only preview.

## Future-backend (not Spec 039)
Real visual template editing, PDF generation, persistence, background upload, and delivery remain future-backend.

## Acceptance
Existing smoke `a31` block stays byte-verbatim: certificates tabIds `['templates','requests']`, `certStage===1`,
gates ≥4, `fileInputs===0`, `passwordInputs===0`, `canvas===0`, `noDrag` true. Sitewide `g32`: file/canvas/pdfish
all 0 on certificates pages.
