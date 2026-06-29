/* Local SVG icon system. The sprite (src/icons/sprite.svg) is vendored from
 * lucide-static by scripts/vendor-assets.cjs (no CDN). We inline it once per
 * page so <use href="#i-id"> resolves same-document (robust + themeable). */

let injected = false;

export async function injectSprite() {
  if (injected) return;
  injected = true;
  try {
    const res = await fetch('/src/icons/sprite.svg');
    const svg = await res.text();
    const holder = document.createElement('div');
    holder.style.display = 'none';
    holder.setAttribute('aria-hidden', 'true');
    holder.innerHTML = svg;
    document.body.prepend(holder);
  } catch (e) {
    console.warn('[icons] sprite failed to load', e);
  }
}

/** icon('home', 'ico') -> inline svg referencing the sprite symbol */
export function icon(id, cls = 'ico') {
  return `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${id}"></use></svg>`;
}
