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

const CONTROL_PANEL_ICON = {
  dark: "../simulator/assets/imgs/icons/setting-lines-purple.png",
  light: "../simulator/assets/imgs/icons/setting-lines-purple.png",
  dylan: "../simulator/assets/imgs/icons/setting-lines-green.png",
};

/* This array stores the information needed to build the CNN diagram.
Instead of writing every node manually in HTML, JavaScript reads this array
and creates the architecture automatically.*/

const architectureLayers = [
  { id: "input", label: "Input", sub: "224×224×3", type: "input" },
  {
    id: "conv1",
    label: "Conv1",
    sub: "64 filters",
    type: "conv",
    cards: 3,
    size: "small",
  },
  {
    id: "conv2",
    label: "Conv2",
    sub: "128 filters",
    type: "conv",
    cards: 4,
    size: "medium",
  },
  {
    id: "conv3",
    label: "Conv3",
    sub: "256 filters",
    type: "conv",
    cards: 4,
    size: "large",
  },
  {
    id: "conv4",
    label: "Conv4",
    sub: "512 filters",
    type: "conv",
    cards: 4,
    size: "wide",
  },
  {
    id: "conv5",
    label: "Conv5",
    sub: "512 filters",
    type: "conv",
    cards: 4,
    size: "wide",
  },
  { id: "flatten", label: "Flatten", sub: "", type: "flatten", dots: 4 },
  { id: "dense1", label: "Dense", sub: "(4096)", type: "dense", dots: 5 },
  { id: "dense2", label: "Dense", sub: "(Out)", type: "dense", dots: 3 },
];

// State variables to track selected layer and filter
let selectedLayer = "conv1";
let selectedFilter = "filter1";

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

    // Reset layer and filter to default values
    selectedLayer = "conv1";
    selectedFilter = "filter1";

    const layerSelect = document.getElementById("layerSelect");
    const filterSelect = document.getElementById("filterSelect");

    if (layerSelect) {
      layerSelect.value = "conv1";
    }

    if (filterSelect) {
      filterSelect.value = "filter1";
    }

    selectLayer("conv1");
    updateConfigLabels();
  });
}

