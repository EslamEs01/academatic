/* Family profile hub (Spec 004, US2) — a baked, tabbed PAGE (NOT a portal).
 * Banner (guardian + status + KPIs + actions) over the Spec 003 tabs widget:
 * Overview / Students / Schedule / Plan & Billing / Notes. The children are the
 * hero — each links to student.html. Schedule reuses scheduleAgenda + the shared
 * appointment drawer + a deep-link to schedule.html#view=timetable (no duplication).
 * One representative family is baked (Django later → family/<id>). */
import { FAMILIES, FAMILY_CATEGORIES, familyOf } from '../fixtures/families.js';
import { studentsOfFamily } from '../fixtures/students.js';
import { groupsOfStudent } from '../fixtures/groups.js';
import { outcomesOfFamily } from '../fixtures/attendance.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar, chip, button } from '../components/ui.js';
import { profileBanner } from '../components/profile-banner.js';
import { FAMILY_STATUS, familyStatusChip } from '../components/family-status.js';
import { tabs } from '../components/tabs.js';
import { previewTemplate, sheetRow, formDrawer } from '../components/preview-drawer.js';
import { field, optsFrom } from '../components/form-field.js';
import { GENDER_OPTS, LANGUAGE_OPTS } from '../fixtures/form-options.js';
import { scheduleAgenda } from '../components/schedule-agenda.js';
import { appointmentTemplate } from '../components/appointment-details.js';
import { attentionFlag } from '../components/attention-flag.js';
import { confirmAction } from '../components/confirm-modal.js';

const CAT_NAME = Object.fromEntries(FAMILY_CATEGORIES.map((c) => [c.id, c.nameKey]));
const BLOCK_BY_ID = {};
SCHEDULE_WEEK.forEach((d) => d.blocks.forEach((b) => { BLOCK_BY_ID[b.id] = { ...b, dayNameKey: d.nameKey }; }));

const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');

function apptItem(b, fam) {
  return {
    id: b.id, titleKey: b.titleKey, statusId: b.statusId, start: b.start, end: b.end,
    trainer: b.trainer, students: b.students, familyKey: fam.guardian.nameKey,
    subjectKey: `data.subj.${b.subject}`, levelKey: b.levelKey, roomKey: b.roomKey,
    roomLinkKey: b.roomLinkKey, attention: b.attention, dateKey: b.dayNameKey,
  };
}

function childRow(c) {
  return `<a href="${studentHref()}" class="people-row">
    ${avatar({ nameKey: c.nameKey, accent: c.accent, size: 'sm' })}
    <div class="min-w-0 flex-1">
      <div class="font-bold text-[13.5px] text-ink truncate">${t(c.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(c.levelKey)} · ${num(c.progress)}%</div>
    </div>
    ${familyStatusChip(c.statusId)}
    ${icon('chevronEnd', 'ico')}
  </a>`;
}

