// PRELOADER
initPreloader();

// BOOT
document.addEventListener("DOMContentLoaded", () => {
  // Initialise UI modules after the HTML elements are available
  initTheme(); // theme.js
  initHelpModal(); // modal.js
  initImageSelection(); // images.js
  initFeaturePreviewClicks(); // compare.js
  initChangeMode(); // compare.js
  initControls(); // controls.js

  // Build generated UI sections after the basic event listeners are ready
  buildArchitecture(); // architecture.js
  initLayerSelect(); // architecture.js
  initFilterSelect(); // architecture.js

  // Set the first visible state of the simulator
  updateMethodUI(); // controls.js
  loadFeatureMaps(); // images.js
  updateVisualization(); // images.js

  // Method changes can affect visible controls, active preview styling and output paths
  document.getElementById("methodASelect")?.addEventListener("change", () => {
    updateMethodUI();
    refreshPreviewSelection();
    updateVisualization();
  });

  document.getElementById("methodBSelect")?.addEventListener("change", () => {
    updateMethodUI();
    refreshPreviewSelection();
    updateVisualization();
  });
});
