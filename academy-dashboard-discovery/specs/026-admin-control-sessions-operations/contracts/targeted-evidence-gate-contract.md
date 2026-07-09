# Contract — Targeted Evidence Gate

**MUST**: every Layer-A page/modal and every Layer-B reclassification traces to exact legacy/current evidence (paths in `legacy-admin-ops-coverage.md` / `current-action-inventory.md`). No admin operation is invented; no generic admin SaaS.

**Acceptance**
- Each new page (`sessions-analysis`, `public-holiday`, `scheduled-actions`) cites its `output/roles/admin/pages/management-*.md` source.
- Each reclassified action cites its source file:line from the inventory.
- Any capability with thin/absent legacy evidence is an honest gate, not invented fields (e.g., schedule-request accept/reject, chat send).
- **Fail** if a page/field/action has no cited grounding.
