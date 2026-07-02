/* Pure shell markup (Node + browser safe) — used by the static-site generator to
 * bake the full HTML into each page. Runtime JS only enhances this markup. */
import { sidebar } from './sidebar.js';
import { topbar } from './topbar.js';

export function shellMarkup({ activeId, titleKey, crumbKey, bodyHTML }) {
  return `<div class="app-shell" id="shell" data-rail="false" data-shell>
    ${sidebar(activeId)}
    <div class="main-col">
      ${topbar({ titleKey, crumbKey })}
      <main class="page-scroll" id="page" tabindex="-1">
        <div class="page-pad" id="page-body">${bodyHTML}</div>
      </main>
    </div>
  </div>`;
}
