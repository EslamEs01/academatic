/* Spec 009 — Finance, Billing & Payments shell (the promoted `finance` page).
 *
 * A calm, fixture-only board over the academy's family invoices + recent payments,
 * with an honest, figure-free preview of the payroll/accounting capabilities that
 * ship with the real billing backend. Every count is a display-only row-count
 * roll-up (`FINANCE_SUMMARY`, the `OUTCOME_SUMMARY`/`GROUP_SUMMARY` precedent);
 * every amount is an authored demo literal — nothing here is derived or computed.
 * The whole page is baked static HTML; enhance.js only filters the pre-rendered
 * invoice rows, opens the baked invoice drawer/confirm modals, and shows demo/
 * disabled-reason toasts. No plotting surface, NO aggregate money figure, and
 * no payment-evidence affordance anywhere (the reference system had no such concept). */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { medallion, chip, button } from '../components/ui.js';
import { tabs } from '../components/tabs.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { noResults } from '../components/states.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { reportCard } from '../components/report-card.js';
import { financeActions, invoiceRowActions, invoiceDrawerActions } from '../components/finance-actions.js';
import { invoiceStatusChip, paymentStatusChip, INVOICE_STATUS_ORDER } from '../components/finance-status.js';
import { INVOICES, PAYMENTS, FINANCE_SUMMARY, PLANNED_FINANCE, INVOICE_BY_ID, invoicesOfFamily, SALARIES, BANKS, SALARY_STATUS, BANK_STATUS } from '../fixtures/finance.js';

/* Spec 030 — the honest clickable disabled-with-reason gate (keyboard-reachable, surfaces its
 * reason on click/hover/focus; NEVER a dead button). Reuses the closed data-disabled-reason hook. */
const gate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;
/* Spec 030 — figure-free status chips (icon + label; reuse existing chip tones) */
const salaryStatusChip = (id) => chip({ labelKey: 'fin.sal.status.' + id, tone: (SALARY_STATUS[id] || {}).tone || 'neutral', icon: (SALARY_STATUS[id] || {}).icon || 'clock' });
const bankStatusChip = (id) => chip({ labelKey: 'fin.bank.status.' + id, tone: (BANK_STATUS[id] || {}).tone || 'neutral', icon: (BANK_STATUS[id] || {}).icon || 'check-circle' });
import { FAMILY_BY_ID } from '../fixtures/families.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { COURSE_BY_ID } from '../fixtures/courses.js';
import { GROUP_BY_ID } from '../fixtures/groups.js';

const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');
const courseHref = () => (getLang() === 'en' ? 'course.en.html' : 'course.html');
const groupHref = () => (getLang() === 'en' ? 'group.en.html' : 'group.html');
const teacherPerfHref = () => (getLang() === 'en' ? 'teacher-performance.en.html' : 'teacher-performance.html');

/* short literal date (day + month) — the fixtures/schedule.js `dateISO` convention */
function dateText(iso) {
  const locale = getLang() === 'ar' ? 'ar-EG' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(new Date(iso));
}

/* invoice-status → medallion icon/tone (tiles + drawer head only; the labeled chip
 * itself always comes from components/finance-status.js) */
const STATUS_ICON = { paid: 'check-circle', unpaid: 'clock', overdue: 'alert-triangle', cancelled: 'x-circle' };
const STATUS_TONE = { paid: 'success', unpaid: 'amber', overdue: 'coral', cancelled: 'muted' };

/* unique families that actually have an invoice — the family filter's option list
 * (fam3/fam8 own zero invoices and are correctly absent, matching data-model §1) */
const familiesWithInvoices = Object.values(FAMILY_BY_ID)
  .filter((f) => invoicesOfFamily(f.id).length > 0)
  .map((f) => ({ value: f.id, labelKey: f.guardian.nameKey }));

/* ── invoice-status tiles — count-only, each doubles as a filter (the Spec 005
 * attendance-tile mechanism) ─────────────────────────────────────────────── */
function tile(id) {
  return `<button type="button" class="fin-tile" data-filter-set="status:${id}" data-target="#invoice-list">
    ${medallion({ icon: STATUS_ICON[id], tone: STATUS_TONE[id], variant: 'soft' })}
    <div class="min-w-0"><div class="ft-v">${num(FINANCE_SUMMARY.invoices[id])}</div><div class="ft-l">${t('fin.tile.' + id)}</div></div>
  </button>`;
}

