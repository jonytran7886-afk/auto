/**
 * Thị trường xe — wire links, cards & dealer CTA
 */
(function () {
  'use strict';

  const KHAMPHA_AUTH = new Set(['05-yeu-cau-bao-gia', '06-dang-ky-lai-thu', '07-giu-cho-xe', '09-hanh-trinh-mua-xe']);
  const DEALER_ROLES = new Set(['dealer', 'oem']);

  function inPagesDir() {
    return /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
  }

  function root() {
    return inPagesDir() ? '../../' : '../';
  }

  function detailUrl(stepId) {
    return inPagesDir() ? `${stepId}.html` : `pages/${stepId}.html`;
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

  const LISTING_CARDS = [
    { name: 'Toyota Camry', variant: '2.5Q 2026', price: '1.249.000.000 đ', oldPrice: '1.299.000.000 đ', discount: '-50.000.000 đ', dealer: 'Toyota Đông Sài Gòn', distance: 'Cách đây 4.2 km', badge: 'Xe mới' },
    { name: 'Honda CR-V', variant: 'e:HEV RS 2025', price: '1.259.000.000 đ', oldPrice: '1.280.000.000 đ', discount: '-21.000.000 đ', dealer: 'Honda Kim Thanh', distance: 'Cách đây 2.8 km', badge: 'Xe mới' },
    { name: 'Mazda CX-5', variant: '2.0 Premium 2025', price: '829.000.000 đ', oldPrice: '859.000.000 đ', discount: '-30.000.000 đ', dealer: 'Mazda Bình Tân', distance: 'Cách đây 1.5 km', badge: 'Xe mới' },
    { name: 'VinFast VF 8', variant: 'Plus 2024', price: '1.250.000.000 đ', oldPrice: '1.470.000.000 đ', discount: '-220.000.000 đ', dealer: 'VinFast Hà Nội', distance: 'Cách đây 3.1 km', badge: 'Ưu đãi' },
    { name: 'Hyundai Tucson', variant: '2.0 Premium 2025', price: '899.000.000 đ', oldPrice: '929.000.000 đ', discount: '-30.000.000 đ', dealer: 'Hyundai Miền Nam', distance: 'Cách đây 5.0 km', badge: 'Xe mới' },
    { name: 'KIA Sportage', variant: '2.0GT-Line 2025', price: '949.000.000 đ', oldPrice: '979.000.000 đ', discount: '-30.000.000 đ', dealer: 'KIA Thảo Điền', distance: 'Cách đây 2.2 km', badge: 'Xe mới' },
    { name: 'Ford Territory', variant: 'Trend 2025', price: '799.000.000 đ', oldPrice: '829.000.000 đ', discount: '-30.000.000 đ', dealer: 'Ford Giai Phong', distance: 'Cách đây 6.4 km', badge: 'Xe mới' },
    { name: 'Mercedes-Benz GLC', variant: '200 2024', price: '2.150.000.000 đ', oldPrice: '2.199.000.000 đ', discount: '-49.000.000 đ', dealer: 'Mercedes Star', distance: 'Cách đây 7.8 km', badge: 'Cao cấp' },
    { name: 'BMW X3', variant: 'xDrive20i 2024', price: '2.289.000.000 đ', oldPrice: '2.350.000.000 đ', discount: '-61.000.000 đ', dealer: 'BMW Euro Auto', distance: 'Cách đây 8.1 km', badge: 'Cao cấp' },
    { name: 'Toyota Vios', variant: '1.5G CVT 2025', price: '558.000.000 đ', oldPrice: '578.000.000 đ', discount: '-20.000.000 đ', dealer: 'Toyota An Sương', distance: 'Cách đây 1.1 km', badge: 'Xe mới' },
    { name: 'Hyundai Creta', variant: '1.5 Premium 2025', price: '689.000.000 đ', oldPrice: '709.000.000 đ', discount: '-20.000.000 đ', dealer: 'Hyundai Trường Chinh', distance: 'Cách đây 3.6 km', badge: 'Xe mới' },
    { name: 'Mitsubishi Xforce', variant: 'Premium 2025', price: '599.000.000 đ', oldPrice: '619.000.000 đ', discount: '-20.000.000 đ', dealer: 'Mitsubishi Vĩnh Phú', distance: 'Cách đây 4.9 km', badge: 'Xe mới' },
  ];

  function applyCardData(card, data) {
    const map = {
      name: data.name,
      variant: data.variant,
      price: data.price,
      oldPrice: data.oldPrice,
      discount: data.discount,
      dealer: data.dealer,
      distance: data.distance,
      badge: data.badge,
    };
    Object.entries(map).forEach(([key, val]) => {
      const el = card.querySelector(`[data-field="${key}"]`);
      if (el) el.textContent = val;
    });
  }

  function expandVehicleCards() {
    if (window.DETAIL_STEP_ID !== '01-danh-sach-xe') return;

    const grid = document.getElementById('dl-vehicle-grid');
    if (!grid || grid.dataset.expanded === '1') return;

    const template = grid.querySelector('[data-vehicle-card]');
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

  function wireListCards() {
    if (window.DETAIL_STEP_ID !== '01-danh-sach-xe') return;

    document.querySelectorAll('[data-vehicle-card]').forEach((card) => {
      const goDetail = () => window.location.assign(detailUrl('02-chi-tiet-xe'));

      card.querySelector('[data-detail-btn]')?.addEventListener('click', goDetail);
      card.querySelector('[data-detail-link]')?.addEventListener('click', (e) => {
        if (e.target.closest('.dl-card__fav')) return;
        goDetail();
      });
    });
  }

  function initDealerPostBtn() {
    const btn = document.getElementById('as-dealer-post');
    if (!btn) return;

    const role = typeof AutoSphereAuth !== 'undefined' ? AutoSphereAuth.getCurrentRole()?.id : null;
    const ws = document.body.dataset.veiWorkspace;
    const show = (role && DEALER_ROLES.has(role)) || ws === 'dealer' || ws === 'oem';
    btn.classList.toggle('hidden', !show);
  }

  function initViewToggle() {
    const group = document.querySelector('.dl-results__view');
    if (!group) return;

    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.dl-results__view-btn');
      if (!btn) return;
      group.querySelectorAll('.dl-results__view-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
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
    expandVehicleCards();
    wireListCards();
    initDealerPostBtn();
    initViewToggle();
    wireBreadcrumbs();
    wireBadges();
    wireCtaButtons();
  }

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();

  document.addEventListener('vei:workspace-change', initDealerPostBtn);

  window.DetailNav = { init, detailUrl, khamphaUrl };
})();
