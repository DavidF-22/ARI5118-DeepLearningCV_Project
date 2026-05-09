// UPDATE PARAMETER VALUES
function handleSlider(input) {
  // Sliders store small index values, which are mapped to readable parameter values
  const type = input.dataset.type;
  const value = input.value;

  let displayValue;

  if (type === "step") {
    const steps = ["0.001", "0.01", "0.1"];
    displayValue = steps[value];
  } else if (type === "octaves") {
    const octaves = ["2", "3", "4"];
    displayValue = octaves[value];
  } else if (type === "octScale") {
    const octScales = ["0.6", "0.8", "1.0", "1.2", "1.4"];
    displayValue = octScales[value];
  } else {
    displayValue = value;
  }

  // Update the label next to the slider so the user sees the real value
  document.getElementById(input.id + "Val").textContent = displayValue;

  // If same-method compare mode is active, store the changed value for the selected preview
  saveControlsToActivePreview();
  updateMethodUI();
}

// RESET PARAMETERS TO DEFAULT
function resetParameters() {
  const sliders = document.querySelectorAll(".param-slider input");
  const toggles = document.querySelectorAll(".param-toggle input");

  // Reset each slider to the default value stored in the HTML data-default attribute
  sliders.forEach((slider) => {
    slider.value = slider.dataset.default;
    handleSlider(slider);
  });

  // Reset toggles, such as L2 regularisation, using their HTML data-default value
  toggles.forEach((toggle) => {
    //
    toggle.checked = toggle.dataset.default === "true";
  });

  selectLayer("conv1");
  loadFeatureMaps((reset = true));
  updateMethodUI();
}

// UTILITY TO SHOW/HIDE ELEMENTS
function setVisible(element, visible) {
  element?.classList.toggle("hidden", !visible);
}

// UPDATE UI BASED ON SELECTED METHODS
function updateMethodUI() {
  // Check if in compare mode or single mode to determine which method selectors to check
  const compareMode = document
    .getElementById("compareModeBtn")
    ?.classList.contains("active");

  // Get control panel elements
  const methodA = document.getElementById("methodASelect").value;
  const methodB = document.getElementById("methodBSelect").value;

  const stepSize = document.getElementById("stepSizeParam");
  const l2 = document.getElementById("l2Param");
  const filter = document.getElementById("filterParam");
  const octaves = document.getElementById("octavesParam");
  const octScale = document.getElementById("octScaleParam");
  const featureMapsCard = document.getElementById("featureMapsCard");

  /* 
  Determine which parameters to show based on selected methods
  Activation-based methods show step size, l2, and filter options
  DeepDream shows octave options
  */
  let hasActivation;
  if (compareMode) {
    hasActivation = methodA === "activation" || methodB === "activation";
  } else {
    hasActivation = methodA === "activation";
  }

  let hasDeepDream;
  if (compareMode) {
    hasDeepDream = methodA === "deepdream" || methodB === "deepdream";
  } else {
    hasDeepDream = methodA === "deepdream";
  }

  // Show/hide parameters based on method selection
  // Activation maximisation needs step size, L2, filter selection and feature maps
  setVisible(stepSize, hasActivation);
  setVisible(l2, hasActivation);
  setVisible(filter, hasActivation);
  setVisible(featureMapsCard, hasActivation);

  // DeepDream is layer-based here, so only octave controls are shown
  setVisible(octaves, hasDeepDream);
  setVisible(octScale, hasDeepDream);

  updateVisualization();
}

// UPDATE FILTER OPTIONS BASED ON SELECTED LAYER
function updateFilter(filterValue) {
  // If the selected layer is convolutional, allow the chosen filter
  selectedFilter = filterValue;

  const filterSelect = document.getElementById("filterSelect");
  filterSelect.disabled = false;

  updateConfigLabels();
}

// INITIALIZES CONTROL PANEL EVENT LISTENERS
function initControls() {
  const resetBtn = document.getElementById("resetParamsBtn");
  const sliders = document.querySelectorAll(".param-slider input");
  const toggles = document.querySelectorAll(".param-toggle input");

  // Connect the reset button to the shared reset function
  resetBtn?.addEventListener("click", resetParameters);

  // Sliders update their visible labels while the user drags them
  sliders.forEach((slider) => {
    slider.addEventListener("input", () => {
      handleSlider(slider);
    });
  });

  // Toggles immediately update the active preview and output image
  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      saveControlsToActivePreview();
      updateVisualization();
    });
  });
}
