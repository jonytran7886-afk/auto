/**
 * AutoSphere VEI Header Navigation
 */
const AutoSphereHeaderNav = (function () {
  let openMega = null;

  function prefix() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.rootPrefix) {
      return AutoSphereAuth.rootPrefix();
    }
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/garage/pages/') || path.includes('/account/pages/') || path.includes('/khampha/pages/') || path.includes('/detail/pages/')) {
      return '../../';
    }
    if (path.includes('/garage/') || path.includes('/account/') || path.includes('/khampha/') || path.includes('/detail/') || path.includes('/apps/')) {
      return '../';
    }
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
    const rel = String(targetHref).replace(/^\.\.\//g, '').replace(/^\.\//, '');
    return auth.loginUrl(rel);
  }

  function hrefForItem(item) {
    if (item.auth && typeof AutoSphereAuth !== 'undefined' && !AutoSphereAuth.isLoggedIn()) {
      return loginWithRedirect(item.href);
    }
    return resolveHref(item.href);
  }

  function isLoggedIn() {
    return typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn();
  }

  function navKeys() {
    return isLoggedIn() ? HEADER_AUTH_ITEMS : HEADER_GUEST_ITEMS;
  }

  function resolveSmartHref(nav) {
    if (nav.type !== 'smart-link') return resolveHref(nav.href);
    const href = isLoggedIn() ? nav.userHref : nav.guestHref;
    return resolveHref(href);
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

  function itemActive(nav) {
    if (nav.type === 'smart-link') {
      return isActive(nav.guestHref) || isActive(nav.userHref);
    }
    if (nav.href) return isActive(nav.href);
    const all = [];
    if (nav.items) all.push(...nav.items);
    if (nav.columns) nav.columns.forEach((c) => all.push(...c.items));
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

  function renderMegaTrigger(nav, key) {
    return `
      <div class="as-nav-item" data-nav="${key}" ${nav.authOnly ? 'data-auth-only-nav="true"' : ''}>
        <button type="button" class="as-nav-trigger" aria-expanded="false" aria-haspopup="true" data-mega="${key}">
          ${nav.label}
          <span class="material-symbols-outlined as-nav-chevron">expand_more</span>
        </button>
      </div>`;
  }

  function renderSmartLink(nav, key) {
    const href = resolveSmartHref(nav);
    const highlight = nav.highlight ? ' as-nav-item--identity' : '';
    const icon = nav.icon
      ? `<span class="material-symbols-outlined as-nav-icon" style="font-variation-settings:'FILL' 1">${nav.icon}</span>`
      : '';
    const badge = nav.badge && isLoggedIn()
      ? `<span class="as-nav-badge" aria-label="${nav.badge} xe">${nav.badge}</span>`
      : '';

    return `
      <div class="as-nav-item${highlight}" data-nav="${key}">
        <a href="${href}" class="as-nav-link as-nav-link--smart">
          ${icon}
          <span>${nav.label}</span>
          ${badge}
        </a>
      </div>`;
  }

  function megaItems(nav) {
    if (nav.items) return nav.items;
    if (nav.columns) return nav.columns.flatMap((c) => c.items);
    return [];
  }

  function positionMegaPanel(panel, trigger) {
    if (!panel || !trigger) return;
    const rect = trigger.getBoundingClientRect();
    const panelW = panel.offsetWidth || 360;
    const margin = 12;
    let left = rect.left + rect.width / 2 - panelW / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - panelW - margin));
    panel.style.left = `${left}px`;
    panel.dataset.positioned = 'true';
  }

  function renderMegaLink(item) {
    const icon = item.icon || 'chevron_right';
    return `<a href="${hrefForItem(item)}" class="as-mega-link" data-href="${item.href || ''}" ${item.auth ? 'data-auth="true"' : ''}>
      <span class="material-symbols-outlined as-mega-link__icon" aria-hidden="true">${icon}</span>
      <span class="as-mega-link__text">${item.label}</span>
    </a>`;
  }

  function renderMegaPanel(nav, key) {
    const items = megaItems(nav).map(renderMegaLink).join('');

    const icon = nav.icon || 'category';
    const desc = nav.description || '';
    const cta = nav.cta
      ? `<a href="${hrefForItem(nav.cta)}" class="as-mega-cta" data-href="${nav.cta.href || ''}" ${nav.cta.auth ? 'data-auth="true"' : ''}>${nav.cta.label}</a>`
      : '';
    const footer = desc || cta
      ? `<div class="as-mega-footer">${desc ? `<p class="as-mega-desc">${desc}</p>` : ''}${cta}</div>`
      : '';

    return `
      <div class="as-nav-mega" id="as-mega-${key}" data-mega-panel="${key}" role="menu">
        <div class="as-mega-card">
          <div class="as-mega-title">
            <span class="material-symbols-outlined as-mega-title__icon" aria-hidden="true">${icon}</span>
            <span class="as-mega-title__text">${nav.label}</span>
          </div>
          <nav class="as-mega-links" aria-label="${nav.label}">${items}</nav>
          ${footer}
        </div>
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
    if (nav.type === 'smart-link') return renderSmartLink(nav, key);
    if (nav.type === 'dropdown') return renderDropdown(nav, key);
    if (nav.type === 'mega') return renderMegaTrigger(nav, key);
    return renderLink(nav, key);
  }

  function renderDesktopNav() {
    const el = document.getElementById('as-desktop-nav');
    if (!el) return;
    el.innerHTML = navKeys().map(renderNavItem).join('');
    renderMegaPanels();
    markActiveStates();
  }

  function renderMegaPanels() {
    let container = document.getElementById('as-mega-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-mega-container';
      document.body.appendChild(container);
    }
    container.innerHTML = navKeys()
      .filter((k) => HEADER_NAV[k]?.type === 'mega')
      .map((key) => renderMegaPanel(HEADER_NAV[key], key))
      .join('');
  }

  function renderMobileDrawer() {
    const el = document.getElementById('as-mobile-nav');
    if (!el) return;
    const keys = navKeys();

    const workspaceBlock =
      isLoggedIn() && typeof VEIWorkspace !== 'undefined'
        ? `<div class="as-mobile-workspace" id="as-mobile-workspace-slot"></div>`
        : '';

    el.innerHTML =
      workspaceBlock +
      keys
        .map((key) => {
          const nav = HEADER_NAV[key];
          if (nav.type === 'smart-link') {
            const href = resolveSmartHref(nav);
            return `
            <div class="as-mobile-section" data-section="${key}">
              <a href="${href}" class="as-mobile-section-btn as-mobile-link">${nav.label}</a>
            </div>`;
          }
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
            const links = megaItems(nav).map(renderMegaLink).join('');
            const cta = nav.cta
              ? `<a href="${hrefForItem(nav.cta)}" class="as-mobile-mega-cta" data-href="${nav.cta.href || ''}">${nav.cta.label}</a>`
              : '';
            const desc = nav.description ? `<p class="as-mobile-mega-desc">${nav.description}</p>` : '';
            return `
            <div class="as-mobile-section" data-section="${key}">
              <button type="button" class="as-mobile-section-btn">${nav.label}<span class="material-symbols-outlined">expand_more</span></button>
              <div class="as-mobile-section-body">${links}${desc}${cta}</div>
            </div>`;
          }
          const href = resolveHref(nav.href);
          return `
          <div class="as-mobile-section" data-section="${key}">
            <a href="${href}" class="as-mobile-section-btn as-mobile-link">${nav.label}</a>
          </div>`;
        })
        .join('');

    if (isLoggedIn() && typeof VEIWorkspace !== 'undefined') {
      VEIWorkspace.renderMobile(document.getElementById('as-mobile-workspace-slot'));
    }

    markActiveStates();
  }

  function closeAllMenus() {
    document.querySelectorAll('.as-nav-item.is-open').forEach((el) => el.classList.remove('is-open'));
    document.querySelectorAll('.as-nav-mega.is-open').forEach((el) => el.classList.remove('is-open'));
    document.querySelectorAll('.as-nav-mega').forEach((el) => {
      el.style.left = '';
      delete el.dataset.positioned;
    });
    document.querySelectorAll('.as-nav-trigger[aria-expanded="true"]').forEach((el) => el.setAttribute('aria-expanded', 'false'));
    if (openMega) openMega.classList.remove('is-open');
    openMega = null;
    const lang = document.getElementById('as-lang-dropdown');
    if (lang) lang.classList.remove('is-open');
    if (typeof VEIWorkspace !== 'undefined') VEIWorkspace.closePanel();
  }

  function openMegaMenu(key) {
    closeAllMenus();
    const panel = document.getElementById('as-mega-' + key);
    const trigger = document.querySelector(`[data-mega="${key}"]`);
    if (panel) {
      panel.classList.add('is-open');
      openMega = panel;
      if (trigger) {
        requestAnimationFrame(() => positionMegaPanel(panel, trigger));
      }
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
    if (drawer && drawer.parentElement !== document.body) {
      document.body.appendChild(drawer);
    }
    const openBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('as-mobile-close');
    const backdrop = drawer?.querySelector('.as-mobile-drawer-backdrop');

    function open() {
      closeAllMenus();
      drawer?.classList.add('is-open');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('as-mobile-drawer-open');
      document.documentElement.classList.add('as-mobile-drawer-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer?.classList.remove('is-open');
      drawer?.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('as-mobile-drawer-open');
      document.documentElement.classList.remove('as-mobile-drawer-open');
      document.body.style.overflow = '';
    }

    openBtn?.addEventListener('click', () => {
      if (drawer?.classList.contains('is-open')) close();
      else open();
    });
    closeBtn?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);

    document.getElementById('as-mobile-nav')?.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) close();

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
      if (isLoggedIn()) return;
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
      a.classList.toggle('is-active', !!(href && isActive(href)));
    });
  }

  function initGlobalClose() {
    document.addEventListener('click', (e) => {
      if (
        !e.target.closest('.as-nav-item') &&
        !e.target.closest('.as-nav-mega') &&
        !e.target.closest('#as-lang-btn') &&
        !e.target.closest('#as-lang-dropdown') &&
        !e.target.closest('.as-workspace-wrap')
      ) {
        closeAllMenus();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllMenus();
    });
  }

  function updateHeaderHeight() {
    const header = document.querySelector('.as-vei-header');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--vei-header-h', `${h}px`);
    const main = document.querySelector('main.pt-\\[72px\\], main[data-vei-main]');
    if (main) main.style.paddingTop = `${h}px`;
  }

  function refresh() {
    renderDesktopNav();
    renderMobileDrawer();
    if (typeof VEIWorkspace !== 'undefined') VEIWorkspace.refresh();
    updateHeaderHeight();
  }

  function init() {
    renderDesktopNav();
    renderMobileDrawer();
    initDesktopMenus();
    initMobileDrawer();
    initLanguageDropdown();
    initAuthGate();
    initGlobalClose();
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('load', updateHeaderHeight);
    document.querySelector('.as-vei-header__logo img')?.addEventListener('load', updateHeaderHeight, { once: true });
    if (typeof VEIWorkspace !== 'undefined') VEIWorkspace.init();
  }

  return { init, refresh, closeAllMenus, updateHeaderHeight };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (typeof HEADER_NAV !== 'undefined') AutoSphereHeaderNav.init();
});
