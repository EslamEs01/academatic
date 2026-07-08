/* Finance fixture (Spec 009) — the authored family-invoice + recent-payment display data for
 * the Finance & Billing shell. Cross-references are resolved BY ID at render time (the
 * same pattern every other module uses): familyId → fixtures/families.js, studentIds →
 * fixtures/students.js, courseId → fixtures/courses.js, groupId (optional) →
 * fixtures/groups.js. This module imports those four for the coherence guard below —
 * nothing else (no runtime billing logic lives here).
 *
 * Every amount, date, serial, and status is an AUTHORED DEMO LITERAL — never derived
 * from a real balance, and never computed from anything else in this file. The only
 * numbers this file computes are row COUNTS (`rows.filter(...).length` / `Set.size`),
 * the same technique `OUTCOME_SUMMARY` (Spec 005) and `GROUP_SUMMARY` (Spec 006) already
 * use. `issuedISO`/`dueISO`/`dateISO` are plain ISO date strings formatted at render
 * time with `Intl.DateTimeFormat` — the same `dateISO` convention `fixtures/schedule.js`
 * already established — so no per-row date translation keys are needed. `overdue` is an
 * authored `statusId`, never a rule computed from `dueISO` (data-model.md §1).
 *
 * Invoice/payment lifecycle chips resolve through `components/finance-status.js`
 * (`INVOICE_STATUS` / `PAYMENT_STATUS`). This fixture does NOT import that module —
 * its build-time coherence guard hardcodes the same id lists locally so the guard has
 * no component dependency (the `nav.config.js` guard precedent). */
import { FAMILY_BY_ID } from './families.js';
import { STUDENT_BY_ID } from './students.js';
import { COURSE_BY_ID } from './courses.js';
import { GROUP_BY_ID } from './groups.js';

const inv = (o) => ({ unitKey: 'unit.sar', ...o });

export const INVOICES = {
  rows: [
    inv({ id: 'inv1', serial: 'INV-2026-041', familyId: 'fam1', studentIds: ['st1', 'st6'], courseId: 'c1', groupId: 'grp1', monthKey: 'data.fin.month.june', issuedISO: '2026-06-01', dueISO: '2026-06-10', amount: 1280, statusId: 'paid' }),
    inv({ id: 'inv2', serial: 'INV-2026-052', familyId: 'fam1', studentIds: ['st11', 'st12'], courseId: 'c2', monthKey: 'data.fin.month.july', issuedISO: '2026-07-01', dueISO: '2026-07-10', amount: 1280, statusId: 'unpaid' }),
    inv({ id: 'inv3', serial: 'INV-2026-043', familyId: 'fam2', studentIds: ['st2'], courseId: 'c3', monthKey: 'data.fin.month.june', issuedISO: '2026-06-02', dueISO: '2026-06-12', amount: 910, statusId: 'paid' }),
    inv({ id: 'inv4', serial: 'INV-2026-054', familyId: 'fam2', studentIds: ['st7', 'st14'], courseId: 'c4', monthKey: 'data.fin.month.july', issuedISO: '2026-07-02', dueISO: '2026-07-12', amount: 910, statusId: 'unpaid' }),
    inv({ id: 'inv5', serial: 'INV-2026-044', familyId: 'fam4', studentIds: ['st4'], courseId: 'c1', groupId: 'grp6', monthKey: 'data.fin.month.june', issuedISO: '2026-06-02', dueISO: '2026-06-12', amount: 560, statusId: 'paid' }),
    inv({ id: 'inv6', serial: 'INV-2026-035', familyId: 'fam5', studentIds: ['st5'], courseId: 'c2', monthKey: 'data.fin.month.may', issuedISO: '2026-05-03', dueISO: '2026-05-13', amount: 720, statusId: 'overdue', noteKey: 'data.fin.inv.inv6.note' }),
    inv({ id: 'inv7', serial: 'INV-2026-046', familyId: 'fam5', studentIds: ['st5'], courseId: 'c2', monthKey: 'data.fin.month.june', issuedISO: '2026-06-03', dueISO: '2026-06-13', amount: 720, statusId: 'overdue' }),
    inv({ id: 'inv8', serial: 'INV-2026-047', familyId: 'fam6', studentIds: ['st9'], courseId: 'c5', monthKey: 'data.fin.month.june', issuedISO: '2026-06-04', dueISO: '2026-06-14', amount: 1020, statusId: 'paid' }),
    inv({ id: 'inv9', serial: 'INV-2026-028', familyId: 'fam7', studentIds: ['st10'], courseId: 'c3', monthKey: 'data.fin.month.april', issuedISO: '2026-04-05', dueISO: '2026-04-15', amount: 640, statusId: 'cancelled', noteKey: 'data.fin.inv.inv9.note' }),
  ],
};