/* ── family invoices — one row per authored invoice ───────────────────────── */
function invoiceRow(inv) {
  const fam = FAMILY_BY_ID[inv.familyId];
  const course = inv.courseId ? COURSE_BY_ID[inv.courseId] : null;
  const group = inv.groupId ? GROUP_BY_ID[inv.groupId] : null;
  const search = `${inv.serial} ${fam ? t(fam.guardian.nameKey) : ''} ${course ? t(course.titleKey) : ''} ${t(inv.monthKey)}`;
  const facets = facetAttrs({ status: inv.statusId, family: inv.familyId, search });

  const familyLink = fam
    ? `<a href="${familyHref()}" class="fr-title">${t(fam.guardian.nameKey)}</a>`
    : `<span class="fr-title">—</span>`;
  const courseChip = course
    ? `<a href="${courseHref()}" class="link-chip">${icon('curricula', 'ico')}<span>${t(course.titleKey)}</span></a>` : '';
  const groupChip = group
    ? `<a href="${groupHref()}" class="link-chip">${icon('students', 'ico')}<span>${t(group.nameKey)}</span></a>` : '';

  return `<div class="fin-row is-hoverable" ${facets}>
    <div class="fr-serial tabular" dir="ltr">${esc(inv.serial)}</div>
    <div class="fr-body">
      ${familyLink}
      <div class="fr-sub">${t(inv.monthKey)} · ${t('fin.drawer.due')} <span dir="ltr">${dateText(inv.dueISO)}</span></div>
      <div class="fr-meta">${invoiceStatusChip(inv.statusId)}${courseChip}${groupChip}</div>
    </div>
    <div class="fr-amount tabular"><span dir="ltr">${num(inv.amount)}</span> ${t(inv.unitKey)}</div>
    <div class="fr-actions">${invoiceRowActions(inv)}</div>
  </div>`;
}

function invoiceSection() {
  const filters = filterBar({
    targetId: 'invoice-list',
    searchKey: 'fin.filter.searchPh',
    selects: [
      {
        name: 'status', labelKey: 'fin.filter.status',
        options: [{ value: '', labelKey: 'fin.filter.allStatuses' }, ...INVOICE_STATUS_ORDER.map((id) => ({ value: id, labelKey: 'fin.status.' + id }))],
      },
      {
        name: 'family', labelKey: 'fin.filter.family',
        options: [{ value: '', labelKey: 'fin.filter.allFamilies' }, ...familiesWithInvoices],
      },
    ],
  });

  return `<section class="mt-8">
    <div class="mb-3">
      <h2 class="section-title">${t('fin.sec.invoices')}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${t('fin.sec.invoicesSub')}</p>
    </div>
    ${filters}
    <div id="invoice-list">${INVOICES.rows.map(invoiceRow).join('')}</div>
    ${noResults()}
  </section>`;
}

/* ── recent payments — a short, non-filterable list (research D6: the page's
 * single [data-filter-form] is bound to the invoice list only) ──────────────── */
function paymentRow(p) {
  const fam = FAMILY_BY_ID[p.familyId];
  const inv = INVOICE_BY_ID[p.invoiceId];
  return `<div class="fin-pay-row">
    <span class="fp-date tabular" dir="ltr">${dateText(p.dateISO)}</span>
    ${fam ? `<a href="${familyHref()}" class="fp-family">${t(fam.guardian.nameKey)}</a>` : ''}
    <button type="button" class="link-chip" data-drawer="inv-${esc(inv.id)}">${icon('file-text', 'ico')}<span dir="ltr">${esc(inv.serial)}</span></button>
    <span class="fp-amount tabular"><span dir="ltr">${num(p.amount)}</span> ${t(p.unitKey)}</span>
    ${chip({ labelKey: p.methodKey, tone: 'neutral', icon: 'wallet' })}
    ${paymentStatusChip(p.statusId)}
  </div>`;
}

