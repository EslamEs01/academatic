/* Spec 025 — TEACHER PROFILE (sara). The teacher's own account page: an identity
 * summary (name + role + contact), her teaching subjects / specializations as
 * labeled tags, authored availability windows (day + from/to, display-only), and
 * teaching preference chips (interface language · theme · contact channel). The only
 * write surface is EXACTLY three honest backendRequired gates — photo change ·
 * profile save · password change — each a labeled non-anchor note (no forms, no
 * inputs, no fake save, no body anchors). Display-only throughout; and — the standing
 * teacher hard rule — ZERO figure-bearing or flagged vocabulary anywhere (copy AND
 * comments; the extended token set). */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from '../components/ui.js';
import { pageHead, secHead, plannedCard } from '../components/portal-page.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { PORTAL_PERSONAS } from '../fixtures/portal.js';

const P = 'prt.tch.pg.profile';

const me = () => TEACHERS.rows.find((x) => x.id === PORTAL_PERSONAS.teacher);

/* a label / value account row (display-only) */
function row(labelKey, valueKey) {
  return `<div class="pt-prof-row"><span class="pt-prof-k">${esc(t(labelKey))}</span><span class="pt-prof-v">${esc(t(valueKey))}</span></div>`;
}

/* a preference row — icon + label on the left, authored value on the right */
function prefRow(ic, labelKey, valueKey) {
  return `<div class="pt-prof-row"><span class="pt-prof-k">${icon(ic, 'ico ico-sm')} ${esc(t(labelKey))}</span><span class="pt-prof-v">${esc(t(valueKey))}</span></div>`;
}

/* an availability window line — a calendar glyph + an authored day/from/to string */
function availLine(key) {
  return `<div class="pt-card-sub" style="display:flex;gap:8px;align-items:center;padding:5px 0">${icon('calendar', 'ico ico-sm')}<span>${esc(t(key))}</span></div>`;
}

export function renderTeacherProfile() {
  const tr = me();
  const subjectKeys = [`${P}.subj1`, `${P}.subj2`, `${P}.subj3`];
  const availKeys = [`${P}.avail1`, `${P}.avail2`, `${P}.avail3`];
  return `
    ${pageHead(`${P}.title`, `${P}.sub`)}

    <section class="pt-section">
      ${secHead('user', `${P}.identTitle`)}
      <div class="pt-card">
        <div class="pt-card-row">
          ${avatar({ nameKey: tr.nameKey, accent: 'teal' })}
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(tr.nameKey))}</div>
            <div class="pt-card-sub">${esc(t('prt.role.teacher'))}</div>
          </div>
          <span class="pt-role-chip">${icon('trainers', 'ico ico-sm')}<span>${esc(t('prt.role.teacher'))}</span></span>
        </div>
        ${row(`${P}.contactLabel`, `${P}.contactVal`)}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('curricula', `${P}.subjectsTitle`)}
      <div class="pt-card">
        <div class="pt-tags">${subjectKeys.map((k) => `<span class="pt-tag is-accent">${icon('curricula', 'ico ico-sm')}${esc(t(k))}</span>`).join('')}</div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', `${P}.availTitle`)}
      <div class="pt-card">${availKeys.map(availLine).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('settings', `${P}.prefTitle`)}
      <div class="pt-card">
        ${prefRow('globe', `${P}.prefLang`, `${P}.prefLangVal`)}
        ${prefRow('sun', `${P}.prefTheme`, `${P}.prefThemeVal`)}
        ${prefRow('mail', `${P}.prefContact`, `${P}.prefContactVal`)}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('lock', `${P}.editTitle`)}
      <div class="pt-cards">
        ${plannedCard({ icon: 'materials', titleKey: `${P}.gPhotoT`, descKey: `${P}.gPhoto`, availability: 'backendRequired' })}
        ${plannedCard({ icon: 'user', titleKey: `${P}.gSaveT`, descKey: `${P}.gSave`, availability: 'backendRequired' })}
        ${plannedCard({ icon: 'help', titleKey: `${P}.gPassT`, descKey: `${P}.gPass`, availability: 'backendRequired' })}
      </div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
