/**
 * Sidebar Gara cá nhân — shell thống nhất, không profile/avatar bên trái
 */
(function () {
  'use strict';

  const SIDEBAR_STEPS = new Set([
    '01-danh-sach-phuong-tien',
    '05-giay-to-xe',
    '06-lich-su-so-huu',
    '07-tinh-trang-xe',
    '08-gia-tri-xe',
    '09-ho-so-kinh-te-so',
    '10-lich-su-giao-dich',
  ]);

  const SIDEBAR_ITEMS = [
    { step: '01-danh-sach-phuong-tien', label: 'Danh sách phương tiện', icon: 'directions_car' },
    { step: '05-giay-to-xe', label: 'Giấy tờ xe', icon: 'description' },
    { step: '06-lich-su-so-huu', label: 'Lịch sử sở hữu', icon: 'manage_history' },
    { step: '07-tinh-trang-xe', label: 'Tình trạng xe', icon: 'speed' },
    { step: '08-gia-tri-xe', label: 'Giá trị xe', icon: 'payments' },
    { step: '09-ho-so-kinh-te-so', label: 'Hồ sơ kinh tế số', icon: 'account_balance_wallet' },
  ];

  function pageUrl(stepId) {
    const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
    return inPagesDir ? `${stepId}.html` : `pages/${stepId}.html`;
  }

  function garageAppUrl() {
    const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
    return inPagesDir ? '../../garage.html' : '../garage.html';
  }

  function landingUrl() {
    return typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.landingUrl() : '../../index.html';
  }

  function stripLegacySidebar(aside) {
    const nav = aside.querySelector('nav');
    [...aside.children].forEach((child) => {
      if (child !== nav) child.remove();
    });
  }

  function normalizeSidebar() {
    const aside = document.querySelector('body aside, aside');
    if (!aside) return false;

    stripLegacySidebar(aside);

    const currentStep = window.GARAGE_STEP_ID;
    aside.dataset.shellNormalized = 'true';
    aside.className = 'as-garage-sidebar hidden lg:flex flex-col';

    const items = SIDEBAR_ITEMS.map((item) => {
      const active = item.step === currentStep ? ' is-active' : '';
      const filled = active ? " style=\"font-variation-settings: 'FILL' 1;\"" : '';
      return `<a href="${pageUrl(item.step)}" class="as-garage-sidebar__link${active}">
        <span class="material-symbols-outlined"${filled}>${item.icon}</span>
        <span>${item.label}</span>
      </a>`;
    }).join('');

    aside.innerHTML = `
      <nav class="as-garage-sidebar__nav" aria-label="Gara cá nhân">${items}</nav>
      <div class="as-garage-sidebar__footer">
        <a href="${garageAppUrl()}" class="as-garage-sidebar__back">
          <span class="material-symbols-outlined">apps</span>
          Trung tâm ứng dụng
        </a>
      </div>`;

    document.body.classList.add('as-garage-shell');
    document.documentElement.classList.add('as-garage-app');
    return true;
  }

  function wireLogoLinks() {
    if (document.querySelector('header a[aria-label="Về Garage AutoSphere"]')) return;

    function linkBrand(el, href, label) {
      if (!el || el.dataset.logoLinked === 'true' || el.closest('footer')) return;
      el.dataset.logoLinked = 'true';
      if (el.tagName === 'A') {
        el.href = href;
        el.setAttribute('aria-label', label);
        return;
      }
      const a = document.createElement('a');
      a.href = href;
      a.className = `${el.className} no-underline hover:opacity-90 transition-opacity cursor-pointer`.trim();
      a.innerHTML = el.innerHTML;
      a.setAttribute('aria-label', label);
      el.replaceWith(a);
    }

    document.querySelectorAll('header').forEach((header) => {
      const left = header.querySelector(':scope > div:first-child');
      if (left && /gara cá nhân/i.test(left.textContent || '')) {
        linkBrand(left, garageAppUrl(), 'Về Garage AutoSphere');
      }
    });
  }

  function init() {
    const stepId = window.GARAGE_STEP_ID;
    if (!stepId || !SIDEBAR_STEPS.has(stepId)) return;

    document.documentElement.classList.add('as-garage-app');
    normalizeSidebar();
    wireLogoLinks();

    if (typeof AppAuthHeader !== 'undefined' && AppAuthHeader.removeSidebarUserProfiles) {
      AppAuthHeader.removeSidebarUserProfiles();
    }
  }

  window.GarageNav = { init, normalizeSidebar, stripLegacySidebar };

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();
})();
