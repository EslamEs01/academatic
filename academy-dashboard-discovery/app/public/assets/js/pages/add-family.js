/* Add-Family wizard (Spec 004, US3) — a baked, multi-step demo flow. ALL steps
 * are pre-rendered static HTML; runtime JS only toggles the visible step
 * (data-step-next/prev). Every field is labeled (form-field). "Save" = demo toast.
 * NO form library, NO validation, NO persistence. Maps to Django {% if step %}. */
import { t, num } from '../i18n.js';
import { pageHeader } from '../components/page-header.js';
import { wizard } from '../components/wizard.js';
import { field, optsFrom } from '../components/form-field.js';
import { button } from '../components/ui.js';
import { esc } from '../dom.js';
import { FAMILY_STATUS } from '../components/family-status.js';
import { FAMILY_CATEGORIES } from '../fixtures/families.js';

const LEVEL_OPTS = optsFrom(['foundation', 'l1', 'l2', 'l3', 'advanced'], 'data.crs.lvl');
const SUBJ_OPTS = optsFrom(['math', 'arabic', 'programming', 'physics', 'english', 'science'], 'data.subj');
const STATUS_OPTS = Object.keys(FAMILY_STATUS).map((k, i) => ({ value: k, labelKey: `famStatus.${k}`, selected: i === 0 }));
const CAT_OPTS = FAMILY_CATEGORIES.map((c, i) => ({ value: c.id, labelKey: c.nameKey, selected: i === 0 }));

const identityStep = `<div class="wiz-grid">
  ${field({ labelKey: 'fam.wiz.f.guardianName', name: 'guardianName', placeholderKey: 'fam.wiz.ph.guardianName', full: true })}
  ${field({ labelKey: 'fam.wiz.f.email', name: 'email', placeholderKey: 'fam.wiz.ph.email' })}
  ${field({ labelKey: 'fam.wiz.f.status', name: 'status', type: 'select', options: STATUS_OPTS })}
  ${field({ labelKey: 'fam.wiz.f.category', name: 'category', type: 'select', options: CAT_OPTS, full: true })}
</div>`;

const contactStep = `<div class="wiz-grid">
  ${field({ labelKey: 'fam.wiz.f.phone', name: 'phone', placeholderKey: 'fam.wiz.ph.phone' })}
  ${field({ labelKey: 'fam.wiz.f.whatsapp', name: 'whatsapp', placeholderKey: 'fam.wiz.ph.phone' })}
  ${field({ labelKey: 'fam.wiz.f.country', name: 'country', valueKey: 'data.fam.country' })}
  ${field({ labelKey: 'fam.wiz.f.city', name: 'city', placeholderKey: 'fam.wiz.ph.city' })}
  ${field({ labelKey: 'fam.wiz.f.timezone', name: 'timezone', valueKey: 'data.fam.tz', full: true })}
</div>`;

function childRow(n) {
  return `<div class="child-row">
    <div class="text-[12px] font-bold mb-2.5" style="color:var(--c-ink-3)">${t('fam.wiz.children.row', { n: num(n) })}</div>
    <div class="wiz-grid">
      ${field({ labelKey: 'fam.wiz.f.childName', name: `child-${n}-name`, placeholderKey: 'fam.wiz.ph.childName', full: true })}
      ${field({ labelKey: 'fam.wiz.f.childLevel', name: `child-${n}-level`, type: 'select', options: LEVEL_OPTS })}
      ${field({ labelKey: 'fam.wiz.f.childSubject', name: `child-${n}-subject`, type: 'select', options: SUBJ_OPTS })}
    </div>
  </div>`;
}
const childrenStep = `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('fam.wiz.children.hint')}</p>
  ${childRow(1)}${childRow(2)}
  <div class="mt-3">${button({ labelKey: 'fam.wiz.children.add', variant: 'secondary', size: 'sm', icon: 'user-plus', attrs: `data-demo-action data-toast="${esc(t('fam.wiz.children.addToast'))}"` })}</div>`;

const billingStep = `<div class="wiz-grid">
  ${field({ labelKey: 'fam.wiz.f.planType', name: 'planType', type: 'select', options: CAT_OPTS })}
  ${field({ labelKey: 'fam.wiz.f.hourRate', name: 'hourRate', type: 'number', placeholderKey: 'fam.wiz.ph.hourRate' })}
  ${field({ labelKey: 'fam.wiz.f.cycle', name: 'cycle', valueKey: 'fam.bill.cycleVal', full: true })}
</div>
<div class="flex flex-wrap items-center gap-2 mt-4">
  ${button({ labelKey: 'fam.bill.manage', variant: 'secondary', size: 'sm', icon: 'wallet', disabled: true, reasonKey: 'fam.bill.reason' })}
  <span class="text-[12px]" style="color:var(--c-ink-3)">${t('fam.bill.note')}</span>
</div>`;

function reviewGroup(titleKey, valueHTML) {
  return `<div class="review-group"><div class="rg-title">${t(titleKey)}</div><div class="text-[13px] font-bold text-ink">${valueHTML}</div></div>`;
}
const reviewStep = `<p class="text-[12.5px] mb-3.5" style="color:var(--c-ink-3)">${t('fam.wiz.review.note')}</p>
  ${reviewGroup('fam.wiz.review.guardian', t('fam.wiz.ph.guardianName'))}
  ${reviewGroup('fam.wiz.review.contact', `<span dir="ltr">${t('fam.wiz.ph.phone')}</span> · <span dir="ltr">${t('fam.wiz.ph.email')}</span>`)}
  ${reviewGroup('fam.wiz.review.children', t('fam.wiz.review.childrenVal'))}
  ${reviewGroup('fam.wiz.review.plan', `${t('fam.cat.standard')} · <span class="tabular">${num(60)}</span> ${t('fam.plan.perHour')}`)}`;

export function renderAddFamily() {
  const steps = [
    { id: 'identity', labelKey: 'fam.wiz.step.identity', descKey: 'fam.wiz.stepDesc.identity', bodyHTML: identityStep },
    { id: 'contact', labelKey: 'fam.wiz.step.contact', descKey: 'fam.wiz.stepDesc.contact', bodyHTML: contactStep },
    { id: 'children', labelKey: 'fam.wiz.step.children', descKey: 'fam.wiz.stepDesc.children', bodyHTML: childrenStep },
    { id: 'billing', labelKey: 'fam.wiz.step.billing', descKey: 'fam.wiz.stepDesc.billing', bodyHTML: billingStep },
    { id: 'review', labelKey: 'fam.wiz.step.review', descKey: 'fam.wiz.stepDesc.review', bodyHTML: reviewStep },
  ];
  return `
    ${pageHeader({ titleKey: 'fam.wiz.title', subKey: 'fam.wiz.sub' })}
    ${wizard({ steps, saveKey: 'fam.wiz.save', saveToastKey: 'fam.wiz.savedToast' })}
  `;
}
