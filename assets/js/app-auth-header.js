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
    if (path.includes('/garage/') || path.includes('/account/') || path.includes('/khampha/') || path.includes('/detail/')) {
      return '../';
    }
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

  function postListingHref() {
    return `${assetPrefix()}apps/dang-ban-xe.html`;
  }

  function shouldSkipPage() {
    const guest = document.getElementById('auth-guest');
    if (guest) {
      const actions = guest.closest('#as-header-actions');
      const host = document.querySelector('body > header, body > nav.sticky, header.fixed, header.sticky');
      if (actions && host && host.contains(actions) && actions.parentElement !== host) {
        return true;
      }
    }
    const stepId = window.FLOW_STEP_ID;
    if (stepId && AUTH_ONLY_STEPS.has(stepId)) return true;
    return false;
  }

  function isStitchMarketHeader(header) {
    if (window.DETAIL_STEP_ID) return true;
    const right = header.querySelector('[class*="justify-between"] > div:last-child');
    return Boolean(
      right &&
        (right.querySelector('img[src*="googleusercontent"]') ||
          [...right.querySelectorAll('button')].some((b) => /đăng tin/i.test(b.textContent || '')))
    );
  }

  function buildAuthCoreHtml() {
    const login = loginHref();
    const register = registerHref();
    const avatar = profileImageSrc();

    return `
      <div id="auth-guest" class="flex items-center gap-2 ml-1">
        <a href="${login}" class="px-3 py-2 rounded-xl font-label-md text-label-md text-primary border border-primary/20 hover:bg-primary/5 transition-all whitespace-nowrap">Đăng nhập</a>
        <a href="${register}" class="px-3 py-2 rounded-xl font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm whitespace-nowrap">Bắt đầu ngay</a>
      </div>
      <div id="auth-user" class="hidden items-center gap-2 ml-1">
        <div id="avatar-menu-wrap" class="relative">
          <button id="avatar-menu-toggle" type="button" class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed-dim ring-2 ring-surface cursor-pointer shrink-0 p-0 bg-transparent" aria-label="Menu tài khoản" aria-haspopup="true">
            <img data-asset="profile" class="w-full h-full object-cover" src="${avatar}" alt="Avatar" width="40" height="40">
          </button>
        </div>
      </div>
    `;
  }

  function buildAuthActionsHtml() {
    const avatar = profileImageSrc();

    return `
      <button data-auth-only class="hidden relative p-2 text-on-surface-variant hover:bg-surface-variant/20 rounded-full transition-colors" type="button" aria-label="Thông báo">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
      </button>
      ${buildAuthCoreHtml()}
    `;
  }

  function buildStitchHeaderActionsHtml() {
    const post = postListingHref();

    return `
      <div class="flex items-center gap-2">
        <button data-auth-only class="hidden relative p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-200" type="button" aria-label="Thông báo">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button type="button" class="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all duration-200" aria-label="Yêu thích">
          <span class="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <button type="button" data-as-post-listing class="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap">
        Đăng tin
      </button>
      ${buildAuthCoreHtml()}
    `;
  }

  function findInnerBar(host) {
    return (
      host.querySelector(':scope > div[class*="justify-between"]') ||
      host.querySelector(':scope > div.flex.items-center.justify-between') ||
      host.querySelector(':scope > div.max-w')
    );
  }

  function findActionsContainer(header) {
    const nested = header.querySelector('#as-header-actions');
    if (nested && nested.parentElement !== header) return nested;

    const innerBar = findInnerBar(header);
    if (innerBar) {
      const cols = [...innerBar.children].filter((el) => el.tagName === 'DIV');
      if (cols.length >= 2) {
        const right = cols[cols.length - 1];
        const isBrandCol = right.querySelector('h1') || /^AutoSphere$/i.test((right.textContent || '').trim());
        if (!isBrandCol) {
          right.id = 'as-header-actions';
          right.classList.add('shrink-0');
          return right;
        }
      }
    }

    const children = [...header.children].filter((el) => el.tagName === 'DIV');
    const actions = children.find((el) => {
      if (el.querySelector('h1, .font-headline-md.text-primary')) return false;
      if (/AutoSphere/i.test(el.textContent || '') && el.querySelector('nav, a[href="#"]')) return false;
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
    (innerBar || header).appendChild(wrap);
    return wrap;
  }

  function removeOrphanAuthBlocks(header) {
    [...header.children].forEach((child) => {
      if (child.id === 'as-header-actions') child.remove();
      if (child.querySelector?.('#auth-guest, #auth-user')) child.remove();
    });
  }

  function wirePostListing(actions) {
    actions.querySelectorAll('[data-as-post-listing]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign(postListingHref());
      });
    });
  }

  function removeSidebarUserProfiles() {
    document.querySelectorAll('aside').forEach((aside) => {
      if (aside.dataset.shellNormalized === 'true') return;
      if (aside.dataset.asFilterSidebar === 'true') return;
      if (aside.querySelector('.filter-scroll') || /bộ lọc/i.test(aside.textContent || '')) return;

      const nav = aside.querySelector('nav');
      if (!nav) return;

      [...aside.children].forEach((child) => {
        if (child !== nav) child.remove();
      });
    });
  }

  function mountAppAuthHeader() {
    if (shouldSkipPage()) return false;

    const header = document.querySelector('body > header, body > nav.sticky, header.fixed, header.sticky');
    if (!header || header.closest('main, aside, section')) return false;

    removeOrphanAuthBlocks(header);

    const actions = findActionsContainer(header);
    const stitch = isStitchMarketHeader(header);

    actions.innerHTML = stitch ? buildStitchHeaderActionsHtml() : buildAuthActionsHtml();
    actions.classList.add('flex', 'items-center', 'gap-2', 'shrink-0');

    wirePostListing(actions);
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
