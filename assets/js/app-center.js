/**
 * Render Trung tâm ứng dụng
 */
(function () {
  'use strict';

  function prefix() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.rootPrefix) {
      return AutoSphereAuth.rootPrefix();
    }
    return '';
  }

  function renderAppCenter() {
    const grid = document.getElementById('app-center-grid');
    if (!grid || typeof APP_CENTER === 'undefined') return;

    grid.innerHTML = APP_CENTER.map((app) => {
      const bold = app.bold ? ' font-bold' : '';
      return `
        <a href="${prefix()}${app.href}" class="flex flex-col items-center gap-2 p-3 hover:bg-surface-container-low rounded-2xl transition-all group">
          <div class="w-12 h-12 rounded-xl ${app.bg} flex items-center justify-center ${app.text} group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-[28px]">${app.icon}</span>
          </div>
          <span class="font-label-sm text-label-sm text-center${bold}">${app.label}</span>
        </a>`;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', renderAppCenter);

  window.AppCenter = { renderAppCenter };
})();