function overviewPanel(fam) {
  const g = fam.guardian;
  const contact = `<div class="info-card">
    <div class="ic-title">${icon('phone', 'ico')}<span>${t('fam.ov.contact')}</span></div>
    ${sheetRow(t('fam.ov.phone'), `<span dir="ltr">${t(g.contact.phoneKey)}</span>`)}
    ${sheetRow(t('fam.ov.email'), `<span dir="ltr">${t(g.contact.emailKey)}</span>`)}
    ${sheetRow(t('fam.ov.whatsapp'), `<span dir="ltr">${t(g.contact.whatsappKey)}</span>`)}
  </div>`;
  const details = `<div class="info-card">
    <div class="ic-title">${icon('map-pin', 'ico')}<span>${t('fam.ov.details')}</span></div>
    ${sheetRow(t('fam.ov.location'), `${t(fam.location.cityKey)} · ${t(fam.location.countryKey)}`)}
    ${sheetRow(t('fam.ov.joined'), t(fam.joinedDateKey))}
    ${sheetRow(t('fam.ov.category'), chip({ labelKey: CAT_NAME[fam.categoryId], tone: 'neutral', icon: 'filter' }))}
    <div class="mt-3">${button({ labelKey: 'fam.cat.reclass', variant: 'secondary', size: 'sm', icon: 'filter', attrs: 'data-drawer="fam-cat"' })}</div>
  </div>`;
  const attn = fam.attention
    ? `<div class="info-card" style="margin-top:16px">
        <div class="ic-title">${icon('alert-triangle', 'ico')}<span>${t('fam.ov.attentionTitle')}</span></div>
        ${attentionFlag(fam.attention)}
      </div>` : '';
  // Spec 005 — a calm fixture children follow-up hint + deep-link (no finance/credit claim)
  const fFollow = outcomesOfFamily(fam.id).filter((o) => o.followUp).length;
  const attHref = getLang() === 'en' ? 'attendance.en.html' : 'attendance.html';
  const attHint = `<div class="info-card" style="margin-top:16px">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="ic-title" style="margin-bottom:0">${icon('clipboard-check', 'ico')}<span>${t('att.familySignalTitle')}</span></div>
      <a href="${attHref}" class="link-more">${t('att.viewAttendance')} ${icon('arrow-left', 'ico ico-sm')}</a>
    </div>
    <p class="text-[13px] mt-2" style="color:var(--c-ink-2)">${fFollow ? t('att.familySignal', { k: num(fFollow) }) : t('att.familyNone')}</p>
  </div>`;
  // Spec 006 — a calm fixture children's courses & groups hint + deep-links (no finance/enrolment claim)
  const kids = studentsOfFamily(fam.id);
  const groupCount = new Set(kids.flatMap((k) => groupsOfStudent(k.id).map((gr) => gr.id))).size;
  const coursesHref = getLang() === 'en' ? 'courses.en.html' : 'courses.html';
  const groupsHref = getLang() === 'en' ? 'groups.en.html' : 'groups.html';
  const crsHint = `<div class="info-card" style="margin-top:16px">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="ic-title" style="margin-bottom:0">${icon('curricula', 'ico')}<span>${t('crs.familyTitle')}</span></div>
      <div class="flex items-center gap-2.5">
        <a href="${coursesHref}" class="link-more">${t('cur.title')} ${icon('arrow-left', 'ico ico-sm')}</a>
        <a href="${groupsHref}" class="link-more">${t('grp.title')} ${icon('arrow-left', 'ico ico-sm')}</a>
      </div>
    </div>
    <p class="text-[13px] mt-2" style="color:var(--c-ink-2)">${fam.activeCoursesCount ? t('crs.familyHint', { c: num(fam.activeCoursesCount), g: num(groupCount) }) : t('crs.familyNone')}</p>
  </div>`;
  return `<div class="grid gap-4 sm:grid-cols-2">${contact}${details}</div>${attHint}${crsHint}${attn}`;
}

function studentsPanel(kids) {
  const add = button({ labelKey: 'fam.child.add', variant: 'secondary', size: 'sm', icon: 'user-plus', attrs: 'data-drawer="fam-child"' });
  const body = kids.length
    ? kids.map(childRow).join('')
    : `<div class="empty-row">${t('fam.child.noneMsg')}</div>`;
  return `<div class="flex items-center justify-between gap-3 mb-3">
      <h2 class="section-title">${t('fam.child.title')} <span class="text-[13px] font-medium" style="color:var(--c-ink-3)">· ${t('fam.child.count', { n: num(kids.length) })}</span></h2>
      ${add}
    </div>${body}`;
}

function schedulePanel(blocks) {
  const link = `<a href="${schedHref()}" class="link-more">${t('fam.sch.viewInSchedule')} ${icon('arrow-left', 'ico ico-sm')}</a>`;
  const body = blocks.length ? scheduleAgenda(blocks) : `<div class="empty-row">${t('fam.sch.none')}</div>`;
  return `<div class="flex items-center justify-between gap-3 mb-3">
      <h2 class="section-title">${t('fam.sch.title')}</h2>${link}
    </div>${body}`;
}

function billingPanel(fam) {
  const p = fam.plan;
  /* Real money management stays out of scope (disabled-with-reason); the one honest
   * onward link points to the fixture-only Finance shell. */
  const financeHref = getLang() === 'en' ? 'finance.en.html' : 'finance.html';
  return `<div class="info-card">
    <div class="ic-title">${icon('wallet', 'ico')}<span>${t('fam.bill.title')}</span></div>
    ${sheetRow(t('fam.bill.planLabel'), t(p.labelKey))}
    ${sheetRow(t('fam.bill.rate'), `<span class="tabular">${num(p.hourRate)}</span> ${t(p.costTypeKey)}`)}
    ${sheetRow(t('fam.bill.cycle'), t('fam.bill.cycleVal'))}
    ${sheetRow(t('fam.bill.status'), chip({ labelKey: 'fam.bill.statusVal', tone: 'completed', icon: 'check-circle' }))}
    <div class="flex flex-wrap items-center gap-2 mt-4">
      ${button({ labelKey: 'fam.bill.manage', variant: 'secondary', size: 'sm', icon: 'wallet', disabled: true, reasonKey: 'fam.bill.reason' })}
      <a href="${financeHref}" class="link-more">${t('fam.bill.viewInvoices')} ${icon('arrow-left', 'ico ico-sm')}</a>
    </div>
    <div class="text-[12px] mt-2" style="color:var(--c-ink-3)">${t('fam.bill.note')}</div>
  </div>`;
}

