/**
 * AutoSphere Header Navigation — mega menus, drawer, auth gating
 */
const AutoSphereHeaderNav = (function () {
  let openMega = null;
  let openDropdown = null;

  function prefix() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.rootPrefix) {
      return AutoSphereAuth.rootPrefix();
    }
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/garage/pages/') || path.includes('/account/pages/') || path.includes('/khampha/pages/')) return '../../';
    if (path.includes('/garage/') || path.includes('/account/')) return '../';
    return '';
  }

  function resolveHref(href) {
    if (!href) return '#';
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return prefix() + href;
  }

  function loginWithRedirect(targetHref) {
    const auth = window.AutoSphereAuth;
    if (!auth) return targetHref;
    const resolved = resolveHref(targetHref);
    const rel = resolved.replace(/^\.\.\//g, '').replace(/^\.\//, '');
    return auth.loginUrl(rel);
  }

  function hrefForItem(item) {
    const resolved = resolveHref(item.href);
    if (item.auth && typeof AutoSphereAuth !== 'undefined' && !AutoSphereAuth.isLoggedIn()) {
      return loginWithRedirect(item.href);
    }
    return resolved;
  }

  function isActive(href) {
    if (!href) return false;
    const resolved = resolveHref(href).split('#')[0];
    const current = window.location.pathname.replace(/\\/g, '/');
    const file = current.split('/').pop() || 'index.html';
    const target = resolved.split('/').pop() || 'index.html';
    if (target === 'index.html' && file === 'index.html') {
      const hash = href.includes('#') ? href.split('#')[1] : '';
      if (hash) return window.location.hash === '#' + hash;
      return !window.location.hash || window.location.hash === '#hero';
    }
    return current.endsWith(target) || current.includes('/' + target);
  }

  function itemActive(item) {
    if (item.href) return isActive(item.href);
    const all = [];
    if (item.items) all.push(...item.items);
    if (item.columns) item.columns.forEach((c) => all.push(...c.items));
    return all.some((i) => isActive(i.href));
  }

  function renderDropdown(nav, key) {
    const items = nav.items
      .map(
        (item) =>
          `<a href="${hrefForItem(item)}" data-href="${item.href || ''}" ${item.auth ? 'data-auth="true"' : ''}>${item.label}</a>`
      )
      .join('');
    return `
      <div class="as-nav-item" data-nav="${key}">
        <button type="button" class="as-nav-trigger" aria-expanded="false" aria-haspopup="true">
          ${nav.label}
          <span class="material-symbols-outlined as-nav-chevron">expand_more</span>
        </button>
        <div class="as-nav-dropdown" role="menu">${items}</div>
      </div>`;
  }

  function renderMega(nav, key) {
    const cols = nav.columns
      .map(
        (col) => `
        <div class="as-nav-mega-col">
          <h4>${col.title}</h4>
          ${col.items
            .map(
              (item) =>
                `<a href="${hrefForItem(item)}" data-href="${item.href || ''}" ${item.auth ? 'data-auth="true"' : ''}>${item.label}</a>`
            )
            .join('')}
        </div>`
      )
      .join('');
    return `
      <div class="as-nav-item" data-nav="${key}" ${nav.auth ? 'data-auth-only="true"' : ''}>
        <button type="button" class="as-nav-trigger" aria-expanded="false" aria-haspopup="true" data-mega="${key}">
          ${nav.label}
          <span class="material-symbols-outlined as-nav-chevron">expand_more</span>
        </button>
      </div>`;
  }

  function renderLink(nav, key) {
    const href = resolveHref(nav.href);
    return `
      <div class="as-nav-item" data-nav="${key}">
        <a href="${href}" class="as-nav-link">${nav.label}</a>
      </div>`;
  }

  function renderNavItem(key) {
    const nav = HEADER_NAV[key];
    if (!nav) return '';
    if (nav.type === 'dropdown') return renderDropdown(nav, key);
    if (nav.type === 'mega') return renderMega(nav, key);
    return renderLink(nav, key);
  }

  function renderDesktopNav() {
    const el = document.getElementById('as-desktop-nav');
    if (!el) return;
    const loggedIn = typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn();
    const keys = loggedIn ? HEADER_AUTH_ITEMS : HEADER_GUEST_ITEMS;
    el.innerHTML = keys.map(renderNavItem).join('');
    renderMegaPanels(keys);
    markActiveStates();
  }

  function renderMegaPanels(keys) {
    let container = document.getElementById('as-mega-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-mega-container';
      document.body.appendChild(container);
    }
    container.innerHTML = keys
      .filter((k) => HEADER_NAV[k]?.type === 'mega')
      .map((key) => {
        const nav = HEADER_NAV[key];
        const cols = nav.columns
          .map(
            (col) => `
            <div class="as-nav-mega-col">
              <h4>${col.title}</h4>
              ${col.items
                .map(
                  (item) =>
                    `<a href="${hrefForItem(item)}" data-href="${item.href || ''}" ${item.auth ? 'data-auth="true"' : ''}>${item.label}</a>`
                )
                .join('')}
            </div>`
          )
          .join('');
        return `<div class="as-nav-mega" id="as-mega-${key}" data-mega-panel="${key}" role="menu"><div class="as-nav-mega-grid">${cols}</div></div>`;
      })
      .join('');
  }

  function renderMobileDrawer() {
    const el = document.getElementById('as-mobile-nav');
    if (!el) return;
    const loggedIn = typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn();
    const keys = loggedIn ? HEADER_AUTH_ITEMS : HEADER_GUEST_ITEMS;

    el.innerHTML = keys
      .map((key) => {
        const nav = HEADER_NAV[key];
        if (nav.type === 'dropdown') {
          const links = nav.items
            .map(
              (item) =>
                `<a href="${hrefForItem(item)}" data-href="${item.href || ''}" ${item.auth ? 'data-auth="true"' : ''}>${item.label}</a>`
            )
            .join('');
          return `
            <div class="as-mobile-section" data-section="${key}">
              <button type="button" class="as-mobile-section-btn">${nav.label}<span class="material-symbols-outlined">expand_more</span></button>
              <div class="as-mobile-section-body">${links}</div>
            </div>`;
        }
        if (nav.type === 'mega') {
          const links = nav.columns
            .flatMap((c) => c.items)
            .map(
              (item) =>
                `<a href="${hrefForItem(item)}" data-href="${item.href || ''}" ${item.auth ? 'data-auth="true"' : ''}>${item.label}</a>`
            )
            .join('');
          return `
            <div class="as-mobile-section" data-section="${key}" ${nav.auth ? 'data-auth-only="true"' : ''}>
              <button type="button" class="as-mobile-section-btn">${nav.label}<span class="material-symbols-outlined">expand_more</span></button>
              <div class="as-mobile-section-body">${links}</div>
            </div>`;
        }
        const href = resolveHref(nav.href);
        return `
          <div class="as-mobile-section" data-section="${key}">
            <a href="${href}" class="as-mobile-section-btn as-mobile-link">${nav.label}</a>
          </div>`;
      })
      .join('');

    markActiveStates();
  }

  function closeAllMenus() {
    document.querySelectorAll('.as-nav-item.is-open').forEach((el) => el.classList.remove('is-open'));
    document.querySelectorAll('.as-nav-mega.is-open').forEach((el) => el.classList.remove('is-open'));
    if (openMega) openMega.classList.remove('is-open');
    openMega = null;
    openDropdown = null;
    const lang = document.getElementById('as-lang-dropdown');
    if (lang) lang.classList.remove('is-open');
  }

  function openMegaMenu(key) {
    closeAllMenus();
    const panel = document.getElementById('as-mega-' + key);
    const trigger = document.querySelector(`[data-mega="${key}"]`);
    if (panel) {
      panel.classList.add('is-open');
      openMega = panel;
    }
    if (trigger) {
      trigger.closest('.as-nav-item')?.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function initDesktopMenus() {
    const nav = document.getElementById('as-desktop-nav');
    if (!nav) return;

    nav.addEventListener('click', (e) => {
      const trigger = e.target.closest('.as-nav-trigger');
      if (!trigger) return;
      e.preventDefault();
      const item = trigger.closest('.as-nav-item');
      const megaKey = trigger.dataset.mega;
      if (megaKey) {
        const panel = document.getElementById('as-mega-' + megaKey);
        if (panel?.classList.contains('is-open')) closeAllMenus();
        else openMegaMenu(megaKey);
        return;
      }
      const wasOpen = item?.classList.contains('is-open');
      closeAllMenus();
      if (!wasOpen && item) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function initMobileDrawer() {
    const drawer = document.getElementById('as-mobile-drawer');
    const openBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('as-mobile-close');
    const backdrop = drawer?.querySelector('.as-mobile-drawer-backdrop');

    function open() {
      drawer?.classList.add('is-open');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const icon = openBtn?.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'close';
    }
    function close() {
      drawer?.classList.remove('is-open');
      drawer?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      const icon = openBtn?.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    }

    openBtn?.addEventListener('click', () => {
      if (drawer?.classList.contains('is-open')) close();
      else open();
    });
    closeBtn?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);

    document.getElementById('as-mobile-nav')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.as-mobile-section-btn:not(.as-mobile-link)');
      if (!btn) return;
      e.preventDefault();
      const section = btn.closest('.as-mobile-section');
      section?.classList.toggle('is-expanded');
    });
  }

  function initLanguageDropdown() {
    const btn = document.getElementById('as-lang-btn');
    const dropdown = document.getElementById('as-lang-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllMenus();
      dropdown.classList.toggle('is-open');
    });

    dropdown.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', () => {
        dropdown.querySelectorAll('button').forEach((x) => x.classList.remove('is-active'));
        b.classList.add('is-active');
        dropdown.classList.remove('is-open');
      });
    });
  }

  function initAuthGate() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-auth="true"]');
      if (!link) return;
      if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn()) return;
      e.preventDefault();
      const target = link.dataset.href || link.getAttribute('href');
      window.location.href = loginWithRedirect(target);
    });
  }

  function markActiveStates() {
    Object.keys(HEADER_NAV).forEach((key) => {
      const nav = HEADER_NAV[key];
      const active = itemActive(nav);
      document.querySelectorAll(`[data-nav="${key}"]`).forEach((el) => {
        el.classList.toggle('is-active', active);
      });
      document.querySelectorAll(`[data-section="${key}"] .as-mobile-section-btn`).forEach((el) => {
        el.classList.toggle('is-active', active);
      });
    });

    document.querySelectorAll('#as-desktop-nav a, #as-mega-container a, #as-mobile-nav a').forEach((a) => {
      const href = a.dataset.href || a.getAttribute('href');
      if (href && isActive(href)) a.classList.add('is-active');
    });
  }

  function initGlobalClose() {
    document.addEventListener('click', (e) => {
      if (
        !e.target.closest('.as-nav-item') &&
        !e.target.closest('.as-nav-mega') &&
        !e.target.closest('#as-lang-btn') &&
        !e.target.closest('#as-lang-dropdown')
      ) {
        closeAllMenus();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllMenus();
    });
  }

  function refresh() {
    renderDesktopNav();
    renderMobileDrawer();
  }

  function init() {
    renderDesktopNav();
    renderMobileDrawer();
    initDesktopMenus();
    initMobileDrawer();
    initLanguageDropdown();
    initAuthGate();
    initGlobalClose();
  }

  return { init, refresh, closeAllMenus };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (typeof HEADER_NAV !== 'undefined') AutoSphereHeaderNav.init();
});
