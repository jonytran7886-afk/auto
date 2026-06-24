/**
 * VEI Workspace Switcher v5 — chuyển ngữ cảnh không reload trang
 */
const VEIWorkspace = (function () {
  'use strict';

  const LS_KEY = 'vei_workspace';
  const LS_USER_WS = 'vei_user_workspaces';

  function workspaces() {
    return typeof VEI_WORKSPACES !== 'undefined' ? VEI_WORKSPACES : [];
  }

  function defaultUserWorkspaceIds() {
    return ['consumer', 'dealer', 'garage', 'developer', 'investor'];
  }

  function getUserWorkspaceIds() {
    if (typeof AutoSphereAuth === 'undefined' || !AutoSphereAuth.isLoggedIn()) return [];
    try {
      const raw = localStorage.getItem(LS_USER_WS);
      if (raw) return JSON.parse(raw);
    } catch (_) { /* ignore */ }
    return defaultUserWorkspaceIds();
  }

  function availableWorkspaces() {
    const ids = getUserWorkspaceIds();
    const all = workspaces();
    if (!ids.length) return [];
    return all.filter((w) => ids.includes(w.id));
  }

  function getCurrent() {
    const available = availableWorkspaces();
    const stored = localStorage.getItem(LS_KEY);
    if (stored && available.some((w) => w.id === stored)) {
      return available.find((w) => w.id === stored);
    }
    return available.find((w) => w.default) || available[0] || workspaces().find((w) => w.default);
  }

  function setCurrent(workspaceId) {
    const ws = availableWorkspaces().find((w) => w.id === workspaceId);
    if (!ws) return;

    localStorage.setItem(LS_KEY, workspaceId);
    if (ws.roleId && typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.setCurrentRole) {
      AutoSphereAuth.setCurrentRole(ws.roleId);
    }

    document.body.dataset.veiWorkspace = workspaceId;
    document.body.classList.add('vei-workspace-switching');

    window.setTimeout(() => {
      document.body.classList.remove('vei-workspace-switching');
    }, 280);

    window.dispatchEvent(
      new CustomEvent('vei:workspace-change', {
        detail: { workspace: ws, id: workspaceId },
      })
    );

    updateLabels(ws);
    markActiveOption(workspaceId);
  }

  function updateLabels(ws) {
    const label = ws?.label || 'Workspace';
    document.querySelectorAll('[data-workspace-label]').forEach((el) => {
      el.textContent = label;
    });
    const toggle = document.getElementById('as-workspace-toggle');
    if (toggle) toggle.setAttribute('aria-label', `Workspace: ${label}`);
  }

  function markActiveOption(workspaceId) {
    document.querySelectorAll('[data-workspace-id]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.workspaceId === workspaceId);
    });
  }

  function buildPanelHtml() {
    const current = getCurrent();
    const available = availableWorkspaces();

    if (!available.length) {
      return `
        <div class="as-workspace-panel" role="menu" id="as-workspace-panel">
          <div class="as-workspace-panel-head">Workspace</div>
          <p class="as-workspace-empty">Chưa có Workspace nào được gán.</p>
          <a href="join-ecosystem.html" class="as-workspace-join">Gia nhập hệ sinh thái</a>
        </div>`;
    }

    const options = available
      .map(
        (ws) => `
      <button type="button" class="as-workspace-option${ws.id === current?.id ? ' is-active' : ''}"
        data-workspace-id="${ws.id}" role="menuitem">
        <span class="material-symbols-outlined">${ws.icon || 'workspaces'}</span>
        <span>${ws.label}</span>
      </button>`
      )
      .join('');

    return `
      <div class="as-workspace-panel" role="menu" id="as-workspace-panel">
        <div class="as-workspace-panel-head">Workspace</div>
        ${options}
        <a href="join-ecosystem.html" class="as-workspace-join">+ Gia nhập Workspace mới</a>
      </div>`;
  }

  function mountDesktop() {
    const wrap = document.getElementById('as-workspace-wrap');
    if (!wrap) return;

    const loggedIn = typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn();
    wrap.classList.toggle('hidden', !loggedIn);
    if (!loggedIn) return;

    const current = getCurrent();
    const wsLabel = current?.label || 'Workspace';
    wrap.innerHTML = `
      <div class="as-workspace-wrap" id="as-workspace-root">
        <button type="button" class="as-workspace-trigger" id="as-workspace-toggle"
          aria-expanded="false" aria-haspopup="true" aria-controls="as-workspace-panel"
          aria-label="Workspace: ${wsLabel}" title="Workspace">
          <span class="material-symbols-outlined as-workspace-trigger__icon">apps</span>
        </button>
        ${buildPanelHtml()}
      </div>`;

    bindEvents(wrap.querySelector('#as-workspace-root'));
    if (current) document.body.dataset.veiWorkspace = current.id;
  }

  function renderMobile(slot) {
    if (!slot) return;
    const current = getCurrent();
    const available = availableWorkspaces();

    slot.innerHTML = `
      <p class="text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">Workspace</p>
      <div class="as-workspace-wrap" id="as-workspace-mobile">
        ${available.length
          ? available
              .map(
                (ws) => `
            <button type="button" class="as-workspace-option${ws.id === current?.id ? ' is-active' : ''}"
              data-workspace-id="${ws.id}">${ws.label}</button>`
              )
              .join('')
          : '<a href="join-ecosystem.html" class="as-workspace-join">Gia nhập hệ sinh thái</a>'}
      </div>`;

    slot.querySelectorAll('[data-workspace-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setCurrent(btn.dataset.workspaceId);
        document.getElementById('as-mobile-drawer')?.classList.remove('is-open');
      });
    });
  }

  function bindEvents(root) {
    if (!root || root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    const toggle = root.querySelector('#as-workspace-toggle');
    toggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof AutoSphereHeaderNav !== 'undefined') AutoSphereHeaderNav.closeAllMenus();
      root.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', root.classList.contains('is-open'));
    });

    root.querySelectorAll('[data-workspace-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setCurrent(btn.dataset.workspaceId);
        root.classList.remove('is-open');
        toggle?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function closePanel() {
    document.querySelectorAll('.as-workspace-wrap.is-open').forEach((el) => {
      el.classList.remove('is-open');
      el.querySelector('#as-workspace-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }

  function autoSelectWorkspace() {
    const available = availableWorkspaces();
    if (available.length === 1) {
      setCurrent(available[0].id);
      return;
    }
    const current = getCurrent();
    if (current) {
      document.body.dataset.veiWorkspace = current.id;
      if (current.roleId && typeof AutoSphereAuth !== 'undefined') {
        AutoSphereAuth.setCurrentRole(current.roleId);
      }
    }
  }

  function refresh() {
    mountDesktop();
  }

  function init() {
    if (typeof AutoSphereAuth !== 'undefined' && AutoSphereAuth.isLoggedIn()) {
      autoSelectWorkspace();
    }
    mountDesktop();
  }

  return {
    init,
    refresh,
    getCurrent,
    setCurrent,
    closePanel,
    renderMobile,
    availableWorkspaces,
    getUserWorkspaceIds,
  };
})();
