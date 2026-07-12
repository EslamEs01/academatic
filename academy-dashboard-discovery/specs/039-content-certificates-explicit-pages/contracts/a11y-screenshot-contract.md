# Contract — A11y & Screenshot Coverage (Spec 039)

Additive only. Inspect current coverage first; add only missing states. critical=0, serious=0, 0 console errors.

## A11y matrix (additive rows — `tests/a11y/run.cjs`)
| Surface | AR | EN | light | dark | mobile 390 | open state |
|---|---|---|---|---|---|---|
| `library.html#view=materials` | ✓ | ✓ | ✓ | ✓ | ✓ | Materials add/edit drawer; delete-confirm |
| `library.html#view=books` | ✓ | ✓ | ✓ | ✓ | ✓ | category (`lib-cats`) + item (`lib-item`) drawer |
| `certificates.html#view=requests` | ✓ | ✓ | ✓ | ✓ | ✓ | request review drawer + create (`cert-create`) drawer |
| keyboard tab switching (library + certificates) | ✓ | ✓ | — | — | — | tablist arrow/Enter |

Skip rows already covered by the existing library/certificates a11y entries (avoid duplicate matrix rows).

## Screenshot matrix (additive frames — `tests/screenshots/capture.cjs`)
| Frame | AR | EN | dark | mobile 390 |
|---|---|---|---|---|
| Materials tab (`#view=materials`) | ✓ | ✓ | ✓ | ✓ |
| Books tab via refined link (`#view=books`) | ✓ | ✓ | ✓ | ✓ |
| Certificate Requests tab (`#view=requests`) | ✓ | ✓ | ✓ | ✓ |
| Request-review drawer open | ✓ | — | — | — |
| Materials add/edit drawer or delete-confirm (as useful) | ✓ | — | — | — |
| Admin sidebar showing the implemented Materials/Certificate-Requests anchors | ✓ | ✓ | — | — |

## Rules
Additive; do not weaken/rescope existing rows. `screenshots/REVIEW.md` updated at implementation. 0 console errors.
