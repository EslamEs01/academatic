/* Spec 009 — English keys (Finance, Billing & Payments shell).
 * Mirrors ar.fin.js exactly, key for key. Merged into en.js at runtime (deepMerge
 * extends, registered after the rep.* overlay) — nav.finance / topbar.title.finance /
 * topbar.crumb.finance are NEW keys that extend the existing nav/topbar blocks.
 * Every amount referenced by this copy is an authored demo literal — nothing here
 * is derived or computed; the only numbers that vary anywhere on the page are row
 * counts. The reference system had no payment-evidence concept and none is worded here. */
export default {
  nav: {
    finance: 'Finance',
  },

  topbar: {
    title: { finance: 'Finance & Billing' },
    crumb: { finance: 'Finance' },
  },

  finPage: {
    title: 'Finance & Billing',
    subtitle: 'Organize family invoices and payments in one calm place — a demo preview backed by fixture data.',
  },

  fin: {
    status: {
      paid: 'Paid',
      unpaid: 'Unpaid',
      overdue: 'Overdue',
      cancelled: 'Cancelled',
    },
    pay: {
      recorded: 'Recorded',
      pending: 'Pending',
      returned: 'Returned',
    },
    method: {
      bankTransfer: 'Bank transfer',
      card: 'Card',
      cash: 'Cash',
    },
    tile: {
      paid: 'Paid invoices',
      unpaid: 'Unpaid invoices',
      overdue: 'Overdue invoices',
      cancelled: 'Cancelled invoices',
    },
    sec: {
      invoices: 'Family invoices',
      invoicesSub: 'Invoices issued to families — open any invoice to see its details.',
      payments: 'Recent payments',
      paymentsSub: 'The most recent payments recorded against invoices.',
      planned: 'Salaries & accounting',
      plannedSub: 'These capabilities arrive with the real billing backend — shown here for context only.',
      teacherContext: 'View teacher performance (academic context)',
    },
    act: {
      group: 'Finance actions',
      createInvoice: 'Create invoice',
      exportCsv: 'Export CSV',
      exportPdf: 'Export PDF',
      print: 'Print',
      printToast: 'Printing will be available once the server is connected.',
      view: 'View invoice',
      recordPayment: 'Record payment',
      recordTitle: 'Record a payment on this invoice?',
      recordMsg: 'This will be available once the server is connected — no payment is saved yet.',
      recordCta: 'Confirm record',
      recordToast: 'Recording the payment will be available once the server is connected.',
      markPaid: 'Mark as paid',
      markTitle: 'Mark this invoice as paid?',
      markMsg: 'This will be available once the server is connected — the invoice status does not change yet.',
      markCta: 'Confirm',
      markToast: 'Updating the invoice status will be available once the server is connected.',
      sendReminder: 'Send reminder',
      remindTitle: 'Send a payment reminder to this family?',
      remindMsg: 'This will be available once the server is connected — no reminder is sent yet.',
      remindCta: 'Send',
      remindToast: 'Sending the reminder will be available once the server is connected.',
      sendInvoice: 'Send invoice',
    },
    reason: {
      export: 'Export requires the real billing backend — out of current scope.',
      backend: 'Requires the real billing backend.',
      send: 'Sending requires the real billing backend — out of current scope.',
      cancelled: 'Cancelled invoice — a payment cannot be recorded on it.',
      comingSoon: 'Planned — not part of the current fixture preview.',
    },
    filter: {
      searchPh: 'Search invoices…',
      status: 'Status',
      family: 'Family',
      allStatuses: 'All statuses',
      allFamilies: 'All families',
    },
    drawer: {
      serial: 'Invoice number',
      family: 'Family',
      students: 'Students',
      course: 'Course',
      group: 'Group',
      month: 'Billing month',
      issued: 'Issued date',
      due: 'Due date',
      amount: 'Amount',
      displayOnly: 'Display only — no real amounts are calculated.',
      status: 'Status',
      note: 'Note',
    },
    planned: {
      monthlyInvoices: { title: 'Monthly invoices', desc: 'Planned — a month-by-month roll-up of family invoices.' },
      invoicesEngine: { title: 'Invoices engine', desc: 'Creating invoices with line items and discounts arrives with the real billing backend.' },
      paymentsCollection: { title: 'Payments collection', desc: 'Recording payments and connecting payment providers arrives with the real billing backend.' },
      teacherSalaries: { title: 'Teacher salaries', desc: 'Calculating teacher salaries arrives with the real billing backend.' },
      staffSalaries: { title: 'Staff salaries', desc: 'Calculating staff salaries arrives with the real billing backend.' },
      classSalaryReport: { title: 'Class salary report', desc: 'A per-teacher class salary breakdown arrives with the real billing backend.' },
      payoutsCompensations: { title: 'Payouts & compensations', desc: 'Disbursing payouts and compensations arrives with the real billing backend.' },
      accountingExpenses: { title: 'Accounting & expenses', desc: 'Expenses, analytics and currencies arrive with the real billing backend.' },
      banks: { title: 'Banks', desc: 'Linking bank accounts arrives with the real billing backend.' },
    },

    /* Spec 030 — finance hub tabs */
    tab: { overview: 'Overview', invoices: 'Invoices', payments: 'Payments', monthlyInvoices: 'Monthly Invoices', salaries: 'Salaries', banks: 'Banks', aria: 'Finance sections' },
    /* Spec 038 — Monthly Invoices display board (#view=monthly-invoices): the existing
     * invoices grouped by month; per-row authored amount literals only, NO computed total. */
    monthly: {
      title: 'Monthly Invoices',
      sub: 'Invoices grouped by month — authored per-invoice amounts, display-only, never aggregated or computed.',
      count: '{n} invoices',
      generate: 'Generate monthly batch',
      generateReason: 'Generating monthly invoices needs the billing backend — nothing is created now.',
      send: 'Send invoices',
      sendReason: 'Sending invoices needs the billing backend — out of current scope.',
      export: 'Export month',
      exportReason: 'Exporting monthly invoices needs the backend module — out of current scope.',
    },

    /* Spec 030 — salaries board (STATUS-FIRST, FIGURE-FREE — no pay amount) */
    sal: {
      title: 'Teacher & staff salaries',
      sub: 'Per-month salary status — display-only; calculation and disbursement happen once the real billing system is connected.',
      teacher: 'Teachers',
      staff: 'Staff',
      lblPeriod: 'Period',
      status: { pending: 'Pending approval', approved: 'Approved', paid: 'Disbursed', onhold: 'On hold' },
      generate: 'Run salaries',
      generateReason: 'Running salaries needs the real billing system — out of current scope.',
      approve: 'Approve',
      approveReason: 'Approving salaries needs the real billing system — out of current scope.',
      markPaid: 'Mark disbursed',
      markReason: 'Disbursing salaries needs the real billing system — out of current scope.',
      exportRoster: 'Export salary roster',
      exportReason: 'Export needs the real billing system — out of current scope.',
      empty: 'No matching salaries.',
      name: { sara: 'Ms. Sara', mohammed: 'Mr. Mohammed', layan: 'Ms. Layan', reem: 'Ms. Reem', owner: 'Academy management', coord: 'Academy coordinator' },
      period: { jun: 'Last month', jul: 'This month' },
    },

    /* Spec 030 — banks (name/status only; no credentials) */
    bank: {
      title: 'Bank accounts',
      sub: 'List of bank accounts — display-only; linking, import and matching need the real bank connection.',
      status: { active: 'Active', inactive: 'Inactive' },
      add: 'Add bank account',
      addTitle: 'Add bank account',
      /* Spec 032 (FC-29) — add-bank drawer: bank name only */
      form: { name: 'Bank name', namePh: 'e.g. Al Rajhi Bank' },
      import: 'Import statement',
      importReason: 'Importing statements needs the real bank connection — out of current scope.',
      reconcile: 'Reconcile',
      reconcileReason: 'Bank reconciliation needs the real bank connection — out of current scope.',
      empty: 'No bank accounts.',
      name: { rajhi: 'Al Rajhi Bank', ahli: 'National Bank', riyad: 'Riyad Bank', inma: 'Alinma Bank' },
    },

    /* Spec 030 — payment collection gates */
    pay2: {
      add: 'Record payment',
      addReason: 'Recording payments needs the real billing system — out of current scope.',
      reconcile: 'Reconcile payments',
      reconcileReason: 'Reconciling payments needs the real billing system — out of current scope.',
    },
  },

  /* ============ fixture content (authored demo literals, display-only) ============ */
  data: {
    fin: {
      month: {
        april: 'April 2026',
        may: 'May 2026',
        june: 'June 2026',
        july: 'July 2026',
      },
      inv: {
        inv6: { note: 'A payment reminder was sent to this family.' },
        inv9: { note: 'This family has stopped studying; the invoice was cancelled.' },
      },
    },
  },
};
