/**
 * App Shell — Garage & Marketplace layouts
 */
(function () {
  'use strict';

  function prefix() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.rootPrefix) {
      return AutoSphereAuth.rootPrefix();
    }
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/')) return '../../';
    if (path.includes('/apps/')) return '../';
    return '';
  }

  function resolveHref(href) {
    if (/^(https?:|mailto:|#)/.test(href)) return href;
    return prefix() + href;
  }

  function hrefForItem(item) {
    if (item.auth && typeof AutoSphereAuth !== 'undefined' && !AutoSphereAuth.isLoggedIn()) {
      return AutoSphereAuth.loginUrl(item.href);
    }
    return resolveHref(item.href);
  }

  function isActive(href) {
    const current = window.location.pathname.replace(/\\/g, '/');
    const target = resolveHref(href).split('?')[0];
    return current.endsWith(target.split('/').pop());
  }

  function renderSidebar(sections, sidebarId) {
    const el = document.getElementById(sidebarId);
    if (!el) return;

    el.innerHTML = sections
      .map(
        (section) => `
        <div class="as-app-sidebar__section">
          <div class="as-app-sidebar__title">${section.title}</div>
          ${section.items
            .map((item) => {
              const active = isActive(item.href) ? ' is-active' : '';
              return `<a href="${hrefForItem(item)}" class="as-app-sidebar__link${active}" ${item.auth ? 'data-auth="true" data-href="' + item.href + '"' : ''}>${item.label}</a>`;
            })
            .join('')}
        </div>`
      )
      .join('');
  }

  function renderQuickLinks(sections, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const items = sections.flatMap((s) => s.items).slice(0, 6);
    el.innerHTML = items
      .map(
        (item) =>
          `<a href="${hrefForItem(item)}"><span class="material-symbols-outlined">arrow_forward</span>${item.label}</a>`
      )
      .join('');
  }

  function initAuthGate() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-auth="true"]');
      if (!link) return;
      if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn()) return;
      e.preventDefault();
      window.location.href = AutoSphereAuth.loginUrl(link.dataset.href);
    });
  }

  function initGarage() {
    if (typeof GARAGE_APP_NAV === 'undefined') return;
    renderSidebar(GARAGE_APP_NAV, 'app-sidebar');
    renderQuickLinks(GARAGE_APP_NAV, 'app-quick-links');
  }

  function initMarketplace() {
    if (typeof MARKETPLACE_APP_NAV === 'undefined') return;
    renderSidebar(MARKETPLACE_APP_NAV, 'app-sidebar');
    renderQuickLinks(MARKETPLACE_APP_NAV, 'app-quick-links');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAuthGate();
    if (window.APP_SHELL === 'garage') initGarage();
    if (window.APP_SHELL === 'marketplace') initMarketplace();
  });

  window.AppShell = { renderSidebar, hrefForItem, resolveHref };
})();
