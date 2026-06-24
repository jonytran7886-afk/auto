/**
 * AutoSphere — Gara cá nhân (Module 02)
 */
const GARAGE_FLOW = [
  {
    id: '01-danh-sach-phuong-tien',
    order: 1,
    title: 'Danh sách phương tiện',
    phase: 'garage',
    source: '../docs/Gara cá nhân/danh_s_ch_ph_ng_ti_n_desktop/code.html',
  },
  {
    id: '02-them-phuong-tien',
    order: 2,
    title: 'Thêm phương tiện',
    phase: 'garage',
    source: '../docs/Gara cá nhân/th_m_ph_ng_ti_n_desktop/code.html',
  },
  {
    id: '03-xac-thuc-phuong-tien',
    order: 3,
    title: 'Xác thực phương tiện',
    phase: 'onboarding',
    source: '../docs/Gara cá nhân/x_c_th_c_ph_ng_ti_n_desktop/code.html',
  },
  {
    id: '04-chi-tiet-phuong-tien',
    order: 4,
    title: 'Chi tiết phương tiện',
    phase: 'garage',
    source: '../docs/Gara cá nhân/chi_ti_t_ph_ng_ti_n_desktop/code.html',
  },
  {
    id: '05-giay-to-xe',
    order: 5,
    title: 'Giấy tờ xe',
    phase: 'garage',
    source: '../docs/Gara cá nhân/gi_y_t_xe_desktop/code.html',
  },
  {
    id: '06-lich-su-so-huu',
    order: 6,
    title: 'Lịch sử sở hữu',
    phase: 'garage',
    source: '../docs/Gara cá nhân/l_ch_s_s_h_u_desktop/code.html',
  },
  {
    id: '07-tinh-trang-xe',
    order: 7,
    title: 'Tình trạng xe',
    phase: 'garage',
    source: '../docs/Gara cá nhân/t_nh_tr_ng_xe_desktop/code.html',
  },
  {
    id: '08-gia-tri-xe',
    order: 8,
    title: 'Giá trị xe',
    phase: 'garage',
    source: '../docs/Gara cá nhân/gi_tr_xe_desktop/code.html',
  },
  {
    id: '09-ho-so-kinh-te-so',
    order: 9,
    title: 'Hồ sơ kinh tế số',
    phase: 'assets',
    source: '../docs/Gara cá nhân/h_s_kinh_t_s_desktop/code.html',
  },
  {
    id: '10-lich-su-giao-dich',
    order: 10,
    title: 'Lịch sử giao dịch',
    phase: 'assets',
    source: '../docs/Gara cá nhân/h_s_kinh_t_s_desktop/code.html',
  },
];

const GARAGE_EXIT_URL = '../index.html';

if (typeof module !== 'undefined') module.exports = { GARAGE_FLOW, GARAGE_EXIT_URL };
