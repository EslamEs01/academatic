/* Spec 020 — FAMILY BILLING (fam1) — the STATUS-FIRST rebuild of the legacy billing
 * idea under THE ZERO-PAY HARD LINE. Kept: the hour-quota model (hours are session
 * units — figure-safe), per-child subscription status, invoice rows. Deliberately
 * dropped: the legacy figure column and every settlement affordance — the fixture
 * invoice shape carries serial/month/due/course/status ONLY, and every financial
 * action is a labeled backendRequired gate pointing at the academy administration.
 * Display-only; zero forms; zero body anchors. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar, chip } from '../components/ui.js';
import { familyStatusChip } from '../components/family-status.js';
import { pageHead, secHead, plannedCard, gateNote } from '../components/portal-page.js';
import { courseOf } from '../fixtures/courses.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { FAMILY_PAGES, PORTAL_PLANNED, CHILD_ORDER } from '../fixtures/portal.js';

const B = 'prt.fam.pg.bill';
const billingGate = () => PORTAL_PLANNED.family.find((p) => p.id === 'billingGate');

function quotaTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}

function subRow(row) {
  const s = STUDENT_BY_ID[row.childId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(row.subscriptionKey))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>
  </div>`;
}

function invoiceCard(inv) {
  const st = inv.statusTone === 'completed'
    ? chip({ labelKey: `${B}.stSettled`, tone: 'completed', icon: 'check-circle' })
    : chip({ labelKey: `${B}.stUpcoming`, tone: 'upcoming', icon: 'clock' });
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'file-text', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(inv.serialKey))}</div>
        <div class="pt-card-sub">${esc(t(`${B}.month`))}: ${esc(t(inv.monthKey))} · ${esc(t(`${B}.due`))}: ${esc(t(inv.dueKey))}</div>
        <div class="pt-card-sub">${esc(t(courseOf(inv.courseId).titleKey))}</div>
      </div>
      ${st}
    </div>
  </div>`;
}

export function renderFamilyBilling() {
  const q = FAMILY_PAGES.quota;
  return `
    ${pageHead(`${B}.title`, `${B}.sub`)}

    <section class="pt-section">
      ${secHead('clock', `${B}.quotaTitle`, 'prt.band.overviewHint')}
      <div class="pt-cards pt-cards-3">
        ${quotaTile('certificates', 'primary', q.totalH, `${B}.qTotal`)}
        ${quotaTile('check-circle', 'success', q.takenH, `${B}.qTaken`)}
        ${quotaTile('clock', 'sky', q.remainH, `${B}.qRemain`)}
      </div>
      <div class="pt-card">
        <div class="pt-card-row">${chip({ labelKey: 'prt.fam.billSettled', tone: 'completed', icon: 'check-circle' })}</div>
        <p class="pt-card-sub">${esc(t('prt.fam.billReassure'))}</p>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('families', `${B}.subsTitle`, 'prt.fam.subsHint')}
      <div class="pt-note" style="padding:10px 12px">${icon('certificates', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.subsPlan'))}:</strong> ${esc(t('data.fam.fam1.plan'))}</span></div>
      <div class="pt-cards">${CHILD_ORDER.map((id) => subRow(FAMILY_PAGES.children.find((r) => r.childId === id))).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('file-text', `${B}.invTitle`, `${B}.invHint`)}
      <div class="pt-cards">${FAMILY_PAGES.billing.invoices.map(invoiceCard).join('')}</div>
      <div class="pt-cards">${plannedCard(billingGate())}</div>
      ${gateNote(`${B}.adminNote`)}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
