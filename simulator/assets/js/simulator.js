// PRELOADER
initPreloader();

// BOOT
document.addEventListener("DOMContentLoaded", () => {
  initTheme(); // theme.js
  initHelpModal(); // modal.js
  initImageSelection(); // images.js
  initFeaturePreviewClicks(); // compare.js
  initChangeMode(); // compare.js
  initControls(); // controls.js

  buildArchitecture(); // architecture.js
  initLayerSelect(); // architecture.js
  initFilterSelect(); // architecture.js

  updateMethodUI(); // controls.js
  loadFeatureMaps(); // images.js
  updateVisualization(); // images.js

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