function notesPanel(fam) {
  return `<div class="info-card">
    <div class="ic-title">${icon('file-text', 'ico')}<span>${t('fam.notes.title')}</span></div>
    <p class="narrative">${t(fam.notesKey)}</p>
    <div class="mt-4">${button({ labelKey: 'fam.notes.add', variant: 'secondary', size: 'sm', icon: 'edit', attrs: 'data-drawer="fam-note"' })}</div>
  </div>`;
}

/* Family-category reassignment (Spec 027, M-K / Spec 032, FC-05) — a display-only
 * assignment preview: a category select over the category list with the family's
 * current tier marked + member counts; the shared terminal action validates, then
 * shows the truthful backend-required state (no reassignment persists). Exported so the
 * families.html kebab host bakes the same drawer (once per page). */
export function famCatDrawer(fam) {
  const catOpts = FAMILY_CATEGORIES.map((c) => ({ value: c.id, labelKey: c.nameKey, selected: c.id === fam.categoryId }));
  const rows = FAMILY_CATEGORIES.map((c) => {
    const cur = c.id === fam.categoryId;
    const name = `${t(c.nameKey)}${cur ? ` <span class="chip tone-completed">${icon('check-circle', 'ico')}<span>${t('fam.cat.current')}</span></span>` : ''}`;
    return sheetRow(name, t('fam.cat.members', { n: num(c.count) }));
  }).join('');
  const body = `<div class="wiz-grid" style="margin-bottom:12px">${field({ labelKey: 'fam.ov.category', name: 'famCat-category', type: 'select', options: catOpts, full: true })}</div>
    <p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('fam.cat.reclassHint')}</p>
    ${rows}`;
  const footerHTML = `<button type="button" class="btn btn-primary btn-sm" data-interaction-submit data-reason-key="fam.cat.reclassReason" title="${esc(t('fam.cat.reclassReason'))}">${icon('check', 'ico ico-sm')}<span>${t('fam.cat.save')}</span></button>`;
  return previewTemplate('fam-cat', { titleKey: 'fam.cat.reclassTitle', headIcon: 'filter', tone: 'primary', bodyHTML: body, footerHTML });
}

/* Spec 032/044 (FC-04/FC-06) — the shared Edit-family form: editable frontend-only
 * controls (the excluded legacy fieldset stays out — see the must-omit contract)
 * plus one truthful formDrawer terminal action. Exported so the families.html
 * kebab host bakes the same drawer; triggers open it via data-drawer="fam-edit". */
export function famEditDrawer() {
  const statusOpts = optsFrom(Object.keys(FAMILY_STATUS), 'famStatus');
  const catOpts = FAMILY_CATEGORIES.map((c, i) => ({ value: c.id, labelKey: c.nameKey, selected: i === 0 }));
  const fields = [
    field({ labelKey: 'fam.form.firstName', name: 'famEdit-firstName' }),
    field({ labelKey: 'fam.form.lastName', name: 'famEdit-lastName' }),
    field({ labelKey: 'fam.form.firstNameAr', name: 'famEdit-firstNameAr' }),
    field({ labelKey: 'fam.form.lastNameAr', name: 'famEdit-lastNameAr' }),
    field({ labelKey: 'fam.ov.email', name: 'famEdit-email', placeholderKey: 'fam.wiz.ph.email' }),
    field({ labelKey: 'fam.ov.phone', name: 'famEdit-phone', placeholderKey: 'fam.wiz.ph.phone' }),
    field({ labelKey: 'fam.fStatus', name: 'famEdit-status', type: 'select', options: statusOpts }),
    field({ labelKey: 'fam.ov.category', name: 'famEdit-category', type: 'select', options: catOpts }),
    field({ labelKey: 'fam.wiz.f.notes', name: 'famEdit-notes', type: 'textarea', placeholderKey: 'fam.wiz.ph.notes', full: true }),
  ].join('');
  return formDrawer('fam-edit', { titleKey: 'fam.form.editTitle', headIcon: 'edit', fields });
}

/* Spec 032/044 (FC-07/FC-08) — both Add-child triggers open this shared form.
 * Editable frontend-only fields lead to the truthful backend-required terminal state. */
