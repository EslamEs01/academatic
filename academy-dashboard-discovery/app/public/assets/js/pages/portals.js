/* Spec 012 — the demo role-switch HUB (portals.html). The documented demo entry
 * to the role dashboards. Honest framing: fixtures only, no login.
 * Spec 022 — the CORRECTED role model (Spec 021 DEC-001/002/004): the hub leads
 * with the THREE primary roles (Family · Teacher here + the admin console band);
 * the student surface is DEMOTED to a secondary child-view preview inside the
 * family journey (a real link to the preserved student pages — never a fourth
 * equal role card). No page is deleted; the hub stays a no-auth demo device. */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { LIVING_HOME } from '../fixtures/portal.js';

const en = () => getLang() === 'en';

/* the two primary ROLE dashboards reachable as peer cards (Admin is the console
 * band below; Student is no longer a primary role — see childViewCard). */
const ROLES = [
  { role: 'family', icon: 'families', href: () => (en() ? 'family-portal.en.html' : 'family-portal.html'), tKey: 'prt.hub.family.t', dKey: 'prt.hub.family.d', personaKey: 'data.fam.fam1.name' },
  { role: 'teacher', icon: 'trainers', href: () => (en() ? 'teacher-portal.en.html' : 'teacher-portal.html'), tKey: 'prt.hub.teacher.t', dKey: 'prt.hub.teacher.d', personaKey: 'data.t.sara' },
];

function roleCard(r) {
  return `<a class="pt-hub-card pt-lift" data-role="${esc(r.role)}" href="${r.href()}">
    <span class="pt-role-chip">${icon(r.icon, 'ico ico-sm')}<span>${esc(t('prt.role.' + r.role))}</span></span>
    <div>
      <div class="pt-card-title" style="font-size:17px">${esc(t(r.tKey))}</div>
      <p class="pt-card-sub">${esc(t(r.dKey))}</p>
    </div>
    <div class="pt-card-sub">${esc(t('prt.hub.personaNote'))} <strong>${esc(t(r.personaKey))}</strong></div>
    <span class="pt-hub-open">${esc(t('prt.hub.open'))} ${icon('arrow-left', 'ico ico-sm')}</span>
  </a>`;
}

/* the DEMOTED child-view entry — a real link to the preserved student pages,
 * framed as a preview inside the family journey (Spec 021 DEC-004/006). */
function childViewCard() {
  const cv = LIVING_HOME.hub.childView;
  const href = `${cv.page}${en() ? '.en' : ''}.html`;
  return `<a class="pt-card pt-childview pt-lift" href="${href}">
    <div class="pt-card-row">
      <span class="medallion m-soft tone-sky">${icon(cv.icon, 'ico')}</span>
      <div class="min-w-0" style="flex:1">
        <div class="pt-card-title">${esc(t(cv.tKey))}</div>
        <p class="pt-card-sub">${esc(t(cv.dKey))}</p>
      </div>
      <span class="pt-hub-open">${esc(t(cv.openKey))} ${icon('arrow-left', 'ico ico-sm')}</span>
    </div>
  </a>`;
}

export function renderPortalsHub() {
  const dashHref = en() ? 'dashboard.en.html' : 'dashboard.html';
  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.hub.headline'))}</h1>
      <p class="pt-hero-sub">${esc(t('prt.hub.sub'))}</p>
    </section>

    <div class="pt-hub-grid">${ROLES.map(roleCard).join('')}</div>

    <section class="pt-card">
      <div class="pt-card-row">
        <span class="medallion m-soft tone-primary">${icon('layers', 'ico')}</span>
        <div class="min-w-0" style="flex:1">
          <div class="pt-card-title">${esc(t('prt.hub.adminT'))}</div>
          <p class="pt-card-sub">${esc(t('prt.hub.adminD'))}</p>
        </div>
        <a class="btn btn-secondary btn-sm" href="${dashHref}">${icon('home', 'ico ico-sm')}<span>${esc(t('prt.hub.adminOpen'))}</span></a>
      </div>
    </section>

    ${childViewCard()}

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.shell.demoNote'))}</span></div>
  `;
}
