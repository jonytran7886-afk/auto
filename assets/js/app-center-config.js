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

const GARAGE_APP_NAV = [
  {
    title: 'GARA CÁ NHÂN',
    items: [
      { label: 'Gara cá nhân', href: 'garage/pages/01-danh-sach-phuong-tien.html' },
      { label: 'Phương tiện của tôi', href: 'garage/pages/01-danh-sach-phuong-tien.html' },
      { label: 'Giấy tờ xe', href: 'garage/pages/05-giay-to-xe.html' },
      { label: 'Lịch sử sở hữu', href: 'garage/pages/06-lich-su-so-huu.html' },
    ],
  },
  {
    title: 'THEO DÕI & KINH TẾ',
    items: [
      { label: 'Theo dõi tình trạng xe', href: 'garage/pages/07-tinh-trang-xe.html' },
      { label: 'Theo dõi giá trị xe', href: 'garage/pages/08-gia-tri-xe.html' },
      { label: 'Hồ sơ kinh tế số của xe', href: 'garage/pages/09-ho-so-kinh-te-so.html' },
    ],
  },
];

const MARKETPLACE_APP_NAV = [
  {
    title: 'MUA XE',
    items: [
      { label: 'Tìm kiếm xe mới', href: 'khampha/pages/01-kham-pha-xe.html' },
      { label: 'Tìm kiếm xe cũ', href: 'khampha/pages/01-kham-pha-xe.html' },
      { label: 'So sánh xe', href: 'khampha/pages/03-so-sanh-xe.html' },
      { label: 'Xem giá niêm yết', href: 'khampha/pages/02-ho-so-xe.html' },
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
