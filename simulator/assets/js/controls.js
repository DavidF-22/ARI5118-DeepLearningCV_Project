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

// RESET PARAMETERS TO DEFAULT
function resetParameters() {
  const sliders = document.querySelectorAll(".param-slider input");
  const toggles = document.querySelectorAll(".param-toggle input");
  const selects = document.querySelectorAll(".ctrl-select");

  sliders.forEach((slider) => {
    slider.value = slider.dataset.default;
    handleSlider(slider);
  });

  toggles.forEach((toggle) => {
    //
    toggle.checked = toggle.dataset.default === "true";
  });

  selects.forEach((select) => {
    select.value = select.dataset.default;
  });

  // Reset layer and filter to default values
  selectLayer("conv1");

  const filterSelect = document.getElementById("filterSelect");

  if (filterSelect) {
    filterSelect.value = "filter1";
    updateFilter("filter1");
  }

  updateMethodUI();
}

// UTILITY TO SHOW/HIDE ELEMENTS
function setVisible(element, visible) {
  element?.classList.toggle("hidden", !visible);
}

// UPDATE UI BASED ON SELECTED METHODS
function updateMethodUI() {
  // Check if in compare mode or single mode to determine which method selectors to check.
  const compareMode = document
    .getElementById("compareModeBtn")
    ?.classList.contains("active");

  // Get control panel elements
  const methodA = document.getElementById("methodASelect")?.value;
  const methodB = document.getElementById("methodBSelect")?.value;

  const stepSize = document.getElementById("stepSizeParam");
  const l2 = document.getElementById("l2Param");
  const filter = document.getElementById("filterParam");
  const octaves = document.getElementById("octavesParam");
  const octScale = document.getElementById("octScaleParam");

  /* 
  Determine which parameters to show based on selected methods. 
  Activation-based methods show step size, l2, and filter options. 
  DeepDream shows octave options.
  */
  const hasActivation = compareMode
    ? methodA === "activation" || methodB === "activation"
    : methodA === "activation";

  const hasDeepDream = compareMode
    ? methodA === "deepdream" || methodB === "deepdream"
    : methodA === "deepdream";

  // Show/hide parameters based on method selection.
  setVisible(stepSize, hasActivation);
  setVisible(l2, hasActivation);
  setVisible(filter, hasActivation);

  setVisible(octaves, hasDeepDream);
  setVisible(octScale, hasDeepDream);
}

// UPDATE FILTER OPTIONS BASED ON SELECTED LAYER
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

// initializes control panel event listeners for sliders and reset button.
function initControls() {
  const resetBtn = document.getElementById("resetParamsBtn");
  const sliders = document.querySelectorAll(".param-slider input");

  resetBtn?.addEventListener("click", resetParameters);

  sliders.forEach((slider) => {
    slider.addEventListener("input", () => {
      handleSlider(slider);
    });
  });
}
