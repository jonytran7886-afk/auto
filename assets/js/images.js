/**
 * AutoSphere Landing — Image assets extracted from docs/landing-page/code.html
 * Local copies in assets/images/ (fallback URLs if local missing)
 */
const ASSETS = {
  hero: {
    src: 'assets/images/hero-ecosystem.jpg',
    fallback: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBPmJLc8w6lIizhun-O_6IvV-FsS0H3asQtkAcfQ0wdRuxDQD97uWN6Q6N2ZvSZenHXRKo_PfRbRKtuFKhLqKNMNvNZnUCyv_noql15qeWrJCIc5MFeYiOnyv_y6IbU4YsSqj0Og4m5IWfN42nKKFDJSZy6N2ZahF1D_nqMzZzP4YMygftPQ3OxzhRTlB1pRoDKBNknsAx-fuByukxejME2Xnp6gyDfBpPhs6vKebNplFe0ON0P5D-ADewc1Zv48T0frlMJBhCqw',
    alt: '3D isometric digital mobility ecosystem — AutoSphere Vehicle Economy',
  },
  profile: {
    src: 'assets/images/profile-avatar.jpg',
    fallback: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1jajB5E2B2rhI5KvJyofwZMar2M1BieYbggk4Io9Hvv9Zq8JRE8Im4IIYmrjp0SPQ66niTpZguBnFaU-k8TsSc-llBAjmSMtrb4-Etx77QKkUsKwJfUImQULVp917kaLwKXUrFrEi3RmORpSxgNVE3HNFxMj_qXhzRf8-N3e_CPhr3R0zyvjrc-kYiLkvXTwbPa8u6qe6cO9sC7kON-CxtDlSyt_VG-nlmw9Ks8LlP-wCOPHKSJq1VkFc0NiQgZSL4WiiNyrTUg',
    alt: 'Profile portrait',
  },
};

function applyLandingImages() {
  document.querySelectorAll('[data-asset]').forEach((el) => {
    const key = el.dataset.asset;
    const asset = ASSETS[key];
    if (!asset) return;

    el.alt = asset.alt;

    const img = new Image();
    img.onload = () => { el.src = asset.src; };
    img.onerror = () => { el.src = asset.fallback; };
    img.src = asset.src;
  });
}

document.addEventListener('DOMContentLoaded', applyLandingImages);
