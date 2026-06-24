/**
 * AutoSphere — Thị trường xe (danh sách & chi tiết)
 */
const DETAIL_FLOW = [
  {
    id: '01-danh-sach-xe',
    order: 1,
    title: 'Danh sách phương tiện',
    source: '../docs/stitch_autosphere_detail/danh_s_ch_ph_ng_ti_n_desktop/code.html',
  },
  {
    id: '02-chi-tiet-xe',
    order: 2,
    title: 'Chi tiết xe',
    source: '../docs/stitch_autosphere_detail/chi_ti_t_ph_ng_ti_n_desktop/code.html',
  },
];

const DETAIL_EXIT_URL = '../../marketplace.html';

if (typeof module !== 'undefined') module.exports = { DETAIL_FLOW, DETAIL_EXIT_URL };