export const PAYMENTS = {
  rows: [
    { id: 'pay1', invoiceId: 'inv1', familyId: 'fam1', dateISO: '2026-06-11', amount: 1280, unitKey: 'unit.sar', methodKey: 'fin.method.bankTransfer', statusId: 'recorded' },
    { id: 'pay2', invoiceId: 'inv3', familyId: 'fam2', dateISO: '2026-06-13', amount: 910, unitKey: 'unit.sar', methodKey: 'fin.method.card', statusId: 'recorded' },
    { id: 'pay3', invoiceId: 'inv5', familyId: 'fam4', dateISO: '2026-06-12', amount: 560, unitKey: 'unit.sar', methodKey: 'fin.method.cash', statusId: 'recorded' },
    { id: 'pay4', invoiceId: 'inv8', familyId: 'fam6', dateISO: '2026-06-15', amount: 1020, unitKey: 'unit.sar', methodKey: 'fin.method.bankTransfer', statusId: 'recorded' },
    { id: 'pay5', invoiceId: 'inv2', familyId: 'fam1', dateISO: '2026-07-08', amount: 1280, unitKey: 'unit.sar', methodKey: 'fin.method.bankTransfer', statusId: 'pending' },
    { id: 'pay6', invoiceId: 'inv6', familyId: 'fam5', dateISO: '2026-05-20', amount: 720, unitKey: 'unit.sar', methodKey: 'fin.method.card', statusId: 'returned' },
  ],
};

/* index helpers (build-time resolution, matching the family/student/course/group precedent) */
export const INVOICE_BY_ID = Object.fromEntries(INVOICES.rows.map((r) => [r.id, r]));
export function invoicesOfFamily(familyId) { return INVOICES.rows.filter((r) => r.familyId === familyId); }
export function paymentsOfInvoice(invoiceId) { return PAYMENTS.rows.filter((r) => r.invoiceId === invoiceId); }

/* derived summary counts (display-only — row counts only, never a money sum; the
 * `OUTCOME_SUMMARY`/`GROUP_SUMMARY` precedent). Tiles read these counts directly so the
 * shell always agrees with the authored rows. */
const invoiceRows = INVOICES.rows;
const paymentRows = PAYMENTS.rows;
const countInvoiceStatus = (id) => invoiceRows.filter((r) => r.statusId === id).length;
const countPaymentStatus = (id) => paymentRows.filter((r) => r.statusId === id).length;

export const FINANCE_SUMMARY = {
  invoices: {
    total: invoiceRows.length,
    paid: countInvoiceStatus('paid'),
    unpaid: countInvoiceStatus('unpaid'),
    overdue: countInvoiceStatus('overdue'),
    cancelled: countInvoiceStatus('cancelled'),
  },
  /* payments.* and familiesWithDues complete the FINANCE_SUMMARY shape (data-model.md §3 —
   * the future Django context dict). The shell today renders the four invoice tile counts
   * and payments.total (the recent-payments header count); the per-status payment counts
   * and familiesWithDues are shape-parity fields for the real-backend page, the same
   * documentation-parity stance FUTURE_ROUTES takes in nav.config.js. */
  payments: {
    total: paymentRows.length,
    recorded: countPaymentStatus('recorded'),
    pending: countPaymentStatus('pending'),
    returned: countPaymentStatus('returned'),
  },
  familiesWithDues: new Set(
    invoiceRows.filter((r) => r.statusId === 'unpaid' || r.statusId === 'overdue').map((r) => r.familyId),
  ).size,
};

