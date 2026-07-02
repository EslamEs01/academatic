# Contract: Source Links & the One New Shortcut (Spec 010)

**Status**: Binding · Cross-page connectivity: verify everything, add exactly one link. References FR-015/FR-017; US6; SC-005; research D10; data-model §7.

## 1. The ONE new link (complete specification)

- **Where**: `src/js/pages/family.js` → `billingPanel()` actions row, next to the existing disabled Manage-billing button.
- **What**: a real `<a>` to `finance.html` (`finance.en.html` in the EN build — the page module's existing EN-aware href idiom), styled with the existing button/link idiom (secondary/ghost), wallet icon allowed (already present in that panel).
- **Label**: new key pair `fam.bill.viewInvoices` in `ar.fam.js`/`en.fam.js` — honest wording that names the destination as the fixture preview, e.g. AR «عرض فواتير العائلة في صفحة المالية (معاينة تجريبية)» / EN "View family invoices on the Finance page (fixture preview)". Exact wording refinable; honesty phrase mandatory.
- **Guard amendment**: Spec 009 `contracts/scope-guard.md` G8a exclusion list + G8b#5 amended additively with attribution (scope-guard contract §3). This is the ONLY guarded-file edit in Spec 010.

## 2. What does NOT get links

No dashboard-body finance link. No reports-body finance link. No student/teacher/course/group page finance links. No link to any locked/planned destination anywhere. No second family link.

## 3. Verify-everything sweep

Smoke gains a link-integrity crawl over all 40 built pages: every `a[href]` either targets an existing file in `public/` (relative), an in-page anchor/hash view, or is the sanctioned same-page hash pattern — zero `href="#"`, zero dead targets, zero absolute/external URLs. Existing per-page source links (verified rich by the audit) are asserted intact by the existing per-spec smoke blocks.

**Acceptance (binding):**
1. **Given** `family.html`/`family.en.html`, **When** the Plan & Billing tab renders, **Then** exactly one finance link exists in the page body, honestly labeled, resolving to the language-correct finance page.
2. **Given** dashboard/reports bodies, **When** smoke runs, **Then** body finance links remain 0 (existing assertion untouched).
3. **Given** all 40 pages, **When** the link crawl runs, **Then** zero dead/`#`/external links.
4. **Given** `git diff`, **When** reviewed, **Then** family.js shows only this link addition and the fam overlay shows only the one key pair.
