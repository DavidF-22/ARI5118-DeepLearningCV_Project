// STATE VARIABLES FOR COMPARE MODE
let activePreviewSide = "A";

// DEFAULT SETTINGS USED WHEN A PREVIEW SIDE HAS NOT BEEN CHANGED YET
const DEFAULT_PREVIEW_SETTINGS = {
  layer: "conv1",
  filter: "filter1",
  step: "0",
  l2: false,
  octaves: "0",
  octScale: "2",
};

/*
Stores separate parameter values for preview A and preview B
This is what lets the user click one preview and change only that preview
when both sides are using the same method
*/
const previewSettings = {
  A: { ...DEFAULT_PREVIEW_SETTINGS },
  B: { ...DEFAULT_PREVIEW_SETTINGS },
};

// CHECK IF COMPARE MODE CAN USE SEPARATE PREVIEW SETTINGS
function sameMethodCompareMode() {
  // Separate preview settings only make sense when compare mode is active
  const compareMode = document
    .getElementById("compareModeBtn")
    ?.classList.contains("active");

  const methodA = document.getElementById("methodASelect")?.value;
  const methodB = document.getElementById("methodBSelect")?.value;

  // The previews become independently editable only when both methods match
  return compareMode && methodA === methodB;
}

// GET SETTINGS FOR THE CURRENTLY ACTIVE PREVIEW
function getActiveSettings() {
  if (sameMethodCompareMode()) {
    return previewSettings[activePreviewSide];
  }

  return getSettingsFromControls();
}

// READ CURRENT VALUES FROM THE CONTROL PANEL
function getSettingsFromControls() {
  return {
    layer: document.getElementById("layerSelect")?.value || "conv1",
    filter: document.getElementById("filterSelect")?.value || "filter1",
    step: document.getElementById("stepSize")?.value || "0",
    l2: document.getElementById("l2Toggle")?.checked || false,
    octaves: document.getElementById("octaves")?.value || "0",
    octScale: document.getElementById("octScale")?.value || "2",
  };
}

// SAVE CURRENT CONTROL PANEL VALUES TO PREVIEW A OR B
function saveControlsToActivePreview() {
  // Do not save split settings when the previews are using different methods
  if (!sameMethodCompareMode()) return;

  previewSettings[activePreviewSide] = getSettingsFromControls();
}

// LOAD THE ACTIVE PREVIEW SETTINGS BACK INTO THE CONTROL PANEL
function loadActivePreviewToControls() {
  if (!sameMethodCompareMode()) return;

  // Read the stored settings for whichever preview is currently active
  const settings = previewSettings[activePreviewSide];

  document.getElementById("layerSelect").value = settings.layer;
  document.getElementById("filterSelect").value = settings.filter;
  document.getElementById("stepSize").value = settings.step;
  document.getElementById("l2Toggle").checked = settings.l2;
  document.getElementById("octaves").value = settings.octaves;
  document.getElementById("octScale").value = settings.octScale;

  // Keep the global layer/filter state in sync with the loaded controls
  selectedLayer = settings.layer;
  selectedFilter = settings.filter;

  // Refresh the visible slider labels after changing the input values
  handleSlider(document.getElementById("stepSize"));
  handleSlider(document.getElementById("octaves"));
  handleSlider(document.getElementById("octScale"));

  // Use selectLayer so the architecture highlight also updates
  selectLayer(settings.layer);

  // Keep the filter in sync after the layer has changed
  selectFeatureMapFilter(settings.filter);
}

// UPDATE WHICH PREVIEW LOOKS ACTIVE
function refreshPreviewSelection() {
  const previewA = document.getElementById("previewA");
  const previewB = document.getElementById("previewB");

  if (!previewA || !previewB) return;

  // Remove active styling when separate preview editing is not available
  if (!sameMethodCompareMode()) {
    previewA.classList.remove("active-preview");
    previewB.classList.remove("active-preview");
    return;
  }

  previewA.classList.toggle("active-preview", activePreviewSide === "A");
  previewB.classList.toggle("active-preview", activePreviewSide === "B");
}

// SELECT WHICH PREVIEW THE CONTROLS SHOULD EDIT
function selectPreviewSide(side) {
  if (!sameMethodCompareMode()) return;

  // Save current values before switching, so the previous side keeps its settings
  saveControlsToActivePreview();

  // Switch the active side and load that side into the shared control panel
  activePreviewSide = side;

  loadActivePreviewToControls();
  refreshPreviewSelection();
  updateVisualization();
}

// INITIALIZE CLICK EVENTS FOR FEATURE VISUALISATION PREVIEWS
function initFeaturePreviewClicks() {
  document.getElementById("previewA")?.addEventListener("click", () => {
    selectPreviewSide("A");
  });

  document.getElementById("previewB")?.addEventListener("click", () => {
    selectPreviewSide("B");
  });
}

// INITIALIZE SINGLE MODE AND COMPARE MODE BUTTONS
function initChangeMode() {
  const singleBtn = document.getElementById("singleModeBtn");
  const compareBtn = document.getElementById("compareModeBtn");
  const methodBPanel = document.querySelector(".control-panel-methodB");
  const previewB = document.getElementById("previewB");

  if (!singleBtn || !compareBtn) return;

  singleBtn.addEventListener("click", () => {
    singleBtn.classList.add("active");
    compareBtn.classList.remove("active");

    // Single mode only uses method A, so hide method B and preview B
    methodBPanel?.classList.remove("active");
    previewB?.classList.add("hidden");

    updateMethodUI();
    refreshPreviewSelection();
    updateVisualization();
  });

  compareBtn.addEventListener("click", () => {
    singleBtn.classList.remove("active");
    compareBtn.classList.add("active");

    // Compare mode shows method B and the second preview
    methodBPanel?.classList.add("active");
    previewB?.classList.remove("hidden");

    // Start compare mode from preview A each time compare mode is enabled
    activePreviewSide = "A";

    // Copy the current controls into both previews so they start from the same state
    previewSettings.A = getSettingsFromControls();
    previewSettings.B = getSettingsFromControls();

    updateMethodUI();
    refreshPreviewSelection();
    updateVisualization();
  });
}