// CLICKABLE INPUT IMAGES
function initImageSelection() {
  const images = document.querySelectorAll(".input-img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // if already active, deselect and return
      if (img.classList.contains("active")) {
        img.classList.remove("active");
        return;
      }

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

// CNN ARCHITECTURE ----------------------------

// This function creates all CNN nodes and arrows inside #archTrack.
function buildArchitecture() {
  const archTrack = document.getElementById("archTrack");

  // Stop if the architecture container does not exist.
  if (!archTrack) return;

  // Clear the container before building the diagram.
  archTrack.innerHTML = "";

  architectureLayers.forEach((layer, index) => {
    // Create one architecture node.
    const node = document.createElement("button");

    node.type = "button";
    node.className = `arch-node node-${layer.type}`;
    node.dataset.layer = layer.id;

    // Add the label, sub-label, and visual graphic.
    node.innerHTML = `
      <div class="arch-node-label">${layer.label}</div>
      <div class="arch-node-sub">${layer.sub || "&nbsp;"}</div>
      ${createLayerVisual(layer)}
    `;

    // When clicked, select this layer.
    node.addEventListener("click", () => selectLayer(layer.id));

    archTrack.appendChild(node);

    // Add an arrow after every node except the last one.
    if (index < architectureLayers.length - 1) {
      archTrack.appendChild(createArrow());
    }
  });

  // Start with Conv1 selected.
  selectLayer("conv1");
}

// This creates the visual representation for a layer based on its type.
function createLayerVisual(layer) {
  if (layer.type === "input") {
    return createInputVisual();
  }

  if (layer.type === "conv") {
    return createConvVisual(layer);
  }

  return createDotVisual(layer);
}

// Creates the input image block.
function createInputVisual() {
  return `
    <div class="layer-visual input-visual">
      <div class="layer-stack">
        <div class="input-frame">
          <div class="input-inner">
            <div class="input-square"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Creates stacked cards for convolutional layers.
function createConvVisual(layer) {
  let cardsHTML = "";

  for (let i = 1; i <= layer.cards; i++) {
    cardsHTML += `<div class="layer-card card-${i}"></div>`;
  }

  return `
    <div class="layer-visual conv-visual conv-${layer.size}">
      <div class="layer-stack conv-stack">
        ${cardsHTML}
      </div>
    </div>
  `;
}

// Creates dots for flatten and dense layers.
function createDotVisual(layer) {
  let dotsHTML = "";

  for (let i = 1; i <= layer.dots; i++) {
    const dotType = layer.type === "dense" ? "dot-dense" : "dot-other";
    dotsHTML += `<div class="node-dot ${dotType} ${layer.type}-dot-${i}"></div>`;
  }

  // Dense 4096 has 5 dots, so it needs slightly tighter spacing.
  const denseClass =
    layer.type === "dense" && layer.dots === 5 ? "dense-dot-stack" : "";

  return `
    <div class="layer-visual dot-visual">
      <div class="layer-stack dot-stack ${denseClass}">
        ${dotsHTML}
      </div>
    </div>
  `;
}

// Creates an arrow between architecture nodes.
function createArrow() {
  const arrow = document.createElement("div");
  arrow.className = "arch-arrow";
  arrow.textContent = "→";
  return arrow;
}

// This initializes the Filter dropdown and sets up its event listener.
function initFilterSelect() {
  const filterSelect = document.getElementById("filterSelect");

  if (!filterSelect) return;

  // Store the current dropdown value.
  selectedFilter = filterSelect.value;

  // Update the labels whenever the filter changes.
  filterSelect.addEventListener("change", () => {
    updateFilter(filterSelect.value);
  });
}

// Called when the filter dropdown changes.
function updateFilter(filterValue) {
  const filterSelect = document.getElementById("filterSelect");

  // If the selected layer is not convolutional, force the filter to None.
  if (!selectedLayer.startsWith("conv")) {
    selectedFilter = "none";

    if (filterSelect) {
      filterSelect.value = "none";
      filterSelect.disabled = true;
    }

    updateConfigLabels();
    return;
  }

  // If the selected layer is convolutional, allow the chosen filter.
  selectedFilter = filterValue;

  if (filterSelect) {
    filterSelect.disabled = false;
  }

  updateConfigLabels();
}

// This is called when an architecture node is clicked, or when the Layer dropdown changes.
function selectLayer(layerId) {
  // Track the currently selected layer in state.
  selectedLayer = layerId;

  // Highlight the active architecture node and clear highlight from others.
  document.querySelectorAll(".arch-node").forEach((node) => {
    node.classList.toggle("selected", node.dataset.layer === layerId);
  });

  // Keep the Layer dropdown synchronized with node selection.
  const layerSelect = document.getElementById("layerSelect");

  if (layerSelect) {
    layerSelect.value = layerId;
  }

  // Update filter behavior depending on whether the layer is convolutional.
  const filterSelect = document.getElementById("filterSelect");

  if (selectedLayer.startsWith("conv")) {
    // Default to Filter 1 when coming from a non-convolutional state.
    if (filterSelect && filterSelect.value === "none") {
      updateFilter("filter1");
      filterSelect.value = "filter1";
    } else if (filterSelect) {
      // Preserve the currently chosen filter for convolutional layers.
      updateFilter(filterSelect.value);
    }
  } else {
    updateFilter("none");
  }

  updateConfigLabels();
}

// Called by the HTML dropdown onchange="updateLayer(this.value)".
function updateLayer(layerId) {
  selectLayer(layerId);
}

// This updates the headings above the Feature Visualization and Feature Maps sections
function updateConfigLabels() {
  const configValFV = document.getElementById("configValFV");
  const configValFM = document.getElementById("configValFM");

  if (!configValFV || !configValFM) return;

  const layerLabel = getLayerDisplayName(selectedLayer);

  // Input does not use filters.
  if (selectedLayer === "input") {
    configValFV.textContent = "Input";
    configValFM.textContent = "Input";
    return;
  }

  // Convolutional layers use filters/channels.
  if (selectedLayer.startsWith("conv")) {
    configValFV.textContent = `${layerLabel} - ${selectedFilter}`;
    configValFM.textContent = layerLabel;
    return;
  }

  // Flatten and Dense layers do not use convolution filters.
  configValFV.textContent = layerLabel;
  configValFM.textContent = layerLabel;
}

// This looks up the display name for a layer based on its ID.
function getLayerDisplayName(layerId) {
  const layer = architectureLayers.find((layer) => layer.id === layerId);
  return layer ? layer.label : layerId;
}

// BOOT
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHelpModal();
  initImageSelection();
  initResetParams();
  initChangeMode();
  initFilterSelect();
  buildArchitecture();
});
