// THEME DROPDOWN
const THEMES = {
  dark: {
    "--bg-base": "#131921",
    "--bg-surface": "#0a0c12",
    "--bg-card": "#1e2236",
    "--bg-hover": "#252a40",
    "--border": "#2a2f4a",
    "--border-bright": "#3a4070",
    "--text-primary": "#e8eaf0",
    "--text-secondary": "#8891b0",
    "--text-muted": "#555e80",
    "--accent": "#7c6fff",
    "--accent-text": "#a89fff",
    "--accent-dim": "#4a42cc",
    "--accent-glow": "rgba(124, 111, 255, 0.18)",
    "--icon-filter": "invert(62%)",
    "--icon-filter-hover": "invert(93%)",

    // Architecture node colours
    "--arch-conv-color": "#5c52cc",
    "--arch-conv-border": "#7c72ee",
    "--arch-conv-shadow": "rgba(92, 82, 204, 0.3)",

    "--arch-input-color": "#303550",
    "--arch-input-border": "#404870",
    "--arch-input-inner": "#252a45",
    "--arch-input-square": "#3a4060",
    "--arch-input-shadow": "rgba(48, 53, 80, 0.3)",

    "--arch-other-color": "#333755",
    "--arch-other-border": "#4a4f7a",
    "--arch-other-dot": "#4a4f7a",
    "--arch-other-dot-border": "#6a6f9a",
    "--arch-other-shadow": "rgba(51, 55, 85, 0.3)",

    "--arch-dense-color": "#2a4a2a",
    "--arch-dense-border": "#3a6e3a",
    "--arch-dense-dot": "#3a6e3a",
    "--arch-dense-dot-border": "#4a8e4a",
    "--arch-dense-shadow": "rgba(42, 74, 42, 0.3)",
  },

  light: {
    "--bg-base": "#eff2fe",
    "--bg-surface": "#ffffff",
    "--bg-card": "#e8eaf0",
    "--bg-hover": "#dde0ea",
    "--border": "#d0d4e4",
    "--border-bright": "#b0b8d4",
    "--text-primary": "#1a1d2e",
    "--text-secondary": "#4a5070",
    "--text-muted": "#8891b0",
    "--accent": "#7c6fff",
    "--accent-text": "#a89fff",
    "--accent-dim": "#4a42cc",
    "--accent-glow": "rgba(124, 111, 255, 0.18)",
    "--icon-filter": "invert(31%)",
    "--icon-filter-hover": "invert(9%)",

    // Architecture colors
    "--arch-conv-color": "#6f63e8",
    "--arch-conv-border": "#8b80ff",
    "--arch-conv-shadow": "rgba(111, 99, 232, 0.22)",

    "--arch-input-color": "#e5e8f0",
    "--arch-input-border": "#aeb6c8",
    "--arch-input-inner": "#d4d8e4",
    "--arch-input-square": "#9ca6ba",
    "--arch-input-shadow": "rgba(120, 130, 150, 0.18)",

    "--arch-other-color": "#e5e8f0",
    "--arch-other-border": "#aeb6c8",
    "--arch-other-dot": "#8f99ad",
    "--arch-other-dot-border": "#6f7890",
    "--arch-other-shadow": "rgba(120, 130, 150, 0.18)",

    "--arch-dense-color": "#dff3e6",
    "--arch-dense-border": "#2f8f4e",
    "--arch-dense-dot": "#2f8f4e",
    "--arch-dense-dot-border": "#1f6f3a",
    "--arch-dense-shadow": "rgba(47, 143, 78, 0.18)",
  },

  dylan: {
    "--bg-base": "#f0fbf5",
    "--bg-surface": "#ffffff",
    "--bg-card": "#eef7f3",
    "--bg-hover": "#e2f3eb",
    "--border": "#d7e6df",
    "--border-bright": "#b7d6c9",
    "--text-primary": "#202727",
    "--text-secondary": "#4a5f57",
    "--text-muted": "#7a9088",
    "--accent": "#64d19a",
    "--accent-text": "#3aa876",
    "--accent-glow": "rgba(100, 209, 154, 0.18)",
    "--accent-dim": "#1f8f57",
    "--icon-filter": "invert(36%)",
    "--icon-filter-hover": "invert(12%)",

    // Architecture colors
    "--arch-conv-color": "#64d19a",
    "--arch-conv-border": "#3aa876",
    "--arch-conv-shadow": "rgba(100, 209, 154, 0.22)",

    "--arch-input-color": "#e4ebe7",
    "--arch-input-border": "#9fb0a8",
    "--arch-input-inner": "#d2ddd8",
    "--arch-input-square": "#8fa39a",
    "--arch-input-shadow": "rgba(90, 110, 100, 0.16)",

    "--arch-other-color": "#e4ebe7",
    "--arch-other-border": "#9fb0a8",
    "--arch-other-dot": "#7c9188",
    "--arch-other-dot-border": "#53685f",
    "--arch-other-shadow": "rgba(90, 110, 100, 0.16)",

    "--arch-dense-color": "#1f5f3b",
    "--arch-dense-border": "#2f9b66",
    "--arch-dense-dot": "#287a4c",
    "--arch-dense-dot-border": "#64d19a",
    "--arch-dense-shadow": "rgba(48, 130, 84, 0.28)",
  },
};

// LOGOS
const LOGOS = {
  dark: "../simulator/assets/imgs/logo/logo_purple.png",
  light: "../simulator/assets/imgs/logo/logo_purple.png",
  dylan: "../simulator/assets/imgs/logo/logo_black.png",
};

const CONTROL_PANEL_ICONS = {
  dark: "../simulator/assets/imgs/icons/setting-lines-purple.png",
  light: "../simulator/assets/imgs/icons/setting-lines-purple.png",
  dylan: "../simulator/assets/imgs/icons/setting-lines-green.png",
};

// APPLY THEME
function applyTheme(key) {
  const theme = THEMES[key];
  if (!theme) return;

  // Apply CSS variables
  Object.entries(theme).forEach(([prop, val]) => {
    document.documentElement.style.setProperty(prop, val);
  });

  // Update logo + favicon
  const logo = document.getElementById("appLogo");
  const favicon = document.getElementById("favicon");
  const controlPanelIcon = document.getElementById("controlPanelIcon");

  if (logo) logo.src = LOGOS[key];
  if (favicon) favicon.href = LOGOS[key];
  if (controlPanelIcon) controlPanelIcon.src = CONTROL_PANEL_ICONS[key];
}

// INIT THEME UI
function initTheme() {
  const btn = document.getElementById("themeBtn");
  const dropdown = document.getElementById("themeDropdown");

  if (!btn || !dropdown) return;

  // Toggle dropdown
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  // Handle theme selection (event delegation)
  dropdown.addEventListener("click", (e) => {
    const option = e.target.closest(".theme-option");
    if (!option) return;

    const selectedTheme = option.dataset.theme;

    // Update UI
    dropdown.querySelectorAll(".theme-option").forEach((o) => {
      o.classList.remove("active");
    });
    option.classList.add("active");

    // Apply + save
    applyTheme(selectedTheme);

    dropdown.classList.remove("open");
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
}