function paymentsSection() {
  return `<section class="mt-8">
    <div class="mb-3">
      <h2 class="section-title">${t('fin.sec.payments')} <span class="text-[12px] font-normal" style="color:var(--c-ink-3)">(${num(FINANCE_SUMMARY.payments.total)})</span></h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${t('fin.sec.paymentsSub')}</p>
    </div>
    <div class="flex items-center flex-wrap gap-2 mb-3">${gate('fin.pay2.add', 'wallet', 'fin.pay2.addReason')}${gate('fin.pay2.reconcile', 'check-circle', 'fin.pay2.reconcileReason')}</div>
    <div>${PAYMENTS.rows.map(paymentRow).join('')}</div>
  </section>`;
}

/* ── payroll & accounting — nine figure-free planned/backendRequired cards over
 * the existing reportCard route-less variant (Spec 008 precedent) ───────────── */
function plannedCard(r) {
  const reasonKey = r.availability === 'planned' ? 'fin.reason.comingSoon' : 'fin.reason.backend';
  return reportCard({ ...r, disabledReasonKey: reasonKey });
}

function plannedSection() {
  return `<section class="mt-8">
    <div class="mb-3 flex items-start justify-between gap-3 flex-wrap">
      <div>
        <h2 class="section-title">${t('fin.sec.planned')}</h2>
        <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${t('fin.sec.plannedSub')}</p>
      </div>
      <a href="${teacherPerfHref()}" class="link-more shrink-0">${t('fin.sec.teacherContext')} ${icon('arrow-left', 'ico ico-sm')}</a>
    </div>
    ${cardGrid(PLANNED_FINANCE.map(plannedCard), { cols: 'sm:grid-cols-2 lg:grid-cols-3' })}
  </section>`;
}

/* ── baked invoice drawer — one <template data-preview> per invoice ───────── */
function invoiceDrawer(inv) {
  const fam = FAMILY_BY_ID[inv.familyId];
  const course = inv.courseId ? COURSE_BY_ID[inv.courseId] : null;
  const group = inv.groupId ? GROUP_BY_ID[inv.groupId] : null;
  const studentLinks = (inv.studentIds || [])
    .map((sid) => STUDENT_BY_ID[sid])
    .filter(Boolean)
    .map((st) => `<a href="${studentHref()}" class="link-more">${t(st.nameKey)}</a>`)
    .join(' · ');

  const rows = [
    sheetRow(t('fin.drawer.serial'), `<span dir="ltr">${esc(inv.serial)}</span>`),
    fam ? sheetRow(t('fin.drawer.family'), `<a href="${familyHref()}" class="link-more">${t(fam.guardian.nameKey)}</a>`) : '',
    studentLinks ? sheetRow(t('fin.drawer.students'), studentLinks) : '',
    course ? sheetRow(t('fin.drawer.course'), `<a href="${courseHref()}" class="link-more">${t(course.titleKey)}</a>`) : '',
    group ? sheetRow(t('fin.drawer.group'), `<a href="${groupHref()}" class="link-more">${t(group.nameKey)}</a>`) : '',
    sheetRow(t('fin.drawer.month'), t(inv.monthKey)),
    sheetRow(t('fin.drawer.issued'), `<span dir="ltr">${dateText(inv.issuedISO)}</span>`),
    sheetRow(t('fin.drawer.due'), `<span dir="ltr">${dateText(inv.dueISO)}</span>`),
    sheetRow(t('fin.drawer.amount'), `<span dir="ltr">${num(inv.amount)}</span> ${t(inv.unitKey)}`),
    sheetRow('', `<span class="text-[11.5px]" style="color:var(--c-ink-3)">${t('fin.drawer.displayOnly')}</span>`),
    sheetRow(t('fin.drawer.status'), invoiceStatusChip(inv.statusId)),
    inv.noteKey ? sheetRow(t('fin.drawer.note'), t(inv.noteKey)) : '',
  ].join('');

  return previewTemplate('inv-' + inv.id, {
    title: inv.serial,
    headIcon: STATUS_ICON[inv.statusId],
    tone: STATUS_TONE[inv.statusId],
    bodyHTML: rows + invoiceDrawerActions(inv),
  });
}

/* ── Spec 030 — Salaries tab: STATUS-FIRST, FIGURE-FREE teacher + staff boards.
 * Name + status chip + period ONLY — NO pay amount anywhere. Generate/Approve/Mark-paid/
 * Export are backendRequired gates (the real payroll run needs the billing system). ── */
