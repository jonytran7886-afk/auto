/**
 * Avatar dropdown — tài khoản & chuyển vai trò (không chứa ứng dụng)
 */
(function () {
  'use strict';

  function defaultUrls() {
    const path = window.location.pathname.replace(/\\/g, '/');
    let root = '';
    if (path.includes('/pages/') || path.includes('/apps/')) root = '../../';
    else if (path.includes('/garage/') || path.includes('/account/') || path.includes('/khampha/') || path.includes('/detail/')) root = '../';
    return {
      profileUrl: `${root}account/pages/05-ho-so-ca-nhan.html`,
      notificationsUrl: `${root}apps/notifications.html`,
      settingsUrl: `${root}apps/settings.html`,
      landingUrl: `${root}index.html`,
    };
  }

  function getUrl(key) {
    if (typeof AutoSphereAuth !== 'undefined' && typeof AutoSphereAuth[key] === 'function') {
      return AutoSphereAuth[key]();
    }
    const urls = defaultUrls();
    return urls[key] || urls.landingUrl;
  }

  function getRoles() {
    return typeof APP_ROLES !== 'undefined' ? APP_ROLES : [{ id: 'consumer', label: 'Người sử dụng dịch vụ', default: true }];
  }

  function getCurrentRoleId() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.getCurrentRole) {
      return AutoSphereAuth.getCurrentRole().id;
    }
    return 'consumer';
  }

  function buildMenuHtml(user) {
    const name = user?.name || 'Người dùng mới';
    const email = user?.email || '';
    const currentRoleId = getCurrentRoleId();
    const roles = getRoles();
    const currentRole = roles.find((r) => r.id === currentRoleId) || roles[0];

    const roleSwitchItems = roles
      .filter((r) => r.id !== currentRoleId)
      .map(
        (r) => `
      <button type="button" class="as-avatar-menu__item" data-role-switch="${r.id}">
        <span class="material-symbols-outlined">swap_horiz</span>
        ${r.label}
      </button>`
      )
      .join('');

    return `
      <div class="as-avatar-menu__header">
        <div class="as-avatar-menu__name">${name}</div>
        ${email ? `<div class="as-avatar-menu__email">${email}</div>` : ''}
      </div>
      <a href="${getUrl('profileUrl')}" class="as-avatar-menu__item">
        <span class="material-symbols-outlined">person</span>
        Hồ sơ cá nhân
      </a>
      <a href="${getUrl('notificationsUrl')}" class="as-avatar-menu__item">
        <span class="material-symbols-outlined">notifications</span>
        Thông báo
      </a>
      <a href="${getUrl('settingsUrl')}" class="as-avatar-menu__item">
        <span class="material-symbols-outlined">settings</span>
        Cài đặt
      </a>
      <div class="as-avatar-menu__divider"></div>
      <div class="as-avatar-menu__section-label">Vai trò hiện tại</div>
      <div class="as-avatar-menu__role-active">
        <span class="material-symbols-outlined">check_circle</span>
        ${currentRole.label}
      </div>
      <div class="as-avatar-menu__section-label">Chuyển vai trò</div>
      ${roleSwitchItems}
      <div class="as-avatar-menu__divider"></div>
      <button type="button" class="as-avatar-menu__item as-avatar-menu__item--danger" data-avatar-logout>
        <span class="material-symbols-outlined">logout</span>
        Đăng xuất
      </button>
    `;
  }

  function bindDropdownEvents(dropdown, container, toggle, user) {
    dropdown.querySelector('[data-avatar-logout]')?.addEventListener('click', () => {
      if (typeof AutoSphereAuth !== 'undefined') AutoSphereAuth.logout();
      window.location.assign(getUrl('landingUrl'));
    });

    dropdown.querySelectorAll('[data-role-switch]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const roleId = btn.dataset.roleSwitch;
        if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.setCurrentRole) {
          AutoSphereAuth.setCurrentRole(roleId);
        }
        dropdown.innerHTML = buildMenuHtml(user);
        bindDropdownEvents(dropdown, container, toggle, user);
      });
    });
  }

  function mountMenu(container, toggle, user) {
    container.classList.add('as-avatar-menu');

    let dropdown = container.querySelector('.as-avatar-menu__dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'as-avatar-menu__dropdown';
      dropdown.setAttribute('role', 'menu');
      container.appendChild(dropdown);

      if (!toggle.dataset.avatarBound) {
        toggle.dataset.avatarBound = 'true';
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('is-open');
        });
        document.addEventListener('click', () => dropdown.classList.remove('is-open'));
        dropdown.addEventListener('click', (e) => e.stopPropagation());
      }
    }

    dropdown.innerHTML = buildMenuHtml(user);
    bindDropdownEvents(dropdown, container, toggle, user);

    if (!toggle.classList.contains('as-avatar-menu__toggle')) {
      toggle.classList.add('as-avatar-menu__toggle');
    }
  }

  window.AvatarMenu = { mountMenu, getUrl, buildMenuHtml };
})();
