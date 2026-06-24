/**
 * Injects prototype flow navigation into each account screen.
 * Requires: flow-config.js + window.FLOW_STEP_ID
 */
(function () {
  'use strict';

  if (typeof ACCOUNT_FLOW === 'undefined' || !window.FLOW_STEP_ID) return;

  const current = ACCOUNT_FLOW.find((s) => s.id === window.FLOW_STEP_ID);
  if (!current) return;

  const idx = ACCOUNT_FLOW.indexOf(current);
  const prev = idx > 0 ? ACCOUNT_FLOW[idx - 1] : null;
  const next = idx < ACCOUNT_FLOW.length - 1 ? ACCOUNT_FLOW[idx + 1] : null;
  const progress = Math.round(((idx + 1) / ACCOUNT_FLOW.length) * 100);

  const AUTH_GATE_STEPS = ['01-dang-ky', '02-dang-nhap', '03-xac-thuc-otp'];

  const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));

  function pageUrl(step) {
    return inPagesDir ? `${step.id}.html` : `pages/${step.id}.html`;
  }

  function flowIndexUrl() {
    return inPagesDir ? '../index.html' : 'index.html';
  }

  function landingUrl() {
    if (typeof AutoSphereAuth !== 'undefined') return AutoSphereAuth.landingUrl();
    return inPagesDir ? '../../index.html' : '../index.html';
  }

  function injectNav() {
    const nav = document.createElement('div');
    nav.id = 'as-flow-nav';
    nav.innerHTML = `
      <div class="flow-inner">
        <div class="flow-progress">
          <div class="flow-step-label">Bước ${current.order}/${ACCOUNT_FLOW.length} · ${current.phase === 'onboarding' ? 'Onboarding' : current.phase === 'danger' ? 'Rủi ro' : 'Tài khoản'}</div>
          <div class="flow-title">${current.order}. ${current.title}</div>
          <div class="flow-bar"><div class="flow-bar-fill" style="width:${progress}%"></div></div>
        </div>
        <div class="flow-actions">
          <a href="${flowIndexUrl()}" class="flow-btn flow-btn-map">Luồng</a>
          ${prev ? `<a href="${pageUrl(prev)}" class="flow-btn flow-btn-prev">← Trước</a>` : '<button class="flow-btn flow-btn-prev" disabled>← Trước</button>'}
          ${next ? `<a href="${pageUrl(next)}" class="flow-btn flow-btn-next" id="flow-next-btn">Tiếp →</a>` : `<a href="${typeof FLOW_EXIT_URL !== 'undefined' ? FLOW_EXIT_URL : '../prototype/index.html'}" class="flow-btn flow-btn-next">Vào App →</a>`}
        </div>
      </div>
    `;
    document.body.appendChild(nav);
    document.body.classList.add('has-flow-nav');
  }

  function wirePrimaryActions() {
    if (AUTH_GATE_STEPS.includes(window.FLOW_STEP_ID)) return;

    const exitUrl = typeof FLOW_EXIT_URL !== 'undefined' ? FLOW_EXIT_URL : (inPagesDir ? '../../prototype/index.html' : '../prototype/index.html');
    const nextUrl = next ? pageUrl(next) : exitUrl;

    document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = nextUrl;
      });
    });

    document.querySelectorAll('button[type="submit"], button.bg-primary, a.bg-primary').forEach((btn) => {
      if (btn.closest('#as-flow-nav')) return;
      const text = (btn.textContent || '').trim().toLowerCase();
      const isPrimary =
        text.includes('đăng nhập') ||
        text.includes('đăng ký') ||
        text.includes('tiếp tục') ||
        text.includes('xác nhận') ||
        text.includes('lưu') ||
        text.includes('gửi') ||
        text.includes('hoàn tất') ||
        text.includes('xác thực');

      if (isPrimary && btn.tagName === 'BUTTON') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = nextUrl;
        });
      }
    });

    document.querySelectorAll('button').forEach((btn) => {
      if (btn.closest('#as-flow-nav')) return;
      const text = (btn.textContent || '').trim().toLowerCase();
      if (text.includes('hủy bỏ') || text === 'hủy') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = landingUrl();
        });
      }
    });

    document.querySelectorAll('a[href="#"]').forEach((a) => {
      const t = (a.textContent || '').trim().toLowerCase();
      if (t.includes('đăng ký') && typeof AutoSphereAuth !== 'undefined') {
        a.href = AutoSphereAuth.registerUrl();
      } else if (t.includes('đăng ký')) {
        a.href = pageUrl(ACCOUNT_FLOW.find((s) => s.id === '01-dang-ky') || ACCOUNT_FLOW[0]);
      }
      if (t.includes('đăng nhập') && typeof AutoSphereAuth !== 'undefined') {
        a.href = AutoSphereAuth.loginUrl();
      } else if (t.includes('đăng nhập')) {
        a.href = pageUrl(ACCOUNT_FLOW.find((s) => s.id === '02-dang-nhap') || ACCOUNT_FLOW[1]);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectNav();
    wirePrimaryActions();
  });
})();
