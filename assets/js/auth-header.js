/**
 * Landing page — auth header (guest / logged-in)
 */
(function () {
  'use strict';

  function updateDealerPostCta() {
    const btn = document.getElementById('as-dealer-post');
    if (!btn) return;
    const role = typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.getCurrentRole()?.id : null;
    const ws = document.body.dataset.veiWorkspace;
    const show = role === 'dealer' || role === 'oem' || ws === 'dealer' || ws === 'oem';
    btn.classList.toggle('hidden', !show);
  }

  function initAuthHeader() {
    if (typeof GarageNav !== 'undefined') GarageNav.init();

    if (typeof AppAuthHeader !== 'undefined') {
      AppAuthHeader.mountAppAuthHeader();
    }

    if (typeof AutoSphereAuth === 'undefined') return;

    const guestEl = document.getElementById('auth-guest');
    const userEl = document.getElementById('auth-user');
    const mobileGuest = document.getElementById('mobile-auth-guest');
    const mobileUser = document.getElementById('mobile-auth-user');

    if (!guestEl || !userEl) return;

    const authOnlyEls = document.querySelectorAll('[data-auth-only]');

    function setAuthOnlyVisible(visible) {
      authOnlyEls.forEach((el) => {
        el.classList.toggle('hidden', !visible);
      });
    }

    function showGuest() {
      guestEl.classList.remove('hidden');
      userEl.classList.add('hidden');
      userEl.classList.remove('flex');
      setAuthOnlyVisible(false);
      if (mobileGuest) mobileGuest.classList.remove('hidden');
      if (mobileUser) mobileUser.classList.add('hidden');
      if (typeof AutoSphereHeaderNav !== 'undefined') AutoSphereHeaderNav.refresh();
      if (typeof VEIWorkspace !== 'undefined') VEIWorkspace.refresh();
      updateDealerPostCta();
    }

    function showUser(user) {
      guestEl.classList.add('hidden');
      userEl.classList.remove('hidden');
      userEl.classList.add('flex');
      setAuthOnlyVisible(true);
      if (mobileGuest) mobileGuest.classList.add('hidden');
      if (mobileUser) {
        mobileUser.classList.remove('hidden');
        const mobileName = mobileUser.querySelector('[data-auth-name]');
        if (mobileName) mobileName.textContent = user.name || user.email;
      }
      const userNameEl = document.getElementById('auth-user-name');
      if (userNameEl) userNameEl.textContent = user.name || user.email;
      if (typeof AvatarMenu !== 'undefined') {
        const wrap = document.getElementById('avatar-menu-wrap');
        const toggle = document.getElementById('avatar-menu-toggle');
        if (wrap && toggle) {
          AvatarMenu.mountMenu(wrap, toggle, user);
        }
      }
      if (typeof AutoSphereHeaderNav !== 'undefined') AutoSphereHeaderNav.refresh();
      if (typeof VEIWorkspace !== 'undefined') VEIWorkspace.refresh();
      updateDealerPostCta();
    }

    document.getElementById('auth-logout-btn')?.addEventListener('click', () => {
      AutoSphereAuth.logout();
      window.location.href = AutoSphereAuth.landingUrl();
    });

    if (AutoSphereAuth.isLoggedIn()) {
      showUser(AutoSphereAuth.getUser() || { name: 'Người dùng' });
    } else {
      showGuest();
    }

    const mobileLogout = document.getElementById('mobile-auth-logout');
    if (mobileLogout) {
      mobileLogout.addEventListener('click', () => {
        AutoSphereAuth.logout();
        window.location.href = AutoSphereAuth.landingUrl();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initAuthHeader);
  document.addEventListener('vei:workspace-change', updateDealerPostCta);

  function loadBrandLogoStyles() {
    if (document.querySelector('link[data-as-brand-logo-css]')) return;
    const path = window.location.pathname.replace(/\\/g, '/');
    let prefix = '';
    if (path.includes('/pages/') || path.includes('/apps/')) prefix = '../../';
    else if (path.includes('/garage/') || path.includes('/account/') || path.includes('/khampha/') || path.includes('/detail/')) prefix = '../';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}assets/css/brand-logo.css`;
    link.dataset.asBrandLogoCss = '1';
    document.head.appendChild(link);
  }

  function loadBrandLogoScript() {
    if (document.querySelector('script[data-as-brand-logo]')) return;
    const path = window.location.pathname.replace(/\\/g, '/');
    let prefix = '';
    if (path.includes('/pages/') || path.includes('/apps/')) prefix = '../../';
    else if (path.includes('/garage/') || path.includes('/account/') || path.includes('/khampha/') || path.includes('/detail/')) prefix = '../';
    const s = document.createElement('script');
    s.src = `${prefix}assets/js/brand-logo.js`;
    s.dataset.asBrandLogo = '1';
    s.onload = () => {
      if (typeof AutoSphereBrand !== 'undefined') AutoSphereBrand.initBrandLogo();
    };
    document.head.appendChild(s);
  }

  loadBrandLogoStyles();
  loadBrandLogoScript();
})();
