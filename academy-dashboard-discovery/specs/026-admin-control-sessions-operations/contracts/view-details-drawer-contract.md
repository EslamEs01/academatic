# Contract — View / Details Drawer

**MUST**: View/Details open a real detail page or a read-only `data-drawer`/`openSheet()` sheet with static data. Display-only; any write verb inside follows the create/edit or confirm contract (backendRequired).

**Acceptance**
- View/Details actions open a real drawer/page (already honest for most) — never a toast, never `href="#"`.
- Drawer content is display-only; internal Edit/Notify/Cancel follow Tier-2/Tier-3.
- Existing entity-preview drawers (appointment/outcome/finance/family/student) stay real; only their internal write verbs are reclassified.
- **Fail** if a details drawer performs or fakes a write.
