---
name: Modern Premium Personal Account
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar_width: 260px
  container_max_width: 1200px
  gutter: 24px
  margin_mobile: 16px
  stack_gap: 12px
  section_gap: 32px
---

## Brand & Style
The design system for the Personal Account module focuses on a **Modern Premium Clean** aesthetic. It aims to evoke a sense of security, transparency, and high-end utility for users managing their personal data and automotive preferences. The visual language utilizes a refined light theme with ample white space, ensuring the interface feels breathable and professional. 

The style is characterized by "Soft Functionalism"—combining the utilitarian clarity of a SaaS product with the polished finish of a premium service. Key visual traits include high-legibility typography, subtle depth through soft shadows, and a logical information hierarchy that guides the user through account settings without cognitive overload.

## Colors
The palette is rooted in a professional Blue-Core spectrum. 
- **Primary (#2563EB):** Used for main actions, active states, and focus indicators.
- **Secondary (#06B6D4):** Used for accent elements, data visualization, or specific account status highlights.
- **System States:** Success, Warning, and Danger colors follow standard semantic conventions but are calibrated for high legibility against the white surface backgrounds.
- **Neutrals:** A Slate-based neutral scale is used for text and borders to maintain a cool, modern temperature. The background uses a very light off-white (#F8FAFC) to differentiate the page floor from the white (#FFFFFF) component cards.

## Typography
This design system uses **Inter** exclusively to ensure a systematic, neutral, and highly readable experience. 
- **Scale:** High contrast between headlines and body text to facilitate quick scanning of account sections.
- **Vietnamese Support:** Special attention is paid to line-heights (1.5x for body) to accommodate Vietnamese diacritics without clipping or crowding.
- **Weight:** Semi-bold (600) is preferred for labels and subheaders to provide a premium structural feel without the aggression of heavy bolds.

## Layout & Spacing
The layout follows a mobile-first, responsive philosophy tailored specifically for the Personal Account module.
- **Desktop:** A fixed 260px left-hand navigation column handles profile sub-sections (Thông tin cá nhân, Bảo mật, Thông báo, v.v.). The main content area occupies the remaining space up to a 1200px container limit.
- **Mobile:** The 2-column layout collapses. Navigation is handled via a horizontal scrollable tab bar or a bottom sheet menu triggered by the profile header.
- **Rhythm:** An 8px base grid is used. Sections are separated by 32px, while internal card elements use 12px or 16px gaps to maintain a tight, organized appearance.

## Elevation & Depth
Elevation is achieved through **Soft Shadows** rather than heavy borders, reinforcing the "Premium" feel.
- **Surface Level (0):** The main background (#F8FAFC).
- **Raised Level (1):** Account cards and input containers use a subtle shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`.
- **Overlay Level (2):** Modals, dropdowns, and bottom sheets use a more pronounced shadow to create distinct separation: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`.
- **Borders:** Subtle 1px borders in a light gray-blue are used on inputs and card strokes to maintain definition on white backgrounds.

## Shapes
The design system utilizes a generous **16px (rounded-lg)** base radius for all primary containers, cards, and modal windows.
- **Buttons & Inputs:** Follow the 16px radius to create a friendly, modern touch.
- **Chips/Badges:** Use a fully rounded (pill) shape for status indicators (e.g., "Đang hoạt động").
- **Icons:** Lucide icons are used with a 2px stroke width to match the clean lines of the Inter typeface.

## Components
- **Buttons:** Primary buttons use a solid #2563EB fill with white text. Secondary buttons use a ghost style with a subtle border. All buttons have a 200ms ease-in-out transition on hover/active states.
- **Input Fields:** Labeled with clear Vietnamese text (e.g., "Họ và tên"). Active states feature a 2px primary color ring.
- **Cards:** White background with 16px border radius and Level 1 shadow. Used to group related settings like "Thông tin liên hệ" or "Đổi mật khẩu".
- **Lists:** Account navigation lists use Lucide icons on the left, 14px labels, and a chevron-right on the right. Active list items use a light blue tinted background.
- **Profile Header:** A prominent avatar circle (64px or 80px) with the user's name in Headline-MD and a "Thành viên" status badge.
- **Bottom Sheets (Mobile):** Used for selecting options or switching account views, featuring a top "grabber" handle and 16px top-corner rounding.
- **Transitions:** All state changes (hover, focus, page transitions) are set to 200ms to ensure the UI feels snappy yet smooth.