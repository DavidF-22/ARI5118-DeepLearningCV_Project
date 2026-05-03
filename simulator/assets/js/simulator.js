// ── THEME DROPDOWN ────────────────────────────────────
const THEMES = {
  dark: {
    "--bg-base": "#0b0d14",
    "--bg-surface": "#111420",
    "--bg-card": "#1e2236",
    "--bg-hover": "#252a40",
    "--border": "#2a2f4a",
    "--border-bright": "#3a4070",
    "--text-primary": "#e8eaf0",
    "--text-secondary": "#8891b0",
    "--text-muted": "#555e80",
    "--accent": "#7c6fff",
    "--accent-text": "#a89fff",
    "--accent-glow": "rgba(124, 111, 255, 0.18)",
    "--icon-filter": "invert(62%)",
    "--icon-filter-hover": "invert(93%)",
  },

  light: {
    "--bg-base": "#f4f5f8",
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
    "--accent-glow": "rgba(124, 111, 255, 0.18)",
    "--icon-filter": "invert(31%)",
    "--icon-filter-hover": "invert(9%)",
  },

  dylan: {
    "--bg-base": "#f9fbfa",
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
    "--icon-filter": "invert(36%)",
    "--icon-filter-hover": "invert(12%)",
  },
};

// ── LOGOS ─────────────────────────────────────────────
const LOGOS = {
  dark: "../simulator/assets/imgs/logo/logo_purple.png",
  light: "../simulator/assets/imgs/logo/logo_purple.png",
  dylan: "../simulator/assets/imgs/logo/logo_black.png",
};

// ── APPLY THEME ───────────────────────────────────────
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

  if (logo) logo.src = LOGOS[key];
  if (favicon) favicon.href = LOGOS[key];
}

// ── INIT THEME UI ─────────────────────────────────────
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

// ── BOOT ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHelpModal();
});

// ── PRELOADER ─────────────────────────────────────────
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    preloader.style.display = "none";
  }, 300);
});

// ── HELP CARD ─────────────────────────────────────────
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
