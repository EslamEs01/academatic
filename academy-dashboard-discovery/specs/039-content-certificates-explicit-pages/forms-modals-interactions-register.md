# Forms / Modals / Interactions Register — Spec 039

All interactions already exist (Spec 031); Spec 039 only makes them reachable via the sidebar. Every final write
is an honest gate. `data-*` hooks are the CLOSED set (`data-tabs`/`data-tab`, `data-drawer`→`template
[data-preview]`, `data-confirm`, `data-disabled-reason`) — **no new hook, no new storage key.**

## Materials tab (`library.html#view=materials`)
| Interaction | Mechanism | Final action | No-fake |
|---|---|---|---|
| View subject list | static table (`SUBJECTS`) | — | display-only |
| Add subject | `mat-add` formDrawer (name + name_ar) | `backendRequired` gate | no persistence |
| Edit subject | `mat-edit` formDrawer (prefilled) | `backendRequired` gate | no persistence |
| Delete subject | `data-confirm` (danger) | confirm → backendRequired | no mutation |

## Books tab (`library.html#view=books`)
| Interaction | Mechanism | Final action | No-fake |
|---|---|---|---|
| Filter/search content | `filterBar` (search + type + category) over `#books-rows` | — | client-side over authored rows |
| Add content item | `lib-item` drawer (name/type/category; upload+thumbnail affordances) | `backendRequired` gate | **no `type=file`** |
| Manage categories | `lib-cats` drawer (list + create form) | `backendRequired` gate | no persistence |
| Download / Publish / Delete (row) | ghost gates / `data-confirm` | gate / confirm | no download link, no mutation |

## Templates tab (`certificates.html`, default)
| Interaction | Mechanism | Final action | No-fake |
|---|---|---|---|
| View templates | `CERT_TEMPLATES` cards | — | display-only |
| Designer preview | static `cert-stage` `role="img"` + positioned `<span>`s | — | **no `<canvas>`, no drag** |
| Create/Edit template | `cert-tpl` formDrawer (name + static preview) | `backendRequired` gate | no upload, no PDF |
| Upload background | toolbar gate | `data-disabled-reason` | **no `type=file`** |

## Requests tab (`certificates.html#view=requests`)
| Interaction | Mechanism | Final action | No-fake |
|---|---|---|---|
| View request queue | `CERT_REQUESTS` table + status chips | — | display-only (authored) |
| Review a request | `requestDrawer` read-only sheet | — | display-only |
| Create request | `cert-create` drawer (student/course/template/date/message) | `backendRequired` gate | no persistence |
| Approve / Reject | row `gate()` | `data-disabled-reason` | **no status mutation** |
| Generate / Preview / Download / Send | drawer `gate()` | `data-disabled-reason` | **no PDF/`window.open`/WhatsApp** |

## Nav interaction (the only new behavior)
| Interaction | Mechanism | Result |
|---|---|---|
| Click sidebar «Materials» | anchor `library.html#view=materials` | loads library.html, Materials tab active (fresh load) |
| Click sidebar «Certificate Requests» | anchor `certificates.html#view=requests` | loads certificates.html, Requests tab active |

No form field persists; no drawer mutates state; no toast claims success.
