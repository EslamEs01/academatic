# Spec 042 — Protected-Test Carryover

**Baseline**: HEAD **`de8d552`** · Spec 042 modifies **no test file**. This register exists so that Specs 043–057
inherit the guarantees intact and cannot weaken one by accident.

---

## 1. The law

> **Spec 042 supersedes NOTHING.** Zero test edits, zero assertion deletions, zero rescoping.
> Every guarantee below is **protected**: a later spec may only change it by declaring an explicit
> supersession (old code · new code · evidence · reason · neighbours · **mutation proof**).

Corollary — inherited from Spec 041's hardest lesson:

> **A test that cannot fail is not a test, and a task that was never run is not done.**
> Spec 041 shipped a task (`T061`) marked complete with a fabricated result ("Done: 50/50 match") for a test
> block that had **never been written**. It was caught only by executing mutation **M-2**, which passed the whole
> suite with **exit 0**. Any spec 043–057 that claims a guarantee MUST pair it with a mutation that makes the
> guarding assertion fail.

## 2. The machine gates now in force (all must stay)

| Gate | Site | Since | What it enforces |
|---|---|---|---|
| **Build** | `scripts/build-html.mjs` | — | exactly **115** HTML from **57** bases |
| **Smoke** | `tests/smoke/run.cjs` | — | 114 page loads · no raw keys · no external requests · no dead buttons · no unexplained disabled controls |
| **A11y — R-2** | `tests/a11y/run.cjs:393` | **041** | `critical > 0 \|\| serious > 0` ⇒ **exit 1**. Before 041 `serious` was warned and then **ignored** — the project had reported "serious=0" as a pass condition for ten specs while it was **unenforced**. |
| **Screenshots — R-3** | `tests/screenshots/capture.cjs:556` | **041** | any captured **console error** ⇒ **exit 1**. Before 041 this runner **always exited 0**; "0 console errors" was a log line, not a gate. |

**Neither R-2 nor R-3 may be relaxed, thresholded, allow-listed or suppressed.** Both were demonstrated green on
the untouched baseline *before* being made gates, so each tightens an already-true invariant.

## 3. The route/sidebar freeze (Spec 041) — protected in full

| Guard | Site | Falsified by |
|---|---|---|
| **`ROUTES_50` exact-route register** (T-03) | `tests/smoke/run.cjs` | **M-2** — a plain route repointed at a *real but wrong* page. **This guard closed gap G-1**: before it, the 25 plain routes were pinned **nowhere**, and `staff → library.html` passed the entire suite with 0 failures. |
| Derived group-aware route matrix (49 routes) | `smoke` | M-1 (nonexistent destination), M-3 (bad `#view=` fragment) |
| Repeated-destination census (exactly **one** sanctioned repeat: `salaries` + `staffSalaries` → `finance.html#view=salaries`) | `smoke` | M-13 |
| **All 24 deep-links SEEDED** (AR+EN = 48 executions; the URL hash must beat a conflicting stored tab) | `smoke` | a regression of `initTabs` to `stored \|\| hash` |
| **Orphan-set guard** — exactly `{gallery.html, gallery.en.html}` | `smoke` | M-11 (a new orphan) **and** M-12 (gallery *gains* an inbound link — losing the exception fails too) |
| Menu freeze **50** (4 independent sites) | `smoke` | M-10 |
| Page freeze **115** | `smoke` | M-9 |
| Sitewide **planned = 0** / coming-soon = 0 | `smoke` | M-5 |
| Honest lock: `classSalaryReport` is a non-anchor, `aria-disabled`, reason-keyed, lock-iconed, **route-less** button | `smoke` | M-4 |
| Sidebar AR/EN hash-aware `langRoute()` | `smoke` | M-6 |
| **Topbar** language switch preserves the fragment (D-3) | `smoke` | M-7 |
| Role isolation — portal nav may not carry an admin destination | `smoke` | M-8 |
| D-1 direct-surface: `teachers.html#view=add` renders **13** `field()` controls, **1** gated Save, **0** drawer buttons, **0** file/password inputs | `smoke` | M-14 (restoring the drawer ⇒ **13 duplicate ids**) |

**16/16 mutations executed RED, all restored, residue 0** (Spec 041 completion pass).

## 4. Standing product laws (protected by existing asserts — never weaken)

- **Teacher pay-free, GLOBAL** — `PAY28` (word-boundaried; a naive `/SAR/i` matches the persona **"Sara"** — do
  not "improve" this regex). `teacher-performance.html` is the single sanctioned admin exempt board.
- **Family zero-pay** portal · **student child-view** (legacy has **no student login**).
- **Finance no-fake-money**: authored per-row literals only; **0** computed total/balance/revenue/VAT/salary.
- **No-secret**: 0 `type=password`, 0 `type=file`, 0 authored credential anywhere.
- **No-fake**: no fake save/success/connected/mutation/upload/PDF/delivery.
- **No computed** score/rank/GPA/percentile/leaderboard; no `<canvas>`/chart.
- **Zero `href="#"`** sitewide.

## 5. Carry-forward defect — NOT fixed here, NOT hidden

**30 pre-existing duplicate ids**: `f-fbAdd-category` · `f-fbAdd-remark` · `f-fbAdd-note`, three on each of **10**
pages (`attendance`, `course`, `group`, `sessions`, `teacher` × 2 languages), from the **Spec-032 nested `fb-add`
drawer**. Provenance confirmed at baseline `21502af` — **not introduced by Spec 041 or 042**.
Counting basis: the **30 = 3 duplicated id NAMES × 10 page files**; per-file *occurrence* counts vary
(attendance **5** · sessions **3** · course/group/teacher **2** each — see
`modal-drawer-interaction-ledger.md` Part A.2). The two documents count the same defect on two bases; they do
not contradict.

`teachers.html` / `.en` have **0** duplicate ids (the D-1 MOVE removed the colliding drawer — see M-14).

> The honest claim is **"0 duplicate ids introduced, 0 on the D-1 surface"** — **not** "0 duplicate ids sitewide",
> which would be false. **No gate currently catches these 30.**

**Owner: Spec 044** (Modal, Drawer & Long-Form Interaction System). Repairing them means uniquifying the nested
drawer's field names — a body change to 10 pages, far outside an audit's impact boundary.

## 6. What Specs 043–057 inherit

1. Every gate in §2 and §3 stays green, unmodified, and **mutation-backed**.
2. Every product law in §4 is binding.
3. Any new guarantee must ship **with its falsifying mutation** — no exceptions.
4. The §5 defect is owned, scheduled, and must not be silently "discovered" again.
