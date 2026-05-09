/* This array stores the information needed to build the CNN diagram
Instead of writing every node manually in HTML, JavaScript reads this array
and creates the architecture automatically */

const ARCHITECTURE_LAYERS = [
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

// STATE VARIABLES TO TRACK THE SELECTED LAYER AND FILTER
let selectedLayer = "conv1";
let selectedFilter = "filter1";

// THIS FUNCTION BUILDS THE ARCHITECTURE DIAGRAM IN THE CONTROL PANEL BASED ON THE ARCHITECTURE_LAYERS CONFIG
function buildArchitecture() {
  const archTrack = document.getElementById("archTrack");

  // Stop if the architecture container does not exist
  if (!archTrack) return;

  // Clear the container before building the diagram
  archTrack.innerHTML = "";

  ARCHITECTURE_LAYERS.forEach((layer, index) => {
    // Create one architecture node
    const node = document.createElement("button");

    node.type = "button";
    node.className = `arch-node node-${layer.type}`;
    node.dataset.layer = layer.id;

    // Add the label, sub-label, and visual graphic
    node.innerHTML = `
      <div class="arch-node-label">${layer.label}</div>
      <div class="arch-node-sub">${layer.sub || "&nbsp;"}</div>
      ${createLayerVisual(layer)}
    `;

    // Only convolutional layers are clickable
    if (layer.type === "conv") {
      node.addEventListener("click", () => selectLayer(layer.id));
    } else {
      node.disabled = true;
      node.classList.add("node-disabled");
    }

    archTrack.appendChild(node);

    // Add an arrow after every node except the last one
    if (index < ARCHITECTURE_LAYERS.length - 1) {
      archTrack.appendChild(createArrow());
    }
  });

  // Start with Conv1 selected
  selectLayer("conv1");
}

// THIS FUNCTION UPDATES THE UI TO REFLECT THE SELECTED LAYER
function createLayerVisual(layer) {
  // Choose the correct mini-visual depending on the layer type
  if (layer.type === "input") {
    return createInputVisual();
  }

  if (layer.type === "conv") {
    return createConvVisual(layer);
  }

  return createDotVisual(layer);
}

// CREATES THE INPUT IMAGE BLOCK.
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

// CREATES THE STACK OF CARDS FOR CONVOLUTIONAL LAYERS. THE NUMBER OF CARDS AND THEIR SIZE DEPEND ON THE LAYER CONFIG.
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

// CREATES DOTS FOR FLATTEN AND DENSE LAYERS
function createDotVisual(layer) {
  let dotsHTML = "";

  for (let i = 1; i <= layer.dots; i++) {
    const dotType = layer.type === "dense" ? "dot-dense" : "dot-other";
    dotsHTML += `<div class="node-dot ${dotType} ${layer.type}-dot-${i}"></div>`;
  }

  // Dense 4096 has 5 dots, so it needs slightly tighter spacing
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

// CREATES AN ARROW ELEMENT TO PLACE BETWEEN NODES
function createArrow() {
  const arrow = document.createElement("div");
  arrow.className = "arch-arrow";
  arrow.textContent = "→";
  return arrow;
}

// INITIALIZES THE FILTER SELECT DROPDOWN
function initFilterSelect() {
  // The dropdown reuses the same logic as clicking a feature-map card
  const filterSelect = document.getElementById("filterSelect");

  if (!filterSelect) return;

  // Update whenever filter dropdown changes
  filterSelect.addEventListener("change", () => {
    const filterNumber = filterSelect.value.replace("filter", "");

    const targetCard = document.querySelector(
      `.feature-map-card:nth-child(${filterNumber})`,
    );

    targetCard?.click();
  });
}

// INITIALIZES THE LAYER SELECT DROPDOWN
function initLayerSelect() {
  const layerSelect = document.getElementById("layerSelect");

  if (!layerSelect) return;

  layerSelect.addEventListener("change", () => {
    selectLayer(layerSelect.value);
  });
}

// SELECTS A LAYER AND REFRESHES DEPENDENT UI ELEMENTS
function selectLayer(layerId) {
  // Track the currently selected layer in state
  selectedLayer = layerId;

  // Highlight the active architecture node and clear highlight from others
  document.querySelectorAll(".arch-node").forEach((node) => {
    node.classList.toggle("selected", node.dataset.layer === layerId);
  });

  // Keep the Layer dropdown synchronized with node selection
  const layerSelect = document.getElementById("layerSelect");

  if (layerSelect) {
    layerSelect.value = layerId;
  }

  // Changing layer affects the active filter, labels, feature maps, and output image
  updateFilter(document.getElementById("filterSelect").value);
  updateConfigLabels();
  loadFeatureMaps();
  updateVisualization();
}

/* 
THIS FUNCTION UPDATES THE CURRENTLY SELECTED FILTER AND DISPLAYS IT IN THE CONFIG PANEL. 
IT ALSO HIDES THE FILTER OPTION IF THE SELECTED LAYER IS NOT CONVOLUTIONAL
*/
function updateConfigLabels() {
  const configValFV = document.getElementById("configValFV");
  const configValFM = document.getElementById("configValFM");

  if (!configValFV || !configValFM) return;

  const layerLabel = getLayerDisplayName(selectedLayer);

  configValFV.textContent = `${layerLabel} - ${selectedFilter}`;
  configValFM.textContent = layerLabel;
}

// GET DISPLAY NAME FOR A LAYER
function getLayerDisplayName(layerId) {
  const layer = ARCHITECTURE_LAYERS.find((layer) => layer.id === layerId);
  return layer ? layer.label : layerId;
}