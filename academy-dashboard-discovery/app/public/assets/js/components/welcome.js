/* Compact welcome/top zone — gradient hero + small stat cards + attendance ring.
 * Not an oversized empty hero. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { button } from './ui.js';
import { ring } from './sparkline.js';

function formatDate(iso) {
  const locale = getLang() === 'ar' ? 'ar-EG' : 'en-GB';
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  const time = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(d);
  return `${date} · ${time}`;
}

function statCard(labelKey, value, { live = false } = {}) {
  const dot = live ? `<span class="live-dot" style="background:var(--c-teal);width:8px;height:8px;border-radius:999px;display:inline-block;animation:livepulse 2s var(--ease) infinite"></span>` : '';
  return `<div class="card p-4 flex flex-col justify-between" style="min-height:104px">
    <div class="flex items-center gap-1.5 text-[12.5px] font-bold" style="color:var(--c-ink-3)">${dot}<span>${t(labelKey)}</span></div>
    <div class="kpi-value tabular" style="font-size:34px">${num(value)}</div>
  </div>`;
}

export function welcomeZone(w) {
  const hero = `<div class="relative overflow-hidden rounded-card p-6 md:p-7" style="background:var(--g-hero);color:#fff;box-shadow:0 10px 24px rgba(60,50,166,.35)">
    <svg viewBox="0 0 24 24" class="absolute" style="inset-inline-end:-12px;inset-block-start:-6px;width:190px;height:190px;opacity:.13;color:#fff" aria-hidden="true"><use href="#i-graduation-cap"></use></svg>
    <div class="relative">
      <p class="text-[12.5px] font-medium mb-2" style="color:rgba(255,255,255,.82)">${formatDate(w.date)}</p>
      <h1 class="font-bold mb-2" style="font-size:26px;letter-spacing:-.6px">${t(w.greetingKey)}</h1>
      <p class="text-[13.5px] mb-5 max-w-md" style="color:rgba(255,255,255,.9)">${t('welcome.summary', { today: num(w.todaySessions), live: num(w.liveNow) })}</p>
      <div class="flex flex-wrap gap-2.5">
        ${button({ labelKey: w.primaryActionKey, variant: 'on-grad', icon: 'plus', attrs: 'data-action="new-session"' })}
        ${button({ labelKey: w.secondaryActionKey, variant: 'ghost-grad', icon: 'calendar', href: (getLang() === 'en' ? './schedule.en.html#view=timetable' : './schedule.html#view=timetable') })}
      </div>
    </div>
  </div>`;

  const attendanceCard = `<div class="card p-4 flex items-center justify-between gap-3">
    <div>
      <div class="text-[13px] font-bold text-ink mb-0.5">${t('welcome.attendance.label')}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t('welcome.attendance.note')}</div>
    </div>
    <div class="relative grid place-items-center shrink-0">
      ${ring(w.attendanceRate, 'success', { size: 66, stroke: 7 })}
      <span class="absolute font-bold tabular text-ink" style="font-size:15px">${num(w.attendanceRate)}%</span>
    </div>
  </div>`;

  return `<div class="grid gap-4 grid-cols-1 lg:grid-cols-[1.15fr_1fr] mb-7">
    ${hero}
    <div class="grid gap-4 grid-rows-[auto_auto] content-start">
      <div class="grid grid-cols-2 gap-4">
        ${statCard('welcome.stat.upcoming', w.upcomingToday)}
        ${statCard('welcome.stat.live', w.liveNow, { live: true })}
      </div>
      ${attendanceCard}
    </div>
  </div>`;
}
