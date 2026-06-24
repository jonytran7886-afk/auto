/**
 * Landing page — auth header (guest / logged-in)
 */
(function () {
  'use strict';

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
})();
