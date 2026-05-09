// CLICKABLE INPUT IMAGES
function initImageSelection() {
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
  const grid = document.getElementById("featureMapGrid");
  const activeImage = document.querySelector(".input-img.active");
  const layerSelect = document.getElementById("layerSelect");
  const filterSelect = document.getElementById("filterSelect");

  if (!grid || !activeImage || !layerSelect || !filterSelect) return;

  grid.innerHTML = "";

  const imageName = activeImage.src.split("/").pop().split(".")[0];
  const layer = layerSelect.value;

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

    card.addEventListener("click", () => {
      selectFeatureMapFilter(filterValue);
    });

    grid.appendChild(card);
  }

  if (reset) {
    selectFeatureMapFilter("filter1");
  } else {
    selectFeatureMapFilter(filterSelect.value);
  }
}

// SELECT FEATURE MAP FILTER
function selectFeatureMapFilter(filterValue) {
  const filterSelect = document.getElementById("filterSelect");

  document.querySelectorAll(".feature-map-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.filter === filterValue);
  });

  if (filterSelect) {
    filterSelect.value = filterValue;
  }

  updateFilter(filterValue);
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
function buildOutputPath(method) {
  const imageName = getActiveImageName();
  const layer = document.getElementById("layerSelect").value;

  if (!imageName || !layer) return "";

  // ACTIVATION MAXIMISATION
  if (method === "activation") {
    const filter = document.getElementById("filterSelect").value;
    const stepSize = getStepSizeValue();

    const useL2 = document.getElementById("l2Toggle").checked;
    const regFolder = useL2 ? "l2_regularisation" : "no_regularisation";

    return `../simulator/assets/imgs/output_imgs/activation_maximisation/${regFolder}/${imageName}/step_${stepSize}/${layer}/${filter}.png`;
  }

  // LAYER-BASED DEEPDREAM
  if (method === "deepdream") {
    const octaves = getOctavesValue();
    const scale = getOctaveScaleValue();

    return `../simulator/assets/imgs/output_imgs/deepdream/${imageName}/octaves_${octaves}/scale_${scale}/${layer}/dream.png`;
  }

  return "";
}

// UPDATE TOP FEATURE VISUALISATION OUTPUTS
function getMethodDisplayName(method) {
  if (method === "activation") return "Activation Maximisation";
  if (method === "deepdream") return "DeepDream";
  return "Unknown Method";
}

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

  if (visSection) {
    visSection.classList.toggle("compare-active", compareMode);
  }

  previewA.classList.toggle("no-hover", !compareMode);
  previewB.classList.toggle("no-hover", !compareMode);

  outputImageA.src = buildOutputPath(methodA);
  previewA.classList.remove("hidden");

  if (outputLabelA) {
    outputLabelA.textContent = getMethodDisplayName(methodA);
  }

  if (compareMode) {
    outputImageB.src = buildOutputPath(methodB);
    previewB.classList.remove("hidden");

    if (outputLabelB) {
      outputLabelB.textContent = getMethodDisplayName(methodB);
    }
  } else {
    outputImageB.src = "";
    previewB.classList.add("hidden");
  }
}
