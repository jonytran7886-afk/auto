/**
 * Logo / brand header → về landing page
 */
(function () {
  'use strict';

  function landingHref() {
    if (typeof AutoSphereAuth !== 'undefined') return AutoSphereAuth.landingUrl();
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/khampha/pages/') || path.includes('/garage/pages/') || path.includes('/account/pages/')) {
      return '../../index.html';
    }
    if (path.includes('/pages/')) return '../../index.html';
    if (path.includes('/khampha/') || path.includes('/garage/') || path.includes('/account/') || path.includes('/apps/')) {
      return '../index.html';
    }
    return 'index.html';
  }

  function linkBrand(el) {
    if (!el || el.dataset.logoLinked === 'true') return;
    if (el.closest('footer')) return;

    el.dataset.logoLinked = 'true';

    if (el.tagName === 'A') {
      el.href = landingHref();
      return;
    }

    const a = document.createElement('a');
    a.href = landingHref();
    a.className = `${el.className} no-underline hover:opacity-90 transition-opacity cursor-pointer`.trim();
    a.innerHTML = el.innerHTML;
    a.setAttribute('aria-label', 'Về trang chủ AutoSphere');
    el.replaceWith(a);
  }

  function initLogoLinks() {
    document.querySelectorAll('header').forEach((header) => {
      header.querySelectorAll('h1, span, a').forEach((el) => {
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (text === 'AutoSphere') linkBrand(el);
      });

      const left = header.querySelector(':scope > div:first-child');
      if (left && /gara cá nhân/i.test(left.textContent || '') && left.querySelector('.material-symbols-outlined')) {
        linkBrand(left);
      }
    });

    document.querySelectorAll('a.logo, [data-logo-home]').forEach((el) => {
      el.href = landingHref();
    });
  }

  document.addEventListener('DOMContentLoaded', initLogoLinks);
  if (document.readyState !== 'loading') initLogoLinks();
})();
