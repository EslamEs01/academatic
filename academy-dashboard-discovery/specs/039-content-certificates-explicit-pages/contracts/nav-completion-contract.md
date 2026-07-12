# Contract — Nav Completion (Spec 039)

## Exact nav.config.js changes (the ONLY application-source edit)
| Line | id | Before | After |
|---|---|---|---|
| 100 | `materials` | `status:'planned'` | `route:'library.html#view=materials'` |
| 101 | `books` | `route:'library.html'` | `route:'library.html#view=books'` |
| 103 | `certificateRequests` | `status:'planned'` | `route:'certificates.html#view=requests'` |
| 144 | `FUTURE_ROUTES.materials` | `'library.html'` | **removed** |

`item()` defaults `status:'implemented'` when a `route` is given → the two flips become implemented anchors.

## MUST NOT change
`staff`, `certificates`, every finance item, `classSalaryReport` (honest lock), every settings item, `FUTURE_ROLE`,
any role-portal nav, any other admin nav item.

## Post-change invariants
- Admin category: **5 items** (staff · materials · books · certificates · certificateRequests), **5 implemented**,
  **0 planned**, **no banks**.
- Admin menu sitewide: **50**.
- Settings = the only category with planned items: **6** (owner Spec 040).
- Nav build-time guard passes: implemented⇒route present; non-implemented⇒no route; disabled⇒reasonKey.

## Final routes (AR / EN via hash-aware langRoute)
- materials → `library.html#view=materials` / `library.en.html#view=materials`
- books → `library.html#view=books` / `library.en.html#view=books`
- certificates → `certificates.html` / `certificates.en.html`
- certificateRequests → `certificates.html#view=requests` / `certificates.en.html#view=requests`

## Acceptance
Each flipped item renders as a real `<a>` (`data-nav-status="implemented"`), no «قريبًا», no `aria-disabled`, no
lock icon; href resolves to the exact route above; fresh-load opens the correct tab (AR+EN).
