/**
 * AutoSphere — Prototype Auth (giả lập cookie + localStorage fallback)
 */
const AutoSphereAuth = (function () {
  'use strict';

  const COOKIE_SESSION = 'as_session';
  const COOKIE_USER = 'as_user';
  const COOKIE_PENDING = 'as_pending_register';
  const COOKIE_OTP = 'as_otp';
  const LS_SESSION = 'as_session';
  const LS_USER = 'as_user';
  const LS_PENDING = 'as_pending_register';
  const LS_OTP = 'as_otp';
  const PENDING_DAYS = 1;
  const SESSION_DAYS = 7;
  const REMEMBER_DAYS = 30;

  function cookiePath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const lower = path.toLowerCase();
    const accountIdx = lower.indexOf('/account/');
    if (accountIdx >= 0) return path.substring(0, accountIdx + 1) || '/';
    const last = path.lastIndexOf('/');
    return last >= 0 ? path.substring(0, last + 1) : '/';
  }

  function setCookie(name, value, days) {
    const maxAge = days ? `; max-age=${days * 86400}` : '';
    const path = `; path=${cookiePath()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}${path}; SameSite=Lax${maxAge}`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; path=${cookiePath()}; max-age=0`;
  }

  function setStorage(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* ignore */ }
  }

  function getStorage(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function removeStorage(key) {
    try { localStorage.removeItem(key); } catch (_) { /* ignore */ }
  }

  function generateToken() {
    return 'as_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function generateOtp() {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setOtp(otp);
    return otp;
  }

  function setOtp(otp) {
    setStorage(LS_OTP, otp);
    setCookie(COOKIE_OTP, otp, PENDING_DAYS);
  }

  function getOtp() {
    return getCookie(COOKIE_OTP) || getStorage(LS_OTP);
  }

  function clearOtp() {
    removeStorage(LS_OTP);
    deleteCookie(COOKIE_OTP);
  }

  function verifyOtp(code) {
    const expected = getOtp();
    return expected && code === expected;
  }

  function savePendingRegister(data) {
    const json = JSON.stringify(data);
    setStorage(LS_PENDING, json);
    setCookie(COOKIE_PENDING, json, PENDING_DAYS);
  }

  function getPendingRegister() {
    const raw = getCookie(COOKIE_PENDING) || getStorage(LS_PENDING);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (_) { return null; }
  }

  function clearPendingRegister() {
    removeStorage(LS_PENDING);
    deleteCookie(COOKIE_PENDING);
  }

  function otpPageUrl(pending, otp) {
    const base = accountPageUrl('03-xac-thuc-otp');
    const q = new URLSearchParams({
      name: pending.name || '',
      email: pending.email || '',
      phone: pending.phone || '',
      otp: otp || generateOtp(),
    });
    return `${base}?${q.toString()}`;
  }

  function parseOtpFromUrl() {
    const q = new URLSearchParams(window.location.search);
    const otp = q.get('otp');
    if (!otp) return null;
    return {
      pending: {
        name: q.get('name') || 'Người dùng mới',
        email: q.get('email') || 'user@autosphere.vn',
        phone: q.get('phone') || '0901234567',
      },
      otp,
    };
  }

  function resolveOtpContext() {
    const fromUrl = parseOtpFromUrl();
    if (fromUrl) {
      savePendingRegister(fromUrl.pending);
      setOtp(fromUrl.otp);
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch (_) { /* ignore */ }
      return fromUrl;
    }

    const pending = getPendingRegister();
    let otp = getOtp();
    if (pending) {
      if (!otp) otp = generateOtp();
      return { pending, otp };
    }

    const demo = { name: 'Người dùng mới', email: 'user@autosphere.vn', phone: '0901234567' };
    savePendingRegister(demo);
    otp = generateOtp();
    return { pending: demo, otp };
  }

  function maskPhone(phone) {
    const digits = (phone || '').replace(/\D/g, '');
    if (digits.length < 4) return phone || '090xxxxxxx';
    return digits.slice(0, 3) + 'xxxx' + digits.slice(-3);
  }

  function accountPageUrl(stepId) {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/account/pages/')) return `${stepId}.html`;
    if (path.includes('/account/')) return `pages/${stepId}.html`;
    return `account/pages/${stepId}.html`;
  }

  function isLoggedIn() {
    return !!(getCookie(COOKIE_SESSION) || getStorage(LS_SESSION));
  }

  function getUser() {
    const raw = getCookie(COOKIE_USER) || getStorage(LS_USER);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (_) { return null; }
  }

  function login(user, remember) {
    const days = remember ? REMEMBER_DAYS : SESSION_DAYS;
    const token = generateToken();
    const payload = {
      name: user.name || 'Người dùng AutoSphere',
      email: user.email || '',
      phone: user.phone || '',
      loggedInAt: new Date().toISOString(),
    };

    setCookie(COOKIE_SESSION, token, days);
    setCookie(COOKIE_USER, JSON.stringify(payload), days);
    setStorage(LS_SESSION, token);
    setStorage(LS_USER, JSON.stringify(payload));

    return payload;
  }

  function logout() {
    deleteCookie(COOKIE_SESSION);
    deleteCookie(COOKIE_USER);
    removeStorage(LS_SESSION);
    removeStorage(LS_USER);
  }

  function landingUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/account/pages/')) return '../../index.html';
    if (path.includes('/account/')) return '../index.html';
    return 'index.html';
  }

  function loginUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/account/')) {
      return path.includes('/pages/') ? '02-dang-nhap.html' : 'pages/02-dang-nhap.html';
    }
    return 'account/pages/02-dang-nhap.html';
  }

  function registerUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/account/')) {
      return path.includes('/pages/') ? '01-dang-ky.html' : 'pages/01-dang-ky.html';
    }
    return 'account/pages/01-dang-ky.html';
  }

  return {
    login,
    logout,
    isLoggedIn,
    getUser,
    landingUrl,
    loginUrl,
    registerUrl,
    accountPageUrl,
    otpPageUrl,
    resolveOtpContext,
    generateOtp,
    getOtp,
    clearOtp,
    verifyOtp,
    savePendingRegister,
    getPendingRegister,
    clearPendingRegister,
    maskPhone,
  };
})();