/* Planned / backend-required finance surfaces (contracts/planned-finance-contract.md §1)
 * — route-less, figure-free cards; exactly nine, in the 1:1 order the six locked nav
 * items + accounting/expenses + banks tell the same story. */
export const PLANNED_FINANCE = [
  { id: 'monthlyInvoices', availability: 'planned', titleKey: 'fin.planned.monthlyInvoices.title', descKey: 'fin.planned.monthlyInvoices.desc', icon: 'calendar', tone: 'amber' },
  { id: 'invoicesEngine', availability: 'backendRequired', titleKey: 'fin.planned.invoicesEngine.title', descKey: 'fin.planned.invoicesEngine.desc', icon: 'file-text', tone: 'muted' },
  { id: 'paymentsCollection', availability: 'backendRequired', titleKey: 'fin.planned.paymentsCollection.title', descKey: 'fin.planned.paymentsCollection.desc', icon: 'wallet', tone: 'muted' },
  { id: 'teacherSalaries', availability: 'backendRequired', titleKey: 'fin.planned.teacherSalaries.title', descKey: 'fin.planned.teacherSalaries.desc', icon: 'trainers', tone: 'muted' },
  { id: 'staffSalaries', availability: 'backendRequired', titleKey: 'fin.planned.staffSalaries.title', descKey: 'fin.planned.staffSalaries.desc', icon: 'staff', tone: 'muted' },
  { id: 'classSalaryReport', availability: 'backendRequired', titleKey: 'fin.planned.classSalaryReport.title', descKey: 'fin.planned.classSalaryReport.desc', icon: 'clipboard-check', tone: 'muted' },
  { id: 'payoutsCompensations', availability: 'backendRequired', titleKey: 'fin.planned.payoutsCompensations.title', descKey: 'fin.planned.payoutsCompensations.desc', icon: 'user-check', tone: 'muted' },
  { id: 'accountingExpenses', availability: 'backendRequired', titleKey: 'fin.planned.accountingExpenses.title', descKey: 'fin.planned.accountingExpenses.desc', icon: 'grid', tone: 'muted' },
  { id: 'banks', availability: 'backendRequired', titleKey: 'fin.planned.banks.title', descKey: 'fin.planned.banks.desc', icon: 'lock', tone: 'muted' },
];

/* Spec 030 — teacher + staff salary rows, STATUS-FIRST and FIGURE-FREE. Name + status +
 * period ONLY — there is deliberately no pay figure (no fixed, fine, gift, hour-rate, or
 * total column); salary/payroll figures are never shown anywhere (the standing law). The
 * real payroll run stays a backendRequired gate on the board. */
export const SALARIES = [
  { id: 'sal1', role: 'teacher', nameKey: 'fin.sal.name.sara',     statusId: 'approved', periodKey: 'fin.sal.period.jul' },
  { id: 'sal2', role: 'teacher', nameKey: 'fin.sal.name.mohammed', statusId: 'pending',  periodKey: 'fin.sal.period.jul' },
  { id: 'sal3', role: 'teacher', nameKey: 'fin.sal.name.layan',    statusId: 'paid',     periodKey: 'fin.sal.period.jun' },
  { id: 'sal4', role: 'teacher', nameKey: 'fin.sal.name.reem',     statusId: 'onhold',   periodKey: 'fin.sal.period.jul' },
  { id: 'sal5', role: 'staff',   nameKey: 'fin.sal.name.owner',    statusId: 'approved', periodKey: 'fin.sal.period.jul' },
  { id: 'sal6', role: 'staff',   nameKey: 'fin.sal.name.coord',    statusId: 'pending',  periodKey: 'fin.sal.period.jul' },
];

/* Spec 030 — bank accounts, DISPLAY-ONLY. Name + status ONLY — NO credentials, API keys,
 * account numbers, or balances. Add/Import/Reconcile stay backendRequired gates. */
export const BANKS = [
  { id: 'bank1', nameKey: 'fin.bank.name.rajhi', statusId: 'active' },
  { id: 'bank2', nameKey: 'fin.bank.name.ahli',  statusId: 'active' },
  { id: 'bank3', nameKey: 'fin.bank.name.riyad', statusId: 'active' },
  { id: 'bank4', nameKey: 'fin.bank.name.inma',  statusId: 'inactive' },
];

