/* Spec 031 + Spec 040 — Settings-hub fixtures.
 *
 * Spec 031 shipped the display-only hub. Spec 040 COMPLETES the six domains in
 * place (2 -> 73 rendered field() controls) without a new page, hook, storage key,
 * component or dependency.
 *
 * STANDING LAWS enforced by the DATA in this file:
 *  - Teacher pay-free (GLOBAL): NO salary/rate/fine/payout/compensation FIGURE.
 *    The legacy General > Teachers tab (10 pay controls) and `rate_student_absent`
 *    are OMITTED BY LAW and appear nowhere — not as a field, label, help, option,
 *    fixture value or comment.
 *  - No-secret: a sensitive provider field is a STRUCTURE-ONLY row
 *    {labelKey, required, purposeKey} — it has NO `value` key, by construction.
 *    0 authored API key / secret / token / webhook secret / SMTP password.
 *  - No-fake: no provider is authored "connected"/«متصل». The closed status
 *    vocabulary is notConfigured | requiresServer | unavailable.
 *  - DOM naming law (smoke:1174 `credInputs`, smoke:92 OMIT regex): no field
 *    `name`/`id` may contain pass|secret|api|key|token|webhook|card|cvv — and,
 *    defensively, none contains `salary` or `payout` either. This is why the
 *    legacy `card_style` becomes `cust-surface` and the payout modes become
 *    `integ-pmb-out-mode` / `integ-pyn-out-mode`.
 *  - No real PII. Placeholders only (demo.academy, 05xx-xx-0000). The legacy
 *    corpus contains a real name + phone on the Custom-provider row and in the
 *    payment-method edit form; NONE of it is ported.
 */

/* ---------------------------------------------------------------- General */

/* Spec-031 display card (kept — the read-back of the authored current value).
 * Deliberate, binding redundancy with IDENTITY_FIELDS (contract R-A): the card
 * reads back, the form is the editable contract. Do not "tidy" one away. */
export const IDENTITY_ROWS = [
  { labelKey: 'adm.set.gen.name',    valueKey: 'adm.set.gen.nameVal' },
  { labelKey: 'adm.set.gen.domain',  valueKey: 'adm.set.gen.domainVal' },
  { labelKey: 'adm.set.gen.email',   valueKey: 'adm.set.gen.emailVal' },
  { labelKey: 'adm.set.gen.phone',   valueKey: 'adm.set.gen.phoneVal' },
  { labelKey: 'adm.set.gen.whatsapp', valueKey: 'adm.set.gen.whatsappVal' },
];

/* Locations display slice (B-02 / M-04) — country/city/timezone/address; no page. */
export const LOCATIONS = [
  { labelKey: 'adm.set.loc.country',  valueKey: 'adm.set.loc.countryVal' },
  { labelKey: 'adm.set.loc.city',     valueKey: 'adm.set.loc.cityVal' },
  { labelKey: 'adm.set.loc.timezone', valueKey: 'adm.set.loc.timezoneVal' },
  { labelKey: 'adm.set.loc.address',  valueKey: 'adm.set.loc.addressVal' },
];

/* Legacy ships 251 countries x 27 cities — a backend lookup, not a fixture.
 * We author a short, honest option list. The city<-country dependency is
 * DOCUMENTED in help copy, never implemented (a cascading select needs a hook). */
