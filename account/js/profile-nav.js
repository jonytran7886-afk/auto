/**
 * Sidebar / tab navigation — Hồ sơ cá nhân (bước 05–12)
 */
(function () {
  'use strict';

  const PROFILE_PAGES = [
    '05-ho-so-ca-nhan',
    '06-giay-to-ca-nhan',
    '07-quan-ly-dia-chi',
    '08-thiet-bi-dang-nhap',
    '09-xac-nhan-dang-xuat-thiet-bi',
    '10-bao-mat',
    '11-khoa-tai-khoan',
    '12-xoa-tai-khoan',
  ];

  const NAV_MAP = [
    { id: '12-xoa-tai-khoan', keys: ['xóa tài khoản'] },
    { id: '11-khoa-tai-khoan', keys: ['khóa tài khoản', 'khóa/xóa'] },
    { id: '06-giay-to-ca-nhan', keys: ['giấy tờ cá nhân', 'giấy tờ'] },
    { id: '05-ho-so-ca-nhan', keys: ['thông tin cơ bản', 'thông tin'] },
    { id: '07-quan-ly-dia-chi', keys: ['địa chỉ'] },
    { id: '08-thiet-bi-dang-nhap', keys: ['thiết bị đăng nhập', 'thiết bị'] },
    { id: '10-bao-mat', keys: ['bảo mật'] },
    { id: '12-xoa-tai-khoan', keys: ['xóa'] },
    { id: '11-khoa-tai-khoan', keys: ['khóa'] },
  ];

  function pageUrl(stepId) {
    const inPagesDir = /\/pages\//.test(window.location.pathname.replace(/\\/g, '/'));
    return inPagesDir ? `${stepId}.html` : `pages/${stepId}.html`;
  }

  function matchNavTarget(text) {
    const t = text.toLowerCase().replace(/\s+/g, ' ').trim();
    for (const item of NAV_MAP) {
      for (const key of item.keys) {
        if (t.includes(key)) return item.id;
      }
    }
    return null;
  }

  function wireLink(el) {
    const targetId = matchNavTarget(el.textContent || '');
    if (!targetId) return;

    const url = pageUrl(targetId);
    if (el.tagName === 'A') {
      el.setAttribute('href', url);
    } else {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign(url);
      });
    }
  }

  function initProfileNav() {
    const stepId = window.FLOW_STEP_ID;
    if (!stepId || !PROFILE_PAGES.includes(stepId)) return;

    document.querySelectorAll('aside a').forEach(wireLink);
    document.querySelectorAll('main nav a').forEach(wireLink);
    document.querySelectorAll('.md\\:hidden .flex.gap-2 button, .md\\:hidden .flex.gap-3 button').forEach(wireLink);
  }

  document.addEventListener('DOMContentLoaded', initProfileNav);
})();
