/**
 * AutoSphere — Trung tâm ứng dụng
 */
const APP_CENTER = [
  { id: 'garage', label: 'Garage', icon: 'garage', href: 'garage.html', bg: 'bg-primary-fixed-dim', text: 'text-primary' },
  { id: 'marketplace', label: 'Marketplace', icon: 'storefront', href: 'marketplace.html', bg: 'bg-secondary-fixed', text: 'text-secondary' },
  { id: 'insurance', label: 'Insurance', icon: 'security', href: 'apps/insurance.html', bg: 'bg-tertiary-fixed', text: 'text-tertiary' },
  { id: 'finance', label: 'Finance', icon: 'account_balance', href: 'apps/finance.html', bg: 'bg-primary-container/20', text: 'text-primary' },
  { id: 'fleet', label: 'Fleet', icon: 'local_shipping', href: 'apps/fleet.html', bg: 'bg-surface-container-high', text: 'text-on-surface-variant' },
  { id: 'dev-hub', label: 'Dev Hub', icon: 'code', href: 'apps/dev-hub.html', bg: 'bg-primary-fixed-dim', text: 'text-primary' },
  { id: 'affiliate', label: 'Affiliate', icon: 'hub', href: 'apps/affiliate.html', bg: 'bg-surface-container-high', text: 'text-on-surface-variant' },
  { id: 'ai-agent', label: 'AI Agent', icon: 'psychology', href: 'apps/ai-agent.html', bg: 'bg-primary', text: 'text-on-primary', bold: true },
  { id: 'vehicle-twin', label: 'Vehicle Twin', icon: 'directions_car', href: 'apps/vehicle-twin.html', bg: 'bg-secondary-fixed-dim', text: 'text-secondary' },
  { id: 'investor-portal', label: 'Investor Portal', icon: 'trending_up', href: 'apps/investor-portal.html', bg: 'bg-primary-fixed', text: 'text-primary' },
];

const APP_ROLES = [
  { id: 'consumer', label: 'Người sử dụng dịch vụ', default: true },
  { id: 'dealer', label: 'Đại lý bán xe' },
  { id: 'showroom', label: 'Showroom' },
  { id: 'oem', label: 'OEM / Hãng xe' },
  { id: 'insurance', label: 'Công ty bảo hiểm' },
  { id: 'bank', label: 'Ngân hàng' },
  { id: 'fleet', label: 'Doanh nghiệp đội xe' },
  { id: 'garage', label: 'Gara dịch vụ' },
  { id: 'accessories', label: 'Nhà cung cấp phụ kiện' },
  { id: 'affiliate', label: 'Đối tác tiếp thị liên kết' },
  { id: 'developer', label: 'Nhà phát triển ứng dụng' },
  { id: 'investor', label: 'Nhà đầu tư' },
  { id: 'admin', label: 'Quản trị viên AutoSphere' },
];

const GARAGE_IDENTITY_NAV = [
  {
    title: 'HỒ SƠ PHƯƠNG TIỆN',
    items: [
      { label: 'Garage của tôi', href: 'garage.html', icon: 'garage' },
      { label: 'Danh sách xe', href: 'garage/pages/01-danh-sach-phuong-tien.html', icon: 'directions_car', auth: true },
      { label: 'Hồ sơ xe', href: 'garage/pages/04-chi-tiet-phuong-tien.html', icon: 'badge', auth: true },
      { label: 'Vehicle Timeline', href: 'garage/pages/06-lich-su-so-huu.html', icon: 'timeline', auth: true },
    ],
  },
  {
    title: 'SỐ HÓA & KẾT NỐI',
    items: [
      { label: 'Connected Vehicle', href: 'apps/vehicle-twin.html', icon: 'sensors' },
      { label: 'Vehicle Digital Twin', href: 'apps/vehicle-twin.html', icon: 'hub' },
    ],
  },
  {
    title: 'TÀI CHÍNH & PHÁP LÝ',
    items: [
      { label: 'Bảo hành', href: 'garage/pages/05-giay-to-xe.html', icon: 'verified', auth: true },
      { label: 'Bảo hiểm', href: 'apps/insurance.html', icon: 'security' },
      { label: 'Tài liệu xe', href: 'garage/pages/05-giay-to-xe.html', icon: 'description', auth: true },
      { label: 'Chi phí vận hành', href: 'garage/pages/09-ho-so-kinh-te-so.html', icon: 'payments', auth: true },
    ],
  },
];

const GARAGE_APP_NAV = GARAGE_IDENTITY_NAV;

const MARKETPLACE_APP_NAV = [
  {
    title: 'MUA XE',
    items: [
      { label: 'Tìm kiếm xe mới', href: 'detail/pages/01-danh-sach-xe.html' },
      { label: 'Tìm kiếm xe cũ', href: 'detail/pages/01-danh-sach-xe.html' },
      { label: 'Chi tiết xe', href: 'detail/pages/02-chi-tiet-xe.html' },
      { label: 'So sánh xe', href: 'khampha/pages/03-so-sanh-xe.html' },
      { label: 'Xem giá niêm yết', href: 'detail/pages/02-chi-tiet-xe.html' },
      { label: 'Xem ưu đãi đại lý', href: 'khampha/pages/08-u-dai-dai-ly.html' },
      { label: 'Yêu cầu báo giá', href: 'khampha/pages/05-yeu-cau-bao-gia.html', auth: true },
      { label: 'Nhận tư vấn mua xe', href: 'khampha/pages/10-tu-van-ai.html' },
      { label: 'Đăng ký lái thử', href: 'khampha/pages/06-dang-ky-lai-thu.html', auth: true },
      { label: 'Giữ chỗ xe', href: 'khampha/pages/07-giu-cho-xe.html', auth: true },
      { label: 'Theo dõi tiến trình mua xe', href: 'khampha/pages/09-hanh-trinh-mua-xe.html', auth: true },
    ],
  },
  {
    title: 'BÁN XE',
    items: [
      { label: 'Đăng bán xe', href: 'apps/dang-ban-xe.html' },
      { label: 'Quản lý xe đang bán', href: 'apps/quan-ly-ban-xe.html' },
      { label: 'Lịch sử giao dịch', href: 'apps/lich-su-giao-dich.html' },
    ],
  },
];

const WORKSPACE_DEALER_NAV = [
  {
    title: 'ĐẠI LÝ',
    items: [
      { label: 'Tồn kho xe', href: 'detail/pages/01-danh-sach-xe.html', icon: 'inventory_2' },
      { label: 'Đơn hàng', href: 'khampha/pages/09-hanh-trinh-mua-xe.html', icon: 'receipt_long' },
      { label: 'Báo giá khách', href: 'khampha/pages/05-yeu-cau-bao-gia.html', icon: 'request_quote' },
    ],
  },
];

const WORKSPACE_GARAGE_NAV = [
  {
    title: 'GARA DỊCH VỤ',
    items: [
      { label: 'Lịch hẹn', href: 'apps/garage-service.html', icon: 'calendar_today' },
      { label: 'Xe đang sửa', href: 'garage/pages/07-tinh-trang-xe.html', icon: 'build' },
      { label: 'Phụ tùng', href: 'apps/accessories.html', icon: 'handyman' },
    ],
  },
];

const WORKSPACE_DEVELOPER_NAV = [
  {
    title: 'DEVELOPER',
    items: [
      { label: 'Developer Center', href: 'apps/dev-hub.html', icon: 'code' },
      { label: 'Sandbox', href: 'apps/dev-hub.html', icon: 'science' },
      { label: 'API & SDK', href: 'apps/dev-hub.html', icon: 'api' },
    ],
  },
];
