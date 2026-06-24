/**
 * Flow navigation bar — Gara cá nhân
 */
(function () {
  'use strict';

  if (typeof GARAGE_FLOW === 'undefined' || !window.GARAGE_STEP_ID) return;

  const current = GARAGE_FLOW.find((s) => s.id === window.GARAGE_STEP_ID);
  if (!current) return;

  const idx = GARAGE_FLOW.indexOf(current);
  const prev = idx > 0 ? GARAGE_FLOW[idx - 1] : null;
  const next = idx < GARAGE_FLOW.length - 1 ? GARAGE_FLOW[idx + 1] : null;
  const progress = Math.round(((idx + 1) / GARAGE_FLOW.length) * 100);

  const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));

  function pageUrl(step) {
    return inPagesDir ? `${step.id}.html` : `pages/${step.id}.html`;
  }

  function flowIndexUrl() {
    return inPagesDir ? '../index.html' : 'index.html';
  }

  function injectNav() {
    const nav = document.createElement('div');
    nav.id = 'as-flow-nav';
    nav.innerHTML = `
      <div class="flow-inner">
        <div class="flow-progress">
          <div class="flow-step-label">Bước ${current.order}/${GARAGE_FLOW.length} · Gara cá nhân</div>
          <div class="flow-title">${current.order}. ${current.title}</div>
          <div class="flow-bar"><div class="flow-bar-fill" style="width:${progress}%"></div></div>
        </div>
        <div class="flow-actions">
          <a href="${flowIndexUrl()}" class="flow-btn flow-btn-map">Luồng</a>
          ${prev ? `<a href="${pageUrl(prev)}" class="flow-btn flow-btn-prev">← Trước</a>` : '<button class="flow-btn flow-btn-prev" disabled>← Trước</button>'}
          ${next ? `<a href="${pageUrl(next)}" class="flow-btn flow-btn-next">Tiếp →</a>` : `<a href="${typeof GARAGE_EXIT_URL !== 'undefined' ? GARAGE_EXIT_URL : '../../index.html'}" class="flow-btn flow-btn-next">Về trang chủ →</a>`}
        </div>
      </div>
    `;
    document.body.appendChild(nav);
    document.body.classList.add('has-flow-nav');
  }

  document.addEventListener('DOMContentLoaded', injectNav);
})();