function salaryRow(s) {
  return `<div class="card p-3.5 flex items-center justify-between gap-3">
    <div class="min-w-0">
      <div class="font-bold text-ink text-[13.5px]">${t(s.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${esc(t('fin.sal.lblPeriod'))}: ${esc(t(s.periodKey))}</div>
    </div>
    ${salaryStatusChip(s.statusId)}
  </div>`;
}
function salaryBoard(role, titleKey) {
  const rows = SALARIES.filter((s) => s.role === role);
  return `<div class="mb-4">
    <h3 class="section-title mb-2">${esc(t(titleKey))}</h3>
    ${cardGrid(rows.map(salaryRow), { cols: 'sm:grid-cols-2 lg:grid-cols-3' })}
  </div>`;
}
function salariesSection() {
  const actions = `<div class="report-actions flex items-center flex-wrap gap-2 mb-4" role="group" aria-label="${esc(t('fin.sal.title'))}">
    ${gate('fin.sal.generate', 'settings', 'fin.sal.generateReason')}
    ${gate('fin.sal.approve', 'check-circle', 'fin.sal.approveReason')}
    ${gate('fin.sal.markPaid', 'wallet', 'fin.sal.markReason')}
    ${gate('fin.sal.exportRoster', 'download', 'fin.sal.exportReason')}
  </div>`;
  return `<div class="mb-3">
      <h2 class="section-title">${esc(t('fin.sal.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('fin.sal.sub'))}</p>
    </div>
    ${actions}
    ${salaryBoard('teacher', 'fin.sal.teacher')}
    ${salaryBoard('staff', 'fin.sal.staff')}`;
}

/* ── Spec 030 — Banks tab: name + status ONLY (no credentials/numbers/balances). Add/Edit =
 * backendRequired modal; Import statement / Reconcile = backendRequired gates. ── */
function bankRow(b) {
  return `<div class="card p-3.5 flex items-center justify-between gap-3">
    <div class="font-bold text-ink text-[13.5px]">${t(b.nameKey)}</div>
    ${bankStatusChip(b.statusId)}
  </div>`;
}
function banksSection() {
  const actions = `<div class="report-actions flex items-center flex-wrap gap-2 mb-4" role="group" aria-label="${esc(t('fin.bank.title'))}">
    ${button({ labelKey: 'fin.bank.add', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-modal-trigger data-modal-title-key="fin.bank.addTitle" data-modal-note-key="common.backendRequiredNote"' })}
    ${gate('fin.bank.import', 'file-text', 'fin.bank.importReason')}
    ${gate('fin.bank.reconcile', 'check-circle', 'fin.bank.reconcileReason')}
  </div>`;
  return `<div class="mb-3">
      <h2 class="section-title">${esc(t('fin.bank.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('fin.bank.sub'))}</p>
    </div>
    ${actions}
    ${cardGrid(BANKS.map(bankRow), { cols: 'sm:grid-cols-2 lg:grid-cols-3' })}`;
}

export function renderFinance() {
  // Overview tab — the existing Spec-009 finance content, behavior-identical (4 tiles + invoice
  // list + payments + the 9 figure-free planned cards + baked invoice drawers).
  const overview = `
    ${financeActions()}
    <div class="fin-tiles">${INVOICE_STATUS_ORDER.map(tile).join('')}</div>
    ${invoiceSection()}
    ${paymentsSection()}
    ${plannedSection()}
    ${INVOICES.rows.map(invoiceDrawer).join('')}
  `;
  // Spec 030 — fold the finance sub-domains into a tabbed hub (no new page; nav 0-diff).
  const views = tabs({
    group: 'finance', ariaKey: 'fin.tab.aria',
    items: [
      { id: 'overview', labelKey: 'fin.tab.overview', icon: 'wallet' },
      { id: 'salaries', labelKey: 'fin.tab.salaries', icon: 'trainers' },
      { id: 'banks', labelKey: 'fin.tab.banks', icon: 'lock' },
    ],
    panels: { overview, salaries: salariesSection(), banks: banksSection() },
  });
  return `
    ${pageHeader({ titleKey: 'finPage.title', subKey: 'finPage.subtitle' })}
    ${views}
  `;
}
