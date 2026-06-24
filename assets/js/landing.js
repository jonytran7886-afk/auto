/**
 * AutoSphere Landing Page — Interactions
 */

(function () {
  'use strict';

  // ── Value proposition tabs ──
  const VALUE_TABS = {
    consumer: {
      label: 'Người dùng',
      cards: [
        {
          title: 'Gara cá nhân',
          desc: 'Quản lý nhiều phương tiện, theo dõi giá trị xe và hồ sơ kinh tế số trên một nền tảng thống nhất.',
          benefit: 'Quản lý 100% vòng đời xe',
        },
        {
          title: 'Smart Insurance',
          desc: 'Hợp đồng bảo hiểm năng động điều chỉnh mức phí dựa trên dữ liệu lái xe thực tế và độ an toàn vận hành.',
          benefit: 'Giảm 25% phí bảo hiểm',
        },
      ],
    },
    dealer: {
      label: 'Đại lý',
      cards: [
        {
          title: 'Lead Intelligence',
          desc: 'Tiếp nhận lead từ OEM, AutoSphere và Affiliate. Chấm điểm và dự báo doanh số bằng AI.',
          benefit: 'Tăng 40% tỷ lệ chuyển đổi',
        },
        {
          title: 'Báo giá tổng hợp',
          desc: 'Tạo báo giá xe + tài chính + bảo hiểm trong một flow duy nhất, ký hợp đồng điện tử.',
          benefit: 'Giảm 60% thời gian bán hàng',
        },
      ],
    },
    oem: {
      label: 'OEMs',
      cards: [
        {
          title: 'Vehicle Economy Profile',
          desc: 'Theo dõi giá trị còn lại, tỷ lệ giữ giá và chi phí sở hữu của từng phương tiện lưu hành.',
          benefit: 'Dữ liệu R&D thực tế',
        },
        {
          title: 'Mạng lưới đại lý',
          desc: 'Quản lý hiệu suất đại lý, tồn kho và chính sách giá theo thị trường và quốc gia.',
          benefit: 'Tối ưu phân phối toàn cầu',
        },
      ],
    },
    bank: {
      label: 'Ngân hàng',
      cards: [
        {
          title: 'Credit Scoring',
          desc: 'Chấm điểm tín dụng tự động kết hợp CIC, định giá tài sản và dữ liệu phương tiện thời gian thực.',
          benefit: 'Phê duyệt trong 15 phút',
        },
        {
          title: 'Embedded Finance',
          desc: 'Tích hợp gói vay mua xe trực tiếp vào flow mua bán tại đại lý và marketplace.',
          benefit: 'Tăng 3x volume hồ sơ',
        },
      ],
    },
    insurance: {
      label: 'Bảo hiểm',
      cards: [
        {
          title: 'Usage Based Insurance',
          desc: 'Tính phí theo km và hành vi lái xe từ dữ liệu telematics và OBD gateway.',
          benefit: 'Giảm 30% tỷ lệ bồi thường',
        },
        {
          title: 'Risk Engine',
          desc: 'Mô hình rủi ro đa chiều: xe, tài xế, khu vực và lịch sử bồi thường.',
          benefit: 'Pricing chính xác hơn 95%',
        },
      ],
    },
    fleet: {
      label: 'Vận tải',
      cards: [
        {
          title: 'TCO Dashboard',
          desc: 'Theo dõi tổng chi phí sở hữu: nhiên liệu, bảo dưỡng, bảo hiểm và chi phí vận hành.',
          benefit: 'Tiết kiệm 20% chi phí đội xe',
        },
        {
          title: 'Telematics Hub',
          desc: 'Dữ liệu OBD, GPS, EV Battery tập trung — cảnh báo sự cố và tối ưu tuyến đường.',
          benefit: 'Giảm 15% tiêu thụ nhiên liệu',
        },
      ],
    },
    developer: {
      label: 'Developers',
      cards: [
        {
          title: 'Open API Platform',
          desc: 'RESTful & GraphQL API cho Vehicle Registry, Finance, Insurance và Telematics data.',
          benefit: 'Go-live trong 2 tuần',
        },
        {
          title: 'App Marketplace',
          desc: 'Publish ứng dụng lên OEM App Store và AutoSphere Marketplace với revenue sharing.',
          benefit: 'Tiếp cận 12M+ xe',
        },
      ],
    },
    investor: {
      label: 'Investors',
      cards: [
        {
          title: 'Ecosystem Metrics',
          desc: 'Theo dõi GMV, doanh thu, tăng trưởng người dùng và hiệu suất đối tác theo thời gian thực.',
          benefit: 'Data room minh bạch 24/7',
        },
        {
          title: 'Vehicle Economy Index',
          desc: 'Chỉ số định giá nền kinh tế phương tiện — benchmark cho toàn ngành.',
          benefit: '+142% tăng trưởng YoY',
        },
      ],
    },
  };

  let activeTab = 'consumer';

  function initValueTabs() {
    const container = document.getElementById('value-tabs');
    const cardsEl = document.getElementById('value-cards');
    if (!container || !cardsEl) return;

    container.querySelectorAll('[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        renderValueTabs(container, cardsEl);
      });
    });

    renderValueTabs(container, cardsEl);
  }

  function renderValueTabs(container, cardsEl) {
    container.querySelectorAll('[data-tab]').forEach((btn) => {
      const isActive = btn.dataset.tab === activeTab;
      btn.className = isActive
        ? 'px-6 py-3 bg-primary text-on-primary rounded-full font-label-md shadow-lg shadow-primary/20 transition-all'
        : 'px-6 py-3 bg-surface-container text-on-surface-variant rounded-full font-label-md hover:bg-primary/10 transition-colors';
    });

    const data = VALUE_TABS[activeTab];
    if (!data) return;

    cardsEl.innerHTML = data.cards.map((card) => `
      <div class="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 flex flex-col gap-4">
        <h4 class="font-headline-md text-headline-md text-primary">${card.title}</h4>
        <p class="text-body-lg text-on-surface-variant">${card.desc}</p>
        <div class="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/20">
          <span class="text-label-md font-bold uppercase text-outline">Lợi ích</span>
          <span class="text-headline-md font-bold text-on-surface">${card.benefit}</span>
        </div>
      </div>
    `).join('');
  }

  // ── App switcher ──
  function initAppSwitcher() {
    const toggle = document.getElementById('app-switcher-toggle');
    const panel = document.getElementById('app-switcher');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== toggle) {
        panel.classList.add('hidden');
      }
    });
  }

  // ── Mobile menu ──
  function initMobileMenu() {
    if (document.getElementById('as-mobile-drawer')) return;
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      const icon = toggle.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = menu.classList.contains('hidden') ? 'menu' : 'close';
    });
  }

  // ── Header scroll ──
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('bg-white', 'shadow-md');
        header.classList.remove('bg-surface/80');
      } else {
        header.classList.add('bg-surface/80');
        header.classList.remove('bg-white', 'shadow-md');
      }
    });
  }

  // ── Button press effect ──
  function initButtonEffects() {
    document.querySelectorAll('button, .btn').forEach((btn) => {
      btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.97)'; });
      btn.addEventListener('mouseup', () => { btn.style.transform = ''; });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // ── Smooth scroll for anchor links ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.getElementById('as-mobile-drawer')?.classList.remove('is-open');
          document.getElementById('mobile-menu')?.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initValueTabs();
    initAppSwitcher();
    initMobileMenu();
    initHeaderScroll();
    initButtonEffects();
    initSmoothScroll();
  });
})();
