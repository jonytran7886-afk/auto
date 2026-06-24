/**
 * AutoSphere — Account Module Flow (Module 01: Tài khoản cá nhân)
 * Thứ tự theo navigation consumer + stitch_autosphere_account_module_ui_ux
 */
const ACCOUNT_FLOW = [
  {
    id: '01-dang-ky',
    order: 1,
    title: 'Đăng ký tài khoản',
    module: '01. Tài khoản cá nhân',
    phase: 'onboarding',
    source: '../docs/stitch_autosphere_account_module_ui_ux/ng_k_t_i_kho_n_desktop/code.html',
  },
  {
    id: '02-dang-nhap',
    order: 2,
    title: 'Đăng nhập',
    module: '01. Tài khoản cá nhân',
    phase: 'onboarding',
    source: '../docs/stitch_autosphere_account_module_ui_ux/login/code.html',
  },
  {
    id: '03-xac-thuc-otp',
    order: 3,
    title: 'Xác thực OTP',
    module: '01. Tài khoản cá nhân',
    phase: 'onboarding',
    source: '../docs/stitch_autosphere_account_module_ui_ux/x_c_th_c_otp_desktop/code.html',
  },
  {
    id: '04-xac-thuc-dinh-danh',
    order: 4,
    title: 'Xác thực định danh',
    module: '01. Tài khoản cá nhân',
    phase: 'onboarding',
    source: '../docs/stitch_autosphere_account_module_ui_ux/x_c_th_c_nh_danh_desktop/code.html',
  },
  {
    id: '05-ho-so-ca-nhan',
    order: 5,
    title: 'Hồ sơ cá nhân',
    module: '01. Tài khoản cá nhân',
    phase: 'account',
    source: '../docs/stitch_autosphere_account_module_ui_ux/h_s_c_nh_n_desktop_kh_i_ph_c_brand/code.html',
  },
  {
    id: '06-giay-to-ca-nhan',
    order: 6,
    title: 'Quản lý giấy tờ cá nhân',
    module: '01. Tài khoản cá nhân',
    phase: 'account',
    source: '../docs/stitch_autosphere_account_module_ui_ux/gi_y_t_c_nh_n_desktop_kh_i_ph_c_brand/code.html',
  },
  {
    id: '07-quan-ly-dia-chi',
    order: 7,
    title: 'Quản lý địa chỉ',
    module: '01. Tài khoản cá nhân',
    phase: 'account',
    source: '../docs/stitch_autosphere_account_module_ui_ux/qu_n_l_a_ch_desktop_kh_i_ph_c_brand/code.html',
  },
  {
    id: '08-thiet-bi-dang-nhap',
    order: 8,
    title: 'Quản lý thiết bị đăng nhập',
    module: '01. Tài khoản cá nhân',
    phase: 'account',
    source: '../docs/stitch_autosphere_account_module_ui_ux/thi_t_b_ng_nh_p_desktop_kh_i_ph_c_brand/code.html',
  },
  {
    id: '09-xac-nhan-dang-xuat-thiet-bi',
    order: 9,
    title: 'Xác nhận đăng xuất thiết bị',
    module: '01. Tài khoản cá nhân',
    phase: 'account',
    source: '../docs/stitch_autosphere_account_module_ui_ux/x_c_nh_n_ng_xu_t_thi_t_b_desktop_kh_i_ph_c_brand/code.html',
  },
  {
    id: '10-bao-mat',
    order: 10,
    title: 'Bảo mật',
    module: '01. Tài khoản cá nhân',
    phase: 'account',
    source: '../docs/stitch_autosphere_account_module_ui_ux/b_o_m_t_kh_i_ph_c_brand/code.html',
  },
  {
    id: '11-khoa-tai-khoan',
    order: 11,
    title: 'Khóa tài khoản',
    module: '01. Tài khoản cá nhân',
    phase: 'danger',
    source: '../docs/stitch_autosphere_account_module_ui_ux/kh_a_t_i_kho_n/code.html',
  },
  {
    id: '12-xoa-tai-khoan',
    order: 12,
    title: 'Xóa tài khoản',
    module: '01. Tài khoản cá nhân',
    phase: 'danger',
    source: '../docs/stitch_autosphere_account_module_ui_ux/x_a_t_i_kho_n_desktop/code.html',
  },
];

const FLOW_EXIT_URL = '../prototype/index.html';

if (typeof module !== 'undefined') module.exports = { ACCOUNT_FLOW, FLOW_EXIT_URL };
