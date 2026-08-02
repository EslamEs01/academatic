# Impact Ledger

## Accepted baseline

- Commit: `722be1c37904f0fd44d666553e91239d7e8b4400`.
- HTML: 115; localized product pages/page bodies: 114; Teacher localized bodies: 22.
- Teacher source page modules: 11.
- Expected added/removed pages: 0/0.

## Final accounting schema

After the last accepted application/test correction this ledger will record:

- exact changed authored files;
- exact generated assets and localized HTML;
- exact changed/unchanged Teacher bodies;
- exact unaffected/non-Teacher bodies;
- added/removed pages;
- shared-component consumers;
- test/screenshot/a11y growth;
- unrelated page-body drift;
- reason for every count change.

The strict comparison reads historical bytes from Git and fails on missing/duplicate body, unexpected path, parser failure, or whole-file fallback. Application pages will not be edited to manufacture counts.