export const IDENTITY_OPTS = {
  country: [
    { value: 'sa', labelKey: 'adm.set.gen.opt.country.sa', selected: true },
    { value: 'eg', labelKey: 'adm.set.gen.opt.country.eg' },
    { value: 'ae', labelKey: 'adm.set.gen.opt.country.ae' },
    { value: 'om', labelKey: 'adm.set.gen.opt.country.om' },
  ],
  city: [
    { value: 'riyadh', labelKey: 'adm.set.gen.opt.city.riyadh', selected: true },
    { value: 'jeddah', labelKey: 'adm.set.gen.opt.city.jeddah' },
    { value: 'dammam', labelKey: 'adm.set.gen.opt.city.dammam' },
  ],
  timezone: [
    { value: 'Asia/Riyadh', label: 'Asia/Riyadh (GMT+3)', selected: true },
    { value: 'Africa/Cairo', label: 'Africa/Cairo (GMT+2)' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai (GMT+4)' },
  ],
};

/* Group A — academy identity: 10 field() (7 text + 3 select). The `logo`
 * (legacy type=file) is NOT here — it is a backendRequired GATE in settings.js.
 * Values reuse the already-shipped Spec-031 authored literals verbatim. */
export const IDENTITY_FIELDS = [
  { name: 'gen-name',     labelKey: 'adm.set.gen.name',     type: 'text', required: true,  valueKey: 'adm.set.gen.nameVal' },
  { name: 'gen-nameAr',   labelKey: 'adm.set.gen.nameAr',   type: 'text', required: true,  valueKey: 'adm.set.gen.nameArVal', helpKey: 'adm.set.gen.nameArHelp' },
  { name: 'gen-domain',   labelKey: 'adm.set.gen.domain',   type: 'text', required: true,  valueKey: 'adm.set.gen.domainVal', helpKey: 'adm.set.gen.domainHelp' },
  { name: 'gen-email',    labelKey: 'adm.set.gen.email',    type: 'text', required: true,  valueKey: 'adm.set.gen.emailVal',  helpKey: 'adm.set.gen.emailHelp' },
  { name: 'gen-phone',    labelKey: 'adm.set.gen.phone',    type: 'text', valueKey: 'adm.set.gen.phoneVal' },
  { name: 'gen-whatsapp', labelKey: 'adm.set.gen.whatsapp', type: 'text', valueKey: 'adm.set.gen.whatsappVal', helpKey: 'adm.set.gen.whatsappHelp' },
  { name: 'gen-address',  labelKey: 'adm.set.gen.address',  type: 'text', valueKey: 'adm.set.loc.addressVal' },
  { name: 'gen-country',  labelKey: 'adm.set.loc.country',  type: 'select', required: true, opts: 'country' },
  { name: 'gen-city',     labelKey: 'adm.set.loc.city',     type: 'select', required: true, opts: 'city', helpKey: 'adm.set.gen.cityHelp' },
  // the single highest-blast-radius setting on the page — the warning is mandatory.
  { name: 'gen-timezone', labelKey: 'adm.set.loc.timezone', type: 'select', opts: 'timezone', helpKey: 'adm.set.gen.timezoneHelp' },
];

/* Group C — course & class automation: 17 of the 18 evidenced controls.
 * OMITTED BY LAW: `rate_student_absent` ("% of the class price added to the
 * teacher's salary") — a pay field. It has no row, no label, no key, no comment
 * beyond this exclusion note.
 *
 * Recorded legacy bugs, NOT reproduced:
 *  - both report checkboxes ship as name `send_plan_report` (the second can never
 *    post). Our two get disambiguated ids: gen-courseCompleted / gen-monthlyPlan.
 *  - `student_cancel_enable` / `student_cancel_before_class` are NAMED student_*
 *    but LABELLED "Family" in legacy. We follow the LABEL (family).
 *  - `classes_not_closed` genuinely has no option `1` in legacy. Not invented.
 * Dependencies are rendered as inline HELP TEXT, never as show/hide behaviour
 * (a conditional engine would need a new hook — forbidden). */
export const AUTOMATION_GROUPS = [
  {
    id: 'renewal', titleKey: 'adm.set.gen.auto.renewalTitle',
    fields: [
      { name: 'gen-newCourseStatus', labelKey: 'adm.set.gen.auto.newCourseStatus', type: 'select', helpKey: 'adm.set.gen.auto.newCourseStatusHelp',
        options: [
          { value: '0', labelKey: 'adm.set.gen.auto.st.inactive' },
          { value: '1', labelKey: 'adm.set.gen.auto.st.active' },
          { value: '2', labelKey: 'adm.set.gen.auto.st.activeUnpaid', selected: true },
          { value: '6', labelKey: 'adm.set.gen.auto.st.free' },
        ] },
      { name: 'gen-renew', labelKey: 'adm.set.gen.auto.renew', type: 'select', helpKey: 'adm.set.gen.auto.renewHelp',
        options: [
          { value: '0', labelKey: 'adm.set.gen.auto.off' },
          { value: '1', labelKey: 'adm.set.gen.auto.on', selected: true },
          { value: '2', labelKey: 'adm.set.gen.auto.asFamily' },
        ] },
      // a COUNT of unpaid invoices — never an amount.
      { name: 'gen-stopAfter', labelKey: 'adm.set.gen.auto.stopAfter', type: 'number', value: '2', helpKey: 'adm.set.gen.auto.stopAfterHelp' },
    ],
    toggles: [],
  },
  {
    id: 'cancel', titleKey: 'adm.set.gen.auto.cancelTitle',
    fields: [
      { name: 'gen-teacherCancelWindow', labelKey: 'adm.set.gen.auto.teacherCancelWindow', type: 'number', value: '120', helpKey: 'adm.set.gen.auto.teacherCancelWindowHelp' },
      { name: 'gen-familyCancelWindow', labelKey: 'adm.set.gen.auto.familyCancelWindow', type: 'number', value: '120', helpKey: 'adm.set.gen.auto.familyCancelWindowHelp' },
      // options verbatim from the raw form: 0 No Action · 1 Auto makeup · 2 No Make-up · 3 Teacher Absent
      { name: 'gen-autoMakeup', labelKey: 'adm.set.gen.auto.autoMakeup', type: 'select', helpKey: 'adm.set.gen.auto.autoMakeupHelp',
        options: [
          { value: '0', labelKey: 'adm.set.gen.auto.mk.noAction' },
          { value: '1', labelKey: 'adm.set.gen.auto.mk.auto', selected: true },
          { value: '2', labelKey: 'adm.set.gen.auto.mk.noMakeup' },
          { value: '3', labelKey: 'adm.set.gen.auto.mk.teacherAbsent' },
        ] },
    ],
    toggles: [
      { id: 'gen-teacherCancel', labelKey: 'adm.set.gen.auto.teacherCancel', on: false, helpKey: 'adm.set.gen.auto.teacherCancelHelp' },
      { id: 'gen-familyCancel', labelKey: 'adm.set.gen.auto.familyCancel', on: false, helpKey: 'adm.set.gen.auto.familyCancelHelp' },
      // "credit" = the Spec-020 HOUR QUOTA (amount-free). Never money.
      { id: 'gen-makeupCredit', labelKey: 'adm.set.gen.auto.makeupCredit', on: true, helpKey: 'adm.set.gen.auto.makeupCreditHelp' },
      { id: 'gen-noMakeupCredit', labelKey: 'adm.set.gen.auto.noMakeupCredit', on: true, helpKey: 'adm.set.gen.auto.noMakeupCreditHelp' },
    ],
  },
  {
    id: 'attend', titleKey: 'adm.set.gen.auto.attendTitle',
    fields: [
      { name: 'gen-entryWindow', labelKey: 'adm.set.gen.auto.entryWindow', type: 'number', value: '5', helpKey: 'adm.set.gen.auto.entryWindowHelp' },
      { name: 'gen-teacherEditClass', labelKey: 'adm.set.gen.auto.teacherEditClass', type: 'select', helpKey: 'adm.set.gen.auto.teacherEditClassHelp',
        options: [
          { value: '0', labelKey: 'adm.set.gen.auto.off' },
          { value: '1', labelKey: 'adm.set.gen.auto.on' },
          { value: '2', labelKey: 'adm.set.gen.auto.asTeacher', selected: true },
        ] },
    ],
    toggles: [
      // The rule is rendered; its PAY half (`rate_student_absent`) is omitted by law.
      { id: 'gen-teacherAbsentStudent', labelKey: 'adm.set.gen.auto.teacherAbsentStudent', on: false, helpKey: 'adm.set.gen.auto.teacherAbsentStudentHelp' },
    ],
  },
  {
    id: 'close', titleKey: 'adm.set.gen.auto.closeTitle',
    fields: [
      { name: 'gen-classesNotClosed', labelKey: 'adm.set.gen.auto.classesNotClosed', type: 'select', helpKey: 'adm.set.gen.auto.classesNotClosedHelp',
        options: [
          // verbatim from the raw form: 0 No Action · 2 No Make-up · 3 Teacher Absent.
          // Value `1` is genuinely ABSENT from the legacy enum. Never invent it.
          { value: '0', labelKey: 'adm.set.gen.auto.cl.noAction', selected: true },
          { value: '2', labelKey: 'adm.set.gen.auto.cl.noMakeup' },
          { value: '3', labelKey: 'adm.set.gen.auto.cl.teacherAbsent' },
        ] },
      { name: 'gen-closeHours', labelKey: 'adm.set.gen.auto.closeHours', type: 'number', value: '12', helpKey: 'adm.set.gen.auto.closeHoursHelp' },
    ],
    toggles: [],
  },
  {
    id: 'report', titleKey: 'adm.set.gen.auto.reportTitle',
    fields: [],
    toggles: [
      // legacy default is UNKNOWN (evidence silent) -> authored off, unknown recorded.
      { id: 'gen-courseCompleted', labelKey: 'adm.set.gen.auto.courseCompleted', on: false, helpKey: 'adm.set.gen.auto.courseCompletedHelp' },
      // legacy shipped this DISABLED. Its "No WhatsApp Connected" framing is NOT reproduced.
      { id: 'gen-monthlyPlan', labelKey: 'adm.set.gen.auto.monthlyPlan', disabled: true, reasonKey: 'adm.set.gen.auto.monthlyPlanReason' },
    ],
  },
];

/* Expense heads lookup — name + status ONLY, NO amount (031-owned, figure-free). */
export const EXPENSE_HEAD_STATUS = {
  active:   { tone: 'completed', icon: 'check-circle', labelKey: 'adm.set.heads.active' },
  inactive: { tone: 'neutral',   icon: 'x-circle',     labelKey: 'adm.set.heads.inactive' },
};
export const EXPENSE_HEADS = [
  { id: 'hd1', nameKey: 'adm.set.heads.rent',      statusId: 'active' },
  { id: 'hd2', nameKey: 'adm.set.heads.utilities', statusId: 'active' },
  { id: 'hd3', nameKey: 'adm.set.heads.supplies',  statusId: 'active' },
  { id: 'hd4', nameKey: 'adm.set.heads.marketing', statusId: 'inactive' },
];

/* --------------------------------------------------------- Customization */

/* 2 brand colours + 11 class-status colours = 13 swatches, 6 DISTINCT hexes
 * (FFC107, 17A2B8, DC3545, 6C757D, 28A745, 007BFF). Each renders as a swatch +
 * a hex text field() = 13 field(); + the 3 APPEARANCE_OPTS selects = 16. */
export const BRAND_COLORS = [
  { name: 'cust-colorPrimary',   labelKey: 'adm.set.brand.primary',   hex: '#5E4D7E' },
  { name: 'cust-colorSecondary', labelKey: 'adm.set.brand.secondary', hex: '#7B6BA8' },
];
export const STATUS_COLORS = [
  { name: 'cust-status-pending',       labelKey: 'adm.set.brand.st.pending',       hex: '#FFC107' },
  { name: 'cust-status-waiting',       labelKey: 'adm.set.brand.st.waiting',       hex: '#17A2B8' },
  { name: 'cust-status-teacherAbsent', labelKey: 'adm.set.brand.st.teacherAbsent', hex: '#DC3545' },
  { name: 'cust-status-studentAbsent', labelKey: 'adm.set.brand.st.studentAbsent', hex: '#DC3545' },
  { name: 'cust-status-teacherCancel', labelKey: 'adm.set.brand.st.teacherCancel', hex: '#6C757D' },
  { name: 'cust-status-studentCancel', labelKey: 'adm.set.brand.st.studentCancel', hex: '#6C757D' },
  { name: 'cust-status-adminCancel',   labelKey: 'adm.set.brand.st.adminCancel',   hex: '#6C757D' },
  { name: 'cust-status-attend',        labelKey: 'adm.set.brand.st.attend',        hex: '#28A745' },
  { name: 'cust-status-reschedule',    labelKey: 'adm.set.brand.st.reschedule',    hex: '#007BFF' },
  { name: 'cust-status-running',       labelKey: 'adm.set.brand.st.running',       hex: '#007BFF' },
  { name: 'cust-status-makeup',        labelKey: 'adm.set.brand.st.makeup',        hex: '#17A2B8' },
];

/* NOTE the naming law: the legacy field is `card_style`, but ANY name/id
 * containing `card` fails smoke:1174 (a31.credInputs). -> `cust-surface`. */
export const APPEARANCE_OPTS = [
  { name: 'cust-layout', labelKey: 'adm.set.cust.layout', type: 'select',
    options: [
      { value: 'full', labelKey: 'adm.set.cust.layoutFull', selected: true },
      { value: 'boxed', labelKey: 'adm.set.cust.layoutBoxed' },
    ] },
  // legacy labels the two states Expanded / Collapsed (not full/mini).
  { name: 'cust-sidebar', labelKey: 'adm.set.cust.sidebar', type: 'select',
    options: [
      { value: 'expanded', labelKey: 'adm.set.cust.sidebarExpanded', selected: true },
      { value: 'collapsed', labelKey: 'adm.set.cust.sidebarCollapsed' },
    ] },
  // legacy `card_style`: Bordered / Shadowed.
  { name: 'cust-surface', labelKey: 'adm.set.cust.surface', type: 'select',
    options: [
      { value: 'bordered', labelKey: 'adm.set.cust.surfaceBordered', selected: true },
      { value: 'shadowed', labelKey: 'adm.set.cust.surfaceShadowed' },
    ] },
];

/* -------------------------------------------------------------- Security */

/* The 4 legacy imports carry 39 columns. SIX SLOTS / THREE NAMES ARE REJECTED:
 *   `password`  (families)            -> no-secret law
 *   `hour_rate` (teachers + families) -> teacher pay-free law
 *   `currency`  (teachers + families + invoices) -> pay-free / figure-free law
 * 39 - 6 = 33 rendered structure rows.
 *
 * The legacy "Required Columns" table also publishes EXAMPLE VALUES for those
 * columns (hour_rate: 25.50; currency: USD, GBP, EUR, EGP, AUD, CAD, AED).
 * Those literals are NOT ported — porting them would import a pay figure and
 * seven currency tokens.
 *
 * Card 4 is MISLABELLED "Upload families" in legacy; the raw HTML (type=4,
 * invoices_file) proves it is INVOICES. We use the functional name. It has no
 * Download-Template link in legacy -> we render no download control for it. */
export const SECURITY_IMPORTS = [
  { id: 'imp-teachers', titleKey: 'adm.set.sec.imp.teachers', descKey: 'adm.set.sec.imp.teachersDesc', template: true,
    columns: ['id', 'first_name', 'last_name', 'email', 'phone', 'gender', 'status', 'timezone'] },
  { id: 'imp-families', titleKey: 'adm.set.sec.imp.families', descKey: 'adm.set.sec.imp.familiesDesc', template: true,
    columns: ['id', 'name', 'user_name', 'email', 'phone', 'status', 'country_id', 'timezone', 'total_hours', 'invoice_type', 'course_type', 'payment_method'] },
  { id: 'imp-children', titleKey: 'adm.set.sec.imp.children', descKey: 'adm.set.sec.imp.childrenDesc', template: true,
    columns: ['id', 'name', 'parent_id', 'age', 'gender', 'language', 'status'] },
  // no `template` -> no Download-Template control (legacy has none for this card).
  { id: 'imp-invoices', titleKey: 'adm.set.sec.imp.invoices', descKey: 'adm.set.sec.imp.invoicesDesc', template: false,
    columns: ['id', 'parent_id', 'price', 'status', 'due_date', 'note'] },
];

/* Backup destination — a real field with NO authored value. The legacy "Send
 * Backup" fired a real DB backup from a bare <a> with NO confirmation and then
 * redirected to SMTP. Not reproduced: no execution, no confirm-theatre, no
 * redirect, no fake last-run history. Both actions are direct honest gates. */
export const BACKUP = { name: 'sec-backupTo', labelKey: 'adm.set.sec.backupTo', type: 'text', helpKey: 'adm.set.sec.backupToHelp' };

/* Security — the two policy documents (display-only text), unchanged from Spec 031.
 *
 * GROUNDING NOTE (recorded, not papered over): in the legacy corpus BOTH Quill
 * editors (`familyPrivacyEditor` / `teacherPrivacyEditor`) are EMPTY on the captured
 * tenant — `ql-blank`, body `<p><br></p>`, rendered `ql-disabled`. So the legacy
 * policy PROSE is UNKNOWN; none was ever authored there. The bodies below are our
 * OWN Spec-031 authored placeholder copy, not ported legacy content — which is why
 * they may honestly ship. No Quill, no contenteditable, no rich-text dependency:
 * each policy is a read-only body + its own backendRequired Edit gate. */
export const POLICIES = [
  { id: 'family',  titleKey: 'adm.set.pol.familyTitle',  bodyKey: 'adm.set.pol.familyBody' },
  { id: 'teacher', titleKey: 'adm.set.pol.teacherTitle', bodyKey: 'adm.set.pol.teacherBody' },
];

/* 2FA relocated from General > Accessibility: STRUCTURE ROW + GATE.
 * `otp` is NOT rendered — legacy uses ONE shared OTP-destination phone for ALL
 * admins, a recorded security anti-pattern. No OTP control exists here. */
export const TFA_ROW = { labelKey: 'adm.set.sec.tfa', required: false, purposeKey: 'adm.set.sec.tfaPurpose' };

/* ---------------------------------------------------------- Integrations */

export const INTEG_KIND = {
  payment:  'adm.set.integ.kind.payment',
  payout:   'adm.set.integ.kind.payout',
  whatsapp: 'adm.set.integ.kind.whatsapp',
  email:    'adm.set.integ.kind.email',
};

/* CLOSED status vocabulary — three honest states, existing chip tones only.
 * NO provider may ever read «متصل» / "connected", in any form (not even
 * "not connected"): the fake-connected census is chip-scoped and token-absolute.
 * A 7th chip tone throws at build (build-html.mjs:168-175). */
export const INTEG_STATUS = {
  notConfigured:  { tone: 'neutral', icon: 'x-circle', labelKey: 'adm.set.integ.st.notConfigured' },
  requiresServer: { tone: 'amber',   icon: 'lock',     labelKey: 'adm.set.integ.st.requiresServer' },
  unavailable:    { tone: 'neutral', icon: 'x-circle', labelKey: 'adm.set.integ.st.unavailable' },
};

/* The 11 evidenced providers. Legacy renders every card's is_enabled toggle ON
 * while every provider shows "No data found" — enabled with nothing configured.
 * That default-on state, and PayPal's default to LIVE, are both REFUSED: every
 * provider here is authored `notConfigured`, and no CARD carries an enable
 * control (the preview enable lives inside the drawer, behind a gated Save). */
export const INTEGRATIONS = [
  { id: 'stripe',          drawer: 'integ-stripe',          nameKey: 'adm.set.integ.p.stripe',        kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'paypal',          drawer: 'integ-paypal',          nameKey: 'adm.set.integ.p.paypal',        kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'mollie',          drawer: 'integ-mollie',          nameKey: 'adm.set.integ.p.mollie',        kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'xpay',            drawer: 'integ-xpay',            nameKey: 'adm.set.integ.p.xpay',          kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'payoneer',        drawer: 'integ-payoneer',        nameKey: 'adm.set.integ.p.payoneer',      kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'paymob',          drawer: 'integ-paymob',          nameKey: 'adm.set.integ.p.paymob',        kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'custom',          drawer: 'integ-custom',          nameKey: 'adm.set.integ.p.custom',        kindId: 'payment',  statusId: 'notConfigured' },
  { id: 'paymob-payout',   drawer: 'integ-paymob-payout',   nameKey: 'adm.set.integ.p.paymobOut',     kindId: 'payout',   statusId: 'notConfigured' },
  { id: 'payoneer-payout', drawer: 'integ-payoneer-payout', nameKey: 'adm.set.integ.p.payoneerOut',   kindId: 'payout',   statusId: 'notConfigured' },
  { id: 'whatsapp',        drawer: 'integ-whatsapp',        nameKey: 'adm.set.integ.p.whatsapp',      kindId: 'whatsapp', statusId: 'notConfigured' },
  { id: 'email',           drawer: 'integ-email',           nameKey: 'adm.set.integ.p.email',         kindId: 'email',    statusId: 'notConfigured' },
];

/* Per-provider configuration.
 *   fields[]    -> real field() inputs — SAFE data only (21 across all 11)
 *   toggles[]   -> data-toggle local previews (8 across all 11)
 *   sensitive[] -> STRUCTURE-ONLY rows (24). {labelKey, required, purposeKey}.
 *                  There is NO `value` key here, by construction: a credential
 *                  cannot be authored into this shape. Legacy rendered 15 of
 *                  these as plain type=text and printed saved keys in tables.
 *                  We render none of it.
 *   info[]      -> read-only reference rows (the 2 payout webhook URLs). Shown
 *                  as information, never as an input, never with a secret.
 *
 * Semantic labels are used ONLY where the raw HTML label/placeholder/help PROVES
 * the meaning. Where it does not, the purpose says UNKNOWN rather than guessing.
 * The generic legacy key1..key4 labels are never shipped. */
export const PROVIDER_FIELDS = {
  stripe: {
    fields: [{ name: 'integ-stripe-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' }],
    sensitive: [
      { labelKey: 'adm.set.integ.s.stripePublishable', required: true, purposeKey: 'adm.set.integ.s.stripePublishablePurpose' },
      { labelKey: 'adm.set.integ.s.stripeSecret', required: true, purposeKey: 'adm.set.integ.s.stripeSecretPurpose' },
    ],
  },
  paypal: {
    fields: [
      { name: 'integ-paypal-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' },
      // legacy DEFAULTS TO LIVE. Refused: our authored default is Sandbox.
      { name: 'integ-paypal-env', labelKey: 'adm.set.integ.f.environment', type: 'select', helpKey: 'adm.set.integ.f.environmentHelp',
        options: [
          { value: 'sandbox', labelKey: 'adm.set.integ.f.envSandbox', selected: true },
          { value: 'live', labelKey: 'adm.set.integ.f.envLive' },
        ] },
    ],
    sensitive: [
      { labelKey: 'adm.set.integ.s.paypalClientId', required: true, purposeKey: 'adm.set.integ.s.paypalClientIdPurpose' },
      { labelKey: 'adm.set.integ.s.paypalClientSecret', required: true, purposeKey: 'adm.set.integ.s.paypalClientSecretPurpose' },
    ],
  },
  mollie: {
    fields: [{ name: 'integ-mollie-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' }],
    sensitive: [{ labelKey: 'adm.set.integ.s.mollieKey', required: true, purposeKey: 'adm.set.integ.s.mollieKeyPurpose' }],
  },
  xpay: {
    fields: [
      { name: 'integ-xpay-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' },
      { name: 'integ-xpay-url', labelKey: 'adm.set.integ.f.xpayUrl', type: 'select',
        options: [
          { value: 'staging', labelKey: 'adm.set.integ.f.xpayStaging', selected: true },
          { value: 'community', labelKey: 'adm.set.integ.f.xpayCommunity' },
        ] },
    ],
    // the four evidenced `xpay_method[]` options, verbatim (all unchecked in legacy):
    // card | fawry | meeza/digital | kiosk  ->  Card, Fawry, Meeza Digital & mobile wallets, Kiosk Aman.
    toggles: [
      { id: 'integ-xpay-m-cardpay', labelKey: 'adm.set.integ.f.xpayCard', on: false },
      { id: 'integ-xpay-m-fawry', labelKey: 'adm.set.integ.f.xpayFawry', on: false },
      { id: 'integ-xpay-m-meeza', labelKey: 'adm.set.integ.f.xpayMeeza', on: false },
      { id: 'integ-xpay-m-kiosk', labelKey: 'adm.set.integ.f.xpayKiosk', on: false },
    ],
    sensitive: [
      { labelKey: 'adm.set.integ.s.xpayApiKey', required: true, purposeKey: 'adm.set.integ.s.xpayApiKeyPurpose' },
      // meaning NOT proven by any label/placeholder/help in the raw HTML.
      { labelKey: 'adm.set.integ.s.xpayCommunityId', required: true, purposeKey: 'adm.set.integ.s.unknownPurpose' },
      { labelKey: 'adm.set.integ.s.xpayVariableAmountId', required: true, purposeKey: 'adm.set.integ.s.unknownPurpose' },
    ],
  },
  payoneer: {
    fields: [
      { name: 'integ-payoneer-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' },
      { name: 'integ-payoneer-env', labelKey: 'adm.set.integ.f.environment', type: 'select',
        options: [
          { value: 'sandbox', labelKey: 'adm.set.integ.f.envSandbox', selected: true },
          { value: 'live', labelKey: 'adm.set.integ.f.envLive' },
        ] },
    ],
    sensitive: [
      { labelKey: 'adm.set.integ.s.payoneerMerchant', required: true, purposeKey: 'adm.set.integ.s.payoneerMerchantPurpose' },
      { labelKey: 'adm.set.integ.s.payoneerApiKey', required: true, purposeKey: 'adm.set.integ.s.payoneerApiKeyPurpose' },
    ],
  },
  paymob: {
    fields: [
      { name: 'integ-paymob-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' },
      // PROVEN by the legacy help text to be a REGION selector, not a mode.
      { name: 'integ-paymob-region', labelKey: 'adm.set.integ.f.paymobRegion', type: 'select', helpKey: 'adm.set.integ.f.paymobRegionHelp',
        options: [
          { value: 'eg', labelKey: 'adm.set.integ.f.regionEgypt', selected: true },
          { value: 'om', labelKey: 'adm.set.integ.f.regionOman' },
          { value: 'sa', labelKey: 'adm.set.integ.f.regionSaudi' },
          { value: 'ae', labelKey: 'adm.set.integ.f.regionUae' },
        ] },
    ],
    sensitive: [
      { labelKey: 'adm.set.integ.s.paymobSecret', required: true, purposeKey: 'adm.set.integ.s.paymobSecretPurpose' },
      { labelKey: 'adm.set.integ.s.paymobIntegrationId', required: true, purposeKey: 'adm.set.integ.s.paymobIntegrationIdPurpose' },
      { labelKey: 'adm.set.integ.s.paymobPublic', required: true, purposeKey: 'adm.set.integ.s.paymobPublicPurpose' },
      { labelKey: 'adm.set.integ.s.paymobHmac', required: true, purposeKey: 'adm.set.integ.s.paymobHmacPurpose' },
      { labelKey: 'adm.set.integ.s.paymobApiKey', required: false, purposeKey: 'adm.set.integ.s.paymobApiKeyPurpose' },
    ],
  },
  custom: {
    fields: [
      { name: 'integ-custom-name', labelKey: 'adm.set.integ.f.displayName', type: 'text' },
      { name: 'integ-custom-details', labelKey: 'adm.set.integ.f.customDetails', type: 'textarea', helpKey: 'adm.set.integ.f.customDetailsHelp' },
    ],
    sensitive: [],
  },
  'paymob-payout': {
    // name may not contain `payout` (defensive against the OMIT regex) -> `-out-`.
    fields: [
      { name: 'integ-pmb-out-mode', labelKey: 'adm.set.integ.f.mode', type: 'select',
        options: [
          { value: 'sandbox', labelKey: 'adm.set.integ.f.envSandbox', selected: true },
          { value: 'live', labelKey: 'adm.set.integ.f.envLive' },
        ] },
    ],
    toggles: [{ id: 'integ-pmb-out-active', labelKey: 'adm.set.integ.f.active', on: false }],
    info: [{ labelKey: 'adm.set.integ.f.callbackUrl', purposeKey: 'adm.set.integ.f.callbackUrlPurpose' }],
    sensitive: [
      { labelKey: 'adm.set.integ.s.pmbOutClientId', required: true, purposeKey: 'adm.set.integ.s.pmbOutClientIdPurpose' },
      { labelKey: 'adm.set.integ.s.pmbOutClientSecret', required: true, purposeKey: 'adm.set.integ.s.pmbOutClientSecretPurpose' },
      { labelKey: 'adm.set.integ.s.pmbOutUsername', required: true, purposeKey: 'adm.set.integ.s.pmbOutUsernamePurpose' },
      // legacy renders this as the ONLY payout type=password. Still structure-only here.
      { labelKey: 'adm.set.integ.s.pmbOutPassword', required: true, purposeKey: 'adm.set.integ.s.pmbOutPasswordPurpose' },
    ],
  },
  'payoneer-payout': {
    fields: [
      { name: 'integ-pyn-out-mode', labelKey: 'adm.set.integ.f.mode', type: 'select',
        options: [
          { value: 'sandbox', labelKey: 'adm.set.integ.f.envSandbox', selected: true },
          { value: 'live', labelKey: 'adm.set.integ.f.envLive' },
        ] },
    ],
    toggles: [{ id: 'integ-pyn-out-active', labelKey: 'adm.set.integ.f.active', on: false }],
    info: [{ labelKey: 'adm.set.integ.f.callbackUrl', purposeKey: 'adm.set.integ.f.callbackUrlPurpose' }],
    sensitive: [
      { labelKey: 'adm.set.integ.s.pynOutUsername', required: true, purposeKey: 'adm.set.integ.s.pynOutUsernamePurpose' },
      { labelKey: 'adm.set.integ.s.pynOutApiPassword', required: true, purposeKey: 'adm.set.integ.s.pynOutApiPasswordPurpose' },
      // sensitive field #22 — structure-only. NEVER a field(), never an input, never a value.
      { labelKey: 'adm.set.integ.s.pynOutProgramId', required: true, purposeKey: 'adm.set.integ.s.pynOutProgramIdPurpose' },
    ],
  },
  whatsapp: {
    fields: [
      { name: 'integ-wa-phone', labelKey: 'adm.set.integ.f.waPhone', type: 'text', helpKey: 'adm.set.integ.f.waPhoneHelp' },
      { name: 'integ-wa-target', labelKey: 'adm.set.integ.f.waTarget', type: 'select',
        options: [
          { value: 'private', labelKey: 'adm.set.integ.f.waPrivate', selected: true },
          { value: 'group', labelKey: 'adm.set.integ.f.waGroup' },
        ] },
      { name: 'integ-wa-group', labelKey: 'adm.set.integ.f.waGroupName', type: 'text' },
    ],
    sensitive: [],
  },
  email: {
    fields: [
      { name: 'integ-email-address', labelKey: 'adm.set.integ.f.emailAddress', type: 'text' },
      { name: 'integ-email-host', labelKey: 'adm.set.integ.f.smtpHost', type: 'text' },
      { name: 'integ-email-port', labelKey: 'adm.set.integ.f.smtpPort', type: 'number', value: '587' },
      { name: 'integ-email-enc', labelKey: 'adm.set.integ.f.smtpEncryption', type: 'select',
        options: [
          { value: 'none', labelKey: 'adm.set.integ.f.encNone' },
          { value: 'ssl', labelKey: 'adm.set.integ.f.encSsl' },
          { value: 'tls', labelKey: 'adm.set.integ.f.encTls', selected: true },
        ] },
    ],
    toggles: [
      { id: 'integ-email-active', labelKey: 'adm.set.integ.f.active', on: false },
      { id: 'integ-email-default', labelKey: 'adm.set.integ.f.isDefault', on: false },
    ],
    sensitive: [
      { labelKey: 'adm.set.integ.s.smtpUser', required: true, purposeKey: 'adm.set.integ.s.smtpUserPurpose' },
      // one of only TWO real type=password inputs in the whole legacy crawl.
      { labelKey: 'adm.set.integ.s.smtpPassword', required: true, purposeKey: 'adm.set.integ.s.smtpPasswordPurpose' },
    ],
  },
};

/* Payment methods fold INSIDE Integrations (no nav item, no page, no chooser —
 * the provider catalogue IS the chooser). The 7 legacy create variants ARE the
 * 7 incoming providers' Configure drawers; the 8th capture (edit) is
 * structurally identical to a create variant, so it is not a separate surface.
 * There are 0 authored instances -> an honest empty state. No `Number Of Family`
 * count is fabricated, and the legacy edit form's real PII is never ported. */
export const PAYMENT_METHOD_EMPTY = { titleKey: 'adm.set.integ.pm.emptyTitle', bodyKey: 'adm.set.integ.pm.emptyBody' };
