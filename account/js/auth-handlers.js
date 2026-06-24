/**
 * Auth handlers — login / đăng ký → lưu cookie → về landing page
 */
(function () {
  'use strict';

  const AUTH_STEPS = ['01-dang-ky', '02-dang-nhap'];

  function bindLogin() {
    const form = document.querySelector('form');
    if (!form) return;

    const doLogin = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const identity = document.getElementById('identity')?.value?.trim() || 'demo@autosphere.vn';
      const remember = document.getElementById('remember')?.checked ?? false;
      const name = identity.includes('@') ? identity.split('@')[0] : identity;

      AutoSphereAuth.login({ name, email: identity, phone: identity }, remember);
      window.location.assign(AutoSphereAuth.landingUrl());
    };

    form.addEventListener('submit', doLogin, true);
    form.querySelector('button[type="submit"]')?.addEventListener('click', doLogin, true);
  }

  function bindRegister() {
    const form = document.querySelector('form');
    if (!form) return;

    const doRegister = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const inputs = form.querySelectorAll('input.form-input');
      const name = inputs[0]?.value?.trim() || 'Người dùng mới';
      const email = inputs[1]?.value?.trim() || 'user@autosphere.vn';
      const phone = inputs[2]?.value?.trim() || '0901234567';
      const terms = document.getElementById('terms');

      if (terms && !terms.checked) {
        alert('Vui lòng đồng ý điều khoản sử dụng và chính sách bảo mật.');
        return;
      }

      const pending = { name, email, phone };
      const otp = AutoSphereAuth.generateOtp();
      AutoSphereAuth.savePendingRegister(pending);
      window.location.assign(AutoSphereAuth.otpPageUrl(pending, otp));
    };

    form.addEventListener('submit', doRegister, true);
    form.querySelector('button[type="submit"]')?.addEventListener('click', doRegister, true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof AutoSphereAuth === 'undefined') return;

    const stepId = window.FLOW_STEP_ID;
    if (!stepId || !AUTH_STEPS.includes(stepId)) return;

    if (stepId === '02-dang-nhap') bindLogin();
    if (stepId === '01-dang-ky') bindRegister();

    document.querySelectorAll('a[href="#"]').forEach((a) => {
      const t = (a.textContent || '').trim().toLowerCase();
      if (t.includes('đăng ký')) a.href = AutoSphereAuth.registerUrl();
      if (t.includes('đăng nhập')) a.href = AutoSphereAuth.loginUrl();
    });
  });
})();
