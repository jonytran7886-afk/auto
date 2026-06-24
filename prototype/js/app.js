/**
 * AutoSphere Prototype — App Logic
 */

(function () {
  'use strict';

  let currentView = 'tenant';
  let currentTenantId = 'consumer';
  let currentModuleIdx = 0;
  let currentFeatureIdx = -1;

  const els = {};

  function $(id) { return document.getElementById(id); }

  function init() {
    els.tenantSelect = $('tenant-select');
    els.viewBtns = document.querySelectorAll('.view-btn');
    els.sidebarPrimary = $('sidebar-primary');
    els.sidebarSecondary = $('sidebar-secondary');
    els.subnavList = $('subnav-list');
    els.subnavTitle = $('subnav-title');
    els.subnavDesc = $('subnav-desc');
    els.mainContent = $('main-content');
    els.tenantBadge = $('tenant-badge');
    els.sidebarTenantIcon = $('sidebar-tenant-icon');
    els.sidebarTenantName = $('sidebar-tenant-name');
    els.sidebarTenantMeta = $('sidebar-tenant-meta');
    els.sidebarModuleCount = $('sidebar-module-count');

    bindEvents();
    render();
  }

  function bindEvents() {
    els.tenantSelect.addEventListener('change', (e) => {
      currentTenantId = e.target.value;
      currentModuleIdx = 0;
      currentFeatureIdx = -1;
      currentView = 'tenant';
      updateViewButtons();
      render();
    });

    els.viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentView = btn.dataset.view;
        updateViewButtons();
        render();
      });
    });
  }

  function updateViewButtons() {
    els.viewBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === currentView);
    });
  }

  function getTenant() {
    return TENANTS[currentTenantId];
  }

  function render() {
    if (currentView === 'overview') {
      renderOverview();
      return;
    }
    if (currentView === 'infra') {
      renderInfrastructure();
      return;
    }
    renderTenantView();
  }

  function renderTenantView() {
    const tenant = getTenant();
    if (!tenant) return;

    els.sidebarPrimary.style.display = '';
    els.sidebarSecondary.style.display = '';

    els.sidebarTenantIcon.textContent = tenant.icon;
    els.sidebarTenantIcon.style.background = `${tenant.color}22`;
    els.sidebarTenantName.textContent = tenant.label;
    els.sidebarTenantMeta.textContent = `Tenant · ${tenant.shortLabel}`;
    els.sidebarModuleCount.textContent = `${tenant.modules.length} nhóm chức năng`;

    els.tenantBadge.textContent = tenant.shortLabel;
    els.tenantBadge.style.color = tenant.color;
    els.tenantBadge.style.borderColor = `${tenant.color}44`;
    els.tenantBadge.style.background = `${tenant.color}15`;

    const navContainer = $('sidebar-nav');
    navContainer.innerHTML = tenant.modules.map((mod, idx) => `
      <div class="nav-module ${idx === currentModuleIdx ? 'active' : ''}"
           data-idx="${idx}" role="button" tabindex="0">
        <span class="nav-module-num">${mod.id}</span>
        <span class="nav-module-title">${mod.title}</span>
        <span class="nav-module-count">${mod.items.length}</span>
      </div>
    `).join('');

    navContainer.querySelectorAll('.nav-module').forEach((el) => {
      el.addEventListener('click', () => {
        currentModuleIdx = parseInt(el.dataset.idx, 10);
        currentFeatureIdx = -1;
        renderTenantView();
      });
    });

    const mod = tenant.modules[currentModuleIdx];

    els.subnavTitle.textContent = mod.title;
    els.subnavDesc.textContent = `${mod.items.length} tính năng · Nhóm ${mod.id}`;

    els.subnavList.innerHTML = [
      `<div class="nav-feature ${currentFeatureIdx === -1 ? 'active' : ''}" data-idx="-1" role="button" tabindex="0">
        <span>Tổng quan nhóm</span>
      </div>`,
      ...mod.items.map((item, idx) => `
        <div class="nav-feature ${idx === currentFeatureIdx ? 'active' : ''}"
             data-idx="${idx}" role="button" tabindex="0">
          <span>${item}</span>
        </div>
      `),
    ].join('');

    els.subnavList.querySelectorAll('.nav-feature').forEach((el) => {
      el.addEventListener('click', () => {
        currentFeatureIdx = parseInt(el.dataset.idx, 10);
        renderTenantView();
      });
    });

    if (currentFeatureIdx === -1) {
      renderModuleOverview(tenant, mod);
    } else {
      renderFeatureDetail(tenant, mod, mod.items[currentFeatureIdx]);
    }
  }

  function renderModuleOverview(tenant, mod) {
    const statuses = ['todo', 'wireframe', 'ready'];
    const statusLabels = { todo: 'Chưa bắt đầu', wireframe: 'Wireframe', ready: 'Sẵn sàng' };

    els.mainContent.innerHTML = `
      <nav class="breadcrumb">
        <span>${tenant.label}</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">${mod.id}. ${mod.title}</span>
      </nav>
      <div class="page-header">
        <h1 class="page-title">${mod.id}. ${mod.title}</h1>
        <p class="page-desc">
          Nhóm chức năng thuộc tenant <strong>${tenant.label}</strong>.
          ${mod.id === '01' ? '<a href="../account/index.html" style="color:var(--accent);font-weight:600">→ Xem luồng Tài khoản cá nhân (12 màn)</a>' : 'Prototype layout — mỗi mục con là một màn hình wireframe riêng.'}
        </p>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Tính năng</div>
          <div class="stat-value">${mod.items.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Tenant</div>
          <div class="stat-value" style="font-size:16px;padding-top:4px">${tenant.shortLabel}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Trạng thái</div>
          <div class="stat-value" style="font-size:16px;padding-top:4px;color:var(--warning)">Prototype</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Multi-Tenant</div>
          <div class="stat-value" style="font-size:16px;padding-top:4px;color:var(--success)">SaaS Ready</div>
        </div>
      </div>
      <div class="module-overview">
        <div class="module-overview-header">
          <span class="module-overview-title">Danh sách tính năng — ${mod.title}</span>
        </div>
        <div class="module-overview-body">
          <table class="feature-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tính năng</th>
                <th>Route (dự kiến)</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              ${mod.items.map((item, i) => {
                const st = statuses[i % 3];
                const hasStitch = getAccountPage(item);
                const statusClass = hasStitch ? 'ready' : st;
                const statusText = hasStitch ? 'Stitch UI' : statusLabels[st];
                return `
                  <tr data-feature="${i}" style="cursor:pointer">
                    <td>${String(i + 1).padStart(2, '0')}</td>
                    <td>${item}</td>
                    <td style="color:var(--text-muted);font-family:monospace;font-size:12px">
                      /${tenant.id}/${slugify(mod.title)}/${slugify(item)}
                    </td>
                    <td><span class="status-pill ${statusClass}">${statusText}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="content-grid">
        ${mod.items.slice(0, 6).map((item, i) => `
          <div class="feature-card" data-feature="${i}">
            <div class="feature-card-icon">${tenant.icon}</div>
            <div class="feature-card-title">${item}</div>
            <div class="feature-card-desc">Màn hình wireframe cho tính năng "${item}" trong module ${mod.title}.</div>
            <div class="feature-card-status">
              <span class="dot"></span> Chưa wireframe
            </div>
          </div>
        `).join('')}
      </div>
    `;

    els.mainContent.querySelectorAll('[data-feature]').forEach((el) => {
      el.addEventListener('click', () => {
        currentFeatureIdx = parseInt(el.dataset.feature, 10);
        renderTenantView();
      });
    });
  }

  function getAccountPage(featureName) {
    return typeof ACCOUNT_FLOW_PAGES !== 'undefined' ? ACCOUNT_FLOW_PAGES[featureName] : null;
  }

  function renderFeatureDetail(tenant, mod, featureName) {
    const accountPage = getAccountPage(featureName);
    const stitchBanner = accountPage ? `
      <div style="background:var(--accent-glow);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:20px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
        <div>
          <div style="font-weight:600;margin-bottom:4px">UI Stitch sẵn sàng</div>
          <div style="font-size:13px;color:var(--text-secondary)">Màn hình từ stitch_autosphere_account_module_ui_ux</div>
        </div>
        <a href="${accountPage}" style="background:var(--accent);color:#fff;padding:10px 20px;border-radius:8px;font-weight:600;font-size:13px;text-decoration:none;white-space:nowrap">Mở màn hình →</a>
      </div>
    ` : '';

    els.mainContent.innerHTML = `
      <nav class="breadcrumb">
        <span>${tenant.label}</span>
        <span class="breadcrumb-sep">›</span>
        <span>${mod.title}</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">${featureName}</span>
      </nav>
      <div class="page-header">
        <h1 class="page-title">${featureName}</h1>
        <p class="page-desc">Wireframe placeholder — ${tenant.label} / ${mod.title}</p>
      </div>
      ${stitchBanner}
      <div class="wireframe-block">
        <div class="wireframe-block-icon">${tenant.icon}</div>
        <div class="wireframe-block-title">${featureName}</div>
        <div class="wireframe-block-desc">
          Đây là vùng nội dung wireframe. Thay thế bằng form, bảng dữ liệu,
          dashboard hoặc flow tương ứng khi thiết kế chi tiết từng màn hình.
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Route</div>
          <div class="stat-value" style="font-size:13px;font-family:monospace;padding-top:6px">
            /${tenant.id}/${slugify(mod.title)}/${slugify(featureName)}
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Tenant ID</div>
          <div class="stat-value" style="font-size:16px;padding-top:4px">${tenant.id}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Module</div>
          <div class="stat-value" style="font-size:16px;padding-top:4px">${mod.id}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">API (dự kiến)</div>
          <div class="stat-value" style="font-size:13px;font-family:monospace;padding-top:6px">
            /api/v1/${tenant.id}/...
          </div>
        </div>
      </div>
      <div class="content-grid">
        <div class="feature-card">
          <div class="feature-card-icon">📋</div>
          <div class="feature-card-title">Form / Input</div>
          <div class="feature-card-desc">Vùng nhập liệu chính của tính năng.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-icon">📊</div>
          <div class="feature-card-title">Data Table</div>
          <div class="feature-card-desc">Bảng dữ liệu, filter, pagination.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-icon">🔔</div>
          <div class="feature-card-title">Actions</div>
          <div class="feature-card-desc">Nút hành động: Lưu, Gửi, Hủy, Export.</div>
        </div>
      </div>
    `;
  }

  function renderOverview() {
    els.sidebarPrimary.style.display = 'none';
    els.sidebarSecondary.style.display = 'none';

    const tenantList = Object.values(TENANTS).filter((t) => t.id !== 'ai');

    els.mainContent.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">AutoSphere — Ecosystem Overview</h1>
        <p class="page-desc">
          Vehicle Economy Infrastructure · Mỗi đối tượng hệ sinh thái = 1 Tenant độc lập.
          Cấu trúc thống nhất 12–15 nhóm chức năng · AI Agent riêng · Dashboard/Báo cáo · Multi-Tenant SaaS.
        </p>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Tenants</div>
          <div class="stat-value">${tenantList.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Infrastructure</div>
          <div class="stat-value">${INFRASTRUCTURE.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">AI Agents</div>
          <div class="stat-value">18</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Kiến trúc</div>
          <div class="stat-value" style="font-size:16px;padding-top:4px">Multi-Tenant</div>
        </div>
      </div>
      <h2 style="font-size:14px;font-weight:600;margin-bottom:12px;color:var(--text-secondary)">
        ĐỐI TƯỢNG HỆ SINH THÁI (TENANTS)
      </h2>
      <div class="tenant-map">
        ${tenantList.map((t) => `
          <button class="tenant-card" data-tenant="${t.id}">
            <div class="tenant-card-icon">${t.icon}</div>
            <div class="tenant-card-name">${t.label}</div>
            <div class="tenant-card-modules">${t.modules.length} nhóm chức năng</div>
            <div class="tenant-card-bar">
              <div class="tenant-card-bar-fill" style="width:${Math.min(t.modules.length / 15 * 100, 100)}%;background:${t.color}"></div>
            </div>
          </button>
        `).join('')}
      </div>
      <h2 style="font-size:14px;font-weight:600;margin:24px 0 12px;color:var(--text-secondary)">
        VEHICLE ECONOMY INFRASTRUCTURE
      </h2>
      <div class="infra-grid">
        ${INFRASTRUCTURE.slice(0, 6).map((infra) => `
          <div class="infra-card">
            <div class="infra-card-header">
              <span class="infra-card-num">${infra.id}</span>
              <span class="infra-card-title">${infra.title}</span>
            </div>
            <div class="infra-card-body">
              ${infra.items.map((item) => `<div class="infra-item">${item}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    els.mainContent.querySelectorAll('.tenant-card').forEach((card) => {
      card.addEventListener('click', () => {
        currentTenantId = card.dataset.tenant;
        currentModuleIdx = 0;
        currentFeatureIdx = -1;
        currentView = 'tenant';
        els.tenantSelect.value = currentTenantId;
        updateViewButtons();
        render();
      });
    });
  }

  function renderInfrastructure() {
    els.sidebarPrimary.style.display = 'none';
    els.sidebarSecondary.style.display = 'none';

    els.mainContent.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Vehicle Economy Infrastructure</h1>
        <p class="page-desc">
          16 lớp hạ tầng nền tảng phục vụ toàn bộ hệ sinh thái AutoSphere.
        </p>
      </div>
      <div class="infra-grid">
        ${INFRASTRUCTURE.map((infra) => `
          <div class="infra-card">
            <div class="infra-card-header">
              <span class="infra-card-num">${infra.id}</span>
              <span class="infra-card-title">${infra.title}</span>
            </div>
            <div class="infra-card-body">
              ${infra.items.map((item) => `<div class="infra-item">${item}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function slugify(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function populateTenantSelect() {
    const select = document.getElementById('tenant-select');
    if (!select) return;
    select.innerHTML = Object.values(TENANTS)
      .filter((t) => t.id !== 'ai')
      .map((t) => `<option value="${t.id}">${t.icon} ${t.label}</option>`)
      .join('');
    select.innerHTML += '<option value="ai">🤖 AI Agent Infrastructure</option>';
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateTenantSelect();
    init();
  });
})();
