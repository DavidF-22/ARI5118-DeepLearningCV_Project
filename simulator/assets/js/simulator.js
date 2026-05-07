// PRELOADER
initPreloader();

// BOOT
document.addEventListener("DOMContentLoaded", () => {
  initTheme();            // theme.js
  initHelpModal();        // modal.js
  initImageSelection();   // images.js
  initChangeMode();       // compare.js
  initControls();         // controls.js
  
  buildArchitecture();    // architecture.js - builds the network architecture visualization and sets up layer selection. 
  initLayerSelect();      // architecture.js - initializes the layer select dropdown and sets up the change event listener to select the layer.
  initFilterSelect();     // architecture.js - initializes the filter select dropdown and sets up the change event listener to update the filter.

  // trigger an initial UI update to set parameter visibility for default method selections.
  updateMethodUI();

  document
    .getElementById("methodASelect")
    ?.addEventListener("change", updateMethodUI);

  document
    .getElementById("methodBSelect")
    ?.addEventListener("change", updateMethodUI);
});