/* status → tone/icon (reuse existing chip tones; icon + label, never a figure/color-only) */
export const SALARY_STATUS = {
  pending:  { tone: 'amber',     icon: 'clock' },
  approved: { tone: 'upcoming',  icon: 'check' },
  paid:     { tone: 'completed', icon: 'check-circle' },
  onhold:   { tone: 'neutral',   icon: 'pause-circle' },
};
export const BANK_STATUS = {
  active:   { tone: 'completed', icon: 'check-circle' },
  inactive: { tone: 'neutral',   icon: 'x-circle' },
};
export const SALARY_STATUS_ORDER = ['pending', 'approved', 'paid', 'onhold'];

/* ── build-time coherence guard (the nav.config.js pattern — a broken fixture cannot
 * ship). Hardcodes the invoice/payment status id lists locally rather than importing
 * components/finance-status.js, so this fixture stays a plain-data module. */
const INVOICE_STATUS_IDS = ['paid', 'unpaid', 'overdue', 'cancelled'];
const PAYMENT_STATUS_IDS = ['recorded', 'pending', 'returned'];

for (const r of invoiceRows) {
  if (!FAMILY_BY_ID[r.familyId]) throw new Error(`finance fixture: invoice '${r.id}' references unknown family '${r.familyId}'`);
  for (const sid of r.studentIds || []) {
    if (!STUDENT_BY_ID[sid]) throw new Error(`finance fixture: invoice '${r.id}' references unknown student '${sid}'`);
  }
  if (r.courseId && !COURSE_BY_ID[r.courseId]) throw new Error(`finance fixture: invoice '${r.id}' references unknown course '${r.courseId}'`);
  if (r.groupId && !GROUP_BY_ID[r.groupId]) throw new Error(`finance fixture: invoice '${r.id}' references unknown group '${r.groupId}'`);
  if (!INVOICE_STATUS_IDS.includes(r.statusId)) throw new Error(`finance fixture: invoice '${r.id}' has unrecognized statusId '${r.statusId}'`);
}

for (const p of paymentRows) {
  const invoice = INVOICE_BY_ID[p.invoiceId];
  if (!invoice) throw new Error(`finance fixture: payment '${p.id}' references unknown invoice '${p.invoiceId}'`);
  if (invoice.statusId === 'cancelled') throw new Error(`finance fixture: payment '${p.id}' references cancelled invoice '${p.invoiceId}'`);
  if (p.familyId !== invoice.familyId) throw new Error(`finance fixture: payment '${p.id}' familyId '${p.familyId}' does not match invoice '${p.invoiceId}' familyId '${invoice.familyId}'`);
  if (!PAYMENT_STATUS_IDS.includes(p.statusId)) throw new Error(`finance fixture: payment '${p.id}' has unrecognized statusId '${p.statusId}'`);
}

if (!invoiceRows.some((r) => r.familyId === 'fam5' && r.statusId === 'overdue')) {
  throw new Error("finance fixture: 'fam5' must have at least one overdue invoice (matches its fam.attn.payment flag)");
}

for (const fid of ['fam3', 'fam8']) {
  if (invoiceRows.some((r) => r.familyId === fid)) throw new Error(`finance fixture: '${fid}' must have zero invoices`);
}

const cancelledInvoices = invoiceRows.filter((r) => r.statusId === 'cancelled');
if (cancelledInvoices.length !== 1 || cancelledInvoices[0].familyId !== 'fam7') {
  throw new Error("finance fixture: exactly one cancelled invoice must exist and it must belong to 'fam7'");
}
for (const c of cancelledInvoices) {
  if (paymentsOfInvoice(c.id).length) throw new Error(`finance fixture: cancelled invoice '${c.id}' must have zero payment rows`);
}

for (const id of INVOICE_STATUS_IDS) {
  if (!invoiceRows.some((r) => r.statusId === id)) throw new Error(`finance fixture: no invoice row has statusId '${id}'`);
}
for (const id of PAYMENT_STATUS_IDS) {
  if (!paymentRows.some((r) => r.statusId === id)) throw new Error(`finance fixture: no payment row has statusId '${id}'`);
}
