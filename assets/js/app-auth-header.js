/**
 * Shared auth header — inject landing-style profile actions into app pages.
 */
(function () {
  'use strict';

  const AUTH_ONLY_STEPS = new Set(['01-dang-ky', '02-dang-nhap', '03-xac-thuc-otp', '04-xac-thuc-dinh-danh']);

  function assetPrefix() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.rootPrefix) {
      return AutoSphereAuth.rootPrefix();
    }
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/') || path.includes('/apps/')) return '../../';
    if (path.includes('/garage/') || path.includes('/account/') || path.includes('/khampha/')) return '../';
    return '';
  }

  function loginHref() {
    if (typeof AutoSphereAuth !== 'undefined') return AutoSphereAuth.loginUrl();
    return `${assetPrefix()}account/pages/02-dang-nhap.html`;
  }

  function registerHref() {
    if (typeof AutoSphereAuth !== 'undefined') return AutoSphereAuth.registerUrl();
    return `${assetPrefix()}account/pages/01-dang-ky.html`;
  }

  function profileImageSrc() {
    return `${assetPrefix()}assets/images/profile-avatar.jpg`;
  }

  function shouldSkipPage() {
    if (document.getElementById('auth-guest')) return true;
    const stepId = window.FLOW_STEP_ID;
    if (stepId && AUTH_ONLY_STEPS.has(stepId)) return true;
    return false;
  }

  function buildAuthActionsHtml() {
    const login = loginHref();
    const register = registerHref();
    const avatar = profileImageSrc();

    return `
      <button data-auth-only class="hidden relative p-2 text-on-surface-variant hover:bg-surface-variant/20 rounded-full transition-colors" type="button" aria-label="Thông báo">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
      </button>
      <div id="auth-guest" class="flex items-center gap-2 ml-1">
        <a href="${login}" class="px-3 py-2 rounded-xl font-label-md text-label-md text-primary border border-primary/20 hover:bg-primary/5 transition-all whitespace-nowrap">Đăng nhập</a>
        <a href="${register}" class="px-3 py-2 rounded-xl font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm whitespace-nowrap">Đăng ký</a>
      </div>
      <div id="auth-user" class="hidden items-center gap-2 ml-1">
        <span id="auth-user-name" class="hidden lg:inline font-label-md text-label-md text-on-surface max-w-[140px] truncate"></span>
        <button id="auth-logout-btn" type="button" class="hidden md:inline-flex px-3 py-2 rounded-xl font-label-md text-label-md text-on-surface-variant border border-outline-variant hover:bg-surface-container-low transition-all whitespace-nowrap">Đăng xuất</button>
        <div id="avatar-menu-wrap" class="relative">
          <button id="avatar-menu-toggle" type="button" class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed-dim ring-2 ring-surface cursor-pointer shrink-0 p-0 bg-transparent" aria-label="Menu tài khoản" aria-haspopup="true">
            <img data-asset="profile" class="w-full h-full object-cover" src="${avatar}" alt="Avatar" width="40" height="40">
          </button>
        </div>
      </div>
    `;
  }

  function findActionsContainer(header) {
    const existing = header.querySelector('#as-header-actions');
    if (existing) return existing;

    const children = [...header.children].filter((el) => el.tagName === 'DIV');
    const actions = children.find((el) => {
      if (el.querySelector('h1, .font-headline-md')) return false;
      return el.querySelector('button, img, a, .material-symbols-outlined') || /\bgap-[234]\b/.test(el.className);
    });

    if (actions) {
      actions.id = 'as-header-actions';
      actions.className = 'flex items-center gap-2 shrink-0';
      return actions;
    }

    const wrap = document.createElement('div');
    wrap.id = 'as-header-actions';
    wrap.className = 'flex items-center gap-2 shrink-0';
    header.appendChild(wrap);
    return wrap;
  }

  function isSidebarProfileBlock(el, nav) {
    if (!el || el === nav || el.contains(nav)) return false;

    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) return false;

    if (/AutoSphere/i.test(text) && /Premium Mobility/i.test(text)) return false;
    if (/Thêm mới|Quy trình \d|Phương tiện active|BMW X5/i.test(text)) return false;
    if (el.querySelector('.material-symbols-outlined')?.textContent?.trim() === 'auto_awesome') return false;

    const hasMember = /Thành viên (Premium|Platinum)/i.test(text) || />\s*Premium\s*</i.test(text);
    const hasUser = /Nguyễn Văn A|Minh Nguyễn/i.test(text);
    const hasAvatar = !!el.querySelector('img, .rounded-full .material-symbols-outlined');
    const hasAccountMeta = /AutoSphere ID|ID:\s*\d+/i.test(text);

    if (hasMember && hasUser) return true;
    if (hasUser && hasAvatar && el.querySelector('.rounded-full, img')) return true;
    if (hasUser && hasAccountMeta) return true;
    if (hasMember && hasAvatar) return true;

    return false;
  }

  function removeSidebarUserProfiles() {
    document.querySelectorAll('aside').forEach((aside) => {
      const nav = aside.querySelector('nav');
      if (!nav) return;

      [...aside.children].forEach((child) => {
        if (isSidebarProfileBlock(child, nav)) child.remove();
      });
    });
  }

  function mountAppAuthHeader() {
    if (shouldSkipPage()) return false;

    const header = document.querySelector('body > header, body header.fixed, header.fixed');
    if (!header || header.closest('main, aside, section')) return false;

    const actions = findActionsContainer(header);
    actions.innerHTML = buildAuthActionsHtml();
    removeSidebarUserProfiles();
    return true;
  }

  window.AppAuthHeader = {
    mountAppAuthHeader,
    removeSidebarUserProfiles,
    buildAuthActionsHtml,
    assetPrefix,
  };
})();
