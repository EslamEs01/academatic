/* Spec 018 → Spec 022 — FAMILY / GUARDIAN HOME, reworked into a LIVING guardian
 * cockpit: a violet identity hero (guardian + children context, counters that tell
 * a story) · a living day rail across the children (now/next/done stops) · the five
 * child cards with progress movement + latest-signal lines + the REAL drill-downs ·
 * billing/requests as safe STATUS STORIES · guided gate panels · quick links. The
 * content facts are unchanged (every number authored, display-only); only the
 * presentation transforms. THE ZERO-PAY HARD LINE holds (status-only billing, no
 * rendered figures ever); the body's only anchors are the five child drill-downs
 * + the seven quick-tile sibling links (12 total, unchanged); zero form controls. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar } from '../components/ui.js';
import { statusChip } from '../components/status-chip.js';
import { familyStatusChip } from '../components/family-status.js';
import { FAMILIES } from '../fixtures/families.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { FAMILY_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS, ROLE_NAV, CHILD_ORDER, LIVING_HOME } from '../fixtures/portal.js';
import { idHero, dayRail, storyRow, guidePanel } from '../components/portal-page.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const enSuffix = () => (getLang() === 'en' ? '.en' : '');
const fam = () => FAMILIES.rows.find((f) => f.id === PORTAL_PERSONAS.family);
const STUD = Object.fromEntries(STUDENTS.rows.map((s) => [s.id, s]));
const childName = (id) => t(STUD[id].nameKey);
const orderedKids = () => CHILD_ORDER.map((id) => STUD[id]);
const todaySessions = () => SESSIONS_FULL.rows.filter((r) => ['sara', 'khalid'].includes(r.trainer.id)).slice(0, 3);
const planned = (id) => PORTAL_PLANNED.family.find((p) => p.id === id);

function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}

/* Spec 020 — status-aware quick tiles: an `implemented` destination is a REAL link
 * (all seven family pages exist); the pt-lift gives the honest hover affordance. */
function quickTiles(role) {
  const en = getLang() === 'en';
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) => e.status === 'implemented'
    ? `<a class="pt-qtile pt-lift" href="${e.page}${en ? '.en' : ''}.html">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span></a>`
    : `<div class="pt-qtile is-planned">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span><span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
}

/* ── living day rail: today's sessions across the children (now / next stops) ── */
function railStops(today) {
  return today.map((r) => {
    const childId = FAMILY_PREVIEW.todayChildren[r.id];
    return {
      time: r.time,
      state: r.statusId === 'live' ? 'now' : 'next',
      tag: childId ? `<span class="pt-stop-tag">${icon('user', 'ico ico-sm')}${esc(childName(childId))}</span>` : '',
      chip: statusChip(r.statusId),
      title: esc(t(r.titleKey)),
      sub: `${esc(t(r.trainer.nameKey))} · ${esc(t(r.roomKey))}`,
    };
  });
}

/* ── child card: alive — progress movement + latest-signal line + REAL drill-down ── */
function childCard(s) {
  const href = `family-child${enSuffix()}.html#child=${s.id}`;
  return `<div class="pt-card pt-lift">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(FAMILY_PREVIEW.kidHints[s.id]))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>
    <div class="pt-gauge">
      <div class="pt-bar is-live"><span style="width:${s.progress}%"></span></div>
      <span class="tabular pt-card-sub" style="font-weight:700">${num(s.progress)}${pctSign()}</span>
    </div>
    <a class="pt-drill" href="${href}">${icon('user', 'ico ico-sm')}<span>${esc(t('prt.band.openChild'))}</span></a>
  </div>`;
}

export function renderFamilyPortal() {
  const f = fam();
  const children = orderedKids();
  const today = todaySessions();
  const lv = LIVING_HOME.family;

  return `
    ${idHero({ nameKey: f.guardian.nameKey, accent: 'violet', tone: 'primary', emoji: lv.hero.emoji, subKey: lv.hero.subKey, counters: lv.hero.counters })}

    <section class="pt-section">
      ${secHead('sessions', 'prt.fam.todayTitle', 'prt.fam.todayHint')}
      ${dayRail(railStops(today))}
    </section>

    <section class="pt-section">
      ${secHead('families', 'prt.band.famCore', 'prt.band.famCoreHint', ` <span class="pt-role-chip" style="font-size:11px">${num(children.length)}</span>`)}
      <div class="pt-cards">${children.map(childCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('wallet', 'prt.band.famPreview', 'prt.band.famPreviewHint')}
      ${storyRow(lv.stories)}
      <div class="pt-cards">
        ${guidePanel(planned('billingGate'))}
        ${guidePanel(planned('meetingRequest'))}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('grid', 'prt.band.quickTitle', 'prt.band.quickHint')}
      ${quickTiles('family')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
