/**
 * Sidebar Gara cá nhân — danh sách phương tiện, giấy tờ, …
 */
(function () {
  'use strict';

  const GARAGE_PAGES = GARAGE_FLOW.map((s) => s.id);

  const NAV_MAP = [
    { id: '01-danh-sach-phuong-tien', keys: ['danh sách phương tiện', 'phương tiện'] },
    { id: '05-giay-to-xe', keys: ['giấy tờ xe', 'giấy tờ'] },
    { id: '06-lich-su-so-huu', keys: ['lịch sử sở hữu', 'lịch sử'] },
    { id: '07-tinh-trang-xe', keys: ['tình trạng xe', 'tình trạng', 'định giá'] },
    { id: '08-gia-tri-xe', keys: ['giá trị xe', 'giá trị'] },
    { id: '09-ho-so-kinh-te-so', keys: ['hồ sơ kinh tế số', 'hồ sơ'] },
  ];

  function pageUrl(stepId) {
    const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
    return inPagesDir ? `${stepId}.html` : `pages/${stepId}.html`;
  }

  function matchNavTarget(text) {
    const t = text.toLowerCase().replace(/\s+/g, ' ').trim();
    const sorted = [...NAV_MAP].sort((a, b) => {
      const maxA = Math.max(...a.keys.map((k) => k.length));
      const maxB = Math.max(...b.keys.map((k) => k.length));
      return maxB - maxA;
    });
    for (const item of sorted) {
      for (const key of item.keys) {
        if (t.includes(key)) return item.id;
      }
    }
    return null;
  }

  function wireLink(el) {
    const targetId = matchNavTarget(el.textContent || '');
    if (!targetId) return;
    el.setAttribute('href', pageUrl(targetId));
  }

  function wireLogout(el) {
    const t = (el.textContent || '').toLowerCase();
    if (!t.includes('đăng xuất')) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof AutoSphereAuth !== 'undefined') AutoSphereAuth.logout();
      window.location.assign(typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.landingUrl() : '../../index.html');
    });
  }

  function wireLogoLinks() {
    const href = typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.landingUrl() : '../../index.html';

    function linkBrand(el) {
      if (!el || el.dataset.logoLinked === 'true' || el.closest('footer')) return;
      el.dataset.logoLinked = 'true';
      if (el.tagName === 'A') {
        el.href = href;
        return;
      }
      const a = document.createElement('a');
      a.href = href;
      a.className = `${el.className} no-underline hover:opacity-90 transition-opacity`.trim();
      a.innerHTML = el.innerHTML;
      a.setAttribute('aria-label', 'Về trang chủ AutoSphere');
      el.replaceWith(a);
    }

    document.querySelectorAll('header').forEach((header) => {
      header.querySelectorAll('span, h1').forEach((el) => {
        if ((el.textContent || '').trim() === 'AutoSphere') linkBrand(el);
      });
      const left = header.querySelector(':scope > div:first-child');
      if (left && /gara cá nhân/i.test(left.textContent || '') && left.querySelector('.material-symbols-outlined')) {
        linkBrand(left);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.GARAGE_STEP_ID || !GARAGE_PAGES.includes(window.GARAGE_STEP_ID)) return;

    document.querySelectorAll('aside nav a[href="#"], aside a[href="#"]').forEach((el) => {
      wireLink(el);
      wireLogout(el);
    });

    document.querySelectorAll('aside button').forEach(wireLogout);

    document.querySelectorAll('nav.fixed.bottom-0 a, nav.md\\:hidden a').forEach(wireLink);

    wireLogoLinks();
  });
})();
