# Contract: Sanctioned Anchor Registry (Spec 017)

**Status**: Binding · References FR-015, SC-006; research D9. The 016 IA's registry mechanism, first machine implementation.

1. Per portal page, the COMPLETE anchor inventory is pinned: shell anchors (outside `#page-body`, non-hash) unique-set == {self, hub} with multiset count 5 (self×2, hub×3); body anchors keep their per-role exact asserts (0/0/1 + teacher target).
2. Hub page keeps its existing pinned inventory (3 role cards + 1 admin link).
3. Future specs EXTEND a page's registry only by delivering the target page in the same spec; the smoke map is the registry's single machine home.

**Acceptance**: the smoke amendment implements the map; any anchor outside the registry fails the run.
