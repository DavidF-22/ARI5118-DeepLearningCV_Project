// INITIALIZE COMPARE MODE
function initChangeMode() {
  const singleBtn = document.getElementById("singleModeBtn");
  const compareBtn = document.getElementById("compareModeBtn");
  const methodBPanel = document.querySelector(".control-panel-methodB");

  if (!singleBtn || !compareBtn) return;

  singleBtn.addEventListener("click", () => {
    singleBtn.classList.add("active");
    compareBtn.classList.remove("active");

    methodBPanel.classList.remove("active");

    // Re-check which parameters should be visible in single mode
    updateMethodUI();
  });

  compareBtn.addEventListener("click", () => {
    singleBtn.classList.remove("active");
    compareBtn.classList.add("active");

    methodBPanel.classList.add("active");

    // Re-check which parameters should be visible in single mode
    updateMethodUI();
  });
}
