/* Spec 020 — FAMILY PROFILE (fam1). The guardian's account: identity card, the
 * RETAINED 014 account rows re-homed, a display-only children summary, preference
 * chips, and EXACTLY the three legacy-evidenced backendRequired gates (photo upload
 * · account save · password change — the profile-edit page's write surface; the
 * legacy VIEW page was a 500). Zero forms, zero inputs, zero body anchors. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from '../components/ui.js';
import { pageHead, secHead, plannedCard } from '../components/portal-page.js';
import { FAMILIES } from '../fixtures/families.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { FAMILY_PAGES, PORTAL_PERSONAS, CHILD_ORDER } from '../fixtures/portal.js';

const P = 'prt.fam.pg.prof';

function row(labelKey, valueHTML) {
  return `<div class="pt-prof-row"><span class="pt-prof-k">${esc(t(labelKey))}</span><span class="pt-prof-v">${valueHTML}</span></div>`;
}

function prefRow(pr) {
  return `<div class="pt-prof-row"><span class="pt-prof-k">${icon(pr.icon, 'ico ico-sm')} ${esc(t(pr.labelKey))}</span><span class="pt-prof-v">${esc(t(pr.valueKey))}</span></div>`;
}

export function renderFamilyProfile() {
  const f = FAMILIES.rows.find((x) => x.id === PORTAL_PERSONAS.family);
  const kidNames = CHILD_ORDER.map((id) => esc(t(STUDENT_BY_ID[id].nameKey))).join(' · ');
  return `
    ${pageHead(`${P}.title`, `${P}.sub`)}

    <section class="pt-section">
      ${secHead('user', `${P}.identityTitle`)}
      <div class="pt-card">
        <div class="pt-card-row">
          ${avatar({ nameKey: f.guardian.nameKey, accent: 'violet' })}
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(f.guardian.nameKey))}</div>
            <div class="pt-card-sub">${esc(t('prt.role.family'))}</div>
          </div>
          <span class="pt-role-chip">${icon('families', 'ico ico-sm')}<span>${esc(t('prt.role.family'))}</span></span>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('settings', `${P}.acctTitle`)}
      <div class="pt-card">
        ${row('prt.fam.acct.guardian', esc(t(f.guardian.nameKey)))}
        ${row('prt.fam.acct.email', esc(t(f.contact.emailKey)))}
        ${row('prt.fam.acct.city', esc(t(f.location.cityKey)))}
        ${row('prt.fam.acct.joined', esc(t(f.joinedDateKey)))}
        ${row('prt.fam.acct.children', `<span class="tabular">${num(CHILD_ORDER.length)}</span>`)}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('families', `${P}.kidsTitle`)}
      <div class="pt-card">
        <div class="pt-card-title" style="font-size:13px">${esc(t(`${P}.kidsLine`))}</div>
        <p class="pt-card-sub">${kidNames}</p>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('settings', `${P}.prefTitle`)}
      <div class="pt-card">${FAMILY_PAGES.profile.prefs.map(prefRow).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-cards">${FAMILY_PAGES.profile.gates.map(plannedCard).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