function famChildDrawer() {
  const fields = [
    field({ labelKey: 'fam.wiz.f.childName', name: 'famChild-name', placeholderKey: 'fam.wiz.ph.childName' }),
    field({ labelKey: 'fam.form.childNameAr', name: 'famChild-nameAr' }),
    field({ labelKey: 'fam.form.language', name: 'famChild-language', type: 'select', options: LANGUAGE_OPTS }),
    field({ labelKey: 'fam.form.gender', name: 'famChild-gender', type: 'select', options: GENDER_OPTS }),
    field({ labelKey: 'fam.form.birthDate', name: 'famChild-birthDate', placeholderKey: 'fam.form.birthDatePh' }),
    field({ labelKey: 'fam.form.teacherNote', name: 'famChild-teacherNote', type: 'textarea', full: true }),
    field({ labelKey: 'fam.form.adminNote', name: 'famChild-adminNote', type: 'textarea', full: true }),
  ].join('');
  return formDrawer('fam-child', { titleKey: 'fam.child.add', headIcon: 'user-plus', fields, ctaKey: 'common.add' });
}

/* Spec 032 (FC-09) — the Add-note form drawer: one real textarea + the gate. */
function famNoteDrawer() {
  const fields = field({ labelKey: 'fam.wiz.f.notes', name: 'famNote-note', type: 'textarea', placeholderKey: 'fam.wiz.ph.notes', full: true });
  return formDrawer('fam-note', { titleKey: 'fam.notes.add', headIcon: 'edit', fields, ctaKey: 'common.add' });
}

export function renderFamily() {
  const fam = familyOf('fam1') || FAMILIES.rows[0];
  const kids = studentsOfFamily(fam.id);
  const blockIds = [...new Set(kids.flatMap((k) => k.upcomingSessionIds))];
  const blocks = blockIds.map((id) => BLOCK_BY_ID[id]).filter(Boolean).slice(0, 6);

  const banner = profileBanner({
    avatarHTML: avatar({ nameKey: fam.guardian.nameKey, accent: fam.guardian.accent }),
    name: t(fam.guardian.nameKey),
    statusHTML: familyStatusChip(fam.statusId),
    metaHTML: chip({ labelKey: CAT_NAME[fam.categoryId], tone: 'neutral', icon: 'filter' }) + (fam.attention ? attentionFlag(fam.attention) : ''),
    kpis: [
      { value: num(kids.length), labelKey: 'fam.kpi.students' },
      { value: num(fam.activeCoursesCount), labelKey: 'fam.kpi.courses' },
      { value: num(blocks.length), labelKey: 'fam.kpi.sessions' },
      { value: t(fam.joinedDateKey), labelKey: 'fam.kpi.joined' },
    ],
    actionsHTML:
      button({ labelKey: 'fam.act.edit', variant: 'secondary', size: 'sm', icon: 'edit', attrs: 'data-drawer="fam-edit" data-modal-trigger data-modal-title-key="fam.act.edit"' })
      + button({ labelKey: 'fam.act.addChild', variant: 'secondary', size: 'sm', icon: 'user-plus', attrs: 'data-drawer="fam-child" data-modal-trigger data-modal-title-key="fam.act.addChild"' })
      + confirmAction({ labelKey: 'fam.act.suspend', icon: 'pause-circle', titleKey: 'fam.act.suspendTitle', msgKey: 'fam.act.suspendMsg', confirmKey: 'fam.act.suspendCta', toastKey: 'fam.act.suspendToast' })
      + confirmAction({ labelKey: 'fam.act.stop', variant: 'danger', icon: 'x-circle', danger: true, titleKey: 'fam.act.stopTitle', msgKey: 'fam.act.stopMsg', confirmKey: 'fam.act.stopCta', toastKey: 'fam.act.stopToast' }),
  });

  const views = tabs({
    group: 'family', ariaKey: 'fam.profileTitle',
    items: [
      { id: 'overview', labelKey: 'fam.tab.overview', icon: 'home' },
      { id: 'students', labelKey: 'fam.tab.students', icon: 'students' },
      { id: 'schedule', labelKey: 'fam.tab.schedule', icon: 'schedule' },
      { id: 'plan', labelKey: 'fam.tab.billing', icon: 'wallet' },
      { id: 'notes', labelKey: 'fam.tab.notes', icon: 'file-text' },
    ],
    panels: {
      overview: overviewPanel(fam),
      students: studentsPanel(kids),
      schedule: schedulePanel(blocks),
      plan: billingPanel(fam),
      notes: notesPanel(fam),
    },
  });

  const templates = blocks.map((b) => appointmentTemplate(apptItem(b, fam))).join('');

  return `${banner}${views}${templates}${famCatDrawer(fam)}${famEditDrawer()}${famChildDrawer()}${famNoteDrawer()}`;
}
