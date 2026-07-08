# Contract — Teacher Portal Pay-Free (Spec 028)
**MUST**: the 16 `teacher-*` portal HTML files stay byte-identical (last touched `e4ee3cd`) and pay-free; `payHit`/`tchPay` smoke regexes stay byte-verbatim; no teacher chat/pay/live-room page; `teacher-performance.html` is the Spec-024-B-07 sanctioned admin exempt board (NOT part of the portal set, never linked from it).
**Acceptance**
- `git diff --stat HEAD -- public/teacher-{portal,schedule,students,outcomes,tasks,reports,profile,library}*.html` = 0 (byte-identical).
- Portal grep `راتب|رواتب|salary|payroll|payout|أتعاب|[$€£]|جنيه|ريال` over the 16 files = 0; `payHit`/`tchPay` byte-verbatim green.
- After any shared-asset (`enhance.js`/`app.css`) edit, re-diff the 16 files + re-run the grep.
- No `teacher-*` portal page links to `teacher-performance.html`; teacher-portal body anchors===0 held.
- **STOP** on any teacher-portal byte-diff or `teacher-*` pay token.
