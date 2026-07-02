/* Mobile sidebar drawer — scrim, focus trap, Esc, return focus. */
import { sidebar } from './sidebar.js';

let scrim, drawer, lastFocus, keyHandler;

function focusables() {
  return drawer ? Array.from(drawer.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])')) : [];
}

export function openDrawer(activeId, trigger) {
  if (drawer) return;
  lastFocus = trigger || document.activeElement;

  scrim = document.createElement('div');
  scrim.className = 'scrim';
  scrim.addEventListener('click', closeDrawer);

  drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.innerHTML = sidebar(activeId);

  document.body.append(scrim, drawer);
  requestAnimationFrame(() => { scrim.classList.add('is-open'); drawer.classList.add('is-open'); });

  keyHandler = (e) => {
    if (e.key === 'Escape') return closeDrawer();
    if (e.key === 'Tab') {
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener('keydown', keyHandler);
  const f = focusables(); if (f[0]) f[0].focus();
}

export function closeDrawer() {
  if (!drawer) return;
  document.removeEventListener('keydown', keyHandler);
  drawer.classList.remove('is-open'); scrim.classList.remove('is-open');
  const d = drawer, s = scrim;
  setTimeout(() => { d.remove(); s.remove(); }, 260);
  drawer = null; scrim = null;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
