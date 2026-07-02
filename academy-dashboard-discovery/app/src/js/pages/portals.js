/* Spec 012 — the demo role-switch HUB (portals.html). The documented demo entry
 * to the three portal foundations. Honest framing: fixtures only, no login.
 * Not an admin nav page; the admin console links here from nowhere. */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

const en = () => getLang() === 'en';

const ROLES = [
  { role: 'student', icon: 'students', href: () => (en() ? 'student-portal.en.html' : 'student-portal.html'), tKey: 'prt.hub.student.t', dKey: 'prt.hub.student.d', personaKey: 'data.stud.a.name' },
  { role: 'family', icon: 'families', href: () => (en() ? 'family-portal.en.html' : 'family-portal.html'), tKey: 'prt.hub.family.t', dKey: 'prt.hub.family.d', personaKey: 'data.fam.fam1.name' },
  { role: 'teacher', icon: 'trainers', href: () => (en() ? 'teacher-portal.en.html' : 'teacher-portal.html'), tKey: 'prt.hub.teacher.t', dKey: 'prt.hub.teacher.d', personaKey: 'data.t.sara' },
];

function roleCard(r) {
  return `<a class="pt-hub-card" data-role="${esc(r.role)}" href="${r.href()}">
    <span class="pt-role-chip">${icon(r.icon, 'ico ico-sm')}<span>${esc(t('prt.role.' + r.role))}</span></span>
    <div>
      <div class="pt-card-title" style="font-size:17px">${esc(t(r.tKey))}</div>
      <p class="pt-card-sub">${esc(t(r.dKey))}</p>
    </div>
    <div class="pt-card-sub">${esc(t('prt.hub.personaNote'))} <strong>${esc(t(r.personaKey))}</strong></div>
    <span class="pt-hub-open">${esc(t('prt.hub.open'))} ${icon('arrow-left', 'ico ico-sm')}</span>
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

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.shell.demoNote'))}</span></div>
  `;
}
