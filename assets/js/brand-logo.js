/**
 * Thay chữ "AutoSphere" bằng logo SVG (đã cắt padding)
 */
(function () {
  'use strict';

  const LOGO_FILE = 'assets/logo/autosphere-logo-header.png';

  function assetPrefix() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.rootPrefix) {
      return AutoSphereAuth.rootPrefix();
    }
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/') || path.includes('/apps/')) return '../../';
    if (path.includes('/khampha/') || path.includes('/garage/') || path.includes('/account/') || path.includes('/detail/')) {
      return '../';
    }
    return '';
  }

  function logoSrc() {
    return assetPrefix() + LOGO_FILE;
  }

  function homeHref(el) {
    if (el.tagName === 'A') {
      const href = el.getAttribute('href');
      if (href && href !== '#') return href;
    }
    if (typeof AutoSphereAuth !== 'undefined') return AutoSphereAuth.landingUrl();
    return assetPrefix() + 'index.html';
  }

  function logoImgHtml() {
    return `<img class="as-brand-logo__img" src="${logoSrc()}" alt="AutoSphere" width="180" height="28" decoding="async" style="height:28px;width:auto;max-width:min(180px,42vw);object-fit:contain">`;
  }

  function isBrandText(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim() === 'AutoSphere';
  }

  function shouldSkip(el) {
    if (!el || el.dataset.brandLogo === 'true') return true;
    if (el.closest('.as-brand-logo')) return true;
    if (el.querySelector('img, svg')) return true;
    if (el.closest('footer')) return true;
    return false;
  }

  function mountLogo(el) {
    if (shouldSkip(el)) return;

    const href = homeHref(el);
    const keepClasses = (el.className || '')
      .split(/\s+/)
      .filter((c) => c && !/^font-/.test(c))
      .join(' ');

    const a = document.createElement('a');
    a.href = href;
    a.className = `${keepClasses} as-brand-logo`.trim();
    a.dataset.brandLogo = 'true';
    a.dataset.brandLogoMounted = 'true';
    a.setAttribute('aria-label', 'AutoSphere — Về trang chủ');
    a.innerHTML = logoImgHtml();
    el.replaceWith(a);
  }

  function initBrandLogo() {
    if (window.__asBrandLogoInit) return;
    window.__asBrandLogoInit = true;
    document
      .querySelectorAll('.as-vei-header__logo, .as-app-topbar__logo, a.logo, [data-logo-home]')
      .forEach((el) => {
        if (el.dataset.brandLogoMounted === 'true') return;
        if (el.tagName === 'A' && el.querySelector('img')) {
          el.classList.add('as-brand-logo');
          el.dataset.brandLogo = 'true';
          el.dataset.brandLogoMounted = 'true';
          return;
        }
        if (isBrandText(el) || el.matches('.as-vei-header__logo, .as-app-topbar__logo, a.logo')) {
          mountLogo(el);
          el.dataset.brandLogoMounted = 'true';
        }
      });

    document.querySelectorAll('header h1, header a').forEach((el) => {
      if (el.dataset.brandLogoMounted === 'true') return;
      if (!isBrandText(el)) return;
      mountLogo(el);
    });
  }

  document.addEventListener('DOMContentLoaded', initBrandLogo);
  if (document.readyState !== 'loading') initBrandLogo();

  window.AutoSphereBrand = { logoSrc, initBrandLogo, mountLogo };
})();
