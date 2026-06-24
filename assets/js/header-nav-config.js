/**
 * AutoSphere VEI — Header Navigation v5 (Mega Menu compact)
 */
const HEADER_NAV = {
  identity: {
    id: 'identity',
    label: 'Hồ sơ phương tiện',
    type: 'smart-link',
    highlight: true,
    icon: 'garage',
    badge: '3',
    guestHref: 'vehicle-profile.html',
    userHref: 'garage.html',
  },
  vehicles: {
    id: 'vehicles',
    label: 'Phương tiện',
    type: 'mega',
    icon: 'directions_car',
    items: [
      { label: 'Danh mục xe', href: 'detail/pages/01-danh-sach-xe.html', icon: 'inventory_2' },
      { label: 'Xe mới', href: 'detail/pages/01-danh-sach-xe.html', icon: 'fiber_new' },
      { label: 'Xe đã qua sử dụng', href: 'detail/pages/01-danh-sach-xe.html', icon: 'history' },
      { label: 'Tìm kiếm xe', href: 'detail/pages/01-danh-sach-xe.html', icon: 'search' },
      { label: 'Đại lý', href: 'marketplace.html', icon: 'storefront' },
      { label: 'Fleet', href: 'apps/fleet.html', icon: 'local_shipping' },
    ],
    description: 'Khám phá hàng nghìn mẫu xe trên thị trường.',
    cta: { label: 'Xem tất cả', href: 'detail/pages/01-danh-sach-xe.html' },
  },
  services: {
    id: 'services',
    label: 'Dịch vụ',
    type: 'mega',
    icon: 'build',
    items: [
      { label: 'Gara', href: 'apps/garage-service.html', icon: 'build' },
      { label: 'Bảo dưỡng', href: 'apps/garage-service.html', icon: 'handyman' },
      { label: 'Bảo hiểm', href: 'apps/insurance.html', icon: 'shield' },
      { label: 'Ngân hàng', href: 'apps/finance.html', icon: 'account_balance' },
      { label: 'Cứu hộ', href: 'apps/rescue.html', icon: 'emergency' },
      { label: 'Phụ kiện', href: 'apps/accessories.html', icon: 'extension' },
    ],
    description: 'Dịch vụ xe trong một nơi — từ bảo dưỡng đến thanh toán.',
    cta: { label: 'Khám phá dịch vụ', href: 'services.html' },
  },
  ecosystem: {
    id: 'ecosystem',
    label: 'Hệ sinh thái',
    type: 'mega',
    icon: 'hub',
    items: [
      { label: 'OEM', href: 'ecosystem.html#oem', icon: 'factory' },
      { label: 'Đại lý', href: 'ecosystem.html#dealer', icon: 'storefront' },
      { label: 'Gara', href: 'ecosystem.html#garage', icon: 'build' },
      { label: 'Fleet', href: 'ecosystem.html#fleet', icon: 'local_shipping' },
      { label: 'Affiliate', href: 'apps/affiliate.html', icon: 'hub' },
      { label: 'Nhà đầu tư', href: 'apps/investor-portal.html', icon: 'trending_up' },
    ],
    description: 'Kết nối với đối tác trong nền kinh tế phương tiện.',
    cta: { label: 'Gia nhập hệ sinh thái', href: 'ecosystem.html' },
  },
  applications: {
    id: 'applications',
    label: 'Ứng dụng',
    type: 'mega',
    icon: 'apps',
    items: [
      { label: 'AI Agents', href: 'apps/ai-agent.html', icon: 'psychology' },
      { label: 'Marketplace', href: 'marketplace.html', icon: 'store' },
      { label: 'Nhà phát triển', href: 'apps/dev-hub.html', icon: 'code' },
      { label: 'SDK', href: 'apps/dev-hub.html', icon: 'integration_instructions' },
      { label: 'Webhook', href: 'apps/dev-hub.html', icon: 'link' },
      { label: 'Sandbox', href: 'apps/dev-hub.html', icon: 'science', auth: true },
    ],
    description: 'Ứng dụng, API và công cụ mở rộng cho nhà phát triển.',
    cta: { label: 'Trung tâm ứng dụng', href: 'index.html#apps' },
  },
  explore: {
    id: 'explore',
    label: 'Khám phá',
    type: 'mega',
    icon: 'explore',
    items: [
      { label: 'Tin tức', href: 'khampha/pages/01-kham-pha-xe.html', icon: 'newspaper' },
      { label: 'Báo cáo', href: 'khampha/pages/08-u-dai-dai-ly.html', icon: 'assessment' },
      { label: 'Xu hướng', href: 'khampha/pages/10-tu-van-ai.html', icon: 'trending_up' },
      { label: 'Công nghệ', href: 'khampha/pages/10-tu-van-ai.html', icon: 'memory' },
      { label: 'Video', href: 'khampha/pages/01-kham-pha-xe.html', icon: 'play_circle' },
      { label: 'Cẩm nang', href: 'index.html#developer', icon: 'menu_book' },
    ],
    description: 'Tin tức, báo cáo và kiến thức về thế giới xe.',
    cta: { label: 'Đọc thêm', href: 'khampha/pages/01-kham-pha-xe.html' },
  },
};

const HEADER_NAV_ORDER = ['identity', 'vehicles', 'services', 'ecosystem', 'applications', 'explore'];

const HEADER_GUEST_ITEMS = HEADER_NAV_ORDER;
const HEADER_AUTH_ITEMS = HEADER_NAV_ORDER;

const VEI_WORKSPACES = [
  { id: 'consumer', label: 'Người sử dụng dịch vụ', icon: 'person', roleId: 'consumer', default: true },
  { id: 'dealer', label: 'Đại lý', icon: 'storefront', roleId: 'dealer' },
  { id: 'oem', label: 'OEM', icon: 'factory', roleId: 'oem' },
  { id: 'bank', label: 'Ngân hàng', icon: 'account_balance', roleId: 'bank' },
  { id: 'insurance-ws', label: 'Bảo hiểm', icon: 'security', roleId: 'insurance' },
  { id: 'garage', label: 'Gara', icon: 'build', roleId: 'garage' },
  { id: 'fleet', label: 'Fleet', icon: 'local_shipping', roleId: 'fleet' },
  { id: 'affiliate', label: 'Affiliate', icon: 'hub', roleId: 'affiliate' },
  { id: 'developer', label: 'Developer', icon: 'code', roleId: 'developer' },
  { id: 'ai-agent', label: 'AI Agent', icon: 'psychology', roleId: 'developer' },
  { id: 'investor', label: 'Nhà đầu tư', icon: 'trending_up', roleId: 'investor' },
  { id: 'admin', label: 'Quản trị viên', icon: 'admin_panel_settings', roleId: 'admin' },
];
