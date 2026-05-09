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
function loadFeatureMaps() {
  const grid = document.getElementById("featureMapGrid");

  if (!grid) return;
  grid.innerHTML = ""; // clear grid

  const activeImage = document.querySelector(".input-img.active");

  if (!activeImage) return;

  const imageName = activeImage.src.split("/").pop().split(".")[0];
  const layer = document.getElementById("layerSelect").value; // current layer

  // GENERATE 10 FILTERS
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.className = "feature-map-card";

    // IMAGE
    const img = document.createElement("img");
    console.log(imageName, layer, i);
    img.src = `../simulator/assets/imgs/output_imgs/feature_maps/${imageName}/${layer}/filter${i}.png`;
    img.alt = `Filter ${i}`;

    // LABEL
    const label = document.createElement("div");
    label.className = "feature-map-label";
    label.textContent = `Filter ${i}`;

    // CLICKABLE
    card.addEventListener("click", () => {
      // remove active
      document
        .querySelectorAll(".feature-map-card")
        .forEach((c) => c.classList.remove("active"));

      // activate clicked
      card.classList.add("active");

      // update dropdown
      const filterSelect = document.getElementById("filterSelect");

      if (filterSelect) {
        filterSelect.value = `filter${i}`;
      }

      updateFilter(`filter${i}`);
      updateVisualization();
    });

    card.appendChild(img);
    card.appendChild(label);
    grid.appendChild(card);
  } // for looP

  // Auto-select Filter 1
  const firstCard = document.querySelector(".feature-map-card");

  if (firstCard) {
    firstCard.classList.add("active");

    const filterSelect = document.getElementById("filterSelect");

    if (filterSelect) {
      filterSelect.value = "filter1";
    }

    updateFilter("filter1");
  }
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
