/**
 * AutoSphere — Khám phá & Giao dịch xe
 */
const KHAMPHA_FLOW = [
  {
    id: '01-kham-pha-xe',
    order: 1,
    title: 'Khám phá xe',
    phase: 'explore',
    source: '../docs/stitch_autosphere_khampha/kh_m_ph_xe_desktop/code.html',
  },
  {
    id: '02-ho-so-xe',
    order: 2,
    title: 'Hồ sơ xe',
    phase: 'explore',
    source: '../docs/stitch_autosphere_khampha/h_s_xe_desktop/code.html',
  },
  {
    id: '03-so-sanh-xe',
    order: 3,
    title: 'So sánh xe',
    phase: 'trading',
    source: '../docs/stitch_autosphere_khampha/so_s_nh_xe_desktop/code.html',
  },
  {
    id: '04-gia-niem-yet',
    order: 4,
    title: 'Theo dõi giá trị xe',
    phase: 'garage-bridge',
    source: '../docs/stitch_autosphere_khampha/gi_tr_xe_mobile/code.html',
  },
  {
    id: '05-yeu-cau-bao-gia',
    order: 5,
    title: 'Yêu cầu báo giá',
    phase: 'trading',
    auth: true,
    source: '../docs/stitch_autosphere_khampha/y_u_c_u_b_o_gi_desktop/code.html',
  },
  {
    id: '06-dang-ky-lai-thu',
    order: 6,
    title: 'Đăng ký lái thử',
    phase: 'trading',
    auth: true,
    source: '../docs/stitch_autosphere_khampha/ng_k_l_i_th_desktop/code.html',
  },
  {
    id: '07-giu-cho-xe',
    order: 7,
    title: 'Giữ chỗ xe',
    phase: 'trading',
    auth: true,
    source: '../docs/stitch_autosphere_khampha/gi_ch_xe_desktop/code.html',
  },
  {
    id: '08-u-dai-dai-ly',
    order: 8,
    title: 'Ưu đãi đại lý',
    phase: 'trading',
    source: '../docs/stitch_autosphere_khampha/xu_t_t_i_l_desktop/code.html',
  },
  {
    id: '09-hanh-trinh-mua-xe',
    order: 9,
    title: 'Hành trình mua xe',
    phase: 'trading',
    auth: true,
    source: '../docs/stitch_autosphere_khampha/h_nh_tr_nh_mua_xe_desktop/code.html',
  },
  {
    id: '10-tu-van-ai',
    order: 10,
    title: 'Tư vấn AI',
    phase: 'explore',
    source: '../docs/stitch_autosphere_khampha/ai_advisor_desktop/code.html',
  },
];

const KHAMPHA_EXIT_URL = '../../index.html';

if (typeof module !== 'undefined') module.exports = { KHAMPHA_FLOW, KHAMPHA_EXIT_URL };
