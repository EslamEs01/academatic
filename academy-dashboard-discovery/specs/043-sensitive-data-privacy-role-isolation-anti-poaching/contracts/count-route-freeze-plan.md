# Contract 12 — Count / Route / Scope Freeze — executable

Re-measured at HEAD `cd56aa0` this plan phase (not copied). All must hold across the implement phase.

| Invariant | Value | How 043 holds it |
|---|---|---|
| Public HTML | **115** | 0 new page bases; folds into existing hosts |
| PAGES | **57** | `build-html.mjs` 0-diff |
| Admin menu | **50** | `nav.config.js` 0-diff |
| Route split | **24 deep / 25 plain / 1 disabled** | 0 new route; the previews are in-page drawers |
| Status split | **49 impl / 0 planned / 1 disabled** | 0 nav status change |
| `FUTURE_ROUTES` | **{}** | 0 new route |
| Sole honest lock | **`classSalaryReport`** | untouched (`nav.config.js` 0-diff) |
| Gallery orphan pair | **`{gallery.html, gallery.en.html}`** | untouched |
| New nav items / routes / dependencies | **0** | none added |

## The drawers are not routes/pages

The parent-contact rows fold into the existing `st-perm` drawer (already dispatched); the teacher policy folds
into a new `trn-policy` in-page drawer opened via the existing generic `data-drawer` dispatch. **A `data-drawer`
in-page preview is neither a nav item nor a route nor a page** — it adds 0 to the 115/57/50/24-25-1 counts and
leaves `FUTURE_ROUTES {}`.

## No "Privacy Center"

043 creates no standalone privacy page. Every control folds into an existing surface (staff / teacher /
student-profile).

## STOP-and-report

If evidence ever forced a standalone page/new route (would change any count above), STOP and report the
page/count/route impact BEFORE authoring it. **None was needed** — all 3 outcomes fold into existing hosts.
The implement phase re-verifies these counts; the guards freeze them.
