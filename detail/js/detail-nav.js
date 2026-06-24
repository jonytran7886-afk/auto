/**
 * Thị trường xe — wire links & auth gate
 */
(function () {
  'use strict';

  const KHAMPHA_AUTH = new Set(['05-yeu-cau-bao-gia', '06-dang-ky-lai-thu', '07-giu-cho-xe', '09-hanh-trinh-mua-xe']);

  function inPagesDir() {
    return /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
  }

  function root() {
    return inPagesDir() ? '../../' : '../';
  }

  function detailUrl(stepId) {
    const base = inPagesDir() ? `${stepId}.html` : `pages/${stepId}.html`;
    return base;
  }

  function khamphaUrl(stepId) {
    const href = `${root()}khampha/pages/${stepId}.html`;
    if (KHAMPHA_AUTH.has(stepId) && typeof AutoSphereAuth !== 'undefined' && !AutoSphereAuth.isLoggedIn()) {
      return AutoSphereAuth.loginUrl(`khampha/pages/${stepId}.html`);
    }
    return href;
  }

  function appUrl(page) {
    return `${root()}apps/${page}`;
  }

  function landingUrl() {
    return typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.landingUrl() : `${root()}index.html`;
  }

  function wireLogoLinks() {
    if (document.querySelector('[data-logo-linked="true"]')) return;
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
      a.dataset.logoLinked = 'true';
      el.replaceWith(a);
    }

    document.querySelectorAll('header, body > nav.sticky').forEach((bar) => {
      bar.querySelectorAll('h1, span.font-headline-md, span.font-bold').forEach((el) => {
        if ((el.textContent || '').trim() === 'AutoSphere') linkBrand(el);
      });
    });
  }

  function wireTopNav() {
    document.querySelectorAll('header nav a, body > nav.sticky a').forEach((a) => {
      const t = (a.textContent || '').trim().toLowerCase();
      if (t === 'thị trường') a.href = detailUrl('01-danh-sach-xe');
      else if (t === 'dịch vụ') a.href = `${root()}marketplace.html`;
      else if (t === 'hỗ trợ') a.href = khamphaUrl('10-tu-van-ai');
    });
  }

  function wirePostListing() {
    document.querySelectorAll('header button, body > nav.sticky button').forEach((btn) => {
      const t = (btn.textContent || '').toLowerCase();
      if (!t.includes('đăng tin')) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign(appUrl('dang-ban-xe.html'));
      });
    });
  }

  function wireListCards() {
    if (window.DETAIL_STEP_ID !== '01-danh-sach-xe') return;

    document.querySelectorAll('main .grid > div').forEach((card) => {
      if (!card.querySelector('h4')) return;

      const detailBtn = [...card.querySelectorAll('button')].find((b) =>
        (b.textContent || '').toLowerCase().includes('xem chi tiết')
      );
      if (detailBtn && !detailBtn.dataset.detailLinked) {
        detailBtn.dataset.detailLinked = 'true';
        detailBtn.addEventListener('click', () => window.location.assign(detailUrl('02-chi-tiet-xe')));
      }

      const imgWrap = card.querySelector('[class*="aspect-"]');
      if (imgWrap && !imgWrap.dataset.detailLinked) {
        imgWrap.dataset.detailLinked = 'true';
        imgWrap.style.cursor = 'pointer';
        imgWrap.addEventListener('click', () => window.location.assign(detailUrl('02-chi-tiet-xe')));
      }
    });
  }

  const LISTING_CARDS = [
    { name: 'Toyota Camry', variant: '2.5Q 2026', price: '1.249.000.000 đ', oldPrice: '1.299.000.000 đ', discount: '-50.000.000 đ', dealer: 'Toyota Đông Sài Gòn', distance: '4.2 km', rating: '4.8', badge: 'Xe mới' },
    { name: 'Honda CR-V', variant: 'e:HEV RS 2025', price: '1.259.000.000 đ', oldPrice: '1.280.000.000 đ', discount: '-21.000.000 đ', dealer: 'Honda Kim Thanh', distance: '2.8 km', rating: '4.9', badge: 'Xe mới' },
    { name: 'Mazda CX-5', variant: '2.0 Premium 2025', price: '829.000.000 đ', oldPrice: '859.000.000 đ', discount: '-30.000.000 đ', dealer: 'Mazda Bình Tân', distance: '1.5 km', rating: '4.7', badge: 'Xe mới' },
    { name: 'VinFast VF 8', variant: 'Plus 2024', price: '1.250.000.000 đ', oldPrice: '1.470.000.000 đ', discount: '-220.000.000 đ', dealer: 'VinFast Hà Nội', distance: '3.1 km', rating: '4.8', badge: 'Ưu đãi' },
    { name: 'Hyundai Tucson', variant: '2.0 Premium 2025', price: '899.000.000 đ', oldPrice: '929.000.000 đ', discount: '-30.000.000 đ', dealer: 'Hyundai Miền Nam', distance: '5.0 km', rating: '4.6', badge: 'Xe mới' },
    { name: 'KIA Sportage', variant: '2.0GT-Line 2025', price: '949.000.000 đ', oldPrice: '979.000.000 đ', discount: '-30.000.000 đ', dealer: 'KIA Thảo Điền', distance: '2.2 km', rating: '4.7', badge: 'Xe mới' },
    { name: 'Ford Territory', variant: 'Trend 2025', price: '799.000.000 đ', oldPrice: '829.000.000 đ', discount: '-30.000.000 đ', dealer: 'Ford Giai Phong', distance: '6.4 km', rating: '4.5', badge: 'Xe mới' },
    { name: 'Mercedes-Benz GLC', variant: '200 2024', price: '2.150.000.000 đ', oldPrice: '2.199.000.000 đ', discount: '-49.000.000 đ', dealer: 'Mercedes Star', distance: '7.8 km', rating: '4.9', badge: 'Cao cấp' },
    { name: 'BMW X3', variant: 'xDrive20i 2024', price: '2.289.000.000 đ', oldPrice: '2.350.000.000 đ', discount: '-61.000.000 đ', dealer: 'BMW Euro Auto', distance: '8.1 km', rating: '4.8', badge: 'Cao cấp' },
    { name: 'Toyota Vios', variant: '1.5G CVT 2025', price: '558.000.000 đ', oldPrice: '578.000.000 đ', discount: '-20.000.000 đ', dealer: 'Toyota An Sương', distance: '1.1 km', rating: '4.6', badge: 'Xe mới' },
    { name: 'Hyundai Creta', variant: '1.5 Premium 2025', price: '689.000.000 đ', oldPrice: '709.000.000 đ', discount: '-20.000.000 đ', dealer: 'Hyundai Trường Chinh', distance: '3.6 km', rating: '4.7', badge: 'Xe mới' },
    { name: 'Mitsubishi Xforce', variant: 'Premium 2025', price: '599.000.000 đ', oldPrice: '619.000.000 đ', discount: '-20.000.000 đ', dealer: 'Mitsubishi Vĩnh Phú', distance: '4.9 km', rating: '4.5', badge: 'Xe mới' },
  ];

  function applyCardData(card, data) {
    const h4 = card.querySelector('h4');
    if (h4) h4.textContent = data.name;

    card.querySelectorAll('p.font-body-md.text-on-surface-variant').forEach((p, i) => {
      if (i === 0) p.textContent = data.variant;
    });

    const priceEl = card.querySelector('span.font-headline-md.text-primary');
    if (priceEl) priceEl.textContent = data.price;

    const oldPrice = card.querySelector('span.line-through');
    if (oldPrice) oldPrice.textContent = data.oldPrice;

    const discount = card.querySelector('span.text-error.bg-error-container, span.bg-error-container');
    if (discount) discount.textContent = data.discount;

    card.querySelectorAll('.material-symbols-outlined').forEach((icon) => {
      const label = (icon.textContent || '').trim();
      const row = icon.parentElement;
      if (!row) return;
      const textEl = row.querySelector('span:not(.material-symbols-outlined)');
      if (label === 'store' && textEl) textEl.textContent = data.dealer;
      if (label === 'near_me' && textEl) textEl.textContent = `Cách đây ${data.distance}`;
      if (label === 'star' && textEl) textEl.textContent = data.rating;
    });

    const badge = card.querySelector('.absolute.top-3.left-3, .absolute.top-3.left-3.bg-secondary-container');
    if (badge) badge.textContent = data.badge;
  }

  function expandVehicleCards() {
    if (window.DETAIL_STEP_ID !== '01-danh-sach-xe') return;

    const grid = document.querySelector('main section .grid, main .grid.grid-cols-1');
    if (!grid || grid.dataset.expanded === '1') return;

    const template = grid.querySelector(':scope > div');
    if (!template) return;

    const fragment = document.createDocumentFragment();
    LISTING_CARDS.forEach((data) => {
      const card = template.cloneNode(true);
      applyCardData(card, data);
      fragment.appendChild(card);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);
    grid.dataset.expanded = '1';
  }

  function markFilterSidebar() {
    document.querySelectorAll('main aside, aside[class*="280px"]').forEach((aside) => {
      if (aside.querySelector('.filter-scroll') || /bộ lọc/i.test(aside.textContent || '')) {
        aside.dataset.asFilterSidebar = 'true';
      }
    });
  }

  function wireBreadcrumbs() {
    if (window.DETAIL_STEP_ID !== '02-chi-tiet-xe') return;

    const crumbs = document.querySelector('main .flex.items-center.gap-2.mb-6');
    if (!crumbs) return;

    const spans = [...crumbs.querySelectorAll('span')].filter((s) => !s.classList.contains('material-symbols-outlined'));
    if (spans[0]) {
      const home = document.createElement('a');
      home.href = landingUrl();
      home.className = 'hover:text-primary cursor-pointer';
      home.textContent = spans[0].textContent;
      spans[0].replaceWith(home);
    }
    if (spans[1]) {
      const list = document.createElement('a');
      list.href = detailUrl('01-danh-sach-xe');
      list.className = 'hover:text-primary cursor-pointer';
      list.textContent = spans[1].textContent;
      spans[1].replaceWith(list);
    }
  }

  function wireCtaButtons() {
    const targets = document.querySelectorAll('main button, main a, footer li');

    targets.forEach((el) => {
      const t = (el.textContent || '').toLowerCase();

      if (t.includes('yêu cầu báo giá') || t.includes('nhận báo giá')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('05-yeu-cau-bao-gia'));
        });
      }
      if (t.includes('đăng ký lái thử') || t.includes('lái thử ngay')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('06-dang-ky-lai-thu'));
        });
      }
      if (t.includes('giữ chỗ') || t.includes('đặt cọc')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('07-giu-cho-xe'));
        });
      }
      if (t.includes('so sánh')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('03-so-sanh-xe'));
        });
      }
      if (t.includes('tư vấn') || t.includes('chat ngay')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('10-tu-van-ai'));
        });
      }
      if (t.includes('vehicle digital twin') || (t.includes('digital twin') && el.closest('.absolute'))) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(appUrl('vehicle-twin.html'));
        });
      }
      if (t.includes('vehicle passport') && el.closest('.absolute, section')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('02-ho-so-xe'));
        });
      }
      if (t.includes('bảng giá xe mới') || t.includes('xe cũ chính hãng')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(detailUrl('01-danh-sach-xe'));
        });
      }
      if (t.includes('so sánh thông số')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(khamphaUrl('03-so-sanh-xe'));
        });
      }
      if (t.includes('tính toán trả góp')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.assign(appUrl('finance.html'));
        });
      }
    });
  }

  function markActiveTopNav() {
    const stepId = window.DETAIL_STEP_ID;
    if (!stepId) return;

    document.querySelectorAll('header nav a, body > nav.sticky a').forEach((a) => {
      const t = (a.textContent || '').trim().toLowerCase();
      if (t === 'thị trường') {
        a.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
        a.classList.remove('text-on-surface-variant');
      }
    });
  }

  function wireBadges() {
    if (window.DETAIL_STEP_ID !== '02-chi-tiet-xe') return;

    document.querySelectorAll('main span.font-label-md, main span[class*="rounded-full"]').forEach((el) => {
      const t = (el.textContent || '').toLowerCase();
      const badge = el.closest('span.rounded-full') || el;
      if (t.includes('vehicle digital twin')) {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', () => window.location.assign(appUrl('vehicle-twin.html')));
      } else if (t.includes('vehicle passport')) {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', () => window.location.assign(khamphaUrl('02-ho-so-xe')));
      } else if (t.includes('đã xác thực')) {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', () => window.location.assign(`${root()}garage/pages/03-xac-thuc-phuong-tien.html`));
      }
    });
  }

  function init() {
    if (!window.DETAIL_STEP_ID) return;
    markFilterSidebar();
    wireLogoLinks();
    wireTopNav();
    wirePostListing();
    expandVehicleCards();
    wireListCards();
    wireBreadcrumbs();
    wireBadges();
    wireCtaButtons();
    markActiveTopNav();
  }

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();

  window.DetailNav = { init, detailUrl, khamphaUrl };
})();
