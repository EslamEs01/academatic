# Contract: Navigation IA Polish (Spec 010)

**Status**: Binding · The exact accepted sidebar corrections — nothing more. References FR-006–FR-011; SC-003/SC-009; research D1–D6; data-model §4/§8.

## 1. Finance sub-section (reports category)

`nav.config.js` reports category gains `sections: [{ titleKey: 'cat.finance', items: [...] }]` — the **existing** Spec 007 sub-section mechanism (`cat.teachersPerf` precedent), no new nav mechanics. Members in order: `finance` (implemented, first) · `invoices` · `monthlyInvoices` · `salaries` · `staffSalaries` · `payments` · `classSalaryReport` · `banks` — the seven locked items keep `status:'disabled'` + `reasonKey:'nav.reason.finance'` + wallet icon + labels **unchanged**. The category's top-level items become exactly: `reports`, `monthlyReports`, `dataAnalysis`. New base-locale key `cat.finance`: AR «المالية» / EN "Finance".

## 2. Banks move

`banks` is REMOVED from the admin category and appears ONLY in the finance sub-section (move, never duplicate — sitewide locked-finance-item count stays exactly 7). Admin category keeps exactly its five planned items.

## 3. Families category relabel

`cat.families` label: AR «العائلات والطلاب» / EN "Families & Students" (research D2). Label-only change: category id, icon, item set, and order unchanged. Wording may be refined during implementation only within the same meaning.

## 4. FUTURE_ROUTES cleanup

Remove exactly the four stale entries (`attendance`, `groups`, `teacherKpi`, `finance` — all implemented). Every surviving entry maps to an existing planned item; planned items intentionally without reserved routes are listed in the coverage matrix as such. No new reserved route is added.

## 5. Sessions badge

`badge: 24` literal replaced by `badge: SESSIONS.total` (import from `fixtures/sessions.js` — authored literal, row-count-read precedent). The rendered badge MUST equal the total shown on the sessions page itself. No other item gains a badge.

## 6. Invariants (MUST all hold after the changes)

- Rail = exactly 6 categories; panel shows only its own category's links.
- Build-time nav guard passes (implemented↔route · non-implemented↔no route · disabled↔reasonKey).
- Sidewide: exactly one `a[href$="finance.html"]` in the sidebar; 7 locked finance items with lock icon + reason; 20 planned items as «قريبًا» buttons; `FUTURE_ROLE` never rendered.
- Active-state correctness on every page (finance opens reports category with `finance` active; profile pages highlight their owning list item; gallery = zero active).
- No item added, removed (beyond the banks *move*), renamed (beyond the two label keys above), or re-iconed. No seventh category. No legacy sidebar structure cloned.

**Acceptance (binding):**
1. **Given** the reports panel, **When** opened, **Then** the finance sub-section renders titled «المالية» with the 8 members in order, Finance as the only link, 7 locked with visible reasons.
2. **Given** the admin panel, **When** opened, **Then** banks is absent and 5 planned items remain.
3. **Given** `nav.config.js`, **When** greped, **Then** no hard-coded badge number and no stale FUTURE_ROUTES entry remains.
4. **Given** all 40 built pages, **When** smoke runs, **Then** the nav invariants above all pass, in both languages.
