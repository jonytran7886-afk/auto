/**
 * Sidebar Khám phá / Giao dịch xe — wire links & auth gate
 */
(function () {
  'use strict';

  const AUTH_STEPS = new Set(
    (typeof KHAMPHA_FLOW !== 'undefined' ? KHAMPHA_FLOW : [])
      .filter((s) => s.auth)
      .map((s) => s.id)
  );

  const NAV_MAP = [
    { id: '01-kham-pha-xe', keys: ['khám phá', 'explore'] },
    { id: '03-so-sanh-xe', keys: ['so sánh', 'compare'] },
    { id: '05-yeu-cau-bao-gia', keys: ['báo giá', 'request_quote'] },
    { id: '06-dang-ky-lai-thu', keys: ['lái thử', 'directions_car'] },
    { id: '07-giu-cho-xe', keys: ['giữ chỗ', 'bookmark'] },
    { id: '09-hanh-trinh-mua-xe', keys: ['hành trình', 'route'] },
  ];

  const GARAGE_MAP = [
    { href: '../../garage/pages/01-danh-sach-phuong-tien.html', keys: ['danh sách phương tiện'] },
    { href: '../../garage/pages/05-giay-to-xe.html', keys: ['giấy tờ xe', 'giấy tờ'] },
    { href: '../../garage/pages/06-lich-su-so-huu.html', keys: ['lịch sử sở hữu', 'lịch sử'] },
    { href: '../../garage/pages/07-tinh-trang-xe.html', keys: ['tình trạng xe', 'tình trạng'] },
    { href: '../../garage/pages/08-gia-tri-xe.html', keys: ['giá trị xe', 'giá trị'] },
    { href: '../../garage/pages/09-ho-so-kinh-te-so.html', keys: ['hồ sơ kinh tế số', 'hồ sơ kinh tế'] },
  ];

  const MOBILE_NAV = [
    { id: '01-kham-pha-xe', keys: ['khám phá'] },
    { id: '03-so-sanh-xe', keys: ['so sánh'] },
    { id: '05-yeu-cau-bao-gia', keys: ['báo giá'] },
    { id: '06-dang-ky-lai-thu', keys: ['lái thử'] },
    { id: '07-giu-cho-xe', keys: ['giữ chỗ'] },
  ];

  function pageUrl(stepId) {
    const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
    const base = inPagesDir ? `${stepId}.html` : `pages/${stepId}.html`;
    if (AUTH_STEPS.has(stepId) && typeof AutoSphereAuth !== 'undefined' && !AutoSphereAuth.isLoggedIn()) {
      return AutoSphereAuth.loginUrl(`khampha/pages/${stepId}.html`);
    }
    return base;
  }

  function landingUrl() {
    return typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.landingUrl() : '../../index.html';
  }

  function profileUrl() {
    return typeof AutoSphereAuth !== 'undefined'
      ? AutoSphereAuth.profileUrl()
      : '../../account/pages/05-ho-so-ca-nhan.html';
  }

  function matchNavTarget(text, map) {
    const t = text.toLowerCase().replace(/\s+/g, ' ').trim();
    const sorted = [...map].sort((a, b) => {
      const maxA = Math.max(...a.keys.map((k) => k.length));
      const maxB = Math.max(...b.keys.map((k) => k.length));
      return maxB - maxA;
    });
    for (const item of sorted) {
      for (const key of item.keys) {
        if (t.includes(key)) return item;
      }
    }
    return null;
  }

  function wireKhamphaLink(el, map) {
    const item = matchNavTarget(el.textContent || '', map);
    if (!item || !item.id) return;
    el.setAttribute('href', pageUrl(item.id));
  }

  function wireGarageLink(el) {
    const item = matchNavTarget(el.textContent || '', GARAGE_MAP);
    if (!item) return;
    el.setAttribute('href', item.href);
  }

  function wireLogout(el) {
    const t = (el.textContent || '').toLowerCase();
    if (!t.includes('đăng xuất')) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof AutoSphereAuth !== 'undefined') AutoSphereAuth.logout();
      window.location.assign(landingUrl());
    });
  }

  function wireSettings(el) {
    const t = (el.textContent || '').toLowerCase();
    if (!t.includes('cài đặt')) return;
    if (el.tagName === 'A') el.href = profileUrl();
  }

  function wireLogoLinks() {
    if (document.querySelector('header a[aria-label="Về trang chủ AutoSphere"]')) return;
    const href = landingUrl();

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
    });
  }

  function wireCtaButtons() {
    document.querySelectorAll('main a, main button').forEach((el) => {
      const t = (el.textContent || '').toLowerCase();
      if (t.includes('yêu cầu báo giá') || t.includes('nhận báo giá')) {
        if (el.tagName === 'A') el.href = pageUrl('05-yeu-cau-bao-gia');
      }
      if (t.includes('đăng ký lái thử') || t.includes('lái thử ngay')) {
        if (el.tagName === 'A') el.href = pageUrl('06-dang-ky-lai-thu');
      }
      if (t.includes('giữ chỗ') || t.includes('đặt cọc')) {
        if (el.tagName === 'A') el.href = pageUrl('07-giu-cho-xe');
      }
      if (t.includes('so sánh') && el.tagName === 'A' && el.getAttribute('href') === '#') {
        el.href = pageUrl('03-so-sanh-xe');
      }
      if (t.includes('xem chi tiết') || t.includes('hồ sơ xe') || t.includes('xem hồ sơ')) {
        if (el.tagName === 'A') el.href = pageUrl('02-ho-so-xe');
      }
      if (t.includes('tư vấn') && (t.includes('ai') || t.includes('chat'))) {
        if (el.tagName === 'A') el.href = pageUrl('10-tu-van-ai');
      }
      if (t.includes('ưu đãi') && el.tagName === 'A' && el.getAttribute('href') === '#') {
        el.href = pageUrl('08-u-dai-dai-ly');
      }
    });

    document.querySelectorAll('main a[href="#"]').forEach((el) => {
      const card = el.closest('[class*="group"], article, .glass-card');
      if (card && /xe|vehicle|car|zenith|titan|pulse|nebula|vision/i.test(card.textContent || '')) {
        el.href = pageUrl('02-ho-so-xe');
      }
    });
  }

  function markActiveSidebar() {
    const stepId = window.KHAMPHA_STEP_ID;
    if (!stepId) return;

    document.querySelectorAll('aside nav a').forEach((a) => {
      const item = matchNavTarget(a.textContent || '', NAV_MAP);
      if (item && item.id === stepId) {
        a.classList.add('bg-primary-container', 'text-on-primary-container');
        a.classList.remove('text-on-surface-variant');
      }
    });
  }

  function wireAllNavAnchors() {
    const selectors = [
      'aside nav a[href="#"]',
      'aside a[href="#"]',
      'header nav a[href="#"]',
      'header a[href="#"]',
      'nav.fixed.bottom-0 a[href="#"]',
      'nav.md\\:hidden.fixed a[href="#"]',
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        wireKhamphaLink(el, NAV_MAP);
        wireGarageLink(el);
        wireLogout(el);
        wireSettings(el);
      });
    });

    document.querySelectorAll('aside button').forEach(wireLogout);
  }

  function init() {
    if (!window.KHAMPHA_STEP_ID) return;
    wireAllNavAnchors();
    wireLogoLinks();
    wireCtaButtons();
    markActiveSidebar();
  }

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();
})();
