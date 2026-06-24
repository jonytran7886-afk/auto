/**
 * AutoSphere Header — public navigation only (apps live in App Center)
 */
const HEADER_NAV = {
  explore: {
    id: 'explore',
    label: 'Khám phá',
    type: 'dropdown',
    items: [
      { label: 'Tin tức ô tô', href: 'khampha/pages/01-kham-pha-xe.html' },
      { label: 'Đánh giá xe', href: 'khampha/pages/02-ho-so-xe.html' },
      { label: 'Kiến thức sử dụng xe', href: 'khampha/pages/10-tu-van-ai.html' },
      { label: 'Cộng đồng', href: 'index.html#ecosystem' },
      { label: 'Chương trình tiếp thị liên kết', href: 'index.html#developer' },
    ],
  },
  trading: {
    id: 'trading',
    label: 'Giao dịch xe',
    type: 'mega',
    columns: [
      {
        title: 'Mua xe',
        items: [
          { label: 'Mua xe', href: 'marketplace.html' },
          { label: 'Tìm kiếm xe mới', href: 'detail/pages/01-danh-sach-xe.html' },
          { label: 'Tìm kiếm xe cũ', href: 'detail/pages/01-danh-sach-xe.html' },
          { label: 'Chi tiết xe', href: 'detail/pages/02-chi-tiet-xe.html' },
          { label: 'So sánh xe', href: 'khampha/pages/03-so-sanh-xe.html' },
        ],
      },
      {
        title: 'Giá & ưu đãi',
        items: [
          { label: 'Xem giá niêm yết', href: 'detail/pages/02-chi-tiet-xe.html' },
          { label: 'Xem ưu đãi đại lý', href: 'khampha/pages/08-u-dai-dai-ly.html' },
          { label: 'Yêu cầu báo giá', href: 'khampha/pages/05-yeu-cau-bao-gia.html', auth: true },
          { label: 'Nhận tư vấn mua xe', href: 'khampha/pages/10-tu-van-ai.html' },
          { label: 'Đăng ký lái thử', href: 'khampha/pages/06-dang-ky-lai-thu.html', auth: true },
          { label: 'Giữ chỗ xe', href: 'khampha/pages/07-giu-cho-xe.html', auth: true },
          { label: 'Theo dõi tiến trình mua xe', href: 'khampha/pages/09-hanh-trinh-mua-xe.html', auth: true },
        ],
      },
    ],
  },
  services: {
    id: 'services',
    label: 'Dịch vụ',
    type: 'mega',
    columns: [
      {
        title: 'Bảo dưỡng & hỗ trợ',
        items: [
          { label: 'Bảo hiểm xe', href: 'apps/insurance.html' },
          { label: 'Gara sửa chữa', href: 'apps/garage-service.html' },
          { label: 'Cứu hộ', href: 'apps/rescue.html' },
          { label: 'Đăng kiểm', href: 'apps/inspection.html' },
        ],
      },
      {
        title: 'Tài chính & phụ kiện',
        items: [
          { label: 'Phụ kiện', href: 'apps/accessories.html' },
          { label: 'Tài chính xe', href: 'apps/finance.html' },
        ],
      },
    ],
  },
  ecosystem: { id: 'ecosystem', label: 'Hệ sinh thái', href: 'index.html#personas' },
  developer: { id: 'developer', label: 'Nhà phát triển', href: 'index.html#developer' },
  investor: { id: 'investor', label: 'Nhà đầu tư', href: 'index.html#investor' },
};

const HEADER_GUEST_ITEMS = ['explore', 'trading', 'services', 'ecosystem', 'developer', 'investor'];
const HEADER_AUTH_ITEMS = HEADER_GUEST_ITEMS;
