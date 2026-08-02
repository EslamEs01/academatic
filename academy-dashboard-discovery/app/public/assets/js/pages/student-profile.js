/* Spec 019 — STUDENT PROFILE (st1). Compact: identity card, academic rows, a safe
 * guardian line, preference chips, and EXACTLY two backendRequired gates (photo
 * upload · profile save — the legacy profile-edit page's write surface). Display-only:
 * zero forms, zero inputs, zero fake save; zero body anchors. (Spec 043 — the child-view
 * account/login gate is removed: a child is not an account holder.) */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { familyStatusChip } from '../components/family-status.js';
import { pageHead, secHead, plannedCard } from '../components/portal-page.js';
import { STUDENT_BY_ID, GROUP_BY_ID } from '../fixtures/students.js';
import { FAMILIES } from '../fixtures/families.js';
import { STUDENT_PAGES, PORTAL_PERSONAS } from '../fixtures/portal.js';

const P = 'prt.stu.pg.prof';

function row(labelKey, valueHTML) {
  return `<div class="pt-prof-row"><span class="pt-prof-k">${esc(t(labelKey))}</span><span class="pt-prof-v">${valueHTML}</span></div>`;
}

function prefRow(pr) {
  return `<div class="pt-prof-row"><span class="pt-prof-k">${icon(pr.icon, 'ico ico-sm')} ${esc(t(pr.labelKey))}</span><span class="pt-prof-v">${esc(t(pr.valueKey))}</span></div>`;
}

export function renderStudentProfile() {
  const s = STUDENT_BY_ID[PORTAL_PERSONAS.student];
  const e0 = s.enrollments[0];
  const groupKey = s.groupIds && s.groupIds.length ? GROUP_BY_ID[s.groupIds[0]].nameKey : null;
  const fam = FAMILIES.rows.find((f) => f.id === s.familyId);
  return `
    ${pageHead(`${P}.title`, `${P}.sub`)}

    <section class="pt-section">
      ${secHead('user', `${P}.identityTitle`)}
      <div class="pt-card">
        <div class="pt-card-row">
          ${avatar({ nameKey: s.nameKey, accent: s.accent })}
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(s.nameKey))}</div>
            <div class="pt-card-sub">${esc(t(s.levelKey))} · ${esc(t(s.subjectKey))}</div>
          </div>
          ${familyStatusChip(s.statusId)}
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('curricula', `${P}.acadTitle`)}
      <div class="pt-card">
        ${row(`${P}.level`, esc(t(s.levelKey)))}
        ${row(`${P}.subject`, esc(t(s.subjectKey)))}
        ${row(`${P}.course`, esc(t(e0.courseTitleKey)))}
        ${row(`${P}.group`, groupKey ? esc(t(groupKey)) : '—')}
        ${row(`${P}.teacher`, esc(t(e0.teacherNameKey)))}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('families', `${P}.guardianTitle`)}
      <div class="pt-card">
        ${row(`${P}.guardian`, esc(t(fam.guardian.nameKey)))}
        ${row(`${P}.city`, esc(t(fam.location.cityKey)))}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('settings', `${P}.prefTitle`)}
      <div class="pt-card">${STUDENT_PAGES.profile.prefs.map(prefRow).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-cards">${STUDENT_PAGES.profile.gates.map(plannedCard).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
