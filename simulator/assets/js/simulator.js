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
  },
};

// LOGOS
const LOGOS = {
  dark: "../simulator/assets/imgs/logo/logo_purple.png",
  light: "../simulator/assets/imgs/logo/logo_purple.png",
  dylan: "../simulator/assets/imgs/logo/logo_black.png",
};

const CONTROL_PANEL_ICON = {
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
  if (controlPanelIcon) controlPanelIcon.src = CONTROL_PANEL_ICON[key];
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

function initChangeMode() {
  const singleBtn = document.getElementById("singleModeBtn");
  const compareBtn = document.getElementById("compareModeBtn");

  if (!singleBtn || !compareBtn) return;

  singleBtn.addEventListener("click", () => {
    singleBtn.classList.add("active");
    compareBtn.classList.remove("active");

    document.querySelector(".control-panel-methodB").classList.remove("active");
  });

  compareBtn.addEventListener("click", () => {
    singleBtn.classList.remove("active");
    compareBtn.classList.add("active");

    document.querySelector(".control-panel-methodB").classList.add("active");
  });
}

// UPDATE PARAMETER VALUES
function handleSlider(input) {
  const type = input.dataset.type;
  const value = input.value;

  let displayValue;

  if (type === "step") {
    const steps = ["0.0001", "0.001", "0.01", "0.1", "1"];
    displayValue = steps[value];
  } else if (type === "l2") {
    displayValue = "1e-" + value;
  } else if (type === "octScale") {
    displayValue = (value / 10).toFixed(1);
  } else {
    displayValue = value;
  }

  document.getElementById(input.id + "Val").textContent = displayValue;
}

function initResetParams() {
  const sliders = document.querySelectorAll(".param-slider input");
  const selects = document.querySelectorAll(".ctrl-select");
  const resetBtn = document.getElementById("resetParamsBtn");

  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    sliders.forEach((slider) => {
      slider.value = slider.dataset.default;
      handleSlider(slider);
    });

    selects.forEach((select) => {
      select.value = select.dataset.default;
    });
  });
}

// CLICKABLE INPUT IMAGES
function initImageSelection() {
  const images = document.querySelectorAll(".input-img");
  const content = document.querySelector(".content");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // Remove active from all
      images.forEach((i) => i.classList.remove("active"));

      // Add active to clicked
      img.classList.add("active");
    });
  });
}

// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    preloader.style.display = "none";
  }, 300);
});

// HELP CARD
function initHelpModal() {
  const helpBtn = document.querySelector('[title="Help"]'); // your button
  const modal = document.getElementById("helpModal");
  const closeBtn = document.getElementById("closeHelp");

  if (!helpBtn || !modal) return;

  // Open modal
  helpBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close via X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// BOOT
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHelpModal();
  initImageSelection();
  initResetParams();
  initChangeMode();
});
