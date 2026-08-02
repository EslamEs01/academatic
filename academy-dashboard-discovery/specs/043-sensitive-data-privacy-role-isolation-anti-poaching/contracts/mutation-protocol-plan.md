# Contract 7 — Mutation Protocol (MUT-1…MUT-11 + MUT-TP; 12 total) — executable

Every new guarantee ships a falsifying mutation. The T061/G-1 law: a test that cannot fail is not a test; a task
never run is not done. Each mutation is executed one-per-**fresh isolated copy/worktree**, never on the primary
tree, restored to byte-identical GREEN with **zero residue**. No mutation is marked complete from inspection
alone; each records command, exit code, and the exact failing assertion.

## Per-mutation procedure

For each MUT-N: (1) copy the proven-green tree to a disposable worktree/copy; (2) apply exactly ONE mutation;
(3) `npm run build`; (4) run the relevant runner (`npm run test:smoke` / `test:a11y` / `screenshots`);
(5) confirm RED on the intended assertion (record the exact failing message + exit code); (6) discard the copy
(the primary tree is never mutated); (7) confirm the primary tree is still GREEN (residue 0).

## The twelve mutations (one per new guarantee — MUT-1…MUT-11 + MUT-TP)

| id | guarantee | one mutation (isolated copy) | expected RED (assertion) |
|---|---|---|---|
| MUT-1 | G1/G2 | add a guardian phone value to a teacher fixture/body | teacher-contact census RED |
| MUT-2 | G3 | make a parent-contact grant reachable by a teacher surface | teacher-unreachable assert RED |
| MUT-3 | G5 | re-add `passwordChange` to `STUDENT_PAGES.profile.gates` | `student-profile plannedBackend === 2` RED (got 3) |
| MUT-4 | G8/G7 | insert a live `chat.whatsapp.com/...` invite URL into a fixture/page | sitewide real-PII census RED |
| MUT-5 | G10 | add a `type=password` input / credential value slot | g32 `pw===0` RED |
| MUT-6 | G11 | flip one parent-contact row to `granted:true` | deny-by-default assert RED |
| MUT-7 | G12 | restore a certificate group-delivery option | cert-delivery census RED |
| MUT-8 | G4 | add another family's data (`أم جوري`) to a family portal page | family-isolation census RED |
| MUT-9 | G6 | add an admin route (`dashboard.html`) link to a portal page | no-admin-link census RED |
| MUT-10 | G14 | change honest backend wording into a fake authorization claim (`authorized`/`مسجّل الدخول`) | wording census RED |
| **MUT-11** | **G13** | add an href carrying a minor-identifying query param (`?student_name=…`) to a built page | query-string census RED |
| MUT-TP | teacher-policy | add a Salary row / pay token / value input to the teacher policy preview | teacher-policy census RED (+ PAY28 double-cover) |

**Count: 12 mutations (MUT-1…MUT-11 + MUT-TP).** Every new guarantee G1–G14 (except G9/G10 which are the
existing external-request/g32 gates, already mutation-backed) plus the teacher-policy census has a registered
falsifying mutation here — G13 is MUT-11 (registered, not left inline), closing the "a task never run is not
done" gap.

## Rules

- Isolated copies via `git worktree` or a filesystem copy — **never** `stash`/`reset`/`checkout`/mutation on the
  primary working tree.
- One mutation per copy; combined mutations are invalid (they mask which assertion caught what).
- A guarantee whose mutation passes the whole suite is **invalid** (the Spec-041 M-2 lesson) — the guard must be
  strengthened until the mutation goes RED.
- Record for each: the diff, the runner command, the exit code, and the exact RED assertion message.
- These mutations are executed during Spec 043's **own implement phase** (not planning; planning writes no app
  bytes). The plan pins them; the implement phase runs them RED→GREEN.
