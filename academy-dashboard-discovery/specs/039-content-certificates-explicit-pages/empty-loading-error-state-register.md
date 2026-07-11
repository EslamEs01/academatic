# Empty / Loading / Error State Register — Spec 039

Static HTML-first + fixtures-only: there is no live loading/error state (no network). "Loading" and "server
error" are represented only as honest `backendRequired` gates on write actions. States below already exist in the
built surfaces; Spec 039 makes them reachable.

| Surface | Populated | Filtered-empty | Empty | Validation | Backend-required / "loading" | Error |
|---|---|---|---|---|---|---|
| Materials tab | `SUBJECTS` (6) rows | n/a (no filterBar on this tab) | authored empty pattern if list empty | inline form validation in mat-add/mat-edit (local, no submit) | Save/Delete = gate/confirm | no live error; gate copy is the honest "needs backend" |
| Books tab | `BOOKS` (6) rows | `filterBar` narrows → single global `[data-no-results]` empty message | `[data-no-results]` state | inline validation in lib-item/lib-cats | Add/Upload/Download/Publish/Delete = gates | none |
| Templates tab | `CERT_TEMPLATES` (4) cards | n/a | authored empty if none | cert-tpl form (local) | Create/Edit/Upload = gates | none |
| Requests tab | `CERT_REQUESTS` (5) rows | filter narrows → `[data-no-results]` | `[data-no-results]` state (legacy "No data found" analogue) | cert-create form (local) | Approve/Reject/Generate/Preview/Download/Send/Create = gates | none |

## Notes
- Legacy empty-states observed: library "No Material Added", certificate-requests/templates "No data found". The
  rebuild **populates** these queues (an improvement) while preserving an honest empty pattern via the single
  global `[data-no-results]` mechanism (enhance.js). Spec 039 must not add a **second** filterBar to any board
  (only one global `[data-no-results]` exists) — none is needed (no new surface).
- No fake spinner, no fake "saving…", no fake success/failure. The only honest "not yet" signal is the
  `data-disabled-reason` gate copy («يُتاح بعد ربط الخادم» / "available once the server is connected").
- Deep-link fresh-load: if a bad `#view=` were supplied, enhance.js falls back to the baked default (first) tab —
  no error surface. The two Spec-039 hashes (`materials`, `requests`) match existing tab ids exactly.
