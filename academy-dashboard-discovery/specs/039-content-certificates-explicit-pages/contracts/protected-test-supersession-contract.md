# Contract — Protected-Test Supersession (Spec 039)

Exactly TWO existing-assertion edits are permitted. Everything else is byte-verbatim; new coverage is additive.

## Amendment 1 — dashboard planned-item toast probe
**File/lines:** `tests/smoke/run.cjs` ~223–230.
**Current (verbatim intent):**
```js
// Spec 036: ... Reveal a category that still has one (admin → materials/certificateRequests) and verify the
// planned-item toast still fires — coverage preserved.
await p.click('[data-nav-category="admin"]').catch(() => {});
await p.waitForTimeout(140);
const rPlanned = await clickFeedback('.cat-panel:not([hidden]) .nav-item.is-planned');
ok(!rPlanned, `${page}/${lang}: ${rPlanned}`);
```
**Why change:** after Spec 039 the admin category has 0 planned items → `.nav-item.is-planned` returns null →
`clickFeedback` yields a not-found string → `ok(!rPlanned)` fails for an unrelated reason.
**Permitted edit:** repoint the category from `admin` to **`settings`** (the only category still carrying planned
items — 6, owner Spec 040); update the adjacent comment to note admin is now fully implemented.
**Preserved:** the toast-fires logic, `clickFeedback` call shape, `ok(!rPlanned, …)` threshold — byte-identical
except the `data-nav-category` value and the comment.
**Forbidden:** deleting the probe; changing the assertion semantics.

## Amendment 2 — admin category assertion (message + additive companion)
**File/line:** `tests/smoke/run.cjs` ~1636.
**Current:** `ok(nav010.admItems.length === 5 && !nav010.admItems.includes('banks'), '…admin category should have 5 planned items and no banks…')`.
**Permitted edit:** the count+banks **logic stays byte-verbatim**; correct ONLY the inaccurate message text
(drop "planned"). **Add** a companion assertion `ok(nav010.admPlanned === 0, …)` (compute `admPlanned` in the same
`nav010` evaluate block, mirroring `famPlanned` at 1376/1387).
**Preserved:** `admItems.length === 5`, `!admItems.includes('banks')`, all neighboring nav010 asserts
(`finMembers`/`finLinks`/`lockedOk`/`railCats`).
**Forbidden:** changing the count, the banks clause, or any finance/families/teachers/reports neighbor.

## Additive blocks (new, weaken nothing)
The route/fresh-load asserts in `smoke-coverage-contract.md` (materials/certificateRequests/books, AR+EN) +
a11y rows + screenshot frames.

## Forbidden weakening (global)
No removal/relaxation of: a31 honesty block, navCount32===50, link-integrity, truth010.badPlanned, finance nav,
role-law/no-fake/no-mutation, or any Spec 031–038 assertion. No hardcoded pass.
