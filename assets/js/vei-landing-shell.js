/**
 * VEI landing pages — inject minimal header/footer shell
 */
(function () {
  'use strict';

  const LANDING_HEADERS = {
    'vehicle-profile': {
      title: 'Hồ sơ phương tiện',
      subtitle: 'Vehicle Identity Layer — trái tim của Vehicle Economy Infrastructure',
      cta: { label: 'Tạo Garage của tôi', href: 'garage.html', auth: true },
      secondary: { label: 'Tìm hiểu VEI', href: 'index.html#ecosystem' },
    },
    services: {
      title: 'Dịch vụ phương tiện',
      subtitle: 'Kết nối gara, bảo dưỡng, bảo hiểm, tài chính và cứu hộ trên một hạ tầng số',
      cta: { label: 'Khám phá dịch vụ', href: 'apps/garage-service.html' },
      secondary: { label: 'Đặt lịch', href: 'apps/garage-service.html', auth: true },
    },
    ecosystem: {
      title: 'Hệ sinh thái VEI',
      subtitle: 'OEM, đại lý, gara, fleet, affiliate, creator và nhà đầu tư — cùng kiến tạo nền kinh tế phương tiện',
      cta: { label: 'Gia nhập hệ sinh thái', href: 'join-ecosystem.html', auth: true },
      secondary: { label: 'Xem vai trò', href: 'index.html#personas' },
    },
    'join-ecosystem': {
      title: 'Gia nhập hệ sinh thái',
      subtitle: 'Chọn Workspace phù hợp để bắt đầu vận hành trên VEI',
      cta: { label: 'Đăng ký Workspace', href: 'account/pages/01-dang-ky.html' },
      secondary: { label: 'Liên hệ AutoSphere', href: 'index.html#developer' },
    },
  };

  function loginHref(target) {
    if (typeof AutoSphereAuth !== 'undefined') return AutoSphereAuth.loginUrl(target);
    return `account/pages/02-dang-nhap.html?redirect=${encodeURIComponent(target)}`;
  }

  function hrefForCta(cta) {
    if (!cta) return '#';
    if (cta.auth && typeof AutoSphereAuth !== 'undefined' && !AutoSphereAuth.isLoggedIn()) {
      return loginHref(cta.href);
    }
    return cta.href;
  }

  function initLanding(pageId) {
    const cfg = LANDING_HEADERS[pageId];
    const root = document.getElementById('vei-landing-root');
    if (!cfg || !root) return;

    root.innerHTML = `
      <div class="vei-landing-hero">
        <span class="vei-landing-layer">${cfg.subtitle.split('—')[0].trim()}</span>
        <h1>${cfg.title}</h1>
        <p>${cfg.subtitle}</p>
        <div class="vei-landing-cta">
          <a href="${hrefForCta(cfg.cta)}" class="vei-landing-btn-primary" ${cfg.cta.auth ? 'data-auth="true" data-href="' + cfg.cta.href + '"' : ''}>${cfg.cta.label}</a>
          ${cfg.secondary ? `<a href="${hrefForCta(cfg.secondary)}" class="vei-landing-btn-secondary" ${cfg.secondary.auth ? 'data-auth="true" data-href="' + cfg.secondary.href + '"' : ''}>${cfg.secondary.label}</a>` : ''}
        </div>
      </div>
      <div class="vei-landing-grid" id="vei-landing-features"></div>
    `;

    const features = document.getElementById('vei-landing-features');
    if (!features) return;

    const cards = {
      'vehicle-profile': [
        { icon: 'garage', title: 'Garage của tôi', desc: 'Quản lý toàn bộ phương tiện tại một nơi' },
        { icon: 'timeline', title: 'Vehicle Timeline', desc: 'Lịch sử sở hữu, bảo dưỡng và sự kiện' },
        { icon: 'hub', title: 'Digital Twin', desc: 'Bản sao số realtime của phương tiện' },
      ],
      services: [
        { icon: 'build', title: 'Gara & Bảo dưỡng', desc: 'Đặt lịch, theo dõi tiến độ sửa chữa' },
        { icon: 'security', title: 'Bảo hiểm', desc: 'Hợp đồng, bồi thường minh bạch' },
        { icon: 'payments', title: 'Tài chính', desc: 'Trả góp, thanh toán tích hợp' },
      ],
      ecosystem: [
        { icon: 'factory', title: 'OEM', desc: 'Hãng xe tham gia chuỗi giá trị số' },
        { icon: 'storefront', title: 'Đại lý', desc: 'Phân phối và chăm sóc khách hàng' },
        { icon: 'trending_up', title: 'Nhà đầu tư', desc: 'Vehicle asset & data economy' },
      ],
      'join-ecosystem': [
        { icon: 'person', title: 'Người dùng', desc: 'Garage cá nhân & dịch vụ' },
        { icon: 'code', title: 'Developer', desc: 'API, SDK, Sandbox' },
        { icon: 'hub', title: 'Đối tác', desc: 'Affiliate, fleet, gara doanh nghiệp' },
      ],
    };

    (cards[pageId] || []).forEach((c) => {
      features.innerHTML += `
        <div class="vei-landing-card">
          <span class="material-symbols-outlined">${c.icon}</span>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>`;
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-auth="true"]');
      if (!link) return;
      if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn()) return;
      e.preventDefault();
      window.location.href = loginHref(link.dataset.href);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.dataset.veiLanding;
    if (pageId) initLanding(pageId);
  });

  window.VEILanding = { initLanding };
})();
