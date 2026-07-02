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
import { medallion, chip } from '../components/ui.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { noResults } from '../components/states.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { reportCard } from '../components/report-card.js';
import { financeActions, invoiceRowActions, invoiceDrawerActions } from '../components/finance-actions.js';
import { invoiceStatusChip, paymentStatusChip, INVOICE_STATUS_ORDER } from '../components/finance-status.js';
import { INVOICES, PAYMENTS, FINANCE_SUMMARY, PLANNED_FINANCE, INVOICE_BY_ID, invoicesOfFamily } from '../fixtures/finance.js';
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

export function renderFinance() {
  return `
    ${pageHeader({ titleKey: 'finPage.title', subKey: 'finPage.subtitle' })}
    ${financeActions()}
    <div class="fin-tiles">${INVOICE_STATUS_ORDER.map(tile).join('')}</div>
    ${invoiceSection()}
    ${paymentsSection()}
    ${plannedSection()}
    ${INVOICES.rows.map(invoiceDrawer).join('')}
  `;
}
