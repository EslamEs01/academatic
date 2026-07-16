# Evidence Inventory — Mechanical Cluster Extraction

Corpus: 339 legacy page records total (300 admin, 26 teacher, 13 family) — matches `output/combined/page-inventory.md` role sub-totals exactly.

Every legacy page record carries `modules: []` (one or more legacy module tags). Clusters are built by mapping legacy module tags -> cluster ID. A page with multiple module tags is listed in every matching cluster (multi-membership, not double-counted in the corpus total).

## Files by type (corpus totals)

| Type | admin | teacher | family | total |
| --- | --- | --- | --- | --- |
| page records (.json) | 300 | 26 | 13 | 339 |
| page records (.md) | 300 | 26 | 13 | 339 |
| extracted text (.txt) | 300 | 26 | 13 | 339 |
| screenshots (.png, all variants) | 1019 | 67 | 27 | 1113 |
| raw HTML | 300 | 26 | 13 | 339 |
| sanitized HTML | 300 | 26 | 13 | 339 |

Reconciliation note (sitewide `find output/` vs this per-page-record table): a raw `find output -name '*.html'`
returns **679** — the 678 page-record HTML above (339 raw + 339 sanitized) **plus `output/combined/report.html`**,
a crawler summary artifact that is not a page record. Likewise sitewide JSON = **346** (339 page records +
`combined/academy-system-map.json` + 3 `role-map.json` + 3 `network/endpoints.json`) and sitewide MD = **359**
(339 page MD + 20 index/summary files). Screenshot note: the `reference-imports` mirror totals **1,162** images =
the 1,113 crawler screenshots above + the 49 `frontend-planning-deep` frames (which are planning imports, not
crawler page captures).

## Per-cluster counts (unique legacy pages; multi-membership noted)

| Cluster | Name | Legacy module tag(s) | Unique pages | Sum of raw module-tag occurrences |
| --- | --- | --- | --- | --- |
| C01 | Dashboard & Home | Dashboard / Home | 36 | 36 |
| C02 | Teachers | Teachers | 109 | 109 |
| C03 | Students | Students | 39 | 39 |
| C04 | Families / Guardians | Parents / Guardians / Families | 31 | 31 |
| C05 | Courses & Groups | Courses | 26 | 26 |
| C06 | Sessions, Schedule, Attendance | Classes / Live Sessions, Timetable / Schedule | 24 | 25 |
| C07 | Finance, Payments, Invoices | Payments / Invoices, Wallet / Finance | 67 | 72 |
| C08 | Reports & Analytics | Reports / Analytics | 17 | 17 |
| C09 | Settings | Settings | 27 | 27 |
| C10 | Content, Materials, Certificates | Content / Materials / Library, Certificates | 9 | 9 |
| C11 | Messages, Notifications, Leads | Messages / Notifications | 5 | 5 |
| C12 | Staff, Profile, Roles & Permissions | Profile / Account, Roles / Permissions | 9 | 9 |
| C13 | Exams, Assignments, Results & Evaluation | Exams / Quizzes, Assignments / Homework | 4 | 4 |
| C14 | General / Unknown / Utilities | General / Unknown | 19 | 19 |
| C15 | Auth, Public & Shared Shell | (none — current-app shell/auth surface; no dedicated legacy module tag) | 0 | n/a |

**Union of all cluster page memberships: 339 distinct legacy pages** (out of 339 total — every page maps into at least one cluster; C15 has 0 legacy pages since it is the current-app shared-shell/auth surface with no legacy module tag).

**Unassigned legacy pages (module tag did not map to any cluster): 0** — MUST be zero.
- (none — confirmed zero)

## Per-cluster interaction-surface totals (summed from each page record's own counts — these equal the page-inventory.md Btn/Forms/Tbl/Modal/Inter columns per page)

| Cluster | Pages | Buttons | Forms | Tables | Modals | Interactions |
| --- | --- | --- | --- | --- | --- | --- |
| C01 | 36 | 1181 | 283 | 49 | 248 | 98 |
| C02 | 109 | 1473 | 511 | 92 | 358 | 289 |
| C03 | 39 | 556 | 185 | 37 | 158 | 68 |
| C04 | 31 | 614 | 184 | 36 | 129 | 83 |
| C05 | 26 | 593 | 175 | 35 | 154 | 97 |
| C06 | 24 | 363 | 103 | 20 | 95 | 46 |
| C07 | 67 | 950 | 317 | 71 | 266 | 145 |
| C08 | 17 | 264 | 82 | 27 | 82 | 26 |
| C09 | 27 | 340 | 105 | 16 | 82 | 37 |
| C10 | 9 | 88 | 34 | 5 | 28 | 14 |
| C11 | 5 | 68 | 25 | 2 | 20 | 7 |
| C12 | 9 | 169 | 38 | 6 | 25 | 12 |
| C13 | 4 | 39 | 11 | 8 | 15 | 4 |
| C14 | 19 | 100 | 26 | 8 | 26 | 12 |
| C15 | 0 | 0 | 0 | 0 | 0 | 0 |
