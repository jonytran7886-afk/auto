/**
 * Landing page — auth header (guest / logged-in)
 */
(function () {
  'use strict';

  function initAuthHeader() {
    if (typeof AutoSphereAuth === 'undefined') return;

    const guestEl = document.getElementById('auth-guest');
    const userEl = document.getElementById('auth-user');
    const nameEl = document.getElementById('auth-user-name');
    const logoutBtn = document.getElementById('auth-logout-btn');
    const mobileGuest = document.getElementById('mobile-auth-guest');
    const mobileUser = document.getElementById('mobile-auth-user');

    if (!guestEl || !userEl) return;

    function showGuest() {
      guestEl.classList.remove('hidden');
      userEl.classList.add('hidden');
      if (mobileGuest) mobileGuest.classList.remove('hidden');
      if (mobileUser) mobileUser.classList.add('hidden');
    }

    function showUser(user) {
      guestEl.classList.add('hidden');
      userEl.classList.remove('hidden');
      userEl.classList.add('flex');
      if (nameEl) nameEl.textContent = user.name || user.email;
      if (mobileGuest) mobileGuest.classList.add('hidden');
      if (mobileUser) {
        mobileUser.classList.remove('hidden');
        const mobileName = mobileUser.querySelector('[data-auth-name]');
        if (mobileName) mobileName.textContent = user.name || user.email;
      }
    }

    if (AutoSphereAuth.isLoggedIn()) {
      showUser(AutoSphereAuth.getUser() || { name: 'Người dùng' });
    } else {
      showGuest();
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AutoSphereAuth.logout();
        showGuest();
        window.location.href = AutoSphereAuth.landingUrl();
      });
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
