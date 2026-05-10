// CLICKABLE INPUT IMAGES
function initImageSelection() {
  // These are the original input images the user can choose from
  const images = document.querySelectorAll(".input-img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // Remove active from all
      images.forEach((i) => i.classList.remove("active"));

      // Add active to clicked
      img.classList.add("active");

      // Update feature maps for selected image
      loadFeatureMaps();
      updateVisualization();
    });
  });
}

// LOAD FEATURE MAPS
function loadFeatureMaps(reset = false) {
  // Rebuild the feature-map grid whenever the image or layer changes
  const grid = document.getElementById("featureMapGrid");
  const activeImage = document.querySelector(".input-img.active");
  const layerSelect = document.getElementById("layerSelect");
  const filterSelect = document.getElementById("filterSelect");

  if (!grid || !activeImage || !layerSelect || !filterSelect) return;

  // Clear old cards before loading the new layer/image combination
  grid.innerHTML = "";

  // The folder name is based on the active input image filename
  const imageName = activeImage.src.split("/").pop().split(".")[0];
  const layer = layerSelect.value;

  // Each layer folder contains ten pre-generated filter images
  for (let i = 1; i <= 10; i++) {
    const filterValue = `filter${i}`;

    const card = document.createElement("div");
    card.className = "feature-map-card";
    card.dataset.filter = filterValue;

    card.innerHTML = `
      <img 
        src="../simulator/assets/imgs/output_imgs/feature_maps/${imageName}/${layer}/${filterValue}.png" 
        alt="Filter ${i}"
      >
      <div class="feature-map-label">Filter ${i}</div>
    `;

    // Clicking a card updates the selected filter and the main output path
    card.addEventListener("click", () => {
      selectFeatureMapFilter(filterValue);
    });

    grid.appendChild(card);
  }

  // On reset, force Filter 1; otherwise keep the current dropdown value
  if (reset) {
    selectFeatureMapFilter("filter1");
  } else {
    selectFeatureMapFilter(filterSelect.value);
  }
}

// SELECT FEATURE MAP FILTER
function selectFeatureMapFilter(filterValue) {
  // Keep the feature-map grid, dropdown, and global filter state in sync
  const filterSelect = document.getElementById("filterSelect");

  document.querySelectorAll(".feature-map-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.filter === filterValue);
  });

  if (filterSelect) {
    filterSelect.value = filterValue;
  }

  updateFilter(filterValue);

  saveControlsToActivePreview();
  updateVisualization();
}

// LOAD FEATURE VISUALISATION ---
// GET CURRENT ACTIVE INPUT IMAGE NAME
function getActiveImageName() {
  const activeImage = document.querySelector(".input-img.active");

  if (!activeImage) return null;

  return activeImage.src.split("/").pop().split(".")[0];
}

// GET CURRENT STEP SIZE VALUE
function getStepSizeValue() {
  const stepValues = ["0.001", "0.01", "0.1"];
  const stepInput = document.getElementById("stepSize");

  return stepValues[Number(stepInput.value)];
}

// GET CURRENT DEEPDREAM OCTAVES VALUE
function getOctavesValue() {
  const octaveValues = ["2", "3", "4"];
  const octaveInput = document.getElementById("octaves");

  return octaveValues[Number(octaveInput.value)];
}

// GET CURRENT DEEPDREAM OCTAVE SCALE VALUE
function getOctaveScaleValue() {
  const scaleValues = ["0.6", "0.8", "1.0", "1.2", "1.4"];
  const scaleInput = document.getElementById("octScale");

  return scaleValues[Number(scaleInput.value)];
}

// BUILD OUTPUT IMAGE PATH BASED ON METHOD
function buildOutputPath(method, settings = getSettingsFromControls()) {
  // This builds the exact file path for the pre-generated output image
  const imageName = getActiveImageName();

  if (!imageName || !settings.layer) return "";

  // Activation maximisation output depends on regularisation, step size, layer, and filter
  if (method === "activation") {
    const stepValues = ["0.001", "0.01", "0.1"];
    const stepSize = stepValues[Number(settings.step)];

    const regFolder = settings.l2 ? "l2_regularisation" : "no_regularisation";

    return `../simulator/assets/imgs/output_imgs/activation_maximisation/${regFolder}/${imageName}/step_${stepSize}/${settings.layer}/${settings.filter}.png`;
  }

  // DeepDream output depends on octaves, octave scale, and layer
  if (method === "deepdream") {
    const octaveValues = ["2", "3", "4"];
    const scaleValues = ["0.6", "0.8", "1.0", "1.2", "1.4"];

    const octaves = octaveValues[Number(settings.octaves)];
    const scale = scaleValues[Number(settings.octScale)];

    return `../simulator/assets/imgs/output_imgs/deepdream/${imageName}/octaves_${octaves}/scale_${scale}/${settings.layer}/dream.png`;
  }

  return "";
}

// UPDATE TOP FEATURE VISUALISATION OUTPUTS
function getMethodDisplayName(method) {
  if (method === "activation") return "Activation Maximisation";
  if (method === "deepdream") return "DeepDream";
  return "Unknown Method";
}

// UPDATE FEATURE VISUALISATION OUTPUTS
function updateVisualization() {
  const compareMode = document
    .getElementById("compareModeBtn")
    ?.classList.contains("active");

  const methodA = document.getElementById("methodASelect").value;
  const methodB = document.getElementById("methodBSelect").value;

  const previewA = document.getElementById("previewA");
  const previewB = document.getElementById("previewB");

  const outputImageA = document.getElementById("outputImageA");
  const outputImageB = document.getElementById("outputImageB");

  const outputLabelA = document.getElementById("outputLabelA");
  const outputLabelB = document.getElementById("outputLabelB");

  const visSection = document.querySelector(".feature-visualisation-section");

  if (!previewA || !previewB || !outputImageA || !outputImageB) return;

  // Add a section class so CSS can switch between single and compare layouts
  if (visSection) {
    visSection.classList.toggle("compare-active", compareMode);
  }

  // Same-method compare mode allows each preview to use its own stored settings
  const sameMethod = compareMode && methodA === methodB;
  previewA.classList.toggle("no-hover", !sameMethod);
  previewB.classList.toggle("no-hover", !sameMethod);

  // Preview A uses its stored settings only when separate preview editing is enabled
  const settingsA = sameMethod ? previewSettings.A : getSettingsFromControls();
  outputImageA.src = buildOutputPath(methodA, settingsA);
  previewA.classList.remove("hidden");

  if (outputLabelA) {
    outputLabelA.textContent = getMethodDisplayName(methodA);
  }

  // In compare mode, also load preview B using either shared or stored settings
  if (compareMode) {
    const settingsB = sameMethod
      ? previewSettings.B
      : getSettingsFromControls();

    outputImageB.src = buildOutputPath(methodB, settingsB);
    previewB.classList.remove("hidden");

    if (outputLabelB) {
      outputLabelB.textContent = getMethodDisplayName(methodB);
    }
  } else {
    outputImageB.src = "";
    previewB.classList.add("hidden");
  }
}
