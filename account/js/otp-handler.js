/**
 * OTP giả lập — tự sinh mã, tự điền ô, xác nhận → bước tiếp theo
 */
(function () {
  'use strict';

  function getOtpInputs() {
    return Array.from(document.querySelectorAll('.otp-input'));
  }

  function fillOtpInputs(otp, delayMs) {
    const inputs = getOtpInputs();
    if (!inputs.length) return;

    inputs.forEach((input) => {
      input.value = '';
    });

    const digits = (otp || '').split('');
    digits.forEach((digit, i) => {
      if (!inputs[i]) return;
      setTimeout(() => {
        inputs[i].value = digit;
        inputs[i].dispatchEvent(new Event('input', { bubbles: true }));
      }, (delayMs || 80) * i);
    });
  }

  function getEnteredOtp() {
    return getOtpInputs().map((el) => el.value).join('');
  }

  function showOtpBanner(otp) {
    if (document.getElementById('as-otp-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'as-otp-banner';
    banner.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[200] max-w-md w-[calc(100%-2rem)] px-4 py-3 rounded-xl bg-primary text-on-primary shadow-lg text-center text-label-md';
    banner.innerHTML = `Mã OTP giả lập: <strong class="font-mono tracking-widest">${otp}</strong> — đã tự điền vào ô bên dưới`;
    document.body.appendChild(banner);

    setTimeout(() => banner.remove(), 8000);
  }

  function updatePhoneDisplay(phone) {
    const spans = document.querySelectorAll('p.text-body-md span.font-semibold');
    spans.forEach((el) => {
      if (typeof AutoSphereAuth !== 'undefined') {
        el.textContent = AutoSphereAuth.maskPhone(phone);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.FLOW_STEP_ID !== '03-xac-thuc-otp') return;
    if (typeof AutoSphereAuth === 'undefined') return;

    const { pending, otp } = AutoSphereAuth.resolveOtpContext();

    if (pending?.phone) updatePhoneDisplay(pending.phone);

    fillOtpInputs(otp, 100);
    showOtpBanner(otp);

    const form = document.getElementById('otp-form');
    if (!form) return;

    const doVerify = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const entered = getEnteredOtp();
      if (entered.length < 6) {
        alert('Vui lòng nhập đủ 6 số OTP.');
        return;
      }

      if (!AutoSphereAuth.verifyOtp(entered)) {
        alert('Mã OTP không đúng. Vui lòng thử lại.');
        fillOtpInputs(AutoSphereAuth.getOtp(), 50);
        return;
      }

      AutoSphereAuth.login(pending, true);
      AutoSphereAuth.clearOtp();
      AutoSphereAuth.clearPendingRegister();
      window.location.assign(AutoSphereAuth.accountPageUrl('04-xac-thuc-dinh-danh'));
    };

    form.addEventListener('submit', doVerify, true);
    form.querySelector('button[type="submit"]')?.addEventListener('click', doVerify, true);

    const resendBtn = Array.from(form.querySelectorAll('button[type="button"]'))
      .find((btn) => (btn.textContent || '').toLowerCase().includes('gửi lại'));
    if (resendBtn) {
      resendBtn.addEventListener('click', () => {
        const newOtp = AutoSphereAuth.generateOtp();
        fillOtpInputs(newOtp, 80);
        showOtpBanner(newOtp);
      });
    }
  });
})();
