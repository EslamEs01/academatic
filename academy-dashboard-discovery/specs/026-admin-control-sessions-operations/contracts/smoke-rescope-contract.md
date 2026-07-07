# Contract — Smoke Rescope

**MUST**: extend `tests/smoke/run.cjs` additively. Keep `payHit`/`famPay`/`payFigure`/child-view/admin-finance/portal asserts **byte-verbatim**.

**Acceptance (new asserts)**
- Count 91→**97**; the 3 new pages in PAGES; load + ops-gate asserts for each.
- 3 nav flips: `sessionsAnalysis`/`publicHoliday`/`scheduledActions` implemented (real anchors, `activeId` correct); other 5 stay planned non-anchor.
- Action-completion: no «preview action» toast on Create/Edit/Delete/Save/Print; reclassified actions open modal/drawer/gate; confirm finals = backendRequired; dashboard Apply/Clear honest.
- `href="#"`=0; every `[data-action]` handled-or-gated; no dead buttons; no raw keys.
- **One sanctioned amendment**; protected asserts unchanged.
- **Fail** if a protected assert is weakened or a new page/action is unasserted.
