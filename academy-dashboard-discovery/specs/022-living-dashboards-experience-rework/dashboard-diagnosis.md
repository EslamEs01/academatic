# Dashboard Diagnosis — why the current experience feels dead (Spec 022)

Frame-grounded (see `visual-grounding.md`); every answer cites opened evidence.

**1. Which current sections feel like static cards?**
All of them, structurally: the KPI rows (C2/C3/C4), today-session lists, children/follow-up cards,
billing/requests status bands, quick-link tiles, gate cards, the week-glance strip (C2). Every band
is the same primitive — a white rounded card grid on flat cream — so even good content reads as a
gallery, not a system.

**2. Which sections lack product life?**
KPI tiles (numbers with no consequence), quick-tiles (plain labeled pills), the gates (dashed boxes
that read as disabled leftovers), the week strip (chips with counts only), billing's settled band
(a chip floating in an empty card).

**3. Which sections lack role identity?**
The page tops. All three homes open with a plain text heading; the role lives only in the sidebar
identity block and an accent hue. Legacy opens with a gradient hero carrying avatar + name + role
chip + headline counters (L2/L4) — that is the identity gap the user felt ("accent color alone is
not enough").

**4. Which sections lack educational context?**
Sessions (no prepare/next-step framing except one teacher line), homework cards (no progression
story), KPIs (no "so what"), gates (no "what happens when live"). The exception proving the rule:
`student-progress` (C10) already ships next-step lines, وسام badges, and improvement notes — the
educational voice exists but is trapped on one internal page.

**5. Which sections need timeline/flow?**
The today bands on all three homes (→ the `pt-rail` day timeline with now/next/done stops — the
legacy day-orientation L9/L10 modernized), and the teacher outcome workflow (→ the `pt-flow`
prepare → attend → record → review strip replacing the numbered text list).

**6. Which sections need visual storytelling?**
KPI rows → `pt-story` rows (number + narrative + real link); follow-ups → priority stories (why it
matters + what to do); billing → one settled/attention story line; child cards → "latest signal"
line with tone (C10's language).

**7. Which sections need real links instead of inert-looking tiles?**
The quick-tiles ARE real links since 019/020 — but they *look* inert (plain pills). They need
affordance (icon tone, hover lift, arrow) rather than new hrefs. The KPI tiles need real links they
currently lack. Gates must keep looking non-interactive (honesty) while looking designed.

**8. Which sections should remain compact but become more alive?**
Everything — the 018 compactness law is binding. The hero replaces (not stacks on) the current
heading+KPI spread; stories replace tiles; the rail replaces the session card list. Ceilings hold
(±10% tunable, recorded at plan).

**9. Which legacy sections must inspire the redesign?**
The identity hero band (L2/L4), the day-marked week header (L10), action-adjacent numbers (L5 KPI
cards with Show Details), the operational Today's Classes rhythm (L4/L5) — as *presentation*
inspiration only.

**10. Which legacy elements must NOT be copied?**
Salary/fines/bonus strips and all pay figures; 8-column data tables as home furniture; joyless
empty grids; broken nav rows; English-first orientation; implied server actions (Enter/End class
buttons) that would be fake here.
