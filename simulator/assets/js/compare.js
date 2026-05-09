let activePreviewSide = "A";

const DEFAULT_PREVIEW_SETTINGS = {
  layer: "conv1",
  filter: "filter1",
  step: "0",
  l2: false,
  octaves: "0",
  octScale: "2",
};

const previewSettings = {
  A: { ...DEFAULT_PREVIEW_SETTINGS },
  B: { ...DEFAULT_PREVIEW_SETTINGS },
};

function sameMethodCompareMode() {
  const compareMode = document
    .getElementById("compareModeBtn")
    ?.classList.contains("active");

  const methodA = document.getElementById("methodASelect")?.value;
  const methodB = document.getElementById("methodBSelect")?.value;

  return compareMode && methodA === methodB;
}

function getActiveSettings() {
  if (sameMethodCompareMode()) {
    return previewSettings[activePreviewSide];
  }

  return getSettingsFromControls();
}

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

function saveControlsToActivePreview() {
  if (!sameMethodCompareMode()) return;

  previewSettings[activePreviewSide] = getSettingsFromControls();
}

function loadActivePreviewToControls() {
  if (!sameMethodCompareMode()) return;

  const settings = previewSettings[activePreviewSide];

  document.getElementById("layerSelect").value = settings.layer;
  document.getElementById("filterSelect").value = settings.filter;
  document.getElementById("stepSize").value = settings.step;
  document.getElementById("l2Toggle").checked = settings.l2;
  document.getElementById("octaves").value = settings.octaves;
  document.getElementById("octScale").value = settings.octScale;

  selectedLayer = settings.layer;
  selectedFilter = settings.filter;

  handleSlider(document.getElementById("stepSize"));
  handleSlider(document.getElementById("octaves"));
  handleSlider(document.getElementById("octScale"));

  updateConfigLabels();
  loadFeatureMaps();
}

function refreshPreviewSelection() {
  const previewA = document.getElementById("previewA");
  const previewB = document.getElementById("previewB");

  if (!previewA || !previewB) return;

  if (!sameMethodCompareMode()) {
    previewA.classList.remove("active-preview");
    previewB.classList.remove("active-preview");
    return;
  }

  previewA.classList.toggle("active-preview", activePreviewSide === "A");
  previewB.classList.toggle("active-preview", activePreviewSide === "B");
}

function selectPreviewSide(side) {
  if (!sameMethodCompareMode()) return;

  saveControlsToActivePreview();

  activePreviewSide = side;

  loadActivePreviewToControls();
  refreshPreviewSelection();
  updateVisualization();
}

function initFeaturePreviewClicks() {
  document.getElementById("previewA")?.addEventListener("click", () => {
    selectPreviewSide("A");
  });

  document.getElementById("previewB")?.addEventListener("click", () => {
    selectPreviewSide("B");
  });
}

function initChangeMode() {
  const singleBtn = document.getElementById("singleModeBtn");
  const compareBtn = document.getElementById("compareModeBtn");
  const methodBPanel = document.querySelector(".control-panel-methodB");
  const previewB = document.getElementById("previewB");

  if (!singleBtn || !compareBtn) return;

  singleBtn.addEventListener("click", () => {
    singleBtn.classList.add("active");
    compareBtn.classList.remove("active");

    methodBPanel?.classList.remove("active");
    previewB?.classList.add("hidden");

    updateMethodUI();
    refreshPreviewSelection();
    updateVisualization();
  });

  compareBtn.addEventListener("click", () => {
    singleBtn.classList.remove("active");
    compareBtn.classList.add("active");

    methodBPanel?.classList.add("active");
    previewB?.classList.remove("hidden");

    activePreviewSide = "A";

    previewSettings.A = getSettingsFromControls();
    previewSettings.B = getSettingsFromControls();

    updateMethodUI();
    refreshPreviewSelection();
    updateVisualization();
  });
}
