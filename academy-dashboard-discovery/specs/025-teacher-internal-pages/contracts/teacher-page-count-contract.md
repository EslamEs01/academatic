# Contract: Teacher Page Count

**Purpose**: exact count integrity — 77 → 91, no accidental removals/additions.

## Rules

- Before build: `find public -maxdepth 1 -name '*.html' | wc -l` == **77**.
- After build: == **91** (77 + 14: teacher-{schedule,students,outcomes,tasks,reports,profile,library} × 2 langs).
- Exactly 14 NEW public files; zero removals; zero unrelated additions.
- The 40 admin pages + `index.html` + all family + all student pages stay byte-identical; `teacher-portal(.en).html` changes ONLY from the nav flip + anchor repoint; shared assets rebake.

## Acceptance

- Count == 91; `git diff --name-only public/` shows only the 14 new files + teacher-portal pair + assets; a sampled admin + family page byte-identical pre/post.

**Stop**: count ≠ 91, or any non-teacher page-body changed → STOP.
